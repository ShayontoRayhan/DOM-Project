// Clean single-file script: menu, theme toggle (default dark), gallery search, modal, 3D demo (CSS), contact
document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-hidden', String(expanded));
  });

  // Theme handling — default: dark. Light theme applied via `body.light`.
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme){
    const isLight = theme === 'light';
    document.body.classList.toggle('light', isLight);
    if (themeToggle){
      themeToggle.textContent = isLight ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-pressed', String(isLight));
    }
  }
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') applyTheme(stored);
  else applyTheme('dark');
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Gallery & Search
  const galleryImages = Array.from(document.querySelectorAll('.gallery .grid img'));
  const searchInput = document.getElementById('search');
  function filterGallery(query){
    const q = String(query || '').trim().toLowerCase();
    let any = false;
    galleryImages.forEach(img => {
      const text = (img.alt || '').toLowerCase();
      const show = q === '' || text.includes(q);
      img.style.display = show ? 'block' : 'none';
      if (show) any = true;
    });
    let hint = document.getElementById('no-results-hint');
    if (!hint){
      hint = document.createElement('div');
      hint.id = 'no-results-hint';
      hint.style.padding = '1rem';
      hint.style.color = 'var(--muted)';
      hint.style.textAlign = 'center';
      const grid = document.querySelector('.gallery .grid');
      grid && grid.parentNode && grid.parentNode.appendChild(hint);
    }
    hint.textContent = any ? '' : 'No images match your search.';
    hint.style.display = any ? 'none' : 'block';
  }
  if (searchInput) searchInput.addEventListener('input', (e) => filterGallery(e.target.value));

  // Modal gallery
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const modalCaption = document.getElementById('modal-caption');
  const modalAutoplay = document.getElementById('modal-autoplay');
  let currentIndex = -1;
  let autoplayInterval = null;

  function openModalForIndex(i){
    const img = galleryImages[i];
    if (!img || !modal) return;
    modalImg.src = img.dataset.full || img.src;
    modalCaption.textContent = img.alt || `Image ${i+1}`;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){ if (!modal) return; modal.setAttribute('aria-hidden','true'); modalImg.src = ''; document.body.style.overflow = ''; stopAutoplay(); }
  function showNext(){ if (galleryImages.length===0) return; currentIndex = (currentIndex + 1) % galleryImages.length; openModalForIndex(currentIndex); }
  function showPrev(){ if (galleryImages.length===0) return; currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; openModalForIndex(currentIndex); }
  function startAutoplay(){ stopAutoplay(); if (modalAutoplay) modalAutoplay.setAttribute('aria-pressed','true'); autoplayInterval = setInterval(showNext, 2500); if (modalAutoplay) modalAutoplay.textContent = '⏸'; }
  function stopAutoplay(){ if (autoplayInterval) clearInterval(autoplayInterval); autoplayInterval = null; if (modalAutoplay) modalAutoplay.setAttribute('aria-pressed','false'); if (modalAutoplay) modalAutoplay.textContent = '▶'; }

  galleryImages.forEach((img, idx) => img.addEventListener('click', () => { currentIndex = idx; openModalForIndex(idx); }));
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); if (e.key === 'ArrowRight') showNext(); if (e.key === 'ArrowLeft') showPrev(); });
  modalNext && modalNext.addEventListener('click', showNext);
  modalPrev && modalPrev.addEventListener('click', showPrev);
  modalAutoplay && modalAutoplay.addEventListener('click', () => { const playing = modalAutoplay.getAttribute('aria-pressed') === 'true'; if (playing) stopAutoplay(); else startAutoplay(); });

  // Contact form with inline confirmation
  const form = document.getElementById('contact-form');
  const formConfirm = document.getElementById('form-confirm');
  function showConfirm(msg){
    if (!formConfirm){ alert(msg); return; }
    formConfirm.textContent = msg;
    formConfirm.classList.add('show');
    formConfirm.hidden = false;
    setTimeout(() => { formConfirm.classList.remove('show'); formConfirm.hidden = true; }, 4000);
  }
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()){ showConfirm('Please complete all fields before sending.'); return; }
    showConfirm('Thanks, ' + name.value.trim() + '! Your message has been sent.');
    form.reset();
  });

});
// Consolidated script: handles menu, theme, gallery search, modal, and contact confirmation
document.addEventListener('DOMContentLoaded', () => {
  // --- Menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    // Clean script: menu, gallery search, modal, 3D demo (auto-rotate), contact confirmation
    document.addEventListener('DOMContentLoaded', () => {
      // Menu toggle
      const navToggle = document.getElementById('nav-toggle');
      const nav = document.getElementById('nav');
      if (navToggle && nav) navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        nav.setAttribute('aria-hidden', String(expanded));
      });

      // Theme handling — default: dark. Use `body.light` for light theme.
      const themeToggle = document.getElementById('theme-toggle');
      function applyTheme(theme){
        const isLight = theme === 'light';
        document.body.classList.toggle('light', isLight);
        if (themeToggle){
          // show moon icon when in light mode (to switch to dark), sun in dark mode
          themeToggle.textContent = isLight ? '🌙' : '☀️';
          themeToggle.setAttribute('aria-pressed', String(isLight));
        }
      }
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) applyTheme(savedTheme);
      else applyTheme('dark'); // default dark
      themeToggle && themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light');
        const next = isLight ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem('theme', next);
      });

      // Gallery & Search
      const galleryImages = Array.from(document.querySelectorAll('.gallery .grid img'));
      const searchInput = document.getElementById('search');
      function filterGallery(query){
        const q = String(query || '').trim().toLowerCase();
        let any = false;
        galleryImages.forEach(img => {
          const text = (img.alt || '').toLowerCase();
          const show = q === '' || text.includes(q);
          img.style.display = show ? 'block' : 'none';
          if (show) any = true;
        });
        let hint = document.getElementById('no-results-hint');
        if (!hint){
          hint = document.createElement('div');
          hint.id = 'no-results-hint';
          hint.style.padding = '1rem';
          hint.style.color = 'var(--muted)';
          hint.style.textAlign = 'center';
          const grid = document.querySelector('.gallery .grid');
          grid && grid.parentNode && grid.parentNode.appendChild(hint);
        }
        hint.textContent = any ? '' : 'No images match your search.';
        hint.style.display = any ? 'none' : 'block';
      }
      if (searchInput) searchInput.addEventListener('input', (e) => filterGallery(e.target.value));

      // Modal gallery
      const modal = document.getElementById('img-modal');
      const modalImg = document.getElementById('modal-img');
      const modalClose = document.getElementById('modal-close');
      const modalPrev = document.getElementById('modal-prev');
      const modalNext = document.getElementById('modal-next');
      const modalCaption = document.getElementById('modal-caption');
      const modalAutoplay = document.getElementById('modal-autoplay');
      let currentIndex = -1;
      let autoplayInterval = null;

      function openModalForIndex(i){
        const img = galleryImages[i];
        if (!img || !modal) return;
        modalImg.src = img.dataset.full || img.src;
        modalCaption.textContent = img.alt || `Image ${i+1}`;
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
      }
      function closeModal(){ if (!modal) return; modal.setAttribute('aria-hidden','true'); modalImg.src = ''; document.body.style.overflow = ''; stopAutoplay(); }
      function showNext(){ if (galleryImages.length===0) return; currentIndex = (currentIndex + 1) % galleryImages.length; openModalForIndex(currentIndex); }
      function showPrev(){ if (galleryImages.length===0) return; currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; openModalForIndex(currentIndex); }
      function startAutoplay(){ stopAutoplay(); if (modalAutoplay) modalAutoplay.setAttribute('aria-pressed','true'); autoplayInterval = setInterval(showNext, 2500); if (modalAutoplay) modalAutoplay.textContent = '⏸'; }
      function stopAutoplay(){ if (autoplayInterval) clearInterval(autoplayInterval); autoplayInterval = null; if (modalAutoplay) modalAutoplay.setAttribute('aria-pressed','false'); if (modalAutoplay) modalAutoplay.textContent = '▶'; }

      galleryImages.forEach((img, idx) => img.addEventListener('click', () => { currentIndex = idx; openModalForIndex(idx); }));
      modalClose && modalClose.addEventListener('click', closeModal);
      modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); if (e.key === 'ArrowRight') showNext(); if (e.key === 'ArrowLeft') showPrev(); });
      modalNext && modalNext.addEventListener('click', showNext);
      modalPrev && modalPrev.addEventListener('click', showPrev);
      modalAutoplay && modalAutoplay.addEventListener('click', () => { const playing = modalAutoplay.getAttribute('aria-pressed') === 'true'; if (playing) stopAutoplay(); else startAutoplay(); });

      // 3D cube demo: auto-rotates via CSS; no JS controls

      // Contact form with inline confirmation
      const form = document.getElementById('contact-form');
      const formConfirm = document.getElementById('form-confirm');
      function showConfirm(msg){
        if (!formConfirm){ alert(msg); return; }
        formConfirm.textContent = msg;
        formConfirm.classList.add('show');
        formConfirm.hidden = false;
        setTimeout(() => { formConfirm.classList.remove('show'); formConfirm.hidden = true; }, 4000);
      }
      if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()){ showConfirm('Please complete all fields before sending.'); return; }
        showConfirm('Thanks, ' + name.value.trim() + '! Your message has been sent.');
        form.reset();
      });

    });

  nav.setAttribute('aria-hidden', String(expanded));
});

