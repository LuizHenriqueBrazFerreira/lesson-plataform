import { Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

export default function NavList() {
  return (
    <ul
      className="mt-2 p-4 md:p-0 bg-white border-2 md:border-none
      md:flex flex-col md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6"
    >
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium text-xl"
      >
        <NavLink
          to="/courses"
          className="flex items-center justify-center
        hover:text-blue-500 transition-colors"
        >
          Meus Cursos
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium text-xl"
      >
        <NavLink
          to="/bookmarked"
          className="flex items-center justify-center
          hover:text-blue-500 transition-colors"
        >
          Cursos Salvos
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium text-xl"
      >
        <NavLink
          to="/profile"
          className="flex items-center justify-center
          hover:text-blue-500 transition-colors"
        >
          Meu Perfil
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium text-xl"
      >
        <NavLink
          to="/"
          className="flex items-center justify-center
          hover:text-blue-500 transition-colors"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </NavLink>
      </Typography>
    </ul>
  );
}
