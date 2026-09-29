import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  HelpCircle,
  Home as HomeIcon,
  Moon,
  Sun,
  ShieldCheck,
  Cpu,
  Sliders,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Star,
  Award
} from 'lucide-react';

export const StyleQuiz = () => {
  const { openBookingModalWithProduct, setSelectedProductModal, products } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  // User Selections
  const [answers, setAnswers] = useState({
    room: '',
    goal: '',
    vibe: ''
  });

  // Step 1 Questions: Room Type
  const rooms = [
    { id: 'living', title: 'Living Room', icon: '🛋️', desc: 'Modern social space requiring light control & elegance' },
    { id: 'bedroom', title: 'Master Bedroom', icon: '🛏️', desc: 'Restful sanctuary requiring blackout & sound dampening' },
    { id: 'office', title: 'Home Office / Study', icon: '💻', desc: 'Productive environment needing glare-free light' },
    { id: 'balcony', title: 'Balcony / Patio Door', icon: '🪴', desc: 'High airflow area requiring mosquito protection' }
  ];

  // Step 2 Questions: Main Goal
  const goals = [
    { id: 'blackout', title: 'Total Light Blackout & Privacy', icon: <Moon className="w-5 h-5 text-indigo-500" />, desc: 'Block 99% sunlight & outdoor streetlights' },
    { id: 'diffuse', title: 'Soft Filtered Natural Sunlight', icon: <Sun className="w-5 h-5 text-amber-500" />, desc: 'Gently diffuse harsh glare into warm ambient light' },
    { id: 'mosquito', title: '100% Mosquito & Insect Defense', icon: <ShieldCheck className="w-5 h-5 text-[#3A5E7A]" />, desc: 'Protect family from mosquitoes without closing doors' },
    { id: 'smart', title: 'Smart Phone & Remote Automation', icon: <Cpu className="w-5 h-5 text-[#C59B27]" />, desc: 'Control window drapes automatically via Alexa / App' }
  ];

  // Step 3 Questions: Design Vibe
  const vibes = [
    { id: 'zebra', title: 'Modern Dual Shade Zebra', desc: 'Alternating sheer & solid bands for versatile light control' },
    { id: 'sheer', title: 'Luxe Sheer Linen Drapes', desc: 'Floor-to-ceiling dreamy waves with soft natural drape' },
    { id: 'roller', title: 'Sleek Motorized Roller', desc: 'Clean minimalist look with silent motorized roll-up' },
    { id: 'pleated', title: 'Pleated Sliding Mesh', desc: 'Space-saving accordion fold system for sliding doors' }
  ];

  // Handler for picking an answer
  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(4); // Final Match Screen
    }
  };

  const handleReset = () => {
    setAnswers({ room: '', goal: '', vibe: '' });
    setCurrentStep(1);
  };

  // Determine Matched Product
  const getMatchedProduct = () => {
    if (answers.goal === 'mosquito' || answers.vibe === 'pleated' || answers.room === 'balcony') {
      return products.find(p => p.id === 'm1') || products[0]; // Pleated Mosquito Net
    }
    if (answers.goal === 'smart' || answers.vibe === 'roller') {
      return products.find(p => p.id === 'b1') || products[0]; // Motorized Roller
    }
    if (answers.vibe === 'sheer' || answers.goal === 'diffuse') {
      return products.find(p => p.id === 'c1') || products[0]; // Sheer Linen Curtains
    }
    // Default match: Zebra Blinds
    return products.find(p => p.id === 'b3') || products[0];
  };

  const matchedProduct = getMatchedProduct();

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#D6E0EA] p-6 sm:p-10 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#3A5E7A] via-[#9AAB89] to-[#3A5E7A]"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#D6E0EA] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E9EEF3] text-[#3A5E7A] flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-6 h-6 text-[#9AAB89]" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[#1E2C38]">Find Your Perfect Window Style</h3>
            <p className="text-xs text-slate-500 mt-0.5">Answer 3 quick questions to get your custom recommended match!</p>
          </div>
        </div>

        {/* Step Progress Bar */}
        {currentStep <= 3 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#3A5E7A] bg-[#3A5E7A]/10 px-3 py-1 rounded-full">
              Step {currentStep} of 3
            </span>
          </div>
        )}
      </div>

      {/* STEP 1: ROOM SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h4 className="text-sm font-extrabold text-[#1E2C38] uppercase tracking-wider">
            1. Which room are you decorating?
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelect('room', r.id)}
                className="group p-5 rounded-2xl border-2 border-[#D6E0EA] hover:border-[#3A5E7A] bg-[#F6F8FA] hover:bg-white text-left transition-all shadow-xs hover:shadow-md flex items-start gap-4"
              >
                <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{r.icon}</span>
                <div>
                  <div className="font-bold text-base text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors">
                    {r.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{r.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: PRIMARY GOAL */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-extrabold text-[#1E2C38] uppercase tracking-wider">
              2. What is your primary goal for this window?
            </h4>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-slate-400 hover:text-[#3A5E7A]"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleSelect('goal', g.id)}
                className="group p-5 rounded-2xl border-2 border-[#D6E0EA] hover:border-[#3A5E7A] bg-[#F6F8FA] hover:bg-white text-left transition-all shadow-xs hover:shadow-md flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {g.icon}
                </div>
                <div>
                  <div className="font-bold text-base text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors">
                    {g.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{g.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: DESIGN VIBE */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-extrabold text-[#1E2C38] uppercase tracking-wider">
              3. Which aesthetic design vibe do you prefer?
            </h4>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs font-semibold text-slate-400 hover:text-[#3A5E7A]"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vibes.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => handleSelect('vibe', v.id)}
                className="group p-5 rounded-2xl border-2 border-[#D6E0EA] hover:border-[#3A5E7A] bg-[#F6F8FA] hover:bg-white text-left transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="font-bold text-base text-[#1E2C38] group-hover:text-[#3A5E7A] transition-colors mb-1">
                    {v.title}
                  </div>
                  <div className="text-xs text-slate-500">{v.desc}</div>
                </div>
                <div className="mt-3 text-xs font-bold text-[#3A5E7A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Select This Vibe</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: RECOMMENDATION RESULT MATCH CARD */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-[#E9EEF3] rounded-2xl p-6 sm:p-8 border border-[#D6E0EA]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#3A5E7A] bg-[#3A5E7A]/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#9AAB89]" />
                100% Perfect Style Match Found
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-[#3A5E7A] flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Image */}
              <div className="md:col-span-5 h-56 rounded-xl overflow-hidden shadow-md bg-white relative">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#3A5E7A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Recommended Match
                </span>
              </div>

              {/* Right Recommendation Details */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{matchedProduct.rating} ({matchedProduct.reviewsCount} customer reviews)</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#1E2C38]">
                  {matchedProduct.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {matchedProduct.description}
                </p>

                <div className="text-2xl font-black text-[#3A5E7A]">
                  ₹{matchedProduct.pricePerSqFt}{' '}
                  <span className="text-xs font-normal text-slate-500">per {matchedProduct.unit}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openBookingModalWithProduct(`Quiz Match: ${matchedProduct.name}`)}
                    className="bg-[#3A5E7A] hover:bg-[#2B475E] text-white font-bold py-3 px-5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Book Free Consultation for This Match</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedProductModal(matchedProduct)}
                    className="bg-white hover:bg-[#F6F8FA] border border-[#D6E0EA] text-[#1E2C38] font-bold py-3 px-4 rounded-xl text-xs transition-colors"
                  >
                    View Specifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
