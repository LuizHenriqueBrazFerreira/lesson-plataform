import { useState } from 'react';
import { requestPost } from '../../services/requests';

function Module() {
  const initialModuleData = { title: '', courseTitle: '' };
  const [moduleData, setModuleData] = useState(initialModuleData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const newModuleData = { ...moduleData, [name]: value };
    setModuleData(newModuleData);
  };

  return (
    <div className="inline-flex flex-col text-center justify-center absolute top-[130px]">

      <label htmlFor="title" className="text-xl text-black ">Título do módulo</label>
      <input
        type="text"
        name="title"
        id="title"
        value={ moduleData.title }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center
        "
        onChange={ (event) => handleChange(event) }
      />
      <label htmlFor="course" className="text-xl text-black ">Título do curso</label>
      <input
        type="text"
        name="courseTitle"
        id="course"
        value={ moduleData.courseTitle }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />
      <button
        onClick={ () => requestPost('/modules', moduleData) }
        className=" bg-white border-solid border-2
          border-btn-orange text-btn-orange w-[140px] h-10 self-center rounded-md"
      >
        Cadastrar Módulo
      </button>

    </div>
  );
}

export default Module;
