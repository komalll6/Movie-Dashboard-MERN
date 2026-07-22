// import React from 'react';
// import { Routes, Route } from 'react-router-dom'; // Hamein yahan 'BrowserRouter as Router' ki zaroorat nahi hai
// import Home from "./pages/Home";
// import MovieDetail from "./components/moviedetail"; 
// import Navbar from "./components/Navbar";
// import CategoryPage from './components/CategoryPage';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/movie/:id" element={<MovieDetail />} />
//         <Route path="/movie/category/:type" element={<CategoryPage />} />
//         <Route path="/movie/category/:type" element={<CategoryPage />} />
//         <Route path="/series/category/:type" element={<CategoryPage />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail'; // or './pages/MovieDetails'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/category/:type" element={<CategoryPage />} />
        
        {/* Series Routes */}
        <Route path="/series/:id" element={<MovieDetail />} /> 
        <Route path="/series/category/:type" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;