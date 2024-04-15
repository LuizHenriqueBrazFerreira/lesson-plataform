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
            <div className="flex justify-between items-center">
              <h4>Curso</h4>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
                />
              </svg>
            </div>

            <h2
              className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
            >
              <Link
                to={ `http://localhost:3001/courses/${index}` } // Podemos usar o nome também
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
