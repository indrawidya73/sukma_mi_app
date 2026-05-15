'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { toast } from 'sonner';
import AppLayout from '@/components/AppLayout';
import { Star, Plus, Search, Trash2, CheckCircle, XCircle, TrendingUp, TrendingDown, User, BookOpen, Award } from 'lucide-react';

interface PoinEntry {
  id: string;
  siswaId: string;
  namaSiswa: string;
  kelas: string;
  tanggal: string;
  kategori: string;
  perilaku: string;
  jenis: 'positif' | 'negatif';
  poin: number;
  dicatatOleh: string;
}

interface BehaviorItem {
  perilaku: string;
  poin: number;
  jenis: 'positif' | 'negatif';
}

interface BehaviorCategory {
  kategori: string;
  items: BehaviorItem[];
}

const behaviorCategories: BehaviorCategory[] = [
  {
    kategori: 'Keimanan & Ibadah',
    items: [
      { perilaku: 'Terlambat masuk aula sholat Dhuha', poin: -20, jenis: 'negatif' },
      { perilaku: 'Terlambat ke aula sholat Dhuhur', poin: -20, jenis: 'negatif' },
      { perilaku: 'Tidak mengikuti dzikir dan doa pagi', poin: -20, jenis: 'negatif' },
      { perilaku: 'Mengganggu teman saat sholat', poin: -20, jenis: 'negatif' },
      { perilaku: 'Membuat keributan di aula/masjid', poin: -20, jenis: 'negatif' },
      { perilaku: 'Tidak mengikuti murojaah dan hafalan', poin: -20, jenis: 'negatif' },
      { perilaku: 'Membiasakan salam saat masuk/keluar kelas', poin: 5, jenis: 'positif' },
      { perilaku: 'Bersyukur atas nikmat yang diterima', poin: 5, jenis: 'positif' },
      { perilaku: 'Rajin sholat dan beribadah', poin: 5, jenis: 'positif' },
      { perilaku: 'Berdoa sebelum makan dan minum', poin: 5, jenis: 'positif' },
    ],
  },
  {
    kategori: 'Kedisiplinan',
    items: [
      { perilaku: 'Terlambat masuk sekolah tanpa izin', poin: -10, jenis: 'negatif' },
      { perilaku: 'Berseragam tidak sesuai ketentuan', poin: -10, jenis: 'negatif' },
      { perilaku: 'Tidak mengikuti upacara bendera', poin: -10, jenis: 'negatif' },
      { perilaku: 'Tidak membawa perlengkapan belajar lengkap', poin: -10, jenis: 'negatif' },
      { perilaku: 'Tepat waktu datang ke sekolah', poin: 5, jenis: 'positif' },
      { perilaku: 'Rajin belajar dan mengerjakan tugas', poin: 5, jenis: 'positif' },
      { perilaku: 'Menjaga amanah yang diberikan guru', poin: 5, jenis: 'positif' },
      { perilaku: 'Rajin menyelesaikan PR', poin: 5, jenis: 'positif' },
      { perilaku: 'Mengikuti ekstrakurikuler sesuai jadwal', poin: 5, jenis: 'positif' },
    ],
  },
  {
    kategori: 'Kebersihan & Kerapian',
    items: [
      { perilaku: 'Membuang sampah sembarangan', poin: -10, jenis: 'negatif' },
      { perilaku: 'Melepas sepatu/sandal sembarangan', poin: -10, jenis: 'negatif' },
      { perilaku: 'Mencoret meja, kursi, atau dinding sekolah', poin: -10, jenis: 'negatif' },
      { perilaku: 'Tidak merapikan buku dan peralatan', poin: -10, jenis: 'negatif' },
      { perilaku: 'Membantu menjaga fasilitas sekolah', poin: 5, jenis: 'positif' },
      { perilaku: 'Membuang sampah pada tempatnya', poin: 5, jenis: 'positif' },
      { perilaku: 'Menjaga kebersihan diri dan lingkungan', poin: 5, jenis: 'positif' },
    ],
  },
  {
    kategori: 'Tata Krama & Sopan Santun',
    items: [
      { perilaku: 'Berbicara kasar kepada teman/guru', poin: -20, jenis: 'negatif' },
      { perilaku: 'Mengejek atau memanggil teman dengan julukan buruk', poin: -30, jenis: 'negatif' },
      { perilaku: 'Tidak mengucapkan salam atau terima kasih', poin: -20, jenis: 'negatif' },
      { perilaku: 'Memotong pembicaraan orang lain dengan kasar', poin: -20, jenis: 'negatif' },
      { perilaku: 'Berbicara kotor/jorok', poin: -20, jenis: 'negatif' },
      { perilaku: 'Menghormati orang tua dan guru', poin: 5, jenis: 'positif' },
      { perilaku: 'Berbicara sopan kepada semua orang', poin: 5, jenis: 'positif' },
      { perilaku: 'Ramah kepada teman baru', poin: 5, jenis: 'positif' },
      { perilaku: 'Sabar menghadapi masalah kecil', poin: 5, jenis: 'positif' },
    ],
  },
  {
    kategori: 'Keamanan & Ketertiban',
    items: [
      { perilaku: 'Berlari di koridor dengan berbahaya', poin: -30, jenis: 'negatif' },
      { perilaku: 'Bermain kasar yang bisa melukai teman', poin: -10, jenis: 'negatif' },
      { perilaku: 'Membawa barang terlarang (petasan, senjata mainan)', poin: -30, jenis: 'negatif' },
      { perilaku: 'Mendorong, memukul, atau mem-bully teman', poin: -30, jenis: 'negatif' },
      { perilaku: 'Tidak mengejek atau mem-bully teman', poin: 5, jenis: 'positif' },
      { perilaku: 'Antri tertib di kantin atau toilet', poin: 5, jenis: 'positif' },
      { perilaku: 'Menjaga ketenangan saat guru menjelaskan', poin: 5, jenis: 'positif' },
      { perilaku: 'Ikut menjaga kebersihan kelas dan sekolah', poin: 5, jenis: 'positif' },
    ],
  },
  {
    kategori: 'Kejujuran & Tanggung Jawab',
    items: [
      { perilaku: 'Mencontek saat ujian', poin: -10, jenis: 'negatif' },
      { perilaku: 'Mengambil barang teman tanpa izin', poin: -10, jenis: 'negatif' },
      { perilaku: 'Tidak mengerjakan PR', poin: -10, jenis: 'negatif' },
      { perilaku: 'Tidak mengakui kesalahan yang diperbuat', poin: -10, jenis: 'negatif' },
      { perilaku: 'Adil dan tidak pilih kasih kepada teman', poin: 5, jenis: 'positif' },
      { perilaku: 'Memaafkan teman yang berbuat salah', poin: 5, jenis: 'positif' },
      { perilaku: 'Suka membantu teman yang membutuhkan', poin: 5, jenis: 'positif' },
      { perilaku: 'Jujur dalam perkataan dan perbuatan', poin: 5, jenis: 'positif' },
    ],
  },
];

