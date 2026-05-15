'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Wind, BookOpen, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const TAHLIL_DATA = [
  { id: 1, judul: 'Surah Al-Fatihah', arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ . الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ . الرَّحْمَنِ الرَّحِيمِ . مَالِكِ يَوْمِ الدِّينِ . إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ . اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ . صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', arti: 'Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam...' },
  { id: 2, judul: 'Surah Al-Ikhlas (3x)', arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ . اللَّهُ الصَّمَدُ . لَمْ يَلِدْ وَلَمْ يُولَدْ . وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', arti: 'Katakanlah: Dia-lah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu...' },
  { id: 3, judul: 'Surah Al-Falaq', arab: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ . مِنْ شَرِّ مَا خَلَقَ . وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ . وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ . وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ', arti: 'Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya...' },
  { id: 4, judul: 'Surah An-Nas', arab: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ . مَلِكِ النَّاسِ . إِلَهِ النَّاسِ . مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ . الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ . مِنَ الْجِنَّةِ وَالنَّاسِ', arti: 'Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia...' },
  { id: 5, judul: 'Tahlil', arab: 'لَا إِلَهَ إِلَّا اللهُ', arti: 'Tiada Tuhan selain Allah.' },
  { id: 6, judul: 'Sholawat Nabi', arab: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ', arti: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan keluarganya.' },
  { id: 7, judul: 'Doa Penutup', arab: 'اَللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ', arti: 'Ya Allah, ampunilah mereka, sayangilah mereka, sejahterakanlah mereka dan maafkanlah mereka.' }
];

export default function TahlilPage() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Teks disalin');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-10 space-y-3">
          <h1 className="text-4xl font-black text-emerald-900">Bacaan Tahlil</h1>
          <p className="text-emerald-600 font-medium">Satu Halaman Lengkap</p>
        </div>

        <div className="space-y-6 pb-20">
          {TAHLIL_DATA.map((item) => (
            <div key={item.id} className="card-elevated p-8 sm:p-10 space-y-6 bg-white border-emerald-50 hover:border-emerald-200 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    {item.id}
                  </span>
                  <h3 className="font-bold text-emerald-900 text-lg">{item.judul}</h3>
                </div>
                <button onClick={() => handleCopy(item.arab)} className="text-emerald-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition-all">
                  <Share2 size={18} />
                </button>
              </div>

              <p className="text-4xl sm:text-5xl font-serif text-right leading-[2.2] text-slate-800 py-4" dir="rtl">
                {item.arab}
              </p>

              <div className="pt-6 border-t border-emerald-50">
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Terjemahan</p>
                <p className="text-lg text-slate-600 leading-relaxed italic">
                  "{item.arti}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <Wind size={24} />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
