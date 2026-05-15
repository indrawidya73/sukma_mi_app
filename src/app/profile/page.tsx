'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/app/AuthContext';
import { User, Mail, Shield, Calendar, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return null;
  }

  const roleColors: Record<string, string> = {
    admin: '#ef4444',
    guru: '#3b82f6',
    murid: '#10b981',
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Profil Saya</h1>
        </div>

        <div className="card-elevated overflow-hidden">
          <div className="h-32" style={{ backgroundColor: roleColors[user.role] || 'var(--primary)', opacity: 0.1 }}></div>
          <div className="px-6 pb-8 -mt-16">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div 
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: roleColors[user.role] || 'var(--primary)' }}
              >
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div className="flex-1 pb-2 text-center sm:text-left">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{user.name}</h2>
                <p className="text-sm font-medium uppercase tracking-wider" style={{ color: roleColors[user.role] }}>{user.role}</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>Informasi Akun</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><User size={18} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Username</p>
                      <p className="text-sm font-medium">{user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><Mail size={18} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{user.email || `${user.username}@miislamiyah.sch.id`}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><Shield size={18} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Role</p>
                      <p className="text-sm font-medium capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>Informasi Personal</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><Phone size={18} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Nomor Telepon</p>
                      <p className="text-sm font-medium">0812-3456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><Calendar size={18} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Terdaftar Sejak</p>
                      <p className="text-sm font-medium">1 Juli 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><MapPin size={18} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Alamat</p>
                      <p className="text-sm font-medium">Kebonsari, Sukun, Malang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
