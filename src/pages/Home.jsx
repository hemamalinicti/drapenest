import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StyleQuiz } from '../components/StyleQuiz';
import { Hero3DScene } from '../components/Hero3DScene';
import {
  Sparkles,
  ChevronRight,
  Sliders,
  Layers,
  CheckCircle2,
  Star,
  Play,
  ArrowRight,
  Phone,
  MessageCircle,
  Quote,
  ThumbsUp,
  MapPin,
  Building
} from 'lucide-react';
import { galleryVideos } from '../data/galleryData';

export const Home = () => {
  const { navigateTo, products, setSelectedProductModal, openBookingModalWithProduct } = useApp();
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Popular products slice
  const popularProducts = products.filter(p => p.isPopular).slice(0, 4);

  const heroCategories = [
    {
      title: 'Double Sheer & Blackout Drapes',
      desc: 'Floor-to-ceiling privacy & thermal control',
      img: '/images/uploaded/sheer_blackout_balcony.png',
      category: 'curtains'
    },
    {
      title: 'Tailored Linen Curtains',
      desc: 'Elegantly tied custom window drapes',
      img: '/images/uploaded/tied_linen_drapes.png',
      category: 'curtains'
    },
    {
      title: 'Window Mosquito Netting',
      desc: '100% insect defense with high airflow',
      img: '/images/uploaded/mosquito_net_twin.png',
      category: 'mosquito-nets'
    },
    {
      title: 'Timber Louver Shutters',
      desc: 'Natural wood grain tilt & shade control',
      img: '/images/uploaded/wooden_shutter_canopy.png',
      category: 'blinds'
    }
  ];

  // Customer Reviews Data
  const customerReviews = [
    {
      id: 1,
      name: 'Anand Shankar',
      location: 'RS Puram, Coimbatore',
      rating: 5,
      
      product: 'Motorized Smart Roller Blinds',
      comment: 'Fitted motorized roller blinds for our living room. The DrapeNest installation team brought over 100+ swatches, measured with digital lasers, and completed the fit in just 3 days! Outstanding quality and silent motor.'
    },
    {
      id: 2,
      name: 'Priya Karthik',
      location: 'Peelamedu, Coimbatore',
      rating: 5,
      
      product: 'Pleated Sliding Mosquito Net',
      comment: 'Extremely satisfied with the pleated sliding mosquito net for our balcony sliding door. Smooth accordion fold, zero bugs, and no bottom tripping threshold. Highly recommended!'
    },
    {
      id: 3,
      name: 'Dr. Rajesh V.',
      location: 'Race Course, Coimbatore',
      rating: 5,
      product: 'Luxe Sheer Linen & Blackout Drapes',
      comment: 'The floor-to-ceiling sheer linen & blackout drapes completely transformed our master suite. Excellent thermal insulation and the 3-year hardware warranty gives great confidence.'
    },
    {
      id: 4,
      name: 'Kavitha Subramaniam',
      location: 'Saibaba Colony, Coimbatore',
      rating: 5,
      
      product: 'Dual Shade Zebra Blinds',
      comment: 'DrapeNest fitted custom dual shade zebra blinds for all 6 windows in our home. Perfect light filtering during daytime, durable cassette headers, and great value pricing!'
    }
  ];

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. INTERACTIVE 3D HERO SCENE */}
      <Hero3DScene heroCategories={heroCategories} />

      {/* 3. POPULAR PRODUCTS CATALOG PREVIEW */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#9AAB89] uppercase tracking-wider mb-1">
              Top Customer Choices
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E2C38]">
              Featured Blinds & Curtain Systems
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs font-bold text-[#3A5E7A] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Complete Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {popularProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-36 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-[#3A5E7A] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
                    {prod.subCategory}
                  </span>
                </div>

                <div className="p-3 sm:p-5">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-500 font-bold mb-1">
                    <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-amber-400" />
                    <span>{prod.rating} ({prod.reviewsCount})</span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-base text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-700 font-medium line-clamp-2 mt-1 mb-2 sm:mb-3">
                    {prod.description}
                  </p>
                  <div className="text-sm sm:text-lg font-black text-[#3A5E7A]">
                    ₹{prod.pricePerSqFt}{' '}
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600">per {prod.unit}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-5 pt-0">
                <button
                  onClick={() => setSelectedProductModal(prod)}
                  className="w-full bg-[#E9EEF3] hover:bg-[#3A5E7A] text-[#1E2C38] hover:text-white font-bold py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs transition-colors flex items-center justify-center gap-1 sm:gap-1.5"
                >
                  <span className="truncate">View Details & Estimate</span>
                  <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE WINDOW STYLE FINDER QUIZ */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <StyleQuiz />
      </section>

      {/* 5. VIDEO SHOWCASE DEMO PREVIEW */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="bg-[#1C2B38] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#9AAB89]/20 text-[#9AAB89] font-bold text-xs px-3 py-1 rounded-full">
                <Play className="w-3.5 h-3.5 fill-[#9AAB89]" />
                <span>Video Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                See Smart Motorized Blinds & Pleated Nets in Action
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Watch how smooth and silent our motorized tubular blinds and space-saving accordion pleated mosquito nets operate.
              </p>
              <button
                onClick={() => navigateTo('gallery')}
                className="bg-[#9AAB89] hover:bg-[#839373] text-[#1C2B38] font-bold text-xs px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <span>Watch Full Gallery Videos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {galleryVideos.slice(0, 2).map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideoModal(vid)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video cursor-pointer"
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#9AAB89] text-[#1C2B38] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-[#1C2B38] ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs p-2 rounded-lg text-xs font-bold truncate">
                    {vid.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS & TESTIMONIALS SECTION */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-b from-[#E9EEF3] to-[#F6F8FA] rounded-3xl p-8 sm:p-12 border border-[#D6E0EA] space-y-10">
          
          {/* Header Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#D6E0EA] pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#3A5E7A]/10 text-[#3A5E7A] font-extrabold text-xs px-3.5 py-1 rounded-full">
                <ThumbsUp className="w-3.5 h-3.5 text-[#839373]" />
                <span>Verified Customer Testimonials</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E2C38]">
                What Our Customers Say
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold max-w-xl">
                Read real reviews from homeowners and corporate clients across Coimbatore.
              </p>
            </div>

            {/* Google Rating Badge */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-3xl font-black text-[#1E2C38]">4.9</div>
                <div className="flex text-amber-400 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="border-l border-slate-200 pl-4 text-xs">
                <div className="font-extrabold text-[#3A5E7A]">Google Verified Store</div>
                <div className="text-slate-800 font-bold">Based on 480+ Reviews</div>
                <div className="text-[11px] text-[#839373] font-bold mt-0.5">100% Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Reviews Cards Grid - 1 Row 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerReviews.map((rev) => {
              // Compute customer initials
              const initials = rev.name.split(' ').map(n => n[0]).join('').substring(0, 2);
              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group hover:border-[#8299B2]"
                >
                  <div className="space-y-4">
                    {/* User Header with Avatar & Rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#3A5E7A] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm text-[#1E2C38] truncate">{rev.name}</h3>
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Verified Buyer</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating & Date */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">{rev.date}</span>
                    </div>

                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#3A5E7A] shrink-0" />
                      <span className="truncate">{rev.location}</span>
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed italic bg-[#E9EEF3]/60 p-3.5 rounded-xl border border-[#D6E0EA]">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Installed Product Tag */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider font-black text-slate-600">
                      Product Installed
                    </span>
                    <span className="font-black text-xs text-[#1E2C38] bg-[#E9EEF3] border border-[#8299B2]/60 px-2.5 py-1.5 rounded-lg truncate">
                      {rev.product}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Review CTA */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div>
              <h4 className="font-black text-base sm:text-lg text-[#1E2C38]">Ready to Upgrade Your Windows?</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold">Book a free doorstep sample visit and experience our 5-star service.</p>
            </div>
            <button
              onClick={() => openBookingModalWithProduct('Home Reviews Consultation')}
              className="bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Book Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* VIDEO LIGHTBOX MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-3xl w-full p-4 relative text-white">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-2 right-2 p-2 text-white/80 hover:text-white"
            >
              ✕
            </button>
            <h3 className="font-bold text-sm mb-3">{activeVideoModal.title}</h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={activeVideoModal.videoUrl}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
