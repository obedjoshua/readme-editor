import React, { useState, useMemo, useEffect } from 'react';
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Music,
  Code2,
  Terminal,
  Award,
  Activity,
  Sparkles,
  Check,
  Copy,
  Layers,
  ExternalLink,
  Plus,
  Trash2,
  LayoutTemplate,
  FileCode2,
  Workflow,
  User,
  Sliders,
  Monitor,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Github,
  Palette,
  Loader2,
  Link2,
  Calendar,
  Heart,
  Pause,
  Speaker,
  ShieldCheck,
  AlertCircle,
  Star,
  GitPullRequest,
  Clock,
  BookOpen
} from 'lucide-react';

// --- CATALOG DATA ---
const SKILLICON_SUPPORTED = new Set([
  "ableton","activitypub","actix","adonis","ae","aiscript","alpinejs","anaconda","androidstudio","angular","ansible","apollo","apple","appwrite","arch","arduino","astro","atom","au","autocad","aws","azul","azure","babel","bash","bevy","bitbucket","blender","bootstrap","bsd","bun","c","cassandra","clion","clojure","cloudflare","cmake","codepen","coffeescript","cpp","crystal","cs","css","cypress","d3","dart","debian","deno","devto","discord","discordjs","django","docker","dotnet","dynamodb","eclipse","elasticsearch","electron","elixir","elysia","emacs","ember","emotion","express","fastapi","fediverse","figma","firebase","flask","flutter","forth","fortran","gamemakerstudio","gatsby","gcp","git","github","githubactions","gitlab","gmail","godot","go","gradle","grafana","graphql","gtk","gulp","haskell","haxe","haxeflixel","heroku","hibernate","html","htmx","idea","ai","immutablejs","instagram","ipfs","java","js","jenkins","jest","jquery","julia","kafka","kali","kotlin","ktor","kubernetes","laravel","latex","less","linkedin","linux","lit","lua","markdown","mastodon","materialui","matlab","maven","mint","misskey","mongodb","mysql","neovim","nestjs","netlify","nextjs","nginx","nim","nix","nodejs","notion","npm","nuxtjs","obsidian","ocaml","octave","opencv","openshift","openstack","p5js","perl","php","phpstorm","pinia","pkl","plan9","planetscale","pnpm","postgres","postman","powershell","pr","prisma","processing","prometheus","ps","pug","pycharm","python","pytorch","qt","r","rabbitmq","rails","raspberrypi","react","reactivex","redhat","redis","redux","regex","remix","replit","rider","robloxstudio","rocket","rollupjs","ros","ruby","rust","sass","scala","sklearn","selenium","sentry","sequelize","sketchup","solidity","solidjs","spring","sqlite","stackoverflow","styledcomponents","sublime","supabase","svelte","svg","swift","symfony","tailwind","tauri","tensorflow","terraform","threejs","ts","twitter","ubuntu","unity","unreal","v","vala","vercel","vim","visualstudio","vite","vitest","vscode","vscodium","vue","vuetify","vulkan","wasm","webflow","webpack","webstorm","windicss","windows","wordpress","workers","xd","yarn","yew","zig"
]);

const TECH_CATALOG = {
  languages: [
    { id: "html", name: "HTML5" },
    { id: "css", name: "CSS3" },
    { id: "js", name: "JavaScript" },
    { id: "ts", name: "TypeScript" },
    { id: "qml", name: "QML" },
    { id: "python", name: "Python" },
    { id: "c", name: "C" },
    { id: "cpp", name: "C++" },
    { id: "cs", name: "C#" },
    { id: "java", name: "Java" },
    { id: "rust", name: "Rust" },
    { id: "go", name: "Go" },
    { id: "kotlin", name: "Kotlin" },
    { id: "swift", name: "Swift" },
    { id: "dart", name: "Dart" },
    { id: "php", name: "PHP" },
    { id: "ruby", name: "Ruby" },
    { id: "bash", name: "Bash / Shell" },
    { id: "powershell", name: "PowerShell" },
    { id: "postgres", name: "SQL (PostgreSQL)" },
    { id: "mysql", name: "MySQL" },
    { id: "sqlite", name: "SQLite" },
    { id: "graphql", name: "GraphQL" },
    { id: "lua", name: "Lua" },
    { id: "r", name: "R" },
    { id: "scala", name: "Scala" },
    { id: "elixir", name: "Elixir" },
    { id: "haskell", name: "Haskell" },
    { id: "zig", name: "Zig" },
    { id: "perl", name: "Perl" },
    { id: "solidity", name: "Solidity" },
    { id: "matlab", name: "MATLAB" },
    { id: "octave", name: "Octave" },
    { id: "julia", name: "Julia" },
    { id: "clojure", name: "Clojure" },
    { id: "ocaml", name: "OCaml" },
    { id: "nim", name: "Nim" },
    { id: "crystal", name: "Crystal" },
    { id: "fortran", name: "Fortran" },
    { id: "forth", name: "Forth" },
    { id: "coffeescript", name: "CoffeeScript" },
    { id: "haxe", name: "Haxe" },
    { id: "vala", name: "Vala" },
    { id: "v", name: "V" },
    { id: "nix", name: "Nix" },
    { id: "wasm", name: "WebAssembly" },
    { id: "glsl", name: "GLSL" },
    { id: "hlsl", name: "HLSL" },
    { id: "latex", name: "LaTeX" },
    { id: "markdown", name: "Markdown" },
    { id: "sass", name: "Sass / SCSS" },
    { id: "less", name: "Less" },
    { id: "regex", name: "RegEx" },
    { id: "asm", name: "Assembly" },
    { id: "mojo", name: "Mojo" },
    { id: "gleam", name: "Gleam" },
    { id: "erlang", name: "Erlang" },
    { id: "fsharp", name: "F#" },
    { id: "objc", name: "Objective-C" },
    { id: "groovy", name: "Groovy" },
    { id: "yaml", name: "YAML" },
    { id: "json", name: "JSON" },
    { id: "toml", name: "TOML" },
    { id: "xml", name: "XML" },
  ],
  frameworks: [
    { id: "react", name: "React" },
    { id: "nextjs", name: "Next.js" },
    { id: "vue", name: "Vue.js" },
    { id: "nuxtjs", name: "Nuxt" },
    { id: "angular", name: "Angular" },
    { id: "svelte", name: "Svelte" },
    { id: "solidjs", name: "SolidJS" },
    { id: "astro", name: "Astro" },
    { id: "remix", name: "Remix" },
    { id: "qt", name: "Qt / Kirigami" },
    { id: "tailwind", name: "Tailwind CSS" },
    { id: "bootstrap", name: "Bootstrap" },
    { id: "materialui", name: "Material UI" },
    { id: "nodejs", name: "Node.js" },
    { id: "express", name: "Express" },
    { id: "nestjs", name: "NestJS" },
    { id: "elysia", name: "Elysia" },
    { id: "fastapi", name: "FastAPI" },
    { id: "django", name: "Django" },
    { id: "flask", name: "Flask" },
    { id: "spring", name: "Spring" },
    { id: "laravel", name: "Laravel" },
    { id: "symfony", name: "Symfony" },
    { id: "rails", name: "Ruby on Rails" },
    { id: "dotnet", name: ".NET" },
    { id: "flutter", name: "Flutter" },
    { id: "electron", name: "Electron" },
    { id: "tauri", name: "Tauri" },
    { id: "vite", name: "Vite" },
    { id: "prisma", name: "Prisma" },
    { id: "pytorch", name: "PyTorch" },
    { id: "tensorflow", name: "TensorFlow" },
    { id: "redux", name: "Redux" },
    { id: "htmx", name: "htmx" },
    { id: "alpinejs", name: "Alpine.js" },
    { id: "threejs", name: "Three.js" },
    { id: "gtk", name: "GTK" },
  ],
  tools: [
    { id: "docker", name: "Docker" },
    { id: "kubernetes", name: "Kubernetes" },
    { id: "arch", name: "Arch Linux" },
    { id: "linux", name: "Linux" },
    { id: "git", name: "Git" },
    { id: "github", name: "GitHub" },
    { id: "githubactions", name: "GitHub Actions" },
    { id: "cloudflare", name: "Cloudflare" },
    { id: "aws", name: "AWS" },
    { id: "gcp", name: "Google Cloud" },
    { id: "azure", name: "Azure" },
    { id: "firebase", name: "Firebase" },
    { id: "supabase", name: "Supabase" },
    { id: "mongodb", name: "MongoDB" },
    { id: "redis", name: "Redis" },
    { id: "nginx", name: "Nginx" },
    { id: "figma", name: "Figma" },
    { id: "vercel", name: "Vercel" },
    { id: "neovim", name: "Neovim" },
    { id: "vscode", name: "VS Code" },
    { id: "cmake", name: "CMake" },
    { id: "terraform", name: "Terraform" },
  ],
};

function getTechIconUrl(id, name = "") {
  const cleanId = String(id).toLowerCase().trim();
  const aliasMap = { qml: "qt", assembly: "wasm", asm: "wasm", fsharp: "cs", objc: "apple" };
  const mapped = aliasMap[cleanId] || cleanId;
  if (SKILLICON_SUPPORTED.has(mapped)) {
    return `https://skillicons.dev/icons?i=${mapped}`;
  }
  const label = encodeURIComponent((name || cleanId).slice(0, 12));
  return `https://img.shields.io/badge/${label}-1e2230?style=for-the-badge&logoColor=c8bfff`;
}

const EDITORS = [
  { id: 'neovim', name: 'Neovim', badgeColor: '57A143', detail: 'LazyVim + Lua + LSP' },
  { id: 'vscode', name: 'VS Code', badgeColor: '007ACC', detail: 'Tokyo Night + Copilot' },
  { id: 'zed', name: 'Zed', badgeColor: '084CCF', detail: 'GPU-Accelerated + Vim Mode' },
  { id: 'cursor', name: 'Cursor', badgeColor: '111827', detail: 'AI-Native Workflow' },
  { id: 'idea', name: 'JetBrains', badgeColor: '000000', detail: 'IntelliJ / PyCharm' },
];

const THEMES = {
  lavenderNoir: {
    name: 'Lavender Noir',
    bg: '#0d1117',
    card: '#1d1b22',
    cardHigh: '#27242e',
    border: '#30363d',
    accent: '#c8bfff',
    onAccent: '#251e4a',
    accentSoft: 'rgba(200, 191, 255, 0.14)',
    playerBg: '#2c1d33',
    text: '#f2eff7',
    muted: '#9e99aa',
  },
  materialBlue: {
    name: 'Cobalt Dusk',
    bg: '#0d1117',
    card: '#1a1d24',
    cardHigh: '#242832',
    border: '#30363d',
    accent: '#a8c7fa',
    onAccent: '#062e6f',
    accentSoft: 'rgba(168, 199, 250, 0.14)',
    playerBg: '#1b263b',
    text: '#e6e8f0',
    muted: '#98a0b3',
  },
  materialTeal: {
    name: 'Sage Obsidian',
    bg: '#0d1117',
    card: '#18201d',
    cardHigh: '#212b27',
    border: '#30363d',
    accent: '#86d6be',
    onAccent: '#00382b',
    accentSoft: 'rgba(134, 214, 190, 0.14)',
    playerBg: '#162b25',
    text: '#e3ece8',
    muted: '#92a69f',
  },
  obsidian: {
    name: 'GitHub Dimmed',
    bg: '#0d1117',
    card: '#161b22',
    cardHigh: '#21262d',
    border: '#30363d',
    accent: '#58a6ff',
    onAccent: '#0d1117',
    accentSoft: 'rgba(88, 166, 255, 0.14)',
    playerBg: '#1c2333',
    text: '#f0f6fc',
    muted: '#8b949e',
  },
};

