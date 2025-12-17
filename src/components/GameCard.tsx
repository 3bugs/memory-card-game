'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Card as CardType } from '@/types/game';

interface GameCardProps {
  card: CardType;
  onClick: (id: number) => void;
  isDisabled?: boolean;
}

export function GameCard({ card, onClick, isDisabled = false }: GameCardProps) {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(card.id);
    }
  };

  return (
    <Card
      className={cn(
        'game-card relative w-full aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105',
        'border-2 border-gray-300 shadow-lg',
        card.isMatched && 'matched border-green-400 bg-green-50',
        card.isFlipped && !card.isMatched && 'flipped border-blue-400',
        isDisabled && 'cursor-not-allowed opacity-75'
      )}
      onClick={handleClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* แสดงเอโมจิเมื่อการ์ดถูกพลิกหรือจับคู่แล้ว */}
        {(card.isFlipped || card.isMatched) ? (
          <div className="text-4xl md:text-5xl lg:text-6xl animate-pulse">
            {card.emoji}
          </div>
        ) : (
          /* หน้าหลังการ์ด */
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 rounded-lg text-white text-2xl font-bold">
            ?
          </div>
        )}
      </div>
    </Card>
  );
}
