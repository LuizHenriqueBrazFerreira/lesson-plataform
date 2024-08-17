import { Card, CardBody, Checkbox } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { LessonsType } from '../types/lessons';
import { requestUpdate, setToken, requestData } from '../services/requests';
import { useTranslation } from "react-i18next";
import CourseContext from '../context/CourseContext';

type LessonsCardProps = {
  lesson: LessonsType;
  lessonsUrl: string;
  index: number;
};

function LessonsCard({ lesson, lessonsUrl, index }: LessonsCardProps) {
  const { translateDynamicContent } = useContext(CourseContext);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [isWatched, setIsWatched] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!token || !userId) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const data = await requestData(`/watchedLesson/${userId}/${lesson.id}`);
        if (data) {
          setIsWatched(data.watched);
        }
        const translatedTitle = await translateDynamicContent(lesson.title ?? lesson.title);
        setTranslatedTitle(translatedTitle);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [translateDynamicContent]);

  const updateWatched = async () => {
    try {
      await requestUpdate(
        '/watchedLessons',
        { userId, lessonId: lesson.id, watched: !isWatched },
      );

      setIsWatched(!isWatched);
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  return (
    <Card
      className="w-96 md:w-[37rem] md:h-[17rem] m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-btn-orange">
            {`${t("Aula")} ${index + 1}`}
          </h2>
          <div className="flex items-center text-xl font-semibold  text-btn-orange">
            {t("Ja estudei")}
            <Checkbox
              crossOrigin={ undefined }
              color="orange"
              onChange={ updateWatched }
              checked={ isWatched }
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          onClick={ () => navigate(`${lessonsUrl}/${lesson.id}`) }
          className="lg:text-3xl font-semibold text-left
          grow h-[9rem]"
        >
          {translatedTitle}
        </div>
      </CardBody>
    </Card>
  );
}
export default LessonsCard;
