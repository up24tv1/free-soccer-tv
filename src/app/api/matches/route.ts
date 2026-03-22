import { NextResponse } from "next/server";
import { enrichMatchWithChannels, sortMatches } from "@/lib/matchChannelMap";

export async function GET() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  // Get today's date range
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  try {
    if (!apiKey) {
      // Return demo data when no API key is set
      return NextResponse.json(
        { matches: getDemoMatches() },
        { headers: { "Cache-Control": "public, max-age=30" } }
      );
    }

    const res = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${dateStr}&dateTo=${dateStr}`,
      {
        headers: { "X-Auth-Token": apiKey },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      console.error("football-data.org error:", res.status, await res.text());
      return NextResponse.json(
        { matches: getDemoMatches() },
        { headers: { "Cache-Control": "public, max-age=30" } }
      );
    }

    const data = await res.json();
    const enriched = (data.matches || []).map(enrichMatchWithChannels);
    const sorted = sortMatches(enriched);

    return NextResponse.json(
      { matches: sorted },
      { headers: { "Cache-Control": "public, max-age=30" } }
    );
  } catch (error) {
    console.error("Matches API error:", error);
    return NextResponse.json(
      { matches: getDemoMatches() },
      { headers: { "Cache-Control": "public, max-age=30" } }
    );
  }
}

function getDemoMatches() {
  const now = new Date();
  const later = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const evening = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  const finished = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const demoMatches = [
    {
      id: 1,
      competition: { id: 2021, name: "Premier League", emblem: "" },
      homeTeam: { name: "Arsenal", shortName: "ARS", crest: "" },
      awayTeam: { name: "Manchester City", shortName: "MCI", crest: "" },
      utcDate: now.toISOString(),
      status: "IN_PLAY",
      score: { fullTime: { home: 2, away: 1 }, halfTime: { home: 1, away: 0 } },
      matchday: 29,
      freeChannels: [
        { id: "cbs_golazo", name: "CBS Golazo", url: "https://www.cbssports.com/soccer/golazo-network/", color: "#0055ff", description: "Free 24/7 soccer", competitions: [2001, 2019], streamUrl: "https://dai.google.com/linear/hls/event/GxrCGmwST0ixsrc_QgB6qw/master.m3u8", streamType: "hls" as const },
        { id: "pluto_tv_golazo", name: "Pluto TV", url: "https://pluto.tv/us/live-tv/63a0e33a45264d000850ed7e", color: "#23252b", description: "Free ad-supported", competitions: [2001, 2019], streamType: "iframe" as const },
      ],
    },
    {
      id: 2,
      competition: { id: 2001, name: "Champions League", emblem: "" },
      homeTeam: { name: "FC Barcelona", shortName: "BAR", crest: "" },
      awayTeam: { name: "Paris Saint-Germain", shortName: "PSG", crest: "" },
      utcDate: later.toISOString(),
      status: "TIMED",
      score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
      matchday: 8,
      freeChannels: [
        { id: "cbs_golazo", name: "CBS Golazo", url: "https://www.cbssports.com/soccer/golazo-network/", color: "#0055ff", description: "Free 24/7 soccer", competitions: [2001], streamUrl: "https://dai.google.com/linear/hls/event/GxrCGmwST0ixsrc_QgB6qw/master.m3u8", streamType: "hls" as const },
        { id: "pluto_tv_golazo", name: "Pluto TV", url: "https://pluto.tv/us/live-tv/63a0e33a45264d000850ed7e", color: "#23252b", description: "Free ad-supported", competitions: [2001], streamType: "iframe" as const },
      ],
    },
    {
      id: 3,
      competition: { id: 2019, name: "Serie A", emblem: "" },
      homeTeam: { name: "AC Milan", shortName: "MIL", crest: "" },
      awayTeam: { name: "Inter Milan", shortName: "INT", crest: "" },
      utcDate: evening.toISOString(),
      status: "TIMED",
      score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
      matchday: 30,
      freeChannels: [
        { id: "cbs_golazo", name: "CBS Golazo", url: "https://www.cbssports.com/soccer/golazo-network/", color: "#0055ff", description: "Free 24/7 soccer", competitions: [2019], streamUrl: "https://dai.google.com/linear/hls/event/GxrCGmwST0ixsrc_QgB6qw/master.m3u8", streamType: "hls" as const },
      ],
    },
    {
      id: 4,
      competition: { id: 2014, name: "La Liga", emblem: "" },
      homeTeam: { name: "Real Madrid", shortName: "RMA", crest: "" },
      awayTeam: { name: "Atletico Madrid", shortName: "ATM", crest: "" },
      utcDate: finished.toISOString(),
      status: "FINISHED",
      score: { fullTime: { home: 3, away: 2 }, halfTime: { home: 1, away: 1 } },
      matchday: 29,
      freeChannels: [],
    },
    {
      id: 5,
      competition: { id: 2002, name: "Bundesliga", emblem: "" },
      homeTeam: { name: "Bayern Munich", shortName: "BAY", crest: "" },
      awayTeam: { name: "Borussia Dortmund", shortName: "BVB", crest: "" },
      utcDate: later.toISOString(),
      status: "TIMED",
      score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
      matchday: 27,
      freeChannels: [
        { id: "tubi", name: "Tubi", url: "https://tubitv.com/category/sports", color: "#fa382f", description: "FOX Sports content", competitions: [2002], streamType: "link" as const },
      ],
    },
    {
      id: 6,
      competition: { id: 2015, name: "Ligue 1", emblem: "" },
      homeTeam: { name: "Paris Saint-Germain", shortName: "PSG", crest: "" },
      awayTeam: { name: "Olympique Marseille", shortName: "OLM", crest: "" },
      utcDate: evening.toISOString(),
      status: "TIMED",
      score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
      matchday: 28,
      freeChannels: [],
    },
  ];

  return demoMatches;
}
