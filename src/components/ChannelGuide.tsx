"use client";

import { useState } from "react";
import { FREE_CHANNELS } from "@/lib/channels";
import { FreeChannel } from "@/lib/types";
import { LiveStreamPlayer } from "./LiveStreamPlayer";
import { motion } from "framer-motion";

export function ChannelGuide() {
  const [activeStream, setActiveStream] = useState<FreeChannel | null>(null);

  const handleChannelClick = (channel: FreeChannel) => {
    if (channel.streamType === "hls" && channel.streamUrl) {
      setActiveStream(channel);
    } else {
      window.open(channel.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <section id="channels" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Free-to-Air Channels</h2>
          <p className="text-muted text-sm mb-4">
            100% free — no subscription, no login, no credit card. Click to watch live.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FREE_CHANNELS.map((channel, i) => (
              <motion.button
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5 group cursor-pointer transition-all hover:scale-[1.02] text-left w-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: channel.color }}
                  >
                    {channel.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-emerald transition-colors">
                      {channel.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-emerald font-medium">FREE</span>
                      {channel.streamType === "hls" && (
                        <span className="flex items-center gap-1 text-xs text-red font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-live" />
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted">{channel.description}</p>
                <div className="mt-3 text-xs text-emerald/70 group-hover:text-emerald transition-colors">
                  {channel.streamType === "hls"
                    ? "Watch live now \u25B6"
                    : "Open channel \u2192"}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stream Modal */}
      {activeStream && activeStream.streamUrl && (
        <LiveStreamPlayer
          streamUrl={activeStream.streamUrl}
          channelName={activeStream.name}
          onClose={() => setActiveStream(null)}
        />
      )}
    </>
  );
}
