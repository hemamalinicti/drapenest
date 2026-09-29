import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronRight, ArrowRight, Sun, Moon, Rotate3d, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero3DScene = ({ heroCategories = [] }) => {
  const { openBookingModalWithProduct, navigateTo } = useApp();

  // Mouse tilt position state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isNightMode, setIsNightMode] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Mouse Move Parallax 3D Tracker
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Canvas 3D Particle & Wave Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth || 800;
      canvas.height = canvas.offsetHeight || 600;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles for 3D depth effect
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      z: Math.random() * 5 + 1,
      radius: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      if (!ctx || !canvas) return;
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3D Sine Wave Silk Curtain Lines in Background
      ctx.lineWidth = 1.5;
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const color = isNightMode ? `rgba(130, 153, 178, ${0.12 - i * 0.02})` : `rgba(58, 94, 122, ${0.15 - i * 0.025})`;
        ctx.strokeStyle = color;

        for (let x = 0; x < canvas.width; x += 15) {
          const y =
            canvas.height * 0.4 +
            Math.sin(x * 0.005 + time + i * 0.8) * 45 +
            Math.cos(x * 0.003 + time * 0.5) * 25 +
            i * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw 3D Depth Floating Particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x + Math.sin(time + p.z) * 10, p.y, p.radius * (p.z / 2), 0, Math.PI * 2);
        ctx.fillStyle = isNightMode ? `rgba(255, 255, 255, ${0.15 * p.z})` : `rgba(154, 171, 137, ${0.25 * p.z})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isNightMode]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[620px] sm:min-h-[680px] flex items-center py-16 px-4 sm:px-8 overflow-hidden bg-slate-950 border-b border-[#D6E0EA] perspective-1000"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Render Background Image with Dynamic 3D Matrix Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out scale-110"
        style={{
          backgroundImage: "url('/images/hero_3d_hall.jpg')",
          transform: `scale(1.1) rotateX(${tilt.y * 0.4}deg) rotateY(${tilt.x * 0.4}deg) translateZ(-20px)`,
          filter: isNightMode ? 'brightness(0.65) contrast(1.1)' : 'brightness(1.02) contrast(1.02)'
        }}
      ></div>

      {/* WebGL / Canvas 3D Wave Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-1" />

      {/* Lighting & Glassmorphism Gradient Overlays */}
      <div
        className={`absolute inset-0 transition-colors duration-700 z-2 ${
          isNightMode
            ? 'bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/30'
            : 'bg-gradient-to-r from-slate-950/35 via-slate-950/15 to-transparent'
        }`}
      ></div>

      {/* 3D VIEW CONTROL BAR */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-white/20 text-xs text-white shadow-xl">
        <button
          onClick={() => setIsNightMode(!isNightMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all ${
            isNightMode ? 'bg-[#3A5E7A] text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
          }`}
        >
          {isNightMode ? <Moon className="w-3.5 h-3.5 text-amber-300" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isNightMode ? 'Night Lighting' : 'Day Sunlight'}</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-slate-300 font-semibold">
          <Rotate3d className="w-3.5 h-3.5 text-[#9AAB89] animate-spin-slow" />
          <span>Interactive 3D Depth</span>
        </div>
      </div>

      {/* Main Content Container with 3D Spatial Transform */}
      <div
        className="relative z-10 max-w-[1560px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Left Column Text */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left p-2 sm:p-4 rounded-3xl" style={{ transform: 'translateZ(40px)' }}>
          <div className="inline-flex items-center gap-2 bg-[#3A5E7A] border border-white/30 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Coimbatore's #1 Interactive 3D Window View</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.15] tracking-tight drop-shadow-lg">
            Interactive <span className="text-amber-300 underline decoration-[#9AAB89] decoration-4 underline-offset-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">3D Living Hall</span> Curtains & Blinds
          </h1>

          <p className="text-base text-slate-100 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0 drop-shadow-md">
            Move your cursor over the 3D room to explore real-time depth lighting and architectural sheer drapes, motorized blinds, and pleated mosquito screen fittings.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => openBookingModalWithProduct('3D Hero Consultation')}
              className="w-full sm:w-auto bg-[#3A5E7A] hover:bg-[#2B475E] text-white font-extrabold text-sm px-7 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 border border-white/20"
            >
              <span>Book Free Doorstep Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('products')}
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-extrabold text-sm px-6 py-4 rounded-xl border border-white/40 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Explore 100+ Designs</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Trust Points */}
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/25 text-center lg:text-left text-xs text-white">
            <div>
              <div className="font-black text-2xl text-amber-300 drop-shadow-md">10,000+</div>
              <div className="text-slate-100 font-bold">Installations</div>
            </div>
            <div>
              <div className="font-black text-2xl text-amber-300 drop-shadow-md">3-Year</div>
              <div className="text-slate-100 font-bold">Full Warranty</div>
            </div>
            <div>
              <div className="font-black text-2xl text-amber-300 drop-shadow-md">4.9 ★★★★★</div>
              <div className="text-slate-100 font-bold">Google Rating</div>
            </div>
          </div>
        </div>

        {/* Right Cards Grid with 3D Pop-Out Layering */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4" style={{ transform: 'translateZ(60px)' }}>
          {heroCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo('products', cat.category)}
              className="group relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/70 backdrop-blur-md cursor-pointer h-48 sm:h-56 transition-all hover:border-[#8299B2] hover:scale-105"
              style={{
                transform: `translateZ(${20 + idx * 10}px)`
              }}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#9AAB89] mb-0.5">
                  {cat.category}
                </span>
                <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-[#8299B2] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
