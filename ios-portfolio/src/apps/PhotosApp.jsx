import { useState } from "react";
import photos from "../data/photos.json";
import { asset, tint } from "../lib.js";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "competition", label: "Competition" },
  { id: "work", label: "Work" },
];

export default function PhotosApp() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const shown = photos.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="page">
      <h1 className="page-title">Photos</h1>
      <p className="page-sub">Competition moments · {photos.length} photos</p>

      <div className="segmented" role="tablist" aria-label="Filter photos">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" role="tab" aria-selected={filter === f.id} className={filter === f.id ? "on" : ""} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="photo-grid">
        {shown.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`photo-cell ${i === 0 && filter === "all" ? "big" : ""}`}
            style={{ background: tint(i) }}
            onClick={() => setOpen(p)}
            aria-label={p.caption}
          >
            {p.thumb ? <img src={asset(p.thumb)} alt="" loading="lazy" /> : <span className="placeholder-art" aria-hidden="true" />}
          </button>
        ))}
        {shown.length === 0 && <p className="empty">No photos in this category yet.</p>}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-label={open.caption} onClick={() => setOpen(null)}>
          {open.full || open.thumb ? <img src={asset(open.full || open.thumb)} alt={open.caption} /> : <span className="lightbox-placeholder" aria-hidden="true" />}
          <p>{open.caption}</p>
          <button type="button" className="lightbox-close">Close</button>
        </div>
      )}
    </div>
  );
}
