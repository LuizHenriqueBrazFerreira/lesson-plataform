import { useState } from 'react';
import { requestPost } from '../../services/requests';

function Course() {
  const [courseData, setCourseData] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCourseData(value);
  };

  return (
    <div className="inline-flex flex-col relative items-center top-[150px] right-[]">
      <label
        htmlFor="title"
        className="text-black text-xl"
      >
        Título do curso
      </label>
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
        className=" bg-white border-solid border-2
          border-btn-orange text-btn-orange w-[125px] h-10 self-center rounded-md"
      >
        Cadastrar curso
      </button>

    </div>
  );
}

export default Course;
