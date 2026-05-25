// node scripts/generate-pdf.js
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, '../public/files/solar_intelligence_brief.pdf')

const C = {
  BLACK:   '#0A0A0F',
  DARK:    '#12121A',
  CARD:    '#1A1A26',
  YELLOW:  '#D4AF37',
  GOLD:    '#FFD700',
  GREEN:   '#2ECC71',
  RED:     '#E74C3C',
  ORANGE:  '#E67E22',
  BLUE:    '#4D9FFF',
  WHITE:   '#F0F0F0',
  GRAY:    '#9CA3AF',
  DGRAY:   '#555566',
  BORDER:  '#2A2A3A',
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 54, bottom: 54, left: 64, right: 64 },
  info: {
    Title: 'Solar Mission Intelligence Brief',
    Author: '1inMINION Intelligence Division',
    Subject: 'Operation: Steal the Sun — CLASSIFIED',
  },
})

doc.pipe(fs.createWriteStream(OUT))

// ─── Helpers ──────────────────────────────────────────────────────────────────

const W = doc.page.width - 128   // usable width (A4 595 - 128 margins)
const L = 64                      // left margin

function pageHeader(page) {
  doc.rect(0, 0, doc.page.width, 6).fill(C.YELLOW)
  doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(7)
    .text('1inMINION  //  SOLAR INTELLIGENCE BRIEF  //  CLASSIFIED', L, 16, { width: W })
  doc.fillColor(C.DGRAY).font('Courier').fontSize(7)
    .text(`GRU-SOLAR-0049  //  PAGE ${page} OF 5`, L, 16, { width: W, align: 'right' })
  doc.moveTo(L, 32).lineTo(L + W, 32).stroke(C.BORDER)
}

function sectionBanner(title, y, color) {
  color = color || C.YELLOW
  doc.rect(L, y, W, 20).fill(C.CARD)
  doc.rect(L, y, 3, 20).fill(color)
  doc.fillColor(color).font('Courier-Bold').fontSize(8)
    .text(title, L + 10, y + 6)
  return y + 28
}

function keyStatBox(value, label, sub, y, color) {
  color = color || C.YELLOW
  doc.rect(L, y, W, 50).fill(C.DARK)
  doc.rect(L, y, 3, 50).fill(color)
  doc.fillColor(color).font('Helvetica-Bold').fontSize(26).text(value, L + 12, y + 8)
  doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(10).text(label, L + 80, y + 10)
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(9).text(sub, L + 80, y + 24)
  return y + 60
}

function infoRow(key, val, y, bg) {
  bg = bg || C.DARK
  doc.rect(L, y, 150, 24).fill(C.CARD)
  doc.rect(L + 150, y, W - 150, 24).fill(bg)
  doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8).text(key, L + 8, y + 8)
  doc.fillColor(C.WHITE).font('Courier').fontSize(8).text(val, L + 158, y + 8)
  return y + 24
}

function alertBox(head, body, y, color) {
  color = color || C.RED
  doc.rect(L, y, W, 52).fill('#1A0808')
  doc.rect(L, y, 3, 52).fill(color)
  doc.fillColor(color).font('Courier-Bold').fontSize(8).text(head, L + 10, y + 7)
  doc.fillColor('#CCCCCC').font('Helvetica').fontSize(9)
    .text(body, L + 10, y + 20, { width: W - 20, lineGap: 2 })
  return y + 60
}

function successBox(head, body, y) {
  doc.rect(L, y, W, 52).fill('#0A1A0A')
  doc.rect(L, y, 3, 52).fill(C.GREEN)
  doc.fillColor(C.GREEN).font('Courier-Bold').fontSize(8).text(head, L + 10, y + 7)
  doc.fillColor('#CCCCCC').font('Helvetica').fontSize(9)
    .text(body, L + 10, y + 20, { width: W - 20, lineGap: 2 })
  return y + 60
}

