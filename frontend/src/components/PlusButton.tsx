import { ButtonHTMLAttributes } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function PlusButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      type="button"
      className="flex items-center justify-center gap-2"
      { ...rest }
    >
      {children}
      <PlusCircleIcon className="h-8 w-8" />
    </Button>
  );
}

export default PlusButton;
