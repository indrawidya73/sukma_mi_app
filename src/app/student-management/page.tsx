'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import AppLayout from '@/components/AppLayout';
import StudentManagementClient from './components/StudentManagementClient';
import { toast } from 'sonner';

export default function StudentManagementPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !['admin', 'guru'].includes(user.role)) {
      toast.error('Anda tidak memiliki akses ke halaman ini');
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || !['admin', 'guru'].includes(user.role)) {
    return null;
  }

  return (
    <AppLayout>
      <StudentManagementClient />
    </AppLayout>
  );
}