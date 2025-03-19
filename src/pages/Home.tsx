
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogInIcon, UserPlusIcon } from 'lucide-react';

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
                <Button asChild size="lg" className="bg-kod-blue hover:bg-kod-blueDark text-white shadow-lg rounded-md text-lg py-6 px-8">
                  <Link to="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-kod-blue hover:bg-kod-blueDark text-white shadow-lg font-semibold text-lg px-10 py-6 h-auto rounded-md">
                    <Link to="/signup">
                      <UserPlusIcon className="mr-2 h-6 w-6" />
                      Sign Up
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white text-kod-blue border-white hover:bg-white/90 font-semibold text-lg px-10 py-6 h-auto rounded-md shadow-lg">
                    <Link to="/login">
                      <LogInIcon className="mr-2 h-6 w-6" />
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
