
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Mail } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

type EmailSignInFormProps = {
  defaultEmail?: string;
};

const EmailSignInForm: React.FC<EmailSignInFormProps> = ({ defaultEmail = '' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Mock authentication - replace with real auth in production
    const mockUser = {
      displayName: email.split('@')[0],
      email: email,
      photoURL: null
    };
    login(mockUser);
    toast.success("Signed in successfully!");
    navigate('/app/map');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input 
          placeholder="Email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-visible:ring-appPurple"
        />
      </div>
      <div className="space-y-2">
        <Input 
          placeholder="Password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus-visible:ring-appPurple"
        />
      </div>
      <Button type="submit" className="w-full bg-appPurple hover:bg-appPurple-dark">
        Sign In
      </Button>
    </form>
  );
};

export default EmailSignInForm;
