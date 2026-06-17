import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BANNER_SLIDES } from '../data/mockData';

interface BannerProps {
  onCategorySelect: (category: string) => void;
}

export default function Banner({ onCategorySelect }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === BANNER_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const activeSlide = BANNER_SLIDES[currentIndex];

  return (
    <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] overflow-hidden bg-stone-900 select-none">
      {/* Slides container */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover brightness-[0.7] transform scale-102 hover:scale-105 transition-transform duration-10000"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-900/40 to-stone-950/70" />
            
            {/* Contents Card */}
            <div className="absolute inset-x-0 top-0 bottom-12 flex flex-col justify-center px-4 sm:px-8 md:px-16 text-white max-w-4xl">
              <span className="flex items-center gap-1.5 self-start text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#f08804] text-stone-950 px-2.5 py-1 rounded-full mb-2 sm:mb-4 shadow-lg">
                <Tag className="w-3 h-3" />
                {activeSlide.tagline}
              </span>
              
              <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight drop-shadow-md text-stone-50 leading-tight">
                {activeSlide.title}
              </h1>
              
              <p className="text-xs sm:text-sm md:text-md text-stone-200 mt-2 sm:mt-3 drop-shadow max-w-xl font-medium line-clamp-2">
                {activeSlide.subtitle}
              </p>
              
              <div className="mt-4 sm:mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCategorySelect(activeSlide.category)}
                  className="bg-[#febd69] hover:bg-[#f08804] text-stone-950 font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm transition shadow-lg cursor-pointer flex items-center gap-1.5"
                  id={`cta-banner-button-${currentIndex}`}
                >
                  <Percent className="w-4 h-4" />
                  {activeSlide.ctaText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Arrow Left */}
      <button
        onClick={handlePrev}
        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition ring-1 ring-white/10"
        aria-label="Previous promote banner"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Nav Arrow Right */}
      <button
        onClick={handleNext}
        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition ring-1 ring-white/10"
        aria-label="Next promo banner"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Visual Dot Selectors */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {BANNER_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-[#febd69] w-6' : 'bg-white/45 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
