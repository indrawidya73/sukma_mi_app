'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Waves, ShieldCheck, Share2, ChevronRight, ChevronLeft, Info, Search } from 'lucide-react';
import { toast } from 'sonner';

const ISTIGHOTSAH_DATA = [
  { id: 1, arab: 'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ', latin: 'Astaghfirullahal \'adzhim', arti: 'Saya mohon ampun kepada Allah Yang Maha Agung.' },
  { id: 2, arab: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيْمِ', latin: 'La hawla wala quwwata illa billahil \'aliyyil \'adzhim', arti: 'Tiada daya dan kekuatan kecuali dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung.' },
  { id: 3, arab: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ', latin: 'Ya Hayyu ya Qayyum birahmatika astaghits', arti: 'Wahai Dzat Yang Maha Hidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan.' },
  { id: 4, arab: 'يَا لَطِيْفُ', latin: 'Ya Latif', arti: 'Wahai Dzat Yang Maha Lembut.' }
];

export default function IstighotsahPage() {
  const [search, setSearch] = useState('');

  const filteredData = ISTIGHOTSAH_DATA.filter(item => 
    item.arti.toLowerCase().includes(search.toLowerCase()) || 
    item.latin.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Dzikir disalin');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Deep Blue Header */}
        <div className="relative h-56 rounded-[2.5rem] overflow-hidden flex flex-col justify-center px-8 sm:px-16 bg-slate-900 border border-slate-800">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[120px] -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600 rounded-full blur-[120px] -ml-40 -mb-40"></div>
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Waves size={24} />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">Istighotsah</h1>
            </div>
            <p className="text-slate-400 text-lg max-w-md">Doa dan dzikir untuk memohon perlindungan dan pertolongan Allah SWT.</p>
          </div>
          <ShieldCheck className="absolute right-12 text-white/5 w-48 h-48 rotate-12" />
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari dalam dzikir..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Elegant List */}
        <div className="space-y-6">
          {filteredData.map((item, index) => (
            <div 
              key={item.id} 
              className="group card-elevated p-8 sm:p-10 space-y-8 bg-white hover:border-blue-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                  Dzikir #{index + 1}
                </span>
                <button 
                  onClick={() => handleCopy(item.arab)}
                  className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-all"
                >
                  <Share2 size={18} />
                </button>
              </div>

              <div className="space-y-8 relative z-10">
                <p className="text-4xl sm:text-5xl font-serif text-center leading-[1.8] text-slate-900 drop-shadow-sm" dir="rtl">
                  {item.arab}
                </p>
                
                <div className="space-y-4 pt-8 border-t border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center">Latin</p>
                    <p className="text-lg font-medium italic text-center text-slate-600">{item.latin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center">Terjemahan</p>
                    <p className="text-base text-center text-slate-500 leading-relaxed px-6 italic">"{item.arti}"</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-start gap-4">
          <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Catatan:</strong> Istighotsah sebaiknya dibaca dengan tenang dan penuh penghayatan. Aplikasi ini menyediakan panduan bacaan dasar, untuk versi lengkap silakan merujuk pada buku panduan MI Islamiyah.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
