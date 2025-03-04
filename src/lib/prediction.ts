import type { DetailedAssessment } from '../types';

const API_URL = 'http://localhost:8000';

export async function getPrediction(assessment: DetailedAssessment): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessment),
    });

    if (!response.ok) {
      throw new Error('Prediction failed');
    }

    const data = await response.json();
    return data.risk;
  } catch (error) {
    console.error('Prediction error:', error);
    // Fallback to mock prediction if API call fails
    return mockPrediction(assessment);
  }
}

// Fallback mock prediction function
function mockPrediction(assessment: DetailedAssessment): number {
  let risk = 0;
  
  if (assessment.age > 50) risk += 20;
  if (assessment.age > 65) risk += 15;
  if (assessment.chestPainType === 'typical') risk += 25;
  if (assessment.chestPainType === 'atypical') risk += 15;
  if (assessment.bloodPressure > 140) risk += 20;
  if (assessment.cholesterol > 200) risk += 15;
  if (assessment.exerciseAngina) risk += 20;
  risk += assessment.coloredVessels * 10;
  
  return Math.min(Math.max(risk, 0), 100);
}