import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Button';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="px-[60px] py-[22px] flex justify-between font-['Nunito']">
      <Button onClick={ () => navigate('/') }>
        <img
          src="/src/assets/logo.png"
          alt="FSMSSS logo"
        />
      </Button>
      { pathname === '/' && (
        <Button
          onClick={ () => navigate('/login') }
          className="bg-btn-orange text-white rounded-md w-28 h-16 text-2xl font-semibold"
        >
          Entrar
        </Button>
      )}
    </header>
  );
}

export default Header;
