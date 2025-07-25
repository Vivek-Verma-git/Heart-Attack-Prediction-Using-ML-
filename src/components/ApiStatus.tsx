import React from 'react';
import { Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ApiStatusProps {
  isConnected: boolean | null;
  apiUrl: string;
}

export function ApiStatus({ isConnected, apiUrl }: ApiStatusProps) {
  if (isConnected === null) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center text-gray-600">
        <Globe className="h-5 w-5 mr-2 animate-pulse" />
        <div className="flex-1">
          <span className="text-sm font-medium">Checking API connection...</span>
          <p className="text-xs text-gray-500 mt-1">Connecting to: {apiUrl}</p>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center text-green-800">
        <CheckCircle2 className="h-5 w-5 mr-2" />
        <div className="flex-1">
          <span className="text-sm font-medium">✅ Connected to ML Backend</span>
          <p className="text-xs text-green-600 mt-1">API: {apiUrl}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center text-red-800">
      <AlertCircle className="h-5 w-5 mr-2" />
      <div className="flex-1">
        <span className="text-sm font-medium">❌ Backend Connection Failed</span>
        <p className="text-xs text-red-600 mt-1">Cannot reach: {apiUrl}</p>
        <p className="text-xs text-red-500 mt-1">Check if your backend is running and accessible</p>
      </div>
    </div>
  );
}
