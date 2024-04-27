import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateAccount from './pages/CreateAccount';
import StudentCourses from './pages/Courses';
<<<<<<< HEAD
import CourseModules from './pages/CouseModules';
import DinamicCourses from './pages/ModulesLessons';
=======
import ConfirmEmail from './pages/ConfirmEmail';
import ForgotPassword from './pages/ResetPassword';
import Homepage from './pages/Homepage';
import AdminPage from './pages/AdminPage';
import ManageLessons from './pages/ManageLessons';
import RootProvider from './context';
>>>>>>> ef7a07879df434898c309f45fd1a4ad4548fffc7

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Header />
      <Routes>
        <Route path="/" element="Página inicial" />
        <Route path="/login" element={ <Login /> } />
        <Route path="/create-account" element={ <CreateAccount /> } />
        <Route path="/courses" element={ <StudentCourses /> } />
        <Route path="/courses/:id/modules" element={ <CourseModules /> } />
        <Route path="/courses/:id/modules/:id" element={ <DinamicCourses /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
=======
      <RootProvider>
        <Header />
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/create-account" element={ <CreateAccount /> } />
          <Route path="/courses" element={ <StudentCourses /> } />
          <Route path="/confirm/:token" element={ <ConfirmEmail /> } />
          <Route path="/reset-password/:token" element={ <ForgotPassword /> } />
          <Route path="/admin" element={ <AdminPage /> } />
          <Route path="/admin/manager/:id" element={ <ManageLessons /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        <Footer />
      </RootProvider>
>>>>>>> ef7a07879df434898c309f45fd1a4ad4548fffc7
    </div>
  );
}

export default App;
