export interface IdentityFont {
  id: string;
  display: string;
  body: string;
  mono: string;
  google_fonts_url: string;
  stack_display: string;
  stack_body: string;
  stack_mono: string;
}

export interface IdentityPalette {
  id: string;
  hue: number;
  neutral_family: string;
  accent: string;
  accent_dark: string;
  surface: string;
  surface_alt: string;
  fg: string;
  fg_muted: string;
  border: string;
  surface_dark: string;
  surface_alt_dark: string;
  fg_dark: string;
  fg_muted_dark: string;
  border_dark: string;
}

export interface IdentityLayout {
  id: "magazine" | "dashboard" | "feed" | "directory" | "longform" | "kiosk";
  component: string;
  component_path: string;
  density: "loose" | "normal" | "dense";
  brief: string;
}

export interface IdentityVoice {
  id: string;
  label_latest: string;
  label_recent: string;
  label_featured: string;
  label_more: string;
  nav_posts: string;
  nav_about: string;
  cta_subscribe: string;
  cta_subscribe_desc: string;
  cta_button: string;
  site_motto: string;
}

export interface Identity {
  font: IdentityFont;
  palette: IdentityPalette;
  layout: IdentityLayout;
  voice: IdentityVoice;
}

export const identity: Identity = {
  "font": {
    "id": "f04_serif_lora_dmsans",
    "display": "Lora",
    "body": "DM Sans",
    "mono": "DM Mono",
    "google_fonts_url": "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap",
    "stack_display": "Lora, \"Iowan Old Style\", Georgia, serif",
    "stack_body": "\"DM Sans\", \"Helvetica Neue\", system-ui, sans-serif",
    "stack_mono": "\"DM Mono\", ui-monospace, monospace"
  },
  "palette": {
    "id": "p28_h79_newsprint",
    "hue": 79,
    "neutral_family": "newsprint",
    "accent": "161 219 36",
    "accent_dark": "187 238 79",
    "surface": "253 252 247",
    "surface_alt": "248 246 238",
    "fg": "16 15 12",
    "fg_muted": "96 90 76",
    "border": "224 220 208",
    "surface_dark": "18 16 12",
    "surface_alt_dark": "28 24 20",
    "fg_dark": "240 236 226",
    "fg_muted_dark": "172 164 148",
    "border_dark": "56 50 40"
  },
  "layout": {
    "id": "dashboard",
    "component": "HomeDashboard",
    "component_path": "@components/clusters/HomeDashboard.astro",
    "density": "normal",
    "brief": "Sidebar + main + right rail metric cards."
  },
  "voice": {
    "id": "v02_news",
    "label_latest": "On the wire",
    "label_recent": "More incidents",
    "label_featured": "Top story",
    "label_more": "Continue reading",
    "nav_posts": "Stories",
    "nav_about": "Newsroom",
    "cta_subscribe": "The daily brief",
    "cta_subscribe_desc": "One email a day. Incidents, breaches, advisories.",
    "cta_button": "Get the brief",
    "site_motto": "Daily AI security reporting."
  }
} as const;
