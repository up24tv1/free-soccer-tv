import { NextRequest, NextResponse } from "next/server";

const VALID_COMPETITIONS = [2021, 2014, 2019, 2002, 2015, 2001];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const competitionId = parseInt(searchParams.get("competition") || "2021");

  if (!VALID_COMPETITIONS.includes(competitionId)) {
    return NextResponse.json({ error: "Invalid competition" }, { status: 400 });
  }

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  try {
    if (!apiKey) {
      return NextResponse.json(getDemoStandings(competitionId), {
        headers: { "Cache-Control": "public, max-age=300" },
      });
    }

    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${competitionId}/standings`,
      {
        headers: { "X-Auth-Token": apiKey },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.error("Standings error:", res.status);
      return NextResponse.json(getDemoStandings(competitionId), {
        headers: { "Cache-Control": "public, max-age=300" },
      });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=300" },
    });
  } catch (error) {
    console.error("Standings API error:", error);
    return NextResponse.json(getDemoStandings(competitionId), {
      headers: { "Cache-Control": "public, max-age=300" },
    });
  }
}

function getDemoStandings(competitionId: number) {
  const leagueNames: Record<number, string> = {
    2021: "Premier League",
    2014: "La Liga",
    2019: "Serie A",
    2002: "Bundesliga",
    2015: "Ligue 1",
    2001: "Champions League",
  };

  const demoTeams: Record<number, string[]> = {
    2021: ["Arsenal", "Liverpool", "Manchester City", "Chelsea", "Newcastle", "Manchester United", "Tottenham", "Aston Villa", "Brighton", "West Ham"],
    2014: ["Real Madrid", "Barcelona", "Atletico Madrid", "Athletic Bilbao", "Villarreal", "Real Sociedad", "Real Betis", "Girona", "Sevilla", "Mallorca"],
    2019: ["Inter Milan", "Napoli", "AC Milan", "Juventus", "Atalanta", "Roma", "Lazio", "Bologna", "Fiorentina", "Torino"],
    2002: ["Bayern Munich", "Bayer Leverkusen", "Borussia Dortmund", "RB Leipzig", "Stuttgart", "Frankfurt", "Freiburg", "Wolfsburg", "Mainz", "Union Berlin"],
    2015: ["PSG", "Monaco", "Marseille", "Lille", "Lyon", "Lens", "Nice", "Rennes", "Strasbourg", "Toulouse"],
    2001: ["Liverpool", "Barcelona", "Arsenal", "Inter Milan", "Atletico Madrid", "Bayer Leverkusen", "Lille", "Aston Villa", "Atalanta", "Juventus"],
  };

  const teams = demoTeams[competitionId] || demoTeams[2021];

  return {
    competition: { id: competitionId, name: leagueNames[competitionId] || "League", emblem: "" },
    season: { currentMatchday: 29 },
    standings: [
      {
        stage: "REGULAR_SEASON",
        type: "TOTAL",
        table: teams.map((name, i) => ({
          position: i + 1,
          team: { id: i + 100, name, shortName: name.slice(0, 3).toUpperCase(), crest: "" },
          playedGames: 28 - Math.floor(Math.random() * 2),
          won: Math.max(0, 20 - i * 2 + Math.floor(Math.random() * 3)),
          draw: 3 + Math.floor(Math.random() * 5),
          lost: Math.max(0, i * 2 + Math.floor(Math.random() * 3)),
          goalDifference: Math.max(-10, 40 - i * 8 + Math.floor(Math.random() * 10)),
          points: Math.max(10, 70 - i * 6 + Math.floor(Math.random() * 5)),
        })),
      },
    ],
  };
}
