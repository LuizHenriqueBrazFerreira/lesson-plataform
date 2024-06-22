import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import AdminNavBar from './AdminNavBar';
// import AdminBar from './AdminBar';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const role = localStorage.getItem('role');

  return (
    <header
      className="max-h-[6rem] lg:max-h-[8rem]
    px-5 py-6 lg:px-14 flex justify-between font-['Nunito']"
    >
      <button onClick={ () => navigate('/') }>
        <img
          src="/src/assets/logo.png"
          alt="FSMSSS logo"
          className="w-36 lg:w-full"
        />
      </button>
      { !token && (
        <div className="flex gap-4">
          <button
            onClick={ () => navigate('/login') }
            className="bg-btn-orange text-white rounded-md
            md:w-28 md:h-12 md:text-2xl p-2 font-semibold"
          >
            Entrar
          </button>
          <button
            onClick={ () => navigate('/create-account') }
            className="bg-btn-orange text-white rounded-md
            md:w-32 md:h-12 md:text-2xl p-2 md:p-0 font-semibold"
          >
            Cadastrar
          </button>
        </div>
      )}
      { role === 'STUDENT' && (<NavBar />)}

      { role === 'ADMIN' && (<AdminNavBar />)}
    </header>
  );
}

export default Header;
