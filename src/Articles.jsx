// Articles view — shared by all three directions, themed per direction.
// Content lives in src/data/articles.jsx (window.ARTICLES).

const ARTICLE_THEMES = {
  terminal: {
    bg: '#0a0a0a', fg: '#d6d6d6', strong: '#f5f5f5', muted: '#777', faint: '#444',
    accent: '#00ff9c', link: '#82aaff', border: '#1e1e1e', panel: '#0c0c0c', codeBg: '#151515',
    callout: '#0f1a14', radius: 2,
    bodyFont: "'JetBrains Mono', 'IBM Plex Mono', monospace", headFont: "'JetBrains Mono', monospace",
    monoFont: "'JetBrains Mono', monospace", bodySize: 14, lineHeight: 1.75, headWeight: 500,
    headPrefix: '## ',
  },
  editorial: {
    bg: '#f4f0e7', fg: '#26221c', strong: '#111', muted: '#6b6355', faint: '#a79e8d',
    accent: '#8b3a1f', link: '#8b3a1f', border: '#1a1a1a33', panel: '#ece6d8', codeBg: '#e6dfcd',
    callout: '#ebe3cf', radius: 0,
    bodyFont: "'Fraunces', Georgia, serif", headFont: "'Fraunces', Georgia, serif",
    monoFont: "'IBM Plex Mono', monospace", bodySize: 18, lineHeight: 1.7, headWeight: 500,
    headPrefix: '',
  },
  schematic: {
    bg: 'transparent', fg: '#cbd5e1', strong: '#f1f5f9', muted: '#64748b', faint: '#334155',
    accent: '#60a5fa', link: '#60a5fa', border: '#1e293b', panel: '#0f172a', codeBg: '#1e293b',
    callout: '#0c1a33', radius: 2,
    bodyFont: "'IBM Plex Sans', system-ui, sans-serif", headFont: "'IBM Plex Sans', system-ui, sans-serif",
    monoFont: "'IBM Plex Mono', monospace", bodySize: 16, lineHeight: 1.7, headWeight: 600,
    headPrefix: '',
  },
};

function articleInline(text, th) {
  const parts = text.split(/(\*\*[^*]+\*\*|~[^~]+~|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((s, i) => {
    if (s.startsWith('**')) return <strong key={i} style={{ color: th.strong, fontWeight: 700 }}>{articleInline(s.slice(2, -2), th)}</strong>;
    if (s.startsWith('~')) return (
      <code key={i} style={{
        fontFamily: th.monoFont, fontSize: '0.86em', background: th.codeBg, color: th.strong,
        padding: '1px 6px', borderRadius: th.radius, wordBreak: 'break-word',
      }}>{s.slice(1, -1)}</code>
    );
    const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) return <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: th.link, wordBreak: 'break-word' }}>{m[1]}</a>;
    return s;
  });
}

