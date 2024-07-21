import { useLocation, NavLink } from 'react-router-dom';
import { Breadcrumbs } from '@material-tailwind/react';

const extractPath = (path: string) => {
  const pathArray = path.split('/');

  return pathArray.filter((segment) => segment && !segment.match(/^\d+$/));
};

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

  function translate(str: string, lessonTitle = '') {
    const translateUrl: { [key: string]: string } = {
      courses: 'Curso',
      modules: 'Módulos',
      lessons: 'Aulas',
      lesson: lessonTitle,
    };

    return translateUrl[str] ?? '';
  }

  if (lesssonTitle) path.push('lesson');

  return (
    <Breadcrumbs className="bg-white" separator=">">
      {path.map((segment, index) => (
        <NavLink
          className={ `text-xl hover:text-bg-login 
          ${index === path.length - 1 ? 'text-black' : 'text-gray-600'}` }
          key={ index }
          to={ index === path.length - 1 ? ''
            : truncatePathnameAtSegment(pathname, segment) }
        >
          {translate(segment, lesssonTitle)}
        </NavLink>
      ))}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
