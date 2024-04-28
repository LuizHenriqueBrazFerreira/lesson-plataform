import { useState, useEffect } from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import CoursesBackground from '../../components/CoursesBackground';
import { requestData } from '../../services/requests';
import Button from '../../components/Button';

const courseExample1 = 'Sistemas Universais das Proteções Sociais';
const courseExample2 = 'Sistemas de Proteção Social na América Latina';
const courseExample3 = 'Sistemas de Proteção Social na Europa';

function StudentCourses() {
  const initialState = {
    courses: [courseExample1, courseExample2, courseExample3] };
  const [courses, setCourses] = useState<string[]>(initialState.courses);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(apiUser);
  //       setCourses(response.data);
  //     } catch (error) {
  //       console.error('Erro ao buscar cursos:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
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
                    {isBookmarked ? <BookmarkSolid className="size-6" />
                      : <BookmarkIcon className="size-6" />}
                  </div>
                  <div className="text-3xl">
                    {course}
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
