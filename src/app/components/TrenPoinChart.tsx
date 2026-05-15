'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

const data = [
  { minggu: 'M1 Mar', kebaikan: 320, keburukan: 85 },
  { minggu: 'M2 Mar', kebaikan: 285, keburukan: 120 },
  { minggu: 'M3 Mar', kebaikan: 410, keburukan: 70 },
  { minggu: 'M4 Mar', kebaikan: 375, keburukan: 95 },
  { minggu: 'M1 Apr', kebaikan: 440, keburukan: 60 },
  { minggu: 'M2 Apr', kebaikan: 395, keburukan: 110 },
  { minggu: 'M3 Apr', kebaikan: 465, keburukan: 55 },
  { minggu: 'M4 Apr', kebaikan: 520, keburukan: 40 },
];

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="card-elevated rounded-lg px-3 py-2.5 text-xs"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
    >
      <p className="font-semibold mb-2 text-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={`tooltip-${entry.name}`} className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name === 'kebaikan' ? 'Poin Kebaikan' : 'Poin Keburukan'}:</span>
          <span className="font-semibold font-tabular">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrenPoinChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradKebaikan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradKeburukan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--danger)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="minggu"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
          formatter={(value) => value === 'kebaikan' ? 'Poin Kebaikan' : 'Poin Keburukan'}
        />
        <Area
          type="monotone"
          dataKey="kebaikan"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fill="url(#gradKebaikan)"
          dot={false}
          activeDot={{ r: 4, fill: 'var(--primary)' }}
        />
        <Area
          type="monotone"
          dataKey="keburukan"
          stroke="var(--danger)"
          strokeWidth={2}
          fill="url(#gradKeburukan)"
          dot={false}
          activeDot={{ r: 4, fill: 'var(--danger)' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}