'use client';

import React, { useState } from 'react';

import { AlertTriangle, Loader2, X, ShieldCheck, BookOpen, GraduationCap } from 'lucide-react';
import type { AppUser } from './UserManagementClient';

interface Props {
  user: AppUser;
  onClose: () => void;
  onConfirm: () => void;
}

export default function UserDeleteModal({ user, onClose, onConfirm }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    // TODO: Backend integration — DELETE /api/users/:id
    onConfirm();
    setLoading(false);
  };

  const roleIcon = user.role === 'Admin'
    ? <ShieldCheck size={14} style={{ color: 'var(--danger)' }} />
    : user.role === 'Guru'
      ? <BookOpen size={14} style={{ color: 'var(--info)' }} />
      : <GraduationCap size={14} style={{ color: 'var(--success)' }} />;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '420px' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--danger-bg)' }}>
              <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
            </div>
            <h2 className="text-base font-bold">Hapus Akun Pengguna</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground mb-3">
            Anda akan menghapus akun pengguna berikut secara permanen:
          </p>
          <div className="rounded-lg p-3 mb-4 flex items-center gap-3" style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{
                fontSize: '0.75rem',
                backgroundColor: user.role === 'Admin' ? 'var(--danger)' : user.role === 'Guru' ? 'var(--info)' : 'var(--primary)',
              }}
            >
              {user.nama.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm">{user.nama}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {roleIcon}
                {user.role} · {user.email}
              </p>
            </div>
          </div>

          {user.role === 'Admin' && (
            <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca' }}>
              <p className="text-xs font-semibold" style={{ color: 'var(--danger)' }}>
                ⚠️ Anda akan menghapus akun Admin. Pastikan masih ada setidaknya satu Admin aktif di sistem.
              </p>
            </div>
          )}

          <p className="text-xs p-3 rounded-lg" style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca', color: 'var(--danger)' }}>
            Tindakan ini tidak dapat dibatalkan. Semua data yang terkait dengan akun ini akan ikut terhapus.
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose} className="btn-secondary">Batal</button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="btn-danger"
            style={{ minWidth: '120px' }}
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Menghapus...</> : 'Ya, Hapus Akun'}
          </button>
        </div>
      </div>
    </div>
  );
}