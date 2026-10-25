import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'assets');
const badgesDir = path.join(assetsDir, 'badges');
const rawIconsDir = path.join(__dirname, 'raw-icons');

if (!fs.existsSync(badgesDir)) {
  fs.mkdirSync(badgesDir, { recursive: true });
}

const FONT_SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif";
const FONT_MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";

export const defaultConfig = {
  username: 'seu-usuario',
  displayName: 'Opa, chega mais! 👋',
  bioParagraph1:
    'Sou um desenvolvedor criativo focado em resolver problemas reais de ponta a ponta — da arquitetura back-end e dados (Python, Node.js, PostgreSQL, MongoDB) até interfaces modernas, rápidas e escaláveis com TypeScript, React e Next.js.',
  bioParagraph2:
    'Mais do que escrever código, uno engenharia de software, visão de produto e design (Figma, Photoshop, Illustrator) com fluxos avançados de IA (Codex, Antigravity, Claude, Cursor) para transformar desafios complexos em soluções completas e bem acabadas.',
  contributionsCount: '1,390',
  contributionsYear: '2026',
  workflowTitle: 'Como transformo ideias em produtos',
  workflowBadge: 'Workflow',
  achievementsTitle1: 'Achievements',
  achievementsTitle2: '12 Achievements',
  footerLabel: 'Send feedback',
  repos: [
    {
      name: 'Fullstack-AI-Platform',
      badge: 'Public',
      badgeColor: '#d29922',
      description: 'Arquitetura full-stack com TypeScript, React, Python e PostgreSQL focada em performance e produto.',
      stars: '455',
      forks: '127',
    },
    {
      name: 'NextGen-Design-System',
      badge: 'Public',
      badgeColor: '#8b949e',
      description: 'Sistema de design, componentes interativos e automação criativa integrando Figma, React e Node.js.',
      stars: '293',
      forks: '71',
    },
  ],
};

/**
 * Loads an official SVG from raw-icons/, namespaces its internal IDs, and returns a nested <svg> element
 */
function loadOfficialIcon(filename, prefix, size = 27, extraAttrs = '') {
  const rawPath = path.join(rawIconsDir, filename);
  let raw = fs.readFileSync(rawPath, 'utf8');

  // Extract viewBox
  const vbMatch = raw.match(/viewBox="([^"]+)"/);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 24 24';

  // Extract inner content between <svg ...> and </svg>
  let inner = raw
    .replace(/^[\s\S]*?<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .replace(/<title>[\s\S]*?<\/title>/gi, '');

  // Namespace any id="..." and url(#...) to prevent collisions across icons
  const ids = [];
  inner = inner.replace(/\bid="([^"]+)"/g, (_, idVal) => {
    ids.push(idVal);
    return `id="${prefix}-${idVal}"`;
  });
  for (const idVal of ids) {
    const escaped = idVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    inner = inner.replace(new RegExp(`url\\(#${escaped}\\)`, 'g'), `url(#${prefix}-${idVal})`);
    inner = inner.replace(new RegExp(`href="#${escaped}"`, 'g'), `href="#${prefix}-${idVal}"`);
  }

  const half = (size / 2).toFixed(2);
  return `<svg x="-${half}" y="-${half}" width="${size}" height="${size}" viewBox="${viewBox}" ${extraAttrs}>${inner}</svg>`;
}

