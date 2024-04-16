import { Navigate } from 'react-router-dom';
import LessonList from '../../components/LessonList';
import Lesson from '../../components/Lesson';

export default function AdminPage() {
  return (
    <>
      <div>
        <h2>Aulas</h2>
        <LessonList />
      </div>
      <div>
        <button>Criar nova aula</button>
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
