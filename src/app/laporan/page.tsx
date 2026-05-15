'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Download, TrendingUp, TrendingDown, Users, Star, Award, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const KELAS_OPTIONS = ['Semua Kelas', '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
const BULAN_OPTIONS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const poinPerKelas = [
  { kelas: '1A', rataRata: 78, tertinggi: 95, terendah: 55 },
  { kelas: '1B', rataRata: 72, tertinggi: 90, terendah: 50 },
  { kelas: '2A', rataRata: 81, tertinggi: 97, terendah: 60 },
  { kelas: '2B', rataRata: 75, tertinggi: 92, terendah: 52 },
  { kelas: '3A', rataRata: 83, tertinggi: 98, terendah: 63 },
  { kelas: '3B', rataRata: 70, tertinggi: 88, terendah: 48 },
  { kelas: '4A', rataRata: 79, tertinggi: 94, terendah: 47 },
  { kelas: '4B', rataRata: 76, tertinggi: 91, terendah: 55 },
  { kelas: '5A', rataRata: 85, tertinggi: 97, terendah: 65 },
  { kelas: '5B', rataRata: 74, tertinggi: 89, terendah: 52 },
  { kelas: '6A', rataRata: 88, tertinggi: 99, terendah: 70 },
  { kelas: '6B', rataRata: 82, tertinggi: 96, terendah: 61 },
];

const trenBulanan = [
  { bulan: 'Jan', positif: 145, negatif: 32 },
  { bulan: 'Feb', positif: 162, negatif: 28 },
  { bulan: 'Mar', positif: 158, negatif: 35 },
  { bulan: 'Apr', positif: 175, negatif: 22 },
  { bulan: 'Mei', positif: 189, negatif: 18 },
];

const kategoriPelanggaran = [
  { name: 'Kedisiplinan', value: 38, color: '#ef4444' },
  { name: 'Tata Krama', value: 25, color: '#f97316' },
  { name: 'Keimanan & Ibadah', value: 18, color: '#eab308' },
  { name: 'Kebersihan', value: 12, color: '#84cc16' },
  { name: 'Keamanan', value: 7, color: '#06b6d4' },
];

const topSiswaPositif = [
  { rank: 1, nama: 'Zahra Putri Andini', kelas: '6A', poin: 97 },
  { rank: 2, nama: 'Putri Ayu Lestari', kelas: '5A', poin: 91 },
  { rank: 3, nama: 'Muhammad Hafidz Al-Farisi', kelas: '4A', poin: 94 },
  { rank: 4, nama: 'Aulia Rahmadani Putri', kelas: '3A', poin: 88 },
  { rank: 5, nama: 'Farid Hidayatullah', kelas: '2A', poin: 79 },
];

const siswaPerhatian = [
  { nama: 'Bagas Wicaksono Hadi', kelas: '4A', poin: 47, pelanggaran: 3 },
  { nama: 'Rizki Maulana Putra', kelas: '3B', poin: 58, pelanggaran: 2 },
  { nama: 'Farhan Ardiansyah', kelas: '5B', poin: 52, pelanggaran: 4 },
];

const absensiRekap = [
  { kelas: '4A', hadir: 92, sakit: 4, izin: 2, alpha: 2 },
  { kelas: '5A', hadir: 95, sakit: 3, izin: 1, alpha: 1 },
  { kelas: '6A', hadir: 97, sakit: 2, izin: 1, alpha: 0 },
  { kelas: '3A', hadir: 90, sakit: 5, izin: 3, alpha: 2 },
];

