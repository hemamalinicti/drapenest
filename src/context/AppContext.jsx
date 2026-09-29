import React, { createContext, useContext, useState } from 'react';
import { initialProducts } from '../data/productsData';
import { initialBookings } from '../data/initialBookings';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [products, setProducts] = useState(initialProducts);
  const [bookings, setBookings] = useState(initialBookings);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  // Filtering & Modal States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDefaultProduct, setBookingDefaultProduct] = useState('');
  
  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Admin Actions
  const adminLogin = (password) => {
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      showToast('Admin logged in successfully!');
      return true;
    } else {
      showToast('Invalid Admin Password. Use admin123', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Admin logged out.');
  };

  const addProduct = (newProd) => {
    const productWithId = {
      ...newProd,
      id: 'p-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      isPopular: false,
      isNew: true
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast('New product added to catalog!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  // Booking Actions
  const createBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast('Doorstep consultation request submitted! Our team will contact you shortly.');
  };

  const updateBookingStatus = (id, newStatus, notes) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, status: newStatus, notes: notes || b.notes };
      }
      return b;
    }));
    showToast(`Booking ${id} updated to status: ${newStatus}`);
  };

  const openBookingModalWithProduct = (productName = '') => {
    setBookingDefaultProduct(productName);
    setIsBookingModalOpen(true);
  };

  const navigateTo = (page, categoryFilter = null) => {
    setActivePage(page);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,
        products,
        setProducts,
        addProduct,
        deleteProduct,
        bookings,
        createBooking,
        updateBookingStatus,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProductModal,
        setSelectedProductModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingDefaultProduct,
        openBookingModalWithProduct,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
