
var SPLIT = [
  {day:"Monday",    type:"push",  label:"PUSH",         sub:"Chest / Shoulders / Triceps", ex:["Seated DB Lateral Raise","Incline Barbell Press","Seated DB Shoulder Press","Seated Chest Machine Press","High to Low Cable Flye","Overhead Rope Extensions","Weighted Dip"]},
  {day:"Tuesday",   type:"pull",  label:"PULL",         sub:"Back / Rear Delts / Biceps",  ex:["Chest Supported Machine Row","Straight Bar Lat Pulldown","Wide Grip Cable Row","Cable Rear Delt Flyes","DB Hammer Curls","High Cable Curls"]},
  {day:"Wednesday", type:"lower", label:"LOWER",        sub:"Quads / Hamstrings / Glutes", ex:["Quad Extension","Hack Squat","Barbell RDL","Leg Press","Hamstring Curl","Walking Lunges","Standing Calf Raises"]},
  {day:"Thursday",  type:"rest",  label:"REST",         sub:"Recovery", ex:[]},
  {day:"Friday",    type:"delts", label:"DELTS + ARMS", sub:"Shoulders / Triceps / Biceps", ex:["Seated Machine Lateral Raise","Seated Barbell Shoulder Press","CS DB Lateral Raises","Rope Face Pulls","EZ Bar Tricep Extensions","Incline DB Curls","DB Skull Crush"]},
  {day:"Saturday",  type:"cb",    label:"CHEST + BACK", sub:"Chest / Back", ex:["Close Grip Pulldown","Flat Smith Machine Press","Single Arm DB Row","Incline Barbell Press","Barbell Row","Pec Dec Flye"]},
  {day:"Sunday",    type:"rest",  label:"REST",         sub:"Recovery", ex:[]}
];
var WEEKS = [
  {n:1,  phase:"Foundation",     pc:"p-foundation", sets:3, reps:"10-15", rir:"4 RIR", note:"Focus on form and establishing baseline weights. Learn every movement pattern."},
  {n:2,  phase:"Foundation",     pc:"p-foundation", sets:3, reps:"10-15", rir:"3 RIR", note:"Add weight or reps vs Week 1 wherever possible. Progressive overload starts now."},
  {n:3,  phase:"Foundation",     pc:"p-foundation", sets:3, reps:"10-15", rir:"2 RIR", note:"Push closer to 2 RIR on final sets. You should feel the groove of each movement."},
  {n:4,  phase:"Foundation",     pc:"p-foundation", sets:3, reps:"10-15", rir:"2 RIR", note:"Final Foundation week. Consolidate loads - deload earned next week."},
  {n:5,  phase:"DELOAD",         pc:"p-deload",     sets:2, reps:"10-15", rir:"5 RIR", note:"2 sets only, 10-15% lighter on all lifts. Move well, sleep 8h+, eat at maintenance."},
  {n:6,  phase:"Intensification",pc:"p-intensify",  sets:4, reps:"8-12",  rir:"3 RIR", note:"Back with 4 sets. Heavier than Week 4 across all primary lifts. Fresh and strong."},
  {n:7,  phase:"Intensification",pc:"p-intensify",  sets:4, reps:"8-12",  rir:"2 RIR", note:"Increase load every session. You should feel stronger than before the deload."},
  {n:8,  phase:"Intensification",pc:"p-intensify",  sets:4, reps:"8-12",  rir:"1 RIR", note:"Approaching 1 RIR on final sets. This is where real hypertrophy accumulates."},
  {n:9,  phase:"Intensification",pc:"p-intensify",  sets:4, reps:"8-12",  rir:"1 RIR", note:"Final Intensification week - push hard but stay technically sound. Deload earned."},
  {n:10, phase:"DELOAD",         pc:"p-deload",     sets:2, reps:"10-15", rir:"5 RIR", note:"Same rules as Week 5. Non-negotiable. The gains happen during rest."},
  {n:11, phase:"Peak",           pc:"p-peak",       sets:4, reps:"6-12",  rir:"2 RIR", note:"Peak phase begins. 4 heavy controlled sets. Last set 2 RIR on everything."},
  {n:12, phase:"Peak",           pc:"p-peak",       sets:4, reps:"6-12",  rir:"1 RIR", note:"Increase loads again. Last set 1 RIR on all exercises. Log every number."},
  {n:13, phase:"Peak",           pc:"p-peak",       sets:5, reps:"6-12",  rir:"1 RIR", note:"5 sets - highest volume of the program. Last set 1 RIR. This is the summit."},
  {n:14, phase:"Peak",           pc:"p-peak",       sets:5, reps:"6-12",  rir:"0 RIR", note:"Final week. Last set of every exercise to true failure. Give everything."}
];
var PHASE_CARDS = [
  {cls:"pc-f",name:"Foundation",      weeks:"Weeks 1-4",   sets:"3",   reps:"10-15",rir:"2-4",note:"Establish movement patterns and baseline loads. Build work capacity. Add weight or reps every session."},
  {cls:"pc-d",name:"Deload",          weeks:"Week 5",      sets:"2",   reps:"10-15",rir:"5",  note:"Mandatory recovery. Cut weights 10-15%, reduce sets. Joints and CNS recover here."},
  {cls:"pc-i",name:"Intensification", weeks:"Weeks 6-9",   sets:"4",   reps:"8-12", rir:"1-3",note:"Heavier loads, tighter reps. Mechanical tension drives growth. Last sets near failure."},
  {cls:"pc-d",name:"Deload",          weeks:"Week 10",     sets:"2",   reps:"10-15",rir:"5",  note:"Second mandatory deload. Same rules - reduce load and sets, prioritize sleep."},
  {cls:"pc-p",name:"Peak Accum.",     weeks:"Weeks 11-14", sets:"4-5", reps:"6-12", rir:"0-2",note:"Maximum volume and intensity. Last set of every exercise goes to or near true failure."}
];
var PRINCIPLES = [
  ["Progressive Overload","Add weight or 1-2 reps every session. If you complete all reps at the top of the range, increase load next session. Log everything."],
  ["Caloric Surplus","200-300 kcal above maintenance daily. Protein: 1.8-2.2g per kg bodyweight. You cannot build muscle without adequate fuel."],
  ["Rep Ranges + RIR","Compounds: lower end of range. Isolation/machines: higher end. Last set of every exercise taken to the listed RIR."],
  ["Rest Periods","Compounds: 2-3 min. Isolation/machines: 90 sec to 2 min. Do not rush - output quality matters more than time in gym."],
  ["Tempo","Slow eccentric (2-3 sec) on all isolation work. Full stretch at the bottom. Never bounce or cheat the range of motion."],
  ["Deloads","Weeks 5 and 10 are mandatory. Drop 10-15%, cut sets. The gains happen during rest - do not skip."],
  ["Commitment","Run the full 14 weeks without restructuring. Results compound across weeks. Trust the process and stay the course."]
];
var DOT = {push:"#4d8bff",pull:"#ff6b35",lower:"#00d4a1",delts:"#b97dff",cb:"#ff4d72",rest:"#44445a"};

