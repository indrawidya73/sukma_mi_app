'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

const data = [
  { kelas: '1A', poin: 91 },
  { kelas: '1B', poin: 88 },
  { kelas: '2A', poin: 85 },
  { kelas: '2B', poin: 79 },
  { kelas: '3A', poin: 93 },
  { kelas: '3B', poin: 72 },
  { kelas: '4A', poin: 87 },
  { kelas: '4B', poin: 83 },
  { kelas: '5A', poin: 90 },
  { kelas: '5B', poin: 68 },
  { kelas: '6A', poin: 95 },
  { kelas: '6B', poin: 86 },
];

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;
  const val = payload[0].value as number;
  const color = val >= 85 ? 'var(--success)' : val >= 75 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div className="card-elevated rounded-lg px-3 py-2 text-xs" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
      <p className="font-semibold text-foreground">Kelas {label}</p>
      <p className="mt-1 font-bold font-tabular" style={{ color }}>
        Rata-rata: {val} poin
      </p>
    </div>
  );
}

export default function PerbandinganPoinChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={14}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="kelas"
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[60, 100]}
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(22,163,74,0.06)' }} />
        <Bar
          dataKey="poin"
          radius={[4, 4, 0, 0]}
          fill="var(--primary)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}