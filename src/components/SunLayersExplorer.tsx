import React, { useState } from 'react';
import { sunData, sunLayers } from '../data/astronomyData';
import { SunLayer } from '../types/astronomy';
import { playSound } from '../utils/sound';
import { Flame, Thermometer, Sparkles, AlertCircle, Eye, Zap, Compass } from 'lucide-react';

export const SunLayersExplorer: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('core');
  const [viewMode, setViewMode] = useState<'cutaway' | 'sunspots'>('cutaway');
  const [showFlares, setShowFlares] = useState<boolean>(true);

  const selectedLayer = sunLayers.find((l) => l.id === selectedLayerId) || sunLayers[0];

  const handleSelectLayer = (layer: SunLayer) => {
    playSound('select');
    setSelectedLayerId(layer.id);
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Güneş Sistemi’nin Enerji Fabrikası</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Güneş ve Katmanları
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Tıpkı bir soğan gibi katmanlardan oluşan devasa plazma küremiz. Çekirdeğinde başlayan 15 milyon derecelik nükleer yolculuğu katman katman keşfet!
          </p>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              playSound('click');
              setViewMode('cutaway');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'cutaway'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            İnteraktif Kesit
          </button>
          <button
            onClick={() => {
              playSound('click');
              setViewMode('sunspots');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'sunspots'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Güneş Lekeleri & Dönüş
          </button>
        </div>
      </div>

      {/* Main Two-Zone Sandbox: Left Interactive Stage (60%), Right Parameter/Concept Deck (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive Visual Stage */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-transparent pointer-events-none" />

          {/* Top Stage Control HUD */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-4 z-10">
            <span className="font-mono text-amber-400">
              {viewMode === 'cutaway' ? 'Katman Kesit Modeli (İçten Dışa)' : 'Galileo Güneş Lekesi Gözlem Modeli'}
            </span>
            <button
              onClick={() => setShowFlares(!showFlares)}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Güneş Patlamaları: {showFlares ? 'Açık' : 'Kapalı'}</span>
            </button>
          </div>

          {/* SVG Sun Model */}
          <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center my-2 select-none">
            
            {viewMode === 'cutaway' ? (
              <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_40px_rgba(245,158,11,0.25)]">
                <defs>
                  {/* Gradients for Sun Layers */}
                  <radialGradient id="grad-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#FF3D00" />
                    <stop offset="100%" stopColor="#D50000" />
                  </radialGradient>

                  <radialGradient id="grad-radiative" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF9100" />
                    <stop offset="100%" stopColor="#FF6D00" />
                  </radialGradient>

                  <radialGradient id="grad-convective" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFAB00" />
                    <stop offset="100%" stopColor="#FF8F00" />
                  </radialGradient>

                  <radialGradient id="grad-corona" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="rgba(255, 238, 140, 0.4)" />
                    <stop offset="100%" stopColor="rgba(255, 200, 50, 0)" />
                  </radialGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Corona Outer Halo */}
                <circle
                  cx="250"
                  cy="250"
                  r="230"
                  fill="url(#grad-corona)"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'corona' ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-90'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[5])}
                />

                {/* Animated Solar Flares / Prominences */}
                {showFlares && (
                  <g className="animate-pulse">
                    <path
                      d="M 120 150 Q 80 80 150 100 Q 180 120 160 160"
                      fill="none"
                      stroke="#FF3D00"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M 380 140 Q 440 90 420 170"
                      fill="none"
                      stroke="#FF9100"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.75"
                    />
                    <path
                      d="M 360 380 Q 430 420 370 430"
                      fill="none"
                      stroke="#FF6D00"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  </g>
                )}

                {/* Chromosphere Outer Ring */}
                <circle
                  cx="250"
                  cy="250"
                  r="195"
                  fill="none"
                  stroke="#FF1744"
                  strokeWidth="8"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'chromosphere' ? 'stroke-[#FF5252] stroke-[14px]' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[4])}
                />

                {/* Photosphere (Işık Küre) Outer Border */}
                <circle
                  cx="250"
                  cy="250"
                  r="185"
                  fill="#FFD600"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'photosphere' ? 'brightness-125 stroke-4 stroke-white' : 'hover:brightness-110'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[3])}
                />

                {/* Cutaway Wedge Section (Opening 90-degree slice to reveal inner layers) */}
                {/* Full left/bottom halves remain Photosphere */}
                <path
                  d="M 250 250 L 250 65 A 185 185 0 0 1 435 250 Z"
                  fill="#1E293B"
                  opacity="0.2"
                />

                {/* Convective Zone Slice */}
                <path
                  d="M 250 250 L 250 110 A 140 140 0 0 1 390 250 Z"
                  fill="url(#grad-convective)"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'convective' ? 'stroke-2 stroke-white brightness-125' : 'hover:brightness-110'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[2])}
                />

                {/* Radiative Zone Slice */}
                <path
                  d="M 250 250 L 250 160 A 90 90 0 0 1 340 250 Z"
                  fill="url(#grad-radiative)"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'radiative' ? 'stroke-2 stroke-white brightness-125' : 'hover:brightness-110'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[1])}
                />

                {/* Core (Çekirdek) Center Slice */}
                <path
                  d="M 250 250 L 250 205 A 45 45 0 0 1 295 250 Z"
                  fill="url(#grad-core)"
                  filter="url(#glow)"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'core' ? 'stroke-2 stroke-white brightness-150' : 'hover:brightness-125'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[0])}
                />

                {/* Inner Core Complete Center Circle */}
                <circle
                  cx="250"
                  cy="250"
                  r="42"
                  fill="url(#grad-core)"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLayerId === 'core' ? 'stroke-2 stroke-white scale-110' : 'hover:scale-105'
                  }`}
                  onClick={() => handleSelectLayer(sunLayers[0])}
                />

                {/* Sunspots on the non-cutaway left hemisphere */}
                <g className="cursor-pointer" onClick={() => handleSelectLayer(sunLayers[3])}>
                  <circle cx="170" cy="220" r="9" fill="#3E2723" opacity="0.85" />
                  <circle cx="168" cy="219" r="5" fill="#1A0C08" />
                  
                  <circle cx="190" cy="235" r="7" fill="#3E2723" opacity="0.8" />
                  <circle cx="189" cy="234" r="4" fill="#1A0C08" />

                  <circle cx="140" cy="280" r="11" fill="#3E2723" opacity="0.85" />
                  <circle cx="138" cy="278" r="6" fill="#1A0C08" />

                  <circle cx="210" cy="310" r="6" fill="#3E2723" opacity="0.75" />
                </g>

                {/* Guide Labels & Pins */}
                <line x1="250" y1="250" x2="310" y2="190" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="310" cy="190" r="3" fill="#FFF" />
                <text x="320" y="195" fill="#FFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  ÇEKİRDEK (15M °C)
                </text>

                <line x1="250" y1="135" x2="380" y2="120" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="380" cy="120" r="3" fill="#FFF" />
                <text x="390" y="125" fill="#FFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  IŞINIM BÖLGESİ
                </text>
              </svg>
            ) : (
              /* Sunspots & Differential Rotation Model */
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 relative overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.5)] border border-amber-300">
                  {/* Granulation Texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(#00000020_1px,transparent_1px)] [background-size:8px_8px] mix-blend-overlay" />
                  
                  {/* Moving Sunspots with CSS animation to show rotation */}
                  <div className="absolute inset-0 flex flex-col justify-around py-8 animate-[spin_30s_linear_infinite]">
                    {/* Equator spot cluster */}
                    <div className="flex justify-center gap-4">
                      <div className="w-5 h-4 rounded-full bg-stone-900 border border-amber-800 shadow-inner flex items-center justify-center">
                        <div className="w-2.5 h-2 rounded-full bg-black" />
                      </div>
                      <div className="w-3.5 h-3 rounded-full bg-stone-900" />
                    </div>

                    <div className="flex justify-around px-8">
                      <div className="w-6 h-5 rounded-full bg-stone-900 border border-amber-800 flex items-center justify-center">
                        <div className="w-3 h-2.5 rounded-full bg-black" />
                      </div>
                      <div className="w-4 h-3.5 rounded-full bg-stone-900" />
                    </div>
                  </div>

                  {/* Corona glow layer */}
                  <div className="absolute -inset-4 rounded-full border border-amber-400/30 animate-pulse pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Interactive Layer Pills (Quick selection bar) */}
          <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mt-4 z-10">
            {sunLayers.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {layer.turkishName}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            İpucu: Görseldeki katmanlara tıklayarak o katmanın derinlik, sıcaklık ve MEB sınav püf noktalarını inceleyebilirsin.
          </p>
        </div>

        {/* Right Parameter & Concept Deck (40%) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Active Layer Detail Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  {selectedLayer.zoneType === 'internal' ? 'İç Katman' : 'Güneş Atmosferi'}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  {selectedLayer.turkishName}
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  İngilizce: {selectedLayer.name}
                </div>
              </div>

              {/* Temperature Badge */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Sıcaklık</span>
                <div className="flex items-center gap-1 text-base font-bold font-mono text-amber-300">
                  <Thermometer className="h-4 w-4 text-rose-400" />
                  <span>{selectedLayer.temperatureC}</span>
                </div>
              </div>
            </div>

            {/* Depth & Thickness */}
            <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block">Derinlik / Konum:</span>
                <span className="font-semibold text-slate-200">{selectedLayer.depthRange}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Tahmini Kalınlık:</span>
                <span className="font-semibold text-slate-200">~{selectedLayer.thicknessKm.toLocaleString('tr-TR')} km</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedLayer.description}
            </p>

            {/* Key Phenomena Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selectedLayer.keyPhenomena.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/90 text-amber-300 border border-slate-700/60"
                >
                  ● {item}
                </span>
              ))}
            </div>

            {/* MEB Sınav Püf Noktası Callout */}
            <div className="mt-5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-700/40 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">MEB Yazılı & LGS Püf Noktası</span>
                <p className="text-amber-100/90 leading-normal">{selectedLayer.mebExamTip}</p>
              </div>
            </div>
          </div>

          {/* Quick Sun Fun Facts Table for Middle Schoolers */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>Güneş Hakkında Önemli Ortaokul Bilgileri</span>
            </h3>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Çapı:</span>
                <span className="font-mono font-medium text-slate-100">~1.392.700 km (Dünya’nın 109 katı)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Dünya’ya Uzaklığı:</span>
                <span className="font-mono font-medium text-slate-100">149.6 Milyon km (1 Astronomik Birim - AB)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Işığının Ulaşma Süresi:</span>
                <span className="font-mono font-medium text-slate-100">~8 dakika 20 saniye</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Dönme Hareketi:</span>
                <span className="font-medium text-amber-300">Batıdan doğuya (saat yönünün tersine)</span>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-slate-400 italic">
              «Eğer Güneş bir basketbol topu olsaydı, Dünya sadece küçük bir nohut tanesi kadar olurdu!»
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
