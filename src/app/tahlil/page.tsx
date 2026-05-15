'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Wind, BookOpen, Share2, ChevronRight, ChevronLeft, Heart, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

const TAHLIL_DATA = [
  { 
    id: 1, 
    judul: 'Al-Fatihah', 
    deskripsi: 'Dihadiahkan kepada Baginda Nabi Muhammad SAW',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ . الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ . الرَّحْمَنِ الرَّحِيمِ . مَالِكِ يَوْمِ الدِّينِ . إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ . اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ . صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', 
    latin: 'Bismillahir-rahmanir-rahim. Alhamdu lillahi rabbil-\'alamin...',
    arti: 'Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam...' 
  },
  { 
    id: 2, 
    judul: 'Al-Ikhlas (3x)', 
    deskripsi: 'Membaca Surah Al-Ikhlas sebanyak tiga kali',
    arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ . اللَّهُ الصَّمَدُ . لَمْ يَلِدْ وَلَمْ يُولَدْ . وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', 
    arti: 'Katakanlah: Dia-lah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu...' 
  },
  { 
    id: 3, 
    judul: 'Tahlil', 
    deskripsi: 'Kalimat Tauhid',
    arab: 'لَا إِلَهَ إِلَّا اللهُ', 
    arti: 'Tiada Tuhan selain Allah.' 
  },
  { 
    id: 4, 
    judul: 'Doa Arwah', 
    deskripsi: 'Penutup rangkaian Tahlil',
    arab: 'اَللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ', 
    arti: 'Ya Allah, ampunilah mereka, sayangilah mereka, sejahterakanlah mereka dan maafkanlah mereka.' 
  }
];

export default function TahlilPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Teks berhasil disalin');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Elegant Header */}
        <div className="relative h-48 rounded-[2rem] overflow-hidden flex items-center px-8 sm:px-12 bg-emerald-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] -ml-32 -mb-32"></div>
          </div>
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 text-emerald-300 text-[10px] font-bold uppercase tracking-widest border border-emerald-700/50">
              <Wind size={12} />
              <span>Bacaan Ibadah</span>
            </div>
            <h1 className="text-4xl font-black text-white">Tahlil</h1>
            <p className="text-emerald-100/70 text-sm">Rangkaian dzikir dan doa untuk ahli kubur.</p>
          </div>
          <BookOpen className="absolute right-12 text-white/5 w-40 h-40" />
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 px-2 overflow-x-auto pb-2 scrollbar-hide">
          {TAHLIL_DATA.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveStep(index)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeStep === index 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' 
                : 'bg-white text-muted-foreground border-border hover:border-emerald-200'
              }`}
            >
              {item.id}. {item.judul}
            </button>
          ))}
        </div>

        {/* Reader Card */}
        <div className="card-elevated p-8 sm:p-12 space-y-8 bg-white border-emerald-100 min-h-[400px]">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-emerald-900">{TAHLIL_DATA[activeStep].judul}</h2>
            <p className="text-sm text-emerald-600/70">{TAHLIL_DATA[activeStep].deskripsi}</p>
          </div>

          <div className="py-8 border-y border-emerald-50">
            <p className="text-4xl font-serif text-right leading-[2] text-slate-800" dir="rtl">
              {TAHLIL_DATA[activeStep].arab}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="h-[1px] flex-1 bg-emerald-100"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Terjemahan</span>
              <div className="h-[1px] flex-1 bg-emerald-100"></div>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed italic text-center">
              "{TAHLIL_DATA[activeStep].arti}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-6">
            <button 
              onClick={() => handleCopy(TAHLIL_DATA[activeStep].arab)}
              className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Share2 size={14} />
              Salin Bacaan
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="p-2 rounded-full hover:bg-emerald-50 text-emerald-600 disabled:opacity-20 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setActiveStep(prev => Math.min(TAHLIL_DATA.length - 1, prev + 1))}
                disabled={activeStep === TAHLIL_DATA.length - 1}
                className="p-3 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:scale-110 active:scale-95 disabled:opacity-20 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
