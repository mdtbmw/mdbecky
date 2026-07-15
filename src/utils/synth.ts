"use client";

class AmbientSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gains: GainNode[] = [];
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private currentChord = 0;

  constructor() {}

  initContext() {
    if (!this.ctx) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        console.warn("Could not initialize AudioContext:", e);
      }
    }
    // Resume context if suspended (browser security autoplay policies)
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  start() {
    this.initContext();
    if (this.isPlaying || !this.ctx) return;
    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      
      this.isPlaying = true;
      this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5); // Soft fade-in

      const chords = [
        [48, 60, 64, 67, 71, 74], // Cmaj9
        [53, 60, 64, 65, 69, 72], // Fmaj7
        [45, 57, 60, 64, 67, 71], // Am9
        [47, 59, 62, 64, 67, 71], // G6/9
      ];

      const playChord = (midiNotes: number[]) => {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;

        const now = this.ctx.currentTime;
        const oldGains = [...this.gains];
        const oldOscs = [...this.oscillators];
        
        oldGains.forEach((g) => {
          try {
            g.gain.cancelScheduledValues(now);
            g.gain.setValueAtTime(g.gain.value, now);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
          } catch (e) {}
        });

        setTimeout(() => {
          oldOscs.forEach((osc) => {
            try { osc.stop(); } catch (e) {}
          });
        }, 2200);

        this.oscillators = [];
        this.gains = [];

        midiNotes.forEach((note, index) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          const freq = 440 * Math.pow(2, (note - 69) / 12);
          osc.frequency.setValueAtTime(freq, now);
          osc.type = "sine";

          gain.gain.setValueAtTime(0, now);
          const delay = index * 0.15;
          
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.04 / midiNotes.length, now + delay + 2.0);
          
          gain.gain.setValueAtTime(0.04 / midiNotes.length, now + 6.0);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 8.5);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          
          this.oscillators.push(osc);
          this.gains.push(gain);
        });
      };

      this.currentChord = 0;
      playChord(chords[this.currentChord]);

      this.intervalId = setInterval(() => {
        if (!this.isPlaying) return;
        this.currentChord = (this.currentChord + 1) % chords.length;
        playChord(chords[this.currentChord]);
      }, 7500);

    } catch (e) {
      console.warn("Failed starting ambient synth:", e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try { osc.stop(); } catch (e) {}
        });
        this.oscillators = [];
        this.gains = [];
        this.masterGain = null;
      }, 1000);
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  // --- SYNTHESIZED SOUND EFFECTS ---

  playTick() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.08);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playSlam() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.28);
      
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playChime() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.5);
      });
    } catch (e) {}
  }

  playBuzzer() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(130, now + 0.1);
      
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playPop() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  playSpring() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.14);
      
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  playYesSwell() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25]; // C4, E4, G4, B4, C5 (Cmaj7 swell)
      notes.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {}
  }
}

export const synth = typeof window !== "undefined" ? new AmbientSynth() : null;
