// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { BrowserRouter } from "react-router-dom";

// import App from "./App";
// import "./index.css";

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={clerkPubKey}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ClerkProvider>
//   </React.StrictMode>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom' // <-- BrowserRouter import karein

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Sabse bahar BrowserRouter rakhein */}
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)