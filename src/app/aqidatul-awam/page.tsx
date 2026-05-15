'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { BookOpen, ChevronLeft, ChevronRight, Info, Music, Volume2 } from 'lucide-react';

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
  { 
    bait: 4, 
    arab: 'وَآلِهِ وَصَحْبِهِ وَمَنْ تَبِعْ * سَبِيْلَ دِيْنِ الْحَقِّ غَيْرَ مُبْتَدِعْ', 
    latin: 'Wa alihi wa shahbihi wa man tabi\' * sabila dinil haqqi ghaira mubtadi\'', 
    arti: 'Dan keluarganya, para sahabatnya dan orang-orang yang mengikuti jalan agama yang benar (Al-Islam) bukan orang-orang yang membuat bid\'ah.' 
  },
  { 
    bait: 5, 
    arab: 'وَبَعْدُ فَاعْلَمْ بِوُجُوْبِ الْمَعْرِفَهْ * مِنْ وَاجِبٍ لِلَّهِ عِشْرِيْنَ صِفَهْ', 
    latin: 'Wa ba\'du fa\'lam biwujubil ma\'rifah * min wajibin lillahi \'isyrina shifah', 
    arti: 'Dan setelah itu, maka ketahuilah dengan kewajiban makrifat (mengenal Allah), dari sifat-sifat yang wajib bagi Allah sebanyak dua puluh sifat.' 
  },
  { 
    bait: 6, 
    arab: 'فَاللهُ مَوْجُوْدٌ قَدِيْمٌ بَاقِي * مُخَالِفٌ لِلْخَلْقِ بِاْلإِطْلَاقِ', 
    latin: 'Fallahu maujudun qadimun baqi * mukhalifun lilkhalqi bil ithlaqi', 
    arti: 'Maka Allah itu Ada, Maha Dahulu, Maha Kekal, berbeda dengan makhluk-Nya secara mutlak.' 
  },
  { 
    bait: 7, 
    arab: 'وَقَائِمٌ غَنِيْ وَوَاحِدٌ وَحَيّ * قَادِرْ مُرِيْدٌ عَالِمٌ بِكُلِّ شَيْ', 
    latin: 'Wa qa-imun ghani wa wahidun wa hayy * qadir muridun \'alimun bikulli syay', 
    arti: 'Dan berdiri sendiri, Maha Kaya, Maha Esa, Maha Hidup, Maha Kuasa, Maha Berkehendak, Maha Mengetahui atas segala sesuatu.' 
  },
  { 
    bait: 8, 
    arab: 'سَمِيْعٌ الْبَصِيْرُ وَالْمُتَكَلِّمُ * لَهُ صِفَاتٌ سَبْعَةٌ تَنْتَظِمُ', 
    latin: 'Sami\'unil bashiru wal mutakallimu * lahu shifatun sab\'atun tantadzimu', 
    arti: 'Maha Mendengar, Maha Melihat dan Maha Berbicara, bagi-Nya ada tujuh sifat (ma\'ani) yang tersusun rapi.' 
  },
  { 
    bait: 9, 
    arab: 'فَقُدْرَةٌ إِرَادَةٌ سَمْعٌ بَصَرْ * حَيَاةٌ الْعِلْمُ كَلَامٌ اسْتَمَرْ', 
    latin: 'Faqudratun iradatun sam\'un bashar * hayatunil \'ilmu kalamun istamar', 
    arti: 'Yaitu: Kuasa, Berkehendak, Mendengar, Melihat, Hidup, Ilmu, dan Berbicara yang terus menerus.' 
  },
  { 
    bait: 10, 
    arab: 'وَجَائِزٌ بِفَضْلِهِ وَعَدْلِهِ * تَرْكٌ لِكُلِّ مُمْكِنٍ كَفِعْلِهِ', 
    latin: 'Wa ja-izun bifadhlihi wa \'adlihi * tarkun likulli mumkinin kafi\'lihi', 
    arti: 'Dan diperbolehkan (bagi Allah) dengan karunia dan keadilan-Nya, meninggalkan segala kemungkinan (menciptakan makhluk) sebagaimana perbuatan-Nya.' 
  }
];

export default function AqidatulAwamPage() {
  const [activeBait, setActiveBait] = useState(0);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Aqidatul Awam</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pelajari pokok-pokok akidah Islam melalui bait-bait syair yang indah karya Syekh Ahmad al-Marzuqi.
          </p>
        </div>

        {/* Reader Mode Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar (Desktop) */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
            {AQIDATUL_AWAM.map((item, index) => (
              <button
                key={item.bait}
                onClick={() => setActiveBait(index)}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  activeBait === index 
                  ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                  : 'bg-white border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${activeBait === index ? 'text-white/70' : 'text-muted-foreground'}`}>
                    Bait {item.bait}
                  </span>
                </div>
                <p className={`text-sm font-medium mt-1 truncate ${activeBait === index ? 'text-white' : 'text-foreground'}`}>
                  {item.latin.split('*')[0]}
                </p>
              </button>
            ))}
          </div>

          {/* Main Focus Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="card-elevated p-8 sm:p-12 space-y-10 relative overflow-hidden bg-gradient-to-b from-white to-primary-light/10 min-h-[500px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="text-9xl font-black">{AQIDATUL_AWAM[activeBait].bait}</span>
              </div>

              <div className="space-y-12 relative z-10">
                {/* Arabic Content */}
                <div className="space-y-8">
                  <p className="text-4xl sm:text-5xl font-serif text-center leading-[2] text-foreground" dir="rtl">
                    {AQIDATUL_AWAM[activeBait].arab}
                  </p>
                </div>

                {/* Interpretation */}
                <div className="space-y-8 pt-8 border-t border-primary/10">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest text-center">Transliterasi</p>
                    <p className="text-xl font-medium italic text-center text-foreground/80 leading-relaxed px-4">
                      {AQIDATUL_AWAM[activeBait].latin}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest text-center">Terjemahan</p>
                    <p className="text-lg text-center text-muted-foreground leading-relaxed px-8 italic">
                      "{AQIDATUL_AWAM[activeBait].arti}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Global Controls */}
            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => setActiveBait(prev => Math.max(0, prev - 1))}
                disabled={activeBait === 0}
                className="flex-1 btn-secondary gap-2 h-14 rounded-2xl disabled:opacity-30"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
              
              <div className="px-6 py-2 bg-muted rounded-xl text-sm font-bold">
                {activeBait + 1} / {AQIDATUL_AWAM.length}
              </div>

              <button 
                onClick={() => setActiveBait(prev => Math.min(AQIDATUL_AWAM.length - 1, prev + 1))}
                disabled={activeBait === AQIDATUL_AWAM.length - 1}
                className="flex-1 btn-primary gap-2 h-14 rounded-2xl disabled:opacity-30"
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-elevated p-6 bg-muted/30 border-dashed border-2 flex items-center gap-4">
          <Info className="text-primary flex-shrink-0" size={24} />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Tips Belajar:</strong> Fokuslah pada satu bait setiap hari untuk memahami maknanya secara mendalam. 
            Aqidatul Awam mencakup 50 sifat wajib, mustahil, dan jaiz bagi Allah serta Rasul-Nya.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
