import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './translations/ptBR.json';
import es from './translations/es.json';
import us from './translations/us.json';
import fr from './translations/fr.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'pt-BR',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: us,
        es: es,
        fr: fr,
        ptBR: ptBR
    }
});

export default i18n;