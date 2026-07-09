// Direction 01 — TERMINAL
// Dark, monospace, system-boot aesthetic. Showpiece: live-typed boot sequence
// + Wireshark-style packet stream for the Evertz case study.

const { useState: useStateT, useEffect: useEffectT, useRef: useRefT, useMemo: useMemoT } = React;

const termStyles = {
  root: {
    minHeight: '100%', background: '#0a0a0a', color: '#e6e6e6',
    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
    fontSize: 13, lineHeight: 1.65,
  },
  container: { maxWidth: 1100, margin: '0 auto', padding: '40px 28px 80px' },
  prompt: { color: '#00ff9c' },
  comment: { color: '#555' },
  key: { color: '#888' },
  str: { color: '#f5f5f5' },
  acc: { color: '#00ff9c' },
  purple: { color: '#c792ea' },
  blue: { color: '#82aaff' },
  orange: { color: '#ffb86c' },
  pink: { color: '#ff79c6' },
  yellow: { color: '#f1fa8c' },
  hr: { borderTop: '1px dashed #222', margin: '28px 0' },
  card: { border: '1px solid #1e1e1e', background: '#0c0c0c', padding: 20, borderRadius: 2 },
};

// ─── Typewriter hook ──────────────────────────────────────────────────────
function useTypewriter(lines, speed = 18, startDelay = 200) {
  const [state, setState] = useStateT({ lineIdx: 0, charIdx: 0, done: false });
  useEffectT(() => {
    let t, cancelled = false;
    function tick() {
      if (cancelled) return;
      setState(s => {
        if (s.lineIdx >= lines.length) return { ...s, done: true };
        const cur = lines[s.lineIdx];
        if (s.charIdx >= cur.length) {
          t = setTimeout(tick, 60);
          return { lineIdx: s.lineIdx + 1, charIdx: 0, done: s.lineIdx + 1 >= lines.length };
        }
        t = setTimeout(tick, speed);
        return { ...s, charIdx: s.charIdx + 1 };
      });
    }
    t = setTimeout(tick, startDelay);
    return () => { cancelled = true; clearTimeout(t); };
  }, [lines.length]);
  return state;
}

// ─── Blinking cursor ──────────────────────────────────────────────────────
const Caret = () => (
  <span style={{
    display: 'inline-block', width: 8, height: 14, background: '#00ff9c',
    verticalAlign: 'text-bottom', marginLeft: 2, animation: 'blink 1s step-end infinite',
  }} />
);

// ─── Hero: live terminal boot ────────────────────────────────────────────
function TerminalHero({ data }) {
  const lines = [
    '$ whoami',
    'teghveer_singh_ateliey',
    '',
    '$ cat /etc/profile',
    '> role:      Mechatronics Engineer',
    '> location:  Greater Toronto Area, Canada',
    '> school:    McMaster University (2021 — 2028)',
    '> interests: fpga, firmware, full-stack, space',
    '',
    '$ systemctl status teghveer.service',
    '● teghveer.service — building the technology of tomorrow',
    '   Loaded: loaded (/etc/systemd/system/teghveer.service; enabled)',
    '   Active: active (running) since 2003 — 22 years uptime',
    '   Tasks:  3 concurrent (evertz · satellite · formula)',
    '',
    '$ ./teghveer --help',
    'Usage: teghveer [role] [args...]',
    'Available roles:',
    '  fpga-design-engineer    currently at Evertz',
    '  payload-firmware        currently on McMaster Satellite Team',
    '  vehicle-software        currently at MAC Formula Electric',
    '  swe / bsa / leadership  see --history',
    '',
    '$ _',
  ];
  const { lineIdx, charIdx, done } = useTypewriter(lines, 10, 150);

  return (
    <div style={{ ...termStyles.card, padding: '28px 32px', background: '#07070a', marginBottom: 44, position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 44, right: 28, opacity: 0.92,
        display: window.innerWidth < 720 ? 'none' : 'block',
      }}>
        <PixelEngineer size={140} palette="cool" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 14, color: '#555', fontSize: 11 }}>~/teghveer — zsh — 120×40</span>
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 13 }}>
        {lines.slice(0, lineIdx).map((l, i) => (
          <TermLine key={i} text={l} />
        ))}
        {!done && lineIdx < lines.length && (
          <TermLine key="current" text={lines[lineIdx].slice(0, charIdx)} showCaret />
        )}
        {done && <TermLine text="" showCaret />}
      </pre>
    </div>
  );
}

