import os
import re
import time
import json
import base64
import datetime
import urllib.request

USERNAME = os.getenv("GITHUB_ACTOR", "obedjoshua")
TOKEN = os.getenv("GITHUB_TOKEN", "")

THEMES = {
    "lavenderNoir": {
        "bg": "#0d1117", "card": "#1d1b22", "cardHigh": "#27242e", "border": "#30363d",
        "accent": "#c8bfff", "onAccent": "#251e4a", "playerBg": "#2c1d33",
        "text": "#f2eff7", "muted": "#9e99aa",
    },
    "materialBlue": {
        "bg": "#0b101b", "card": "#151c2c", "cardHigh": "#1e273b", "border": "#2a354d",
        "accent": "#a8c7fa", "onAccent": "#062e6f", "playerBg": "#1b273d",
        "text": "#eef2ff", "muted": "#94a3b8",
    },
    "emeraldNight": {
        "bg": "#09110e", "card": "#131f1b", "cardHigh": "#1b2b25", "border": "#263b33",
        "accent": "#86efac", "onAccent": "#052e16", "playerBg": "#162922",
        "text": "#ecfdf5", "muted": "#9ca3af",
    },
    "githubDark": {
        "bg": "#0d1117", "card": "#161b22", "cardHigh": "#21262d", "border": "#30363d",
        "accent": "#58a6ff", "onAccent": "#0d1117", "playerBg": "#1f242c",
        "text": "#f0f6fc", "muted": "#8b949e",
    },
}

os.makedirs("dist", exist_ok=True)

def xml_esc(s):
    return (
        str(s or "")
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )

def gh_get_json(url, default):
    headers = {
        "User-Agent": "README-Studio-Generator",
        "Accept": "application/vnd.github+json",
    }
    if TOKEN:
        headers["Authorization"] = f"Bearer {TOKEN}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as res:
            return json.loads(res.read().decode())
    except Exception as e:
        print(f"Warning: {url} failed ({e}), using fallback.")
        return default

def fetch_b64_image(url):
    if not url:
        return ""
    if str(url).startswith("data:image/"):
        return url
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "README-Studio"})
        with urllib.request.urlopen(req, timeout=10) as res:
            mime = res.headers.get_content_type() or "image/jpeg"
            b64 = base64.b64encode(res.read()).decode("utf-8")
            return f"data:{mime};base64,{b64}"
    except Exception:
        return ""

def load_readme_studio_config(user):
    bust = int(time.time())
    urls = [
        f"https://raw.githubusercontent.com/{user}/{user}/main/README.md?t={bust}",
        f"https://raw.githubusercontent.com/{user}/{user}/master/README.md?t={bust}",
    ]
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "README-Studio-Sync", "Cache-Control": "no-cache"})
            with urllib.request.urlopen(req, timeout=10) as res:
                md = res.read().decode("utf-8", errors="ignore")
            m = re.search(r"<!--\s*STUDIO_CONFIG:(\{.*?\})\s*-->", md, re.DOTALL)
            if m:
                print(f"Loaded STUDIO_CONFIG from {url}")
                return json.loads(m.group(1))
        except Exception as e:
            print(f"Note: {url} -> {e}")
    return {}

cfg = load_readme_studio_config(USERNAME)
ACTIVE_USER = cfg.get("username") or USERNAME
theme_key = cfg.get("theme") if cfg.get("theme") in THEMES else "lavenderNoir"
t = THEMES[theme_key]

BG = t["bg"]
CARD = t["card"]
CARD_HIGH = t["cardHigh"]
BORDER = t["border"]
ACCENT = t["accent"]
ON_ACCENT = t["onAccent"]
PLAYER_BG = t["playerBg"]
TEXT = t["text"]
MUTED = t["muted"]

user_data = gh_get_json(f"https://api.github.com/users/{ACTIVE_USER}", {})
events = gh_get_json(f"https://api.github.com/users/{ACTIVE_USER}/events/public?per_page=100", [])

avatar_url = user_data.get("avatar_url") or f"https://github.com/{ACTIVE_USER}.png"
avatar_uri = fetch_b64_image(avatar_url)
avatar_tag = (
    f'<image href="{avatar_uri}" x="108" y="24" width="76" height="76" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)" />'
    if avatar_uri
    else '<circle cx="146" cy="62" r="38" fill="#2b2836" />'
)

is_online = isinstance(events, list) and len(events) > 0
status_dot = "#34d399" if is_online else "#94a3b8"
status_label = "Online • Recently Active" if is_online else "Offline • Idle"
location_label = xml_esc(user_data.get("location") or "Angeles, Philippines")
repos_count = user_data.get("public_repos", 14)
followers_count = user_data.get("followers", 2)

