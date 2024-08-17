import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { requestData, setToken } from '../../services/requests';
import CoursesBackground from '../../components/CoursesBackground';
import OrangeButton from '../../components/OrangeButton';
import { PdfsType } from '../../types/lessons';
import CourseContext from '../../context/CourseContext';

function PdfPage() {
  const { translateDynamicContent } = useContext(CourseContext);
  const [translatedTitles, setTranslatedTitles] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<PdfsType[]>([]);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { lessonId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const pdfData = await requestData(`pdfs/${lessonId}`);
        const translatedTitles = await Promise.all(pdfData.map(async (pdf: any) => {
          return await translateDynamicContent(pdf.title);
        }));
        console.log(translatedTitles);
        setTranslatedTitles(translatedTitles);
        console.log(pdfData);
        setPdfs(pdfData);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, [translateDynamicContent]);

  return (
    <div>
      <CoursesBackground>
        <h1 className="text-xl md:text-4xl text-btn-orange font-bold mb-10">
          {t('Arquivos Pdf')}
        </h1>
        {pdfs.length > 0 ? (
          <div className="flex flex-col flex-wrap gap-4 text-xl grow">
            {pdfs.map((pdf, index) => (
              <div key={ pdf.id } className="flex gap-4 items-center">
                <a
                  href={ pdf.path }
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold flex gap-2 items-center
                  hover:text-btn-orange transition-colors"
                >
                  <DocumentTextIcon className="w-8 h-8 text-btn-orange" />
                  {translatedTitles[index]}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">
            {t('Não há arquivos PDF disponíveis para esta aula')}
          </p>
        )}
        <OrangeButton
          onClick={ () => navigate(-1) }
        >
          {t('Voltar')}
        </OrangeButton>
      </CoursesBackground>
    </div>
  );
}

export default PdfPage;
