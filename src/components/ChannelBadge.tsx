"use client";

import { FreeChannel } from "@/lib/types";

export function ChannelBadge({ channel, linked = false }: { channel: FreeChannel; linked?: boolean }) {
  const content = (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white/90 transition-all hover:brightness-125"
      style={{ backgroundColor: channel.color || "#333" }}
    >
      {channel.name}
    </span>
  );

  if (linked) {
    return (
      <a href={channel.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