var curTab  = "workout";
var curWeek = 1;

function dbLoad() { try { return JSON.parse(localStorage.getItem("hype14w") || "{}"); } catch(e) { return {}; } }
function dbSave(db) { try { localStorage.setItem("hype14w", JSON.stringify(db)); } catch(e) {} }
function dbKey(w, ex) { return "w" + w + "_" + ex; }
function dbGet(db, w, ex) { return db[dbKey(w, ex)] || null; }
function dbSet(db, w, ex, val) { db[dbKey(w, ex)] = val; dbSave(db); }

function getHistory(db, ex) {
  var out = [];
  for (var w = 1; w <= 14; w++) {
    var d = dbGet(db, w, ex);
    if (d && d.sets) {
      var hasSets = false;
      for (var i = 0; i < d.sets.length; i++) { if (d.sets[i].kg || d.sets[i].reps) { hasSets = true; break; } }
      if (hasSets) out.push({week:w, sets:d.sets, date:d.date||""});
    }
  }
  return out;
}
function getLastPerf(db, week, ex) {
  for (var w = week - 1; w >= 1; w--) {
    var d = dbGet(db, w, ex);
    if (d && d.sets) {
      var done = [];
      for (var i = 0; i < d.sets.length; i++) { if (d.sets[i].kg || d.sets[i].reps) done.push(d.sets[i]); }
      if (done.length) return {week:w, sets:done};
    }
  }
  return null;
}
function getDone(db, week, ex) {
  var d = dbGet(db, week, ex);
  if (!d || !d.sets) return 0;
  var c = 0;
  for (var i = 0; i < d.sets.length; i++) { if (d.sets[i].done) c++; }
  return c;
}
function g(id) { return document.getElementById(id); }