const mockPoinEntries: PoinEntry[] = [
  { id: 'p001', siswaId: 'siswa-001', namaSiswa: 'Muhammad Hafidz Al-Farisi', kelas: '4A', tanggal: '2025-05-10', kategori: 'Keimanan & Ibadah', perilaku: 'Rajin sholat dan beribadah', jenis: 'positif', poin: 5, dicatatOleh: 'Ibu Sari Dewi' },
  { id: 'p002', siswaId: 'siswa-002', namaSiswa: 'Aulia Rahmadani Putri', kelas: '3A', tanggal: '2025-05-10', kategori: 'Kedisiplinan', perilaku: 'Tepat waktu datang ke sekolah', jenis: 'positif', poin: 5, dicatatOleh: 'Ibu Nurul Hidayah' },
  { id: 'p003', siswaId: 'siswa-003', namaSiswa: 'Farhan Ardiansyah', kelas: '5B', tanggal: '2025-05-09', kategori: 'Tata Krama & Sopan Santun', perilaku: 'Berbicara kasar kepada teman/guru', jenis: 'negatif', poin: -20, dicatatOleh: 'Pak Agus Wahyudi' },
  { id: 'p004', siswaId: 'siswa-004', namaSiswa: 'Zahra Putri Andini', kelas: '6A', tanggal: '2025-05-09', kategori: 'Kejujuran & Tanggung Jawab', perilaku: 'Jujur dalam perkataan dan perbuatan', jenis: 'positif', poin: 5, dicatatOleh: 'Ibu Fatimah Zahra' },
  { id: 'p005', siswaId: 'siswa-005', namaSiswa: 'Rizki Maulana Putra', kelas: '3B', tanggal: '2025-05-08', kategori: 'Keamanan & Ketertiban', perilaku: 'Berlari di koridor dengan berbahaya', jenis: 'negatif', poin: -30, dicatatOleh: 'Pak Rudi Hartono' },
  { id: 'p006', siswaId: 'siswa-007', namaSiswa: 'Ilham Ramadhan Saputra', kelas: '4A', tanggal: '2025-05-08', kategori: 'Kebersihan & Kerapian', perilaku: 'Membuang sampah pada tempatnya', jenis: 'positif', poin: 5, dicatatOleh: 'Ibu Sari Dewi' },
  { id: 'p007', siswaId: 'siswa-009', namaSiswa: 'Bagas Wicaksono Hadi', kelas: '4A', tanggal: '2025-05-07', kategori: 'Kedisiplinan', perilaku: 'Terlambat masuk sekolah tanpa izin', jenis: 'negatif', poin: -10, dicatatOleh: 'Ibu Sari Dewi' },
  { id: 'p008', siswaId: 'siswa-012', namaSiswa: 'Putri Ayu Lestari', kelas: '5A', tanggal: '2025-05-07', kategori: 'Keimanan & Ibadah', perilaku: 'Membiasakan salam saat masuk/keluar kelas', jenis: 'positif', poin: 5, dicatatOleh: 'Ibu Rina Kusuma' },
];

