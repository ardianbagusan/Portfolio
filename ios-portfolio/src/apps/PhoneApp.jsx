import profile from "../data/profile.json";
import { resolveLink } from "../lib.js";

export default function PhoneApp({ onOpenApp }) {
  return (
    <div className="page contact">
      <div className="avatar" aria-hidden="true">{profile.name.charAt(0)}</div>
      <h1 className="contact-name">{profile.name}</h1>
      <p className="page-sub center">{profile.title}</p>

      <div className="contact-actions">
        <button type="button" className="card action" onClick={() => onOpenApp("messages")}>
          <span aria-hidden="true">💬</span>message
        </button>
        <a className="card action" href={resolveLink("phone")}>
          <span aria-hidden="true">📞</span>call
        </a>
        <a className="card action" href={resolveLink("email")}>
          <span aria-hidden="true">✉️</span>mail
        </a>
      </div>

      <div className="card fields">
        <a href={resolveLink("phone")}>
          <span className="muted small">phone</span>
          <span className="field-value">{profile.phone}</span>
        </a>
        <a href={resolveLink("email")}>
          <span className="muted small">email</span>
          <span className="field-value">{profile.email}</span>
        </a>
      </div>
    </div>
  );
}
