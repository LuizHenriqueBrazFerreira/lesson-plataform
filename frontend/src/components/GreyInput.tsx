import { InputHTMLAttributes } from 'react';

type InputProps = {
  labelText: string,
} & InputHTMLAttributes<HTMLInputElement>;

export default function GreyInput({ labelText, ...rest }: InputProps) {
  return (
    <label>
      { labelText }
      <input
        className="bg-neutral-200 rounded-md w-full h-8 lg:h-10 p-2 my-3"
        { ...rest }
      />
    </label>
  );
}
