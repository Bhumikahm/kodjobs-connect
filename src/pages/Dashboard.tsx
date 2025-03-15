
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BriefcaseIcon, UserIcon, PencilIcon, GraduationCapIcon, AwardIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GithubIcon, SaveIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample job listings
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    match: 95,
    description: "We are seeking a skilled Frontend Developer to join our team...",
    requirements: "3+ years of experience with React, TypeScript, and CSS...",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "New York, NY (Remote)",
    salary: "$80,000 - $110,000",
    type: "Full-time",
    match: 87,
    description: "Join our design team to create beautiful, user-friendly interfaces...",
    requirements: "Experience with Figma, Adobe Creative Suite, and user research...",
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartupX",
    location: "Remote",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    match: 82,
    description: "Looking for a Full Stack Developer to help build our next-gen platform...",
    requirements: "Proficiency in React, Node.js, and database technologies...",
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Innovation Labs",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    match: 78,
    description: "Guide our product team in developing cutting-edge solutions...",
    requirements: "5+ years of product management experience...",
    posted: "Just now"
  }
];

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, updateUser } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    title: '',
    summary: '',
    skills: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    education: '',
    experience: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the profile data from the API
    // For this demo, we're just setting dummy data after a timeout
    const timer = setTimeout(() => {
      setProfileData({
        title: 'Senior Frontend Developer',
        summary: 'Passionate web developer with 5+ years of experience building modern web applications.',
        skills: 'React, TypeScript, CSS, HTML, JavaScript, Node.js',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/username',
        github: 'github.com/username',
        education: 'BS Computer Science, Stanford University',
        experience: '5+ years of frontend development experience'
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-kod-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleProfileUpdate = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update profile completion percentage
      updateUser({ 
        profileCompletion: 85 
      });
      
      setIsUpdating(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-gray-600 mt-1">Let's find your perfect job match today!</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm w-full md:w-auto">
              <div className="flex items-center gap-3">
                <div className="flex-none">
                  <div className="h-12 w-12 rounded-full bg-kod-blue/10 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-kod-blue" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Profile Completion</p>
                  <div className="flex items-center gap-3">
                    <Progress value={user?.profileCompletion || 0} className="h-2 flex-1" />
                    <span className="text-sm font-medium">{user?.profileCompletion || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-10">
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="mb-8 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="recommended" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Recommended Jobs</TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Saved Jobs</TabsTrigger>
              <TabsTrigger value="applied" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Applied Jobs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {sampleJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: job.id * 0.1 }}
                  >
                    <Card className="overflow-hidden card-hover">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <CardDescription className="mt-1">{job.company} • {job.location}</CardDescription>
                          </div>
                          <div className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-800">
                            {job.match}% Match
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex gap-3 mb-4">
                          <div className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                            {job.type}
                          </div>
                          <div className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                            {job.salary}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Posted {job.posted}</span>
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BriefcaseIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No saved jobs yet</h3>
                <p className="text-gray-600 mb-4">
                  Save jobs you're interested in to revisit them later
                </p>
                <Button variant="outline">Browse Jobs</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="applied" className="mt-0">
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BriefcaseIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-4">
                  When you apply to jobs, they will appear here
                </p>
                <Button variant="outline">Browse Jobs</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Complete Your Profile</h2>
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Professional Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BriefcaseIcon className="mr-2 h-5 w-5 text-kod-blue" />
                  Professional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={profileData.title} 
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Frontend Developer" 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea 
                      id="summary" 
                      name="summary"
                      value={profileData.summary} 
                      onChange={handleInputChange}
                      placeholder="Brief overview of your experience and goals" 
                      className="mt-1" 
                      rows={4} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea 
                      id="skills" 
                      name="skills"
                      value={profileData.skills} 
                      onChange={handleInputChange}
                      placeholder="e.g. JavaScript, React, CSS, etc." 
                      className="mt-1" 
                      rows={3} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact & Education */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <UserIcon className="mr-2 h-5 w-5 text-kod-blue" />
                  Contact & Education
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-1">
                        <PhoneIcon className="h-3.5 w-3.5" />
                        Phone
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={profileData.phone} 
                        onChange={handleInputChange}
                        placeholder="Your phone number" 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location" className="flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" />
                        Location
                      </Label>
                      <Input 
                        id="location" 
                        name="location"
                        value={profileData.location} 
                        onChange={handleInputChange} 
                        placeholder="City, Country" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin" className="flex items-center gap-1">
                        <LinkedinIcon className="h-3.5 w-3.5" />
                        LinkedIn
                      </Label>
                      <Input 
                        id="linkedin" 
                        name="linkedin"
                        value={profileData.linkedin} 
                        onChange={handleInputChange}
                        placeholder="Your LinkedIn profile" 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="github" className="flex items-center gap-1">
                        <GithubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </Label>
                      <Input 
                        id="github" 
                        name="github"
                        value={profileData.github} 
                        onChange={handleInputChange}
                        placeholder="Your GitHub profile" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="education" className="flex items-center gap-1">
                      <GraduationCapIcon className="h-3.5 w-3.5" />
                      Education
                    </Label>
                    <Input 
                      id="education" 
                      name="education"
                      value={profileData.education} 
                      onChange={handleInputChange}
                      placeholder="Your highest education" 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience" className="flex items-center gap-1">
                      <AwardIcon className="h-3.5 w-3.5" />
                      Experience
                    </Label>
                    <Input 
                      id="experience" 
                      name="experience"
                      value={profileData.experience} 
                      onChange={handleInputChange}
                      placeholder="Years of relevant experience" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleProfileUpdate}
                disabled={isUpdating}
                className="bg-kod-blue hover:bg-kod-blueDark text-white"
              >
                {isUpdating ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
