'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/app/AuthContext';
import { Settings, Bell, Lock, Eye, Globe, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Pengaturan</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-semibold">
              <Settings size={18} />
              <span>Umum</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all text-muted-foreground">
              <Bell size={18} />
              <span>Notifikasi</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all text-muted-foreground">
              <Lock size={18} />
              <span>Keamanan</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all text-muted-foreground">
              <Palette size={18} />
              <span>Tampilan</span>
            </button>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="card-elevated p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Pengaturan Umum</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Bahasa</p>
                        <p className="text-xs text-muted-foreground">Pilih bahasa sistem</p>
                      </div>
                    </div>
                    <select className="input-field w-auto text-sm py-1.5">
                      <option>Bahasa Indonesia</option>
                      <option>English</option>
                      <option>Arabic</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Eye size={18} className="text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Mode Tampilan</p>
                        <p className="text-xs text-muted-foreground">Sesuaikan kenyamanan mata</p>
                      </div>
                    </div>
                    <div className="flex bg-muted p-1 rounded-lg">
                      <button className="px-3 py-1 text-xs font-bold rounded bg-white shadow-sm">Terang</button>
                      <button className="px-3 py-1 text-xs font-bold rounded">Gelap</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold mb-4">Keamanan Akun</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-all">
                    <div className="flex items-center gap-3">
                      <Lock size={18} className="text-primary" />
                      <div className="text-left">
                        <p className="text-sm font-semibold">Ganti Kata Sandi</p>
                        <p className="text-xs text-muted-foreground">Terakhir diubah 2 bulan lalu</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary">Ubah</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
