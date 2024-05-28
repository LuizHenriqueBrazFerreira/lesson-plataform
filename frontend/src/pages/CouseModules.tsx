import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoursesBackground from '../components/CoursesBackground';
import ModuleCard from '../components/ModuleCard';
import { requestData } from '../services/requests';
import OrangeButton from '../components/OrangeButton';

function CourseModules() {
  const [modules, setModules] = useState([]);

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
        setModules(data);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-xl lg:text-4xl
            text-btn-orange font-bold"
        >
          Módulos
        </h1>
      </div>
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
