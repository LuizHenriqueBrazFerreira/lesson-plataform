import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requestData, setToken } from '../../services/requests';
import BreadCrumbs from '../../components/BreadCrumbs';
import CoursesBackground from '../../components/CoursesBackground';
import CourseContext from '../../context/CourseContext';
import ModuleCard from '../../components/ModuleCard';
import OrangeButton from '../../components/OrangeButton';
import { showSubscriptionMessage } from '../../utils/sweetAlert';
import LoadingCard from '../../components/LoadingCard';

function CourseModules() {
  const [modules, setModules] = useState([]);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedDuration, setTranslatedDuration] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const subscribed = JSON.parse(localStorage.getItem('subscribedCourses') ?? '{}');
  const { changeForumURL, translateDynamicContent } = useContext(CourseContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { courseId } = useParams();

  const handleSubscribed = () => {
    if (!subscribed[courseId ?? 0] && userId !== '1') {
      showSubscriptionMessage(userId ?? '', courseId ?? '', subscribed);
    }
  };

  useEffect(() => {
    document.title = `EduActiva - ${t('Curso')}`;
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      setLoading(true);
      try {
        const data = await requestData(`/modules/${courseId}`);
        const courseData = await requestData(`/courses/${courseId}`);
        const translatedTitle = await translateDynamicContent(courseData.title);
        const translatedDuration = await translateDynamicContent(courseData.duration);
        setTranslatedDuration(translatedDuration);
        setTranslatedTitle(translatedTitle);
        setModules(data);
        changeForumURL(courseData.forum);
        handleSubscribed();
        localStorage.setItem('forum', courseData.forum);
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
    <CoursesBackground
      heading={ t('Curso') }
      title={ translatedTitle }
      loading={ loading }
      duration={ translatedDuration }
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
        {
          modules.map((module, index) => (
            <ModuleCard
              key={ index }
              module={ module }
              index={ index }
            />
          ))
        }
      </div>
      <OrangeButton
        onClick={ () => navigate(-1) }
      >
        {t('Voltar')}
      </OrangeButton>
    </CoursesBackground>
  );
}

export default CourseModules;
