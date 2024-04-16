import {
  useState,
  // useEffect,
} from 'react';
// import axios from 'axios';
// import Button from '../../components/Button';
import { Link } from 'react-router-dom';

// const apiUser = import.meta.env.VITE_REACT_API_COURSES || 'http://localhost:3001/courses';
const courseExample1 = 'Sistemas Universais das Proteções Sociais';
const courseExample2 = 'Curso dois';
const courseExample3 = 'Curso três';

function StudentCourses() {
  const initialState = {
    courses: [courseExample1, courseExample2, courseExample3] };
  const [
    courses,
    // setCourses,
  ] = useState<string[]>(initialState.courses);
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
    <div>
      <h1 className="text-center mt-20">Meus Cursos</h1>
      <main className="bg-bg-login w-full h-full flex justify-center items-center">
        {
        courses.map((course, index) => (
          <section
            className="flex flex-col justify-evenly
            bg-white h-[90%] w-1/3 p-14 rounded-md"
            key={ index }
          >
            <div
              className="flex justify-between items-center bg-orange-300"
            >
              <h4>Curso</h4>
              {isBookmarked ? (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                  onClick={ toggleBookmark }
                >
                  <path
                    d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0
                    19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 20"
                  onClick={ toggleBookmark }
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
                  />
                </svg>
              )}
            </div>

            <h2
              className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
            >
              <Link
                to={ `http://localhost:3002/courses/${index}/modules` } // Podemos usar o nome também
              >
                {course}
              </Link>
            </h2>
          </section>
        ))
      }
      </main>
    </div>
  );
}

export default StudentCourses;
