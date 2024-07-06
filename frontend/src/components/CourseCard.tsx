import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { ModulesProgress, UserCourses } from '../types/courseType';
import { requestData, requestUpdate } from '../services/requests';

type CourseCardProps = {
  course: UserCourses;
  index: number;
  handleBookmark?: (id: number, bookmarked: boolean) => void;
};

function CourseCard({ course, index, handleBookmark = () => '' }: CourseCardProps) {
  const [modulesProgress, setModulesProgress] = useState<ModulesProgress[]>([]);
  const [courseProgress, setCourseProgress] = useState(course.progress);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProgress() {
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
  }, [course.userId, course.courseId]);

  useEffect(() => {
    let courseP = 0;
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
  }, [modulesProgress, course]);

  return (
    <Card
      key={ index }
      className="w-80 md:w-[37rem] md:h-[17rem] m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-btn-orange">Curso</h2>
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
          onClick={ () => navigate(`/courses/${course.courseId}/modules`) }
          aria-hidden="true"
          className="md:text-3xl font-semibold"
        >
          {course.courseTitle}
          <div className="mt-8 flex items-center gap-4">
            <Progress
              size="sm"
              color="orange"
              value={ courseProgress }
            />
            <Typography className="font-semibold">
              { `${courseProgress}%`}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default CourseCard;
