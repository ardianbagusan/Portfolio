import { asset } from "../lib.js";

// Draws an icon from home.json: { image, tile } or { emoji }.
export default function AppIcon({ icon }) {
  if (icon.image) {
    return (
      <span className={`icon ${icon.tile ? "icon-tile" : ""}`} aria-hidden="true">
        <img src={asset(icon.image)} alt="" draggable="false" />
      </span>
    );
  }
  return (
    <span className="icon icon-tile icon-emoji" aria-hidden="true">
      {icon.emoji}
    </span>
  );
}
