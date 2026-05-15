'use client';

import React from 'react';
import { X, Edit2, GraduationCap, Phone, MapPin, Star, User } from 'lucide-react';
import type { Student } from './StudentManagementClient';

interface Props {
  student: Student;
  onClose: () => void;
  onEdit: (s: Student) => void;
}

function getPoinLabel(poin: number) {
  if (poin >= 85) return { label: 'Baik Sekali', color: 'var(--success)', bg: 'var(--success-bg)' };
  if (poin >= 70) return { label: 'Baik', color: 'var(--info)', bg: 'var(--info-bg)' };
  if (poin >= 55) return { label: 'Perlu Perhatian', color: 'var(--warning)', bg: 'var(--warning-bg)' };
  return { label: 'Kritis', color: 'var(--danger)', bg: 'var(--danger-bg)' };
}

export default function StudentDetailModal({ student, onClose, onEdit }: Props) {
  const poinInfo = getPoinLabel(student.totalPoin);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base"
              style={{ backgroundColor: student.jenisKelamin === 'L' ? 'var(--info)' : 'var(--accent)' }}
            >
              {student.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">{student.nama}</h2>
              <p className="text-xs text-muted-foreground">NIS: {student.nis} · Kelas {student.kelas}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Poin Perilaku */}
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ backgroundColor: poinInfo.bg, border: `1px solid ${poinInfo.color}30` }}
          >
            <div className="flex items-center gap-3">
              <Star size={20} style={{ color: poinInfo.color }} />
              <div>
                <p className="text-xs text-muted-foreground">Total Poin Perilaku</p>
                <p className="text-2xl font-bold font-tabular" style={{ color: poinInfo.color }}>
                  {student.totalPoin}
                </p>
              </div>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: poinInfo.color, color: '#fff' }}
            >
              {poinInfo.label}
            </span>
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Jenis Kelamin', value: student.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan', icon: <User size={14} /> },
              { label: 'Tanggal Lahir', value: student.tanggalLahir, icon: null },
              { label: 'Kelas', value: `Kelas ${student.kelas}`, icon: <GraduationCap size={14} /> },
              { label: 'Wali Kelas', value: student.waliKelas, icon: null },
              { label: 'Nama Orang Tua', value: student.namaOrangTua, icon: null },
              { label: 'No. Telepon', value: student.noTelp, icon: <Phone size={14} /> },
            ].map((item, i) => (
              <div
                key={`detail-${i}`}
                className="p-3 rounded-lg"
                style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  {item.icon}
                  {item.label}
                </p>
                <p className="text-sm font-semibold leading-tight">{item.value || '—'}</p>
              </div>
            ))}
          </div>

          {/* Alamat */}
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <MapPin size={14} />
              Alamat
            </p>
            <p className="text-sm font-semibold">{student.alamat || '—'}</p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status Siswa</p>
            <span className={student.status === 'Aktif' ? 'badge-active' : student.status === 'Tidak Aktif' ? 'badge-inactive' : 'badge-warning'}>
              {student.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-3 px-6 py-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <button onClick={onClose} className="btn-secondary">Tutup</button>
          <button onClick={() => onEdit(student)} className="btn-primary">
            <Edit2 size={14} />
            EditData Siswa
          </button>
        </div>
      </div>
    </div>
  );
}