//new 25-07
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import CategoryPage from '../components/CategoryPage';
import SearchResults from '../pages/SearchResults';
import Watchlist from '../pages/Watchlist'; 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Search & Watchlist Routes */}
      <Route path="/search" element={<SearchResults />} />
      <Route path="/watchlist" element={<Watchlist />} />

      {/* Movie Routes */}
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movie/category/:type" element={<CategoryPage />} />

      {/* Series Routes */}
      <Route path="/series/:id" element={<MovieDetail />} />
      <Route path="/series/category/:type" element={<CategoryPage />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  );
};

export default AppRoutes;
