import type { DetailedAssessment } from '../pages';

const API_URL = 'https://heart-attack-prediction-using-ml.onrender.com';

// Log the API URL for debugging
console.log('🔗 Backend API URL:', API_URL);

export async function getPrediction(assessment: DetailedAssessment): Promise<number> {
  try {
    console.log('📤 Making prediction request to:', `${API_URL}/predict`);
    console.log('📋 Assessment data:', assessment);
    
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessment),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API Error:', errorData);
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Prediction response:', data);
    return data.risk;
  } catch (error) {
    console.error('❌ Prediction API error:', error);
    // Fallback to mock prediction if API call fails
    throw error; // Let the component handle the error display
  }
}

// Fallback mock prediction function (kept for development/testing)
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

// Health check function to verify backend connectivity
export async function checkBackendHealth(): Promise<boolean> {
  try {
    console.log('🏥 Checking backend health:', `${API_URL}/health`);
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const isHealthy = response.ok;
    console.log('🏥 Backend health status:', isHealthy ? '✅ Healthy' : '❌ Unhealthy');
    return isHealthy;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    return false;
  }
}
