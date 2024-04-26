import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode,
  moreClasses?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function OrangeButton({ children,
  moreClasses = '', ...rest }: ButtonProps) {
  return (
    <button
      className={ `bg-btn-orange text-white w-32 lg:w-60
      h-6 lg:h-12 self-center my-3 rounded-md font-semibold
      hover:bg-orange-400 transition duration-300 ease-in-out
      active:bg-orange-700 focus:outline-none inline-flex items-center 
      justify-center ${moreClasses}` }
      { ...rest }
    >
      {children}
    </button>
  );
}
