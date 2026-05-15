'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import DashboardChartsRow from './components/DashboardChartsRow';
import DashboardBottomRow from './components/DashboardBottomRow';
import LoginPageWrapper from './login-wrapper';

export default function DashboardPage() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <p style={{ color: 'var(--muted-foreground)' }}>Memuat...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPageWrapper />;
  }

  return (
    <AppLayout>
      <DashboardHeader />
      <MetricsBentoGrid />
      <DashboardChartsRow />
      <DashboardBottomRow />
    </AppLayout>
  );
}