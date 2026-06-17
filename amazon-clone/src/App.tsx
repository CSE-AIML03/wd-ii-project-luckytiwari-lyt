import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Banner from './components/Banner';
import PromoCards from './components/PromoCards';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import OrdersHistoryModal from './components/OrdersHistoryModal';
import Footer from './components/Footer';

import { MOCK_PRODUCTS } from './data/mockData';
import { Product, CartItem, Order, Review } from './types';
import { Sparkles, Star, RefreshCw, SlidersHorizontal, ArrowUpDown, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // UI States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Active filters
  const [maxPrice, setMaxPrice] = useState<number | 'All'>('All');
  const [minRating, setMinRating] = useState<number | 0>(0);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [sorting, setSorting] = useState<'featured' | 'low-to-high' | 'high-to-low' | 'top-rated'>('featured');

  // Dynamic values
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Handle live custom review submissions
  const handleAddReview = (productId: string, review: Review) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id !== productId) return p;
        const updatedReviews = [review, ...p.reviews];
        const sum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newRate = Number((sum / updatedReviews.length).toFixed(1));
        
        const updatedProduct = {
          ...p,
          reviews: updatedReviews,
          rating: {
            rate: newRate,
            count: updatedReviews.length,
          },
        };

        // If this product was currently selected, sync detail state
        if (selectedProduct && selectedProduct.id === productId) {
          setSelectedProduct(updatedProduct);
        }

        return updatedProduct;
      })
    );
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (idx > -1) {
        const copy = [...prevCart];
        copy[idx].quantity += quantity;
        return copy;
      }
      return [...prevCart, { product, quantity, selectedVariant: variant }];
    });
  };

  const handleUpdateCartQty = (productId: string, qty: number, variant?: string) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, variant);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedVariant === variant
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, variant?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedVariant === variant)
      )
    );
  };

  // Place Simulated Order
  const handlePlaceOrder = (deliveryAddress: string) => {
    const finalTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: `cln-invoice-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      items: [...cart],
      total: finalTotal,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      status: 'Shipped',
      deliveryAddress,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US',
        { month: 'long', day: '2-digit', year: 'numeric' }
      ),
    };
    
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Reset Cart
  };

  const handleClearOrdersHistory = () => {
    setOrders([]);
  };

  // Category selection shorthand
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Reset secondary filters to maximize match probability
    setMaxPrice('All');
    setMinRating(0);
    setOnlyDeals(false);
  };

  // FILTER & SORT COMPUTATION
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search term check
        const matchesQuery =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Category dropdown check
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;

        // Custom price cap filter
        const matchesPrice =
          maxPrice === 'All' ||
          (maxPrice === 50 && p.price <= 50) ||
          (maxPrice === 100 && p.price > 50 && p.price <= 100) ||
          (maxPrice === 101 && p.price > 100);

        // Custom review score filter
        const matchesRating = p.rating.rate >= minRating;

        // Active Discount / Coupon filter
        const matchesDeals = !onlyDeals || (p.originalPrice && p.originalPrice > p.price);

        return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesDeals;
      })
      .sort((a, b) => {
        if (sorting === 'low-to-high') return a.price - b.price;
        if (sorting === 'high-to-low') return b.price - a.price;
        if (sorting === 'top-rated') return b.rating.rate - a.rating.rate;
        return 0; // Default featured sequence
      });
  }, [products, searchQuery, selectedCategory, maxPrice, minRating, onlyDeals, sorting]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice('All');
    setMinRating(0);
    setOnlyDeals(false);
    setSorting('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 font-sans text-stone-900 scroll-smooth">
      {/* 1. MAIN GLOBAL HEADER */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onOrdersClick={() => setIsOrdersOpen(true)}
        categories={categories}
      />

      {/* 2. SECONDARY SUB NAVIGATION HEADER */}
      <SubHeader
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
        setSearchQuery={setSearchQuery}
      />

      {/* 3. HERO ADVERTISING AREA */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <>
          <Banner onCategorySelect={handleCategorySelect} />
          <PromoCards onCategorySelect={handleCategorySelect} />
        </>
      )}

      {/* 4. MAIN PRODUCT DISPLAY SCREEN AREA */}
      <main className="max-w-7xl w-full mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT OPTION FILTERS BAR (Col span 3) */}
          <section className="lg:col-span-3 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-105">
              <span className="font-black text-sm text-stone-800 tracking-tight flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-stone-500" />
                <span>Search Filters</span>
              </span>
              <button
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-[#007185] hover:text-[#c45500] flex items-center gap-1 transition"
                title="Reset filters"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            {/* Department Label Indicator */}
            {selectedCategory !== 'All' && (
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Active Department
                </span>
                <span className="inline-block bg-blue-50 border border-blue-200 text-[#007185] font-bold text-xs py-1 px-3 rounded-full">
                  {selectedCategory}
                </span>
              </div>
            )}

            {/* Price brackets range */}
            <div className="space-y-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Price brackets
              </span>
              <div className="space-y-2 text-xs">
                {[
                  { value: 'All', label: 'All price bounds' },
                  { value: 50, label: 'Under $50' },
                  { value: 100, label: '$50 to $100' },
                  { value: 101, label: 'Over $100' },
                ].map((tier) => (
                  <label
                    key={tier.label}
                    className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900"
                  >
                    <input
                      type="radio"
                      name="price-bracket"
                      checked={maxPrice === tier.value}
                      onChange={() => setMaxPrice(tier.value as any)}
                      className="accent-[#f08804] cursor-pointer w-4 h-4"
                    />
                    <span className={maxPrice === tier.value ? 'font-bold text-stone-900' : ''}>
                      {tier.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Review Stars filters */}
            <div className="space-y-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Minimum review score
              </span>
              <div className="space-y-2 text-xs">
                {[
                  { stars: 0, label: 'Any customer rating' },
                  { stars: 4.5, label: '4.5 ★ & Up' },
                  { stars: 4, label: '4.0 ★ & Up' },
                  { stars: 3, label: '3.0 ★ & Up' },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setMinRating(tier.stars)}
                    className="flex items-center gap-1.5 w-full text-left font-semibold text-stone-700 hover:text-[#c45500] cursor-pointer"
                  >
                    <div className="flex items-center text-[#f08804]">
                      {tier.stars > 0 ? (
                        <>
                          <Star className="w-3.5 h-3.5 fill-[#f08804]" />
                          <span className="ml-1 text-stone-800 text-[11px]">{tier.stars}</span>
                        </>
                      ) : (
                        <Star className="w-3.5 h-3.5 text-stone-300" />
                      )}
                    </div>
                    <span className={minRating === tier.stars ? 'font-bold text-stone-900 underline decoration-[#f08804] underline-offset-2' : ''}>
                      {tier.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Only deals discount switch */}
            <div className="space-y-3.5 pt-4 border-t border-stone-150">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-stone-700">Display deals only</span>
                </div>
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="w-4.5 h-4.5 accent-emerald-600 cursor-pointer"
                />
              </label>
            </div>
          </section>

          {/* MAIN CATALOG REGION (Col span 9) */}
          <section className="lg:col-span-9 space-y-6">
            
            {/* Header controls strip */}
            <div className="bg-white p-3.5 sm:px-5 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-black text-stone-800 tracking-tight leading-none">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Catalog'}
                </h2>
                <p className="text-[11px] text-stone-400 mt-1 font-semibold">
                  Matched exactly <span className="text-[#007185] font-bold">{filteredProducts.length}</span> high fidelity products
                </p>
              </div>

              {/* Sorting triggers */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <span className="text-xs text-stone-400 font-semibold flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Sort by:</span>
                </span>
                <select
                  value={sorting}
                  onChange={(e: any) => setSorting(e.target.value)}
                  className="bg-stone-50 border border-stone-300 rounded-lg text-xs font-bold px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#f08804] text-stone-700"
                >
                  <option value="featured">Featured Arrivals</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="top-rated">Top Customer Rated</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRIDS */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 bg-stone-50 rounded-full border border-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <SlidersHorizontal className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-850 text-base">No Matching Results Found</h3>
                  <p className="text-xs text-stone-500 mt-1.5 max-w-sm mx-auto">
                    Try adjusting your search criteria, clearing price caps, or selecting "All Departments" to see all available inventory.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="bg-[#febd69] hover:bg-[#f08804] text-stone-950 font-bold px-6 py-2.5 rounded-lg text-xs transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                id="products-display-grid"
              >
                <AnimatePresence>
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

          </section>
        </div>
      </main>

      {/* 5. IMMERSIVE PRODUCT SPECIFICATIONS DETAILS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(prod, qty, variant) => {
              handleAddToCart(prod, qty, variant);
              setSelectedProduct(null);
            }}
            onAddReview={handleAddReview}
          />
        )}
      </AnimatePresence>

      {/* 6. SLIDING CART DRAWER SYSTEM */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            cartItems={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQty={handleUpdateCartQty}
            onRemove={handleRemoveFromCart}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </AnimatePresence>

      {/* 7. INVOICE LOGS HISTORICAL MODAL */}
      <AnimatePresence>
        {isOrdersOpen && (
          <OrdersHistoryModal
            orders={orders}
            onClose={() => setIsOrdersOpen(false)}
            onClearHistory={handleClearOrdersHistory}
          />
        )}
      </AnimatePresence>

      {/* 8. CLASSIC INFORMATIONAL FOOTER */}
      <Footer />
    </div>
  );
}
