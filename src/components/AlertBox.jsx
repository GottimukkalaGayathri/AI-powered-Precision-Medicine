import { Link } from 'react-router-dom';

function AlertBox({ message, level = 'danger', doctorName, doctorId }) {
  return (
    <div className={`alert alert-${level} slide-up`}>
      <h4 className="mb-sm">⚠️ Urgent Health Alert</h4>
      <p className="mb-sm">{message}</p>
      
      {doctorName && (
        <div className="mt-md">
          <p className="mb-sm">Your assigned specialist:</p>
          <div className="d-flex align-center gap-md">
            <div className="doctor-avatar">
              {doctorName.charAt(0)}
            </div>
            <div>
              <p className="mb-0"><strong>{doctorName}</strong></p>
              <Link to={`/doctor/${doctorId}`} className="btn btn-sm btn-danger mt-sm">
                Contact Doctor
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertBox;