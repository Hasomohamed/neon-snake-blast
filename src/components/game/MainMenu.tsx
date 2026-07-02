import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Settings, Trophy, Zap, Gamepad2 } from 'lucide-react';
import { GameLogic } from './GameLogic';

interface MainMenuProps {
  onStartGame: (mode: 'classic' | 'modern') => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onOpenSettings }) => {
  const gameLogic = new GameLogic();
  const highScore = gameLogic.getHighScore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-game-bg via-background to-game-bg p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Title */}
        <h1 className="text-center text-6xl font-bold text-transparent bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text animate-pulse-neon">
          Cobra Snake Game
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Classic gameplay with cobra style
        </p>

        {/* High Score Display */}
        {highScore > 0 && (
          <section>
            <h2 className="text-center text-2xl font-bold text-neon-purple mb-3">
              High Scores
            </h2>
            <Card className="bg-card/50 backdrop-blur-sm border-neon-purple/30">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-neon-purple">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold text-lg">Best Score: {highScore}</span>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Game Mode Selection */}
        <section>
          <h2 className="text-center text-2xl font-bold text-neon-cyan mb-3">
            Game Modes
          </h2>
          <div className="space-y-3">
            <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30 hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div 
                  className="flex items-center justify-between"
                  onClick={() => onStartGame('classic')}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-cyan/20 text-neon-cyan group-hover:bg-neon-cyan/30 transition-colors">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-neon-cyan">Classic Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Traditional Snake experience
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
                    Start
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-neon-purple/30 hover:border-neon-purple/50 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div 
                  className="flex items-center justify-between"
                  onClick={() => onStartGame('modern')}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-purple/20 text-neon-purple group-hover:bg-neon-purple/30 transition-colors">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-neon-purple">Modern Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Faster pace, higher scoring
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-neon-purple text-neon-purple">
                    Start
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Start Button */}
        <Button
          variant="game-primary"
          size="xl"
          onClick={() => onStartGame('classic')}
          className="w-full"
        >
          <Play className="w-6 h-6 mr-3" />
          Quick Start
        </Button>

        {/* Settings Button */}
        <Button
          variant="neon-secondary"
          size="lg"
          onClick={onOpenSettings}
          className="w-full"
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings & Stats
        </Button>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4 space-y-2">
          <div>Built for Android • Optimized for mobile</div>
          <div className="text-neon-cyan">Swipe to control • Tap to pause</div>
          <div className="pt-2">
            <a 
              href="/privacy" 
              className="text-neon-purple hover:text-neon-purple-bright transition-colors underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};