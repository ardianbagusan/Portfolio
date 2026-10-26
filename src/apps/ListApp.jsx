import { useState } from "react";
import { asset, tint } from "../lib.js";
import DetailView from "./DetailView.jsx";

// Shared by Competition and Work: a list of cards, tap one for the detail page.
export default function ListApp({ title, subtitle, items, kind }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = items.find((it) => it.id === selectedId);

  if (selected) {
    return <DetailView item={selected} index={items.indexOf(selected)} onBack={() => setSelectedId(null)} backLabel={title} />;
  }

  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">
        {items.length} {kind === "work" ? "roles" : "entries"} · {subtitle}
      </p>

      <div className="card-list">
        {items.map((it, i) => {
          const photos = (it.proof || []).filter((p) => p.type === "photo").length;
          return (
            <button key={it.id} type="button" className="card list-card" onClick={() => setSelectedId(it.id)}>
              <span className="list-thumb" style={{ background: tint(i) }}>
                {it.cover ? <img src={asset(it.cover)} alt="" loading="lazy" /> : <span aria-hidden="true">{kind === "work" ? "💼" : "🏆"}</span>}
              </span>
              <span className="list-text">
                <strong>{it.title}</strong>
                <span className="muted">{it.meta}</span>
                {it.summary && <span className="list-summary">{it.summary}</span>}
                <span className="chip">{it.badge || `${photos} proof photo${photos === 1 ? "" : "s"}`}</span>
              </span>
              <svg className="chevron" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
