import React from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
    email: string;
    password: string;
    name?: string;
  };
}

export function AuthForm({ type, onSubmit, onChange, values }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {type === 'signup' && (
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={onChange}
          required
        />
      )}
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={onChange}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        required
      />
      <Button type="submit" className="w-full">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  );
}