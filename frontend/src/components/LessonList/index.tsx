import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '@material-tailwind/react';
import { Lessons } from '../../types/lessons';
import { requestData } from '../../services/requests';
import RootContext from '../../context/main';

function LessonList() {
  const { lesson, changeLesson } = useContext(RootContext);
  const [lessonList, setLessonList] = useState<Lessons[]>([] as Lessons[]);
  const navigate = useNavigate();

  useEffect(() => {
    const requestLessons = async () => {
      const lessonsFromDB = await requestData('/lessons');

      setLessonList(lessonsFromDB.data);

      console.log(lessonList);
    };
    requestLessons();
  }, []);

  const handleClick = (
    id: any,
    lessons: Lessons,
  ) => {
    changeLesson(lessons);
    navigate(`/admin/manager/${id}`);
    // console.log(`context => ${lesson}`);

    // console.log('voce chamou aqui');
  };

  return (
    <Carousel className="rounded-md">
      {lessonList.map(({ title,
        content,
        image,
        moduleTitle,
        link,
        id,
      }) => (
        <div
          key={ `${title}${Math.floor(Math.random() * 500 ** 2)}${moduleTitle}` }
          className="m-2 w-[400px] h-[170px] border-black
          border rounded-lg text-center bg-bg-login p-1 justify-center"
        >
          <h2 className="m-[1px] text-base text-white">{title}</h2>
          <h5 className="m-[1px] text-base text-white">{moduleTitle}</h5>
          <h4 className="m-[1px] text-base text-white">{content}</h4>
          <img src={ image } alt="nameImg" />
          <button
            onClick={ () => handleClick(
              id,
              { title, content, image, moduleTitle, link, id },
            ) }
            className="bg-orange-400 p-1 mb-1 rounded-md text-slate-50 font-light
            text-base"
          >
            Gerenciar aula
          </button>
        </div>
      ))}
    </Carousel>

  );
}

export default LessonList;
