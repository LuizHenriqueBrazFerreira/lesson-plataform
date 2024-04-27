import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lessons } from '../../types/lessons';
import { requestCreateLesson, deleteLesson,
  requestUpdateLesson } from '../../services/requests';

type NewLessonProps = {
  newLesson: boolean,
  lessonFromDB?: Lessons
};

function Lesson({ newLesson = true, lessonFromDB = {} as Lessons }: NewLessonProps) {
  const initialForm = {
    title: '',
    content: '',
    image: '',
    topic: '',
    subTopic: '',
  };

  const navigate = useNavigate();
  const [isNewLesson, setIsNewLesson] = useState<boolean>(true);
  const [lessonData, setLessonData] = useState(initialForm as Lessons);
  const { id } = useParams();

  useEffect(() => {
    if (newLesson === false) setIsNewLesson(false);
    if (Object.values(lessonFromDB).length !== 0) setLessonData(lessonFromDB);
  }, []);

  function handleChange({ target }:React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = target;

    const lesson = { ...lessonData, [name]: value };
    // console.log(value);

    setLessonData(lesson);
  }
  // console.log(lessonFromDB);

  async function handleClick() {
    try {
      if (isNewLesson === true) {
        const response = await requestCreateLesson('/lessons', lessonData);

        console.log(response);
      }

      const response = await requestUpdateLesson(`/lessons/${id}`, lessonData);
      console.log(response.data);
    } catch (error: any) {
      if (error.isAxiosError) console.error(error.response.data);
    }

    setLessonData(initialForm);
  }

  return (
    <form onSubmit={ (e) => { e.preventDefault(); } } className="text-center w-[250px]">
      <label htmlFor="title" className="text-xl  ">Título</label>
      <input
        type="text"
        name="title"
        id="title"
        value={ lessonData.title }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="content" className="text-xl  ">Conteúdo</label>
      <input
        type="text"
        name="content"
        id="content"
        value={ lessonData.content }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="topic" className="text-xl  ">Tópico</label>
      <input
        type="text"
        name="topic"
        id="topic"
        value={ lessonData.topic }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="subtopic" className="text-xl  ">Sub-tópico</label>
      <input
        type="text"
        name="subTopic"
        id="subtopic"
        value={ lessonData.subTopic }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="image" className="text-xl  ">Link da video-aula</label>
      <input
        type="text"
        name="image"
        id="image"
        value={ lessonData.image }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />

      <button
        onClick={ handleClick }
        className="bg-white border-solid border-2
          border-btn-orange text-btn-orange w-[125px] h-10 self-center rounded-md"
      >
        {isNewLesson ? 'Cadastrar' : 'Alterar'}
      </button>

      {newLesson === true ? (<div />)
        : (
          <button
            onClick={ () => { deleteLesson(`/lessons/${id}`); navigate('/admin'); } }
            className=" bg-white border-solid border-2
          border-btn-orange text-btn-orange w-[125px] h-10 self-center rounded-md"
          >
            Deletar aula
          </button>)}
    </form>
  );
}

export default Lesson;
