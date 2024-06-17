import { Typography } from '@material-tailwind/react';

function Footer() {
  return (
    <footer className="w-full bg-white px-5 py-6 lg:px-14">
      <div
        className="flex flex-row flex-wrap items-center justify-center
      gap-y-6 gap-x-12 bg-white text-center md:justify-between"
      >
        <img
          className="w-28 lg:w-80"
          src="/src/assets/baudouin.png"
          alt="King Baudouin Foundation's Logo"
        />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="https://www.fsmsss.org/"
              target="_blank"
              color="blue-gray"
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
            >
              Nosso site
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="https://www.instagram.com/fsm_saudeeseguridadesocial/"
              target="_blank"
              color="blue-gray"
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
            >
              Instagram
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/support"
              color="blue-gray"
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
            >
              Suporte por email
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy;
        {' '}
        { new Date().getFullYear() }
        {' '}
        King Baudouin Foundation
      </Typography>
    </footer>
  );
}

export default Footer;
