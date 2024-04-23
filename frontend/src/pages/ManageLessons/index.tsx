import Lesson from '../../components/Lesson';
import LoginBackground from '../../components/LoginBackground';

function ManageLessons() {
  return (
    <LoginBackground>
      <Lesson newLesson={ false } />
    </LoginBackground>
  );
}

export default ManageLessons;
