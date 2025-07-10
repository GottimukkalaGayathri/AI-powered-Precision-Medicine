import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { patients, aiResults } from '../utils/mockData';
import PageLayout from '../components/PageLayout';
import PatientCard from '../components/PatientCard';

function DoctorDashboard() {
  const { user } = useAuth();
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [patientResults, setPatientResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('patients');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Simulate API fetch with delay
    setTimeout(() => {
      if (user) {
        // Get doctor's patients
        const assignedPatients = patients.filter(p => p.doctorId === user.id);
        
        // Get all AI results
        const results = {};
        assignedPatients.forEach(patient => {
          const patientAiResults = aiResults.filter(r => r.patientId === patient.id);
          if (patientAiResults.length > 0) {
            results[patient.id] = patientAiResults;
          }
        });
        
        setDoctorPatients(assignedPatients);
        setPatientResults(results);
        setLoading(false);
      }
    }, 1000);
  }, [user]);
  
  const getFilteredPatients = () => {
    if (filter === 'all') {
      return doctorPatients;
    } else if (filter === 'high-risk') {
      return doctorPatients.filter(patient => {
        const results = patientResults[patient.id] || [];
        return results.some(result => result.riskLevel === 'High');
      });
    } else if (filter === 'pending-review') {
      return doctorPatients.filter(patient => {
        const results = patientResults[patient.id] || [];
        return results.some(result => !result.doctorReviewed);
      });
    }
    return doctorPatients;
  };
  
  const getRecentResult = (patientId) => {
    const results = patientResults[patientId] || [];
    if (results.length === 0) return null;
    
    // Sort by date and get the most recent
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="loading-container">
          <p>Loading doctor data...</p>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Manage your patients and review AI-generated recommendations.</p>
      </div>
      
      <div className="dashboard-tabs mb-lg">
        <div 
          className={`auth-tab ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          My Patients
        </div>
        <div 
          className={`auth-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('pending');
            setFilter('pending-review');
          }}
        >
          Pending Reviews
        </div>
        <div 
          className={`auth-tab ${activeTab === 'high-risk' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('high-risk');
            setFilter('high-risk');
          }}
        >
          High Risk Patients
        </div>
      </div>
      
      <div className="dashboard-stats mb-xl">
        <div className="stat-card">
          <div className="stat-number">{doctorPatients.length}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {doctorPatients.filter(patient => {
              const results = patientResults[patient.id] || [];
              return results.some(result => !result.doctorReviewed);
            }).length}
          </div>
          <div className="stat-label">Pending Reviews</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {doctorPatients.filter(patient => {
              const results = patientResults[patient.id] || [];
              return results.some(result => result.riskLevel === 'High');
            }).length}
          </div>
          <div className="stat-label">High Risk Patients</div>
        </div>
      </div>
      
      <div className="d-flex justify-between align-center mb-lg">
        <h3 className="mb-0">
          {activeTab === 'patients' && 'My Patients'}
          {activeTab === 'pending' && 'Pending Reviews'}
          {activeTab === 'high-risk' && 'High Risk Patients'}
        </h3>
        
        {activeTab === 'patients' && (
          <div className="filter-options">
            <select 
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Patients</option>
              <option value="high-risk">High Risk Only</option>
              <option value="pending-review">Pending Review</option>
            </select>
          </div>
        )}
      </div>
      
      <div className="grid">
        {getFilteredPatients().length > 0 ? (
          getFilteredPatients().map(patient => (
            <div key={patient.id} className="grid-4">
              <PatientCard 
                patient={patient} 
                recentResult={getRecentResult(patient.id)} 
              />
            </div>
          ))
        ) : (
          <div className="grid-12">
            <div className="card text-center">
              <p>No patients found matching the selected criteria.</p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default DoctorDashboard;