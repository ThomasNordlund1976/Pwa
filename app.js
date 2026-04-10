'use strict';

// ── DATA ─────────────────────────────────────────────────────────────────────
const SPLIT = [
  { day: 'Monday',    type: 'push',  label: 'PUSH',         sub: 'Chest · Shoulders · Triceps',
    exercises: ['Seated Dumbbell Lateral Raise','Incline Barbell Press','Seated Dumbbell Shoulder Press',
                'Seated Chest Machine Press','High to Low Cable Flye','Overhead Rope Extensions','Weighted Dip'] },
  { day: 'Tuesday',   type: 'pull',  label: 'PULL',         sub: 'Back · Rear Delts · Biceps',
    exercises: ['Chest Supported Machine Row','Straight Bar Lat Pulldown','Wide Grip Cable Row',
                'Cable Rear Delt Flyes','Dumbbell Hammer Curls','High Cable Curls'] },
  { day: 'Wednesday', type: 'lower', label: 'LOWER',        sub: 'Quads · Hamstrings · Glutes',
    exercises: ['Quad Extension','Hack Squat','Barbell RDL','Leg Press','Hamstring Curl','Walking Lunges','Standing Calf Raises'] },
  { day: 'Thursday',  type: 'rest',  label: 'REST',         sub: 'Recovery', exercises: [] },
  { day: 'Friday',    type: 'delts', label: 'DELTS + ARMS', sub: 'Shoulders · Triceps · Biceps',
    exercises: ['Seated Machine Lateral Raise','Seated Barbell Shoulder Press','Chest Supported DB Lateral Raises',
                'Rope Face Pulls','EZ Bar Tricep Extensions','Incline Dumbbell Curls','Dumbbell Skull Crush'] },
  { day: 'Saturday',  type: 'cb',    label: 'CHEST + BACK', sub: 'Chest · Back',
    exercises: ['Close Grip Pulldown','Flat Smith Machine Chest Press','Single Arm Dumbbell Row',
                'Incline Barbell Press','Barbell Row','Pec Dec Flye'] },
  { day: 'Sunday',    type: 'rest',  label: 'REST',         sub: 'Recovery', exercises: [] },
];

const WEEKS = [
  { n:1,  phase:'Foundation',       pclass:'wb-phase1',   sets:3, reps:'10–15', rir:'4 RIR', note:'Focus on form and establishing your baseline weights. Learn every bar path cold.' },
  { n:2,  phase:'Foundation',       pclass:'wb-phase1',   sets:3, reps:'10–15', rir:'3 RIR', note:'Add weight or reps wherever possible vs. Week 1. Progressive overload starts now.' },
  { n:3,  phase:'Foundation',       pclass:'wb-phase1',   sets:3, reps:'10–15', rir:'2 RIR', note:'Push closer to 2 RIR on final sets. You should feel the groove of each movement.' },
  { n:4,  phase:'Foundation',       pclass:'wb-phase1',   sets:3, reps:'10–15', rir:'2 RIR', note:'Final Foundation week. Consolidate loads — deload earned next week.' },
  { n:5,  phase:'DELOAD',           pclass:'wb-deload',   sets:2, reps:'10–15', rir:'5 RIR', note:'2 sets only, 10–15% lighter on all lifts. Move well, sleep 8h+, eat at maintenance.' },
  { n:6,  phase:'Intensification',  pclass:'wb-intensify',sets:4, reps:'8–12',  rir:'3 RIR', note:'Back with 4 sets. Heavier than Week 4 across all primary lifts. Fresh and strong.' },
  { n:7,  phase:'Intensification',  pclass:'wb-intensify',sets:4, reps:'8–12',  rir:'2 RIR', note:'Increase load every session. You should feel stronger than before the deload.' },
  { n:8,  phase:'Intensification',  pclass:'wb-intensify',sets:4, reps:'8–12',  rir:'1 RIR', note:'Approaching 1 RIR on final sets. This is where real hypertrophy accumulates.' },
  { n:9,  phase:'Intensification',  pclass:'wb-intensify',sets:4, reps:'8–12',  rir:'1 RIR', note:'Final Intensification week — push hard but stay technically sound. Deload earned.' },
  { n:10, phase:'DELOAD',           pclass:'wb-deload',   sets:2, reps:'10–15', rir:'5 RIR', note:'Same rules as Week 5. Non-negotiable. The gains happen during rest — trust it.' },
  { n:11, phase:'Peak Accumulation',pclass:'wb-peak',     sets:4, reps:'6–12',  rir:'2 RIR', note:'Peak phase begins. 4 heavy, controlled sets. Last set: 2 RIR on everything.' },
  { n:12, phase:'Peak Accumulation',pclass:'wb-peak',     sets:4, reps:'6–12',  rir:'1 RIR', note:'Increase loads again. Last set: 1 RIR on all exercises. Log every number.' },
  { n:13, phase:'Peak Accumulation',pclass:'wb-peak',     sets:5, reps:'6–12',  rir:'1 RIR', note:'5 sets — highest volume of the program. Last set 1 RIR. This is the summit.' },
  { n:14, phase:'Peak Accumulation',pclass:'wb-peak',     sets:5, reps:'6–12',  rir:'0 RIR', note:'Final week. Last set of every exercise to true failure. Give everything — it ends here.' },
];

