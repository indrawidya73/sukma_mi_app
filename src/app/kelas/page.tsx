'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Plus, Edit2, Trash2, Users, BookOpen, X, Save } from 'lucide-react';

interface Kelas {
  id: string;
  namaKelas: string;
  tingkat: number;
  waliKelas: string;
  jumlahSiswa: number;
  ruangan: string;
  tahunAjaran: string;
  status: 'Aktif' | 'Tidak Aktif';
}

const mockKelas: Kelas[] = [
  { id: 'k-1a', namaKelas: '1A', tingkat: 1, waliKelas: 'Ibu Laila Mufidah, S.Pd', jumlahSiswa: 28, ruangan: 'Ruang 101', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-1b', namaKelas: '1B', tingkat: 1, waliKelas: 'Ibu Khadijah Nur, S.Pd', jumlahSiswa: 27, ruangan: 'Ruang 102', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-2a', namaKelas: '2A', tingkat: 2, waliKelas: 'Pak Denny Firmansyah, S.Pd', jumlahSiswa: 30, ruangan: 'Ruang 201', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-2b', namaKelas: '2B', tingkat: 2, waliKelas: 'Ibu Khadijah Nur, S.Pd', jumlahSiswa: 29, ruangan: 'Ruang 202', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-3a', namaKelas: '3A', tingkat: 3, waliKelas: 'Ibu Nurul Hidayah, S.Pd', jumlahSiswa: 31, ruangan: 'Ruang 301', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-3b', namaKelas: '3B', tingkat: 3, waliKelas: 'Pak Rudi Hartono, S.Pd', jumlahSiswa: 28, ruangan: 'Ruang 302', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-4a', namaKelas: '4A', tingkat: 4, waliKelas: 'Ibu Sari Dewi, S.Pd', jumlahSiswa: 32, ruangan: 'Ruang 401', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-4b', namaKelas: '4B', tingkat: 4, waliKelas: 'Pak Ahmad Fauzi, S.Pd', jumlahSiswa: 30, ruangan: 'Ruang 402', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-5a', namaKelas: '5A', tingkat: 5, waliKelas: 'Ibu Rina Kusuma, S.Pd', jumlahSiswa: 29, ruangan: 'Ruang 501', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-5b', namaKelas: '5B', tingkat: 5, waliKelas: 'Pak Agus Wahyudi, S.Pd', jumlahSiswa: 28, ruangan: 'Ruang 502', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-6a', namaKelas: '6A', tingkat: 6, waliKelas: 'Ibu Fatimah Zahra, S.Pd', jumlahSiswa: 27, ruangan: 'Ruang 601', tahunAjaran: '2024/2025', status: 'Aktif' },
  { id: 'k-6b', namaKelas: '6B', tingkat: 6, waliKelas: 'Pak Yusuf Effendi, S.Pd', jumlahSiswa: 26, ruangan: 'Ruang 602', tahunAjaran: '2024/2025', status: 'Aktif' },
];

const guruOptions = [
  'Ibu Laila Mufidah, S.Pd', 'Ibu Khadijah Nur, S.Pd', 'Pak Denny Firmansyah, S.Pd',
  'Ibu Nurul Hidayah, S.Pd', 'Pak Rudi Hartono, S.Pd', 'Ibu Sari Dewi, S.Pd',
  'Pak Ahmad Fauzi, S.Pd', 'Ibu Rina Kusuma, S.Pd', 'Pak Agus Wahyudi, S.Pd',
  'Ibu Fatimah Zahra, S.Pd', 'Pak Yusuf Effendi, S.Pd',
];

const TINGKAT_COLORS: Record<number, { bg: string; color: string }> = {
  1: { bg: '#dbeafe', color: '#1e40af' },
  2: { bg: '#dcfce7', color: '#166534' },
  3: { bg: '#fef3c7', color: '#92400e' },
  4: { bg: '#f3e8ff', color: '#6b21a8' },
  5: { bg: '#ffedd5', color: '#9a3412' },
  6: { bg: '#fee2e2', color: '#991b1b' },
};

interface FormState {
  namaKelas: string;
  tingkat: number;
  waliKelas: string;
  ruangan: string;
  jumlahSiswa: number;
  tahunAjaran: string;
  status: 'Aktif' | 'Tidak Aktif';
}

const emptyForm: FormState = {
  namaKelas: '', tingkat: 1, waliKelas: '', ruangan: '', jumlahSiswa: 0, tahunAjaran: '2024/2025', status: 'Aktif',
};

