export type Rarity = "common" | "rare" | "epic" | "legendary";
export type CardCategory = "distance" | "habit" | "time" | "explorer" | "special";

export interface AchievementCard {
  id: string;
  number: number;
  name: string;
  description: string;
  flavourText: string;
  icon: string;
  rarity: Rarity;
  category: CardCategory;
  unlocked: boolean;
  unlockedDate?: string;
  unlockCondition: string;
  stat?: string;
  statLabel?: string;
  progress?: number; // 0-1 for locked cards
}

export interface RunnerIdentity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  rarity: Rarity;
  unlocked: boolean;
  unlockCondition: string;
  requiredCards?: string[];
  progressLabel?: string;
  progress?: number; // 0-1
  isMain?: boolean;
}

export interface RunRecord {
  date: string; // YYYY-MM-DD
  distance: number; // km
  duration: number; // seconds
  avgPace: number; // seconds per km
  title?: string;
}

// ─── Rarity visual config ────────────────────────────────────────────────────

export const rarityConfig: Record<Rarity, {
  label: string;
  gradient: string;
  border: string;
  glow: string;
  shimmer: string;
  badge: string;
  badgeFg: string;
  dot: string;
}> = {
  common: {
    label: "Common",
    gradient: "linear-gradient(145deg, #4A5068 0%, #7A8099 45%, #5A6078 100%)",
    border: "rgba(160,168,192,0.35)",
    glow: "rgba(120,128,160,0.25)",
    shimmer: "rgba(200,210,240,0.15)",
    badge: "#5A6380",
    badgeFg: "#C8D0E0",
    dot: "#9AA0B8",
  },
  rare: {
    label: "Rare",
    gradient: "linear-gradient(145deg, #0E2A5C 0%, #1A4FA0 45%, #0E3070 100%)",
    border: "rgba(60,120,255,0.4)",
    glow: "rgba(30,80,200,0.35)",
    shimmer: "rgba(100,160,255,0.2)",
    badge: "#1A4FA0",
    badgeFg: "#80BEFF",
    dot: "#5090E0",
  },
  epic: {
    label: "Epic",
    gradient: "linear-gradient(145deg, #2A0A5E 0%, #6B28B0 45%, #420A90 100%)",
    border: "rgba(140,60,255,0.45)",
    glow: "rgba(100,40,200,0.35)",
    shimmer: "rgba(180,100,255,0.2)",
    badge: "#6B28B0",
    badgeFg: "#C890FF",
    dot: "#A060E8",
  },
  legendary: {
    label: "Legendary",
    gradient: "linear-gradient(145deg, #5C3200 0%, #B87820 35%, #D4A63D 60%, #F0C850 80%, #D4A63D 100%)",
    border: "rgba(212,166,61,0.55)",
    glow: "rgba(212,166,61,0.4)",
    shimmer: "rgba(255,220,100,0.25)",
    badge: "#B87820",
    badgeFg: "#FFE090",
    dot: "#D4A63D",
  },
};

// ─── Achievement Cards ────────────────────────────────────────────────────────

