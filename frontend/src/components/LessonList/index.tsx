import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lessons } from '../../types/lessons';
import { requestData } from '../../services/requests';

function LessonList() {
  const [lessonList, setLessonList] = useState<Lessons[]>([]);
  useEffect(() => {
    const requestLessons = async () => {
      const lessonsFromDB = await requestData('/lessons');

      setLessonList(lessonsFromDB);

      console.log(lessonList);
    };
    requestLessons();
  }, [setLessonList]);

  return (
    <div>
      {lessonList.map(({ title,
        content,
        image,
        subTopic,
        topic,
        id,
      }) => (
        <div key={ `${title}${Math.floor(Math.random() * 500 ** 2)}${topic}` }>
          <h2>{title}</h2>
          <h4>{topic}</h4>
          <h5>{subTopic}</h5>
          <h4>{content}</h4>
          <img src={ image } alt="lesson-img" />
          <button
            onClick={ () => { <Navigate to={ `/admin/manager/${id}` } />; } }
          >
            Gerenciar aula
          </button>
        </div>
      ))}
    </div>
  );
}

export default LessonList;
