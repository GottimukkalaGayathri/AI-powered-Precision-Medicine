import { Link } from 'react-router-dom';

function PatientCard({ patient, recentResult }) {
  return (
    <div className="card">
      <div className="d-flex justify-between mb-md">
        <h4 className="mb-0">{patient.name}</h4>
        
        {recentResult && (
          <div className={`risk-indicator risk-${recentResult.riskLevel.toLowerCase()}`}>
            {recentResult.riskLevel} Risk
          </div>
        )}
      </div>
      
      <div className="patient-info mb-lg">
        <div className="patient-info-item">
          <span className="patient-info-label">Age:</span>
          <span>{patient.age}</span>
        </div>
        
        <div className="patient-info-item">
          <span className="patient-info-label">Gender:</span>
          <span>{patient.gender}</span>
        </div>
        
        {recentResult && (
          <div className="patient-info-item">
            <span className="patient-info-label">Condition:</span>
            <span>{recentResult.detectedCondition}</span>
          </div>
        )}
      </div>
      
      <Link to={`/doctor/patient/${patient.id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  );
}

export default PatientCard;