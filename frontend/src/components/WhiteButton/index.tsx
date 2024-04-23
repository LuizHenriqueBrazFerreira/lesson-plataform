import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function WhiteButton({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-white border-solid border-2
            border-btn-orange text-btn-orange
            w-32 lg:w-60 h-6 lg:h-12 self-center my-3 rounded-md font-semibold"
      { ...rest }
    >
      {children}
    </button>
  );
}