const PHASE_NOTES = {
  'Foundation':       'Learn movement patterns, build work capacity. <strong>Add weight or reps every single session.</strong> Log everything.',
  'DELOAD':           'Drop all weights 10–15%, reduce to listed sets. Do not push intensity. Sleep 8h+, eat at maintenance. <strong>This is mandatory.</strong>',
  'Intensification':  'Heavier loads, tighter reps. Mechanical tension is the primary hypertrophy driver now. Stay controlled — quality over ego.',
  'Peak Accumulation':'<strong>Maximum volume + intensity.</strong> Last set of every exercise goes to 0–1 RIR or true failure. This is where the adaptation peaks.',
};

const PHASE_CARDS = [
  { cls:'pc-p1',     name:'Foundation',       weeks:'Weeks 1–4', sets:3, reps:'10–15', rir:'2–4 RIR', note:'Establish movement patterns and baseline loads. Build work capacity. Add weight or reps every session.' },
  { cls:'pc-deload', name:'Deload',            weeks:'Week 5',    sets:2, reps:'10–15', rir:'5 RIR',   note:'Mandatory recovery. 10–15% weight reduction. Joints and CNS recover — the adaptation is cemented here.' },
  { cls:'pc-p2',     name:'Intensification',   weeks:'Weeks 6–9', sets:4, reps:'8–12',  rir:'1–3 RIR', note:'Heavier loads, shorter rest. Mechanical tension drives growth. Last sets approaching true failure.' },
  { cls:'pc-deload', name:'Deload',            weeks:'Week 10',   sets:2, reps:'10–15', rir:'5 RIR',   note:'Second mandatory deload. Same rules — reduce load, reduce sets, prioritize sleep and nutrition.' },
  { cls:'pc-p3',     name:'Peak Accumulation', weeks:'Weeks 11–14',sets:'4–5',reps:'6–12',rir:'0–2 RIR',note:'Highest intensity of the program. Last set of every exercise goes to or near true failure. Log every rep.' },
];

// ── STORAGE ──────────────────────────────────────────────────────────────────
const DB_KEY = 'hype14w_v1';

function loadDB() {
  try { return JSON.parse(localStorage.getItem(DB_KEY)) || {}; } catch { return {}; }
}
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Key: `w${week}_${exerciseName}` → { sets: [{kg, reps, done}], date }
function getExKey(week, exName) { return `w${week}_${exName}`; }

function getExData(db, week, exName) {
  return db[getExKey(week, exName)] || null;
}
function setExData(db, week, exName, data) {
  db[getExKey(week, exName)] = data;
  saveDB(db);
}

function getExHistory(db, exName) {
  // Returns array of {week, sets, date} sorted by week
  const results = [];
  for (let w = 1; w <= 14; w++) {
    const d = getExData(db, w, exName);
    if (d && d.sets && d.sets.some(s => s.kg || s.reps)) {
      results.push({ week: w, sets: d.sets, date: d.date });
    }
  }
  return results;
}

function getWeekSetsCount(db, week, exName) {
  const d = getExData(db, week, exName);
  if (!d) return 0;
  return (d.sets || []).filter(s => s.done).length;
}

function getLastPerformance(db, week, exName) {
  // Get most recent logged data for this exercise before current week
  for (let w = week - 1; w >= 1; w--) {
    const d = getExData(db, w, exName);
    if (d && d.sets && d.sets.some(s => s.kg || s.reps)) {
      const done = d.sets.filter(s => s.kg || s.reps);
      if (done.length) return { week: w, sets: done };
    }
  }
  return null;
}

