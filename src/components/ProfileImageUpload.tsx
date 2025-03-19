
import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload, User } from 'lucide-react';

const ProfileImageUpload: React.FC = () => {
  const { user, uploadProfileImage } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      uploadProfileImage(file);
    } catch (error) {
      console.error('Error uploading image:', error);
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
        {user?.profileImageUrl ? (
          <AvatarImage src={user.profileImageUrl} alt={user?.name || 'User'} />
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
        {user?.profileImageUrl ? 'Change Photo' : 'Upload Photo'}
      </Button>
    </div>
  );
};

export default ProfileImageUpload;
