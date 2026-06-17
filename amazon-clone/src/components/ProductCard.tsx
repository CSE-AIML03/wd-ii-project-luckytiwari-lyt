import React, { useState } from 'react';
import { Star, StarHalf, ShoppingCart, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, variant?: string) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    const diff = product.originalPrice - product.price;
    return Math.round((diff / product.originalPrice) * 100);
  };

  const discount = calculateDiscount();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Star Builder Helper
  const stars = [];
  const rate = product.rating.rate;
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      stars.push(<Star key={i} className="w-3.5 h-3.5 fill-[#f08804] text-[#f08804]" />);
    } else if (i - 0.5 <= rate) {
      stars.push(<StarHalf key={i} className="w-3.5 h-3.5 fill-[#f08804] text-[#f08804]" />);
    } else {
      stars.push(<Star key={i} className="w-3.5 h-3.5 text-stone-300" />);
    }
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col justify-between cursor-pointer group hover:shadow-lg transition-all duration-300 relative"
      id={`product-card-${product.id}`}
    >
      {/* Discount Tag */}
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-[#cc0c39] text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider z-10">
          Save {discount}%
        </span>
      )}

      {/* Main image */}
      <div className="flex flex-col">
        <div className="relative w-full aspect-square bg-stone-50 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3.5 bg-[#fbfbfb]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-103 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          
          {/* Quick Hover Control Panel */}
          <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="bg-white p-2.5 rounded-full shadow-md hover:bg-stone-50 transition hover:scale-110 text-stone-700"
              title="Preview details"
              aria-label="Preview details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand / Category */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
          {product.category}
        </span>

        {/* Title */}
        <h4 className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#007185] line-clamp-2 min-h-[36px] sm:min-h-[40px] leading-snug mb-1.5">
          {product.title}
        </h4>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center">{stars}</div>
          <span className="text-[11px] text-[#007185] hover:text-[#c45500] hover:underline transition font-bold">
            {product.rating.count.toLocaleString()}
          </span>
        </div>

        {/* Prises and Discounts */}
        <div className="flex items-baseline gap-1.5 mb-2.5">
          <span className="text-stone-900 font-black text-lg">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-stone-400 line-through text-xs font-semibold">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock status indicator */}
        <div className="mb-4">
          {product.stock <= 8 ? (
            <span className="text-[11px] font-black text-[#c45500] bg-orange-50 px-2 py-0.5 rounded leading-none">
              Only {product.stock} left in stock - order soon
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded leading-none">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Put to cart triggers */}
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.button
            key="added"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1 shadow-inner"
            id={`btn-added-state-${product.id}`}
          >
            <Check className="w-4 h-4 text-white" />
            <span>Added to Cart</span>
          </motion.button>
        ) : (
          <motion.button
            key="add-to-cart"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickAdd}
            className="w-full bg-[#f0c14b] hover:bg-[#ddb347] border border-[#a88734] active:border-[#846a29] text-stone-900 font-bold py-2.5 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:shadow-inner cursor-pointer"
            id={`btn-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4 text-stone-800" />
            <span>Add to Cart</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
