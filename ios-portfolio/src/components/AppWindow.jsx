import { useState } from "react";

// Full-screen container for an opened app: grows in, and closes from the
// "Home" button or the bar at the bottom.
export default function AppWindow({ title, onClose, children }) {
  const [closing, setClosing] = useState(false);
  const close = () => {
    setClosing(true);
    setTimeout(onClose, 200);
  };

  return (
    <section className={`app-window ${closing ? "closing" : ""}`} aria-label={title}>
      <header className="app-header">
        <button type="button" className="back" onClick={close}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </button>
      </header>
      <div className="app-body">{children}</div>
      <button type="button" className="home-bar home-bar-button" onClick={close} aria-label="Close app" />
    </section>
  );
}
