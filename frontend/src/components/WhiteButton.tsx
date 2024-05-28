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
    // @ts-expect-error - material-tailwind @types/react bug
    <Button
      className={ `bg-white border-2 border-btn-orange text-btn-orange
    w-34 lg:w-60 h-6 lg:h-12 self-center my-3 rounded-md font-semibold text-xs
    flex items-center justify-center ${moreClasses}` }
      loading={ isLoading }
      { ...rest }
    >
      {children}
    </Button>
  );
}
