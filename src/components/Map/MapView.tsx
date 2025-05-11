
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// Mock marker data - in a real app, this would come from an API or state management
const MOCK_MARKERS = [
  { id: 1, lat: 40.7128, lng: -74.006, title: "New York" },
  { id: 2, lat: 51.5074, lng: -0.1278, title: "London" },
  { id: 3, lat: 48.8566, lng: 2.3522, title: "Paris" },
  { id: 4, lat: 35.6762, lng: 139.6503, title: "Tokyo" },
  { id: 5, lat: 37.7749, lng: -122.4194, title: "San Francisco" },
];

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
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
        .bindPopup(`<b>${marker.title}</b>`);
      
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
    </div>
  );
};

export default MapView;
