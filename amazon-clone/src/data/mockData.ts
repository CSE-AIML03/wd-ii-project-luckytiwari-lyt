import { Product, PromoCategory } from '../types';

export const BANNER_SLIDES = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&auto=format&fit=crop&q=80',
    title: 'Up to 40% Off Premium Audio Gear',
    subtitle: 'Immerse yourself in crystal clear sound. Limited time deals on elite headphones & smart speakers.',
    tagline: 'Deals of the day',
    ctaText: 'Shop Tech Deals',
    accentColor: 'from-[#131921] to-[#232f3e]',
    category: 'Electronics'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=80',
    title: 'Gear Up for the Outdoors',
    subtitle: 'Step into health with high performance running shoes and premium insulated hydration systems.',
    tagline: 'Activewear Essentials',
    ctaText: 'Explore Sports & Outdoors',
    accentColor: 'from-[#0f1111] to-[#1a1b1c]',
    category: 'Sports & Outdoors'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop&q=80',
    title: 'Transform Your House Into A Home',
    subtitle: 'Curated artisanal kitchenware, cozy blankets, and heavy-duty cast iron kitchen essentials.',
    tagline: 'New Arrivals',
    ctaText: 'Shop Home Style',
    accentColor: 'from-[#1a2332] to-[#2b3543]',
    category: 'Home & Kitchen'
  }
];

