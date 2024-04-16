import {
  useState,
  // useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types/courseType';

const mockCourse: Course = {
  id: 0,
  title: 'Geopolítica Brasileira',
  modules: [
    {
      id: 0,
      content: 'Conteúdo do Módulo 1',
      lessons: [
        {
          id: 0,
          title: 'Aula001',
          content: 'Conteúdo da Aula 1 do Módulo 1',
          link: 'https://www.example.com/aula001',
        },
        {
          id: 1,
          title: 'Aula002',
          content: 'Conteúdo da Aula 2 do Módulo 1',
          link: 'https://www.example.com/aula002',
        },
      ],
    },
    {
      id: 1,
      content: 'Conteúdo do Módulo 2',
      lessons: [
        {
          id: 0,
          title: 'Aula001',
          content: 'Conteúdo da Aula 1 do Módulo 2',
          link: 'https://www.example.com/aula001',
        },
        {
          id: 1,
          title: 'Aula002',
          content: 'Conteúdo da Aula 2 do Módulo 2',
          link: 'https://www.example.com/aula002',
        },
      ],
    },
  ],
};

function CourseModules() {
  const [course] = useState(mockCourse);

  return (
    <div>
      <section
        className="bg-bg-login w-full h-full flex justify-center items-center"
      >
        <h2>
          Curso
          <br />
          {course.title}
        </h2>
      </section>
      <main
        className="flex flex-col justify-center items-center
        space-y-8 bg-white h-[90%] w-1/3 p-14 rounded-md"
      >
        {
          course.modules.map((module, index) => (
            <section
              className="g-bg-login w-full h-full
              flex justify-center items-center bg-orange-300"
              key={ index }
            >
              <h2
                className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
              >
                <Link
                  to={ `http://localhost:3002/courses/${index}/modules/${index}` } // Podemos usar o nome também
                >
                  { `Módulo ${index + 1}` }
                  <br />
                  { `${module.content}` }
                </Link>
              </h2>

            </section>
          ))
        }
      </main>
    </div>
  );
}

export default CourseModules;
