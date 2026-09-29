import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Award,
  CheckCircle2
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, openBookingModalWithProduct } = useApp();
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <footer className="bg-[#1C2B38] text-slate-200 border-t border-[#2C3F50] pt-16 pb-8">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 text-left mb-4">
              <img
                src="/images/drapenest_logo.svg"
                alt="DrapeNest Logo"
                className="w-10 h-10 rounded-xl shadow-md object-cover"
              />
              <div>
                <div className="font-extrabold text-xl tracking-tight text-white leading-none">
                  Drape<span className="text-[#9AAB89]">Nest</span>
                </div>
                <div className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase mt-0.5">
                  Curtain & Net Fitting Shop
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Coimbatore's premier window treatment specialist for made-to-measure roller blinds, Roman blinds, luxury sheer curtains, pleated mosquito nets, and motorized smart tracks.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>10,000+ Window Installations in Coimbatore</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>3-Year Component & Fabric Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>Free Doorstep Consultation & Measurement</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C59B27]"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#C59B27] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#C59B27] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>About Us & Craftsmanship</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-[#C59B27] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Product Catalog & Blinds</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-[#C59B27] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Curtain Fitting & Track Installation</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('privacy')} className="hover:text-[#C59B27] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')} className="hover:text-[#C59B27] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C59B27]"></span>
              Popular Range
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button onClick={() => navigateTo('products', 'blinds')} className="hover:text-[#C59B27] transition-colors">
                  Motorized Smart Roller Blinds
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'blinds')} className="hover:text-[#C59B27] transition-colors">
                  Dual Shade Zebra & Duplex Blinds
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'curtains')} className="hover:text-[#C59B27] transition-colors">
                  Pinch Pleat Blackout Curtains
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'mosquito-nets')} className="hover:text-[#C59B27] transition-colors">
                  Pleated Sliding Mosquito Nets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'mosquito-nets')} className="hover:text-[#C59B27] transition-colors">
                  SS 304 Mesh Openable Net Doors
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'fittings')} className="hover:text-[#C59B27] transition-colors">
                  Heavy Duty S-Fold Ripple Tracks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Showroom */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C59B27]"></span>
              Head Office & Showroom
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>
                  45, Sungam, Coimbatore
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <div className="flex flex-col">
                  <span>+91 98765 12340</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>drapenest@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Monday - Saturday: 9:30 AM - 8:30 PM</span>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => openBookingModalWithProduct()}
                className="w-full bg-[#3A5E7A] hover:bg-[#2B475E] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Request Free Home Measurement</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} DrapeNest Curtains & Net Fitting Shop. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
              Store Location
            </button>
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 bg-[#3A5E7A]/10 text-[#3A5E7A] font-extrabold text-xs px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#839373]" />
              <span>DrapeNest Legal & Data Protection</span>
            </div>

            <h3 className="text-2xl font-black text-[#1E2C38]">Privacy Policy</h3>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                At <strong>DrapeNest Curtains & Net Fitting Shop</strong> (located at 45, Sungam, Coimbatore), we respect your privacy and are committed to protecting the personal information you share with us.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">1. Information We Collect</h4>
              <p>
                We collect your name, phone number, delivery address, and window measurement specifications strictly for doorstep fabric consultation, quote estimation, laser measuring, and custom curtain fitting appointments across Coimbatore.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">2. How We Use Your Data</h4>
              <p>
                Your contact details are used solely to confirm appointment time slots, communicate order dispatch status, send digital GST invoices, and issue your 3-Year Hardware Warranty Certificate.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">3. Zero Data Sharing Guarantee</h4>
              <p>
                We never sell, rent, or trade customer contact numbers or window measurements to third-party telemarketers or external advertisers.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">4. Contacting Our Data Officer</h4>
              <p>
                For any privacy inquiries or to update your doorstep consultation records, email us directly at <strong>drapenest@gmail.com</strong> or call <strong>+91 98765 12340</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-[#3A5E7A] hover:bg-[#2B475E] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 bg-[#3A5E7A]/10 text-[#3A5E7A] font-extrabold text-xs px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#839373]" />
              <span>DrapeNest Service Agreement</span>
            </div>

            <h3 className="text-2xl font-black text-[#1E2C38]">Terms & Conditions</h3>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                By requesting a doorstep visit or ordering custom curtains, blinds, or mosquito nets from <strong>DrapeNest</strong>, you agree to the following operational terms:
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">1. Custom Made-to-Measure Policy</h4>
              <p>
                All blinds, curtains, and mosquito screens are custom manufactured to the exact optical laser dimensions confirmed by the customer during measurement inspection.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">2. 3-Year Hardware Warranty</h4>
              <p>
                Our 3-Year warranty covers motorized tubular motors, RF remote controls, powder-coated aluminum cassette boxes, tilt gears, and stainless steel mosquito net frames. Damage from physical accidents or unauthorized alteration is excluded.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">3. Installation Site Access</h4>
              <p>
                Customers are requested to provide clear access around window frames on the scheduled installation date. Our certified fitters utilize dust-free vacuum drilling systems.
              </p>

              <h4 className="font-bold text-sm text-slate-800 pt-2">4. Payment & Delivery Timeline</h4>
              <p>
                Standard custom fabrication and fitting are completed within 3 to 5 business days after order confirmation. Itemized GST tax invoices are provided upon fitting completion.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-[#3A5E7A] hover:bg-[#2B475E] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Accept & Close Terms
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
