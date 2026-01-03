
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../App';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packages, user, addBooking } = useApp();
  const pkg = packages.find(p => p.id === id);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    travelDate: '',
    people: 2,
    paymentMethod: 'upi'
  });

  const [step, setStep] = useState(1);

  if (!pkg) return <div>Invalid Package</div>;

  const totalAmount = pkg.price * formData.people;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Mock Booking
      const newBooking = {
        id: Math.random().toString(36).substr(2, 9),
        packageId: pkg.id,
        packageName: pkg.name,
        travelDate: formData.travelDate,
        people: formData.people,
        status: 'Confirmed' as const,
        totalPrice: totalAmount
      };
      addBooking(newBooking);
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Booking Confirmed!</h1>
          <p className="text-slate-500">Your trip to {pkg.destination} is successfully booked. A confirmation email has been sent to {formData.email}.</p>
        </div>
        <div className="bg-slate-50 w-full p-6 rounded-2xl border border-slate-200 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-slate-500">Booking ID:</span>
            <span className="font-bold text-slate-800">#SB{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-500">Package:</span>
            <span className="font-bold text-slate-800">{pkg.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Paid:</span>
            <span className="font-bold text-emerald-600 text-lg">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition-all"
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>1</div>
          <div className="h-0.5 w-12 bg-slate-200"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">Traveler Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Full Name</label>
                  <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Email Address</label>
                  <input required type="email" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                  <input required type="tel" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Travel Date</label>
                  <input required type="date" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.travelDate} onChange={e => setFormData({...formData, travelDate: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Number of People</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.people} onChange={e => setFormData({...formData, people: parseInt(e.target.value)})}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} People</option>)}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">Secure Payment</h2>
              <div className="space-y-4">
                {[
                  { id: 'upi', label: 'UPI (GPay, PhonePe)', icon: <Smartphone className="text-blue-600" /> },
                  { id: 'card', label: 'Debit / Credit Card', icon: <CreditCard className="text-slate-600" /> },
                  { id: 'wallet', label: 'Wallets / Net Banking', icon: <Wallet className="text-orange-500" /> }
                ].map(method => (
                  <label key={method.id} className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}>
                    <input type="radio" name="payment" className="w-4 h-4 accent-blue-600" checked={formData.paymentMethod === method.id} onChange={() => setFormData({...formData, paymentMethod: method.id})} />
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {method.icon}
                    </div>
                    <span className="font-bold text-slate-700">{method.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-50 p-3 rounded-xl">
                <ShieldCheck size={16} className="text-emerald-500" />
                Transactions are encrypted and 100% secure.
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="font-bold text-slate-500 hover:text-slate-800 px-6">
                Back
              </button>
            )}
            <button type="submit" className="flex-grow md:flex-none md:min-w-[200px] bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
              {step === 1 ? 'Proceed to Pay' : `Pay ₹${totalAmount.toLocaleString()}`}
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm">Fare Breakup</h3>
          <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
            <img src={pkg.image} className="w-20 h-20 object-cover rounded-xl" alt="" />
            <div>
              <h4 className="font-bold text-slate-800 leading-tight mb-1">{pkg.name}</h4>
              <p className="text-xs text-slate-500">{pkg.duration}</p>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Base Fare (₹{pkg.price} x {formData.people})</span>
              <span className="font-semibold text-slate-800">₹{(pkg.price * formData.people).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service Fee</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">GST (Included)</span>
              <span className="font-semibold text-slate-800">₹0</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-slate-100">
            <span className="font-bold text-slate-800">Total Payable</span>
            <span className="text-2xl font-bold text-blue-600">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
