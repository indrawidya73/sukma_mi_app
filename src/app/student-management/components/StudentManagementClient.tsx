'use client';

import React, { useState, useMemo } from 'react';
import { GraduationCap, Plus, Search, Upload, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Edit2, Trash2, Eye, Download, X, FileSpreadsheet,  } from 'lucide-react';
import StudentFormModal from './StudentFormModal';
import StudentDeleteModal from './StudentDeleteModal';
import StudentDetailModal from './StudentDetailModal';
import BulkImportModal from './BulkImportModal';

export interface Student {
  id: string;
  nis: string;
  nama: string;
  kelas: string;
  jenisKelamin: 'L' | 'P';
  tanggalLahir: string;
  alamat: string;
  waliKelas: string;
  totalPoin: number;
  status: 'Aktif' | 'Tidak Aktif' | 'Pindah';
  noTelp: string;
  namaOrangTua: string;
}

const mockStudents: Student[] = [
  { id: 'siswa-001', nis: '2024001', nama: 'Muhammad Hafidz Al-Farisi', kelas: '4A', jenisKelamin: 'L', tanggalLahir: '12/03/2016', alamat: 'Jl. Kebonsari No. 12, Malang', waliKelas: 'Ibu Sari Dewi', totalPoin: 94, status: 'Aktif', noTelp: '081234567890', namaOrangTua: 'Bapak Wahyu Al-Farisi' },
  { id: 'siswa-002', nis: '2024002', nama: 'Aulia Rahmadani Putri', kelas: '3A', jenisKelamin: 'P', tanggalLahir: '07/08/2017', alamat: 'Jl. Dinoyo No. 45, Malang', waliKelas: 'Ibu Nurul Hidayah', totalPoin: 88, status: 'Aktif', noTelp: '082345678901', namaOrangTua: 'Ibu Dewi Rahmadani' },
  { id: 'siswa-003', nis: '2024003', nama: 'Farhan Ardiansyah', kelas: '5B', jenisKelamin: 'L', tanggalLahir: '22/11/2015', alamat: 'Jl. Soekarno Hatta No. 78, Malang', waliKelas: 'Pak Agus Wahyudi', totalPoin: 52, status: 'Aktif', noTelp: '083456789012', namaOrangTua: 'Bapak Ardi Setiawan' },
  { id: 'siswa-004', nis: '2024004', nama: 'Zahra Putri Andini', kelas: '6A', jenisKelamin: 'P', tanggalLahir: '05/02/2014', alamat: 'Jl. Veteran No. 23, Malang', waliKelas: 'Ibu Fatimah Zahra', totalPoin: 97, status: 'Aktif', noTelp: '084567890123', namaOrangTua: 'Ibu Sri Andini' },
  { id: 'siswa-005', nis: '2024005', nama: 'Rizki Maulana Putra', kelas: '3B', jenisKelamin: 'L', tanggalLahir: '14/06/2017', alamat: 'Jl. Gajayana No. 56, Malang', waliKelas: 'Pak Rudi Hartono', totalPoin: 58, status: 'Aktif', noTelp: '085678901234', namaOrangTua: 'Bapak Maulana Hasan' },
  { id: 'siswa-006', nis: '2024006', nama: 'Siti Aisyah Nurhaliza', kelas: '2B', jenisKelamin: 'P', tanggalLahir: '30/09/2018', alamat: 'Jl. Sulfat No. 11, Malang', waliKelas: 'Ibu Khadijah Nur', totalPoin: 55, status: 'Aktif', noTelp: '086789012345', namaOrangTua: 'Ibu Nurhaliza Sari' },
  { id: 'siswa-007', nis: '2024007', nama: 'Ilham Ramadhan Saputra', kelas: '4A', jenisKelamin: 'L', tanggalLahir: '18/04/2016', alamat: 'Jl. Tlogomas No. 34, Malang', waliKelas: 'Ibu Sari Dewi', totalPoin: 85, status: 'Aktif', noTelp: '087890123456', namaOrangTua: 'Bapak Ramadhan Putra' },
  { id: 'siswa-008', nis: '2024008', nama: 'Nisa Fauziah Ramadhani', kelas: '3A', jenisKelamin: 'P', tanggalLahir: '25/12/2017', alamat: 'Jl. Sigura-Gura No. 67, Malang', waliKelas: 'Ibu Nurul Hidayah', totalPoin: 63, status: 'Aktif', noTelp: '088901234567', namaOrangTua: 'Ibu Fauziah Hanum' },
  { id: 'siswa-009', nis: '2024009', nama: 'Bagas Wicaksono Hadi', kelas: '4A', jenisKelamin: 'L', tanggalLahir: '11/07/2016', alamat: 'Jl. Bendungan Sutami No. 89, Malang', waliKelas: 'Ibu Sari Dewi', totalPoin: 47, status: 'Aktif', noTelp: '089012345678', namaOrangTua: 'Bapak Wicaksono Hadi' },
  { id: 'siswa-010', nis: '2024010', nama: 'Dinda Rahmawati Sari', kelas: '6B', jenisKelamin: 'P', tanggalLahir: '03/01/2014', alamat: 'Jl. Kawi No. 15, Malang', waliKelas: 'Pak Yusuf Effendi', totalPoin: 61, status: 'Aktif', noTelp: '081123456789', namaOrangTua: 'Ibu Rahmawati Dewi' },
  { id: 'siswa-011', nis: '2024011', nama: 'Ahmad Zulfikar Hakim', kelas: '1B', jenisKelamin: 'L', tanggalLahir: '16/05/2019', alamat: 'Jl. Bandung No. 28, Malang', waliKelas: 'Ibu Laila Mufidah', totalPoin: 59, status: 'Aktif', noTelp: '082234567890', namaOrangTua: 'Bapak Zulfikar Rahman' },
  { id: 'siswa-012', nis: '2024012', nama: 'Putri Ayu Lestari', kelas: '5A', jenisKelamin: 'P', tanggalLahir: '28/10/2015', alamat: 'Jl. Simpang Bogor No. 44, Malang', waliKelas: 'Ibu Rina Kusuma', totalPoin: 91, status: 'Aktif', noTelp: '083345678901', namaOrangTua: 'Ibu Ayu Setiawati' },
  { id: 'siswa-013', nis: '2024013', nama: 'Farid Hidayatullah', kelas: '2A', jenisKelamin: 'L', tanggalLahir: '09/03/2018', alamat: 'Jl. Surabaya No. 7, Malang', waliKelas: 'Pak Denny Firmansyah', totalPoin: 79, status: 'Aktif', noTelp: '084456789012', namaOrangTua: 'Bapak Hidayatullah Yusuf' },
  { id: 'siswa-014', nis: '2023001', nama: 'Reza Pratama Wijaya', kelas: '6A', jenisKelamin: 'L', tanggalLahir: '20/08/2013', alamat: 'Jl. Pahlawan No. 3, Malang', waliKelas: 'Ibu Fatimah Zahra', totalPoin: 76, status: 'Tidak Aktif', noTelp: '085567890123', namaOrangTua: 'Bapak Pratama Wijaya' },
];

