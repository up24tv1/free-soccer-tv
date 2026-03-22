"use client";

import { useState, useEffect } from "react";
import { Highlight } from "@/lib/types";
import { fetchHighlights } from "@/lib/api";

export function useHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchHighlights();
        setHighlights(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load highlights");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { highlights, loading, error };
}
