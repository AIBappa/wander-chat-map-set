
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone } from "lucide-react";
import EmailSignInForm from './EmailSignInForm';
import PhoneSignInForm from './PhoneSignInForm';
import SocialLoginButton from './SocialLoginButton';

const AuthPage: React.FC = () => {
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
                <EmailSignInForm />
              </TabsContent>
              
              <TabsContent value="phone">
                <PhoneSignInForm />
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
              
            <SocialLoginButton provider="google">
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7 8.177a7.37 7.37 0 0 0-.174-1.703H8v3.22h4.307a3.68 3.68 0 0 1-1.6 2.42v2.01h2.585c1.517-1.4 2.408-3.492 2.408-5.947z" fill="#4285F4" />
                <path d="M8 16c2.16 0 3.977-.716 5.304-1.875l-2.587-2.01c-.714.48-1.632.762-2.717.762-2.09 0-3.86-1.41-4.491-3.306H.822v2.076A8.001 8.001 0 0 0 8 16z" fill="#34A853" />
                <path d="M3.509 9.57a4.8 4.8 0 0 1 0-3.07V4.426H.822a8.028 8.028 0 0 0 0 7.218l2.687-2.075z" fill="#FBBC05" />
                <path d="M8 3.226c1.182 0 2.239.404 3.074 1.204l2.34-2.242C11.995.775 10.178 0 8 0 4.932 0 2.258 1.96 .822 4.424l2.687 2.076c.635-1.893 2.41-3.275 4.491-3.275" fill="#EA4335" />
              </svg>
              Sign in with Google
            </SocialLoginButton>
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
