import React from 'react';
import { motion } from 'motion/react';
import { PROMO_CATEGORIES } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

interface PromoCardsProps {
  onCategorySelect: (category: string) => void;
}

export default function PromoCards({ onCategorySelect }: PromoCardsProps) {
  return (
    <div className="relative -mt-8 sm:-mt-16 md:-mt-24 z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pb-8">
      {PROMO_CATEGORIES.map((promo, idx) => (
        <motion.div
          key={promo.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-stone-200/60 hover:shadow-xl transition-all duration-300"
          id={`promo-card-${idx}`}
        >
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight mb-2.5">
              {promo.title}
            </h3>
            <div className="relative overflow-hidden rounded-lg bg-stone-100 aspect-square mb-4 group">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
          
          <button
            onClick={() => onCategorySelect(promo.category)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#007185] hover:text-[#c45500] hover:underline self-start transition-colors cursor-pointer"
          >
            <span>{promo.linkText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
