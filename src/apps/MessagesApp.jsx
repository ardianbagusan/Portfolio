import { useEffect, useRef, useState } from "react";
import chat from "../data/chat.json";
import profile from "../data/profile.json";

const TYPING_MS = 700;

// A tiny scripted chat: Ardian's lines come from chat.json, the visitor
// answers only by tapping one of the suggested replies.
export default function MessagesApp({ onOpenApp }) {
  const [log, setLog] = useState([]); // { from: "them" | "me", text, openApp? }
  const [nodeId, setNodeId] = useState(null);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const timers = useRef([]);

  const play = (id) => {
    const node = chat.nodes[id];
    if (!node) return;
    setTyping(true);
    setNodeId(null);
    node.messages.forEach((text, i) => {
      const t = setTimeout(() => {
        const last = i === node.messages.length - 1;
        setLog((l) => [...l, { from: "them", text, openApp: last ? node.openApp : undefined }]);
        if (last) {
          setTyping(false);
          setNodeId(id);
        }
      }, TYPING_MS * (i + 1));
      timers.current.push(t);
    });
  };

  useEffect(() => {
    play(chat.start);
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [log, typing]);

  const reply = (r) => {
    setLog((l) => [...l, { from: "me", text: r.label }]);
    play(r.next);
  };

  const replies = nodeId ? chat.nodes[nodeId].replies : [];

  return (
    <div className="messages">
      <div className="chat-head">
        <div className="avatar small-avatar" aria-hidden="true">{profile.name.charAt(0)}</div>
        <span>{profile.name}</span>
      </div>

      <div className="chat-log" aria-live="polite">
        <p className="chat-day">Today</p>
        {log.map((m, i) => (
          <div key={i} className={`bubble-wrap ${m.from}`}>
            <div className={`bubble ${m.from}`}>{m.text}</div>
            {m.openApp && (
              <button type="button" className="bubble-action" onClick={() => onOpenApp(m.openApp)}>
                Open {m.openApp.charAt(0).toUpperCase() + m.openApp.slice(1)}
              </button>
            )}
          </div>
        ))}
        {typing && (
          <div className="bubble-wrap them">
            <div className="bubble them typing" aria-label={`${profile.name} is typing`}>
              <i /><i /><i />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="reply-tray">
        <p className="section-label">Choose a reply</p>
        <div className="reply-list">
          {replies.map((r) => (
            <button key={r.label} type="button" className="reply" onClick={() => reply(r)}>
              {r.label}
            </button>
          ))}
          {!replies.length && <div className="reply-wait">…</div>}
        </div>
      </div>
    </div>
  );
}
