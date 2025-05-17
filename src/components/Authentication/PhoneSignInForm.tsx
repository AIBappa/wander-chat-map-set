
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PhoneSignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};

export default PhoneSignInForm;
