
import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading your kingdom...' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neu-accent-primary mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
