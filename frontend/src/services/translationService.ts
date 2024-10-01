import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_API_KEY;

const translateText = async (text: string, targetLanguage: string) => {
  try {
    if (targetLanguage === 'ptBR') {
      return text;
    }
    const response = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {
        params: {
          q: text,
          target: targetLanguage,
          key: API_KEY,
        },
      },
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Erro ao traduzir o texto:', error);
    throw error;
  }
};

export { translateText };
