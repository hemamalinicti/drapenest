import React, { useState } from 'react';
import { galleryImages, galleryVideos } from '../data/galleryData';
import { Camera, Play, X, MapPin, Layers, Sparkles } from 'lucide-react';

export const Gallery = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeImageModal, setActiveImageModal] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const filterTags = ['All', 'Living Room', 'Bedroom', 'Office', 'Mosquito Netting'];

  const filteredImages = selectedTag === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedTag);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* 1. HERO SECTION BANNER WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[260px] sm:min-h-[300px] flex items-center justify-center py-14 px-4 sm:px-8 border-b border-[#D3DCE6] overflow-hidden bg-slate-950 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-95 filter brightness-[1.08] contrast-[1.05]"
          style={{ backgroundImage: "url('/images/uploaded/tied_linen_drapes.png')" }}
        ></div>

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/55"></div>

        {/* Hero Banner Text */}
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1E2C38]/90 backdrop-blur-md border border-[#8299B2]/50 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl">
            <Camera className="w-4 h-4 text-amber-300" />
            <span>Gallery Module | Installed Projects Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Installation Gallery & <span className="text-amber-300">Video Demos</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Explore recent completed projects in homes, luxury villas, and corporate offices across Coimbatore.
          </p>

          {/* Tags Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTag === tag
                    ? 'bg-[#3A5E7A] text-white shadow-md'
                    : 'bg-white/90 backdrop-blur-md text-slate-800 hover:bg-white border border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Photo Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImageModal(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs hover:shadow-lg cursor-pointer h-64 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-[#8299B2] mb-0.5">
                  {item.type}
                </span>
                <h3 className="font-bold text-sm leading-snug group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8299B2]" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Video Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-[#3A5E7A] uppercase tracking-wider mb-1">Live Operation</div>
            <h2 className="text-2xl font-black text-[#1E2C38]">Video Demonstration Showcase</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideoModal(vid)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative aspect-video bg-slate-900">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#3A5E7A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {vid.duration}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors leading-snug">
                  {vid.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{vid.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO LIGHTBOX MODAL */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-[60vh] bg-slate-900">
              <img
                src={activeImageModal.image}
                alt={activeImageModal.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-[#3A5E7A] uppercase">{activeImageModal.type}</span>
                <h3 className="font-bold text-lg text-[#1E2C38]">{activeImageModal.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeImageModal.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-3xl w-full p-4 relative text-white shadow-2xl">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-bold text-sm mb-3 pr-8">{activeVideoModal.title}</h3>
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
