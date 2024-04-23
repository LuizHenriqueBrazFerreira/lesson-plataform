import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function OrangeButton({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-btn-orange text-white
          w-32 lg:w-60 h-6 lg:h-12 self-center my-3 rounded-md font-semibold"
      { ...rest }
    >
      {children}
    </button>
  );
}
