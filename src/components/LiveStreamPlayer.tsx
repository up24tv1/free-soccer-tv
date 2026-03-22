"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface LiveStreamPlayerProps {
  streamUrl: string;
  channelName: string;
  onClose: () => void;
}

export function LiveStreamPlayer({ streamUrl, channelName, onClose }: LiveStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setError(true);
          setLoading(false);
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        setLoading(false);
        video.play().catch(() => {});
      });
      video.addEventListener("error", () => {
        setError(true);
        setLoading(false);
      });
    } else {
      setError(true);
      setLoading(false);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [streamUrl]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse-live" />
            <span className="text-sm font-bold text-white">
              LIVE — {channelName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl leading-none px-2 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Video */}
        <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <p className="text-muted text-lg">Stream unavailable right now</p>
              <p className="text-muted/60 text-sm">The free-to-air feed may be offline or geo-restricted</p>
              <a
                href="https://www.cbssports.com/soccer/golazo-network/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald text-black text-sm font-bold hover:bg-emerald-light transition-colors"
              >
                Watch on CBS Sports
              </a>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
              playsInline
              muted
            />
          )}
        </div>

        <p className="text-xs text-muted/50 text-center mt-2">
          Free-to-air broadcast. Unmute for audio.
        </p>
      </div>
    </div>
  );
}