// Theme toggle (dark / light) with persistence
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme){
  if(theme === 'dark'){
    document.body.classList.add('dark');
    if(themeToggle){ themeToggle.textContent = '☀️'; themeToggle.setAttribute('aria-pressed','true'); }
  } else {
    document.body.classList.remove('dark');
    if(themeToggle){ themeToggle.textContent = '🌙'; themeToggle.setAttribute('aria-pressed','false'); }
  }
}

// Initialize theme from localStorage or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.setAttribute('aria-hidden', String(expanded));
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme){
    if(theme === 'dark'){
      document.body.classList.add('dark');
      if(themeToggle){ themeToggle.textContent = '☀️'; themeToggle.setAttribute('aria-pressed','true'); }
    } else {
      document.body.classList.remove('dark');
      if(themeToggle){ themeToggle.textContent = '🌙'; themeToggle.setAttribute('aria-pressed','false'); }
    }
  }
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme) applyTheme(savedTheme);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Gallery & Search
  const galleryImages = Array.from(document.querySelectorAll('.gallery .grid img'));
  const searchInput = document.getElementById('search');
  function filterGallery(query){
    const q = String(query || '').trim().toLowerCase();
    let any = false;
    galleryImages.forEach(img => {
      const text = (img.alt || '').toLowerCase();
      const show = q === '' || text.includes(q);
      img.style.display = show ? 'block' : 'none';
      if(show) any = true;
    });
    let hint = document.getElementById('no-results-hint');
    if(!hint){
      hint = document.createElement('div');
      hint.id = 'no-results-hint';
      hint.style.padding = '1rem';
      hint.style.color = 'var(--muted)';
      hint.style.textAlign = 'center';
      const grid = document.querySelector('.gallery .grid');
      grid && grid.parentNode && grid.parentNode.appendChild(hint);
    }
    hint.textContent = any ? '' : 'No images match your search.';
    hint.style.display = any ? 'none' : 'block';
  }
  searchInput && searchInput.addEventListener('input', (e) => filterGallery(e.target.value));

  // Modal gallery
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const modalCaption = document.getElementById('modal-caption');
  const modalAutoplay = document.getElementById('modal-autoplay');
  let currentIndex = -1;
  let autoplayInterval = null;
  function openModalForIndex(i){
    const img = galleryImages[i]; if(!img) return;
    modalImg.src = img.dataset.full || img.src;
    modalCaption.textContent = img.alt || `Image ${i+1}`;
    modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function showNext(){ if(galleryImages.length===0) return; currentIndex=(currentIndex+1)%galleryImages.length; openModalForIndex(currentIndex); }
  function showPrev(){ if(galleryImages.length===0) return; currentIndex=(currentIndex-1+galleryImages.length)%galleryImages.length; openModalForIndex(currentIndex); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); modalImg.src=''; document.body.style.overflow=''; stopAutoplay(); }
  function startAutoplay(){ stopAutoplay(); modalAutoplay && modalAutoplay.setAttribute('aria-pressed','true'); autoplayInterval = setInterval(showNext,2500); if(modalAutoplay) modalAutoplay.textContent='⏸'; }
  function stopAutoplay(){ if(autoplayInterval) clearInterval(autoplayInterval); autoplayInterval=null; modalAutoplay && modalAutoplay.setAttribute('aria-pressed','false'); if(modalAutoplay) modalAutoplay.textContent='▶'; }
  galleryImages.forEach((img,idx)=> img.addEventListener('click', ()=>{ currentIndex=idx; openModalForIndex(currentIndex); }));
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); if(e.key==='ArrowRight') showNext(); if(e.key==='ArrowLeft') showPrev(); });
  modalNext && modalNext.addEventListener('click', showNext);
  modalPrev && modalPrev.addEventListener('click', showPrev);
  modalAutoplay && modalAutoplay.addEventListener('click', ()=>{ const playing = modalAutoplay.getAttribute('aria-pressed')==='true'; if(playing) stopAutoplay(); else startAutoplay(); });

  // 3D cube: simple, reliable controls
  const cubeAnim = document.getElementById('cubeAnim');
  const cubeToggle = document.getElementById('cube-toggle');
  const cubeTiltToggle = document.getElementById('cube-tilt-toggle');
  const cubeTilt = document.getElementById('cubeTilt');
  let pointerHandler = null;

  function setCubePaused(paused){ if(!cubeAnim) return; if(paused){ cubeAnim.classList.add('paused'); if(cubeToggle) cubeToggle.textContent='Play'; } else { cubeAnim.classList.remove('paused'); if(cubeToggle) cubeToggle.textContent='Pause'; } }
  cubeToggle && cubeToggle.addEventListener('click', () => { const isPaused = cubeAnim && cubeAnim.classList.contains('paused'); setCubePaused(!isPaused); });

  function enableTilt(){ if(!cubeTilt || !cubeAnim) return; setCubePaused(true); cubeAnim.style.transition='transform 120ms ease'; pointerHandler = function(e){ const rect=cubeTilt.getBoundingClientRect(); const px = e.clientX, py = e.clientY; if(px==null||py==null) return; const x=(px-rect.left)/rect.width-0.5; const y=(py-rect.top)/rect.height-0.5; const rx = (-y)*18, ry=(x)*18; cubeAnim.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; }; cubeTilt.addEventListener('pointermove', pointerHandler); cubeTilt.addEventListener('pointerleave', ()=>{ cubeAnim.style.transform=''; cubeAnim.style.transition=''; setCubePaused(false); }); }
  function disableTilt(){ if(!cubeTilt) return; if(pointerHandler) cubeTilt.removeEventListener('pointermove', pointerHandler); pointerHandler=null; if(cubeAnim){ cubeAnim.style.transform=''; cubeAnim.style.transition=''; setCubePaused(false); } }
  cubeTiltToggle && cubeTiltToggle.addEventListener('change', (e)=>{ if(e.target.checked) enableTilt(); else disableTilt(); });

  // contact form
  const form = document.getElementById('contact-form');
  if(form){ form.addEventListener('submit', (e)=>{ e.preventDefault(); const name=form.querySelector('#name'), email=form.querySelector('#email'), message=form.querySelector('#message'); if(!name.value.trim()||!email.value.trim()||!message.value.trim()){ alert('Please complete all fields before sending.'); return; } alert('Thanks, '+name.value.trim()+'! Your message is received (demo).'); form.reset(); }); }

});


