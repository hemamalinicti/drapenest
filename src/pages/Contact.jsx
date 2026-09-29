import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  ShieldCheck,
  CheckCircle2,
  Building,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const Contact = () => {
  const { showToast } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const faqs = [
    {
      q: 'Do you offer free doorstep measurement and fabric sample visits in Coimbatore?',
      a: 'Yes! Our technician will visit your location in Sungam, RS Puram, Peelamedu, Saibaba Colony, Saravanampatti, or any area in Coimbatore with over 100+ fabric swatches to take laser optical window measurements free of cost.'
    },
    {
      q: 'What is covered under the 3-Year Hardware Warranty?',
      a: 'Our 3-year warranty covers all motorized tubular motors, remote controls, powder-coated aluminum cassette boxes, tilt gears, track runners, and mosquito net frame assemblies.'
    },
    {
      q: 'Can motorized blinds be controlled via Mobile App or Alexa?',
      a: 'Yes, our smart motorized roller blinds and curtain tracks integrate with Alexa, Google Home, Smart Life, and Tuya apps, enabling voice commands and scheduled timer opening/closing.'
    },
    {
      q: 'What is the estimated delivery and installation timeline?',
      a: 'Custom window blinds and mosquito netting are manufactured and installed within 3 to 5 business days after order confirmation.'
    },
    {
      q: 'How do I clean and maintain fabric blinds and mosquito screens?',
      a: 'Roller and zebra blinds can be wiped with a microfiber cloth or soft vacuum brush attachment. Pleated sliding and Velcro mosquito nets are washable with mild soap and water.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      alert('Please fill out your Name, Phone Number, and Message.');
      return;
    }
    showToast('Thank you! Your enquiry has been sent. We will respond within 2 hours.');
    setContactForm({
      name: '',
      phone: '',
      email: '',
      subject: 'General Enquiry',
      message: ''
    });
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* 1. HERO SECTION BANNER WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[240px] sm:min-h-[280px] flex items-center justify-center py-14 px-4 sm:px-8 border-b border-[#D3DCE6] overflow-hidden bg-slate-950 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-95 filter brightness-[1.08] contrast-[1.05]"
          style={{ backgroundImage: "url('/images/hero_3d_hall.jpg')" }}
        ></div>

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/55"></div>

        {/* Hero Banner Text */}
        <div className="relative z-10 max-w-[1560px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1E2C38]/90 backdrop-blur-md border border-[#8299B2]/50 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>Contact Module | Sungam Showroom & Office</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Get In Touch With <span className="text-amber-300">DrapeNest</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Visit our Sungam showroom or speak directly with our window consultation experts for free home measurement.
          </p>
        </div>
      </section>

      {/* 2. Main Grid: Info Cards + Form */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom & Office Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E9EEF3] text-[#3A5E7A] flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E2C38]">Head Office & Showroom</h3>
                  <p className="text-xs text-slate-500">Sungam, Coimbatore</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-1">
                45, Sungam, Coimbatore, Tamil Nadu
              </p>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E9EEF3] text-[#3A5E7A] flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E2C38]">Phone & WhatsApp Contact</h3>
                  <p className="text-xs text-slate-500">Direct Consultation Desk</p>
                </div>
              </div>
              
              <div className="space-y-2 text-xs font-semibold text-slate-700 pl-1">
                <div className="flex items-center justify-between">
                  <span>General Enquiries:</span>
                  <a href="tel:9876512340" className="text-[#3A5E7A] font-bold hover:underline">+91 98765 12340</a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919876512340?text=Hi%20DrapeNest,%20I%20would%20like%20to%20enquire%20about%20curtain%20fitting."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Email & Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E9EEF3] text-[#3A5E7A] flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E2C38]">Email & Working Hours</h3>
                  <p className="text-xs text-slate-500">Official Communication</p>
                </div>
              </div>
              <div className="text-xs text-slate-600 space-y-1.5 pt-1 pl-1">
                <div><strong>Email:</strong> drapenest@gmail.com</div>
                <div><strong>Working Days:</strong> Monday to Saturday (9:30 AM - 8:30 PM)</div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-black text-[#1E2C38] mb-2">Send Us an Enquiry</h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out your requirement below and our team will get back to you with samples & pricing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Shankar"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98401 23456"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. anand@gmail.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Product Interest</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
                  >
                    <option value="General Enquiry">General Product Enquiry</option>
                    <option value="Blinds Quotation">Blinds Quotation</option>
                    <option value="Mosquito Netting">Mosquito Netting Fitting</option>
                    <option value="Curtains & Tracks">Curtains & Tracks</option>
                    <option value="Commercial Project">Commercial Project Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Requirements *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your window count, dimensions, or custom requirements..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Location Map Simulation Frame */}
      <section className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-[#E9EEF3] border-b border-[#D3DCE6] flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-[#1E2C38]">
              <MapPin className="w-4 h-4 text-[#3A5E7A]" />
              <span>Map Location: 45, Sungam, Coimbatore, Tamil Nadu</span>
            </div>
            <a
              href="https://maps.google.com/?q=Sungam+Coimbatore+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#3A5E7A] hover:underline"
            >
              Open in Google Maps ↗
            </a>
          </div>
          <div className="w-full h-80 bg-slate-100 flex items-center justify-center relative overflow-hidden">
            <iframe
              title="DrapeNest Showroom Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.347514785465!2d76.9745231!3d11.0006245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859a0f443912d%3A0xbfa6d07d12d46e3d!2sSungam%2C%20Ramanathapuram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 pt-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#3A5E7A]/10 text-[#3A5E7A] font-bold text-xs px-3.5 py-1.5 rounded-full mb-2">
            <HelpCircle className="w-4 h-4 text-[#839373]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E2C38]">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 mt-1">Quick answers to common questions about installation, warranty & swatches.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#1E2C38] flex justify-between items-center gap-4 hover:text-[#3A5E7A]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#3A5E7A] shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
