import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Heart } from 'lucide-react';

export function Login() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      navigate('/symptoms');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Heart Health Assessment</h2>
        </div>

        <div className="space-y-4 text-gray-600">
          <h3 className="font-semibold text-lg">Features:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Preliminary symptom assessment</li>
            <li>Detailed health evaluation</li>
            <li>AI-powered risk prediction</li>
            <li>Instant results and recommendations</li>
          </ul>

          <h3 className="font-semibold text-lg mt-6">Medical Disclaimer:</h3>
          <p className="text-sm">
            This application is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="ml-2 text-sm">
                I understand and agree to the terms and medical disclaimer
              </span>
            </label>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!agreed}
          className="w-full"
        >
          Continue to Assessment
        </Button>
      </div>
    </div>
  );
}