tagline = xml_esc(cfg.get("tagline") or "BSIT Student & Full-Stack Developer")
greeting = cfg.get("greeting") or f"Hi, I'm {ACTIVE_USER} — crafting resilient software & interfaces."
bio1 = cfg.get("bioParagraph1") or "I bridge the gap between clean architecture and practical tooling—building full-stack web apps, AI platforms, and resilient backend services."
bio2 = xml_esc(cfg.get("bioParagraph2") or "Currently focused on distributed systems and open-source utilities.")

words = bio1.split()
line1_words, line2_words = [], []
for w in words:
    if len(" ".join(line1_words + [w])) <= 74 and not line2_words:
        line1_words.append(w)
    else:
        line2_words.append(w)
bio1_l1 = xml_esc(" ".join(line1_words))
bio1_l2 = xml_esc(" ".join(line2_words)[:82])

raw_langs = cfg.get("selectedLangs") or ["python", "rust", "ts"]
pill_langs = [str(x).upper()[:6] for x in raw_langs[:3]]
while len(pill_langs) < 3:
    pill_langs.append("CODE")

pills_svg = ""
for idx, label in enumerate(pill_langs):
    px_box = 68 + idx * 54
    px_txt = px_box + 23
    pills_svg += f'<rect x="{px_box}" y="166" width="46" height="20" rx="10" fill="{CARD_HIGH}" /><text x="{px_txt}" y="179" text-anchor="middle" font-family="\x27Google Sans\x27, \x27Segoe UI\x27, Roboto, sans-serif" font-weight="700" font-size="9.5" fill="{MUTED}">{xml_esc(label)}</text>' + chr(10) + "  "

greeting_font_size = 21 if len(greeting) > 36 else 25

hero_svg = f"""<svg width="820" height="310" viewBox="0 0 820 310" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="avatarClip"><circle cx="146" cy="62" r="38" /></clipPath>
    <radialGradient id="ambientGlow" cx="72%" cy="25%" r="55%">
      <stop offset="0%" stop-color="{ACCENT}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="{BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0.5" y="0.5" width="819" height="309" rx="28" fill="{BG}" stroke="{BORDER}" />
  <rect x="1" y="1" width="818" height="308" rx="28" fill="url(#ambientGlow)" />

  <rect x="24" y="20" width="244" height="270" rx="24" fill="{CARD}" stroke="#ffffff" stroke-opacity="0.07" />
  {avatar_tag}
  <circle cx="146" cy="62" r="38" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
  <text x="146" y="122" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="18" fill="{TEXT}">{xml_esc(ACTIVE_USER)}</text>
  <text x="146" y="141" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="11" fill="{MUTED}">{tagline}</text>
  {pills_svg}
  <line x1="42" y1="198" x2="250" y2="198" stroke="#ffffff" stroke-opacity="0.07" />
  <circle cx="48" cy="216" r="4" fill="{status_dot}" />
  <text x="58" y="220" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="{TEXT}">{status_label}</text>

  <rect x="40" y="232" width="212" height="22" rx="8" fill="{CARD_HIGH}" />
  <text x="48" y="246" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="10" fill="{MUTED}">{location_label}</text>

  <rect x="40" y="259" width="212" height="22" rx="8" fill="{CARD_HIGH}" />
  <text x="48" y="273" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="10" fill="{MUTED}">Repos / Followers</text>
  <text x="244" y="273" text-anchor="end" font-family="monospace" font-weight="700" font-size="10" fill="{TEXT}">{repos_count} / {followers_count}</text>

  <text x="302" y="54" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" letter-spacing="2" fill="{MUTED}">ABOUT ME • README</text>
  <text x="302" y="92" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="{greeting_font_size}" fill="{TEXT}">{xml_esc(greeting)}</text>
  <text x="302" y="132" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#d4cfe0">{bio1_l1}</text>
  <text x="302" y="152" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#d4cfe0">{bio1_l2}</text>
  <text x="302" y="186" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="12" fill="{MUTED}">{bio2}</text>

  <rect x="302" y="226" width="136" height="34" rx="17" fill="{ACCENT}" />
  <text x="370" y="247" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="11.5" fill="{ON_ACCENT}">View Repositories</text>

  <rect x="448" y="226" width="132" height="34" rx="17" fill="{CARD_HIGH}" stroke="#ffffff" stroke-opacity="0.1" />
  <text x="514" y="247" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11.5" fill="{TEXT}">Follow @{xml_esc(ACTIVE_USER)}</text>
</svg>"""

with open("dist/hero-card.svg", "w", encoding="utf-8") as f:
    f.write(hero_svg)

