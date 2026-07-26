//new - 25-07
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MovieDetail from "./components/MovieDetail"; 
import Navbar from "./components/Navbar";
import CategoryPage from './components/CategoryPage';
import SearchResults from './pages/searchresult.jsx';
import Watchlist from './pages/Watchlist.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Search Route */}
        <Route path="/search" element={<SearchResults />} />

        {/* Watchlist Route */}
        <Route path="/watchlist" element={<Watchlist />} /> {/* 👈 2. Route add kar diya */}

        {/* Movie Routes */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/category/:type" element={<CategoryPage />} />

        {/* Series Routes */}
        <Route path="/series/:id" element={<MovieDetail />} />
        <Route path="/series/category/:type" element={<CategoryPage />} />

        {/* Fallback Category Route */}
        <Route path="/category/:type" element={<CategoryPage />} />

        {/**wishlist */}
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  );
}

export default App;