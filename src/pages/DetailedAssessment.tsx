import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { PredictionStatus } from '../components/PredictionStatus';
import { ApiStatus } from '../components/ApiStatus';
import { getPrediction, checkBackendHealth } from '../lib/prediction';
import type { 
  DetailedAssessment as DetailedAssessmentType,
  ChestPainType,
  SlopeType,
  ThalType
} from '../types';

export function DetailedAssessment() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const [assessment, setAssessment] = useState<DetailedAssessmentType>({
    age: 0,
    sex: 'male',
    chestPainType: 'typical',
    restingECG: 'normal',
    fastingBloodSugar: 0,
    cholesterol: 0,
    bloodPressure: 0,
    maxHeartRate: 0,
    exerciseAngina: false,
    oldpeak: 0,
    slope: 'upsloping',
    coloredVessels: 0,
    thal: 'normal'
  });

  // Check backend connectivity on component mount
  React.useEffect(() => {
    const checkConnection = async () => {
      console.log('🔍 Checking backend connection...');
      const isConnected = await checkBackendHealth();
      console.log('🔍 Backend connection result:', isConnected);
      setBackendConnected(isConnected);
    };
    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Starting prediction process...');
    setStatus('loading');
    setErrorMessage('');

    try {
      console.log('📊 Sending assessment data for prediction...');
      const risk = await getPrediction(assessment);
      console.log('🎯 Received risk prediction:', risk);
      setStatus('success');
      setTimeout(() => {
        console.log('🔄 Navigating to results page...');
        navigate('/results', { state: { risk, detailed: true } });
      }, 1500);
    } catch (error) {
      console.error('💥 Prediction failed:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? `Prediction failed: ${error.message}` 
          : 'Failed to get prediction. Please check your connection and try again.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: name === 'exerciseAngina' ? (value === 'true') : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Detailed Health Assessment</h2>
          <p className="mt-2 text-gray-600">Please provide your health information for a more accurate prediction:</p>
        </div>

        {backendConnected === false && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center text-yellow-800">
            <span className="text-sm">⚠️ Backend service may be unavailable. Predictions might be delayed.</span>
          </div>
        )}

        {backendConnected === true && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center text-green-800">
            <span className="text-sm">✅ Connected to prediction service</span>
          </div>
        )}

        <ApiStatus 
          isConnected={backendConnected} 
          apiUrl="https://heart-attack-prediction-using-ml.onrender.com" 
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={assessment.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
              <select
                name="sex"
                value={assessment.sex}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chest Pain Type</label>
              <select
                name="chestPainType"
                value={assessment.chestPainType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="typical">Typical Angina</option>
                <option value="atypical">Atypical Angina</option>
                <option value="nonAnginal">Non-Anginal Pain</option>
                <option value="asymptomatic">Asymptomatic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (mmHg)</label>
              <input
                type="number"
                name="bloodPressure"
                value={assessment.bloodPressure}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="80"
                max="200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cholesterol (mg/dl)</label>
              <input
                type="number"
                name="cholesterol"
                value={assessment.cholesterol}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="100"
                max="400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fasting Blood Sugar (mg/dl)</label>
              <input
                type="number"
                name="fastingBloodSugar"
                value={assessment.fastingBloodSugar}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="70"
                max="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Heart Rate</label>
              <input
                type="number"
                name="maxHeartRate"
                value={assessment.maxHeartRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="60"
                max="220"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Induced Angina</label>
              <select
                name="exerciseAngina"
                value={assessment.exerciseAngina.toString()}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ST Depression (Oldpeak)</label>
              <input
                type="number"
                name="oldpeak"
                value={assessment.oldpeak}
                onChange={handleChange}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                max="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ST Slope</label>
              <select
                name="slope"
                value={assessment.slope}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="upsloping">Upsloping</option>
                <option value="flat">Flat</option>
                <option value="downsloping">Downsloping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Colored Vessels</label>
              <select
                name="coloredVessels"
                value={assessment.coloredVessels}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thalassemia</label>
              <select
                name="thal"
                value={assessment.thal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="normal">Normal</option>
                <option value="fixedDefect">Fixed Defect</option>
                <option value="reversibleDefect">Reversible Defect</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 space-y-4">
            <PredictionStatus 
              status={status} 
              message={
                status === 'loading' 
                  ? 'Analyzing your health data with AI...' 
                  : status === 'success'
                  ? 'Analysis complete! Redirecting to results...'
                  : errorMessage
              } 
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Analyzing...' : 'Get AI Prediction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
