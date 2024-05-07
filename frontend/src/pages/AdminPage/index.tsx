// import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import LessonList from '../../components/LessonList';
// import Lesson from '../../components/Lesson';
import LoginBackground from '../../components/LoginBackground';
import CreateLesson from '../../components/CreateLesson';
import CreateModule from '../../components/CreateModule';
import CreateCourse from '../../components/CreateCourse';

export default function AdminPage() {
  const [course, setCourse] = useState(false);
  const [module, setModule] = useState(false);
  const [lesson, setLesson] = useState(false);

  return (
    <LoginBackground>
      <input
        type="checkbox"
        name="course"
        id="course"
        placeholder="Criar um curso?"
        onClick={ () => setCourse(!course) }
      />
      <input
        type="checkbox"
        name="module"
        id="module"
        placeholder="Criar um módulo?"
        onClick={ () => setModule(!module) }
      />
      <input
        type="checkbox"
        name="lesson"
        id="lesson"
        placeholder="Criar uma aula?"
        onClick={ () => setLesson(!lesson) }
      />
      <div className="inline-flex">
        <div className="absolute left-[18%] top-[45%] items-center w-[430px]">
          <LessonList />
        </div>
        {course && <CreateCourse />}
        {module && <CreateModule />}
        {lesson && <CreateLesson />}
      </div>
    </LoginBackground>
  );
}
