import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// Pages & Components
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MovieDetail from "./components/MovieDetail"; 
import Navbar from "./components/Navbar";
import CategoryPage from './components/CategoryPage';
import SearchResults from './pages/searchresult.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Footer from './components/Footer';

// Auth Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0d0c0f] text-white flex flex-col justify-between">
        <div>
          <Navbar />
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes - Only accessible when logged in */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />

            {/* Search Route */}
            <Route 
              path="/search" 
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              } 
            />

            {/* Watchlist Route */}
            <Route 
              path="/watchlist" 
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              } 
            />

            {/* Movie Routes */}
            <Route 
              path="/movie/:id" 
              element={
                <ProtectedRoute>
                  <MovieDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/movie/category/:type" 
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              } 
            />

            {/* Series Routes */}
            <Route 
              path="/series/:id" 
              element={
                <ProtectedRoute>
                  <MovieDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/series/category/:type" 
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Category Route */}
            <Route 
              path="/category/:type" 
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              } 
            />

            {/* Redirect any unknown route to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;