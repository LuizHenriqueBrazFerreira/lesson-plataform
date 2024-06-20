import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../services/requests';
import CoursesBackground from '../components/CoursesBackground';
import OrangeButton from '../components/OrangeButton';
import { PdfsType } from '../types/lessons';

function PdfPage() {
  const [pdfs, setPdfs] = useState<PdfsType[]>([]);

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
        console.log(pdfData);
        setPdfs(pdfData);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <CoursesBackground
        heading="PDFs"
        title="Aqui você encontra todos os PDFs disponíveis"
      >
        <div className="self-start">
          {
            pdfs.length > 0
              ? (pdfs?.map((pdf) => (
                <section
                  key={ pdf.path }
                  className="text-2xl lg:text-4xl text-btn-orange font-bold"
                >
                  <a
                    href={ pdf.path }
                    target="_blank"
                    rel="noreferrer"
                  >
                    { pdf.title }
                  </a>
                </section>
              )))
              : (
                pdfs.map((pdf) => (
                  <section
                    key={ pdf.path }
                    className="text-2xl lg:text-4xl text-btn-orange font-bold"
                  >
                    <a
                      href={ pdf.path }
                      target="_blank"
                      rel="noreferrer"
                    >
                      { pdf.title }
                    </a>
                  </section>
                ))
              )
          }
        </div>
        <OrangeButton
          onClick={ () => navigate(-1) }
        >
          Voltar
        </OrangeButton>
      </CoursesBackground>
    </div>
  );
}

export default PdfPage;
