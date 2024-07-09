import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { requestData, setToken } from '../../services/requests';
import CoursesBackground from '../../components/CoursesBackground';
import { Module, initialModuleState } from '../../types/courseType';
import { LessonsType } from '../../types/lessons';
import LessonsCard from '../../components/LessonsCard';
import OrangeButton from '../../components/OrangeButton';

function Lessons() {
  const [lessons, setLessons] = useState<LessonsType[]>([]);
  const [module, setModule] = useState<Module>(initialModuleState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const moduleData = await requestData(`module/${moduleId}`);
        const lessonsData = await requestData(`lessons/${moduleId}`);

        setModule(moduleData);
        setLessons(lessonsData);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <CoursesBackground heading="Módulo" title={ module.title }>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {lessons.map((lesson) => (
            <LessonsCard
              lessonsUrl={ pathname }
              key={ lesson.id }
              lesson={ lesson }
            />
          ))}
        </div>
        <OrangeButton
          onClick={ () => navigate(-1) }
        >
          Voltar
        </OrangeButton>
      </CoursesBackground>
    </div>

  );
}

export default Lessons;
