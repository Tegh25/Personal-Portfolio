// Direction 03 — SCHEMATIC
// FPGA block-diagram aesthetic. Dark teal/slate, rigid grid, animated signal
// packets flowing between career "modules." This is the experimental direction.

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

const scStyles = {
  root: {
    minHeight: '100%', background: '#0a0f1c', color: '#cbd5e1',
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
    backgroundImage: `
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '24px 24px',
  },
  container: { maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' },
  mono: { fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace" },
  chip: {
    background: '#0f172a', border: '1px solid #1e293b', borderRadius: 2, padding: 16,
  },
  chipHead: {
    fontSize: 10, letterSpacing: '0.18em', color: '#64748b', textTransform: 'uppercase',
    borderBottom: '1px solid #1e293b', paddingBottom: 6, marginBottom: 10,
    fontFamily: "'IBM Plex Mono', monospace",
  },
  accent: '#60a5fa',
  green: '#34d399',
  amber: '#fbbf24',
  pink: '#f472b6',
  purple: '#c084fc',
};

// ─── Schematic corner marks ─────────────────────────────────────────────
const CornerMarks = () => (
  <>
    {[['tl', 'nwse', 8, 8], ['tr', 'nesw', 'calc(100% - 16px)', 8], ['bl', 'nesw', 8, 'calc(100% - 16px)'], ['br', 'nwse', 'calc(100% - 16px)', 'calc(100% - 16px)']].map(([id, , x, y]) => (
      <svg key={id} style={{ position: 'absolute', left: x, top: y, width: 8, height: 8, opacity: 0.5 }} viewBox="0 0 8 8">
        <path d="M 0 4 L 4 4 L 4 0 M 4 4 L 8 4 M 4 4 L 4 8" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
      </svg>
    ))}
  </>
);

// ─── Hero: schematic header with signal meter ──────────────────────────
function SchematicHero({ data }) {
  const [tick, setTick] = useStateS(0);
  useEffectS(() => { const id = setInterval(() => setTick(t => t + 1), 60); return () => clearInterval(id); }, []);

  return (
    <div style={{ position: 'relative', marginBottom: 32 }}>
      {/* Title bar */}
      <div className="sch-titlebar" style={{
        border: '1px solid #1e293b', background: '#0b1322',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'stretch',
        marginBottom: 24,
      }}>
        <div style={{ padding: '10px 16px', fontSize: 11, color: '#64748b', borderRight: '1px solid #1e293b', ...scStyles.mono }}>
          FILE: teghveer.sch
        </div>
        <div style={{ padding: '10px 24px', fontSize: 11, color: '#60a5fa', ...scStyles.mono, letterSpacing: '0.15em' }}>
          TEGHVEER_SINGH_ATELIEY · BLOCK DIAGRAM · v2026.04 · SHEET 1 OF 1
        </div>
        <div style={{ padding: '10px 16px', fontSize: 11, color: '#64748b', borderLeft: '1px solid #1e293b', textAlign: 'right', ...scStyles.mono }}>
          REV: A · SCALE: 1:1
        </div>
      </div>

      {/* Main hero block */}
      <div style={{
        border: '1px solid #1e293b', background: 'rgba(11,19,34,0.6)', position: 'relative',
        padding: '56px 40px',
      }}>
        <CornerMarks />
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ ...scStyles.mono, fontSize: 11, color: '#60a5fa', letterSpacing: '0.2em', marginBottom: 14 }}>
              ▸ U1 · TOP-LEVEL ENTITY
            </div>
            <h1 style={{
              fontSize: 'clamp(48px, 6.5vw, 92px)', lineHeight: 0.95, fontWeight: 600,
              color: '#f1f5f9', letterSpacing: '-0.03em', margin: 0,
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}>
              Engineer<br/>
              <span style={{ color: '#60a5fa' }}>across the stack.</span>
            </h1>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: '#94a3b8', marginTop: 24, maxWidth: 520,
            }}>
              From VHDL on an FPGA to firmware on a satellite to GraphQL in a bank — {data.short}'s work moves signal across every boundary between silicon and software.
            </p>

            {/* Status pins */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 32 }}>
              {[
                { label: 'FPGA', v: 'EVERTZ', color: '#60a5fa' },
                { label: 'FIRMWARE', v: 'PRESET', color: '#c084fc' },
                { label: 'VEHICLE', v: 'MAC FE', color: '#fbbf24' },
              ].map(pin => (
                <div key={pin.label} style={{ border: '1px solid #1e293b', padding: '10px 12px', background: '#0a1220' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 6, height: 6, background: pin.color, borderRadius: '50%',
                      boxShadow: `0 0 8px ${pin.color}`,
                      animation: 'scPulse 1.6s ease-in-out infinite',
                    }} />
                    <span style={{ ...scStyles.mono, fontSize: 9, color: '#64748b', letterSpacing: '0.15em' }}>
                      {pin.label}_ACTIVE
                    </span>
                  </div>
                  <div style={{ ...scStyles.mono, fontSize: 13, color: pin.color, marginTop: 4 }}>{pin.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Signal meter visualization */}
          <SchematicMeter tick={tick} />
        </div>
      </div>
    </div>
  );
}

function SchematicMeter({ tick }) {
  // Simple animated waveform per lane
  const lanes = [
    { label: 'CLK', color: '#60a5fa', pattern: 'square', freq: 0.15 },
    { label: 'VHDL', color: '#c084fc', pattern: 'data', freq: 0.08 },
    { label: 'SPI_MOSI', color: '#34d399', pattern: 'data', freq: 0.12 },
    { label: 'CAN_BUS', color: '#fbbf24', pattern: 'burst', freq: 0.1 },
    { label: 'HTTP/GQL', color: '#f472b6', pattern: 'burst', freq: 0.05 },
  ];

  const width = 480, rowH = 40, padL = 90;
  const height = lanes.length * rowH + 40;

  const path = (lane, i) => {
    let d = `M ${padL} ${i * rowH + 30}`;
    const mid = i * rowH + 30;
    const high = i * rowH + 18;
    for (let x = 0; x <= width - padL - 20; x += 2) {
      const t = (x + tick * 2) * lane.freq;
      let y;
      if (lane.pattern === 'square') {
        y = Math.sin(t) > 0 ? high : mid;
      } else if (lane.pattern === 'data') {
        // pseudo-random bitstream
        const bit = Math.sin(t) * Math.cos(t * 0.3) > 0;
        y = bit ? high : mid;
      } else { // burst
        const active = Math.sin(t * 0.3) > 0.2;
        y = active ? (Math.sin(t * 3) > 0 ? high : mid) : mid;
      }
      d += ` L ${padL + x} ${y}`;
    }
    return d;
  };

  return (
    <div style={{
      border: '1px solid #1e293b', background: '#050914', padding: 16, position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ ...scStyles.mono, fontSize: 10, color: '#60a5fa', letterSpacing: '0.18em' }}>
          ▸ TRACE · LOGIC ANALYZER
        </span>
        <span style={{ ...scStyles.mono, fontSize: 10, color: '#475569' }}>
          100 MSa/s · 5 ch · live
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* time grid */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={padL + i * 20} y1="10" x2={padL + i * 20} y2={height - 10}
            stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
        ))}
        {lanes.map((lane, i) => (
          <g key={lane.label}>
            <text x="8" y={i * rowH + 32} style={{ ...scStyles.mono, fontSize: 10, fill: lane.color, letterSpacing: '0.1em' }}>
              {lane.label}
            </text>
            <line x1={padL} y1={i * rowH + 30} x2={width - 20} y2={i * rowH + 30}
              stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1 2" />
            <path d={path(lane, i)} stroke={lane.color} strokeWidth="1.3" fill="none" />
          </g>
        ))}
        <text x={padL} y={height - 4} style={{ ...scStyles.mono, fontSize: 9, fill: '#475569' }}>
          t → {tick} ticks
        </text>
      </svg>
    </div>
  );
}

// ─── Signal flow: animated packets moving between career modules ────────
function SignalFlowShowpiece({ data }) {
  // Layout: 4 modules in a row, packets flow rightward between them
  const [packets, setPackets] = useStateS([]);
  const pidRef = useRefS(0);

  const modules = [
    { id: 'evertz',  x:  60, y: 110, w: 220, h: 120, color: '#60a5fa', title: 'EVERTZ',  sub: 'FPGA · VHDL',        pins: ['VIDEO_IN', 'AUDIO', 'ETH'] },
    { id: 'preset',  x: 340, y: 110, w: 220, h: 120, color: '#c084fc', title: 'PRESET',  sub: 'FreeRTOS · FreeAct', pins: ['ADC', 'SPI', 'PUB/SUB'] },
    { id: 'formula', x: 620, y: 110, w: 220, h: 120, color: '#fbbf24', title: 'FORMULA', sub: 'STM32 · C++',        pins: ['CAN', 'MOTOR', 'BMS'] },
    { id: 'td',      x: 900, y: 110, w: 220, h: 120, color: '#34d399', title: 'TD',      sub: 'GraphQL · React',    pins: ['API', 'SQL', 'UI'] },
  ];

  useEffectS(() => {
    const id = setInterval(() => {
      setPackets(prev => {
        pidRef.current += 1;
        const src = Math.floor(Math.random() * 3);
        const labels = [
          'video_frame', 'telemetry', 'spi_msg', 'can_frame', 'gql_query',
          'adc_sample', 'vhdl_sim', 'bash_build', 'party_update', 'buf_depth',
        ];
        const next = {
          id: pidRef.current,
          from: src,
          to: src + 1,
          label: labels[Math.floor(Math.random() * labels.length)],
          progress: 0,
        };
        return [...prev.filter(p => p.progress < 1), next];
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  useEffectS(() => {
    const id = setInterval(() => {
      setPackets(prev => prev.map(p => ({ ...p, progress: p.progress + 0.02 })).filter(p => p.progress < 1.1));
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      border: '1px solid #1e293b', background: '#0a1220', padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <CornerMarks />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ ...scStyles.mono, fontSize: 10, color: '#60a5fa', letterSpacing: '0.18em', marginBottom: 4 }}>
            ▸ CAREER_BUS · 4-MODULE PIPELINE
          </div>
          <div style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 500 }}>
            Every role feeds the next.
          </div>
        </div>
        <div style={{ ...scStyles.mono, fontSize: 10, color: '#64748b', textAlign: 'right' }}>
          LIVE · {packets.length} pkt in flight<br/>
          {pidRef.current} total
        </div>
      </div>

      <svg viewBox="0 0 1180 360" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* bus line */}
        <line x1="30" y1="170" x2="1150" y2="170" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 3" />

        {/* connections */}
        {modules.slice(0, -1).map((m, i) => {
          const next = modules[i + 1];
          const x1 = m.x + m.w, x2 = next.x;
          return (
            <g key={'conn-' + i}>
              <line x1={x1} y1={m.y + m.h / 2} x2={x2} y2={m.y + m.h / 2}
                stroke="#1e293b" strokeWidth="2" />
              <line x1={x1} y1={m.y + m.h / 2} x2={x2} y2={m.y + m.h / 2}
                stroke={m.color} strokeWidth="1" opacity="0.3" />
              <polygon points={`${x2 - 6},${m.y + m.h / 2 - 4} ${x2},${m.y + m.h / 2} ${x2 - 6},${m.y + m.h / 2 + 4}`}
                fill={m.color} opacity="0.6" />
            </g>
          );
        })}

        {/* modules */}
        {modules.map((m, i) => (
          <g key={m.id}>
            {/* chip body */}
            <rect x={m.x} y={m.y} width={m.w} height={m.h} fill="#0b1322" stroke={m.color} strokeWidth="1" />
            <rect x={m.x + 4} y={m.y + 4} width={m.w - 8} height={m.h - 8} fill="none" stroke="#1e293b" strokeWidth="0.3" />
            {/* corner marks */}
            {[[0,0],[1,0],[0,1],[1,1]].map(([cx, cy], j) => (
              <circle key={j} cx={m.x + (cx ? m.w - 8 : 8)} cy={m.y + (cy ? m.h - 8 : 8)} r="1.5" fill={m.color} />
            ))}
            {/* label */}
            <text x={m.x + m.w / 2} y={m.y + 32} textAnchor="middle"
              style={{ ...scStyles.mono, fontSize: 16, fill: m.color, letterSpacing: '0.12em', fontWeight: 600 }}>
              {m.title}
            </text>
            <text x={m.x + m.w / 2} y={m.y + 52} textAnchor="middle"
              style={{ ...scStyles.mono, fontSize: 10, fill: '#64748b', letterSpacing: '0.1em' }}>
              U{i + 1}
            </text>
            <line x1={m.x + 30} y1={m.y + 62} x2={m.x + m.w - 30} y2={m.y + 62} stroke="#1e293b" strokeWidth="0.5" />
            <text x={m.x + m.w / 2} y={m.y + 80} textAnchor="middle"
              style={{ ...scStyles.mono, fontSize: 10, fill: '#94a3b8' }}>
              {m.sub}
            </text>
            {/* pins */}
            {m.pins.map((pin, j) => (
              <g key={pin}>
                <line x1={m.x} y1={m.y + 95 + j * 8} x2={m.x - 8} y2={m.y + 95 + j * 8}
                  stroke={m.color} strokeWidth="0.8" />
                <text x={m.x + 6} y={m.y + 98 + j * 8}
                  style={{ ...scStyles.mono, fontSize: 7, fill: '#64748b', letterSpacing: '0.08em' }}>
                  {pin}
                </text>
              </g>
            ))}

            {/* label above */}
            <text x={m.x} y={m.y - 10} style={{ ...scStyles.mono, fontSize: 9, fill: '#475569', letterSpacing: '0.12em' }}>
              N°{String(i + 1).padStart(2, '0')}
            </text>
          </g>
        ))}

        {/* animated packets */}
        {packets.map(p => {
          if (p.from >= modules.length - 1) return null;
          const m1 = modules[p.from];
          const m2 = modules[p.to];
          const x1 = m1.x + m1.w, x2 = m2.x;
          const y = m1.y + m1.h / 2;
          const x = x1 + (x2 - x1) * p.progress;
          const opacity = p.progress > 0.9 ? (1 - p.progress) * 10 : 1;
          return (
            <g key={p.id} opacity={opacity}>
              <rect x={x - 18} y={y - 8} width="36" height="16" fill="#0a1220" stroke={m1.color} strokeWidth="0.8" />
              <text x={x} y={y + 3} textAnchor="middle"
                style={{ ...scStyles.mono, fontSize: 7, fill: m1.color, letterSpacing: '0.05em' }}>
                {p.label}
              </text>
            </g>
          );
        })}

        {/* legend / scale */}
        <g transform="translate(30, 290)">
          <text style={{ ...scStyles.mono, fontSize: 9, fill: '#475569', letterSpacing: '0.1em' }}>
            ▸ TIMELINE · 2022 ─ 2026
          </text>
          {[
            { x: 60, y: 20, label: '2022', note: 'TD BSA' },
            { x: 260, y: 20, label: '2023', note: 'PRESET + TD SWE' },
            { x: 580, y: 20, label: '2024', note: 'F.E. deep-in' },
            { x: 880, y: 20, label: '2025', note: 'EVERTZ start' },
            { x: 1080, y: 20, label: '2026', note: 'now' },
          ].map(t => (
            <g key={t.label} transform={`translate(${t.x}, ${t.y})`}>
              <line x1="0" y1="0" x2="0" y2="-6" stroke="#475569" strokeWidth="0.5" />
              <text y="12" style={{ ...scStyles.mono, fontSize: 9, fill: '#94a3b8' }}>{t.label}</text>
              <text y="24" style={{ ...scStyles.mono, fontSize: 8, fill: '#475569' }}>{t.note}</text>
            </g>
          ))}
          <line x1="0" y1="0" x2="1120" y2="0" stroke="#1e293b" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

// ─── Site view ─────────────────────────────────────────────────────────
function SchematicSite({ data }) {
  return (
    <div style={scStyles.root}>
      <div style={scStyles.container}>
        <SchematicHero data={data} />

        {/* Showpiece: signal flow */}
        <ScSectionLabel num="01" title="signal_flow" sub="career as a 4-module pipeline" />
        <SignalFlowShowpiece data={data} />

        {/* Summary as doc block */}
        <ScSectionLabel num="02" title="readme.md" sub="the human part" />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div style={{ ...scStyles.chip, padding: '24px 28px' }}>
            <div style={scStyles.chipHead}>// overview</div>
            {data.summary.map((p, i) => (
              <p key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.65, marginBottom: 12 }}>
                {p}
              </p>
            ))}
          </div>
          <div style={scStyles.chip}>
            <div style={scStyles.chipHead}>// status</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 12 }}>
              {[
                ['school', 'McMaster'],
                ['program', 'Mechatronics'],
                ['year', '2021 — 2028'],
                ['clocked in', '3 roles'],
                ['awards', '5'],
                ['certs', '5'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ ...scStyles.mono, fontSize: 9, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ color: '#f1f5f9', marginTop: 2, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ ...scStyles.mono, fontSize: 10, color: '#34d399', marginTop: 16, paddingTop: 12, borderTop: '1px solid #1e293b' }}>
              ◉ STATUS: available · 2026 co-op / new grad
            </div>
          </div>
        </div>

        {/* Project index as chip grid */}
        <ScSectionLabel num="03" title="project_index" sub={`${data.projects.length} modules`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {data.projects.map(p => <ScProjectChip key={p.id} p={p} />)}
        </div>

        {/* Skills bus map */}
        <ScSectionLabel num="04" title="tool_bus" sub="instruments & libraries" />
        <ScSkillsBus data={data} />

        {/* Awards & certs */}
        <ScSectionLabel num="05" title="credentials.dat" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={scStyles.chip}>
            <div style={scStyles.chipHead}>// honors</div>
            {data.awards.map((a, i) => (
              <div key={i} style={{ fontSize: 13, color: '#cbd5e1', padding: '5px 0', borderBottom: '0.5px solid #1e293b', display: 'flex', gap: 10 }}>
                <span style={{ color: '#fbbf24', ...scStyles.mono, fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</span>
                {a}
              </div>
            ))}
          </div>
          <div style={scStyles.chip}>
            <div style={scStyles.chipHead}>// certifications</div>
            {data.certifications.map((c, i) => (
              <div key={i} style={{ fontSize: 13, color: '#cbd5e1', padding: '5px 0', borderBottom: '0.5px solid #1e293b', display: 'flex', gap: 10 }}>
                <span style={{ color: '#34d399', ...scStyles.mono, fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <ScSectionLabel num="06" title="io_ports" />
        <ScContact data={data} />

        <div style={{ marginTop: 60, textAlign: 'center', ...scStyles.mono, fontSize: 10, color: '#334155', letterSpacing: '0.2em' }}>
          ── END OF SHEET · REV A · © 2026 T.S.A. ──
        </div>
      </div>
    </div>
  );
}

function ScSectionLabel({ num, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, margin: '48px 0 20px', borderBottom: '1px solid #1e293b', paddingBottom: 10 }}>
      <span style={{ ...scStyles.mono, fontSize: 10, color: '#475569', letterSpacing: '0.2em' }}>
        § {num}
      </span>
      <span style={{ ...scStyles.mono, fontSize: 14, color: '#f1f5f9', letterSpacing: '0.08em', fontWeight: 500 }}>
        {title}
      </span>
      {sub && <span style={{ ...scStyles.mono, fontSize: 11, color: '#64748b', marginLeft: 'auto' }}>
        ▸ {sub}
      </span>}
    </div>
  );
}

function ScProjectChip({ p }) {
  return (
    <div style={{ ...scStyles.chip, position: 'relative', overflow: 'hidden' }}>
      {/* top stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.color }} />
      {/* pin dots */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 3 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1e293b' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1e293b' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
        <span style={{ ...scStyles.mono, fontSize: 9, color: p.color, letterSpacing: '0.15em' }}>
          [{p.tag}]
        </span>
        <span style={{ ...scStyles.mono, fontSize: 9, color: '#475569', marginLeft: 'auto' }}>
          {p.period}
        </span>
      </div>

      <div style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 500, marginBottom: 2 }}>{p.company}</div>
      <div style={{ color: '#64748b', fontSize: 12, marginBottom: 10, ...scStyles.mono }}>{p.role}</div>

      <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
        {p.oneLiner}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {(p.stack || []).slice(0, 6).map(s => (
          <span key={s} style={{
            ...scStyles.mono, fontSize: 10, color: '#94a3b8', background: '#0a1220',
            border: '1px solid #1e293b', padding: '3px 7px',
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function ScSkillsBus({ data }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
      {Object.entries(data.skills).map(([cat, list], i) => {
        const color = ['#60a5fa', '#c084fc', '#34d399', '#fbbf24', '#f472b6'][i % 5];
        return (
          <div key={cat} style={{ ...scStyles.chip, borderLeft: `2px solid ${color}` }}>
            <div style={{ ...scStyles.chipHead, color }}>{cat}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {list.map(s => (
                <span key={s} style={{
                  ...scStyles.mono, fontSize: 11, color: '#cbd5e1',
                  border: '1px solid #1e293b', padding: '3px 8px',
                }}>{s}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ScContact({ data }) {
  const ports = [
    { name: 'LINKEDIN', val: data.links.linkedin, color: '#60a5fa' },
    { name: 'EMAIL', val: data.links.email, color: '#34d399' },
    { name: 'LOC', val: data.links.location, color: '#fbbf24' },
    { name: 'STATUS', val: '◉ available for 2026', color: '#f472b6' },
  ];
  return (
    <div style={{ ...scStyles.chip, padding: 0 }}>
      {ports.map((p, i) => (
        <div key={p.name} style={{
          display: 'grid', gridTemplateColumns: '60px 120px 1fr 40px',
          padding: '14px 18px', borderBottom: i < ports.length - 1 ? '1px solid #1e293b' : 'none',
          alignItems: 'center', gap: 20,
        }}>
          <span style={{ ...scStyles.mono, fontSize: 10, color: '#475569' }}>P{i + 1}</span>
          <span style={{ ...scStyles.mono, fontSize: 11, color: p.color, letterSpacing: '0.1em' }}>{p.name}</span>
          <span style={{ color: '#f1f5f9', fontSize: 14 }}>{p.val}</span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, boxShadow: `0 0 8px ${p.color}`, justifySelf: 'end' }} />
        </div>
      ))}
    </div>
  );
}

// ─── Case Studies view — detailed block diagram per project ────────────
function SchematicCases({ data }) {
  const cases = data.projects.filter(p => ['evertz', 'preset', 'formula', 'td-swe'].includes(p.id));
  const [active, setActive] = useStateS(cases[0].id);
  const cur = cases.find(c => c.id === active);

  return (
    <div style={scStyles.root}>
      <div style={scStyles.container}>
        <div className="case-tabs-row" style={{ display: 'flex', gap: 2, marginBottom: 24, border: '1px solid #1e293b' }}>
          {cases.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              flex: 1, background: active === c.id ? c.color + '22' : '#0b1322',
              borderTop: `2px solid ${active === c.id ? c.color : 'transparent'}`,
              border: 'none', borderBottom: 'none', padding: '14px 18px',
              cursor: 'pointer', textAlign: 'left',
              color: active === c.id ? '#f1f5f9' : '#94a3b8',
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}>
              <div style={{ ...scStyles.mono, fontSize: 9, color: c.color, letterSpacing: '0.15em' }}>
                [{c.tag}]
              </div>
              <div style={{ fontSize: 15, marginTop: 4 }}>{c.company}</div>
              <div style={{ ...scStyles.mono, fontSize: 10, color: '#64748b', marginTop: 2 }}>{c.role}</div>
            </button>
          ))}
        </div>

        <ScCaseDetail p={cur} />
      </div>
    </div>
  );
}

function ScCaseDetail({ p }) {
  const PixelIcon = {
    'evertz': <PixelCamera size={90} />,
    'preset': <PixelSatellite size={90} />,
    'formula': <PixelRacecar size={140} />,
    'td-swe': <PixelFPGA size={80} accent={p.color} animate={true} />,
  }[p.id];

  return (
    <>
      {/* Header block */}
      <div style={{ border: '1px solid #1e293b', background: '#0b1322', padding: 32, marginBottom: 20, position: 'relative' }}>
        <CornerMarks />
        {PixelIcon && (
          <div className="case-pixel-icon" style={{ position: 'absolute', top: 20, right: 24, opacity: 0.95 }}>
            {PixelIcon}
          </div>
        )}
        <div style={{ ...scStyles.mono, fontSize: 11, color: p.color, letterSpacing: '0.2em', marginBottom: 12 }}>
          ▸ DESIGN · {p.tag} · {p.period}
        </div>
        <h1 style={{
          color: '#f1f5f9', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1,
          fontWeight: 500, marginBottom: 16, letterSpacing: '-0.02em',
          paddingRight: PixelIcon ? (p.id === 'formula' ? 160 : 110) : 0,
        }}>
          {p.oneLiner}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, maxWidth: 800 }}>
          {p.domain}
        </p>
        {p.metrics && (
          <div style={{ display: 'flex', gap: 40, marginTop: 28, flexWrap: 'wrap', borderTop: '1px solid #1e293b', paddingTop: 20 }}>
            {p.metrics.map(m => (
              <div key={m.label}>
                <div style={{ fontSize: 38, color: p.color, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>{m.value}</div>
                <div style={{ ...scStyles.mono, fontSize: 10, color: '#64748b', letterSpacing: '0.15em', marginTop: 6, textTransform: 'uppercase' }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stack as pin-list */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
        <div style={scStyles.chip}>
          <div style={scStyles.chipHead}>// pinout</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {p.stack.map((s, i) => (
              <div key={s} style={{
                display: 'grid', gridTemplateColumns: '30px 1fr 12px', alignItems: 'center', gap: 8,
                padding: '6px 8px', background: '#0a1220', border: '1px solid #1e293b',
              }}>
                <span style={{ ...scStyles.mono, fontSize: 9, color: '#475569' }}>P{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 12, color: '#cbd5e1' }}>{s}</span>
                <span style={{ width: 8, height: 8, background: p.color, borderRadius: '50%', boxShadow: `0 0 6px ${p.color}` }} />
              </div>
            ))}
          </div>
        </div>

        <div style={scStyles.chip}>
          <div style={scStyles.chipHead}>// impact_log — {p.impact.length} entries</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, lineHeight: 1.6 }}>
            {p.impact.map((imp, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10, padding: '8px 0', borderBottom: '0.5px solid #1e293b' }}>
                <span style={{ color: p.color, fontVariantNumeric: 'tabular-nums' }}>[{String(i).padStart(3, '0')}]</span>
                <span style={{ color: '#cbd5e1' }}>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Living Résumé — schematic datasheet ───────────────────────────────
function SchematicResume({ data }) {
  return (
    <div style={scStyles.root}>
      <div style={{ ...scStyles.container, maxWidth: 1000 }}>
        {/* Datasheet header */}
        <div style={{ border: '1px solid #1e293b', background: '#0b1322', marginBottom: 20 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #1e293b' }}>
            <div style={{ padding: '8px 14px', ...scStyles.mono, fontSize: 10, color: '#475569', letterSpacing: '0.15em', flex: 1 }}>
              DATASHEET · TEGHVEER_SINGH_ATELIEY · U1
            </div>
            <div style={{ padding: '8px 14px', ...scStyles.mono, fontSize: 10, color: '#475569' }}>
              P. 1 / 1 · REV A
            </div>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
              <div>
                <div style={{ ...scStyles.mono, fontSize: 11, color: '#60a5fa', letterSpacing: '0.2em', marginBottom: 8 }}>▸ DEVICE</div>
                <h1 style={{ color: '#f1f5f9', fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>
                  {data.name}
                </h1>
                <div style={{ ...scStyles.mono, fontSize: 12, color: '#94a3b8' }}>
                  {data.role} · {data.location}
                </div>
                <p style={{ marginTop: 20, color: '#cbd5e1', fontSize: 14, lineHeight: 1.65, maxWidth: 520 }}>
                  {data.summaryShort}
                </p>
              </div>
              <div>
                <div style={{ ...scStyles.mono, fontSize: 11, color: '#60a5fa', letterSpacing: '0.2em', marginBottom: 8 }}>▸ FEATURES</div>
                <ul style={{ listStyle: 'none', padding: 0, ...scStyles.mono, fontSize: 12, color: '#cbd5e1', lineHeight: 1.8 }}>
                  <li>▪ 3 concurrent engineering roles</li>
                  <li>▪ FPGA · VHDL · firmware-rated</li>
                  <li>▪ Pub/sub + priority-inheritance</li>
                  <li>▪ GraphQL · React · Docker</li>
                  <li>▪ Low quiescent bug count</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <ScSectionLabel num="§1" title="operating_history" />
        <div style={{ border: '1px solid #1e293b' }}>
          {data.projects.filter(p => p.status).map((p, i) => (
            <div key={p.id} style={{
              display: 'grid', gridTemplateColumns: '14px 1fr', gap: 0,
              borderBottom: i < 7 ? '1px solid #1e293b' : 'none',
            }}>
              <div style={{ background: p.color, width: 3 }} />
              <div style={{ padding: '16px 20px', background: '#0b1322' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 500 }}>{p.role}</span>
                    <span style={{ color: '#475569', margin: '0 10px' }}>→</span>
                    <span style={{ color: p.color, fontSize: 15 }}>{p.company}</span>
                  </div>
                  <span style={{ ...scStyles.mono, fontSize: 11, color: '#64748b' }}>
                    {p.period} · {p.location}
                  </span>
                </div>
                {p.oneLiner && <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{p.oneLiner}</div>}
                <ul style={{ listStyle: 'none', marginTop: 10, padding: 0 }}>
                  {(p.impact || []).slice(0, 3).map((imp, j) => (
                    <li key={j} style={{
                      ...scStyles.mono, fontSize: 11.5, color: '#cbd5e1', lineHeight: 1.55,
                      marginBottom: 4, paddingLeft: 16, position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: p.color }}>▸</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <ScSectionLabel num="§2" title="provenance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {data.education.map(e => (
            <div key={e.school} style={scStyles.chip}>
              <div style={scStyles.chipHead}>{e.period}</div>
              <div style={{ color: '#f1f5f9', fontSize: 15 }}>{e.degree}</div>
              <div style={{ ...scStyles.mono, color: '#94a3b8', fontSize: 11, marginTop: 4 }}>{e.school}</div>
              <div style={{ ...scStyles.mono, color: '#64748b', fontSize: 10, marginTop: 2 }}>{e.location}</div>
            </div>
          ))}
        </div>

        {/* Awards + certs grid */}
        <ScSectionLabel num="§3" title="ratings" sub="awards & certifications" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={scStyles.chip}>
            <div style={scStyles.chipHead}>awards</div>
            {data.awards.map(a => (
              <div key={a} style={{ ...scStyles.mono, fontSize: 11.5, color: '#cbd5e1', padding: '5px 0', borderBottom: '0.5px dotted #1e293b' }}>
                <span style={{ color: '#fbbf24' }}>◆</span> {a}
              </div>
            ))}
          </div>
          <div style={scStyles.chip}>
            <div style={scStyles.chipHead}>certs</div>
            {data.certifications.map(c => (
              <div key={c} style={{ ...scStyles.mono, fontSize: 11.5, color: '#cbd5e1', padding: '5px 0', borderBottom: '0.5px dotted #1e293b' }}>
                <span style={{ color: '#34d399' }}>◆</span> {c}
              </div>
            ))}
          </div>
        </div>

        <ScSectionLabel num="§4" title="io_ports" />
        <ScContact data={data} />

        <div style={{ marginTop: 40, textAlign: 'center', ...scStyles.mono, fontSize: 10, color: '#334155', letterSpacing: '0.25em' }}>
          ── END OF DATASHEET ──
        </div>
      </div>
    </div>
  );
}

function DirectionSchematic({ view, data }) {
  if (view === 'site')   return <SchematicSite data={data} />;
  if (view === 'cases')  return <SchematicCases data={data} />;
  if (view === 'resume') return <SchematicResume data={data} />;
  return null;
}

// inject keyframes
const scCss = document.createElement('style');
scCss.textContent = `
  @keyframes scPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.85); }
  }
`;
document.head.appendChild(scCss);

window.DirectionSchematic = DirectionSchematic;
