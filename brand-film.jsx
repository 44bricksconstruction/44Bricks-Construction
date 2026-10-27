// 44 BRICKS — brand film. Built on animations-v3 (CompositionStage).
const { useComposition, CompositionStage, Shot, Captions, Easing, animate, interpolate, clamp } = window;

const C = { navy: '#0A1A3C', ink: '#0F1B33', cobalt: '#003399', gold: '#C9972C', goldSoft: '#E3B75B', paper: '#F4F2EE', ice: '#C3CDE2' };
const DISPLAY = "'Archivo', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

// The three motion helpers — all motion goes through these.
const MOTION = {
  enter: (start, dur = 0.8) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutCubic }),
  draw: (start, dur = 1) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeInOutCubic }),
  pop: (start, dur = 0.7) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutBack }),
};
const lerp = (a, b, p) => a + (b - a) * p;

function GridBg({ opacity = 1 }) {
  return <div style={{ position: 'absolute', inset: 0, background: C.navy, opacity,
    backgroundImage: 'linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px)',
    backgroundSize: '80px 80px' }} />;
}

// Foundation: a brick wall lays itself course by course, then the mark lands.
function Foundation() {
  const { T, CUES } = useComposition();
  const t0 = CUES.Foundation, ROWS = 6, COLS = 11, BW = 150, BH = 62, GAP = 8;
  const wallW = COLS * (BW + GAP), wallH = ROWS * (BH + GAP);
  const fade = (1 - MOTION.draw(CUES.Wordmark + 0.4, 1)(T)) * (T < CUES.Intro ? 1 : 0);
  const bricks = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const st = t0 + 0.15 + r * 0.32 + c * 0.03;
    const p = MOTION.enter(st, 0.5)(T);
    const off = r % 2 ? (BW + GAP) / 2 : 0;
    const x = c * (BW + GAP) - off, y = wallH - (r + 1) * (BH + GAP);
    bricks.push(<div key={r + '-' + c} style={{ position: 'absolute', left: x, top: y, width: BW, height: BH,
      background: (r + c) % 7 === 3 ? C.gold : C.cobalt, opacity: p * 0.9,
      transform: `translateY(${lerp(-260, 0, p)}px)` }} />);
  }
  const logoP = MOTION.pop(t0 + 2.4, 0.9)(T);
  const logoOut = MOTION.draw(CUES.Wordmark, 0.8)(T);
  return (
    <>
      <div style={{ position: 'absolute', left: (1920 - wallW) / 2, top: 1080 - wallH - 60, width: wallW, height: wallH,
        opacity: fade * (1 - 0.65 * MOTION.draw(t0 + 2.3, 0.6)(T)) }}>{bricks}</div>
      <div style={{ position: 'absolute', left: 960 - 170, top: 380 - 170, width: 340, height: 340, borderRadius: '50%', background: C.navy,
        opacity: logoP * (T < CUES.Wordmark + 0.85 ? 1 : 0), background: 'transparent', transform: `translate(${lerp(0, -572, logoOut)}px, ${lerp(0, 158, logoOut)}px) scale(${lerp(0.4, 1, logoP) * lerp(1, 0.6, logoOut)}) rotate(${lerp(-90, 0, logoP)}deg)` }}>
        <img src="assets/img2.png" alt="" style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
}

