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
  title?: string;
  summary?: string;
  skills?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  education?: string;
  experience?: string;
  resume?: boolean;
  profileImage?: boolean;
  profileImageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, dateOfBirth: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  calculateProfileCompletion: (user: User) => number;
  uploadProfileImage: (file: File) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(usersData);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const sanitizeUserData = (userData: User): User => {
    const sanitized = { ...userData } as User;
    
    Object.keys(sanitized).forEach(key => {
      const value = sanitized[key as keyof User];
      if (value !== null && typeof value === 'object' && 'value' in (value as any)) {
        (sanitized as any)[key] = '';
      }
    });
    
    return sanitized;
  };
  
  const calculateProfileCompletion = (userData: User): number => {
    const sanitizedUser = sanitizeUserData(userData);
    
    const fields = [
      { name: 'name', weight: 10 },
      { name: 'email', weight: 10 },
      { name: 'dateOfBirth', weight: 5 },
      { name: 'title', weight: 5 },
      { name: 'summary', weight: 10 },
      { name: 'phone', weight: 5 },
      { name: 'location', weight: 5 },
      { name: 'linkedin', weight: 5 },
      { name: 'github', weight: 5 },
      { name: 'skills', weight: 10 },
      { name: 'education', weight: 10 },
      { name: 'experience', weight: 10 },
      { name: 'resume', weight: 5 },
      { name: 'profileImage', weight: 5 },
    ];

    let completionPercentage = 0;

    fields.forEach(field => {
      const value = sanitizedUser[field.name as keyof User];
      if (value !== undefined && value !== null && 
          (typeof value === 'boolean' ? value === true : 
           (typeof value === 'string' ? value.trim() !== '' : true))) {
        completionPercentage += field.weight;
      }
    });

    console.log("Profile completion fields:", fields.map(f => ({ 
      field: f.name, 
      value: sanitizedUser[f.name as keyof User], 
      filled: sanitizedUser[f.name as keyof User] !== undefined && 
             sanitizedUser[f.name as keyof User] !== null && 
             (typeof sanitizedUser[f.name as keyof User] === 'boolean' ? 
               sanitizedUser[f.name as keyof User] === true : 
               (typeof sanitizedUser[f.name as keyof User] === 'string' ? 
               (sanitizedUser[f.name as keyof User] as string).trim() !== '' : true))
    })));
    
    console.log("Calculated profile completion:", completionPercentage);
    return Math.min(completionPercentage, 100);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('kodjobs_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const sanitizedUser = sanitizeUserData(parsedUser);
        const completion = calculateProfileCompletion(sanitizedUser);
        sanitizedUser.profileCompletion = completion;
        setUser(sanitizedUser);
        localStorage.setItem('kodjobs_user', JSON.stringify(sanitizedUser));
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('kodjobs_user');
      }
    }
    
    const savedUsers = localStorage.getItem('kodjobs_users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Failed to parse saved users data:', error);
      }
    } else {
      localStorage.setItem('kodjobs_users', JSON.stringify(users));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedUsers = localStorage.getItem('kodjobs_users');
      const userList = savedUsers ? JSON.parse(savedUsers) : users;
      
      const foundUser = userList.find(
        (u: User) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const safeUser = { ...foundUser };
        delete safeUser.password;
        
        safeUser.profileCompletion = calculateProfileCompletion(safeUser);
        
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

  const signup = async (name: string, email: string, password: string, dateOfBirth: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedUsers = localStorage.getItem('kodjobs_users');
      const currentUsers = savedUsers ? JSON.parse(savedUsers) : users;
      
      if (currentUsers.some((u: User) => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      if (name && email && password && dateOfBirth) {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          password,
          dateOfBirth,
        };
        
        newUser.profileCompletion = calculateProfileCompletion(newUser);
        
        const updatedUsers = [...currentUsers, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('kodjobs_users', JSON.stringify(updatedUsers));
        
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

  const uploadProfileImage = (file: File) => {
    if (!user) return;
    
    try {
      console.log("Uploading profile image:", file.name);
      
      const imageUrl = URL.createObjectURL(file);
      console.log("Created image URL:", imageUrl);
      
      const updatedUserData: Partial<User> = {
        profileImage: true,
        profileImageUrl: imageUrl
      };
      
      updateUser(updatedUserData);
      
      toast({
        title: "Profile image uploaded",
        description: "Your profile image has been updated successfully",
      });
    } catch (error) {
      console.error('Profile image upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload profile image",
        variant: "destructive",
      });
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      console.log("Raw update user data:", userData);
      
      const sanitizedUserData = Object.keys(userData).reduce((acc, key) => {
        const value = userData[key as keyof typeof userData];
        if (value !== null && typeof value === 'object' && 'value' in (value as any)) {
          acc[key] = '';
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
      
      console.log("Sanitized update user data:", sanitizedUserData);
      
      const updatedUser = { ...user, ...sanitizedUserData };
      
      const completionPercentage = calculateProfileCompletion(updatedUser);
      updatedUser.profileCompletion = completionPercentage;
      
      console.log("Updating user with data:", sanitizedUserData);
      console.log("Updated user profile completion:", completionPercentage);
      
      setUser(updatedUser);
      
      localStorage.setItem('kodjobs_user', JSON.stringify(updatedUser));
      
      const savedUsers = localStorage.getItem('kodjobs_users');
      if (savedUsers) {
        const userList = JSON.parse(savedUsers);
        const updatedUsers = userList.map((u: User) => {
          if (u.id === user.id) {
            const completeUser = { ...u, ...sanitizedUserData };
            completeUser.profileCompletion = completionPercentage;
            return completeUser;
          }
          return u;
        });
        localStorage.setItem('kodjobs_users', JSON.stringify(updatedUsers));
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
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
      updateUser,
      calculateProfileCompletion,
      uploadProfileImage
    }}>
      {children}
    </AuthContext.Provider>
  );
};
