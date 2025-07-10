import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, Music, Gamepad2, Trophy, BarChart3 } from 'lucide-react';
import { GameLogic } from './GameLogic';

interface GameSettingsProps {
  onBack: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  onBack,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic
}) => {
  const gameLogic = new GameLogic();
  const stats = gameLogic.getGameStats();

  const clearStats = () => {
    localStorage.removeItem('snake-high-score');
    localStorage.removeItem('snake-games-played');
    localStorage.removeItem('snake-total-score');
    window.location.reload();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="neon-primary" 
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-neon-cyan animate-pulse-neon">
          Settings
        </h1>
      </div>

      {/* Audio Settings */}
      <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-neon-purple">
            <Volume2 className="w-5 h-5" />
            Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sound-toggle" className="text-base font-medium">
                Sound Effects
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable movement, pickup, and game event sounds
              </p>
            </div>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={onToggleSound}
              className="data-[state=checked]:bg-neon-green"
            />
          </div>
          
          <Separator className="bg-border/50" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="music-toggle" className="text-base font-medium">
                Background Music
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable ambient background tones
              </p>
            </div>
            <Switch
              id="music-toggle"
              checked={musicEnabled}
              onCheckedChange={onToggleMusic}
              className="data-[state=checked]:bg-neon-green"
            />
          </div>
        </CardContent>
      </Card>

      {/* Game Statistics */}
      <Card className="bg-card/50 backdrop-blur-sm border-neon-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-neon-orange">
            <BarChart3 className="w-5 h-5" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
              <div className="text-2xl font-bold text-neon-cyan score-display">
                {stats.highScore}
              </div>
              <div className="text-sm text-muted-foreground">High Score</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
              <div className="text-2xl font-bold text-neon-purple score-display">
                {stats.gamesPlayed}
              </div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
              <div className="text-2xl font-bold text-neon-green score-display">
                {stats.gamesPlayed > 0 ? Math.round(stats.totalScore / stats.gamesPlayed) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <Button 
              variant="neon-danger" 
              onClick={clearStats}
              className="w-full"
            >
              Reset All Statistics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Info */}
      <Card className="bg-card/50 backdrop-blur-sm border-neon-green/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-neon-pink">
            <Gamepad2 className="w-5 h-5" />
            Game Modes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-neon-cyan">Classic Mode</div>
                <div className="text-sm text-muted-foreground">
                  Traditional Snake gameplay - 10 points per food
                </div>
              </div>
              <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
                Default
              </Badge>
            </div>
            
            <Separator className="bg-border/50" />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-neon-purple">Modern Mode</div>
                <div className="text-sm text-muted-foreground">
                  Faster gameplay - 15 points per food, quicker level progression
                </div>
              </div>
              <Badge variant="outline" className="border-neon-purple text-neon-purple">
                Available
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls Info */}
      <Card className="bg-card/50 backdrop-blur-sm border-neon-orange/30">
        <CardHeader>
          <CardTitle className="text-neon-orange">Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Movement:</span>
              <span className="text-neon-cyan">Arrow Keys / WASD / Swipe</span>
            </div>
            <div className="flex justify-between">
              <span>Pause/Resume:</span>
              <span className="text-neon-cyan">Space Bar</span>
            </div>
            <div className="flex justify-between">
              <span>Touch Controls:</span>
              <span className="text-neon-cyan">Swipe on game board</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};