function bodyText(text, y, opts) {
  doc.fillColor(C.WHITE).font('Helvetica').fontSize(10)
    .text(text, L, y, Object.assign({ width: W, lineGap: 3 }, opts || {}))
  return doc.y + 10
}

function counterTag(y) {
  doc.fillColor(C.DGRAY).font('Courier').fontSize(7.5)
    .text('COUNTERINTUITIVE FINDING', L, y)
  return y + 14
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 1: COVER
// ═══════════════════════════════════════════════════════════════════════════════

doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.BLACK)
doc.rect(0, 0, doc.page.width, 6).fill(C.YELLOW)
doc.rect(0, doc.page.height - 6, doc.page.width, 6).fill(C.YELLOW)

// CLASSIFIED stamp
doc.save()
doc.translate(doc.page.width / 2, 240)
doc.rotate(-14)
doc.rect(-110, -24, 220, 48).stroke(C.RED)
doc.fillColor(C.RED).font('Courier-Bold').fontSize(24)
  .text('CLASSIFIED', -110, -10, { width: 220, align: 'center' })
doc.restore()

// Title block
doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8)
  .text('1inMINION  //  INTELLIGENCE DIVISION', 0, 50, { width: doc.page.width, align: 'center' })

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(36)
  .text('SOLAR MISSION', 0, 110, { width: doc.page.width, align: 'center' })
doc.fillColor(C.YELLOW).font('Helvetica-Bold').fontSize(36)
  .text('INTELLIGENCE BRIEF', 0, 152, { width: doc.page.width, align: 'center' })

doc.fillColor(C.GRAY).font('Courier').fontSize(11)
  .text('OPERATION: STEAL THE SUN', 0, 200, { width: doc.page.width, align: 'center' })

// Cover table
let ty = 300
const cw = doc.page.width - 160
const cl = 80
const rows = [
  ['CLASSIFICATION', 'TOP SECRET // VILLAIN EYES ONLY'],
  ['DOCUMENT REF', 'GRU-SOLAR-0049'],
  ['PREPARED BY', 'GRU Intelligence Division — Solar Operations Desk'],
  ['VERSION', '3.1 — FINAL PLANNING BRIEF'],
  ['PAGES', '5 (including cover)'],
  ['STATUS', 'ACTIVE — MISSION PLANNING PHASE'],
]
rows.forEach(([k, v], i) => {
  const bg = i % 2 === 0 ? C.CARD : C.DARK
  doc.rect(cl, ty, cw, 26).fill(bg)
  doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8).text(k, cl + 10, ty + 9)
  const vc = k === 'STATUS' ? C.GREEN : C.WHITE
  doc.fillColor(vc).font('Courier').fontSize(8).text(v, cl + 170, ty + 9)
  ty += 26
})

// Four findings teaser
ty += 20
doc.rect(cl, ty, cw, 18).fill(C.CARD)
doc.rect(cl, ty, 3, 18).fill(C.YELLOW)
doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8).text('THIS BRIEF CONTAINS 4 COUNTERINTUITIVE FINDINGS', cl + 10, ty + 5)
ty += 26
const findings = [
  '01  //  November missions succeed 46% more than summer missions',
  '02  //  Smaller vessels are detected 3x less — bigger is not better',
  '03  //  Optimal team size is 5–8 Minions — not 20+',
  '04  //  Minion distraction kills 73% of missions — not heroes',
]
findings.forEach((f, i) => {
  doc.rect(cl, ty, cw, 22).fill(i % 2 === 0 ? C.DARK : '#0F0F18')
  doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8).text(f.split('  //  ')[0], cl + 10, ty + 7)
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(8).text('  //  ' + f.split('  //  ')[1], cl + 42, ty + 7)
  ty += 22
})

