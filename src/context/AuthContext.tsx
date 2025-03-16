
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import usersData from '../data/users.json';

interface User {
  id: number | string;
  name: string;
  email: string;
  dateOfBirth?: string;
  profileCompletion?: number;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, dateOfBirth: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(usersData);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check for saved auth on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('kodjobs_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('kodjobs_user');
      }
    }
    
    // Load users from localStorage if available
    const savedUsers = localStorage.getItem('kodjobs_users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Failed to parse saved users data:', error);
      }
    } else {
      // Initialize users in localStorage
      localStorage.setItem('kodjobs_users', JSON.stringify(users));
    }
    
    setIsLoading(false);
  }, []);

  // Login function that validates against stored users
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get users from localStorage
      const savedUsers = localStorage.getItem('kodjobs_users');
      const userList = savedUsers ? JSON.parse(savedUsers) : users;
      
      // Find user with matching email and password
      const foundUser = userList.find(
        (u: User) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Create a safe user object without password for client storage
        const safeUser = { ...foundUser };
        delete safeUser.password;
        
        setUser(safeUser);
        localStorage.setItem('kodjobs_user', JSON.stringify(safeUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back to KodJobs!",
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function that stores new users
  const signup = async (name: string, email: string, password: string, dateOfBirth: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current users from localStorage
      const savedUsers = localStorage.getItem('kodjobs_users');
      const currentUsers = savedUsers ? JSON.parse(savedUsers) : users;
      
      // Check if email already exists
      if (currentUsers.some((u: User) => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // For demo purposes, just check if required fields are not empty
      if (name && email && password && dateOfBirth) {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          password, // Store password for local authentication
          dateOfBirth,
          profileCompletion: 15, // Initial profile completion percentage
        };
        
        // Add user to the list
        const updatedUsers = [...currentUsers, newUser];
        setUsers(updatedUsers);
        
        // Store updated users in localStorage
        localStorage.setItem('kodjobs_users', JSON.stringify(updatedUsers));
        
        // Create a safe user object without password for client storage
        const safeUser = { ...newUser };
        delete safeUser.password;
        
        setUser(safeUser);
        localStorage.setItem('kodjobs_user', JSON.stringify(safeUser));
        
        toast({
          title: "Account created",
          description: "Welcome to KodJobs!",
        });
        
        return true;
      } else {
        toast({
          title: "Signup failed",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "An error occurred during signup",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kodjobs_user');
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('kodjobs_user', JSON.stringify(updatedUser));
      
      // Update user in users list as well
      const savedUsers = localStorage.getItem('kodjobs_users');
      if (savedUsers) {
        const userList = JSON.parse(savedUsers);
        const updatedUsers = userList.map((u: User) => 
          u.id === user.id ? { ...u, ...userData } : u
        );
        localStorage.setItem('kodjobs_users', JSON.stringify(updatedUsers));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
