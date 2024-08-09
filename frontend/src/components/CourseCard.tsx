import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { ModulesProgress, UserCourses } from '../types/courseType';
import { requestData, requestUpdate } from '../services/requests';
import { useTranslation } from "react-i18next";

type CourseCardProps = {
  course: UserCourses;
  index: number;
  handleBookmark?: (id: number, bookmarked: boolean) => void;
};

function CourseCard({ course, index, handleBookmark = () => '' }: CourseCardProps) {
  const [modulesProgress, setModulesProgress] = useState<ModulesProgress[]>([]);
  const [courseProgress, setCourseProgress] = useState(course.progress);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchProgress() {
      if (userId === '1') return;
      try {
        const data = await requestData(
          `/modulesProgress/${course.userId}/${course.courseId}`,
        );
        setModulesProgress(data);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }

    fetchProgress();
  }, [course.userId, course.courseId, userId]);

  useEffect(() => {
    let courseP = 0;
    if (userId === '1') return;
    if (modulesProgress.length > 0) {
      const progress = modulesProgress.reduce((acc, module) => acc + module.progress, 0);
      const totalModules = modulesProgress.length;
      courseP = Math.round(progress / totalModules);
    }

    setCourseProgress(courseP);

    async function updateCourseProgress() {
      try {
        await requestUpdate('/user-courses', {
          key: 'progress',
          value: courseP.toString(),
          userId: course.userId,
          courseId: course.courseId,
        });
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error('Erro no cálculo:', error);
        }
      }
    }
    updateCourseProgress();
  }, []);

  const handleNavigate = () => {
    const subscribed = JSON.parse(localStorage.getItem('subscribedCourses') ?? '{}');
    subscribed[course.courseId] = course.subscribed;
    localStorage.setItem('subscribedCourses', JSON.stringify(subscribed));
    navigate(`/courses/${course.courseId ?? course.id}/modules`);
  };

  return (
    <Card
      key={ index }
      className="w-96 md:w-[37rem] md:h-[17rem] m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-btn-orange">{t("Curso")}</h2>
          {course.bookmarked ? <BookmarkSolid
            className="size-6 lg:size-7 text-btn-orange"
            onClick={ () => handleBookmark(course.courseId, course.bookmarked) }
          />
            : <BookmarkIcon
                className="size-6 lg:size-7"
                onClick={ () => handleBookmark(
                  course.courseId,
                  course.bookmarked,
                ) }
            />}
        </div>
        <div
          onClick={ handleNavigate }
          aria-hidden="true"
          className="md:text-3xl font-semibold"
        >
          {course.courseTitle ?? course.title}
          <div className="mt-8 flex items-center gap-4">
            <Progress
              size="sm"
              color="orange"
              value={ courseProgress }
            />
            <Typography className="font-semibold">
              { `${courseProgress ?? 0}%`}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default CourseCard;
