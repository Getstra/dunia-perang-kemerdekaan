
import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading your kingdom...' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className={`neu-card ${theme} flex flex-col items-center`}>
        <div className={`w-16 h-16 mb-4 rounded-full ${
          theme === 'light' 
            ? 'bg-neu-bg-light shadow-neu-light-sm' 
            : 'bg-neu-bg-dark shadow-neu-dark-sm'
        } relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-t-4 border-neu-accent-primary rounded-full animate-spin"></div>
          </div>
        </div>
        <p className={theme === 'light' ? 'text-neu-text-light' : 'text-neu-text-dark'}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
