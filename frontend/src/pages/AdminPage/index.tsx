// import { Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import LessonList from '../../components/LessonList';
// import Lesson from '../../components/Lesson';
import LoginBackground from '../../components/LoginBackground';
import CreateLesson from '../../components/CreateLesson';
import CreateModule from '../../components/CreateModule';
import CreateCourse from '../../components/CreateCourse';
import RootContext from '../../context/main';

export default function AdminPage() {
  const { status } = useContext(RootContext);

  return (
    <LoginBackground>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <div
          className="justify-start w-[400px] h-[200px] lg:justify-start lg:w-[430px]"
        >
          <LessonList />
        </div>
        <div className="">
          {(status.course && status.active) && <CreateCourse />}
          {(status.module && status.active) && <CreateModule />}
          {(status.lesson && status.active) && <CreateLesson />}
        </div>
      </div>
    </LoginBackground>
  );
}
