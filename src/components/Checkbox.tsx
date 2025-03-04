import React from 'react';
import { cn } from '../lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          'w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
          className
        )}
        {...props}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}