
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type SocialLoginButtonProps = {
  provider: 'google' | 'facebook' | 'twitter' | 'github';
  children: React.ReactNode;
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, children }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSocialLogin = () => {
    // Mock social authentication - replace with real auth in production
    const mockUser = {
      displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      email: `user@${provider}.com`,
      photoURL: provider === 'google' ? "https://lh3.googleusercontent.com/a/default-user" : null
    };
    login(mockUser);
    toast.success(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
    navigate('/app/map');
  };

  return (
    <Button 
      variant="outline" 
      className="w-full flex items-center justify-center gap-2"
      onClick={handleSocialLogin}
    >
      {children}
    </Button>
  );
};

export default SocialLoginButton;
