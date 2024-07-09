import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PdfBar from '../../components/PdfBar';
import { requestData, setToken } from '../../services/requests';
import CoursesBackground from '../../components/CoursesBackground';
import { Module, initialModuleState } from '../../types/courseType';
import { LessonsType, InitialLessonsType } from '../../types/lessons';
import OrangeButton from '../../components/OrangeButton';

function LessonPage() {
  const [lesson, setLesson] = useState<LessonsType>(InitialLessonsType);
  const [module, setModule] = useState<Module>(initialModuleState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        const lessonData = await requestData(`lesson/${lessonId}`);
        setModule(moduleData);
        setLesson(lessonData);
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
        moreClasses="gap-10"
      >
        <div className="flex md:flex-row flex-col md:justify-between md:items-center">
          <h1
            className="text-2xl md:text-4xl
              text-btn-orange font-bold"
          >
            { lesson.title }
          </h1>
          <PdfBar path={ pathname } />
        </div>
        <p className="text-lg md:text-xl text-justify">
          {lesson.content}
        </p>
        { lesson.image && (
          <img
            className="rounded-md self-center h-[200px] md:h-[600px] w-full"
            src={ lesson.image }
            alt={ lesson.title }
          />
        )}
        { lesson.link && (
          <iframe
            className="rounded-md self-center h-[200px] md:h-[600px] w-full"
            src={ lesson.link }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        <OrangeButton
          onClick={ () => navigate(-1) }
        >
          Voltar
        </OrangeButton>
      </CoursesBackground>
    </div>
  );
}

export default LessonPage;
