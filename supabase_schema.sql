-- Create profiles table for authentication
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- In production, use hashed passwords
  role TEXT NOT NULL CHECK (role IN ('admin', 'guru', 'murid')),
  name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial mock users
INSERT INTO profiles (username, password, role, name, email) VALUES
('admin', 'admin123', 'admin', 'Administrator', 'admin@miislamiyah.sch.id'),
('guru', 'guru123', 'guru', 'Guru Kelas', 'guru@miislamiyah.sch.id'),
('murid', 'murid123', 'murid', 'Siswa', 'murid@miislamiyah.sch.id');

-- Create students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nis TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  kelas TEXT NOT NULL,
  jenis_kelamin TEXT CHECK (jenis_kelamin IN ('L', 'P')),
  tanggal_lahir DATE,
  alamat TEXT,
  wali_kelas TEXT,
  total_poin INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif', 'Pindah')),
  no_telp TEXT,
  nama_orang_tua TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies (Example: Allow all for now, or restrict by role)
CREATE POLICY "Allow public read for students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow admin and guru to modify students" ON students FOR ALL USING (true);
CREATE POLICY "Allow public read for profiles" ON profiles FOR SELECT USING (true);
