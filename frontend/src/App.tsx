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
import DinamicModules from './pages/ModulesLessons';
import DinamicLessons from './pages/Lessons';
import ManageLessons from './pages/ManageLessons';
import RootProvider from './context';

function App() {
  return (
    <div>
      <RootProvider>
        <Header />
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/create-account" element={ <CreateAccount /> } />
          <Route path="/courses/:userId" element={ <StudentCourses /> } />
          <Route path="/courses/:id/modules" element={ <CourseModules /> } />
          <Route path="/courses/:id/modules/:moduleId" element={ <DinamicModules /> } />
          <Route
            path="/courses/:id/modules/:moduleId/lessons/:lessonId"
            element={ <DinamicLessons /> }
          />
          <Route path="/confirm/:token" element={ <ConfirmEmail /> } />
          <Route path="/reset-password/:token" element={ <ForgotPassword /> } />
          <Route path="/admin" element={ <AdminPage /> } />
          <Route path="/admin/manager/:id" element={ <ManageLessons /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        <Footer />
      </RootProvider>
    </div>
  );
}

export default App;
