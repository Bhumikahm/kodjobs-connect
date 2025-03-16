
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, BookmarkIcon, ThumbsUpIcon, ShareIcon, GraduationCapIcon, BriefcaseIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  relevanceScore: number;
}

const Blog = () => {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch blog posts from an API
    // For this demo, we'll simulate loading blog posts relevant to the user's profile
    setTimeout(() => {
      const dummyBlogPosts: BlogPost[] = [
        {
          id: 1,
          title: "10 Essential Skills Every Frontend Developer Needs in 2025",
          excerpt: "Stay competitive in the job market by mastering these crucial frontend development skills.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Frontend Development",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          author: {
            name: "Alex Chen",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          date: "March 15, 2025",
          readTime: "8 min read",
          relevanceScore: 95
        },
        {
          id: 2,
          title: "How to Ace Your Technical Interview: Tips from Hiring Managers",
          excerpt: "Insider advice on how to prepare for and excel in technical interviews at top tech companies.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Career Advice",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          author: {
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          date: "March 10, 2025",
          readTime: "12 min read",
          relevanceScore: 88
        },
        {
          id: 3,
          title: "The Rise of AI in Web Development: What You Need to Know",
          excerpt: "Explore how artificial intelligence is transforming the field of web development and how to adapt.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Technology Trends",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          author: {
            name: "Michael Kim",
            avatar: "https://randomuser.me/api/portraits/men/28.jpg"
          },
          date: "March 5, 2025",
          readTime: "10 min read",
          relevanceScore: 92
        },
        {
          id: 4,
          title: "Remote Work Revolution: Finding the Best Remote Developer Jobs",
          excerpt: "How to find, apply for, and land high-paying remote developer positions in today's competitive market.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Remote Work",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          author: {
            name: "Emma Davis",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg"
          },
          date: "February 28, 2025",
          readTime: "9 min read",
          relevanceScore: 85
        },
        {
          id: 5,
          title: "Mastering TypeScript: Advanced Patterns for Frontend Developers",
          excerpt: "Level up your TypeScript skills with these advanced patterns and techniques used by senior developers.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "TypeScript",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          author: {
            name: "David Wilson",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg"
          },
          date: "February 22, 2025",
          readTime: "15 min read",
          relevanceScore: 90
        },
        {
          id: 6,
          title: "Building Your Developer Portfolio: What Hiring Managers Really Look For",
          excerpt: "Create a standout developer portfolio that will impress employers and help you land your dream job.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Career Development",
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          author: {
            name: "Jennifer Lee",
            avatar: "https://randomuser.me/api/portraits/women/56.jpg"
          },
          date: "February 18, 2025",
          readTime: "11 min read",
          relevanceScore: 87
        }
      ];

      // Sort blog posts by relevance score (personalized to user)
      setBlogPosts(dummyBlogPosts.sort((a, b) => b.relevanceScore - a.relevanceScore));
      setIsLoading(false);
    }, 1200);
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-kod-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      {/* Background with image and overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/90"></div>
        
        {/* Enhanced background with animated gradient mesh */}
        <div className="absolute inset-0 bg-gradient-mesh-vibrant opacity-30"></div>
        <div className="absolute inset-0 bg-nebula opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            KodJobs <span className="text-gradient-blue">Career Insights</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover articles and resources tailored to help you advance your career in tech
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-kod-blue/90 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-gray-300">{post.author.name}</div>
                    </div>
                    <div className="bg-purple-500/20 px-2 py-1 rounded-full flex items-center">
                      <span className="text-xs font-medium text-purple-300">{post.relevanceScore}% Relevant</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-kod-blue transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4 flex-grow">
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                      <ShareIcon className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-kod-blue hover:bg-kod-blue/10">
                    Read More →
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="bg-kod-blue/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
                  <GraduationCapIcon className="h-8 w-8 text-kod-blue" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Continue Your Career Growth</h3>
                <p className="text-gray-300 mb-6 max-w-2xl">
                  Explore job opportunities that match your skills and experience. Our AI-powered matching system will help you find the perfect role.
                </p>
                <Button asChild className="bg-kod-blue hover:bg-kod-blueDark text-white">
                  <Link to="/dashboard">
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    Browse Job Listings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
