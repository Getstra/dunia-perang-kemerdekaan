
import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
        theme === 'light' 
          ? 'bg-neu-bg-light shadow-neu-light-sm hover:shadow-neu-light' 
          : 'bg-neu-bg-dark shadow-neu-dark-sm hover:shadow-neu-dark'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-neu-text-light" />
      ) : (
        <Sun className="h-5 w-5 text-neu-text-dark" />
      )}
    </button>
  );
}
