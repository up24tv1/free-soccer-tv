"use client";

import { useState, useCallback } from "react";
import { Hero } from "@/components/Hero";
import { NavTabs } from "@/components/NavTabs";
import { LiveNow } from "@/components/LiveNow";
import { TodaySchedule } from "@/components/TodaySchedule";
import { ChannelGuide } from "@/components/ChannelGuide";
import { Highlights } from "@/components/Highlights";
import { Standings } from "@/components/Standings";
import { LiveStreamPlayer } from "@/components/LiveStreamPlayer";
import { useMatches } from "@/hooks/useMatches";
import { useHighlights } from "@/hooks/useHighlights";

export default function Home() {
  const { matches, liveMatches, loading: matchesLoading } = useMatches();
  const { highlights, loading: highlightsLoading } = useHighlights();
  const [activePlayer, setActivePlayer] = useState<{ streamUrl: string; channelName: string } | null>(null);

  const handleWatchLive = useCallback((streamUrl: string, channelName: string) => {
    setActivePlayer({ streamUrl, channelName });
  }, []);

  return (
    <main className="min-h-screen">
      <Hero liveCount={liveMatches.length} />
      <NavTabs />
      <LiveNow matches={liveMatches} loading={matchesLoading} onWatchLive={handleWatchLive} />
      <div className="border-t border-border" />
      <TodaySchedule matches={matches} loading={matchesLoading} onWatchLive={handleWatchLive} />
      <div className="border-t border-border" />
      <ChannelGuide />
      <div className="border-t border-border" />
      <Highlights highlights={highlights} loading={highlightsLoading} />
      <div className="border-t border-border" />
      <Standings />

      {/* Footer */}
      <footer className="px-4 py-8 text-center border-t border-border">
        <p className="text-xs text-muted">
          Free Soccer TV &mdash; Free-to-air soccer streams only.
          Match data from football-data.org. Highlights from ScoreBat.
        </p>
        <p className="text-xs text-muted/50 mt-1">
          All streams are free-to-air broadcasts. No piracy. No subscriptions.
        </p>
      </footer>

      {/* Global Live Stream Player Modal */}
      {activePlayer && (
        <LiveStreamPlayer
          streamUrl={activePlayer.streamUrl}
          channelName={activePlayer.channelName}
          onClose={() => setActivePlayer(null)}
        />
      )}
    </main>
  );
}