// Footer
doc.fillColor('#333').font('Courier').fontSize(7)
  .text('WARNING: Unauthorized disclosure is a violation of Villain Code Section 47-B. Do not leave unattended.',
    0, doc.page.height - 36, { width: doc.page.width, align: 'center' })


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 2: Section 1 — Solar Access Windows
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.BLACK)
pageHeader(2)

let y = 46

y = sectionBanner('SECTION 01 — SOLAR ACCESS WINDOWS', y)

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(14).text('Why November Is Your Only Real Option', L, y)
y += 20
y = counterTag(y)

y = keyStatBox('60%', 'Mission success rate in November',
  'vs. 41% average across other months — a 46% relative improvement', y, C.GREEN)

y = bodyText(
  'COUNTERINTUITIVE FINDING: Most villain organizations launch solar missions during summer months ' +
  '(June–August) when solar energy is perceived to be strongest and most accessible. Our 200-mission ' +
  'dataset proves this intuition is dangerously wrong. November is the optimal window by a wide margin.',
  y)

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(10).text('Why November outperforms all other months:', L, y)
y += 14

const novReasons = [
  ['Solar magnetic field activity', '23% lower in November — dramatically reduces detection probability'],
  ['Corona temperature differential', 'Creates a natural low-turbulence approach corridor unique to November'],
  ["Earth's orbital position", '4.2 minutes less hero response time — critical during approach phase'],
  ['Competitive intelligence', "Vector's operations cluster in summer — November is an uncontested window"],
]
novReasons.forEach(([k, v]) => {
  doc.rect(L, y, W, 22).fill(C.DARK)
  doc.rect(L, y, 3, 22).fill(C.YELLOW)
  doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8).text(k, L + 10, y + 7)
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(8).text(v, L + 180, y + 7, { width: W - 185 })
  y += 22
})
y += 8

y = successBox(
  'INTELLIGENCE RECOMMENDATION',
  'Schedule ALL approach phases for the November 10–20 window. Approaching in any other month requires ' +
  'a variance request filed with Villain HQ and reduces your probability of success below acceptable thresholds.',
  y)

// Month success bar chart
doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(8).text('MISSION SUCCESS RATE BY MONTH — 200-OPERATION DATASET', L, y)
y += 12

const months = [
  ['Jan','42'], ['Feb','43'], ['Mar','41'], ['Apr','40'], ['May','42'], ['Jun','39'],
  ['Jul','41'], ['Aug','43'], ['Sep','42'], ['Oct','44'], ['Nov','60'], ['Dec','41'],
]
const colW = W / 12
months.forEach(([m, r], i) => {
  const cx = L + i * colW
  const isNov = m === 'Nov'
  const rate = parseInt(r)
  const barH = Math.round(rate * 0.8)
  const barY = y + 50 - barH

  doc.rect(cx + 1, barY, colW - 3, barH).fill(isNov ? C.YELLOW : C.CARD)
  if (isNov) doc.rect(cx + 1, barY, colW - 3, barH).stroke(C.YELLOW)

  doc.fillColor(isNov ? C.YELLOW : C.GRAY).font('Courier-Bold').fontSize(6.5)
    .text(m, cx, y + 52, { width: colW, align: 'center' })
  doc.fillColor(isNov ? C.GREEN : C.GRAY).font('Courier-Bold').fontSize(6.5)
    .text(r + '%', cx, y + 62, { width: colW, align: 'center' })
})


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 3: Section 2 — Vessel Requirements
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.BLACK)
pageHeader(3)

y = 46
y = sectionBanner('SECTION 02 — VESSEL REQUIREMENTS', y)

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(14).text('Smaller Is Better. Much Better.', L, y)
y += 20
y = counterTag(y)

y = bodyText(
  'Every villain in our database over-invested in vessel size. The assumption: a more powerful vessel can ' +
  'withstand solar conditions. The data proves the opposite. Larger vessels are detected 3.2x more often, ' +
  'and detection is the primary precursor to mission failure in 61% of all unsuccessful operations.',
  y)