function showNext(){
  if(galleryImages.length === 0) return;
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openModalForIndex(currentIndex);
}

function showPrev(){
  if(galleryImages.length === 0) return;
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openModalForIndex(currentIndex);
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalImg.src = '';
  document.body.style.overflow = '';
  stopAutoplay();
}

modalClose && modalClose.addEventListener('click', closeModal);
modal && modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
  if(e.key === 'ArrowRight') showNext();
  if(e.key === 'ArrowLeft') showPrev();
});

modalNext && modalNext.addEventListener('click', showNext);
modalPrev && modalPrev.addEventListener('click', showPrev);

function startAutoplay(){
  stopAutoplay();
  modalAutoplay && modalAutoplay.setAttribute('aria-pressed', 'true');
  autoplayInterval = setInterval(showNext, 2500);
  if(modalAutoplay) modalAutoplay.textContent = '⏸';
}

function stopAutoplay(){
  if(autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = null;
  modalAutoplay && modalAutoplay.setAttribute('aria-pressed', 'false');
  if(modalAutoplay) modalAutoplay.textContent = '▶';
}

modalAutoplay && modalAutoplay.addEventListener('click', () => {
  const playing = modalAutoplay.getAttribute('aria-pressed') === 'true';
  if(playing) stopAutoplay(); else startAutoplay();
});

// Simple contact form validation
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
      alert('Please complete all fields before sending.');
      return;
    }
    alert('Thanks, ' + name.value.trim() + '! Your message is received (demo).');
    form.reset();
  });
}});
