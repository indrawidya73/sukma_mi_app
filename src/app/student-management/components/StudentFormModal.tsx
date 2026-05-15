'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { X, Loader2, GraduationCap } from 'lucide-react';
import type { Student } from './StudentManagementClient';

interface Props {
  student: Student | null;
  onClose: () => void;
  onSave: (data: Student) => void;
}

const kelasOptions = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
const waliKelasOptions = [
  'Ibu Sari Dewi', 'Ibu Nurul Hidayah', 'Pak Agus Wahyudi', 'Ibu Fatimah Zahra',
  'Pak Rudi Hartono', 'Ibu Khadijah Nur', 'Pak Yusuf Effendi', 'Ibu Laila Mufidah',
  'Ibu Rina Kusuma', 'Pak Denny Firmansyah', 'Ibu Siti Rahayu', 'Pak Budi Santoso',
];

export default function StudentFormModal({ student, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Student>({ defaultValues: student || { status: 'Aktif', jenisKelamin: 'L', totalPoin: 100 } });

  useEffect(() => {
    if (student) reset(student);
    else reset({ status: 'Aktif', jenisKelamin: 'L', totalPoin: 100 });
  }, [student, reset]);

  const onSubmit = async (data: Student) => {
    await new Promise(r => setTimeout(r, 600));
    // TODO: Backend integration — POST/PUT /api/students
    onSave(data);
    toast.success(student ? `Data ${data.nama} berhasil diperbarui` : `Siswa ${data.nama} berhasil ditambahkan`);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)' }}>
              <GraduationCap size={18} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h2 className="text-base font-bold">{student ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</h2>
              <p className="text-xs text-muted-foreground">Isi semua field yang diperlukan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
          {/* Section: Data Pribadi */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Data Pribadi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Nama Lengkap <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  {...register('nama', { required: 'Nama lengkap wajib diisi' })}
                  className={`input-field ${errors.nama ? 'input-error' : ''}`}
                  placeholder="Contoh: Muhammad Hafidz"
                />
                {errors.nama && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.nama.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  NIS <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-1.5">Nomor Induk Siswa unik</p>
                <input
                  {...register('nis', { required: 'NIS wajib diisi', pattern: { value: /^\d+$/, message: 'NIS hanya boleh angka' } })}
                  className={`input-field font-mono ${errors.nis ? 'input-error' : ''}`}
                  placeholder="2024001"
                />
                {errors.nis && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.nis.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Jenis Kelamin <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select {...register('jenisKelamin', { required: true })} className="input-field">
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Tanggal Lahir <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  {...register('tanggalLahir', { required: 'Tanggal lahir wajib diisi' })}
                  className={`input-field ${errors.tanggalLahir ? 'input-error' : ''}`}
                  placeholder="DD/MM/YYYY"
                />
                {errors.tanggalLahir && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.tanggalLahir.message}</p>}
              </div>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border)' }} />

          {/* Section: Data Kelas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Data Kelas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Kelas <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  {...register('kelas', { required: 'Kelas wajib dipilih' })}
                  className={`input-field ${errors.kelas ? 'input-error' : ''}`}
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasOptions.map(k => <option key={`kelas-form-${k}`} value={k}>Kelas {k}</option>)}
                </select>
                {errors.kelas && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.kelas.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Wali Kelas <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  {...register('waliKelas', { required: 'Wali kelas wajib dipilih' })}
                  className={`input-field ${errors.waliKelas ? 'input-error' : ''}`}
                >
                  <option value="">-- Pilih Wali Kelas --</option>
                  {waliKelasOptions.map(w => <option key={`wali-form-${w}`} value={w}>{w}</option>)}
                </select>
                {errors.waliKelas && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.waliKelas.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Status</label>
                <select {...register('status')} className="input-field">
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                  <option value="Pindah">Pindah</option>
                </select>
              </div>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border)' }} />

          {/* Section: Kontak & Orang Tua */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Kontak & Orang Tua</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Nama Orang Tua / Wali</label>
                <input
                  {...register('namaOrangTua')}
                  className="input-field"
                  placeholder="Nama lengkap orang tua"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">No. Telepon</label>
                <p className="text-xs text-muted-foreground mb-1.5">Nomor WhatsApp aktif orang tua</p>
                <input
                  {...register('noTelp')}
                  className="input-field font-mono"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1.5">Alamat Lengkap</label>
                <textarea
                  {...register('alamat')}
                  className="input-field resize-none"
                  rows={2}
                  placeholder="Jl. Kebonsari No. 12, Malang"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ minWidth: '130px' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                student ? 'Simpan Perubahan' : 'Tambah Siswa'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}