function getCommonDefs() {
  return `
  <defs>
    <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="145%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.65" />
    </filter>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#171717" />
      <stop offset="100%" stop-color="#111111" />
    </linearGradient>
    <linearGradient id="innerCardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1e1e" />
      <stop offset="100%" stop-color="#181818" />
    </linearGradient>
    <linearGradient id="glassShine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <clipPath id="roundedSquareClip">
      <rect x="-13" y="-13" width="26" height="26" rx="5" />
    </clipPath>

    <!-- Language Ring & Bg Gradients -->
    <linearGradient id="ring-ts" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="50%" stop-color="#3178C6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <radialGradient id="bg-ts" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#172554" />
      <stop offset="100%" stop-color="#0b132b" />
    </radialGradient>

    <linearGradient id="ring-js" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#F7DF1E" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
    <radialGradient id="bg-js" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#3b2f06" />
      <stop offset="100%" stop-color="#181302" />
    </radialGradient>

    <linearGradient id="ring-py" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="50%" stop-color="#3776AB" />
      <stop offset="100%" stop-color="#FFD43B" />
    </linearGradient>
    <radialGradient id="bg-py" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>

    <linearGradient id="ring-react" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#cffafe" />
      <stop offset="50%" stop-color="#61DAFB" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <radialGradient id="bg-react" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#0c3647" />
      <stop offset="100%" stop-color="#071921" />
    </radialGradient>

    <linearGradient id="ring-node" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bef264" />
      <stop offset="50%" stop-color="#68a063" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <radialGradient id="bg-node" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#14361d" />
      <stop offset="100%" stop-color="#09190d" />
    </radialGradient>

    <linearGradient id="ring-next" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#a1a1aa" />
      <stop offset="100%" stop-color="#3f3f46" />
    </linearGradient>
    <radialGradient id="bg-next" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#27272a" />
      <stop offset="100%" stop-color="#09090b" />
    </radialGradient>

    <linearGradient id="ring-mongo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7" />
      <stop offset="50%" stop-color="#00ED64" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <radialGradient id="bg-mongo" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#063724" />
      <stop offset="100%" stop-color="#031810" />
    </radialGradient>

    <linearGradient id="ring-pg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="50%" stop-color="#336791" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <radialGradient id="bg-pg" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#17324a" />
      <stop offset="100%" stop-color="#0a1622" />
    </radialGradient>

    <!-- AI & Design Ring & Bg Gradients -->
    <linearGradient id="ring-codex" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a5b4fc" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <radialGradient id="bg-codex" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#090919" />
    </radialGradient>

    <linearGradient id="ring-agy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3186FF" />
      <stop offset="35%" stop-color="#FC413D" />
      <stop offset="70%" stop-color="#FBBC04" />
      <stop offset="100%" stop-color="#00B95C" />
    </linearGradient>
    <radialGradient id="bg-agy" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </radialGradient>

    <linearGradient id="ring-claude" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdba74" />
      <stop offset="50%" stop-color="#D97757" />
      <stop offset="100%" stop-color="#9a3412" />
    </linearGradient>
    <radialGradient id="bg-claude" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#3b1d14" />
      <stop offset="100%" stop-color="#1a0c08" />
    </radialGradient>

    <linearGradient id="ring-openai" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7" />
      <stop offset="50%" stop-color="#10A37F" />
      <stop offset="100%" stop-color="#0f766e" />
    </linearGradient>
    <radialGradient id="bg-openai" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#0d3b2e" />
      <stop offset="100%" stop-color="#061a14" />
    </radialGradient>

    <linearGradient id="ring-cursor" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#a1a1aa" />
      <stop offset="100%" stop-color="#52525b" />
    </linearGradient>
    <radialGradient id="bg-cursor" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#27272a" />
      <stop offset="100%" stop-color="#09090b" />
    </radialGradient>

    <linearGradient id="ring-ps" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="50%" stop-color="#31A8FF" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <radialGradient id="bg-ps" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#002b4d" />
      <stop offset="100%" stop-color="#001324" />
    </radialGradient>

    <linearGradient id="ring-ai" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="50%" stop-color="#FF9A00" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <radialGradient id="bg-ai" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#421c00" />
      <stop offset="100%" stop-color="#1f0a00" />
    </radialGradient>

    <linearGradient id="ring-figma" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F24E1E" />
      <stop offset="35%" stop-color="#A259FF" />
      <stop offset="70%" stop-color="#1ABCFE" />
      <stop offset="100%" stop-color="#0ACF83" />
    </linearGradient>
    <radialGradient id="bg-figma" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#272038" />
      <stop offset="100%" stop-color="#110e1a" />
    </radialGradient>
  </defs>`;
}

/**
 * Helper to wrap an official icon inside a GitHub Achievement-style circular medal (without 2x/3x pills)
 */
function renderAchievementBadge(cx, cy, ringId, bgId, innerSvg) {
  return `
    <g transform="translate(${cx}, ${cy})">
      <!-- Outer Medal Circle with Shadow -->
      <circle cx="0" cy="0" r="24" fill="url(#${ringId})" filter="url(#badgeShadow)" />
      <!-- Inner Dark Enamel Circle -->
      <circle cx="0" cy="0" r="21" fill="url(#${bgId})" stroke="#09090b" stroke-width="0.8" />
      <!-- Subtle Inner Rim Highlight -->
      <circle cx="0" cy="0" r="20.2" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="0.7" />
      <!-- Official Vector Emblem -->
      ${innerSvg}
      <!-- Top Glass Specular Shine -->
      <ellipse cx="0" cy="-9.5" rx="13.5" ry="7" fill="url(#glassShine)" pointer-events="none" />
    </g>`;
}

