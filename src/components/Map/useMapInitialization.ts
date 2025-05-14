
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { MarkerData } from './types';

export const useMapInitialization = (
  center: { lat: number; lng: number },
  zoom: number,
  onMarkerClick: (marker: MarkerData) => void,
  markers: MarkerData[]
) => {
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
    script.onload = () => initializeMap(markers, onMarkerClick);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(linkElement);
      document.body.removeChild(script);
      if (map) map.remove();
    };
  }, []);

  const initializeMap = (markers: MarkerData[], onMarkerClick: (marker: MarkerData) => void) => {
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
    markers.forEach(marker => {
      const markerElement = L.marker([marker.lat, marker.lng])
        .addTo(mapInstance)
        .bindPopup(`<b>${marker.title}</b>`)
        .on('click', () => {
          // When marker is clicked, set the selected marker and open the sidebar
          onMarkerClick(marker);
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

  return { map, userLocation, isLoading, getUserLocation };
};
