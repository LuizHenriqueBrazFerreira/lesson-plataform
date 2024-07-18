import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { Courses, initialCourseState } from '../../types/courseType';
import { requestData, setToken, requestUpdate } from '../../services/requests';
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

  useEffect(() => {
    if (!course.subscribed) {
      Swal.fire({
        title: t('Você não está inscrito neste curso'),
        text: t('Deseja se inscrever e receber emails sobre o curso?'),
        showCancelButton: true,
        confirmButtonText: t('Sim'),
        cancelButtonText: t('Não'),
        confirmButtonColor: '#e06915',
      }).then((result) => {
        if (result.isConfirmed) {
          requestUpdate(`/courses/${courseId}/subscribe`, {})
            .then(() => {
              Swal.fire(t('Inscrição realizada com sucesso'));
              setCourse({ ...course, subscribed: true });
            })
            .catch((error: any) => {
              if (error.isAxiosError) {
                console.error(error.response.data);
              }
            });
        }
      });
    }
  }, []);

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
