import { useState } from 'react';
import { Lessons } from '../types/lessons';
import RootContext from './main';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [lesson, setLesson] = useState<Lessons>({} as Lessons);
  console.log(lesson);

  const changeLesson = (lessonData: Lessons) => {
    setLesson(lessonData);
  };
  return (
    <RootContext.Provider
      value={ {
        lesson,
        changeLesson,
      } }
    >
      {children}
    </RootContext.Provider>
  );
}
