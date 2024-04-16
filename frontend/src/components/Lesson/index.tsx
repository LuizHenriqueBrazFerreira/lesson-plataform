import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lessons } from '../../types/lessons';
import { requestCreateLesson, requestUpdateLesson } from '../../services/requests';

type NewLessonProps = {
  newLesson: boolean
};

function Lesson({ newLesson = true }: NewLessonProps) {
  const [isNewLesson, setIsNewLesson] = useState<boolean>(true);
  const [lessonData, setLessonData] = useState<Lessons>({} as Lessons);
  const id = useParams();

  useEffect(() => {
    if (newLesson === false) setIsNewLesson(false);
  }, []);

  function handleChange({ target }:React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = target;
    const lesson = { [name]: value, ...lessonData };

    setLessonData(lesson);
  }

  async function handleClick() {
    if (isNewLesson === true) {
      const response = await requestCreateLesson('/lesson', lessonData);
      console.log(response.data);
    }

    const response = await requestUpdateLesson(`/lessons/${id}`, lessonData);
    console.log(response.data);
  }

  return (
    <div>
      <label htmlFor="title">Título</label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="content">Conteúdo</label>
      <input
        type="text"
        name="content"
        id="content"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="topic">Tópico</label>
      <input
        type="text"
        name="topic"
        id="topic"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="subtopic">Sub-tópico</label>
      <input
        type="text"
        name="subTopic"
        id="subtopic"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="image">Imagem</label>
      <input
        type="text"
        name="image"
        id="image"
        onChange={ (event) => handleChange(event) }
      />

      <button onClick={ handleClick }>{isNewLesson ? 'Cadastrar' : 'Alterar'}</button>
    </div>
  );
}

export default Lesson;
