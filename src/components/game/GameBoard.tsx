import React, { useEffect, useRef, useCallback } from 'react';
import { GameState, Position, Direction } from './GameLogic';

interface GameBoardProps {
  gameState: GameState;
  gridSize: number;
  onTouch?: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, gridSize, onTouch }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Helper function to get interpolated position
  const getInterpolatedPosition = useCallback((segment: Position, index: number): Position => {
    if (index !== 0 || !gameState.moveProgress) return segment;

    // Calculate movement offset based on direction and progress
    const progress = gameState.moveProgress;
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic for smooth deceleration
    
    let offsetX = 0;
    let offsetY = 0;

    switch (gameState.direction) {
      case 'UP':
        offsetY = -easeProgress;
        break;
      case 'DOWN':
        offsetY = easeProgress;
        break;
      case 'LEFT':
        offsetX = -easeProgress;
        break;
      case 'RIGHT':
        offsetX = easeProgress;
        break;
    }

    return {
      x: segment.x + offsetX,
      y: segment.y + offsetY
    };
  }, [gameState.direction, gameState.moveProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'hsl(240, 15%, 3%)');
    gradient.addColorStop(1, 'hsl(240, 12%, 5%)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / gridSize;

    // Draw enhanced grid with subtle glow
    ctx.strokeStyle = 'hsl(240, 25%, 12%)';
    ctx.lineWidth = 0.5;
    ctx.shadowColor = 'hsl(240, 50%, 20%)';
    ctx.shadowBlur = 1;
    
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
    ctx.shadowBlur = 0;

    // Draw snake with smooth movement and enhanced visuals
    gameState.snake.forEach((segment, index) => {
      const interpolatedPos = getInterpolatedPosition(segment, index);
      const x = interpolatedPos.x * cellSize;
      const y = interpolatedPos.y * cellSize;
      
      if (index === 0) {
        // Snake head with dynamic glow and direction-based shape
        const headGlow = 12 + Math.sin(Date.now() * 0.005) * 3;
        ctx.fillStyle = 'hsl(120, 100%, 75%)';
        ctx.shadowColor = 'hsl(120, 100%, 60%)';
        ctx.shadowBlur = headGlow;
        
        // Rounded rectangle for head
        const headSize = cellSize - 3;
        const headRadius = headSize * 0.3;
        const headX = x + 1.5;
        const headY = y + 1.5;
        
        ctx.beginPath();
        ctx.roundRect(headX, headY, headSize, headSize, headRadius);
        ctx.fill();
        
        // Direction-based eyes
        ctx.fillStyle = 'hsl(240, 10%, 2%)';
        ctx.shadowBlur = 0;
        const eyeSize = cellSize * 0.12;
        let eye1X = headX + cellSize * 0.2;
        let eye1Y = headY + cellSize * 0.2;
        let eye2X = headX + cellSize * 0.6;
        let eye2Y = headY + cellSize * 0.2;

        // Adjust eye position based on direction
        switch (gameState.direction) {
          case 'DOWN':
            eye1Y = headY + cellSize * 0.6;
            eye2Y = headY + cellSize * 0.6;
            break;
          case 'LEFT':
            eye1X = headX + cellSize * 0.2;
            eye1Y = headY + cellSize * 0.2;
            eye2X = headX + cellSize * 0.2;
            eye2Y = headY + cellSize * 0.6;
            break;
          case 'RIGHT':
            eye1X = headX + cellSize * 0.6;
            eye1Y = headY + cellSize * 0.2;
            eye2X = headX + cellSize * 0.6;
            eye2Y = headY + cellSize * 0.6;
            break;
        }
        
        ctx.fillRect(eye1X, eye1Y, eyeSize, eyeSize);
        ctx.fillRect(eye2X, eye2Y, eyeSize, eyeSize);
      } else {
        // Snake body with gradient and connection smoothing
        const bodyIntensity = Math.max(30, 70 - index * 3);
        ctx.fillStyle = `hsl(120, 100%, ${bodyIntensity}%)`;
        ctx.shadowColor = `hsl(120, 100%, ${bodyIntensity - 10}%)`;
        ctx.shadowBlur = 4;
        
        const bodySize = cellSize - 2;
        const bodyRadius = bodySize * 0.2;
        
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, bodySize, bodySize, bodyRadius);
        ctx.fill();
      }
    });

    // Draw food with enhanced pulsing and rotation
    const food = gameState.food;
    const foodX = food.x * cellSize + cellSize / 2;
    const foodY = food.y * cellSize + cellSize / 2;
    
    const time = Date.now() * 0.003;
    const pulse = Math.sin(time * 2) * 0.15 + 0.85;
    const glow = Math.sin(time) * 5 + 15;
    
    ctx.fillStyle = 'hsl(0, 100%, 65%)';
    ctx.shadowColor = 'hsl(0, 100%, 50%)';
    ctx.shadowBlur = glow;
    
    const foodRadius = cellSize * 0.35 * pulse;
    
    // Draw rotating star shape for food
    ctx.save();
    ctx.translate(foodX, foodY);
    ctx.rotate(time);
    
    ctx.beginPath();
    const spikes = 6;
    const outerRadius = foodRadius;
    const innerRadius = foodRadius * 0.5;
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [gameState, gridSize, getInterpolatedPosition]);

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