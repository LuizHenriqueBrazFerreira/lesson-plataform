import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrangeButton from '../../components/OrangeButton';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'EduActiva - 404';
  }, []);

  return (
    <div
      className="w-screen h-[60vh] flex flex-col justify-center items-center"
    >
      <h1 className="text-3xl font-bold mb-20">Erro 404 - Página não encontrada</h1>
      <p className="text-xl">
        A página que você está procurando não foi encontrada.
        Por favor, verifique o endereço digitado ou clique no botão
        abaixo para retornar à página inicial.
      </p>
      <OrangeButton onClick={ () => navigate('/') } moreClasses="mt-10">
        Página inicial
      </OrangeButton>
    </div>
  );
}

export default NotFound;
