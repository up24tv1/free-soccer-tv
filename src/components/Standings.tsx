"use client";

import { useState } from "react";
import { useStandings } from "@/hooks/useStandings";
import { motion } from "framer-motion";

const LEAGUES = [
  { id: 2021, name: "Premier League" },
  { id: 2014, name: "La Liga" },
  { id: 2019, name: "Serie A" },
  { id: 2002, name: "Bundesliga" },
  { id: 2015, name: "Ligue 1" },
];

export function Standings() {
  const [selectedLeague, setSelectedLeague] = useState(2021);
  const { standings, loading } = useStandings(selectedLeague);

  const table = standings?.standings?.[0]?.table || [];

  return (
    <section id="standings" className="px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Standings</h2>

        {/* League selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none">
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedLeague === league.id
                  ? "bg-emerald/15 text-emerald"
                  : "text-muted hover:text-foreground glass-card"
              }`}
            >
              {league.name}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 animate-pulse">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-8 bg-surface-2 rounded mb-2" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-xs uppercase tracking-wider">
                    <th className="p-3 text-left w-8">#</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-center w-10">P</th>
                    <th className="p-3 text-center w-10">W</th>
                    <th className="p-3 text-center w-10">D</th>
                    <th className="p-3 text-center w-10">L</th>
                    <th className="p-3 text-center w-12">GD</th>
                    <th className="p-3 text-center w-12 font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((entry, i) => (
                    <motion.tr
                      key={entry.team.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`border-b border-border/50 hover:bg-white/[0.02] transition-colors ${
                        entry.position <= 4
                          ? "border-l-2 border-l-emerald"
                          : table.length > 5 && entry.position > table.length - 3
                          ? "border-l-2 border-l-red"
                          : ""
                      }`}
                    >
                      <td className="p-3 text-muted font-mono text-xs">
                        {entry.position}
                      </td>
                      <td className="p-3 font-medium">{entry.team.name}</td>
                      <td className="p-3 text-center text-muted">{entry.playedGames}</td>
                      <td className="p-3 text-center">{entry.won}</td>
                      <td className="p-3 text-center text-muted">{entry.draw}</td>
                      <td className="p-3 text-center text-muted">{entry.lost}</td>
                      <td
                        className={`p-3 text-center font-mono ${
                          entry.goalDifference > 0
                            ? "text-emerald"
                            : entry.goalDifference < 0
                            ? "text-red"
                            : "text-muted"
                        }`}
                      >
                        {entry.goalDifference > 0 ? "+" : ""}
                        {entry.goalDifference}
                      </td>
                      <td className="p-3 text-center font-bold">{entry.points}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
