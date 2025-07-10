import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import PatientLogin from './pages/PatientLogin';
import DoctorLogin from './pages/DoctorLogin';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ResultsPage from './pages/ResultsPage';
import AlertPage from './pages/AlertPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutAI from './pages/AboutAI';

// Auth provider
import { useAuth, AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about" element={<AboutAI />} />
        <Route path="/patient/*" element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/doctor/*" element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/results/:id" element={
          <ProtectedRoute role="patient">
            <ResultsPage />
          </ProtectedRoute>
        } />
        <Route path="/alert/:id" element={
          <ProtectedRoute role="patient">
            <AlertPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

// Protected route component
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to={role === 'patient' ? '/patient-login' : '/doctor-login'} />;
  }
  
  if (user.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default App;