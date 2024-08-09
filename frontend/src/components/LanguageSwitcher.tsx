import { useTranslation } from 'react-i18next';

const languageOptions = [
  {
    name: 'Português',
    value: 'ptBR',
  },
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Español',
    value: 'es',
  },
  {
    name: 'Français',
    value: 'fr',
  },
];

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const handleChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div
      className="border-2 border-btn-orange rounded-md
        md:py-3 md:px-10 py-2 text-sm flex flex-col items-center w-30
        text-btn-orange font-bold"
    >
      <span>{t('Idioma')}</span>
      <select onChange={ handleChange }>
        {languageOptions.map((lang) => (
          <option key={ lang.value } value={ lang.value }>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
