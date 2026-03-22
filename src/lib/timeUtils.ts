export function formatKickoff(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatDate(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getRelativeTime(utcDate: string): string {
  const now = new Date();
  const kickoff = new Date(utcDate);
  const diffMs = kickoff.getTime() - now.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 0) return "Started";
  if (diffMin === 0) return "Now";
  if (diffMin < 60) return `In ${diffMin}m`;
  if (diffMin < 1440) {
    const hours = Math.floor(diffMin / 60);
    return `In ${hours}h ${diffMin % 60}m`;
  }
  return formatDate(utcDate);
}

export function isToday(utcDate: string): boolean {
  const date = new Date(utcDate);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function getCurrentTimeString(): string {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function getTodayDateString(): string {
  return new Date().toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