music_track = xml_esc(cfg.get("musicTrack") or "No More Push-Backs")
music_artist = xml_esc(cfg.get("musicArtist") or "Lauer")
music_cover = cfg.get("musicCoverUrl") or "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80"
palette = cfg.get("musicPalette") or {}
p_bg = palette.get("bg") or PLAYER_BG
p_accent = palette.get("accent") or "#F5F3F7"
progress_pct = max(5, min(100, int(cfg.get("musicProgress") or 28)))
progress_w = round(436 * (progress_pct / 100.0), 1)

cover_data_uri = fetch_b64_image(music_cover)
cover_tag = (
    f'<image href="{cover_data_uri}" x="12" y="10" width="46" height="46" preserveAspectRatio="xMidYMid slice" clip-path="url(#thumbClip)" />'
    if cover_data_uri
    else '<rect x="12" y="10" width="46" height="46" rx="10" fill="#3a2844" />'
)

player_svg = f"""<svg width="460" height="68" viewBox="0 0 460 68" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="thumbClip"><rect x="12" y="10" width="46" height="46" rx="10" /></clipPath>
  </defs>
  <rect x="0.5" y="0.5" width="459" height="67" rx="16" fill="{p_bg}" stroke="#ffffff" stroke-opacity="0.08" />
  {cover_tag}
  <text x="70" y="30" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#F5F3F7">{music_track}</text>
  <text x="70" y="47" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="11.5" fill="#B8B0C2">{music_artist}</text>
  <rect x="336" y="25" width="11" height="17" rx="2" stroke="#D0C9D8" stroke-width="1.5" />
  <circle cx="341.5" cy="36" r="2" stroke="#D0C9D8" stroke-width="1.4" />
  <path d="M332 28h-3v11h3" stroke="#D0C9D8" stroke-width="1.5" stroke-linecap="round" />
  <path d="M380 41.5l-5.6-5.2a3.8 3.8 0 0 1 5.4-5.4l.2.2.2-.2a3.8 3.8 0 0 1 5.4 5.4L380 41.5z" stroke="{p_accent}" stroke-width="1.6" stroke-linejoin="round" />
  <rect x="421" y="25" width="3.2" height="16" rx="1" fill="#F5F3F7" />
  <rect x="428" y="25" width="3.2" height="16" rx="1" fill="#F5F3F7" />
  <rect x="12" y="61" width="436" height="2.5" rx="1.25" fill="#FFFFFF" fill-opacity="0.16" />
  <rect x="12" y="61" width="{progress_w}" height="2.5" rx="1.25" fill="{p_accent}" />
</svg>"""

with open("dist/now-playing.svg", "w", encoding="utf-8") as f:
    f.write(player_svg)

today = datetime.date.today()
days = [(today - datetime.timedelta(days=i)).isoformat() for i in range(29, -1, -1)]
counts = {d: 0 for d in days}

if isinstance(events, list):
    for ev in events:
        d_key = (ev.get("created_at") or "")[:10]
        if d_key in counts:
            c = len(ev.get("payload", {}).get("commits", [])) if ev.get("type") == "PushEvent" else 1
            counts[d_key] += max(1, c)

series = [counts[d] for d in days]
max_val = max(series + [5])
w, h, px, py = 680, 190, 28, 46
inner_w = w - px * 2
inner_h = h - py - 24

coords = []
for idx, val in enumerate(series):
    x = round(px + (idx / (len(series) - 1)) * inner_w, 1)
    y = round(py + inner_h - (val / max_val) * inner_h, 1)
    coords.append((x, y))

line_d = f"M {coords[0][0]} {coords[0][1]}"
for i in range(len(coords) - 1):
    x0, y0 = coords[i]
    x1, y1 = coords[i + 1]
    cx = round((x0 + x1) / 2, 1)
    line_d += f" C {cx} {y0}, {cx} {y1}, {x1} {y1}"

area_d = f"{line_d} L {coords[-1][0]} {py + inner_h} L {coords[0][0]} {py + inner_h} Z"
dots = chr(10).join([f'<circle cx="{x}" cy="{y}" r="3" fill="{ACCENT}" />' for x, y in coords[::3]])

line_svg = f"""<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{ACCENT}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="{ACCENT}" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <rect x="0.5" y="0.5" width="{w-1}" height="{h-1}" rx="24" fill="{CARD}" stroke="{BORDER}" />
  <text x="28" y="30" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" fill="{TEXT}">{xml_esc(ACTIVE_USER)} // 30-Day Commit Activity ({sum(series)} contributions)</text>
  <path d="{area_d}" fill="url(#areaGrad)" />
  <path d="{line_d}" stroke="{ACCENT}" stroke-width="2.6" stroke-linecap="round" fill="none" />
  {dots}
</svg>"""

with open("dist/commit-line.svg", "w", encoding="utf-8") as f:
    f.write(line_svg)

print("Synced dist/hero-card.svg, dist/now-playing.svg, and dist/commit-line.svg with README.md!")
