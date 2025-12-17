export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  emoji: string;
}

export interface GameStats {
  moves: number;
  matches: number;
  timeElapsed: number;
  isGameComplete: boolean;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface GameConfig {
  difficulty: Difficulty;
  gridSize: number;
  totalPairs: number;
}
