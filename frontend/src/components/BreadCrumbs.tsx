import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@material-tailwind/react';

const extractPath = (path: string) => {
  const pathArray = path.split('/');

  return pathArray.filter((segment) => segment && !segment.match(/^\d+$/));
};

function translate(str: string, lessonTitle = ''): string {
  switch (str) {
    case 'courses':
      return 'Cursos';
    case 'modules':
      return 'Módulos';
    case 'lessons':
      return 'Aulas';
    case 'lesson':
      return `Aula: ${lessonTitle}`;
    default:
      return str;
  }
}

function truncatePathnameAtSegment(pathname: string, path: string): string {
  const segments = pathname.split('/');

  const targetIndex = segments.findIndex((segment) => segment === path);

  if (targetIndex === -1) {
    return pathname;
  }

  const truncatedSegments = segments.slice(0, targetIndex + 1);

  return truncatedSegments.join('/');
}

function BreadCrumbs({ lesssonTitle = '' }) {
  const { pathname } = useLocation();
  const path = extractPath(pathname);

  if (lesssonTitle) path.push('lesson');

  return (
    <Breadcrumbs className="bg-white" separator=">">
      {path.map((segment, index) => (
        <a
          className={ `text-xl hover:text-bg-login 
          ${index === path.length - 1 ? 'text-black' : 'text-gray-600'}` }
          key={ index }
          href={ index === path.length - 1 ? ''
            : truncatePathnameAtSegment(pathname, segment) }
        >
          {translate(segment, lesssonTitle)}
        </a>
      ))}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
