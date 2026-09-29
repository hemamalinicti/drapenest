import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  CheckCircle2,
  ShieldCheck,
  Ruler,
  Phone,
  MessageCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ProductModal = () => {
  const { selectedProductModal, setSelectedProductModal, openBookingModalWithProduct } = useApp();
  const [calcWidth, setCalcWidth] = useState(6);
  const [calcHeight, setCalcHeight] = useState(6);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const sqFt = Math.max(0, calcWidth * calcHeight);
  const estimatedCost = Math.round(sqFt * product.pricePerSqFt);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#E9EEF3] px-6 py-4 border-b border-[#D3DCE6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5E7A] bg-[#3A5E7A]/10 px-2.5 py-1 rounded-md">
              {product.category}
            </span>
            <span className="text-xs font-semibold text-slate-500">• {product.subCategory}</span>
          </div>
          <button
            onClick={() => setSelectedProductModal(null)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-md bg-slate-100 relative group h-64 md:h-full min-h-[220px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#3A5E7A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating} ({product.reviewsCount} ratings)</span>
              </div>
            </div>

            {/* Main Info */}
            <div>
              <h2 className="text-2xl font-black text-[#1E2C38] leading-tight mb-2">
                {product.name}
              </h2>
              
              <div className="text-2xl font-extrabold text-[#3A5E7A] mb-3">
                ₹{product.pricePerSqFt}{' '}
                <span className="text-xs font-medium text-slate-500">per {product.unit || 'sq.ft'}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Key Features Bullet Points */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Highlights:</div>
                {product.features && product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#839373] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specifications && (
            <div className="bg-[#F6F8FA] p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3A5E7A]" />
                Technical Specifications & Warranty
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">{key}:</span>
                    <span className="font-bold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Dynamic Calculator */}
          <div className="bg-[#E9EEF3] p-5 rounded-xl border border-[#D3DCE6]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1E2C38] flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#3A5E7A]" />
                Calculate Estimate for Your Window
              </span>
              <span className="text-xs font-extrabold text-[#3A5E7A]">
                Est. ₹{estimatedCost.toLocaleString('en-IN')} ({sqFt} sq.ft)
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Width (ft)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={calcWidth}
                  onChange={(e) => setCalcWidth(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Height (ft)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#F6F8FA] px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Includes free doorstep laser measurement in Coimbatore.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                const prod = product.name;
                setSelectedProductModal(null);
                openBookingModalWithProduct(`${prod} (Approx ${sqFt} sq.ft - Est ₹${estimatedCost})`);
              }}
              className="w-full sm:w-auto bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book Doorstep Visit & Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
