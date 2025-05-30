
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
