import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toast } from './components/Toast';
import { ProductModal } from './components/ProductModal';
import { BookingModal } from './components/BookingModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

const MainContent = () => {
  const { activePage } = useApp();

  return (
    <main className="min-h-screen">
      {activePage === 'home' && <Home />}
      {activePage === 'about' && <About />}
      {activePage === 'products' && <Products />}
      {activePage === 'services' && <Services />}
      {activePage === 'gallery' && <Gallery />}
      {activePage === 'contact' && <Contact />}
      {activePage === 'admin' && <Admin />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F8FA] text-[#1E2C38]">
        <Navbar />
        <MainContent />
        <Footer />
        <WhatsAppButton />
        <Toast />
        <ProductModal />
        <BookingModal />
      </div>
    </AppProvider>
  );
}

export default App;
