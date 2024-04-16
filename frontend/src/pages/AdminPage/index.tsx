import { Navigate } from 'react-router-dom';
import LessonList from '../../components/LessonList';
import Lesson from '../../components/Lesson';

export default function AdminPage() {
  return (
    <>
      <div>
        <h2>Aulas</h2>
        <LessonList>
          <button
            onClick={ () => { <Navigate to="/admin/manage" />; } }
          >
            Gerenciar aula
          </button>
        </LessonList>
      </div>
      <div>
        <h3>Criar nova aula</h3>
        <Lesson newLesson />
      </div>
      <section>
        <button
          onClick={ () => { <Navigate to="/admin/manage" />; } }
        >
          Gerenciar aulas
        </button>
      </section>
    </>
  );
}
