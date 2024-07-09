import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

type PdfBarProps = {
  link: string
};

export default function ForumButton({ link }: PdfBarProps) {
  return (
    <a href={ link } target="_blank" rel="noreferrer">
      <button
        className="border-2 border-btn-orange rounded-md
        md:py-3 md:px-10 py-2 flex flex-col items-center w-16
      text-btn-orange font-bold"
      >
        <ChatBubbleBottomCenterTextIcon className="size-8 md:size-10" />
        Fórum
      </button>
    </a>
  );
}
