import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/919876512340?text=Hi%20DrapeNest,%20I%20would%20like%20to%20book%20a%20free%20doorstep%20measurement%20and%20view%20curtain%20samples.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Button with radar pulse */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none"
        aria-label="Direct WhatsApp Chat"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-white stroke-none" />
      </a>
    </div>
  );
};
