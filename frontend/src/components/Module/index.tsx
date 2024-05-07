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
    <>
      <label htmlFor="title">Título do módulo</label>
      <input
        type="text"
        name="title"
        id="title"
        value={ moduleData.title }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />
      <label htmlFor="title">Título do curso</label>
      <input
        type="text"
        name="course"
        id="course"
        value={ moduleData.courseTitle }
        className="bg-neutral-200  rounded-md w-full h-10 p-1 my-[10px] text-center"
        onChange={ (event) => handleChange(event) }
      />
      <button
        onClick={ () => requestPost('/modules', moduleData) }
      >
        Cadastrar Módulo
      </button>

    </>
  );
}

export default Module;
