
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, ArrowRight, ShieldCheck, Github } from 'lucide-react';
import { useApp } from '../App';

const Login = () => {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsOtpSent(true);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login success
    setUser({
      id: 'u1',
      name: 'Broh Traveler',
      email: method === 'email' ? inputValue : 'traveler@planitbroh.com',
      phone: method === 'phone' ? inputValue : '+91 9876543210',
      bookings: []
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-10 text-white text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl mx-auto mb-4 shadow-xl">PIB</div>
          <h1 className="text-2xl font-bold mb-2">Welcome Broh!</h1>
          <p className="text-blue-100 text-sm opacity-80">Login to start your next adventure</p>
        </div>

        <div className="p-10">
          {!isOtpSent ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                <button 
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${method === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Phone
                </button>
                <button 
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${method === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Email
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  {method === 'phone' ? 'Mobile Number' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {method === 'phone' ? <Phone size={18} /> : <Mail size={18} />}
                  </div>
                  <input 
                    required
                    type={method === 'phone' ? 'tel' : 'email'}
                    placeholder={method === 'phone' ? '+91 98765 43210' : 'broh@example.com'}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                Continue <ArrowRight size={20} />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 font-bold text-sm transition-colors">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 font-bold text-sm transition-colors">
                  <Github size={18} /> Github
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800">Verify Identity</h3>
                <p className="text-slate-500 text-sm mt-1">We sent a verification code to {inputValue}</p>
                <button type="button" onClick={() => setIsOtpSent(false)} className="text-blue-600 text-xs font-bold mt-2 hover:underline">Change {method}</button>
              </div>

              <div className="flex gap-2 justify-between">
                {[1,2,3,4].map(i => (
                  <input 
                    key={i}
                    type="text" 
                    maxLength={1} 
                    className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl text-center text-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    value={otp[i-1] || ''}
                    onChange={e => {
                      const newOtp = otp.split('');
                      newOtp[i-1] = e.target.value;
                      setOtp(newOtp.join(''));
                    }}
                  />
                ))}
              </div>

              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
                Login
              </button>

              <p className="text-center text-slate-400 text-xs font-medium">
                Didn't receive code? <button type="button" className="text-blue-600 font-bold ml-1 hover:underline">Resend</button>
              </p>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
            <ShieldCheck size={14} className="text-emerald-500" />
            Your data is 256-bit encrypted and secure.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
