import { DocumentTextIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';

export default function PdfBar() {
  return (
    <section
      className="flex items-center justify-between w-20
        lg:w-40 absolute top-96 right-80 space-x-2"
    >
      <div
        className="border-2 border-btn-orange rounded-lg py-3 px-12 w-116 lg:w-112"
      >
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noreferrer"
        >
          <DocumentTextIcon
            title="PDF's"
            className="size-8 lg:size-10 bg-btn-orange text-white bg-opacity-80"
          />
          PDFs
        </a>
      </div>
      <div
        className="border-2 border-btn-orange rounded-lg py-3 px-12 w-116 lg:w-112"
      >
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noreferrer"
        >
          <ChatBubbleOvalLeftIcon
            className="size-8 lg:size-10 bg-btn-orange text-white bg-opacity-80"
          />
          Fórum
        </a>
      </div>
    </section>
  );
}
