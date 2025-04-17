
import React from 'react';
import { CrownIcon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

const AuthHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center justify-center mb-6 relative">
        <div className="absolute -z-10 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-lg opacity-70"></div>
        <CrownIcon className={`h-12 w-12 ${theme === 'light' ? 'text-royal-gold animate-pulse drop-shadow-lg' : 'text-amber-400 animate-pulse drop-shadow-lg'}`} />
      </div>
      
      <h1 className="text-4xl font-medieval text-center bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-md mb-4">
        Rising Kingdoms
      </h1>
      
      <h2 className="text-2xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-400">
        Join the Adventure
      </h2>
      
      <p className="text-center text-white/80 dark:text-white/70 max-w-md px-6">
        Build your kingdom, train your army, and compete with other rulers in this epic strategy game.
      </p>
    </div>
  );
};

export default AuthHeader;
