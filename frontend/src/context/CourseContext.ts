import { createContext } from 'react';

export type SearchBarResponse = {
  id: number,
  courseId: number,
  moduleId: number,
  title: string,
};

type CourseContextType = {
  forumURL: string;
  changeForumURL: (url: string) => void;
  searchBar: SearchBarResponse[];
  changeSearchBar: (data: SearchBarResponse[]) => void;
  translateDynamicContent: (content: string) => Promise<string>;
};

const CourseContext = createContext({} as CourseContextType);

export default CourseContext;
