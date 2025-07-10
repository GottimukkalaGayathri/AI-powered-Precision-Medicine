import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            MediPredict AI
          </Link>
          
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            
            {!user && (
              <>
                <li>
                  <Link to="/patient-login" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Patient Portal
                  </Link>
                </li>
                <li>
                  <Link to="/doctor-login" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Doctor Portal
                  </Link>
                </li>
              </>
            )}
            
            {user && user.role === 'patient' && (
              <li>
                <Link to="/patient" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
              </li>
            )}
            
            {user && user.role === 'doctor' && (
              <li>
                <Link to="/doctor" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
              </li>
            )}
            
            {user && (
              <li>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline text-sm"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;