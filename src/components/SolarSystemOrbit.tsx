import React, { useState, useEffect, useRef } from 'react';
import { planetsData, sunData } from '../data/astronomyData';
import { CelestialBody } from '../types/astronomy';
import { playSound } from '../utils/sound';
import { Play, Pause, RotateCcw, Orbit, Info, Scale, ArrowRightLeft, Sparkles, Moon, ExternalLink } from 'lucide-react';

export const SolarSystemOrbit: React.FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showRings, setShowRings] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'details' | 'gravity_calculator' | 'compare'>('details');

  // Gravity calculator state
  const [userWeightKg, setUserWeightKg] = useState<number>(45); // typical middle schooler ~45kg

  // Planet comparison state
  const [comparePlanetId, setComparePlanetId] = useState<string>('mars');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Selected planet reference
  const selectedPlanet = planetsData.find((p) => p.id === selectedPlanetId) || planetsData[2];
  const comparePlanet = planetsData.find((p) => p.id === comparePlanetId) || planetsData[3];

  // Orbital angles tracking for canvas
  const anglesRef = useRef<{ [key: string]: number }>(
    planetsData.reduce((acc, p) => ({ ...acc, [p.id]: Math.random() * Math.PI * 2 }), {})
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Deep space subtle gradient background
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width / 2);
      bgGrad.addColorStop(0, '#0c101c');
      bgGrad.addColorStop(1, '#05070d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Tiny background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      const starSeed = [
        [40, 50], [90, 180], [150, 40], [280, 70], [350, 120], [420, 60],
        [480, 200], [520, 310], [100, 390], [210, 440], [380, 430], [540, 480],
        [30, 290], [70, 520], [480, 20], [260, 530], [580, 240]
      ];
      starSeed.forEach(([sx, sy]) => {
        ctx.fillRect((sx * width) / 600, (sy * height) / 600, 1.2, 1.2);
      });

      // Draw Sun in Center with Glow
      const sunGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 38);
      sunGlow.addColorStop(0, '#FFFFFF');
      sunGlow.addColorStop(0.3, '#FFB300');
      sunGlow.addColorStop(0.7, '#FF5722');
      sunGlow.addColorStop(1, 'rgba(255, 87, 34, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 36, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFE082';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fill();

      // Asteroid Belt (Between Mars [r=135] and Jupiter [r=175])
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 155, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(160, 160, 160, 0.15)';
      ctx.lineWidth = 10;
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.restore();

      // Render Each Planet Orbit and Body
      planetsData.forEach((planet) => {
        const orbitRadius = planet.orbitRadiusRatio * 0.95;

        // Draw Orbit Path
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = selectedPlanetId === planet.id ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = selectedPlanetId === planet.id ? 1.5 : 1;
        ctx.stroke();

        // Update angle if playing
        if (isPlaying) {
          anglesRef.current[planet.id] += delta * planet.orbitSpeedFactor * 0.6 * simulationSpeed;
        }

        const angle = anglesRef.current[planet.id];
        const planetX = centerX + Math.cos(angle) * orbitRadius;
        const planetY = centerY + Math.sin(angle) * orbitRadius;

        // Size representation
        let planetSize = 4;
        if (planet.id === 'mercury') planetSize = 3;
        else if (planet.id === 'venus' || planet.id === 'earth') planetSize = 5;
        else if (planet.id === 'mars') planetSize = 4;
        else if (planet.id === 'jupiter') planetSize = 11;
        else if (planet.id === 'saturn') planetSize = 9;
        else if (planet.id === 'uranus' || planet.id === 'neptune') planetSize = 7;
        else if (planet.id === 'pluto') planetSize = 2.5;

        // Draw Rings for Saturn
        if (planet.rings && planet.id === 'saturn' && showRings) {
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(planetX, planetY, planetSize * 2.2, planetSize * 0.8, -0.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 224, 130, 0.65)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.restore();
        }

        // Draw Planet Body
        ctx.fillStyle = planet.colorHex;
        ctx.beginPath();
        ctx.arc(planetX, planetY, planetSize, 0, Math.PI * 2);
        ctx.fill();

        // Planet 3D shadow shading
        const shadeGrad = ctx.createRadialGradient(
          planetX - planetSize * 0.3,
          planetY - planetSize * 0.3,
          1,
          planetX,
          planetY,
          planetSize
        );
        shadeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        shadeGrad.addColorStop(0.7, 'transparent');
        shadeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = shadeGrad;
        ctx.beginPath();
        ctx.arc(planetX, planetY, planetSize, 0, Math.PI * 2);
        ctx.fill();

        // Selection Target Ring
        if (selectedPlanetId === planet.id) {
          ctx.beginPath();
          ctx.arc(planetX, planetY, planetSize + 5, 0, Math.PI * 2);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Planet Name Tag
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(planet.turkishName, planetX, planetY - planetSize - 7);
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, simulationSpeed, selectedPlanetId, showRings]);

  const handleSelectPlanet = (planet: CelestialBody) => {
    playSound('select');
    setSelectedPlanetId(planet.id);
  };

  return (
    <div className="space-y-8">
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1">
            <Orbit className="h-3.5 w-3.5" />
            <span>Karasal Gezegenler & Dev Gaz Dünyaları</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Güneş Sistemi Gezegenleri ve Uyduları
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Güneş etrafındaki 8 resmi gezegen ve cüce gezegen Plüton. Yörünge hızlarını canlı izle, uydularını incele ve diğer gezegenlerdeki kilonu hesapla!
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('details');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'details'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gezegen Detayları
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('gravity_calculator');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'gravity_calculator'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kilo Hesaplayıcı
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('compare');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'compare'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Karşılaştır
          </button>
        </div>
      </div>

      {/* Main Grid: Orbit Canvas (60%) + Details/Tools (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Orbit Stage (Canvas) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col items-center relative overflow-hidden">
          
          {/* Simulation Controls Top Toolbar */}
          <div className="w-full flex items-center justify-between text-xs pb-3 border-b border-slate-800/80 mb-2 z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound('click');
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-400" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
                <span>{isPlaying ? 'Durdur' : 'Başlat'}</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  anglesRef.current = planetsData.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {});
                }}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Hizalamayı Sıfırla"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Speed Buttons */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline mr-1">Hız:</span>
              {[0.5, 1, 2, 5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    playSound('click');
                    setSimulationSpeed(spd);
                  }}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                    simulationSpeed === spd
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* HTML5 Canvas Viewport */}
          <div className="relative w-full aspect-square max-w-[520px] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="w-full h-full rounded-xl cursor-crosshair"
            />
            {/* Legend Overlay on Canvas */}
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-950/70 px-2.5 py-1 rounded border border-slate-800/80 backdrop-blur-sm">
              <span>Merkez: Güneş · Kesikli Kuşak: Asteroit Kuşağı</span>
            </div>
          </div>

          {/* Planet Selector Carousel / Strip */}
          <div className="w-full overflow-x-auto py-2.5 mt-3 flex items-center justify-start sm:justify-center gap-1.5 scrollbar-none">
            {planetsData.map((planet) => {
              const isSelected = selectedPlanetId === planet.id;
              return (
                <button
                  key={planet.id}
                  onClick={() => handleSelectPlanet(planet)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold scale-105 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full inline-block"
                    style={{ backgroundColor: planet.colorHex }}
                  />
                  <span>{planet.turkishName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Planet Details OR Gravity Calculator OR Comparison */}
        <div className="lg:col-span-5 space-y-5">
          
          {activeTab === 'details' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative">
              {/* Top Planet Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      Güneş’ten {selectedPlanet.orderFromSun}. Gezegen
                    </span>
                    <span className="text-[11px] text-slate-400">· {selectedPlanet.categoryLabel}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                    <span>{selectedPlanet.turkishName}</span>
                  </h2>
                </div>

                {/* 3D-Shaded Visual Preview Sphere */}
                <div
                  className={`h-14 w-14 rounded-full bg-gradient-to-tr ${selectedPlanet.gradient} shadow-lg shrink-0 border border-white/20 relative overflow-hidden flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/60" />
                  {selectedPlanet.rings && (
                    <div className="absolute w-20 h-3 border-2 border-amber-200/60 rounded-[100%] rotate-[-25deg]" />
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {selectedPlanet.summary}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Çap:</span>
                  <span className="font-mono font-semibold text-slate-100">
                    {selectedPlanet.diameterKm.toLocaleString('tr-TR')} km
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Güneş’e Uzaklık:</span>
                  <span className="font-mono font-semibold text-slate-100">
                    {selectedPlanet.distanceFromSunMillionKm.toLocaleString('tr-TR')} Milyon km
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">1 Gün (Kendi Ekseni):</span>
                  <span className="font-mono font-semibold text-slate-100">
                    {selectedPlanet.rotationPeriodHours > 24
                      ? `${(selectedPlanet.rotationPeriodHours / 24).toFixed(1)} Dünya Günü`
                      : `${selectedPlanet.rotationPeriodHours} Saat`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">1 Yıl (Güneş Turu):</span>
                  <span className="font-mono font-semibold text-slate-100">
                    {selectedPlanet.orbitalPeriodEarthDays > 365
                      ? `${(selectedPlanet.orbitalPeriodEarthDays / 365.25).toFixed(1)} Dünya Yılı`
                      : `${selectedPlanet.orbitalPeriodEarthDays} Gün`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Ortalama Sıcaklık:</span>
                  <span className="font-mono font-semibold text-amber-300">
                    {selectedPlanet.surfaceTempC.average} °C
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Yerçekimi (g):</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {selectedPlanet.gravityMps2} m/s² ({((selectedPlanet.gravityMps2 / 9.8) * 100).toFixed(0)}% Dünya)
                  </span>
                </div>
              </div>

              {/* Moons Section */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Moon className="h-3.5 w-3.5 text-slate-400" />
                    <span>Doğal Uyduları ({selectedPlanet.moonsCount} Adet)</span>
                  </span>
                </div>

                {selectedPlanet.moonsCount === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    Bu gezegenin doğal uydusu yoktur. (Güneş Sistemi’nde yalnızca Merkür ve Venüs uydusuzdur).
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedPlanet.moons.map((moon) => (
                      <div
                        key={moon.id}
                        className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: moon.color }} />
                            <span>{moon.turkishName}</span>
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">
                            Çap: {moon.diameterKm.toLocaleString('tr-TR')} km
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{moon.funFact}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MEB Middle School Facts */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-semibold text-amber-300 block">
                  MEB Müfredatı & Sınav Püf Noktaları
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedPlanet.middleSchoolFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/30 p-2 rounded border border-slate-800/60">
                      <span className="text-amber-400 shrink-0">✦</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Gravity & Weight on Planets Calculator */}
          {activeTab === 'gravity_calculator' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Gezegenlerde Kaç Kilosun?</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kütlen evrenin her yerinde aynıdır ama ağırlığın gezegenin kütleçekimine göre değişir! Kendi kilonu gir ve diğer dünyalardaki ağırlığını gör:
              </p>

              {/* Weight input slider */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Dünya’daki Kilon:</span>
                  <span className="font-mono text-base font-bold text-emerald-400">{userWeightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={userWeightKg}
                  onChange={(e) => setUserWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20 kg</span>
                  <span>45 kg (Ortaokul ortalama)</span>
                  <span>120 kg</span>
                </div>
              </div>

              {/* Calculated Weight on Each Celestial Body */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {/* Sun */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-orange-950/30 border border-orange-900/50 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <div>
                      <span className="font-bold text-amber-200 block">Güneş</span>
                      <span className="text-[10px] text-slate-400">274 m/s² (Dünya’nın 28 katı!)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      {(userWeightKg * 28).toFixed(1)} kg
                    </span>
                    <span className="text-[10px] text-slate-400 block">Ezici Ağırlık!</span>
                  </div>
                </div>

                {/* The Moon */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                    <div>
                      <span className="font-bold text-slate-100 block">Ay (Uydumuz)</span>
                      <span className="text-[10px] text-slate-400">1.62 m/s² (Dünya’nın 1/6’sı)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {(userWeightKg * 0.166).toFixed(1)} kg
                    </span>
                    <span className="text-[10px] text-emerald-300 block">6 kat yükseğe zıplarsın!</span>
                  </div>
                </div>

                {/* Planets */}
                {planetsData.map((planet) => {
                  const weightRatio = planet.gravityMps2 / 9.8;
                  const calculatedWeight = (userWeightKg * weightRatio).toFixed(1);
                  return (
                    <div
                      key={planet.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: planet.colorHex }} />
                        <div>
                          <span className="font-semibold text-slate-200 block">{planet.turkishName}</span>
                          <span className="text-[10px] text-slate-400">{planet.gravityMps2} m/s²</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-100 text-sm">
                          {calculatedWeight} kg
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {weightRatio < 1 ? `Hafif (%${((1 - weightRatio) * 100).toFixed(0)} az)` : `Ağır (%${((weightRatio - 1) * 100).toFixed(0)} çok)`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Planet Comparison Tool */}
          {activeTab === 'compare' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">İki Gezegeni Karşılaştır</h2>
              </div>

              {/* Dropdown selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">1. Gezegen:</label>
                  <select
                    value={selectedPlanetId}
                    onChange={(e) => setSelectedPlanetId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    {planetsData.map((p) => (
                      <option key={p.id} value={p.id}>{p.turkishName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">2. Gezegen:</label>
                  <select
                    value={comparePlanetId}
                    onChange={(e) => setComparePlanetId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    {planetsData.map((p) => (
                      <option key={p.id} value={p.id}>{p.turkishName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Matrix Table */}
              <div className="space-y-3 pt-2 text-xs">
                
                {/* Metric 1: Diameter */}
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-slate-400 mb-1.5 flex justify-between">
                    <span>Gezegen Çapı:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="font-bold text-amber-400 block">{selectedPlanet.turkishName}</span>
                      <span className="font-mono text-slate-200">{selectedPlanet.diameterKm.toLocaleString('tr-TR')} km</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="font-bold text-sky-400 block">{comparePlanet.turkishName}</span>
                      <span className="font-mono text-slate-200">{comparePlanet.diameterKm.toLocaleString('tr-TR')} km</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2: Moons */}
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-slate-400 mb-1.5 flex justify-between">
                    <span>Uydu Sayısı:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="font-bold text-amber-400 block">{selectedPlanet.turkishName}</span>
                      <span className="font-mono text-slate-200">{selectedPlanet.moonsCount} Uydu</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="font-bold text-sky-400 block">{comparePlanet.turkishName}</span>
                      <span className="font-mono text-slate-200">{comparePlanet.moonsCount} Uydu</span>
                    </div>
                  </div>
                </div>

                {/* Metric 3: Average Temperature */}
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-slate-400 mb-1.5 flex justify-between">
                    <span>Ortalama Yüzey Sıcaklığı:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="font-bold text-amber-400 block">{selectedPlanet.turkishName}</span>
                      <span className="font-mono text-slate-200">{selectedPlanet.surfaceTempC.average} °C</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="font-bold text-sky-400 block">{comparePlanet.turkishName}</span>
                      <span className="font-mono text-slate-200">{comparePlanet.surfaceTempC.average} °C</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
