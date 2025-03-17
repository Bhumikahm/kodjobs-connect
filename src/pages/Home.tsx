
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { BriefcaseIcon, SearchIcon, UserIcon, TrendingUpIcon } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the hero image - using a more job-focused image
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with improved job-themed background */}
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-1 h-10 rounded-full bg-white/30 overflow-hidden">
            <div className="w-full h-1/2 bg-white animate-pulse-slow rounded-full transform -translate-y-full"></div>
          </div>
          <span className="text-white/70 text-sm mt-2">Scroll Down</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KodJobs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our innovative platform offers a seamless job-seeking experience with features designed to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md card-hover border border-gray-100"
            >
              <div className="h-12 w-12 bg-kod-blue/10 rounded-lg flex items-center justify-center mb-6">
                <UserIcon className="h-6 w-6 text-kod-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Profile Building</h3>
              <p className="text-gray-600">
                Create a comprehensive profile that highlights your skills and experience to attract the right opportunities.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md card-hover border border-gray-100"
            >
              <div className="h-12 w-12 bg-kod-blue/10 rounded-lg flex items-center justify-center mb-6">
                <SearchIcon className="h-6 w-6 text-kod-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tailored Job Matches</h3>
              <p className="text-gray-600">
                Our intelligent algorithm recommends jobs that match your skills, experience, and career goals.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md card-hover border border-gray-100"
            >
              <div className="h-12 w-12 bg-kod-blue/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUpIcon className="h-6 w-6 text-kod-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Growth Tools</h3>
              <p className="text-gray-600">
                Access resources and insights to help you advance in your career and achieve your professional goals.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-kod-blue hover:bg-kod-blueDark text-white">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                {isAuthenticated ? "View Dashboard" : "Join KodJobs Today"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
            
            <div className="flex gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} KodJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
