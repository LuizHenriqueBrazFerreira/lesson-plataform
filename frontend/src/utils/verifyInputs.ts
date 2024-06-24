import { requestPost } from '../services/requests';

export const verifyModules = async (oldModules: any, newModules: any) => {
  if (newModules.length > oldModules.length) {
    const modulesData = newModules.filter((module:any) => !oldModules.includes(module));

    try {
      if (modulesData.length > 0) {
        await Promise.all((modulesData.map(async (module:any) => {
          await requestPost('/modules', module);
        })));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const verifyLessons = async (oldLessons: any, newLessons: any) => {
  if (newLessons.length > oldLessons.length) {
    const lessonsData = newLessons.filter((lesson:any) => !oldLessons.includes(lesson));

    try {
      await Promise.all((lessonsData.map(async (lesson:any) => {
        await requestPost('/lessons', lesson);
      })));
    } catch (error) {
      console.log(error);
    }
  }
};

export const verifyPdfs = async (oldPdfs: any, newPdfs: any) => {
  if (newPdfs.length > oldPdfs.length) {
    const pdfsData = newPdfs.filter((pdf:any) => !oldPdfs.includes(pdf));

    try {
      await Promise.all((pdfsData.map(async (pdf:any) => {
        await requestPost('/pdfs', pdf);
      })));
    } catch (error) {
      console.log(error);
    }
  }
};
