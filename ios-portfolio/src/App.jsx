import { useEffect, useState } from "react";
import PhoneFrame from "./components/PhoneFrame.jsx";
import LockScreen from "./components/LockScreen.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import AppWindow from "./components/AppWindow.jsx";
import PhotosApp from "./apps/PhotosApp.jsx";
import ListApp from "./apps/ListApp.jsx";
import PhoneApp from "./apps/PhoneApp.jsx";
import BrowserApp from "./apps/BrowserApp.jsx";
import MessagesApp from "./apps/MessagesApp.jsx";
import competitions from "./data/competitions.json";
import work from "./data/work.json";

const TITLES = {
  photos: "Photos",
  competition: "Competition",
  work: "Work",
  phone: "Phone",
  browser: "Browser",
  messages: "Messages",
};

export default function App() {
  const [screen, setScreen] = useState("lock"); // "lock" | "home"
  const [openApp, setOpenApp] = useState(null); // null | key of TITLES

  // Escape closes the open app (keyboard users and desktop visitors).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenApp(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderApp = () => {
    switch (openApp) {
      case "photos":
        return <PhotosApp />;
      case "competition":
        return <ListApp title="Competition" subtitle="Key points and proof" items={competitions} kind="competition" />;
      case "work":
        return <ListApp title="Work" subtitle="Roles, key points and proof" items={work} kind="work" />;
      case "phone":
        return <PhoneApp onOpenApp={setOpenApp} />;
      case "browser":
        return <BrowserApp />;
      case "messages":
        return <MessagesApp onOpenApp={setOpenApp} />;
      default:
        return null;
    }
  };

  return (
    <PhoneFrame>
      {screen === "lock" ? (
        <LockScreen onUnlock={() => setScreen("home")} />
      ) : (
        <HomeScreen onOpenApp={setOpenApp} />
      )}
      {openApp && (
        <AppWindow key={openApp} title={TITLES[openApp]} onClose={() => setOpenApp(null)}>
          {renderApp()}
        </AppWindow>
      )}
    </PhoneFrame>
  );
}
