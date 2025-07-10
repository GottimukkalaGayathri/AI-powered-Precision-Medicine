import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { patients } from '../utils/mockData';
import PageLayout from '../components/PageLayout';

function PatientLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: ''
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
      const patient = patients.find(p => p.email === formData.email && p.password === formData.password);
      
      setTimeout(() => {
        setLoading(false);
        
        if (patient) {
          login(patient, 'patient');
          navigate('/patient');
        } else {
          setError('Invalid email or password');
        }
      }, 1000);
    } else {
      // Registration logic
      setLoading(true);
      
      // Basic validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
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
      const existingPatient = patients.find(p => p.email === formData.email);
      if (existingPatient) {
        setError('Email is already registered');
        setLoading(false);
        return;
      }
      
      // Simulate API call delay
      setTimeout(() => {
        // Create new patient
        const newPatient = {
          id: `p${patients.length + 1}`,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: parseInt(formData.age) || 0,
          gender: formData.gender,
          doctorId: '', // Will be assigned later
          medicalHistory: {
            conditions: [],
            medications: [],
            allergies: [],
            surgeries: []
          }
        };
        
        // Add to mock data (in a real app, this would be a backend API call)
        patients.push(newPatient);
        
        // Log in the new patient
        login(newPatient, 'patient');
        setLoading(false);
        navigate('/patient');
      }, 1500);
    }
  };
  
  return (
    <PageLayout>
      <div className="auth-container slide-up">
        <div className="card">
          <h2 className="text-center mb-lg">Patient Portal</h2>
          
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
              <>
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
                
                <div className="grid">
                  <div className="grid-6">
                    <div className="form-group">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-input"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid-6">
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
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
            <Link to="/doctor-login">I'm a doctor</Link>
          </div>
        </div>
        
        <div className="card mt-lg">
          <h3 className="mb-md">For Testing</h3>
          <p className="mb-sm">Use these credentials for testing the patient portal:</p>
          <div className="test-credentials">
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Password:</strong> password123</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default PatientLogin;