function ArticleTable({ block, th }) {
  const [hover, setHover] = React.useState(-1);
  return (
    <figure style={{ margin: '28px 0' }}>
      {block.caption && (
        <figcaption style={{ fontFamily: th.monoFont, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: th.muted, marginBottom: 8 }}>
          {block.caption}
        </figcaption>
      )}
      <div style={{ overflowX: 'auto', border: `1px solid ${th.border}`, background: th.panel, borderRadius: th.radius }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: th.monoFont, fontSize: 12.5, lineHeight: 1.5 }}>
          <thead>
            <tr>
              {block.head.map((h, i) => (
                <th key={i} style={{
                  textAlign: 'left', padding: '10px 14px', color: th.accent, fontWeight: 600, fontSize: 11,
                  letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: `1px solid ${th.border}`, whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r, ri) => (
              <tr key={ri} onMouseEnter={() => setHover(ri)} onMouseLeave={() => setHover(-1)}
                style={{ background: hover === ri ? `${th.accent}18` : 'transparent', transition: 'background 0.15s' }}>
                {r.map((c, ci) => (
                  <td key={ci} style={{
                    padding: '9px 14px', color: ci === 0 ? th.strong : th.fg, verticalAlign: 'top',
                    borderBottom: ri < block.rows.length - 1 ? `1px solid ${th.border}` : 'none', minWidth: ci === 0 ? 160 : 0,
                  }}>{articleInline(c, th)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

// Hugging Face and GitHub block iframing, so they render as live link cards
// (stats fetched from their public APIs); the static HF Space demo is embedded.
function RepoCard({ item, th }) {
  const [info, setInfo] = React.useState(null);
  const isHf = item.kind === 'hf';
  React.useEffect(() => {
    let dead = false;
    const api = isHf ? `https://huggingface.co/api/models/${item.repo}` : `https://api.github.com/repos/${item.repo}`;
    fetch(api).then(r => r.ok ? r.json() : null).then(j => { if (!dead) setInfo(j); }).catch(() => { });
    return () => { dead = true; };
  }, [item.repo]);

  const stats = [];
  if (info) {
    if (isHf) {
      if (info.pipeline_tag) stats.push(info.pipeline_tag);
      if (info.base_model || info.cardData?.base_model) stats.push('base: ' + [].concat(info.base_model || info.cardData.base_model)[0]);
      stats.push(`↓ ${info.downloads ?? 0}`, `♥ ${info.likes ?? 0}`);
    } else {
      if (info.language) stats.push(info.language);
      stats.push(`★ ${info.stargazers_count}`, `⑂ ${info.forks_count}`);
      if (info.pushed_at) stats.push('updated ' + info.pushed_at.slice(0, 10));
    }
  }
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
      display: 'block', textDecoration: 'none', padding: '16px 18px', background: th.panel,
      border: `1px solid ${th.border}`, borderRadius: th.radius, color: th.fg,
    }}>
      <div style={{ fontFamily: th.monoFont, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: th.accent, marginBottom: 6 }}>
        {isHf ? 'Hugging Face · model' : 'GitHub · repository'} ↗
      </div>
      <div style={{ fontFamily: th.monoFont, fontSize: 14, color: th.strong, wordBreak: 'break-all', marginBottom: 6 }}>{item.repo}</div>
      {info?.description && <div style={{ fontSize: 13, color: th.muted, lineHeight: 1.5, marginBottom: 6 }}>{info.description}</div>}
      <div style={{ fontFamily: th.monoFont, fontSize: 11, color: th.muted, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {stats.length ? stats.map((s, i) => <span key={i}>{s}</span>) : <span>{info === null ? 'open link' : ''}</span>}
      </div>
    </a>
  );
}

function DemoEmbed({ item, th }) {
  const [loaded, setLoaded] = React.useState(false);
  const [tall, setTall] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const btn = {
    background: 'transparent', border: `1px solid ${th.border}`, color: th.fg, cursor: 'pointer',
    padding: '4px 9px', fontFamily: th.monoFont, fontSize: 11, borderRadius: th.radius, textDecoration: 'none',
  };
  return (
    <div style={{ border: `1px solid ${th.border}`, background: th.panel, borderRadius: th.radius }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: loaded ? `1px solid ${th.border}` : 'none', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: th.monoFont, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: th.accent }}>Demo · {item.title}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {loaded && <button style={btn} onClick={() => setTall(t => !t)}>{tall ? 'shrink' : 'expand'}</button>}
          {loaded && <button style={btn} onClick={() => setKey(k => k + 1)}>reload</button>}
          <a style={btn} href={item.url} target="_blank" rel="noopener noreferrer">open ↗</a>
        </span>
      </div>
      {loaded ? (
        <iframe key={key} src={item.url} title={item.title} loading="lazy"
          allow="clipboard-write" referrerPolicy="no-referrer"
          style={{ display: 'block', width: '100%', height: tall ? 900 : 560, border: 0, background: '#fff' }} />
      ) : (
        <div style={{ padding: '28px 18px', textAlign: 'center' }}>
          <button style={{ ...btn, padding: '10px 18px', fontSize: 12, color: th.accent, borderColor: th.accent }} onClick={() => setLoaded(true)}>
            ▶ load interactive demo
          </button>
          <div style={{ fontFamily: th.monoFont, fontSize: 11, color: th.muted, marginTop: 10 }}>Loads from huggingface.co only when you click.</div>
        </div>
      )}
    </div>
  );
}

function ArticleBlock({ block, th }) {
  if (block.t === 'embeds') {
    const cards = block.items.filter(i => i.kind !== 'demo');
    const demo = block.items.find(i => i.kind === 'demo');
    return (
      <div style={{ margin: '28px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 14 }}>
          {cards.map(c => <RepoCard key={c.url} item={c} th={th} />)}
        </div>
        {demo && <DemoEmbed item={demo} th={th} />}
      </div>
    );
  }
  if (block.t === 'p') return <p style={{ margin: '0 0 1.1em' }}>{articleInline(block.text, th)}</p>;
  if (block.t === 'ul' || block.t === 'ol') {
    const Tag = block.t;
    return (
      <Tag style={{ margin: '0 0 1.3em', paddingLeft: '1.4em' }}>
        {block.items.map((it, i) => (
          <li key={i} style={{ marginBottom: '0.6em', paddingLeft: 4 }}>{articleInline(it, th)}</li>
        ))}
      </Tag>
    );
  }
  if (block.t === 'table') return <ArticleTable block={block} th={th} />;
  if (block.t === 'callout') return (
    <aside style={{
      margin: '24px 0', padding: '16px 20px', background: th.callout, borderLeft: `3px solid ${th.accent}`,
      color: th.strong, borderRadius: th.radius, fontStyle: 'italic',
    }}>{articleInline(block.text, th)}</aside>
  );
  return null;
}

function ArticleReader({ article, th, onBack }) {
  const { useState, useEffect, useRef, useMemo } = React;
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [scale, setScale] = useState(() => Number(localStorage.getItem('tegh.articleScale')) || 0);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);

  const headings = useMemo(() => article.body.filter(b => b.t === 'h2'), [article]);
  const sections = useMemo(() => {
    const out = [];
    article.body.forEach(b => {
      if (b.t === 'h2') out.push({ head: b, blocks: [] });
      else if (out.length) out[out.length - 1].blocks.push(b);
    });
    return out;
  }, [article]);

  useEffect(() => { localStorage.setItem('tegh.articleScale', String(scale)); }, [scale]);

  useEffect(() => {
    const stage = document.querySelector('.stage');
    if (!stage) return;
    const onScroll = () => {
      const art = rootRef.current;
      if (!art) return;
      const max = art.offsetHeight - stage.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, stage.scrollTop / max)) : 0);
      const stageTop = stage.getBoundingClientRect().top;
      let cur = headings[0].id;
      headings.forEach(h => {
        const el = document.getElementById('art-' + h.id);
        if (el && el.getBoundingClientRect().top - stageTop < 140) cur = h.id;
      });
      setActiveId(cur);
    };
    onScroll();
    stage.addEventListener('scroll', onScroll);
    return () => stage.removeEventListener('scroll', onScroll);
  }, [headings]);

  const jump = id => {
    const el = document.getElementById('art-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const copyLink = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(article.source).then(done, done); else done();
  };

  const narrow = window.innerWidth < 860;
  const bodySize = th.bodySize + scale * 1.5;
  const btn = {
    background: 'transparent', border: `1px solid ${th.border}`, color: th.fg, cursor: 'pointer',
    padding: '5px 10px', fontFamily: th.monoFont, fontSize: 11, borderRadius: th.radius,
  };

  return (
    <div ref={rootRef} style={{ background: th.bg, color: th.fg, fontFamily: th.bodyFont, minHeight: '100%' }}>
      <div style={{ position: 'sticky', top: 0, height: 3, zIndex: 5, background: `${th.accent}22` }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: th.accent, transition: 'width 0.1s linear' }} />
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 28px 100px' }}>
        <button onClick={onBack} style={{ ...btn, marginBottom: 28 }}>← all articles</button>

        <header style={{ maxWidth: 780, marginBottom: 40 }}>
          <div style={{ fontFamily: th.monoFont, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: th.accent, marginBottom: 14 }}>
            {article.date} · {article.readMinutes} min read
          </div>
          <h1 style={{
            fontFamily: th.headFont, fontWeight: th.headWeight, fontSize: 'clamp(28px, 4.2vw, 46px)',
            lineHeight: 1.15, letterSpacing: '-0.02em', color: th.strong, margin: '0 0 14px',
          }}>{article.title}</h1>
          <p style={{ fontSize: 18, color: th.muted, lineHeight: 1.5, margin: '0 0 18px' }}>{article.subtitle}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <button style={btn} onClick={() => setScale(s => Math.max(-2, s - 1))} title="Smaller text">A−</button>
            <button style={btn} onClick={() => setScale(s => Math.min(4, s + 1))} title="Larger text">A+</button>
            <button style={btn} onClick={copyLink}>{copied ? 'copied ✓' : 'copy medium link'}</button>
            <a href={article.source} target="_blank" rel="noopener noreferrer" style={{ ...btn, textDecoration: 'none' }}>read on medium ↗</a>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '210px minmax(0, 1fr)', gap: 48, alignItems: 'start' }}>
          <nav style={{
            position: narrow ? 'static' : 'sticky', top: 24, fontFamily: th.monoFont, fontSize: 12,
            borderLeft: `1px solid ${th.border}`, paddingLeft: 14,
          }}>
            <div style={{ color: th.muted, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
              contents · {Math.round(progress * 100)}%
            </div>
            {headings.map(h => (
              <button key={h.id} onClick={() => jump(h.id)} style={{
                display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                padding: '5px 0', fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 1.4,
                color: activeId === h.id ? th.accent : th.muted, fontWeight: activeId === h.id ? 600 : 400,
              }}>{h.text}</button>
            ))}
          </nav>

          <article style={{ maxWidth: 740, fontSize: bodySize, lineHeight: th.lineHeight }}>
            {sections.map(sec => (
              <section key={sec.head.id} style={{ marginBottom: 36 }}>
                <h2 id={'art-' + sec.head.id} style={{
                  fontFamily: th.headFont, fontWeight: th.headWeight, fontSize: '1.55em', lineHeight: 1.25,
                  color: th.strong, margin: '0 0 0.7em', paddingTop: 8, letterSpacing: '-0.01em',
                }}>
                  <span style={{ color: th.accent }}>{th.headPrefix}</span>{sec.head.text}
                </h2>
                {sec.blocks.map((b, i) => <ArticleBlock key={i} block={b} th={th} />)}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}

function ArticlesView({ direction }) {
  const th = ARTICLE_THEMES[direction] || ARTICLE_THEMES.terminal;
  const articles = window.ARTICLES || [];
  const [openId, setOpenId] = React.useState(() => articles.length === 1 ? articles[0].id : null);
  const open = articles.find(a => a.id === openId);

  if (open) {
    return <ArticleReader article={open} th={th} onBack={articles.length > 1 ? () => setOpenId(null) : () => { }} />;
  }
  return (
    <div style={{ background: th.bg, color: th.fg, fontFamily: th.bodyFont, minHeight: '100%' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 28px' }}>
        <h1 style={{ fontFamily: th.headFont, color: th.strong, fontSize: 36, fontWeight: th.headWeight, marginBottom: 28 }}>Articles</h1>
        {articles.map(a => (
          <button key={a.id} onClick={() => setOpenId(a.id)} style={{
            display: 'block', width: '100%', textAlign: 'left', background: th.panel, border: `1px solid ${th.border}`,
            color: th.fg, padding: 22, marginBottom: 14, cursor: 'pointer', borderRadius: th.radius, fontFamily: 'inherit',
          }}>
            <div style={{ fontFamily: th.monoFont, fontSize: 11, color: th.accent, marginBottom: 8 }}>{a.date} · {a.readMinutes} min read</div>
            <div style={{ fontSize: 22, color: th.strong, marginBottom: 6 }}>{a.title}</div>
            <div style={{ color: th.muted }}>{a.subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

window.ArticlesView = ArticlesView;
