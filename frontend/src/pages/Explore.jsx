import { useState } from "react";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

// Mock database matching your MovieCard schema
const MOCK_MOVIES = [
  { id: 1, title: "Interstellar", rating: 8.7, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop", genre: "Sci-Fi" },
  { id: 2, title: "The Dark Knight", rating: 9.0, poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop", genre: "Action" },
  { id: 3, title: "Inception", rating: 8.8, poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop", genre: "Sci-Fi" },
  { id: 4, title: "Scary Movie", rating: 6.2, poster: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?q=80&w=1000&auto=format&fit=crop", genre: "Comedy" },
  { id: 5, title: "The Conjuring", rating: 7.5, poster: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop", genre: "Horror" },
];

function Explore() {
  const [activeGenre, setActiveGenre] = useState("Trending");

  // Filter logic (If 'Trending' or similar, show all for now; otherwise filter by genre)
  const isDefaultCategory = ["Trending", "Popular", "Top Rated", "Upcoming"].includes(activeGenre);
  const filteredMovies = isDefaultCategory
    ? MOCK_MOVIES
    : MOCK_MOVIES.filter((m) => m.genre === activeGenre);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <Sidebar activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
          </div>

          {/* Main Content Grid */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {activeGenre} Movies
              </h1>
              <span className="text-sm text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                {filteredMovies.length} Results
              </span>
            </div>

            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
                <p className="text-slate-400 text-lg">No movies found in this genre yet.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Explore;