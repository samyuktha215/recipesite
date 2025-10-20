import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const isPreview = import.meta.env.VITE_NETLIFY_CONTEXT && import.meta.env.VITE_NETLIFY_CONTEXT !== 'production';

// Auth0 Provider
const AuthProviderWrapper = ({ children }) => {
  if (isPreview) {
    // Mock Auth0 for preview deploy
    return (
      <Auth0Provider
        domain="preview.mock"
        clientId="preview.mock"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'preview-token',
        }}
      >
        {children}
      </Auth0Provider>
    );
  }

  // Production / localhost
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    console.error('❌ Auth0 domain or clientId not set in env variables');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderWrapper>
  </StrictMode>
);
