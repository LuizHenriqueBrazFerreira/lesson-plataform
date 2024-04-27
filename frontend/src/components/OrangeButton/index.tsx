import { Button } from '@material-tailwind/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode,
  moreClasses?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function OrangeButton({ children,
  moreClasses = '', isLoading = false, ...rest }: ButtonProps) {
  return (
    <Button
      className={ `w-32 lg:w-60 h-6 lg:h-12 bg-btn-orange
    self-center my-3 rounded-md font-semibold 
    flex items-center justify-center ${moreClasses}` }
      loading={ isLoading }
      { ...rest }
    >
      {children}
    </Button>
  );
}
