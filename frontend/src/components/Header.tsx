import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import AdminNavBar from './AdminNavBar';
import NavBar from './NavBar';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const role = localStorage.getItem('role');

  return (
    <header
      className="max-h-[6rem] md:max-h-[8rem]
    px-5 py-6 md:px-14 flex justify-between font-['Nunito']"
    >
      <button onClick={ () => navigate('/') }>
        <img
          src="/src/assets/logo.png"
          alt="FSMSSS logo"
          className="w-36 md:w-full"
        />
      </button>
      { !token && (
        <div className="flex gap-4">
          <Button
            onClick={ () => navigate('/login') }
            className="w-32 h-6 md:h-12 bg-btn-orange
            my-3 md:rounded-md font-semibold text-xs md:text-base
            flex items-center justify-center"
          >
            Entrar
          </Button>
          <Button
            onClick={ () => navigate('/create-account') }
            className="bg-white border-2 border-btn-orange text-btn-orange
            w-34 h-6 md:h-12 my-3 md:rounded-md font-semibold text-xs
            md:text-base flex items-center justify-center"
          >
            Cadastrar
          </Button>
        </div>
      )}
      { role === 'STUDENT' && (<NavBar />)}

      { role === 'ADMIN' && (<AdminNavBar />)}
    </header>
  );
}

export default Header;