const kelasOptions = ['Semua Kelas', '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
const jkOptions = ['Semua', 'Laki-laki', 'Perempuan'];
const statusOptions = ['Semua Status', 'Aktif', 'Tidak Aktif', 'Pindah'];

type SortField = 'nama' | 'nis' | 'kelas' | 'totalPoin';
type SortDir = 'asc' | 'desc';

export default function StudentManagementClient() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua Kelas');
  const [filterJK, setFilterJK] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [sortField, setSortField] = useState<SortField>('nama');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'import'>('table');

  const filtered = useMemo(() => {
    let result = students.filter((s) => {
      const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) ||
        s.nis.includes(search) ||
        s.kelas.toLowerCase().includes(search.toLowerCase());
      const matchKelas = filterKelas === 'Semua Kelas' || s.kelas === filterKelas;
      const matchJK = filterJK === 'Semua' ||
        (filterJK === 'Laki-laki' && s.jenisKelamin === 'L') ||
        (filterJK === 'Perempuan' && s.jenisKelamin === 'P');
      const matchStatus = filterStatus === 'Semua Status' || s.status === filterStatus;
      return matchSearch && matchKelas && matchJK && matchStatus;
    });
    result = result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'nama') cmp = a.nama.localeCompare(b.nama);
      else if (sortField === 'nis') cmp = a.nis.localeCompare(b.nis);
      else if (sortField === 'kelas') cmp = a.kelas.localeCompare(b.kelas);
      else if (sortField === 'totalPoin') cmp = a.totalPoin - b.totalPoin;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [students, search, filterKelas, filterJK, filterStatus, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(paginated.map(s => s.id)));
    else setSelectedIds(new Set());
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id); else next.delete(id);
    setSelectedIds(next);
  };

  const handleSaveStudent = (data: Student) => {
    if (editStudent) {
      setStudents(prev => prev.map(s => s.id === data.id ? data : s));
    } else {
      setStudents(prev => [...prev, { ...data, id: `siswa-${Date.now()}` }]);
    }
    setShowAddModal(false);
    setEditStudent(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteStudent) {
      setStudents(prev => prev.filter(s => s.id !== deleteStudent.id));
      setDeleteStudent(null);
    }
  };

  const handleBulkDelete = () => {
    setStudents(prev => prev.filter(s => !selectedIds.has(s.id)));
    setSelectedIds(new Set());
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown size={12} className="text-muted-foreground opacity-40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} style={{ color: 'var(--primary)' }} />
      : <ChevronDown size={12} style={{ color: 'var(--primary)' }} />;
  };

  function getPoinBadge(poin: number) {
    if (poin >= 85) return <span className="badge-active font-tabular">{poin}</span>;
    if (poin >= 65) return <span className="badge-warning font-tabular">{poin}</span>;
    return (
      <span className="font-tabular text-xs font-bold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)' }}>
        {poin}
      </span>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--primary-light)' }}>
            <GraduationCap size={20} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Data Siswa</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} siswa ditemukan · {students.filter(s => s.status === 'Aktif').length} aktif
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowBulkImport(true)}
            className="btn-secondary text-sm"
          >
            <Upload size={15} />
            Import Excel
          </button>
          <button className="btn-secondary text-sm">
            <Download size={15} />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-sm"
          >
            <Plus size={15} />
            Tambah Siswa
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5" style={{ borderBottom: '2px solid var(--border)' }}>
        {[
          { key: 'table', label: 'Daftar Siswa' },
          { key: 'import', label: 'Import Massal' },
        ].map((tab) => (
          <button
            key={`tab-${tab.key}`}
            onClick={() => setActiveTab(tab.key as 'table' | 'import')}
            className="px-4 py-2.5 text-sm font-semibold transition-colors"
            style={{
              borderBottom: activeTab === tab.key ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === tab.key ? 'var(--primary)' : 'var(--muted-foreground)',
              marginBottom: '-2px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'import' ? (
        <BulkImportSection />
      ) : (
        <>
          {/* Filters */}
          <div className="card-elevated rounded-xl p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[200px]"
                style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}>
                <Search size={15} className="text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Cari nama, NIS, atau kelas..."
                  className="bg-transparent text-sm outline-none w-full"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
                {search && (
                  <button onClick={() => setSearch('')}>
                    <X size={14} className="text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              <select
                value={filterKelas}
                onChange={e => { setFilterKelas(e.target.value); setPage(1); }}
                className="input-field w-auto min-w-[130px]"
              >
                {kelasOptions.map(k => <option key={`kelas-opt-${k}`} value={k}>{k}</option>)}
              </select>

              <select
                value={filterJK}
                onChange={e => { setFilterJK(e.target.value); setPage(1); }}
                className="input-field w-auto min-w-[130px]"
              >
                {jkOptions.map(j => <option key={`jk-opt-${j}`} value={j}>{j}</option>)}
              </select>

              <select
                value={filterStatus}
                onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
                className="input-field w-auto min-w-[130px]"
              >
                {statusOptions.map(s => <option key={`status-opt-${s}`} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div
              className="flex items-center justify-between px-4 py-3 rounded-xl mb-4 animate-slide-up"
              style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}
            >
              <p className="text-sm font-semibold" style={{ color: '#92400e' }}>
                {selectedIds.size} siswa dipilih
              </p>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs py-1.5">Export Terpilih</button>
                <button onClick={handleBulkDelete} className="btn-danger text-xs py-1.5">
                  Hapus Terpilih
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="card-elevated rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr style={{ backgroundColor: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={paginated.length > 0 && paginated.every(s => selectedIds.has(s.id))}
                        onChange={e => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded"
                      />
                    </th>
                    <th
                      className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground cursor-pointer select-none"
                      onClick={() => handleSort('nis')}
                    >
                      <div className="flex items-center gap-1">NIS <SortIcon field="nis" /></div>
                    </th>
                    <th
                      className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground cursor-pointer select-none"
                      onClick={() => handleSort('nama')}
                    >
                      <div className="flex items-center gap-1">Nama Siswa <SortIcon field="nama" /></div>
                    </th>
                    <th
                      className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground cursor-pointer select-none"
                      onClick={() => handleSort('kelas')}
                    >
                      <div className="flex items-center gap-1">Kelas <SortIcon field="kelas" /></div>
                    </th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">JK</th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">Tgl Lahir</th>
                    <th
                      className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground cursor-pointer select-none"
                      onClick={() => handleSort('totalPoin')}
                    >
                      <div className="flex items-center gap-1">Total Poin <SortIcon field="totalPoin" /></div>
                    </th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">Wali Kelas</th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <GraduationCap size={40} className="text-muted-foreground opacity-40" />
                          <p className="font-semibold text-muted-foreground">Tidak ada siswa ditemukan</p>
                          <p className="text-xs text-muted-foreground">Coba ubah filter pencarian atau tambah siswa baru</p>
                          <button onClick={() => setShowAddModal(true)} className="btn-primary text-xs mt-1">
                            <Plus size={13} /> Tambah Siswa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginated.map((s, idx) => (
                      <tr
                        key={s.id}
                        className="table-row-hover transition-colors"
                        style={{
                          borderBottom: '1px solid var(--border)',
                          backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.012)',
                        }}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(s.id)}
                            onChange={e => handleSelectRow(s.id, e.target.checked)}
                            className="w-4 h-4 accent-primary rounded"
                          />
                        </td>
                        <td className="px-3 py-3 text-xs font-mono text-muted-foreground">{s.nis}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                              style={{
                                fontSize: '0.625rem',
                                backgroundColor: s.jenisKelamin === 'L' ? 'var(--info)' : 'var(--accent)',
                              }}
                            >
                              {s.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-sm leading-tight">{s.nama}</p>
                              <p className="text-xs text-muted-foreground">{s.namaOrangTua}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="badge-siswa">Kelas {s.kelas}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: s.jenisKelamin === 'L' ? 'var(--info-bg)' : 'rgba(233,30,140,0.1)',
                              color: s.jenisKelamin === 'L' ? 'var(--info)' : 'var(--accent)',
                            }}
                          >
                            {s.jenisKelamin === 'L' ? 'L' : 'P'}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-xs text-muted-foreground font-tabular">{s.tanggalLahir}</td>
                        <td className="px-3 py-3">{getPoinBadge(s.totalPoin)}</td>
                        <td className="px-3 py-3 text-xs text-muted-foreground max-w-[120px] truncate">{s.waliKelas}</td>
                        <td className="px-3 py-3">
                          <span className={s.status === 'Aktif' ? 'badge-active' : s.status === 'Tidak Aktif' ? 'badge-inactive' : 'badge-warning'}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setViewStudent(s)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-muted"
                              title="Lihat detail siswa"
                            >
                              <Eye size={14} style={{ color: 'var(--info)' }} />
                            </button>
                            <button
                              onClick={() => setEditStudent(s)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-muted"
                              title="Edit data siswa"
                            >
                              <Edit2 size={14} style={{ color: 'var(--primary)' }} />
                            </button>
                            <button
                              onClick={() => setDeleteStudent(s)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-muted"
                              title="Hapus data siswa"
                            >
                              <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div
                className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Tampilkan</span>
                  <select
                    value={perPage}
                    onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
                    className="input-field w-auto text-xs py-1"
                  >
                    {[10, 25, 50].map(n => <option key={`perpage-${n}`} value={n}>{n}</option>)}
                  </select>
                  <span>dari {filtered.length} siswa</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 hover:bg-muted"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={`page-${p}`}
                        onClick={() => setPage(p)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all"
                        style={{
                          backgroundColor: page === p ? 'var(--primary)' : 'transparent',
                          color: page === p ? '#fff' : 'var(--foreground)',
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 hover:bg-muted"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      {(showAddModal || editStudent) && (
        <StudentFormModal
          student={editStudent}
          onClose={() => { setShowAddModal(false); setEditStudent(null); }}
          onSave={handleSaveStudent}
        />
      )}
      {deleteStudent && (
        <StudentDeleteModal
          student={deleteStudent}
          onClose={() => setDeleteStudent(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {viewStudent && (
        <StudentDetailModal
          student={viewStudent}
          onClose={() => setViewStudent(null)}
          onEdit={(s) => { setViewStudent(null); setEditStudent(s); }}
        />
      )}
      {showBulkImport && (
        <BulkImportModal onClose={() => setShowBulkImport(false)} />
      )}
    </div>
  );
}

function BulkImportSection() {
  return (
    <div className="card-elevated rounded-xl p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--primary-light)' }}>
          <FileSpreadsheet size={28} style={{ color: 'var(--primary)' }} />
        </div>
        <h2 className="text-lg font-bold mb-2">Import Data Siswa via Excel</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Upload file Excel (.xlsx) berisi daftar siswa sesuai template yang disediakan. Sistem akan memvalidasi data sebelum menyimpan.
        </p>
        <div
          className="border-2 border-dashed rounded-xl p-8 mb-4 cursor-pointer hover:bg-muted/50 transition-colors"
          style={{ borderColor: 'var(--primary)' }}
        >
          <Upload size={32} className="mx-auto mb-3" style={{ color: 'var(--primary)' }} />
          <p className="text-sm font-semibold mb-1">Klik atau seret file ke sini</p>
          <p className="text-xs text-muted-foreground">Format: .xlsx, maksimal 5MB</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button className="btn-secondary text-sm">
            <Download size={15} />
            Unduh Template Excel
          </button>
          <button className="btn-primary text-sm">
            <Upload size={15} />
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}