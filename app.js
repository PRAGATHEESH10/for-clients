/* ─────────────────────────────────────────────────────────
   Soul Reset Program — site engine
   Reads SETTINGS + COURSE from config.js and builds the page.
   Clicking a lesson opens the video on YouTube.
   (You don't need to edit this file.)
   ───────────────────────────────────────────────────────── */

const ICONS = {
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6h0s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15.1V8.5l6.1 3.3-6.1 3.3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>'
};

/* Pull the video ID out of any normal YouTube link format */
function getVideoId(link){
  if(!link) return null;
  const m = String(link).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{6,})/
  );
  return m ? m[1] : null;
}

/* Count how many videos are live (for the hero line) */
let liveCount = 0;
COURSE.forEach(mod => (mod.lessons || []).forEach(ls => {
  if(getVideoId(ls.link)) liveCount++;
  (ls.exercises || []).forEach(ex => { if(getVideoId(ex.link)) liveCount++; });
}));

/* ---------- render helpers ---------- */
function socialLinks(){
  let html = '';
  if(SETTINGS.youtube)   html += `<a class="icon-btn" href="${SETTINGS.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ICONS.youtube}</a>`;
  if(SETTINGS.instagram) html += `<a class="icon-btn" href="${SETTINGS.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>`;
  return html;
}

function renderStatic(){
  document.title = `${SETTINGS.courseName} — ${SETTINGS.teacher}`;
  document.getElementById('brand-name').textContent  = SETTINGS.courseName.replace(' Program','');
  document.getElementById('hero-eyebrow').textContent = `A private course by ${SETTINGS.teacher}`;
  document.getElementById('hero-title').textContent  = SETTINGS.courseName;
  document.getElementById('hero-tagline').textContent = SETTINGS.tagline;
  document.getElementById('foot-name').textContent   = `${SETTINGS.courseName} · ${SETTINGS.teacher}`;
  document.getElementById('gate-title').textContent  = SETTINGS.courseName;

  document.getElementById('hero-count').textContent =
    `${liveCount} video${liveCount===1?'':'s'} inside · new lessons added regularly`;

  document.getElementById('top-socials').innerHTML  = socialLinks();
  document.getElementById('foot-socials').innerHTML = socialLinks();

  if(SETTINGS.instagram){
    document.getElementById('gate-ig').href = SETTINGS.instagram;
    document.getElementById('foot-help').innerHTML =
      `Questions about access? <a href="${SETTINGS.instagram}" target="_blank" rel="noopener">DM on Instagram</a>`;
  }
}

/* Thumbnail: try the HD image first, fall back to standard if missing */
function thumbHtml(id, title){
  const alt = title.replace(/"/g,'&quot;');
  return `<div class="thumb">
    <img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt="${alt}"
         loading="lazy"
         onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${id}/hqdefault.jpg';">
    <span class="play-badge"><span>${ICONS.play}</span></span>
  </div>`;
}

function cardHtml(item, isExercise){
  const id = getVideoId(item.link);
  const num = isExercise ? '' : `<span class="lesson-num">${item.num}</span>`;
  const tag = isExercise ? `<span class="lesson-tag">Practice</span>` : '';

  if(!id){
    return `
    <div class="bead-row ${isExercise?'is-exercise':''} is-soon-row">
      <span class="bead" aria-hidden="true"></span>
      <div class="lesson-card is-soon">
        <div class="thumb"><span class="thumb-empty">${ICONS.moon}</span></div>
        <div class="card-body">
          <div class="card-top">${num}${tag}<span class="lesson-tag soon">Coming soon</span></div>
          <div class="lesson-title">${item.title}</div>
        </div>
      </div>
    </div>`;
  }

  return `
  <div class="bead-row ${isExercise?'is-exercise':''}">
    <span class="bead" aria-hidden="true"></span>
    <a class="lesson-card" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
      ${thumbHtml(id, item.title)}
      <div class="card-body">
        <div class="card-top">${num}${tag}</div>
        <div class="lesson-title">${item.title}</div>
        <div class="card-hint">Watch on YouTube ${ICONS.arrow}</div>
      </div>
    </a>
  </div>`;
}

function renderCourse(){
  const root = document.getElementById('course');
  let html = '';

  COURSE.forEach(mod => {
    html += `<section class="module">
      <div class="module-head">
        <span class="module-pill">Module ${mod.module}</span>
        <span class="module-title">${mod.title}</span>
      </div>`;
    if(mod.note) html += `<div class="module-note">${mod.note}</div>`;

    if(!mod.lessons || !mod.lessons.length){
      html += `<div class="module-empty">New videos for this module will appear here — keep an eye out. 🌱</div></section>`;
      return;
    }

    html += `<div class="thread">`;
    mod.lessons.forEach((ls, i) => {
      html += cardHtml({ ...ls, num: mod.module + (i+1) }, false);
      (ls.exercises || []).forEach(ex => {
        html += cardHtml(ex, true);
      });
    });
    html += `</div></section>`;
  });

  root.innerHTML = html;
}

/* ---------- access gate ---------- */
function initGate(){
  const gate = document.getElementById('gate');
  const site = document.getElementById('site');

  if(!SETTINGS.passcode){
    site.classList.remove('hidden');
    return;
  }

  gate.classList.remove('hidden');
  const form = document.getElementById('gate-form');
  const input = document.getElementById('gate-input');
  const err = document.getElementById('gate-error');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const given = input.value.trim().toLowerCase();
    if(given === String(SETTINGS.passcode).trim().toLowerCase()){
      gate.classList.add('hidden');
      site.classList.remove('hidden');
    } else {
      err.textContent = "That code didn't match. Check the message you received and try again.";
      gate.classList.add('shake');
      setTimeout(() => gate.classList.remove('shake'), 450);
      input.select();
    }
  });
  input.focus();
}

renderStatic();
renderCourse();
initGate();
