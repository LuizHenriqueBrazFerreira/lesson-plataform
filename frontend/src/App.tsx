import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateAccount from './pages/CreateAccount';
import AdminPage from './pages/AdminPage';
import ManageLessons from './pages/ManageLessons';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element="Página inicial" />
        <Route path="/login" element={ <Login /> } />
        <Route path="/create-account" element={ <CreateAccount /> } />
        <Route path="/admin" element={ <AdminPage /> } />
        <Route path="/admin/manager/:id" element={ <ManageLessons /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
