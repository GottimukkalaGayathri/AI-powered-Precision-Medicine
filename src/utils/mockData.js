// Mock patient data
export const patients = [
  {
    id: 'p1',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    age: 45,
    gender: 'male',
    doctorId: 'd1',
    medicalHistory: {
      conditions: ['Hypertension', 'High Cholesterol'],
      medications: ['Lisinopril', 'Lipitor'],
      allergies: ['Penicillin'],
      surgeries: ['Appendectomy (2010)']
    }
  },
  {
    id: 'p2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    age: 35,
    gender: 'female',
    doctorId: 'd2',
    medicalHistory: {
      conditions: ['Asthma'],
      medications: ['Albuterol'],
      allergies: ['Pollen', 'Dust'],
      surgeries: []
    }
  }
];

// Mock doctor data
export const doctors = [
  {
    id: 'd1',
    name: 'Dr. Elizabeth Chen',
    email: 'dr.chen@example.com',
    password: 'doctor123',
    specialization: 'Cardiologist',
    patients: ['p1']
  },
  {
    id: 'd2',
    name: 'Dr. Michael Rodriguez',
    email: 'dr.rodriguez@example.com',
    password: 'doctor123',
    specialization: 'Pulmonologist',
    patients: ['p2']
  },
  {
    id: 'd3',
    name: 'Dr. Sarah Williams',
    email: 'dr.williams@example.com',
    password: 'doctor123',
    specialization: 'Endocrinologist',
    patients: []
  }
];

// Specialization options
export const specializations = [
  'Cardiologist',
  'Pulmonologist',
  'Endocrinologist',
  'Neurologist',
  'Gastroenterologist',
  'Oncologist',
  'Rheumatologist'
];

// Mock submissions data
export const submissions = [
  {
    id: 's1',
    patientId: 'p1',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    vitals: {
      bloodPressure: '145/90',
      heartRate: 88,
      temperature: 98.6,
      respiratoryRate: 18,
      bloodSugar: 110
    },
    lifestyle: {
      smoking: 'Former smoker (quit 2 years ago)',
      alcohol: 'Occasional (1-2 drinks/week)',
      exercise: 'Moderate (2-3 times/week)',
      diet: 'Low sodium diet',
      sleep: '6-7 hours/night'
    },
    medications: ['Lisinopril 10mg daily', 'Aspirin 81mg daily'],
    reportFile: 'cardiac_report.pdf',
    submissionDate: '2023-01-15',
    processed: true
  },
  {
    id: 's2',
    patientId: 'p2',
    symptoms: ['Wheezing', 'Cough', 'Chest tightness'],
    vitals: {
      bloodPressure: '120/80',
      heartRate: 75,
      temperature: 98.2,
      respiratoryRate: 22,
      bloodSugar: 95
    },
    lifestyle: {
      smoking: 'Never',
      alcohol: 'Rarely',
      exercise: 'Light (1-2 times/week)',
      diet: 'Balanced',
      sleep: '7-8 hours/night'
    },
    medications: ['Albuterol inhaler as needed'],
    reportFile: 'pulmonary_function_test.pdf',
    submissionDate: '2023-02-03',
    processed: true
  }
];

// Mock AI analysis results
export const aiResults = [
  {
    id: 'ai1',
    submissionId: 's1',
    patientId: 'p1',
    detectedCondition: 'Hypertensive Heart Disease',
    recommendedTreatment: 'Increase Lisinopril to 20mg daily',
    recommendedLifestyleChanges: [
      'Reduce sodium intake',
      'Daily exercise for 30 minutes',
      'Stress management techniques'
    ],
    riskLevel: 'Medium',
    doctorId: 'd1',
    doctorReviewed: true,
    doctorNotes: 'I agree with the AI assessment. Please schedule a follow-up in 2 weeks to check blood pressure response to medication change.',
    createdAt: '2023-01-15'
  },
  {
    id: 'ai2',
    submissionId: 's2',
    patientId: 'p2',
    detectedCondition: 'Moderate Persistent Asthma',
    recommendedTreatment: 'Add Fluticasone inhaler 110mcg, 2 puffs twice daily',
    recommendedLifestyleChanges: [
      'Avoid known triggers',
      'Use air purifier at home',
      'Daily breathing exercises'
    ],
    riskLevel: 'Low',
    doctorId: 'd2',
    doctorReviewed: true,
    doctorNotes: 'The AI assessment is accurate. We should also consider allergy testing at your next visit.',
    createdAt: '2023-02-03'
  }
];

