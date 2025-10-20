import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const isPreview = import.meta.env.VITE_NETLIFY_CONTEXT && import.meta.env.VITE_NETLIFY_CONTEXT !== 'production';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isPreview) return children; // always allow in preview

  if (isLoading) return <div>Loading...</div>; // wait for auth state

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
