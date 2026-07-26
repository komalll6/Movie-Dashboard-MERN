import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Film, Send, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0d0c0f] text-gray-400 border-t border-white/10 pt-5 pb-12 px-4 md:px-12 transition-colors -mt-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Brand & Social Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-1 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-black text-2xl tracking-tight flex items-center gap-2">
              <Film className="w-7 h-7 text-red-600 fill-red-600/20" />
              MovieHub
            </span>
          </div>

          {/* Social Icons using Inline SVGs / Universal Lucide Icons */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5"
              aria-label="X / Twitter"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* Share */}
            <a 
              href="#" 
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-10 text-xs">
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-1">Navigation</h4>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/movie/category/popular" className="hover:text-white transition-colors">Movies</Link>
            <Link to="/series/category/popular" className="hover:text-white transition-colors">TV Series</Link>
            <Link to="/category/trending" className="hover:text-white transition-colors">Trending Now</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-1">Personal</h4>
            <Link to="/watchlist" className="hover:text-white transition-colors">My Watchlist</Link>
            <Link to="/watchlist" className="hover:text-white transition-colors">Favorites</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-1">Support</h4>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-1">Language</h4>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-200 px-3 py-2 rounded-lg w-max text-xs font-medium cursor-pointer hover:bg-white/10 transition">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>English</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Powered by TMDB API.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} MovieHub. All rights reserved.</p>
          <p>Designed for cinema lovers worldwide.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;