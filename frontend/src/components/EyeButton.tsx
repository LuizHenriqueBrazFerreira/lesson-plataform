import { ButtonHTMLAttributes } from 'react';
import Button from './Button';

type ButtonProps = {
  showEye: boolean,
  showPassword: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

function EyeButton({ showEye = false, showPassword = false, ...rest }: ButtonProps) {
  return (
    <Button { ...rest }>
      {showEye && (
        <img
          className="opacity-40"
          src={ `/assets/${showPassword ? 'eye' : 'eye-slash'}.svg` }
          alt="show password"
        />
      )}
    </Button>
  );
}

export default EyeButton;
