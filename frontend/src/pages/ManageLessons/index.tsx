import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Lesson from '../../components/Lesson';
import LoginBackground from '../../components/LoginBackground';
import RootContext from '../../context/main';

function ManageLessons() {
  const { lesson } = useContext(RootContext);
  const navigate = useNavigate();
  return (
    <LoginBackground>
      <Lesson newLesson={ false } lessonFromDB={ lesson } />
      <button
        className="bg-orange-400 p-1 mb-1 rounded-md
      text-slate-50 font-light text-base absolute left-[3%] top-[20%]"
        onClick={ () => navigate('/admin') }
      >
        Voltar a tela de administrador
      </button>
    </LoginBackground>
  );
}

export default ManageLessons;