export const CARDS: AchievementCard[] = [
  {
    id: "c01", number: 1,
    name: "Dawn Patrol",
    description: "You rose before the sun did.",
    flavourText: "The world is yours when it's still dark.",
    icon: "🌅", rarity: "common", category: "habit",
    unlocked: true, unlockedDate: "2026-03-15",
    unlockCondition: "Complete 10 runs before 6 AM",
    stat: "18", statLabel: "early runs",
  },
  {
    id: "c02", number: 2,
    name: "Iron Streak",
    description: "Seven days. No excuses.",
    flavourText: "Discipline is the bridge between goals and accomplishment.",
    icon: "🔗", rarity: "rare", category: "habit",
    unlocked: true, unlockedDate: "2026-04-02",
    unlockCondition: "Maintain a 7-day running streak",
    stat: "14", statLabel: "day streak",
  },
  {
    id: "c03", number: 3,
    name: "Night Owl",
    description: "You run when the city sleeps.",
    flavourText: "Streetlights as your stars, silence as your crowd.",
    icon: "🦉", rarity: "rare", category: "habit",
    unlocked: true, unlockedDate: "2026-04-18",
    unlockCondition: "Complete 20 runs after 9 PM",
    stat: "23", statLabel: "night runs",
  },
  {
    id: "c04", number: 4,
    name: "Century Club",
    description: "One hundred kilometers in a single month.",
    flavourText: "Not everyone makes it here. You did.",
    icon: "💯", rarity: "epic", category: "distance",
    unlocked: true, unlockedDate: "2026-04-30",
    unlockCondition: "Run 100 km in a single calendar month",
    stat: "100", statLabel: "km",
  },
  {
    id: "c05", number: 5,
    name: "Half-Blood",
    description: "You crossed the half-marathon line.",
    flavourText: "21.1 km is the distance between ordinary and something more.",
    icon: "🥈", rarity: "rare", category: "distance",
    unlocked: true, unlockedDate: "2026-05-10",
    unlockCondition: "Complete a 21.1 km run",
    stat: "21.1", statLabel: "km",
  },
  {
    id: "c06", number: 6,
    name: "Storm Runner",
    description: "Rain doesn't stop you. Nothing does.",
    flavourText: "The runners who go out in storms are the ones who finish first.",
    icon: "⛈️", rarity: "common", category: "habit",
    unlocked: true, unlockedDate: "2026-05-22",
    unlockCondition: "Complete 5 runs in rainy conditions",
    stat: "7", statLabel: "rain runs",
  },
  {
    id: "c07", number: 7,
    name: "The Grinder",
    description: "One thousand kilometers on your legs.",
    flavourText: "Every step was a choice. You made a thousand.",
    icon: "⚙️", rarity: "epic", category: "distance",
    unlocked: true, unlockedDate: "2026-06-01",
    unlockCondition: "Run 1,000 km lifetime total",
    stat: "1K", statLabel: "km",
  },
  {
    id: "c08", number: 8,
    name: "Comeback Kid",
    description: "You came back after the break.",
    flavourText: "Starting again is always harder than starting. You did it anyway.",
    icon: "🔄", rarity: "rare", category: "special",
    unlocked: true, unlockedDate: "2026-06-10",
    unlockCondition: "Return to running after 30+ days off",
    stat: "Day 1", statLabel: "again",
  },
  {
    id: "c09", number: 9,
    name: "Speed Demon",
    description: "Sub-4 minute pace. Breathtaking.",
    flavourText: "Most runners dream of this. You lived it.",
    icon: "⚡", rarity: "legendary", category: "time",
    unlocked: false,
    unlockCondition: "Achieve a sub-4:00 min/km pace on any run",
    progress: 0.70,
  },
  {
    id: "c10", number: 10,
    name: "Trail Wanderer",
    description: "Dirt paths. No rules. Pure running.",
    flavourText: "The trail doesn't care about your pace. Only your soul.",
    icon: "🗻", rarity: "epic", category: "explorer",
    unlocked: false,
    unlockCondition: "Complete 5 trail runs of 8 km or more",
    progress: 0.20,
  },
  {
    id: "c11", number: 11,
    name: "Nomad",
    description: "You run wherever life takes you.",
    flavourText: "Your passport: laced sneakers and an open road.",
    icon: "🌍", rarity: "legendary", category: "explorer",
    unlocked: false,
    unlockCondition: "Log runs in 5 different cities",
    progress: 0.60,
  },
  {
    id: "c12", number: 12,
    name: "Ultramarathoner",
    description: "Beyond the marathon. Beyond most people's imagination.",
    flavourText: "There's a version of you that runs forever. You're finding it.",
    icon: "🏔️", rarity: "legendary", category: "distance",
    unlocked: false,
    unlockCondition: "Complete a 50 km run",
    progress: 0.18,
  },
];

// ─── Runner Identities ────────────────────────────────────────────────────────

