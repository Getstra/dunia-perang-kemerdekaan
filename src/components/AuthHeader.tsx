
import React from 'react';
import { CrownIcon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

const AuthHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex items-center justify-center mb-4">
        <CrownIcon className={`h-10 w-10 mr-2 ${theme === 'light' ? 'text-royal-gold animate-pulse' : 'text-amber-400 animate-pulse'}`} />
        <h1 className="text-3xl font-medieval text-center bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">Utopia Kingdoms</h1>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        Join the Medieval Adventure
      </h2>
      
      <p className="text-center text-muted-foreground max-w-md">
        Build your kingdom, train your army, and compete with other rulers in this epic strategy game.
      </p>
    </div>
  );
};

export default AuthHeader;