export const PROMO_CATEGORIES: PromoCategory[] = [
  {
    title: 'Elite Hardware & Gaming',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&auto=format&fit=crop&q=80',
    linkText: 'Shop Keyboards & Gear',
    category: 'Electronics'
  },
  {
    title: 'Comfortable Athletics',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    linkText: 'Browse footwear deals',
    category: 'Sports & Outdoors'
  },
  {
    title: 'Elevate Culinary Arts',
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=400&auto=format&fit=crop&q=80',
    linkText: 'Check out Espresso Makers',
    category: 'Home & Kitchen'
  },
  {
    title: 'Modern Cozy Fashion',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    linkText: 'Trending hoodies & coats',
    category: 'Apparel & Fashion'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'AuraSound-X Pro Wireless Noise-Cancelling Headphones',
    description: 'Experience deep, immersive acoustic fidelity. Equipped with premium Hybrid Active Noise Cancelling, ultra-plush memory protein earpads, and custom-tuned 40mm aerospace drivers. Offering up to 45 hours of playback time with rapid USB-C charging.',
    price: 189.99,
    originalPrice: 249.99,
    rating: { rate: 4.8, count: 1248 },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 24,
    variants: {
      type: 'Color',
      options: ['Carbon Black', 'Starlight Silver', 'Alpine Blue']
    },
    specifications: [
      { key: 'Driver Size', value: '40 mm Dynamic' },
      { key: 'Frequency Response', value: '4Hz - 40,000Hz' },
      { key: 'Connectivity', value: 'Bluetooth 5.3, Gold-Plated 3.5mm Aux' },
      { key: 'Battery Life', value: 'Up to 45 Hours (ANC off)' },
      { key: 'ANC Depth', value: 'Up to 38dB passive/active hybrid feedback' }
    ],
    reviews: [
      {
        id: 'rev-1-1',
        author: 'Alex Mercer',
        rating: 5,
        date: 'May 14, 2026',
        title: 'Absolute game changer for office work!',
        comment: 'The ANC on these headphones performs neck-and-neck with brands twice the price. Very comfortable for long 8+ hour coding sessions. Highly recommend.',
        verified: true
      },
      {
        id: 'rev-1-2',
        author: 'Emily S.',
        rating: 4,
        date: 'June 1, 2026',
        title: 'Amazing sound, slightly heavy',
        comment: 'Sound quality is superb, bass is punchy without muddiness. They feel a bit heavy after a few hours, but the padding is soft enough to compensate.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Chronos Smartwatch Elite v2 with Activity Tracker',
    description: 'Track your vital micro-stats seamlessly. Features a high-brightness 1.45-inch AMOLED color display, integrated optical biometrics for heart rate & SpO2 tracking, multi-sport GPS, and 5 ATM water resistance. Designed with a hand-polished aerospace titanium casing.',
    price: 129.50,
    originalPrice: 199.00,
    rating: { rate: 4.5, count: 852 },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 14,
    variants: {
      type: 'Style',
      options: ['Titanium / Black Band', 'Gold / Sand Pink Band', 'Silver / Navy Leather']
    },
    specifications: [
      { key: 'Display', value: '1.45" Always-On AMOLED, 454x454 px' },
      { key: 'Casing Material', value: 'Grade 5 Aerospace Titanium' },
      { key: 'Waterproof Level', value: '5 ATM (Up to 50m submersion)' },
      { key: 'Battery Life', value: '12 Days on typical usage' },
      { key: 'Sensors', value: '6-axis Accelerometer, Gyroscope, Optical PPG Heart Rate, SpO2' }
    ],
    reviews: [
      {
        id: 'rev-2-1',
        author: 'David K.',
        rating: 5,
        date: 'March 22, 2026',
        title: 'Elite quality and fantastic battery battery life',
        comment: 'I charged this thing once and it lasted almost two full weeks! Sleep tracking maps perfectly with my actual waking hours. Excellent build quality.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Keystrike Neon-95 Mechanical Mechanical Keyboard',
    description: 'Precision mechanical engineering for creators and competitive gamers. Hot-swappable tactile linear switches, PBT double-shot keycaps, sound-dampening high-density foam, and beautiful customized per-key custom RGB lighting matrices.',
    price: 89.99,
    originalPrice: 119.99,
    rating: { rate: 4.7, count: 412 },
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=700&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 8,
    variants: {
      type: 'Style',
      options: ['Linear Custom Yellow Switches', 'Clicky Custom Blue Switches', 'Silent Brown Switches']
    },
    specifications: [
      { key: 'Layout', value: '95% Compact Space-Saving Layout' },
      { key: 'Keycaps', value: 'Premium Dual-Shot PBT' },
      { key: 'ConnectivityType', value: 'Tri-Mode: 2.4GHz Wireless, Bluetooth 5.1, or USB-C' },
      { key: 'Hot-Swap Support', value: '3-pin & 5-pin Cherry/Gateron MX Switches' },
      { key: 'Battery Capacity', value: '4000mAh structural battery pack' }
    ],
    reviews: [
      {
        id: 'rev-3-1',
        author: 'Marcus Aurelius Tech',
        rating: 5,
        date: 'April 09, 2026',
        title: 'Butter smooth typing experience',
        comment: 'The factory lubrication on the switches is outstanding. No rattle in the spacebar. True mechanical bliss. Recommended.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'TerraFlame Premium Cast Iron 12" Skillet with Silicone Grip',
    description: 'Forged to last generations. Pre-seasoned with 100% organic vegetable oil for a natural, fast-release surface. Excellent heat retention and even heating makes this the versatile center of any kitchen, from stovetop to campfires.',
    price: 34.95,
    originalPrice: 45.00,
    rating: { rate: 4.9, count: 2150 },
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=700&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 45,
    variants: {
      type: 'Style',
      options: ['12-inch Heavy Duty', '10-inch Standard', '8-inch Personal']
    },
    specifications: [
      { key: 'Material', value: 'Heavy Forge Quality Cast Iron' },
      { key: 'Compatible Stoves', value: 'Gas, Induction, Electric, Oven, Camping Open Fire' },
      { key: 'Special Feature', value: 'Removable High-Temp Heat Mock Silicone handle cover' },
      { key: 'Pre-seasoned status', value: 'Seasoned with organic flaxseed oil formulas' }
    ],
    reviews: [
      {
        id: 'rev-4-1',
        author: 'Chef Linda',
        rating: 5,
        date: 'February 28, 2026',
        title: 'Perfect seasoning out of the box',
        comment: 'Fried a farm fresh egg directly onto it. Slide off beautiful. Incredible heat dispersion, best steak crust I have cooked in months.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'GourmetBarista 15-Bar Espresso Extraction Machine',
    description: 'Bring the neighborhood Italian espresso counter to your counter. Advanced thermo-block heating system delivers flawless 15-bar extraction pressure for beautiful aromatic crèma. Includes a commercial-grade swiveling steam wand for silky microfoam milk texturing.',
    price: 249.00,
    originalPrice: 299.00,
    rating: { rate: 4.6, count: 328 },
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=700&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 5,
    variants: {
      type: 'Color',
      options: ['Polished Stainless Steel', 'Matte Obsidian Black', 'Retro Cream White']
    },
    specifications: [
      { key: 'Pump pressure', value: 'True Professional 15-Bar Pump' },
      { key: 'Water Tank Capacity', value: '1.8 Liters Removable Reservoir' },
      { key: 'Heating System', value: 'ThermoBlock Rapid Heating system' },
      { key: 'Filter size', value: 'Dual wall 51mm basket set (Single, double)' },
      { key: 'Power Output', value: '1350 Watts power' }
    ],
    reviews: [
      {
        id: 'rev-5-1',
        author: 'Beverage Guy',
        rating: 5,
        date: 'May 20, 2026',
        title: 'Incredible value for the price',
        comment: 'Takes about 40 seconds to warm up and builds solid pressure. The steam wand produces top-tier velvet milk texturing. Very easy to clean.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-6',
    title: 'AeroStride Hyper-Response Running Shoes Mod 8',
    description: 'Break your personal records effortlessly. Engineered with dual-density energetic response foam, a premium integrated stabilization shank, and a breathable weave upper that dynamically conforms to your foot contours. Durable carbon rubber grip outer sole.',
    price: 95.00,
    originalPrice: 140.00,
    rating: { rate: 4.4, count: 680 },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
    category: 'Sports & Outdoors',
    stock: 19,
    variants: {
      type: 'Size',
      options: ['US 8.5', 'US 9.0', 'US 9.5', 'US 10.0', 'US 10.5', 'US 11.0']
    },
    specifications: [
      { key: 'Shoe Weight', value: '8.4 oz (Size US 9)' },
      { key: 'Heel-to-Toe Drop', value: '8 mm' },
      { key: 'Midsole Technology', value: 'High-Response Nitro-Foam blend' },
      { key: 'Upper Material', value: 'Seamless Engineered Knit mesh' }
    ],
    reviews: [
      {
        id: 'rev-6-1',
        author: 'Marathon Runner Mike',
        rating: 4,
        date: 'January 15, 2026',
        title: 'Remarkable energy bounce',
        comment: 'Very responsive foam with high shock absorption. Great for midfoot strikers. My only minor issue is the laces are synthetic and can slip if not double knotted.',
        verified: false
      }
    ]
  },
  {
    id: 'prod-7',
    title: 'HydroShield Vacuum-Insulated 32oz Hydration Flask',
    description: 'Keep your micro-brewed coffee piping hot for 12 hours or post-workout electrolyte water freezing cold for 24 hours. Constructed using ultra-pure 18/8 food-grade kitchen stainless steel with a sweat-free anti-slip powder coating.',
    price: 24.99,
    rating: { rate: 4.8, count: 1845 },
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80',
    category: 'Sports & Outdoors',
    stock: 50,
    variants: {
      type: 'Color',
      options: ['Pacific Teal', 'Volcano Red', 'Slate Black', 'Alabaster White']
    },
    specifications: [
      { key: 'Volume', value: '32 oz (approx 946 mL)' },
      { key: 'Material', value: '18/8 Pro-Grade Stainless Steel' },
      { key: 'Cap Type', value: 'Leakproof Flex Cap' },
      { key: 'Thermal Rating', value: 'Cold up to 24 hours, Hot up to 12' }
    ],
    reviews: [
      {
        id: 'rev-7-1',
        author: 'Camping Jack',
        rating: 5,
        date: 'May 05, 2026',
        title: 'Built like a military tank',
        comment: 'Dropped this bottle down a boulder hill on my hike. Got a tiny scratch but no denting, seal is absolutely perfect! Completely leakproof.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-8',
    title: 'CozyThread Relaxed Fit heavyweight Cotton Hoodie',
    description: 'Indulge in supreme comfort. Crafted from 420 GSM heavy brushed loopback French Terry cotton. Designed for a comfortable dropped-shoulder aesthetic, featuring extra-thick double knit wrist cuffs, a kangaroo hand pocket, and a clean structured double-lined hood.',
    price: 48.00,
    originalPrice: 65.00,
    rating: { rate: 4.3, count: 290 },
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&auto=format&fit=crop&q=80',
    category: 'Apparel & Fashion',
    stock: 12,
    variants: {
      type: 'Color',
      options: ['Oversized Heather Gray', 'Forest Green', 'Sandstone Beige', 'Midnight Black']
    },
    specifications: [
      { key: 'Material', value: '100% Organic combed cotton' },
      { key: 'Weave Weight', value: '420 French Terry heavyweight' },
      { key: 'Fit', value: 'Slightly oversized, relaxed drape' },
      { key: 'Care', value: 'Machine wash cold inside out, tumble dry low' }
    ],
    reviews: [
      {
        id: 'rev-8-1',
        author: 'Sarah Jenkins',
        rating: 5,
        date: 'March 18, 2026',
        title: 'Incredibly cozy and thick!',
        comment: 'This is the most heavy-duty and comfortable hoodie I own. It has a beautiful structural drape that stays looking premium even after multiple washes.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-9',
    title: 'Vanguard Genuine Full-Grain Leather Bi-Fold Wallet',
    description: 'A masterpiece of minimalism. Handcrafted from top-grade full grain cowhide leather that builds a beautiful warm patina over years. Integrated with advanced RFID aluminum protective blockers so your critical credit card signals remain untampered.',
    price: 39.50,
    originalPrice: 55.00,
    rating: { rate: 4.7, count: 540 },
    image: 'https://images.unsplash.com/photo-1627124765135-56af27525f82?w=700&auto=format&fit=crop&q=80',
    category: 'Apparel & Fashion',
    stock: 30,
    variants: {
      type: 'Color',
      options: ['Oak Tan', 'Chestnut Brown', 'Carbon Black']
    },
    specifications: [
      { key: 'Material', value: '100% Genuine Full-Grain Cowhide Leather' },
      { key: 'Card Slots', value: '8 Card Pockets, 2 Hidden Slots, Single Cash divider' },
      { key: 'RFID Protection', value: 'Integrated secure block 13.56 MHz signals' },
      { key: 'Dimensions', value: '4.3" x 3.2" x 0.4" empty' }
    ],
    reviews: [
      {
        id: 'rev-9-1',
        author: 'Walter W.',
        rating: 5,
        date: 'May 28, 2026',
        title: 'Authentic smell, superb quality',
        comment: 'Beautiful smelling genuine leather. Extremely sleek, fits nicely in a front pocket without bulging out. stitching is clean and flawless.',
        verified: true
      }
    ]
  }
];
