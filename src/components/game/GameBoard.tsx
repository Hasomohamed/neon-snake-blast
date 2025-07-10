import React, { useEffect, useRef } from 'react';
import { GameState, Position } from './GameLogic';

interface GameBoardProps {
  gameState: GameState;
  gridSize: number;
  onTouch?: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, gridSize, onTouch }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'hsl(240, 10%, 4%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / gridSize;

    // Draw grid
    ctx.strokeStyle = 'hsl(240, 20%, 15%)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (index === 0) {
        // Snake head - brighter with glow effect
        ctx.fillStyle = 'hsl(120, 100%, 70%)';
        ctx.shadowColor = 'hsl(120, 100%, 50%)';
        ctx.shadowBlur = 10;
        ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
        
        // Add eyes
        ctx.fillStyle = 'hsl(240, 10%, 4%)';
        ctx.shadowBlur = 0;
        const eyeSize = cellSize * 0.15;
        const eyeOffset = cellSize * 0.25;
        ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
        ctx.fillRect(x + cellSize - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
      } else {
        // Snake body
        ctx.fillStyle = 'hsl(120, 100%, 50%)';
        ctx.shadowColor = 'hsl(120, 100%, 50%)';
        ctx.shadowBlur = 5;
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
      }
    });

    // Draw food with pulsing effect
    const food = gameState.food;
    const foodX = food.x * cellSize;
    const foodY = food.y * cellSize;
    
    ctx.fillStyle = 'hsl(0, 100%, 60%)';
    ctx.shadowColor = 'hsl(0, 100%, 60%)';
    ctx.shadowBlur = 15;
    
    const pulse = Math.sin(Date.now() * 0.01) * 0.1 + 0.9;
    const foodSize = cellSize * 0.8 * pulse;
    const foodOffset = (cellSize - foodSize) / 2;
    
    ctx.beginPath();
    ctx.arc(
      foodX + cellSize / 2,
      foodY + cellSize / 2,
      foodSize / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [gameState, gridSize]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStartRef.current || !onTouch) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return; // Not a swipe
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        onTouch('RIGHT');
      } else {
        onTouch('LEFT');
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        onTouch('DOWN');
      } else {
        onTouch('UP');
      }
    }

    touchStartRef.current = null;
  };

  return (
    <div className="game-board rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};