
import React, { useEffect } from 'react';
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
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className={`w-full max-w-md ${theme === 'light' ? 'neu-card light' : 'neu-card dark'}`}>
        <AuthHeader />
        <AuthForm />
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>By signing up, you agree to our</p>
          <div className="flex justify-center space-x-2 mt-1">
            <a href="#" className="text-neu-accent-primary hover:underline">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="text-neu-accent-primary hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-center w-full text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Utopia Kingdoms. All rights reserved.
      </div>
    </div>
  );
};

export default Auth;
