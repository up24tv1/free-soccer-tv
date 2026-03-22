"use client";

import { useState, useEffect, useCallback } from "react";
import { EnrichedMatch } from "@/lib/types";
import { fetchMatches } from "@/lib/api";

export function useMatches(pollInterval = 30000) {
  const [matches, setMatches] = useState<EnrichedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchMatches();
      setMatches(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load matches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, pollInterval);
    return () => clearInterval(interval);
  }, [load, pollInterval]);

  const liveMatches = matches.filter(
    (m) => m.status === "IN_PLAY" || m.status === "PAUSED"
  );

  const upcomingMatches = matches.filter(
    (m) => m.status === "TIMED" || m.status === "SCHEDULED"
  );

  const finishedMatches = matches.filter((m) => m.status === "FINISHED");

  return { matches, liveMatches, upcomingMatches, finishedMatches, loading, error, refresh: load };
}
