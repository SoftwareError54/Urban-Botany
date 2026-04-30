/**
 * generate-usecase-pngs.js
 * Generates proper UML use case diagram PNGs:
 *   - Stick-figure actor
 *   - Oval (ellipse) use cases
 *   - Labelled system boundary rectangle
 *   - Dashed / solid relationship arrows between use cases
 *
 * Uses `sharp` to convert SVG → PNG (no mermaid-cli or browser needed).
 * Run:  node diagrams/generate-usecase-pngs.js   (from Frontend folder)
 */

import { join, dirname } from 'path';
import { fileURLToPath }  from 'url';
import sharp              from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Layout constants ────────────────────────────────────────────────────────
const UC_RX       = 88;   // oval horizontal radius (px)
const UC_RY       = 28;   // oval vertical radius (px)
const UC_GAP      = 20;   // gap between successive ovals (px)
const B_PAD_H     = 28;   // boundary horizontal padding (each side)
const B_PAD_TOP   = 54;   // boundary top padding  (room for title label)
const B_PAD_BOT   = 28;   // boundary bottom padding
const ACTOR_CX    = 76;   // actor centre X
const B_LEFT      = 178;  // boundary rectangle left edge
const MARGIN_T    = 48;   // top margin (canvas title)
const MARGIN_B    = 28;   // bottom margin
const MARGIN_R    = 44;   // right margin

// ─── Diagram definitions ─────────────────────────────────────────────────────
const DIAGRAMS = [
  {
    filename : 'usecase-auth',
    title    : 'Authentication',
    system   : 'Urban Botany System',
    usecases : ['Register', 'Login', 'Logout', 'Reset Password', 'Manage Profile'],
    rels     : [
      { from: 'Manage Profile', to: 'Login', label: '«requires»', dashed: true }
    ]
  },
  {
    filename : 'usecase-plant-management',
    title    : 'Plant Management',
    system   : 'Urban Botany System',
    usecases : [
      'Add Plant', 'Identify Plant', 'View Plant', 'Edit Plant',
      'Delete Plant', 'Water Plant', 'Fertilize Plant',
      'Set Care Reminder', 'Log Care Activity'
    ],
    rels: [
      { from: 'Identify Plant',    to: 'Add Plant',          label: '«optional»',  dashed: true  },
      { from: 'Set Care Reminder', to: 'Log Care Activity',  label: '«triggers»',  dashed: false }
    ]
  },
  {
    filename : 'usecase-room-management',
    title    : 'Room Management',
    system   : 'Urban Botany System',
    usecases : [
      'Create Room', 'View Room', 'Edit Room', 'Delete Room',
      'Place Plant In Room', 'Decorate Room', 'Arrange Scene'
    ],
    rels: [
      { from: 'Place Plant In Room', to: 'View Room', label: '«references»', dashed: true }
    ]
  },
  {
    filename : 'usecase-tasks-schedule',
    title    : 'Tasks & Schedule',
    system   : 'Urban Botany System',
    usecases : [
      'Create Task', 'View Tasks', 'Complete Task',
      'Receive Reminder', 'Assign Task to Plant'
    ],
    rels: [
      { from: 'Create Task',          to: 'Receive Reminder', label: '«schedules»',  dashed: true },
      { from: 'Assign Task to Plant', to: 'View Tasks',        label: '«contextual»', dashed: true }
    ]
  },
  {
    filename : 'usecase-overview',
    title    : 'System Overview',
    system   : 'Urban Botany System',
    usecases : [
      'Register', 'Login', 'Add Plant', 'Identify Plant',
      'Create Room', 'Set Care Reminder', 'Create Task', 'Manage Profile'
    ],
    rels: []
  }
];

// ─── SVG helpers ─────────────────────────────────────────────────────────────

/** Escapes characters that are invalid in XML/SVG text content */
function x(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}

/** Splits a label into 1–2 display lines */
function splitLabel(text) {
  const words = text.split(' ');
  if (words.length <= 2) return [text];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(' '), words.slice(half).join(' ')];
}

/** Stick-figure actor.  midY = waist position (body bottom). */
function actorSVG(cx, midY) {
  const R  = 16;          // head radius
  const BH = 36;          // body height (neck→waist)
  const AL = 22;          // arm half-length
  const LL = 28;          // leg length
  const headCY  = midY - BH - R;
  const neckY   = midY - BH;
  const armY    = neckY + 12;
  return `
  <!-- Actor -->
  <circle cx="${cx}" cy="${headCY}" r="${R}" fill="white" stroke="#1a1a2e" stroke-width="2"/>
  <line x1="${cx}"    y1="${neckY}"  x2="${cx}"        y2="${midY}"     stroke="#1a1a2e" stroke-width="2"/>
  <line x1="${cx-AL}" y1="${armY}"   x2="${cx+AL}"     y2="${armY}"     stroke="#1a1a2e" stroke-width="2"/>
  <line x1="${cx}"    y1="${midY}"   x2="${cx-LL*.7}"  y2="${midY+LL}"  stroke="#1a1a2e" stroke-width="2"/>
  <line x1="${cx}"    y1="${midY}"   x2="${cx+LL*.7}"  y2="${midY+LL}"  stroke="#1a1a2e" stroke-width="2"/>
  <text x="${cx}" y="${midY+LL+18}" text-anchor="middle"
        font-family="Arial,Helvetica,sans-serif" font-size="13"
        font-weight="bold" fill="#1a1a2e">${x('User')}</text>`;
}

