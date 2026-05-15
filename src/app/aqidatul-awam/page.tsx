'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Book, Scroll, Info } from 'lucide-react';

const AQIDATUL_AWAM = [
  { 
    bait: 1, 
    arab: 'أَبْدَأُ بِاسْمِ اللهِ وَالرَّحْمَنِ * وَبِالرَّحِيْمِ دَائِمِ اْلإِحْسَانِ', 
    latin: 'Abda-u bismillahi warrahmani * wa birrahimi da-imil ihsani', 
    arti: 'Saya memulai dengan nama Allah, Dzat yang Maha Pengasih, dan dengan Dzat yang Maha Penyayang yang senantiasa memberikan kebaikan.' 
  },
  { 
    bait: 2, 
    arab: 'فَالْحَمْدُ لِلَّهِ الْقَدِيْمِ اْلأَوَّلِ * اْلآخِرِ الْبَاقِي بِلَا تَحَوُّلِ', 
    latin: 'Falhamdulillahil qadimil awwali * al-akhiril baqi bila tahawwuli', 
    arti: 'Maka segala puji bagi Allah Dzat yang Maha Dahulu, yang Paling Awal, yang Akhir, yang Kekal tanpa perubahan.' 
  },
  { 
    bait: 3, 
    arab: 'ثُمَّ الصَّلَاةُ وَالسَّلَامُ سَرْمَدَا * عَلَى النَّبِيِّ خَيْرِ مَنْ قَدْ وَحَّدَا', 
    latin: 'Tsummash-shalatu wassalamu sarmada * \'alan-nabiyyi khairi man qad wahhada', 
    arti: 'Kemudian rahmat dan salam semoga senantiasa tercurah atas Nabi, sebaik-baik orang yang benar-benar mengesakan Allah.' 
  },
  // ... bait lainnya
];

export default function AqidatulAwamPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Aqidatul Awam</h1>
          <p className="text-muted-foreground">Kumpulan Bait Akidah bagi Kaum Awam</p>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl border border-green-100 bg-green-50/50">
          <Info className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-green-900">Tentang Aqidatul Awam</p>
            <p className="text-xs text-green-800 leading-relaxed">
              Aqidatul Awam adalah kitab tauhid ringkas berbentuk nadhom (syair) karya Syekh Ahmad al-Marzuqi al-Maliki yang berisi pokok-pokok akidah Islam.
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          {AQIDATUL_AWAM.map((item) => (
            <div key={item.bait} className="card-elevated p-8 space-y-6 hover:border-primary transition-all">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {item.bait}
                </span>
                <div className="h-[1px] flex-1 bg-border"></div>
              </div>
              <p className="text-3xl font-serif text-center leading-relaxed" dir="rtl">{item.arab}</p>
              <div className="space-y-3">
                <p className="text-sm font-medium italic text-primary text-center">{item.latin}</p>
                <p className="text-sm text-center text-muted-foreground leading-relaxed px-4">"{item.arti}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-10">
          <button className="btn-secondary">Lihat Selengkapnya</button>
        </div>
      </div>
    </AppLayout>
  );
}
