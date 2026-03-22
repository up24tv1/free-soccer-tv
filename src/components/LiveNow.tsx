"use client";

import { EnrichedMatch } from "@/lib/types";
import { MatchCard } from "./MatchCard";
import { motion } from "framer-motion";

interface LiveNowProps {
  matches: EnrichedMatch[];
  loading: boolean;
  onWatchLive?: (streamUrl: string, channelName: string) => void;
}

export function LiveNow({ matches, loading, onWatchLive }: LiveNowProps) {
  return (
    <section id="live" className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-red">&#9679;</span> Live Now
        </h2>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-xl p-4 animate-pulse h-40" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <p className="text-muted text-lg">No free matches live right now</p>
            <p className="text-muted/60 text-sm mt-1">
              Check the schedule below for upcoming free streams
            </p>
          </div>
        ) : (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} onWatchLive={onWatchLive} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
