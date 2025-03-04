import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { calculateRisk } from '../lib/utils';
import type { Symptoms as SymptomsType } from '../types';

export function Symptoms() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<SymptomsType>({
    sleepDisruption: false,
    shortnessOfBreath: false,
    swelling: false,
    jawPain: false,
    fatigue: false,
    coldSweats: false,
    dizziness: false,
    leftHandPain: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const risk = calculateRisk(symptoms);
    
    if (risk > 30) {
      navigate('/details');
    } else {
      navigate('/results', { state: { risk } });
    }
  };

  const handleChange = (symptom: keyof SymptomsType) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: !prev[symptom]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Symptom Assessment</h2>
          <p className="mt-2 text-gray-600">Please indicate if you've experienced any of these symptoms recently:</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(symptoms).map(([key, value]) => (
            <Checkbox
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              checked={value}
              onChange={() => handleChange(key as keyof SymptomsType)}
            />
          ))}

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}