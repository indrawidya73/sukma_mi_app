'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';
import { Clock, Bell, BellOff, Volume2, VolumeX, MapPin, Calendar, Info, Settings, X } from 'lucide-react';
import { toast } from 'sonner';

interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
};

const ADHAN_AUDIO_URL = 'https://www.islamcan.com/audio/adhan/azan1.mp3';

export default function JadwalSholatPage() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; diff: number } | null>(null);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState('Jakarta');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastNotifiedPrayer = useRef<string | null>(null);

  // Fetch prayer times
  useEffect(() => {
    // Load saved city from localStorage if exists
    const savedCity = localStorage.getItem('sukma_prayer_city');
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    async function fetchTimings() {
      try {
        setIsLoading(true);
        // Method 20 is for Indonesia (Kemenag)
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=20`);
        const data = await res.json();
        if (data.code === 200) {
          const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
          setTimings({ Fajr, Dhuhr, Asr, Maghrib, Isha });
        }
      } catch (error) {
        console.error('Failed to fetch prayer times:', error);
        toast.error('Gagal mengambil jadwal sholat');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTimings();
  }, [city]);

  useEffect(() => {
    // Check notification permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  // Update clock and calculate next prayer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      if (timings) {
        calculateNextPrayer(now, timings);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timings]);

  const calculateNextPrayer = (now: Date, times: PrayerTimings) => {
    const prayerList = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const nowTs = now.getTime();
    
    let next: { name: string; time: string; diff: number } | null = null;
    let minDiff = Infinity;

    for (const name of prayerList) {
      const [hours, minutes] = times[name].split(':').map(Number);
      const prayerDate = new Date(now);
      prayerDate.setHours(hours, minutes, 0, 0);
      
      const diff = prayerDate.getTime() - nowTs;
      
      // If prayer is today and hasn't passed
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        next = { name, time: times[name], diff };
      }

      // Check if it's exactly prayer time (within 1 second)
      if (Math.abs(diff) < 1000 && lastNotifiedPrayer.current !== name) {
        handlePrayerTime(name);
      }
    }

    // If no more prayers today, next is Fajr tomorrow
    if (!next) {
      const [hours, minutes] = times['Fajr'].split(':').map(Number);
      const tomorrowFajr = new Date(now);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      tomorrowFajr.setHours(hours, minutes, 0, 0);
      next = { name: 'Fajr', time: times['Fajr'], diff: tomorrowFajr.getTime() - nowTs };
    }

    setNextPrayer(next);
  };

  const handlePrayerTime = (name: string) => {
    lastNotifiedPrayer.current = name;
    const prayerName = PRAYER_NAMES[name];

    // Notification
    if (isNotificationsEnabled) {
      new Notification('Waktu Sholat', {
        body: `Waktunya sholat ${prayerName} untuk wilayah ${city} dan sekitarnya.`,
        icon: '/assets/images/Logo_SUKMA_1_-1778584431642.png'
      });
    }

    // Audio
    if (isAudioEnabled && audioRef.current) {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }

    toast.info(`Waktunya sholat ${prayerName}`, {
      duration: 10000,
      description: 'Mari sejenak tunaikan kewajiban.',
    });
  };

  const toggleNotifications = async () => {
    if (!('Notification' in window)) {
      toast.error('Browser Anda tidak mendukung notifikasi');
      return;
    }

    if (Notification.permission === 'granted') {
      toast.info('Notifikasi sudah aktif. Untuk menonaktifkan, silakan ubah di pengaturan browser Anda.');
    } else {
      const permission = await Notification.requestPermission();
      setIsNotificationsEnabled(permission === 'granted');
      if (permission === 'granted') {
        toast.success('Notifikasi berhasil diaktifkan');
      }
    }
  };

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const changeCity = (newCity: string) => {
    setCity(newCity);
    localStorage.setItem('sukma_prayer_city', newCity);
    setIsSettingsOpen(false);
    toast.success(`Lokasi diubah ke ${newCity}`);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Jadwal Sholat</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Wilayah {city} & Sekitarnya (Kemenag RI)</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
              title="Pengaturan Lokasi"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={toggleNotifications}
              className={`p-2.5 rounded-xl transition-all border ${isNotificationsEnabled ? 'bg-primary-light border-primary text-primary' : 'bg-white border-border text-muted-foreground'}`}
              title={isNotificationsEnabled ? 'Notifikasi Aktif' : 'Aktifkan Notifikasi'}
            >
              {isNotificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-2.5 rounded-xl transition-all border ${isAudioEnabled ? 'bg-primary-light border-primary text-primary' : 'bg-white border-border text-muted-foreground'}`}
              title={isAudioEnabled ? 'Suara Adzan Aktif' : 'Suara Adzan Nonaktif'}
            >
              {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>

        {/* Next Prayer Highlight */}
        <div className="card-elevated overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Clock size={120} />
          </div>
          <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Clock size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Sholat Berikutnya</span>
              </div>
              <h2 className="text-4xl font-black" style={{ color: 'var(--foreground)' }}>
                {nextPrayer ? PRAYER_NAMES[nextPrayer.name] : '...'}
              </h2>
              <p className="text-lg font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Pukul {nextPrayer ? nextPrayer.time : '--:--'}
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Waktu Tersisa</span>
              <div className="text-4xl font-mono font-bold text-primary tabular-nums">
                {nextPrayer ? formatCountdown(nextPrayer.diff) : '00:00:00'}
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin size={10} />
                <span>{city}, Indonesia</span>
              </div>
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted">
            {nextPrayer && (
              <div 
                className="h-full bg-primary transition-all duration-1000" 
                style={{ width: `${Math.max(0, 100 - (nextPrayer.diff / (6 * 3600 * 1000)) * 100)}%` }}
              ></div>
            )}
          </div>
        </div>

        {/* Timings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card-elevated p-6 animate-pulse bg-muted h-32 rounded-xl"></div>
            ))
          ) : (
            timings && ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((name) => {
              const isActive = nextPrayer?.name === name;
              return (
                <div 
                  key={name} 
                  className={`card-elevated p-6 text-center transition-all duration-300 border-2 ${isActive ? 'border-primary shadow-lg scale-105 z-10' : 'border-transparent'}`}
                  style={isActive ? { backgroundColor: 'var(--primary-light)' } : {}}
                >
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {PRAYER_NAMES[name]}
                  </p>
                  <p className={`text-2xl font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {timings[name]}
                  </p>
                  {isActive && (
                    <div className="mt-2 flex justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Info Card */}
        <div className="flex items-start gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/50">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-blue-900">Informasi Otomatisasi</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              Halaman ini akan secara otomatis memutar suara adzan dan mengirimkan notifikasi saat waktu sholat tiba, selama tab ini tetap terbuka. Pastikan izin notifikasi dan suara telah diaktifkan di browser Anda.
            </p>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={ADHAN_AUDIO_URL} preload="auto" />

        {/* City Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)}></div>
            <div className="modal-content max-w-md w-full relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Pilih Lokasi</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-1 hover:bg-muted rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Pilih kota untuk menyesuaikan jadwal sholat di wilayah Anda:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Jakarta', 'Surabaya', 'Malang', 'Bandung', 'Medan', 'Makassar', 'Yogyakarta', 'Semarang'].map((cityName) => (
                    <button
                      key={cityName}
                      onClick={() => changeCity(cityName)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        city === cityName 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'bg-white border-border hover:border-primary/50 text-foreground'
                      }`}
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
                <div className="pt-4 border-t mt-4">
                  <p className="text-xs text-muted-foreground italic">*Pilihan lokasi akan disimpan secara otomatis untuk kunjungan berikutnya.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
