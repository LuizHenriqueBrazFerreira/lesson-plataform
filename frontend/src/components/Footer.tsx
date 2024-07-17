import { Typography } from '@material-tailwind/react';
import { EnvelopeIcon, GlobeAltIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ensinofsmsss@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <footer className="w-full bg-white px-5 py-6 md:px-14">
      <div
        className="flex md:flex-row flex- items-center justify-center
      gap-y-6 gap-x-12 bg-white md:justify-between"
      >
        <img
          className="w-28 md:w-80"
          src="/src/assets/baudouin.png"
          alt="King Baudouin Foundation's Logo"
        />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-12">
          <li className="flex gap-2 items-center">
            <GlobeAltIcon className="w-6 h-6" />
            <Typography
              as="a"
              href="https://www.fsmsss.org/"
              target="_blank"
              color="blue-gray"
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
            >
              {t('Nosso Site')}
            </Typography>
          </li>
          <li className="flex gap-2 items-center">
            <img className="w-5 h-5" src="/src/assets/insta.png" alt="instagram logo" />
            <Typography
              as="a"
              href="https://www.instagram.com/fsm_saudeeseguridadesocial/"
              target="_blank"
              color="blue-gray"
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
            >
              {t('Instagram')}
            </Typography>
          </li>
          <li className="flex gap-2 items-center">
            <EnvelopeIcon className="w-6 h-6" />
            <Typography
              as="a"
              href="/support"
              color="blue-gray"
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
            >
              {t('Suporte Por Email')}
            </Typography>
          </li>
          <li className="flex gap-2 items-center">
            <ClipboardIcon className="w-6 h-6" />
            { showCopy && (
              <div
                className="absolute mb-14 ml-5 border border-black
              px-2 hidden md:block"
              >
                {copied ? 'Copiado!' : 'Clique para copiar'}
              </div>
            )}
            <Typography
              onMouseEnter={ () => setShowCopy(true) }
              onMouseLeave={ () => setShowCopy(false) }
              className="font-normal transition-colors
              hover:text-blue-500 focus:text-blue-500"
              as="button"
              onClick={ handleCopyEmail }
            >
              ensinofsmsss@gmail.com
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy;
        {' '}
        {`${new Date().getFullYear()} - King Baudouin Foundation`}
      </Typography>
    </footer>
  );
}

export default Footer;
