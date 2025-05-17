
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const handleEmailSignIn = (e: React.FormEvent) => {
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
  
  const handlePhoneSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpSent) {
      if (!phoneNumber) {
        toast.error("Please enter your phone number");
        return;
      }
      // Mock sending OTP - replace with real SMS service in production
      setIsOtpSent(true);
      toast.success("OTP sent to your phone");
    } else {
      if (!otp) {
        toast.error("Please enter the OTP");
        return;
      }
      // Mock OTP verification - replace with real verification in production
      const mockUser = {
        displayName: `User-${phoneNumber.slice(-4)}`,
        email: null,
        photoURL: null
      };
      login(mockUser);
      toast.success("Signed in successfully!");
      navigate('/app/map');
    }
  };
  
  const handleGoogleSignIn = () => {
    // Mock Google authentication - replace with real Google auth in production
    const mockGoogleUser = {
      displayName: "Google User",
      email: "user@gmail.com",
      photoURL: "https://lh3.googleusercontent.com/a/default-user"
    };
    login(mockGoogleUser);
    toast.success("Signed in with Google!");
    navigate('/app/map');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-appPurple-light to-appBlue-light p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="email" className="data-[state=active]:bg-appPurple-light">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-appPurple-light">
                  <Phone className="mr-2 h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
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
              </TabsContent>
              
              <TabsContent value="phone">
                <form onSubmit={handlePhoneSignIn} className="space-y-4">
                  {!isOtpSent ? (
                    <div className="space-y-2">
                      <Input 
                        placeholder="Phone Number" 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="focus-visible:ring-appPurple"
                      />
                      <Button type="submit" className="w-full bg-appPurple hover:bg-appPurple-dark">
                        Send OTP
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Input 
                        placeholder="Enter OTP" 
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="focus-visible:ring-appPurple"
                      />
                      <div className="flex justify-between items-center">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsOtpSent(false)}
                        >
                          Back
                        </Button>
                        <Button type="submit" className="bg-appPurple hover:bg-appPurple-dark">
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
              
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7 8.177a7.37 7.37 0 0 0-.174-1.703H8v3.22h4.307a3.68 3.68 0 0 1-1.6 2.42v2.01h2.585c1.517-1.4 2.408-3.492 2.408-5.947z" fill="#4285F4" />
                <path d="M8 16c2.16 0 3.977-.716 5.304-1.875l-2.587-2.01c-.714.48-1.632.762-2.717.762-2.09 0-3.86-1.41-4.491-3.306H.822v2.076A8.001 8.001 0 0 0 8 16z" fill="#34A853" />
                <path d="M3.509 9.57a4.8 4.8 0 0 1 0-3.07V4.426H.822a8.028 8.028 0 0 0 0 7.218l2.687-2.075z" fill="#FBBC05" />
                <path d="M8 3.226c1.182 0 2.239.404 3.074 1.204l2.34-2.242C11.995.775 10.178 0 8 0 4.932 0 2.258 1.96 .822 4.424l2.687 2.076c.635-1.893 2.41-3.275 4.491-3.275" fill="#EA4335" />
              </svg>
              Sign in with Google
            </Button>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-gray-500 mt-2">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