// ── STATE ────────────────────────────────────────────────────────────────────
let state = {
  tab: 'workout',
  week: 1,
  modal: null, // { exName, dayType }
  db: loadDB(),
};

// ── RENDER ───────────────────────────────────────────────────────────────────
function el(id) { return document.getElementById(id); }
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }

function render() {
  renderNav();
  if (state.tab === 'workout') renderWorkout();
  else if (state.tab === 'progress') renderProgress();
  else if (state.tab === 'overview') renderOverview();
}

// ── NAV ───────────────────────────────────────────────────────────────────── 
function renderNav() {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === state.tab);
  });
}

// ── WORKOUT TAB ──────────────────────────────────────────────────────────────
function renderWorkout() {
  const view = el('view-workout');
  const wk = WEEKS[state.week - 1];

  view.innerHTML = `
    <div class="page-header">
      <h1>THIS WEEK'S <span>WORKOUT</span></h1>
      <p>${wk.phase}  ·  ${wk.sets} sets  ·  ${wk.reps} reps  ·  ${wk.rir}</p>
    </div>

    <div class="week-scroll" id="week-scroll">
      ${WEEKS.map(w => `
        <button class="week-chip ${w.n === state.week ? 'active' : ''} ${w.phase==='DELOAD'?'deload':''} ${w.phase==='Peak Accumulation'?'peak':''}"
          data-week="${w.n}">W${w.n}</button>
      `).join('')}
    </div>

    <div class="week-banner ${wk.pclass}">
      <div class="wb-left">
        <div class="wb-phase">${wk.phase}</div>
        <div class="wb-title">WEEK ${wk.n} / 14</div>
      </div>
      <div class="wb-stats">
        <div class="wb-stat">
          <div class="wb-stat-val">${wk.sets}</div>
          <div class="wb-stat-label">Sets</div>
        </div>
        <div class="wb-stat">
          <div class="wb-stat-val">${wk.reps.replace('–','-')}</div>
          <div class="wb-stat-label">Reps</div>
        </div>
        <div class="wb-stat">
          <div class="wb-stat-val">${wk.rir.split(' ')[0]}</div>
          <div class="wb-stat-label">RIR</div>
        </div>
      </div>
    </div>

    <div class="coach-note">${wk.note}${wk.phase==='DELOAD'?' <span class="tag tag-deload">DELOAD</span>':''}</div>

    ${SPLIT.map(d => renderDaySection(d, wk)).join('')}
    <div style="height:8px"></div>
  `;

  // Events
  view.querySelectorAll('.week-chip').forEach(b => {
    b.addEventListener('click', () => { state.week = +b.dataset.week; renderWorkout(); scrollWeekChip(); });
  });
  view.querySelectorAll('.exercise-row').forEach(row => {
    row.addEventListener('click', () => openModal(row.dataset.ex, row.dataset.daytype));
  });

  scrollWeekChip();
}

function scrollWeekChip() {
  const scroll = el('week-scroll');
  if (!scroll) return;
  const active = scroll.querySelector('.week-chip.active');
  if (active) active.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
}

function renderDaySection(day, wk) {
  if (day.type === 'rest') {
    return `<div class="day-section">
      <div class="day-header day-${day.type}">
        <div class="day-dot"></div>
        <div class="day-name">${day.day}</div>
        <div class="day-type">${day.label}</div>
      </div>
      <div class="exercise-list">
        <div class="rest-row">🛋️ Active recovery — walk, stretch, foam roll</div>
      </div>
    </div>`;
  }

  const rows = day.exercises.map(ex => {
    const doneSets = getWeekSetsCount(state.db, state.week, ex);
    const isComplete = doneSets >= wk.sets;
    const last = getLastPerformance(state.db, state.week, ex);
    let lastStr = 'No previous data';
    if (last) {
      const maxKg = Math.max(...last.sets.filter(s=>s.kg).map(s=>+s.kg));
      lastStr = `Wk${last.week}: ${maxKg > 0 ? maxKg + ' kg' : '–'}`;
    }
    return `<div class="exercise-row" data-ex="${encodeURIComponent(ex)}" data-daytype="${day.type}">
      <div class="ex-info">
        <div class="ex-name">${ex}</div>
        <div class="ex-last ${last?'has-data':''}">${lastStr}</div>
      </div>
      <div class="ex-right">
        <div class="ex-rx">${wk.sets}×${wk.reps}</div>
        <div class="ex-sets-done ${isComplete?'complete'}">${doneSets}/${wk.sets}</div>
      </div>
    </div>`;
  }).join('');

  return `<div class="day-section">
    <div class="day-header day-${day.type}">
      <div class="day-dot"></div>
      <div class="day-name">${day.day}</div>
      <div class="day-type">${day.label}</div>
      <div class="day-sub">${day.sub}</div>
    </div>
    <div class="exercise-list">${rows}</div>
  </div>`;
}