// Function to simulate AI analysis
export function simulateAIAnalysis(submissionData) {
  // Determine condition and risk based on symptoms and vitals
  let detectedCondition = '';
  let riskLevel = 'Low';
  let recommendedTreatment = '';
  let doctorId = '';
  let recommendedLifestyleChanges = [];
  
  // Analyze blood pressure
  const bpParts = submissionData.vitals.bloodPressure.split('/');
  const systolic = parseInt(bpParts[0]);
  const diastolic = parseInt(bpParts[1]);
  
  // Check for heart conditions
  if (submissionData.symptoms.includes('Chest pain') || 
      systolic > 140 || diastolic > 90) {
    detectedCondition = 'Hypertensive Heart Disease';
    recommendedTreatment = 'Lisinopril 20mg daily';
    doctorId = 'd1'; // Cardiologist
    
    if (systolic > 180 || diastolic > 120) {
      riskLevel = 'High';
    } else if (systolic > 160 || diastolic > 100) {
      riskLevel = 'Medium';
    }
    
    recommendedLifestyleChanges = [
      'Reduce sodium intake',
      'Daily exercise for 30 minutes',
      'Stress management techniques'
    ];
  }
  
  // Check for respiratory conditions
  else if (submissionData.symptoms.includes('Wheezing') || 
           submissionData.symptoms.includes('Shortness of breath') ||
           submissionData.symptoms.includes('Cough')) {
    detectedCondition = 'Asthma';
    recommendedTreatment = 'Albuterol inhaler as needed, consider Fluticasone';
    doctorId = 'd2'; // Pulmonologist
    
    if (submissionData.vitals.respiratoryRate > 25) {
      riskLevel = 'High';
    } else if (submissionData.vitals.respiratoryRate > 20) {
      riskLevel = 'Medium';
    }
    
    recommendedLifestyleChanges = [
      'Avoid known triggers',
      'Use air purifier at home',
      'Daily breathing exercises'
    ];
  }
  
  // Check for diabetes
  else if (submissionData.vitals.bloodSugar > 180) {
    detectedCondition = 'Type 2 Diabetes';
    recommendedTreatment = 'Metformin 500mg twice daily';
    doctorId = 'd3'; // Endocrinologist
    
    if (submissionData.vitals.bloodSugar > 300) {
      riskLevel = 'High';
    } else if (submissionData.vitals.bloodSugar > 200) {
      riskLevel = 'Medium';
    }
    
    recommendedLifestyleChanges = [
      'Low carbohydrate diet',
      'Regular blood sugar monitoring',
      'Regular exercise'
    ];
  }
  
  // Default if no specific condition is detected
  else {
    detectedCondition = 'General Health Assessment';
    recommendedTreatment = 'No specific treatment recommended';
    doctorId = 'd1'; // Default to cardiologist
    riskLevel = 'Low';
    recommendedLifestyleChanges = [
      'Maintain balanced diet',
      'Regular exercise',
      'Annual check-ups'
    ];
  }
  
  // Generate a new result ID
  const resultId = `ai${Math.floor(Math.random() * 1000)}`;
  const submissionId = `s${Math.floor(Math.random() * 1000)}`;
  
  return {
    id: resultId,
    submissionId: submissionId,
    patientId: submissionData.patientId,
    detectedCondition,
    recommendedTreatment,
    recommendedLifestyleChanges,
    riskLevel,
    doctorId,
    doctorReviewed: false,
    doctorNotes: '',
    createdAt: new Date().toISOString().split('T')[0]
  };
}