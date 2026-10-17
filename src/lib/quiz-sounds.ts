let audio: AudioContext | null = null;
let keepalive: OscillatorNode | null = null;
let keepaliveTimer: number | null = null;

function context() {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  try {
    if (!audio) audio = new Ctx();
    if (audio.state === "suspended") void audio.resume().catch(() => {});
    return audio;
  } catch {
    return null;
  }
}

function tone(
  ctx: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType = "triangle",
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function withSound(run: (ctx: AudioContext, now: number) => void) {
  try {
    const ctx = context();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    run(ctx, ctx.currentTime + 0.03);
  } catch {
    // A failed sound should not stop the quiz.
  }
}

/** Create or resume the one page context. Call this from a tap or click. */
export function warmAudio() {
  try {
    const ctx = context();
    if (ctx && ctx.state !== "running") void ctx.resume().catch(() => {});
  } catch {
    // Sound is optional.
  }
}

/** Keep the context awake after a tap, so a sound can still play a moment later. */
export function holdAudio(ms: number) {
  try {
    const ctx = context();
    if (!ctx) return;
    if (!keepalive) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 1;
      gain.gain.value = 0.0001;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      keepalive = osc;
    }
    if (keepaliveTimer) window.clearTimeout(keepaliveTimer);
    keepaliveTimer = window.setTimeout(() => {
      try {
        keepalive?.stop();
      } catch {
        // Already stopped.
      }
      keepalive = null;
      keepaliveTimer = null;
    }, ms);
  } catch {
    // Sound is optional.
  }
}

/** Correct answer: rising C E G C triangle notes plus a short high noise burst. */
export function playCheer() {
  withSound((ctx, now) => {
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      tone(ctx, frequency, now + index * 0.09, 0.32, 0.28);
    });
    const noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.25), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = noise;
    filter.type = "highpass";
    filter.frequency.value = 1200;
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(now);
    source.stop(now + 0.25);
  });
}

/** Wrong answer: a short falling brown-noise rasp. */
export function playFart() {
  withSound((ctx, now) => {
    const duration = 0.7;
    const length = Math.floor(ctx.sampleRate * duration);
    const noise = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noise.getChannelData(0);
    let brown = 0;
    let phase = 0;
    for (let index = 0; index < data.length; index += 1) {
      const t = index / ctx.sampleRate;
      phase += ((46 - t * 24) / ctx.sampleRate) * Math.PI * 2;
      const lip = Math.sin(phase);
      const gate = lip > 0.05 ? 1 : 0.12;
      const white = Math.random() * 2 - 1;
      brown = brown * 0.8 + white * 0.2;
      data[index] = (brown * 1.4 + white * 0.45) * gate;
    }

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = noise;
    filter.type = "bandpass";
    filter.Q.value = 0.7;
    filter.frequency.setValueAtTime(720, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.55);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.9, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(now);
    source.stop(now + duration + 0.02);

    for (const [startHz, endHz, volume] of [
      [150, 62, 0.28],
      [300, 124, 0.16],
    ] as const) {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(startHz, now);
      osc.frequency.exponentialRampToValueAtTime(endHz, now + 0.55);
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(volume, now + 0.025);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  });
}
