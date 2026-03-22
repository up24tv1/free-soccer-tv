"use client";

import { EnrichedMatch } from "@/lib/types";
import { MatchCard } from "./MatchCard";
import { motion } from "framer-motion";

interface TodayScheduleProps {
  matches: EnrichedMatch[];
  loading: boolean;
  onWatchLive?: (streamUrl: string, channelName: string) => void;
}

export function TodaySchedule({ matches, loading, onWatchLive }: TodayScheduleProps) {
  // Group matches by competition
  const grouped = matches.reduce<Record<string, EnrichedMatch[]>>((acc, match) => {
    const key = match.competition.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {});

  return (
    <section id="today" className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Today&apos;s Schedule</h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-xl p-4 animate-pulse h-32" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <p className="text-muted text-lg">No matches scheduled today</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([league, leagueMatches]) => (
              <motion.div
                key={league}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-sm font-semibold text-emerald uppercase tracking-wider mb-3">
                  {league}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {leagueMatches.map((match) => (
                    <MatchCard key={match.id} match={match} compact onWatchLive={onWatchLive} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
