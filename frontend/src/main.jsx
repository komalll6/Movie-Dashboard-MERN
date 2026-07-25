// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // 👈 Check Provider import
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider> {/* 👈 Ensure AppProvider wraps App */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);