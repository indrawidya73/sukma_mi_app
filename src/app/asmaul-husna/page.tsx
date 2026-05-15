'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Search, Sparkles, BookOpen, Music, Volume2 } from 'lucide-react';

const ASMAUL_HUSNA = [
  { id: 1, arab: 'الرَّحْمَنُ', latin: 'Ar-Rahman', arti: 'Yang Maha Pengasih' },
  { id: 2, arab: 'الرَّحِيمُ', latin: 'Ar-Rahim', arti: 'Yang Maha Penyayang' },
  { id: 3, arab: 'الْمَلِكُ', latin: 'Al-Malik', arti: 'Yang Maha Merajai' },
  { id: 4, arab: 'الْقُدُّوسُ', latin: 'Al-Quddus', arti: 'Yang Maha Suci' },
  { id: 5, arab: 'السَّلَامُ', latin: 'As-Salam', arti: 'Yang Maha Memberi Kesejahteraan' },
  { id: 6, arab: 'الْمُؤْمِنُ', latin: 'Al-Mu\'min', arti: 'Yang Maha Memberi Keamanan' },
  { id: 7, arab: 'الْمُهَيْمِنُ', latin: 'Al-Muhaymin', arti: 'Yang Maha Memelihara' },
  { id: 8, arab: 'الْعَزِيزُ', latin: 'Al-Aziz', arti: 'Yang Maha Perkasa' },
  { id: 9, arab: 'الْجَبَّارُ', latin: 'Al-Jabbar', arti: 'Yang Memiliki Mutlak Kegagahan' },
  { id: 10, arab: 'الْمُتَكَبِّرُ', latin: 'Al-Mutakabbir', arti: 'Yang Maha Megah' },
  // ... data lainnya bisa ditambahkan
];

export default function AsmaulHusnaPage() {
  const [search, setSearch] = useState('');

  const filteredData = ASMAUL_HUSNA.filter(item => 
    item.latin.toLowerCase().includes(search.toLowerCase()) || 
    item.arti.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Asmaul Husna</h1>
            <p className="text-sm text-muted-foreground">99 Nama Allah yang Indah dan Baik</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau arti..."
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData.map((item) => (
            <div key={item.id} className="card-elevated p-6 flex flex-col items-center text-center space-y-4 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {item.id}
              </div>
              <h2 className="text-4xl font-serif py-4 group-hover:scale-110 transition-transform" dir="rtl">{item.arab}</h2>
              <div className="space-y-1">
                <p className="text-lg font-bold text-primary">{item.latin}</p>
                <p className="text-sm text-muted-foreground italic">{item.arti}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Data tidak ditemukan.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