function setTab(tab) {
  curTab = tab;
  ["workout","progress","overview"].forEach(function(t) {
    g("nb-" + t).classList.toggle("active", t === tab);
    var v = g("v-" + t);
    if (t === tab) v.classList.remove("hidden"); else v.classList.add("hidden");
  });
  if (tab === "workout")  renderWorkout();
  if (tab === "progress") renderProgress();
  if (tab === "overview") renderOverview();
}

function selectWeek(n) { curWeek = n; renderWorkout(); }

function renderWorkout() {
  var db = dbLoad();
  var wk = WEEKS[curWeek - 1];

  var chips = "";
  for (var i = 0; i < WEEKS.length; i++) {
    var w = WEEKS[i];
    chips += '<button class="wchip' + (w.n === curWeek ? " active" : "") + '" onclick="selectWeek(' + w.n + ')">W' + w.n + '</button>';
  }

  var banner = '<div class="week-banner ' + wk.pc + '">' +
    '<div class="wb-left"><div class="wb-phase">' + wk.phase + '</div><div class="wb-title">WEEK ' + wk.n + ' / 14</div></div>' +
    '<div class="wb-stats">' +
      '<div class="wb-stat"><div class="wb-val">' + wk.sets + '</div><div class="wb-lbl">Sets</div></div>' +
      '<div class="wb-stat"><div class="wb-val">' + wk.reps + '</div><div class="wb-lbl">Reps</div></div>' +
      '<div class="wb-stat"><div class="wb-val">' + wk.rir.split(" ")[0] + '</div><div class="wb-lbl">RIR</div></div>' +
    '</div></div>';

  var days = "";
  for (var d = 0; d < SPLIT.length; d++) {
    var day = SPLIT[d];
    if (day.type === "rest") {
      days += '<div class="day-section"><div class="day-header t-rest">' +
        '<div class="day-dot"></div>' +
        '<div class="day-day">' + day.day.toUpperCase() + '</div>' +
        '<div class="day-type">' + day.label + '</div>' +
        '</div><div class="ex-list"><div class="rest-msg">Active recovery - walk, stretch, foam roll</div></div></div>';
      continue;
    }
    var rows = "";
    for (var e = 0; e < day.ex.length; e++) {
      var ex = day.ex[e];
      var done = getDone(db, curWeek, ex);
      var isDone = done >= wk.sets;
      var last = getLastPerf(db, curWeek, ex);
      var lastStr = "No previous data";
      if (last && last.sets.length) {
        var maxKg = 0;
        for (var s = 0; s < last.sets.length; s++) { if (last.sets[s].kg && +last.sets[s].kg > maxKg) maxKg = +last.sets[s].kg; }
        lastStr = "Wk" + last.week + ": " + (maxKg > 0 ? maxKg + " kg" : "--");
      }
      var safeEx = encodeURIComponent(ex);
      rows += '<div class="ex-row" onclick="openModal(\'' + safeEx + '\',\'' + day.type + '\')">' +
        '<div class="ex-info">' +
          '<div class="ex-name">' + ex + '</div>' +
          '<div class="ex-last' + (last ? " has" : "") + '">' + lastStr + '</div>' +
        '</div>' +
        '<div class="ex-right">' +
          '<div class="ex-rx">' + wk.sets + 'x' + wk.reps + '</div>' +
          '<div class="ex-bubble' + (isDone ? " done" : "") + '">' + done + '/' + wk.sets + '</div>' +
        '</div></div>';
    }
    days += '<div class="day-section">' +
      '<div class="day-header t-' + day.type + '">' +
        '<div class="day-dot"></div>' +
        '<div class="day-day">' + day.day.toUpperCase() + '</div>' +
        '<div class="day-type">' + day.label + '</div>' +
        '<div class="day-sub">' + day.sub + '</div>' +
      '</div>' +
      '<div class="ex-list">' + rows + '</div></div>';
  }

  g("v-workout").innerHTML =
    '<div class="page-header"><h1>THIS WEEK\'S <span>WORKOUT</span></h1><p>' + wk.phase + ' - ' + wk.sets + ' sets - ' + wk.reps + ' reps - ' + wk.rir + '</p></div>' +
    '<div class="week-strip" id="wstrip">' + chips + '</div>' +
    banner +
    '<div class="coach-note">' + wk.note + '</div>' +
    days +
    '<div style="height:8px"></div>';

  setTimeout(function() {
    var strip = g("wstrip");
    if (!strip) return;
    var active = strip.querySelector(".wchip.active");
    if (active) active.scrollIntoView({inline:"center", behavior:"smooth", block:"nearest"});
  }, 50);
}

function openModal(safeEx, dayType) {
  var ex = decodeURIComponent(safeEx);
  var db = dbLoad();
  var wk = WEEKS[curWeek - 1];
  var existing = dbGet(db, curWeek, ex);
  var history  = getHistory(db, ex);
  var last     = getLastPerf(db, curWeek, ex);
  var suggestKg = 0;
  if (last && last.sets.length) {
    for (var s = 0; s < last.sets.length; s++) { if (last.sets[s].kg && +last.sets[s].kg > suggestKg) suggestKg = +last.sets[s].kg; }
  }

  var sets = existing && existing.sets ? existing.sets.slice() : [];
  while (sets.length < wk.sets) sets.push({kg:"", reps:"", done:false});

  var setRows = "";
  for (var i = 0; i < sets.length; i++) {
    var s = sets[i];
    var kgPh   = suggestKg > 0 ? suggestKg : "kg";
    var repsPh = wk.reps.split("-")[0];
    setRows += '<div class="set-row">' +
      '<div class="set-num">SET ' + (i+1) + '</div>' +
      '<div class="set-inputs">' +
        '<div class="field-wrap">' +
          '<input class="set-input" type="number" id="kg' + i + '" value="' + (s.kg||"") + '" placeholder="' + kgPh + '" inputmode="decimal" step="0.5" min="0">' +
          '<div class="field-lbl">KG</div>' +
        '</div>' +
        '<div class="field-wrap">' +
          '<input class="set-input" type="number" id="rp' + i + '" value="' + (s.reps||"") + '" placeholder="' + repsPh + '" inputmode="numeric" min="0" max="99">' +
          '<div class="field-lbl">REPS</div>' +
        '</div>' +
      '</div>' +
      '<button class="check-btn' + (s.done ? " done" : "") + '" id="chk' + i + '" onclick="toggleCheck(' + i + ',' + suggestKg + ',\'' + repsPh + '\')">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
      '</button></div>';
  }

  var histHtml = "";
  if (history.length) {
    histHtml = '<div class="history-sec"><div class="history-title">History</div>';
    var recent = history.slice().reverse().slice(0,5);
    for (var h = 0; h < recent.length; h++) {
      var entry = recent[h];
      var setsHtml = "";
      for (var si = 0; si < entry.sets.length; si++) {
        var sv = entry.sets[si];
        if (sv.kg || sv.reps) setsHtml += '<div class="hist-set">' + (sv.kg||"?") + 'kg x ' + (sv.reps||"?") + '</div>';
      }
      histHtml += '<div class="hist-entry"><div class="hist-wk">Week ' + entry.week + (entry.date ? " - " + entry.date : "") + '</div><div class="hist-sets">' + setsHtml + '</div></div>';
    }
    histHtml += '</div>';
  }

  g("modal").innerHTML =
    '<div class="modal-handle"></div>' +
    '<div class="modal-head">' +
      '<div class="modal-daytype">' + dayType.toUpperCase() + '</div>' +
      '<div class="modal-title">' + ex + '</div>' +
      '<div class="modal-sub">' + wk.sets + ' sets - ' + wk.reps + ' reps - ' + wk.rir + ' - Week ' + wk.n + '</div>' +
      (suggestKg > 0 ? '<div class="modal-hint">Last logged: ' + suggestKg + ' kg</div>' : '') +
    '</div>' +
    '<div class="set-logger"><div class="logger-title">Log Sets</div>' + setRows + '</div>' +
    histHtml +
    '<div class="modal-actions">' +
      '<button class="btn btn-primary" onclick="saveModal(\'' + safeEx + '\',' + wk.sets + ')">Save Sets</button>' +
      '<button class="btn btn-ghost" onclick="closeModal()">Close</button>' +
    '</div><div style="height:8px"></div>';

  g("overlay").classList.add("open");
}

