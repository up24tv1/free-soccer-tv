import { FreeChannel } from "./types";

export const FREE_CHANNELS: FreeChannel[] = [
  // === GLOBAL (works everywhere) ===
  {
    id: "fifa_plus",
    name: "FIFA+",
    url: "https://www.fifa.com/fifaplus/en/watch",
    color: "#326295",
    description: "Free worldwide — World Cup, international tournaments, documentaries",
    competitions: [2000, 2077, 2018],
    streamUrl: "https://a62dad94.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWV1X0ZJRkFQbHVzRW5nbGlzaF9ITFM/playlist.m3u8",
    streamType: "hls",
    region: "global",
  },
  {
    id: "bein_xtra",
    name: "beIN SPORTS Xtra",
    url: "https://www.beinsports.com/en/bein-sports-xtra",
    color: "#d4a843",
    description: "Free global — La Liga, Ligue 1, and international soccer",
    competitions: [2014, 2015],
    streamUrl: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bein-sports-xtra/playlist.m3u8",
    streamType: "hls",
    region: "global",
  },
  {
    id: "barca_tv",
    name: "Barca TV",
    url: "https://www.fcbarcelona.com/en/barcatv",
    color: "#a50044",
    description: "Free worldwide — FC Barcelona matches, press conferences, content",
    competitions: [],
    streamUrl: "https://live20.bozztv.com/dvrfl06/astv/astv-barca/index.m3u8",
    streamType: "hls",
    region: "global",
  },

  // === AFRICA ===
  {
    id: "africa24_sport",
    name: "Africa 24 Sport",
    url: "https://africa24sport.com",
    color: "#e67e22",
    description: "Free — African football, CAF competitions, continental coverage",
    competitions: [],
    streamUrl: "https://africa24.vedge.infomaniak.com/livecast/ik:africa24sport/manifest.m3u8",
    streamType: "hls",
    region: "africa",
  },
  {
    id: "sports_connect_za",
    name: "Sports Connect",
    url: "https://www.sportsconnect.co.za",
    color: "#27ae60",
    description: "Free South Africa — local and international sports",
    competitions: [],
    streamUrl: "https://streamdot.broadpeak.io/cff02a74da64d1459391ce1f72d58f1a/afxpstr/SportsConnect/index.m3u8",
    streamType: "hls",
    region: "africa",
  },

  // === MIDDLE EAST (Arabic soccer coverage) ===
  {
    id: "alkass_one",
    name: "Alkass One",
    url: "https://www.alkass.net",
    color: "#c0392b",
    description: "Free — Premier League, Champions League, Qatar Stars League",
    competitions: [2021, 2001],
    streamUrl: "https://liveeu-gcp.alkassdigital.net/alkass1-p/main.m3u8",
    streamType: "hls",
    region: "global",
  },

  // === US ===
  {
    id: "cbs_golazo",
    name: "CBS Golazo",
    url: "https://www.cbssports.com/soccer/golazo-network/",
    color: "#0055ff",
    description: "Free 24/7 — Champions League, Serie A, NWSL, USL (US)",
    competitions: [2001, 2019, 2152],
    streamUrl: "https://dai.google.com/linear/hls/event/GxrCGmwST0ixsrc_QgB6qw/master.m3u8",
    streamType: "hls",
    region: "us",
  },
  {
    id: "pluto_tv_golazo",
    name: "Pluto TV (Golazo)",
    url: "https://pluto.tv/us/live-tv/63a0e33a45264d000850ed7e",
    color: "#23252b",
    description: "CBS Golazo on Pluto TV — free ad-supported (US)",
    competitions: [2001, 2019],
    streamType: "iframe",
    region: "us",
  },
  {
    id: "tubi",
    name: "Tubi",
    url: "https://tubitv.com/category/sports",
    color: "#fa382f",
    description: "FOX Sports content — replays, highlights, Bundesliga (US)",
    competitions: [2002],
    streamType: "link",
    region: "us",
  },

  // === MORE GLOBAL ===
  {
    id: "fifa_plus_french",
    name: "FIFA+ (French)",
    url: "https://www.fifa.com/fifaplus/fr/watch",
    color: "#326295",
    description: "Free worldwide — FIFA content in French",
    competitions: [2000, 2018],
    streamUrl: "https://37b4c228.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWZyX0ZJRkFQbHVzRnJlbmNoX0hMUw/playlist.m3u8",
    streamType: "hls",
    region: "global",
  },
  {
    id: "vix_gratis",
    name: "ViX Free",
    url: "https://www.vix.com/es/futbol",
    color: "#6c3ead",
    description: "Free Liga MX, Copa del Rey — Spanish language",
    competitions: [],
    streamType: "link",
    region: "global",
  },
];

export type Region = "all" | "global" | "us" | "africa";

export const REGIONS: { id: Region; name: string }[] = [
  { id: "all", name: "All Regions" },
  { id: "global", name: "Global" },
  { id: "africa", name: "Africa / SA" },
  { id: "us", name: "US" },
];

export function getChannelsByRegion(region: Region): FreeChannel[] {
  if (region === "all") return FREE_CHANNELS;
  return FREE_CHANNELS.filter((ch) => ch.region === region || ch.region === "global");
}

export const LEAGUE_INFO: Record<number, { name: string; emoji: string }> = {
  2021: { name: "Premier League", emoji: "EN" },
  2014: { name: "La Liga", emoji: "ES" },
  2019: { name: "Serie A", emoji: "IT" },
  2002: { name: "Bundesliga", emoji: "DE" },
  2015: { name: "Ligue 1", emoji: "FR" },
  2001: { name: "Champions League", emoji: "EU" },
  2018: { name: "European Championship", emoji: "EU" },
  2000: { name: "FIFA World Cup", emoji: "WC" },
};
