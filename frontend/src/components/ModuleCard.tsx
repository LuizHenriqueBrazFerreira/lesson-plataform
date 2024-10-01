import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CourseContext from '../context/CourseContext';
import { Module } from '../types/courseType';
import { requestData, setToken, requestUpdate } from '../services/requests';

type ModuleCardProps = {
  module: Module;
  index: number;
};

function ModuleCard({ module, index }: ModuleCardProps) {
  const userId = localStorage.getItem('userId');
  const [progress, setProgress] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [lessonsWatched, setLessonsWatched] = useState([]);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const { translateDynamicContent } = useContext(CourseContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const lessonsUrl = `/courses/${module.courseId}/modules/${module.id}/lessons`;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || !userId) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const watched = await requestData(`/watchedLessons/${userId}/${module.id}`);
        const total = await requestData(`/lessons/${module.id}`);
        const translated = await translateDynamicContent(module.title);
        setTranslatedTitle(translated);

        setLessonsWatched(watched);
        setTotalLessons(total.length);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [translateDynamicContent, i18n.language]);

  useEffect(() => {
    if (lessonsWatched.length > 0) {
      const watched = lessonsWatched.length;
      const percentage = (watched / totalLessons) * 100;
      setProgress(percentage);
    }

    async function updateProgress() {
      try {
        await requestUpdate('/modulesProgress', {
          userId,
          moduleId: module.id,
          progress,
        });
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }
    updateProgress();
  }, [lessonsWatched, totalLessons, progress, module.id, userId]);

  return (
    <Card
      className="w-96 md:w-[37rem] md:h-[17rem] m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2
            className="text-xl md:text-2xl font-semibold text-btn-orange"
          >
            {`${t('Modulo')} ${index + 1}`}
          </h2>
        </div>
        <div
          onClick={ () => navigate(lessonsUrl) }
          aria-hidden="true"
          className="md:text-3xl font-semibold"
        >
          {i18n.language === 'ptBR' ? module.title : translatedTitle}
          <div className="mt-20 flex items-center gap-4">
            <Progress
              size="sm"
              color="orange"
              value={ progress }
            />
            <Typography className="font-semibold">
              {progress}
              %
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ModuleCard;
