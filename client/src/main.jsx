import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const isPreview = import.meta.env.VITE_NETLIFY_CONTEXT !== 'production';

const AuthProviderWrapper = ({ children }) => {
  if (isPreview) {
    // Mock Auth0 for preview deploys
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

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
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
