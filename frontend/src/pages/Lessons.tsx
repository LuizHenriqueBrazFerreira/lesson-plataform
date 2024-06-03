import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../services/requests';
import CoursesBackground from '../components/CoursesBackground';
import { Module, initialModuleState } from '../types/courseType';
import { LessonsType } from '../types/lessons';
import LessonsCard from '../components/LessonsCard';
import ModuleCard from '../components/ModuleCard';
import OrangeButton from '../components/OrangeButton';

function Lessons() {
  const [lessons, setLessons] = useState<LessonsType[]>([]);
  const [module, setModule] = useState<Module>(initialModuleState);

  const navigate = useNavigate();

  const { moduleId } = useParams();

  const lessonsUrl = `/courses/${module.courseId}
  /modules/${moduleId}/lessons`;

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
        console.log(lessonsData);
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
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {
            lessons.map((lesson, index) => (
              <div
                aria-hidden="true"
                className="lg:text-3xl font-semibold"
                onClick={
                  () => navigate(`${lessonsUrl}/${lesson.id}`)
                }
                key={ index }
              >
                <ModuleCard
                  module={ lesson }
                />
              </div>
            ))
          }
        </div>
        <OrangeButton
          onClick={ () => navigate(`/courses/${module.courseId}/modules`) }
        >
          Voltar
        </OrangeButton>
      </CoursesBackground>
    </div>

  );
}

export default Lessons;