export default function LaporanPage() {
  const [filterKelas, setFilterKelas] = useState('Semua Kelas');
  const [filterBulan, setFilterBulan] = useState(4);
  const [activeTab, setActiveTab] = useState<'poin' | 'absensi' | 'lifeskills'>('poin');

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Rekap & Laporan</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Ringkasan data poin perilaku, absensi, dan life skills siswa</p>
          </div>
          <button className="btn-secondary">
            <Download size={16} /> Export Laporan
          </button>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Kelas</label>
            <select value={filterKelas} onChange={e => setFilterKelas(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              {KELAS_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Bulan</label>
            <select value={filterBulan} onChange={e => setFilterBulan(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              {BULAN_OPTIONS.map((b, i) => <option key={b} value={i + 1}>{b}</option>)}
            </select>
          </div>
          <div className="flex gap-2 ml-auto">
            {(['poin', 'absensi', 'lifeskills'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'text-white shadow-sm' : 'hover:bg-gray-100'}`}
                style={activeTab === tab ? { backgroundColor: 'var(--primary)' } : { color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                {tab === 'poin' ? 'Poin Perilaku' : tab === 'absensi' ? 'Absensi' : 'Life Skills'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'poin' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Siswa', value: '342', icon: <Users size={20} />, color: 'var(--info)', bg: 'var(--info-bg)', trend: '+12' },
                { label: 'Rata-rata Poin', value: '79.2', icon: <Star size={20} />, color: 'var(--primary)', bg: 'var(--primary-light)', trend: '+3.1' },
                { label: 'Poin Positif', value: '189', icon: <TrendingUp size={20} />, color: 'var(--success)', bg: 'var(--success-bg)', trend: '+14' },
                { label: 'Pelanggaran', value: '18', icon: <TrendingDown size={20} />, color: 'var(--danger)', bg: 'var(--danger-bg)', trend: '-4' },
              ].map((s, i) => (
                <div key={i} className="card-elevated p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{s.value}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.label}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: s.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{s.trend} bulan ini</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tren Bulanan */}
              <div className="card-elevated p-4">
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Tren Poin Bulanan</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={trenBulanan}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positif" stroke="#16a34a" strokeWidth={2} name="Positif" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="negatif" stroke="#dc2626" strokeWidth={2} name="Negatif" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Kategori Pelanggaran */}
              <div className="card-elevated p-4">
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Kategori Pelanggaran</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={kategoriPelanggaran} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                      {kategoriPelanggaran.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Poin Per Kelas */}
            <div className="card-elevated p-4">
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Rata-rata Poin Per Kelas</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={poinPerKelas} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="kelas" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="rataRata" fill="#16a34a" radius={[4, 4, 0, 0]} name="Rata-rata Poin" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Siswa & Perhatian */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-elevated p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <Award size={16} style={{ color: '#f59e0b' }} /> Top 5 Siswa Berprestasi
                </h3>
                <div className="space-y-2">
                  {topSiswaPositif.map(s => (
                    <div key={s.rank} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: s.rank <= 3 ? '#f59e0b' : 'var(--primary)' }}>{s.rank}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{s.nama}</p>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Kelas {s.kelas}</p>
                      </div>
                      <span className="font-bold text-sm" style={{ color: 'var(--primary)' }}>{s.poin} poin</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-elevated p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <AlertTriangle size={16} style={{ color: 'var(--danger)' }} /> Siswa Perlu Perhatian
                </h3>
                <div className="space-y-2">
                  {siswaPerhatian.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 bg-red-500">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{s.nama}</p>
                        <p className="text-xs text-red-500">Kelas {s.kelas} — {s.pelanggaran}x pelanggaran</p>
                      </div>
                      <span className="font-bold text-sm text-red-600">{s.poin} poin</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'absensi' && (
          <div className="card-elevated overflow-hidden">
            <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
              <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Rekap Absensi Per Kelas — {BULAN_OPTIONS[filterBulan - 1]}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                    {['Kelas', 'Hadir (%)', 'Sakit (%)', 'Izin (%)', 'Alpha (%)', 'Kehadiran'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {absensiRekap.map((row, i) => (
                    <tr key={row.kelas} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{row.kelas}</span></td>
                      <td className="px-4 py-3 font-bold text-green-600">{row.hadir}%</td>
                      <td className="px-4 py-3 font-bold text-blue-600">{row.sakit}%</td>
                      <td className="px-4 py-3 font-bold text-yellow-600">{row.izin}%</td>
                      <td className="px-4 py-3 font-bold text-red-600">{row.alpha}%</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-green-500" style={{ width: `${row.hadir}%` }} />
                          </div>
                          <span className="text-xs font-medium text-green-600">{row.hadir}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'lifeskills' && (
          <div className="card-elevated p-6">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Rekap Life Skills Per Kelas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { kelas: '4A', baik: 68, cukup: 22, kurang: 10 },
                { kelas: '5A', baik: 75, cukup: 18, kurang: 7 },
                { kelas: '6A', baik: 80, cukup: 15, kurang: 5 },
                { kelas: '3A', baik: 65, cukup: 25, kurang: 10 },
                { kelas: '3B', baik: 60, cukup: 28, kurang: 12 },
                { kelas: '4B', baik: 70, cukup: 20, kurang: 10 },
              ].map(row => (
                <div key={row.kelas} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>Kelas {row.kelas}</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Baik', value: row.baik, color: '#16a34a', bg: '#dcfce7' },
                      { label: 'Cukup', value: row.cukup, color: '#d97706', bg: '#fef3c7' },
                      { label: 'Kurang', value: row.kurang, color: '#dc2626', bg: '#fee2e2' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className="w-12 text-xs font-medium" style={{ color: item.color }}>{item.label}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: item.bg }}>
                          <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                        </div>
                        <span className="w-8 text-xs text-right font-bold" style={{ color: item.color }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
