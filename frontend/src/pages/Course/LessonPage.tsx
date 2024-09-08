/* eslint-disable react/no-danger */
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PdfBar from '../../components/PdfButton';
import { LessonsType, INITIAL_LESSON, ContentType } from '../../types/lessons';
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
  const [translatedContent, setTranslatedContent] = useState('');
  const [lessons, setLessons] = useState<LessonsType>(INITIAL_LESSON);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleId, lessonId } = useParams();

  async function translateObject() {
    try {
      const { content } = lessons;
      const contentObject = JSON.parse(content);
      const filteredTexts = contentObject.blocks.map(async (block: any) => {
        if (block.type === 'paragraph' || block.type === 'header') {
          if (block.data.text) {
            const translatedText = await translateDynamicContent(block.data.text);
            return { ...block, data: { ...block.data, text: translatedText } };
          }
        }
        return block;
      });
      const translatedBlocks = await Promise.all(filteredTexts);
      const newContent = { ...contentObject, blocks: translatedBlocks };
      const stringContent = JSON.stringify(newContent);
      setTranslatedContent(stringContent);
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    document.title = 'EduActiva - Aula';
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
        setTranslatedModuleTitle(translatedModuleTitle);
        setTranslatedLessonTitle(translatedLessonTitle);
        if (i18n.language !== 'pt-BR') {
          await translateObject();
        }
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
        <ReadTextEditor content={ translatedContent ? translatedContent : lessons.content } />
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
