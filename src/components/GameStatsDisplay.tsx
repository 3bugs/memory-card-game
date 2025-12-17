'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { GameStats } from '@/types/game';
import { formatTime } from '@/utils/gameUtils';

interface GameStatsDisplayProps {
  gameStats: GameStats;
  totalPairs: number;
}

export function GameStatsDisplay({ gameStats, totalPairs }: GameStatsDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 text-center">
        <div className="text-lg font-semibold text-gray-600">เวลา</div>
        <div className="text-2xl font-bold text-blue-600">
          {formatTime(gameStats.timeElapsed)}
        </div>
      </Card>

      <Card className="p-4 text-center">
        <div className="text-lg font-semibold text-gray-600">ครั้งที่เล่น</div>
        <div className="text-2xl font-bold text-purple-600">
          {gameStats.moves}
        </div>
      </Card>

      <Card className="p-4 text-center">
        <div className="text-lg font-semibold text-gray-600">คู่ที่จับได้</div>
        <div className="text-2xl font-bold text-green-600">
          {gameStats.matches}/{totalPairs}
        </div>
      </Card>

      <Card className="p-4 text-center flex items-center justify-center">
        {gameStats.isGameComplete ? (
          <Badge variant="default" className="text-lg px-4 py-2 bg-green-500">
            🎉 เยี่ยม!
          </Badge>
        ) : (
          <Badge variant="outline" className="text-lg px-4 py-2">
            กำลังเล่น...
          </Badge>
        )}
      </Card>
    </div>
  );
}
