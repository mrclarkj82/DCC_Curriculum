import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DemoAuthProvider } from './auth/DemoAuthContext';
import { App } from './App';
import './styles/theme.css';
import './styles/globals.css';
import './styles/synthwave.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DemoAuthProvider>
        <App />
      </DemoAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
