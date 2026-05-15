-- ============================================================
-- SUKMA - Sistem Informasi Sekolah MI Islamiyah Malang
-- SQL Schema + Dummy Data
-- Compatible: MySQL 8.0+ / MariaDB 10.5+
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- ============================================================
-- 1. TABEL PENGGUNA (Users)
-- ============================================================
DROP TABLE IF EXISTS `pengguna`;
CREATE TABLE `pengguna` (
  `id`            VARCHAR(36)  NOT NULL,
  `nama`          VARCHAR(100) NOT NULL,
  `email`         VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role`          ENUM('admin','guru','siswa') NOT NULL DEFAULT 'guru',
  `no_telp`       VARCHAR(20)  DEFAULT NULL,
  `foto`          VARCHAR(255) DEFAULT NULL,
  `status`        ENUM('Aktif','Tidak Aktif') NOT NULL DEFAULT 'Aktif',
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. TABEL KELAS
-- ============================================================
DROP TABLE IF EXISTS `kelas`;
CREATE TABLE `kelas` (
  `id`            VARCHAR(36)  NOT NULL,
  `nama_kelas`    VARCHAR(10)  NOT NULL,
  `tingkat`       TINYINT      NOT NULL COMMENT '1-6',
  `wali_kelas_id` VARCHAR(36)  DEFAULT NULL,
  `ruangan`       VARCHAR(50)  DEFAULT NULL,
  `jumlah_siswa`  SMALLINT     DEFAULT 0,
  `tahun_ajaran`  VARCHAR(10)  NOT NULL DEFAULT '2024/2025',
  `status`        ENUM('Aktif','Tidak Aktif') NOT NULL DEFAULT 'Aktif',
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`wali_kelas_id`) REFERENCES `pengguna`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. TABEL SISWA
-- ============================================================
DROP TABLE IF EXISTS `siswa`;
CREATE TABLE `siswa` (
  `id`             VARCHAR(36)  NOT NULL,
  `nis`            VARCHAR(20)  NOT NULL UNIQUE,
  `nama`           VARCHAR(100) NOT NULL,
  `kelas_id`       VARCHAR(36)  DEFAULT NULL,
  `jenis_kelamin`  ENUM('L','P') NOT NULL,
  `tanggal_lahir`  DATE         DEFAULT NULL,
  `alamat`         TEXT         DEFAULT NULL,
  `nama_orang_tua` VARCHAR(100) DEFAULT NULL,
  `no_telp`        VARCHAR(20)  DEFAULT NULL,
  `total_poin`     SMALLINT     NOT NULL DEFAULT 100,
  `status`         ENUM('Aktif','Tidak Aktif','Pindah') NOT NULL DEFAULT 'Aktif',
  `created_at`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. TABEL MATA PELAJARAN
-- ============================================================
DROP TABLE IF EXISTS `mata_pelajaran`;
CREATE TABLE `mata_pelajaran` (
  `id`    VARCHAR(36)  NOT NULL,
  `nama`  VARCHAR(100) NOT NULL,
  `kode`  VARCHAR(20)  DEFAULT NULL,
  `jenis` ENUM('Agama','Umum','Muatan Lokal') NOT NULL DEFAULT 'Umum',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. TABEL JADWAL PELAJARAN
-- ============================================================
DROP TABLE IF EXISTS `jadwal_pelajaran`;
CREATE TABLE `jadwal_pelajaran` (
  `id`              VARCHAR(36) NOT NULL,
  `kelas_id`        VARCHAR(36) NOT NULL,
  `mapel_id`        VARCHAR(36) NOT NULL,
  `guru_id`         VARCHAR(36) DEFAULT NULL,
  `hari`            ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu') NOT NULL,
  `jam_mulai`       TIME        NOT NULL,
  `jam_selesai`     TIME        NOT NULL,
  `ruangan`         VARCHAR(50) DEFAULT NULL,
  `tahun_ajaran`    VARCHAR(10) NOT NULL DEFAULT '2024/2025',
  `created_at`      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`mapel_id`) REFERENCES `mata_pelajaran`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`guru_id`)  REFERENCES `pengguna`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. TABEL KATEGORI PERILAKU
-- ============================================================
DROP TABLE IF EXISTS `kategori_perilaku`;
CREATE TABLE `kategori_perilaku` (
  `id`   VARCHAR(36)  NOT NULL,
  `nama` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. TABEL ITEM PERILAKU (Referensi Poin)
-- ============================================================
DROP TABLE IF EXISTS `item_perilaku`;
CREATE TABLE `item_perilaku` (
  `id`           VARCHAR(36)  NOT NULL,
  `kategori_id`  VARCHAR(36)  NOT NULL,
  `deskripsi`    TEXT         NOT NULL,
  `jenis`        ENUM('positif','negatif') NOT NULL,
  `poin`         SMALLINT     NOT NULL COMMENT 'Positif: +5, Negatif: -10 to -30',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori_perilaku`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 8. TABEL CATATAN POIN PERILAKU
-- ============================================================
DROP TABLE IF EXISTS `catatan_poin`;
CREATE TABLE `catatan_poin` (
  `id`           VARCHAR(36) NOT NULL,
  `siswa_id`     VARCHAR(36) NOT NULL,
  `item_id`      VARCHAR(36) NOT NULL,
  `guru_id`      VARCHAR(36) DEFAULT NULL,
  `tanggal`      DATE        NOT NULL,
  `poin`         SMALLINT    NOT NULL,
  `keterangan`   TEXT        DEFAULT NULL,
  `created_at`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`)  REFERENCES `item_perilaku`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`guru_id`)  REFERENCES `pengguna`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 9. TABEL ABSENSI
-- ============================================================
DROP TABLE IF EXISTS `absensi`;
CREATE TABLE `absensi` (
  `id`          VARCHAR(36) NOT NULL,
  `siswa_id`    VARCHAR(36) NOT NULL,
  `kelas_id`    VARCHAR(36) NOT NULL,
  `mapel_id`    VARCHAR(36) DEFAULT NULL,
  `guru_id`     VARCHAR(36) DEFAULT NULL,
  `tanggal`     DATE        NOT NULL,
  `status`      ENUM('Hadir','Sakit','Izin','Alpha') NOT NULL DEFAULT 'Hadir',
  `keterangan`  TEXT        DEFAULT NULL,
  `created_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_absensi` (`siswa_id`, `mapel_id`, `tanggal`),
  FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`mapel_id`) REFERENCES `mata_pelajaran`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`guru_id`)  REFERENCES `pengguna`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 10. TABEL LIFE SKILLS HARIAN
-- ============================================================
DROP TABLE IF EXISTS `life_skills_harian`;
CREATE TABLE `life_skills_harian` (
  `id`         VARCHAR(36) NOT NULL,
  `siswa_id`   VARCHAR(36) NOT NULL,
  `kelas_id`   VARCHAR(36) NOT NULL,
  `tanggal`    DATE        NOT NULL,
  `nilai`      ENUM('B','C','K') NOT NULL COMMENT 'B=Baik, C=Cukup, K=Kurang',
  `bulan`      TINYINT     NOT NULL,
  `tahun`      SMALLINT    NOT NULL,
  `dicatat_oleh` VARCHAR(36) DEFAULT NULL,
  `created_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_lifeskills` (`siswa_id`, `tanggal`),
  FOREIGN KEY (`siswa_id`)      REFERENCES `siswa`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`kelas_id`)      REFERENCES `kelas`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`dicatat_oleh`)  REFERENCES `pengguna`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- ============================================================
-- DATA DUMMY
-- ============================================================
-- ============================================================

-- ============================================================
-- PENGGUNA (Admin, Guru, Siswa)
-- ============================================================
INSERT INTO `pengguna` (`id`, `nama`, `email`, `password_hash`, `role`, `no_telp`, `status`) VALUES
-- Admin
('usr-admin-01', 'Ahmad Fauzi, S.Pd', 'ahmad.fauzi@mi-islamiyah.sch.id', '$2b$10$sukma2026hashedpassword', 'admin', '081234567890', 'Aktif'),
-- Guru
('usr-guru-01', 'Ibu Sari Dewi, S.Pd',        'sari.dewi@mi-islamiyah.sch.id',        '$2b$10$gurupasshash01', 'guru', '081111111101', 'Aktif'),
('usr-guru-02', 'Ibu Nurul Hidayah, S.Pd',    'nurul.hidayah@mi-islamiyah.sch.id',    '$2b$10$gurupasshash02', 'guru', '081111111102', 'Aktif'),
('usr-guru-03', 'Pak Agus Wahyudi, S.Pd',     'agus.wahyudi@mi-islamiyah.sch.id',     '$2b$10$gurupasshash03', 'guru', '081111111103', 'Aktif'),
('usr-guru-04', 'Ibu Fatimah Zahra, S.Pd',    'fatimah.zahra@mi-islamiyah.sch.id',    '$2b$10$gurupasshash04', 'guru', '081111111104', 'Aktif'),
('usr-guru-05', 'Pak Rudi Hartono, S.Pd',     'rudi.hartono@mi-islamiyah.sch.id',     '$2b$10$gurupasshash05', 'guru', '081111111105', 'Aktif'),
('usr-guru-06', 'Pak Yusuf Effendi, S.Pd',    'yusuf.effendi@mi-islamiyah.sch.id',    '$2b$10$gurupasshash06', 'guru', '081111111106', 'Aktif'),
('usr-guru-07', 'Ibu Rina Kusuma, S.Pd',      'rina.kusuma@mi-islamiyah.sch.id',      '$2b$10$gurupasshash07', 'guru', '081111111107', 'Aktif'),
('usr-guru-08', 'Pak Denny Firmansyah, S.Pd', 'denny.firmansyah@mi-islamiyah.sch.id', '$2b$10$gurupasshash08', 'guru', '081111111108', 'Aktif'),
('usr-guru-09', 'Ibu Laila Mufidah, S.Pd',   'laila.mufidah@mi-islamiyah.sch.id',    '$2b$10$gurupasshash09', 'guru', '081111111109', 'Aktif'),
('usr-guru-10', 'Ibu Khadijah Nur, S.Pd',    'khadijah.nur@mi-islamiyah.sch.id',     '$2b$10$gurupasshash10', 'guru', '081111111110', 'Aktif');

-- ============================================================
-- KELAS
-- ============================================================
INSERT INTO `kelas` (`id`, `nama_kelas`, `tingkat`, `wali_kelas_id`, `ruangan`, `jumlah_siswa`, `tahun_ajaran`, `status`) VALUES
('kls-1a', '1A', 1, 'usr-guru-09', 'Ruang 101', 28, '2024/2025', 'Aktif'),
('kls-1b', '1B', 1, 'usr-guru-10', 'Ruang 102', 27, '2024/2025', 'Aktif'),
('kls-2a', '2A', 2, 'usr-guru-08', 'Ruang 201', 30, '2024/2025', 'Aktif'),
('kls-2b', '2B', 2, 'usr-guru-10', 'Ruang 202', 29, '2024/2025', 'Aktif'),
('kls-3a', '3A', 3, 'usr-guru-02', 'Ruang 301', 31, '2024/2025', 'Aktif'),
('kls-3b', '3B', 3, 'usr-guru-05', 'Ruang 302', 28, '2024/2025', 'Aktif'),
('kls-4a', '4A', 4, 'usr-guru-01', 'Ruang 401', 32, '2024/2025', 'Aktif'),
('kls-4b', '4B', 4, 'usr-admin-01','Ruang 402', 30, '2024/2025', 'Aktif'),
('kls-5a', '5A', 5, 'usr-guru-07', 'Ruang 501', 29, '2024/2025', 'Aktif'),
('kls-5b', '5B', 5, 'usr-guru-03', 'Ruang 502', 28, '2024/2025', 'Aktif'),
('kls-6a', '6A', 6, 'usr-guru-04', 'Ruang 601', 27, '2024/2025', 'Aktif'),
('kls-6b', '6B', 6, 'usr-guru-06', 'Ruang 602', 26, '2024/2025', 'Aktif');

-- ============================================================
-- SISWA (30 siswa dummy)
-- ============================================================
INSERT INTO `siswa` (`id`, `nis`, `nama`, `kelas_id`, `jenis_kelamin`, `tanggal_lahir`, `alamat`, `nama_orang_tua`, `no_telp`, `total_poin`, `status`) VALUES
('sis-001', '2024001', 'Muhammad Hafidz Al-Farisi',  'kls-4a', 'L', '2016-03-12', 'Jl. Kebonsari No. 12, Malang',        'Bapak Wahyu Al-Farisi',     '081234567890', 94, 'Aktif'),
('sis-002', '2024002', 'Aulia Rahmadani Putri',       'kls-3a', 'P', '2017-08-07', 'Jl. Dinoyo No. 45, Malang',           'Ibu Dewi Rahmadani',        '082345678901', 88, 'Aktif'),
('sis-003', '2024003', 'Farhan Ardiansyah',           'kls-5b', 'L', '2015-11-22', 'Jl. Soekarno Hatta No. 78, Malang',   'Bapak Ardi Setiawan',       '083456789012', 52, 'Aktif'),
('sis-004', '2024004', 'Zahra Putri Andini',          'kls-6a', 'P', '2014-02-05', 'Jl. Veteran No. 23, Malang',          'Ibu Sri Andini',            '084567890123', 97, 'Aktif'),
('sis-005', '2024005', 'Rizki Maulana Putra',         'kls-3b', 'L', '2017-06-14', 'Jl. Gajayana No. 56, Malang',         'Bapak Maulana Hasan',       '085678901234', 58, 'Aktif'),
('sis-006', '2024006', 'Siti Aisyah Nurhaliza',       'kls-2b', 'P', '2018-09-30', 'Jl. Sulfat No. 11, Malang',           'Ibu Nurhaliza Sari',        '086789012345', 55, 'Aktif'),
('sis-007', '2024007', 'Ilham Ramadhan Saputra',      'kls-4a', 'L', '2016-04-18', 'Jl. Tlogomas No. 34, Malang',         'Bapak Ramadhan Putra',      '087890123456', 85, 'Aktif'),
('sis-008', '2024008', 'Nisa Fauziah Ramadhani',      'kls-3a', 'P', '2017-12-25', 'Jl. Sigura-Gura No. 67, Malang',      'Ibu Fauziah Hanum',         '088901234567', 63, 'Aktif'),
('sis-009', '2024009', 'Bagas Wicaksono Hadi',        'kls-4a', 'L', '2016-07-11', 'Jl. Bendungan Sutami No. 89, Malang', 'Bapak Wicaksono Hadi',      '089012345678', 47, 'Aktif'),
('sis-010', '2024010', 'Dinda Rahmawati Sari',        'kls-6b', 'P', '2014-01-03', 'Jl. Kawi No. 15, Malang',             'Ibu Rahmawati Dewi',        '081123456789', 61, 'Aktif'),
('sis-011', '2024011', 'Ahmad Zulfikar Hakim',        'kls-1b', 'L', '2019-05-16', 'Jl. Bandung No. 28, Malang',          'Bapak Zulfikar Rahman',     '082234567890', 59, 'Aktif'),
('sis-012', '2024012', 'Putri Ayu Lestari',           'kls-5a', 'P', '2015-10-28', 'Jl. Simpang Bogor No. 44, Malang',    'Ibu Ayu Setiawati',         '083345678901', 91, 'Aktif'),
('sis-013', '2024013', 'Farid Hidayatullah',          'kls-2a', 'L', '2018-03-09', 'Jl. Surabaya No. 7, Malang',          'Bapak Hidayatullah Yusuf',  '084456789012', 79, 'Aktif'),
('sis-014', '2023001', 'Reza Pratama Wijaya',         'kls-6a', 'L', '2013-08-20', 'Jl. Pahlawan No. 3, Malang',          'Bapak Pratama Wijaya',      '085567890123', 76, 'Tidak Aktif'),
('sis-015', '2024015', 'Nadia Putri Santoso',         'kls-4a', 'P', '2016-01-15', 'Jl. Mergan No. 5, Malang',            'Ibu Santoso Wati',          '086678901234', 82, 'Aktif'),
('sis-016', '2024016', 'Omar Faruq Habibie',          'kls-4a', 'L', '2016-09-22', 'Jl. Candi No. 18, Malang',            'Bapak Habibie Santoso',     '087789012345', 75, 'Aktif'),
('sis-017', '2024017', 'Qori Amalia Dewi',            'kls-5a', 'P', '2015-04-11', 'Jl. Ijen No. 33, Malang',             'Ibu Amalia Sari',           '088890123456', 89, 'Aktif'),
('sis-018', '2024018', 'Rafi Ahmad Santoso',          'kls-5a', 'L', '2015-07-08', 'Jl. Semeru No. 21, Malang',           'Bapak Ahmad Santoso',       '089901234567', 73, 'Aktif'),
('sis-019', '2024019', 'Salma Nur Izzati',            'kls-5a', 'P', '2015-12-19', 'Jl. Arjuno No. 9, Malang',            'Ibu Nur Izzati',            '081012345678', 86, 'Aktif'),
('sis-020', '2024020', 'Taufik Hidayat',              'kls-5a', 'L', '2015-03-27', 'Jl. Bromo No. 14, Malang',            'Bapak Hidayat Putra',       '082123456789', 68, 'Aktif'),
('sis-021', '2024021', 'Umar Fadhil Rahman',          'kls-6a', 'L', '2014-06-03', 'Jl. Welirang No. 7, Malang',          'Bapak Fadhil Rahman',       '083234567890', 92, 'Aktif'),
('sis-022', '2024022', 'Vina Amelia Putri',           'kls-6a', 'P', '2014-10-17', 'Jl. Anjasmoro No. 25, Malang',        'Ibu Amelia Dewi',           '084345678901', 84, 'Aktif'),
('sis-023', '2024023', 'Wahyu Setiawan',              'kls-6a', 'L', '2014-04-29', 'Jl. Penanggungan No. 11, Malang',     'Bapak Setiawan Hadi',       '085456789012', 77, 'Aktif'),
('sis-024', '2024024', 'Aisyah Nur Fadilah',          'kls-1a', 'P', '2020-02-14', 'Jl. Kertanegara No. 6, Malang',       'Ibu Fadilah Sari',          '086567890123', 90, 'Aktif'),
('sis-025', '2024025', 'Bintang Ramadhan',            'kls-1a', 'L', '2020-08-05', 'Jl. Majapahit No. 3, Malang',         'Bapak Ramadhan Putra',      '087678901234', 72, 'Aktif'),
('sis-026', '2024026', 'Cahya Putri Utami',           'kls-1a', 'P', '2020-05-21', 'Jl. Singosari No. 8, Malang',         'Ibu Utami Dewi',            '088789012345', 85, 'Aktif'),
('sis-027', '2024027', 'Kevin Ardianto',              'kls-3a', 'L', '2017-11-13', 'Jl. Tumapel No. 16, Malang',          'Bapak Ardianto Hasan',      '089890123456', 71, 'Aktif'),
('sis-028', '2024028', 'Laila Nur Azizah',            'kls-3a', 'P', '2017-07-30', 'Jl. Gajah Mada No. 22, Malang',       'Ibu Nur Azizah',            '081901234567', 93, 'Aktif'),
('sis-029', '2024029', 'Maulana Yusuf',               'kls-3a', 'L', '2017-09-04', 'Jl. Diponegoro No. 37, Malang',       'Bapak Yusuf Hakim',         '082012345678', 66, 'Aktif'),
('sis-030', '2024030', 'Gita Permata Sari',           'kls-2a', 'P', '2018-06-18', 'Jl. Hasanuddin No. 4, Malang',        'Ibu Permata Dewi',          '083123456789', 80, 'Aktif');

-- ============================================================
-- MATA PELAJARAN
-- ============================================================
INSERT INTO `mata_pelajaran` (`id`, `nama`, `kode`, `jenis`) VALUES
('mp-001', 'Al-Quran Hadits',       'AQH', 'Agama'),
('mp-002', 'Aqidah Akhlak',         'AAK', 'Agama'),
('mp-003', 'Fiqih',                 'FQH', 'Agama'),
('mp-004', 'SKI',                   'SKI', 'Agama'),
('mp-005', 'Bahasa Arab',           'BAR', 'Agama'),
('mp-006', 'Matematika',            'MTK', 'Umum'),
('mp-007', 'Bahasa Indonesia',      'BIN', 'Umum'),
('mp-008', 'IPA',                   'IPA', 'Umum'),
('mp-009', 'IPS',                   'IPS', 'Umum'),
('mp-010', 'PPKN',                  'PKN', 'Umum'),
('mp-011', 'Bahasa Inggris',        'BIG', 'Umum'),
('mp-012', 'Penjaskes',             'PJK', 'Umum'),
('mp-013', 'SBdP',                  'SBP', 'Umum'),
('mp-014', 'Tahfidz',               'THF', 'Agama'),
('mp-015', 'Muatan Lokal',          'MUL', 'Muatan Lokal');

-- ============================================================
-- JADWAL PELAJARAN (Kelas 4A - Senin s/d Jumat)
-- ============================================================
INSERT INTO `jadwal_pelajaran` (`id`, `kelas_id`, `mapel_id`, `guru_id`, `hari`, `jam_mulai`, `jam_selesai`, `ruangan`, `tahun_ajaran`) VALUES
('jdw-001', 'kls-4a', 'mp-014', 'usr-guru-01', 'Senin',  '07:00:00', '07:30:00', 'Ruang 401', '2024/2025'),
('jdw-002', 'kls-4a', 'mp-006', 'usr-guru-01', 'Senin',  '07:30:00', '08:40:00', 'Ruang 401', '2024/2025'),
('jdw-003', 'kls-4a', 'mp-007', 'usr-guru-01', 'Senin',  '08:40:00', '09:50:00', 'Ruang 401', '2024/2025'),
('jdw-004', 'kls-4a', 'mp-008', 'usr-guru-01', 'Senin',  '10:10:00', '11:20:00', 'Ruang 401', '2024/2025'),
('jdw-005', 'kls-4a', 'mp-014', 'usr-guru-01', 'Selasa', '07:00:00', '07:30:00', 'Ruang 401', '2024/2025'),
('jdw-006', 'kls-4a', 'mp-001', 'usr-guru-01', 'Selasa', '07:30:00', '08:40:00', 'Ruang 401', '2024/2025'),
('jdw-007', 'kls-4a', 'mp-009', 'usr-guru-01', 'Selasa', '08:40:00', '09:50:00', 'Ruang 401', '2024/2025'),
('jdw-008', 'kls-4a', 'mp-014', 'usr-guru-01', 'Rabu',   '07:00:00', '07:30:00', 'Ruang 401', '2024/2025'),
('jdw-009', 'kls-4a', 'mp-011', 'usr-admin-01','Rabu',   '07:30:00', '08:40:00', 'Ruang 401', '2024/2025'),
('jdw-010', 'kls-4a', 'mp-003', 'usr-guru-01', 'Rabu',   '08:40:00', '09:50:00', 'Ruang 401', '2024/2025'),
('jdw-011', 'kls-4a', 'mp-014', 'usr-guru-01', 'Kamis',  '07:00:00', '07:30:00', 'Ruang 401', '2024/2025'),
('jdw-012', 'kls-4a', 'mp-002', 'usr-guru-01', 'Kamis',  '07:30:00', '08:40:00', 'Ruang 401', '2024/2025'),
('jdw-013', 'kls-4a', 'mp-010', 'usr-guru-01', 'Kamis',  '08:40:00', '09:50:00', 'Ruang 401', '2024/2025'),
('jdw-014', 'kls-4a', 'mp-014', 'usr-guru-01', 'Jumat',  '07:00:00', '07:30:00', 'Ruang 401', '2024/2025'),
('jdw-015', 'kls-4a', 'mp-012', 'usr-guru-05', 'Jumat',  '07:30:00', '08:40:00', 'Lapangan',  '2024/2025'),
-- Kelas 5A
('jdw-016', 'kls-5a', 'mp-014', 'usr-guru-07', 'Senin',  '07:00:00', '07:30:00', 'Ruang 501', '2024/2025'),
('jdw-017', 'kls-5a', 'mp-006', 'usr-guru-07', 'Senin',  '07:30:00', '08:40:00', 'Ruang 501', '2024/2025'),
('jdw-018', 'kls-5a', 'mp-008', 'usr-guru-07', 'Selasa', '07:30:00', '08:40:00', 'Ruang 501', '2024/2025'),
('jdw-019', 'kls-5a', 'mp-001', 'usr-guru-07', 'Rabu',   '07:30:00', '08:40:00', 'Ruang 501', '2024/2025'),
('jdw-020', 'kls-5a', 'mp-012', 'usr-guru-05', 'Kamis',  '07:30:00', '08:40:00', 'Lapangan',  '2024/2025');

-- ============================================================
-- KATEGORI PERILAKU
-- ============================================================
INSERT INTO `kategori_perilaku` (`id`, `nama`) VALUES
('kat-01', 'Keimanan & Ibadah'),
('kat-02', 'Kedisiplinan'),
('kat-03', 'Kebersihan & Kerapian'),
('kat-04', 'Tata Krama & Sopan Santun'),
('kat-05', 'Keamanan & Ketertiban'),
('kat-06', 'Kejujuran & Tanggung Jawab');

-- ============================================================
-- ITEM PERILAKU (Negatif & Positif)
-- ============================================================
INSERT INTO `item_perilaku` (`id`, `kategori_id`, `deskripsi`, `jenis`, `poin`) VALUES
-- Keimanan & Ibadah - Negatif
('ip-n01', 'kat-01', 'Terlambat masuk aula sholat Dhuha',              'negatif', -20),
('ip-n02', 'kat-01', 'Terlambat ke aula sholat Dhuhur',                'negatif', -20),
('ip-n03', 'kat-01', 'Tidak mengikuti dzikir dan doa pagi',            'negatif', -20),
('ip-n04', 'kat-01', 'Mengganggu teman saat sholat',                   'negatif', -20),
('ip-n05', 'kat-01', 'Membuat keributan di aula/masjid',               'negatif', -20),
('ip-n06', 'kat-01', 'Tidak mengikuti murojaah dan hafalan',           'negatif', -20),
-- Kedisiplinan - Negatif
('ip-n07', 'kat-02', 'Terlambat masuk sekolah tanpa izin',             'negatif', -10),
('ip-n08', 'kat-02', 'Berseragam tidak sesuai ketentuan',              'negatif', -10),
('ip-n09', 'kat-02', 'Tidak mengikuti upacara bendera',                'negatif', -10),
('ip-n10', 'kat-02', 'Tidak membawa perlengkapan belajar lengkap',     'negatif', -10),
-- Kebersihan & Kerapian - Negatif
('ip-n11', 'kat-03', 'Membuang sampah sembarangan',                    'negatif', -10),
('ip-n12', 'kat-03', 'Melepas sepatu/sandal sembarangan',              'negatif', -10),
('ip-n13', 'kat-03', 'Mencoret meja, kursi, atau dinding sekolah',     'negatif', -10),
('ip-n14', 'kat-03', 'Tidak merapikan buku dan peralatan',             'negatif', -10),
-- Tata Krama - Negatif
('ip-n15', 'kat-04', 'Berbicara kasar kepada teman/guru',              'negatif', -20),
('ip-n16', 'kat-04', 'Mengejek atau memanggil teman dengan julukan buruk', 'negatif', -30),
('ip-n17', 'kat-04', 'Tidak mengucapkan salam atau terima kasih',      'negatif', -20),
('ip-n18', 'kat-04', 'Memotong pembicaraan orang lain dengan kasar',   'negatif', -20),
('ip-n19', 'kat-04', 'Berbicara kotor/jorok',                          'negatif', -20),
-- Keamanan & Ketertiban - Negatif
('ip-n20', 'kat-05', 'Berlari di koridor dengan berbahaya',            'negatif', -30),
('ip-n21', 'kat-05', 'Bermain kasar yang bisa melukai teman',          'negatif', -10),
('ip-n22', 'kat-05', 'Membawa barang terlarang',                       'negatif', -30),
('ip-n23', 'kat-05', 'Mendorong, memukul, atau mem-bully teman',       'negatif', -30),
-- Kejujuran & Tanggung Jawab - Negatif
('ip-n24', 'kat-06', 'Mencontek saat ujian',                           'negatif', -10),
('ip-n25', 'kat-06', 'Mengambil barang teman tanpa izin',              'negatif', -10),
('ip-n26', 'kat-06', 'Tidak mengerjakan PR',                           'negatif', -10),
('ip-n27', 'kat-06', 'Tidak mengakui kesalahan yang diperbuat',        'negatif', -10),
-- Keimanan & Ibadah - Positif
('ip-p01', 'kat-01', 'Membiasakan salam saat masuk/keluar kelas',      'positif', 5),
('ip-p02', 'kat-01', 'Bersyukur atas nikmat yang diterima',            'positif', 5),
('ip-p03', 'kat-01', 'Rajin sholat dan beribadah',                     'positif', 5),
('ip-p04', 'kat-01', 'Berdoa sebelum makan dan minum',                 'positif', 5),
-- Kedisiplinan - Positif
('ip-p05', 'kat-02', 'Tepat waktu datang ke sekolah',                  'positif', 5),
('ip-p06', 'kat-02', 'Rajin belajar dan mengerjakan tugas',            'positif', 5),
('ip-p07', 'kat-02', 'Menjaga amanah yang diberikan guru',             'positif', 5),
('ip-p08', 'kat-02', 'Rajin menyelesaikan PR',                         'positif', 5),
('ip-p09', 'kat-02', 'Mengikuti ekstrakurikuler sesuai jadwal',        'positif', 5),
-- Kebersihan - Positif
('ip-p10', 'kat-03', 'Membantu menjaga fasilitas sekolah',             'positif', 5),
('ip-p11', 'kat-03', 'Membuang sampah pada tempatnya',                 'positif', 5),
('ip-p12', 'kat-03', 'Menjaga kebersihan diri dan lingkungan',         'positif', 5),
-- Tata Krama - Positif
('ip-p13', 'kat-04', 'Menghormati orang tua dan guru',                 'positif', 5),
('ip-p14', 'kat-04', 'Berbicara sopan kepada semua orang',             'positif', 5),
('ip-p15', 'kat-04', 'Ramah kepada teman baru',                        'positif', 5),
('ip-p16', 'kat-04', 'Sabar menghadapi masalah kecil',                 'positif', 5),
-- Keamanan - Positif
('ip-p17', 'kat-05', 'Tidak mengejek atau mem-bully teman',            'positif', 5),
('ip-p18', 'kat-05', 'Antri tertib di kantin atau toilet',             'positif', 5),
('ip-p19', 'kat-05', 'Menjaga ketenangan saat guru menjelaskan',       'positif', 5),
('ip-p20', 'kat-05', 'Ikut menjaga kebersihan kelas dan sekolah',      'positif', 5),
-- Kejujuran - Positif
('ip-p21', 'kat-06', 'Adil dan tidak pilih kasih kepada teman',        'positif', 5),
('ip-p22', 'kat-06', 'Memaafkan teman yang berbuat salah',             'positif', 5),
('ip-p23', 'kat-06', 'Suka membantu teman yang membutuhkan',           'positif', 5),
('ip-p24', 'kat-06', 'Jujur dalam perkataan dan perbuatan',            'positif', 5);

-- ============================================================
-- CATATAN POIN (Dummy Entries)
-- ============================================================
INSERT INTO `catatan_poin` (`id`, `siswa_id`, `item_id`, `guru_id`, `tanggal`, `poin`, `keterangan`) VALUES
('cp-001', 'sis-001', 'ip-p03', 'usr-guru-01', '2025-05-10', 5,   'Rajin sholat Dhuha berjamaah'),
('cp-002', 'sis-002', 'ip-p05', 'usr-guru-02', '2025-05-10', 5,   'Datang tepat waktu'),
('cp-003', 'sis-003', 'ip-n15', 'usr-guru-03', '2025-05-09', -20, 'Berbicara kasar kepada teman sekelas'),
('cp-004', 'sis-004', 'ip-p24', 'usr-guru-04', '2025-05-09', 5,   'Jujur melaporkan barang temuan'),
('cp-005', 'sis-005', 'ip-n20', 'usr-guru-05', '2025-05-08', -30, 'Berlari di koridor dan menabrak adik kelas'),
('cp-006', 'sis-007', 'ip-p11', 'usr-guru-01', '2025-05-08', 5,   'Membuang sampah pada tempatnya'),
('cp-007', 'sis-009', 'ip-n07', 'usr-guru-01', '2025-05-07', -10, 'Terlambat 15 menit tanpa keterangan'),
('cp-008', 'sis-012', 'ip-p01', 'usr-guru-07', '2025-05-07', 5,   'Selalu mengucapkan salam'),
('cp-009', 'sis-001', 'ip-p06', 'usr-guru-01', '2025-05-06', 5,   'Mengerjakan semua PR dengan baik'),
('cp-010', 'sis-028', 'ip-p13', 'usr-guru-02', '2025-05-06', 5,   'Sangat menghormati guru'),
('cp-011', 'sis-003', 'ip-n26', 'usr-guru-03', '2025-05-05', -10, 'Tidak mengerjakan PR Matematika'),
('cp-012', 'sis-009', 'ip-n11', 'usr-guru-01', '2025-05-05', -10, 'Membuang sampah di laci meja'),
('cp-013', 'sis-004', 'ip-p19', 'usr-guru-04', '2025-05-04', 5,   'Tenang dan fokus saat pelajaran'),
('cp-014', 'sis-021', 'ip-p03', 'usr-guru-04', '2025-05-04', 5,   'Rajin mengikuti sholat Dhuhur berjamaah'),
('cp-015', 'sis-005', 'ip-n09', 'usr-guru-05', '2025-05-03', -10, 'Tidak mengikuti upacara bendera');

-- ============================================================
-- ABSENSI (Dummy)
-- ============================================================
INSERT INTO `absensi` (`id`, `siswa_id`, `kelas_id`, `mapel_id`, `guru_id`, `tanggal`, `status`, `keterangan`) VALUES
('abs-001', 'sis-001', 'kls-4a', 'mp-006', 'usr-guru-01', '2025-05-10', 'Hadir', NULL),
('abs-002', 'sis-007', 'kls-4a', 'mp-006', 'usr-guru-01', '2025-05-10', 'Hadir', NULL),
('abs-003', 'sis-009', 'kls-4a', 'mp-006', 'usr-guru-01', '2025-05-10', 'Sakit', 'Demam'),
('abs-004', 'sis-015', 'kls-4a', 'mp-006', 'usr-guru-01', '2025-05-10', 'Hadir', NULL),
('abs-005', 'sis-016', 'kls-4a', 'mp-006', 'usr-guru-01', '2025-05-10', 'Izin',  'Acara keluarga'),
('abs-006', 'sis-002', 'kls-3a', 'mp-007', 'usr-guru-02', '2025-05-10', 'Hadir', NULL),
('abs-007', 'sis-008', 'kls-3a', 'mp-007', 'usr-guru-02', '2025-05-10', 'Hadir', NULL),
('abs-008', 'sis-027', 'kls-3a', 'mp-007', 'usr-guru-02', '2025-05-10', 'Alpha', NULL),
('abs-009', 'sis-012', 'kls-5a', 'mp-006', 'usr-guru-07', '2025-05-09', 'Hadir', NULL),
('abs-010', 'sis-017', 'kls-5a', 'mp-006', 'usr-guru-07', '2025-05-09', 'Hadir', NULL),
('abs-011', 'sis-018', 'kls-5a', 'mp-006', 'usr-guru-07', '2025-05-09', 'Sakit', 'Flu'),
('abs-012', 'sis-004', 'kls-6a', 'mp-001', 'usr-guru-04', '2025-05-09', 'Hadir', NULL),
('abs-013', 'sis-021', 'kls-6a', 'mp-001', 'usr-guru-04', '2025-05-09', 'Hadir', NULL),
('abs-014', 'sis-022', 'kls-6a', 'mp-001', 'usr-guru-04', '2025-05-09', 'Hadir', NULL);

-- ============================================================
-- LIFE SKILLS HARIAN (Dummy - Mei 2025, Kelas 4A)
-- ============================================================
INSERT INTO `life_skills_harian` (`id`, `siswa_id`, `kelas_id`, `tanggal`, `nilai`, `bulan`, `tahun`, `dicatat_oleh`) VALUES
('ls-001', 'sis-001', 'kls-4a', '2025-05-01', 'B', 5, 2025, 'usr-guru-01'),
('ls-002', 'sis-001', 'kls-4a', '2025-05-02', 'B', 5, 2025, 'usr-guru-01'),
('ls-003', 'sis-001', 'kls-4a', '2025-05-05', 'B', 5, 2025, 'usr-guru-01'),
('ls-004', 'sis-001', 'kls-4a', '2025-05-06', 'C', 5, 2025, 'usr-guru-01'),
('ls-005', 'sis-001', 'kls-4a', '2025-05-07', 'B', 5, 2025, 'usr-guru-01'),
('ls-006', 'sis-007', 'kls-4a', '2025-05-01', 'B', 5, 2025, 'usr-guru-01'),
('ls-007', 'sis-007', 'kls-4a', '2025-05-02', 'C', 5, 2025, 'usr-guru-01'),
('ls-008', 'sis-007', 'kls-4a', '2025-05-05', 'B', 5, 2025, 'usr-guru-01'),
('ls-009', 'sis-009', 'kls-4a', '2025-05-01', 'C', 5, 2025, 'usr-guru-01'),
('ls-010', 'sis-009', 'kls-4a', '2025-05-02', 'K', 5, 2025, 'usr-guru-01'),
('ls-011', 'sis-009', 'kls-4a', '2025-05-05', 'C', 5, 2025, 'usr-guru-01'),
('ls-012', 'sis-015', 'kls-4a', '2025-05-01', 'B', 5, 2025, 'usr-guru-01'),
('ls-013', 'sis-015', 'kls-4a', '2025-05-02', 'B', 5, 2025, 'usr-guru-01'),
('ls-014', 'sis-015', 'kls-4a', '2025-05-05', 'B', 5, 2025, 'usr-guru-01'),
-- Kelas 5A
('ls-015', 'sis-012', 'kls-5a', '2025-05-01', 'B', 5, 2025, 'usr-guru-07'),
('ls-016', 'sis-012', 'kls-5a', '2025-05-02', 'B', 5, 2025, 'usr-guru-07'),
('ls-017', 'sis-017', 'kls-5a', '2025-05-01', 'B', 5, 2025, 'usr-guru-07'),
('ls-018', 'sis-018', 'kls-5a', '2025-05-01', 'C', 5, 2025, 'usr-guru-07'),
('ls-019', 'sis-019', 'kls-5a', '2025-05-01', 'B', 5, 2025, 'usr-guru-07'),
('ls-020', 'sis-020', 'kls-5a', '2025-05-01', 'C', 5, 2025, 'usr-guru-07');

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- VIEWS BERGUNA
-- ============================================================

-- View: Rekap poin siswa
CREATE OR REPLACE VIEW `v_rekap_poin_siswa` AS
SELECT
  s.id,
  s.nis,
  s.nama,
  k.nama_kelas AS kelas,
  s.total_poin,
  COUNT(CASE WHEN cp.poin > 0 THEN 1 END) AS jumlah_positif,
  COUNT(CASE WHEN cp.poin < 0 THEN 1 END) AS jumlah_negatif,
  COALESCE(SUM(CASE WHEN cp.poin > 0 THEN cp.poin ELSE 0 END), 0) AS total_poin_positif,
  COALESCE(SUM(CASE WHEN cp.poin < 0 THEN cp.poin ELSE 0 END), 0) AS total_poin_negatif
FROM siswa s
LEFT JOIN kelas k ON s.kelas_id = k.id
LEFT JOIN catatan_poin cp ON s.id = cp.siswa_id
GROUP BY s.id, s.nis, s.nama, k.nama_kelas, s.total_poin;

-- View: Rekap absensi per siswa per bulan
CREATE OR REPLACE VIEW `v_rekap_absensi` AS
SELECT
  s.id AS siswa_id,
  s.nama,
  k.nama_kelas AS kelas,
  MONTH(a.tanggal) AS bulan,
  YEAR(a.tanggal) AS tahun,
  COUNT(CASE WHEN a.status = 'Hadir' THEN 1 END) AS hadir,
  COUNT(CASE WHEN a.status = 'Sakit' THEN 1 END) AS sakit,
  COUNT(CASE WHEN a.status = 'Izin'  THEN 1 END) AS izin,
  COUNT(CASE WHEN a.status = 'Alpha' THEN 1 END) AS alpha,
  COUNT(*) AS total_pertemuan
FROM siswa s
LEFT JOIN kelas k ON s.kelas_id = k.id
LEFT JOIN absensi a ON s.id = a.siswa_id
GROUP BY s.id, s.nama, k.nama_kelas, MONTH(a.tanggal), YEAR(a.tanggal);

-- ============================================================
-- END OF SCHEMA
-- ============================================================
