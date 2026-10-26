import projects from "../data/projects.json";
import { asset, tint } from "../lib.js";

export default function BrowserApp() {
  return (
    <div className="page browser">
      <h1 className="page-title">Built by me</h1>
      <p className="page-sub">Projects that are live on the internet</p>

      <div className="card-list">
        {projects.map((p, i) => (
          <article key={p.id} className="card project">
            <div className="project-preview" style={{ background: tint(i) }}>
              {p.preview ? <img src={asset(p.preview)} alt="" loading="lazy" /> : <span className="placeholder-art browser-art" aria-hidden="true" />}
            </div>
            <div className="project-row">
              <div className="grow">
                <h2 className="project-name">{p.name}</h2>
                <p className="muted">{p.summary}</p>
                <div className="chips">
                  {p.tags.map((t, j) => (
                    <span key={j} className="chip plain">{t}</span>
                  ))}
                </div>
              </div>
              <a className="open-btn" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name}`}>
                Open
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="url-bar" aria-hidden="true">🧭 Projects</div>
    </div>
  );
}
