import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, Sparkles, CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';

export const PriceEstimator = () => {
  const { openBookingModalWithProduct } = useApp();

  const [productType, setProductType] = useState('zebra');
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(6);
  const [grade, setGrade] = useState('premium');

  // Base sq.ft prices
  const baseRates = {
    zebra: 125,
    roller: 145,
    roman: 110,
    sheer: 95,
    pleatedNet: 180,
    velcroNet: 45
  };

  const productNames = {
    zebra: 'Dual Shade Zebra / Duplex Blinds',
    roller: 'Motorized Smart Roller Blinds',
    roman: 'Luxury Soft-Fold Roman Blinds',
    sheer: 'Luxe Sheer Linen Curtains',
    pleatedNet: 'Pleated Sliding Mosquito Nets',
    velcroNet: 'Detachable Velcro Mosquito Nets'
  };

  const gradeMultipliers = {
    standard: 1.0,
    premium: 1.2,
    luxury: 1.45
  };

  const totalSqFt = Math.max(0, width * height);
  const baseRate = baseRates[productType] || 100;
  const gradeMult = gradeMultipliers[grade] || 1;
  const ratePerSqFt = Math.round(baseRate * gradeMult);
  const totalPrice = Math.round(totalSqFt * ratePerSqFt);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#D3DCE6] p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E9EEF3] text-[#3A5E7A] flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#1E2C38]">Window Price Estimator</h3>
            <p className="text-xs text-slate-500">Calculate instant estimated cost per sq.ft</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#3A5E7A] bg-[#3A5E7A]/10 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#839373]" />
          <span>Live Quotation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Product Type Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Window Treatment
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full bg-[#F6F8FA] border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
            >
              <option value="zebra">Dual Shade Zebra / Duplex Blinds (₹125 / sq.ft)</option>
              <option value="roller">Motorized Smart Roller Blinds (₹145 / sq.ft)</option>
              <option value="roman">Luxury Soft-Fold Roman Blinds (₹110 / sq.ft)</option>
              <option value="sheer">Luxe Sheer Linen Curtains (₹95 / sq.ft)</option>
              <option value="pleatedNet">Pleated Sliding Mosquito Nets (₹180 / sq.ft)</option>
              <option value="velcroNet">Detachable Velcro Mosquito Nets (₹45 / sq.ft)</option>
            </select>
          </div>

          {/* Width & Height Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F6F8FA] border border-slate-200 p-4 rounded-xl">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Window Width</span>
                <span className="text-[#3A5E7A] font-extrabold text-sm">{width} Feet</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                className="w-full accent-[#3A5E7A] cursor-pointer"
              />
            </div>

            <div className="bg-[#F6F8FA] border border-slate-200 p-4 rounded-xl">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Window Height</span>
                <span className="text-[#3A5E7A] font-extrabold text-sm">{height} Feet</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full accent-[#3A5E7A] cursor-pointer"
              />
            </div>
          </div>

          {/* Fabric Quality Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Fabric & Material Spec
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'standard', name: 'Standard', desc: 'Durable Daily' },
                { key: 'premium', name: 'Premium', desc: 'Textured Linen' },
                { key: 'luxury', name: 'Luxury', desc: 'Silk & Blackout' }
              ].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setGrade(t.key)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    grade === t.key
                      ? 'border-[#3A5E7A] bg-[#3A5E7A]/10 text-[#3A5E7A] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">{t.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Result Box */}
        <div className="lg:col-span-5 bg-[#E9EEF3] rounded-2xl p-6 border border-[#D3DCE6] flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Estimated Total Area
            </div>
            <div className="text-2xl font-black text-[#1E2C38]">
              {totalSqFt} <span className="text-base font-medium text-slate-600">sq.ft</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Selected Product:</span>
                <span className="font-bold text-slate-800 text-right">{productNames[productType]}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate per sq.ft:</span>
                <span className="font-bold text-slate-800">₹{ratePerSqFt} / sq.ft</span>
              </div>
              <div className="flex justify-between">
                <span>Installation & Fitting:</span>
                <span className="font-semibold text-[#839373]">Included (Free Consultation)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300/80">
              <div className="text-xs font-bold text-[#3A5E7A] uppercase tracking-wider">
                Estimated Price Tag
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#3A5E7A] mt-1">
                ₹{totalPrice.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500 ml-1.5">*Approx GST & Hardware</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => openBookingModalWithProduct(`${productNames[productType]} (Approx ${totalSqFt} sq.ft - Est ₹${totalPrice})`)}
              className="w-full bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Lock Quote & Book Free Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#839373]" />
              <span>Zero cancellation fee • Free laser measurement in Coimbatore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
