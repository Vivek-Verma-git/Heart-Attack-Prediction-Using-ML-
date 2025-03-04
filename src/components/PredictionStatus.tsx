import React from 'react';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PredictionStatusProps {
  status: 'idle' | 'loading' | 'error' | 'success';
  message?: string;
}

export function PredictionStatus({ status, message }: PredictionStatusProps) {
  const statusConfig = {
    idle: { icon: null, color: 'text-gray-500' },
    loading: { icon: Loader2, color: 'text-blue-500' },
    error: { icon: AlertCircle, color: 'text-red-500' },
    success: { icon: CheckCircle2, color: 'text-green-500' },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  if (!Icon) return null;

  return (
    <div className={`flex items-center gap-2 ${config.color}`}>
      <Icon className={`h-5 w-5 ${status === 'loading' ? 'animate-spin' : ''}`} />
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
}