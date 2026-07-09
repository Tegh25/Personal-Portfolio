// Main shell — manages direction + view state, renders the right component.

const { useState, useEffect, useRef, useMemo } = React;

const DIRECTIONS = [
  { id: 'terminal',   label: 'Terminal',   sub: 'system / dark',   num: '01' },
  { id: 'editorial',  label: 'Editorial',  sub: 'paper / serif',   num: '02' },
  { id: 'schematic',  label: 'Schematic',  sub: 'fpga / block',    num: '03' },
];

const VIEWS = [
  { id: 'site',    label: 'Personal Site',      hint: 'the full portfolio' },
  { id: 'cases',   label: 'Case Studies',       hint: 'deep-dive projects' },
  { id: 'resume',  label: 'Living Résumé',      hint: 'reimagined CV' },
];

function App() {
  // Persist so refresh doesn't lose context (spec: playback position in localStorage).
  const [direction, setDirection] = useState(() => localStorage.getItem('tegh.direction') || 'terminal');
  const [view, setView] = useState(() => localStorage.getItem('tegh.view') || 'site');
  useEffect(() => { localStorage.setItem('tegh.direction', direction); }, [direction]);
  useEffect(() => { localStorage.setItem('tegh.view', view); }, [view]);

  useEffect(() => {
    const boot = document.getElementById('boot');
    setTimeout(() => { boot.classList.add('gone'); setTimeout(() => boot.remove(), 400); }, 250);
  }, []);

  // Scroll stage to top on tab change
  const stageRef = useRef(null);
  useEffect(() => {
    if (stageRef.current) stageRef.current.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [direction, view]);

  const Component = useMemo(() => {
    if (direction === 'terminal')  return window.DirectionTerminal;
    if (direction === 'editorial') return window.DirectionEditorial;
    if (direction === 'schematic') return window.DirectionSchematic;
    return () => null;
  }, [direction]);

  return (
    <>
      <div className="meta-bar">
        <div className="meta-brand">
          <span className="dot"></span>
          <span>teghveer.portfolio</span>
          <span style={{ color: '#333', margin: '0 4px' }}>/</span>
          <span style={{ color: '#666' }}>3 directions × 3 views</span>
        </div>
        <div className="direction-tabs">
          {DIRECTIONS.map(d => (
            <button
              key={d.id}
              className={direction === d.id ? 'active' : ''}
              onClick={() => setDirection(d.id)}
              title={d.sub}
            >
              <span className="num">{d.num}</span>
              <span>{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="view-tabs">
        <span className="label">view</span>
        {VIEWS.map(v => (
          <button
            key={v.id}
            className={view === v.id ? 'active' : ''}
            onClick={() => setView(v.id)}
            title={v.hint}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="stage" ref={stageRef} key={direction + view}>
        <Component view={view} data={window.RESUME} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
