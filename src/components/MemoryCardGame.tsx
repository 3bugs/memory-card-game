'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GameCard } from '@/components/GameCard';
import { GameStatsDisplay } from '@/components/GameStatsDisplay';
import { useMemoryGame } from '@/hooks/useMemoryGame';
import { Difficulty } from '@/types/game';
import { DIFFICULTY_CONFIG, DIFFICULTY_LABELS } from '@/utils/gameUtils';

export default function MemoryCardGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [showWinDialog, setShowWinDialog] = useState(false);

  const {
    cards,
    gameStats,
    isGameStarted,
    handleCardClick,
    startNewGame,
    changeDifficulty
  } = useMemoryGame(difficulty);

  const config = DIFFICULTY_CONFIG[difficulty];

  // แสดง dialog เมื่อเกมจบ
  if (gameStats.isGameComplete && !showWinDialog) {
    setShowWinDialog(true);
  }

  const handleNewGame = (newDifficulty?: Difficulty) => {
    setShowWinDialog(false);
    if (newDifficulty && newDifficulty !== difficulty) {
      setDifficulty(newDifficulty);
      // ใช้ setTimeout เพื่อให้ state อัปเดตก่อนแล้วค่อยเริ่มเกมใหม่
      setTimeout(() => startNewGame(), 100);
    } else {
      startNewGame();
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    // ใช้ changeDifficulty เพื่อสร้างการ์ดใหม่ทันที
    changeDifficulty(newDifficulty);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            🧠 เกมจับคู่การ์ด
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            ฝึกสมอง เสริมความจำ สำหรับท่านที่อายุ 50+
          </p>

          {/* Difficulty Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
              <Button
                key={key}
                variant={difficulty === key ? "default" : "outline"}
                size="lg"
                onClick={() => {
                  if (isGameStarted) {
                    handleDifficultyChange(key as Difficulty);
                  } else {
                    setDifficulty(key as Difficulty);
                  }
                }}
                className="text-lg px-6 py-3"
              >
                {label}
              </Button>
            ))}
          </div>

          {!isGameStarted && (
            <Button
              size="lg"
              onClick={() => startNewGame()}
              className="text-xl px-8 py-4 bg-green-600 hover:bg-green-700"
            >
              🎮 เริ่มเล่น
            </Button>
          )}
        </div>

        {/* Game Stats */}
        {isGameStarted && (
          <GameStatsDisplay
            gameStats={gameStats}
            totalPairs={config.totalPairs}
          />
        )}

        {/* Game Board */}
        {isGameStarted && (
          <div className="flex justify-center mb-8">
            <div
              className="grid gap-2 md:gap-4"
              style={{
                gridTemplateColumns: `repeat(${difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8}, minmax(0, 1fr))`,
                maxWidth: difficulty === 'easy' ? '400px' : difficulty === 'medium' ? '600px' : '800px'
              }}
            >
              {cards.map((card) => (
                <GameCard
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  isDisabled={gameStats.isGameComplete}
                />
              ))}
            </div>
          </div>
        )}

        {/* New Game Button */}
        {isGameStarted && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNewGame()}
              className="text-lg px-6 py-3"
            >
              🔄 เล่นใหม่
            </Button>
          </div>
        )}

        {/* Win Dialog */}
        <Dialog open={showWinDialog} onOpenChange={setShowWinDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                🎉 ยินดีด้วย!
              </DialogTitle>
            </DialogHeader>
            <div className="text-center text-lg pt-4 space-y-2">
              <div>คุณผ่านระดับ <strong>{DIFFICULTY_LABELS[difficulty]}</strong> แล้ว!</div>
              <div>ใช้เวลา: <strong>{gameStats.timeElapsed}</strong> วินาที</div>
              <div>จำนวนครั้งที่เล่น: <strong>{gameStats.moves}</strong> ครั้ง</div>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => handleNewGame()}
                className="w-full"
              >
                🔄 เล่นระดับเดิมอีกครั้ง
              </Button>

              {difficulty !== 'hard' && (
                <Button
                  variant="outline"
                  onClick={() => handleNewGame(
                    difficulty === 'easy' ? 'medium' : 'hard'
                  )}
                  className="w-full"
                >
                  ⬆️ ลองระดับที่ยากขึ้น
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
