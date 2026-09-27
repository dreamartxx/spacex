import React, { useState } from 'react';
import { earthLayersData } from '../data/astronomyData';
import { EarthLayer } from '../types/astronomy';
import { playSound } from '../utils/sound';
import { Globe, Layers, Wind, Mountain, Flame, Compass, Shield, CloudRain, Sun, Sparkles, Zap, Satellite, AlertCircle } from 'lucide-react';

export const EarthLayersExplorer: React.FC = () => {
  const [category, setCategory] = useState<'geosphere' | 'atmosphere'>('geosphere');
  const [selectedLayerId, setSelectedLayerId] = useState<string>('crust');

  const layers = earthLayersData.filter((l) => l.category === category);
  const selectedLayer = earthLayersData.find((l) => l.id === selectedLayerId) || layers[0];

  const handleCategorySwitch = (newCat: 'geosphere' | 'atmosphere') => {
    playSound('click');
    setCategory(newCat);
    const firstOfNew = earthLayersData.find((l) => l.category === newCat);
    if (firstOfNew) {
      setSelectedLayerId(firstOfNew.id);
    }
  };

  const handleSelectLayer = (layer: EarthLayer) => {
    playSound('select');
    setSelectedLayerId(layer.id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
            <Globe className="h-3.5 w-3.5" />
            <span>Mavi Gezegenimizin İç ve Dış Anatomisi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Dünya’nın Katmanları
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Ayağımızın altındaki 6.000 °C’lik akkor demir çekirdekten, gök taşlarını eriten 85 km yüksekteki Mezosfere kadar Dünya’nın tüm katmanlarını incele.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => handleCategorySwitch('geosphere')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              category === 'geosphere'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>İç Yapısal Katmanlar (Yer Küre)</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('atmosphere')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              category === 'atmosphere'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="h-3.5 w-3.5" />
            <span>Atmosfer Katmanları (Hava Küre)</span>
          </button>
        </div>
      </div>

      {/* Main Two-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Visual Interactive Canvas (SVG) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono text-emerald-400">
              {category === 'geosphere' ? 'Jeosfer Kesit Diyagramı (0 - 6.378 km)' : 'Atmosfer Dikey Kesit Diyagramı (0 - 10.000 km)'}
            </span>
            <span className="text-[11px] text-slate-400">Katmana tıklayarak bilgi al</span>
          </div>

          {/* SVG Diagram */}
          <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center my-3 select-none">
            {category === 'geosphere' ? (
              /* GEOSPHERE CUTAWAY SVG */
              <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <defs>
                  <radialGradient id="grad-inner-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF9C4" />
                    <stop offset="100%" stopColor="#FBC02D" />
                  </radialGradient>
                  <radialGradient id="grad-outer-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFA000" />
                    <stop offset="100%" stopColor="#E65100" />
                  </radialGradient>
                  <radialGradient id="grad-mantle" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D84315" />
                    <stop offset="100%" stopColor="#BF360C" />
                  </radialGradient>
                </defs>

                {/* Atmosphere outer glow */}
                <circle cx="250" cy="250" r="215" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="6" />

                {/* Crust / Ocean / Continents Outer Shell */}
                <circle
                  cx="250"
                  cy="250"
                  r="205"
                  fill="#1E88E5"
                  className={`cursor-pointer transition-all ${
                    selectedLayerId === 'crust' ? 'stroke-4 stroke-white' : 'hover:opacity-90'
                  }`}
                  onClick={() => handleSelectLayer(earthLayersData[0])}
                />

                {/* Green Continents drawn as shapes on Crust */}
                <path
                  d="M 120 180 Q 150 140 210 160 Q 230 200 190 230 Q 140 220 120 180 Z"
                  fill="#4CAF50"
                  opacity="0.8"
                />
                <path
                  d="M 160 260 Q 190 270 210 330 Q 170 360 140 320 Z"
                  fill="#4CAF50"
                  opacity="0.8"
                />

                {/* Cutaway Opening (Top Right Quarter Slice) */}
                <path
                  d="M 250 250 L 250 45 A 205 205 0 0 1 455 250 Z"
                  fill="#0F172A"
                  opacity="0.2"
                />

                {/* Mantle Wedge */}
                <path
                  d="M 250 250 L 250 50 A 200 200 0 0 1 450 250 Z"
                  fill="url(#grad-mantle)"
                  className={`cursor-pointer transition-all ${
                    selectedLayerId === 'mantle' ? 'stroke-2 stroke-white brightness-125' : 'hover:brightness-110'
                  }`}
                  onClick={() => handleSelectLayer(earthLayersData[1])}
                />

                {/* Outer Core Wedge */}
                <path
                  d="M 250 250 L 250 140 A 110 110 0 0 1 360 250 Z"
                  fill="url(#grad-outer-core)"
                  className={`cursor-pointer transition-all ${
                    selectedLayerId === 'outer-core' ? 'stroke-2 stroke-white brightness-125' : 'hover:brightness-110'
                  }`}
                  onClick={() => handleSelectLayer(earthLayersData[2])}
                />

                {/* Inner Core Center */}
                <circle
                  cx="250"
                  cy="250"
                  r="45"
                  fill="url(#grad-inner-core)"
                  className={`cursor-pointer transition-all ${
                    selectedLayerId === 'inner-core' ? 'stroke-3 stroke-white scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => handleSelectLayer(earthLayersData[3])}
                />

                {/* Annotation Lines */}
                <text x="365" y="145" fill="#FFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  MANTO (2.900 km)
                </text>
                <line x1="360" y1="150" x2="310" y2="180" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />

                <text x="315" y="275" fill="#FFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  DIŞ ÇEKİRDEK (SIVI)
                </text>
                <line x1="310" y1="265" x2="285" y2="245" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />

                <text x="210" y="255" fill="#1A1A1A" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  İÇ ÇEKİRDEK
                </text>
              </svg>
            ) : (
              /* ATMOSPHERE COLUMN / ARC SVG */
              <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                {/* Earth Base Surface Curve */}
                <path
                  d="M 0 450 Q 250 430 500 450 L 500 500 L 0 500 Z"
                  fill="#2E7D32"
                />
                <text x="250" y="475" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">
                  YERYÜZÜ (0 km)
                </text>

                {/* 1. Troposphere (0 - 80px) */}
                <rect
                  x="50"
                  y="360"
                  width="400"
                  height="70"
                  rx="8"
                  fill="#38BDF8"
                  fillOpacity="0.4"
                  stroke={selectedLayerId === 'troposphere' ? '#FFFFFF' : '#38BDF8'}
                  strokeWidth={selectedLayerId === 'troposphere' ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-60 transition-all"
                  onClick={() => handleSelectLayer(earthLayersData[4])}
                />
                <text x="65" y="400" fill="#E0F2FE" fontSize="13" fontWeight="bold">
                  1. Troposfer (0 - 16 km)
                </text>
                <text x="65" y="418" fill="#BAE6FD" fontSize="10">
                  Yağmur, Kar, Rüzgar, Bulutlar, Uçaklar
                </text>

                {/* 2. Stratosphere (80 - 160px) */}
                <rect
                  x="50"
                  y="280"
                  width="400"
                  height="70"
                  rx="8"
                  fill="#0284C7"
                  fillOpacity="0.45"
                  stroke={selectedLayerId === 'stratosphere' ? '#FFFFFF' : '#0284C7'}
                  strokeWidth={selectedLayerId === 'stratosphere' ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-60 transition-all"
                  onClick={() => handleSelectLayer(earthLayersData[5])}
                />
                <text x="65" y="320" fill="#E0F2FE" fontSize="13" fontWeight="bold">
                  2. Stratosfer & Ozon Tabakası (16 - 50 km)
                </text>
                <text x="65" y="338" fill="#BAE6FD" fontSize="10">
                  Ozon (O3) Gazı, Zararlı UV Işınlarını Süzme Kalkanı
                </text>

                {/* 3. Mesosphere (160 - 240px) */}
                <rect
                  x="50"
                  y="200"
                  width="400"
                  height="70"
                  rx="8"
                  fill="#4F46E5"
                  fillOpacity="0.45"
                  stroke={selectedLayerId === 'mesosphere' ? '#FFFFFF' : '#4F46E5'}
                  strokeWidth={selectedLayerId === 'mesosphere' ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-60 transition-all"
                  onClick={() => handleSelectLayer(earthLayersData[6])}
                />
                <text x="65" y="240" fill="#E0E7FF" fontSize="13" fontWeight="bold">
                  3. Mezosfer (50 - 85 km)
                </text>
                <text x="65" y="258" fill="#C7D2FE" fontSize="10">
                  Gök Taşları (Meteorlar) Sürtünmeyle Yanar (-90 °C)
                </text>

                {/* 4. Thermosphere (240 - 320px) */}
                <rect
                  x="50"
                  y="120"
                  width="400"
                  height="70"
                  rx="8"
                  fill="#7C3AED"
                  fillOpacity="0.45"
                  stroke={selectedLayerId === 'thermosphere' ? '#FFFFFF' : '#7C3AED'}
                  strokeWidth={selectedLayerId === 'thermosphere' ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-60 transition-all"
                  onClick={() => handleSelectLayer(earthLayersData[7])}
                />
                <text x="65" y="160" fill="#F3E8FF" fontSize="13" fontWeight="bold">
                  4. Termosfer / İyonosfer (85 - 600 km)
                </text>
                <text x="65" y="178" fill="#E9D5FF" fontSize="10">
                  Kutup Işıkları (Aurora), Uzay İstasyonu (ISS), 1.500 °C
                </text>

                {/* 5. Exosphere (320 - 400px) */}
                <rect
                  x="50"
                  y="40"
                  width="400"
                  height="70"
                  rx="8"
                  fill="#1E293B"
                  fillOpacity="0.6"
                  stroke={selectedLayerId === 'exosphere' ? '#FFFFFF' : '#475569'}
                  strokeWidth={selectedLayerId === 'exosphere' ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-80 transition-all"
                  onClick={() => handleSelectLayer(earthLayersData[8])}
                />
                <text x="65" y="80" fill="#F8FAFC" fontSize="13" fontWeight="bold">
                  5. Ekzosfer (600 - 10.000 km)
                </text>
                <text x="65" y="98" fill="#CBD5E1" fontSize="10">
                  Yapay Uydular, Uzay Boşluğuna Açılan Kapı
                </text>
              </svg>
            )}
          </div>

          {/* Quick Buttons List */}
          <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mt-3">
            {layers.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold scale-105 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {layer.turkishName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  {selectedLayer.category === 'geosphere' ? 'Yer Küre Katmanı' : 'Hava Küre Katmanı'}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  {selectedLayer.turkishName}
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedLayer.name}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Fiziksel Hal</span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  {selectedLayer.stateOfMatter}
                </span>
              </div>
            </div>

            {/* Depth & Temperature Info Grid */}
            <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Derinlik / Yükseklik:</span>
                <span className="font-semibold text-slate-100">{selectedLayer.depthRange}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Sıcaklık Aralığı:</span>
                <span className="font-semibold font-mono text-amber-300">{selectedLayer.temperatureC}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Bileşim ve Maddeler:</span>
                <span className="text-slate-200">{selectedLayer.composition}</span>
              </div>
            </div>

            {/* Detailed Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedLayer.description}
            </p>

            {/* MEB Sınav Notu Callout */}
            <div className="mt-5 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-700/40 text-emerald-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-300 block mb-0.5">MEB Yazılı & Sınav Sorusu İpucu</span>
                <p className="text-emerald-100/90 leading-normal">{selectedLayer.mebExamTip}</p>
              </div>
            </div>
          </div>

          {/* Quick FAQ Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
            <h3 className="font-semibold text-white">Ortaokulda En Çok Çıkan 3 Bilgi</h3>
            <div className="space-y-2 text-slate-300">
              <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                <span className="font-bold text-amber-400 block">1. İç Çekirdek Neden Katıdır?</span>
                <p className="text-slate-400 mt-0.5">
                  Güneş yüzeyi kadar sıcak (~6000 °C) olmasına rağmen, milyonlarca tonluk aşırı basınç atomların ayrılmasına izin vermez!
                </p>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                <span className="font-bold text-sky-400 block">2. Yıldız Kayması Nedir?</span>
                <p className="text-slate-400 mt-0.5">
                  Gerçekte yıldızlar kaymaz! Uzaydan gelen gök taşlarının Mezosfer katmanında sürtünmeyle yanması olayıdır.
                </p>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                <span className="font-bold text-emerald-400 block">3. Ozon Tabakası Nerededir?</span>
                <p className="text-slate-400 mt-0.5">
                  Stratosfer katmanındadır ve Güneş’in zararlı morötesi (UV) ışınlarını soğurarak canlıları korur.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
