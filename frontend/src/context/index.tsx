import { useState } from 'react';
import { Lessons, Status } from '../types/lessons';
import RootContext from './main';

export default function Provider({ children }: { children: React.ReactNode }) {
  const initialStatus = {
    course: false,
    module: false,
    lesson: false,
    active: false,
  };

  const [status, setStatus] = useState<Status>(initialStatus);
  const [lesson, setLesson] = useState<Lessons>({} as Lessons);

  const changeLesson = (lessonData: Lessons) => {
    setLesson(lessonData);
  };

  const changeStatus = (statusData: Status) => {
    setStatus(statusData);
  };

  return (
    <RootContext.Provider
      value={ {
        lesson,
        changeLesson,
        status,
        changeStatus,
      } }
    >
      {children}
    </RootContext.Provider>
  );
}
