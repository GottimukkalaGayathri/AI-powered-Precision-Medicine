import { useState } from 'react';
import { toast } from 'react-toastify';

function DoctorReviewForm({ result, onSubmit }) {
  const [doctorNotes, setDoctorNotes] = useState(result.doctorNotes || '');
  const [recommendedTreatment, setRecommendedTreatment] = useState(result.recommendedTreatment || '');
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctorId) {
      toast.error('Please enter your doctor ID');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        ...result,
        doctorNotes,
        recommendedTreatment,
        doctorReviewed: true,
        doctorId
      });
      
      setLoading(false);
      toast.success('Review submitted successfully');
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-semibold mb-6">Doctor Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doctor ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            placeholder="Enter your doctor ID"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Treatment</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={recommendedTreatment}
            onChange={(e) => setRecommendedTreatment(e.target.value)}
            placeholder="Enter or modify the recommended treatment..."
            rows={4}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Notes</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            placeholder="Add your notes or instructions for the patient..."
            rows={4}
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorReviewForm;