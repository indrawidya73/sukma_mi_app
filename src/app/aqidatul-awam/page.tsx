'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { BookOpen, Info, ScrollText } from 'lucide-react';

const AQIDATUL_AWAM = [
  { bait: 1, arab: 'أَبْدَأُ بِاسْمِ اللهِ وَالرَّحْمَنِ * وَبِالرَّحِيْمِ دَائِمِ اْلإِحْسَانِ', latin: 'Abda-u bismillahi warrahmani * wa birrahimi da-imil ihsani', arti: 'Saya memulai dengan nama Allah, Dzat yang Maha Pengasih, dan dengan Dzat yang Maha Penyayang yang senantiasa memberikan kebaikan.' },
  { bait: 2, arab: 'فَالْحَمْدُ لِلَّهِ الْقَدِيْمِ اْلأَوَّلِ * اْلآخِرِ الْبَاقِي بِلَا تَحَوُّلِ', latin: 'Falhamdulillahil qadimil awwali * al-akhiril baqi bila tahawwuli', arti: 'Maka segala puji bagi Allah Dzat yang Maha Dahulu, yang Paling Awal, yang Akhir, yang Kekal tanpa perubahan.' },
  { bait: 3, arab: 'ثُمَّ الصَّلَاةُ وَالسَّلَامُ سَرْمَدَا * عَلَى النَّبِيِّ خَيْرِ مَنْ قَدْ وَحَّدَا', latin: 'Tsummash-shalatu wassalamu sarmada * \'alan-nabiyyi khairi man qad wahhada', arti: 'Kemudian rahmat dan salam semoga senantiasa tercurah atas Nabi, sebaik-baik orang yang benar-benar mengesakan Allah.' },
  { bait: 4, arab: 'وَآلِهِ وَصَحْبِهِ وَمَنْ تَبِعْ * سَبِيْلَ دِيْنِ الْحَقِّ غَيْرَ مُبْتَدِعْ', latin: 'Wa alihi wa shahbihi wa man tabi\' * sabila dinil haqqi ghaira mubtadi\'', arti: 'Dan keluarganya, para sahabatnya dan orang-orang yang mengikuti jalan agama yang benar (Al-Islam) bukan orang-orang yang membuat bid\'ah.' },
  { bait: 5, arab: 'وَبَعْدُ فَاعْلَمْ بِوُجُوْبِ الْمَعْرِفَهْ * مِنْ وَاجِبٍ لِلَّهِ عِشْرِيْنَ صِفَهْ', latin: 'Wa ba\'du fa\'lam biwujubil ma\'rifah * min wajibin lillahi \'isyrina shifah', arti: 'Dan setelah itu, maka ketahuilah dengan kewajiban makrifat (mengenal Allah), dari sifat-sifat yang wajib bagi Allah sebanyak dua puluh sifat.' },
  { bait: 6, arab: 'فَاللهُ مَوْجُوْدٌ قَدِيْمٌ بَاقِي * مُخَالِفٌ لِلْخَلْقِ بِاْلإِطْلَاقِ', latin: 'Fallahu maujudun qadimun baqi * mukhalifun lilkhalqi bil ithlaqi', arti: 'Maka Allah itu Ada, Maha Dahulu, Maha Kekal, berbeda dengan makhluk-Nya secara mutlak.' },
  { bait: 7, arab: 'وَقَائِمٌ غَنِيْ وَوَاحِدٌ وَحَيّ * قَادِرْ مُرِيْدٌ عَالِمٌ بِكُلِّ شَيْ', latin: 'Wa qa-imun ghani wa wahidun wa hayy * qadir muridun \'alimun bikulli syay', arti: 'Dan berdiri sendiri, Maha Kaya, Maha Esa, Maha Hidup, Maha Kuasa, Maha Berkehendak, Maha Mengetahui atas segala sesuatu.' },
  { bait: 8, arab: 'سَمِيْعٌ الْبَصِيْرُ وَالْمُتَكَلِّمُ * لَهُ صِفَاتٌ سَبْعَةٌ تَنْتَظِمُ', latin: 'Sami\'unil bashiru wal mutakallimu * lahu shifatun sab\'atun tantadzimu', arti: 'Maha Mendengar, Maha Melihat dan Maha Berbicara, bagi-Nya ada tujuh sifat (ma\'ani) yang tersusun rapi.' },
  { bait: 9, arab: 'فَقُدْرَةٌ إِرَادَةٌ سَمْعٌ بَصَرْ * حَيَاةٌ الْعِلْمُ كَلَامٌ اسْتَمَرْ', latin: 'Faqudratun iradatun sam\'un bashar * hayatunil \'ilmu kalamun istamar', arti: 'Yaitu: Kuasa, Berkehendak, Mendengar, Melihat, Hidup, Ilmu, dan Berbicara yang terus menerus.' },
  { bait: 10, arab: 'وَجَائِزٌ بِفَضْلِهِ وَعَدْلِهِ * تَرْكٌ لِكُلِّ مُمْكِنٍ كَفِعْلِهِ', latin: 'Wa ja-izun bifadhlihi wa \'adlihi * tarkun likulli mumkinin kafi\'lihi', arti: 'Dan diperbolehkan (bagi Allah) dengan karunia dan keadilan-Nya, meninggalkan segala kemungkinan (menciptakan makhluk) sebagaimana perbuatan-Nya.' }
];

export default function AqidatulAwamPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <ScrollText size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Aqidatul Awam</h1>
          <p className="text-muted-foreground">Satu Halaman Lengkap (Scroll untuk Membaca)</p>
        </div>

        <div className="space-y-4">
          {AQIDATUL_AWAM.map((item) => (
            <div key={item.bait} className="card-elevated p-8 space-y-6 hover:shadow-xl transition-all border-l-4 border-l-primary bg-white">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                  Bait {item.bait}
                </span>
                <div className="h-[1px] flex-1 bg-border"></div>
              </div>

              <div className="space-y-6">
                <p className="text-3xl sm:text-4xl font-serif text-center leading-[2] text-slate-900" dir="rtl">
                  {item.arab}
                </p>
                
                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest text-center">Latin</p>
                    <p className="text-lg font-medium italic text-center text-slate-600 leading-relaxed">
                      {item.latin}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest text-center">Terjemahan</p>
                    <p className="text-base text-center text-slate-500 leading-relaxed px-6 italic">
                      "{item.arti}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 text-center bg-primary/5 rounded-3xl border border-dashed border-primary/20 flex flex-col items-center gap-3">
          <BookOpen className="text-primary/40" size={32} />
          <p className="text-sm text-primary/70 font-medium italic">Alhamdulillah, khatam bacaan Aqidatul Awam.</p>
        </div>
      </div>
    </AppLayout>
  );
}
