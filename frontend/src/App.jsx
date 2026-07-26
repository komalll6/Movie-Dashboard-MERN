import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MovieDetail from "./components/MovieDetail"; 
import Navbar from "./components/Navbar";
import CategoryPage from './components/CategoryPage';
import SearchResults from './pages/searchresult.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0d0c0f] text-white flex flex-col justify-between">
      <div>
        <Navbar />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Search Route */}
          <Route path="/search" element={<SearchResults />} />

          {/* Watchlist Route */}
          <Route path="/watchlist" element={<Watchlist />} />

          {/* Movie Routes */}
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movie/category/:type" element={<CategoryPage />} />

          {/* Series Routes */}
          <Route path="/series/:id" element={<MovieDetail />} />
          <Route path="/series/category/:type" element={<CategoryPage />} />

          {/* Fallback Category Route */}
          <Route path="/category/:type" element={<CategoryPage />} />
        </Routes>
      </div>

      {/* Elegant Footer rendered globally on all pages */}
      <Footer />
    </div>
  );
}

export default App;