/**
 * 8 Official Languages / Stack Badges (loaded directly from official Devicon SVGs)
 */
export const stackBadges = [
  {
    id: 'ts',
    name: 'TypeScript',
    ring: 'ring-ts',
    bg: 'bg-ts',
    icon: `<g clip-path="url(#roundedSquareClip)">${loadOfficialIcon('typescript.svg', 'ts', 26)}</g>`,
  },
  {
    id: 'js',
    name: 'JavaScript',
    ring: 'ring-js',
    bg: 'bg-js',
    icon: `<g clip-path="url(#roundedSquareClip)">${loadOfficialIcon('javascript.svg', 'js', 26)}</g>`,
  },
  {
    id: 'py',
    name: 'Python',
    ring: 'ring-py',
    bg: 'bg-py',
    icon: loadOfficialIcon('python.svg', 'py', 28),
  },
  {
    id: 'react',
    name: 'React',
    ring: 'ring-react',
    bg: 'bg-react',
    icon: loadOfficialIcon('react.svg', 'react', 28),
  },
  {
    id: 'node',
    name: 'Node.js',
    ring: 'ring-node',
    bg: 'bg-node',
    icon: loadOfficialIcon('nodejs.svg', 'node', 28),
  },
  {
    id: 'next',
    name: 'Next.js',
    ring: 'ring-next',
    bg: 'bg-next',
    icon: `<circle cx="0" cy="0" r="14.5" fill="#ffffff" opacity="0.15"/>${loadOfficialIcon('nextjs.svg', 'next', 28)}`,
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    ring: 'ring-mongo',
    bg: 'bg-mongo',
    icon: loadOfficialIcon('mongodb.svg', 'mongo', 30),
  },
  {
    id: 'pg',
    name: 'PostgreSQL',
    ring: 'ring-pg',
    bg: 'bg-pg',
    icon: loadOfficialIcon('postgresql.svg', 'pg', 29),
  },
];

/**
 * 8 Official AI & Design Badges (loaded directly from official brand SVGs)
 * Codex, Antigravity, Claude, ChatGPT/OpenAI, Cursor, Photoshop, Illustrator, Figma
 */
export const aiDesignBadges = [
  {
    id: 'codex',
    name: 'Codex',
    ring: 'ring-codex',
    bg: 'bg-codex',
    icon: loadOfficialIcon('codex.svg', 'codex', 26),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    ring: 'ring-agy',
    bg: 'bg-agy',
    icon: loadOfficialIcon('antigravity.svg', 'agy', 26),
  },
  {
    id: 'claude',
    name: 'Claude',
    ring: 'ring-claude',
    bg: 'bg-claude',
    icon: loadOfficialIcon('claude_color.svg', 'claude', 26),
  },
  {
    id: 'openai',
    name: 'ChatGPT',
    ring: 'ring-openai',
    bg: 'bg-openai',
    icon: loadOfficialIcon('openai.svg', 'openai', 26, 'fill="#ffffff"'),
  },
  {
    id: 'cursor',
    name: 'Cursor',
    ring: 'ring-cursor',
    bg: 'bg-cursor',
    icon: loadOfficialIcon('cursor.svg', 'cursor', 26, 'fill="#ffffff"'),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    ring: 'ring-ps',
    bg: 'bg-ps',
    icon: loadOfficialIcon('photoshop.svg', 'ps', 26),
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    ring: 'ring-ai',
    bg: 'bg-ai',
    icon: loadOfficialIcon('illustrator.svg', 'ai', 26),
  },
  {
    id: 'figma',
    name: 'Figma',
    ring: 'ring-figma',
    bg: 'bg-figma',
    icon: loadOfficialIcon('figma.svg', 'figma', 26),
  },
];

