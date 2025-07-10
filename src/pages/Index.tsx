import React, { useState } from 'react';
import { MainMenu } from '@/components/game/MainMenu';
import { SnakeGame } from '@/components/game/SnakeGame';
import { GameSettings } from '@/components/game/GameSettings';
import { soundManager } from '@/components/game/SoundManager';

type AppState = 'menu' | 'playing' | 'settings';
type GameMode = 'classic' | 'modern';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isSoundEnabled());
  const [musicEnabled, setMusicEnabled] = useState(soundManager.isMusicEnabled());

  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
    setAppState('playing');
    soundManager.playButtonSound();
  };

  const handleBackToMenu = () => {
    setAppState('menu');
    soundManager.playButtonSound();
  };

  const handleOpenSettings = () => {
    setAppState('settings');
    soundManager.playButtonSound();
  };

  const handleToggleSound = () => {
    const newSoundEnabled = soundManager.toggleSound();
    setSoundEnabled(newSoundEnabled);
  };

  const handleToggleMusic = () => {
    const newMusicEnabled = soundManager.toggleMusic();
    setMusicEnabled(newMusicEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg via-background to-game-bg">
      {appState === 'menu' && (
        <MainMenu 
          onStartGame={handleStartGame}
          onOpenSettings={handleOpenSettings}
        />
      )}
      
      {appState === 'playing' && (
        <div className="min-h-screen flex flex-col">
          {/* Header with back button */}
          <div className="p-4 border-b border-neon-cyan/20">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button
                onClick={handleBackToMenu}
                className="text-neon-cyan hover:text-neon-cyan-bright transition-colors"
              >
                ← Back to Menu
              </button>
              <div className="text-neon-purple font-bold uppercase tracking-wider">
                {gameMode} Mode
              </div>
            </div>
          </div>
          
          {/* Game */}
          <div className="flex-1 flex items-center justify-center p-4">
            <SnakeGame mode={gameMode} gridSize={20} />
          </div>
        </div>
      )}
      
      {appState === 'settings' && (
        <div className="min-h-screen flex items-center justify-center">
          <GameSettings
            onBack={handleBackToMenu}
            soundEnabled={soundEnabled}
            musicEnabled={musicEnabled}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
