export type CelestialCategory = 'star' | 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf';

export interface Moon {
  id: string;
  name: string;
  turkishName: string;
  diameterKm: number;
  orbitalPeriodDays: number;
  discoveryYear: number | string;
  features: string[];
  funFact: string;
  color: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  turkishName: string;
  category: CelestialCategory;
  categoryLabel: string;
  orderFromSun: number; // 0 for Sun
  diameterKm: number;
  massKg: string;
  gravityMps2: number; // m/s^2, Earth is 9.8
  distanceFromSunMillionKm: number; // AU or million km
  orbitalPeriodEarthDays: number;
  rotationPeriodHours: number;
  surfaceTempC: {
    min: number;
    max: number;
    average: number;
  };
  moonsCount: number;
  moons: Moon[];
  rings: boolean;
  atmosphere: string[];
  summary: string;
  middleSchoolFacts: string[];
  colorHex: string;
  accentColorHex: string;
  gradient: string;
  orbitRadiusRatio: number; // Relative radius for orbit canvas visualization
  orbitSpeedFactor: number;
}

export interface SunLayer {
  id: string;
  name: string;
  turkishName: string;
  zoneType: 'internal' | 'atmospheric';
  depthRange: string;
  thicknessKm: number;
  temperatureC: string;
  description: string;
  keyPhenomena: string[];
  mebExamTip: string;
  color: string;
  radiusPercent: number; // for concentric diagram
}

export interface EarthLayer {
  id: string;
  name: string;
  turkishName: string;
  category: 'geosphere' | 'atmosphere';
  depthRange: string;
  temperatureC: string;
  stateOfMatter: string; // Katı, Sıvı, Gaz, Akışkan
  composition: string;
  description: string;
  mebExamTip: string;
  iconName: string;
  color: string;
}

export interface MoonPhase {
  id: string;
  name: string;
  turkishName: string;
  isMainPhase: boolean; // 4 Ana Evre vs 4 Ara Evre
  orderIndex: number; // 0 to 7
  angleDegrees: number; // 0 to 360 relative to Sun-Earth line
  illuminationPercent: number;
  shapeDescription: string;
  daysAfterNewMoon: number;
  significance: string;
  mebExamTip: string;
  visualPath: string; // for custom SVG render
}

export interface EclipseInfo {
  id: 'solar' | 'lunar';
  name: string;
  orderAlignment: string; // örn: GÜNEŞ - AY - DÜNYA
  moonPhaseRequired: string;
  durationMinutes: string;
  visibilityArea: string;
  eyeSafetyWarning: string;
  mebExamTip: string;
  frequency: string;
}

export interface QuizQuestion {
  id: string;
  gradeLevel: '5. Sınıf' | '6. Sınıf' | '7-8. Sınıf' | 'Genel Uzay';
  topic: 'Güneş ve Katmanları' | 'Gezegenler ve Uydular' | 'Dünya Katmanları' | 'Ay ve Evreleri' | 'Tutulmalar';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  mebTip: string;
}

export interface UserStats {
  score: number;
  quizzesCompleted: number;
  correctAnswers: number;
  totalAnswered: number;
  gamesPlayed: number;
  highestGameScore: number;
  studentName: string;
  earnedBadges: string[];
  unlockedCertificates: number;
}
