import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateAccount from './pages/CreateAccount';
import StudentCourses from './pages/Courses';
import ConfirmEmail from './pages/ConfirmEmail';
import ForgotPassword from './pages/ResetPassword';
import Homepage from './pages/Homepage';
import AdminPage from './pages/AdminPage';
import CourseModules from './pages/CouseModules';
import Lessons from './pages/Lessons';
import RootProvider from './context';
import BookmarkedCourses from './pages/BookmarkedCourses';
import Profile from './pages/Profile';
import LessonPage from './pages/LessonPage';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import SupportPage from './pages/SupportPage';
import PdfPage from './pages/PdfPage';
import './App.css';

function App() {
  return (
    <div>
      <RootProvider>
        <Header />
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/create-account" element={ <CreateAccount /> } />
          <Route path="/courses" element={ <StudentCourses /> } />
          <Route path="/bookmarked" element={ <BookmarkedCourses /> } />
          <Route path="/courses/:courseId/modules" element={ <CourseModules /> } />
          <Route
            path="/courses/:courseId/modules/:moduleId/lessons"
            element={ <Lessons /> }
          />
          <Route
            path="/courses/:courseId/modules/:moduleId/lessons/:lessonId"
            element={ <LessonPage /> }
          />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/confirm/:token" element={ <ConfirmEmail /> } />
          <Route path="/reset-password/:token" element={ <ForgotPassword /> } />
          <Route path="/admin" element={ <AdminPage /> } />
          <Route path="/admin/create" element={ <CreateCourse /> } />
          <Route path="/admin/edit" element={ <EditCourse /> } />
          <Route path="/admin/students" element="Estudantes" />
          <Route path="/admin/courses" element="Cursos" />
          <Route path="/support" element={ <SupportPage /> } />
          <Route
            path="/courses/:courseId/modules/:moduleId/lessons/:lessonId/pdfs"
            element={ <PdfPage /> }
          />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        <Footer />
      </RootProvider>
    </div>
  );
}

export default App;
