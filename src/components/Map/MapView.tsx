
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import MarkerDetailsSidebar from './MarkerDetailsSidebar';
import { useMapInitialization } from './useMapInitialization';
import { MOCK_MARKERS, MarkerData, MapViewProps } from './types';

const MapView = ({ center = { lat: 51.505, lng: -0.09 }, zoom = 3 }: MapViewProps) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
    setIsSidebarOpen(true);
  };

  const { isLoading, getUserLocation } = useMapInitialization(
    center,
    zoom,
    handleMarkerClick,
    MOCK_MARKERS
  );

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
      {selectedMarker && (
        <MarkerDetailsSidebar
          selectedMarker={selectedMarker}
          isSidebarOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      )}
    </div>
  );
};

export default MapView;
