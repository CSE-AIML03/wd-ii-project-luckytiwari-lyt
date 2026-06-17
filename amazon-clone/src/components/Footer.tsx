import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#232f3e] text-white text-xs select-none font-sans">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#374151] hover:bg-[#4b5563] py-4 text-center font-bold tracking-wide transition cursor-pointer text-stone-100 flex items-center justify-center gap-1.5 border-b border-white/5"
        id="footer-back-to-top"
      >
        <ArrowUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>

      {/* Directory links */}
      <div className="max-w-7xl mx-auto px-4 py-11 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-5 border-b border-stone-700">
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-stone-100">Get to Know Us</h4>
          <ul className="space-y-2 text-stone-300">
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">About Amazon Clone</li>
            <li className="hover:underline cursor-pointer">Investor Relations</li>
            <li className="hover:underline cursor-pointer">Amazon Devices</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-stone-100">Make Money with Us</h4>
          <ul className="space-y-2 text-stone-300">
            <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
            <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
            <li className="hover:underline cursor-pointer">Sell apps on Amazon</li>
            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-stone-100">Amazon Payment Products</h4>
          <ul className="space-y-2 text-stone-300">
            <li className="hover:underline cursor-pointer">Amazon Rewards Visa Signature</li>
            <li className="hover:underline cursor-pointer">Amazon.com Store Card</li>
            <li className="hover:underline cursor-pointer">Amazon Business Card</li>
            <li className="hover:underline cursor-pointer">Shop with Points</li>
            <li className="hover:underline cursor-pointer">Reload Your Balance</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-stone-100">Let Us Help You</h4>
          <ul className="space-y-2 text-stone-300">
            <li className="hover:underline cursor-pointer">Amazon and COVID-19</li>
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Your Orders</li>
            <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
            <li className="hover:underline cursor-pointer font-bold text-[#febd69]">Live Support Center</li>
          </ul>
        </div>
      </div>

      {/* Language, currency selector */}
      <div className="bg-[#131921] py-8 px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        {/* Fake logo */}
        <div className="flex items-baseline gap-0.5 text-lg font-black tracking-tight text-white mr-0 sm:mr-4 select-none">
          <span>amazon</span>
          <span className="text-[#febd69] font-normal text-[10px] uppercase tracking-wider bg-[#232f3e] px-1 py-0.5 rounded">clone</span>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-1.5 border border-stone-500 rounded px-3 py-1.5 hover:border-white transition cursor-pointer text-stone-300 text-xs">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>English</span>
          </div>
          <div className="flex items-center gap-1.5 border border-stone-500 rounded px-3 py-1.5 hover:border-white transition cursor-pointer text-stone-300 text-xs">
            <span>$ USD - U.S. Dollar</span>
          </div>
          <div className="flex items-center gap-1.5 border border-stone-500 rounded px-3 py-1.5 hover:border-white transition cursor-pointer text-stone-300 text-xs">
            <span>🇺🇸 United States</span>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="bg-[#0f1111] py-6 px-4 text-center text-stone-500 text-[10px] space-y-1">
        <p className="flex justify-center flex-wrap gap-x-3 gap-y-1">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer font-semibold">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</span>
          <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
        </p>
        <p className="pt-1.5">
          &copy; 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its simulated affiliate entities. Made for educational demonstration only.
        </p>
      </div>
    </footer>
  );
}
