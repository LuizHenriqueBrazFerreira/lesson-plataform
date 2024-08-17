import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AdminPage from './pages/Admin/AdminPage';
import CreateCourse from './pages/Admin/CreateCourse';
import EditCourse from './pages/Admin/EditCourse';
import Students from './pages/Admin/Students';
import BookmarkedCourses from './pages/Course/BookmarkedCourses';
import ConfirmEmail from './pages/Login/ConfirmEmail';
import CourseContext, { SearchBarResponse } from './context/CourseContext';
import CourseModules from './pages/Course/CourseModules';
import CreateAccount from './pages/Login/CreateAccount';
import ForgotPassword from './pages/Login/ResetPassword';
import Header from './components/Header';
import Homepage from './pages/Course/Homepage';
import Lessons from './pages/Course/Lessons';
import LessonPage from './pages/Course/LessonPage';
import Login from './pages/Login/Login';
import NotFound from './pages/Course/NotFound';
import PdfPage from './pages/Course/PdfPage';
import Profile from './pages/Course/Profile';
import StudentCourses from './pages/Course/Courses';
import SupportPage from './pages/Course/SupportPage';
import Footer from './components/Footer';
import { translateText } from './services/translationService';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const INITIAL_STATE = {
    courses: [],
    modules: [],
    lessons: [],
  };
  const { i18n } = useTranslation();
  const [forumURL, setForumURL] = useState('');
  const [searchBar, setSearchBar] = useState<SearchBarResponse>(INITIAL_STATE);

  const changeSearchBar = (data: SearchBarResponse) => {
    setSearchBar(data);
  };

  const changeForumURL = (url: string) => {
    setForumURL(url);
  };

  const translateDynamicContent = async (content: string): Promise<string> => {
    return await translateText(content, i18n.language);
  };

  return (
    <CourseContext.Provider
      value={ { forumURL,
        changeForumURL,
        changeSearchBar,
        searchBar,
        translateDynamicContent } }
    >
      <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/admin" element={ <AdminPage /> } />
        <Route path="/admin/courses" element="Cursos" />
        <Route path="/admin/create" element={ <CreateCourse /> } />
        <Route path="/admin/edit" element={ <EditCourse /> } />
        <Route path="/admin/students" element={ <Students /> } />
        <Route path="/bookmarked" element={ <BookmarkedCourses /> } />
        <Route path="/confirm/:token" element={ <ConfirmEmail /> } />
        <Route path="/courses" element={ <StudentCourses /> } />
        <Route path="/courses/:courseId/modules" element={ <CourseModules /> } />
        <Route
          path="/courses/:courseId/modules/:moduleId/lessons"
          element={ <Lessons /> }
        />
       <Route
          path="/courses/:courseId/modules/:moduleId/lessons/:lessonId"
          element={ <LessonPage /> }
        />
        <Route
          path="/courses/:courseId/modules/:moduleId/lessons/:lessonId/pdfs"
          element={ <PdfPage /> }
        />
        <Route path="/create-account" element={ <CreateAccount /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/reset-password/:token" element={ <ForgotPassword /> } />
        <Route path="/support" element={ <SupportPage /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
    </CourseContext.Provider>
  );
}

export default App;
