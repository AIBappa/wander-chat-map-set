import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import WalletSection from './WalletSection';
import { useAuth } from '@/context/AuthContext';

const SettingsView = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };
  
  const toggleDarkMode = () => {
    // In a real app, this would toggle a class on the HTML element
    setDarkModeEnabled(!darkModeEnabled);
    document.documentElement.classList.toggle('dark');
    toast.success(`${!darkModeEnabled ? "Dark" : "Light"} mode activated`);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Card className="p-4">
        <h2 className="font-semibold text-lg mb-4">Account</h2>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            {user?.photoURL && (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium">{user?.displayName || 'User'}</p>
              <p className="text-sm text-gray-500">{user?.email || 'No email available'}</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </Card>
      
      {/* Wallet Section */}
      <WalletSection />
      
      <Card className="p-4 space-y-4">
        <h2 className="font-semibold text-lg">Preferences</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="notifications" className="font-medium">Notifications</Label>
            <p className="text-sm text-gray-500">Receive app notifications</p>
          </div>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="location" className="font-medium">Location Services</Label>
            <p className="text-sm text-gray-500">Allow app to access your location</p>
          </div>
          <Switch
            id="location"
            checked={locationEnabled}
            onCheckedChange={setLocationEnabled}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
            <p className="text-sm text-gray-500">Switch to dark theme</p>
          </div>
          <Switch
            id="dark-mode"
            checked={darkModeEnabled}
            onCheckedChange={toggleDarkMode}
          />
        </div>
      </Card>
      
      <Card className="p-4 space-y-4">
        <h2 className="font-semibold text-lg">Support</h2>
        
        <Button variant="outline" className="w-full justify-start">
          Help Center
        </Button>
        
        <Button variant="outline" className="w-full justify-start">
          Privacy Policy
        </Button>
        
        <Button variant="outline" className="w-full justify-start">
          Terms of Service
        </Button>
      </Card>
      
      <div className="pt-4">
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default SettingsView;
