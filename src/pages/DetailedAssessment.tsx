import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { PredictionStatus } from '../components/PredictionStatus';
import { getPrediction } from '../lib/prediction';
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
  const [assessment, setAssessment] = useState<DetailedAssessmentType>({
    age: '',
    sex: 'male',
    chestPainType: 'typical',
    restingECG: 'normal',
    fastingBloodSugar: 0,
    cholesterol: '',
    bloodPressure: '',
    maxHeartRate: '',
    exerciseAngina: false,
    oldpeak: 0,
    slope: 'upsloping',
    coloredVessels: 0,
    thal: 'normal'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const risk = await getPrediction(assessment);
      setStatus('success');
      setTimeout(() => {
        navigate('/results', { state: { risk, detailed: true } });
      }, 1000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to get prediction. Please try again.');
      console.error('Prediction error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: name === 'exerciseAngina'
        ? value === 'true'
        : ['age', 'fastingBloodSugar', 'cholesterol', 'bloodPressure', 'maxHeartRate', 'coloredVessels', 'oldpeak'].includes(name)
          ? Number(value)
          : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Detailed Health Assessment</h2>
          <p className="mt-2 text-gray-600">Please provide your health information for a more accurate prediction:</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={assessment.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Sex */}
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
            <select
              id="sex"
              name="sex"
              value={assessment.sex}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Chest Pain Type */}
          <div>
            <label htmlFor="chestPainType" className="block text-sm font-medium text-gray-700">Chest Pain Type</label>
            <select
              id="chestPainType"
              name="chestPainType"
              value={assessment.chestPainType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0}>Normal</option>
              <option value={1}>ST-T wave abnormality</option>
              <option value={2}>probable/definite left ventricular hypertrophy</option>
              
            </select>
          </div>

          <div>
            <label htmlFor="restingECG" className="block text-sm font-medium text-gray-700">Resting ECG</label>
            <select
              id="restingECG"
              name="restingECG"
              value={assessment.restingECG}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              
            </select>
          </div>

          {/* Fasting Blood Sugar */}
          <div>
            <label htmlFor="fastingBloodSugar" className="block text-sm font-medium text-gray-700">Fasting Blood Sugar (greater than 120 gm/dL(Diabetic))</label>
            <input
              type="number"
              id="fastingBloodSugar"
              name="fastingBloodSugar"
              value={assessment.fastingBloodSugar}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Cholesterol */}
          <div>
            <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-700">Cholesterol(mg/dL)</label>
            <input
              type="number"
              id="cholesterol"
              name="cholesterol"
              value={assessment.cholesterol}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Blood Pressure */}
          <div>
            <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">Blood Pressure(mm Hg)</label>
            <input
              type="number"
              id="bloodPressure"
              name="bloodPressure"
              value={assessment.bloodPressure}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Max Heart Rate */}
          <div>
            <label htmlFor="maxHeartRate" className="block text-sm font-medium text-gray-700">Max Heart Rate (bpm)</label>
            <input
              type="number"
              id="maxHeartRate"
              name="maxHeartRate"
              value={assessment.maxHeartRate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Exercise Angina */}
          <div>
            <label htmlFor="exerciseAngina" className="block text-sm font-medium text-gray-700">Exercise Angina</label>
            <select
              id="exerciseAngina"
              name="exerciseAngina"
              value={assessment.exerciseAngina}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Old Peak Value */}
          <div>
            <label htmlFor="oldpeak" className="block text-sm font-medium text-gray-700">Old Peak Value(0.0 - 1)</label>
            <input
              type="number"
              id="oldpeak"
              name="oldpeak"
              value={assessment.oldpeak}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Slope */}
          <div>
            <label htmlFor="slope" className="block text-sm font-medium text-gray-700">Slope</label>
            <select
              id="slope"
              name="slope"
              value={assessment.slope}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="upsloping">Upsloping</option>
              <option value="flat">Flat</option>
              <option value="downsloping">Downsloping</option>
            </select>
          </div>

          {/* Colored Vessels */}
          <div>
            <label htmlFor="coloredVessels" className="block text-sm font-medium text-gray-700">Colored Vessels</label>
            <select
              id="coloredVessels"
              name="coloredVessels"
              value={assessment.coloredVessels}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>

          {/* Thal */}
          <div>
            <label htmlFor="thal" className="block text-sm font-medium text-gray-700">Thal Type</label>
            <select
              id="thal"
              name="thal"
              value={assessment.thal}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={1}>Normal</option>
              <option value={2}>Fixed Defect</option>
              <option value={3}>Reversible Defect</option>
            </select>
          </div>

          {/* Status and Error Messages */}
          <div className="pt-4 space-y-4">
            <PredictionStatus
              status={status}
              message={status === 'loading' ? 'Analyzing your health data...' : errorMessage}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              disabled={status === 'loading'}
            >
              Get Prediction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