// ── MODAL ────────────────────────────────────────────────────────────────────
function openModal(exEncoded, dayType) {
  const exName = decodeURIComponent(exEncoded);
  const wk = WEEKS[state.week - 1];
  const history = getExHistory(state.db, exName);
  const existing = getExData(state.db, state.week, exName);

  // Build sets array
  const currentSets = existing?.sets || Array.from({length: wk.sets}, () => ({kg:'', reps:'', done:false}));
  // Ensure correct length
  while (currentSets.length < wk.sets) currentSets.push({kg:'', reps:'', done:false});

  const modal = el('modal');
  const overlay = el('modal-overlay');

  // Suggest from last performance
  const last = getLastPerformance(state.db, state.week, exName);
  const suggestKg = last ? Math.max(...last.sets.filter(s=>s.kg).map(s=>+s.kg), 0) : 0;

  modal.innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-header">
      <div class="modal-day-type">${dayType.toUpperCase()}</div>
      <div class="modal-title">${exName}</div>
      <div class="modal-rx">${wk.sets} sets · ${wk.reps} reps · ${wk.rir} · Week ${wk.n}</div>
      ${suggestKg > 0 ? `<div style="margin-top:6px;font-size:11px;color:var(--text3);font-family:'DM Mono',monospace">Last: ${suggestKg} kg</div>` : ''}
    </div>

    <div class="set-logger">
      <div class="set-logger-title">Log Sets</div>
      ${currentSets.map((s, i) => `
        <div class="set-row" id="set-row-${i}">
          <div class="set-num">SET ${i+1}</div>
          <div class="set-inputs">
            <div class="set-field-wrap">
              <input class="set-field ${s.kg?'filled':''}" type="number" id="kg-${i}"
                placeholder="${suggestKg > 0 ? suggestKg : 'kg'}" value="${s.kg||''}"
                inputmode="decimal" step="0.5" min="0">
              <div class="set-label">KG</div>
            </div>
            <div class="set-field-wrap">
              <input class="set-field ${s.reps?'filled':''}" type="number" id="reps-${i}"
                placeholder="${wk.reps.split('–')[0]}" value="${s.reps||''}"
                inputmode="numeric" min="0" max="99">
              <div class="set-label">REPS</div>
            </div>
          </div>
          <button class="set-complete-btn ${s.done?'done':''}" data-set="${i}" title="Mark done">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
      `).join('')}
    </div>

    ${history.length ? `
      <div class="history-section">
        <div class="history-title">History</div>
        ${history.slice().reverse().slice(0, 5).map(h => `
          <div class="history-entry">
            <div class="history-week">Week ${h.week} · ${h.date || ''}</div>
            <div class="history-sets">
              ${h.sets.filter(s=>s.kg||s.reps).map(s => `<div class="history-set">${s.kg||'?'}kg × ${s.reps||'?'}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="modal-actions">
      <button class="btn btn-primary" id="modal-save">Save Sets</button>
      <button class="btn btn-ghost" id="modal-close">Close</button>
    </div>
    <div style="height:8px"></div>
  `;

  overlay.classList.add('open');
  state.modal = { exName, dayType };

  // Save
  el('modal-save').addEventListener('click', () => {
    const sets = currentSets.map((_, i) => ({
      kg:   el(`kg-${i}`)?.value   || '',
      reps: el(`reps-${i}`)?.value || '',
      done: el(`kg-${i}`)?.closest('.set-row').querySelector('.set-complete-btn').classList.contains('done') || false,
    }));
    setExData(state.db, state.week, exName, { sets, date: new Date().toLocaleDateString('sv-SE') });
    closeModal();
    renderWorkout();
  });

  // Complete toggle
  modal.querySelectorAll('.set-complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('done');
      // Auto-fill if empty
      const i = +btn.dataset.set;
      const kgInput = el(`kg-${i}`);
      const repsInput = el(`reps-${i}`);
      if (btn.classList.contains('done')) {
        if (!kgInput.value && suggestKg) kgInput.value = suggestKg;
        if (!repsInput.value) repsInput.value = wk.reps.split('–')[0];
      }
    });
  });

  // Swipe down to close
  let startY = 0;
  modal.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
  modal.addEventListener('touchmove', e => {
    const dy = e.touches[0].clientY - startY;
    if (dy > 0 && modal.scrollTop === 0) modal.style.transform = `translateY(${dy}px)`;
  }, {passive:true});
  modal.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - startY;
    modal.style.transform = '';
    if (dy > 80) closeModal();
  });

  el('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
}

