// Direction 02 — EDITORIAL
// Cream paper, serif, art-director portfolio. Showpiece: orbital satellite
// diagram that traces as you scroll, plus hand-drawn rules and drop caps.

const { useState: useStateE, useEffect: useEffectE, useRef: useRefE } = React;

const edStyles = {
  root: {
    minHeight: '100%', background: '#f4f0e7', color: '#1a1a1a',
    fontFamily: "'Fraunces', Georgia, serif",
  },
  container: { maxWidth: 1120, margin: '0 auto', padding: '64px 40px 120px' },
  eyebrow: {
    fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: '#8b3a1f',
  },
  rule: { borderTop: '1px solid #1a1a1a', height: 0, margin: '28px 0' },
  ruleThin: { borderTop: '0.5px solid #1a1a1a44', height: 0, margin: '20px 0' },
};

// ─── Hero: magazine cover ──────────────────────────────────────────────
function EditorialHero({ data }) {
  return (
    <div style={{ position: 'relative', marginBottom: 80 }}>
      <div className="ed-cover-eyebrow" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40 }}>
        <div style={edStyles.eyebrow}>
          Vol. XXVI · No. 04 · Portfolio Issue
        </div>
        <div style={{ ...edStyles.eyebrow, color: '#1a1a1a' }}>
          Spring 2026 · Single Copy · Hamilton
        </div>
      </div>
      <div style={{ borderTop: '3px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '4px 0' }}>
        <div style={{ borderTop: '1px solid #1a1a1a', borderBottom: '3px solid #1a1a1a', padding: '20px 0' }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 'clamp(64px, 11vw, 168px)',
            fontWeight: 500, lineHeight: 1, letterSpacing: '-0.035em',
            margin: 0, textAlign: 'center', fontVariationSettings: '"opsz" 144',
          }}>
            Teghveer
          </h1>
          <div style={{
            textAlign: 'center', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
            fontSize: 'clamp(22px, 2.5vw, 36px)', color: '#1a1a1a', marginTop: 18, lineHeight: 1.1,
          }}>
            Singh&nbsp;·&nbsp;Ateliey
          </div>
        </div>
      </div>

      <div className="ed-masthead-row" style={{
        display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 32,
        marginTop: 40, alignItems: 'start',
      }}>
        <div>
          <div style={edStyles.eyebrow}>The Engineer</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, color: '#333' }}>
            A Mechatronics Engineering student at McMaster, writing <em>VHDL for broadcast FPGAs</em>, <em>firmware for a satellite</em>, and <em>vehicle software for a Formula Electric racecar</em> — all at once.
          </div>
        </div>
        <div>
          <div style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 3vw, 40px)',
            lineHeight: 1.12, color: '#1a1a1a', fontStyle: 'italic', textAlign: 'center',
          }}>
            "I build the things that carry&nbsp;signal between the physical and the&nbsp;digital."
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={edStyles.eyebrow}>Now Reading</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, color: '#333' }}>
            Inside — an FPGA that reduced broadcast-analyst workload 60%, a real-time publish-subscribe system built on FreeRTOS, and a racecar that taught a bash script to ship firmware.
          </div>
        </div>
      </div>

      {/* pixel motif — stacked project icons replacing crosshair */}
      <div style={{ position: 'absolute', top: 40, right: -8, opacity: 0.95 }}>
        <PixelStack size={120} />
      </div>
    </div>
  );
}

// ─── Section rule with roman numeral ────────────────────────────────────
function EdSectionRule({ num, title, sub }) {
  return (
    <div style={{ margin: '64px 0 28px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid #1a1a1a', paddingBottom: 8,
      }}>
        <span style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: '#8b3a1f',
        }}>{num}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>{title}</span>
        {sub && <span style={{
          marginLeft: 'auto', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
          fontSize: 16, color: '#666',
        }}>{sub}</span>}
      </div>
    </div>
  );
}

