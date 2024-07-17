import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Courses, initialCourseState } from '../../types/courseType';
import { requestData, setToken } from '../../services/requests';
import BreadCrumbs from '../../components/BreadCrumbs';
import CoursesBackground from '../../components/CoursesBackground';
import CourseContext from '../../context/CourseContext';
import ModuleCard from '../../components/ModuleCard';
import OrangeButton from '../../components/OrangeButton';

function CourseModules() {
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState<Courses>(initialCourseState);
  const { t } = useTranslation();

  const { changeForumURL } = useContext(CourseContext);

  const navigate = useNavigate();

  const { courseId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const data = await requestData(`/modules/${courseId}`);
        const courseData = await requestData(`/courses/${courseId}`);
        setModules(data);
        setCourse(courseData);
        changeForumURL(courseData.forum);
        localStorage.setItem('forum', courseData.forum);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
        }
      }
    }

    fetchData();
  }, [courseId, navigate, changeForumURL]);

  return (
    <CoursesBackground heading={ t('Curso') } title={ course.title }>
      <p className="self-center text-xl">{ course.duration }</p>
      <BreadCrumbs />
      <div className="grid grid-cols-1 md:grid-cols-2">
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