// Size comparison grid
const sizeData = [
  { cls: 'SMALL',  rate: '58%', note: 'Optimal — stealth advantage, low thermal signature',  color: C.GREEN },
  { cls: 'MEDIUM', rate: '46%', note: 'Acceptable with modifications',                        color: C.YELLOW },
  { cls: 'LARGE',  rate: '31%', note: 'High detection risk — not recommended',                color: C.ORANGE },
  { cls: 'MASSIVE', rate:'19%', note: 'Detected every time. Do not use.',                     color: C.RED },
]
sizeData.forEach(s => {
  doc.rect(L, y, W, 44).fill(C.DARK)
  doc.rect(L, y, 4, 44).fill(s.color)
  doc.fillColor(s.color).font('Helvetica-Bold').fontSize(20).text(s.rate, L + 14, y + 8)
  doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(10).text(s.cls + ' VESSEL', L + 72, y + 10)
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(9).text(s.note, L + 72, y + 26)
  y += 50
})

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(10).text('Optimal Vessel Specification:', L, y)
y += 14
const vesselSpec = [
  ['VESSEL CLASS',     'Compact single-occupant capsule or 3-drone swarm configuration'],
  ['THERMAL RATING',   'Class-7 solar shielding minimum — higher is counterproductive (adds mass)'],
  ['PROPULSION',       'Ion drive preferred — minimal heat and EM signature during approach'],
  ['SHRINK RAY MOUNT', 'External dorsal — maintain aerodynamic profile at all times'],
  ['MAX CREW',         '1 pilot only — remote Minion coordination via encrypted link'],
  ['FUEL RESERVE',     '80%+ at approach window — extraction requires full burn capacity'],
]
vesselSpec.forEach(([k, v], i) => {
  const bg = i % 2 === 0 ? C.CARD : C.DARK
  y = infoRow(k, v, y, bg)
})
y += 8

y = alertBox(
  'CRITICAL WARNING — VESSEL SIZE',
  'Our 2nd failed mission deployed a Class-Omega vessel with 47 crew members. It was detected at ' +
  '88 million km — 61 million km before the approach window. The vessel\'s thermal signature was ' +
  'visible from Earth with amateur equipment. Do not repeat this mistake.',
  y)

y = bodyText(
  'Post-mission debrief note: The mission commander believed a larger vessel conveyed "authority and ' +
  'inevitability." Gru\'s note on the debrief form: "It conveyed nothing. Because we failed."',
  y, { oblique: true })


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 4: Section 3 — Team Intelligence + Section 4 — Threat Analysis
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.BLACK)
pageHeader(4)

y = 46
y = sectionBanner('SECTION 03 — TEAM INTELLIGENCE', y)

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(14).text('The Ideal Team Size Will Surprise You.', L, y)
y += 20
y = counterTag(y)

// Team size grid
const teamData = [
  { range: '1–4',  rate: '32%', note: 'Insufficient\ncapability',              color: C.ORANGE },
  { range: '5–8',  rate: '58%', note: 'OPTIMAL\nrange →',                       color: C.GREEN, highlight: true },
  { range: '9–14', rate: '44%', note: 'Diminishing\nreturns begin',             color: C.YELLOW },
  { range: '15–24',rate: '31%', note: 'Coordination\nfailures spike',           color: C.ORANGE },
  { range: '25+',  rate: '22%', note: 'Chaos.\nAlways fails.',                  color: C.RED },
]
const tdW = W / 5
teamData.forEach((td, i) => {
  const cx = L + i * tdW
  doc.rect(cx + 1, y, tdW - 3, 80).fill(td.highlight ? '#0D1A0D' : C.DARK)
  if (td.highlight) doc.rect(cx + 1, y, tdW - 3, 80).stroke(C.GREEN)
  doc.fillColor(td.highlight ? C.GREEN : C.YELLOW).font('Courier-Bold').fontSize(7.5)
    .text(td.range + '\nMINIONS', cx + 2, y + 6, { width: tdW - 4, align: 'center' })
  doc.fillColor(td.highlight ? C.GREEN : C.WHITE).font('Helvetica-Bold').fontSize(18)
    .text(td.rate, cx, y + 30, { width: tdW - 2, align: 'center' })
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(7.5)
    .text(td.note, cx + 2, y + 56, { width: tdW - 4, align: 'center' })
})
y += 92

