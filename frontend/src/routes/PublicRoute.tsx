import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PublicRoute;
