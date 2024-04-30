import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { UserCourses } from '../../types/courseType';

type CourseCardProps = {
  course: UserCourses;
  index: number;
  handleBookmark: (id: number, bookmarked: boolean) => void;
};

function CourseCard({ course, index, handleBookmark }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      key={ index }
      className="w-80 lg:w-[37rem] lg:h-[17rem] m-4 select-none
                cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-btn-orange">Curso</h2>
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
          className="lg:text-3xl font-semibold"
        >
          {course.courseTitle}
          <div className="mt-8 flex items-center gap-4">
            <Progress
              size="sm"
              color="orange"
              value={ course.progress }
            />
            <Typography className="font-semibold">
              {course.progress}
              %
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default CourseCard;
