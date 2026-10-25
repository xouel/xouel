import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'raw-icons');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const iconsToFetch = {
  // Devicons (full color official SVGs)
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  photoshop: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
  illustrator: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg',
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',

  // LobeHub AI Icons (official AI vector SVGs)
  claude_color: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claude-color.svg',
  claude: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claude.svg',
  openai: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg',
  cursor: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/cursor.svg',
  githubcopilot: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/githubcopilot.svg',
  gemini_color: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini-color.svg',
  antigravity_wiki: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Google_Antigravity_Logo.svg',
};

for (const [name, url] of Object.entries(iconsToFetch)) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      fs.writeFileSync(path.join(outDir, `${name}.svg`), text);
      console.log(`Fetched ${name}.svg (${text.length} bytes)`);
    } else {
      console.log(`Failed ${name}: HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`Error ${name}: ${err.message}`);
  }
}
