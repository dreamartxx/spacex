import React, { useState, useEffect } from 'react';
import { planetsData, moonPhasesData, sunLayers, earthLayersData } from '../data/astronomyData';
import { CelestialBody, MoonPhase } from '../types/astronomy';
import { playSound } from '../utils/sound';
import { submitScore, fetchLeaderboard, LeaderboardEntry } from '../services/storageService';
import confetti from 'canvas-confetti';
import { Gamepad2, Trophy, Clock, Star, RotateCcw, CheckCircle2, XCircle, Sparkles, Orbit, Moon, Layers } from 'lucide-react';

export const GameCenter: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'orbit_sorter' | 'moon_hunter' | 'layer_detective'>('orbit_sorter');

  // Shared Game State
  const [playerName, setPlayerName] = useState<string>('Genç Astronom');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard(activeGame).then(setLeaderboard);
  }, [activeGame]);

  // ==================== OYUN 1: YÖRÜNGEYE DİZ (GEZEGEN SIRALAMA) ====================
  const targetPlanets = planetsData.filter((p) => p.category !== 'dwarf'); // 8 official planets
  const [shuffledPlanets, setShuffledPlanets] = useState<CelestialBody[]>([]);
  const [placedSlots, setPlacedSlots] = useState<(CelestialBody | null)[]>(new Array(8).fill(null));
  const [gameTimer, setGameTimer] = useState<number>(0);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);

  // Initialize Orbit Sorter
  const startOrbitSorter = () => {
    playSound('whoosh');
    const shuffled = [...targetPlanets].sort(() => Math.random() - 0.5);
    setShuffledPlanets(shuffled);
    setPlacedSlots(new Array(8).fill(null));
    setGameTimer(0);
    setIsGameRunning(true);
    setIsGameCompleted(false);
    setGameScore(0);
  };

  useEffect(() => {
    if (activeGame === 'orbit_sorter' && !isGameRunning && !isGameCompleted) {
      startOrbitSorter();
    }
  }, [activeGame]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameRunning) {
      interval = setInterval(() => {
        setGameTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameRunning]);

  const handlePlacePlanet = (planet: CelestialBody, slotIndex: number) => {
    if (placedSlots[slotIndex]) return;

    // Check if correct
    const isCorrect = planet.orderFromSun === slotIndex + 1;
    if (isCorrect) {
      playSound('correct');
      const newSlots = [...placedSlots];
      newSlots[slotIndex] = planet;
      setPlacedSlots(newSlots);

      // Remove from pool
      setShuffledPlanets((prev) => prev.filter((p) => p.id !== planet.id));

      // Check if all placed
      const remaining = newSlots.filter((s) => s === null).length;
      if (remaining === 0) {
        // Complete!
        playSound('win');
        setIsGameRunning(false);
        setIsGameCompleted(true);
        const finalScore = Math.max(500, 1500 - gameTimer * 20);
        setGameScore(finalScore);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        submitScore(
          {
            student_name: playerName,
            score: finalScore,
            time_seconds: gameTimer,
            stars_earned: gameTimer < 35 ? 3 : gameTimer < 60 ? 2 : 1
          },
          'orbit_sorter'
        ).then(() => fetchLeaderboard('orbit_sorter').then(setLeaderboard));
      }
    } else {
      playSound('wrong');
    }
  };

  // ==================== OYUN 2: AY EVRESİ AVCISI ====================
  const moonHuntClues = [
    {
      clue: 'Güneş ile Dünya arasına girdiğinde oluşan ve Dünya’dan bakınca AY’IN GÖRÜLMEDİĞİ evreyim!',
      targetId: 'new_moon'
    },
    {
      clue: 'Gökyüzünde DÜZ "D" HARFİ şeklinde parlarım, sağ tarafım aydınlıktır!',
      targetId: 'first_quarter'
    },
    {
      clue: 'Pırıl pırıl tam bir daire şeklindeyim, tüm geceyi aydınlatırım ve AY TUTULMASI bende olur!',
      targetId: 'full_moon'
    },
    {
      clue: 'Gökyüzünde TERS "D" HARFİ şeklinde parlarım, sol tarafım aydınlıktır!',
      targetId: 'last_quarter'
    },
    {
      clue: 'Türk bayrağındaki gibi güzel bir "C" harfi şeklindeyim, sabah gün doğmadan önce beliririm!',
      targetId: 'waning_crescent'
    }
  ];

  const [moonRound, setMoonRound] = useState<number>(0);
  const [moonScore, setMoonScore] = useState<number>(0);
  const [moonFeedback, setMoonFeedback] = useState<string | null>(null);

  const handleMoonPick = (phaseId: string) => {
    const currentClue = moonHuntClues[moonRound];
    if (phaseId === currentClue.targetId) {
      playSound('correct');
      setMoonFeedback('correct');
      setMoonScore((s) => s + 200);
      setTimeout(() => {
        setMoonFeedback(null);
        if (moonRound + 1 < moonHuntClues.length) {
          setMoonRound((r) => r + 1);
        } else {
          playSound('win');
          confetti({ particleCount: 80, spread: 60 });
          submitScore(
            {
              student_name: playerName,
              score: moonScore + 200,
              time_seconds: 40,
              stars_earned: 3
            },
            'moon_hunter'
          ).then(() => fetchLeaderboard('moon_hunter').then(setLeaderboard));
        }
      }, 900);
    } else {
      playSound('wrong');
      setMoonFeedback('wrong');
      setTimeout(() => setMoonFeedback(null), 800);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Gamepad2 className="h-3.5 w-3.5" />
            <span>Oyunlarla Eğlen, Puan Topla ve Öğren</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Uzay Oyunları Arenası
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Öğrendiğin bilgileri oyunlarda test et! Gezegenleri yörüngelere yerleştir, Ay evrelerini yakala ve şampiyonlar tablosuna adını yazdır.
          </p>
        </div>

        {/* Game Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              playSound('click');
              setActiveGame('orbit_sorter');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeGame === 'orbit_sorter'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Orbit className="h-3.5 w-3.5" />
            <span>Yörüngeye Diz (Gezegenler)</span>
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveGame('moon_hunter');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeGame === 'moon_hunter'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="h-3.5 w-3.5" />
            <span>Ay Evresi Avcısı</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Game Stage (70%) + Leaderboard (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Game Active Area */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
          
          {/* ================= GAME 1: ORBIT SORTER ================= */}
          {activeGame === 'orbit_sorter' && (
            <div className="space-y-6">
              
              {/* Game HUD */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-sky-400" />
                  <span className="text-slate-400">Geçen Süre:</span>
                  <span className="font-mono text-base font-bold text-white tabular-nums">{gameTimer}s</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Adını Yaz"
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white max-w-[140px]"
                  />
                  <button
                    onClick={startOrbitSorter}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Yeniden Başlat"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Victory Screen */}
              {isGameCompleted ? (
                <div className="p-8 text-center bg-amber-950/20 border border-amber-600/40 rounded-2xl space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mb-1">
                    <Trophy className="h-10 w-10 animate-bounce" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Tebrikler {playerName}!</h2>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Tüm gezegenleri Güneş’e olan uzaklıklarına göre kusursuz bir şekilde doğru yörüngelerine yerleştirdin!
                  </p>
                  <div className="flex justify-center gap-6 py-2">
                    <div className="text-center">
                      <span className="text-xs text-slate-400 block">Süre</span>
                      <span className="font-mono font-bold text-white text-lg">{gameTimer} Saniye</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-slate-400 block">Kazanılan Puan</span>
                      <span className="font-mono font-bold text-amber-300 text-lg">+{gameScore} Puan</span>
                    </div>
                  </div>
                  <button
                    onClick={startOrbitSorter}
                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-transform active:scale-95"
                  >
                    Tekrar Oyna
                  </button>
                </div>
              ) : (
                <>
                  {/* Slots: 1 to 8 from Sun */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block">
                      Güneş’ten Uzaklık Sıralaması (1: Merkür'den 8: Neptün'e)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {placedSlots.map((slot, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center min-h-[96px] text-center transition-all ${
                            slot
                              ? 'bg-slate-950 border-amber-500/60 shadow-md shadow-amber-500/10'
                              : 'bg-slate-950/40 border-dashed border-slate-700/80'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                            {idx + 1}. Yörünge
                          </span>

                          {slot ? (
                            <div className="flex flex-col items-center animate-fade-in">
                              <span
                                className="h-4 w-4 rounded-full mb-1 shadow-sm"
                                style={{ backgroundColor: slot.colorHex }}
                              />
                              <span className="text-xs font-bold text-white">{slot.turkishName}</span>
                              <span className="text-[10px] text-emerald-400 font-mono">✓ Doğru</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500 italic">Boş Yuva</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Planet Cards to Place */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 block">
                      Yerleştirilecek Gezegenler (Tıkla ve Boş Yuvaya Gönder)
                    </span>

                    {shuffledPlanets.length > 0 ? (
                      <div className="flex flex-wrap gap-2.5">
                        {shuffledPlanets.map((planet) => (
                          <div
                            key={planet.id}
                            className="bg-slate-950 border border-slate-800 hover:border-amber-400 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105"
                          >
                            <div
                              className="h-9 w-9 rounded-full shadow-md flex items-center justify-center"
                              style={{ backgroundColor: planet.colorHex }}
                            >
                              <span className="text-[9px] font-bold text-slate-950 font-mono">
                                {planet.turkishName.slice(0, 2)}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-white">{planet.turkishName}</span>

                            {/* Buttons to place into matching next free slot or slot picker */}
                            <div className="flex gap-1">
                              {placedSlots.map((s, slotIdx) => {
                                if (s !== null) return null;
                                return (
                                  <button
                                    key={slotIdx}
                                    onClick={() => handlePlacePlanet(planet, slotIdx)}
                                    className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 rounded border border-slate-800 transition-colors"
                                    title={`${slotIdx + 1}. Yörüngeye Koy`}
                                  >
                                    {slotIdx + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ================= GAME 2: MOON HUNTER ================= */}
          {activeGame === 'moon_hunter' && (
            <div className="space-y-6">
              {/* Moon Hunter HUD */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="font-mono text-slate-300">
                  Görev: {moonRound + 1} / {moonHuntClues.length}
                </span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  Puan: {moonScore} P
                </span>
              </div>

              {/* Clue Prompt */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-slate-900 border border-indigo-800/40 text-center space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Aşağıdaki İpuçlarını Okuyup Doğru Ay Evresini Seç:
                </span>
                <p className="text-base sm:text-lg font-semibold text-white max-w-xl mx-auto">
                  «{moonHuntClues[moonRound].clue}»
                </p>
                {moonFeedback && (
                  <div className="pt-2">
                    {moonFeedback === 'correct' ? (
                      <span className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Tebrikler! Doğru Evre!
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-rose-400 flex items-center justify-center gap-1">
                        <XCircle className="h-4 w-4" /> Yanlış Evre, tekrar dene!
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Moon Phase Options to Select */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {moonPhasesData.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => handleMoonPick(phase.id)}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 hover:bg-slate-900 flex flex-col items-center gap-2 transition-all active:scale-95 group text-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-amber-400">
                      <span className="font-mono text-xs text-amber-300">
                        {phase.illuminationPercent}%
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-amber-300">
                      {phase.turkishName.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {phase.isMainPhase ? 'Ana Evre' : 'Ara Evre'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Pane: Hall of Fame / Leaderboard */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Şampiyonlar Tablosu</h3>
          </div>

          <p className="text-xs text-slate-400">
            En yüksek puanı toplayan genç astronomlar:
          </p>

          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold w-5 text-center ${
                      index === 0
                        ? 'text-amber-400'
                        : index === 1
                        ? 'text-slate-300'
                        : index === 2
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200 block">{entry.student_name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{entry.time_seconds}s süre</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-amber-300 block">{entry.score} P</span>
                  <div className="flex justify-end gap-0.5">
                    {Array.from({ length: entry.stars_earned || 3 }).map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-500 italic text-center">
            * Skorlar Hostinger veritabanına ve yerel tarayıcına anında kaydedilir.
          </div>
        </div>

      </div>
    </div>
  );
};
