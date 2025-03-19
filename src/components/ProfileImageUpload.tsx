
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload, User } from 'lucide-react';

const ProfileImageUpload: React.FC = () => {
  const { user, uploadProfileImage } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Set the image preview from user data if available
    if (user?.profileImageUrl) {
      setImagePreview(user.profileImageUrl);
    }
  }, [user?.profileImageUrl]);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Create a local preview
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);
    
    try {
      // Upload the file to the auth context
      uploadProfileImage(file);
      console.log("Profile image uploaded successfully");
    } catch (error) {
      console.error('Error uploading image:', error);
      // Revert preview on error
      setImagePreview(user?.profileImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-32 w-32 border-2 border-primary">
        {imagePreview ? (
          <AvatarImage src={imagePreview} alt={user?.name || 'User'} />
        ) : (
          <AvatarFallback className="text-2xl bg-primary/10">
            {user?.name ? getInitials(user.name) : <User />}
          </AvatarFallback>
        )}
      </Avatar>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <Button 
        onClick={handleUploadClick}
        variant="outline"
        className="flex items-center gap-2"
        disabled={isUploading}
      >
        <Upload size={16} />
        {imagePreview ? 'Change Photo' : 'Upload Photo'}
      </Button>
    </div>
  );
};

export default ProfileImageUpload;