// ─── Personal site view ────────────────────────────────────────────────
function EditorialSite({ data }) {
  return (
    <div style={edStyles.root}>
      <div style={edStyles.container}>
        <EditorialHero data={data} />

        {/* Letter from the engineer */}
        <EdSectionRule num="I" title="Letter from the engineer" sub="on first principles" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#1a1a1a' }}>
              <span style={{
                fontFamily: "'Fraunces', serif", fontSize: 72, float: 'left',
                lineHeight: 0.85, marginRight: 10, marginTop: 6, color: '#8b3a1f',
                fontWeight: 500,
              }}>T</span>
              echnology touches every part of our lives. It brings us from A to B on roads, connects us to anyone else on the planet, and lets us design and imagine like never before. Ever since I was a little kid discovering the world, I knew I wanted to build the technology of tomorrow.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#333', marginTop: 16 }}>
              I'm currently in the Mechatronics Engineering &amp; Society program at McMaster. My work spans three very different disciplines — high-speed digital logic at Evertz, payload firmware on the PRESET satellite, and vehicle software on MAC Formula Electric — but they all share the same instinct: make the signal flow cleanly from the physical world into something a human can reason about.
            </p>
          </div>
          <div>
            <div style={{
              background: '#1a1a1a', color: '#f4f0e7', padding: '32px 28px',
              fontFamily: "'Instrument Serif', serif", fontSize: 22, lineHeight: 1.35,
              fontStyle: 'italic',
            }}>
              “Three concurrent engineering roles, one student, zero dropped builds.”
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontStyle: 'normal', fontSize: 10,
                letterSpacing: '0.18em', marginTop: 20, color: '#f4f0e7aa',
              }}>
                — OBSERVED, APRIL 2026
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
              {data.topSkills.map((s, i) => (
                <div key={s} style={{
                  borderBottom: '1px dotted #1a1a1a44', paddingBottom: 6,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
                }}>
                  <span style={{ color: '#8b3a1f' }}>0{i + 1} · </span>{s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected works */}
        <EdSectionRule num="II" title="Selected works" sub="2021 — present" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 36 }}>
          {data.projects.slice(0, 4).map((p, i) => (
            <EdFeatureCard key={p.id} p={p} idx={i} />
          ))}
        </div>

        {/* Showpiece: orbital diagram */}
        <EdSectionRule num="III" title="Feature" sub="The PRESET satellite, in orbit" />
        <OrbitalShowpiece />

        {/* Index of experience */}
        <EdSectionRule num="IV" title="Index of experience" sub="a complete ledger" />
        <EdIndex data={data} />

        {/* Skills and tools */}
        <EdSectionRule num="V" title="Instruments" sub="tools of the trade" />
        <EdInstruments data={data} />

        {/* Awards / education */}
        <EdSectionRule num="VI" title="Honors &amp; schooling" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: '#8b3a1f', marginBottom: 14 }}>
              EDUCATION
            </div>
            {data.education.map((e, i) => (
              <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '0.5px solid #1a1a1a33' }}>
                <div style={{ fontSize: 17 }}>{e.degree}</div>
                <div style={{ fontStyle: 'italic', color: '#666', fontFamily: "'Instrument Serif', serif", fontSize: 16 }}>
                  {e.school}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#999', marginTop: 4 }}>
                  {e.period} · {e.location}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: '#8b3a1f', marginBottom: 14 }}>
              HONORS &amp; AWARDS
            </div>
            {data.awards.map((a, i) => (
              <div key={i} style={{ fontSize: 15, marginBottom: 10, display: 'flex', gap: 12 }}>
                <span style={{ color: '#8b3a1f', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{a}</span>
              </div>
            ))}
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: '#8b3a1f', margin: '28px 0 12px' }}>
              CERTIFICATIONS
            </div>
            {data.certifications.map((c, i) => (
              <div key={i} style={{ fontSize: 13, color: '#444', marginBottom: 5 }}>— {c}</div>
            ))}
          </div>
        </div>

        {/* Masthead / colophon / contact */}
        <EdSectionRule num="VII" title="Colophon" sub="how to reach" />
        <EdColophon data={data} />
      </div>
    </div>
  );
}

