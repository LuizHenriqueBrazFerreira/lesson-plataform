/* eslint-disable react/no-danger */
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PdfBar from '../../components/PdfButton';
import { LessonsType, INITIAL_LESSON } from '../../types/lessons';
import { requestData, setToken } from '../../services/requests';
import CoursesBackground from '../../components/CoursesBackground';
import OrangeButton from '../../components/OrangeButton';
import BreadCrumbs from '../../components/BreadCrumbs';
import ReadTextEditor from '../../components/ReadTextEditor';
import CourseContext from '../../context/CourseContext';

function LessonPage() {
  const { translateDynamicContent } = useContext(CourseContext);
  const [translatedModuleTitle, setTranslatedModuleTitle] = useState('');
  const [translatedLessonTitle, setTranslatedLessonTitle] = useState('');
  const [lessons, setLessons] = useState<LessonsType>(INITIAL_LESSON);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleId, lessonId } = useParams();

  async function translateObject() {
    try {
      const { content } = await requestData(`lesson/${lessonId}`);
      const lessonData = JSON.parse(content);
      const header1 = lessonData.blocks[0].data.text;
      const paragraph1 = lessonData.blocks[1].data.text;
      const paragraph2 = lessonData.blocks[3].data.text;
      const paragraph3 = lessonData.blocks[6].data.text;
      const header2 = lessonData.blocks[5].data.text;
      const textList = [header1, paragraph1, paragraph2, paragraph3, header2];
      const translatedLessonContent = await Promise.all(textList.map(async (text) => {
        return await translateDynamicContent(text);
      }));
      setLessons({
        ...lessonData,
        content: {
          ...lessonData.content,
          blocks: lessonData.content.blocks.map((block: any, index: number) => {
            switch (index) {
              case 0: // header1
                return { ...block, data: { ...block.data, text: translatedLessonContent[0] } };
              case 1: // paragraph1
                return { ...block, data: { ...block.data, text: translatedLessonContent[1] } };
              case 3: // paragraph2
                return { ...block, data: { ...block.data, text: translatedLessonContent[2] } };
              case 6: // paragraph3
                return { ...block, data: { ...block.data, text: translatedLessonContent[3] } };
              case 5: // header2
                return { ...block, data: { ...block.data, text: translatedLessonContent[4] } };
              default:
                return block;
            }
          }),
        },
      });
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const moduleData = await requestData(`module/${moduleId}`);
        const lessonData = await requestData(`lesson/${lessonId}`);
        const translatedModuleTitle = await translateDynamicContent(moduleData.title ?? moduleData.title);
        const translatedLessonTitle = await translateDynamicContent(lessonData.title ?? lessonData.title);
        setLessons(lessonData);
        await translateObject();
        setTranslatedModuleTitle(translatedModuleTitle);
        setTranslatedLessonTitle(translatedLessonTitle);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
        }
      }
    }

    fetchData();
  }, [translateDynamicContent]);

  return (
    <div>
      <CoursesBackground
        heading={ t('Modulo') }
        title={ translatedModuleTitle }
        moreClasses="gap-10"
        loading={ !translatedModuleTitle }
      >
        <BreadCrumbs lesssonTitle={ translatedLessonTitle } />
        <div className="flex md:flex-row flex-col md:justify-between md:items-center">
          <h1
            className="text-2xl md:text-4xl
              text-btn-orange font-bold"
          >
            { translatedLessonTitle }
          </h1>
          <PdfBar path={ pathname } />
        </div>
        <ReadTextEditor content={ lessons.content } />
        <OrangeButton
          onClick={ () => navigate(-1) }
        >
          {t('Voltar')}
        </OrangeButton>
      </CoursesBackground>
    </div>
  );
}

export default LessonPage;
