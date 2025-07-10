import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { doctors, specializations } from '../utils/mockData';
import PageLayout from '../components/PageLayout';

function DoctorLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      // Login logic
      setLoading(true);
      const doctor = doctors.find(d => d.email === formData.email && d.password === formData.password);
      
      setTimeout(() => {
        setLoading(false);
        
        if (doctor) {
          login(doctor, 'doctor');
          navigate('/doctor');
        } else {
          setError('Invalid email or password');
        }
      }, 1000);
    } else {
      // Registration logic
      setLoading(true);
      
      // Basic validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.specialization) {
        setError('All fields are required');
        setLoading(false);
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      
      // Check if email already exists
      const existingDoctor = doctors.find(d => d.email === formData.email);
      if (existingDoctor) {
        setError('Email is already registered');
        setLoading(false);
        return;
      }
      
      // Simulate API call delay
      setTimeout(() => {
        // Create new doctor
        const newDoctor = {
          id: `d${doctors.length + 1}`,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          specialization: formData.specialization,
          patients: []
        };
        
        // Add to mock data (in a real app, this would be a backend API call)
        doctors.push(newDoctor);
        
        // Log in the new doctor
        login(newDoctor, 'doctor');
        setLoading(false);
        navigate('/doctor');
      }, 1500);
    }
  };
  
  return (
    <PageLayout>
      <div className="auth-container slide-up">
        <div className="card">
          <h2 className="text-center mb-lg">Doctor Portal</h2>
          
          <div className="auth-tabs mb-lg">
            <div 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </div>
            <div 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </div>
          </div>
          
          {error && <div className="alert alert-danger mb-lg">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <select
                    name="specialization"
                    className="form-select"
                    value={formData.specialization}
                    onChange={handleChange}
                  >
                    <option value="">Select specialization</option>
                    {specializations.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            <div className="form-group mt-lg">
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </form>
          
          <div className="mt-md text-center">
            <Link to="/patient-login">I'm a patient</Link>
          </div>
        </div>
        
        <div className="card mt-lg">
          <h3 className="mb-md">For Testing</h3>
          <p className="mb-sm">Use these credentials for testing the doctor portal:</p>
          <div className="test-credentials">
            <p><strong>Email:</strong> dr.chen@example.com</p>
            <p><strong>Password:</strong> doctor123</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default DoctorLogin;