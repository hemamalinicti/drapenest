import React from 'react';
import { useApp } from '../context/AppContext';
import { servicesList } from '../data/servicesData';
import {
  Wrench,
  Ruler,
  Cpu,
  Shield,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  Phone,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';

export const Services = () => {
  const { openBookingModalWithProduct } = useApp();

  const iconMap = {
    Ruler: Ruler,
    Wrench: Wrench,
    Cpu: Cpu,
    Shield: Shield,
    RefreshCw: RefreshCw
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. HERO SECTION BANNER WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[240px] sm:min-h-[280px] flex items-center justify-center py-14 px-4 sm:px-8 border-b border-[#D3DCE6] overflow-hidden bg-slate-950 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-95 filter brightness-[1.08] contrast-[1.05]"
          style={{ backgroundImage: "url('/images/uploaded/mosquito_net_twin.png')" }}
        ></div>

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/55"></div>

        {/* Hero Banner Text */}
        <div className="relative z-10 max-w-[1560px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1E2C38]/90 backdrop-blur-md border border-[#8299B2]/50 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl">
            <Wrench className="w-4 h-4 text-amber-300" />
            <span>Services Module | Curtain Fitting & Installation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Professional Curtain & Blind <span className="text-amber-300">Fitting</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            From free doorstep laser measurement to motorized track setup and mosquito screen fitting—our certified technicians deliver flawless execution.
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv) => {
            const IconComponent = iconMap[srv.icon] || Wrench;

            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#8299B2]"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#3A5E7A] text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {srv.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md text-[#3A5E7A] flex items-center justify-center font-bold shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors mb-2 leading-tight">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {srv.fullDesc}
                    </p>

                    <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                      <div className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                        Key Highlights:
                      </div>
                      {srv.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#839373] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex flex-col gap-3">
                  <div className="text-xs font-bold text-[#3A5E7A] flex justify-between items-center pt-3">
                    <span>Pricing Spec:</span>
                    <span className="font-extrabold text-slate-800 bg-[#E9EEF3] px-2.5 py-1 rounded-md text-[11px]">
                      {srv.pricing}
                    </span>
                  </div>

                  <button
                    onClick={() => openBookingModalWithProduct(srv.title)}
                    className="w-full bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Request This Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Call to Action Doorstep Banner */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="bg-[#1C2B38] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Need Urgent Window Measurement or Repair?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our technicians operate 6 days a week across Coimbatore (Sungam, RS Puram, Peelamedu, Saibaba Colony, Saravanampatti).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:9876512340"
              className="bg-white text-slate-900 font-bold px-5 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#3A5E7A]" />
              <span>Call +91 98765 12340</span>
            </a>
            <button
              onClick={() => openBookingModalWithProduct('Doorstep Fitting Service')}
              className="bg-[#9AAB89] hover:bg-[#839373] text-white font-bold px-5 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
