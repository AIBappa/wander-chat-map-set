
export interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  title: string;
  address: string;
}

export interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
}

// Mock marker data
export const MOCK_MARKERS: MarkerData[] = [
  { id: 1, lat: 40.7128, lng: -74.006, title: "New York", address: "Manhattan, NY 10001, USA" },
  { id: 2, lat: 51.5074, lng: -0.1278, title: "London", address: "Westminster, London, UK" },
  { id: 3, lat: 48.8566, lng: 2.3522, title: "Paris", address: "Champ de Mars, Paris, France" },
  { id: 4, lat: 35.6762, lng: 139.6503, title: "Tokyo", address: "Shinjuku, Tokyo, Japan" },
  { id: 5, lat: 37.7749, lng: -122.4194, title: "San Francisco", address: "California, USA" },
];

// Add global Leaflet type
declare global {
  interface Window {
    L: any; // For Leaflet
  }
}
