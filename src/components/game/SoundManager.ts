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

  // Play "Hassan" sound using speech synthesis
  playHassanSound() {
    if (!this.soundEnabled) return;
    
    try {
      const utterance = new SpeechSynthesisUtterance('Hassan');
      utterance.rate = 1.2;
      utterance.pitch = 0.8;
      utterance.volume = 0.7;
      
      // Try to use a male voice if available
      const voices = speechSynthesis.getVoices();
      const maleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('male') || 
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('alex')
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      // Fallback to beep sound if speech synthesis fails
      this.createBeep(150, 0.5, 0.3);
      setTimeout(() => this.createBeep(180, 0.3, 0.2), 200);
    }
  }

  // Enhanced Somali-inspired background music
  startBackgroundMusic() {
    if (!this.musicEnabled || !this.audioContext) return;
    
    // Traditional Somali pentatonic scales with additional notes
    const somaliScale = [
      261.63, // C
      293.66, // D
      329.63, // E
      369.99, // F#
      392.00, // G
      440.00, // A
      493.88, // B
      523.25  // C (octave)
    ];
    
    // Traditional Somali rhythm patterns (7/8 and 9/8 time signatures)
    const rhythmPatterns = [
      { notes: [0, 2, 4, 6, 3, 1, 5], durations: [800, 600, 1000, 700, 900, 650, 1200] },
      { notes: [4, 6, 2, 7, 1, 3, 0, 5], durations: [700, 800, 600, 1100, 750, 850, 900, 1000] },
      { notes: [6, 3, 7, 1, 4, 0, 2], durations: [900, 700, 1200, 650, 800, 750, 950] },
      { notes: [2, 5, 1, 6, 0, 4, 7, 3], durations: [650, 950, 700, 1000, 800, 900, 1100, 750] }
    ];
    
    let patternIndex = 0;
    let noteIndex = 0;
    let beatCounter = 0;
    
    const playEnhancedSomaliMelody = () => {
      if (!this.musicEnabled || !this.audioContext) return;
      
      const currentPattern = rhythmPatterns[patternIndex % rhythmPatterns.length];
      const noteIndexInScale = currentPattern.notes[noteIndex % currentPattern.notes.length];
      const frequency = somaliScale[noteIndexInScale];
      const duration = currentPattern.durations[noteIndex % currentPattern.durations.length] / 1000;
      
      // Main melody with traditional Somali ornamentation
      this.createOrnamentedNote(frequency, duration, 0.04);
      
      // Traditional drone accompaniment (lower octave)
      setTimeout(() => {
        this.createBeep(frequency * 0.5, duration * 1.5, 0.02);
      }, 100);
      
      // Harmonic intervals (fifth and octave) - traditional Somali harmony
      if (beatCounter % 3 === 0) {
        setTimeout(() => {
          this.createBeep(frequency * 1.5, duration * 0.7, 0.025); // Fifth
        }, 200);
      }
      
      if (beatCounter % 4 === 0) {
        setTimeout(() => {
          this.createBeep(frequency * 2, duration * 0.5, 0.02); // Octave
        }, 300);
      }
      
      // Traditional rhythmic accents
      if (beatCounter % 7 === 0) {
        setTimeout(() => {
          this.createPercussiveAccent();
        }, 400);
      }
      
      noteIndex++;
      beatCounter++;
      
      // Change pattern every 16 beats
      if (noteIndex % 16 === 0) {
        patternIndex++;
        noteIndex = 0;
      }
      
      // Continue the musical journey
      const nextDuration = currentPattern.durations[noteIndex % currentPattern.durations.length];
      setTimeout(playEnhancedSomaliMelody, nextDuration);
    };
    
    playEnhancedSomaliMelody();
  }

  // Create ornamented notes with traditional Somali musical embellishments
  private createOrnamentedNote(frequency: number, duration: number, volume: number) {
    if (!this.audioContext || !this.soundEnabled) return;

    // Main note
    this.createBeep(frequency, duration, volume);
    
    // Add traditional grace note (quick ornament)
    setTimeout(() => {
      this.createBeep(frequency * 1.125, 0.05, volume * 0.6); // Minor second up
    }, 50);
    
    // Add vibrato effect
    setTimeout(() => {
      this.createBeep(frequency * 1.03, 0.1, volume * 0.4);
    }, duration * 300);
  }

  // Traditional Somali percussive accent
  private createPercussiveAccent() {
    if (!this.audioContext || !this.soundEnabled) return;
    
    // Simulate traditional drum pattern
    this.createBeep(80, 0.15, 0.06);  // Low drum
    setTimeout(() => {
      this.createBeep(150, 0.08, 0.04); // Mid drum
    }, 100);
    setTimeout(() => {
      this.createBeep(220, 0.05, 0.03); // High accent
    }, 150);
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