import axios from 'axios';

const API_KEY = 'AIzaSyCPdiX1LhQpGqfpMKMyKdEMvXU1HKtBA0w';

export const translatePortuguese = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    if (targetLanguage === 'ptBR') {
      return text;
    };
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      {},
      {
        params: {
          q: text,
          target: 'pt',
          key: API_KEY,
        },
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Erro ao traduzir o texto:', error);
    throw error;
  }
};