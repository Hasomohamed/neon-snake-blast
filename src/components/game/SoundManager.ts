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

  // Background music inspired by Somali traditional music
  startBackgroundMusic() {
    if (!this.musicEnabled || !this.audioContext) return;
    
    // Somali-inspired pentatonic scale frequencies (C pentatonic)
    const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C, D, E, G, A, C
    let currentNoteIndex = 0;
    let rhythmPattern = 0;
    
    const playSomaliInspiredMelody = () => {
      if (!this.musicEnabled || !this.audioContext) return;
      
      // Traditional Somali music patterns - alternating rhythms
      const rhythmPatterns = [
        [0, 2, 4, 2, 1, 3], // Ascending pattern
        [4, 2, 0, 1, 3, 5], // Mixed pattern
        [5, 3, 1, 4, 2, 0], // Descending pattern
      ];
      
      const currentPattern = rhythmPatterns[rhythmPattern % rhythmPatterns.length];
      const noteIndex = currentPattern[currentNoteIndex % currentPattern.length];
      const frequency = pentatonicScale[noteIndex];
      
      // Play main melody note
      this.createBeep(frequency, 0.8, 0.03);
      
      // Add harmonic drone (typical in Somali music)
      setTimeout(() => {
        this.createBeep(frequency * 0.5, 1.2, 0.015);
      }, 200);
      
      // Add rhythmic accent every 4th beat
      if (currentNoteIndex % 4 === 0) {
        setTimeout(() => {
          this.createBeep(frequency * 1.5, 0.3, 0.02);
        }, 400);
      }
      
      currentNoteIndex++;
      
      // Change rhythm pattern every 12 beats
      if (currentNoteIndex % 12 === 0) {
        rhythmPattern++;
      }
      
      // Continue the loop
      setTimeout(playSomaliInspiredMelody, 1000);
    };
    
    playSomaliInspiredMelody();
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