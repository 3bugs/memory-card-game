"use client";

import { useState, useEffect } from "react";
import { Card as CardType, GameStats, Difficulty } from "@/types/game";
import { createGameCards, DIFFICULTY_CONFIG } from "@/utils/gameUtils";

export function useMemoryGame(difficulty: Difficulty) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    timeElapsed: 0,
    isGameComplete: false,
  });
  const [isGameStarted, setIsGameStarted] = useState(false);

  // ตั้งเวลาเกม
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted && !gameStats.isGameComplete) {
      interval = setInterval(() => {
        setGameStats((prev) => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isGameStarted, gameStats.isGameComplete]);

  // เริ่มเกมใหม่
  const startNewGame = () => {
    const config = DIFFICULTY_CONFIG[difficulty];
    const newCards = createGameCards(config.totalPairs);
    setCards(newCards);
    setFlippedCards([]);
    setGameStats({
      moves: 0,
      matches: 0,
      timeElapsed: 0,
      isGameComplete: false,
    });
    setIsGameStarted(true);
  };

  // จัดการการคลิกการ์ด
  const handleCardClick = (cardId: number) => {
    if (!isGameStarted) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // อัพเดทการ์ดให้แสดง
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    // ถ้าพลิกการ์ดครบ 2 ใบแล้ว
    if (newFlippedCards.length === 2) {
      setGameStats((prev) => ({ ...prev, moves: prev.moves + 1 }));

      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 1000);
    }
  };

  // ตรวจสอบการ์ดที่จับคู่ได้
  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);

    if (firstCard?.value === secondCard?.value) {
      // จับคู่ได้
      setCards((prev) =>
        prev.map((c) =>
          c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
        )
      );

      setGameStats((prev) => {
        const newMatches = prev.matches + 1;
        const totalPairs = DIFFICULTY_CONFIG[difficulty].totalPairs;

        return {
          ...prev,
          matches: newMatches,
          isGameComplete: newMatches === totalPairs,
        };
      });
    } else {
      // ไม่จับคู่ได้ - พลิกการ์ดกลับ
      setCards((prev) =>
        prev.map((c) =>
          c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
        )
      );
    }

    setFlippedCards([]);
  };

  // เปลี่ยนระดับความยากและเริ่มเกมใหม่
  const changeDifficulty = (newDifficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIG[newDifficulty];
    const newCards = createGameCards(config.totalPairs);
    setCards(newCards);
    setFlippedCards([]);
    setGameStats({
      moves: 0,
      matches: 0,
      timeElapsed: 0,
      isGameComplete: false,
    });
    setIsGameStarted(true);
  };

  return {
    cards,
    gameStats,
    isGameStarted,
    handleCardClick,
    startNewGame,
    changeDifficulty,
  };
}
