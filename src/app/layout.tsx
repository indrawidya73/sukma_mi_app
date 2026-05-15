import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import '../styles/tailwind.css';
import { AuthProvider } from './AuthContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SUKMA — Sistem Manajemen Sekolah MI Islamiyah Malang',
  description: 'SUKMA adalah sistem manajemen internal MI Islamiyah Malang untuk mengelola data siswa, poin perilaku, life skills harian, dan laporan akademik.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: 'var(--font-plus-jakarta-sans)',
                fontSize: '0.875rem',
              },
            }}
          />

          <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fsukma8155back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
          <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
        </AuthProvider>
      </body>
    </html>
  );
}