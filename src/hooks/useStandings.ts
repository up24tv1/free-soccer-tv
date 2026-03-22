"use client";

import { useState, useEffect, useCallback } from "react";
import { LeagueStanding } from "@/lib/types";
import { fetchStandings } from "@/lib/api";

export function useStandings(competitionId: number) {
  const [standings, setStandings] = useState<LeagueStanding | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchStandings(competitionId);
      setStandings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load standings");
    } finally {
      setLoading(false);
    }
  }, [competitionId]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 300000); // 5 min
    return () => clearInterval(interval);
  }, [load]);

  return { standings, loading, error };
}
