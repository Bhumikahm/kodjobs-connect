import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BriefcaseIcon, 
  UserIcon, 
  PencilIcon, 
  GraduationCapIcon, 
  AwardIcon, 
  PhoneIcon, 
  MapPinIcon, 
  LinkedinIcon, 
  GithubIcon, 
  SaveIcon, 
  FileTextIcon,
  HomeIcon,
  NewspaperIcon,
  DollarSignIcon,
  CheckCircleIcon,
  UploadIcon,
  XIcon,
  SettingsIcon
} from 'lucide-react';
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
  const { user, isAuthenticated, isLoading, updateUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

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
      setShowProfileModal(false);
      
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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfileImage(event.target.result);
          // Update profile completion
          updateUser({ 
            profileCompletion: (user?.profileCompletion || 0) + 5 > 100 ? 100 : (user?.profileCompletion || 0) + 5
          });
          
          toast({
            title: "Profile photo uploaded",
            description: "Your profile photo has been updated successfully",
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      
      // Update profile completion
      updateUser({ 
        profileCompletion: (user?.profileCompletion || 0) + 10 > 100 ? 100 : (user?.profileCompletion || 0) + 10
      });
      
      toast({
        title: "Resume uploaded",
        description: `Your resume ${e.target.files[0].name} has been uploaded successfully`,
      });
    }
  };

  const triggerProfileImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerResumeUpload = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click();
    }
  };

  const handleApplyJob = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      
      toast({
        title: "Application submitted",
        description: "Your job application has been submitted successfully!",
      });
    }
  };

  return (
    <div 
      className="min-h-screen pt-20 pb-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 backdrop-blur-sm pt-20 pb-16"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
                <DialogTrigger asChild>
                  <Avatar className="h-16 w-16 border-2 border-white cursor-pointer transition-all hover:scale-105 hover:shadow-glow">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-black/90 border border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-purple-400" />
                      Profile Details
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="space-y-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-32 w-32 border-4 border-purple-500/40 cursor-pointer hover:border-purple-500/80 transition-all" onClick={triggerProfileImageUpload}>
                          <AvatarImage src={profileImage || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" onClick={triggerProfileImageUpload} className="border-white/20 text-white hover:bg-white/10">
                          <UploadIcon className="h-4 w-4 mr-2" />
                          {profileImage ? 'Change Photo' : 'Upload Photo'}
                        </Button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleProfileImageChange} 
                          className="hidden" 
                          accept="image/*"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={user?.name || ''}
                          readOnly
                          className="mt-1 bg-white/5 border-white/20 text-white" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-gray-200">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          value={user?.email || ''}
                          readOnly
                          className="mt-1 bg-white/5 border-white/20 text-white" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="resume" className="text-gray-200 flex items-center gap-2">
                          <FileTextIcon className="h-4 w-4" />
                          Resume
                        </Label>
                        <div className="mt-1">
                          <input 
                            type="file" 
                            id="resume" 
                            ref={resumeInputRef}
                            onChange={handleResumeUpload} 
                            className="hidden" 
                            accept=".pdf,.doc,.docx"
                          />
                          <div className="flex items-center gap-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={triggerResumeUpload}
                              className="w-full border-white/20 text-white hover:bg-white/20"
                            >
                              <UploadIcon className="mr-2 h-4 w-4" />
                              {resumeFile ? 'Change Resume' : 'Upload Resume'}
                            </Button>
                          </div>
                          {resumeFile && (
                            <p className="mt-2 text-sm text-gray-300 flex items-center gap-2">
                              <FileTextIcon className="h-4 w-4" />
                              {resumeFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-gray-200">Professional Title</Label>
                        <Input 
                          id="title" 
                          name="title"
                          value={profileData.title} 
                          onChange={handleInputChange}
                          placeholder="e.g. Senior Frontend Developer" 
                          className="mt-1 bg-white/5 border-white/20 text-white" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="summary" className="text-gray-200">Professional Summary</Label>
                        <Textarea 
                          id="summary" 
                          name="summary"
                          value={profileData.summary} 
                          onChange={handleInputChange}
                          placeholder="Brief overview of your experience and goals" 
                          className="mt-1 bg-white/5 border-white/20 text-white" 
                          rows={4} 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-gray-200 flex items-center gap-1">
                            <PhoneIcon className="h-3.5 w-3.5" />
                            Phone
                          </Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={profileData.phone} 
                            onChange={handleInputChange}
                            placeholder="Your phone number" 
                            className="mt-1 bg-white/5 border-white/20 text-white" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="location" className="text-gray-200 flex items-center gap-1">
                            <MapPinIcon className="h-3.5 w-3.5" />
                            Location
                          </Label>
                          <Input 
                            id="location" 
                            name="location"
                            value={profileData.location} 
                            onChange={handleInputChange} 
                            placeholder="City, Country" 
                            className="mt-1 bg-white/5 border-white/20 text-white" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 mt-8">
                    <Button variant="outline" onClick={() => setShowProfileModal(false)} className="border-white/20 text-white hover:bg-white/10">
                      <XIcon className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleProfileUpdate}
                      disabled={isUpdating}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {isUpdating ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome, {user?.name || "User"}</h1>
                <p className="text-gray-300 mt-1">Let's find your perfect job match today!</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-sm w-full md:w-auto border border-white/20">
              <div className="flex items-center gap-3">
                <div className="flex-none">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200 mb-1">Profile Completion</p>
                  <div className="flex items-center gap-3">
                    <Progress value={user?.profileCompletion || 0} className="h-2 flex-1 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-sm font-medium text-white">{user?.profileCompletion || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="py-4 mb-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="px-4 py-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-300 transition-colors">
                    <HomeIcon className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/blog" className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-300 transition-colors">
                    <NewspaperIcon className="h-4 w-4" />
                    <span>Blog</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/jobs" className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-300 transition-colors">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>Jobs</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/pricing" className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-300 transition-colors">
                    <DollarSignIcon className="h-4 w-4" />
                    <span>Pricing</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem className="ml-auto">
                <Button variant="ghost" onClick={logout} className="px-4 py-2 text-white hover:text-purple-300 hover:bg-white/10 transition-colors">
                  Logout
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="mb-10">
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="mb-8 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20">
              <TabsTrigger value="recommended" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white">Recommended Jobs</TabsTrigger>
              <TabsTrigger value="saved" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white">Saved Jobs</TabsTrigger>
              <TabsTrigger value="applied" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white">Applied Jobs</TabsTrigger>
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
                    <Card className="backdrop-blur-md bg-white/10 border border-white/20 text-white overflow-hidden group hover:shadow-glow hover:border-purple-500/50 transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl group-hover:text-purple-300 transition-colors">{job.title}</CardTitle>
                            <CardDescription className="mt-1 text-gray-300">{job.company} • {job.location}</CardDescription>
                          </div>
                          <div className="rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                            {job.match}% Match
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex gap-3 mb-4">
                          <div className="text-sm px-3 py-1 bg-white/10 rounded-full border border-white/20">
                            {job.type}
                          </div>
                          <div className="text-sm px-3 py-1 bg-white/10 rounded-full border border-white/20">
                            {job.salary}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2">{job.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Posted {job.posted}</span>
                        {appliedJobs.includes(job.id) ? (
                          <Button variant="outline" size="sm" className="border-green-500/50 text-green-300 flex items-center gap-2" disabled>
                            <CheckCircleIcon className="h-4 w-4" />
                            Applied
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-white/50 hover:border-purple-500/70 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white" 
                            onClick={() => handleApplyJob(job.id)}
                          >
                            Apply Now
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20">
                <div className="h-20 w-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <BriefcaseIcon className="h-10 w-10 text-white/70" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">No saved jobs yet</h3>
                <p className="text-gray-300 mb-4">
                  Save jobs you're interested in to revisit them later
                </p>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/20">Browse Jobs</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="applied" className="mt-0">
              {appliedJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {appliedJobs.map(id => {
                    const job = sampleJobs.find(j => j.id === id);
                    if (!job) return null;
                    
                    return (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="backdrop-blur-md bg-white/10 border border-white/20 text-white overflow-hidden hover:shadow-glow hover:border-purple-500/50 transition-all duration-300">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="mt-1 text-gray-300">{job.company} • {job.location}</CardDescription>
                              </div>
                              <div className="rounded-full px-3 py-1 text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                                Applied
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="flex gap-3 mb-4">
                              <div className="text-sm px-3 py-1 bg-white/10 rounded-full border border-white/20">
                                {job.type}
                              </div>
                              <div className="text-sm px-3 py-1 bg-white/10 rounded-full border border-white/20">
                                {job.salary}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-2">{job.description}</p>
                          </CardContent>
                          <CardFooter className="pt-0 flex items-center justify-between">
                            <span className="text-xs text-gray-400">Applied just now</span>
                            <Button variant="outline" size="sm" className="border-white/50 hover:border-purple-500/70 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white">
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20">
                  <div className="h-20 w-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <BriefcaseIcon className="h-10 w-10 text-white/70" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">No applications yet</h3>
                  <p className="text-gray-300 mb-4">
                    When you apply to jobs, they will appear here
                  </p>
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/20">Browse Jobs</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-sm overflow-hidden border border-white/20 text-white">
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Complete Your Profile</h2>
              <span className="text-sm text-gray-300">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Professional Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BriefcaseIcon className="mr-2 h-5 w-5 text-purple-400" />
                  Professional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title2" className="text-gray-200">Professional Title</Label>
                    <Input 
                      id="title2" 
                      name="title"
                      value={profileData.title} 
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Frontend Developer" 
                      className="mt-1 bg-white/5 border-white/20 text-white" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="summary2" className="text-gray-200">Professional Summary</Label>
                    <Textarea 
                      id="summary2" 
                      name="summary"
                      value={profileData.summary} 
                      onChange={handleInputChange}
                      placeholder="Brief overview of your experience and goals" 
                      className="mt-1 bg-white/5 border-white/20 text-white" 
                      rows={4} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="skills" className="text-gray-200">Skills</Label>
                    <Textarea 
                      id="skills" 
                      name="skills"
                      value={profileData.skills} 
                      onChange={handleInputChange}
                      placeholder="e.g. JavaScript, React, CSS, etc." 
                      className="mt-1 bg-white/5 border-white/20 text-white" 
                      rows={3} 
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume2" className="text-gray-200 flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4" />
                      Resume
                    </Label>
                    <div className="mt-1">
                      {resumeFile ? (
                        <p className="mb-2 text-sm text-gray-300 flex items-center gap-2 p-2 bg-white/5 rounded border border-white/10">
                          <FileTextIcon className="h-4 w-4" />
                          {resumeFile.name}
                        </p>
                      ) : null}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={triggerResumeUpload}
                        className="w-full border-white/20 text-white hover:bg-white/20"
                      >
                        <UploadIcon className="mr-2 h-4 w-4" />
                        {resumeFile ? 'Change Resume' : 'Upload Resume'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact & Education */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PhoneIcon className="mr-2 h-5 w-5 text-purple-400" />
                  Contact & Education
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone2" className="text-gray-200">Phone Number</Label>
                      <Input 
                        id="phone2" 
                        name="phone"
                        value={profileData.phone} 
                        onChange={handleInputChange}
                        placeholder="Your phone number" 
                        className="mt-1 bg-white/5 border-white/20 text-white" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location2" className="text-gray-200">Location</Label>
                      <Input 
                        id="location2" 
                        name="location"
                        value={profileData.location} 
                        onChange={handleInputChange}
                        placeholder="City, Country" 
                        className="mt-1 bg-white/5 border-white/20 text-white" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin" className="text-gray-200 flex items-center gap-1">
                        <LinkedinIcon className="h-3.5 w-3.5" />
                        LinkedIn
                      </Label>
                      <Input 
                        id="linkedin" 
                        name="linkedin"
                        value={profileData.linkedin} 
                        onChange={handleInputChange}
                        placeholder="linkedin.com/in/username" 
                        className="mt-1 bg-white/5 border-white/20 text-white" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="github" className="text-gray-200 flex items-center gap-1">
                        <GithubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </Label>
                      <Input 
                        id="github" 
                        name="github"
                        value={profileData.github} 
                        onChange={handleInputChange}
                        placeholder="github.com/username" 
                        className="mt-1 bg-white/5 border-white/20 text-white" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="education" className="text-gray-200 flex items-center gap-1">
                      <GraduationCapIcon className="h-4 w-4" />
                      Education
                    </Label>
                    <Textarea 
                      id="education" 
                      name="education"
                      value={profileData.education} 
                      onChange={handleInputChange}
                      placeholder="Your educational background" 
                      className="mt-1 bg-white/5 border-white/20 text-white" 
                      rows={3} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleProfileUpdate}
                disabled={isUpdating}
                className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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
