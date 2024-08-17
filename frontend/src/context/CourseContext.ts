import { createContext } from 'react';
import { Courses, Lesson, Module } from '../types/courseType';

export type SearchBarResponse = {
  courses: Courses[] | [],
  modules: Module[] | [],
  lessons: Lesson[] | []
};

type CourseContextType = {
  forumURL: string;
  changeForumURL: (url: string) => void;
  searchBar: SearchBarResponse;
  changeSearchBar: (data: SearchBarResponse) => void;
  translateDynamicContent: (content: string) => Promise<string>;
};

const CourseContext = createContext({} as CourseContextType);

export default CourseContext;
