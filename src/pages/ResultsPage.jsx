// ResultsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import PageLayout from '../components/PageLayout';
import ResultsCard from '../components/ResultsCard';
import AlertBox from '../components/AlertBox';
import { doctors } from '../utils/mockData';

function ResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [result, setResult] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      if (location.state?.result) {
        setResult(location.state.result);
        const assigned = doctors.find(d => d.id === location.state.result.doctorId);
        setDoctor(assigned);
        setLoading(false);
      } else {
        try {
          const response = await fetch(`http://localhost:5000/api/result/${id}`);
          const data = await response.json();

          if (response.ok) {
            data.recommendedLifestyleChanges = JSON.parse(data.recommendedLifestyleChanges || '[]');
            setResult(data);
            const assigned = doctors.find(d => d.id === data.doctorId);
            setDoctor(assigned);
          } else {
            setResult(null);
          }
        } catch (err) {
          console.error('Error fetching result:', err);
          setResult(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResult();
  }, [id, location.state]);

  if (loading) {
    return (
      <PageLayout>
        <div className="loading-container">
          <p>Loading results...</p>
        </div>
      </PageLayout>
    );
  }

  if (!result) {
    return (
      <PageLayout>
        <div className="card text-center">
          <h3>Result Not Found</h3>
          <p>The requested result could not be found.</p>
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

  if (result.riskLevel === 'High' && user.role === 'patient' && !location.state) {
    navigate(`/alert/${id}`);
    return null;
  }

  return (
    <PageLayout>
      <div className="mb-lg">
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <h2 className="mb-lg">Analysis Results</h2>

      {result.riskLevel === 'High' && (
        <AlertBox
          message="This health condition requires urgent attention. Please consult with your doctor as soon as possible."
          doctorName={doctor ? doctor.name : 'Not assigned'}
          doctorId={doctor ? doctor.id : ''}
        />
      )}

      <ResultsCard result={result} doctor={doctor} />

      <div className="card mt-lg">
        <h3 className="mb-md">Next Steps</h3>

        <div className="next-steps">
          <div className="next-step-item">
            <div className="next-step-number">1</div>
            <div className="next-step-content">
              <h4>Review Your Results</h4>
              <p>Carefully read through the AI-generated recommendations and doctor's notes.</p>
            </div>
          </div>

          <div className="next-step-item">
            <div className="next-step-number">2</div>
            <div className="next-step-content">
              <h4>Consult with Your Doctor</h4>
              <p>Schedule an appointment with your doctor to discuss these results in detail.</p>
            </div>
          </div>

          <div className="next-step-item">
            <div className="next-step-number">3</div>
            <div className="next-step-content">
              <h4>Follow Treatment Plan</h4>
              <p>Adhere to the recommended treatment plan and lifestyle changes.</p>
            </div>
          </div>

          <div className="next-step-item">
            <div className="next-step-number">4</div>
            <div className="next-step-content">
              <h4>Monitor Your Health</h4>
              <p>Regularly monitor your health and submit new data to track your progress.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ResultsPage;
