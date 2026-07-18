import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Hamein yahan 'BrowserRouter as Router' ki zaroorat nahi hai
import Home from "./pages/Home";
import MovieDetail from "./components/moviedetail"; 
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
      </Routes>
    </>
  );
}

export default App;