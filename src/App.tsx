
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./components/Authentication/AuthPage";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import AppLayout from "./components/Layout/AppLayout";
import MapTab from "./pages/MapTab";
import ChatTab from "./pages/ChatTab";
import SettingsTab from "./pages/SettingsTab";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<AuthPage />} />
            
            {/* App routes with layout - protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate to="/app/map" replace />} />
                <Route path="map" element={<MapTab />} />
                <Route path="chat" element={<ChatTab />} />
                <Route path="settings" element={<SettingsTab />} />
              </Route>
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
