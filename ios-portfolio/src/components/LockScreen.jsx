import { useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";
import { asset } from "../lib.js";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const UNLOCK_DISTANCE = 120; // px the finger must travel up

export default function LockScreen({ onUnlock }) {
  const now = useClock();
  const [drag, setDrag] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const startY = useRef(null);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });

  const unlock = () => {
    setLeaving(true);
    setTimeout(onUnlock, 320);
  };

  const onPointerDown = (e) => {
    if (e.target.closest("button")) return; // let the button handle its own click
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (startY.current === null) return;
    setDrag(Math.max(0, startY.current - e.clientY));
  };
  const onPointerUp = () => {
    if (startY.current === null) return;
    startY.current = null;
    if (drag > UNLOCK_DISTANCE) unlock();
    else setDrag(0);
  };

  const style = leaving
    ? { transform: "translateY(-100%)", transition: "transform 320ms ease-in" }
    : { transform: `translateY(${-drag}px)`, transition: drag ? "none" : "transform 220ms ease-out" };

  return (
    <div
      className="lock wallpaper"
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="lock-date">{date}</div>
      <div className="lock-time">{time}</div>

      <div className="glass notification">
        <span className="notification-icon">
          <img src={asset("icons/mail.png")} alt="" draggable="false" />
        </span>
        <div className="notification-text">
          <div className="notification-head">
            <strong>{profile.name}</strong>
            <span>now</span>
          </div>
          <div>{profile.lockNotification}</div>
        </div>
      </div>

      <button type="button" className="swipe-hint" onClick={unlock}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Swipe up to open
      </button>
      <div className="home-bar" aria-hidden="true" />
    </div>
  );
}