y = bodyText(
  'Teams of 5–8 succeed nearly twice as often as teams of 15 or more. This defies every villain\'s ' +
  'instinct to bring maximum forces. Smaller teams move faster, communicate better, and are 64% less ' +
  'likely to experience a Minion distraction incident — the single largest cause of mission failure.',
  y)

y += 4
y = successBox(
  'TEAM COMPOSITION RECOMMENDATION',
  '5–8 Minions total. Mandatory specializations: 1 pilot/navigator, 1 thermal engineer, 1 shrink ray operator, ' +
  '1 extraction coordinator, 1 comms officer. All others are a liability. Cut them.',
  y)

// Section 4
y += 4
y = sectionBanner('SECTION 04 — THREAT ANALYSIS', y, C.RED)

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(14).text('The Real Enemy Is Not Who You Think.', L, y)
y += 20
y = counterTag(y)

const threats = [
  { t: 'MINION DISTRACTION INCIDENT', pct: '73%', desc: 'Primary cause of mission failure — internal threat', color: C.RED },
  { t: 'DETECTION (pre-approach)',     pct: '61%', desc: 'Surveillance triggered by vessel size or EM signature',color: C.ORANGE },
  { t: 'HERO INTERFERENCE',           pct: '28%', desc: 'Response agents mobilized after detection',           color: '#AA44CC' },
  { t: 'TECHNICAL FAILURE',           pct: '22%', desc: 'Equipment malfunction — usually thermal-related',      color: C.BLUE },
  { t: 'SOLAR RADIATION DAMAGE',      pct: '18%', desc: 'Underestimated exposure — vessel spec failures',       color: C.YELLOW },
]
threats.forEach(tr => {
  doc.rect(L, y, W, 28).fill(C.DARK)
  doc.rect(L, y, 3, 28).fill(tr.color)
  doc.fillColor(tr.color).font('Helvetica-Bold').fontSize(14).text(tr.pct, L + 10, y + 6)
  doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(8.5).text(tr.t, L + 58, y + 6)
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(8).text(tr.desc, L + 58, y + 18)
  y += 30
})
y += 4

y = alertBox(
  'CRITICAL FINDING — READ THIS TWICE',
  'Hero interference — the threat every villain plans for obsessively — only affected 28% of missions. ' +
  'Your own Minion crew is 2.6x more dangerous to mission success than Vector and all heroes combined. ' +
  'Invest in Minion discipline protocols. This is not optional.',
  y, C.RED)


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 5: Section 5 — Extraction Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.BLACK)
pageHeader(5)

y = 46
y = sectionBanner('SECTION 05 — EXTRACTION SCENARIOS', y)

doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(14).text('Plan the Extraction First. Everything Else Second.', L, y)
y += 20

y = keyStatBox('87%', 'Success rate for missions that planned extraction first',
  'Highest success predictor in our entire 200-mission dataset', y, C.GREEN)

y = bodyText(
  'Missions that designed their extraction route BEFORE finalizing the approach strategy had an ' +
  '87% success rate — the single highest predictor of success in our dataset. Most villains plan ' +
  'the heist. The best villains plan the escape. The data is unambiguous: plan extraction first, ' +
  'approach second. Every time.',
  y)

