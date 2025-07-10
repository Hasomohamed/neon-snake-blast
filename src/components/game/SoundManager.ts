export class SoundManager {
  private audioContext: AudioContext | null = null;
  private backgroundMusic: HTMLAudioElement | null = null;
  private soundEnabled = true;
  private musicEnabled = true;

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Generate sound effects using Web Audio API
  private createBeep(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.audioContext || !this.soundEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Sound effects
  playMoveSound() {
    this.createBeep(200, 0.1, 0.05);
  }

  playFoodSound() {
    // Positive pickup sound
    this.createBeep(800, 0.15, 0.15);
    setTimeout(() => this.createBeep(1000, 0.1, 0.1), 50);
  }

  playGameOverSound() {
    // Descending game over sound
    this.createBeep(400, 0.3, 0.2);
    setTimeout(() => this.createBeep(300, 0.3, 0.2), 100);
    setTimeout(() => this.createBeep(200, 0.5, 0.2), 200);
  }

  playLevelUpSound() {
    // Ascending success sound
    this.createBeep(600, 0.2, 0.15);
    setTimeout(() => this.createBeep(800, 0.2, 0.15), 100);
    setTimeout(() => this.createBeep(1000, 0.3, 0.15), 200);
  }

  playButtonSound() {
    this.createBeep(600, 0.1, 0.08);
  }

  // Background music using simple tones
  startBackgroundMusic() {
    if (!this.musicEnabled || !this.audioContext) return;
    
    // Simple ambient background loop
    const playAmbientTone = () => {
      if (this.musicEnabled && this.audioContext) {
        this.createBeep(100, 2, 0.02);
        setTimeout(() => this.createBeep(150, 1.5, 0.015), 2000);
        setTimeout(() => this.createBeep(120, 1.8, 0.02), 4000);
        setTimeout(playAmbientTone, 6000);
      }
    };
    
    playAmbientTone();
  }

  stopBackgroundMusic() {
    this.musicEnabled = false;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startBackgroundMusic();
    }
    return this.musicEnabled;
  }

  isSoundEnabled() {
    return this.soundEnabled;
  }

  isMusicEnabled() {
    return this.musicEnabled;
  }
}

export const soundManager = new SoundManager();