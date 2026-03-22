"use client";

import { useState } from "react";
import { Highlight } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface HighlightsProps {
  highlights: Highlight[];
  loading: boolean;
}

export function Highlights({ highlights, loading }: HighlightsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="highlights" className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Highlights</h2>
        <p className="text-muted text-sm mb-4">
          Latest goals and match highlights — powered by ScoreBat
        </p>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-xl p-4 animate-pulse h-48" />
            ))}
          </div>
        ) : highlights.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <p className="text-muted text-lg">No highlights available right now</p>
            <p className="text-muted/60 text-sm mt-1">Check back after matches finish</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((hl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setExpandedId(expandedId === i ? null : i)}
              >
                {/* Thumbnail or video */}
                <AnimatePresence mode="wait">
                  {expandedId === i && hl.embed ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full pb-[56.25%]"
                    >
                      <div
                        className="absolute inset-0"
                        dangerouslySetInnerHTML={{ __html: hl.embed }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="thumb"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full pb-[56.25%] bg-surface-2"
                    >
                      {hl.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={hl.thumbnail}
                          alt={hl.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl">&#9654;</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-4xl text-white">&#9654;</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2">{hl.title}</h3>
                  <p className="text-xs text-muted mt-1">
                    {typeof hl.competition === "object" ? hl.competition.name : hl.competition}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