const PRESETS = [
  {
    id: 'balanced',
    name: 'Balanced Engineer (Recommended)',
    desc: 'Stylized Hero Card → Mini Player → Tech Stack → Commit Line Graph → Badges',
    order: ['header', 'spotify', 'stack', 'contributions', 'badges', 'stats'],
    enabled: { header: true, spotify: true, stack: true, contributions: true, badges: true, stats: true },
  },
  {
    id: 'minimalist',
    name: 'Clean & Minimalist',
    desc: 'Stylized Hero Card → Tech Stack → Commit Line Graph & Top Repos',
    order: ['header', 'stack', 'contributions', 'spotify', 'badges', 'stats'],
    enabled: { header: true, spotify: false, stack: true, contributions: true, badges: false, stats: false },
  },
  {
    id: 'certified',
    name: 'Credentials & Portfolio Focus',
    desc: 'Stylized Hero Card → Verified Badges → Tech Stack → Top Repos → Mini Player',
    order: ['header', 'badges', 'stack', 'stats', 'contributions', 'spotify'],
    enabled: { header: true, spotify: true, stack: true, contributions: true, badges: true, stats: true },
  },
];

const SECTION_META = {
  header: { label: 'Stylized Hero Card (SVG)', icon: User },
  spotify: { label: 'Compact Mini Player (SVG)', icon: Music },
  stack: { label: 'Tech Stack & Code Editor', icon: Code2 },
  contributions: { label: 'Commit Line Graph (SVG)', icon: Activity },
  badges: { label: 'Verified Credential Badges', icon: Award },
  stats: { label: 'Top Repos & Telemetry', icon: Sparkles },
};

const RAIL_TABS = [
  { id: 'bio', label: 'Bio & Git', icon: User },
  { id: 'layout', label: 'Layout', icon: Layers },
  { id: 'stack', label: 'Stack', icon: Code2 },
  { id: 'spotify', label: 'Player', icon: Music },
  { id: 'badges', label: 'Badges', icon: Award },
];

const DEFAULT_COMMIT_SERIES = [2, 5, 3, 8, 6, 11, 4, 7, 9, 14, 10, 6, 12, 16, 8, 5, 9, 13, 18, 11, 7, 15, 19, 12, 8, 14, 21, 17, 13, 16];

const formatEarnedDate = (isoString) => {
  if (!isoString) return 'Verified Credential';
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return isoString;
  }
};

function timeAgo(isoStr) {
  if (!isoStr) return 'recently';
  const diffMs = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function buildSmoothLinePath(points, width, height, padX, padY) {
  if (!points || points.length === 0) return { line: '', area: '', coords: [] };
  const maxVal = Math.max(...points, 5);
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const coords = points.map((val, idx) => {
    const x = padX + (idx / Math.max(1, points.length - 1)) * innerW;
    const y = padY + innerH - (val / maxVal) * innerH;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), val };
  });

  let line = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const cx = Number(((p0.x + p1.x) / 2).toFixed(1));
    line += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  const bottomY = padY + innerH;
  const area = `${line} L ${coords[coords.length - 1].x} ${bottomY} L ${coords[0].x} ${bottomY} Z`;
  return { line, area, coords };
}
function buildScallopPath(cx, cy, rOuter, rInner, lobes = 12) {
  const nCx = Number(cx) || 96;
  const nCy = Number(cy) || 96;
  const nOut = Number(rOuter) || 86;
  const nIn = Number(rInner) || 77;
  const nLobes = Number(lobes) || 12;
  const pts = [];
  const steps = nLobes * 4;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = nIn + ((nOut - nIn) * (0.5 + 0.5 * Math.cos(nLobes * a)));
    const x = (nCx + r * Math.cos(a)).toFixed(2);
    const y = (nCy + r * Math.sin(a)).toFixed(2);
    pts.push((i === 0 ? "M" : "L") + x + "," + y);
  }
  return pts.join(" ") + " Z";
}

