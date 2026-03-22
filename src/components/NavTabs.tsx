"use client";

import { useState } from "react";

const TABS = [
  { id: "live", label: "Live Now" },
  { id: "today", label: "Today" },
  { id: "channels", label: "Channels" },
  { id: "highlights", label: "Highlights" },
  { id: "standings", label: "Standings" },
];

export function NavTabs() {
  const [active, setActive] = useState("live");

  const handleClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-2 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              active === tab.id
                ? "bg-emerald/15 text-emerald"
                : "text-muted hover:text-foreground hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
