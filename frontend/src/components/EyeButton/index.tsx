import { ButtonHTMLAttributes } from 'react';
import Button from '../Button';

type ButtonProps = {
  showEye: boolean,
  showPassword: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

function EyeButton({ showEye = false, showPassword = false, ...rest }: ButtonProps) {
  return (
    <Button
      className="w-[2rem] absolute z-[100]
    translate-x-[-2.5rem] translate-y-[1rem]"
      { ...rest }
    >
      {showEye ? (
        <img
          className="opacity-30"
          src={ showPassword ? '/src/assets/eye.svg' : '/src/assets/eye-slash.svg' }
          alt="show password"
        />
      ) : ''}
    </Button>
  );
}

export default EyeButton;
