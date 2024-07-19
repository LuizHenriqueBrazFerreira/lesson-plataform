import { createContext } from 'react';

type CourseContextType = {
  forumURL: string;
  changeForumURL: (url: string) => void;
};

const CourseContext = createContext({} as CourseContextType);

export default CourseContext;
