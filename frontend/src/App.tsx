import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateAccount from './pages/CreateAccount';
import StudentCourses from './pages/Courses';
import CourseModules from './pages/CouseModules';
import DinamicCourses from './pages/ModulesLessons';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
