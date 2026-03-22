import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.scorebat.com/video-api/v3/feed/?token=MTI3NDk2_NTcwMjU1Mzk1", {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { highlights: getDemoHighlights() },
        { headers: { "Cache-Control": "public, max-age=120" } }
      );
    }

    const data = await res.json();

    const highlights = (data.response || data || []).slice(0, 12).map((item: Record<string, unknown>) => ({
      title: item.title || "",
      embed: (item.videos as Array<{ embed: string }>)?.[0]?.embed || "",
      thumbnail: item.thumbnail || "",
      url: item.url || item.matchviewUrl || "",
      competition: item.competition || { name: "Unknown", id: 0 },
      matchviewUrl: item.matchviewUrl || "",
      date: item.date || new Date().toISOString(),
      videos: item.videos || [],
    }));

    return NextResponse.json(
      { highlights },
      { headers: { "Cache-Control": "public, max-age=120" } }
    );
  } catch (error) {
    console.error("Highlights API error:", error);
    return NextResponse.json(
      { highlights: getDemoHighlights() },
      { headers: { "Cache-Control": "public, max-age=120" } }
    );
  }
}

function getDemoHighlights() {
  return [
    {
      title: "Arsenal vs Manchester City - Highlights",
      embed: "",
      thumbnail: "",
      url: "#",
      competition: { name: "Premier League", id: 2021 },
      matchviewUrl: "#",
      date: new Date().toISOString(),
      videos: [],
    },
    {
      title: "Barcelona vs PSG - Champions League Highlights",
      embed: "",
      thumbnail: "",
      url: "#",
      competition: { name: "Champions League", id: 2001 },
      matchviewUrl: "#",
      date: new Date().toISOString(),
      videos: [],
    },
    {
      title: "Real Madrid vs Atletico Madrid - La Liga Highlights",
      embed: "",
      thumbnail: "",
      url: "#",
      competition: { name: "La Liga", id: 2014 },
      matchviewUrl: "#",
      date: new Date().toISOString(),
      videos: [],
    },
  ];
}
