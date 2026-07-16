import { useState } from "react";

function Slidebar({ activeGenre, setActiveGenre }) {
  const categories = [
    "Trending",
    "Popular",
    "Top Rated",
    "Upcoming",
    "Action",
    "Comedy",
    "Horror",
    "Sci-Fi",
  ];

  return (
    <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 sticky top-24">
      <h2 className="font-bold text-lg text-slate-200 mb-4 tracking-wide">
        Discover
      </h2>

      <div className="flex flex-col gap-2">
        {categories.map((item) => {
          const isActive = activeGenre === item;
          return (
            <button
              key={item}
              onClick={() => setActiveGenre(item)}
              className={`text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Slidebar;