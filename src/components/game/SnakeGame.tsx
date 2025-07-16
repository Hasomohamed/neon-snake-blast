import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameLogic, GameState, Direction } from './GameLogic';
import { GameBoard } from './GameBoard';
import { GameUI } from './GameUI';
import { soundManager } from './SoundManager';

interface SnakeGameProps {
  mode?: 'classic' | 'modern';
  gridSize?: number;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ 
  mode = 'classic', 
  gridSize = 20 
}) => {
  const gameLogic = useRef(new GameLogic(gridSize));
  const [gameState, setGameState] = useState<GameState>(() => 
    gameLogic.current.createInitialGameState(mode)
  );
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isSoundEnabled());
  const [musicEnabled, setMusicEnabled] = useState(soundManager.isMusicEnabled());
  const [highScore, setHighScore] = useState(gameLogic.current.getHighScore());
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  // Game logic update (discrete movement)
  const gameLogicUpdate = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.paused) {
        return prevState;
      }

      const newState = gameLogic.current.moveSnake(prevState);
      
      // Check for food eaten
      if (newState.score > prevState.score) {
        soundManager.playFoodSound();
        
        // Check for level up
        if (newState.level > prevState.level) {
          soundManager.playLevelUpSound();
        }
      }
      
      // Check for game over
      if (newState.gameOver && !prevState.gameOver) {
        if (newState.wallCollision) {
          soundManager.playHassanSound();
        } else {
          soundManager.playGameOverSound();
        }
        gameLogic.current.saveGameStats(newState);
        setHighScore(gameLogic.current.getHighScore());
      }

      return newState;
    });
  }, []);

  // Animation loop for smooth rendering (runs at 60fps)
  const animationLoop = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.paused) {
        return prevState;
      }
      return gameLogic.current.updateMoveProgress(prevState);
    });

    animationRef.current = requestAnimationFrame(animationLoop);
  }, []);

  // Start game loops
  useEffect(() => {
    if (!gameState.gameOver && !gameState.paused) {
      // Discrete movement loop
      gameLoopRef.current = setInterval(gameLogicUpdate, gameState.speed);
      
      // Smooth animation loop
      animationRef.current = requestAnimationFrame(animationLoop);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLogicUpdate, animationLoop, gameState.speed, gameState.gameOver, gameState.paused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameOver) return;

      let direction: Direction | null = null;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'RIGHT';
          break;
        case ' ':
          e.preventDefault();
          handlePauseToggle();
          return;
      }

      if (direction) {
        e.preventDefault();
        soundManager.playMoveSound();
        setGameState(prevState => 
          gameLogic.current.queueDirection(prevState, direction!)
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver]);

  // Touch controls with improved responsiveness
  const handleTouch = useCallback((direction: Direction) => {
    if (gameState.gameOver) return;
    
    soundManager.playMoveSound();
    setGameState(prevState => 
      gameLogic.current.queueDirection(prevState, direction)
    );
  }, [gameState.gameOver]);

  const handlePlay = useCallback(() => {
    soundManager.playButtonSound();
    if (gameState.gameOver) {
      setGameState(gameLogic.current.createInitialGameState(mode));
    } else {
      setGameState(prevState => ({ ...prevState, paused: false }));
    }
    
    if (musicEnabled) {
      soundManager.startBackgroundMusic();
    }
  }, [gameState.gameOver, mode, musicEnabled]);

  const handlePauseToggle = useCallback(() => {
    soundManager.playButtonSound();
    setGameState(prevState => gameLogic.current.togglePause(prevState));
  }, []);

  const handleReset = useCallback(() => {
    soundManager.playButtonSound();
    setGameState(gameLogic.current.createInitialGameState(mode));
  }, [mode]);

  const handleToggleSound = useCallback(() => {
    const newSoundEnabled = soundManager.toggleSound();
    setSoundEnabled(newSoundEnabled);
    soundManager.playButtonSound();
  }, []);

  const handleToggleMusic = useCallback(() => {
    const newMusicEnabled = soundManager.toggleMusic();
    setMusicEnabled(newMusicEnabled);
    soundManager.playButtonSound();
  }, []);

  // Initialize background music
  useEffect(() => {
    if (musicEnabled && !gameState.gameOver && !gameState.paused) {
      soundManager.startBackgroundMusic();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Game Board */}
        <div className="flex justify-center">
          <div className="w-full max-w-[400px] aspect-square">
            <GameBoard
              gameState={gameState}
              gridSize={gridSize}
              onTouch={handleTouch}
            />
          </div>
        </div>

        {/* Game UI */}
        <div className="space-y-4">
          <GameUI
            gameState={gameState}
            onPlay={handlePlay}
            onPause={handlePauseToggle}
            onReset={handleReset}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            soundEnabled={soundEnabled}
            musicEnabled={musicEnabled}
            highScore={highScore}
          />
        </div>
      </div>
    </div>
  );
};