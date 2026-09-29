import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  User,
  Sliders,
  ChevronRight,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { activePage, navigateTo, isAdminLoggedIn, openBookingModalWithProduct } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products Catalog' },
    { id: 'services', label: 'Fitting & Services' },
    { id: 'gallery', label: 'Gallery & Videos' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Main Navigation Header - Soft Slate Glassmorphism */}
      <nav className="bg-[#F6F8FA]/95 backdrop-blur-md border-b border-[#D6E0EA] px-4 sm:px-8 py-3.5">
        <div className="max-w-[1560px] mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <img
              src="/images/drapenest_logo.svg"
              alt="DrapeNest Logo"
              className="w-10 h-10 rounded-xl shadow-md group-hover:scale-105 transition-transform object-cover"
            />
            <div>
              <div className="font-extrabold text-xl tracking-tight text-[#1E2C38] leading-none">
                Drape<span className="text-[#3A5E7A]">Nest</span>
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-[#9AAB89] uppercase mt-0.5">
                Curtains & Net Fitting | Sungam, Coimbatore
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activePage === item.id
                    ? 'bg-[#3A5E7A] text-white shadow-xs'
                    : 'text-[#1E2C38] hover:text-[#3A5E7A] hover:bg-[#E9EEF3]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => openBookingModalWithProduct()}
              className="bg-gradient-to-r from-[#9AAB89] to-[#839373] hover:from-[#8BA178] hover:to-[#738363] text-white font-bold text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 active:scale-98"
            >
              <span>Book Free Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#1E2C38] hover:bg-[#E9EEF3] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#3A5E7A]" /> : <Menu className="w-6 h-6 text-[#1E2C38]" />}
          </button>
        </div>

        {/* Mobile Slide-Over Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#D6E0EA] animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-between ${
                    activePage === item.id
                      ? 'bg-[#3A5E7A] text-white'
                      : 'text-[#1E2C38] hover:bg-[#E9EEF3]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    openBookingModalWithProduct();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#3A5E7A] text-white font-bold py-3 rounded-lg text-sm text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book Free Doorstep Visit</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
