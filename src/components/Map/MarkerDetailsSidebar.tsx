
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { MarkerData } from './types';

interface MarkerDetailsSidebarProps {
  selectedMarker: MarkerData;
  isSidebarOpen: boolean;
  onClose: () => void;
}

const MarkerDetailsSidebar = ({ selectedMarker, isSidebarOpen, onClose }: MarkerDetailsSidebarProps) => {
  if (!isSidebarOpen || !selectedMarker) {
    return null;
  }

  const handleNavigate = () => {
    // Open Google Maps with directions to the selected location
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}`;
    window.open(url, '_blank');
    toast.success("Opening navigation...");
  };

  const handleWhatsApp = () => {
    // Create WhatsApp message with location information
    const message = `Hey, check out this location: ${selectedMarker.title} at ${selectedMarker.address}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
  };

  return (
    <div 
      className="fixed inset-y-0 right-0 z-[1000] w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out"
      style={{ 
        boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
      }}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-appPurple" />
              {selectedMarker.title}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">ADDRESS</h3>
            <p className="text-sm">{selectedMarker.address}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">COORDINATES</h3>
            <p className="text-sm">
              {selectedMarker.lat.toFixed(6)}, {selectedMarker.lng.toFixed(6)}
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleNavigate}
              className="flex items-center justify-center bg-appPurple hover:bg-appPurple/90"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Navigate
            </Button>
            <Button 
              onClick={handleWhatsApp}
              variant="outline"
              className="flex items-center justify-center border-appPurple text-appPurple hover:bg-appPurple/10"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerDetailsSidebar;
