'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import type { Student } from './StudentManagementClient';

interface Props {
  student: Student;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StudentDeleteModal({ student, onClose, onConfirm }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    // TODO: Backend integration — DELETE /api/students/:id
    onConfirm();
    toast.success(`Data siswa ${student.nama} berhasil dihapus`);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '420px' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--danger-bg)' }}>
              <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
            </div>
            <h2 className="text-base font-bold">Hapus Data Siswa</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground mb-3">
            Anda akan menghapus data siswa berikut secara permanen:
          </p>
          <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}>
            <p className="font-semibold text-sm">{student.nama}</p>
            <p className="text-xs text-muted-foreground">NIS: {student.nis} · Kelas {student.kelas}</p>
          </div>
          <p className="text-xs text-muted-foreground p-3 rounded-lg" style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca', color: 'var(--danger)' }}>
            ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data poin perilaku dan life skills siswa juga akan ikut terhapus.
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
            {loading ? <><Loader2 size={14} className="animate-spin" /> Menghapus...</> : 'Ya, Hapus Siswa'}
          </button>
        </div>
      </div>
    </div>
  );
}