import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@material-tailwind/react';

type SearchInputProps = {
  value: string;
  handle: (event: React.FormEvent) => void;
  setValue: (value: string) => void;
};

function SearchInput({ value, handle, setValue }: SearchInputProps) {
  return (
    <form className="w-72" onSubmit={ (event) => handle(event) }>
      <Input
        crossOrigin={ undefined }
        size="lg"
        type="search"
        label="Pesquisar"
        value={ value }
        icon={ <MagnifyingGlassIcon
          onClick={ (event) => handle(event) }
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        /> }
        onChange={ (event) => setValue(event.target.value) }
      />
    </form>
  );
}

export default SearchInput;
