// import { Navigate } from 'react-router-dom';
import LessonList from '../../components/LessonList';
import Lesson from '../../components/Lesson';
import LoginBackground from '../../components/LoginBackground';

export default function AdminPage() {
  return (
    <LoginBackground>
      <div className="inline-flex ">
        <div>
          <LessonList />
        </div>
        <section
          className="inline-flex justify-center absolute top-[19%] right-[10%] w-1/4 "
        >
          <Lesson newLesson />
        </section>
      </div>
    </LoginBackground>
  );
}
