'use client';

import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import { Search, Heart, Share2, Copy, BookOpen, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

interface Doa {
  id: string;
  judul: string;
  arab: string;
  latin: string;
  terjemahan: string;
  kategori: string;
}

const DOA_DATA: Doa[] = [
  {
    id: 'doa-1',
    judul: 'Doa Sebelum Makan',
    arab: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma barik lana fima razaqtana waqina adzaban nar.',
    terjemahan: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.',
    kategori: 'Makan & Minum'
  },
  {
    id: 'doa-2',
    judul: 'Doa Sesudah Makan',
    arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    latin: 'Alhamdulillahilladzi ath\'amana wa saqana wa ja\'alana muslimin.',
    terjemahan: 'Segala puji bagi Allah yang telah memberi makan kami dan memberi minum kami, serta menjadikan kami orang-orang muslim.',
    kategori: 'Makan & Minum'
  },
  {
    id: 'doa-3',
    judul: 'Doa Sebelum Tidur',
    arab: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ',
    latin: 'Bismika Allahumma ahya wa amut.',
    terjemahan: 'Dengan nama-Mu ya Allah, aku hidup dan aku mati.',
    kategori: 'Tidur'
  },
  {
    id: 'doa-4',
    judul: 'Doa Bangun Tidur',
    arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: 'Alhamdulillahilladzi ahyana ba\'da ma amatana wa ilaihin nusyur.',
    terjemahan: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya-lah kami kembali.',
    kategori: 'Tidur'
  },
  {
    id: 'doa-5',
    judul: 'Doa Masuk Masjid',
    arab: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allahummaf-tahli abwaba rahmatik.',
    terjemahan: 'Ya Allah, bukakanlah bagiku pintu-pintu rahmat-Mu.',
    kategori: 'Ibadah'
  },
  {
    id: 'doa-6',
    judul: 'Doa Keluar Masjid',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allahumma inni as-aluka min fadhlika.',
    terjemahan: 'Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.',
    kategori: 'Ibadah'
  },
  {
    id: 'doa-7',
    judul: 'Doa Untuk Kedua Orang Tua',
    arab: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir li wa liwalidayya warhamhuma kama rabbayani shaghira.',
    terjemahan: 'Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka keduanya sebagaimana mereka berdua telah mendidik aku di waktu kecil.',
    kategori: 'Keluarga'
  },
  {
    id: 'doa-8',
    judul: 'Doa Kebaikan Dunia Akhirat',
    arab: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَة| حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah waqina adzaban-nar.',
    terjemahan: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    kategori: 'Umum'
  },
  {
    id: 'doa-9',
    judul: 'Doa Sebelum Belajar',
    arab: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    latin: 'Rabbi zidni \'ilman warzuqni fahma.',
    terjemahan: 'Ya Tuhanku, tambahkanlah kepadaku ilmu dan berilah aku pengertian yang baik.',
    kategori: 'Belajar'
  },
  {
    id: 'doa-10',
    judul: 'Doa Masuk Kamar Mandi',
    arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: 'Allahumma inni a\'udzu bika minal khubutsi wal khaba-its.',
    terjemahan: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.',
    kategori: 'Kebersihan'
  }
];

const KATEGORI_LIST = ['Semua', 'Ibadah', 'Makan & Minum', 'Tidur', 'Belajar', 'Keluarga', 'Kebersihan', 'Umum'];

export default function DoaHarianPage() {
  const [search, setSearch] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedDoa, setSelectedDoa] = useState<Doa | null>(null);

  const filteredDoa = useMemo(() => {
    return DOA_DATA.filter(doa => {
      const matchSearch = doa.judul.toLowerCase().includes(search.toLowerCase()) || 
                          doa.terjemahan.toLowerCase().includes(search.toLowerCase());
      const matchKategori = selectedKategori === 'Semua' || doa.kategori === selectedKategori;
      return matchSearch && matchKategori;
    });
  }, [search, selectedKategori]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    const isFav = !favorites.includes(id);
    toast.success(isFav ? 'Ditambahkan ke favorit' : 'Dihapus dari favorit', {
      icon: <Heart size={14} className={isFav ? 'fill-current' : ''} />
    });
  };

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success('Teks berhasil disalin');
  };

  // Randomize daily prayer on load (simulated)
  const doaHariIni = useMemo(() => DOA_DATA[Math.floor(Math.random() * DOA_DATA.length)], []);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Doa Harian</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Kumpulan doa-doa harian untuk siswa MI Islamiyah</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Cari doa..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Highlight: Doa Hari Ini */}
        {!search && selectedKategori === 'Semua' && (
          <div className="card-elevated overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-white to-primary-light/30">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Sparkles size={14} className="fill-current" />
                <span>Doa Hari Ini</span>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">{doaHariIni.judul}</h2>
                <p className="text-3xl font-serif text-right leading-loose py-4" dir="rtl">{doaHariIni.arab}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium italic text-primary">{doaHariIni.latin}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{doaHariIni.terjemahan}"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {KATEGORI_LIST.map(kat => (
            <button
              key={kat}
              onClick={() => setSelectedKategori(kat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                selectedKategori === kat 
                ? 'bg-primary text-white border-primary shadow-md' 
                : 'bg-white text-muted-foreground border-border hover:border-primary/50'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Grid Doa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoa.length > 0 ? (
            filteredDoa.map(doa => (
              <div 
                key={doa.id} 
                onClick={() => setSelectedDoa(doa)}
                className="card-elevated p-5 cursor-pointer hover:border-primary group transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-muted text-[10px] font-bold uppercase text-muted-foreground">
                        {doa.kategori}
                      </span>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{doa.judul}</h3>
                    </div>
                    <p className="text-xl font-serif text-right mb-4" dir="rtl">{doa.arab.slice(0, 50)}{doa.arab.length > 50 ? '...' : ''}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 italic">"{doa.terjemahan}"</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => toggleFavorite(doa.id, e)}
                      className={`p-2 rounded-lg transition-all ${favorites.includes(doa.id) ? 'text-red-500 bg-red-50' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                      <Heart size={16} className={favorites.includes(doa.id) ? 'fill-current' : ''} />
                    </button>
                    <button 
                      onClick={(e) => copyToClipboard(doa.arab, e)}
                      className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Search size={24} />
              </div>
              <div className="space-y-1">
                <p className="font-bold">Doa tidak ditemukan</p>
                <p className="text-sm text-muted-foreground">Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Detail Doa */}
        {selectedDoa && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setSelectedDoa(null)}
            />
            <div className="modal-content max-w-2xl relative z-10">
              <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  <span className="text-sm font-bold uppercase tracking-wider">{selectedDoa.kategori}</span>
                </div>
                <button 
                  onClick={() => setSelectedDoa(null)}
                  className="p-1 rounded-lg hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center">{selectedDoa.judul}</h2>
                
                <div className="space-y-6">
                  <div className="bg-primary/5 p-8 rounded-2xl">
                    <p className="text-4xl font-serif text-center leading-[1.8]" dir="rtl">{selectedDoa.arab}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">Latin</p>
                      <p className="text-lg font-medium italic leading-relaxed text-foreground/80">{selectedDoa.latin}</p>
                    </div>
                    
                    <div className="space-y-1 pt-4 border-t">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">Terjemahan</p>
                      <p className="text-lg leading-relaxed">{selectedDoa.terjemahan}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-6">
                  <button 
                    onClick={(e) => toggleFavorite(selectedDoa.id, e)}
                    className={`btn-secondary gap-2 px-6 ${favorites.includes(selectedDoa.id) ? 'text-red-500 border-red-100 bg-red-50' : ''}`}
                  >
                    <Heart size={18} className={favorites.includes(selectedDoa.id) ? 'fill-current' : ''} />
                    {favorites.includes(selectedDoa.id) ? 'Favorit' : 'Jadikan Favorit'}
                  </button>
                  <button 
                    onClick={(e) => copyToClipboard(`${selectedDoa.judul}\n\n${selectedDoa.arab}\n\n${selectedDoa.terjemahan}`, e)}
                    className="btn-primary gap-2 px-6"
                  >
                    <Share2 size={18} />
                    Bagikan Doa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
