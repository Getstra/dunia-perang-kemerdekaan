
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  CrownIcon, 
  LockIcon, 
  MailIcon, 
  UserIcon, 
  EyeIcon, 
  EyeOffIcon,
  LoaderIcon,
  AlertTriangleIcon,
  KeyIcon
} from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

type AuthMode = 'login' | 'register' | 'forgot-password';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          navigate('/');
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'forgot-password') {
      if (!email) {
        toast({
          title: 'Email Required',
          description: 'Please enter your email address.',
          variant: 'destructive',
        });
        return;
      }
      
      setLoading(true);
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?mode=reset-password`,
        });
        
        if (error) throw error;
        
        setResetSent(true);
        toast({
          title: 'Password Reset Email Sent',
          description: 'Check your email for a password reset link.',
        });
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to send reset email.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
      return;
    }
    
    if (!email || !password || (mode === 'register' && !username)) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: 'Registration successful!',
          description: 'Please check your email to verify your account.',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        
        // Navigate is handled by the auth state listener
      }
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message || 'An error occurred during authentication',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  if (resetSent) {
    return (
      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center">
            <MailIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
        <p className="mb-4">We've sent you an email with instructions to reset your password.</p>
        <Button 
          className={`${theme === 'light' ? 'neu-button light' : 'neu-button dark'}`}
          onClick={() => setMode('login')}
        >
          Return to Login
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleAuth} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${theme === 'light' ? 'text-neu-text-light/60' : 'text-neu-text-dark/60'}`}>
              <UserIcon className="h-5 w-5" />
            </div>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`pl-10 ${theme === 'light' ? 'neu-input light' : 'neu-input dark'}`}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${theme === 'light' ? 'text-neu-text-light/60' : 'text-neu-text-dark/60'}`}>
            <MailIcon className="h-5 w-5" />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-10 ${theme === 'light' ? 'neu-input light' : 'neu-input dark'}`}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
      </div>
      
      {mode !== 'forgot-password' && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${theme === 'light' ? 'text-neu-text-light/60' : 'text-neu-text-dark/60'}`}>
              <LockIcon className="h-5 w-5" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-10 ${theme === 'light' ? 'neu-input light' : 'neu-input dark'}`}
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          
          {mode === 'register' && password && (
            <PasswordStrengthIndicator password={password} />
          )}
        </div>
      )}
      
      <div>
        <Button
          type="submit"
          disabled={loading}
          className={`w-full ${theme === 'light' ? 'neu-button light' : 'neu-button dark'} h-11`}
        >
          {loading ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              {mode === 'register' ? 'Creating Account...' : 
               mode === 'forgot-password' ? 'Sending Reset Link...' : 'Signing In...'}
            </>
          ) : (
            mode === 'register' ? 'Create Account' : 
            mode === 'forgot-password' ? 'Send Reset Link' : 'Sign In'
          )}
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        {mode === 'register' ? (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-neu-accent-primary hover:underline"
            >
              Sign In
            </button>
          </p>
        ) : mode === 'login' ? (
          <div className="space-y-2">
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-neu-accent-primary hover:underline"
              >
                Create Account
              </button>
            </p>
            <p>
              <button
                type="button"
                onClick={() => setMode('forgot-password')}
                className="text-muted-foreground hover:text-neu-accent-primary hover:underline text-sm"
              >
                Forgot your password?
              </button>
            </p>
          </div>
        ) : (
          <p>
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-neu-accent-primary hover:underline"
            >
              Back to Sign In
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