function toggleCheck(i, suggestKg, repsPh) {
  var btn = g("chk" + i);
  btn.classList.toggle("done");
  if (btn.classList.contains("done")) {
    var kgEl = g("kg" + i);
    var rpEl = g("rp" + i);
    if (kgEl && !kgEl.value && suggestKg) kgEl.value = suggestKg;
    if (rpEl && !rpEl.value) rpEl.value = repsPh;
  }
}

function saveModal(safeEx, numSets) {
  var ex = decodeURIComponent(safeEx);
  var db = dbLoad();
  var sets = [];
  for (var i = 0; i < numSets; i++) {
    var kgEl  = g("kg"  + i);
    var rpEl  = g("rp"  + i);
    var chkEl = g("chk" + i);
    sets.push({
      kg:   kgEl  ? kgEl.value  : "",
      reps: rpEl  ? rpEl.value  : "",
      done: chkEl ? chkEl.classList.contains("done") : false
    });
  }
  var now = new Date();
  var date = now.getFullYear() + "-" + String(now.getMonth()+1).padStart(2,"0") + "-" + String(now.getDate()).padStart(2,"0");
  dbSet(db, curWeek, ex, {sets:sets, date:date});
  closeModal();
  renderWorkout();
}

function closeModal() { g("overlay").classList.remove("open"); }
function overlayClick(e) { if (e.target === g("overlay")) closeModal(); }

function renderProgress() {
  var db = dbLoad();
  var totalSets = 0, totalEx = 0;
  var prs = {};
  var weeksLogged = {};

  for (var w = 1; w <= 14; w++) {
    for (var d = 0; d < SPLIT.length; d++) {
      var day = SPLIT[d];
      for (var e = 0; e < day.ex.length; e++) {
        var ex = day.ex[e];
        var data = dbGet(db, w, ex);
        if (data && data.sets) {
          var hasDone = false;
          for (var si = 0; si < data.sets.length; si++) {
            var s = data.sets[si];
            if (s.done || s.kg || s.reps) { hasDone = true; totalSets++; }
          }
          if (hasDone) {
            totalEx++;
            weeksLogged[w] = true;
            var maxKg = 0;
            for (var si2 = 0; si2 < data.sets.length; si2++) {
              if (data.sets[si2].kg && +data.sets[si2].kg > maxKg) maxKg = +data.sets[si2].kg;
            }
            if (maxKg > 0 && (!prs[ex] || maxKg > prs[ex].kg)) prs[ex] = {kg:maxKg, week:w};
          }
        }
      }
    }
  }

  var weeksCount = Object.keys(weeksLogged).length;
  var pct = Math.round((weeksCount / 14) * 100);
  var prArr = [];
  for (var exKey in prs) { prArr.push({ex:exKey, kg:prs[exKey].kg, week:prs[exKey].week}); }
  prArr.sort(function(a,b){ return b.kg - a.kg; });
  prArr = prArr.slice(0,12);

  var prHtml = "";
  if (prArr.length) {
    for (var pi = 0; pi < prArr.length; pi++) {
      prHtml += '<div class="pr-row"><div class="pr-ex">' + prArr[pi].ex + '</div><div class="pr-val">' + prArr[pi].kg + ' kg <span style="color:var(--text3);font-size:10px">Wk' + prArr[pi].week + '</span></div></div>';
    }
  } else { prHtml = '<div class="no-hist">No weights logged yet.</div>'; }

  var heatmap = "";
  for (var wi = 0; wi < WEEKS.length; wi++) {
    var ww = WEEKS[wi];
    var active = !!weeksLogged[ww.n];
    var col = active ? (ww.phase==="DELOAD"?"var(--accent)":ww.phase==="Peak"?"var(--cb)":"var(--push)") : "var(--surface2)";
    heatmap += '<div style="display:flex;flex-direction:column;align-items:center;gap:3px">' +
      '<div style="width:100%;aspect-ratio:1;border-radius:5px;background:' + col + ';opacity:' + (active?1:0.5) + '"></div>' +
      '<div style="font-size:9px;color:var(--text3);font-family:\'DM Mono\',monospace">W' + ww.n + '</div></div>';
  }

  g("v-progress").innerHTML =
    '<div class="page-header"><h1>YOUR <span>PROGRESS</span></h1><p>14-week tracking overview</p></div>' +
    '<div class="prog-content">' +
      '<div class="prog-card"><div class="prog-card-title">Program Progress</div>' +
        '<div class="stat-row"><div class="stat-name">Weeks active</div><div><span class="stat-val">' + weeksCount + '</span><span class="stat-unit">/ 14</span></div></div>' +
        '<div class="progress-bar-wrap"><div class="progress-bar" style="width:' + pct + '%"></div></div>' +
        '<div style="font-size:11px;color:var(--text3);margin-top:6px;font-family:\'DM Mono\',monospace;text-align:right">' + pct + '% complete</div>' +
      '</div>' +
      '<div class="prog-card"><div class="prog-card-title">Volume Summary</div>' +
        '<div class="stat-row"><div class="stat-name">Total sets logged</div><div><span class="stat-val">' + totalSets + '</span></div></div>' +
        '<div class="stat-row"><div class="stat-name">Exercise sessions</div><div><span class="stat-val">' + totalEx + '</span></div></div>' +
        '<div class="stat-row"><div class="stat-name">Exercises with PRs</div><div><span class="stat-val">' + prArr.length + '</span></div></div>' +
      '</div>' +
      '<div class="prog-card"><div class="prog-card-title">Top Weights (PRs)</div>' + prHtml + '</div>' +
      '<div class="prog-card"><div class="prog-card-title">Week Activity</div>' +
        '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:4px">' + heatmap + '</div>' +
      '</div>' +
    '</div>';
}

function renderOverview() {
  var phaseCards = "";
  for (var i = 0; i < PHASE_CARDS.length; i++) {
    var p = PHASE_CARDS[i];
    phaseCards += '<div class="phase-card ' + p.cls + '">' +
      '<div class="pc-head"><div class="pc-name">' + p.name + '</div><div class="pc-weeks">' + p.weeks + '</div></div>' +
      '<div class="pc-body">' +
        '<div><div class="pc-stat-val">' + p.sets + '</div><div class="pc-stat-lbl">Sets</div></div>' +
        '<div><div class="pc-stat-val">' + p.reps + '</div><div class="pc-stat-lbl">Reps</div></div>' +
        '<div><div class="pc-stat-val">' + p.rir + '</div><div class="pc-stat-lbl">RIR</div></div>' +
      '</div>' +
      '<div class="pc-note">' + p.note + '</div></div>';
  }

  var splitRows = "";
  for (var d = 0; d < SPLIT.length; d++) {
    var day = SPLIT[d];
    var col = DOT[day.type] || "#44445a";
    var bg  = d % 2 ? "var(--surface)" : "transparent";
    splitRows += '<div class="info-row" style="background:' + bg + '">' +
      '<div class="info-dot" style="background:' + col + '"></div>' +
      '<div class="info-day">' + day.day.toUpperCase().slice(0,3) + '</div>' +
      '<div><div class="info-label">' + day.label + '</div><div class="info-sub">' + day.sub + '</div></div></div>';
  }

  var princRows = "";
  for (var pi = 0; pi < PRINCIPLES.length; pi++) {
    var pr = PRINCIPLES[pi];
    var bg2 = pi % 2 ? "var(--surface)" : "transparent";
    princRows += '<div class="prin-row" style="background:' + bg2 + '">' +
      '<div class="prin-title">' + pr[0] + '</div>' +
      '<div class="prin-desc">' + pr[1] + '</div></div>';
  }

  g("v-overview").innerHTML =
    '<div class="page-header"><h1>PROGRAM <span>OVERVIEW</span></h1><p>5-Day Split - PPL + Delts + Chest/Back</p></div>' +
    '<div class="ov-content">' +
      phaseCards +
      '<div class="info-card"><div class="info-card-head">WEEKLY SPLIT</div>' + splitRows + '</div>' +
      '<div class="info-card"><div class="info-card-head">PRINCIPLES</div>' + princRows + '</div>' +
      '<div style="height:8px"></div>' +
    '</div>';
}

renderWorkout();
