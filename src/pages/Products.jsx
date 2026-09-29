import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { productCategories } from '../data/productsData';
import {
  Search,
  Sliders,
  Sparkles,
  Star,
  ChevronRight,
  Filter,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const Products = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedProductModal,
    openBookingModalWithProduct
  } = useApp();

  const [sortBy, setSortBy] = useState('popular');

  // Filter products by category & search query
  let filtered = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.pricePerSqFt - b.pricePerSqFt);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.pricePerSqFt - a.pricePerSqFt);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      {/* 1. HERO SECTION BANNER WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[260px] sm:min-h-[300px] flex items-center justify-center py-14 px-4 sm:px-8 border-b border-[#D3DCE6] overflow-hidden bg-slate-950 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-95 filter brightness-[1.08] contrast-[1.05]"
          style={{ backgroundImage: "url('/images/uploaded/sheer_blackout_balcony.png')" }}
        ></div>

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/55"></div>

        {/* Hero Banner Text & Search */}
        <div className="relative z-10 max-w-[1560px] mx-auto text-center space-y-4 w-full">
          <div className="inline-flex items-center gap-2 bg-[#1E2C38]/90 backdrop-blur-md border border-[#8299B2]/50 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl">
            <Sliders className="w-4 h-4 text-amber-300" />
            <span>Product Module | DrapeNest Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Explore Our Window <span className="text-amber-300">Collection</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Browse our full range of Roman blinds, roller blinds, zebra shades, luxury curtain drapes, pleated mosquito nets, and motorized tracks.
          </p>

          {/* Search & Sort Bar */}
          <div className="max-w-3xl mx-auto pt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search blinds, curtains, mosquito nets, fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A] shadow-lg"
              />
            </div>
            <div className="sm:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A] shadow-lg"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-200">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#3A5E7A] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-[#E9EEF3] border border-slate-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs text-slate-500 font-semibold">
          <span>Showing {filtered.length} products</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#3A5E7A] hover:underline"
            >
              Clear Search Query
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try searching with a different term or select another category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-[#3A5E7A] text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#8299B2]"
              >
                <div>
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-100">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                      <span className="bg-[#3A5E7A] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {prod.subCategory}
                      </span>
                      {prod.isPopular && (
                        <span className="bg-[#9AAB89] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-5">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-500 font-bold">
                        <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-amber-400" />
                        <span>{prod.rating} ({prod.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors leading-tight mb-1.5 line-clamp-1">
                      {prod.name}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed mb-3">
                      {prod.description}
                    </p>

                    <div className="text-lg sm:text-xl font-black text-[#3A5E7A] mb-3">
                      ₹{prod.pricePerSqFt}{' '}
                      <span className="text-[10px] sm:text-xs font-bold text-slate-600">per {prod.unit}</span>
                    </div>

                    {/* Features checklist snippet */}
                    {prod.features && (
                      <div className="space-y-1 mb-3 border-t border-slate-100 pt-2 hidden sm:block">
                        {prod.features.slice(0, 2).map((feat, fidx) => (
                          <div key={fidx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#839373] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 pt-0 space-y-2">
                  <button
                    onClick={() => setSelectedProductModal(prod)}
                    className="w-full bg-[#E9EEF3] hover:bg-[#3A5E7A] text-[#1E2C38] hover:text-white font-bold py-2.5 px-3 rounded-xl text-[11px] sm:text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openBookingModalWithProduct(prod.name)}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-2 px-3 rounded-xl text-[11px] sm:text-xs transition-colors truncate"
                  >
                    Free Sample Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
