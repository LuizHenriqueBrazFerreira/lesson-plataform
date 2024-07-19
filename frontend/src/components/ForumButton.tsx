import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import CourseContext from '../context/CourseContext';

export default function ForumButton() {
  const { forumURL } = useContext(CourseContext) ?? localStorage.getItem('forum');

  const includesHTTPS = forumURL.includes('https://');

  return (
    <a href={ includesHTTPS ? forumURL : `https://${forumURL}` } target="_blank" rel="noreferrer">
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
