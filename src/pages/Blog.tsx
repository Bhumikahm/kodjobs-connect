
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  BriefcaseIcon, 
  TrendingUpIcon, 
  SearchIcon, 
  GraduationCapIcon, 
  UserIcon,
  HeartIcon,
  ClockIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample blog data with career advice related to different profiles
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Skills Every Frontend Developer Needs in 2023",
    excerpt: "To stay competitive in the frontend development space, these are the crucial skills you need to master this year.",
    author: "Sarah Johnson",
    authorRole: "Senior Frontend Engineer",
    authorAvatar: "https://i.pravatar.cc/150?img=32",
    category: "Development",
    readTime: "5 min read",
    likes: 256,
    date: "Mar 15, 2023",
    tags: ["frontend", "web development", "javascript", "react"],
    icon: <CodeIcon />
  },
  {
    id: 2,
    title: "How to Negotiate Your Salary: A Step-by-Step Guide",
    excerpt: "Learn proven strategies to confidently negotiate your salary and get the compensation you deserve.",
    author: "Michael Chen",
    authorRole: "Career Coach",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    category: "Career Advice",
    readTime: "8 min read",
    likes: 412,
    date: "Apr 2, 2023",
    tags: ["salary negotiation", "career growth", "interview tips"],
    icon: <TrendingUpIcon />
  },
  {
    id: 3,
    title: "The Future of Remote Work: Trends to Watch",
    excerpt: "Remote work is here to stay. Discover the emerging trends that will shape how we work from anywhere.",
    author: "Emily Rodriguez",
    authorRole: "HR Director",
    authorAvatar: "https://i.pravatar.cc/150?img=23",
    category: "Workplace",
    readTime: "6 min read",
    likes: 189,
    date: "May 10, 2023",
    tags: ["remote work", "future of work", "workplace trends"],
    icon: <BriefcaseIcon />
  },
  {
    id: 4,
    title: "Building a Strong LinkedIn Profile That Gets Noticed",
    excerpt: "Your LinkedIn profile is your digital resume. Learn how to optimize it to attract recruiters and job opportunities.",
    author: "David Thompson",
    authorRole: "Recruitment Specialist",
    authorAvatar: "https://i.pravatar.cc/150?img=53",
    category: "Job Search",
    readTime: "7 min read",
    likes: 324,
    date: "Jun 5, 2023",
    tags: ["linkedin", "personal branding", "job search", "networking"],
    icon: <UserIcon />
  },
  {
    id: 5,
    title: "Mastering Technical Interviews: Data Structures and Algorithms",
    excerpt: "Technical interviews can be daunting. Learn practical strategies to solve common algorithm challenges.",
    author: "Jennifer Wu",
    authorRole: "Tech Lead at Google",
    authorAvatar: "https://i.pravatar.cc/150?img=44",
    category: "Interview Prep",
    readTime: "10 min read",
    likes: 520,
    date: "Jul 12, 2023",
    tags: ["technical interview", "algorithms", "data structures", "coding challenges"],
    icon: <SearchIcon />
  },
  {
    id: 6,
    title: "Switching Careers to Tech: A Guide for Non-Technical Professionals",
    excerpt: "Thinking about pivoting to tech? This roadmap will help you navigate the transition successfully.",
    author: "Marcus Johnson",
    authorRole: "Career Transition Coach",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    category: "Career Change",
    readTime: "9 min read",
    likes: 275,
    date: "Aug 28, 2023",
    tags: ["career change", "tech industry", "upskilling", "bootcamps"],
    icon: <GraduationCapIcon />
  }
];

// Simple icon component for code
function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

const Blog = () => {
  const { user } = useAuth();
  const userSkills = user?.skills?.toLowerCase() || '';

  // Function to determine if a blog post is relevant to the user's profile
  const getRelevanceScore = (post: typeof blogPosts[0]) => {
    if (!user) return 1; // If no user, all posts are equally relevant
    
    let relevance = 1;
    
    // Check if any tags match user's skills or title
    post.tags.forEach(tag => {
      if (userSkills.includes(tag.toLowerCase())) {
        relevance += 2;
      }
    });
    
    // Boost relevance based on user's professional title
    const userTitle = (user.title || '').toLowerCase();
    if (userTitle) {
      post.tags.forEach(tag => {
        if (userTitle.includes(tag.toLowerCase())) {
          relevance += 1;
        }
      });
    }
    
    return relevance;
  };

  // Sort blog posts by relevance to user
  const sortedPosts = [...blogPosts].sort((a, b) => 
    getRelevanceScore(b) - getRelevanceScore(a)
  );

  return (
    <div className="min-h-screen pt-20 bg-nebula">
      {/* Header section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Career Insights & Job Tips</h1>
          <p className="text-xl text-gray-300">
            Expert advice to help you advance in your career and find your perfect job match
          </p>
        </motion.div>
      </div>

      {/* Blog posts grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-lg bg-purple-500/20 text-purple-300">
                      {post.icon}
                    </div>
                    <div className="text-xs text-gray-300 flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white mt-4">{post.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow text-gray-300">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-white/10 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{post.author}</p>
                        <p className="text-xs text-gray-400">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <HeartIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs">{post.likes}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
