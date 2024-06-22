import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import CoursesBackground from '../components/CoursesBackground';
import { setToken } from '../services/requests';

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      return navigate('/login');
    }

    setToken(token);
  }, []);

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-xl lg:text-4xl
           text-btn-orange font-bold"
        >
          Administrador
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <AdminCard
          heading="Estudantes"
          to="students"
          description="Ver todas as pessoas estudantes"
        />
        <AdminCard
          heading="Criar Curso"
          to="create"
          description="Criar um novo curso"
        />
        <AdminCard
          heading="Editar Curso"
          to="edit"
          description="Editar um curso existente"
        />
      </div>
    </CoursesBackground>
  );
}