function renderAchievementsCardContent(x, y, width, height, title, badges, footerLabel = 'Send feedback') {
  const colCenters = [46, 109, 171, 234];
  const rowCenters = [86, 150];

  let badgesSvg = '';
  badges.forEach((b, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const cx = colCenters[col];
    const cy = rowCenters[row];
    badgesSvg += renderAchievementBadge(cx, cy, b.ring, b.bg, b.icon);
  });

  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="url(#cardBg)" stroke="#262626" stroke-width="1" />
    <text x="22" y="38" fill="#f0f0f0" font-family="${FONT_SANS}" font-size="15.5" font-weight="600">${title}</text>
    ${badgesSvg}
    <!-- Beta pill & footer -->
    <g transform="translate(22, 210)">
      <rect x="0" y="0" width="34" height="17" rx="8.5" fill="none" stroke="#52525b" stroke-width="1.1" />
      <text x="17" y="11.8" text-anchor="middle" fill="#d4d4d8" font-family="${FONT_SANS}" font-size="9.5" font-weight="600">Beta</text>
      <text x="43" y="12" fill="#71717a" font-family="${FONT_SANS}" font-size="11.5">${footerLabel}</text>
    </g>
  </g>`;
}

function renderAvatarCardContent(x, y, width, height, config) {
  return `
  <g transform="translate(${x}, ${y})">
    <defs>
      <clipPath id="avatarCardClip">
        <rect x="0" y="0" width="${width}" height="${height}" rx="16" />
      </clipPath>
      <radialGradient id="avatarGlow" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="60%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#09090b" />
      </radialGradient>
    </defs>
    <g clip-path="url(#avatarCardClip)">
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#avatarGlow)" />
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
        <line x1="0" y1="52" x2="${width}" y2="52" />
        <line x1="0" y1="104" x2="${width}" y2="104" />
        <line x1="0" y1="156" x2="${width}" y2="156" />
        <line x1="0" y1="208" x2="${width}" y2="208" />
        <line x1="56" y1="0" x2="56" y2="${height}" />
        <line x1="112" y1="0" x2="112" y2="${height}" />
        <line x1="168" y1="0" x2="168" y2="${height}" />
        <line x1="224" y1="0" x2="224" y2="${height}" />
      </g>
      <circle cx="65" cy="60" r="55" fill="#3b82f6" opacity="0.14" />
      <circle cx="215" cy="195" r="65" fill="#8b5cf6" opacity="0.14" />
      <circle cx="140" cy="102" r="42" fill="#1e293b" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1.5" />
      <path d="M104,92 C104,68 122,56 142,56 C162,56 176,70 176,92 C176,114 162,134 140,134 C118,134 104,114 104,92 Z" fill="#334155" />
      <path d="M102,86 C115,74 155,72 184,82 C176,62 156,54 136,56 C115,58 103,72 102,86 Z" fill="#6366f1" />
      <rect x="118" y="90" width="20" height="11" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.4" />
      <rect x="144" y="90" width="20" height="11" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.4" />
      <line x1="138" y1="95" x2="144" y2="95" stroke="#38bdf8" stroke-width="1.4" />
      <path d="M58,265 C62,195 96,162 140,162 C184,162 218,195 222,265 Z" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <rect x="95" y="205" width="90" height="32" rx="8" fill="#09090b" fill-opacity="0.8" stroke="#27272a" stroke-width="1" />
      <text x="140" y="225" text-anchor="middle" fill="#e4e4e7" font-family="${FONT_MONO}" font-size="11.5" font-weight="600">&lt;${config.username} /&gt;</text>
    </g>
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="none" stroke="#262626" stroke-width="1" />
  </g>`;
}

function renderBioCardContent(x, y, width, height, config) {
  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="url(#cardBg)" stroke="#262626" stroke-width="1" />
    <text x="32" y="40" fill="#71717a" font-family="${FONT_MONO}" font-size="12" letter-spacing="0.3">${config.username} / README.md</text>
    <text x="32" y="80" fill="#ffffff" font-family="${FONT_SANS}" font-size="23" font-weight="700">${config.displayName}</text>

    <!-- Paragraph 1 -->
    <text x="32" y="114" fill="#a1a1aa" font-family="${FONT_SANS}" font-size="12.8">
      <tspan x="32" dy="0">Sou um </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">desenvolvedor criativo</tspan>
      <tspan> focado em resolver problemas reais de ponta a ponta —</tspan>
      <tspan x="32" dy="19.5">da arquitetura back-end e dados (</tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Python</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Node.js</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">PostgreSQL</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">MongoDB</tspan>
      <tspan>) até interfaces</tspan>
      <tspan x="32" dy="19.5">modernas, rápidas e escaláveis com </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">TypeScript</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">React</tspan>
      <tspan> e </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Next.js</tspan>
      <tspan>.</tspan>
    </text>

    <!-- Paragraph 2 -->
    <text x="32" y="186" fill="#a1a1aa" font-family="${FONT_SANS}" font-size="12.8">
      <tspan x="32" dy="0">Mais do que escrever código, uno engenharia de software, visão de produto e design</tspan>
      <tspan x="32" dy="19.5">(</tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Figma</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Photoshop</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Illustrator</tspan>
      <tspan>) com fluxos avançados de IA (</tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Codex</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Antigravity</tspan>
      <tspan>, </tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Claude</tspan>
      <tspan>,</tspan>
      <tspan x="32" dy="19.5"></tspan>
      <tspan fill="#e4e4e7" text-decoration="underline">Cursor</tspan>
      <tspan>) para transformar desafios complexos em soluções completas e bem acabadas.</tspan>
    </text>
  </g>`;
}

