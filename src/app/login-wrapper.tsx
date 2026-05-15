'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function LoginPageWrapper() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      toast.success('Login berhasil!');
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login gagal';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoUser: string) => {
    setUsername(demoUser);
    setIsLoading(true);
    setError('');

    try {
      const demoPasswords: Record<string, string> = {
        admin: 'admin123',
        guru: 'guru123',
        murid: 'murid123',
      };

      await login(demoUser, demoPasswords[demoUser] || '');
      toast.success(`Login sebagai ${demoUser} berhasil!`);
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login gagal';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
      setUsername('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img src="/assets/images/Logo_SUKMA_1_-1778584431642.png" alt="SUKMA Logo" className="h-16" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            SUKMA
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Sistem Manajemen Sekolah MI Islamiyah Malang
          </p>
        </div>

        {/* Login Card */}
        <div className="card-elevated rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="flex gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <AlertCircle size={16} style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }} />
                <p className="text-sm" style={{ color: '#ef4444' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg font-medium transition-opacity"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Sedang login...' : 'Masuk'}
            </button>
          </form>
        </div>

        {/* Demo Logins */}
        <div>
          <p className="text-xs text-center mb-3" style={{ color: 'var(--muted-foreground)' }}>
            Akun Demo:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
              className="py-2 px-3 rounded-lg text-xs font-medium transition-colors border"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
              }}
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin('guru')}
              disabled={isLoading}
              className="py-2 px-3 rounded-lg text-xs font-medium transition-colors border"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
              }}
            >
              Guru
            </button>
            <button
              onClick={() => handleDemoLogin('murid')}
              disabled={isLoading}
              className="py-2 px-3 rounded-lg text-xs font-medium transition-colors border"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
              }}
            >
              Murid
            </button>
          </div>
        </div>

        {/* Credentials Info */}
        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            📋 Akun Demo Tersedia:
          </p>
          <ul className="text-xs space-y-1" style={{ color: 'var(--muted-foreground)' }}>
            <li>• Admin: <span style={{ color: '#16a34a' }}>admin</span> / admin123</li>
            <li>• Guru: <span style={{ color: '#16a34a' }}>guru</span> / guru123</li>
            <li>• Murid: <span style={{ color: '#16a34a' }}>murid</span> / murid123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
