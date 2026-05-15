'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import AppLayout from '@/components/AppLayout';
import UserManagementClient from './components/UserManagementClient';
import { toast } from 'sonner';

export default function UserManagementPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && user.role !== 'admin') {
      toast.error('Hanya Admin yang dapat mengakses halaman ini');
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return null;
  }

  return (
    <AppLayout>
      <UserManagementClient />
    </AppLayout>
  );
}