function EdFeatureCard({ p, idx }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: '1px solid #1a1a1a',
        paddingBottom: 10, marginBottom: 16,
      }}>
        <span style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 32, color: '#8b3a1f',
        }}>
          N°{String(idx + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em',
          color: '#666',
        }}>
          {p.tag} · {p.period.split(' — ')[0]}
        </span>
      </div>
      <h3 style={{
        fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, lineHeight: 1.1,
        marginBottom: 10, letterSpacing: '-0.01em',
      }}>
        {p.company}
      </h3>
      <div style={{
        fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18,
        color: '#666', marginBottom: 14,
      }}>
        {p.role}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: '#333', marginBottom: 16 }}>
        {p.oneLiner}
      </p>
      {p.metrics && (
        <div style={{ display: 'flex', gap: 24, borderTop: '0.5px solid #1a1a1a33', paddingTop: 14 }}>
          {p.metrics.slice(0, 3).map(m => (
            <div key={m.label}>
              <div style={{
                fontFamily: "'Fraunces', serif", fontSize: 26, color: '#1a1a1a', lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, letterSpacing: '0.12em',
                color: '#8b3a1f', marginTop: 4, textTransform: 'uppercase',
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Orbital showpiece with scroll-traced path
function OrbitalShowpiece() {
  const [progress, setProgress] = useStateE(0);
  const containerRef = useRefE(null);

  useEffectE(() => {
    const stage = document.querySelector('.stage');
    if (!stage || !containerRef.current) return;
    const onScroll = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      // 0 when top of container is at bottom, 1 when bottom hits top
      const total = rect.height + stageRect.height;
      const traveled = stageRect.bottom - rect.top;
      setProgress(Math.max(0, Math.min(1, traveled / total)));
    };
    onScroll();
    stage.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { stage.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  // orbit parameters
  const cx = 420, cy = 260, rx = 280, ry = 160;
  const theta = progress * Math.PI * 2;
  const satX = cx + Math.cos(theta - Math.PI / 2) * rx;
  const satY = cy + Math.sin(theta - Math.PI / 2) * ry;

  // trail path — full orbit drawn as dashes, filled to progress
  const dashTotal = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);

  return (
    <div ref={containerRef} style={{
      background: '#faf7ef', border: '1px solid #1a1a1a', padding: 40,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1a1a1a',
      }}>
        <div>
          <div style={edStyles.eyebrow}>Fig. III — Orbital mechanics</div>
          <h3 style={{
            fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 500, marginTop: 8,
            letterSpacing: '-0.02em',
          }}>
            Payload firmware, in low&nbsp;earth&nbsp;orbit.
          </h3>
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#666',
          textAlign: 'right',
        }}>
          <div>θ = {(theta * 180 / Math.PI).toFixed(1)}°</div>
          <div>scroll to orbit</div>
        </div>
      </div>

      <svg viewBox="0 0 840 520" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* grid */}
        <g stroke="#1a1a1a" strokeWidth="0.3" opacity="0.15">
          {Array.from({ length: 21 }).map((_, i) => (
            <line key={'v' + i} x1={i * 42} y1="0" x2={i * 42} y2="520" />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={'h' + i} x1="0" y1={i * 42} x2="840" y2={i * 42} />
          ))}
        </g>

        {/* earth */}
        <circle cx={cx} cy={cy} r="82" fill="#1a1a1a" />
        <circle cx={cx} cy={cy} r="82" fill="none" stroke="#8b3a1f" strokeWidth="0.5" strokeDasharray="2 3" />
        {/* continent marks */}
        <path d="M 380 230 Q 410 220 440 240 M 400 280 Q 430 275 460 290 M 390 250 Q 405 255 420 250"
              stroke="#f4f0e7" strokeWidth="1.2" fill="none" opacity="0.6" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#f4f0e7"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 13 }}>
          Terra
        </text>

        {/* orbit path */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="1 4" />

        {/* traced orbit */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#8b3a1f" strokeWidth="1.5"
          pathLength="1" strokeDasharray={`${progress} 1`} transform={`rotate(-90 ${cx} ${cy})`} />

        {/* satellite */}
        <g transform={`translate(${satX}, ${satY})`}>
          <g transform={`rotate(${theta * 180 / Math.PI})`}>
            <rect x="-8" y="-5" width="16" height="10" fill="#8b3a1f" />
            <rect x="-22" y="-2.5" width="12" height="5" fill="#1a1a1a" />
            <rect x="10" y="-2.5" width="12" height="5" fill="#1a1a1a" />
          </g>
          <circle r="18" fill="none" stroke="#8b3a1f" strokeWidth="0.5" opacity="0.3" />
          <circle r="28" fill="none" stroke="#8b3a1f" strokeWidth="0.3" opacity="0.15" />
        </g>
        <text x={satX} y={satY - 30} textAnchor="middle"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.15em', fill: '#8b3a1f' }}>
          PRESET · LEO
        </text>

        {/* annotations */}
        <g style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fill: '#666' }}>
          <text x="20" y="18">FIG. III · The PRESET spacecraft, plotted</text>
          <text x="20" y="500">7.8 km/s · altitude 520 km · inclination 51.6°</text>
          <text x="700" y="500">v = r × ω</text>
          <line x1={cx} y1={cy} x2={cx + rx} y2={cy} stroke="#8b3a1f" strokeWidth="0.4" strokeDasharray="2 2" />
          <text x={cx + rx / 2} y={cy - 6} textAnchor="middle" fill="#8b3a1f">semi-major axis</text>
        </g>
      </svg>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginTop: 28,
        borderTop: '1px solid #1a1a1a', paddingTop: 20,
      }}>
        <div>
          <div style={edStyles.eyebrow}>The system</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8, color: '#333' }}>
            A real-time publish-subscribe messaging system with priority inheritance, built on <em>FreeRTOS</em> and the <em>FreeAct</em> framework — deterministic enough for flight-critical paths.
          </p>
        </div>
        <div>
          <div style={edStyles.eyebrow}>The hardware</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8, color: '#333' }}>
            Zynq 7000 as the processor. ADC128S022 over SPI, up to <em>8 channels per device</em>, sampled every 100–300 ms — all behind a hardware-abstraction layer he designed from scratch.
          </p>
        </div>
        <div>
          <div style={edStyles.eyebrow}>The pattern</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8, color: '#333' }}>
            Active Object architecture. A <em>Virtual Distributed Event Dispatcher</em> fans one signal out to up to 10 observers per channel — three observer types, configurable priority.
          </p>
        </div>
      </div>
    </div>
  );
}

