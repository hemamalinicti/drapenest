import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  RotateCw,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  X,
  ChevronRight,
  ShieldCheck,
  Eye,
  Sliders,
  Sun,
  MapPin,
  Move
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VirtualShowroom360 = () => {
  const { setSelectedProductModal, openBookingModalWithProduct, products } = useApp();

  // 360 View State
  const [activeRoom, setActiveRoom] = useState('living'); // 'living' | 'bedroom' | 'balcony'
  const [rotationX, setRotationX] = useState(0); // 0 to 100% (horizontal loop)
  const [rotationY, setRotationY] = useState(0); // -15 to +15 deg (vertical tilt)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const containerRef = useRef(null);

  // 360 Room Scenarios
  const roomData = {
    living: {
      name: 'Modern Living Hall & Balcony (360°)',
      image: '/images/room_360_panorama.jpg',
      desc: 'Floor-to-ceiling sheer linen, motorized blackout drapes & balcony glass doors',
      hotspots: [
        {
          id: 'h1',
          name: 'Double Layer Sheer & Blackout Drapes',
          productId: 'c1',
          posX: 18, // percentage X in panorama
          posY: 42, // percentage Y
          price: '₹130 / sq.ft',
          desc: 'Triple-weave thermal blackout drapes with sheer wave inner layer.'
        },
        {
          id: 'h2',
          name: 'Motorized Smart Roller Blinds',
          productId: 'b1',
          posX: 52,
          posY: 28,
          price: '₹145 / sq.ft',
          desc: 'Silent tubular motor with Alexa & Wi-Fi smartphone automation.'
        },
        {
          id: 'h3',
          name: 'Pleated Sliding Mosquito Net Door',
          productId: 'm1',
          posX: 76,
          posY: 55,
          price: '₹180 / sq.ft',
          desc: 'Collapsible accordion fold mesh system for zero bottom trip hazard.'
        }
      ]
    },
    bedroom: {
      name: 'Luxury Master Bedroom Suite (360°)',
      image: '/images/uploaded/bedroom_drapes_canopy.png',
      desc: 'Canopy mosquito netting, heavy blackout curtains & wooden accents',
      hotspots: [
        {
          id: 'h4',
          name: 'Canopy Mosquito Net & Drapes',
          productId: 'c3',
          posX: 40,
          posY: 35,
          price: '₹180 / sq.ft',
          desc: 'Custom canopy frame with micro-mesh netting & heavy drape liners.'
        },
        {
          id: 'h5',
          name: 'Tailored Tied Linen Curtains',
          productId: 'c2',
          posX: 70,
          posY: 45,
          price: '₹130 / sq.ft',
          desc: 'Pinch pleated woven linen with matching fabric tiebacks.'
        }
      ]
    },
    balcony: {
      name: 'Patio & Balcony Door Openings (360°)',
      image: '/images/uploaded/sheer_blackout_balcony.png',
      desc: 'Wide span sheer drapes opening to garden terrace',
      hotspots: [
        {
          id: 'h6',
          name: 'Luxe Sheer Linen Drapes',
          productId: 'c1',
          posX: 48,
          posY: 50,
          price: '₹95 / sq.ft',
          desc: 'Translucent linen-cotton sheer with weighted bottom hem.'
        }
      ]
    }
  };

  const currentRoom = roomData[activeRoom];

  // Auto-Spin 360 animation
  useEffect(() => {
    let interval;
    if (isAutoSpin && !isDragging) {
      interval = setInterval(() => {
        setRotationX((prev) => (prev + 0.15) % 100);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isAutoSpin, isDragging]);

  // Drag handlers for mouse & touch
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    setStartY(e.clientY || (e.touches && e.touches[0].clientY) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    // Convert delta to percentage rotation
    setRotationX((prev) => (prev - deltaX * 0.15 + 100) % 100);
    setRotationY((prev) => Math.max(-15, Math.min(15, prev + deltaY * 0.1)));

    setStartX(currentX);
    setStartY(currentY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate position of hotspots as panorama rotates
  const getCalculatedHotspotPos = (baseX, baseY) => {
    // Offset baseX by rotationX
    let adjustedX = (baseX - rotationX * 3.6 + 360) % 360;
    // Map 0..360 to percentage on visible canvas (0..100)
    let visibleX = (adjustedX / 360) * 100;
    let adjustedY = Math.max(10, Math.min(90, baseY + rotationY));
    return { x: visibleX, y: adjustedY };
  };

  const currentProduct = activeHotspot
    ? products.find((p) => p.id === activeHotspot.productId) || products[0]
    : null;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-[#D6E0EA] bg-slate-950 text-white shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'max-w-7xl mx-auto'
      }`}
    >
      {/* Top Header Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#3A5E7A] text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <Compass className="w-5 h-5 text-[#9AAB89] animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9AAB89] bg-[#9AAB89]/20 px-2.5 py-0.5 rounded-full">
                Interactive 360° Virtual Tour
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white">{currentRoom.name}</h2>
          </div>
        </div>

        {/* Room Switcher Tabs & Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-white/20 flex gap-1 text-xs">
            {Object.keys(roomData).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveRoom(key);
                  setRotationX(0);
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all uppercase text-[11px] ${
                  activeRoom === key
                    ? 'bg-[#3A5E7A] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {key} 360°
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md ${
              isAutoSpin
                ? 'bg-[#3A5E7A] text-white border-[#8299B2]'
                : 'bg-slate-900/80 text-slate-300 border-white/20 hover:bg-white/10'
            }`}
            title="Toggle 360° Auto Rotation"
          >
            <RotateCw className={`w-4 h-4 ${isAutoSpin ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isAutoSpin ? 'Auto-Spin On' : 'Auto-Spin Off'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-900/80 text-white border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md"
            title="Toggle Fullscreen 360°"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 360° Interactive Canvas Viewer Window */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none ${
          isFullscreen ? 'h-screen' : 'h-[480px] sm:h-[560px]'
        }`}
      >
        {/* Panorama Background Image with Seamless Loop */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-75"
          style={{
            backgroundImage: `url('${currentRoom.image}')`,
            backgroundPositionX: `${rotationX}%`,
            backgroundPositionY: `${50 + rotationY}%`,
            backgroundRepeat: 'repeat-x',
            transform: 'scale(1.08)'
          }}
        ></div>

        {/* Subtle Vignette & Depth Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60 pointer-events-none"></div>

        {/* Drag Guidance Toast Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-slate-200 flex items-center gap-2 shadow-lg animate-bounce">
          <Move className="w-4 h-4 text-[#9AAB89]" />
          <span>Click & Drag or Swipe to Rotate 360°</span>
        </div>

        {/* 360° INTERACTIVE HOTSPOTS */}
        {currentRoom.hotspots.map((hs) => {
          const pos = getCalculatedHotspotPos(hs.posX, hs.posY);

          return (
            <div
              key={hs.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(hs);
              }}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`
              }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              {/* Pulsing Target Pin */}
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#3A5E7A]/80 border-2 border-white shadow-xl flex items-center justify-center group-hover:scale-125 transition-transform">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-full bg-[#3A5E7A]/40 animate-ping pointer-events-none"></div>
              </div>

              {/* Hotspot Label Tooltip */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/20 group-hover:scale-105 transition-transform flex items-center gap-1.5">
                <span>{hs.name}</span>
                <span className="text-[#9AAB89]">{hs.price}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE HOTSPOT PRODUCT SPEC MODAL */}
      {activeHotspot && currentProduct && (
        <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md rounded-2xl p-5 border border-[#8299B2]/40 shadow-2xl animate-fade-in text-white">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9AAB89] bg-[#9AAB89]/20 px-2 py-0.5 rounded-md">
                360° Hotspot Inspection
              </span>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-extrabold text-base mb-1">{activeHotspot.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">{activeHotspot.desc}</p>

          <div className="text-xl font-black text-[#8299B2] mb-4">
            {activeHotspot.price}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveHotspot(null);
                setSelectedProductModal(currentProduct);
              }}
              className="w-1/2 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors border border-white/20"
            >
              View Specs & Calc
            </button>
            <button
              onClick={() => {
                setActiveHotspot(null);
                openBookingModalWithProduct(`360 Tour Match: ${activeHotspot.name}`);
              }}
              className="w-1/2 bg-[#3A5E7A] hover:bg-[#2B475E] text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1"
            >
              <span>Book Doorstep Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