function TermLine({ text, showCaret }) {
  let el;
  if (text.startsWith('$')) {
    el = <><span style={termStyles.prompt}>$</span><span>{text.slice(1)}</span></>;
  } else if (text.startsWith('>')) {
    const [k, ...rest] = text.slice(1).trim().split(':');
    el = <><span style={termStyles.key}>  {k}:</span><span style={termStyles.str}>{rest.join(':')}</span></>;
  } else if (text.startsWith('●')) {
    el = <span style={termStyles.acc}>{text}</span>;
  } else if (text.startsWith('   ')) {
    el = <span style={termStyles.comment}>{text}</span>;
  } else if (text.includes('currently')) {
    el = <span style={termStyles.blue}>{text}</span>;
  } else {
    el = <span>{text}</span>;
  }
  return <div>{el}{showCaret && <Caret />}</div>;
}

// ─── Section header ──────────────────────────────────────────────────────
function SecHead({ num, title, hint }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 22, marginTop: 56 }}>
      <span style={{ color: '#333', fontSize: 12 }}>{num}</span>
      <span style={{ color: '#00ff9c' }}>$</span>
      <span style={{ fontSize: 15, color: '#eee', fontWeight: 500 }}>{title}</span>
      {hint && <span style={{ color: '#555', fontSize: 12, marginLeft: 'auto' }}>{hint}</span>}
    </div>
  );
}

