import { FREE_CHANNELS } from "./channels";
import { EnrichedMatch, FreeChannel } from "./types";

export function getChannelsForCompetition(competitionId: number): FreeChannel[] {
  return FREE_CHANNELS.filter((ch) =>
    ch.competitions.includes(competitionId)
  );
}

export function enrichMatchWithChannels(match: Record<string, unknown>): EnrichedMatch {
  const competition = match.competition as { id: number; name: string; emblem: string };
  const channels = getChannelsForCompetition(competition.id);
  return {
    ...match,
    freeChannels: channels,
  } as EnrichedMatch;
}

export function sortMatches(matches: EnrichedMatch[]): EnrichedMatch[] {
  const statusOrder: Record<string, number> = {
    IN_PLAY: 0,
    PAUSED: 1,
    TIMED: 2,
    SCHEDULED: 3,
    FINISHED: 4,
    POSTPONED: 5,
    CANCELLED: 6,
    SUSPENDED: 7,
  };

  return [...matches].sort((a, b) => {
    const aOrder = statusOrder[a.status] ?? 99;
    const bOrder = statusOrder[b.status] ?? 99;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
  });
}
