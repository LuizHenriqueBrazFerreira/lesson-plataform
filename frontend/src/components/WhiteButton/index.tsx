import { ButtonHTMLAttributes } from 'react';
import { Button } from '@material-tailwind/react';

type ButtonProps = {
  children: React.ReactNode,
  moreClasses?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function WhiteButton({ children,
  moreClasses = '', isLoading = false, ...rest }: ButtonProps) {
  return (
    <Button
      className={ `bg-white border-solid border-2 border-btn-orange text-btn-orange
    w-32 lg:w-60 h-6 lg:h-12 self-center my-3 rounded-md font-semibold
    flex items-center justify-center ${moreClasses}` }
      loading={ isLoading }
      { ...rest }
    >
      {children}
    </Button>
  );
}