// ─── Site view ───────────────────────────────────────────────────────────
function TerminalSite({ data }) {
  return (
    <div style={termStyles.root}>
      <div style={termStyles.container}>
        <TerminalHero data={data} />

        <SecHead num="01" title="cat ./summary.md" hint="# the long version" />
        <div style={{ maxWidth: 820, color: '#bbb', marginLeft: 4 }}>
          {data.summary.map((p, i) => (
            <p key={i} style={{ marginBottom: 12 }}>
              <span style={termStyles.comment}># </span>{p}
            </p>
          ))}
        </div>

        <SecHead num="02" title="ls -la ./projects/" hint={`# ${data.projects.length} entries`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 14 }}>
          {data.projects.slice(0, 6).map(p => <ProjectCard key={p.id} p={p} />)}
        </div>

        <SecHead num="03" title="./skills --matrix" />
        <SkillsMatrix skills={data.skills} topSkills={data.topSkills} />

        <SecHead num="04" title="./awards --list" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginLeft: 4 }}>
          {[...data.awards, ...data.certifications].map((a, i) => (
            <div key={i} style={{ color: '#aaa' }}>
              <span style={{ color: '#00ff9c' }}>✓ </span>{a}
            </div>
          ))}
        </div>

        <SecHead num="05" title="./contact --open" />
        <div style={{ marginLeft: 4 }}>
          <ContactBlock links={data.links} />
        </div>

        <div style={{ marginTop: 80, color: '#444', textAlign: 'center', fontSize: 11 }}>
          <span style={termStyles.prompt}>$ </span>
          <span>exit 0 — built by teghveer, for teghveer</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div style={{
      border: '1px solid #1e1e1e', background: '#0c0c0c', padding: 16, borderRadius: 2,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: p.color,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{
          fontSize: 10, color: p.color, border: `1px solid ${p.color}44`,
          padding: '2px 6px', letterSpacing: '0.1em',
        }}>{p.tag}</span>
        {p.status === 'ongoing' && (
          <span style={{ fontSize: 10, color: '#00ff9c' }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6, background: '#00ff9c',
              borderRadius: '50%', marginRight: 4, verticalAlign: 'middle',
            }} />
            active
          </span>
        )}
        <span style={{ marginLeft: 'auto', color: '#555', fontSize: 11 }}>{p.period}</span>
      </div>
      <div style={{ fontSize: 15, color: '#eee', marginBottom: 4 }}>{p.company}</div>
      <div style={{ color: '#888', fontSize: 12, marginBottom: 10 }}>{p.role}</div>
      <div style={{ color: '#aaa', fontSize: 12, marginBottom: 14, lineHeight: 1.55 }}>{p.oneLiner}</div>
      {p.stack && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.stack.slice(0, 6).map(s => (
            <span key={s} style={{
              fontSize: 10, color: '#888', background: '#151515', padding: '2px 7px', borderRadius: 2,
            }}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsMatrix({ skills, topSkills }) {
  return (
    <div style={{ marginLeft: 4 }}>
      <div style={{ color: '#555', fontSize: 11, marginBottom: 14 }}># top:&nbsp;
        {topSkills.map((s, i) => (
          <span key={s} style={{ color: '#00ff9c' }}>{s}{i < topSkills.length - 1 && <span style={{ color: '#333' }}>, </span>}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat}>
            <div style={{ color: '#00ff9c', fontSize: 11, marginBottom: 8, letterSpacing: '0.05em' }}>
              ▸ {cat.toLowerCase()}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {list.map(s => (
                <span key={s} style={{
                  fontSize: 11, color: '#ccc', border: '1px solid #222', padding: '3px 8px', borderRadius: 2,
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactBlock({ links }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 20px', fontSize: 13 }}>
      <span style={termStyles.key}>linkedin:</span>
      <a href={`https://${links.linkedin}`} target="_blank" style={{ color: '#82aaff', textDecoration: 'none' }}>{links.linkedin}</a>
      <span style={termStyles.key}>github:</span>
      <a href={`https://${links.github}`} target="_blank" style={{ color: '#82aaff', textDecoration: 'none' }}>{links.github}</a>
      <span style={termStyles.key}>x:</span>
      <a href={`https://${links.x}`} target="_blank" style={{ color: '#82aaff', textDecoration: 'none' }}>{links.x}</a>
      <span style={termStyles.key}>location:</span>
      <span style={{ color: '#ccc' }}>{links.location}</span>
      <span style={termStyles.key}>status:</span>
      <span style={{ color: '#00ff9c' }}>◉ available for summer 2027 co-op / internships</span>
    </div>
  );
}

// ─── Case Studies view ───────────────────────────────────────────────────
function TerminalCases({ data }) {
  const cases = data.projects.filter(p => ['evertz', 'preset', 'formula', 'td-swe'].includes(p.id));
  const [active, setActive] = useStateT(cases[0].id);
  const cur = cases.find(c => c.id === active);

  return (
    <div style={termStyles.root}>
      <div style={{ ...termStyles.container, maxWidth: 1200 }}>
        <div className="case-tabs-row" style={{ display: 'flex', gap: 8, marginBottom: 28, marginTop: 20, flexWrap: 'wrap' }}>
          {cases.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                background: active === c.id ? '#111' : 'transparent',
                border: `1px solid ${active === c.id ? c.color : '#222'}`,
                color: active === c.id ? c.color : '#888',
                padding: '8px 14px', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
                borderRadius: 2, letterSpacing: '0.03em',
              }}
            >
              <span style={{ opacity: 0.5, marginRight: 8 }}>{c.tag}</span>
              {c.company}
            </button>
          ))}
        </div>

        <CaseHero p={cur} />

        {cur.id === 'evertz' && <EvertzShowpiece />}
        {cur.id === 'preset' && <SatelliteShowpiece />}
        {cur.id === 'formula' && <FormulaShowpiece />}
        {cur.id === 'td-swe' && <TDShowpiece />}

        <SecHead num="→" title={`impact_log.txt`} />
        <div style={{ background: '#0c0c0c', border: '1px solid #1e1e1e', padding: 20, fontSize: 12.5 }}>
          {cur.impact.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, lineHeight: 1.6 }}>
              <span style={{ color: cur.color, fontVariantNumeric: 'tabular-nums' }}>
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <span style={{ color: '#ccc' }}>{line}</span>
            </div>
          ))}
        </div>

        <SecHead num="→" title="stack.json" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginLeft: 4 }}>
          {cur.stack.map(s => (
            <span key={s} style={{
              color: cur.color, border: `1px solid ${cur.color}44`, background: `${cur.color}11`,
              padding: '6px 12px', fontSize: 12, borderRadius: 2,
            }}>{s}</span>
          ))}
        </div>

        <div style={{ marginTop: 60, color: '#444', fontSize: 11 }}>
          <span style={termStyles.prompt}>$ </span>
          <span>cat next.txt → </span>
          {cases.map((c, i) => c.id !== active && (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              background: 'none', border: 'none', color: '#82aaff', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 11, padding: 0, marginRight: 10,
            }}>./{c.slug}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseHero({ p }) {
  const PixelIcon = {
    'evertz': <PixelCamera size={100} />,
    'preset': <PixelSatellite size={100} />,
    'formula': <PixelRacecar size={140} />,
    'td-swe': <PixelFPGA size={90} accent={p.color} />,
  }[p.id];
  const iconW = p.id === 'formula' ? 160 : 120;

  return (
    <div style={{ marginBottom: 40, position: 'relative' }}>
      {PixelIcon && (
        <div className="case-pixel-icon" style={{ position: 'absolute', top: -6, right: 0, opacity: 0.95 }}>
          {PixelIcon}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#555', fontSize: 11, marginBottom: 10 }}>
        <span style={{ color: p.color }}>●</span>
        <span>{p.company}</span>
        <span>·</span>
        <span>{p.role}</span>
        <span>·</span>
        <span>{p.period}</span>
      </div>
      <h1 style={{
        fontSize: 40, fontWeight: 400, lineHeight: 1.15, color: '#eee', marginBottom: 18,
        fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.01em',
        paddingRight: PixelIcon ? iconW : 0,
      }}>
        {p.oneLiner}
      </h1>
      <p style={{ color: '#888', maxWidth: 760, lineHeight: 1.65 }}>{p.domain}</p>
      {p.metrics && (
        <div style={{ display: 'flex', gap: 40, marginTop: 24, flexWrap: 'wrap' }}>
          {p.metrics.map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 28, color: p.color, fontWeight: 500, letterSpacing: '-0.02em' }}>{m.value}</div>
              <div style={{ color: '#666', fontSize: 11, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Showpiece: Wireshark-style packet stream for Evertz ────────────────
function EvertzShowpiece() {
  const [packets, setPackets] = useStateT([]);
  const counterRef = useRefT(0);

  useEffectT(() => {
    const types = [
      { proto: 'JPEG-XS', info: 'frame 1920×1080 · precinct 8 · quality 0.85', color: '#60a5fa' },
      { proto: 'SDI',     info: '2110-20 video · 2160p59.94 · PID 0x0041',     color: '#82aaff' },
      { proto: 'AUDIO',   info: 'AES67 · 48kHz · PCM · buf_depth=OK',           color: '#00ff9c' },
      { proto: 'CTRL',    info: 'lip-sync delta = +3.2ms · within tolerance',   color: '#ffb86c' },
      { proto: 'VHDL',    info: 'encoder_wrapper.sim → 23.98p pass',            color: '#c792ea' },
      { proto: 'DEBUG',   info: 'scaler_artifact fixed @ commit a8f3c19',       color: '#f97316' },
      { proto: 'QSFP',    info: 'link up · 25 Gbps · no CRC errors',            color: '#22c55e' },
    ];
    const t = setInterval(() => {
      setPackets(prev => {
        counterRef.current += 1;
        const type = types[Math.floor(Math.random() * types.length)];
        const next = [...prev, {
          n: counterRef.current,
          time: (counterRef.current * 0.000143).toFixed(6),
          src: '10.0.' + (Math.floor(Math.random() * 8) + 1) + '.' + (Math.floor(Math.random() * 250) + 1),
          dst: '10.0.4.22',
          ...type,
        }];
        return next.slice(-12);
      });
    }, 420);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <SecHead num="→" title="showpiece: live stream analysis" hint="# JPEG-XS analyzer — auto-refreshing" />
      <div style={{
        border: '1px solid #1e1e1e', background: '#0a0a0a', borderRadius: 2, overflow: 'hidden',
      }}>
        <div style={{
          background: '#0f0f0f', padding: '10px 16px', fontSize: 11, color: '#666',
          borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 24,
        }}>
          <span><span style={{ color: '#00ff9c' }}>●</span> capturing</span>
          <span>interface: qsfp0</span>
          <span>filter: <span style={{ color: '#82aaff' }}>jpeg-xs || sdi || aes67</span></span>
          <span style={{ marginLeft: 'auto' }}>{packets.length} / ∞</span>
        </div>
        <div style={{ fontSize: 11.5, fontFamily: 'inherit' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '60px 110px 110px 110px 90px 1fr',
            padding: '8px 16px', color: '#555', borderBottom: '1px solid #1a1a1a',
          }}>
            <span>#</span><span>time</span><span>source</span><span>dest</span><span>proto</span><span>info</span>
          </div>
          <div style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
            {packets.map((p, i) => (
              <div key={p.n} style={{
                display: 'grid', gridTemplateColumns: '60px 110px 110px 110px 90px 1fr',
                padding: '5px 16px', color: '#aaa', fontSize: 11.5,
                background: i % 2 === 0 ? '#0c0c0c' : 'transparent',
                animation: i === packets.length - 1 ? 'slideIn 0.3s ease' : 'none',
              }}>
                <span style={{ color: '#555', fontVariantNumeric: 'tabular-nums' }}>{p.n}</span>
                <span style={{ color: '#666', fontVariantNumeric: 'tabular-nums' }}>{p.time}</span>
                <span style={{ color: '#888' }}>{p.src}</span>
                <span style={{ color: '#888' }}>{p.dst}</span>
                <span style={{ color: p.color, fontWeight: 500 }}>{p.proto}</span>
                <span style={{ color: '#ccc' }}>{p.info}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#555', marginTop: 10, marginLeft: 4 }}>
        ↑ This is the energy of the tool Teghveer built — except his reduced PM team analysis time by 60%.
      </div>
    </>
  );
}

// ─── Showpiece: Satellite orbital telemetry ─────────────────────────────
function SatelliteShowpiece() {
  const [t, setT] = useStateT(0);
  useEffectT(() => {
    const id = setInterval(() => setT(v => v + 1), 50);
    return () => clearInterval(id);
  }, []);

  const theta = (t * 0.015) % (Math.PI * 2);
  const orbitR = 140;
  const satX = 200 + Math.cos(theta) * orbitR;
  const satY = 180 + Math.sin(theta) * orbitR * 0.55;

  const telemetry = [
    { label: 'ADC_CH_0', val: (2.1 + Math.sin(t * 0.04) * 0.3).toFixed(3), unit: 'V' },
    { label: 'ADC_CH_1', val: (1.8 + Math.sin(t * 0.07 + 1) * 0.4).toFixed(3), unit: 'V' },
    { label: 'ADC_CH_2', val: (2.4 + Math.sin(t * 0.03 + 2) * 0.2).toFixed(3), unit: 'V' },
    { label: 'MUTEX_Q',  val: (t % 10), unit: 'obs' },
    { label: 'POLL_T',   val: '200', unit: 'ms' },
    { label: 'SPI_CLK',  val: '5.0',  unit: 'MHz' },
  ];

  return (
    <>
      <SecHead num="→" title="showpiece: PRESET telemetry simulation" hint="# real-time pub/sub" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ border: '1px solid #1e1e1e', background: '#0a0a0a', padding: 20, borderRadius: 2 }}>
          <div style={{ color: '#a78bfa', fontSize: 11, marginBottom: 14, letterSpacing: '0.08em' }}>
            ▸ ORBIT · LEO · 7.8 km/s
          </div>
          <svg viewBox="0 0 400 360" style={{ width: '100%', height: 'auto' }}>
            {/* stars */}
            {Array.from({ length: 40 }).map((_, i) => {
              const x = (i * 97) % 400, y = (i * 53) % 360;
              return <circle key={i} cx={x} cy={y} r="0.5" fill="#555" opacity={0.4 + (i % 5) * 0.1} />;
            })}
            {/* earth */}
            <defs>
              <radialGradient id="earth" cx="0.35" cy="0.35">
                <stop offset="0" stopColor="#1a2a4a" />
                <stop offset="1" stopColor="#050810" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="180" r="70" fill="url(#earth)" stroke="#223" strokeWidth="0.5" />
            {/* continents hint */}
            <path d="M 160 160 Q 180 150 200 165 Q 220 155 230 175 M 170 200 Q 190 195 210 210" stroke="#2a4a6a" strokeWidth="1" fill="none" opacity="0.6" />
            {/* orbit */}
            <ellipse cx="200" cy="180" rx={orbitR} ry={orbitR * 0.55} fill="none" stroke="#a78bfa44" strokeWidth="1" strokeDasharray="2 4" />
            {/* trail */}
            {Array.from({ length: 20 }).map((_, i) => {
              const tt = theta - i * 0.04;
              return <circle key={i}
                cx={200 + Math.cos(tt) * orbitR}
                cy={180 + Math.sin(tt) * orbitR * 0.55}
                r="1.2" fill="#a78bfa" opacity={1 - i / 20} />;
            })}
            {/* satellite */}
            <g transform={`translate(${satX}, ${satY})`}>
              <rect x="-5" y="-3" width="10" height="6" fill="#a78bfa" />
              <rect x="-14" y="-1.5" width="8" height="3" fill="#666" />
              <rect x="6" y="-1.5" width="8" height="3" fill="#666" />
              <circle r="12" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.3" />
              <circle r="18" fill="none" stroke="#a78bfa" strokeWidth="0.3" opacity="0.15" />
            </g>
            <text x={satX + 20} y={satY - 6} fill="#a78bfa" fontSize="9" fontFamily="JetBrains Mono, monospace">PRESET</text>
            {/* labels */}
            <text x="200" y="180" textAnchor="middle" fill="#555" fontSize="8" fontFamily="JetBrains Mono, monospace">EARTH</text>
            <text x="20" y="20" fill="#555" fontSize="9" fontFamily="JetBrains Mono, monospace">N 43.26° · W 79.92°</text>
            <text x="20" y="340" fill="#555" fontSize="9" fontFamily="JetBrains Mono, monospace">θ = {(theta * 180 / Math.PI).toFixed(1)}°</text>
          </svg>
        </div>
        <div style={{ border: '1px solid #1e1e1e', background: '#0a0a0a', padding: 20, borderRadius: 2 }}>
          <div style={{ color: '#a78bfa', fontSize: 11, marginBottom: 14, letterSpacing: '0.08em' }}>
            ▸ TELEMETRY · PUB/SUB · FreeRTOS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {telemetry.map(m => (
              <div key={m.label} style={{
                border: '1px solid #1a1a1a', padding: '10px 12px', borderRadius: 2,
                background: '#0c0c0c',
              }}>
                <div style={{ color: '#666', fontSize: 10, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 20, color: '#eee', fontVariantNumeric: 'tabular-nums' }}>
                  {m.val}<span style={{ color: '#555', fontSize: 11, marginLeft: 4 }}>{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: '#777' }}>
            <div>▸ VDED dispatcher: <span style={{ color: '#00ff9c' }}>running</span></div>
            <div>▸ observers: <span style={{ color: '#eee' }}>3 listeners · 2 subscribers · 5 msg subs</span></div>
            <div>▸ priority: <span style={{ color: '#eee' }}>inheritance enabled</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Showpiece: Racecar telemetry strip chart ──────────────────────────
function FormulaShowpiece() {
  const [t, setT] = useStateT(0);
  useEffectT(() => {
    const id = setInterval(() => setT(v => v + 1), 80);
    return () => clearInterval(id);
  }, []);

  const rpm = 5000 + Math.sin(t * 0.08) * 3500 + Math.sin(t * 0.02) * 1500;
  const speed = 40 + Math.sin(t * 0.05) * 55 + Math.sin(t * 0.03) * 20;
  const motorTemp = 65 + Math.sin(t * 0.01) * 8;
  const battV = 398 - Math.abs(Math.sin(t * 0.02)) * 6;

  const path = (amp, freq, off, y0) => {
    let d = `M 0 ${y0}`;
    for (let x = 0; x <= 400; x += 4) {
      const y = y0 + Math.sin((x + t * 2) * freq + off) * amp + Math.sin((x + t) * freq * 3) * amp * 0.3;
      d += ` L ${x} ${y}`;
    }
    return d;
  };

  return (
    <>
      <SecHead num="→" title="showpiece: racecar telemetry" hint="# on-track simulation" />
      <div style={{ border: '1px solid #1e1e1e', background: '#0a0a0a', padding: 20, borderRadius: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            { label: 'RPM', val: rpm.toFixed(0), max: '12000', color: '#f97316' },
            { label: 'SPEED', val: speed.toFixed(0), max: 'km/h', color: '#f97316' },
            { label: 'MOTOR°C', val: motorTemp.toFixed(1), max: 'max 90', color: '#00ff9c' },
            { label: 'HV BATT', val: battV.toFixed(1), max: 'volts', color: '#82aaff' },
          ].map(g => (
            <div key={g.label}>
              <div style={{ color: '#666', fontSize: 10, marginBottom: 4 }}>{g.label}</div>
              <div style={{ fontSize: 26, color: g.color, fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                {g.val}
              </div>
              <div style={{ color: '#555', fontSize: 10 }}>{g.max}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 400 160" style={{ width: '100%', height: 160, borderTop: '1px solid #1a1a1a' }}>
          <defs>
            <linearGradient id="rpm-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="1" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* grid */}
          {[30, 60, 90, 120].map(y => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#1a1a1a" />)}
          {/* rpm trace */}
          <path d={path(18, 0.03, 0, 50)} stroke="#f97316" fill="none" strokeWidth="1.2" />
          <path d={path(12, 0.025, 1, 90)} stroke="#82aaff" fill="none" strokeWidth="1" />
          <path d={path(8, 0.02, 2, 130)} stroke="#00ff9c" fill="none" strokeWidth="1" />
          <text x="4" y="12" fill="#555" fontSize="8" fontFamily="JetBrains Mono, monospace">can_bus: 1 Mbps · front_ctrl · stm32</text>
        </svg>
      </div>
    </>
  );
}

function TDShowpiece() {
  const [call, setCall] = useStateT(0);
  useEffectT(() => {
    const id = setInterval(() => setCall(v => v + 1), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <SecHead num="→" title="showpiece: graphql party api" hint="# US branch query" />
      <div style={{
        border: '1px solid #1e1e1e', background: '#0a0a0a', padding: 20, borderRadius: 2,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
      }}>
        <div>
          <div style={{ color: '#22c55e', fontSize: 11, marginBottom: 10 }}>▸ REQUEST</div>
          <pre style={{ color: '#ccc', fontSize: 11.5, lineHeight: 1.6, margin: 0 }}>
{`query GetParty {
  party(id: "us-br-${String(call % 9000 + 1000)}") {
    id
    displayName
    addresses {
      street
      city
      state
      zip
    }
    flags { retailFlow }
  }
}`}
          </pre>
        </div>
        <div>
          <div style={{ color: '#82aaff', fontSize: 11, marginBottom: 10 }}>
            ▸ RESPONSE <span style={{ color: '#555', marginLeft: 8 }}>200 OK · {(Math.random() * 40 + 80).toFixed(0)}ms</span>
          </div>
          <pre style={{ color: '#ccc', fontSize: 11.5, lineHeight: 1.6, margin: 0 }}>
{`{
  "data": {
    "party": {
      "id": "us-br-${String(call % 9000 + 1000)}",
      "displayName": "Doe, J.",
      "addresses": [
        { "street": "…", "city": "…",
          "state": "NY", "zip": "10001" }
      ],
      "flags": { "retailFlow": true }
    }
  }
}`}
          </pre>
        </div>
      </div>
    </>
  );
}

// ─── Living Résumé view ──────────────────────────────────────────────────
function TerminalResume({ data }) {
  return (
    <div style={termStyles.root}>
      <div style={{ ...termStyles.container, maxWidth: 900 }}>
        <div style={{ marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ fontSize: 11, color: '#666', marginBottom: 8, letterSpacing: '0.1em' }}>
            # DOCUMENT · TEGHVEER.RESUME · v2026.04
          </div>
          <div style={{ fontSize: 38, color: '#eee', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.02em' }}>
            {data.name}
          </div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 6 }}>
            {data.role} · {data.location}
          </div>
          <div style={{ marginTop: 14, color: '#aaa', maxWidth: 720, lineHeight: 1.65 }}>
            {data.summaryShort}
          </div>
        </div>

        <ResumeSection title="experience">
          {data.projects.filter(p => p.status !== undefined).map(p => (
            <div key={p.id} style={{ marginBottom: 26, paddingLeft: 16, borderLeft: `2px solid ${p.color}33` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ color: '#eee', fontWeight: 500 }}>{p.role}</span>
                  <span style={{ color: '#555' }}> @ </span>
                  <span style={{ color: p.color }}>{p.company}</span>
                </div>
                <span style={{ color: '#555', fontSize: 11 }}>{p.period} · {p.location}</span>
              </div>
              {p.oneLiner && <div style={{ color: '#999', marginTop: 6, fontSize: 12.5 }}>{p.oneLiner}</div>}
              <ul style={{ listStyle: 'none', marginTop: 10, color: '#aaa', fontSize: 12.5 }}>
                {(p.impact || []).slice(0, 3).map((imp, i) => (
                  <li key={i} style={{ marginBottom: 5, paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#444' }}>▸</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="education">
          {data.education.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ color: '#eee' }}>{e.degree}</div>
              <div style={{ color: '#888', fontSize: 12 }}>{e.school} · {e.period} · {e.location}</div>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="awards & certs">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12.5 }}>
            {[...data.awards, ...data.certifications].map((a, i) => (
              <div key={i} style={{ color: '#aaa' }}>
                <span style={{ color: '#00ff9c' }}>◆</span> {a}
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="contact">
          <ContactBlock links={data.links} />
        </ResumeSection>

        <div style={{ marginTop: 40, color: '#444', fontSize: 11, textAlign: 'center' }}>
          <span style={{ color: '#00ff9c' }}>$</span> EOF — pages rendered from live data · ∞ lines of experience
        </div>
      </div>
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        fontSize: 11, color: '#00ff9c', letterSpacing: '0.15em', marginBottom: 18,
        borderBottom: '1px dashed #222', paddingBottom: 8, textTransform: 'uppercase',
      }}>
        ── {title} ────────────────────────────────────────────
      </div>
      {children}
    </div>
  );
}

// ─── Root ───────────────────────────────────────────────────────────────
function DirectionTerminal({ view, data }) {
  if (view === 'site')   return <TerminalSite data={data} />;
  if (view === 'cases')  return <TerminalCases data={data} />;
  if (view === 'resume') return <TerminalResume data={data} />;
  return null;
}

// inject keyframes
const termCss = document.createElement('style');
termCss.textContent = `
  @keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
`;
document.head.appendChild(termCss);

window.DirectionTerminal = DirectionTerminal;
