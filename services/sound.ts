
type Sound = 'place' | 'complete' | 'win';

class SoundService {
  private audioContext: AudioContext | null = null;
  private isMuted = false;
  private isInitialized = false;

  private init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.isInitialized = true;
  }
  
  public userInteraction() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public play(sound: Sound) {
    if (this.isMuted || !this.audioContext) return;
    
    if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
    }

    switch (sound) {
      case 'place':
        this.playSound(261.63, 0.1, 'sine', 0.1); // C4
        break;
      case 'complete':
        this.playSound(523.25, 0.15, 'triangle'); // C5
        setTimeout(() => this.playSound(659.25, 0.15, 'triangle'), 100); // E5
        break;
      case 'win':
        this.playSound(523.25, 0.1, 'sine'); // C5
        setTimeout(() => this.playSound(659.25, 0.1, 'sine'), 120); // E5
        setTimeout(() => this.playSound(783.99, 0.1, 'sine'), 240); // G5
        setTimeout(() => this.playSound(1046.50, 0.2, 'sine'), 360); // C6
        break;
    }
  }

  private playSound(frequency: number, duration: number, type: OscillatorType, volume = 0.2) {
    if (!this.audioContext) return;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
  
  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMutedState() {
      return this.isMuted;
  }
}

export const soundService = new SoundService();