const mockSiswa = [
  { id: 'siswa-001', nama: 'Muhammad Hafidz Al-Farisi', kelas: '4A' },
  { id: 'siswa-002', nama: 'Aulia Rahmadani Putri', kelas: '3A' },
  { id: 'siswa-003', nama: 'Farhan Ardiansyah', kelas: '5B' },
  { id: 'siswa-004', nama: 'Zahra Putri Andini', kelas: '6A' },
  { id: 'siswa-005', nama: 'Rizki Maulana Putra', kelas: '3B' },
  { id: 'siswa-006', nama: 'Siti Aisyah Nurhaliza', kelas: '2B' },
  { id: 'siswa-007', nama: 'Ilham Ramadhan Saputra', kelas: '4A' },
  { id: 'siswa-008', nama: 'Nisa Fauziah Ramadhani', kelas: '3A' },
  { id: 'siswa-009', nama: 'Bagas Wicaksono Hadi', kelas: '4A' },
  { id: 'siswa-010', nama: 'Dinda Rahmawati Sari', kelas: '6B' },
  { id: 'siswa-011', nama: 'Ahmad Zulfikar Hakim', kelas: '1B' },
  { id: 'siswa-012', nama: 'Putri Ayu Lestari', kelas: '5A' },
  { id: 'siswa-013', nama: 'Farid Hidayatullah', kelas: '2A' },
];

