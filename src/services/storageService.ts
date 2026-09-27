import { UserStats } from '../types/astronomy';

const STORAGE_KEY = 'gok_atlasi_stats_v1';

const defaultStats: UserStats = {
  score: 250,
  quizzesCompleted: 0,
  correctAnswers: 0,
  totalAnswered: 0,
  gamesPlayed: 0,
  highestGameScore: 0,
  studentName: 'Genç Kaşif',
  earnedBadges: ['solar_scholar'],
  unlockedCertificates: 0
};

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    return { ...defaultStats, ...JSON.parse(raw) };
  } catch {
    return defaultStats;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Storage save error:', err);
  }
}

export function addBadge(badgeId: string): boolean {
  const current = loadUserStats();
  if (!current.earnedBadges.includes(badgeId)) {
    const updated = {
      ...current,
      score: current.score + 100,
      earnedBadges: [...current.earnedBadges, badgeId]
    };
    saveUserStats(updated);
    return true; // newly unlocked
  }
  return false;
}

export interface LeaderboardEntry {
  student_name: string;
  score: number;
  time_seconds: number;
  stars_earned: number;
  played_at?: string;
}

const fallbackLeaderboard: LeaderboardEntry[] = [
  { student_name: 'Zeynep (6-B)', score: 1450, time_seconds: 28, stars_earned: 3 },
  { student_name: 'Kerem (5-A)', score: 1320, time_seconds: 35, stars_earned: 3 },
  { student_name: 'Elif (7-C)', score: 1180, time_seconds: 40, stars_earned: 3 },
  { student_name: 'Ahmet (6-A)', score: 990, time_seconds: 52, stars_earned: 2 },
  { student_name: 'Deniz (8-B)', score: 860, time_seconds: 58, stars_earned: 2 }
];

export async function fetchLeaderboard(gameType: string): Promise<LeaderboardEntry[]> {
  try {
    // Check if hosted with Hostinger PHP API
    const response = await fetch(`/api.php?action=leaderboard&game_type=${encodeURIComponent(gameType)}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      const json = await response.json();
      if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Offline or static preview fallback
  }

  // Local storage cache or fallback
  const localKey = `gok_atlasi_lb_${gameType}`;
  try {
    const cached = localStorage.getItem(localKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // continue
  }
  return fallbackLeaderboard;
}

export async function submitScore(entry: LeaderboardEntry, gameType: string): Promise<void> {
  // Update local stats
  const stats = loadUserStats();
  const updatedStats = {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    score: stats.score + entry.score,
    highestGameScore: Math.max(stats.highestGameScore, entry.score)
  };
  saveUserStats(updatedStats);

  // Save to local leaderboard
  const localKey = `gok_atlasi_lb_${gameType}`;
  try {
    const existing = await fetchLeaderboard(gameType);
    const updated = [...existing, entry]
      .sort((a, b) => b.score - a.score || a.time_seconds - b.time_seconds)
      .slice(0, 10);
    localStorage.setItem(localKey, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // Try sync to Hostinger API
  try {
    await fetch('/api.php?action=save_score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name: entry.student_name,
        game_type: gameType,
        score: entry.score,
        time_seconds: entry.time_seconds,
        stars_earned: entry.stars_earned
      })
    });
  } catch {
    // API not reachable in dev / static mode
  }
}
