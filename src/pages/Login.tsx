
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { EyeIcon, EyeOffIcon, LogInIcon, SparklesIcon } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials and try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl z-10"
      >
        <div className="relative h-32 bg-gradient-to-r from-kod-blue to-kod-blueLight">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
            <div className="bg-kod-blue rounded-full w-16 h-16 flex items-center justify-center">
              <LogInIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute -bottom-6 left-4 right-4 flex justify-between"
          >
            <div className="h-3 w-3 rounded-full bg-white/20 blur-sm"></div>
            <div className="h-2 w-2 rounded-full bg-white/20 blur-sm"></div>
            <div className="h-4 w-4 rounded-full bg-white/30 blur-sm"></div>
            <div className="h-2 w-2 rounded-full bg-white/20 blur-sm"></div>
            <div className="h-3 w-3 rounded-full bg-white/20 blur-sm"></div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 p-8 md:p-10 pt-16 rounded-2xl"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-kod-blue to-kod-blueLight bg-clip-text text-transparent">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your KodJobs account</p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-kod-blue focus:border-kod-blue transition-all duration-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <Link to="/forgot-password" className="text-sm text-kod-blue hover:text-kod-blueDark transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-kod-blue focus:border-kod-blue transition-all duration-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-kod-blue to-kod-blueLight hover:from-kod-blueDark hover:to-kod-blue text-white transition-all duration-300 py-2.5 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <SparklesIcon className="mr-2 h-5 w-5" />
                    Sign In
                  </span>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants} 
            className="mt-8 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-kod-blue hover:text-kod-blueDark transition-colors">
                Create Account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 z-10"
      >
        <Link to="/" className="text-white hover:text-kod-blue transition-colors flex items-center gap-1">
          &larr; Back to home
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