export default function PoinPerilakuPage() {
  const [entries, setEntries] = useState<PoinEntry[]>(mockPoinEntries);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [filterKategori, setFilterKategori] = useState('Semua');

  // Form state
  const [formSiswa, setFormSiswa] = useState('');
  const [formKategori, setFormKategori] = useState('');
  const [formPerilaku, setFormPerilaku] = useState('');
  const [formTanggal, setFormTanggal] = useState(new Date().toISOString().split('T')[0]);

  const selectedCategory = behaviorCategories.find(c => c.kategori === formKategori);
  const selectedBehavior = selectedCategory?.items.find(i => i.perilaku === formPerilaku);

  const filtered = useMemo(() => {
    return entries.filter(e => {
      const matchSearch = e.namaSiswa.toLowerCase().includes(search.toLowerCase()) ||
        e.perilaku.toLowerCase().includes(search.toLowerCase());
      const matchJenis = filterJenis === 'Semua' || e.jenis === filterJenis;
      const matchKategori = filterKategori === 'Semua' || e.kategori === filterKategori;
      return matchSearch && matchJenis && matchKategori;
    });
  }, [entries, search, filterJenis, filterKategori]);

  const totalPositif = entries.filter(e => e.jenis === 'positif').reduce((s, e) => s + e.poin, 0);
  const totalNegatif = entries.filter(e => e.jenis === 'negatif').reduce((s, e) => s + e.poin, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formSiswa || !formKategori || !formPerilaku) return;
    const siswa = mockSiswa.find(s => s.id === formSiswa);
    if (!siswa || !selectedBehavior) return;
    const newEntry: PoinEntry = {
      id: `p${Date.now()}`,
      siswaId: formSiswa,
      namaSiswa: siswa.nama,
      kelas: siswa.kelas,
      tanggal: formTanggal,
      kategori: formKategori,
      perilaku: formPerilaku,
      jenis: selectedBehavior.jenis,
      poin: selectedBehavior.poin,
      dicatatOleh: 'Ahmad Fauzi, S.Pd',
    };
    setEntries(prev => [newEntry, ...prev]);
    setShowForm(false);
    setFormSiswa(''); setFormKategori(''); setFormPerilaku('');
  }

  function handleDelete(id: string) {
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Sistem Poin Perilaku</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              Catat dan pantau poin perilaku siswa berdasarkan dokumen MI Islamiyah
            </p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Input Poin Baru
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Entri', value: entries.length, icon: <BookOpen size={20} />, color: 'var(--info)', bg: 'var(--info-bg)' },
            { label: 'Poin Positif', value: `+${totalPositif}`, icon: <TrendingUp size={20} />, color: 'var(--success)', bg: 'var(--success-bg)' },
            { label: 'Poin Negatif', value: totalNegatif, icon: <TrendingDown size={20} />, color: 'var(--danger)', bg: 'var(--danger-bg)' },
            { label: 'Siswa Terlibat', value: new Set(entries.map(e => e.siswaId)).size, icon: <User size={20} />, color: 'var(--warning)', bg: 'var(--warning-bg)' },
          ].map((stat, i) => (
            <div key={i} className="card-elevated p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{stat.value}</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        {showForm && (
          <div className="card-elevated p-6">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <Star size={18} style={{ color: 'var(--primary)' }} /> Form Input Poin Perilaku
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Tanggal</label>
                <input type="date" value={formTanggal} onChange={e => setFormTanggal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Siswa</label>
                <select value={formSiswa} onChange={e => setFormSiswa(e.target.value)} required
                  className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
                  <option value="">-- Pilih Siswa --</option>
                  {mockSiswa.map(s => <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Kategori</label>
                <select value={formKategori} onChange={e => { setFormKategori(e.target.value); setFormPerilaku(''); }} required
                  className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
                  <option value="">-- Pilih Kategori --</option>
                  {behaviorCategories.map(c => <option key={c.kategori} value={c.kategori}>{c.kategori}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Perilaku</label>
                <select value={formPerilaku} onChange={e => setFormPerilaku(e.target.value)} required disabled={!formKategori}
                  className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
                  <option value="">-- Pilih Perilaku --</option>
                  {selectedCategory?.items.map(item => (
                    <option key={item.perilaku} value={item.perilaku}>
                      {item.jenis === 'positif' ? '✅' : '❌'} {item.perilaku} ({item.poin > 0 ? '+' : ''}{item.poin})
                    </option>
                  ))}
                </select>
              </div>
              {selectedBehavior && (
                <div className="sm:col-span-2 lg:col-span-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${selectedBehavior.jenis === 'positif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedBehavior.jenis === 'positif' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    Poin: {selectedBehavior.poin > 0 ? '+' : ''}{selectedBehavior.poin} — {selectedBehavior.jenis === 'positif' ? 'Perilaku Positif' : 'Pelanggaran'}
                  </div>
                </div>
              )}
              <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
                <button type="submit" className="btn-primary"><CheckCircle size={16} /> Simpan Poin</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
              </div>
            </form>
          </div>
        )}

        {/* Filters & Table */}
        <div className="card-elevated">
          <div className="p-4 border-b flex flex-col sm:flex-row gap-3" style={{ borderColor: 'var(--border)' }}>
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama siswa atau perilaku..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }} />
            </div>
            <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              <option value="Semua">Semua Jenis</option>
              <option value="positif">Positif</option>
              <option value="negatif">Negatif</option>
            </select>
            <select value={filterKategori} onChange={e => setFilterKategori(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              <option value="Semua">Semua Kategori</option>
              {behaviorCategories.map(c => <option key={c.kategori} value={c.kategori}>{c.kategori}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                  {['Tanggal', 'Siswa', 'Kelas', 'Kategori', 'Perilaku', 'Jenis', 'Poin', 'Dicatat Oleh', 'Aksi'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>Tidak ada data poin</td></tr>
                ) : filtered.map((entry, i) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--muted-foreground)' }}>{entry.tanggal}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--foreground)' }}>{entry.namaSiswa}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{entry.kelas}</span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{entry.kategori}</td>
                    <td className="px-4 py-3 max-w-xs truncate" style={{ color: 'var(--foreground)' }}>{entry.perilaku}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${entry.jenis === 'positif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {entry.jenis === 'positif' ? <CheckCircle size={11} /> : <XCircle size={11} />}
                        {entry.jenis === 'positif' ? 'Positif' : 'Negatif'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: entry.poin > 0 ? 'var(--success)' : 'var(--danger)' }}>
                      {entry.poin > 0 ? '+' : ''}{entry.poin}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{entry.dicatatOleh}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(entry.id)} className="p-1.5 rounded hover:bg-red-50 transition-colors" style={{ color: 'var(--danger)' }} title="Hapus">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)', borderTop: '1px solid var(--border)' }}>
            Menampilkan {filtered.length} dari {entries.length} entri
          </div>
        </div>

        {/* Behavior Reference */}
        <div className="card-elevated p-6">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
            <Award size={18} style={{ color: 'var(--primary)' }} /> Referensi Poin Perilaku MI Islamiyah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {behaviorCategories.map(cat => (
              <div key={cat.kategori} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--primary)' }}>{cat.kategori}</h3>
                <div className="space-y-1.5">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 text-xs">
                      <span className="flex-1" style={{ color: 'var(--foreground)' }}>{item.perilaku}</span>
                      <span className={`flex-shrink-0 font-bold ${item.poin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.poin > 0 ? '+' : ''}{item.poin}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
