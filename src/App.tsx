/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SunLayersExplorer } from './components/SunLayersExplorer';
import { SolarSystemOrbit } from './components/SolarSystemOrbit';
import { EarthLayersExplorer } from './components/EarthLayersExplorer';
import { MoonPhasesSimulator } from './components/MoonPhasesSimulator';
import { GameCenter } from './components/GameCenter';
import { QuizModule } from './components/QuizModule';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { loadUserStats, saveUserStats } from './services/storageService';
import { UserStats } from './types/astronomy';
import { playSound } from './utils/sound';
import { Orbit, Sparkles, Globe, Moon, Gamepad2, Award, Server, BookOpen, Compass, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('solar_system');
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats);
  const [isHostingerModalOpen, setIsHostingerModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load initial stats
    setUserStats(loadUserStats());
  }, []);

  const handleUpdateStats = (correct: number, total: number, scoreAward: number) => {
    const updated: UserStats = {
      ...userStats,
      score: userStats.score + scoreAward,
      quizzesCompleted: userStats.quizzesCompleted + 1,
      correctAnswers: userStats.correctAnswers + correct,
      totalAnswered: userStats.totalAnswered + total,
      unlockedCertificates: userStats.unlockedCertificates + 1
    };
    setUserStats(updated);
    saveUserStats(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={userStats}
        onOpenHostingerGuide={() => setIsHostingerModalOpen(true)}
        onOpenStudentProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Educational Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        
        {/* Curricular Stage Badges & Hero Kicker (Only on default view) */}
        {activeTab === 'solar_system' && (
          <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border border-slate-800 p-6 sm:p-8 relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-amber-400 font-bold">MEB 5-8. SINIF MÜFREDATI</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">FEN BİLİMLERİ DERSİ KAZANIMLARI</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400 font-semibold">İNTERAKTİF LABORATUVAR</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Uzayın Büyüleyici Dünyasını Keşfetmeye Hazır Mısın?
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Güneş’in 15 milyon derecelik çekirdeğinden, Satürn’ün buzdan halkalarına; Dünya’nın akkor iç çekirdeğinden Ay’ın gökyüzündeki evrelerine kadar her şeyi canlı simülasyonlarla öğren!
              </p>

              {/* Quick Navigation Action Grid */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('sun_layers');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all hover:scale-105"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Güneş’in Katmanları</span>
                  <ChevronRight className="h-3 w-3 text-amber-400" />
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('earth_layers');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition-all hover:scale-105"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Dünya’nın Katmanları</span>
                  <ChevronRight className="h-3 w-3 text-emerald-400" />
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('moon_phases');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-300 border border-sky-500/30 transition-all hover:scale-105"
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>Ay ve Evreleri</span>
                  <ChevronRight className="h-3 w-3 text-sky-400" />
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('games');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-orange-300 border border-orange-500/30 transition-all hover:scale-105"
                >
                  <Gamepad2 className="h-3.5 w-3.5" />
                  <span>Gezegen Sıralama Oyunu</span>
                  <ChevronRight className="h-3 w-3 text-orange-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Solar System & Planets Orbit */}
        {activeTab === 'solar_system' && <SolarSystemOrbit />}

        {/* Tab 2: Sun & Layers */}
        {activeTab === 'sun_layers' && <SunLayersExplorer />}

        {/* Tab 3: Earth & Layers (Geosphere + Atmosphere) */}
        {activeTab === 'earth_layers' && <EarthLayersExplorer />}

        {/* Tab 4: Moon Phases & Eclipses */}
        {activeTab === 'moon_phases' && <MoonPhasesSimulator />}

        {/* Tab 5: Games Center */}
        {activeTab === 'games' && <GameCenter />}

        {/* Tab 6: Quizzes & Certificate */}
        {activeTab === 'quizzes' && (
          <QuizModule
            studentName={userStats.studentName}
            onUpdateStats={handleUpdateStats}
          />
        )}

      </main>

      {/* Hostinger & GitHub Deployment Guide Modal */}
      <HostingerGuideModal
        isOpen={isHostingerModalOpen}
        onClose={() => setIsHostingerModalOpen(false)}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userStats={userStats}
        setUserStats={setUserStats}
      />

      {/* Clean Footer (Compliant with Anti-Slop constitution: no fake telemetry tickers) */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display text-sm">Gök Atlası</span>
            <span className="text-slate-600">·</span>
            <span>Ortaokul Fen Bilimleri Astronomi ve Uzay Portalı</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsHostingerModalOpen(true)}
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Server className="h-3.5 w-3.5" />
              <span>Hostinger & GitHub Otomatik Yayın Altyapısı</span>
            </button>
            <span className="text-slate-700">|</span>
            <span>© 2026 Gök Atlası</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
