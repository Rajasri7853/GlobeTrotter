
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Package as PackageIcon, DollarSign, MapPin, Eye } from 'lucide-react';
import { useApp } from '../App';
import { Package, Region, PackageType } from '../types';

const Admin = () => {
  const { packages, setPackages, enquiries } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your travel packages and enquiries.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} /> Add New Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Packages</div>
          <div className="text-3xl font-bold text-slate-800">{packages.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Active Enquiries</div>
          <div className="text-3xl font-bold text-slate-800">{enquiries.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Bookings</div>
          <div className="text-3xl font-bold text-slate-800">12</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Tour Packages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
              <tr>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pkg.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                      <span className="font-semibold text-slate-800 text-sm">{pkg.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{pkg.destination}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">₹{pkg.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded">
                      {pkg.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(pkg.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
