import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { processSteps } from '../data/servicesData';
import {
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  Users,
  Ruler,
  Sparkles,
  ChevronRight,
  Clock,
  MapPin,
  Building,
  CalendarCheck,
  Scissors,
  Wrench,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const stepIcons = [CalendarCheck, Ruler, Scissors, ShieldCheck];
const stepBadges = ['Step 1: Doorstep Consultation', 'Step 2: Optical Laser Measure', 'Step 3: Factory Tailoring', 'Step 4: Clean Wall Fit'];
const stepHighlights = [
  ['Over 100+ swatch fabric catalogs brought to your door', 'Flexible morning or evening appointment slots', 'Zero obligation free estimate'],
  ['Digital laser measuring for 0mm margin gaps', 'Expert consultation on light filtering & privacy', 'Custom header & track advice'],
  ['Precision stitching with reinforced double hems', 'High-durability powder coated aluminium channels', 'Strict quality control checks'],
  ['Dust-free vacuum drilling wall mounting', 'Motorized track pairing & smart app demo', 'Official 3-Year Hardware Warranty Certificate issued']
];

const ProcessTimeline = ({ steps, onBook }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-cycle steps every 4 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const currentStep = steps[activeIdx];
  const IconComponent = stepIcons[activeIdx] || Sparkles;

  return (
    <div className="space-y-10">
      {/* Interactive Progress Line Header Bar */}
      <div className="relative max-w-4xl mx-auto">
        {/* Background track line */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0"></div>

        {/* Animated fill progress bar */}
        <div
          className="hidden md:block absolute top-1/2 left-8 h-1 bg-gradient-to-r from-[#3A5E7A] to-[#839373] -translate-y-1/2 rounded-full z-0 transition-all duration-700 ease-in-out"
          style={{ width: `${(activeIdx / (steps.length - 1)) * 82}%` }}
        ></div>

        {/* 4 Interactive Step Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Sparkles;
            const isActive = activeIdx === idx;
            const isCompleted = idx < activeIdx;

            return (
              <button
                key={step.step}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer relative ${
                  isActive
                    ? 'bg-white border-2 border-[#3A5E7A] shadow-xl scale-105 ring-4 ring-[#3A5E7A]/10'
                    : isCompleted
                    ? 'bg-white border border-[#839373]/40 shadow-xs hover:border-[#3A5E7A]'
                    : 'bg-white/80 border border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Active Indicator Pulse Ring */}
                {isActive && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A5E7A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#3A5E7A]"></span>
                  </span>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-transform duration-300 ${
                      isActive
                        ? 'bg-[#3A5E7A] text-white scale-110 shadow-md'
                        : isCompleted
                        ? 'bg-[#839373] text-white'
                        : 'bg-[#E9EEF3] text-slate-600 group-hover:bg-[#3A5E7A]/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : ''}`} />
                  </div>
                  <span
                    className={`font-black text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#3A5E7A]/10 text-[#3A5E7A]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {step.step}
                  </span>
                </div>

                <div>
                  <h4 className={`font-extrabold text-xs sm:text-sm leading-snug ${isActive ? 'text-[#3A5E7A]' : 'text-[#1E2C38]'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {stepBadges[idx]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control playback & autoplay toggle bar */}
      <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs hover:border-[#3A5E7A] font-semibold text-slate-700 transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
          <span>{isPlaying ? 'Pause Animation' : 'Auto Play Animation'}</span>
        </button>

        <div className="text-[11px] font-medium text-slate-400">
          Showing Step {activeIdx + 1} of {steps.length}
        </div>
      </div>

      {/* Active Step Spotlight Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden transition-all duration-500">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#3A5E7A]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Detailed Step Summary */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#E9EEF3] text-[#3A5E7A] font-extrabold text-xs px-3.5 py-1.5 rounded-full">
              <IconComponent className="w-4 h-4 text-[#839373]" />
              <span>{stepBadges[activeIdx]}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#1E2C38]">
              {currentStep.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {currentStep.description}
            </p>

            {/* Checklist of deliverables for active step */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
                What happens during this step:
              </span>
              {stepHighlights[activeIdx]?.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#839373] shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={onBook}
                className="bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Book This Step Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveIdx((prev) => (prev + 1) % steps.length)}
                className="bg-[#E9EEF3] hover:bg-slate-200 text-[#1E2C38] font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Graphic Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1C2B38] to-[#2C4052] rounded-2xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-[#8299B2] uppercase tracking-wider">
                Stage {activeIdx + 1} Execution
              </span>
              <span className="bg-[#9AAB89] text-[#1C2B38] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                Guaranteed Quality
              </span>
            </div>

            <div className="flex items-center gap-4 py-3">
              <div className="w-16 h-16 rounded-2xl bg-[#3A5E7A] text-white flex items-center justify-center shadow-lg shrink-0">
                <IconComponent className="w-8 h-8 text-[#9AAB89] animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">{currentStep.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5">Executed by DrapeNest Certified Fitters</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3 text-[11px] text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#9AAB89] shrink-0" />
              <span>Backed by 3-Year Extended Hardware & Fitting Warranty</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { openBookingModalWithProduct } = useApp();

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. HERO SECTION BANNER WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[240px] sm:min-h-[280px] flex items-center justify-center py-14 px-4 sm:px-8 border-b border-[#D3DCE6] overflow-hidden bg-slate-950 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-95 filter brightness-[1.08] contrast-[1.05]"
          style={{ backgroundImage: "url('/images/uploaded/bedroom_drapes_canopy.png')" }}
        ></div>

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/55"></div>

        {/* Hero Banner Text */}
        <div className="relative z-10 max-w-[1560px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1E2C38]/90 backdrop-blur-md border border-[#8299B2]/50 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Coimbatore's Window Treatment Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            About Drape<span className="text-amber-300">Nest</span> Curtains & Blinds
          </h1>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Crafting elegant, functional, and automated window solutions for homes, offices, and commercial establishments across Coimbatore.
          </p>
        </div>
      </section>

      {/* 2. Brand Story & Documentation Context */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-black text-[#3A5E7A] uppercase tracking-wider">
              Our Legacy & Engineering
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] leading-tight">
              Bespoke Window Craftsmanship Meets Modern Automation
            </h2>
            <p className="text-sm sm:text-base text-[#1E293B] font-semibold leading-relaxed">
              DrapeNest is dedicated to upgrading residential and commercial interiors with high-performance blinds, customized curtain drapes, and stainless steel mosquito screens.
            </p>
            <p className="text-sm sm:text-base text-[#1E293B] font-semibold leading-relaxed">
              We specialize in custom measurement, laser precision track fitting, and smart motor automation—allowing you to control privacy, temperature, and light levels with a single button tap or smartphone voice command.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#E9EEF3] p-4 rounded-xl border border-[#B0C4DE]">
                <div className="font-black text-2xl text-[#3A5E7A]">100%</div>
                <div className="text-xs text-[#0F172A] font-extrabold mt-1">Made-to-Measure Custom Fit</div>
              </div>
              <div className="bg-[#E9EEF3] p-4 rounded-xl border border-[#B0C4DE]">
                <div className="font-black text-2xl text-[#3A5E7A]">3 Years</div>
                <div className="text-xs text-[#0F172A] font-extrabold mt-1">Extended Hardware Warranty</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/uploaded/bedroom_drapes_canopy.png"
                alt="Curtain Fitting Showroom"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8299B2] uppercase tracking-wider mb-1">
                  <Building className="w-4 h-4" />
                  <span>Headquarters & Showroom</span>
                </div>
                <div className="font-extrabold text-lg">Sungam, Coimbatore</div>
                <div className="text-xs text-slate-300">45, Sungam, Coimbatore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4-Step Animated Customer Process */}
      <section className="bg-gradient-to-b from-[#F6F8FA] via-white to-[#E9EEF3] py-16 border-y border-slate-200 relative overflow-hidden">
        {/* Subtle background animated particle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#3A5E7A_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#3A5E7A]/10 text-[#3A5E7A] font-extrabold text-xs px-4 py-1.5 rounded-full border border-[#3A5E7A]/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#839373] animate-pulse" />
              <span>Interactive 4-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E2C38]">
              How We Work — From Visit to Fitting
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Click any step below to explore our precision craftsmanship and seamless installation flow.
            </p>
          </div>

          <ProcessTimeline steps={processSteps} onBook={() => openBookingModalWithProduct('Process Step Consultation')} />
        </div>
      </section>

      {/* 4. Quality Commitments */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="bg-[#1C2B38] rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-extrabold text-lg">3-Year Component Warranty</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We stand by our product quality. Every motorized tubular motor, aluminum cassette box, roller gear, and mosquito frame comes with 3-year extended warranty coverage.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg">Laser Measurement Guarantee</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our technicians use digital optical lasers to capture millimetric window dimensions, guaranteeing zero side gaps, light bleed, or fitting misalignment.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg">Certified Professional Fitters</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All fitting staff undergo rigorous safety training and use dust-free vacuum drilling systems to keep your living room spotless during installation.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
