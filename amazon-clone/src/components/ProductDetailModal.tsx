import React, { useState } from 'react';
import { X, Star, StarHalf, Plus, Minus, ShoppingCart, ShieldCheck, Truck, RefreshCw, PenSquare, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Review } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAddReview,
}: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants.options[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review Form local state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [validationError, setValidationError] = useState('');

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedVariant || undefined);
    // Auto reset or give feedback, the caller will handle feedback, but we can close or alert
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewTitle.trim() || !reviewComment.trim()) {
      setValidationError('All form fields are required to submit.');
      return;
    }

    const newRev: Review = {
      id: `rev-gen-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verified: true,
    };

    onAddReview(product.id, newRev);

    // Reset Form
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setReviewRating(5);
    setValidationError('');
    setShowReviewForm(false);
  };

  // Star Builder Helper
  const renderStars = (rate: number, size = "w-4 h-4") => {
    const arr = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rate)) {
        arr.push(<Star key={i} className={`${size} fill-[#f08804] text-[#f08804]`} />);
      } else if (i - 0.5 <= rate) {
        arr.push(<StarHalf key={i} className={`${size} fill-[#f08804] text-[#f08804]`} />);
      } else {
        arr.push(<Star key={i} className={`${size} text-stone-300`} />);
      }
    }
    return arr;
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        id="detail-modal-backdrop"
      />

      {/* Modal structure */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-stone-200"
          id="detail-modal-body"
        >
          {/* Top floating Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            id="detail-modal-close-button"
            aria-label="Close detailed modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-y-auto max-h-[85vh]">
            {/* COLUMN 1: Large Sticky Image Gallery (md:col-span-5) */}
            <div className="md:col-span-5 p-4 sm:p-6 bg-stone-50/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-150">
              <div className="sticky top-0 flex flex-col items-center">
                {/* Sale / Percent alert */}
                {discount > 0 && (
                  <span className="self-start text-[10px] uppercase font-bold tracking-widest bg-[#cc0c39] text-white px-2.5 py-1 rounded mb-4">
                    Sale - Save {discount}%
                  </span>
                )}
                
                <div className="h-64 sm:h-80 w-full flex items-center justify-center bg-white rounded-xl shadow-inner border border-stone-100 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                    referrerPolicy="referrer"
                  />
                </div>
                
                <p className="text-[10px] text-stone-400 mt-3 text-center">
                  * Hover cursor over image to study micro-details. Genuine retail grade photography.
                </p>
              </div>

              {/* Guarantees links */}
              <div className="hidden sm:grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-stone-200 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#f08804] mb-1" />
                  <span className="text-[9px] font-bold text-stone-700">Gen-Genuine Warrantee</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#f08804] mb-1" />
                  <span className="text-[9px] font-bold text-stone-700">Free Prime Track</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw className="w-5 h-5 text-[#f08804] mb-1" />
                  <span className="text-[9px] font-bold text-stone-700">30-Day Refunds</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Descriptive Info & Specifications Tabs (md:col-span-4) */}
            <div className="md:col-span-4 p-4 sm:p-6 flex flex-col">
              <span className="text-xs font-bold text-[#007185] hover:underline cursor-pointer mb-1 block">
                Visit {product.category} Department
              </span>
              
              <h2 className="text-md sm:text-lg font-black text-stone-900 leading-snug mb-2">
                {product.title}
              </h2>

              {/* Reviews Summary */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-stone-200">
                <div className="flex">{renderStars(product.rating.rate, "w-4 h-4")}</div>
                <span className="text-xs font-bold text-stone-700">{product.rating.rate} out of 5</span>
                <span className="text-xs text-stone-400">|</span>
                <span className="text-xs font-bold text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">
                  {product.rating.count} comments & answers
                </span>
              </div>

              {/* TABS BUTTON BAR */}
              <div className="flex border-b border-stone-200 mb-4 select-none">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 text-xs font-bold transition border-b-2 leading-none cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-[#f08804] text-[#f08804]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-3 text-xs font-bold transition border-b-2 leading-none cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-[#f08804] text-[#f08804]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-3 text-xs font-bold transition border-b-2 leading-none cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-[#f08804] text-[#f08804]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              {/* TAB PANELS ENGINES */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  {activeTab === 'details' && (
                    <div className="text-stone-700 text-xs sm:text-sm leading-relaxed space-y-3">
                      <p className="font-medium text-stone-600 italic">"{product.description}"</p>
                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#f08804] flex-shrink-0" />
                        <div>
                          <p className="font-bold text-stone-800 text-xs">Eligible for free express shipping</p>
                          <p className="text-[10px] text-stone-500">Order within next 3 hours to arrive by Tuesday.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <table className="w-full text-xs">
                        <tbody>
                          {product.specifications.map((spec, i) => (
                            <tr
                              key={spec.key}
                              className={i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}
                            >
                              <td className="px-3 py-2 font-bold text-stone-500 w-1/3 border-b border-stone-100">
                                {spec.key}
                              </td>
                              <td className="px-3 py-2 text-stone-800 border-b border-stone-100">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {/* Review actions top block */}
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                        <span className="text-xs font-bold text-stone-800">Verified buyers opinion</span>
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="flex items-center gap-1 text-[11px] font-black text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer"
                        >
                          <PenSquare className="w-3.5 h-3.5" />
                          <span>Write a Review</span>
                        </button>
                      </div>

                      {/* Review writing block */}
                      {showReviewForm && (
                        <form
                          onSubmit={handleReviewSubmit}
                          className="bg-stone-50 p-3 sm:p-4 rounded-xl border border-stone-200 mt-2 text-xs space-y-3"
                        >
                          <h4 className="font-black text-stone-800">Review this item</h4>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-500 mb-1">
                              Your Name
                            </label>
                            <input
                              type="text"
                              value={reviewAuthor}
                              onChange={(e) => setReviewAuthor(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded focus:outline-none"
                              placeholder="e.g. Rachel Carter"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                                Rating Stars
                              </label>
                              <select
                                value={reviewRating}
                                onChange={(e) => setReviewRating(Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 border border-stone-300 rounded focus:outline-none bg-white"
                              >
                                <option value={5}>5 Stars - Perfect</option>
                                <option value={4}>4 Stars - Good</option>
                                <option value={3}>3 Stars - Average</option>
                                <option value={2}>2 Stars - Weak</option>
                                <option value={1}>1 Star - Dreadful</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                                Review Title
                              </label>
                              <input
                                type="text"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                className="w-full px-2.5 py-1.5 border border-stone-300 rounded focus:outline-none"
                                placeholder="Highly satisfied!"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-500 mb-1">
                              Written comments
                            </label>
                            <textarea
                              rows={2}
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded focus:outline-none"
                              placeholder="What did you like or dislike about this product?"
                            />
                          </div>

                          {validationError && (
                            <p className="text-red-600 text-[10px] font-bold leading-tight">
                              {validationError}
                            </p>
                          )}

                          <div className="flex justify-end gap-2 text-stone-800">
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="px-3 py-1.5 rounded bg-white hover:bg-stone-200 border border-stone-300 font-bold"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 rounded bg-[#febd69] hover:bg-[#f08804] text-stone-950 font-bold shadow-sm"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Reviews loop list */}
                      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                        {product.reviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="p-3 border border-stone-100 rounded-lg space-y-1.5 text-xs bg-white"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-800">{rev.author}</span>
                              <span className="text-[10px] text-stone-400">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="flex">{renderStars(rev.rating, "w-3 h-3")}</div>
                              <span className="font-bold text-stone-800">{rev.title}</span>
                              {rev.verified && (
                                <span className="bg-orange-50 text-[#c45500] text-[8px] font-bold uppercase py-0.5 px-1.5 rounded border border-orange-100 tracking-wider">
                                  Verified Buy
                                </span>
                              )}
                            </div>
                            <p className="text-stone-600 leading-normal">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 3: Right Sidebar Buying / Cart Box (md:col-span-3) */}
            <div className="md:col-span-3 p-4 sm:p-6 bg-stone-50 border-t md:border-t-0 border-stone-200 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Price block */}
                <div>
                  <div className="text-stone-900 font-black text-2xl sm:text-3xl leading-none">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-stone-400 text-xs mt-1 font-semibold">
                      Was:{' '}
                      <span className="line-through">
                        ${(product.originalPrice * quantity).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Shipping prompt */}
                <div className="space-y-1.5">
                  <p className="text-xs text-stone-700 font-semibold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free Delivery Tomorrow</span>
                  </p>
                  <p className="text-[11px] text-stone-500">
                    If ordered in the next{' '}
                    <span className="font-bold text-stone-700">2h 45m</span>.
                  </p>
                </div>

                {/* Variant selector */}
                {product.variants && (
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Choose {product.variants.type} (Required)
                    </label>
                    <select
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full px-2.5 py-2 border border-stone-300 rounded-lg text-xs font-bold outline-none bg-white focus:ring-1 focus:ring-[#f08804]"
                      id="variant-picker-dropdown"
                    >
                      {product.variants.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Stock alert */}
                <div className="space-y-1">
                  {product.stock <= 8 ? (
                    <p className="text-xs font-bold text-[#c45500]">
                      Only {product.stock} items remaining. Order immediately!
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-emerald-700">In Stock. Ready to dispatch.</p>
                  )}
                </div>

                {/* Quantity adjustments dial */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Quantity limit
                  </label>
                  <div className="flex items-center w-24 border border-stone-300 rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={handleDecreaseQty}
                      className="p-1 px-2 hover:bg-stone-100 text-stone-600 border-r border-stone-200"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="flex-grow text-center text-xs font-bold text-stone-850 select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncreaseQty}
                      className="p-1 px-2 hover:bg-stone-100 text-stone-600 border-l border-stone-200"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 mt-6">
                <button
                  onClick={handleAddToCartClick}
                  className="w-full bg-[#f0c14b] hover:bg-[#ddb347] border border-[#a88734] text-stone-900 font-bold py-3 rounded-lg text-xs sm:text-sm shadow-sm hover:shadow active:shadow-inner flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer"
                  id={`modal-action-add-to-cart-${product.id}`}
                >
                  <ShoppingCart className="w-4 h-4 text-stone-800" />
                  <span>Add to Cart ({quantity} units)</span>
                </button>
                <div className="text-[10px] text-stone-400 text-center">
                  Protected checkout loops. Safe information practices.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
