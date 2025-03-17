
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { BriefcaseIcon } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with job-themed background */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Blur Loading Effect */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${isImageLoaded ? 'image-blur-loaded' : 'image-blur-loading'}`}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Enhanced overlay with animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          
          {/* Additional visual elements */}
          <div className="absolute inset-0 bg-gradient-mesh-vibrant opacity-40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          
          {/* Animated glow elements */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-bounce-gentle"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 container mx-auto z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Career Path with <span className="text-kod-blue">KodJobs</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Connecting talented professionals with innovative companies. Discover opportunities that match your skills and aspirations.
            </p>

            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Button asChild size="lg" className="bg-kod-blue hover:bg-kod-blueDark text-white shadow-glow">
                  <Link to="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-kod-blue hover:bg-kod-blueDark text-white shadow-glow">
                    <Link to="/signup">
                      Get Started
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                    <Link to="/login">
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <BriefcaseIcon className="h-7 w-7 text-kod-blue" />
                <span className="text-xl font-display font-semibold">
                  KodJobs
                </span>
              </Link>
              <p className="mt-2 text-gray-400 max-w-md">
                Connecting talented professionals with innovative companies worldwide.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} KodJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
