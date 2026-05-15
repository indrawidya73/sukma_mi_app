'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Waves, Heart, Shield } from 'lucide-react';

const ISTIGHOTSAH_CONTENT = [
  { id: 1, arab: 'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ', latin: 'Astaghfirullahal \'adzhim', arti: 'Saya mohon ampun kepada Allah Yang Maha Agung.' },
  { id: 2, arab: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيْمِ', latin: 'La hawla wala quwwata illa billahil \'aliyyil \'adzhim', arti: 'Tiada daya dan kekuatan kecuali dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung.' },
  { id: 3, arab: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ', latin: 'Ya Hayyu ya Qayyum birahmatika astaghits', arti: 'Wahai Dzat Yang Maha Hidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan.' },
  { id: 4, arab: 'يَا لَطِيْفُ', latin: 'Ya Latif', arti: 'Wahai Dzat Yang Maha Lembut.' }
];

export default function IstighotsahPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Waves size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Istighotsah</h1>
            <p className="text-muted-foreground">Memohon pertolongan kepada Allah SWT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {ISTIGHOTSAH_CONTENT.map((item) => (
            <div key={item.id} className="card-elevated p-8 space-y-6 hover:shadow-xl transition-all border-l-4 border-l-primary">
              <p className="text-4xl font-serif text-center leading-relaxed" dir="rtl">{item.arab}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-border"></div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Arti & Transliterasi</span>
                  <div className="h-[1px] flex-1 bg-border"></div>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-sm font-medium italic text-primary">{item.latin}</p>
                  <p className="text-sm text-muted-foreground">"{item.arti}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-elevated p-6 bg-muted/30 border-dashed border-2 flex flex-col items-center text-center space-y-3">
          <Shield className="text-primary/40" size={32} />
          <div className="space-y-1">
            <p className="font-bold text-sm">Fadhilah Istighotsah</p>
            <p className="text-xs text-muted-foreground max-w-sm">
              Istighotsah adalah doa kolektif untuk memohon pertolongan Allah dalam menghadapi kesulitan dan bencana, serta mendekatkan diri kepada-Nya.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