// Extraction scenarios
const scenarios = [
  {
    id: 'A', name: 'Rapid Thermal Exit', rating: '87%',
    time: '48 HOURS',
    desc: 'Shrink sun. Immediately engage maximum thrust on pre-computed exit vector. Escape route and fuel burn calculated before approach begins.',
    reqs: ['Pre-computed exit vector loaded T-24h', 'Fuel at 80%+ on arrival at target zone', 'Zero Minion stops during extraction phase'],
    color: C.GREEN,
  },
  {
    id: 'B', name: 'Staged Withdrawal', rating: '71%',
    time: '72 HOURS',
    desc: 'Three-phase extraction. Phase 1: immediate thermal exit. Phase 2: regroup at Earth-Sun L2 point. Phase 3: return to Lair with cargo.',
    reqs: ['Pre-positioned relay vessel at L2 point', 'Communication blackout during Phase 1', 'All Minions briefed on all three phases individually'],
    color: C.YELLOW,
  },
  {
    id: 'C', name: 'Solo Pilot Extraction', rating: '55%',
    time: '36 HOURS',
    desc: 'Pilot-only extraction vessel. Minions return via separate autonomous vessel. Reduces distraction risk during highest-pressure extraction phase.',
    reqs: ['Autonomous Minion return vessel — pre-programmed', 'Separate extraction coordinates for each Minion', 'Clear mission-end handoff protocols established'],
    color: C.ORANGE,
  },
]

scenarios.forEach(s => {
  const boxH = 90
  doc.rect(L, y, W, boxH).fill(C.DARK)
  doc.rect(L, y, 4, boxH).fill(s.color)

  doc.fillColor(s.color).font('Courier-Bold').fontSize(8)
    .text(`SCENARIO ${s.id}  //  ${s.time}`, L + 12, y + 7)
  doc.fillColor(C.WHITE).font('Helvetica-Bold').fontSize(11)
    .text(s.name, L + 12, y + 20)
  doc.fillColor(s.color).font('Helvetica-Bold').fontSize(14)
    .text(s.rating, L + W - 56, y + 8)
  doc.fillColor(C.GRAY).font('Helvetica').fontSize(7.5)
    .text('SUCCESS', L + W - 58, y + 26)

  doc.fillColor('#CCCCCC').font('Helvetica').fontSize(8.5)
    .text(s.desc, L + 12, y + 38, { width: W - 80, lineGap: 1 })

  doc.fillColor(s.color).font('Courier-Bold').fontSize(7)
    .text('REQUIREMENTS:', L + 12, y + 68)
  doc.fillColor(C.DGRAY).font('Courier').fontSize(7)
    .text(s.reqs.join('  |  '), L + 95, y + 68, { width: W - 100 })

  y += boxH + 8
})

// The 4 Rules summary
y += 4
doc.rect(L, y, W, 80).fill(C.CARD)
doc.rect(L, y, 4, 80).fill(C.YELLOW)
doc.fillColor(C.YELLOW).font('Courier-Bold').fontSize(9)
  .text('THE 4 RULES THAT WILL WIN THIS MISSION', L + 12, y + 8)

const rules = [
  '01   Launch in November — not summer.',
  '02   Use the smallest vessel that carries the shrink ray.',
  '03   Team size 5–8 Minions maximum. No exceptions.',
  '04   Plan the extraction route before planning the approach.',
]
rules.forEach((r, i) => {
  doc.fillColor(i % 2 === 0 ? C.WHITE : C.GRAY).font('Helvetica').fontSize(9)
    .text(r, L + 12, y + 24 + i * 14)
})

// Final footer
doc.fillColor(C.DGRAY).font('Courier').fontSize(7)
  .text(
    '1inMINION INTELLIGENCE DIVISION  //  GRU-SOLAR-0049  //  OPERATION: STEAL THE SUN  //  ALL RIGHTS CLASSIFIED',
    0, doc.page.height - 32, { width: doc.page.width, align: 'center' })

// ─── Finalize ────────────────────────────────────────────────────────────────
doc.end()
console.log('✓  solar_intelligence_brief.pdf written to public/files/')
