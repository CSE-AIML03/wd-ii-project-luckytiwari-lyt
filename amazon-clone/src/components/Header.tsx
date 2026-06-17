import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, User, ChevronDown, Menu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onOrdersClick: () => void;
  categories: string[];
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  onCartClick,
  onOrdersClick,
  categories,
}: HeaderProps) {
  const [isAddrOpen, setIsAddrOpen] = useState(false);
  const [deliveryZip, setDeliveryZip] = useState('94103');
  const [zipInput, setZipInput] = useState('94103');
  const [tempCity, setTempCity] = useState('San Francisco, CA');

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length >= 4) {
      setDeliveryZip(zipInput);
      if (zipInput.startsWith('9')) {
        setTempCity('San Francisco, CA');
      } else if (zipInput.startsWith('1')) {
        setTempCity('New York, NY');
      } else if (zipInput.startsWith('6')) {
        setTempCity('Chicago, IL');
      } else {
        setTempCity('Austin, TX');
      }
      setIsAddrOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full font-sans bg-[#131921] text-white">
      {/* Prime top announcement */}
      <div className="hidden sm:flex justify-between items-center px-4 py-1.5 text-xs text-stone-300 bg-[#1a202c]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#febd69] tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-[10px] uppercase">
            Prime
          </span>
          <span>Enjoy FREE 2-Day Delivery on eligible Amazon Clone orders.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer transition">Gift Cards</span>
          <span className="hover:text-white cursor-pointer transition">Registry</span>
          <span className="hover:text-white cursor-pointer transition">Sell on Amazon</span>
        </div>
      </div>

      {/* Main Row */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-3 border-b border-[#232f3e]">
        {/* Left section: Logo & Address */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
          {/* Logo */}
          <div 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="flex flex-col cursor-pointer select-none group"
            id="header-logo-container"
          >
            <div className="flex items-baseline gap-0.5 text-xl lg:text-2xl font-black tracking-tight text-white leading-none">
              <span>amazon</span>
              <span className="text-[#febd69] font-normal text-xs uppercase tracking-widest bg-[#232f3e] px-1 rounded">clone</span>
            </div>
            <div className="h-1 w-full bg-[#febd69] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded" />
          </div>

          {/* Delivery Location */}
          <div 
            onClick={() => setIsAddrOpen(!isAddrOpen)}
            className="relative hidden md:flex items-center gap-1.5 px-2 py-1 rounded border border-transparent hover:border-white cursor-pointer transition group"
            id="delivery-location-trigger"
          >
            <MapPin className="w-5 h-5 text-stone-300 group-hover:text-[#febd69] transition" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-stone-400 font-medium">Deliver to</span>
              <span className="text-xs font-bold whitespace-nowrap text-stone-100">
                {tempCity} ({deliveryZip})
              </span>
            </div>
            
            {/* Simple address popover */}
            {isAddrOpen && (
              <div 
                className="absolute top-12 left-0 w-64 bg-white text-stone-900 rounded-xl p-4 shadow-2xl border border-stone-200 cursor-default"
                onClick={(e) => e.stopPropagation()}
                id="address-popover"
              >
                <h4 className="font-bold text-sm mb-2 text-stone-800">Specify Zip Code</h4>
                <form onSubmit={handleZipSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    value={zipInput} 
                    onChange={(e) => setZipInput(e.target.value)} 
                    placeholder="e.g. 94103"
                    className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f08804]"
                    maxLength={5}
                  />
                  <button 
                    type="submit" 
                    className="bg-[#febd69] hover:bg-[#f08804] px-3 py-1.5 rounded-lg text-xs font-bold transition text-stone-950 flex-shrink-0"
                  >
                    Apply
                  </button>
                </form>
                <p className="text-[10px] text-stone-500 mt-2">
                  Enter any 5-digit US Zip (e.g. 10001: New York, 94103: San Francisco).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Middle Section: Advanced Search Bar */}
        <div className="flex-grow max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center bg-white rounded-lg overflow-hidden text-stone-900 shadow-inner group focus-within:ring-2 focus-within:ring-[#f08804]">
          {/* Department chooser */}
          <div className="relative flex items-center bg-stone-100 border-r border-stone-200 px-3 py-2 cursor-pointer group/dept">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-stone-100 font-medium text-xs text-stone-700 outline-none pr-5 pl-1 cursor-pointer"
            >
              <option value="All">All Departments</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 text-stone-500 pointer-events-none group-hover/dept:text-stone-700" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search products like "headphones", "hoodie", "watch", "coffee maker"...'
            className="w-full px-3 py-2 text-xs md:text-sm bg-transparent outline-none border-none placeholder-stone-400"
            id="navbar-search-input"
          />

          {/* Search Button */}
          <button 
            type="button"
            className="bg-[#febd69] hover:bg-[#f08804] p-2.5 sm:px-5 transition flex items-center justify-center text-stone-950"
            id="navbar-search-button"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Right Section: Orders history, Cart */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5 flex-shrink-0">
          
          {/* Simulated Account section */}
          <div className="hidden lg:flex items-center gap-1.5 text-stone-200">
            <User className="w-5 h-5 text-stone-300" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-stone-400">Hello, Guest</span>
              <span className="text-xs font-bold leading-none text-white whitespace-nowrap">My Account</span>
            </div>
          </div>

          {/* Orders Button */}
          <button
            onClick={onOrdersClick}
            className="flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white transition text-left"
            id="orders-toggle-button"
          >
            <span className="text-[10px] text-stone-400">Returns</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">& Orders</span>
          </button>

          {/* Cart Widget */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#febd69] text-stone-950 font-bold hover:bg-[#f2a742] transition cursor-pointer relative"
            id="header-cart-widget"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900" />
            <span className="hidden sm:inline text-xs sm:text-sm">Cart</span>
            
            {/* Dynamic Counter Bubble */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-black px-1 border-2 border-[#131921] shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.div>

        </div>
      </div>
    </header>
  );
}
