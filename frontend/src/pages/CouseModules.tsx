import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoursesBackground from '../components/CoursesBackground';
import ModuleCard from '../components/ModuleCard';
import { requestData } from '../services/requests';
import OrangeButton from '../components/OrangeButton';
import { Courses, initialCourseState } from '../types/courseType';

function CourseModules() {
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState<Courses>(initialCourseState);

  const navigate = useNavigate();

  const { id } = useParams();

  const localStorageId = localStorage.getItem('userId');

  useEffect(() => {
    // const token = localStorage.getItem('token');

    // if (!token) {
    //   navigate('/login');
    // }

    async function fetchData() {
      try {
        const data = await requestData(`/modules/${id}`);
        const courseData = await requestData(`/courses/${id}`);
        setModules(data);
        setCourse(courseData);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <CoursesBackground heading="Curso" title={ course.title }>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {
          modules.map((module, index) => (
            <ModuleCard
              key={ index }
              module={ module }
            />
          ))
        }
      </div>
      <OrangeButton
        onClick={ () => navigate(`/courses/${localStorageId}`) }
      >
        Voltar
      </OrangeButton>
    </CoursesBackground>
  );
}

export default CourseModules;