function Wordmark() {
  const { T, CUES } = useComposition();
  const t0 = CUES.Wordmark;
  const word = '44 BRICKS'.split('');
  const out = MOTION.draw(CUES.Intro - 0.4, 0.4)(T);
  const mark = T >= t0 + 0.85 ? 1 : 0;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 56, opacity: 1 - out }}>
      <img src="assets/img2.png" alt="" style={{ width: 210, height: 210, opacity: mark }} />
      <div>
        <div style={{ display: 'flex', fontFamily: DISPLAY, fontWeight: 850, fontVariationSettings: "'wdth' 115", fontSize: 168, lineHeight: 0.9, color: '#fff', letterSpacing: '.02em' }}>
          {word.map((ch, i) => { const p = MOTION.enter(t0 + 0.35 + i * 0.06, 0.6)(T); return <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre', opacity: p, transform: `translateY(${lerp(60, 0, p)}px)` }}>{ch}</span>; })}
        </div>
        <div style={{ marginTop: 22, fontFamily: MONO, fontSize: 30, letterSpacing: '.28em', color: C.goldSoft, opacity: MOTION.enter(t0 + 1.3, 0.8)(T) }}>STRONG FOUNDATIONS. LASTING IMPACT.</div>
        <div style={{ marginTop: 28, height: 4, background: C.gold, width: 980 * MOTION.draw(t0 + 1.1, 1.4)(T) }} />
      </div>
    </div>
  );
}

// A full-bleed photo that always drifts (Ken Burns).
function Photo({ src, from, to, zoom = [1.04, 1.16], pan = [0, -30], label }) {
  const { T } = useComposition();
  const p = clamp((T - from) / (to - from), 0, 1);
  const s = lerp(zoom[0], zoom[1], p), x = lerp(pan[0], pan[1], p);
  const lab = MOTION.enter(from + 0.25, 0.5)(T);
  return (
    <Shot from={from} to={to}>
      <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s}) translateX(${x}px)` }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,26,60,0) 50%,rgba(10,26,60,.75) 100%)' }} />
      {label && <div style={{ position: 'absolute', left: 96, top: 84, display: 'flex', alignItems: 'center', gap: 16, fontFamily: MONO, fontSize: 26, letterSpacing: '.18em', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.7)', opacity: lab, transform: `translateX(${lerp(-24, 0, lab)}px)` }}>
        <span style={{ width: 14, height: 14, background: C.gold }} />{label}
      </div>}
    </Shot>
  );
}

function Work() {
  const { CUES } = useComposition();
  const g = CUES.Groundwork, r = CUES.Rise, d = CUES.Delivered, s = CUES.Sectors;
  const third = (a, b, i) => a + (b - a) * i / 3;
  return (
    <>
      <Photo src="assets/img4.jpg" from={third(g, r, 0)} to={third(g, r, 1)} label="PHASE 01 — SETTING OUT" />
      <Photo src="assets/img6.jpg" from={third(g, r, 1)} to={third(g, r, 2)} label="PHASE 03 — FOUNDATIONS" pan={[20, -20]} />
      <Photo src="assets/img9.jpg" from={third(g, r, 2)} to={r} label="PHASE 06 — COLUMNS" zoom={[1.15, 1.04]} />
      <Photo src="assets/img11.jpg" from={third(r, d, 0)} to={third(r, d, 1)} label="STRUCTURAL SHELL" />
      <Photo src="assets/img19.jpg" from={third(r, d, 1)} to={third(r, d, 2)} label="UPPER FLOORS" pan={[-20, 20]} />
      <Photo src="assets/img34.jpg" from={third(r, d, 2)} to={d} label="CLADDING & FINISHES" zoom={[1.12, 1.03]} />
      <Photo src="assets/img32.jpg" from={d} to={(d + s) / 2} label="NAKOS PLACE — DELIVERED" zoom={[1.02, 1.12]} />
      <Photo src="assets/img36.jpg" from={(d + s) / 2} to={s} label="VILLA ADEL — DELIVERED" zoom={[1.1, 1.02]} />
    </>
  );
}


function Intro() {
  const { T, CUES } = useComposition();
  const t0 = CUES.Intro, out = MOTION.draw(CUES.Team - 0.5, 0.5)(T);
  const l = [MOTION.enter(t0 + 0.2, 0.7)(T), MOTION.enter(t0 + 0.8, 0.7)(T), MOTION.enter(t0 + 1.6, 0.7)(T)];
  const facts = [['3+ YEARS', 'Delivering across Ghana'], ['6 SECTORS', 'Residential to renewable energy'], ['ONE TEAM', 'Design, build, monitor, maintain']];
  return (
    <Shot from={t0} to={CUES.Team}>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 150, opacity: 1 - out }}>
        <div style={{ fontFamily: MONO, fontSize: 26, letterSpacing: '.18em', color: C.goldSoft, opacity: l[0] }}>WHO WE ARE</div>
        <div style={{ marginTop: 28, fontFamily: DISPLAY, fontWeight: 800, fontVariationSettings: "'wdth' 108", fontSize: 76, lineHeight: 1.08, color: '#fff', maxWidth: 1500, opacity: l[1], transform: `translateY(${lerp(30, 0, l[1])}px)` }}>A Ghanaian construction and infrastructure company delivering quality, innovation, and reliability.</div>
        <div style={{ marginTop: 90, display: 'flex', gap: 80 }}>
          {facts.map((f, i) => { const p = MOTION.enter(t0 + 1.6 + i * 0.35, 0.6)(T); return (
            <div key={i} style={{ borderTop: '4px solid ' + C.gold, paddingTop: 22, width: 440, opacity: p, transform: `translateY(${lerp(24, 0, p)}px)` }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 850, fontSize: 64, color: '#fff' }}>{f[0]}</div>
              <div style={{ fontSize: 30, color: C.ice, marginTop: 6 }}>{f[1]}</div>
            </div>); })}
        </div>
      </div>
    </Shot>
  );
}

function Services() {
  const { T, CUES } = useComposition();
  const t0 = CUES.Services, out = MOTION.draw(CUES.EndCard - 0.4, 0.4)(T);
  const items = ['Residential construction', 'Commercial development', 'Industrial infrastructure', 'Water management systems', 'Urban development & civil works', 'Renewable energy infrastructure', 'Project planning & management', 'Renovation & maintenance', 'Drone site monitoring'];
  return (
    <Shot from={t0} to={CUES.EndCard}>
      <div style={{ position: 'absolute', inset: 0, background: C.navy }} />
      <GridBg />
      <div style={{ position: 'absolute', left: 120, right: 120, top: 120, opacity: 1 - out }}>
        <div style={{ fontFamily: MONO, fontSize: 26, letterSpacing: '.18em', color: C.goldSoft, opacity: MOTION.enter(t0, 0.5)(T) }}>WHAT WE DO</div>
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 56px' }}>
          {items.map((w, i) => { const p = MOTION.enter(t0 + 0.2 + i * 0.16, 0.5)(T); return (
            <div key={w} style={{ display: 'flex', gap: 20, alignItems: 'baseline', padding: '30px 0', borderBottom: '1px solid rgba(255,255,255,.18)', opacity: p, transform: `translateY(${lerp(20, 0, p)}px)` }}>
              <span style={{ fontFamily: MONO, fontSize: 24, color: C.goldSoft }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, color: '#fff', lineHeight: 1.1 }}>{w}</span>
            </div>); })}
        </div>
        <div style={{ marginTop: 56, fontSize: 32, color: C.ice, opacity: MOTION.enter(t0 + 1.9, 0.6)(T) }}>For private owners, businesses, organisations, and government agencies — in urban and emerging communities.</div>
      </div>
    </Shot>
  );
}


function TeamReel() {
  const { T, CUES } = useComposition();
  const t0 = CUES.Team, t1 = CUES.Groundwork, n = 5, seg = (t1 - t0) / n;
  const head = MOTION.enter(t0 + 0.3, 0.7)(T);
  return (
    <Shot from={t0} to={t1}>
      {[1, 2, 3, 4, 5].map((k, i) => {
        const a = t0 + i * seg, fadeIn = i === 0 ? 1 : MOTION.draw(a - 0.5, 0.9)(T);
        const p = clamp((T - (a - 0.5)) / (seg + 1), 0, 1);
        return <img key={k} src={'assets/team' + k + '.jpg'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: T < a - 0.5 ? 0 : fadeIn, transform: `scale(${lerp(1.03, 1.12, p)}) translateX(${lerp(i % 2 ? -18 : 18, i % 2 ? 18 : -18, p)}px)` }} />;
      })}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(10,26,60,.85) 0%,rgba(10,26,60,.2) 60%,rgba(10,26,60,0) 100%)' }} />
      <div style={{ position: 'absolute', left: 120, bottom: 150, maxWidth: 900, opacity: head, transform: `translateY(${lerp(30, 0, head)}px)` }}>
        <div style={{ fontFamily: MONO, fontSize: 26, letterSpacing: '.18em', color: C.goldSoft }}>OUR TEAM</div>
        <div style={{ marginTop: 20, fontFamily: DISPLAY, fontWeight: 850, fontVariationSettings: "'wdth' 112", fontSize: 96, lineHeight: 1, color: '#fff' }}>The people behind every brick.</div>
        <div style={{ marginTop: 22, fontSize: 32, color: C.ice }}>Engineers, supervisors, and site crews — on every project, every day.</div>
      </div>
    </Shot>
  );
}

function Sectors() {
  const { T, CUES } = useComposition();
  const t0 = CUES.Sectors;
  const words = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'WATER', 'URBAN', 'ENERGY'];
  return (
    <Shot from={t0} to={CUES.Services}>
      <div style={{ position: 'absolute', inset: 0, background: C.cobalt }} />
      <div style={{ position: 'absolute', left: 120, top: 120, fontFamily: MONO, fontSize: 26, letterSpacing: '.18em', color: C.goldSoft, opacity: MOTION.enter(t0, 0.5)(T) }}>SIX SECTORS. ONE ACCOUNTABLE TEAM.</div>
      <div style={{ position: 'absolute', left: 120, top: 210, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {words.map((w, i) => { const p = MOTION.enter(t0 + 0.2 + i * 0.32, 0.55)(T); return (
          <div key={w} style={{ fontFamily: DISPLAY, fontWeight: 850, fontVariationSettings: "'wdth' 118", fontSize: 118, lineHeight: 1.0, color: i === words.length - 1 ? C.goldSoft : '#fff', opacity: p, transform: `translateX(${lerp(-80, 0, p)}px)` }}>{w}</div>); })}
      </div>
    </Shot>
  );
}

function EndCard() {
  const { T, CUES, authoredTotal } = useComposition();
  const t0 = CUES.EndCard;
  const out = MOTION.draw(authoredTotal - 0.7, 0.7)(T);
  const a = MOTION.pop(t0 + 0.2, 0.8)(T), b = MOTION.enter(t0 + 0.7, 0.7)(T), c = MOTION.enter(t0 + 1.2, 0.7)(T);
  return (
    <Shot from={t0}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 1 - out }}>
        <img src="assets/img2.png" alt="" style={{ width: 170, height: 170, opacity: a, transform: `scale(${lerp(0.6, 1, a)})` }} />
        <div style={{ marginTop: 36, fontFamily: DISPLAY, fontWeight: 850, fontVariationSettings: "'wdth' 115", fontSize: 120, lineHeight: 0.95, color: '#fff', opacity: b, transform: `translateY(${lerp(30, 0, b)}px)` }}>Let’s build together.</div>
        <div style={{ marginTop: 40, display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', fontFamily: MONO, fontSize: 28, letterSpacing: '.12em', color: C.goldSoft, opacity: c }}>
          <span>+233 543 100 015</span><span>INFO@44BRICKSCONSTRUCTION.COM</span><span>44BRICKSCONSTRUCTION.COM</span>
        </div>
      </div>
    </Shot>
  );
}

function Piece() {
  const { T, CUES } = useComposition();
  React.useEffect(() => {
    const root = document.querySelector('[data-brand-film]');
    if (root) root.setAttribute('data-screen-label', 'Brand film ' + Math.floor(T) + 's');
  }, [Math.floor(T)]);
  return (
    <div data-brand-film="" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.navy, fontFamily: "'Instrument Sans', sans-serif" }}>
      <GridBg />
      <Foundation />
      <Wordmark />
      <Intro />
      <TeamReel />
      <Work />
      <Sectors />
      <Services />
      <EndCard />
      <Captions style={{ font: `600 40px ${DISPLAY}`, bottom: '8%', color: '#fff' }} items={[
        { at: CUES.Groundwork + 0.3, until: CUES.Rise - 0.1, text: 'Every project, set out with precision.' },
        { at: CUES.Rise + 0.2, until: CUES.Delivered - 0.1, text: 'Built floor by floor — and documented from the air.' },
        { at: CUES.Delivered + 0.2, until: CUES.Sectors - 0.1, text: 'Delivered to specification. Handed over with pride.' },
      ]} />
    </div>
  );
}

function BrandFilm() {
  const [t, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true });
  return (
    <>
      <CompositionStage width={1920} height={1080} bg={C.navy} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <Piece />
      </CompositionStage>
      <window.TweaksPanel>
        <window.TweakSection label="Film" />
        <window.TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </window.TweaksPanel>
    </>
  );
}
window.BrandFilm = BrandFilm;
