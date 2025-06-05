import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Books from './pages/Books';
import Dashboard from './pages/admin/Dashboard';
import UploadNotes from './pages/admin/UploadNotes';
import QuizAttempt from './pages/QuizAttempt';
import Stats from './components/Stats';
import AdminLogin from "./pages/admin/AdminLogin"; 

import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <Navbar />
      <div className="px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/stats" element={<Stats />} />
<Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <QuizAttempt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/upload-notes"
            element={
              <ProtectedRoute>
                <UploadNotes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;