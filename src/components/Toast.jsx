import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-20 right-6 z-50 animate-fade-in max-w-sm">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-xl border ${
          isSuccess
            ? 'bg-[#3A5E7A] text-white border-[#2C4960]'
            : isError
            ? 'bg-rose-700 text-white border-rose-800'
            : 'bg-slate-900 text-white border-slate-700'
        }`}
      >
        {isSuccess && <CheckCircle className="w-5 h-5 text-[#9AAB89] shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-300 shrink-0" />}
        <span className="text-sm font-medium leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
