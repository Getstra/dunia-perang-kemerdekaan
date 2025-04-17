
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
          ? 'bg-white text-black shadow-md hover:shadow-lg' 
          : 'bg-black text-white shadow-md hover:shadow-lg'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
