
import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const GameFooter: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`text-center mt-8 text-sm ${theme === 'light' ? 'text-neu-text-light/60' : 'text-neu-text-dark/60'}`}>
      <p>© {new Date().getFullYear()} Rising Kingdoms - Text-Based Strategy Game</p>
    </footer>
  );
};

export default GameFooter;
