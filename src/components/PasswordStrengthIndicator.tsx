
import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  // Calculate password strength
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    
    // Add points for length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Add points for complexity
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Normalize to 0-3 scale
    return Math.min(3, Math.floor(strength / 2));
  };
  
  const strength = getPasswordStrength(password);
  
  const getStrengthText = (strength: number): string => {
    switch (strength) {
      case 0: return 'Weak';
      case 1: return 'Fair';
      case 2: return 'Good';
      case 3: return 'Strong';
      default: return '';
    }
  };
  
  const getStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-green-500';
      default: return '';
    }
  };
  
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs">{getStrengthText(strength)}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`} 
          style={{ width: `${(strength + 1) * 25}%` }}
        ></div>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {strength < 3 && (
          <ul className="list-disc list-inside space-y-1 mt-2">
            {password.length < 12 && (
              <li>Use at least 12 characters</li>
            )}
            {!/[A-Z]/.test(password) && (
              <li>Include uppercase letters</li>
            )}
            {!/[a-z]/.test(password) && (
              <li>Include lowercase letters</li>
            )}
            {!/[0-9]/.test(password) && (
              <li>Include numbers</li>
            )}
            {!/[^A-Za-z0-9]/.test(password) && (
              <li>Include special characters</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
