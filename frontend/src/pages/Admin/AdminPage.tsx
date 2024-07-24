import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, requestData } from '../../services/requests';
import { showSuccessMessage, showErrorMessage } from '../../utils/sweetAlert';
import AdminCard from '../../components/AdminCard';
import CoursesBackground from '../../components/CoursesBackground';
import OrangeButton from '../../components/OrangeButton';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      return navigate('/login');
    }

    setToken(token);
  }, []);

  const handleSendReport = async () => {
    setLoading(true);
    try {
      const { message } = await requestData('/report');
      showSuccessMessage(message);
      setLoading(false);
    } catch (error: any) {
      if (error.isAxiosError) {
        showErrorMessage(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <CoursesBackground>
      <h1
        className="text-xl md:text-4xl
           text-btn-orange font-bold"
      >
        Administrador
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <AdminCard
          heading="Gerenciar Usuários"
          to="students"
          description="Ver todas as pessoas cadastradas no sistema"
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
        <AdminCard
          heading="Cursos"
          to="courses"
          description="Ver todos os cursos cadastrados no sistema"
        />
      </div>
      <OrangeButton onClick={ handleSendReport } isLoading={ loading }>
        Gerar Relatório
      </OrangeButton>
    </CoursesBackground>
  );
}
