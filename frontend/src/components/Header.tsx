import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import AdminNavBar from './AdminNavBar';
import AdminBar from './AdminBar';

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
      { pathname !== '/login' && !token ? (
        <button
          onClick={ () => navigate('/login') }
          className="bg-btn-orange text-white rounded-md w-28 h-12 text-2xl font-semibold"
        >
          Entrar
        </button>
      ) : null}
      { role === 'STUDENT' ? (
        <NavBar />
      ) : null}

      { role === 'ADMIN' && (<AdminNavBar />)}
    </header>
  );
}

export default Header;
