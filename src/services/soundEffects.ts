// Synthesized lab sound effects using Web Audio API — offline-first, no external assets needed.

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Short noise burst helper */
function noiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const len = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
  return buf;
}

/** Bubbling sound — randomised pops */
export function playBubble(count = 6) {
  const ctx = getCtx();
  for (let i = 0; i < count; i++) {
    const t = ctx.currentTime + i * (0.15 + Math.random() * 0.2);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300 + Math.random() * 400, t);
    osc.frequency.exponentialRampToValueAtTime(80 + Math.random() * 60, t + 0.08);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }
}

/** Pouring / liquid sound — filtered noise */
export function playPour(duration = 1.2) {
  const ctx = getCtx();
  const buf = noiseBuffer(ctx, duration);
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + duration);
  filter.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.15, ctx.currentTime + duration - 0.2);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
}

/** Reaction complete — rising chime */
export function playReactionComplete() {
  const ctx = getCtx();
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const t = ctx.currentTime + i * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  });
}

/** Warning beep */
export function playWarning() {
  const ctx = getCtx();
  for (let i = 0; i < 2; i++) {
    const t = ctx.currentTime + i * 0.25;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }
}

/** Hissing gas release */
export function playHiss(duration = 1.5) {
  const ctx = getCtx();
  const buf = noiseBuffer(ctx, duration);
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(5000, ctx.currentTime + duration * 0.3);
  filter.frequency.linearRampToValueAtTime(2500, ctx.currentTime + duration);
  filter.Q.value = 1;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.12, ctx.currentTime + duration * 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
}

/** Sizzle for exothermic reactions — crackling noise bursts */
export function playSizzle(duration = 1.8) {
  const ctx = getCtx();
  const crackleCount = Math.floor(duration * 15);
  for (let i = 0; i < crackleCount; i++) {
    const t = ctx.currentTime + Math.random() * duration;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1500 + Math.random() * 3000, t);
    osc.frequency.exponentialRampToValueAtTime(200 + Math.random() * 300, t + 0.03);
    gain.gain.setValueAtTime(0.04 + Math.random() * 0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03 + Math.random() * 0.02);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }
}
