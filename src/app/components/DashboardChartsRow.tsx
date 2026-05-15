'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TrenPoinChart = dynamic(() => import('./TrenPoinChart'), { ssr: false });
const PerbandinganPoinChart = dynamic(() => import('./PerbandinganPoinChart'), { ssr: false });

export default function DashboardChartsRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-6">
      {/* Tren Poin Mingguan — 3/5 width */}
      <div className="xl:col-span-3 card-elevated rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold">Tren Poin Perilaku</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Kebaikan vs Keburukan — 8 minggu terakhir</p>
          </div>
          <select
            className="text-xs border rounded-lg px-2 py-1.5 outline-none"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
          >
            <option>8 Minggu Terakhir</option>
            <option>4 Minggu Terakhir</option>
            <option>Bulan Ini</option>
          </select>
        </div>
        <TrenPoinChart />
      </div>

      {/* Poin per Kelas — 2/5 width */}
      <div className="xl:col-span-2 card-elevated rounded-xl p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold">Poin per Kelas</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Rata-rata poin perilaku per kelas</p>
        </div>
        <PerbandinganPoinChart />
      </div>
    </div>
  );
}