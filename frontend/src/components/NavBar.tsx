/* eslint-disable react/jsx-max-depth */
import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavList from './NavList';



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
      className="px-0"
    >
      <div className="flex justify-end text-black">
        <div className="hidden md:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent
          focus:bg-transparent active:bg-transparent lg:hidden"
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
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
