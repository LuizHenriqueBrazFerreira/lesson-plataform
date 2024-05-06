import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CoursesBackground from '../../components/CoursesBackground';
import ModuleCard from '../../components/ModuleCard';
import { requestData } from '../../services/requests';

function CourseModules() {
  const [modules, setModules] = useState([]);

  const { id } = useParams();

  const localStorageId = localStorage.getItem('userId');

  useEffect(() => {
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
      <Link
        to={ `/courses/${localStorageId}` }
        className="text-white bg-btn-orange
          rounded-full py-2 px-4 mt-4
          text-center font-bold"
      >
        Voltar
      </Link>
    </CoursesBackground>
  );
}

export default CourseModules;
