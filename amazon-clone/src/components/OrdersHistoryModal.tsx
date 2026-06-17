import React from 'react';
import { X, Calendar, MapPin, Truck, CheckCircle2, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../types';

interface OrdersHistoryModalProps {
  orders: Order[];
  onClose: () => void;
  onClearHistory?: () => void;
}

export default function OrdersHistoryModal({
  orders,
  onClose,
  onClearHistory,
}: OrdersHistoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        id="orders-modal-backdrop"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-stone-200"
          id="orders-modal-body"
        >
          {/* Header */}
          <div className="bg-[#131921] px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#febd69]" />
              <h2 className="text-md sm:text-lg font-bold">Your Orders History</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 px-1.5 hover:bg-white/10 rounded-lg text-stone-200"
              aria-label="Close orders log"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh] space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-stone-50 rounded-full border border-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <Calendar className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-sm">No Orders Found yet</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    You haven't authorized any purchases during this session. Put items in your cart and complete checkout to simulate real order processing tracking.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#febd69] hover:bg-[#f08804] text-stone-950 font-bold px-5 py-2 rounded-lg text-xs transition"
                  id="empty-orders-start-browsing"
                >
                  Start Browsing Arrivals
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500 font-bold">
                    Showing {orders.length} transaction invoices
                  </span>
                  {onClearHistory && (
                    <button
                      onClick={onClearHistory}
                      className="text-[#007185] hover:text-[#c45500] hover:underline font-bold"
                    >
                      Clear session invoices history
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50 text-xs shadow-sm"
                      id={`order-block-${order.id}`}
                    >
                      {/* Sub header for each itemized order */}
                      <div className="bg-stone-100 p-3 border-b border-stone-250 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-semibold text-stone-500">
                        <div>
                          <p className="uppercase text-[9px] tracking-wider text-stone-400">Order Placed</p>
                          <p className="text-stone-800 mt-0.5">{order.date}</p>
                        </div>
                        <div>
                          <p className="uppercase text-[9px] tracking-wider text-stone-400">Total charge</p>
                          <p className="text-stone-800 mt-0.5 font-bold">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="uppercase text-[9px] tracking-wider text-stone-400">Ship to:</p>
                          <p className="text-stone-850 truncate mt-0.5" title={order.deliveryAddress}>
                            {order.deliveryAddress.split(',')[0]}
                          </p>
                        </div>
                        <div className="text-right sm:text-left">
                          <p className="uppercase text-[9px] tracking-wider text-stone-400">Invoice ID</p>
                          <p className="text-[#007185] font-mono leading-none mt-1 uppercase select-all">
                            {order.id}
                          </p>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-4 bg-white space-y-3.5">
                        {/* Status notification bar */}
                        <div className="flex items-center gap-1.5 text-xs text-semibold pb-2 border-b border-stone-100">
                          {order.status === 'Shipped' ? (
                            <Truck className="w-5 h-5 text-[#f08804]" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                          <div>
                            <span className="font-bold text-stone-900">
                              Status: {order.status}
                            </span>
                            <span className="text-stone-400 mx-1.5">|</span>
                            <span className="text-stone-500">
                              Est. Delivery: {order.estimatedDelivery}
                            </span>
                          </div>
                        </div>

                        {/* Items listed in order */}
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={`${item.product.id}-${item.selectedVariant || 'none'}`}
                              className="flex gap-3 items-start"
                            >
                              <div className="w-12 h-12 bg-white border border-stone-150 rounded flex items-center justify-center p-1 flex-shrink-0">
                                <img
                                  src={item.product.image}
                                  alt={item.product.title}
                                  className="max-h-full max-w-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="font-bold text-stone-850 text-xs truncate">
                                  {item.product.title}
                                </h4>
                                <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                                  <span>Qty: {item.quantity}</span>
                                  {item.selectedVariant && (
                                    <>
                                      <span>•</span>
                                      <span>{item.selectedVariant}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs font-black text-stone-900 leading-none">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
