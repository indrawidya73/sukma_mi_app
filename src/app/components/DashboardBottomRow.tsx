import React from 'react';
import SiswaBermasalahTable from './SiswaBermasalahTable';
import ActivityFeed from './ActivityFeed';

export default function DashboardBottomRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
      {/* Siswa perlu perhatian — 3/5 */}
      <div className="xl:col-span-3">
        <SiswaBermasalahTable />
      </div>
      {/* Activity Feed — 2/5 */}
      <div className="xl:col-span-2">
        <ActivityFeed />
      </div>
    </div>
  );
}