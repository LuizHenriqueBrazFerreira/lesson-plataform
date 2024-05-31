function Footer() {
  return (
    <footer className="px-5 py-6 lg:px-14 flex justify-between">
      <img
        className="w-28 lg:w-80 mb-4"
        src="/src/assets/baudouin.png"
        alt="King Baudouin Foundation's Logo"
      />
      <ul className="text-sm space-y-2">
        <li>
          <strong>Nosso site:</strong>
          {' '}
          <a href="https://www.fsmsss.org/" target="_blank" rel="noopener noreferrer">https://www.fsmsss.org/</a>
        </li>
        <li>
          <strong>Instagram:</strong>
          {' '}
          <a href="https://www.instagram.com/fsm_saudeeseguridadesocial" target="_blank" rel="noopener noreferrer">@fsm_saudeeseguridadesocial</a>
        </li>
        <li>
          <strong>Email do curso:</strong>
          {' '}
          <a href="mailto:ensinofsmsss@gmail.com">ensinofsmsss@gmail.com</a>
        </li>
        <li>
          <strong>Email da instituição:</strong>
          {' '}
          <a
            href="mailto:forumsocialmundialsss@gmail.com"
          >
            forumsocialmundialsss@gmail.com
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
