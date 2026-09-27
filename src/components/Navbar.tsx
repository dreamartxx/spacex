import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Orbit, Moon, Globe, Gamepad2, Award, Server } from 'lucide-react';
import { playSound, isSoundEnabled, setSoundEnabled } from '../utils/sound';
import { UserStats } from '../types/astronomy';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userStats: UserStats;
  onOpenHostingerGuide: () => void;
  onOpenStudentProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStats,
  onOpenHostingerGuide,
  onOpenStudentProfile
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) {
      playSound('star');
    }
  };

  const navItems = [
    { id: 'solar_system', label: 'Gezegenler & Uydular', icon: Orbit },
    { id: 'sun_layers', label: 'Güneş ve Katmanları', icon: Sparkles },
    { id: 'earth_layers', label: 'Dünya’nın Katmanları', icon: Globe },
    { id: 'moon_phases', label: 'Ay ve Evreleri', icon: Moon },
    { id: 'games', label: 'Uzay Oyunları', icon: Gamepad2 },
    { id: 'quizzes', label: 'MEB Sınavları', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Zone 1: Single text element wordmark as required by Top Bar Contract */}
        <button
          onClick={() => {
            playSound('whoosh');
            setActiveTab('solar_system');
          }}
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 text-slate-950 shadow-md shadow-orange-500/20 ring-1 ring-white/20">
            <Orbit className="h-5 w-5 animate-[spin_12s_linear_infinite]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Gök Atlası
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(item.id);
                }}
                className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap rounded-md ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Hostinger & GitHub Deployment Button */}
          <button
            onClick={() => {
              playSound('click');
              onOpenHostingerGuide();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-400 bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/60 rounded-lg transition-colors whitespace-nowrap"
            title="Hostinger ve GitHub Otomatik Yayın Altyapısı"
          >
            <Server className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden sm:inline">Hostinger & GitHub</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={soundOn ? 'Sesi Kapat' : 'Sesi Aç'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {soundOn ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
          </button>

          {/* Student Profile / Score Button */}
          <button
            onClick={() => {
              playSound('select');
              onOpenStudentProfile();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono tabular-nums text-amber-300 font-semibold">{userStats.score} P</span>
            <span className="hidden md:inline text-slate-400">· {userStats.studentName}</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Sub-bar for easy navigation */}
      <div className="flex lg:hidden overflow-x-auto py-2 px-3 gap-1.5 border-t border-slate-900 bg-slate-950/70 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
