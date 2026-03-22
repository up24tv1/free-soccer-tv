import { EnrichedMatch, Highlight, LeagueStanding } from "./types";

export async function fetchMatches(): Promise<EnrichedMatch[]> {
  const res = await fetch("/api/matches");
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data = await res.json();
  return data.matches;
}

export async function fetchHighlights(): Promise<Highlight[]> {
  const res = await fetch("/api/highlights");
  if (!res.ok) throw new Error("Failed to fetch highlights");
  const data = await res.json();
  return data.highlights;
}

export async function fetchStandings(competitionId: number): Promise<LeagueStanding> {
  const res = await fetch(`/api/standings?competition=${competitionId}`);
  if (!res.ok) throw new Error("Failed to fetch standings");
  return res.json();
}
