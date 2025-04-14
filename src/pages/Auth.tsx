
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/providers/ThemeProvider';
import { CrownIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';

type AuthMode = 'login' | 'register';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
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
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className={`w-full max-w-md ${theme === 'light' ? 'neu-card light' : 'neu-card dark'}`}>
        <div className="flex items-center justify-center mb-6">
          <CrownIcon className={`h-10 w-10 mr-2 ${theme === 'light' ? 'text-royal-gold' : 'text-amber-400'}`} />
          <h1 className="text-3xl font-medieval text-center">Utopia Kingdoms</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        
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
              />
            </div>
          </div>
          
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 ${theme === 'light' ? 'neu-input light' : 'neu-input dark'}`}
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${theme === 'light' ? 'neu-button light' : 'neu-button dark'}`}
            >
              {loading ? 'Processing...' : mode === 'register' ? 'Create Account' : 'Sign In'}
            </Button>
          </div>
        </form>
        
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
