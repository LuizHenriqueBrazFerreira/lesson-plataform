import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PdfBar from '../components/PdfBar';
import { requestData, setToken } from '../services/requests';
import CoursesBackground from '../components/CoursesBackground';
import { Module, initialModuleState } from '../types/courseType';
import { LessonsType, InitialLessonsType } from '../types/lessons';

function LessonPage() {
  const [lessons, setLessons] = useState<LessonsType>(InitialLessonsType);
  const [module, setModule] = useState<Module>(initialModuleState);

  const navigate = useNavigate();

  const { moduleId, lessonId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const moduleData = await requestData(`module/${moduleId}`);
        const lessonsData = await requestData(`lesson/${lessonId}`);
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
          <PdfBar />
          <h1
            className="text-2xl lg:text-4xl
            text-btn-orange font-bold"
          >
            { lessons.title }
          </h1>
          <h1
            className="text-2xl"
          >
            { lessons.content }
          </h1>
        </div>
        <video
          className="h-full w-full rounded-lg"
          controls
        >
          <source src={ lessons.link } type="video/mp4" />
          <track kind="captions" src="" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
      </CoursesBackground>
    </div>
  );
}

export default LessonPage;
