import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function PatientForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState('symptoms');
  const [formData, setFormData] = useState({
    symptoms: [],
    newSymptom: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      bloodSugar: ''
    },
    lifestyle: {
      smoking: '',
      alcohol: '',
      exercise: '',
      diet: '',
      sleep: ''
    },
    genetics: {
      familyHistory: [],
      geneticConditions: [],
      ancestryBackground: ''
    },
    habits: {
      sleepHours: '',
      stressLevel: '',
      dietaryRestrictions: [],
      physicalActivity: '',
      screenTime: ''
    },
    medications: [],
    newMedication: '',
    files: [],
    reportFile: null,
    reportFileName: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [category, field] = name.split('.');
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

const handleSubmit = async () => {
  setError('');
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:5000/api/analyze', {
      ...formData,
      patientId: user.id
    });

    const aiResult = {
      ...response.data,
      id: response.data.resultId,
      patientId: user.id,
      doctorId: user.doctorId || ''
    };

    toast.success('Analysis completed successfully!');
    navigate(`/results/${aiResult.id}`, {
      state: {
        result: aiResult,
        showModal: true
      }
    });
  } catch (err) {
    console.error('Error submitting data:', err);
    setError('An error occurred during analysis.');
    toast.error('Analysis failed. Please try again.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-8 text-center">Health Data Submission</h3>
      
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          className={`px-6 py-3 rounded-lg transition-colors ${activeStep === 'symptoms' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveStep('symptoms')}
        >
          Symptoms & Vitals
        </button>
        <button
          className={`px-6 py-3 rounded-lg transition-colors ${activeStep === 'genetics' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveStep('genetics')}
        >
          Genetic Data
        </button>
        <button
          className={`px-6 py-3 rounded-lg transition-colors ${activeStep === 'habits' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveStep('habits')}
        >
          Lifestyle & Habits
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>}
      
      <form className="space-y-8">

        {activeStep === 'symptoms' && (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Add a symptom"
                    value={formData.newSymptom}
                    onChange={(e) => setFormData({ ...formData, newSymptom: e.target.value })}
                  />
                  <button 
                    type="button" 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                    onClick={() => {
                      if (formData.newSymptom.trim()) {
                        setFormData({
                          ...formData,
                          symptoms: [...formData.symptoms, formData.newSymptom.trim()],
                          newSymptom: ''
                        });
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
                
                {formData.symptoms.length > 0 && (
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {formData.symptoms.map((symptom, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          {symptom}
                          <button 
                            type="button" 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              const updatedSymptoms = [...formData.symptoms];
                              updatedSymptoms.splice(index, 1);
                              setFormData({ ...formData, symptoms: updatedSymptoms });
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4">Vital Signs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure (mmHg)</label>
                    <input 
                      type="text" 
                      name="vitals.bloodPressure" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. 120/80"
                      value={formData.vitals.bloodPressure}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
                    <input 
                      type="number" 
                      name="vitals.heartRate" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. 75"
                      value={formData.vitals.heartRate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°F)</label>
                    <input 
                      type="number" 
                      name="vitals.temperature" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. 98.6"
                      step="0.1"
                      value={formData.vitals.temperature}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Respiratory Rate</label>
                    <input 
                      type="number" 
                      name="vitals.respiratoryRate" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. 16"
                      value={formData.vitals.respiratoryRate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Medical Reports/Images</label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium mb-2">Uploaded Files:</h5>
                    <ul className="space-y-2">
                      {formData.files.map((file, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeStep === 'genetics' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Medical History</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.genetics.familyHistory.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  genetics: {
                    ...formData.genetics,
                    familyHistory: e.target.value.split('\n').filter(item => item.trim())
                  }
                })}
                placeholder="Enter family medical conditions (one per line)"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Known Genetic Conditions</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.genetics.geneticConditions.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  genetics: {
                    ...formData.genetics,
                    geneticConditions: e.target.value.split('\n').filter(item => item.trim())
                  }
                })}
                placeholder="Enter known genetic conditions (one per line)"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ancestry Background</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.genetics.ancestryBackground}
                onChange={(e) => setFormData({
                  ...formData,
                  genetics: {
                    ...formData.genetics,
                    ancestryBackground: e.target.value
                  }
                })}
                placeholder="Enter your ancestry background"
              />
            </div>
          </div>
        )}

        {activeStep === 'habits' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Sleep Hours</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.habits.sleepHours}
                onChange={(e) => setFormData({
                  ...formData,
                  habits: {
                    ...formData.habits,
                    sleepHours: e.target.value
                  }
                })}
              >
                <option value="">Select hours of sleep</option>
                <option value="<5">Less than 5 hours</option>
                <option value="5-6">5-6 hours</option>
                <option value="6-7">6-7 hours</option>
                <option value="7-8">7-8 hours</option>
                <option value="8+">More than 8 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.habits.stressLevel}
                onChange={(e) => setFormData({
                  ...formData,
                  habits: {
                    ...formData.habits,
                    stressLevel: e.target.value
                  }
                })}
              >
                <option value="">Select stress level</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Physical Activity</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.habits.physicalActivity}
                onChange={(e) => setFormData({
                  ...formData,
                  habits: {
                    ...formData.habits,
                    physicalActivity: e.target.value
                  }
                })}
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Exercise</option>
                <option value="moderate">Moderate Exercise</option>
                <option value="active">Very Active</option>
                <option value="athlete">Athletic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.lifestyle.smoking}
                onChange={(e) => setFormData({
                  ...formData,
                  lifestyle: {
                    ...formData.lifestyle,
                    smoking: e.target.value
                  }
                })}
              >
                <option value="">Select smoking status</option>
                <option value="never">Never smoked</option>
                <option value="former">Former smoker</option>
                <option value="current">Current smoker</option>
                <option value="occasional">Occasional smoker</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alcohol Consumption</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                value={formData.lifestyle.alcohol}
                onChange={(e) => setFormData({
                  ...formData,
                  lifestyle: {
                    ...formData.lifestyle,
                    alcohol: e.target.value
                  }
                })}
              >
                <option value="">Select alcohol consumption</option>
                <option value="none">No alcohol</option>
                <option value="occasional">Occasional (1-2 drinks/month)</option>
                <option value="moderate">Moderate (1-2 drinks/week)</option>
                <option value="frequent">Frequent (3+ drinks/week)</option>
              </select>
            </div>
          </div>
        )}

    <div className="flex justify-between pt-8">
  {activeStep !== 'symptoms' && (
    <button
      type="button"
      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
      onClick={() => {
        if (activeStep === 'genetics') setActiveStep('symptoms');
        else if (activeStep === 'habits') setActiveStep('genetics');
      }}
    >
      Previous
    </button>
  )}

  {activeStep !== 'habits' ? (
    <button
      type="button"
      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
      onClick={() => {
        if (activeStep === 'symptoms') setActiveStep('genetics');
        else if (activeStep === 'genetics') setActiveStep('habits');
      }}
    >
      Next
    </button>
  ) : (
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Submit for AI Analysis'}
    </button>
  )}
</div>



      </form>
    </div>
  );
}

export default PatientForm;