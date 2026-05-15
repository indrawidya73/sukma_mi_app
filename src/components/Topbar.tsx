'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Search, ChevronDown, Menu, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/app/AuthContext';
import { toast } from 'sonner';

interface TopbarProps {
  onMobileMenuToggle?: () => void;
}

const notifications = [
  { id: 'notif-001', text: 'Ahmad Rizki mendapat poin keburukan: Terlambat ke sekolah', time: '5 menit lalu', unread: true },
  { id: 'notif-002', text: 'Life skills kelas 3A belum diisi untuk minggu ini', time: '1 jam lalu', unread: true },
  { id: 'notif-003', text: 'Laporan poin bulan April siap diunduh', time: '2 jam lalu', unread: false },
];

const roleColors: Record<string, string> = {
  admin: '#ef4444',
  guru: '#3b82f6',
  murid: '#10b981',
};

const roleNames: Record<string, string> = {
  admin: 'Admin',
  guru: 'Guru',
  murid: 'Murid',
};

export default function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    toast.success('Logout berhasil');
    router.push('/login');
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <header
      className="flex items-center justify-between px-4 lg:px-6"
      style={{
        height: '64px',
        backgroundColor: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={onMobileMenuToggle}
          aria-label="Buka menu navigasi"
        >
          <Menu size={20} className="text-foreground" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted" style={{ minWidth: '240px' }}>
          <Search size={15} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari siswa, kelas, atau guru..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
            style={{ fontFamily: 'var(--font-sans)' }}
          />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Notifikasi"
          >
            <Bell size={18} className="text-foreground" />
            {unreadCount > 0 && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--accent)', fontSize: '0.5625rem' }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div
              className="absolute right-0 top-full mt-2 w-80 card-elevated rounded-lg overflow-hidden z-50"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="font-semibold text-sm">Notifikasi</p>
                <span className="badge-warning">{unreadCount} baru</span>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors"
                  style={{
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: n.unread ? 'rgba(22,163,74,0.04)' : 'transparent',
                  }}
                >
                  <p className="text-xs text-foreground leading-relaxed">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              ))}
              <div className="px-4 py-2 text-center">
                <button className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{ backgroundColor: roleColors[user.role] || 'var(--accent)' }}
            >
              {getInitials(user.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-tight">{user.name}</p>
              <p className="text-xs text-muted-foreground leading-tight flex items-center gap-1">
                <ShieldCheck size={9} />
                {roleNames[user.role] || user.role}
              </p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 top-full mt-2 w-48 card-elevated rounded-lg overflow-hidden z-50"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email || 'user@mi-islamiyah.sch.id'}</p>
              </div>
              <Link href="/profile" className="block w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                Profil Saya
              </Link>
              <Link href="/settings" className="block w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                Pengaturan
              </Link>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors text-danger flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for closing dropdowns */}
      {(showNotif || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotif(false); setShowProfile(false); }}
        />
      )}
    </header>
  );
}