function renderContributionsCardContent(x, y, width, height, config) {
  const pillars = [
    {
      num: '01',
      title: 'Arquitetura',
      line1: 'Análise do problema,',
      line2: 'modelagem de dados',
      line3: 'e APIs escaláveis.',
      tag: 'Python · Node · SQL',
      color: '#38bdf8',
      icon: `<path d="M0,-6 L6,-3 L6,3 L0,6 L-6,3 L-6,-3 Z" fill="none" stroke="#38bdf8" stroke-width="1.4"/><circle cx="0" cy="0" r="1.6" fill="#38bdf8"/>`,
    },
    {
      num: '02',
      title: 'UI/UX & Design',
      line1: 'Identidade visual,',
      line2: 'prototipação e foco',
      line3: 'na experiência.',
      tag: 'Figma · Ps · Ai',
      color: '#c084fc',
      icon: `<rect x="-5.5" y="-5.5" width="11" height="11" rx="2.5" fill="none" stroke="#c084fc" stroke-width="1.4"/><circle cx="-1.5" cy="-1.5" r="1.5" fill="#c084fc"/><path d="M-5.5,3 L-1,-1 L5.5,4" fill="none" stroke="#c084fc" stroke-width="1.2"/>`,
    },
    {
      num: '03',
      title: 'Engenharia + IA',
      line1: 'Código limpo aliado',
      line2: 'a agentes de IA para',
      line3: 'máxima velocidade.',
      tag: 'TS · React · IA',
      color: '#818cf8',
      icon: `<path d="M-2.5,-4 L-6,0 L-2.5,4 M2.5,-4 L6,0 L2.5,4" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="0" cy="0" r="1.3" fill="#818cf8"/>`,
    },
    {
      num: '04',
      title: 'Entrega & Valor',
      line1: 'Produto completo,',
      line2: 'performático e pronto',
      line3: 'para escalar.',
      tag: 'Deploy · Impacto',
      color: '#39d353',
      icon: `<path d="M-4.5,0.5 L-1.5,3.5 L5,-3.5" fill="none" stroke="#39d353" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
  ];

  const startX = 24;
  const cardW = 131;
  const cardH = 158;
  const gap = 16;
  const cardY = 68;

  let pillarsSvg = '';
  pillars.forEach((p, idx) => {
    const px = startX + idx * (cardW + gap);
    pillarsSvg += `
    <g transform="translate(${px}, ${cardY})">
      <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="12" fill="url(#innerCardBg)" stroke="#2a2a2e" stroke-width="1" />
      <!-- Top Colored Accent Line -->
      <path d="M12,0.5 L${cardW - 12},0.5" stroke="${p.color}" stroke-width="2" stroke-linecap="round" stroke-opacity="0.85" />

      <!-- Icon Box + Step Number -->
      <g transform="translate(14, 16)">
        <rect x="0" y="0" width="24" height="24" rx="6" fill="${p.color}" fill-opacity="0.12" stroke="${p.color}" stroke-opacity="0.35" stroke-width="1" />
        <g transform="translate(12, 12)">${p.icon}</g>
      </g>
      <text x="${cardW - 14}" y="32" text-anchor="end" fill="${p.color}" fill-opacity="0.8" font-family="${FONT_MONO}" font-size="11" font-weight="700">${p.num}</text>

      <!-- Pillar Title -->
      <text x="14" y="61" fill="#f4f4f5" font-family="${FONT_SANS}" font-size="13.2" font-weight="700">${p.title}</text>

      <!-- Pillar Description -->
      <text x="14" y="81" fill="#9ca3af" font-family="${FONT_SANS}" font-size="10.8">
        <tspan x="14" dy="0">${p.line1}</tspan>
        <tspan x="14" dy="15">${p.line2}</tspan>
        <tspan x="14" dy="15">${p.line3}</tspan>
      </text>

      <!-- Bottom Tech Pill -->
      <rect x="12" y="126" width="${cardW - 24}" height="21" rx="6" fill="#121215" stroke="#27272a" stroke-width="1" />
      <text x="${cardW / 2}" y="140" text-anchor="middle" fill="#d4d4d8" font-family="${FONT_MONO}" font-size="9.5" font-weight="600">${p.tag}</text>
    </g>`;

    // Connector Arrow between cards
    if (idx < pillars.length - 1) {
      const arrowX = px + cardW + gap / 2;
      const arrowY = cardY + cardH / 2;
      pillarsSvg += `
      <g transform="translate(${arrowX}, ${arrowY})">
        <path d="M-4,0 L4,0 M1,-3 L4,0 L1,3" fill="none" stroke="#52525b" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      </g>`;
    }
  });

  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="url(#cardBg)" stroke="#262626" stroke-width="1" />
    <text x="26" y="44" fill="#ffffff" font-family="${FONT_SANS}" font-size="19.5" font-weight="600">${config.workflowTitle || 'Da ideia ao produto final'}</text>

    <!-- Top-Right Status Pill (matching reference dropdown style) -->
    <g transform="translate(474, 20)">
      <rect x="0" y="0" width="122" height="32" rx="8" fill="#1f1f1f" stroke="#2e2e2e" stroke-width="1" />
      <circle cx="15" cy="16" r="3.5" fill="#39d353" />
      <text x="26" y="20" fill="#e4e4e7" font-family="${FONT_SANS}" font-size="12" font-weight="500">${config.workflowBadge || 'End-to-End'}</text>
      <path d="M104,14 L107.5,18 L111,14" fill="none" stroke="#8b949e" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    ${pillarsSvg}
  </g>`;
}

function renderReposCardContent(x, y, width, height, config) {
  const renderSingleRepo = (rx, ry, repo) => `
    <g transform="translate(${rx}, ${ry})">
      <rect x="0" y="0" width="270" height="162" rx="12" fill="url(#innerCardBg)" stroke="#2a2a2a" stroke-width="1" />
      <g transform="translate(18, 22)" fill="none" stroke="#8b949e" stroke-width="1.4">
        <path d="M2,2.5 A2,2 0 0,1 4,0.5 L12,0.5 L12,13.5 L4,13.5 A2,2 0 0,0 2,15.5 Z" />
        <path d="M2,13.5 L12,13.5" />
      </g>
      <text x="36" y="34" fill="#f0f0f0" font-family="${FONT_SANS}" font-size="14" font-weight="600">${repo.name}</text>
      <rect x="208" y="21" width="44" height="18" rx="9" fill="none" stroke="${repo.badgeColor}" stroke-width="1" stroke-opacity="0.65" />
      <text x="230" y="33" text-anchor="middle" fill="${repo.badgeColor}" font-family="${FONT_SANS}" font-size="9.5" font-weight="500">${repo.badge}</text>

      <text x="18" y="62" fill="#8b949e" font-family="${FONT_SANS}" font-size="12.2">
        <tspan x="18" dy="0">${repo.description.slice(0, 40)}</tspan>
        <tspan x="18" dy="18">${repo.description.slice(40, 82)}</tspan>
      </text>

      <g transform="translate(18, 132)" fill="#8b949e" font-family="${FONT_SANS}" font-size="12">
        <path d="M6,0 L7.8,3.6 L11.8,4.2 L8.9,7 L9.6,11 L6,9.1 L2.4,11 L3.1,7 L0.2,4.2 L4.2,3.6 Z" fill="none" stroke="#8b949e" stroke-width="1.2" transform="translate(0, -10)" />
        <text x="16" y="0">${repo.stars}</text>

        <path d="M6,0 L7.8,3.6 L11.8,4.2 L8.9,7 L9.6,11 L6,9.1 L2.4,11 L3.1,7 L0.2,4.2 L4.2,3.6 Z" fill="none" stroke="#8b949e" stroke-width="1.2" transform="translate(56, -10)" />
        <text x="72" y="0">${repo.forks}</text>
      </g>
    </g>
  `;

  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="url(#cardBg)" stroke="#262626" stroke-width="1" />
    <text x="28" y="42" fill="#ffffff" font-family="${FONT_SANS}" font-size="20" font-weight="600">Popular repositories</text>
    <path d="M224,35 L227.5,39 L231,35" fill="none" stroke="#8b949e" stroke-width="1.5" stroke-linecap="round" />

    ${renderSingleRepo(28, 64, config.repos[0])}
    ${renderSingleRepo(322, 64, config.repos[1])}
  </g>`;
}

export function generateFullBentoSvg(config = defaultConfig) {
  const width = 948;
  const height = 824;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%">
  ${getCommonDefs()}
  <rect x="0" y="0" width="${width}" height="${height}" rx="24" fill="#09090b" stroke="#1f1f23" stroke-width="1.5" />

  <!-- ROW 1: Avatar (280x260) + README Bio (620x260) -->
  ${renderAvatarCardContent(16, 16, 280, 260, config)}
  ${renderBioCardContent(312, 16, 620, 260, config)}

  <!-- ROW 2: Achievements [Languages] (280x250) + Contributions (620x250) -->
  ${renderAchievementsCardContent(16, 292, 280, 250, config.achievementsTitle1, stackBadges, config.footerLabel)}
  ${renderContributionsCardContent(312, 292, 620, 250, config)}

  <!-- ROW 3: Popular Repositories (620x250) + 12 Achievements [AI & Design] (280x250) -->
  ${renderReposCardContent(16, 558, 620, 250, config)}
  ${renderAchievementsCardContent(652, 558, 280, 250, config.achievementsTitle2, aiDesignBadges, config.footerLabel)}
</svg>`;
}

export function generateNativeCompanionBentoSvg(config = defaultConfig) {
  const width = 900;
  const height = 546;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%">
  ${getCommonDefs()}
  <rect x="0" y="0" width="${width}" height="${height}" rx="22" fill="#09090b" stroke="#1f1f23" stroke-width="1.5" />

  ${renderAvatarCardContent(16, 16, 280, 246, config)}
  ${renderBioCardContent(312, 16, 572, 246, config)}

  ${renderAchievementsCardContent(16, 278, 280, 250, config.achievementsTitle1, stackBadges, 'Languages & Stack')}
  ${renderAchievementsCardContent(310, 278, 280, 250, config.achievementsTitle2, aiDesignBadges, 'AI & Creative Tools')}

  <g transform="translate(604, 278)">
    <rect x="0" y="0" width="280" height="250" rx="16" fill="url(#cardBg)" stroke="#262626" stroke-width="1" />
    <text x="22" y="38" fill="#f0f0f0" font-family="${FONT_SANS}" font-size="15.5" font-weight="600">Core Stack &amp; AI</text>

    <g transform="translate(22, 58)" font-family="${FONT_SANS}" font-size="12">
      <rect x="0" y="0" width="236" height="36" rx="8" fill="#1c1c1e" stroke="#2c2c30" />
      <circle cx="16" cy="18" r="4.5" fill="#3178C6" />
      <text x="28" y="22" fill="#e4e4e7" font-weight="600">TS · JS · Python · React</text>

      <rect x="0" y="46" width="236" height="36" rx="8" fill="#1c1c1e" stroke="#2c2c30" />
      <circle cx="16" cy="64" r="4.5" fill="#00ED64" />
      <text x="28" y="68" fill="#e4e4e7" font-weight="600">Node · Next · Mongo · Postgres</text>

      <rect x="0" y="92" width="236" height="36" rx="8" fill="#1c1c1e" stroke="#2c2c30" />
      <circle cx="16" cy="110" r="4.5" fill="#a855f7" />
      <text x="28" y="114" fill="#e4e4e7" font-weight="600">Codex · Antigravity · Claude</text>

      <rect x="0" y="138" width="236" height="36" rx="8" fill="#1c1c1e" stroke="#2c2c30" />
      <circle cx="16" cy="156" r="4.5" fill="#F24E1E" />
      <text x="28" y="160" fill="#e4e4e7" font-weight="600">Figma · Photoshop · Illustrator</text>
    </g>
  </g>
</svg>`;
}

export function generateStandaloneCard(type, config = defaultConfig) {
  if (type === 'stack') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 250" width="280" height="250">
      ${getCommonDefs()}
      ${renderAchievementsCardContent(0, 0, 280, 250, config.achievementsTitle1, stackBadges, config.footerLabel)}
    </svg>`;
  }
  if (type === 'ai') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 250" width="280" height="250">
      ${getCommonDefs()}
      ${renderAchievementsCardContent(0, 0, 280, 250, config.achievementsTitle2, aiDesignBadges, config.footerLabel)}
    </svg>`;
  }
  if (type === 'bio') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 260" width="620" height="260">
      ${getCommonDefs()}
      ${renderBioCardContent(0, 0, 620, 260, config)}
    </svg>`;
  }
  if (type === 'repos') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 250" width="620" height="250">
      ${getCommonDefs()}
      ${renderReposCardContent(0, 0, 620, 250, config)}
    </svg>`;
  }
  if (type === 'contributions') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 250" width="620" height="250">
      ${getCommonDefs()}
      ${renderContributionsCardContent(0, 0, 620, 250, config)}
    </svg>`;
  }
}

