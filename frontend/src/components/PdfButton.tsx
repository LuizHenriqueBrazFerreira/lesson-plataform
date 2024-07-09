import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

type PdfBarProps = {
  path: string
};

export default function PdfBar({ path }: PdfBarProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={ () => navigate(`${path}/pdfs`) }
      className="border-2 border-btn-orange rounded-md
      md:py-3 md:px-10 py-2 text-sm flex flex-col items-center w-16
      text-btn-orange font-bold"
    >
      <DocumentTextIcon className="size-8 md:size-10" />
      PDFs
    </button>
  );
}
