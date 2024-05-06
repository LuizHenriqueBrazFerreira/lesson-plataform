import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const userId = localStorage.getItem('userId');

const navList = (
  <ul
    className="my-2 flex flex-col gap-2
  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
  >
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <a
        href={ `${import.meta.env.VITE_REACT_FRONT_URL}/courses/${userId}` }
        className="flex items-center
       hover:text-blue-500 transition-colors"
      >
        Meus Cursos
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <a
        href={ `${import.meta.env.VITE_REACT_FRONT_URL}/courses/saved/${userId}`}
        className="flex items-center hover:text-blue-500 transition-colors"
      >
        Cursos Salvos
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <a
        href={ `${import.meta.env.VITE_REACT_FRONT_URL}/profile/${userId}` }
        className="flex items-center hover:text-blue-500 transition-colors"
      >
        Meu Perfil
      </a>
    </Typography>
  </ul>
);

function NavBar() {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      shadow={ false }
      fullWidth={ false }
      className="mx-auto max-w-screen-xl px-6 py-3"
    >
      <div className="flex items-center justify-end text-black">
        <div className="hidden lg:block">
          {navList}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent
          focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={ false }
          onClick={ () => setOpenNav(!openNav) }
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={ 2 } />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={ 2 } />
          )}
        </IconButton>
      </div>
      <Collapse open={ openNav }>
        {navList}
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
