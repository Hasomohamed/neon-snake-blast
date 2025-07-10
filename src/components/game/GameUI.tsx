import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GameState } from './GameLogic';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Music, MicOff, Trophy, Star } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
  highScore: number;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onPlay,
  onPause,
  onReset,
  onToggleSound,
  onToggleMusic,
  soundEnabled,
  musicEnabled,
  highScore
}) => {
  return (
    <div className="space-y-4">
      {/* Score Display */}
      <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="score-display text-2xl font-bold">
                {gameState.score}
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div>
              <div className="score-display text-2xl font-bold">
                {gameState.level}
              </div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
          </div>
          {highScore > 0 && (
            <div className="mt-3 pt-3 border-t border-neon-cyan/20 text-center">
              <div className="flex items-center justify-center gap-2 text-neon-purple">
                <Trophy className="w-4 h-4" />
                <span className="font-bold">Best: {highScore}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="grid grid-cols-2 gap-3">
        {!gameState.gameOver && !gameState.paused ? (
          <Button
            variant="game-pause"
            size="lg"
            onClick={onPause}
            className="w-full"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        ) : (
          <Button
            variant="game-primary"
            size="lg"
            onClick={onPlay}
            className="w-full"
          >
            <Play className="w-5 h-5 mr-2" />
            {gameState.gameOver ? 'New Game' : 'Resume'}
          </Button>
        )}
        
        <Button
          variant="neon-secondary"
          size="lg"
          onClick={onReset}
          className="w-full"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>

      {/* Audio Controls */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={soundEnabled ? "neon-success" : "neon-danger"}
          size="default"
          onClick={onToggleSound}
          className="w-full"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
          {soundEnabled ? 'SFX On' : 'SFX Off'}
        </Button>
        
        <Button
          variant={musicEnabled ? "neon-success" : "neon-danger"}
          size="default"
          onClick={onToggleMusic}
          className="w-full"
        >
          {musicEnabled ? <Music className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
          {musicEnabled ? 'Music On' : 'Music Off'}
        </Button>
      </div>

      {/* Game Status */}
      {gameState.gameOver && (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-red-400 mb-2">Game Over!</div>
            <div className="text-muted-foreground">
              Final Score: <span className="text-neon-cyan font-bold">{gameState.score}</span>
            </div>
            {gameState.score === highScore && highScore > 0 && (
              <div className="mt-2 flex items-center justify-center gap-2 text-neon-orange">
                <Star className="w-4 h-4" />
                <span className="font-bold">New High Score!</span>
                <Star className="w-4 h-4" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {gameState.paused && !gameState.gameOver && (
        <Card className="bg-neon-orange/10 border-neon-orange/30">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-neon-orange">Paused</div>
            <div className="text-sm text-muted-foreground mt-1">
              Tap Resume to continue
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-card/30 backdrop-blur-sm border-neon-purple/20">
        <CardContent className="p-3">
          <div className="text-center text-sm text-muted-foreground">
            <div className="font-medium text-neon-purple mb-2">Controls</div>
            <div>Swipe or use arrow keys to move</div>
            <div>Collect red food to grow and score</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};