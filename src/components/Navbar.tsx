
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show navbar on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated && location.pathname === '/') {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glassmorphism shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-r from-kod-blue to-purple-500 shadow-lg flex items-center justify-center overflow-hidden">
              <BriefcaseIcon className="h-6 w-6 text-white absolute transform translate-y-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-kod-blue/30 to-transparent"></div>
            </div>
            <span className="text-2xl font-display font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-kod-blue to-kod-blueDark">Kod</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Jobs</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
              <Link to="/login">
                <LogInIcon className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-kod-blue to-kod-blueDark hover:from-kod-blueDark hover:to-kod-blue text-white">
              <Link to="/signup">
                <UserPlusIcon className="mr-2 h-5 w-5" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
