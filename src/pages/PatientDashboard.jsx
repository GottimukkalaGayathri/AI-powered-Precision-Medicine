import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { submissions, aiResults, doctors } from '../utils/mockData';
import PageLayout from '../components/PageLayout';
import PatientForm from '../components/PatientForm';
import RiskIndicator from '../components/RiskIndicator';
import { Link } from 'react-router-dom';

function PatientDashboard() {
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [patientResults, setPatientResults] = useState([]);
  const [assignedDoctor, setAssignedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Simulate API fetch with delay
    setTimeout(() => {
      if (user) {
        // Get patient submissions
        const patientSubmissions = submissions.filter(s => s.patientId === user.id);
        
        // Get patient AI results
        const results = aiResults.filter(r => r.patientId === user.id);
        
        // Get assigned doctor
        const doctor = doctors.find(d => d.id === user.doctorId);
        
        setPatientData(user);
        setPatientResults(results);
        setAssignedDoctor(doctor);
        setLoading(false);
      }
    }, 1000);
  }, [user]);
  
  if (loading) {
    return (
      <PageLayout>
        <div className="loading-container">
          <p>Loading patient data...</p>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="dashboard-header">
        <h2>Welcome, {patientData.name}</h2>
        <p>Manage your health data and view AI-powered recommendations.</p>
      </div>
      
      <div className="dashboard-tabs mb-lg">
        <div 
          className={`auth-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </div>
        <div 
          className={`auth-tab ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit')}
        >
          Submit Health Data
        </div>
        <div 
          className={`auth-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Results History
        </div>
      </div>
      
      {activeTab === 'dashboard' && (
        <div className="fade-in">
          <div className="dashboard-stats mb-xl">
            <div className="stat-card">
              <div className="stat-number">{patientResults.length}</div>
              <div className="stat-label">Health Reports</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">
                {patientResults.filter(r => r.doctorReviewed).length}
              </div>
              <div className="stat-label">Doctor Reviewed</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">
                {patientResults.filter(r => r.riskLevel === 'High').length}
              </div>
              <div className="stat-label">High Risk Alerts</div>
            </div>
          </div>
          
          {assignedDoctor && (
            <div className="card mb-lg">
              <h3 className="mb-md">Your Primary Doctor</h3>
              <div className="d-flex gap-lg">
                <div className="doctor-avatar">
                  {assignedDoctor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="mb-sm">{assignedDoctor.name}</h4>
                  <p className="mb-sm">{assignedDoctor.specialization}</p>
                  <button className="btn btn-outline btn-sm">Contact Doctor</button>
                </div>
              </div>
            </div>
          )}
          
          {patientResults.length > 0 ? (
            <div>
              <h3 className="mb-md">Recent Health Reports</h3>
              
              {patientResults.slice(0, 3).map((result) => (
                <div key={result.id} className="card mb-md">
                  <div className="d-flex justify-between align-center mb-md">
                    <h4 className="mb-0">{result.detectedCondition}</h4>
                    <RiskIndicator level={result.riskLevel} />
                  </div>
                  
                  <p className="mb-md">Date: {result.createdAt}</p>
                  
                  <p className="mb-md">
                    <strong>Recommended Treatment:</strong> {result.recommendedTreatment}
                  </p>
                  
                  <Link to={`/results/${result.id}`} className="btn btn-primary">
                    View Full Report
                  </Link>
                </div>
              ))}
              
              {patientResults.length > 3 && (
                <div className="text-center mt-md">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setActiveTab('history')}
                  >
                    View All Reports
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card text-center">
              <h3 className="mb-md">No Health Reports Yet</h3>
              <p className="mb-lg">
                Submit your health data to receive AI-powered health recommendations.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('submit')}
              >
                Submit Health Data
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'submit' && (
        <div className="fade-in">
          <PatientForm />
        </div>
      )}
      
      {activeTab === 'history' && (
        <div className="fade-in">
          <h3 className="mb-lg">Your Health Reports History</h3>
          
          {patientResults.length > 0 ? (
            patientResults.map((result) => (
              <div key={result.id} className="card mb-md">
                <div className="d-flex justify-between align-center mb-md">
                  <h4 className="mb-0">{result.detectedCondition}</h4>
                  <div className="d-flex align-center gap-md">
                    <RiskIndicator level={result.riskLevel} />
                    <span className="result-date">{result.createdAt}</span>
                  </div>
                </div>
                
                <p className="mb-md">
                  <strong>Recommended Treatment:</strong> {result.recommendedTreatment}
                </p>
                
                <div className="d-flex justify-between align-center">
                  <div>
                    {result.doctorReviewed ? (
                      <span className="doctor-reviewed">✓ Reviewed by doctor</span>
                    ) : (
                      <span className="doctor-pending">Awaiting doctor review</span>
                    )}
                  </div>
                  
                  <Link to={`/results/${result.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="card text-center">
              <p>You haven't submitted any health data yet.</p>
              <button 
                className="btn btn-primary mt-md"
                onClick={() => setActiveTab('submit')}
              >
                Submit Health Data
              </button>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}

export default PatientDashboard;