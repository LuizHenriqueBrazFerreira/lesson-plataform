import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@material-tailwind/react';

const extractPath = (path: string) => {
  const pathArray = path.split('/');

  return pathArray.filter((segment) => segment && !segment.match(/^\d+$/));
};

function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
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

function BreadCrumbs() {
  const { pathname } = useLocation();
  const path = extractPath(pathname);

  return (
    <Breadcrumbs>
      {path.map((segment, index) => (
        <a key={ index } href={ truncatePathnameAtSegment(pathname, segment) }>
          {capitalizeFirstLetter(segment)}
        </a>
      ))}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
