import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requestData, setToken } from '../../services/requests';
import { LessonsType } from '../../types/lessons';
import BreadCrumbs from '../../components/BreadCrumbs';
import CoursesBackground from '../../components/CoursesBackground';
import LessonsCard from '../../components/LessonsCard';
import OrangeButton from '../../components/OrangeButton';
import LoadingCard from '../../components/LoadingCard';
import CourseContext from '../../context/CourseContext';

function Lessons() {
  const [lessons, setLessons] = useState<LessonsType[]>([]);
  const [translatedModuleTitle, setTranslatedModuleTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { translateDynamicContent } = useContext(CourseContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleId } = useParams();

  useEffect(() => {
    document.title = `EduActiva - ${t('Aulas')}`;
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      setLoading(true);
      try {
        const moduleData = await requestData(`module/${moduleId}`);
        const lessonsData = await requestData(`lessons/${moduleId}`);
        const translated = await translateDynamicContent(moduleData.title);
        setTranslatedModuleTitle(translated);

        setLessons(lessonsData);
        setLoading(false);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [translateDynamicContent, t]);

  return (
    <div>
      <CoursesBackground
        heading={ t('Modulo') }
        title={ translatedModuleTitle }
        loading={ loading }
      >
        <BreadCrumbs />
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
          { loading && (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) }
          {lessons.map((lesson, index) => (
            <LessonsCard
              lessonsUrl={ pathname }
              key={ lesson.id }
              lesson={ lesson }
              index={ index }
            />
          ))}
        </div>
        <OrangeButton
          onClick={ () => navigate(-1) }
        >
          {t('Voltar')}
        </OrangeButton>
      </CoursesBackground>
    </div>

  );
}

export default Lessons;
