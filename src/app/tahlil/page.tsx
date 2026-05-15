'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Wind, BookOpen, Share2 } from 'lucide-react';

const TAHLIL_CONTENT = [
  { id: 1, judul: 'Surah Al-Ikhlas (3x)', arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ . اللَّهُ الصَّمَدُ . لَمْ يَلِدْ وَلَمْ يُولَدْ . وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', arti: 'Katakanlah: Dia-lah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan, dan tidak ada seorangpun yang setara dengan Dia.' },
  { id: 2, judul: 'Surah Al-Falaq', arab: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ . مِنْ شَرِّ مَا خَلَقَ . وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ . وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ . وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ', arti: 'Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita tukang sihir yang menumbuk pada buhul-buhul, dan dari kejahatan pendengki bila ia dengki.' },
  { id: 3, judul: 'Surah An-Nas', arab: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ . مَلِكِ النَّاسِ . إِلَهِ النَّاسِ . مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ . الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ . مِنَ الْجِنَّةِ وَالنَّاسِ', arti: 'Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.' },
  { id: 4, judul: 'Kalimat Tahlil', arab: 'لَا إِلَهَ إِلَّا اللهُ', arti: 'Tiada Tuhan selain Allah.' }
];

export default function TahlilPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="card-elevated p-8 bg-gradient-to-r from-primary to-green-600 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h1 className="text-3xl font-bold">Bacaan Tahlil</h1>
            <p className="opacity-90">Kumpulan dzikir dan doa untuk ahli kubur</p>
          </div>
          <Wind className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10" />
        </div>

        <div className="space-y-4">
          {TAHLIL_CONTENT.map((item) => (
            <div key={item.id} className="card-elevated p-6 space-y-4 hover:border-primary transition-all">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary">{item.judul}</h3>
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Share2 size={16} /></button>
              </div>
              <p className="text-3xl font-serif text-right leading-loose" dir="rtl">{item.arab}</p>
              <div className="p-4 bg-muted/30 rounded-xl">
                <p className="text-sm text-muted-foreground leading-relaxed">"{item.arti}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-border">
          <p className="text-muted-foreground italic">Daftar bacaan tahlil lengkap sedang dalam proses pembaruan...</p>
        </div>
      </div>
    </AppLayout>
  );
}
