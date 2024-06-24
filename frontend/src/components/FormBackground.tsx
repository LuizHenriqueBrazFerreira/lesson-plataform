import { FormHTMLAttributes } from 'react';

type Children = {
  children: React.ReactNode;
  moreClasses?: string;
} & FormHTMLAttributes<HTMLFormElement>;

function FormBackground({ children, moreClasses = '', ...rest }: Children) {
  return (
    <form
      className={ `flex flex-col bg-white w-80 md:w-[36rem] 
      p-9 md:p-14 rounded-md h-[70vh] md:h-[90%] justify-evenly text-xs md:text-base
      ${moreClasses}` }
      { ...rest }
    >
      { children }
    </form>
  );
}

export default FormBackground;