/** Oval use case with centred label (up to 2 lines). */
function ovalSVG(cx, cy, label) {
  const lines  = splitLabel(label);
  const lineH  = 15;
  const startY = cy - ((lines.length - 1) * lineH) / 2;
  const texts  = lines.map((l, i) =>
    `<text x="${cx}" y="${startY + i * lineH + 4}"
           text-anchor="middle"
           font-family="Arial,Helvetica,sans-serif"
           font-size="13" fill="#1a1a2e">${x(l)}</text>`
  ).join('\n  ');
  return `
  <ellipse cx="${cx}" cy="${cy}" rx="${UC_RX}" ry="${UC_RY}"
           fill="#eef0fa" stroke="#3a3a5c" stroke-width="2"/>
  ${texts}`;
}

// ─── Main SVG builder ────────────────────────────────────────────────────────
function buildSVG(diagram) {
  const n     = diagram.usecases.length;
  const step  = UC_RY * 2 + UC_GAP;                          // px between oval centres
  const bW    = B_PAD_H + UC_RX * 2 + B_PAD_H;              // boundary width
  const bH    = B_PAD_TOP + n * (UC_RY * 2) + (n - 1) * UC_GAP + B_PAD_BOT;
  const cW    = B_LEFT + bW + MARGIN_R;
  const cH    = MARGIN_T + bH + MARGIN_B;
  const bTopY = MARGIN_T;                                     // boundary starts just below title
  const ucCX  = B_LEFT + bW / 2;                             // oval centre X
  const firstY = bTopY + B_PAD_TOP + UC_RY;                  // first oval centre Y

  const ucPos = diagram.usecases.map((label, i) => ({
    label,
    x: ucCX,
    y: firstY + i * step
  }));

  // Actor waist centred on the boundary
  const actorMidY = bTopY + bH / 2;

  // ── SVG open ──
  let svg = `<svg xmlns="http://www.w3.org/2000/svg"
     width="${cW}" height="${cH}"
     style="background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
<defs>
  <marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0,10 3.5,0 7" fill="#1a1a2e"/>
  </marker>
</defs>`;

  // Canvas title
  svg += `\n<text x="${cW / 2}" y="${MARGIN_T - 12}"
       text-anchor="middle" font-size="17" font-weight="bold"
       fill="#1a1a2e">${x(diagram.title)} &#x2013; Use Case Diagram</text>`;

  // System boundary rectangle
  svg += `\n<rect x="${B_LEFT}" y="${bTopY}" width="${bW}" height="${bH}"
       fill="#f5f5fb" stroke="#3a3a5c" stroke-width="2" rx="5"/>`;
  svg += `\n<text x="${B_LEFT + bW / 2}" y="${bTopY + 26}"
       text-anchor="middle" font-size="14" font-weight="bold"
       fill="#3a3a5c">${x(diagram.system)}</text>`;

  // Actor
  svg += actorSVG(ACTOR_CX, actorMidY);

  // Actor → use case association lines + ovals
  const aX = ACTOR_CX + 12;          // connection point on actor (right of body)
  const aY = actorMidY - 16;         // slightly above waist

  ucPos.forEach(uc => {
    svg += `\n<line x1="${aX}" y1="${aY}"
         x2="${uc.x - UC_RX}" y2="${uc.y}"
         stroke="#1a1a2e" stroke-width="1.5" marker-end="url(#arr)"/>`;
    svg += ovalSVG(uc.x, uc.y, uc.label);
  });

  // Use case → use case relationships
  diagram.rels.forEach(rel => {
    const from = ucPos.find(p => p.label === rel.from);
    const to   = ucPos.find(p => p.label === rel.to);
    if (!from || !to) return;

    const dash  = rel.dashed ? 'stroke-dasharray="8,4"' : '';
    const relX  = ucCX + UC_RX * 0.28;   // offset right so it doesn't overlap actor arrows
    const going = from.y < to.y;
    const y1    = from.y + (going ?  UC_RY : -UC_RY);
    const y2    = to.y   + (going ? -UC_RY :  UC_RY);

    svg += `\n<line x1="${relX}" y1="${y1}" x2="${relX}" y2="${y2}"
         stroke="#3a3a5c" stroke-width="1.5" ${dash} marker-end="url(#arr)"/>`;
    svg += `\n<text x="${relX + 6}" y="${(y1 + y2) / 2 + 4}"
         font-size="11" font-style="italic"
         fill="#555">${x(rel.label)}</text>`;
  });

  svg += '\n</svg>';
  return svg;
}

// ─── Run ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Generating use case diagrams…\n');
  for (const diagram of DIAGRAMS) {
    const svg  = buildSVG(diagram);
    const dest = join(__dirname, `${diagram.filename}.png`);
    await sharp(Buffer.from(svg)).png({ quality: 100 }).toFile(dest);
    console.log(`  ✔  ${diagram.filename}.png`);
  }
  console.log('\nDone — PNGs saved to Frontend/diagrams/');
}

main().catch(err => { console.error(err); process.exit(1); });
