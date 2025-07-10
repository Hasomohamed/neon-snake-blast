export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  gameOver: boolean;
  paused: boolean;
  speed: number;
  level: number;
  mode: 'classic' | 'modern';
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class GameLogic {
  private gridSize: number;
  private canvasSize: number;

  constructor(gridSize: number = 20, canvasSize: number = 400) {
    this.gridSize = gridSize;
    this.canvasSize = canvasSize;
  }

  createInitialGameState(mode: 'classic' | 'modern' = 'classic'): GameState {
    const centerX = Math.floor(this.gridSize / 2);
    const centerY = Math.floor(this.gridSize / 2);
    
    return {
      snake: [
        { x: centerX, y: centerY },
        { x: centerX - 1, y: centerY },
        { x: centerX - 2, y: centerY }
      ],
      food: this.generateFood([{ x: centerX, y: centerY }]),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      score: 0,
      gameOver: false,
      paused: false,
      speed: mode === 'classic' ? 150 : 200,
      level: 1,
      mode
    };
  }

  private generateFood(snake: Position[]): Position {
    let food: Position;
    do {
      food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    
    return food;
  }

  moveSnake(gameState: GameState): GameState {
    if (gameState.gameOver || gameState.paused) return gameState;

    // Use next direction for better control responsiveness
    const direction = gameState.nextDirection;
    const head = { ...gameState.snake[0] };

    // Move head based on direction
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check wall collision
    if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
      return { ...gameState, gameOver: true };
    }

    // Check self collision
    if (gameState.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      return { ...gameState, gameOver: true };
    }

    const newSnake = [head, ...gameState.snake];
    let newFood = gameState.food;
    let newScore = gameState.score;
    let newLevel = gameState.level;
    let newSpeed = gameState.speed;

    // Check food collision
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      newFood = this.generateFood(newSnake);
      newScore += gameState.mode === 'classic' ? 10 : 15;
      
      // Level up every 5 food items in classic, 3 in modern
      const foodsPerLevel = gameState.mode === 'classic' ? 5 : 3;
      if (newScore % (foodsPerLevel * (gameState.mode === 'classic' ? 10 : 15)) === 0) {
        newLevel += 1;
        newSpeed = Math.max(50, newSpeed - 15); // Increase speed, minimum 50ms
      }
    } else {
      newSnake.pop(); // Remove tail if no food eaten
    }

    return {
      ...gameState,
      snake: newSnake,
      food: newFood,
      direction,
      score: newScore,
      level: newLevel,
      speed: newSpeed
    };
  }

  changeDirection(gameState: GameState, newDirection: Direction): GameState {
    // Prevent reverse direction
    const opposites: Record<Direction, Direction> = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };

    if (opposites[gameState.direction] === newDirection) {
      return gameState;
    }

    return {
      ...gameState,
      nextDirection: newDirection
    };
  }

  togglePause(gameState: GameState): GameState {
    return {
      ...gameState,
      paused: !gameState.paused
    };
  }

  resetGame(gameState: GameState): GameState {
    return this.createInitialGameState(gameState.mode);
  }

  getHighScore(): number {
    return parseInt(localStorage.getItem('snake-high-score') || '0');
  }

  saveHighScore(score: number): void {
    const currentHigh = this.getHighScore();
    if (score > currentHigh) {
      localStorage.setItem('snake-high-score', score.toString());
    }
  }

  getGameStats() {
    return {
      gamesPlayed: parseInt(localStorage.getItem('snake-games-played') || '0'),
      highScore: this.getHighScore(),
      totalScore: parseInt(localStorage.getItem('snake-total-score') || '0')
    };
  }

  saveGameStats(gameState: GameState) {
    const stats = this.getGameStats();
    localStorage.setItem('snake-games-played', (stats.gamesPlayed + 1).toString());
    localStorage.setItem('snake-total-score', (stats.totalScore + gameState.score).toString());
    this.saveHighScore(gameState.score);
  }
}