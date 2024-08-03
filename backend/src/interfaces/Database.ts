export interface UserDB {
  id: number,
  name: string,
  email: string,
  password: string,
  country: string,
  organization?: string,
  role: 'ADMIN' | 'STUDENT',
  confirmEmailToken: string | null,
  createdAt: Date,
  updatedAt: Date,
};

export interface CoursesDB {
  id: number,
  title: string,
  forum: string,
  duration: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface ModulesDB {
  id: number,
  courseId: number,
  title: string,
}

export interface LessonsDB {
  id: number,
  moduleId: number,
  title: string,
  content: string,
};

export interface UserCoursesDB {
  id: number,
  userId: number,
  courseTitle: string,
  courseId: number,
  progress?: number,
  bookmarked?: boolean,
  subscribed?: boolean,
};

export interface PdfLessonDB {
  id: number,
  lessonId: number,
  path: string,
  title: string,
};

export interface WatchedLessonDB {
  id: number,
  lessonId: number,
  userId: number,
  moduleId: number,
  watched: boolean,
}

export interface ModuleProgressDB {
  id: number,
  moduleId: number,
  courseId: number,
  userId: number,
  progress: number,
}