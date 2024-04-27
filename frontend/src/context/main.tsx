import { createContext } from 'react';
import { Lessons } from '../types/lessons';

type RootContextType = {
  lesson: Lessons,
  changeLesson: (data: Lessons) => void
};

const RootContext = createContext<RootContextType>({} as RootContextType);

export default RootContext;
