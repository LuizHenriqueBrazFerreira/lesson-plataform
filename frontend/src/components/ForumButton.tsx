import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import CourseContext from '../context/CourseContext';

export default function ForumButton({ moreClasses = '' }: { moreClasses?: string }) {
  const { forumURL } = useContext(CourseContext) ?? localStorage.getItem('forum');

  const includesHTTPS = forumURL.includes('https://');

  return (
    <a href={ includesHTTPS ? forumURL : `https://${forumURL}` } target="_blank" rel="noreferrer">
      <button
        className={ `border-2 border-btn-orange rounded-md md:py-3 md:px-10
        py-2 px-1 flex md:flex-col items-center min-w-16 md:w-16 text-btn-orange
        ont-bold gap-2 md:gap-0 ${moreClasses}` }
      >
        <ChatBubbleBottomCenterTextIcon className="size-8 md:size-10" />
        Fórum
      </button>
    </a>
  );
}
