export interface FreeChannel {
  id: string;
  name: string;
  url: string;
  color: string;
  description: string;
  competitions: number[];
  streamUrl?: string;
  streamType: "hls" | "iframe" | "link";
}

export interface EnrichedMatch {
  id: number;
  competition: {
    id: number;
    name: string;
    emblem: string;
  };
  homeTeam: {
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    crest: string;
  };
  utcDate: string;
  status: "SCHEDULED" | "TIMED" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELLED" | "SUSPENDED";
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
  matchday: number;
  freeChannels: FreeChannel[];
}

export interface Highlight {
  title: string;
  embed: string;
  thumbnail: string;
  url: string;
  competition: { name: string; id: number };
  matchviewUrl: string;
  date: string;
  videos: { title: string; embed: string }[];
}

export interface StandingEntry {
  position: number;
  team: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalDifference: number;
  points: number;
}

export interface LeagueStanding {
  competition: { id: number; name: string; emblem: string };
  season: { currentMatchday: number };
  standings: { stage: string; type: string; table: StandingEntry[] }[];
}

export type MatchStatus = EnrichedMatch["status"];
