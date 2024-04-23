import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lessons } from '../../types/lessons';
import { requestCreateLesson, requestUpdateLesson } from '../../services/requests';

type NewLessonProps = {
  newLesson: boolean,
  lessonFromDB?: Lessons
};

function Lesson({ newLesson = true, lessonFromDB = {} as Lessons }: NewLessonProps) {
  const [isNewLesson, setIsNewLesson] = useState<boolean>(true);
  const [lessonData, setLessonData] = useState({
    title: '',
    content: '',
    image: '',
    topic: '',
    subTopic: '',
  } as Lessons);
  const { id } = useParams();

  useEffect(() => {
    if (newLesson === false) setIsNewLesson(false);
  }, []);

  function handleChange({ target }:React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = target;

    const lesson = { ...lessonData, [name]: value };
    console.log(value);

    setLessonData(lesson);
  }

  async function handleClick() {
    try {
      if (isNewLesson === true) {
        const response = await requestCreateLesson('/lessons', lessonData);
        console.log(lessonData);

        console.log(response);
      }

      const response = await requestUpdateLesson(`/lessons/${id}`, lessonData);
      console.log(response.data);
    } catch (error: any) {
      if (error.isAxiosError) console.error(error.response.data);
    }
  }

  return (
    <form onSubmit={ (e) => { e.preventDefault(); } } className="text-center">
      <label htmlFor="title" className="text-xl  ">Título</label>
      <input
        type="text"
        name="title"
        id="title"
        value={ lessonData.title }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px]"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="content" className="text-xl  ">Conteúdo</label>
      <input
        type="text"
        name="content"
        id="content"
        value={ lessonData.content }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px]"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="topic" className="text-xl  ">Tópico</label>
      <input
        type="text"
        name="topic"
        id="topic"
        value={ lessonData.topic }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px]"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="subtopic" className="text-xl  ">Sub-tópico</label>
      <input
        type="text"
        name="subTopic"
        id="subtopic"
        value={ lessonData.subTopic }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px]"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="image" className="text-xl  ">Link da video-aula</label>
      <input
        type="text"
        name="image"
        id="image"
        value={ lessonData.image }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px]"
        onChange={ (event) => handleChange(event) }
      />

      <button
        onClick={ handleClick }
        className="bg-white border-solid border-2
          border-btn-orange text-btn-orange w-2/3 h-10 self-center rounded-md"
      >
        {isNewLesson ? 'Cadastrar' : 'Alterar'}
      </button>
    </form>
  );
}

export default Lesson;
