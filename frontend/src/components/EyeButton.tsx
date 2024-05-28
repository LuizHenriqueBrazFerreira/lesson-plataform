import { ButtonHTMLAttributes } from 'react';
import Button from './Button';

type ButtonProps = {
  showEye: boolean,
  showPassword: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

function EyeButton({ showEye = false, showPassword = false, ...rest }: ButtonProps) {
  return (
    <Button
      { ...rest }
    >
      {showEye ? (
        <img
          className="opacity-40"
          src={ showPassword ? '/src/assets/eye.svg' : '/src/assets/eye-slash.svg' }
          alt="show password"
        />
      ) : ''}
    </Button>
  );
}

export default EyeButton;
