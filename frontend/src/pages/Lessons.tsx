import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestData } from '../services/requests';
import CoursesBackground from '../components/CoursesBackground';
import { Module, initialModuleState } from '../types/courseType';
import { LessonsType } from '../types/lessons';
import LessonsCard from '../components/LessonsCard';
import ModuleCard from '../components/ModuleCard';
// import OrangeButton from '../components/OrangeButton';

function Lessons() {
  const [lessons, setLessons] = useState<LessonsType[]>([]);
  const [module, setModule] = useState<Module>(initialModuleState);

  const navigate = useNavigate();

  const { moduleId } = useParams();

  const lessonsUrl = `/courses/${module.courseId}
  /modules/${moduleId}/lessons`;

  useEffect(() => {
    // const token = localStorage.getItem('token');

    // if (!token) {
    //   navigate('/login');
    // }

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
      <CoursesBackground
        heading="Módulo"
        title={ module.title }
      >
        <div className="self-start">
          <h1
            className="text-2xl lg:text-4xl
            text-btn-orange font-bold"
          >
            Aulas
          </h1>
          {
            // ISSO TUDO VAI SAIR PARA O LESSONCARD
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
      </CoursesBackground>
    </div>

  );
}

export default Lessons;
