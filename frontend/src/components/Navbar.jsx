import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-red-500"
        >
          MovieHub
        </Link>

        <div className="hidden md:flex gap-8">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>

        <SearchBar />

        <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
          Sign In
        </button>

      </div>
    </nav>
  );
}

export default Navbar;