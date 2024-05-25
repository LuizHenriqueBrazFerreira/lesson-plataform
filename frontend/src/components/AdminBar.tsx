import { useContext, useState } from 'react';
import RootContext from '../context/main';
import { Status } from '../types/lessons';

function AdminBar() {
  const { changeStatus } = useContext(RootContext);

  const [checkState, setCheckState] = useState(false);

  const handleState = (data: 'course' | 'module' | 'lesson') => {
    changeStatus({ course: false, module: false, lesson: false, active: false });
    switch (data) {
      case 'course':
        setCheckState(!checkState);
        changeStatus({ course: true, module: false, lesson: false, active: checkState });
        break;
      case 'module':

        setCheckState(!checkState);
        changeStatus({ course: false, module: true, lesson: false, active: checkState });
        break;
      case 'lesson':

        setCheckState(!checkState);
        changeStatus({ course: false, module: false, lesson: true, active: checkState });
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex text-xs flex-col lg:flex-row
      gap-1 lg:text-sm justify-between items-center"
    >
      <label
        htmlFor="course"
        className="hover:text-slate-600 cursor-pointer"
      >
        Cadastrar um curso
      </label>
      <input
        type="checkbox"
        name="course"
        id="course"
        hidden
        className="hover:bg-red-950"
        onClick={ () => handleState('course') }
      />
      <label
        htmlFor="module"
        className="hover:text-slate-600 cursor-pointer"
      >
        Cadastrar um módulo
      </label>

      <input
        type="checkbox"
        name="module"
        id="module"
        hidden
        onClick={ () => handleState('module') }
      />
      <label
        htmlFor="lesson"
        className="hover:text-slate-600 cursor-pointer"
      >
        Cadastrar uma aula
      </label>
      <input
        type="checkbox"
        name="lesson"
        id="lesson"
        hidden
        onClick={ () => handleState('lesson') }
      />
    </div>
  );
}

export default AdminBar;
