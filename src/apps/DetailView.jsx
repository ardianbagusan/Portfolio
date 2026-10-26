import { useState } from "react";
import { asset, tint } from "../lib.js";

export default function DetailView({ item, index, onBack, backLabel }) {
  const [open, setOpen] = useState(null);
  const photos = (item.proof || []).filter((p) => p.type === "photo");
  const links = (item.proof || []).filter((p) => p.type === "link");

  return (
    <div className="detail">
      <div className="detail-cover" style={{ background: tint(index) }}>
        {item.cover ? <img src={asset(item.cover)} alt="" /> : <span className="placeholder-art large" aria-hidden="true" />}
        <button type="button" className="pill-back" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {backLabel}
        </button>
      </div>

      <div className="page detail-body">
        <h1 className="detail-title">{item.title}</h1>
        <div className="chips">
          {item.meta.split(" · ").map((m) => (
            <span key={m} className="chip plain">{m}</span>
          ))}
          {item.badge && <span className="chip">{item.badge}</span>}
        </div>

        {item.keyPoints?.length > 0 && (
          <>
            <h2 className="section-label">Key points</h2>
            <ul className="card key-points">
              {item.keyPoints.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </>
        )}

        {(photos.length > 0 || links.length > 0) && <h2 className="section-label">Proof</h2>}
        {photos.length > 0 && (
          <div className="proof-row">
            {photos.map((p, i) => (
              <button key={i} type="button" className="proof-photo" style={{ background: tint(index + i + 1) }} onClick={() => setOpen(p)} aria-label={p.caption}>
                {p.src ? <img src={asset(p.src)} alt="" loading="lazy" /> : <span className="placeholder-art" aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
        {links.map((l) => (
          <a key={l.url} className="card link-row" href={l.url} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">🔗</span>
            <span className="grow">{l.label}</span>
            <svg className="chevron" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ))}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-label={open.caption} onClick={() => setOpen(null)}>
          {open.src ? <img src={asset(open.src)} alt={open.caption} /> : <span className="lightbox-placeholder" aria-hidden="true" />}
          <p>{open.caption}</p>
          <button type="button" className="lightbox-close">Close</button>
        </div>
      )}
    </div>
  );
}
