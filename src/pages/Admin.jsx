import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  UserCheck,
  LogOut,
  PlusCircle,
  Trash2,
  CheckCircle,
  Clock,
  Calendar,
  Layers,
  Search,
  Sliders,
  Eye,
  ShieldAlert,
  BarChart2,
  FileText
} from 'lucide-react';

export const Admin = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    products,
    addProduct,
    deleteProduct,
    bookings,
    updateBookingStatus
  } = useApp();

  const [loginPassword, setLoginPassword] = useState('');
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'products'
  const [bookingFilter, setBookingFilter] = useState('All');

  // New product form state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'blinds',
    subCategory: 'Smart Blinds',
    pricePerSqFt: 120,
    unit: 'sq.ft',
    image: '/images/uploaded/classic_fringe_drapes.png',
    description: '',
    featuresStr: 'Wi-Fi Smart Control, 3-Year Warranty, Thermal Insulation'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(loginPassword);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.pricePerSqFt) {
      alert('Please fill out product name and price per sq.ft.');
      return;
    }
    const featuresArr = newProd.featuresStr.split(',').map(s => s.trim());
    addProduct({
      ...newProd,
      pricePerSqFt: parseFloat(newProd.pricePerSqFt),
      features: featuresArr
    });
    setShowAddProductModal(false);
  };

  // Filter bookings
  const filteredBookings = bookingFilter === 'All'
    ? bookings
    : bookings.filter(b => b.status === bookingFilter);

  // If not logged in, render secure login card
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3A5E7A] text-[#8299B2] mx-auto flex items-center justify-center font-bold shadow-md">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#1E2C38]">Administrator Login</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter password to access product catalog management & customer bookings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
              <input
                type="password"
                required
                placeholder="Enter password (demo: admin123)"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="bg-[#E9EEF3] p-3 rounded-xl border border-[#D3DCE6] text-[11px] text-slate-600">
            <strong>Default Demo Pass:</strong> <code className="bg-white px-1.5 py-0.5 rounded text-[#3A5E7A] font-bold">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* 1. HERO SECTION BANNER WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[220px] flex items-center justify-center py-10 px-4 sm:px-8 border-b border-[#D3DCE6] overflow-hidden bg-slate-950 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-95 filter brightness-[1.08] contrast-[1.05]"
          style={{ backgroundImage: "url('/images/hero_3d_hall.jpg')" }}
        ></div>

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/55"></div>

        {/* Hero Banner Text */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1E2C38]/90 backdrop-blur-md border border-[#8299B2]/50 text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-xl mb-2">
              <UserCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Authenticated Admin Access</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Store Administrator <span className="text-amber-300">Portal</span>
            </h1>
          </div>

          <button
            onClick={adminLogout}
            className="bg-rose-600/90 hover:bg-rose-700 text-white border border-rose-400/40 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Administrator</span>
          </button>
        </div>
      </section>

      {/* Analytics Counter Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Total Bookings</div>
              <div className="text-2xl font-black text-[#3A5E7A] mt-1">{bookings.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3A5E7A] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Active Catalog Items</div>
              <div className="text-2xl font-black text-[#3A5E7A] mt-1">{products.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#8299B2] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">New Enquiries</div>
              <div className="text-2xl font-black text-rose-600 mt-1">
                {bookings.filter(b => b.status === 'New').length}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Completed Fits</div>
              <div className="text-2xl font-black text-[#839373] mt-1">
                {bookings.filter(b => b.status === 'Completed').length}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#839373] flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabbed Management */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-[#3A5E7A] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-[#E9EEF3] border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Customer Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#3A5E7A] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-[#E9EEF3] border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Products Catalog ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: CUSTOMER BOOKINGS & ENQUIRIES */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            {/* Filter Sub-header */}
            <div className="p-4 bg-[#E9EEF3] border-b border-[#D3DCE6] flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-xs font-bold text-[#1E2C38]">
                Filter Bookings by Status:
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'New', 'Scheduled', 'Contacted', 'Completed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setBookingFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      bookingFilter === st
                        ? 'bg-[#3A5E7A] text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Booking ID</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Service & Product</th>
                    <th className="py-3.5 px-4">Location & Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Update Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredBookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50/80">
                      <td className="py-4 px-4 font-bold text-[#3A5E7A]">{bk.id}</td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#1E2C38]">{bk.name}</div>
                        <div className="text-slate-500">{bk.phone}</div>
                        <div className="text-[11px] text-slate-400">{bk.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">{bk.serviceType}</div>
                        <div className="text-slate-500 text-[11px]">{bk.productInterest || 'General'}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">{bk.area}</div>
                        <div className="text-slate-500 text-[11px]">{bk.date} ({bk.timeSlot})</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          bk.status === 'New' ? 'bg-rose-100 text-rose-800' :
                          bk.status === 'Scheduled' ? 'bg-amber-100 text-amber-800' :
                          bk.status === 'Contacted' ? 'bg-sky-100 text-sky-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {bk.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <select
                          value={bk.status}
                          onChange={(e) => updateBookingStatus(bk.id, e.target.value)}
                          className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A5E7A]"
                        >
                          <option value="New">Mark New</option>
                          <option value="Contacted">Mark Contacted</option>
                          <option value="Scheduled">Mark Scheduled</option>
                          <option value="Completed">Mark Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-lg text-[#1E2C38]">Active Store Catalog Items</h3>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-[#3A5E7A] hover:bg-[#2C4960] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
                  <div className="flex gap-4">
                    <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100" />
                    <div>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {p.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#1E2C38] mt-1 line-clamp-1">{p.name}</h4>
                      <div className="text-sm font-black text-[#3A5E7A] mt-1">₹{p.pricePerSqFt} / sq.ft</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">ID: {p.id}</span>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center gap-1 p-1 hover:bg-rose-50 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-[#1E2C38] mb-4">Add Product to Catalog</h3>
            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Motorized Double Roller Blind"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="blinds">Blinds</option>
                    <option value="curtains">Curtains</option>
                    <option value="mosquito-nets">Mosquito Nets</option>
                    <option value="fittings">Fittings & Rods</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price / sq.ft (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.pricePerSqFt}
                    onChange={(e) => setNewProd({ ...newProd, pricePerSqFt: e.target.value })}
                    className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Enter detailed description..."
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full bg-[#F6F8FA] border border-slate-300 rounded-xl p-3 text-xs font-medium"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#3A5E7A] text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
