import { SelectHTMLAttributes } from 'react';

type SelectProps = {
  labelText: string;
  options: string[];
} & SelectHTMLAttributes<HTMLSelectElement>;

function Select({ labelText, options, ...rest }: SelectProps) {
  return (
    <label>
      {labelText}
      <select { ...rest }>
        {options.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
export default Select;