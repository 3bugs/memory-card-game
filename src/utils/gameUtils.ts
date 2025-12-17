import { Card, GameConfig, Difficulty } from "@/types/game";

// เอโมจิสำหรับเกม เลือกเอโมจิที่เข้าใจง่ายสำหรับผู้เข้าร่วมงาน 50+
export const CARD_EMOJIS = [
  "❤️",
  "🎄",
  "✨",
  "✅",
  "🎅",
  "⭐",
  "🎁",
  "❄️",
  "🌸",
  "🌟",
  "🎭",
  "🏆",
  "💎",
  "🎪",
  "🌺",
  "🦋",
  "🌈",
  "🎯",
  "🎳",
  "🎺",
  "🎸",
  "🌻",
  "🌷",
  "🌹",
  "🏅",
  "🎖️",
  "🎗️",
  "🌊",
  "☀️",
  "🔥",
  "💫",
  "🎉",
  // เพิ่มอีก 30 emoji
  "🎂",
  "🍀",
  "🌙",
  "🐱",
  "🐶",
  "🐻",
  "🦁",
  "🐼",
  "🐸",
  "🦉",
  "🎨",
  "📚",
  "⚽",
  "🏀",
  "🎾",
  "🏐",
  "🎵",
  "🎶",
  "🌍",
  "🌎",
  "🌏",
  "🍎",
  "🍊",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🥝",
  "🍑",
  "🥭",
  "🍍",
  "🥥",
];

export const DIFFICULTY_CONFIG: Record<Difficulty, GameConfig> = {
  easy: { difficulty: "easy", gridSize: 4, totalPairs: 8 },
  medium: { difficulty: "medium", gridSize: 6, totalPairs: 18 },
  hard: { difficulty: "hard", gridSize: 8, totalPairs: 32 },
};

export const DIFFICULTY_LABELS = {
  easy: "ง่าย",
  medium: "ปานกลาง",
  hard: "ยาก",
};

export function createGameCards(totalPairs: number): Card[] {
  // Shuffle CARD_EMOJIS ก่อนเลือกใช้เพื่อให้ได้ emoji ที่หลากหลายในแต่ละเกม
  const shuffledEmojis = shuffleArray([...CARD_EMOJIS]);
  const selectedEmojis = shuffledEmojis.slice(0, totalPairs);
  const cards: Card[] = [];

  selectedEmojis.forEach((emoji, index) => {
    // สร้างคู่การ์ด
    cards.push({
      id: index * 2,
      value: emoji,
      emoji,
      isFlipped: false,
      isMatched: false,
    });

    cards.push({
      id: index * 2 + 1,
      value: emoji,
      emoji,
      isFlipped: false,
      isMatched: false,
    });
  });

  // สุ่มตำแหน่งการ์ด
  return shuffleArray(cards);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
