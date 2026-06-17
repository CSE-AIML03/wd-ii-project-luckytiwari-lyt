import React from 'react';
import { Menu, Star, ShieldAlert, Award, Gift, Layers } from 'lucide-react';

interface SubHeaderProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export default function SubHeader({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSearchQuery,
}: SubHeaderProps) {
  const handleCategoryShortcut = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 sm:px-6 bg-[#232f3e] text-white text-xs select-none">
      {/* Lower Nav links */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-0.5">
        <button 
          onClick={() => handleCategoryShortcut('All')}
          className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-md transition whitespace-nowrap cursor-pointer ${
            selectedCategory === 'All' ? 'bg-[#374151] text-[#febd69]' : 'hover:bg-white/10'
          }`}
          id="dept-shortcut-all"
        >
          <Menu className="w-4 h-4" />
          <span>All Departments</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryShortcut(cat)}
            className={`font-semibold px-2.5 py-1 rounded-md transition whitespace-nowrap cursor-pointer ${
              selectedCategory === cat ? 'bg-[#374151] text-[#febd69]' : 'hover:bg-white/10 text-stone-100'
            }`}
            id={`dept-shortcut-${cat.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Decorative prompt */}
      <div className="hidden lg:flex items-center gap-2.5 text-stone-300 font-semibold cursor-pointer py-0.5 whitespace-nowrap hover:text-white transition">
        <span>🎉 Limited Summer Bargains: Save up to 50%</span>
      </div>
    </div>
  );
}
