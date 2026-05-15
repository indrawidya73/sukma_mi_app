'use client';

import React from 'react';
import {
  GraduationCap,
  School,
  Users,
  Star,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

// Bento grid plan:
// 6 cards → grid-cols-3 on xl, grid-cols-2 on md
// Row 1: hero (spans 2 cols) + 1 regular
// Row 2: 3 regular cards

const metrics = [
  {
    id: 'metric-siswa-aktif',
    label: 'Total Siswa Aktif',
    value: '312',
    sub: '+8 siswa baru bulan ini',
    icon: <GraduationCap size={22} />,
    trend: '+2.6%',
    trendPositive: true,
    hero: true,
    colorClass: 'primary',
    bgStyle: { background: 'linear-gradient(135deg, var(--primary) 0%, #15803d 100%)' },
    textColor: '#ffffff',
    subColor: 'rgba(255,255,255,0.75)',
    iconBg: 'rgba(255,255,255,0.18)',
  },
  {
    id: 'metric-total-kelas',
    label: 'Total Kelas Aktif',
    value: '12',
    sub: 'Kelas 1 s.d. Kelas 6',
    icon: <School size={20} />,
    colorClass: 'info',
    bgStyle: { backgroundColor: 'var(--card)' },
    textColor: 'var(--foreground)',
    subColor: 'var(--muted-foreground)',
    iconBg: 'var(--info-bg)',
    iconColor: 'var(--info)',
  },
  {
    id: 'metric-total-guru',
    label: 'Total Guru',
    value: '24',
    sub: '12 wali kelas aktif',
    icon: <Users size={20} />,
    colorClass: 'accent',
    bgStyle: { backgroundColor: 'var(--card)' },
    textColor: 'var(--foreground)',
    subColor: 'var(--muted-foreground)',
    iconBg: 'rgba(233,30,140,0.1)',
    iconColor: 'var(--accent)',
  },
  {
    id: 'metric-rata-poin',
    label: 'Rata-rata Poin Perilaku',
    value: '87.4',
    sub: 'Dari total 312 siswa aktif',
    icon: <Star size={20} />,
    colorClass: 'warning',
    bgStyle: { backgroundColor: 'var(--card)' },
    textColor: 'var(--foreground)',
    subColor: 'var(--muted-foreground)',
    iconBg: 'var(--warning-bg)',
    iconColor: 'var(--warning)',
  },
  {
    id: 'metric-poin-hari-ini',
    label: 'Poin Kebaikan Hari Ini',
    value: '+145',
    sub: '29 siswa diberi poin hari ini',
    icon: <TrendingUp size={20} />,
    colorClass: 'success',
    bgStyle: { backgroundColor: 'var(--card)' },
    textColor: 'var(--foreground)',
    subColor: 'var(--muted-foreground)',
    iconBg: 'var(--success-bg)',
    iconColor: 'var(--success)',
  },
  {
    id: 'metric-siswa-bermasalah',
    label: 'Siswa Perlu Perhatian',
    value: '7',
    sub: 'Poin di bawah 60 — butuh tindak lanjut',
    icon: <AlertTriangle size={20} />,
    colorClass: 'danger',
    bgStyle: { backgroundColor: '#fff5f5', border: '1px solid #fecaca' },
    textColor: 'var(--danger)',
    subColor: '#ef4444',
    iconBg: 'var(--danger-bg)',
    iconColor: 'var(--danger)',
    alert: true,
  },
];

export default function MetricsBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
      {metrics?.map((m, idx) => (
        <div
          key={m?.id}
          className="card-elevated rounded-xl p-5 transition-all duration-200"
          style={{
            ...m?.bgStyle,
            gridColumn: m?.hero ? 'span 1 md:span-none xl:col-span-1' : undefined,
          }}
        >
          {m?.hero ? (
            // Hero card — full green gradient
            (<div>
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: m?.iconBg, color: '#ffffff' }}
                >
                  {m?.icon}
                </div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
                >
                  {m?.trend}
                </span>
              </div>
              <p className="text-4xl font-bold font-tabular mb-1" style={{ color: m?.textColor }}>
                {m?.value}
              </p>
              <p className="text-sm font-semibold mb-1" style={{ color: m?.textColor }}>
                {m?.label}
              </p>
              <p className="text-xs" style={{ color: m?.subColor }}>
                {m?.sub}
              </p>
            </div>)
          ) : (
            // Regular card
            (<div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: m?.iconBg, color: m?.iconColor }}
                >
                  {m?.icon}
                </div>
                {m?.alert && (
                  <span className="badge-warning animate-pulse">Perhatian</span>
                )}
              </div>
              <p
                className="text-3xl font-bold font-tabular mb-1"
                style={{ color: m?.alert ? m?.textColor : 'var(--foreground)' }}
              >
                {m?.value}
              </p>
              <p className="text-sm font-medium text-muted-foreground mb-0.5">{m?.label}</p>
              <p className="text-xs" style={{ color: m?.subColor }}>{m?.sub}</p>
            </div>)
          )}
        </div>
      ))}
    </div>
  );
}