
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Enhanced marker data with more details
const MOCK_MARKERS = [
  { id: 1, lat: 40.7128, lng: -74.006, title: "New York", address: "Manhattan, NY 10001, USA" },
  { id: 2, lat: 51.5074, lng: -0.1278, title: "London", address: "Westminster, London, UK" },
  { id: 3, lat: 48.8566, lng: 2.3522, title: "Paris", address: "Champ de Mars, Paris, France" },
  { id: 4, lat: 35.6762, lng: 139.6503, title: "Tokyo", address: "Shinjuku, Tokyo, Japan" },
  { id: 5, lat: 37.7749, lng: -122.4194, title: "San Francisco", address: "California, USA" },
];

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
}

interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  title: string;
  address: string;
}

declare global {
  interface Window {
    L: any; // For Leaflet
  }
}

const MapView = ({ center = { lat: 51.505, lng: -0.09 }, zoom = 3 }: MapViewProps) => {
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load Leaflet CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(linkElement);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(linkElement);
      document.body.removeChild(script);
      if (map) map.remove();
    };
  }, []);

  const initializeMap = () => {
    const L = window.L;
    
    if (!L) {
      console.error("Leaflet not loaded");
      return;
    }
    
    // Create map
    const mapInstance = L.map('map').setView([center.lat, center.lng], zoom);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    // Add markers from mock data
    MOCK_MARKERS.forEach(marker => {
      const markerElement = L.marker([marker.lat, marker.lng])
        .addTo(mapInstance)
        .bindPopup(`<b>${marker.title}</b>`)
        .on('click', () => {
          // When marker is clicked, set the selected marker and open the sidebar
          setSelectedMarker(marker);
          setIsSidebarOpen(true);
        });
      
      // Custom styling for markers
      const icon = markerElement.getElement();
      if (icon) {
        icon.style.filter = 'hue-rotate(220deg)'; // Purple-ish hue
      }
    });

    setMap(mapInstance);
    setIsLoading(false);
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          if (map) {
            map.flyTo([latitude, longitude], 15, {
              animate: true,
              duration: 1.5
            });
            
            // Add a special marker for user's location
            const userIcon = window.L.divIcon({
              className: 'map-marker',
              html: `<div class="pulse-animation"></div>`
            });
            
            window.L.marker([latitude, longitude], { icon: userIcon })
              .addTo(map)
              .bindPopup("You are here");
          }
          
          toast.success("Location found!");
        },
        (error) => {
          console.error("Error getting location: ", error);
          toast.error("Couldn't get your location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const handleNavigate = () => {
    if (selectedMarker) {
      // Open Google Maps with directions to the selected location
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}`;
      window.open(url, '_blank');
      toast.success("Opening navigation...");
    }
  };

  const handleWhatsApp = () => {
    if (selectedMarker) {
      // Create WhatsApp message with location information
      const message = `Hey, check out this location: ${selectedMarker.title} at ${selectedMarker.address}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      toast.success("Opening WhatsApp...");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-appPurple"></div>
        </div>
      )}
      <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm z-10">
        <h1 className="font-semibold text-lg">Explore Map</h1>
        <Button 
          onClick={getUserLocation} 
          size="sm" 
          className="bg-appPurple hover:bg-appPurple-dark"
        >
          My Location
        </Button>
      </div>
      <div id="map" className="flex-grow w-full"></div>

      {/* Location Details Sidebar */}
      {isSidebarOpen && selectedMarker && (
        <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-appPurple" />
                  {selectedMarker.title}
                </h2>
                <button 
                  onClick={closeSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
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
      )}
    </div>
  );
};

export default MapView;
