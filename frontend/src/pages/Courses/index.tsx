import { useState, useEffect } from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import CoursesBackground from '../../components/CoursesBackground';
import { requestData, requestUpdate } from '../../services/requests';
import lessonsMock from './mock';
import Button from '../../components/Button';

function StudentCourses() {
  const [courses, setCourses] = useState(lessonsMock);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await requestData('/lessons');
        setCourses(data);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data.message);
        }
      }
    }

    fetchData();
  }, []);

  const handleBookmark = async (id: number, bookmarked: boolean) => {
    await requestUpdate(`/lessons/${id}`, { bookmarked: !bookmarked });
  };

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-xl lg:text-4xl
           text-btn-orange font-bold"
        >
          Meus Cursos
        </h1>
      </div>
      <div className="grid grid-cols-2">
        {
            courses.map((course, index) => (
              <Card
                key={ index }
                className="w-[37rem] h-[17rem] m-4"
              >
                <CardBody className="flex flex-col">
                  <div className="flex justify-between mb-10">
                    <h2 className="text-2xl font-semibold text-btn-orange">Curso</h2>
                    {course.bookmarked ? <BookmarkSolid className="size-6" />
                      : <BookmarkIcon className="size-6" />}
                  </div>
                  <div className="text-3xl">
                    {course.title}
                  </div>
                </CardBody>
              </Card>
            ))
          }
      </div>
    </CoursesBackground>
  );
}

export default StudentCourses;
