import { useState } from 'react';
import { requestPost } from '../../services/requests';

function Course() {
  const [courseData, setCourseData] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCourseData(value);
  };

  return (
    <>
      <label htmlFor="title">Título do curso</label>
      <input
        type="text"
        name="course"
        id="course"
        value={ courseData }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />
      <button
        onClick={ () => requestPost('/courses', courseData) }
      >
        Cadastrar Módulo
      </button>

    </>
  );
}

export default Course;