export default function ManajemenKelasPage() {
  const [kelasList, setKelasList] = useState<Kelas[]>(mockKelas);
  const [showModal, setShowModal] = useState(false);
  const [editKelas, setEditKelas] = useState<Kelas | null>(null);
  const [deleteKelas, setDeleteKelas] = useState<Kelas | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const totalSiswa = kelasList.reduce((s, k) => s + k.jumlahSiswa, 0);
  const tingkatGroups = [1, 2, 3, 4, 5, 6];

  function openAdd() {
    setEditKelas(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(kelas: Kelas) {
    setEditKelas(kelas);
    setForm({
      namaKelas: kelas.namaKelas, tingkat: kelas.tingkat, waliKelas: kelas.waliKelas,
      ruangan: kelas.ruangan, jumlahSiswa: kelas.jumlahSiswa, tahunAjaran: kelas.tahunAjaran, status: kelas.status,
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.namaKelas || !form.waliKelas || !form.ruangan) return;
    if (editKelas) {
      setKelasList(prev => prev.map(k => k.id === editKelas.id ? { ...k, ...form } : k));
    } else {
      setKelasList(prev => [...prev, { id: `k-${Date.now()}`, ...form }]);
    }
    setShowModal(false);
  }

  function handleDelete() {
    if (!deleteKelas) return;
    setKelasList(prev => prev.filter(k => k.id !== deleteKelas.id));
    setDeleteKelas(null);
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Manajemen Kelas</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Kelola data kelas, wali kelas, dan ruangan MI Islamiyah</p>
          </div>
          <button className="btn-primary" onClick={openAdd}><Plus size={16} /> Tambah Kelas</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Kelas', value: kelasList.length, color: 'var(--primary)', bg: 'var(--primary-light)' },
            { label: 'Total Siswa', value: totalSiswa, color: 'var(--info)', bg: 'var(--info-bg)' },
            { label: 'Kelas Aktif', value: kelasList.filter(k => k.status === 'Aktif').length, color: 'var(--success)', bg: 'var(--success-bg)' },
            { label: 'Rata-rata/Kelas', value: Math.round(totalSiswa / kelasList.length), color: 'var(--warning)', bg: 'var(--warning-bg)' },
          ].map((s, i) => (
            <div key={i} className="card-elevated p-4">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Kelas by Tingkat */}
        {tingkatGroups.map(tingkat => {
          const kelasInTingkat = kelasList.filter(k => k.tingkat === tingkat);
          if (kelasInTingkat.length === 0) return null;
          const tc = TINGKAT_COLORS[tingkat];
          return (
            <div key={tingkat}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: tc.bg, color: tc.color }}>
                  Kelas {tingkat}
                </span>
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{kelasInTingkat.length} kelas</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {kelasInTingkat.map(kelas => (
                  <div key={kelas.id} className="card-elevated p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg" style={{ backgroundColor: tc.bg, color: tc.color }}>
                          {kelas.namaKelas}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Kelas {kelas.namaKelas}</p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{kelas.ruangan}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kelas.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {kelas.status}
                      </span>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Users size={12} style={{ color: 'var(--muted-foreground)' }} />
                        <span style={{ color: 'var(--muted-foreground)' }}>Wali Kelas:</span>
                        <span className="font-medium truncate" style={{ color: 'var(--foreground)' }}>{kelas.waliKelas}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <BookOpen size={12} style={{ color: 'var(--muted-foreground)' }} />
                        <span style={{ color: 'var(--muted-foreground)' }}>Jumlah Siswa:</span>
                        <span className="font-bold" style={{ color: 'var(--primary)' }}>{kelas.jumlahSiswa} siswa</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                      <button onClick={() => openEdit(kelas)} className="flex-1 btn-secondary text-xs py-1.5">
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => setDeleteKelas(kelas)} className="flex-1 btn-danger text-xs py-1.5">
                        <Trash2 size={12} /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                  {editKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-gray-100"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Nama Kelas</label>
                    <input value={form.namaKelas} onChange={e => setForm(f => ({ ...f, namaKelas: e.target.value }))}
                      placeholder="cth: 4A" className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Tingkat</label>
                    <select value={form.tingkat} onChange={e => setForm(f => ({ ...f, tingkat: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }}>
                      {[1,2,3,4,5,6].map(t => <option key={t} value={t}>Kelas {t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Wali Kelas</label>
                  <select value={form.waliKelas} onChange={e => setForm(f => ({ ...f, waliKelas: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }}>
                    <option value="">-- Pilih Wali Kelas --</option>
                    {guruOptions.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Ruangan</label>
                    <input value={form.ruangan} onChange={e => setForm(f => ({ ...f, ruangan: e.target.value }))}
                      placeholder="cth: Ruang 401" className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Jumlah Siswa</label>
                    <input type="number" value={form.jumlahSiswa} onChange={e => setForm(f => ({ ...f, jumlahSiswa: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Tahun Ajaran</label>
                    <input value={form.tahunAjaran} onChange={e => setForm(f => ({ ...f, tahunAjaran: e.target.value }))}
                      placeholder="2024/2025" className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as 'Aktif' | 'Tidak Aktif' }))}
                      className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }}>
                      <option value="Aktif">Aktif</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="btn-primary flex-1" onClick={handleSave}><Save size={16} /> Simpan</button>
                <button className="btn-secondary flex-1" onClick={() => setShowModal(false)}>Batal</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteKelas && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={20} className="text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--foreground)' }}>Hapus Kelas {deleteKelas.namaKelas}?</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>Data kelas ini akan dihapus permanen.</p>
              <div className="flex gap-3">
                <button className="btn-danger flex-1" onClick={handleDelete}>Ya, Hapus</button>
                <button className="btn-secondary flex-1" onClick={() => setDeleteKelas(null)}>Batal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
