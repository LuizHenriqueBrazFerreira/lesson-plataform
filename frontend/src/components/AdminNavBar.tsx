/* eslint-disable react/jsx-max-depth */
import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const frontURL = import.meta.env.VITE_REACT_FRONT_URL;

const navList = (
  <ul
    className="mt-2 p-4 lg:p-0 bg-white border-2 lg:border-none
    lg:flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
  >
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium text-xl"
    >
      <a
        href={ `${frontURL}/admin` }
        className="flex items-center justify-center
       hover:text-blue-500 transition-colors"
      >
        Início
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium text-xl"
    >
      <a
        href={ `${frontURL}/admin/create` }
        className="flex items-center justify-center
       hover:text-blue-500 transition-colors"
      >
        Criar Cursos
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium text-xl"
    >
      <a
        href={ `${frontURL}/admin/edit` }
        className="flex items-center justify-center hover:text-blue-500 transition-colors"
      >
        Editar Cursos
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium text-xl"
    >
      <a
        href={ `${frontURL}/admin/students` }
        className="flex items-center justify-center hover:text-blue-500 transition-colors"
      >
        Estudantes
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium text-xl"
    >
      <a
        href={ `${frontURL}` }
        className="flex items-center justify-center hover:text-blue-500 transition-colors"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </a>
    </Typography>
  </ul>
);

function AdminNavBar() {
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
      className="px-0"
    >
      <div className="flex justify-end text-black">
        <div className="hidden lg:block">
          {navList}
        </div>
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent
          focus:bg-transparent active:bg-transparent md:hidden"
          ripple={ false }
          onClick={ () => setOpenNav(!openNav) }
        >
          {openNav ? (
            <XMarkIcon className="h-8 w-8" strokeWidth={ 2 } />
          ) : (
            <Bars3Icon className="h-8 w-8" strokeWidth={ 2 } />
          )}
        </IconButton>
      </div>
      <Collapse open={ openNav }>
        {navList}
      </Collapse>
    </Navbar>
  );
}

export default AdminNavBar;
