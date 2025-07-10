import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { aiResults, doctors } from '../utils/mockData';
import PageLayout from '../components/PageLayout';
import ResultsCard from '../components/ResultsCard';
import AlertBox from '../components/AlertBox';

function AlertPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [result, setResult] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emergency, setEmergency] = useState(false);
  
  useEffect(() => {
    // Fetch result from mock data
    setTimeout(() => {
      const foundResult = aiResults.find(r => r.id === id);
      
      if (foundResult) {
        setResult(foundResult);
        const assignedDoctor = doctors.find(d => d.id === foundResult.doctorId);
        setDoctor(assignedDoctor);
        
        // Set emergency status based on risk level and condition
        if (foundResult.riskLevel === 'High') {
          setEmergency(true);
        }
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleEmergencyResponse = () => {
    // Simulate emergency response
    alert('Emergency services have been notified. Please stay on the line.');
  };
  
  const handleContinueToResults = () => {
    navigate(`/results/${id}`);
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="loading-container">
          <p>Loading health alert...</p>
        </div>
      </PageLayout>
    );
  }
  
  if (!result) {
    return (
      <PageLayout>
        <div className="card text-center">
          <h3>Alert Not Found</h3>
          <p>The requested health alert could not be found.</p>
          <button 
            className="btn btn-primary mt-lg"
            onClick={() => navigate('/patient')}
          >
            Return to Dashboard
          </button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="alert-page">
        <div className="alert-header">
          <h2 className="mb-lg">⚠️ Urgent Health Alert</h2>
        </div>
        
        <div className="card emergency-card mb-lg">
          <h3 className="mb-md">High-Risk Health Condition Detected</h3>
          <p className="mb-lg">
            Our AI system has detected a potentially serious health condition 
            that requires immediate attention. Please review the details below 
            and contact your healthcare provider as soon as possible.
          </p>
          
          <div className="emergency-details mb-lg">
            <div className="emergency-detail">
              <strong>Condition:</strong> {result.detectedCondition}
            </div>
            <div className="emergency-detail">
              <strong>Risk Level:</strong> {result.riskLevel}
            </div>
          </div>
          
          <AlertBox 
            message={`Your detected condition (${result.detectedCondition}) requires urgent medical attention. Please consult with your doctor immediately.`}
            doctorName={doctor ? doctor.name : 'Not assigned'}
            doctorId={doctor ? doctor.id : ''}
          />
          
          {emergency && (
            <div className="emergency-actions mt-lg">
              <h4 className="mb-md">Do you need emergency assistance?</h4>
              <div className="d-flex gap-md">
                <button 
                  className="btn btn-danger btn-lg"
                  onClick={handleEmergencyResponse}
                >
                  Yes, I Need Help Now
                </button>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleContinueToResults}
                >
                  No, Show Me Results
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="emergency-instructions card">
          <h3 className="mb-md">What to Do Next</h3>
          
          <ul className="mb-lg">
            <li>Contact your doctor immediately to discuss these results</li>
            <li>If you experience severe symptoms, go to the nearest emergency room</li>
            <li>Follow any immediate treatment recommendations</li>
            <li>Keep track of any changes in your symptoms</li>
          </ul>
          
          <button 
            className="btn btn-primary"
            onClick={handleContinueToResults}
          >
            View Detailed Results
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default AlertPage;