function EdIndex({ data }) {
  return (
    <div>
      {data.projects.map((p, i) => (
        <div key={p.id} style={{
          display: 'grid', gridTemplateColumns: '40px 1.2fr 1fr 120px 100px',
          padding: '14px 0', borderBottom: '0.5px solid #1a1a1a33', gap: 20,
          alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: '#8b3a1f',
          }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <div style={{ fontSize: 17, lineHeight: 1.3 }}>{p.company}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#8b3a1f', marginTop: 2, letterSpacing: '0.1em' }}>
              {p.tag}
            </div>
          </div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#555', fontSize: 15 }}>
            {p.role}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#666' }}>
            {p.period}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#666', textAlign: 'right' }}>
            {p.location}
          </div>
        </div>
      ))}
    </div>
  );
}

function EdInstruments({ data }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
      {Object.entries(data.skills).map(([cat, list]) => (
        <div key={cat}>
          <div style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22,
            borderBottom: '1px solid #1a1a1a', paddingBottom: 8, marginBottom: 12,
          }}>
            {cat}
          </div>
          <div style={{ fontSize: 14, lineHeight: 2, color: '#333' }}>
            {list.map((s, i) => (
              <span key={s}>
                {s}{i < list.length - 1 && <span style={{ color: '#8b3a1f' }}> · </span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EdColophon({ data }) {
  return (
    <div style={{
      background: '#1a1a1a', color: '#f4f0e7', padding: '48px 40px',
      display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40,
    }}>
      <div>
        <div style={{
          fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 500, lineHeight: 1,
          letterSpacing: '-0.02em', marginBottom: 16,
        }}>
          Write me.
        </div>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 20, lineHeight: 1.4, color: '#f4f0e7aa' }}>
          Coffee chats welcome, resumes in the back, and the dog is friendly.
        </p>
      </div>
      <div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: '#8b3a1f', marginBottom: 12 }}>
          DIRECT
        </div>
        <div style={{ fontSize: 14, marginBottom: 6 }}>
          <span style={{ color: '#f4f0e7aa' }}>LinkedIn</span><br />
          <a href={`https://${data.links.linkedin}`} target="_blank" style={{ color: '#f4f0e7', textDecoration: 'underline' }}>
            @teghveerateliey
          </a>
        </div>
        <div style={{ fontSize: 14, marginTop: 14 }}>
          <span style={{ color: '#f4f0e7aa' }}>X</span><br />
          <a href={`https://${data.links.x}`} target="_blank" style={{ color: '#f4f0e7', textDecoration: 'underline' }}>
            @Tegh25
          </a>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: '#8b3a1f', marginBottom: 12 }}>
          MASTHEAD
        </div>
        <div style={{ fontSize: 12, color: '#f4f0e7aa', lineHeight: 1.7 }}>
          Set in Fraunces &amp; Instrument Serif.<br />
          Printed on a 72dpi press.<br />
          All errors the author's own.
        </div>
      </div>
    </div>
  );
}

// ─── Case Studies view — editorial "feature article" format ────────────
function EditorialCases({ data }) {
  const cases = data.projects.filter(p => ['evertz', 'preset', 'formula', 'td-swe'].includes(p.id));
  const [active, setActive] = useStateE(cases[0].id);
  const cur = cases.find(c => c.id === active);

  return (
    <div style={edStyles.root}>
      <div style={edStyles.container}>
        <div style={edStyles.eyebrow}>Feature articles · 4 of 4</div>
        <div className="case-tabs-row" style={{
          display: 'flex', gap: 2, marginTop: 12, marginBottom: 40,
          borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a',
        }}>
          {cases.map((c, i) => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              flex: 1, background: active === c.id ? '#1a1a1a' : 'transparent',
              color: active === c.id ? '#f4f0e7' : '#1a1a1a',
              border: 'none', padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
              fontFamily: "'Fraunces', serif",
              borderRight: i < cases.length - 1 ? '0.5px solid #1a1a1a33' : 'none',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.2em', opacity: 0.6 }}>
                N° {String(i + 1).padStart(2, '0')} · {c.tag}
              </div>
              <div style={{ fontSize: 17, marginTop: 4 }}>{c.company}</div>
            </button>
          ))}
        </div>

        <EdCaseArticle p={cur} />
      </div>
    </div>
  );
}

