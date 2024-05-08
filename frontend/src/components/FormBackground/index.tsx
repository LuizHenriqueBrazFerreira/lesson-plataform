import { FormHTMLAttributes } from 'react';

type Children = {
  children: React.ReactNode;
  moreClasses?: string;
} & FormHTMLAttributes<HTMLFormElement>;

function FormBackground({ children, moreClasses = '', ...rest }: Children) {
  return (
    <form
      className={ `flex flex-col bg-white w-80 lg:w-[36rem] 
      p-9 lg:p-14 rounded-lg h-[70vh] lg:h-[90%] justify-evenly text-xs lg:text-base
      ${moreClasses}` }
      { ...rest }
    >
      { children }
    </form>
  );
}

export default FormBackground;
