
import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { 
  BriefcaseIcon, 
  UserIcon, 
  PhoneIcon, 
  MapPinIcon, 
  LinkedinIcon, 
  GithubIcon, 
  SaveIcon, 
  FileTextIcon,
  HomeIcon,
  NewspaperIcon,
  CheckCircleIcon,
  UploadIcon,
  XIcon,
  GraduationCapIcon,
  BuildingIcon,
  DollarSignIcon,
  ClockIcon,
  CalendarIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Extended sample job listings (25 jobs)
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
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    salary: "$115,000 - $145,000",
    type: "Full-time",
    match: 91,
    description: "Join our DevOps team to build and maintain cloud infrastructure...",
    requirements: "Experience with AWS, Docker, Kubernetes, and CI/CD pipelines...",
    posted: "1 day ago"
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataInsights Inc.",
    location: "Boston, MA",
    salary: "$110,000 - $150,000",
    type: "Full-time",
    match: 88,
    description: "Looking for a Data Scientist to help analyze and extract insights...",
    requirements: "Strong background in statistics, machine learning, and Python...",
    posted: "3 days ago"
  },
  {
    id: 7,
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    location: "Portland, OR",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    match: 84,
    description: "Develop innovative iOS applications for our client base...",
    requirements: "Experience with Swift, iOS SDK, and mobile app architecture...",
    posted: "2 weeks ago"
  },
  {
    id: 8,
    title: "Backend Engineer",
    company: "ServerStack",
    location: "Chicago, IL",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    match: 89,
    description: "Build scalable backend systems for our growing platform...",
    requirements: "Experience with Java, Spring Boot, and distributed systems...",
    posted: "4 days ago"
  },
  {
    id: 9,
    title: "Technical Project Manager",
    company: "ProjectPro",
    location: "Denver, CO",
    salary: "$105,000 - $135,000",
    type: "Full-time",
    match: 81,
    description: "Lead technical projects from conception to completion...",
    requirements: "PMP certification and experience with Agile methodologies...",
    posted: "1 week ago"
  },
  {
    id: 10,
    title: "QA Engineer",
    company: "QualityFirst",
    location: "Raleigh, NC",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    match: 86,
    description: "Ensure product quality through thorough testing processes...",
    requirements: "Experience with test automation and quality assurance methodologies...",
    posted: "Just now"
  },
  {
    id: 11,
    title: "Blockchain Developer",
    company: "ChainTech",
    location: "Remote",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    match: 77,
    description: "Develop and implement blockchain solutions for financial applications...",
    requirements: "Experience with Ethereum, Solidity, and smart contracts...",
    posted: "3 days ago"
  },
  {
    id: 12,
    title: "AI Research Scientist",
    company: "IntelliTech",
    location: "Cambridge, MA",
    salary: "$130,000 - $180,000",
    type: "Full-time",
    match: 82,
    description: "Research and develop cutting-edge AI algorithms and models...",
    requirements: "PhD in Computer Science, Machine Learning, or related field...",
    posted: "5 days ago"
  },
  {
    id: 13,
    title: "Systems Administrator",
    company: "ServerOps",
    location: "Austin, TX",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    match: 79,
    description: "Maintain and optimize our internal IT infrastructure...",
    requirements: "Experience with Linux, Windows Server, and networking...",
    posted: "1 week ago"
  },
  {
    id: 14,
    title: "Technical Writer",
    company: "DocuTech",
    location: "Remote",
    salary: "$75,000 - $95,000",
    type: "Full-time",
    match: 88,
    description: "Create clear, concise technical documentation for our products...",
    requirements: "Strong writing skills and ability to explain complex concepts...",
    posted: "2 days ago"
  },
  {
    id: 15,
    title: "Security Engineer",
    company: "CyberDefense",
    location: "Washington, DC",
    salary: "$110,000 - $150,000",
    type: "Full-time",
    match: 92,
    description: "Protect our systems and data from security threats...",
    requirements: "Experience with security tools, threat modeling, and penetration testing...",
    posted: "1 day ago"
  },
  {
    id: 16,
    title: "Game Developer",
    company: "GameStudio",
    location: "Los Angeles, CA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    match: 80,
    description: "Create engaging gaming experiences for our users...",
    requirements: "Experience with Unity, C#, and game physics...",
    posted: "3 days ago"
  },
  {
    id: 17,
    title: "Database Administrator",
    company: "DataSystems",
    location: "Phoenix, AZ",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    match: 85,
    description: "Manage and optimize our database infrastructure...",
    requirements: "Experience with SQL, PostgreSQL, and database optimization...",
    posted: "1 week ago"
  },
  {
    id: 18,
    title: "AR/VR Developer",
    company: "RealityLabs",
    location: "Seattle, WA",
    salary: "$105,000 - $140,000",
    type: "Full-time",
    match: 78,
    description: "Develop immersive AR/VR experiences for our platform...",
    requirements: "Experience with Unity, ARKit/ARCore, and 3D modeling...",
    posted: "2 days ago"
  },
  {
    id: 19,
    title: "Digital Marketing Specialist",
    company: "GrowthHackers",
    location: "Miami, FL",
    salary: "$80,000 - $110,000",
    type: "Full-time",
    match: 83,
    description: "Drive digital marketing strategies to increase user acquisition...",
    requirements: "Experience with SEO, SEM, and social media marketing...",
    posted: "4 days ago"
  },
  {
    id: 20,
    title: "Cloud Architect",
    company: "CloudWorks",
    location: "Remote",
    salary: "$130,000 - $170,000",
    type: "Full-time",
    match: 90,
    description: "Design and implement cloud-based solutions for our clients...",
    requirements: "AWS/Azure certifications and experience with cloud migration...",
    posted: "1 day ago"
  },
  {
    id: 21,
    title: "Embedded Systems Engineer",
    company: "IoTech",
    location: "San Jose, CA",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    match: 82,
    description: "Develop firmware and software for IoT devices...",
    requirements: "Experience with C/C++, microcontrollers, and embedded Linux...",
    posted: "5 days ago"
  },
  {
    id: 22,
    title: "UI/UX Researcher",
    company: "UserFirst",
    location: "Chicago, IL",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    match: 87,
    description: "Conduct user research to improve our product user experience...",
    requirements: "Experience with user testing, interviews, and usability analysis...",
    posted: "1 week ago"
  },
  {
    id: 23,
    title: "Data Engineer",
    company: "DataFlow",
    location: "Denver, CO",
    salary: "$100,000 - $140,000",
    type: "Full-time",
    match: 89,
    description: "Build and maintain data pipelines and infrastructure...",
    requirements: "Experience with ETL processes, Apache Spark, and data warehousing...",
    posted: "2 days ago"
  },
  {
    id: 24,
    title: "Technical Support Engineer",
    company: "SupportPro",
    location: "Austin, TX",
    salary: "$70,000 - $90,000",
    type: "Full-time",
    match: 84,
    description: "Provide technical support to our enterprise customers...",
    requirements: "Strong problem-solving skills and customer service orientation...",
    posted: "3 days ago"
  },
  {
    id: 25,
    title: "Machine Learning Engineer",
    company: "AILabs",
    location: "Boston, MA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    match: 91,
    description: "Implement machine learning models for production use...",
    requirements: "Experience with TensorFlow, PyTorch, and ML deployment...",
    posted: "1 day ago"
  }
];

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, updateUser, logout } = useAuth();
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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof sampleJobs[0] | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

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

  const handleViewJobDetails = (job: typeof sampleJobs[0]) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  // Pagination logic
  const pageCount = Math.ceil(sampleJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sampleJobs.slice(indexOfFirstJob, indexOfLastJob);

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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-[#1A1F2C]/85 to-gray-900/90 backdrop-blur-sm pt-20 pb-16">
        {/* Enhanced background with animated gradient patterns */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-kod-blue/10 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>
      
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Recommended Jobs</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentJobs.map(job => (
                  <Card key={job.id} className="bg-white/5 border border-white/10 overflow-hidden transition-all hover:bg-white/10 hover:border-white/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg">{job.title}</CardTitle>
                          <CardDescription className="text-gray-300 flex items-center mt-1">
                            <BuildingIcon className="h-3.5 w-3.5 mr-1" />
                            {job.company}
                          </CardDescription>
                        </div>
                        <div className="bg-purple-500/20 px-2 py-1 rounded-full flex items-center">
                          <span className="text-xs font-medium text-purple-300">{job.match}% Match</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 text-sm text-gray-300">
                      <div className="flex flex-wrap gap-y-1 gap-x-4 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSignIcon className="h-3.5 w-3.5 text-gray-400" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3.5 w-3.5 text-gray-400" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-1">
                      <Button 
                        variant="ghost" 
                        className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/20"
                        onClick={() => handleViewJobDetails(job)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        className={appliedJobs.includes(job.id) 
                          ? "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                          : "border-white/20 text-white hover:bg-white/10"
                        }
                        onClick={() => handleApplyJob(job.id)}
                        disabled={appliedJobs.includes(job.id)}
                      >
                        {appliedJobs.includes(job.id) ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Applied
                          </>
                        ) : "Apply Now"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination className="mt-6">
                <PaginationContent className="text-white">
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className={currentPage === pageNum 
                            ? "bg-purple-500/20 border-purple-500/40" 
                            : "hover:bg-white/10"
                          }
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                      className={currentPage === pageCount ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === pageCount}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Your Profile</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-none">
                    <Avatar className="h-14 w-14 border-2 border-white/30">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user?.name || "User"}</h3>
                    <p className="text-gray-300 text-sm">{profileData.title || "Add your professional title"}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-white text-sm font-medium mb-1">Professional Summary</h4>
                  <p className="text-gray-300 text-sm">
                    {profileData.summary || "Add a brief description about yourself and your career goals."}
                  </p>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-white text-sm font-medium mb-1">Skills</h4>
                  <p className="text-gray-300 text-sm">
                    {profileData.skills || "Add your key skills and technologies."}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowProfileModal(true)}
                  className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                
                {!resumeFile && (
                  <Button 
                    variant="outline" 
                    onClick={triggerResumeUpload}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload Resume
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Job Application Status</h2>
              
              <div className="space-y-3">
                {appliedJobs.length > 0 ? (
                  appliedJobs.map(jobId => {
                    const job = sampleJobs.find(j => j.id === jobId);
                    if (!job) return null;
                    
                    return (
                      <div key={job.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <h3 className="text-white font-medium">{job.title}</h3>
                        <p className="text-gray-300 text-sm">{job.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-gray-300 text-xs">Applied {job.posted}</span>
                        </div>
                        <div className="bg-yellow-500/20 rounded-full px-2 py-0.5 text-xs text-yellow-300 inline-block mt-2">
                          Under Review
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6">
                    <BriefcaseIcon className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-300">You haven't applied to any jobs yet.</p>
                    <p className="text-gray-400 text-sm mt-1">Browse the recommended jobs and start applying!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Job Details Modal */}
      <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
        <DialogContent className="max-w-3xl w-[90vw] bg-black/90 border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-purple-400" />
              {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300 flex items-center mt-1">
              <BuildingIcon className="h-4 w-4 mr-1" />
              {selectedJob?.company}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-3 py-1 rounded-full flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1 text-gray-300" />
                <span className="text-sm text-gray-200">{selectedJob?.location}</span>
              </div>
              
              <div className="bg-white/10 px-3 py-1 rounded-full flex items-center">
                <DollarSignIcon className="h-4 w-4 mr-1 text-gray-300" />
                <span className="text-sm text-gray-200">{selectedJob?.salary}</span>
              </div>
              
              <div className="bg-white/10 px-3 py-1 rounded-full flex items-center">
                <ClockIcon className="h-4 w-4 mr-1 text-gray-300" />
                <span className="text-sm text-gray-200">{selectedJob?.type}</span>
              </div>
              
              <div className="bg-purple-500/20 px-3 py-1 rounded-full flex items-center">
                <span className="text-sm text-purple-300">{selectedJob?.match}% Match</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white">Job Description</h3>
              <p className="text-gray-300 mt-2">{selectedJob?.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white">Requirements</h3>
              <p className="text-gray-300 mt-2">{selectedJob?.requirements}</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Ready to apply?</h3>
                  <p className="text-gray-300 text-sm mt-1">Your profile is {user?.profileCompletion || 0}% complete</p>
                </div>
                
                <Button 
                  variant="default" 
                  className={appliedJobs.includes(selectedJob?.id || 0) 
                    ? "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  }
                  onClick={() => {
                    if (selectedJob) {
                      handleApplyJob(selectedJob.id);
                      setShowJobModal(false);
                    }
                  }}
                  disabled={appliedJobs.includes(selectedJob?.id || 0)}
                >
                  {appliedJobs.includes(selectedJob?.id || 0) ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Already Applied
                    </>
                  ) : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
