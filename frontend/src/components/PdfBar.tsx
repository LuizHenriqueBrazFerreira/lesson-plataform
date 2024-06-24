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
      md:py-3 md:px-12 py-2 px-4 text-xs flex flex-col items-center w-16"
    >
      <DocumentTextIcon
        title="PDF's"
        className="size-8 md:size-10 text-btn-orange"
      />
      PDFs
    </button>
  );
}
