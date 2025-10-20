import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from 'react-router-dom';

const isPreview = import.meta.env.VITE_NETLIFY_CONTEXT !== 'production';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (isPreview) return children; // skip auth in previews

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
