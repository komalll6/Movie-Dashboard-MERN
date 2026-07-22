// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
// import Explore from "../pages/Explore";
// import MovieDetails from "../pages/MovieDetails";
// import Watchlist from "../pages/Watchlist";
// import Profile from "../pages/Profile";

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/explore" element={<Explore />} />
//       <Route path="/movie/:id" element={<MovieDetails />} />
//       <Route path="/watchlist" element={<Watchlist />} />
//       <Route path="/profile" element={<Profile />} />
//     </Routes>
//   );
// }

// export default AppRoutes;

//series
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import CategoryPage from '../components/CategoryPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Movie Routes */}
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movie/category/:type" element={<CategoryPage />} />

      {/* Series Routes */}
      <Route path="/series/:id" element={<MovieDetail />} />
      <Route path="/series/category/:type" element={<CategoryPage />} />
    </Routes>
  );
};

export default AppRoutes;