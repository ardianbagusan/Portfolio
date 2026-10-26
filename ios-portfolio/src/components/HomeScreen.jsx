import home from "../data/home.json";
import photos from "../data/photos.json";
import AppIcon from "./AppIcon.jsx";
import { asset, resolveLink } from "../lib.js";

function AppButton({ app, onOpenApp, showLabel = true }) {
  const content = (
    <>
      <AppIcon icon={app.icon} />
      {showLabel && <span className="app-label">{app.label}</span>}
    </>
  );

  if (app.link) {
    const href = resolveLink(app.link);
    const external = /^https?:/.test(href);
    return (
      <a className="app" href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={app.label}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className="app" onClick={() => onOpenApp(app.opens)} aria-label={app.label}>
      {content}
    </button>
  );
}

function PhotoWidget({ onOpen }) {
  const hero = photos.find((p) => p.featured) || photos[0];
  const src = hero && asset(hero.full || hero.thumb);
  return (
    <button type="button" className="photo-widget" onClick={onOpen} aria-label="Open Photos">
      {src ? <img src={src} alt="" /> : <span className="placeholder-art" aria-hidden="true" />}
      <span className="widget-chip">
        <img src={asset("icons/photos.png")} alt="" />
        Photos
      </span>
      {hero && (
        <span className="widget-caption">
          <strong>{hero.caption}</strong>
          {hero.subtitle && <span>{hero.subtitle}</span>}
        </span>
      )}
    </button>
  );
}

export default function HomeScreen({ onOpenApp }) {
  return (
    <div className="home wallpaper enter-fade">
      <PhotoWidget onOpen={() => onOpenApp("photos")} />

      <nav className="app-grid" aria-label="Apps">
        {home.grid.map((app) => (
          <AppButton key={app.id} app={app} onOpenApp={onOpenApp} />
        ))}
      </nav>

      <div className="page-dot" aria-hidden="true" />

      <nav className="glass dock" aria-label="Dock">
        {home.dock.map((app) => (
          <AppButton key={app.id} app={app} onOpenApp={onOpenApp} showLabel={false} />
        ))}
      </nav>
      <div className="home-bar" aria-hidden="true" />
    </div>
  );
}
