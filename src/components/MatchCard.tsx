"use client";

import { EnrichedMatch } from "@/lib/types";
import { formatKickoff, getRelativeTime } from "@/lib/timeUtils";
import { LivePulse } from "./LivePulse";
import { ChannelBadge } from "./ChannelBadge";
import { motion } from "framer-motion";

interface MatchCardProps {
  match: EnrichedMatch;
  compact?: boolean;
  onWatchLive?: (streamUrl: string, channelName: string) => void;
}

export function MatchCard({ match, compact = false, onWatchLive }: MatchCardProps) {
  const isLive = match.status === "IN_PLAY" || match.status === "PAUSED";
  const isFinished = match.status === "FINISHED";
  const hasFreeChannels = match.freeChannels.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-xl p-4 ${
        isLive ? "animate-glow-red border-red/30" : ""
      } ${!hasFreeChannels && !isLive ? "opacity-50" : ""}`}
    >
      {/* League + Status */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted font-medium uppercase tracking-wider">
          {match.competition.name}
        </span>
        <div className="flex items-center gap-1.5">
          {isLive && <LivePulse size="sm" />}
          <span
            className={`text-xs font-bold ${
              isLive
                ? "text-red"
                : isFinished
                ? "text-muted"
                : "text-emerald"
            }`}
          >
            {isLive
              ? "LIVE"
              : isFinished
              ? "FT"
              : formatKickoff(match.utcDate)}
          </span>
        </div>
      </div>

      {/* Teams + Score */}
      <div className={`flex items-center justify-between ${compact ? "gap-2" : "gap-4"}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`font-semibold truncate ${compact ? "text-sm" : "text-base"}`}>
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
            {(isLive || isFinished) && (
              <span className={`font-bold tabular-nums ${isLive ? "text-white text-lg" : "text-muted"}`}>
                {match.score.fullTime.home}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className={`font-semibold truncate ${compact ? "text-sm" : "text-base"}`}>
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
            {(isLive || isFinished) && (
              <span className={`font-bold tabular-nums ${isLive ? "text-white text-lg" : "text-muted"}`}>
                {match.score.fullTime.away}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Relative time for upcoming */}
      {!isLive && !isFinished && (
        <p className="text-xs text-muted mt-2">{getRelativeTime(match.utcDate)}</p>
      )}

      {/* Channel badges + Watch button */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {match.freeChannels.map((ch) => (
            <ChannelBadge key={ch.id} channel={ch} linked />
          ))}
          {!hasFreeChannels && (
            <span className="text-xs text-muted/60 italic">Paid only</span>
          )}
        </div>
        {hasFreeChannels && (isLive || !isFinished) && (() => {
          const hlsChannel = match.freeChannels.find(ch => ch.streamType === "hls" && ch.streamUrl);
          if (hlsChannel && onWatchLive) {
            return (
              <button
                onClick={() => onWatchLive(hlsChannel.streamUrl!, hlsChannel.name)}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald text-black text-xs font-bold hover:bg-emerald-light transition-colors"
              >
                Watch Live
              </button>
            );
          }
          return (
            <a
              href={match.freeChannels[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald text-black text-xs font-bold hover:bg-emerald-light transition-colors"
            >
              Watch Free
            </a>
          );
        })()}
      </div>
    </motion.div>
  );
}
