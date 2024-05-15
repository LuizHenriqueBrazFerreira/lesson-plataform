import { createContext } from 'react';
import { Lessons, Status } from '../types/lessons';

type RootContextType = {
  lesson: Lessons,
  changeLesson: (data: Lessons) => void
  status: Status
  changeStatus: (data: Status) => void
};

const RootContext = createContext<RootContextType>({} as RootContextType);

export default RootContext;
