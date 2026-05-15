'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedPage({ children, requiredRoles = [] }: ProtectedPageProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        router.push('/');
      }
    }
  }, [user, isLoading, requiredRoles, router]);

  if (isLoading || !user || (requiredRoles.length > 0 && !requiredRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
