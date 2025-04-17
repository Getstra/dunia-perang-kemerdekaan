
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import AuthHeader from '@/components/AuthHeader';
import AuthForm from '@/components/AuthForm';
import ThemeToggle from '@/components/ThemeToggle';

const Auth = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/20 via-slate-600/10 to-indigo-200/20 dark:from-indigo-900/20 dark:via-slate-900/10 dark:to-indigo-900/20"></div>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className={`w-full max-w-md ${theme === 'light' ? 'glass-card' : 'glass-card dark'} shadow-xl`}>
        <AuthHeader />
        <AuthForm />
        
        <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/5 text-center text-sm text-muted-foreground">
          <p>By signing up, you agree to our</p>
          <div className="flex justify-center space-x-2 mt-1">
            <a href="#" className="text-neu-accent-primary hover:underline">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="text-neu-accent-primary hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-center w-full text-xs text-white/60 dark:text-white/40">
        &copy; {new Date().getFullYear()} Rising Kingdoms. All rights reserved.
      </div>
    </div>
  );
};

export default Auth;
