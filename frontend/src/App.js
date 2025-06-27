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
import NoteDetail from './pages/NoteDetail';
import CoursesDetail from './pages/CoursesDetail';
import QuizDetail from './pages/QuizDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ContactPage from './pages/ContactPage';
import ArticleList from './pages/ArticleList';
import SamplePaper from './pages/SamplePapers';
import PreviousPapers from './pages/PreviousPapers';
import Review from './pages/Review';
import TestPage from './pages/TestPage';
import PharmacySubjects from './pages/PharmacySubjects';
import AskPage from './pages/AskPage';
// import BookOrderForm from './pages/BookOrderForm';
import BookOrderPage from './pages/BookOrderPage';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutUs from './pages/Aboutus';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <>
      <Navbar />
      <div className="px-0 py-0 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/stats" element={<Stats />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/notes" element={<NoteDetail />} />
          <Route path="/courses" element={<CoursesDetail />} />
          <Route path="/quizzes" element={<QuizDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/sample-papers" element={<SamplePaper />} />
          <Route path="/previous-papers" element={<PreviousPapers />} />
          <Route path="/review" element={<Review />} />
          <Route path="/tests" element={<TestPage />} />
          <Route path="/pharmacy" element={<PharmacySubjects />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/book-order" element={<BookOrderPage />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-&-conditions" element={<TermsAndConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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