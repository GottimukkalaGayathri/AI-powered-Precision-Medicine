import RiskIndicator from './RiskIndicator';

function ResultsCard({ result, doctor }) {
  // Safe handling: convert to array if it's a string
  let lifestyleChanges = [];
  try {
    lifestyleChanges = Array.isArray(result.recommendedLifestyleChanges)
      ? result.recommendedLifestyleChanges
      : JSON.parse(result.recommendedLifestyleChanges || '[]');
  } catch (e) {
    console.error('Invalid lifestyle changes format:', result.recommendedLifestyleChanges);
    lifestyleChanges = [];
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">AI Analysis Results</h3>
        <RiskIndicator level={result.riskLevel || 'Unknown'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Detected Condition</label>
            <div className="text-lg font-medium">{result.detectedCondition || 'N/A'}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
            <div className="text-lg">{result.createdAt || 'N/A'}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Assigned Doctor</label>
            <div className="text-lg font-medium">{doctor?.name || 'Not assigned'}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Specialization</label>
            <div className="text-lg">{doctor?.specialization || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Recommended Treatment</label>
        <div className="bg-gray-50 rounded-lg p-4 text-lg">
          {result.recommendedTreatment || 'No treatment specified'}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Recommended Lifestyle Changes</label>
        <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
          {lifestyleChanges.map((change, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-primary-600">•</span>
              <span>{change}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.doctorReviewed && result.doctorNotes && (
        <div className="bg-primary-50 rounded-lg p-6 border-l-4 border-primary-600">
          <label className="block text-sm font-medium text-primary-900 mb-2">Doctor's Notes</label>
          <div className="text-lg text-primary-800">{result.doctorNotes}</div>
        </div>
      )}
    </div>
  );
}

export default ResultsCard;
