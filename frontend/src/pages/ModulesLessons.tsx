import {
  useState,
  // useEffect,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course, Module } from '../types/courseType';

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

function DinamicModules() {
  const { id } = useParams<{ id: string }>();
  const [course] = useState<Course>(mockCourse);
  const module: Module | undefined = course.modules
    .find((m) => m.id.toString() === id);

  if (!module) {
    return <div>Módulo não encontrado</div>;
  }

  return (
    <div>
      <section
        className="bg-bg-login w-full h-full flex justify-center items-center"
      >
        <h2>
          Módulo
          {module.id + 1}
          <br />
          {module.content}
        </h2>
      </section>
      <main className="bg-white h-[90%] w-1/3 p-14 rounded-md">
        <h3>Aulas</h3>
        <section>
          {course.modules.map((modules) => (
            modules.lessons.map((lesson) => (
              <Link
                key={ lesson.id }
                to={ `http://localhost:3002/courses/${course.id}/modules/${modules.id}/lessons/${lesson.id}` }
              >
                <section
                  key={ lesson.id }
                >
                  <h2>
                    {lesson.title}
                  </h2>
                  <p>
                    {lesson.content}
                  </p>
                </section>
              </Link>
            ))
          ))}
        </section>
      </main>
    </div>
  );
}

export default DinamicModules;
