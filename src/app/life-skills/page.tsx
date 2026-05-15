'use client';

import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import { BookOpen, Save, CheckCircle } from 'lucide-react';

type LifeSkillValue = 'B' | 'C' | 'K' | '';

interface StudentRow {
  id: string;
  nama: string;
  kelas: string;
}

interface DailyRecord {
  [studentId: string]: {
    [day: string]: LifeSkillValue;
  };
}

const mockSiswaPerKelas: Record<string, StudentRow[]> = {
  '1A': [
    { id: 's1a-01', nama: 'Aisyah Nur Fadilah', kelas: '1A' },
    { id: 's1a-02', nama: 'Bintang Ramadhan', kelas: '1A' },
    { id: 's1a-03', nama: 'Cahya Putri Utami', kelas: '1A' },
    { id: 's1a-04', nama: 'Daffa Arya Pratama', kelas: '1A' },
    { id: 's1a-05', nama: 'Elsa Maulida Sari', kelas: '1A' },
  ],
  '1B': [
    { id: 's1b-01', nama: 'Ahmad Zulfikar Hakim', kelas: '1B' },
    { id: 's1b-02', nama: 'Bunga Citra Lestari', kelas: '1B' },
    { id: 's1b-03', nama: 'Candra Wibisono', kelas: '1B' },
    { id: 's1b-04', nama: 'Dina Fitriani', kelas: '1B' },
    { id: 's1b-05', nama: 'Eko Prasetyo', kelas: '1B' },
  ],
  '2A': [
    { id: 's2a-01', nama: 'Farid Hidayatullah', kelas: '2A' },
    { id: 's2a-02', nama: 'Gita Permata Sari', kelas: '2A' },
    { id: 's2a-03', nama: 'Hendra Kusuma', kelas: '2A' },
    { id: 's2a-04', nama: 'Indah Rahayu', kelas: '2A' },
    { id: 's2a-05', nama: 'Joko Susanto', kelas: '2A' },
  ],
  '3A': [
    { id: 's3a-01', nama: 'Aulia Rahmadani Putri', kelas: '3A' },
    { id: 's3a-02', nama: 'Nisa Fauziah Ramadhani', kelas: '3A' },
    { id: 's3a-03', nama: 'Kevin Ardianto', kelas: '3A' },
    { id: 's3a-04', nama: 'Laila Nur Azizah', kelas: '3A' },
    { id: 's3a-05', nama: 'Maulana Yusuf', kelas: '3A' },
  ],
  '4A': [
    { id: 's4a-01', nama: 'Muhammad Hafidz Al-Farisi', kelas: '4A' },
    { id: 's4a-02', nama: 'Ilham Ramadhan Saputra', kelas: '4A' },
    { id: 's4a-03', nama: 'Bagas Wicaksono Hadi', kelas: '4A' },
    { id: 's4a-04', nama: 'Nadia Putri Santoso', kelas: '4A' },
    { id: 's4a-05', nama: 'Omar Faruq Habibie', kelas: '4A' },
  ],
  '5A': [
    { id: 's5a-01', nama: 'Putri Ayu Lestari', kelas: '5A' },
    { id: 's5a-02', nama: 'Qori Amalia Dewi', kelas: '5A' },
    { id: 's5a-03', nama: 'Rafi Ahmad Santoso', kelas: '5A' },
    { id: 's5a-04', nama: 'Salma Nur Izzati', kelas: '5A' },
    { id: 's5a-05', nama: 'Taufik Hidayat', kelas: '5A' },
  ],
  '6A': [
    { id: 's6a-01', nama: 'Zahra Putri Andini', kelas: '6A' },
    { id: 's6a-02', nama: 'Reza Pratama Wijaya', kelas: '6A' },
    { id: 's6a-03', nama: 'Umar Fadhil Rahman', kelas: '6A' },
    { id: 's6a-04', nama: 'Vina Amelia Putri', kelas: '6A' },
    { id: 's6a-05', nama: 'Wahyu Setiawan', kelas: '6A' },
  ],
};

const kelasOptions = Object.keys(mockSiswaPerKelas);
const bulanOptions = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const tahunOptions = ['2024', '2025', '2026'];

const DAYS_OF_WEEK = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

function getDaysInMonth(month: number, year: number): { day: number; dayOfWeek: string }[] {
  const days = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    days.push({ day: d, dayOfWeek: DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1] });
  }
  return days;
}

const VALUE_STYLES: Record<LifeSkillValue, { label: string; bg: string; color: string }> = {
  'B': { label: 'B', bg: '#dcfce7', color: '#166534' },
  'C': { label: 'C', bg: '#fef3c7', color: '#92400e' },
  'K': { label: 'K', bg: '#fee2e2', color: '#991b1b' },
  '': { label: '-', bg: 'transparent', color: '#9ca3af' },
};

function cycleValue(current: LifeSkillValue): LifeSkillValue {
  const cycle: LifeSkillValue[] = ['', 'B', 'C', 'K'];
  const idx = cycle.indexOf(current);
  return cycle[(idx + 1) % cycle.length];
}

