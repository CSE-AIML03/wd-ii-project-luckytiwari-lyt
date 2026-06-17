import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, Sparkles, MapPin, Truck, Check, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, quantity: number, variant?: string) => void;
  onRemove: (productId: string, variant?: string) => void;
  onPlaceOrder: (deliveryAddress: string) => void;
}

export default function CartDrawer({
  cartItems,
  onClose,
  onUpdateQty,
  onRemove,
  onPlaceOrder,
}: CartDrawerProps) {
  const [checkoutStage, setCheckoutStage] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [shippingAddress, setShippingAddress] = useState('1600 Amphitheatre Pkwy, Mountain View, CA 94043');
  const [recipientName, setRecipientName] = useState('John Doe');
  const [paymentOption, setPaymentOption] = useState('card');
  const [cardDigits, setCardDigits] = useState('4242');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim() || !recipientName.trim()) return;

    // Call state manager to log order
    onPlaceOrder(`${recipientName}, ${shippingAddress}`);
    setCheckoutStage('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        id="cart-drawer-backdrop"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-stone-200"
          id="cart-drawer-container"
        >
          {/* Header Panel */}
          <div className="px-4 py-5 bg-[#131921] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#febd69]" />
              <h2 className="text-md sm:text-lg font-bold tracking-tight">Shopping Basket</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 px-2 hover:bg-white/10 rounded-lg text-stone-200 transition"
              aria-label="Close cart sidepanel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CHECKOUT FLOW SUB-BAR */}
          <div className="bg-stone-50 border-b border-stone-200 py-2.5 px-4 flex items-center justify-center gap-3 select-none text-[10px] uppercase font-black text-stone-400">
            <span className={`${checkoutStage === 'cart' ? 'text-[#f08804] border-b border-[#f08804]' : 'text-stone-500'}`}>
              01/ Cart Items
            </span>
            <span>&rarr;</span>
            <span className={`${checkoutStage === 'shipping' ? 'text-[#f08804] border-b border-[#f08804]' : 'text-stone-500'}`}>
              02/ Shipping Form
            </span>
            <span>&rarr;</span>
            <span className={`${checkoutStage === 'success' ? 'text-emerald-600' : 'text-stone-500'}`}>
              03/ Receipt
            </span>
          </div>

          {/* MAIN WRAPPER COMPONENT BY STAGE */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-5">
            <AnimatePresence mode="popLayout">
              {/* STAGE 1: CART OVERVIEW */}
              {checkoutStage === 'cart' && (
                <motion.div
                  key="cart-over"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-4"
                >
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 text-sm">Your Basket is Empty</h3>
                        <p className="text-xs text-stone-400 mt-1 max-w-[240px] mx-auto">
                          Browse our departments and deals to find high fidelity audio, fashion, and culinary tools.
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="bg-[#febd69] hover:bg-[#f08804] text-stone-950 font-bold px-5 py-2 rounded-lg text-xs transition cursor-pointer"
                        id="empty-cart-continue-shopping"
                      >
                        Start shopping deals
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item, idx) => (
                        <div
                          key={`${item.product.id}-${item.selectedVariant || 'none'}`}
                          className="flex gap-3 pb-3 border-b border-stone-100 items-start hover:bg-stone-50/50 p-1.5 rounded-lg transition"
                          id={`cart-item-${idx}`}
                        >
                          {/* Image */}
                          <div className="w-16 h-16 bg-white border border-stone-200 rounded p-1 flex items-center justify-center flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info Column */}
                          <div className="flex-grow min-w-0">
                            <h4 className="text-xs font-bold text-stone-800 truncate">
                              {item.product.title}
                            </h4>
                            {item.selectedVariant && (
                              <p className="text-[10px] text-stone-400 font-semibold mt-0.5">
                                Option: <span className="text-stone-600">{item.selectedVariant}</span>
                              </p>
                            )}
                            <div className="text-xs font-black text-stone-900 mt-1">
                              ${item.product.price.toFixed(2)}{' '}
                              <span className="text-stone-400 font-normal">each</span>
                            </div>

                            {/* Qty Dial & Delete block */}
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center border border-stone-300 rounded-md bg-white">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQty(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedVariant || undefined
                                    )
                                  }
                                  className="px-1.5 py-0.5 hover:bg-stone-100 text-stone-600 cursor-pointer text-xs"
                                  aria-label="Reduce cart quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-[11px] font-bold text-stone-800">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQty(
                                      item.product.id,
                                      item.quantity + 1,
                                      item.selectedVariant || undefined
                                    )
                                  }
                                  className="px-1.5 py-0.5 hover:bg-stone-100 text-stone-600 cursor-pointer text-xs"
                                  aria-label="Increase cart quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  onRemove(item.product.id, item.selectedVariant || undefined)
                                }
                                className="text-stone-400 hover:text-red-600 transition p-1"
                                title="Remove item"
                                id={`cart-remove-${item.product.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Line total price */}
                          <div className="text-xs font-black text-stone-900 flex-shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STAGE 2: SHIPPING & BILLING ADDRESS FORM */}
              {checkoutStage === 'shipping' && (
                <motion.form
                  key="shipping-over"
                  onSubmit={handleCheckoutSubmit}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                  id="checkout-shipping-form"
                >
                  <h3 className="font-bold text-stone-800 text-sm pb-1.5 border-b border-stone-200">
                    Secure checkout portal
                  </h3>

                  <div className="space-y-3.5 text-xs text-stone-700">
                    <div>
                      <label className="block font-bold text-stone-500 mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f08804]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-500 mb-1">Delivery Address</label>
                      <textarea
                        rows={3}
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f08804]"
                        placeholder="e.g. 1600 Amphitheatre Pkwy, Mountain View, CA 94043"
                      />
                    </div>

                    {/* Standard prime guarantee sticker */}
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex gap-2">
                      <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-blue-900 text-xs leading-tight">Prime Guaranteed Logistics</p>
                        <p className="text-[10px] text-blue-700 mt-0.5">
                          Secure 2-Day Air logistics applied automatically. No code required.
                        </p>
                      </div>
                    </div>

                    {/* Dummy credit card fields */}
                    <div className="space-y-2">
                      <label className="block font-bold text-stone-500 mb-0.5">
                        Frictional Payment Card
                      </label>
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-stone-600" />
                          <span className="font-bold text-stone-800">1-Touch Express Simulated Bank</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="block text-[10px] text-stone-400 font-bold mb-1">
                              Simulated Number
                            </span>
                            <div className="bg-stone-200 rounded px-2.5 py-1.5 font-mono text-[11px] text-stone-600 select-none">
                              •••• •••• •••• {cardDigits}
                            </div>
                          </div>
                          <div>
                            <span className="block text-[10px] text-stone-400 font-bold mb-1">
                              Custom 4 Digits
                            </span>
                            <input
                              type="text"
                              value={cardDigits}
                              onChange={(e) => setCardDigits(e.target.value.replace(/\D/g, '').substring(0, 4))}
                              className="w-full px-2.5 py-1 border border-stone-300 rounded font-mono text-[11px] focus:outline-none"
                              placeholder="4242"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-4 text-xs font-bold leading-none select-none">
                    <button
                      type="button"
                      onClick={() => setCheckoutStage('cart')}
                      className="w-1/3 py-3 border border-stone-300 hover:bg-stone-100 transition rounded-lg text-stone-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 bg-[#f0c14b] text-stone-950 hover:bg-[#ddb347] border border-[#a88734] transition rounded-lg flex items-center justify-center gap-1 shadow-sm"
                      id="submit-frictional-checkout"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Authorize Order - ${subtotal.toFixed(2)}</span>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STAGE 3: ORDER SUCCESS CELEBRATION */}
              {checkoutStage === 'success' && (
                <motion.div
                  key="receipt-over"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-5"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-black text-stone-900 text-base">Purchase Authorized!</h3>
                    <p className="text-xs text-stone-500 max-w-[260px] mx-auto">
                      Your order has been captured securely inside standard simulated state.
                    </p>
                  </div>

                  {/* Shipping badge */}
                  <div className="bg-stone-50 border border-stone-150 rounded-xl p-3 text-left space-y-1.5 text-[11px] max-w-sm mx-auto">
                    <p className="font-bold text-stone-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f08804]" />
                      <span>Shipping Address:</span>
                    </p>
                    <p className="text-stone-500 pl-5">{recipientName}</p>
                    <p className="text-stone-500 pl-5">{shippingAddress}</p>
                    <p className="text-stone-400 pl-5 leading-normal mt-1 border-t border-stone-100 pt-1">
                      Estimated dispatch is: <span className="font-bold text-stone-700">Under 2 hours</span>.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 select-none">
                    <button
                      onClick={() => {
                        setCheckoutStage('cart');
                        onClose();
                      }}
                      className="w-full py-3 bg-[#febd69] hover:bg-[#f08804] text-stone-950 font-bold rounded-lg text-xs transition"
                      id="success-checkout-continue"
                    >
                      Browse more arrivals
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Total summary Bar (Only shown on stages cart/shipping) */}
          {checkoutStage !== 'success' && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200">
              <div className="flex items-center justify-between font-bold text-xs text-stone-600 mb-1.5">
                <span>Items quantity count:</span>
                <span className="text-stone-800">{itemsCount} units</span>
              </div>
              <div className="flex items-baseline justify-between font-black text-stone-900 mb-4 pb-1 border-b border-stone-200">
                <span className="text-sm">Total Subtotal:</span>
                <span className="text-lg text-stone-950">${subtotal.toFixed(2)}</span>
              </div>

              {checkoutStage === 'cart' && (
                <button
                  type="button"
                  onClick={() => setCheckoutStage('shipping')}
                  className="w-full bg-[#f0c14b] text-stone-900 hover:bg-[#ddb347] border border-[#a88734] font-bold py-3 rounded-lg text-xs sm:text-sm text-center block shadow-sm"
                  id="checkout-begin-button"
                >
                  Proceed to Fictional Checkout
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
