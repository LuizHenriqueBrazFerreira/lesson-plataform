import { ButtonHTMLAttributes } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from './Button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function TrashButton({ ...rest }: ButtonProps) {
  return (
    <Button
      { ...rest }
    >
      <TrashIcon className="h-6 w-6" />
    </Button>
  );
}

export default TrashButton;