function buildSquigglyWave(xStart, xEnd, yMid, amp = 3.2, freq = 0.24) {
  if (xEnd <= xStart) return "";
  let d = `M ${xStart.toFixed(1)} ${yMid.toFixed(1)}`;
  for (let x = xStart + 2; x <= xEnd; x += 2) {
    const y = yMid + Math.sin((x - xStart) * freq) * amp;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function derivePaletteFromSeed(seedStr) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return {
    accent: `hsl(${hue}, 78%, 76%)`,
    accentDim: `hsl(${hue}, 55%, 24%)`,
    surface: `hsl(${hue}, 28%, 11%)`,
    onAccent: `hsl(${hue}, 45%, 14%)`,
  };
}

export default function App() {
  const [nowClock, setNowClock] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNowClock(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Morphing Selector State
  const [activeSidebarTab, setActiveSidebarTab] = useState('bio');
  const [isMorphingTab, setIsMorphingTab] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('preview');

  const handleSelectSidebarTab = (tabId) => {
    if (tabId === activeSidebarTab) return;
    setIsMorphingTab(true);
    setActiveSidebarTab(tabId);
    setTimeout(() => setIsMorphingTab(false), 320);
  };

  // Profile & Human Copy
  const [username, setUsername] = useState('obedjoshua');
  // Auto-sync greeting with username
  useEffect(() => {
    setGreeting((prev) =>
      /^Hi, I'm [^s—]+ — crafting resilient software & interfaces.$/.test(prev)
        ? `Hi, I'm ${username || "developer"} — crafting resilient software & interfaces.`
        : prev
    );
  }, [username]);
  const [repoName, setRepoName] = useState('readme-editor');
  const [githubProfileUrlInput, setGithubProfileUrlInput] = useState('https://github.com/obedjoshua');
  const [githubToken, setGithubToken] = useState('');
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [profileFetchError, setProfileFetchError] = useState('');

  // Scraped Live GitHub Profile Telemetry
  const [profileTelemetry, setProfileTelemetry] = useState({
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
    location: 'Angeles, Philippines',
    isOnline: true,
    statusText: 'Online • Active 18m ago',
    publicRepos: 24,
    followers: 48,
    commitSeries: DEFAULT_COMMIT_SERIES,
    topRepos: [
      { name: 'readme-editor', desc: 'Material Design 3 GitHub Profile & SVG Studio', stars: 19, lang: 'JavaScript', url: 'https://github.com/obedjoshua/readme-editor' },
      { name: 'masaganang-pagpapala-ai', desc: 'AI-Driven E-Commerce Platform with Visual Product Recognition', stars: 14, lang: 'Python', url: 'https://github.com/obedjoshua' },
      { name: 'net-lab-automation', desc: 'Computer Networking & Linux Deployment Scripts', stars: 9, lang: 'Shell', url: 'https://github.com/obedjoshua' },
    ],
    latestContris: [
      { type: 'PushEvent', repo: 'obedjoshua/readme-editor', detail: 'feat: stylized hero SVG card & morphing selector rail', when: '18m ago' },
      { type: 'PullRequestEvent', repo: 'obedjoshua/masaganang-pagpapala-ai', detail: 'Merged PR #12: visual recognition pipeline optimization', when: '4h ago' },
      { type: 'PushEvent', repo: 'obedjoshua/net-lab-automation', detail: 'chore: update routing table verification checks', when: '1d ago' },
    ],
  });

  const [themeKey, setThemeKey] = useState('lavenderNoir');
  const [greeting, setGreeting] = useState("Hi, I'm obedjoshua — crafting resilient software & interfaces.");
  const [tagline, setTagline] = useState('BSIT Student & Full-Stack Systems Developer');
  const [bioParagraph1, setBioParagraph1] = useState(
    'I bridge the gap between clean architecture and practical tooling—building full-stack web apps, AI-driven platforms, and resilient backend services.'
  );
  const [bioParagraph2, setBioParagraph2] = useState(
    'Currently focused on distributed systems, Linux workflow automation, and open-source developer utilities.'
  );

  // Module Ordering & Visibility
  const [sectionOrder, setSectionOrder] = useState([
    'header',
    'spotify',
    'stack',
    'contributions',
    'badges',
    'stats',
  ]);
  const [enabledSections, setEnabledSections] = useState({
    header: true,
    spotify: true,
    stack: true,
    contributions: true,
    badges: true,
    stats: true,
  });
  const [draggedIdx, setDraggedIdx] = useState(null);

  // Compact Mini Player State
  const [musicUrlInput, setMusicUrlInput] = useState('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT');
  const [musicPlatform, setMusicPlatform] = useState('spotify');
  // Persist custom track & cover art across reloads
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("readme_studio_v1") || "null");
      if (saved) {
        if (saved.musicTrack) setMusicTrack(saved.musicTrack);
        if (saved.musicArtist) setMusicArtist(saved.musicArtist);
        if (saved.musicCoverUrl) setMusicCoverUrl(saved.musicCoverUrl);
        if (saved.greeting) setGreeting(saved.greeting);
        if (saved.tagline) setTagline(saved.tagline);
        if (saved.bioParagraph1) setBioParagraph1(saved.bioParagraph1);
        if (saved.bioParagraph2) setBioParagraph2(saved.bioParagraph2);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("readme_studio_v1", JSON.stringify({
        musicTrack, musicArtist, musicCoverUrl, greeting, tagline, bioParagraph1, bioParagraph2
      }));
    } catch {}
  }, [musicTrack, musicArtist, musicCoverUrl, greeting, tagline, bioParagraph1, bioParagraph2]);

  const [musicTrack, setMusicTrack] = useState('No More Push-Backs');
  const [musicArtist, setMusicArtist] = useState('Lauer');
  const [musicCoverUrl, setMusicCoverUrl] = useState(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80'
  );
  const [musicLink, setMusicLink] = useState('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT');
  const [musicProgress, setMusicProgress] = useState(28);
  const [musicLiked, setMusicLiked] = useState(false);
  const [isFetchingMusic, setIsFetchingMusic] = useState(false);
  const [musicFetchError, setMusicFetchError] = useState('');
  const [musicPalette, setMusicPalette] = useState({
    accent: "#f2b8b5",
    accentDim: "#5c2b29",
    surface: "#1a1314",
    onAccent: "#3b1514",
  });
  const [copiedPyToast, setCopiedPyToast] = useState(false);

  useEffect(() => {
    const fallback = derivePaletteFromSeed(musicTrack + musicArtist + musicCoverUrl);
    if (!musicCoverUrl) {
      setMusicPalette(fallback);
      return;
    }
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 24, 24);
        const data = ctx.getImageData(0, 0, 24, 24).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          if (lum > 35 && lum < 235) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          const rn = r / 255, gn = g / 255, bn = b / 255;
          const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
          let h = 0;
          if (max !== min) {
            const d = max - min;
            if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
            else if (max === gn) h = ((bn - rn) / d + 2) / 6;
            else h = ((rn - gn) / d + 4) / 6;
          }
          const hue = Math.round(h * 360);
          setMusicPalette({
            accent: `hsl(${hue}, 82%, 78%)`,
            accentDim: `hsl(${hue}, 52%, 22%)`,
            surface: `hsl(${hue}, 26%, 10%)`,
            onAccent: `hsl(${hue}, 48%, 14%)`,
          });
        } else {
          setMusicPalette(fallback);
        }
      } catch (_) {
        setMusicPalette(fallback);
      }
    };
    img.onerror = () => setMusicPalette(fallback);
    img.src = musicCoverUrl;
  }, [musicCoverUrl, musicTrack, musicArtist]);

    const handleUploadCoverImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 240;
        canvas.height = 240;
        const ctx = canvas.getContext("2d");
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 240, 240);
        const compactDataUri = canvas.toDataURL("image/jpeg", 0.86);
        setMusicCoverUrl(compactDataUri);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };


  // Tech Stack & Code Editor State
  const [selectedLangs, setSelectedLangs] = useState(['python', 'rust', 'ts', 'cpp', 'bash']);
  const [selectedFrameworks, setSelectedFrameworks] = useState(['react', 'tailwind', 'nodejs', 'fastapi']);
  const [selectedTools, setSelectedTools] = useState(['docker', 'kubernetes', 'arch', 'git', 'cloudflare']);
  const [stackLayout, setStackLayout] = useState('grid');
  const [showDisclosure, setShowDisclosure] = useState(true);
  const [disclosureText, setDisclosureText] = useState(
    'Also experienced with PostgreSQL, Nginx, GitHub Actions CI/CD, and shell scripting.'
  );
  const [selectedEditors, setSelectedEditors] = useState(['zed', 'neovim']);
  const [editorNotes, setEditorNotes] = useState('Primary: Zed + Neovim modal keybindings • Terminal: Alacritty + Fish');

  // Verified Badges State
  const [badges, setBadges] = useState([
    {
      id: 'b-default-1',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services Training and Certification',
      description:
        'Earners of this certification have a comprehensive understanding of AWS services and technologies and demonstrated the ability to build secure and robust solutions.',
      earnedDate: 'Oct 18, 2025',
      imageUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
      verifyUrl: 'https://www.credly.com/badges/0e284c3f-5164-4b21-8660-0d84737941bc/public_url',
    },
  ]);
  const [badgeUrlInput, setBadgeUrlInput] = useState('');
  const [isFetchingBadge, setIsFetchingBadge] = useState(false);
  const [badgeFetchError, setBadgeFetchError] = useState('');

  // Export State
  const [activeCodeFile, setActiveCodeFile] = useState('readme');
  const [copiedKey, setCopiedKey] = useState(null);
  const [disclosureOpen, setDisclosureOpen] = useState(false);

  const theme = THEMES[themeKey];
  const activeRailIndex = Math.max(0, RAIL_TABS.findIndex((t) => t.id === activeSidebarTab));

  // --- SCRAPE GITHUB PROFILE URL (TOKEN + MICROLINK + CONTRIBUTIONS API CASCADE) ---
  const handleScrapeGitHubProfile = async (e) => {
    e.preventDefault();
    const raw = githubProfileUrlInput.trim();
    if (!raw) return;

    setIsFetchingProfile(true);
    setProfileFetchError("");

    try {
      let extractedUser = raw;
      if (raw.includes("github.com")) {
        const parsed = new URL(raw.startsWith("http") ? raw : "https://" + raw);
        const parts = parsed.pathname.split("/").filter(Boolean);
        if (parts.length === 0) throw new Error("Enter a valid GitHub profile URL like https://github.com/obedjoshua");
        extractedUser = parts[0];
      }

      const ghHeaders = { Accept: "application/vnd.github+json" };
      if (githubToken.trim()) {
        ghHeaders.Authorization = "Bearer " + githubToken.trim();
      }

      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch("https://api.github.com/users/" + encodeURIComponent(extractedUser), { headers: ghHeaders }),
        fetch("https://api.github.com/users/" + encodeURIComponent(extractedUser) + "/repos?per_page=100&sort=updated", { headers: ghHeaders }),
        fetch("https://api.github.com/users/" + encodeURIComponent(extractedUser) + "/events/public?per_page=100", { headers: ghHeaders }),
      ]);

      // Fallback Cascade if api.github.com returns 403 (Unauthenticated IP Rate Limit)
      if (userRes.status === 403) {
        const [mlRes, contribRes] = await Promise.all([
          fetch("https://api.microlink.io/?url=" + encodeURIComponent("https://github.com/" + extractedUser)).catch(() => null),
          fetch("https://github-contributions-api.jogruber.de/v4/" + encodeURIComponent(extractedUser) + "?y=last").catch(() => null),
        ]);

        let scrapedName = extractedUser;
        let scrapedBio = "";
        let scrapedAvatar = "https://github.com/" + extractedUser + ".png";

        if (mlRes && mlRes.ok) {
          const mlJson = await mlRes.json();
          if (mlJson.status === "success" && mlJson.data) {
            const rawTitle = mlJson.data.title || "";
            scrapedName = rawTitle.replace(/s*-s*Overview.*$/i, "").replace(/s*(.*?).*$/, "").trim() || extractedUser;
            scrapedBio = (mlJson.data.description || "").replace(/^.*has d+ repositories available. Follow their code on GitHub.$/i, "").trim();
            if (mlJson.data.image && mlJson.data.image.url) scrapedAvatar = mlJson.data.image.url;
          }
        }

        let commitSeries = DEFAULT_COMMIT_SERIES;
        let isOnline = true;
        let statusText = "Online • Synced via Public Profile";

        if (contribRes && contribRes.ok) {
          const cJson = await contribRes.json();
          const allDays = Array.isArray(cJson.contributions) ? cJson.contributions : [];
          if (allDays.length > 0) {
            const last30 = allDays.slice(-30);
            commitSeries = last30.map((d) => d.count || 0);
            const recentCount = last30.slice(-3).reduce((acc, d) => acc + (d.count || 0), 0);
            isOnline = recentCount > 0;
            statusText = isOnline
              ? "Online • " + recentCount + " contributions in last 3d"
              : "Offline • No commits in last 3d";
          }
        }

        setUsername(extractedUser);
        if (scrapedName) setGreeting("Hi, I'm " + scrapedName + " — building practical software.");
        if (scrapedBio) setBioParagraph1(scrapedBio);

        setProfileTelemetry((prev) => ({
          ...prev,
          avatarUrl: scrapedAvatar,
          isOnline,
          statusText,
          commitSeries,
        }));
        setIsFetchingProfile(false);
        return;
      }

      if (!userRes.ok) {
        throw new Error('GitHub user "' + extractedUser + '" was not found (HTTP ' + userRes.status + ').');
      }

      const userData = await userRes.json();
      const reposData = reposRes.ok ? await reposRes.json() : [];
      const eventsData = eventsRes.ok ? await eventsRes.json() : [];

      setUsername(userData.login || extractedUser);
      if (userData.name) setGreeting("Hi, I'm " + userData.name + " — building practical software.");
      if (userData.bio) setBioParagraph1(userData.bio);
      if (userData.company || userData.location) {
        const locParts = [userData.company, userData.location].filter(Boolean).join(" • ");
        setTagline(locParts);
      }

      const latestEvent = Array.isArray(eventsData) && eventsData.length > 0 ? eventsData[0] : null;
      const lastActiveIso = latestEvent?.created_at || userData.updated_at;
      const hoursSinceActive = lastActiveIso
        ? (Date.now() - new Date(lastActiveIso).getTime()) / (1000 * 60 * 60)
        : 999;
      const isOnline = hoursSinceActive <= 4;
      const statusText = isOnline
        ? "Online • Active " + timeAgo(lastActiveIso)
        : "Offline • Last seen " + timeAgo(lastActiveIso);

      const topRepos = (Array.isArray(reposData) ? reposData : [])
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 3)
        .map((r) => ({
          name: r.name,
          desc: r.description || "Repository source code & documentation",
          stars: r.stargazers_count || 0,
          lang: r.language || "Code",
          url: r.html_url,
        }));

      const dailyMap = new Map();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        dailyMap.set(d.toISOString().slice(0, 10), 0);
      }

      const latestContris = [];
      for (const ev of Array.isArray(eventsData) ? eventsData : []) {
        const dayKey = (ev.created_at || "").slice(0, 10);
        const commitCount =
          ev.type === "PushEvent"
            ? ev.payload?.commits?.length || ev.payload?.size || 1
            : 1;

        if (dailyMap.has(dayKey)) {
          dailyMap.set(dayKey, dailyMap.get(dayKey) + commitCount);
        }

        if (latestContris.length < 4) {
          let detail = ev.type.replace("Event", "");
          if (ev.type === "PushEvent") {
            detail = ev.payload?.commits?.[0]?.message || "Pushed " + commitCount + " commit(s)";
          } else if (ev.type === "PullRequestEvent") {
            detail = (ev.payload?.action || "Updated") + " PR #" + (ev.payload?.number || "");
          } else if (ev.type === "CreateEvent") {
            detail = "Created " + (ev.payload?.ref_type || "repository");
          }
          latestContris.push({
            type: ev.type,
            repo: ev.repo?.name || extractedUser,
            detail,
            when: timeAgo(ev.created_at),
          });
        }
      }

      const commitSeries = Array.from(dailyMap.values());
      const hasAnyCommits = commitSeries.some((v) => v > 0);

      setProfileTelemetry({
        avatarUrl: userData.avatar_url || "https://github.com/" + extractedUser + ".png",
        location: userData.location || "GitHub Network",
        isOnline,
        statusText,
        publicRepos: userData.public_repos ?? 0,
        followers: userData.followers ?? 0,
        commitSeries: hasAnyCommits ? commitSeries : DEFAULT_COMMIT_SERIES,
        topRepos: topRepos.length > 0 ? topRepos : profileTelemetry.topRepos,
        latestContris: latestContris.length > 0 ? latestContris : profileTelemetry.latestContris,
      });
    } catch (err) {
      setProfileFetchError(err.message || "Unable to scrape GitHub profile details.");
    } finally {
      setIsFetchingProfile(false);
    }
  };

  // --- RELIABLE CREDLY & CREDENTIAL BADGE FETCHER ---
  const handleFetchVerifiedBadge = async (e) => {
    e.preventDefault();
    const rawUrl = badgeUrlInput.trim();
    if (!rawUrl) return;

    setIsFetchingBadge(true);
    setBadgeFetchError('');

    try {
      const parsed = new URL(rawUrl);
      const isCredly = parsed.hostname.includes('credly.com');

      let title = '';
      let imageUrl = '';
      let description = '';
      let issuer = isCredly ? 'Credly Verified Issuer' : parsed.hostname.replace('www.', '');
      let earnedDate = '';

      try {
        const mlRes = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(rawUrl)}`);
        if (mlRes.ok) {
          const mlJson = await mlRes.json();
          if (mlJson.status === 'success' && mlJson.data) {
            const d = mlJson.data;
            title = (d.title || '')
              .replace(/\s*-\s*Credly.*$/i, '')
              .replace(/\s*was issued by.*$/i, '')
              .trim();
            imageUrl = d.image?.url || d.logo?.url || '';
            description = d.description || '';
            if (d.publisher) issuer = d.publisher;
            if (d.date) earnedDate = formatEarnedDate(d.date);

            const issuedByMatch = (d.title || '').match(/was issued by\s+(.+?)\s+to\s+/i);
            if (issuedByMatch) issuer = issuedByMatch[1].trim();
          }
        }
      } catch {
        // Fallback below
      }

      if (!title || !imageUrl || !earnedDate) {
        try {
          const jinaRes = await fetch(`https://r.jina.ai/${rawUrl}`);
          if (jinaRes.ok) {
            const mdText = await jinaRes.text();
            if (!title) {
              const titleMatch = mdText.match(/^Title:\s*(.+)$/m) || mdText.match(/^#\s+(.+)$/m);
              if (titleMatch) {
                title = titleMatch[1]
                  .replace(/\s*-\s*Credly.*$/i, '')
                  .replace(/\s*was issued by.*$/i, '')
                  .trim();
              }
            }
            if (!imageUrl) {
              const imgMatch =
                mdText.match(/https:\/\/images\.credly\.com\/[^\s)"']+/) ||
                mdText.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/);
              if (imgMatch) imageUrl = imgMatch[1] || imgMatch[0];
            }
            if (!earnedDate) {
              const dateMatch = mdText.match(/Issued\s+(?:on\s+)?([A-Z][a-z]+\s+\d{1,2},\s+\d{4})/i);
              if (dateMatch) earnedDate = dateMatch[1];
            }
            if (!description) {
              const lines = mdText
                .split('\n')
                .map((l) => l.trim())
                .filter((l) => l.length > 45 && !l.startsWith('Title:') && !l.startsWith('URL Source:') && !l.startsWith('![') && !l.startsWith('['));
              if (lines.length > 0) description = lines[0];
            }
          }
        } catch {
          // Handled below
        }
      }

      if (!title || !imageUrl) {
        throw new Error(
          'Could not extract badge image or title from that URL. Ensure the credential page is publicly accessible.'
        );
      }

      setBadges((prev) => [
        ...prev,
        {
          id: `badge-${Date.now()}`,
          title,
          issuer,
          description: description || 'Verified digital credential.',
          earnedDate: earnedDate || 'Verified Credential',
          imageUrl,
          verifyUrl: rawUrl,
        },
      ]);
      setBadgeUrlInput('');
    } catch (err) {
      setBadgeFetchError(err.message || 'Failed to verify badge URL.');
    } finally {
      setIsFetchingBadge(false);
    }
  };

  // --- AUTO-FETCH SPOTIFY OR YOUTUBE MUSIC TRACK METADATA ---
  const handleFetchMusicTrack = async (e) => {
    e.preventDefault();
    const rawUrl = musicUrlInput.trim();
    if (!rawUrl) return;

    setIsFetchingMusic(true);
    setMusicFetchError('');

    try {
      const parsed = new URL(rawUrl);
      const host = parsed.hostname.toLowerCase();

      if (host.includes('spotify.com')) {
        const cleanSpotifyUrl = `${parsed.origin}${parsed.pathname}`;
        let data = null;

        try {
          const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(cleanSpotifyUrl)}`);
          if (res.ok) data = await res.json();
        } catch (_) {}

        if (!data) {
          const fallbackRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(cleanSpotifyUrl)}`);
          if (fallbackRes.ok) data = await fallbackRes.json();
        }

        if (!data || data.error) throw new Error('Could not fetch Spotify track info. Make sure it is a public track link.');

        setMusicPlatform('spotify');
        setMusicTrack(data.title || 'Spotify Track');
        setMusicArtist(data.author_name || 'Spotify');
        if (data.thumbnail_url) setMusicCoverUrl(data.thumbnail_url);
        setMusicLink(cleanSpotifyUrl);
      } else if (host.includes('youtube.com') || host.includes('youtu.be')) {
        const idMatch = rawUrl.match(new RegExp("(?:v=|youtu\.be/|embed/|shorts/)([a-zA-Z0-9_-]{11})"));
        const videoId = idMatch ? idMatch[1] : null;
        const cleanYtUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : rawUrl.replace('music.youtube.com', 'www.youtube.com');

        let title = '';
        let artist = '';
        let cover = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';

        // 1. CORS-friendly noembed
        try {
          const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(cleanYtUrl)}`);
          if (res.ok) {
            const data = await res.json();
            if (!data.error && data.title) {
              title = data.title;
              artist = (data.author_name || 'YouTube Music').replace(/s*-s*Topic$/i, '');
              if (data.thumbnail_url) cover = data.thumbnail_url;
            }
          }
        } catch (_) {}

        // 2. Fallback to Microlink OpenGraph scraper
        if (!title) {
          const mlRes = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(cleanYtUrl)}`);
          if (mlRes.ok) {
            const mlJson = await mlRes.json();
            if (mlJson.status === 'success' && mlJson.data) {
              title = (mlJson.data.title || '').replace(/s*-s*YouTube$/i, '');
              artist = (mlJson.data.author || mlJson.data.publisher || 'YouTube Music').replace(/s*-s*Topic$/i, '');
              if (mlJson.data.image?.url) cover = mlJson.data.image.url;
            }
          }
        }

        if (!title) throw new Error('Could not fetch YouTube Music track info. Check that the video is public.');

        setMusicPlatform('ytmusic');
        setMusicTrack(title);
        setMusicArtist(artist || 'YouTube Music');
        if (cover) setMusicCoverUrl(cover);
        setMusicLink(rawUrl);
      } else {
        throw new Error('Paste a valid open.spotify.com or music.youtube.com / youtu.be link.');
      }
    } catch (err) {
      setMusicFetchError(err.message || 'Failed to fetch track details.');
    } finally {
      setIsFetchingMusic(false);
    }
  };

  const toggleItem = (list, setList, id) => {
    setList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const moveSection = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= sectionOrder.length) return;
    const updated = [...sectionOrder];
    const [removed] = updated.splice(index, 1);
    updated.splice(target, 0, removed);
    setSectionOrder(updated);
  };

  const handleDragStart = (idx) => setDraggedIdx(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...sectionOrder];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    setSectionOrder(updated);
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  const applyPreset = (preset) => {
    setSectionOrder([...preset.order]);
    setEnabledSections({ ...preset.enabled });
  };

  const removeBadge = (id) => {
    setBadges((prev) => prev.filter((b) => b.id !== id));
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const commitGraphGeometry = useMemo(
    () => buildSmoothLinePath(profileTelemetry.commitSeries, 640, 150, 16, 18),
    [profileTelemetry.commitSeries]
  );

  // --- GENERATORS FOR EXPORT (USING SVG CARDS SO GITHUB RENDERS THE EXACT STYLIZED LAYOUT) ---
  const generatedReadme = useMemo(() => {
    const rawBase = `https://raw.githubusercontent.com/${username}/${repoName}/main/dist`;
    const allSelectedTech = [
      ...TECH_CATALOG.languages.filter((i) => selectedLangs.includes(i.id)),
      ...TECH_CATALOG.frameworks.filter((i) => selectedFrameworks.includes(i.id)),
      ...TECH_CATALOG.tools.filter((i) => selectedTools.includes(i.id)),
    ];

    const blocks = {
      header: `<p align="center">\n  <a href="https://github.com/${username}">\n    <img src="${rawBase}/hero-card.svg" alt="${greeting}" />\n  </a>\n</p>`,
      spotify: `<p align="center">\n  <a href="${musicLink}" target="_blank" rel="noopener noreferrer">\n    <img src="${rawBase}/now-playing.svg" alt="${musicTrack} - ${musicArtist}" />\n  </a>\n</p>`,
      stack: (() => {
        let out = `### 🛠️ Tools, Languages & Environment\n\n`;
        if (stackLayout === 'grid') {
          const rows = [];
          for (let i = 0; i < allSelectedTech.length; i += 5) {
            const chunk = allSelectedTech.slice(i, i + 5);
            const cells = chunk
              .map(
                (t) =>
                  `    <td align="center" width="110">\n      <img src="${getTechIconUrl(t.id, t.name)}" width="42" height="42" alt="${t.name}" /><br><sub><b>${t.name}</b></sub>\n    </td>`
              )
              .join('\n');
            rows.push(`  <tr>\n${cells}\n  </tr>`);
          }
          out += `<table align="center">\n${rows.join('\n')}\n</table>\n`;
        } else {
          const pills = allSelectedTech
            .map(
              (t) =>
                `  <img src="https://img.shields.io/badge/${encodeURIComponent(t.name)}-1d1b22?style=for-the-badge&logo=${t.id}&logoColor=white" alt="${t.name}" />`
            )
            .join('\n');
          out += `<p align="center">\n${pills}\n</p>\n`;
        }

        if (selectedEditors.length > 0) {
          const edBadges = EDITORS.filter((e) => selectedEditors.includes(e.id))
            .map(
              (e) =>
                `<img src="https://img.shields.io/badge/${encodeURIComponent(e.name)}-${e.badgeColor}?style=for-the-badge&logo=${e.id}&logoColor=white" alt="${e.name}" />`
            )
            .join(' ');
          out += `\n**Code Editors & Setup:** ${edBadges}\n> ${editorNotes}\n`;
        }

        if (showDisclosure && disclosureText.trim()) {
          out += `\n<details>\n  <summary><b>Other Tools & Technologies Disclosure</b></summary>\n  <br>\n  ${disclosureText}\n</details>`;
        }
        return out;
      })(),
      contributions: (() => {
        const recentList = profileTelemetry.latestContris
          .map((c) => `- **${c.repo}** — ${c.detail} _(${c.when})_`)
          .join('\n');
        return `### 📈 Commit Velocity & Latest Contributions\n\n<p align="center">\n  <img src="${rawBase}/commit-line.svg" alt="30-Day Commit Line Graph" />\n</p>\n\n${recentList}`;
      })(),
      badges: (() => {
        if (badges.length === 0) return '';
        const rows = badges
          .map(
            (b) =>
              `  <tr>\n    <td align="center" width="100">\n      <a href="${b.verifyUrl}" target="_blank" rel="noopener noreferrer">\n        <img src="${b.imageUrl}" width="76" height="76" alt="${b.title}" />\n      </a>\n    </td>\n    <td>\n      <a href="${b.verifyUrl}" target="_blank" rel="noopener noreferrer"><b>${b.title}</b></a><br>\n      <sub><b>Issuer:</b> ${b.issuer} • <b>Earned:</b> ${b.earnedDate}</sub><br>\n      <sub>${b.description}</sub>\n    </td>\n  </tr>`
          )
          .join('\n');
        return `### 🏅 Verified Certifications & Badges\n\n<table>\n${rows}\n</table>`;
      })(),
      stats: (() => {
        const repoRows = profileTelemetry.topRepos
          .map(
            (r) =>
              `  <tr>\n    <td><a href="${r.url}"><b>${r.name}</b></a></td>\n    <td>${r.desc}</td>\n    <td align="center">${r.lang}</td>\n    <td align="center">⭐ ${r.stars}</td>\n  </tr>`
          )
          .join('\n');
        return `### 🚀 Top Repositories\n\n<table>\n  <tr><th>Repository</th><th>Description</th><th>Stack</th><th>Stars</th></tr>\n${repoRows}\n</table>`;
      })(),
    };

    return sectionOrder
      .filter((key) => enabledSections[key] && blocks[key])
      .map((key) => blocks[key])
      .join('\n\n---\n\n');
  }, [
    username,
    repoName,
    greeting,
    profileTelemetry,
    musicLink,
    musicTrack,
    musicArtist,
    sectionOrder,
    enabledSections,
    selectedLangs,
    selectedFrameworks,
    selectedTools,
    stackLayout,
    selectedEditors,
    editorNotes,
    showDisclosure,
    disclosureText,
    badges,
  ]);

  const generatedPythonScript = useMemo(() => {
    const progressWidth = Math.round((436 * musicProgress) / 100);
    const topLangChips = selectedLangs
      .slice(0, 3)
      .map((id, idx) => {
        const x = 68 + idx * 54;
        return `<rect x="${x}" y="166" width="46" height="20" rx="10" fill="${theme.cardHigh}" /><text x="${x + 23}" y="179" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="9.5" fill="${theme.muted}">${id.toUpperCase()}</text>`;
      })
      .join('\n  ');

    return `import os
import json
import base64
import datetime
import urllib.request

USERNAME = os.getenv("GITHUB_ACTOR", "${username}")
BG = "${theme.bg}"
CARD = "${theme.card}"
CARD_HIGH = "${theme.cardHigh}"
BORDER = "${theme.border}"
ACCENT = "${theme.accent}"
ON_ACCENT = "${theme.onAccent}"
PLAYER_BG = "${theme.playerBg}"
TEXT = "${theme.text}"
MUTED = "${theme.muted}"

os.makedirs("dist", exist_ok=True)


import json, re

def load_remote_studio_config(user):
    try:
        req = urllib.request.Request(
            f"https://raw.githubusercontent.com/{user}/{user}/main/README.md",
            headers={"User-Agent": "Mozilla/5.0"}
        )
        with urllib.request.urlopen(req, timeout=8) as resp:
            md = resp.read().decode("utf-8", errors="ignore")
        m = re.search(r"<!--s*STUDIO_CONFIG:({.*?})s*-->", md)
        if m:
            return json.loads(m.group(1))
    except Exception as e:
        print("Using fallback studio config:", e)
    return {}

REMOTE_CFG = load_remote_studio_config(USERNAME)

def fetch_b64_image(url):
    if url.startswith("data:image/"):
        return url
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "README-Studio"})
        with urllib.request.urlopen(req, timeout=10) as res:
            mime = res.headers.get_content_type() or "image/jpeg"
            b64 = base64.b64encode(res.read()).decode("utf-8")
            return f"data:{mime};base64,{b64}"
    except Exception:
        return ""

# Fetch live GitHub user info & recent activity for Stylized Hero SVG Card
user_req = urllib.request.Request(
    f"https://api.github.com/users/{USERNAME}",
    headers={"User-Agent": "README-Studio-Generator"}
)
with urllib.request.urlopen(user_req) as res:
    user_data = json.loads(res.read().decode())

ev_req = urllib.request.Request(
    f"https://api.github.com/users/{USERNAME}/events/public?per_page=100",
    headers={"User-Agent": "README-Studio-Generator"}
)
with urllib.request.urlopen(ev_req) as res:
    events = json.loads(res.read().decode())

avatar_uri = fetch_b64_image(user_data.get("avatar_url", ""))
avatar_tag = f'<image href="{avatar_uri}" x="108" y="24" width="76" height="76" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)" />' if avatar_uri else '<circle cx="146" cy="62" r="38" fill="#2b2836" />'

is_online = len(events) > 0
status_dot = "#34d399" if is_online else "#94a3b8"
status_label = "Online • Recently Active" if is_online else "Offline • Idle"
location_label = (user_data.get("location") or "${profileTelemetry.location}").replace("&", "&amp;")
repos_count = user_data.get("public_repos", ${profileTelemetry.publicRepos})
followers_count = user_data.get("followers", ${profileTelemetry.followers})


SELECTED_TECH = ${JSON.stringify([
  ...TECH_CATALOG.languages.filter((i) => selectedLangs.includes(i.id)),
  ...TECH_CATALOG.frameworks.filter((i) => selectedFrameworks.includes(i.id)),
  ...TECH_CATALOG.tools.filter((i) => selectedTools.includes(i.id)),
].slice(0, 6).map((t) => ({ id: t.id, name: t.name, icon: getTechIconUrl(t.id, t.name) })))}

tech_badges_svg = ""
for idx, item in enumerate(SELECTED_TECH):
    bx = 302 + idx * 82
    b64_icon = fetch_b64_image(item["icon"])
    icon_el = f'<image href="{b64_icon}" x="{bx + 6}" y="196" width="16" height="16" />' if b64_icon else ""
    tech_badges_svg += f'<rect x="{bx}" y="192" width="76" height="24" rx="8" fill="{CARD_HIGH}" stroke="#ffffff" stroke-opacity="0.08" />{icon_el}<text x="{bx + 26}" y="207" font-family="\x27Google Sans\x27, sans-serif" font-weight="600" font-size="10" fill="{TEXT}">{item["name"][:7]}</text>'

# 1. Stylized 2-Column Hero Identity Card (dist/hero-card.svg)
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

  <!-- Left Identity Card -->
  <rect x="24" y="20" width="244" height="270" rx="24" fill="{CARD}" stroke="#ffffff" stroke-opacity="0.07" />
  {avatar_tag}
  <circle cx="146" cy="62" r="38" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
  <text x="146" y="122" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="18" fill="{TEXT}">{USERNAME}</text>
  <text x="146" y="141" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="11" fill="{MUTED}">${tagline.slice(0, 36).replace(/"/g, '&quot;')}</text>
  ${topLangChips}

  <line x1="42" y1="198" x2="250" y2="198" stroke="#ffffff" stroke-opacity="0.07" />
  <circle cx="48" cy="216" r="4" fill="{status_dot}" />
  <text x="58" y="220" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="{TEXT}">{status_label}</text>

  <rect x="40" y="232" width="212" height="22" rx="8" fill="{CARD_HIGH}" />
  <text x="48" y="246" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="10" fill="{MUTED}">{location_label}</text>

  <rect x="40" y="259" width="212" height="22" rx="8" fill="{CARD_HIGH}" />
  <text x="48" y="273" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="10" fill="{MUTED}">Repos / Followers</text>
  <text x="244" y="273" text-anchor="end" font-family="monospace" font-weight="700" font-size="10" fill="{TEXT}">{repos_count} / {followers_count}</text>

  <!-- Right Editorial Bio -->
  <text x="302" y="54" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" letter-spacing="2" fill="{MUTED}">ABOUT ME • README</text>
  <text x="302" y="92" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="25" fill="{TEXT}">${greeting.slice(0, 38).replace(/"/g, '&quot;')}</text>
  <text x="302" y="132" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#d4cfe0">${bioParagraph1.slice(0, 68).replace(/"/g, '&quot;')}</text>
  <text x="302" y="152" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" size="13" fill="#d4cfe0">${bioParagraph1.slice(68, 136).replace(/"/g, '&quot;')}</text>
  <text x="302" y="186" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="12" fill="{MUTED}">${bioParagraph2.slice(0, 74).replace(/"/g, '&quot;')}</text>

  {tech_badges_svg}
  <!-- Pill CTAs -->
  <rect x="302" y="226" width="136" height="34" rx="17" fill="{ACCENT}" />
  <text x="370" y="247" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="11.5" fill="{ON_ACCENT}">View Repositories</text>

  <rect x="448" y="226" width="132" height="34" rx="17" fill="{CARD_HIGH}" stroke="#ffffff" stroke-opacity="0.1" />
  <text x="514" y="247" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11.5" fill="{TEXT}">Follow @{USERNAME}</text>
</svg>"""

with open("dist/hero-card.svg", "w", encoding="utf-8") as f:
    f.write(hero_svg)

# 2. Caelestia Adaptive Media Player SVG (dist/now-playing.svg)
cover_data_uri = fetch_b64_image(REMOTE_CFG.get("musicCoverUrl") or ${JSON.stringify(musicCoverUrl)})
M_ACCENT = "${musicPalette.accent}"
M_ACCENT_DIM = "${musicPalette.accentDim}"
M_SURFACE = "${musicPalette.surface}"
M_ON_ACCENT = "${musicPalette.onAccent}"
SCALLOP_D = "${buildScallopPath(96, 108, 66, 59, 12)}"
WAVE_ACTIVE_D = "${buildSquigglyWave(244, 244 + Math.round((musicProgress / 100) * 230), 108, 3.2, 0.25)}"
WAVE_X_END = ${244 + Math.round((musicProgress / 100) * 230)}

cover_tag = f'<image href="{cover_data_uri}" x="28" y="40" width="136" height="136" preserveAspectRatio="xMidYMid slice" clip-path="url(#caelestiaScallop)" />' if cover_data_uri else f'<rect x="28" y="40" width="136" height="136" fill="{M_ACCENT_DIM}" clip-path="url(#caelestiaScallop)" />'

player_svg = f"""<svg width="640" height="216" viewBox="0 0 640 216" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="caelestiaScallop">
      <path d="{SCALLOP_D}">
        <animateTransform attributeName="transform" type="rotate" from="0 96 108" to="360 96 108" dur="22s" repeatCount="indefinite" />
      </path>
    </clipPath>
    <radialGradient id="caelestiaGlow1" cx="18%" cy="50%" r="55%">
      <stop offset="0%" stop-color="{M_ACCENT}" stop-opacity="0.28">
        <animate attributeName="stop-opacity" values="0.22;0.34;0.22" dur="6s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="{M_SURFACE}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="caelestiaGlow2" cx="84%" cy="30%" r="50%">
      <stop offset="0%" stop-color="{M_ACCENT}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="{M_SURFACE}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect x="0.5" y="0.5" width="639" height="215" rx="28" fill="{M_SURFACE}" stroke="{M_ACCENT}" stroke-opacity="0.22" />
  <rect x="1" y="1" width="638" height="214" rx="28" fill="url(#caelestiaGlow1)" />
  <rect x="1" y="1" width="638" height="214" rx="28" fill="url(#caelestiaGlow2)" />

  <!-- Morphing Rotating Scalloped Album Frame -->
  <path d="{SCALLOP_D}" fill="{M_ACCENT}" fill-opacity="0.18">
    <animateTransform attributeName="transform" type="rotate" from="360 96 108" to="0 96 108" dur="18s" repeatCount="indefinite" />
  </path>
  {cover_tag}

  <!-- Track Metadata -->
  <text x="196" y="48" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="18" fill="#F6F2F4">${musicTrack.slice(0, 34).replace(/"/g, "&quot;")}</text>
  <text x="196" y="70" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="13" fill="#C9BFC2">${musicArtist.slice(0, 38).replace(/"/g, "&quot;")}</text>
  <text x="196" y="88" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="400" font-size="11.5" fill="#9A8F93">Caelestia Live Audio</text>

  <!-- Live Equalizer Sound Bar -->
  <g transform="translate(556, 36)">
    <rect x="0" y="10" width="3.5" height="14" rx="1.75" fill="{M_ACCENT}">
      <animate attributeName="height" values="6;20;9;18;6" dur="1.1s" repeatCount="indefinite" />
      <animate attributeName="y" values="18;4;15;6;18" dur="1.1s" repeatCount="indefinite" />
    </rect>
    <rect x="7" y="4" width="3.5" height="20" rx="1.75" fill="{M_ACCENT}">
      <animate attributeName="height" values="18;7;22;10;18" dur="0.9s" repeatCount="indefinite" />
      <animate attributeName="y" values="6;17;2;14;6" dur="0.9s" repeatCount="indefinite" />
    </rect>
    <rect x="14" y="8" width="3.5" height="16" rx="1.75" fill="{M_ACCENT}">
      <animate attributeName="height" values="10;21;8;19;10" dur="1.25s" repeatCount="indefinite" />
      <animate attributeName="y" values="14;3;16;5;14" dur="1.25s" repeatCount="indefinite" />
    </rect>
    <rect x="21" y="12" width="3.5" height="12" rx="1.75" fill="{M_ACCENT}">
      <animate attributeName="height" values="16;6;19;8;16" dur="1.0s" repeatCount="indefinite" />
      <animate attributeName="y" values="8;18;5;16;8" dur="1.0s" repeatCount="indefinite" />
    </rect>
    <rect x="28" y="6" width="3.5" height="18" rx="1.75" fill="{M_ACCENT}">
      <animate attributeName="height" values="8;19;11;22;8" dur="1.15s" repeatCount="indefinite" />
      <animate attributeName="y" values="16;5;13;2;16" dur="1.15s" repeatCount="indefinite" />
    </rect>
  </g>

  <!-- Material 3 Squiggly Progress Wave + Timestamps -->
  <text x="196" y="112" font-family="'JetBrains Mono', monospace" font-size="11" fill="#C9BFC2">2:27</text>
  <line x1="{WAVE_X_END}" y1="108" x2="474" y2="108" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round" />
  <path d="{WAVE_ACTIVE_D}" stroke="{M_ACCENT}" stroke-width="3" stroke-linecap="round" fill="none" />
  <rect x="{WAVE_X_END - 2}" y="99" width="4" height="18" rx="2" fill="{M_ACCENT}" />
  <text x="486" y="112" font-family="'JetBrains Mono', monospace" font-size="11" fill="#C9BFC2">3:26</text>

  <!-- Transport Controls -->
  <g transform="translate(196, 130)">
    <circle cx="15" cy="18" r="15" fill="#FFFFFF" fill-opacity="0.06" />
    <path d="M10 14h3l4 8h3M20 14h-3l-1.5 3M10 22h3l1.5-3" stroke="#C9BFC2" stroke-width="1.5" stroke-linecap="round" />

    <circle cx="54" cy="18" r="16" fill="#FFFFFF" fill-opacity="0.08" />
    <path d="M58 13l-6 5 6 5V13zM50 13v10" stroke="#F6F2F4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />

    <rect x="80" y="0" width="76" height="36" rx="18" fill="{M_ACCENT}" />
    <rect x="112" y="11" width="3.8" height="14" rx="1.5" fill="{M_ON_ACCENT}" />
    <rect x="120" y="11" width="3.8" height="14" rx="1.5" fill="{M_ON_ACCENT}" />

    <circle cx="182" cy="18" r="16" fill="#FFFFFF" fill-opacity="0.08" />
    <path d="M178 13l6 5-6 5V13zM186 13v10" stroke="#F6F2F4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />

    <circle cx="221" cy="18" r="15" fill="#FFFFFF" fill-opacity="0.06" />
    <path d="M216 16h9l-2-2M226 20h-9l2 2" stroke="#C9BFC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Volume Slider Bar -->
  <g transform="translate(196, 180)">
    <path d="M2 5h3l4-3v10l-4-3H2V5z" fill="#C9BFC2" />
    <rect x="18" y="5.5" width="210" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.14" />
    <rect x="18" y="5.5" width="72" height="4" rx="2" fill="{M_ACCENT}" />
    <rect x="88" y="1.5" width="4" height="12" rx="2" fill="{M_ACCENT}" />
  </g>
</svg>"""

with open("dist/now-playing.svg", "w", encoding="utf-8") as f:
    f.write(player_svg)

# 3. 30-Day Commit Line Graph SVG (dist/commit-line.svg)
today = datetime.date.today()
days = [(today - datetime.timedelta(days=i)).isoformat() for i in range(29, -1, -1)]
counts = {d: 0 for d in days}

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
dots = "\\n".join([f'<circle cx="{x}" cy="{y}" r="3" fill="{ACCENT}" />' for x, y in coords[::3]])

line_svg = f"""<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{ACCENT}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="{ACCENT}" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <rect x="0.5" y="0.5" width="{w-1}" height="{h-1}" rx="24" fill="{CARD}" stroke="{BORDER}" />
  <text x="28" y="30" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" fill="{TEXT}">{USERNAME} // 30-Day Commit Activity ({sum(series)} contributions)</text>
  <path d="{area_d}" fill="url(#areaGrad)" />
  <path d="{line_d}" stroke="{ACCENT}" stroke-width="2.6" stroke-linecap="round" fill="none" />
  {dots}
</svg>"""

with open("dist/commit-line.svg", "w", encoding="utf-8") as f:
    f.write(line_svg)

# 4. Top Repositories Table SVG (dist/top-repos.svg)
repos_req = urllib.request.Request(
    f"https://api.github.com/users/{USERNAME}/repos?per_page=100&type=owner&sort=updated",
    headers={"User-Agent": "README-Studio-Generator"}
)
with urllib.request.urlopen(repos_req) as res:
    raw_repos = json.loads(res.read().decode())

filtered_repos = [
    r for r in (raw_repos if isinstance(raw_repos, list) else [])
    if not r.get("fork") and r.get("name", "").lower() != USERNAME.lower()
]
filtered_repos.sort(key=lambda r: (r.get("stargazers_count", 0), r.get("pushed_at", "")), reverse=True)
top_repos = filtered_repos[:5]

row_h = 46
header_h = 44
total_h = header_h + max(1, len(top_repos)) * row_h
rows_svg = []

for idx, repo in enumerate(top_repos):
    y = header_h + idx * row_h
    r_name = (repo.get("name") or "")[:28].replace("&", "&amp;").replace("<", "&lt;")
    r_desc = (repo.get("description") or "No description provided.")[:56].replace("&", "&amp;").replace("<", "&lt;")
    if len(repo.get("description") or "") > 56:
        r_desc += "..."
    r_lang = (repo.get("language") or "Markdown").replace("&", "&amp;")
    r_stars = repo.get("stargazers_count", 0)
    line_el = f'<line x1="0" y1="{y}" x2="820" y2="{y}" stroke="{BORDER}" />'
    rows_svg.append(f"""  {line_el}
  <text x="20" y="{y + 28}" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#58a6ff">{r_name}</text>
  <text x="215" y="{y + 28}" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="12.5" fill="{MUTED}">{r_desc}</text>
  <text x="655" y="{y + 28}" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-size="12.5" fill="{TEXT}">{r_lang}</text>
  <text x="768" y="{y + 28}" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="12.5" fill="{TEXT}">★ {r_stars}</text>""")

repos_svg = f"""<svg width="820" height="{total_h}" viewBox="0 0 820 {total_h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="819" height="{total_h - 1}" rx="12" fill="{BG}" stroke="{BORDER}" />
  <text x="20" y="27" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12.5" fill="{TEXT}">Repository</text>
  <text x="215" y="27" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12.5" fill="{TEXT}">Description</text>
  <text x="655" y="27" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12.5" fill="{TEXT}">Stack</text>
  <text x="768" y="27" text-anchor="middle" font-family="'Google Sans', 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12.5" fill="{TEXT}">Stars</text>
  <line x1="200" y1="0" x2="200" y2="{total_h}" stroke="{BORDER}" />
  <line x1="600" y1="0" x2="600" y2="{total_h}" stroke="{BORDER}" />
  <line x1="712" y1="0" x2="712" y2="{total_h}" stroke="{BORDER}" />
{chr(10).join(rows_svg)}
</svg>"""

with open("dist/top-repos.svg", "w", encoding="utf-8") as f:
    f.write(repos_svg)


print("Generated dist/hero-card.svg, dist/now-playing.svg, and dist/commit-line.svg successfully.")
`;
  }, [username, theme, profileTelemetry, selectedLangs, tagline, greeting, bioParagraph1, bioParagraph2, musicCoverUrl, musicTrack, musicArtist, musicProgress, musicPalette]);

  const generatedWorkflow = `name: Update Custom Profile SVGs

on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  render-svgs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Generate Profile SVGs
        run: python generate_svgs.py

      - name: Commit & Push SVGs
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add dist/
          git diff --quiet && git diff --staged --quiet || (git commit -m "chore: refresh profile SVGs" && git push)
`;

  const allSelectedTechObjects = [
    ...TECH_CATALOG.languages.filter((i) => selectedLangs.includes(i.id)),
    ...TECH_CATALOG.frameworks.filter((i) => selectedFrameworks.includes(i.id)),
    ...TECH_CATALOG.tools.filter((i) => selectedTools.includes(i.id)),
  ];

  const total30DayCommits = profileTelemetry.commitSeries.reduce((a, b) => a + b, 0);
  const timeFormatted = nowClock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateFormatted = nowClock.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' });

  return (
    <div
      className="min-h-screen text-[#f2eff7] flex font-sans selection:bg-[#c8bfff]/30 relative overflow-hidden"
      style={{
        backgroundColor: '#0c0b10',
        backgroundImage:
          'radial-gradient(circle at 65% 22%, rgba(200, 191, 255, 0.08), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 199, 250, 0.05), transparent 40%)',
      }}
    >
      {/* SLIM LEFT NAVIGATION RAIL WITH MORPHING PILL SELECTOR */}
      <aside className="w-16 bg-[#111016]/90 backdrop-blur-xl border-r border-white/[0.06] flex flex-col items-center py-4 justify-between shrink-0 z-30">
        <div className="flex flex-col items-center gap-6 w-full">
          <div
            className="w-9 h-9 rounded-2xl bg-[#c8bfff]/15 border border-[#c8bfff]/30 flex items-center justify-center text-[#c8bfff] shadow-inner"
            title="README Studio"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </div>

          <div className="relative flex flex-col items-center gap-2.5 w-full">
            <div
              className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#c8bfff] shadow-[0_0_20px_rgba(200,191,255,0.35)] pointer-events-none"
              style={{
                transform: `translate(-50%, ${activeRailIndex * 50}px) scale(${isMorphingTab ? '0.84, 1.24' : '1, 1'})`,
                transition: 'transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 300ms ease',
              }}
            />

            {RAIL_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeSidebarTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectSidebarTab(tab.id)}
                  title={tab.label}
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 group focus:outline-none"
                >
                  <Icon
                    className={`w-[18px] h-[18px] transition-transform duration-200 ${
                      active
                        ? 'text-[#1c1638] scale-110'
                        : 'text-[#8e899c] group-hover:text-[#f2eff7]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setActiveViewTab('preview')}
            title="GitHub README Preview"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeViewTab === 'preview'
                ? 'bg-white/10 text-[#c8bfff]'
                : 'text-[#8e899c] hover:text-[#f2eff7]'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveViewTab('export')}
            title="Export Repo Files"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeViewTab === 'export'
                ? 'bg-white/10 text-[#c8bfff]'
                : 'text-[#8e899c] hover:text-[#f2eff7]'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* SECONDARY INSPECTOR DRAWER */}
      <section className="w-full lg:w-[395px] bg-[#131218]/80 backdrop-blur-md border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="h-14 px-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-[#f2eff7]">
              {RAIL_TABS.find((t) => t.id === activeSidebarTab)?.label}
            </span>
            
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-4 max-h-[calc(100vh-3.5rem)]">
          {/* Repository & Tonal Theme Card */}
          <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[#c8bfff]" />
                Repo & SVG Card Theme
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Generator Repo</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setThemeKey(key)}
                  className={`px-3 py-1.5 rounded-full border text-left text-[11px] font-medium flex items-center gap-2 transition-all duration-200 ${
                    themeKey === key
                      ? 'border-[#c8bfff]/60 bg-[#c8bfff]/15 text-[#f2eff7] scale-[1.01]'
                      : 'border-white/[0.06] bg-[#23202c] text-[#9e99aa] hover:text-[#f2eff7]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: t.accent }}
                  />
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: GITHUB PROFILE SCRAPER & BIO */}
          {activeSidebarTab === 'bio' && (
            <div className="space-y-4">
              <form onSubmit={handleScrapeGitHubProfile} className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-[#c8bfff]" />
                    Sync GitHub Profile URL
                  </h3>
                  
                </div>
                <input
                  type="text"
                  placeholder="https://github.com/obedjoshua"
                  value={githubProfileUrlInput}
                  onChange={(e) => setGithubProfileUrlInput(e.target.value)}
                  className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  required
                />
                {profileFetchError && (
                  <div className="p-2.5 rounded-2xl bg-rose-500/15 text-xs text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{profileFetchError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isFetchingProfile}
                  className="w-full py-2.5 px-4 rounded-full bg-[#c8bfff] hover:bg-[#d7d0ff] disabled:opacity-60 text-[#1c1638] text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isFetchingProfile ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Scraping Telemetry...
                    </>
                  ) : (
                    <>
                      <Activity className="w-3.5 h-3.5" />
                      Fetch Profile, Status & Commit Graph
                    </>
                  )}
                </button>
              </form>

              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Headline Statement</label>
                  <input
                    type="text"
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Subtitle / Discipline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">About Me (Primary)</label>
                  <textarea
                    rows={3}
                    value={bioParagraph1}
                    onChange={(e) => setBioParagraph1(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Secondary Note</label>
                  <textarea
                    rows={2}
                    value={bioParagraph2}
                    onChange={(e) => setBioParagraph2(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECTION ORDER & PRESETS */}
          {activeSidebarTab === 'layout' && (
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-2.5">
                <h3 className="text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                  <LayoutTemplate className="w-3.5 h-3.5 text-[#c8bfff]" />
                  Layout Presets
                </h3>
                <div className="space-y-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className="w-full p-3 rounded-2xl bg-[#23202c] hover:bg-[#2b2836] border border-white/[0.06] text-left transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#f2eff7] group-hover:text-[#c8bfff]">
                          {preset.name}
                        </span>
                        <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#c8bfff]/15 text-[#c8bfff]">
                          Apply
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9e99aa] mt-1">{preset.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-2.5">
                <h3 className="text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#c8bfff]" />
                  Module Order (Drag or Reorder)
                </h3>
                <div className="space-y-2">
                  {sectionOrder.map((secKey, idx) => {
                    const meta = SECTION_META[secKey];
                    const Icon = meta.icon;
                    const isEnabled = enabledSections[secKey];
                    return (
                      <div
                        key={secKey}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`p-2.5 rounded-2xl border flex items-center justify-between transition-all cursor-grab active:cursor-grabbing ${
                          isEnabled
                            ? 'bg-[#23202c] border-white/[0.08] text-[#f2eff7]'
                            : 'bg-[#15141b] border-white/[0.04] text-[#6d687a]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <GripVertical className="w-3.5 h-3.5 text-[#6d687a] shrink-0" />
                          <Icon className="w-3.5 h-3.5 text-[#c8bfff] shrink-0" />
                          <span className="text-xs font-medium truncate">{meta.label}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => moveSection(idx, -1)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveSection(idx, 1)}
                            disabled={idx === sectionOrder.length - 1}
                            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() =>
                              setEnabledSections((prev) => ({ ...prev, [secKey]: !prev[secKey] }))
                            }
                            className={`p-1.5 rounded-full ml-0.5 ${
                              isEnabled ? 'text-[#86d6be] bg-[#86d6be]/10' : 'text-[#6d687a]'
                            }`}
                          >
                            {isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STACK & EDITOR */}
          {activeSidebarTab === 'stack' && (
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-2.5">
                <label className="block text-xs font-medium text-[#f2eff7]">Display Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStackLayout('grid')}
                    className={`py-2 px-3 rounded-full text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                      stackLayout === 'grid'
                        ? 'bg-[#c8bfff] border-[#c8bfff] text-[#1c1638]'
                        : 'bg-[#23202c] border-white/[0.08] text-[#9e99aa]'
                    }`}
                  >
                    {stackLayout === 'grid' && <Check className="w-3.5 h-3.5" />}
                    GitHub Table Grid
                  </button>
                  <button
                    onClick={() => setStackLayout('badges')}
                    className={`py-2 px-3 rounded-full text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                      stackLayout === 'badges'
                        ? 'bg-[#c8bfff] border-[#c8bfff] text-[#1c1638]'
                        : 'bg-[#23202c] border-white/[0.08] text-[#9e99aa]'
                    }`}
                  >
                    {stackLayout === 'badges' && <Check className="w-3.5 h-3.5" />}
                    Pill Badges
                  </button>
                </div>
              </div>

              {[
                { label: 'Languages', items: TECH_CATALOG.languages, list: selectedLangs, setter: setSelectedLangs },
                { label: 'Frameworks', items: TECH_CATALOG.frameworks, list: selectedFrameworks, setter: setSelectedFrameworks },
                { label: 'Infrastructure', items: TECH_CATALOG.tools, list: selectedTools, setter: setSelectedTools },
              ].map((group) => (
                <div key={group.label} className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-2.5">
                  <label className="block text-xs font-medium text-[#f2eff7]">{group.label}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => {
                      const active = group.list.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(group.list, group.setter, item.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all duration-200 ${
                            active
                              ? 'bg-[#c8bfff]/20 border-[#c8bfff] text-[#f2eff7] scale-[1.02]'
                              : 'bg-[#23202c] border-white/[0.06] text-[#9e99aa] hover:text-[#f2eff7]'
                          }`}
                        >
                          {active ? (
                            <Check className="w-3 h-3 text-[#c8bfff]" />
                          ) : (
                            <img
                              src={getTechIconUrl(item.id)}
                              alt={item.name}
                              className="w-3.5 h-3.5 rounded-full"
                            />
                          )}
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
                <label className="block text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5 text-[#c8bfff]" />
                  Code Editors
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {EDITORS.map((ed) => {
                    const active = selectedEditors.includes(ed.id);
                    return (
                      <button
                        key={ed.id}
                        onClick={() => toggleItem(selectedEditors, setSelectedEditors, ed.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all ${
                          active
                            ? 'bg-[#86d6be]/20 border-[#86d6be] text-[#f2eff7]'
                            : 'bg-[#23202c] border-white/[0.06] text-[#9e99aa]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 text-[#86d6be]" />}
                        {ed.name}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={editorNotes}
                  onChange={(e) => setEditorNotes(e.target.value)}
                  className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                />
              </div>

              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#f2eff7]">Collapsible Disclosure</span>
                  <input
                    type="checkbox"
                    checked={showDisclosure}
                    onChange={(e) => setShowDisclosure(e.target.checked)}
                    className="w-4 h-4 accent-[#c8bfff]"
                  />
                </div>
                {showDisclosure && (
                  <textarea
                    rows={2}
                    value={disclosureText}
                    onChange={(e) => setDisclosureText(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-[#f2eff7]"
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COMPACT MINI PLAYER */}
          {activeSidebarTab === 'spotify' && (
            <div className="space-y-4">
              <form onSubmit={handleFetchMusicTrack} className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
                <label className="block text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5 text-[#c8bfff]" />
                  Spotify or YT Music Track URL
                </label>
                <input
                  type="url"
                  placeholder="https://open.spotify.com/track/..."
                  value={musicUrlInput}
                  onChange={(e) => setMusicUrlInput(e.target.value)}
                  className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  required
                />
                {musicFetchError && (
                  <div className="p-2.5 rounded-2xl bg-rose-500/15 text-xs text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{musicFetchError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isFetchingMusic}
                  className="w-full py-2.5 px-4 rounded-full bg-[#c8bfff] hover:bg-[#d7d0ff] disabled:opacity-60 text-[#1c1638] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  {isFetchingMusic ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Fetching Track...
                    </>
                  ) : (
                    <>
                      <Music className="w-3.5 h-3.5" />
                      Sync Track & Cover Art
                    </>
                  )}
                </button>
              </form>

              <div className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Track Title</label>
                  <input
                    type="text"
                    value={musicTrack}
                    onChange={(e) => setMusicTrack(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-[#f2eff7]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Artist</label>
                  <input
                    type="text"
                    value={musicArtist}
                    onChange={(e) => setMusicArtist(e.target.value)}
                    className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-[#f2eff7]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">Upload Custom Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCoverImage}
                    className="w-full text-[11px] text-[#d4cfe0] file:mr-2.5 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-semibold file:bg-[#c8bfff]/20 file:text-[#c8bfff] hover:file:bg-[#c8bfff]/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#9e99aa] mb-1 ml-1">
                    Squiggly Scrubber Position ({musicProgress}%)
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={98}
                    value={musicProgress}
                    onChange={(e) => setMusicProgress(Number(e.target.value))}
                    className="w-full accent-[#c8bfff]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedReadme);
                    setCopiedPyToast(true);
                    setTimeout(() => setCopiedPyToast(false), 2500);
                  }}
                  className="w-full py-2 px-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#f2eff7] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedPyToast ? "Copied generate_svgs.py!" : "Copy generate_svgs.py for Live Profile"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: VERIFIED BADGE AUTO-FETCHER */}
          {activeSidebarTab === 'badges' && (
            <div className="space-y-4">
              <form onSubmit={handleFetchVerifiedBadge} className="p-4 rounded-3xl bg-[#1a1821] border border-white/[0.06] space-y-3">
                <h4 className="text-xs font-medium text-[#f2eff7] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c8bfff]" />
                  Import Verified Badge URL
                </h4>
                <input
                  type="url"
                  placeholder="https://www.credly.com/badges/.../public_url"
                  value={badgeUrlInput}
                  onChange={(e) => setBadgeUrlInput(e.target.value)}
                  className="w-full bg-[#23202c] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#f2eff7] focus:outline-none focus:border-[#c8bfff]"
                  required
                />
                {badgeFetchError && (
                  <div className="p-2.5 rounded-2xl bg-rose-500/15 text-xs text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{badgeFetchError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isFetchingBadge}
                  className="w-full py-2.5 px-4 rounded-full bg-[#c8bfff] hover:bg-[#d7d0ff] disabled:opacity-60 text-[#1c1638] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  {isFetchingBadge ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Verifying Credential...
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      Fetch Verified Badge
                    </>
                  )}
                </button>
              </form>

              <div className="space-y-2.5">
                {badges.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-2xl bg-[#1a1821] border border-white/[0.06] flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-11 h-11 rounded-2xl object-contain bg-[#111016] p-1.5 shrink-0"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-xs font-semibold text-[#f2eff7] truncate">{b.title}</p>
                        <p className="text-[11px] text-[#86d6be] font-medium">Earned: {b.earnedDate}</p>
                        <p className="text-[11px] text-[#9e99aa] line-clamp-2">{b.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeBadge(b.id)}
                      className="p-1.5 rounded-full text-[#9e99aa] hover:text-rose-300 hover:bg-rose-500/15 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RIGHT STAGE: FLOATING STATUS BAR + AUTHENTIC GITHUB README FRAME WITH STYLIZED SVG CARDS */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Floating Status & Morphing View Switcher Bar */}
        <header className="h-16 px-6 flex items-center justify-between shrink-0">
          <div className="w-32 hidden sm:block" />

          {/* Center Floating Clock & Online Status Pill */}
          <div className="px-4 py-1.5 rounded-full bg-[#1a1821]/90 backdrop-blur-md border border-white/[0.07] flex items-center gap-3 text-xs shadow-lg">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-[#f2eff7]">{timeFormatted}</span>
              <span className="text-[10px] text-[#9e99aa]">{dateFormatted}</span>
            </div>
            <span className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5 text-[11px] text-[#c7c2d4]">
              <span
                className={`w-2 h-2 rounded-full ${
                  profileTelemetry.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                }`}
              />
              <span>{profileTelemetry.isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>

          {/* Right Morphing Sliding Pill View Switcher */}
          <div className="relative bg-[#1a1821] p-1 rounded-full border border-white/[0.08] flex items-center">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#c8bfff] shadow-sm pointer-events-none"
              style={{
                transform: activeViewTab === 'preview' ? 'translateX(0%)' : 'translateX(100%)',
                transition: 'transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
            <button
              onClick={() => setActiveViewTab('preview')}
              className={`relative z-10 w-24 py-1 rounded-full text-xs font-semibold transition-colors ${
                activeViewTab === 'preview' ? 'text-[#1c1638]' : 'text-[#9e99aa] hover:text-[#f2eff7]'
              }`}
            >
              READme
            </button>
            <button
              onClick={() => setActiveViewTab('export')}
              className={`relative z-10 w-24 py-1 rounded-full text-xs font-semibold transition-colors ${
                activeViewTab === 'export' ? 'text-[#1c1638]' : 'text-[#9e99aa] hover:text-[#f2eff7]'
              }`}
            >
              Export
            </button>
          </div>
        </header>

        {/* Main Content Canvas */}
        <div className="flex-1 px-6 pb-10 flex flex-col items-center">
          {activeViewTab === 'preview' ? (
            /* AUTHENTIC GITHUB README CONTAINER (1:1 WITH HOW GITHUB RENDERS YOUR SVG + MARKDOWN) */
            <div className="w-full max-w-[896px] rounded-xl border border-[#30363d] bg-[#0d1117] text-[#e6edf3] shadow-2xl overflow-hidden">
              {/* GitHub Sticky File Header Bar */}
              <div className="px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e6edf3]">
                  <BookOpen className="w-3.5 h-3.5 text-[#8b949e]" />
                  <span>{username || 'obedjoshua'}</span>
                  <span className="text-[#8b949e]">/</span>
                  <span className="font-semibold">README.md</span>
                </div>
                
              </div>

              {/* GitHub Markdown Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {sectionOrder
                  .filter((key) => enabledSections[key])
                  .map((secKey, idx, arr) => (
                    <React.Fragment key={secKey}>
                      {/* 1. STYLIZED HERO CARD SVG (dist/hero-card.svg — Renders identically on GitHub) */}
                      {secKey === 'header' && (
                        <div className="flex justify-center">
                          <div
                            className="w-full max-w-[820px] rounded-[28px] border border-[#30363d] p-5 sm:p-6 relative overflow-hidden"
                            style={{
                              backgroundColor: theme.bg,
                              backgroundImage: `radial-gradient(circle at 72% 25%, ${theme.accentSoft}, transparent 55%)`,
                            }}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                              {/* Left Identity Card */}
                              <div
                                className="md:col-span-4 rounded-[24px] p-5 border border-white/[0.07] flex flex-col items-center text-center"
                                style={{ backgroundColor: theme.card }}
                              >
                                <img
                                  src={profileTelemetry.avatarUrl}
                                  alt={username}
                                  className="w-20 h-20 rounded-full object-cover ring-2 ring-white/15"
                                />
                                <h2 className="text-lg font-bold mt-3 tracking-tight" style={{ color: theme.text }}>
                                  {username || 'obedjoshua'}
                                </h2>
                                <p className="text-[11px] mt-0.5 line-clamp-1" style={{ color: theme.muted }}>
                                  {tagline}
                                </p>

                                <div className="flex items-center gap-1.5 mt-2.5">
                                  {selectedLangs.slice(0, 3).map((langId) => (
                                    <span
                                      key={langId}
                                      className="px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider"
                                      style={{ backgroundColor: theme.cardHigh, color: theme.muted }}
                                    >
                                      {langId}
                                    </span>
                                  ))}
                                </div>

                                <div className="w-full mt-4 pt-3 border-t border-white/[0.07] text-left space-y-1.5">
                                  <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: theme.text }}>
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        profileTelemetry.isOnline ? 'bg-emerald-400' : 'bg-slate-400'
                                      }`}
                                    />
                                    <span>{profileTelemetry.statusText}</span>
                                  </div>
                                  <div
                                    className="px-2.5 py-1 rounded-lg flex items-center justify-between text-[10px]"
                                    style={{ backgroundColor: theme.cardHigh, color: theme.muted }}
                                  >
                                    <span className="flex items-center gap-1 truncate">
                                      <Clock className="w-2.5 h-2.5 shrink-0" />
                                      {profileTelemetry.location}
                                    </span>
                                    <span className="font-mono text-[#f2eff7]">{timeFormatted}</span>
                                  </div>
                                  <div
                                    className="px-2.5 py-1 rounded-lg flex items-center justify-between text-[10px]"
                                    style={{ backgroundColor: theme.cardHigh, color: theme.muted }}
                                  >
                                    <span>Repos / Followers</span>
                                    <span className="font-mono font-bold text-[#f2eff7]">
                                      {profileTelemetry.publicRepos} / {profileTelemetry.followers}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Editorial Bio */}
                              <div className="md:col-span-8 space-y-3">
                                <span
                                  className="text-[10.5px] font-bold uppercase tracking-[0.18em]"
                                  style={{ color: theme.muted }}
                                >
                                  ABOUT ME • README
                                </span>
                                <h1
                                  className="text-2xl sm:text-[26px] font-bold tracking-tight leading-tight"
                                  style={{ color: theme.text }}
                                >
                                  {greeting}
                                </h1>
                                <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: '#d4cfe0' }}>
                                  {bioParagraph1}
                                </p>
                                <p className="text-xs leading-relaxed" style={{ color: theme.muted }}>
                                  {bioParagraph2}
                                </p>
                                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                                  <a
                                    href={`https://github.com/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-full text-xs font-bold"
                                    style={{ backgroundColor: theme.accent, color: theme.onAccent }}
                                  >
                                    View Repositories
                                  </a>
                                  <a
                                    href={`https://github.com/${username}?tab=followers`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10"
                                    style={{ backgroundColor: theme.cardHigh, color: theme.text }}
                                  >
                                    Follow @{username}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. SLIM HORIZONTAL MINI-PLAYER SVG (dist/now-playing.svg) */}
                      {secKey === 'spotify' && (
                        <div className="flex justify-center">
                          <div
                            className="relative w-full max-w-[460px] h-[68px] rounded-2xl px-3 flex items-center justify-between gap-3 overflow-hidden border border-white/[0.08]"
                            style={{ backgroundColor: theme.playerBg }}
                          >
                            <a
                              href={musicLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 min-w-0 flex-1"
                            >
                              <img
                                src={musicCoverUrl}
                                alt={musicTrack}
                                className="w-[46px] h-[46px] rounded-[10px] object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-[13px] font-bold text-[#f5f3f7] truncate leading-tight">
                                  {musicTrack}
                                </p>
                                <p className="text-[11.5px] font-medium text-[#b8b0c2] truncate mt-0.5">
                                  {musicArtist}
                                </p>
                              </div>
                            </a>

                            <div className="flex items-center gap-4 pr-1.5 shrink-0 text-[#e2dce8]">
                              <Speaker className="w-[18px] h-[18px] opacity-80" />
                              <button
                                onClick={() => setMusicLiked(!musicLiked)}
                                className="focus:outline-none"
                              >
                                <Heart
                                  className={`w-[18px] h-[18px] ${
                                    musicLiked ? 'fill-rose-400 text-rose-400' : 'opacity-85'
                                  }`}
                                />
                              </button>
                              <a href={musicLink} target="_blank" rel="noopener noreferrer">
                                <Pause className="w-5 h-5 fill-[#f5f3f7] text-[#f5f3f7]" />
                              </a>
                            </div>

                            <div className="absolute bottom-1.5 left-3 right-3 h-[2.5px] rounded-full bg-white/15 overflow-hidden">
                              <div
                                className="h-full bg-[#f5f3f7] rounded-full"
                                style={{ width: `${musicProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. GITHUB MARKDOWN TECH STACK TABLE & EDITOR */}
                      {secKey === 'stack' && (
                        <div className="space-y-4">
                          <h3 className="text-base font-semibold text-[#e6edf3] pb-2 border-b border-[#21262d]">
                            🛠️ Tools, Languages & Environment
                          </h3>

                          {stackLayout === 'grid' ? (
                            <div className="overflow-x-auto flex justify-center">
                              <table className="border-collapse border border-[#30363d] text-xs">
                                <tbody>
                                  {Array.from({ length: Math.ceil(allSelectedTechObjects.length / 5) }).map((_, rIdx) => (
                                    <tr key={rIdx}>
                                      {allSelectedTechObjects.slice(rIdx * 5, rIdx * 5 + 5).map((tech) => (
                                        <td
                                          key={tech.id}
                                          className="border border-[#30363d] px-5 py-3 text-center w-[116px] bg-[#0d1117]"
                                        >
                                          <img
                                            src={getTechIconUrl(tech.id)}
                                            alt={tech.name}
                                            className="w-10 h-10 mx-auto mb-1.5"
                                          />
                                          <div className="font-semibold text-[11px] text-[#e6edf3]">{tech.name}</div>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="flex flex-wrap justify-center gap-1.5">
                              {allSelectedTechObjects.map((tech) => (
                                <span
                                  key={tech.id}
                                  className="px-3 py-1 rounded bg-[#1d1b22] border border-[#30363d] text-xs font-semibold text-white flex items-center gap-1.5"
                                >
                                  <img
                                    src={getTechIconUrl(tech.id)}
                                    alt={tech.name}
                                    className="w-3.5 h-3.5"
                                  />
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                          )}

                          {selectedEditors.length > 0 && (
                            <div className="space-y-2 text-xs">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-[#e6edf3]">Code Editors & Setup:</span>
                                {EDITORS.filter((e) => selectedEditors.includes(e.id)).map((ed) => (
                                  <span
                                    key={ed.id}
                                    className="px-2.5 py-0.5 rounded text-[11px] font-bold text-white uppercase"
                                    style={{ backgroundColor: `#${ed.badgeColor}` }}
                                  >
                                    {ed.name}
                                  </span>
                                ))}
                              </div>
                              <blockquote className="pl-3 border-l-[3px] border-[#30363d] text-[#8b949e]">
                                {editorNotes}
                              </blockquote>
                            </div>
                          )}

                          {showDisclosure && (
                            <div className="text-xs text-[#e6edf3]">
                              <button
                                onClick={() => setDisclosureOpen(!disclosureOpen)}
                                className="font-semibold flex items-center gap-1 hover:text-[#58a6ff]"
                              >
                                {disclosureOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                Other Tools & Technologies Disclosure
                              </button>
                              {disclosureOpen && (
                                <p className="mt-2 pl-4 text-[#8b949e]">{disclosureText}</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* 4. COMMIT LINE GRAPH SVG + MARKDOWN BULLET FEED */}
                      {secKey === 'contributions' && (
                        <div className="space-y-3">
                          <h3 className="text-base font-semibold text-[#e6edf3] pb-2 border-b border-[#21262d]">
                            📈 Commit Velocity & Latest Contributions
                          </h3>

                          <div className="flex justify-center">
                            <div
                              className="w-full max-w-[680px] p-5 rounded-[24px] border border-[#30363d]"
                              style={{ backgroundColor: theme.card }}
                            >
                              <div className="text-xs font-bold mb-2" style={{ color: theme.text }}>
                                {username} // 30-Day Commit Activity ({total30DayCommits} contributions)
                              </div>
                              <svg viewBox="0 0 640 150" className="w-full h-36 overflow-visible">
                                <defs>
                                  <linearGradient id="previewCommitArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={theme.accent} stopOpacity="0.32" />
                                    <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <path d={commitGraphGeometry.area} fill="url(#previewCommitArea)" />
                                <path
                                  d={commitGraphGeometry.line}
                                  fill="none"
                                  stroke={theme.accent}
                                  strokeWidth="2.6"
                                  strokeLinecap="round"
                                />
                                {commitGraphGeometry.coords
                                  .filter((_, i) => i % 3 === 0 || i === commitGraphGeometry.coords.length - 1)
                                  .map((pt, i) => (
                                    <circle
                                      key={i}
                                      cx={pt.x}
                                      cy={pt.y}
                                      r="3"
                                      fill={theme.accent}
                                    />
                                  ))}
                              </svg>
                            </div>
                          </div>

                          <ul className="list-disc pl-5 space-y-1 text-xs text-[#e6edf3]">
                            {profileTelemetry.latestContris.map((item, i) => (
                              <li key={i}>
                                <span className="font-semibold">{item.repo}</span> — {item.detail}{' '}
                                <span className="italic text-[#8b949e]">({item.when})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 5. GITHUB MARKDOWN VERIFIED BADGES TABLE */}
                      {secKey === 'badges' && (
                        <div className="space-y-3">
                          <h3 className="text-base font-semibold text-[#e6edf3] pb-2 border-b border-[#21262d]">
                            🏅 Verified Certifications & Badges
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-[#30363d] text-xs">
                              <tbody>
                                {badges.map((b) => (
                                  <tr key={b.id} className="even:bg-[#161b22]">
                                    <td className="border border-[#30363d] p-3 text-center w-[100px]">
                                      <a href={b.verifyUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={b.imageUrl} alt={b.title} className="w-[72px] h-[72px] object-contain mx-auto" />
                                      </a>
                                    </td>
                                    <td className="border border-[#30363d] p-3 space-y-1">
                                      <a
                                        href={b.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-[#58a6ff] hover:underline"
                                      >
                                        {b.title}
                                      </a>
                                      <div className="text-[11px] text-[#8b949e]">
                                        <strong className="text-[#e6edf3]">Issuer:</strong> {b.issuer} •{' '}
                                        <strong className="text-[#e6edf3]">Earned:</strong> {b.earnedDate}
                                      </div>
                                      <p className="text-[11px] text-[#8b949e] leading-relaxed">{b.description}</p>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 6. GITHUB MARKDOWN TOP REPOSITORIES TABLE */}
                      {secKey === 'stats' && (
                        <div className="space-y-3">
                          <h3 className="text-base font-semibold text-[#e6edf3] pb-2 border-b border-[#21262d]">
                            🚀 Top Repositories
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-[#30363d] text-xs">
                              <thead>
                                <tr className="bg-[#161b22]">
                                  <th className="border border-[#30363d] px-3 py-2 text-left font-semibold">Repository</th>
                                  <th className="border border-[#30363d] px-3 py-2 text-left font-semibold">Description</th>
                                  <th className="border border-[#30363d] px-3 py-2 text-center font-semibold">Stack</th>
                                  <th className="border border-[#30363d] px-3 py-2 text-center font-semibold">Stars</th>
                                </tr>
                              </thead>
                              <tbody>
                                {profileTelemetry.topRepos.map((repo) => (
                                  <tr key={repo.name} className="even:bg-[#161b22]">
                                    <td className="border border-[#30363d] px-3 py-2 font-semibold">
                                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">
                                        {repo.name}
                                      </a>
                                    </td>
                                    <td className="border border-[#30363d] px-3 py-2 text-[#8b949e]">{repo.desc}</td>
                                    <td className="border border-[#30363d] px-3 py-2 text-center">{repo.lang}</td>
                                    <td className="border border-[#30363d] px-3 py-2 text-center">⭐ {repo.stars}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {idx < arr.length - 1 && <hr className="border-[#21262d]" />}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          ) : (
            /* CODE EXPORT VIEW */
            <div className="w-full max-w-[896px] space-y-4 pt-2">
              <div className="p-5 rounded-3xl bg-[#1a1821] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-[#f2eff7]">Repository Export Bundle</h2>
                  <p className="text-xs text-[#9e99aa] mt-1">
                    Add <code className="text-[#c8bfff]">generate_svgs.py</code> &{' '}
                    <code className="text-[#c8bfff]">update-readme.yml</code> to{' '}
                    <code className="text-[#f2eff7]">{username}/{repoName}</code>, and paste{' '}
                    <code className="text-[#c8bfff]">README.md</code> into{' '}
                    <code className="text-[#f2eff7]">{username}/{username}</code>.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[#23202c] p-1 rounded-full border border-white/[0.08] shrink-0">
                  {[
                    { id: 'readme', label: 'README.md', icon: FileCode2 },
                    { id: 'python', label: 'generate_svgs.py', icon: Code2 },
                    { id: 'workflow', label: 'update-readme.yml', icon: Workflow },
                  ].map((f) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setActiveCodeFile(f.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${
                          activeCodeFile === f.id
                            ? 'bg-[#c8bfff] text-[#1c1638]'
                            : 'text-[#9e99aa] hover:text-[#f2eff7]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl bg-[#16151c] border border-white/[0.06] overflow-hidden">
                <div className="px-5 py-3 bg-[#1a1821] border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#9e99aa]">
                    {activeCodeFile === 'readme' && `${username}/${username}/README.md`}
                    {activeCodeFile === 'python' && `${username}/${repoName}/generate_svgs.py`}
                    {activeCodeFile === 'workflow' &&
                      `${username}/${repoName}/.github/workflows/update-readme.yml`}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        activeCodeFile === 'readme'
                          ? generatedReadme
                          : activeCodeFile === 'python'
                          ? generatedPythonScript
                          : generatedWorkflow,
                        activeCodeFile
                      )
                    }
                    className="px-4 py-1.5 rounded-full bg-[#c8bfff] hover:bg-[#d7d0ff] text-[#1c1638] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === activeCodeFile ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 text-xs font-mono text-[#f2eff7] overflow-x-auto leading-relaxed max-h-[600px]">
                  {activeCodeFile === 'readme' && generatedReadme}
                  {activeCodeFile === 'python' && generatedPythonScript}
                  {activeCodeFile === 'workflow' && generatedWorkflow}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}