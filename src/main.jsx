import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-7whr3yiydc13aogp.eu.auth0.com"
    clientId="dgzwTiXahFJjvtapPW9ASvSymz8qdMIT"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Auth0Provider>
    
   
  </StrictMode>
)
