"use client";

import { useEffect, useState } from "react";
import { getCurrentTimeString, getTodayDateString } from "@/lib/timeUtils";
import { LivePulse } from "./LivePulse";

interface HeroProps {
  liveCount: number;
}

export function Hero({ liveCount }: HeroProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setTime(getCurrentTimeString());
    setDate(getTodayDateString());
    const interval = setInterval(() => {
      setTime(getCurrentTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative px-4 pt-8 pb-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-emerald to-emerald-light bg-clip-text text-transparent">
                Free Soccer TV
              </span>
            </h1>
            <p className="text-muted text-sm mt-1">
              Every free legal soccer stream in one place
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-muted">{time}</p>
            <p className="text-xs text-muted/60 mt-0.5">{date}</p>
          </div>
        </div>

        {liveCount > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red/10 border border-red/20">
            <LivePulse size="md" />
            <span className="text-sm font-bold text-red">
              {liveCount} LIVE NOW
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
