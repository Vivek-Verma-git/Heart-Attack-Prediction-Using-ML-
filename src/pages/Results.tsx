import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { AlertTriangle, Heart } from 'lucide-react';

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { risk, detailed } = location.state as { risk: number; detailed?: boolean };

  // Determine risk level and color
  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { level: 'Low', color: 'text-green-600' };
    if (risk < 60) return { level: 'Moderate', color: 'text-yellow-600' };
    return { level: 'High', color: 'text-red-600' };
  };

  const { level, color } = getRiskLevel(risk);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {/* Icon based on risk level */}
          {risk >= 60 ? (
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          ) : (
            <Heart className="mx-auto h-12 w-12 text-blue-500" />
          )}

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Assessment Results
          </h2>
        </div>

        <div className="space-y-6">
          {/* Risk Level and Score */}
          <div className="text-center">
            <p className="text-lg text-gray-600">Risk Level:</p>
            <p className={`text-2xl font-bold ${color}`}>{level}</p>
            <p className="text-sm text-gray-500 mt-2">
              Risk Score: {risk.toFixed(1)}%
            </p>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Recommendations:</h3>
            <ul className="space-y-2 text-gray-600">
              {risk >= 60 && (
                <li className="text-red-600 font-semibold">
                  ⚠️ Seek immediate medical attention
                </li>
              )}
              <li>Schedule a check-up with your healthcare provider</li>
              <li>Monitor your symptoms regularly</li>
              <li>Maintain a healthy lifestyle</li>
              <li>Keep track of your blood pressure</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="text-sm text-gray-500 mt-4">
            <p className="font-semibold">Important Note:</p>
            <p>
              This assessment is not a medical diagnosis. Always consult with healthcare professionals for proper medical advice.
            </p>
          </div>

          {/* Navigation Button */}
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            className="w-full"
          >
            Start New Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}
