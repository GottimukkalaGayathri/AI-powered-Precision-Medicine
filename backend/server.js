const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // MySQL connection

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint: Analyze and insert result into DB
app.post('/api/analyze', (req, res) => {
  const data = req.body;
  console.log('📥 Received data:', data);

  const { symptoms = [], vitals = {}, genetics = {}, habits = {}, patientId, doctorId } = data;
  const resultId = `res-${Date.now()}`;
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let detectedCondition = 'General Checkup';
  let riskLevel = 'Low';
  let recommendedTreatment = 'Maintain a healthy lifestyle and follow up regularly.';
  let recommendedLifestyleChanges = [];
  let recommendedMedications = [];

  // 🧠 Rule-based logic

  // Hypertension detection
  if (
    symptoms.includes('headache') ||
    (vitals.bloodPressure && vitals.bloodPressure.includes('140')) ||
    (vitals.bloodPressure && vitals.bloodPressure.includes('90'))
  ) {
    detectedCondition = 'Hypertension';
    riskLevel = 'Medium';
    recommendedTreatment = 'Monitor blood pressure daily and reduce salt intake.';
    recommendedLifestyleChanges = ['Low-sodium diet', 'Daily walk', 'Limit caffeine'];
    recommendedMedications = ['Amlodipine', 'Losartan'];
  }

  // Diabetes detection
  if (
    symptoms.includes('frequent urination') ||
    symptoms.includes('blurred vision') ||
    parseFloat(vitals.bloodSugar) > 140
  ) {
    detectedCondition = 'Type 2 Diabetes';
    riskLevel = 'High';
    recommendedTreatment = 'Use insulin or oral medication. Monitor sugar levels.';
    recommendedLifestyleChanges = ['Low sugar diet', 'Regular exercise', 'Foot care'];
    recommendedMedications = ['Metformin', 'Insulin'];
  }

  // Fever detection
  if (
    symptoms.includes('fever') ||
    symptoms.includes('body pain') ||
    parseFloat(vitals.temperature) > 99.5
  ) {
    detectedCondition = 'Fever';
    riskLevel = 'Low';
    recommendedTreatment = 'Take paracetamol. Stay hydrated and rest.';
    recommendedLifestyleChanges = ['Drink fluids', 'Get enough rest'];
    recommendedMedications = ['Paracetamol'];
  }

  // Genetic warning logic
  if (
    genetics.geneticConditions?.some(c => c.toLowerCase().includes('heart')) ||
    genetics.familyHistory?.some(f => f.toLowerCase().includes('heart'))
  ) {
    recommendedLifestyleChanges.push('Regular heart checkups', 'Avoid high cholesterol food');
  }

  // Sleep warning
  if (habits.sleepHours === '<5') {
    riskLevel = 'Medium';
    recommendedLifestyleChanges.push('Sleep at least 6–7 hours a night');
  }

  const prediction = {
    id: resultId,
    patientId,
    doctorId,
    detectedCondition,
    riskLevel,
    recommendedTreatment,
    recommendedLifestyleChanges,
    recommendedMedications,
    doctorReviewed: false,
    createdAt
  };

  const sql = `
    INSERT INTO patient_results 
      (id, patientId, doctorId, detectedCondition, riskLevel, recommendedTreatment, recommendedLifestyleChanges, recommendedMedications, doctorReviewed, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    prediction.id,
    prediction.patientId,
    prediction.doctorId,
    prediction.detectedCondition,
    prediction.riskLevel,
    prediction.recommendedTreatment,
    JSON.stringify(prediction.recommendedLifestyleChanges),
    JSON.stringify(prediction.recommendedMedications),
    prediction.doctorReviewed,
    prediction.createdAt
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ DB insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }

    console.log('✅ Inserted result into DB:', prediction);
    res.json(prediction);
  });
});

// Endpoint: Fetch a result by ID
app.get('/api/results/:id', (req, res) => {
  const resultId = req.params.id;

  const sql = `SELECT * FROM patient_results WHERE id = ?`;
  db.query(sql, [resultId], (err, results) => {
    if (err) {
      console.error('❌ DB fetch error:', err);
      return res.status(500).json({ error: 'Database fetch failed' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }

    const result = results[0];
    result.recommendedLifestyleChanges = JSON.parse(result.recommendedLifestyleChanges || '[]');
    result.recommendedMedications = JSON.parse(result.recommendedMedications || '[]'); // ✅ Add this
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