function EdCaseArticle({ p }) {
  const PixelIcon = {
    'evertz': <PixelCamera size={140} />,
    'preset': <PixelSatellite size={140} />,
    'formula': <PixelRacecar size={180} />,
    'td-swe': <PixelFPGA size={120} accent="#10b981" />,
  }[p.id];

  return (
    <article>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        {PixelIcon && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            {PixelIcon}
          </div>
        )}
        <div style={edStyles.eyebrow}>{p.tag} · {p.period}</div>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(44px, 7vw, 92px)', fontWeight: 500,
          lineHeight: 1, letterSpacing: '-0.03em', marginTop: 16, marginBottom: 20,
        }}>
          {p.company}
        </h1>
        <div style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
          fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#666',
        }}>
          {p.role}
        </div>
      </div>

      <div style={{ borderTop: '3px double #1a1a1a', padding: '32px 0', marginBottom: 32 }}>
        <p style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
          fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.35, color: '#1a1a1a', textAlign: 'center',
          maxWidth: 820, margin: '0 auto',
        }}>
          {p.oneLiner}
        </p>
      </div>

      {p.metrics && (
        <div style={{
          display: 'flex', justifyContent: 'space-around', padding: '24px 0',
          borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', marginBottom: 36,
        }}>
          {p.metrics.map(m => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Fraunces', serif", fontSize: 56, fontWeight: 500, lineHeight: 1,
                color: '#8b3a1f', letterSpacing: '-0.03em',
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em',
                color: '#666', marginTop: 8, textTransform: 'uppercase',
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* two-column article body with drop cap */}
      <div style={{ columns: 2, columnGap: 40, columnRule: '0.5px solid #1a1a1a33', marginBottom: 40 }}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#1a1a1a', marginBottom: 14 }}>
          <span style={{
            fontFamily: "'Fraunces', serif", fontSize: 64, float: 'left', lineHeight: 0.85,
            marginRight: 8, marginTop: 4, color: '#8b3a1f', fontWeight: 500,
          }}>
            {p.domain ? p.domain.charAt(0) : p.oneLiner.charAt(0)}
          </span>
          {(p.domain || p.oneLiner).slice(1)}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#333' }}>
          The scope expands below — the complete log of his contributions, in the order they mattered most.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40 }}>
        <aside style={{ position: 'sticky', top: 20, alignSelf: 'start' }}>
          <div style={edStyles.eyebrow}>Instruments</div>
          <div style={{ marginTop: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, lineHeight: 2 }}>
            {p.stack.map(s => <div key={s} style={{ borderBottom: '0.5px dotted #1a1a1a44' }}>— {s}</div>)}
          </div>
          <div style={{ ...edStyles.eyebrow, marginTop: 24 }}>Dispatch</div>
          <div style={{ marginTop: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#666', lineHeight: 1.7 }}>
            {p.location}<br />
            {p.period}
          </div>
        </aside>

        <div>
          <div style={edStyles.eyebrow}>The log</div>
          <ol style={{ listStyle: 'none', counterReset: 'log', marginTop: 12, padding: 0 }}>
            {p.impact.map((imp, i) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, padding: '14px 0',
                borderBottom: '0.5px solid #1a1a1a22',
              }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 26,
                  color: '#8b3a1f', lineHeight: 1,
                }}>
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#1a1a1a' }}>{imp}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

// ─── Living Résumé — a newspaper-style document ────────────────────────
function EditorialResume({ data }) {
  return (
    <div style={edStyles.root}>
      <div style={{ ...edStyles.container, maxWidth: 900 }}>
        <div style={{ textAlign: 'center', borderBottom: '3px double #1a1a1a', paddingBottom: 20, marginBottom: 28 }}>
          <div style={edStyles.eyebrow}>Curriculum Vitæ · established 2003 · printed 2026</div>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 500,
            letterSpacing: '-0.03em', lineHeight: 1, marginTop: 14,
          }}>
            {data.name}
          </h1>
          <div style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22, marginTop: 10, color: '#666',
          }}>
            {data.role} · {data.location}
          </div>
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.75, color: '#1a1a1a', textAlign: 'center', maxWidth: 680, margin: '0 auto 40px', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
          {data.summaryShort}
        </p>

        <EdResumeSection title="Experience" num="I">
          {data.projects.filter(p => p.status).map(p => (
            <div key={p.id} style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '0.5px solid #1a1a1a33' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 500 }}>{p.company}</span>
                  <span style={{ color: '#8b3a1f', margin: '0 8px' }}>—</span>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 19, color: '#444' }}>{p.role}</span>
                </div>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#666' }}>
                  {p.period}
                </span>
              </div>
              {p.oneLiner && (
                <p style={{ marginTop: 8, fontSize: 14.5, color: '#444', lineHeight: 1.6 }}>{p.oneLiner}</p>
              )}
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 10 }}>
                {(p.impact || []).slice(0, 3).map((imp, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: '#333', marginBottom: 4, paddingLeft: 16, position: 'relative', lineHeight: 1.6 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#8b3a1f' }}>§</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </EdResumeSection>

        <EdResumeSection title="Education" num="II">
          {data.education.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18 }}>{e.degree}</span>
              <span style={{ color: '#999', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, marginLeft: 12 }}>
                {e.period}
              </span>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#666' }}>
                {e.school}
              </div>
            </div>
          ))}
        </EdResumeSection>

        <EdResumeSection title="Honors, Awards &amp; Certifications" num="III">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[...data.awards, ...data.certifications].map((a, i) => (
              <div key={i} style={{ fontSize: 13.5, lineHeight: 1.5, color: '#333' }}>
                <span style={{ color: '#8b3a1f' }}>§ </span>{a}
              </div>
            ))}
          </div>
        </EdResumeSection>

        <EdResumeSection title="Correspondence" num="IV">
          <div style={{ fontSize: 14, lineHeight: 2 }}>
            <div><em style={{ color: '#666' }}>By wire:</em> <a href={`https://${data.links.linkedin}`} target="_blank" style={{ color: '#8b3a1f' }}>{data.links.linkedin}</a></div>
            <div><em style={{ color: '#666' }}>By post:</em> {data.links.location}</div>
            <div><em style={{ color: '#666' }}>By electronic mail:</em> {data.links.email}</div>
          </div>
        </EdResumeSection>

        <div style={{ textAlign: 'center', marginTop: 40, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: '#8b3a1f' }}>
          — FIN —
        </div>
      </div>
    </div>
  );
}

function EdResumeSection({ num, title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 14, borderTop: '1px solid #1a1a1a',
        borderBottom: '0.5px solid #1a1a1a', padding: '8px 0', marginBottom: 20,
      }}>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22, color: '#8b3a1f' }}>{num}.</span>
        <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      {children}
    </div>
  );
}

function DirectionEditorial({ view, data }) {
  if (view === 'site')   return <EditorialSite data={data} />;
  if (view === 'cases')  return <EditorialCases data={data} />;
  if (view === 'resume') return <EditorialResume data={data} />;
  return null;
}

window.DirectionEditorial = DirectionEditorial;