function closeModal() {
  const overlay = el('modal-overlay');
  overlay.classList.remove('open');
  state.modal = null;
}

// ── PROGRESS TAB ─────────────────────────────────────────────────────────────
function renderProgress() {
  const view = el('view-progress');
  const db = state.db;

  // Count total logged sets
  let totalSets = 0, totalExercises = 0;
  const prs = {}; // exercise → max kg
  for (let w = 1; w <= 14; w++) {
    for (const day of SPLIT) {
      for (const ex of day.exercises) {
        const d = getExData(db, w, ex);
        if (d && d.sets) {
          const doneSets = d.sets.filter(s => s.done || s.kg || s.reps);
          if (doneSets.length) {
            totalSets += doneSets.length;
            totalExercises++;
            const maxKg = Math.max(...doneSets.filter(s=>s.kg).map(s=>+s.kg), 0);
            if (maxKg > 0 && (!prs[ex] || maxKg > prs[ex].kg)) {
              prs[ex] = { kg: maxKg, week: w };
            }
          }
        }
      }
    }
  }

  // Weeks completed (at least 1 exercise logged)
  const weeksLogged = new Set();
  for (const key of Object.keys(db)) {
    const m = key.match(/^w(\d+)_/);
    if (m) weeksLogged.add(+m[1]);
  }

  const pct = Math.round((weeksLogged.size / 14) * 100);

  const prEntries = Object.entries(prs).sort((a,b) => b[1].kg - a[1].kg).slice(0, 12);

  view.innerHTML = `
    <div class="page-header">
      <h1>YOUR <span>PROGRESS</span></h1>
      <p>14-week tracking overview</p>
    </div>
    <div class="progress-content">

      <div class="prog-card">
        <div class="prog-card-title">Program Progress</div>
        <div class="prog-stat-row">
          <div class="prog-stat-name">Weeks active</div>
          <div><span class="prog-stat-val">${weeksLogged.size}</span><span class="prog-stat-unit">/ 14</span></div>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>
        <div style="font-size:11px;color:var(--text3);margin-top:6px;font-family:'DM Mono',monospace;text-align:right">${pct}% complete</div>
      </div>

      <div class="prog-card">
        <div class="prog-card-title">Volume Summary</div>
        <div class="prog-stat-row">
          <div class="prog-stat-name">Total sets logged</div>
          <div><span class="prog-stat-val">${totalSets}</span></div>
        </div>
        <div class="prog-stat-row">
          <div class="prog-stat-name">Exercise sessions</div>
          <div><span class="prog-stat-val">${totalExercises}</span></div>
        </div>
        <div class="prog-stat-row">
          <div class="prog-stat-name">Exercises with PRs</div>
          <div><span class="prog-stat-val">${Object.keys(prs).length}</span></div>
        </div>
      </div>

      ${prEntries.length ? `
        <div class="prog-card">
          <div class="prog-card-title">Top Weights Logged (PRs)</div>
          <div class="pr-table">
            ${prEntries.map(([ex, {kg, week}]) => `
              <div class="pr-row">
                <div class="pr-ex">${ex}</div>
                <div class="pr-val">${kg} kg <span style="color:var(--text3);font-size:10px">Wk${week}</span></div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
          <p>No data yet — start logging sets in the Workout tab.</p>
        </div>
      `}

      <div class="prog-card">
        <div class="prog-card-title">Week-by-week Activity</div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:4px">
          ${WEEKS.map(w => {
            const active = weeksLogged.has(w.n);
            const isDeload = w.phase === 'DELOAD';
            const isPeak = w.phase === 'Peak Accumulation';
            const bg = active ? (isDeload?'var(--accent)':isPeak?'var(--cb)':'var(--push)') : 'var(--surface2)';
            return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
              <div style="width:100%;aspect-ratio:1;border-radius:6px;background:${bg};opacity:${active?1:0.5}"></div>
              <div style="font-size:9px;color:var(--text3);font-family:'DM Mono',monospace">W${w.n}</div>
            </div>`;
          }).join('')}
        </div>
      </div>

    </div>
  `;
}

// ── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function renderOverview() {
  const view = el('view-overview');

  view.innerHTML = `
    <div class="page-header">
      <h1>PROGRAM <span>OVERVIEW</span></h1>
      <p>5-Day Split · PPL + Delts + Chest/Back</p>
    </div>
    <div class="overview-content">

      ${PHASE_CARDS.map(p => `
        <div class="phase-card ${p.cls}">
          <div class="phase-card-header">
            <div class="phase-card-name">${p.name}</div>
            <div class="phase-card-weeks">${p.weeks}</div>
          </div>
          <div class="phase-card-body">
            <div class="pc-stat">
              <div class="pc-stat-val">${p.sets}</div>
              <div class="pc-stat-label">Sets</div>
            </div>
            <div class="pc-stat">
              <div class="pc-stat-val">${p.reps}</div>
              <div class="pc-stat-label">Reps</div>
            </div>
            <div class="pc-stat">
              <div class="pc-stat-val">${p.rir.split(' ')[0]}</div>
              <div class="pc-stat-label">RIR target</div>
            </div>
          </div>
          <div class="phase-card-note">${p.note}</div>
        </div>
      `).join('')}

      <div style="height:8px"></div>

      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:12px">
        <div style="padding:12px 14px;background:var(--bg3);border-bottom:1px solid var(--border)">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:0.04em">PRINCIPLES</div>
        </div>
        ${[
          ['Progressive Overload','Add weight or 1–2 reps every session. If you hit the top of the rep range for all sets, increase load next session. Log everything.'],
          ['Caloric Surplus','200–300 kcal above maintenance daily. Protein: 1.8–2.2g/kg bodyweight. You cannot build tissue without adequate fuel.'],
          ['Rep Ranges & RIR','Compounds: lower end of the range. Isolation/machines: higher end. Last set of every exercise taken to the listed RIR.'],
          ['Rest Periods','Compounds: 2–3 min. Machines/isolation: 90 sec – 2 min. Do not rush — strength output quality matters.'],
          ['Tempo','Slow eccentric (2–3 sec) on isolation work. Full stretch at the bottom of each rep. Never bounce or cheat ROM.'],
          ['Deloads','Weeks 5 and 10 are mandatory. Drop 10–15%, reduce sets. The gains happen during rest — do not skip.'],
          ['Commitment','Run the full 14 weeks without restructuring. Results compound across weeks. Trust the process.'],
        ].map(([t,d], i) => `
          <div style="padding:12px 14px;border-bottom:1px solid var(--border);background:${i%2?'var(--surface)':'transparent'}">
            <div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:3px">${t}</div>
            <div style="font-size:11px;color:var(--text2);line-height:1.6;font-weight:300">${d}</div>
          </div>
        `).join('')}
      </div>

      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:12px">
        <div style="padding:12px 14px;background:var(--bg3);border-bottom:1px solid var(--border)">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:0.04em">WEEKLY SPLIT</div>
        </div>
        ${SPLIT.map((d,i) => `
          <div style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-bottom:1px solid ${i<SPLIT.length-1?'var(--border)':'transparent'};background:${i%2?'var(--surface)':'transparent'}">
            <div style="width:7px;height:7px;border-radius:2px;background:var(--${d.type==='push'?'push':d.type==='pull'?'pull':d.type==='lower'?'lower':d.type==='delts'?'delts':d.type==='cb'?'cb':'rest'});flex-shrink:0"></div>
            <div style="width:80px;font-size:11px;color:var(--text3);font-family:'DM Mono',monospace;flex-shrink:0">${d.day.toUpperCase()}</div>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--text)">${d.label}</div>
              <div style="font-size:11px;color:var(--text2);font-weight:300">${d.sub}</div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// ── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  // Nav events
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.tab = btn.dataset.tab;
      document.querySelectorAll('.view').forEach(v => v.hidden = true);
      el(`view-${state.tab}`).hidden = false;
      render();
    });
  });

  // Initial render
  document.querySelectorAll('.view').forEach(v => v.hidden = true);
  el('view-workout').hidden = false;
  render();

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', init);
