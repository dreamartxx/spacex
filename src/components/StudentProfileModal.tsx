import React, { useState } from 'react';
import { UserStats } from '../types/astronomy';
import { badgesList } from '../data/astronomyData';
import { playSound } from '../utils/sound';
import { saveUserStats } from '../services/storageService';
import { X, Trophy, Award, Star, CheckCircle, Lock, Edit2, Check, Sparkles } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  userStats,
  setUserStats
}) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(userStats.studentName);

  if (!isOpen) return null;

  const handleSaveName = () => {
    playSound('click');
    const updated = { ...userStats, studentName: tempName.trim() || 'Genç Astronom' };
    setUserStats(updated);
    saveUserStats(updated);
    setIsEditingName(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-sm text-white font-bold"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 rounded bg-amber-400 text-slate-950 hover:bg-amber-300"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">{userStats.studentName}</h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-slate-400 hover:text-white p-1"
                      title="Adı Değiştir"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Astronomi Kaşifi Profili ve Başarı Rozetleri
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Toplam Puan</span>
              <span className="text-xl font-bold font-mono text-amber-300">{userStats.score} P</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Çözülen Sınav</span>
              <span className="text-xl font-bold font-mono text-sky-400">{userStats.quizzesCompleted}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Oynanan Oyun</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{userStats.gamesPlayed}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Kazanılan Rozet</span>
              <span className="text-xl font-bold font-mono text-rose-400">
                {userStats.earnedBadges.length} / {badgesList.length}
              </span>
            </div>
          </div>

          {/* Badges Collection */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Gök Atlası Başarı Rozetleri</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badgesList.map((badge) => {
                const isEarned = userStats.earnedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                      isEarned
                        ? 'bg-amber-950/20 border-amber-600/40 text-amber-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isEarned
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-slate-800 text-slate-600 border-slate-700'
                      }`}
                    >
                      {isEarned ? <Award className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                    </div>

                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{badge.name}</span>
                        {isEarned && <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-slate-400 leading-normal">{badge.description}</p>
                      <span className="text-[10px] font-mono text-slate-500 block pt-0.5">
                        Şart: {badge.condition}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            Tamam
          </button>
        </div>

      </div>
    </div>
  );
};
