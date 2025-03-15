
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, LogInIcon, UserPlusIcon, MenuIcon, XIcon, HomeIcon, NewspaperIcon, DollarSignIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glassmorphism shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BriefcaseIcon className="h-8 w-8 text-kod-blue" />
            <span className="text-2xl font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-kod-blue to-kod-blueDark">
              KodJobs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button asChild variant="ghost" className="text-sm font-medium">
              <Link to="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium">
              <Link to="/blog">
                <NewspaperIcon className="mr-2 h-4 w-4" />
                Blog
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium">
              <Link to="/jobs">
                <BriefcaseIcon className="mr-2 h-4 w-4" />
                Jobs
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium">
              <Link to="/pricing">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                Pricing
              </Link>
            </Button>
            
            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost" className="text-sm font-medium">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={logout} variant="ghost" className="text-sm font-medium">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-sm font-medium">
                  <Link to="/login">
                    <LogInIcon className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-kod-blue hover:bg-kod-blueDark text-white">
                  <Link to="/signup">
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6 text-kod-grayDark" />
            ) : (
              <MenuIcon className="h-6 w-6 text-kod-grayDark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism shadow-lg mt-3 mx-4 rounded-xl overflow-hidden animate-scale-in">
          <nav className="flex flex-col py-4">
            <Link to="/" className="px-6 py-3 hover:bg-kod-grayLight transition-colors flex items-center">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link to="/blog" className="px-6 py-3 hover:bg-kod-grayLight transition-colors flex items-center">
              <NewspaperIcon className="mr-2 h-4 w-4" />
              Blog
            </Link>
            <Link to="/jobs" className="px-6 py-3 hover:bg-kod-grayLight transition-colors flex items-center">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Jobs
            </Link>
            <Link to="/pricing" className="px-6 py-3 hover:bg-kod-grayLight transition-colors flex items-center">
              <DollarSignIcon className="mr-2 h-4 w-4" />
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-6 py-3 hover:bg-kod-grayLight transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-6 py-3 text-left hover:bg-kod-grayLight transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-6 py-3 hover:bg-kod-grayLight transition-colors flex items-center">
                  <LogInIcon className="mr-2 h-4 w-4" />
                  Login
                </Link>
                <Link to="/signup" className="px-6 py-3 hover:bg-kod-grayLight transition-colors flex items-center">
                  <UserPlusIcon className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