export default function LifeSkillsPage() {
  const [selectedKelas, setSelectedKelas] = useState('4A');
  const [selectedBulan, setSelectedBulan] = useState(4);
  const [selectedTahun, setSelectedTahun] = useState(2025);
  const [records, setRecords] = useState<DailyRecord>({});
  const [saved, setSaved] = useState(false);

  const siswaList = mockSiswaPerKelas[selectedKelas] || [];
  const days = getDaysInMonth(selectedBulan, selectedTahun);

  // Weeks: split days into groups of 7
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  function getRecord(studentId: string, day: number): LifeSkillValue {
    return records[studentId]?.[`${day}`] ?? '';
  }

  function toggleRecord(studentId: string, day: number) {
    const current = getRecord(studentId, day);
    const next = cycleValue(current);
    setRecords(prev => ({
      ...prev,
      [studentId]: { ...(prev[studentId] || {}), [`${day}`]: next },
    }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function countValue(studentId: string, val: LifeSkillValue) {
    return days.filter(d => getRecord(studentId, d.day) === val).length;
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Laporan Life Skills Harian</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              Rekam perkembangan life skills siswa setiap hari — klik sel untuk mengisi nilai
            </p>
          </div>
          <button className="btn-primary" onClick={handleSave}>
            {saved ? <><CheckCircle size={16} /> Tersimpan!</> : <><Save size={16} /> Simpan Laporan</>}
          </button>
        </div>

        {/* Controls */}
        <div className="card-elevated p-4 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Kelas</label>
            <select value={selectedKelas} onChange={e => setSelectedKelas(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              {kelasOptions.map(k => <option key={k} value={k}>Kelas {k}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Bulan</label>
            <select value={selectedBulan} onChange={e => setSelectedBulan(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              {bulanOptions.map((b, i) => <option key={b} value={i + 1}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>Tahun</label>
            <select value={selectedTahun} onChange={e => setSelectedTahun(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)' }}>
              {tahunOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>B</span>
              <span style={{ color: 'var(--muted-foreground)' }}>Baik</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>C</span>
              <span style={{ color: 'var(--muted-foreground)' }}>Cukup</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>K</span>
              <span style={{ color: 'var(--muted-foreground)' }}>Kurang</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-elevated overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
            <BookOpen size={16} style={{ color: 'var(--primary)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Kelas {selectedKelas} — {bulanOptions[selectedBulan - 1]} {selectedTahun}
            </span>
            <span className="text-xs ml-auto" style={{ color: 'var(--muted-foreground)' }}>{siswaList.length} siswa</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ backgroundColor: 'var(--muted)' }}>
                  <th className="sticky left-0 z-10 px-3 py-2 text-left font-semibold border-r" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--muted-foreground)', minWidth: '160px' }}>Nama Siswa</th>
                  {weeks.map((week, wi) => (
                    <React.Fragment key={wi}>
                      {week.map(({ day, dayOfWeek }) => (
                        <th key={day} className="px-1 py-2 text-center font-medium border-r" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)', minWidth: '32px' }}>
                          <div>{dayOfWeek}</div>
                          <div className="font-bold" style={{ color: 'var(--foreground)' }}>{day}</div>
                        </th>
                      ))}
                      {wi < weeks.length - 1 && (
                        <th className="px-1 py-2 border-r" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(22,163,74,0.05)', minWidth: '8px' }}></th>
                      )}
                    </React.Fragment>
                  ))}
                  <th className="px-2 py-2 text-center font-semibold border-l" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)', minWidth: '80px' }}>Rekap</th>
                </tr>
              </thead>
              <tbody>
                {siswaList.map((siswa, rowIdx) => (
                  <tr key={siswa.id} style={{ borderBottom: '1px solid var(--border)', backgroundColor: rowIdx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                    <td className="sticky left-0 z-10 px-3 py-1.5 font-medium border-r" style={{ backgroundColor: rowIdx % 2 === 0 ? 'var(--card)' : '#f9fafb', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--primary)', fontSize: '0.5rem' }}>{rowIdx + 1}</span>
                        <span className="truncate" style={{ maxWidth: '120px' }}>{siswa.nama}</span>
                      </div>
                    </td>
                    {weeks.map((week, wi) => (
                      <React.Fragment key={wi}>
                        {week.map(({ day }) => {
                          const val = getRecord(siswa.id, day);
                          const style = VALUE_STYLES[val];
                          return (
                            <td key={day} className="px-0.5 py-1 text-center border-r" style={{ borderColor: 'var(--border)' }}>
                              <button
                                onClick={() => toggleRecord(siswa.id, day)}
                                className="w-6 h-6 rounded text-xs font-bold transition-all hover:scale-110"
                                style={{ backgroundColor: style.bg, color: style.color }}
                                title={`${siswa.nama} - Hari ${day}`}
                              >
                                {style.label}
                              </button>
                            </td>
                          );
                        })}
                        {wi < weeks.length - 1 && (
                          <td className="border-r" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(22,163,74,0.03)' }}></td>
                        )}
                      </React.Fragment>
                    ))}
                    <td className="px-2 py-1 border-l" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex gap-1 justify-center">
                        <span className="px-1 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>{countValue(siswa.id, 'B')}</span>
                        <span className="px-1 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>{countValue(siswa.id, 'C')}</span>
                        <span className="px-1 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>{countValue(siswa.id, 'K')}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)', borderTop: '1px solid var(--border)' }}>
            💡 Klik sel untuk mengisi nilai: kosong → B (Baik) → C (Cukup) → K (Kurang) → kosong
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