// Write all SVG files
fs.writeFileSync(path.join(assetsDir, 'bento-full.svg'), generateFullBentoSvg());
fs.writeFileSync(path.join(assetsDir, 'bento-native-addons.svg'), generateNativeCompanionBentoSvg());
fs.writeFileSync(path.join(assetsDir, 'card-achievements-stack.svg'), generateStandaloneCard('stack'));
fs.writeFileSync(path.join(assetsDir, 'card-achievements-ai.svg'), generateStandaloneCard('ai'));
fs.writeFileSync(path.join(assetsDir, 'card-bio.svg'), generateStandaloneCard('bio'));
fs.writeFileSync(path.join(assetsDir, 'card-repos.svg'), generateStandaloneCard('repos'));
fs.writeFileSync(path.join(assetsDir, 'card-contributions.svg'), generateStandaloneCard('contributions'));

// Write the 16 individual circular Achievement medal SVGs (54x54) for native Markdown/HTML README tables
[...stackBadges, ...aiDesignBadges].forEach((b) => {
  const singleBadgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" width="54" height="54">
    ${getCommonDefs()}
    ${renderAchievementBadge(27, 27, b.ring, b.bg, b.icon)}
  </svg>`;
  fs.writeFileSync(path.join(badgesDir, `${b.id}.svg`), singleBadgeSvg);
});

// Also update configurador.html with the exact official stackBadges & aiDesignBadges
const configHtmlPath = path.join(__dirname, 'configurador.html');
if (fs.existsSync(configHtmlPath)) {
  let html = fs.readFileSync(configHtmlPath, 'utf8');
  const serializedStack = JSON.stringify(stackBadges.map(b => ({ ring: b.ring, bg: b.bg, tier: null, icon: b.icon })));
  const serializedAi = JSON.stringify(aiDesignBadges.map(b => ({ ring: b.ring, bg: b.bg, tier: null, icon: b.icon })));
  html = html.replace(/const stackBadges = \[[\s\S]*?\];/, `const stackBadges = ${serializedStack};`);
  html = html.replace(/const aiBadges = \[[\s\S]*?\];/, `const aiBadges = ${serializedAi};`);
  // Also ensure roundedSquareClip is in configurador.html defs
  if (!html.includes('roundedSquareClip')) {
    html = html.replace('</defs>`;', '<clipPath id="roundedSquareClip"><rect x="-13" y="-13" width="26" height="26" rx="5" /></clipPath></defs>`;');
  }
  // Remove (3x) and (2x) from chips in sidebar
  html = html.replace(/\s*\([23]x\)/g, '');
  fs.writeFileSync(configHtmlPath, html);
}

console.log('Successfully generated all Bento GitHub Profile SVGs with 100% official logos and no 2x/3x badges!');
