import React, { useState } from 'react';
import { moonPhasesData, eclipsesData } from '../data/astronomyData';
import { MoonPhase } from '../types/astronomy';
import { playSound } from '../utils/sound';
import { Moon, Sun, Globe, Eye, AlertTriangle, ShieldCheck, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export const MoonPhasesSimulator: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<'phases' | 'eclipses'>('phases');
  const [selectedEclipseId, setSelectedEclipseId] = useState<'solar' | 'lunar'>('solar');

  const currentPhase: MoonPhase = moonPhasesData[currentPhaseIndex];

  const handleNextPhase = () => {
    playSound('orbit');
    setCurrentPhaseIndex((prev) => (prev + 1) % moonPhasesData.length);
  };

  const handlePrevPhase = () => {
    playSound('orbit');
    setCurrentPhaseIndex((prev) => (prev - 1 + moonPhasesData.length) % moonPhasesData.length);
  };

  const handleSelectPhase = (index: number) => {
    playSound('select');
    setCurrentPhaseIndex(index);
  };

  // Calculate moon's (x, y) on orbit radius 140
  const orbitRadius = 130;
  const angleRad = (currentPhase.angleDegrees * Math.PI) / 180;
  // Let angle 0 be to the left (toward Sun, between Sun and Earth)
  const moonX = 220 - Math.cos(angleRad) * orbitRadius;
  const moonY = 220 - Math.sin(angleRad) * orbitRadius;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Moon className="h-3.5 w-3.5" />
            <span>Ay’ın Gökyüzündeki 29.5 Günlük Dansı</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ay’ın Evreleri ve Tutulmalar
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Ay bir ışık kaynağı değildir; Güneş’ten aldığı ışığı yansıtır. Dünya etrafında dolanırken Dünya’dan görünen aydınlık kısmının nasıl değiştiğini interaktif simülatörle keşfet!
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              playSound('click');
              setActiveSection('phases');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeSection === 'phases'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ay Evreleri Simülatörü
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveSection('eclipses');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeSection === 'eclipses'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Güneş & Ay Tutulmaları
          </button>
        </div>
      </div>

      {activeSection === 'phases' ? (
        /* ================= MOON PHASES SIMULATOR ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Canvas Sandbox: Space Orbit View + Earth View Overlay */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center relative overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-amber-400">
                Uzaydan Bakış (Güneş Solda) · 360° Yörünge
              </span>
              <span className="font-mono text-slate-300">
                Açı: {currentPhase.angleDegrees}° (Yeni Ay’dan {currentPhase.daysAfterNewMoon.toFixed(1)} gün sonra)
              </span>
            </div>

            {/* Orbit SVG Simulator */}
            <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center my-2 select-none">
              <svg viewBox="0 0 440 440" className="w-full h-full">
                {/* Sunlight Rays coming from the left */}
                <g stroke="rgba(251, 191, 36, 0.25)" strokeWidth="1.5" strokeDasharray="4 4">
                  <line x1="10" y1="120" x2="160" y2="120" />
                  <line x1="10" y1="170" x2="160" y2="170" />
                  <line x1="10" y1="220" x2="160" y2="220" />
                  <line x1="10" y1="270" x2="160" y2="270" />
                  <line x1="10" y1="320" x2="160" y2="320" />
                </g>

                {/* Sun label on the left */}
                <rect x="0" y="160" width="30" height="120" rx="15" fill="#F59E0B" />
                <text x="15" y="225" fill="#000" fontSize="10" fontWeight="bold" transform="rotate(-90 15,225)" textAnchor="middle">
                  GÜNEŞ IŞIĞI
                </text>

                {/* Moon Orbit Path */}
                <circle cx="220" cy="220" r={orbitRadius} fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* 8 Phase Position Markers along Orbit */}
                {moonPhasesData.map((phase, idx) => {
                  const pAngle = (phase.angleDegrees * Math.PI) / 180;
                  const px = 220 - Math.cos(pAngle) * orbitRadius;
                  const py = 220 - Math.sin(pAngle) * orbitRadius;
                  const isCurrent = idx === currentPhaseIndex;
                  return (
                    <circle
                      key={phase.id}
                      cx={px}
                      cy={py}
                      r={isCurrent ? 7 : 4}
                      fill={isCurrent ? '#F59E0B' : '#64748B'}
                      stroke={isCurrent ? '#FFF' : 'transparent'}
                      strokeWidth={1.5}
                      className="cursor-pointer hover:fill-amber-300 transition-all"
                      onClick={() => handleSelectPhase(idx)}
                    />
                  );
                })}

                {/* Earth in the Center */}
                <circle cx="220" cy="220" r="28" fill="#1E88E5" stroke="#60A5FA" strokeWidth="2" />
                {/* Earth shadow (right half is night) */}
                <path d="M 220 192 A 28 28 0 0 1 220 248 Z" fill="#0F172A" opacity="0.6" />
                <text x="220" y="224" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                  DÜNYA
                </text>

                {/* Moon Target Indicator & Body */}
                <line x1="220" y1="220" x2={moonX} y2={moonY} stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" />
                
                {/* Moon Body in Space: Left half always lit by Sun! */}
                <circle cx={moonX} cy={moonY} r="16" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
                {/* Lit side of the Moon facing the Sun (left hemisphere) */}
                <path
                  d={`M ${moonX} ${moonY - 16} A 16 16 0 0 0 ${moonX} ${moonY + 16} Z`}
                  fill="#FFF8DC"
                />

                <circle cx={moonX} cy={moonY} r="22" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
              </svg>

              {/* Inset Box: LIVE "DÜNYA'DAN GÖRÜNÜŞ" (As seen by an observer on Earth) */}
              <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-700/80 rounded-xl p-3.5 flex flex-col items-center backdrop-blur-md shadow-xl text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 mb-1 flex items-center gap-1">
                  <Eye className="h-3 w-3 text-sky-400" />
                  <span>Dünya’dan Görünüm</span>
                </span>

                {/* Dynamic Moon Visual based on Phase */}
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 relative overflow-hidden my-1 shadow-inner flex items-center justify-center">
                  {/* Base dark moon */}
                  <div className="absolute inset-0 bg-slate-950" />

                  {/* Render based on illumination */}
                  {currentPhase.id === 'new_moon' && (
                    <div className="text-[9px] font-mono text-slate-500">Görünmez</div>
                  )}

                  {currentPhase.id === 'waxing_crescent' && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-amber-100 -translate-x-6" />
                    </div>
                  )}

                  {currentPhase.id === 'first_quarter' && (
                    /* Right half illuminated (D Shape) */
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-amber-100" />
                  )}

                  {currentPhase.id === 'waxing_gibbous' && (
                    <div className="w-full h-full bg-amber-100 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-4 bg-slate-950 rounded-r-full" />
                    </div>
                  )}

                  {currentPhase.id === 'full_moon' && (
                    <div className="w-full h-full bg-amber-100 shadow-[0_0_15px_rgba(254,240,138,0.5)]" />
                  )}

                  {currentPhase.id === 'waning_gibbous' && (
                    <div className="w-full h-full bg-amber-100 relative">
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-slate-950 rounded-l-full" />
                    </div>
                  )}

                  {currentPhase.id === 'last_quarter' && (
                    /* Left half illuminated (Ters D Shape) */
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-amber-100" />
                  )}

                  {currentPhase.id === 'waning_crescent' && (
                    /* C shape */
                    <div className="absolute left-0 top-0 bottom-0 w-8 overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-amber-100 translate-x-6" />
                    </div>
                  )}
                </div>

                <span className="text-xs font-bold text-amber-300 mt-1">
                  {currentPhase.turkishName.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  %{currentPhase.illuminationPercent} Aydınlık
                </span>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="w-full flex items-center justify-between gap-2 mt-2 pt-3 border-t border-slate-800">
              <button
                onClick={handlePrevPhase}
                className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                ← Önceki Evre
              </button>

              <div className="flex gap-1 overflow-x-auto scrollbar-none py-1">
                {moonPhasesData.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPhase(idx)}
                    className={`h-7 px-2 text-[11px] font-medium rounded transition-all whitespace-nowrap ${
                      idx === currentPhaseIndex
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : p.isMainPhase
                        ? 'bg-slate-800 text-amber-200 hover:bg-slate-700'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p.turkishName.split(' ')[0]}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPhase}
                className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                Sonraki Evre →
              </button>
            </div>
          </div>

          {/* Right Concept & MEB Deck */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      {currentPhase.isMainPhase ? '★ 4 Ana Evreden Biri' : 'Ara Evre'}
                    </span>
                    <span className="text-xs text-slate-400">· {currentPhase.orderIndex + 1} / 8</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {currentPhase.turkishName}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Aydınlanma Oranı</span>
                  <span className="text-lg font-bold font-mono text-amber-300">
                    %{currentPhase.illuminationPercent}
                  </span>
                </div>
              </div>

              {/* Shape description */}
              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                {currentPhase.shapeDescription}
              </p>

              {/* Significance */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-white block">Gökyüzü Gözlemi & Zamanlama:</span>
                <p className="text-slate-400">{currentPhase.significance}</p>
              </div>

              {/* MEB Exam Tip */}
              <div className="mt-5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-700/40 text-amber-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5">MEB Sınav Şifresi</span>
                  <p className="text-amber-100/90 leading-normal">{currentPhase.mebExamTip}</p>
                </div>
              </div>
            </div>

            {/* Quick 4 Ana Evre vs 4 Ara Evre Cheat Sheet */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
              <h3 className="font-semibold text-white">4 Ana Evre ve Harf Kodlamaları</h3>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                  <span className="font-bold text-amber-400 block">1. Yeni Ay</span>
                  <span className="text-[11px] text-slate-400">Karanlık (Görünmez)</span>
                </div>
                <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                  <span className="font-bold text-amber-400 block">2. İlk Dördün</span>
                  <span className="text-[11px] text-slate-400">Düz "D" Harfi</span>
                </div>
                <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                  <span className="font-bold text-amber-400 block">3. Dolunay</span>
                  <span className="text-[11px] text-slate-400">Tam Aydınlık Daire</span>
                </div>
                <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                  <span className="font-bold text-amber-400 block">4. Son Dördün</span>
                  <span className="text-[11px] text-slate-400">Ters "D" Harfi</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Ana evreler arasında yaklaşık 1 hafta (7 gün) süre vardır. Tüm evrelerin tamamlanması (sinodik ay) 29.5 gün sürer.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================= ECLIPSES SECTION (GÜNEŞ & AY TUTULMALARI) ================= */
        <div className="space-y-6">
          {/* Eclipse Mode Tabs */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                playSound('click');
                setSelectedEclipseId('solar');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                selectedEclipseId === 'solar'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Güneş Tutulması (G-A-D)
            </button>
            <button
              onClick={() => {
                playSound('click');
                setSelectedEclipseId('lunar');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                selectedEclipseId === 'lunar'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Ay Tutulması (G-D-A)
            </button>
          </div>

          {/* Visual Model Banner */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            {selectedEclipseId === 'solar' ? (
              /* SOLAR ECLIPSE VISUAL */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Sıralama Modeli: GÜNEŞ — AY — DÜNYA (G-A-D)
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-amber-950/60 border border-amber-700/60 text-amber-300 rounded-lg">
                    Yeni Ay Evresinde Olur
                  </span>
                </div>

                {/* Alignment Diagram */}
                <div className="bg-slate-950/80 rounded-xl p-8 flex flex-col md:flex-row items-center justify-around gap-6 border border-slate-800 relative overflow-hidden">
                  {/* Sun */}
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 shadow-[0_0_40px_rgba(245,158,11,0.5)] border-2 border-yellow-200" />
                    <span className="font-bold text-white mt-2 text-sm">GÜNEŞ</span>
                  </div>

                  <ArrowRight className="h-6 w-6 text-slate-600 hidden md:block" />

                  {/* Moon (In Middle) */}
                  <div className="flex flex-col items-center relative">
                    <div className="h-10 w-10 rounded-full bg-stone-700 border-2 border-amber-400 shadow-lg" />
                    <span className="font-bold text-amber-300 mt-2 text-sm">AY</span>
                    <span className="text-[10px] text-slate-400 font-mono">(Işığı Keser)</span>
                  </div>

                  <ArrowRight className="h-6 w-6 text-slate-600 hidden md:block" />

                  {/* Earth (Receives Moon Shadow) */}
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 border-2 border-sky-400 relative overflow-hidden flex items-center justify-center">
                      {/* Shadow Spot */}
                      <div className="h-5 w-5 rounded-full bg-black/80 blur-[1px]" />
                    </div>
                    <span className="font-bold text-white mt-2 text-sm">DÜNYA</span>
                    <span className="text-[10px] text-slate-400 font-mono">(Gölge Düşer)</span>
                  </div>
                </div>

                {/* Safety Warning */}
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-700/50 text-xs flex items-start gap-3 text-rose-200">
                  <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-300 text-sm block">GÖZ SAĞLIĞI UYARISI:</span>
                    <p className="mt-0.5 leading-relaxed">
                      Güneş tutulmasına ASLA çıplak gözle, dürbünle, teleskopla veya normal güneş gözlüğüyle bakılmaz! Körlüğe varan kalıcı retina hasarı bırakabilir. Mutlaka ISO onaylı özel tutulma gözlüğü kullanılmalıdır.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* LUNAR ECLIPSE VISUAL */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                    Sıralama Modeli: GÜNEŞ — DÜNYA — AY (G-D-A)
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-rose-950/60 border border-rose-700/60 text-rose-300 rounded-lg">
                    Dolunay Evresinde Olur
                  </span>
                </div>

                {/* Alignment Diagram */}
                <div className="bg-slate-950/80 rounded-xl p-8 flex flex-col md:flex-row items-center justify-around gap-6 border border-slate-800 relative overflow-hidden">
                  {/* Sun */}
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 shadow-[0_0_40px_rgba(245,158,11,0.5)] border-2 border-yellow-200" />
                    <span className="font-bold text-white mt-2 text-sm">GÜNEŞ</span>
                  </div>

                  <ArrowRight className="h-6 w-6 text-slate-600 hidden md:block" />

                  {/* Earth (In Middle) */}
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 border-2 border-sky-400" />
                    <span className="font-bold text-white mt-2 text-sm">DÜNYA</span>
                    <span className="text-[10px] text-slate-400 font-mono">(Ortada)</span>
                  </div>

                  <ArrowRight className="h-6 w-6 text-slate-600 hidden md:block" />

                  {/* Moon (In Earth Shadow - Blood Moon) */}
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-red-800 border-2 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)]" />
                    <span className="font-bold text-rose-400 mt-2 text-sm">KANLI AY</span>
                    <span className="text-[10px] text-slate-400 font-mono">(Kızıl Bakır Rengi)</span>
                  </div>
                </div>

                {/* Safety Info */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/50 text-xs flex items-start gap-3 text-emerald-200">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300 text-sm block">GÖZLER İÇİN TAMAMEN GÜVENLİDİR:</span>
                    <p className="mt-0.5 leading-relaxed">
                      Ay tutulması sırasında göze zararlı hiçbir doğrudan ışık gelmez. Geceyi yaşayan herkes balkondan veya bahçeden çıplak gözle, dürbünle ya da fotoğraf makinesiyle saatlerce keyifle izleyebilir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Matrix Table */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3">
                Güneş ve Ay Tutulması Karşılaştırma Tablosu (MEB Sınavlarında Çıkar)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 border border-slate-800">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="p-3 border-b border-r border-slate-800">Özellik</th>
                      <th className="p-3 border-b border-r border-slate-800 text-amber-400">Güneş Tutulması</th>
                      <th className="p-3 border-b border-slate-800 text-rose-400">Ay Tutulması</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-3 font-semibold text-slate-200 border-r border-slate-800">Gök Cisimleri Sıralaması</td>
                      <td className="p-3 border-r border-slate-800 font-mono font-bold text-amber-300">GÜNEŞ - AY - DÜNYA (G-A-D)</td>
                      <td className="p-3 font-mono font-bold text-rose-300">GÜNEŞ - DÜNYA - AY (G-D-A)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200 border-r border-slate-800">Gereken Ay Evresi</td>
                      <td className="p-3 border-r border-slate-800">YENİ AY Evresi</td>
                      <td className="p-3">DOLUNAY Evresi</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200 border-r border-slate-800">Gözlemlendiği Zaman</td>
                      <td className="p-3 border-r border-slate-800">Gündüz vakti (Dar bir şeritte)</td>
                      <td className="p-3">Gece vakti (Dünya’nın gece olan tüm yarısında)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200 border-r border-slate-800">Tutulma Süresi</td>
                      <td className="p-3 border-r border-slate-800">Birkaç dakika (2 - 7.5 dk)</td>
                      <td className="p-3">Birkaç saat (1 - 4 saat)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200 border-r border-slate-800">Göz Sağlığı Kuralı</td>
                      <td className="p-3 border-r border-slate-800 text-rose-400 font-semibold">Özel filtreli gözlük ZORUNLU!</td>
                      <td className="p-3 text-emerald-400 font-semibold">Çıplak gözle izlenebilir, güvenli</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
