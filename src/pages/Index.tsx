
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { LogInIcon, UserPlusIcon, BriefcaseIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Enhanced animated background with gradient mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 z-0"></div>
      
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 z-0"></div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient z-0"></div>
      
      {/* Animated colorful orbs */}
      <motion.div 
        initial={{ x: "10vw", y: "10vh" }}
        animate={{ 
          x: ["10vw", "15vw", "5vw", "10vw"],
          y: ["10vh", "15vh", "5vh", "10vh"]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute h-56 w-56 rounded-full bg-purple-500/20 filter blur-3xl"
      />
      
      <motion.div 
        initial={{ x: "80vw", y: "30vh" }}
        animate={{ 
          x: ["80vw", "85vw", "75vw", "80vw"],
          y: ["30vh", "25vh", "35vh", "30vh"]
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 1 }}
        className="absolute h-64 w-64 rounded-full bg-blue-500/20 filter blur-3xl"
      />
      
      <motion.div 
        initial={{ x: "50vw", y: "70vh" }}
        animate={{ 
          x: ["50vw", "45vw", "55vw", "50vw"],
          y: ["70vh", "75vh", "65vh", "70vh"]
        }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 2 }}
        className="absolute h-72 w-72 rounded-full bg-pink-500/20 filter blur-3xl"
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-r from-kod-blue to-purple-500 shadow-lg flex items-center justify-center overflow-hidden">
              <BriefcaseIcon className="h-10 w-10 text-white absolute transform translate-y-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-kod-blue/30 to-transparent"></div>
            </div>
            <span className="text-5xl font-display font-semibold ml-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-kod-blue to-kod-blueDark">Kod</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Jobs</span>
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
          >
            Find Your Perfect <span className="text-gradient-blue">Career Path</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Connecting talented professionals with innovative companies. Discover opportunities 
            that match your skills and aspirations.
          </motion.p>
          
          {/* CTA Buttons - Made larger and more prominent */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-kod-blue to-kod-blueDark hover:from-kod-blueDark hover:to-kod-blue text-white px-10 py-7 text-xl h-auto shadow-glow">
              <Link to="/signup">
                <UserPlusIcon className="mr-3 h-6 w-6" />
                Sign Up
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-xl h-auto">
              <Link to="/login">
                <LogInIcon className="mr-3 h-6 w-6" />
                Login
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-bounce-gentle"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-bounce-gentle"></div>
    </div>
  );
};

export default Index;
