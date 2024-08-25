/* eslint-disable react/no-danger */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PdfBar from '../../components/PdfButton';
import { requestData, setToken } from '../../services/requests';
import CoursesBackground from '../../components/CoursesBackground';
import { Module, initialModuleState } from '../../types/courseType';
import { LessonsType } from '../../types/lessons';
import OrangeButton from '../../components/OrangeButton';
import BreadCrumbs from '../../components/BreadCrumbs';
import ReadTextEditor from '../../components/ReadTextEditor';

function LessonPage() {
  const [lesson, setLesson] = useState<LessonsType>({} as LessonsType);
  const [module, setModule] = useState<Module>(initialModuleState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleId, lessonId } = useParams();

  useEffect(() => {
    document.title = 'EduActiva - Aula';
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
        heading="Modulo"
        title={ module.title }
        moreClasses="gap-10"
        loading={ !lesson.title }
      >
        <BreadCrumbs lesssonTitle={ lesson.title } />
        <div className="flex md:flex-row flex-col md:justify-between md:items-center">
          <h1
            className="text-2xl md:text-4xl
              text-btn-orange font-bold"
          >
            { lesson.title }
          </h1>
          <PdfBar path={ pathname } />
        </div>
        <ReadTextEditor content={ lesson.content } />
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
