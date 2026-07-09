// ─── Pixel art library ──────────────────────────────────────────────────
// Each piece is an SVG built from <rect> pixels, crisp-edges.
// Designed on small grids so pixels stay chunky at any size.
// Art direction: limited palette per piece, no gradients, no anti-aliasing.

function Pixel({ x, y, c, size = 1 }) {
  return <rect x={x} y={y} width={size} height={size} fill={c} shapeRendering="crispEdges" />;
}

// Helper: render a grid of chars → pixels using a palette map.
// Each row is a string; chars are palette keys. Space/`.` = transparent.
function PixelGrid({ rows, palette, pixelSize = 1 }) {
  const cells = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const ch = rows[y][x];
      const color = palette[ch];
      if (color) {
        cells.push(
          <rect key={`${x}-${y}`} x={x * pixelSize} y={y * pixelSize}
            width={pixelSize} height={pixelSize} fill={color}
            shapeRendering="crispEdges" />
        );
      }
    }
  }
  return <>{cells}</>;
}

// ─── FPGA CHIP ─────────────────────────────────────────────────────────
// Top-down view of a BGA chip with pins, label, and a pulsing activity LED.
function PixelFPGA({ size = 240, accent = '#10b981', animate = true }) {
  // 32×32 grid
  const P = {
    '#': '#0f172a',   // chip body
    '@': '#1e293b',   // chip body inner
    '.': '#334155',   // pin
    'o': '#64748b',   // pin highlight
    'L': accent,      // LED / activity
    'w': '#f1f5f9',   // silkscreen white
    'y': '#fbbf24',   // pin 1 marker
    '-': '#0b1322',   // trace dark
  };
  const rows = [
    '................................',
    '................................',
    '......oo.oo.oo.oo.oo.oo.oo......',
    '......oo.oo.oo.oo.oo.oo.oo......',
    '..oo.########################.oo',
    '..oo.########################.oo',
    '.....##@@@@@@@@@@@@@@@@@@@@##...',
    '.....##@y@@@@@@@@@@@@@@@@@@##...',
    '..oo.##@@@@@@@@@@@@@@@@@@@@##.oo',
    '..oo.##@@@@wwwwwwwwwww@@@@@##.oo',
    '.....##@@@@w@@@@@@@@@w@@@@@##...',
    '.....##@@@@w@@LLLLL@@w@@@@@##...',
    '..oo.##@@@@w@LLLLLLL@w@@@@@##.oo',
    '..oo.##@@@@w@LLLLLLL@w@@@@@##.oo',
    '.....##@@@@w@LLLLLLL@w@@@@@##...',
    '.....##@@@@w@@LLLLL@@w@@@@@##...',
    '..oo.##@@@@w@@@@@@@@@w@@@@@##.oo',
    '..oo.##@@@@wwwwwwwwwww@@@@@##.oo',
    '.....##@@@@@@@@@@@@@@@@@@@@##...',
    '.....##@@@@@@@@@@@@@@@@@@@@##...',
    '..oo.##@@@@@@@@@@@@@@@@@@@@##.oo',
    '..oo.########################.oo',
    '.....########################...',
    '......oo.oo.oo.oo.oo.oo.oo......',
    '......oo.oo.oo.oo.oo.oo.oo......',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ];
  const id = React.useId();
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
      {animate && (
        <>
          <rect x="13" y="12" width="6" height="5" fill={accent} opacity="0.6">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </rect>
          {/* clock ticks on top pins */}
          {[6, 9, 12, 15, 18, 21, 24].map((x, i) => (
            <rect key={i} x={x} y={2} width="2" height="2" fill="#f1f5f9">
              <animate attributeName="opacity" values="0;1;0" dur="0.8s"
                begin={`${i * 0.1}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </>
      )}
    </svg>
  );
}

// ─── SATELLITE ─────────────────────────────────────────────────────────
// CubeSat with symmetric solar wings, gold thermal blanket, and signal beam.
// 32×32 grid, carefully centered on column 16.
function PixelSatellite({ size = 200, animate = true }) {
  const P = {
    '#': '#cbd5e1',  // body metal mid
    '@': '#94a3b8',  // body shadow
    'W': '#f8fafc',  // highlight
    'y': '#fbbf24',  // thermal gold
    'Y': '#d97706',  // gold shadow
    'b': '#1e3a8a',  // solar cell deep
    'B': '#3b82f6',  // solar cell bright
    'f': '#1e40af',  // solar cell mid
    'k': '#0f172a',  // frame
    'r': '#dc2626',  // red nav light
    'a': '#475569',  // antenna
    '.': null,
  };
  // 32 wide × 32 tall. Body center at col 16.
  // Main body = 8×8 cube (cols 12-19, rows 12-19)
  // Solar wings = 6×8 each (left cols 2-7, right cols 24-29), rows 12-19
  // Antennas = thin lines top (cols 14-17, rows 6-11)
  const rows = [
    '................................',
    '................................',
    '................................',
    '................................',
    '...............a................',
    '..............aa................',
    '..............a.................',
    '.............a..................',
    '............a....aa.............',
    '...........a....a...............',
    '..........a....a................',
    '.........a....a.................',
    '..kkkkkkkk....kkkkkk....kkkkkkkk',
    '..kbBfBfBk....k####k....kbBfBfBk',
    '..kBfBfBfk....k#WW#k....kBfBfBfk',
    '..kbBfBfBk....k#yy#k....kbBfBfBk',
    '..kBfBfBfk....k#yy#k....kBfBfBfk',
    '..kbBfBfBk....k#WW#k....kbBfBfBk',
    '..kBfBfBfk....k####k....kBfBfBfk',
    '..kbBfBfBk....kkkkkk....kbBfBfBk',
    '..kkkkkkkk.....k##k.....kkkkkkkk',
    '...............k@@k.............',
    '...............k@rk.............',
    '................kk..............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ];
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
      {animate && (
        <>
          {/* signal beams from antenna tip */}
          {[0, 1, 2].map(i => (
            <circle key={i} cx="15" cy="4.5" r={2 + i * 2.5} fill="none"
              stroke="#fbbf24" strokeWidth="0.25" opacity="0">
              <animate attributeName="opacity" values="0.9;0" dur="2s"
                begin={`${i * 0.55}s`} repeatCount="indefinite" />
              <animate attributeName="r" values={`${2 + i * 2};${6 + i * 2.5}`} dur="2s"
                begin={`${i * 0.55}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* red nav blink on body underside */}
          <rect x="18" y="23" width="1" height="1" fill="#ef4444">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </>
      )}
    </svg>
  );
}

// ─── RACECAR (FORMULA ELECTRIC) ────────────────────────────────────────
// Side profile, front to right. 48×24, symmetric wheels at cols 8-15 and 32-39.
function PixelRacecar({ size = 280, animate = true }) {
  const P = {
    '#': '#7c1d1d',  // maroon body (McMaster)
    '@': '#450a0a',  // body shadow
    'S': '#991b1b',  // body highlight
    'w': '#f1f5f9',  // white decal
    'y': '#fbbf24',  // accent
    'k': '#0f172a',  // black cockpit
    'g': '#374151',  // grey metal
    'G': '#4b5563',  // grey highlight
    'r': '#dc2626',  // red accent
    't': '#0a0a0a',  // tire outer
    'T': '#1f2937',  // tire tread
    'h': '#374151',  // hub
    'H': '#6b7280',  // hub highlight
    's': '#64748b',  // suspension arm
    '.': null,
  };
  // 48 wide, 24 tall. Ground at row 22. Wheels r=4 centered at (11,18) and (35,18).
  // Chassis runs cols 7-43, row 12-15. Cockpit/halo at cols 22-30, rows 7-11.
  const rows = [
    '................................................',
    '................................................',
    '................................................',
    '................................................',
    '................................................',
    '.......................gggg.....................',  // halo top
    '.......................g##g.....................',
    '......................gg##gg....................',
    '.....................gg####gg...................',
    '....................gg##kk##gg..................',  // cockpit opening
    '...................gg###kk###gg.................',
    '.......ssss........gggggkkggggg........ssss.....',
    '......s####sssssssS##############Sssssss####s...',  // main body
    '.....s#####################################wS...',  // full chassis
    '....s##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@S...',  // underbody shadow
    '....ssssssssssssssssssssssssssssssssssssssssS...',
    '...........tttttt...................tttttt......',  // tire top
    '..........tTTTTTTt.................tTTTTTTt.....',
    '.........tTThHHhTTt...............tTThHHhTTt....',  // hub
    '.........tTTHhhHTTt...............tTTHhhHTTt....',
    '.........tTThHHhTTt...............tTThHHhTTt....',
    '..........tTTTTTTt.................tTTTTTTt.....',
    '...........tttttt...................tttttt......',
    '................................................',
  ];
  return (
    <svg viewBox="0 0 48 24" width={size} height={size * 0.5} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
      {animate && (
        <>
          {/* speed lines behind car */}
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={-6 + i * 3} y={14 + (i % 2)} width="4" height="0.5" fill="#fbbf24" opacity="0.7">
              <animate attributeName="x" values={`-8;50`} dur={`${0.5 + i * 0.1}s`}
                begin={`${i * 0.1}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur={`${0.5 + i * 0.1}s`}
                begin={`${i * 0.1}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </>
      )}
    </svg>
  );
}

// ─── BROADCAST CAMERA / DECK ───────────────────────────────────────────
// Studio camera on tripod with tally light + lens. 32×24, centered.
function PixelCamera({ size = 200, animate = true }) {
  const P = {
    '#': '#1f2937',  // body
    '@': '#111827',  // body shadow
    'B': '#374151',  // body highlight
    'g': '#4b5563',  // metal
    'G': '#6b7280',  // metal highlight
    'k': '#030712',  // deep black
    'r': '#ef4444',  // tally red
    'w': '#e5e7eb',  // white label
    'y': '#fbbf24',  // logo accent
    'L': '#60a5fa',  // lens blue
    'l': '#1e40af',  // lens deep
    '.': null,
  };
  // 32×24, body centered around col 16. Lens extends left cols 2-10, rows 8-15.
  // Viewfinder on top, tally light on top-right of body.
  const rows = [
    '................................',
    '................................',
    '..................rr............',  // tally
    '..................rr............',
    '..............GGGGGGGG..........',  // viewfinder
    '..............GkkkkkkG..........',
    '..............GkwwwwkG..........',
    '..............GGGGGGGG..........',
    '...GGGGG....############........',  // lens barrel start + body top
    '..GllllG....#BBBBBBBBBB#........',
    '..GlLLLG....#B@@@@@@@@B#........',
    '..GlLLLG####B@wwwwwwww@#........',  // body w/ white label
    '..GlLLLG####B@wyy##yyw@#........',  // logo
    '..GlLLLG####B@wwwwwwww@#........',
    '..GllllG....#B@@@@@@@@B#........',
    '...GGGGG....#BBBBBBBBBB#........',
    '............############........',
    '...............##GG##...........',  // mount
    '...............##GG##...........',
    '...............gGGGGg...........',  // tripod head
    '..............gg.GG.gg..........',  // tripod legs
    '.............gg..GG..gg.........',
    '............gg...GG...gg........',
    '...........gg....GG....gg.......',
  ];
  return (
    <svg viewBox="0 0 32 24" width={size} height={size * 0.75} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
      {animate && (
        <rect x="18" y="2" width="2" height="2" fill="#ef4444">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </rect>
      )}
    </svg>
  );
}

// ─── TROPHY / AWARD ────────────────────────────────────────────────────
// 12×12, symmetric. Bowl on top, stem, base.
function PixelTrophy({ size = 80 }) {
  const P = {
    '#': '#fbbf24', '@': '#d97706', 'w': '#fef3c7', 'k': '#92400e', '.': null,
  };
  const rows = [
    '..########..',
    '..#wwwwww#..',
    '..#w####w#..',
    '..#w#@@#w#..',
    '..#w#@@#w#..',
    '...##@@##...',
    '....####....',
    '.....##.....',
    '.....##.....',
    '...######...',
    '..########..',
    '.##########.',
  ];
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
    </svg>
  );
}

// ─── WAVEFORM / SCOPE (abstract) ───────────────────────────────────────
function PixelWaveform({ width = 400, height = 60, color = '#10b981' }) {
  const pts = Array.from({ length: 80 }, (_, i) => {
    const t = i / 80;
    const y = 30 + 18 * Math.sin(t * Math.PI * 6) * Math.sin(t * Math.PI * 2);
    return `${i * 5},${y.toFixed(0)}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox="0 0 400 60" style={{ imageRendering: 'pixelated' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2"
        shapeRendering="crispEdges" />
    </svg>
  );
}

// ─── ISOMETRIC STACK (for editorial flair) ─────────────────────────────
// A small isometric tower of "projects" — like stacked pixel art.
function PixelStack({ size = 160 }) {
  const P = {
    'r': '#7c1d1d', 'R': '#991b1b', 'o': '#450a0a',  // racecar maroon
    'g': '#10b981', 'G': '#059669', 'h': '#064e3b',  // fpga green
    'b': '#3b82f6', 'B': '#1e40af', 'd': '#1e3a8a',  // satellite blue
    'y': '#fbbf24', 'Y': '#d97706', 'u': '#92400e',  // gold
    'k': '#0f172a', 'w': '#f1f5f9', '.': null,
  };
  const rows = [
    '..........yyyyyyyy..........',
    '.........yYyYyYyYy..........',
    '........yyyyyyyyyyyyy.......',
    '.......yYyYyYyYyYyYyy.......',
    '......yyyyyyyyyyyyyYy.......',
    '......yuuuuuuuuuuuYyy.......',
    '......yuuuuuuuuuuuuYy.......',
    '......yuuuuuuuuuuuuYy.......',
    '......bbbbbbbbbbbbbYy.......',
    '.....bBbBbBbBbBbBbBbbb......',
    '....bbbbbbbbbbbbbbbbbbb.....',
    '....bdbdbdbdbdbdbdbdbdb.....',
    '....bbbbbbbbbbbbbbbbbbb.....',
    '....bdddddddddddddddddb.....',
    '....bddddddddddddddddBb.....',
    '....gggggggggggggggggBb.....',
    '...gGgGgGgGgGgGgGgGgGgg.....',
    '..ggggggggggggggggggggggg...',
    '..ghghghghghghghghghghghg...',
    '..ggggggggggggggggggggggg...',
    '..ghhhhhhhhhhhhhhhhhhhhGg...',
    '..ghhhhhhhhhhhhhhhhhhhhGg...',
    '..rrrrrrrrrrrrrrrrrrrrrrr...',
    '.rRrRrRrRrRrRrRrRrRrRrRrrr..',
    'rrrrrrrrrrrrrrrrrrrrrrrrrrr.',
    'roroorooroorooroorooroorrR..',
    'rooooooooooooooooooooooRRr..',
    '.rooooooooooooooooooooRRr...',
    '..rrrrrrrrrrrrrrrrrrrrrr....',
  ];
  return (
    <svg viewBox="0 0 28 29" width={size} height={size * 29 / 28} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
    </svg>
  );
}

// ─── ASCII/PIXEL DIVIDER (for editorial) ───────────────────────────────
function PixelDivider({ width = 400, color = '#8b3a1f' }) {
  return (
    <svg width={width} height="12" viewBox="0 0 100 3" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="1" width="40" height="1" fill={color} shapeRendering="crispEdges" />
      <rect x="44" y="0" width="3" height="3" fill={color} shapeRendering="crispEdges" />
      <rect x="48.5" y="1" width="3" height="1" fill={color} shapeRendering="crispEdges" />
      <rect x="53" y="0" width="3" height="3" fill={color} shapeRendering="crispEdges" />
      <rect x="60" y="1" width="40" height="1" fill={color} shapeRendering="crispEdges" />
    </svg>
  );
}

// ─── TERMINAL CURSOR / KBD KEY ─────────────────────────────────────────
function PixelKey({ label, size = 40, color = '#10b981' }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="1" width="18" height="16" fill="#1e293b" stroke={color} strokeWidth="0.5" shapeRendering="crispEdges" />
      <rect x="2" y="2" width="16" height="1" fill="#334155" />
      <rect x="1" y="17" width="18" height="2" fill="#0f172a" />
      <text x="10" y="12" textAnchor="middle" fill={color}
        style={{ fontFamily: 'monospace', fontSize: 7, fontWeight: 'bold' }}>{label}</text>
    </svg>
  );
}

// ─── PORTRAIT (abstract pixel avatar) ──────────────────────────────────
// Engineer at a CRT, centered and symmetric. 32×32.
function PixelEngineer({ size = 220, palette = 'warm' }) {
  const warm = {
    '#': '#1a1a1a',  // body outline
    '@': '#2d1810',  // body shadow
    's': '#8b3a1f',  // shirt mid
    'S': '#b85c3a',  // shirt highlight
    'h': '#3d2817',  // hair
    'f': '#d4a574',  // skin/face
    'F': '#b08560',  // skin shadow
    'w': '#f4f0e7',  // CRT bezel
    'y': '#fbbf24',  // LED
    'L': '#f59e0b',  // screen glow
    'c': '#059669',  // screen text green
    'k': '#0a0a0a',  // deep
    'g': '#4b5563',  // desk
    'G': '#6b7280',  // desk highlight
    '.': null,
  };
  const cool = {
    '#': '#0f172a',
    '@': '#1e293b',
    's': '#475569',
    'S': '#64748b',
    'h': '#0f172a',
    'f': '#cbd5e1',
    'F': '#94a3b8',
    'w': '#e2e8f0',
    'y': '#fbbf24',
    'L': '#1e293b',
    'c': '#10b981',
    'k': '#020617',
    'g': '#334155',
    'G': '#475569',
    '.': null,
  };
  const P = palette === 'cool' ? cool : warm;
  // 32 wide. Head at cols 13-18 (centered on 15.5). Monitor at cols 7-24.
  const rows = [
    '................................',
    '................................',
    '...............hhhh.............',
    '..............hhhhhh............',
    '.............hffffffh...........',
    '.............hfFkkFfh...........',  // eyes
    '.............hffffffh...........',
    '.............hfFFFFfh...........',  // mouth area
    '..............ffffff............',
    '..............hffffh............',  // neck
    '.............ssssssss...........',
    '............ssSSssSSss..........',  // shoulders
    '...........sssssssssssss........',
    '..........sssSSSssSSSsssS.......',
    '..........sssssssssssssSS.......',
    '..........sssssssssssssSS.......',
    '..........sssssssssssssSS.......',
    '................................',
    '.......wwwwwwwwwwwwwwwwww.......',  // monitor top
    '.......w@@@@@@@@@@@@@@@@w.......',
    '.......w@LLLLLLLLLLLLLL@w.......',
    '.......w@Lccccccccccccc@w.......',
    '.......w@Lccc@@@@@@@@cc@w.......',
    '.......w@Lccc@cccccc@cc@w.......',
    '.......w@Lcccc@@@@@@ccc@w.......',
    '.......w@Lccccccccccccc@w.......',
    '.......w@@@@@@@@@@@@@@y@w.......',  // LED
    '.......wwwwwwwwwwwwwwwwww.......',
    '.........wwwwww..wwwwww.........',  // stand
    '......GGGGGGGGGGGGGGGGGGGGGG....',  // desk
    '......gggggggggggggggggggggg....',
    '................................',
  ];
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      <PixelGrid rows={rows} palette={P} />
    </svg>
  );
}

Object.assign(window, {
  PixelFPGA, PixelSatellite, PixelRacecar, PixelCamera,
  PixelTrophy, PixelWaveform, PixelStack, PixelDivider,
  PixelKey, PixelEngineer,
});
