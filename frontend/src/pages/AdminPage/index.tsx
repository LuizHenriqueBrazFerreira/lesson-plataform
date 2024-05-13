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
  const [checkState, setCheckState] = useState(false);

  const handleState = (data: 'course' | 'module' | 'lesson') => {
    setCheckState(false);

    switch (data) {
      case 'course':
        setModule(false);
        setLesson(false);
        setCourse(true);
        setCheckState(true);
        if (checkState === true) setCheckState(false);
        break;
      case 'module':
        setCourse(false);
        setLesson(false);
        setModule(true);
        setCheckState(true);
        if (checkState === true) setCheckState(false);
        break;
      case 'lesson':
        setCourse(false);
        setModule(false);
        setLesson(true);
        setCheckState(true);
        if (checkState === true) setCheckState(false);
        break;
      default:
        break;
    }
  };

  return (
    <LoginBackground>
      <div className="flex absolute top-[12%] justify-between w-[500px]">
        <label
          htmlFor="course"
          className="hover:text-slate-600 cursor-pointer"
        >
          Cadastrar um curso
        </label>
        <input
          type="checkbox"
          name="course"
          id="course"
          hidden
          className="hover:bg-red-950"
          onClick={ () => handleState('course') }
        />
        <label
          htmlFor="module"
          className="hover:text-slate-600 cursor-pointer"
        >
          Cadastrar um módulo
        </label>

        <input
          type="checkbox"
          name="module"
          id="module"
          hidden
          onClick={ () => handleState('module') }
        />
        <label
          htmlFor="lesson"
          className="hover:text-slate-600 cursor-pointer"
        >
          Cadastrar uma aula
        </label>
        <input
          type="checkbox"
          name="lesson"
          id="lesson"
          hidden
          onClick={ () => handleState('lesson') }
        />
      </div>

      <div className="inline-flex">
        <div className="absolute left-[18%] top-[45%] items-center w-[430px]">
          <LessonList />
        </div>
        {(course && checkState) && <CreateCourse />}
        {(module && checkState) && <CreateModule />}
        {(lesson && checkState) && <CreateLesson />}
      </div>
    </LoginBackground>
  );
}
