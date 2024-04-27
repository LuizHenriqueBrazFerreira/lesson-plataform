import { useContext } from 'react';
import Lesson from '../../components/Lesson';
import LoginBackground from '../../components/LoginBackground';
import RootContext from '../../context/main';

function ManageLessons() {
  const { lesson } = useContext(RootContext);
  console.log(lesson);

  return (
    <LoginBackground>
      <Lesson newLesson={ false } lessonFromDB={ lesson } />
    </LoginBackground>
  );
}

export default ManageLessons;