export const IDENTITIES: RunnerIdentity[] = [
  {
    id: "i1",
    name: "The Morning Warrior",
    tagline: "You belong to the quiet hours",
    description:
      "Before the city wakes, you've already earned your day. The Morning Warrior doesn't wait for motivation — you build it, one predawn mile at a time. The world admires sunrise photos. You've seen them for real, breath steaming in the cold air, legs warm with purpose.",
    icon: "🌄",
    rarity: "rare",
    unlocked: true,
    isMain: true,
    unlockCondition: "Complete 18 runs before 6 AM",
    progressLabel: "18 / 18 dawn runs",
    progress: 1.0,
  },
  {
    id: "i2",
    name: "The Night Runner",
    tagline: "Darkness is your training ground",
    description:
      "While others sleep, you find your rhythm. The city transforms at night — fewer eyes, quieter streets, and a version of yourself that only emerges in the dark. The Night Runner carries a quiet confidence that only comes from doing the work when no one is watching.",
    icon: "🌑",
    rarity: "rare",
    unlocked: true,
    unlockCondition: "Complete 20 runs after 9 PM",
    progressLabel: "23 / 20 night runs",
    progress: 1.0,
  },
  {
    id: "i3",
    name: "The Endurance Beast",
    tagline: "Distance is your native language",
    description:
      "You were built for the long game. When others fade, you find another gear. When the miles pile up, you feel more like yourself, not less. The Endurance Beast knows that fatigue is just the beginning of the real run — the part where character shows itself.",
    icon: "🦬",
    rarity: "epic",
    unlocked: false,
    unlockCondition: "Run 2,000 km lifetime total",
    requiredCards: ["c07", "c04"],
    progressLabel: "1,284 / 2,000 km",
    progress: 0.642,
  },
  {
    id: "i4",
    name: "The Explorer",
    tagline: "Every city is a new route",
    description:
      "Your legs have crossed borders your passport barely registered. The Explorer runs not to escape, but to discover — new streets, new coastlines, new versions of the same city at dawn. Every trip begins with finding the nearest 5 km loop.",
    icon: "🧭",
    rarity: "epic",
    unlocked: false,
    unlockCondition: "Run in 5 different cities",
    requiredCards: ["c11"],
    progressLabel: "3 / 5 cities",
    progress: 0.60,
  },
  {
    id: "i5",
    name: "The Speedster",
    tagline: "Built for velocity",
    description:
      "Not everyone chases the clock. You do. The Speedster has rewritten their own limits so many times that 'personal best' feels like a weekly ritual. You know the exact second your legs turned to fire — and you kept going anyway.",
    icon: "⚡",
    rarity: "legendary",
    unlocked: false,
    unlockCondition: "Achieve sub-4:00/km on 3 separate runs",
    requiredCards: ["c09"],
    progressLabel: "0 / 3 sub-4:00 runs",
    progress: 0.0,
  },
];

// ─── Run History (June 2026) ──────────────────────────────────────────────────

export const RUN_HISTORY: RunRecord[] = [
  { date: "2026-06-02", distance: 5.2,  duration: 1620,  avgPace: 311, title: "Easy Tuesday" },
  { date: "2026-06-04", distance: 8.1,  duration: 2592,  avgPace: 320, title: "Tempo Workout" },
  { date: "2026-06-05", distance: 3.4,  duration: 1020,  avgPace: 300, title: "Recovery Jog" },
  { date: "2026-06-07", distance: 10.5, duration: 3360,  avgPace: 320, title: "Long Sunday" },
  { date: "2026-06-09", distance: 6.8,  duration: 2108,  avgPace: 310, title: "Riverside Loop" },
  { date: "2026-06-11", distance: 5.0,  duration: 1560,  avgPace: 312, title: "Morning Miles" },
  { date: "2026-06-12", distance: 7.3,  duration: 2336,  avgPace: 320, title: "Park Route" },
  { date: "2026-06-14", distance: 12.1, duration: 4235,  avgPace: 350, title: "Trail Adventure" },
  { date: "2026-06-16", distance: 4.5,  duration: 1395,  avgPace: 310, title: "Short and Sharp" },
  { date: "2026-06-17", distance: 8.9,  duration: 2847,  avgPace: 320, title: "Evening Flow" },
  { date: "2026-06-19", distance: 6.2,  duration: 1922,  avgPace: 310, title: "Today's Run" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPace(secondsPerKm: number): string {
  const mins = Math.floor(secondsPerKm / 60);
  const secs = secondsPerKm % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
