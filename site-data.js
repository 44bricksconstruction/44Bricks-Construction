// 44 BRICKS — shared site data, form submission, and scroll effects.
(function () {
  const I = (n) => 'assets/img' + n + '.jpg';
  const PAGES = {
    home: '44%20Bricks%20Website.dc.html',
    about: 'About.dc.html',
    services: 'Services.dc.html',
    projects: 'Projects.dc.html',
    project: 'Project.dc.html',
    team: 'Team.dc.html',
    privacy: 'Privacy.dc.html',
    hub: 'Hub.dc.html',
    contact: 'Contact.dc.html',
  };
  const ph = (img, title, text, label, alt) => ({ img: I(img), title, text, label, alt: alt || title });

  const PROJECTS = [
    {
      slug: 'nakos-place', name: 'NAKOS Place', type: 'Mixed-use commercial', status: 'Delivered',
      cover: I(32), scope: 'Three storeys · retail, showrooms, apartments & offices',
      summary: 'A modern three-storey mixed-use building with retail below and apartments and offices above.',
      blurb: 'NAKOS Place is a modern three-storey mixed-use building: ground-floor retail and showroom spaces topped by two levels of sleek apartments and offices. Crisp white render, a bold lime-green accent band, dark timber slats, and vertical NAKOS signage make it a landmark on a main route serving an expanding residential community.',
      video: { src: 'videos/nakos_place.mp4', thumb: I(39), len: '01:01' },
      gallery: [I(33), I(34), I(35), I(37)],
      interest: 'NAKOS Place — retail / showroom unit',
      phases: [
        ph(4, 'Mobilization & setting out', 'The site is cleared, hoarded, and set out — materials arrive and reference lines go down.', 'Set out'),
        ph(5, 'Excavation', 'Foundation trenches are excavated to the engineer’s grid.', 'Excavate'),
        ph(6, 'Foundation blockwork', 'Footings and foundation walls rise, block by block.', 'Foundations'),
        ph(7, 'Substructure & waterproofing', 'Ground beams and chambers are formed and sealed.', 'Substructure'),
        ph(8, 'Backfilling', 'Laterite fill is placed and compacted over the substructure.', 'Backfill'),
        ph(9, 'Ground floor & columns', 'Reinforced concrete columns stand on the ground slab.', 'Columns'),
        ph(10, 'First-floor slab', 'Decking, reinforcement, and propping for the upper slab.', 'Slab'),
        ph(11, 'Structural shell', 'Blockwork to full height and the roof structure installed.', 'Shell'),
        ph(34, 'Cladding & finishes', 'The signature green facade, glazing, and balconies go on.', 'Cladding'),
        ph(32, 'Delivered', 'NAKOS Place handed over — a lively, stylish hub for lifestyle and business.', 'Delivered'),
      ],
    },
    {
      slug: 'villa-adel', name: 'Villa Adel', type: 'Private residence', status: 'Delivered',
      cover: I(36), scope: 'Four bedrooms · pool, office & gym',
      summary: 'A four-bedroom home with a pool, office space, and gym.',
      blurb: 'Villa Adel is a four-bedroom home featuring a pool, office space, and a gym — the perfect blend of space, comfort, and flexibility. A place to make lasting memories in a home that truly fits its owners’ lifestyle.',
      video: { src: 'videos/villa_adel.mp4', thumb: I(40), len: '00:38' },
      gallery: [I(21), I(20), I(15)],
      interest: 'A home like Villa Adel',
      phases: [
        ph(12, 'Setting out', 'The villa’s floor plan is chalked full-size on the cleared plot.', 'Set out'),
        ph(13, 'Excavation', 'Foundation trenches cut to the setting-out lines.', 'Excavate'),
        ph(14, 'Foundation blockwork', 'The crew lays the villa’s footings and foundation walls.', 'Foundations'),
        ph(15, 'Foundation grid complete', 'Every room already legible from the air.', 'Grid'),
        ph(16, 'Waterproofing & backfill', 'The substructure is sealed and filled ready for the slab.', 'Backfill'),
        ph(17, 'Ground-floor walls', 'Rooms take shape — living spaces, office, and gym below.', 'Walls'),
        ph(18, 'First-floor decking', 'Reinforcement laid for the upper floor’s four bedrooms.', 'Decking'),
        ph(19, 'Upper-floor walls', 'Blockwork and columns rise to the top plate.', 'Upper walls'),
        ph(20, 'Structural shell', 'The full two-storey form stands complete in scaffolding.', 'Shell'),
        ph(21, 'Rendering & glazing', 'Render coat on, glazing in, and the glass balcony fitted.', 'Render'),
        ph(36, 'Delivered', 'A modern four-bedroom home with pool, office, and gym.', 'Delivered'),
      ],
    },
    {
      slug: 'nakos-courts', name: 'NAKOS Courts', type: 'Townhouse development', status: 'Ongoing',
      cover: I(38), scope: 'Four two-bedroom townhouses · RC frame',
      summary: 'Four contemporary double-storey, two-bedroom townhouses — setting out complete.',
      blurb: 'NAKOS Courts is a row of four contemporary double-storey, two-bedroom townhouses on a reinforced concrete frame: private timber-door entries, full-height glazed living areas, and upper bedroom suites opening onto recessed balconies with glass balustrades under warm timber-lined soffits. Smooth off-white render meets natural stone-clad garden walls.',
      video: { src: 'videos/nakos_courts.mp4', thumb: I(41), len: '00:40' },
      gallery: [I(24), I(23)],
      interest: 'NAKOS Courts — two-bedroom townhouse',
      phases: [
        ph(22, 'Setting out — happening now', 'The four-unit row is chalked full-size on the cleared plot; footings and the frame come next.', 'Set out'),
        ph(23, 'Groundworks commencing', 'Materials staged and the site prepared for excavation and the structural frame.', 'Groundworks'),
        ph(38, 'The design — street elevation', 'Off-white render and stone-clad planters, one unified facade rhythm.', 'Design'),
        ph(24, 'The design — the residences', 'Recessed balconies, glass balustrades, and timber-lined soffits crown each unit.', 'Residences'),
      ],
    },
    {
      slug: 'project-x', name: 'Project X', type: 'Residential renovation', status: 'Ongoing',
      cover: I(30), scope: 'Four-bedroom remodel · structural rework',
      summary: 'Transforming an existing residence into a striking contemporary home.',
      blurb: 'Project X is a four-bedroom renovation transforming an existing residence into a striking contemporary home: a dark charcoal-rendered volume with a stone-clad feature wing, vertical timber-look screening, a cantilevered entry canopy, and a light-toned garage pavilion unified under one flat-roof datum. Renovation is one of our core capabilities — reworking what exists into something remarkable.',
      video: { src: 'videos/project_x.mp4', thumb: I(42), len: '00:49' },
      gallery: [I(31), I(29)],
      interest: 'A renovation like Project X',
      phases: [
        ph(25, 'Selective demolition', 'The existing home is carefully opened up — structure exposed for reinforcement.', 'Demolition'),
        ph(26, 'Strip-out & retained structure', 'The old fabric stripped back to what stays, ready for the new plan.', 'Strip-out'),
        ph(27, 'New walls off the existing slab', 'Blockwork rises around retained walls as the new layout takes shape.', 'New walls'),
        ph(28, 'Structural rework & roof', 'Upper walls complete and roof battens go on over the reinforced frame.', 'Roof'),
        ph(29, 'Render & feature walls', 'The new envelope is rendered smooth, ready for cladding and screening.', 'Render'),
        ph(30, 'The design — the vision', 'A charcoal volume with stone-clad wing and timber screening against mature palms.', 'Vision'),
        ph(31, 'The design — entrance elevation', 'The cantilevered canopy and slatted screen that will greet you home.', 'Entrance'),
      ],
    },
  ];

  const SERVICES = [
    { slug: 'residential', no: '01', sector: 'Construction', title: 'Residential Construction', img: I(36), project: 'villa-adel',
      summary: 'Quality homes and residential developments, from foundation to finishing.',
      detail: 'From single family homes to multi-unit developments, we manage the full build — setting out, substructure, frame, envelope, and finishes — with one accountable team and regular client walkthroughs.',
      includes: ['Private homes & villas', 'Townhouse & estate developments', 'Structural frame & blockwork', 'Finishes, fit-out & external works'] },
    { slug: 'commercial', no: '02', sector: 'Construction', title: 'Commercial Development', img: I(33), project: 'nakos-place',
      summary: 'Office, retail, and mixed-use buildings built for business.',
      detail: 'Buildings that work as hard as the businesses inside them — durable structures, efficient layouts, and facades that give a development presence on the street.',
      includes: ['Mixed-use & retail buildings', 'Office developments', 'Commercial shells & fit-outs', 'Signage & facade detailing'] },
    { slug: 'industrial', no: '03', sector: 'Construction', title: 'Industrial Infrastructure', img: null, project: null,
      summary: 'Facilities and structures engineered for demanding operations.',
      detail: 'Robust facilities designed around operational requirements — heavy-duty slabs, clear-span structures, and site infrastructure that keeps operations running.',
      includes: ['Warehouses & workshops', 'Industrial slabs & foundations', 'Site access & hardstanding', 'Utility connections'] },
    { slug: 'water', no: '04', sector: 'Infrastructure', title: 'Water Management', img: null, project: null,
      summary: 'Supply, distribution, and drainage systems that communities rely on.',
      detail: 'Water supply, distribution, and drainage works that protect buildings and serve communities — planned for reliability and long-term maintenance.',
      includes: ['Water supply systems', 'Distribution networks', 'Storm drainage & culverts', 'Storage & treatment works'] },
    { slug: 'urban', no: '05', sector: 'Infrastructure', title: 'Urban Development', img: I(35), project: null,
      summary: 'Civil works and planning that shape growing neighbourhoods.',
      detail: 'Roads, civil works, and site planning for growing communities — supported by in-house GIS expertise for spatial planning and survey.',
      includes: ['Roads & civil works', 'Site planning & GIS', 'Estate infrastructure', 'Public-sector works'] },
    { slug: 'energy', no: '06', sector: 'Energy', title: 'Renewable Energy', img: null, project: null,
      summary: 'Sustainable energy infrastructure for a lower-carbon future.',
      detail: 'Renewable energy projects and sustainable infrastructure solutions that reduce running costs and environmental impact for homes, businesses, and communities.',
      includes: ['Renewable energy projects', 'Sustainable infrastructure solutions', 'Energy-efficient building design', 'Integration with new builds'] },
    { slug: 'project-management', no: '07', sector: 'Project Services', title: 'Project Management', img: I(43), project: null,
      summary: 'Planning, supervision, and design coordination on client-led builds.',
      detail: 'Already have a design or a contractor? We plan, supervise, and coordinate so your build stays on schedule, on budget, and to specification.',
      includes: ['Project planning & scheduling', 'Construction supervision', 'Design coordination', 'General contracting & consultancy'] },
    { slug: 'renovation', no: '08', sector: 'Project Services', title: 'Renovation & Maintenance', img: I(29), project: 'project-x',
      summary: 'Refurbishment and upkeep that extend the life of every structure.',
      detail: 'From structural rework to full remodels, we transform existing buildings — and keep them performing with planned maintenance after handover.',
      includes: ['Remodels & extensions', 'Structural repair & rework', 'Refurbishment', 'Planned maintenance'] },
  ];

  const TEAM = [
    { name: 'Ronald Etornam Gamor', role: 'Chief Executive Officer', img: I(46), bio: 'Founder and CEO of 44 BRICKS, Ronald leads company strategy, client relationships, and overall project direction — setting the standard of quality and reliability the company is built on.' },
    { name: 'Oliver Tei-Mensah Ackam', role: 'Chief Operating Officer', img: I(47), bio: 'As COO, Oliver oversees day-to-day operations and site execution across every active project, keeping builds on schedule, on budget, and to specification.' },
    { name: 'Awuakye Danful', role: 'Administrator', img: I(48), bio: 'Awuakye manages administration, coordination, and internal operations — the organisational backbone that keeps projects and people running smoothly.' },
    { name: 'Joseph Adjaloko', role: 'GIS Consultant', img: I(49), bio: 'Joseph provides technical and geographic expertise, bringing GIS and spatial insight to urban development and infrastructure projects.' },
  ];

  // ---- Google Analytics: paste your Measurement ID (e.g. 'G-ABC123XYZ') to switch tracking on. ----
  const GA_ID = 'G-F08GTNKPEC';
  if (GA_ID && window.top === window && !window.__b44ga) {
    window.__b44ga = true;
    if (!window.gtag) {
      const g = document.createElement('script'); g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.appendChild(g);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
      gtag('js', new Date()); gtag('config', GA_ID);
    }
    document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href]'); if (!a) return; const h = a.getAttribute('href') || ''; const t = /wa\.me|whatsapp/.test(h) ? 'whatsapp' : /^tel:/.test(h) ? 'phone' : /^mailto:/.test(h) ? 'email' : /instagram|youtube/.test(h) ? 'social' : null; if (t) gtag('event', 'contact_click', { method: t }); }, true);
  }
  const EMAIL = 'info@44bricksconstruction.com';
  const EMAIL2 = '44bricksconstruction@gmail.com';
  const WHATSAPP = '233543100015';
  const PHONE = '+233 543 100 015';

  async function submit(form) {
    if (form.__b44busy) return { ok: false, msg: 'Sending…' };
    const hp = form.elements['_honey'];
    if (hp && hp.value) return { ok: true, msg: 'Thank you.' };
    if (!form.checkValidity()) { form.reportValidity(); return { ok: false, msg: '' }; }
    const data = new FormData(form);
    data.set('_page', document.title + ' — ' + location.href);
    const fallback = () => {
      const lines = [];
      data.forEach((v, k) => { if (!k.startsWith('_') && v) lines.push(k.replace(/_/g, ' ') + ': ' + v); });
      window.location.href = 'mailto:' + EMAIL + ',' + EMAIL2 + '?subject=' + encodeURIComponent(data.get('_subject') || 'Website enquiry') + '&body=' + encodeURIComponent(lines.join('\n'));
      return { ok: true, msg: 'Opening your email app to send this — just press send.', mailto: true };
    };
    let r, j = {};
    form.__b44busy = true;
    try { r = await fetch(form.getAttribute('action') || 'contact.php', { method: 'POST', body: data, headers: { Accept: 'application/json' } }); j = await r.json().catch(() => ({})); }
    catch (e) { form.__b44busy = false; return fallback(); }
    form.__b44busy = false;
    if (r.ok && j.ok !== false) {
      form.reset();
      try { const log = JSON.parse(localStorage.getItem('b44_sent') || '[]'); log.push({ ref: j.ref, subject: data.get('_subject'), at: Date.now() }); localStorage.setItem('b44_sent', JSON.stringify(log.slice(-10))); } catch (e) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { form: data.get('_subject') }); } catch (e) {}
      return { ok: true, ref: j.ref || '', msg: 'Sent — reference ' + (j.ref || '') + '. A confirmation is on its way to your inbox; we’ll reply within one working day.' };
    }
    if (r.status === 422 || r.status === 429) return { ok: false, msg: j.error || 'Please check the form and try again.' };
    return fallback();
  }

  // Scroll reveal, counters, and pointer tilt. Safe to call repeatedly.
  function fx(root) {
    root = root || document;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fx.io) fx.io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      fx.io.unobserve(e.target);
      e.target.style.opacity = '1'; e.target.style.translate = '0 0';
    }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    if (!fx.cio) fx.cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count; fx.cio.unobserve(el);
      const t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / 1100, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      el.textContent = '0'; requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    if (!reduced) root.querySelectorAll('[data-rv]').forEach((el) => {
      if (el.__rv) return; el.__rv = 1;
      if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
      el.style.opacity = '0'; el.style.translate = '0 26px';
      el.style.transition = (el.style.transition ? el.style.transition + ',' : '') + 'opacity .7s ease, translate .7s ease';
      fx.io.observe(el);
    });
    if (!reduced) root.querySelectorAll('[data-count]').forEach((el) => { if (el.__cnt) return; el.__cnt = 1; fx.cio.observe(el); });
    if (!reduced && !matchMedia('(hover:none)').matches) root.querySelectorAll('[data-tilt]').forEach((el) => {
      if (el.__tilt) return; el.__tilt = 1;
      el.style.transition = (el.style.transition ? el.style.transition + ',' : '') + 'transform .18s ease';
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; el.style.transform = 'perspective(760px) rotateY(' + (px * 6).toFixed(2) + 'deg) rotateX(' + (-py * 6).toFixed(2) + 'deg) translateZ(6px)'; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    if (!reduced) bricks.scan(root);
  }

  // ---- Brick animations: page-transition wall, brick reveals, build-progress column, click bursts.
  // All overlays live on <body> (outside page components) and are removed when done.
  const BC = ['#003399', '#0A1A3C', '#123E9E', '#C9972C'];
  const bricks = (() => {
    const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mk = (css) => { const d = document.createElement('div'); d.setAttribute('aria-hidden', 'true'); d.style.cssText = css; return d; };
    const color = (r, c) => ((r * 7 + c * 3) % 11 === 0 ? BC[3] : BC[(r + c) % 2 ? 0 : 2]);

    // Full-screen wall. dir 'in' = bricks drop in course by course (bottom up); 'out' = bricks lift away (top down).
    function wall(dir, done) {
      const W = innerWidth, H = innerHeight, bw = W < 700 ? 72 : 120, bh = bw * 0.42, g = 3;
      const rows = Math.ceil(H / (bh + g)) + 1, cols = Math.ceil(W / (bw + g)) + 2;
      const box = mk('position:fixed;inset:0;z-index:2147483000;pointer-events:' + (dir === 'in' ? 'all' : 'none') + ';overflow:hidden;background:' + (dir === 'out' ? '#0A1A3C' : 'transparent') + ';transition:background .2s');
      const els = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const b = mk('position:absolute;left:' + (c * (bw + g) - (r % 2 ? bw / 2 : 0) - g) + 'px;top:' + (H - (r + 1) * (bh + g)) + 'px;width:' + bw + 'px;height:' + bh + 'px;background:' + color(r, c) + ';transition:transform .42s cubic-bezier(.3,.7,.2,1),opacity .42s');
        const delay = (dir === 'in' ? r * 34 : (rows - r) * 30) + (c % 3) * 14;
        b.style.transitionDelay = delay + 'ms';
        if (dir === 'in') { b.style.transform = 'translateY(-' + (H + 60) + 'px)'; }
        box.appendChild(b); els.push(b);
      }
      if (dir === 'out') { const m = mk('position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;background:#0A1A3C url(assets/img2.png) center/cover;transition:opacity .3s,transform .4s'); box.appendChild(m); els.push(m); }
      document.body.appendChild(box);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (dir === 'out') box.style.background = 'transparent';
        els.forEach((b) => { b.style.transform = dir === 'in' ? 'translateY(0)' : 'translateY(-' + (H + 80) + 'px)'; if (dir === 'out') b.style.opacity = '0'; });
      }));
      const total = rows * 34 + 520;
      setTimeout(() => { if (dir === 'out') box.remove(); done && done(box); }, total);
      return box;
    }

    function transitions() {
      if (sessionStorage.getItem('b44wall') === '1') { sessionStorage.removeItem('b44wall'); if (!reduced()) wall('out'); }
      addEventListener('pageshow', (e) => { if (e.persisted) document.querySelectorAll('[data-b44wall]').forEach((n) => n.remove()); });
      document.addEventListener('click', (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || reduced()) return;
        const a = e.target.closest && e.target.closest('a[href]');
        if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin || !/\.html$/.test(url.pathname)) return;
        if (url.pathname === location.pathname && url.search === location.search) return;
        e.preventDefault();
        sessionStorage.setItem('b44wall', '1');
        const box = wall('in', () => { location.href = url.href; });
        box.setAttribute('data-b44wall', '');
      }, true);
    }

    // Brick reveal: a brick grid covers an image/heading, then bricks drop away in a stagger as it enters view.
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; io.unobserve(e.target); reveal(e.target);
    }), { threshold: 0.25 }) : null;
    function reveal(el) {
      const r = el.getBoundingClientRect(); if (r.width < 40 || r.height < 20) return;
      const isText = /^H[1-3]$/.test(el.tagName);
      const bw = isText ? Math.max(28, Math.min(54, r.height * 0.9)) : Math.max(44, Math.min(110, r.width / 6)), bh = bw * 0.45;
      const rows = Math.ceil(r.height / bh), cols = Math.ceil(r.width / bw) + 1;
      const box = mk('position:absolute;left:' + (r.left + scrollX) + 'px;top:' + (r.top + scrollY) + 'px;width:' + r.width + 'px;height:' + r.height + 'px;overflow:hidden;pointer-events:none;z-index:30');
      const bg = isText ? (getComputedStyle(document.body).backgroundColor) : null;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const b = mk('position:absolute;left:' + (x * bw - (y % 2 ? bw / 2 : 0)) + 'px;top:' + (y * bh) + 'px;width:' + (bw + 1) + 'px;height:' + (bh + 1) + 'px;background:' + (isText ? (x + y) % 5 === 0 ? BC[3] : BC[0] : color(y, x)) + ';box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);transition:transform .55s cubic-bezier(.5,0,.7,.4),opacity .55s');
        b.style.transitionDelay = ((rows - y) * 45 + ((x * 37) % 5) * 30) + 'ms';
        box.appendChild(b);
      }
      document.body.appendChild(box);
      requestAnimationFrame(() => requestAnimationFrame(() => box.childNodes.forEach((b, i) => { b.style.transform = 'translateY(' + (r.height + 40) + 'px) rotate(' + ((i % 7) - 3) * 4 + 'deg)'; b.style.opacity = '0'; })));
      setTimeout(() => box.remove(), rows * 45 + 900);
    }
    function scan(root) {
      if (!io) return;
      (root || document).querySelectorAll('main img, section img, section [role="img"], [data-bricks], section h2').forEach((el) => {
        if (el.__brk || el.closest('[data-no-bricks],header,footer,#top,[aria-label="Our team on site"]')) return; el.__brk = 1;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.85 && r.bottom > 0) return;
        io.observe(el);
      });
    }

    // Build-progress column: bricks stack up the right edge as the page scrolls.
    function column() {
      if (innerWidth < 640) return;
      const N = 16, col = mk('position:fixed;right:10px;bottom:160px;z-index:45;display:flex;flex-direction:column-reverse;gap:3px;pointer-events:none');
      const bs = [];
      for (let i = 0; i < N; i++) { const b = mk('width:14px;height:7px;background:' + (i === N - 1 ? BC[3] : BC[0]) + ';opacity:.12;transform:translateX(' + (i % 2 ? 3 : 0) + 'px) scaleX(.6);transition:opacity .25s,transform .35s cubic-bezier(.3,1.6,.5,1)'); col.appendChild(b); bs.push(b); }
      document.body.appendChild(col);
      const upd = () => { const max = document.documentElement.scrollHeight - innerHeight; const n = max > 0 ? Math.round((scrollY / max) * N) : 0; bs.forEach((b, i) => { const on = i < n; b.style.opacity = on ? '1' : '.12'; b.style.transform = 'translateX(' + (i % 2 ? 3 : 0) + 'px) scaleX(' + (on ? 1 : .6) + ')'; }); };
      addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    }

    // Click burst: small bricks pop from buttons and CTAs.
    function bursts() {
      document.addEventListener('pointerdown', (e) => {
        if (reduced()) return;
        const t = e.target.closest && e.target.closest('button,a[href^="Contact"],a[href*="#start"],a[href^="Team"],[type=submit]');
        if (!t) return;
        for (let i = 0; i < 7; i++) {
          const a = (Math.PI * 2 * i) / 7 + Math.random() * 0.5, d = 34 + Math.random() * 26;
          const b = mk('position:fixed;left:' + (e.clientX - 5) + 'px;top:' + (e.clientY - 2.5) + 'px;width:10px;height:5px;z-index:2147482000;pointer-events:none;background:' + BC[i % 4 === 3 ? 3 : 0] + ';transition:transform .55s cubic-bezier(.2,.8,.3,1),opacity .55s');
          document.body.appendChild(b);
          requestAnimationFrame(() => { b.style.transform = 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d + 18) + 'px) rotate(' + (a * 90) + 'deg)'; b.style.opacity = '0'; });
          setTimeout(() => b.remove(), 600);
        }
      }, true);
    }

    // WhatsApp: links are real <a target="_blank"> to wa.me, so the browser opens WhatsApp in a NEW top-level tab
    // (WhatsApp refuses to load inside frames). On phones we hand off to the app first.
    // Inside an embedded preview where new tabs are blocked, show the number instead of a broken frame.
    function whatsapp() {
      const PHONE_DISPLAY = '+233 54 310 0015';
      function card(link) {
        let el = document.getElementById('b44-wa');
        if (el) el.remove();
        el = mk('position:fixed;left:16px;right:16px;bottom:80px;margin:0 auto;max-width:420px;z-index:2147483600;background:#0A1A3C;color:#fff;padding:20px 22px;border:1px solid rgba(255,255,255,.2);box-shadow:0 12px 40px rgba(10,26,60,.45);font-family:inherit');
        el.id = 'b44-wa'; el.removeAttribute('aria-hidden'); el.setAttribute('role', 'dialog');
        el.innerHTML = '<p style="font-family:IBM Plex Mono,monospace;font-size:11px;letter-spacing:.14em;color:#E3B75B;margin:0 0 8px">CHAT ON WHATSAPP</p>'
          + '<p style="font-size:24px;font-weight:700;margin:0 0 6px">' + PHONE_DISPLAY + '</p>'
          + '<p style="font-size:14px;color:#C3CDE2;margin:0 0 14px">Your browser blocked opening WhatsApp here. Open it in a new tab, or save the number and message us in the app.</p>'
          + '<div style="display:flex;flex-wrap:wrap;gap:8px"><a href="' + link + '" target="_blank" rel="noopener" style="background:#C9972C;color:#0A1A3C;font-weight:600;padding:10px 16px;text-decoration:none">Open WhatsApp</a>'
          + '<button type="button" data-copy style="cursor:pointer;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5);padding:10px 16px;font:inherit;font-weight:600">Copy number</button>'
          + '<button type="button" data-close aria-label="Close" style="cursor:pointer;margin-left:auto;background:transparent;color:#C3CDE2;border:0;font:inherit;font-size:20px;padding:6px 10px">×</button></div>';
        document.body.appendChild(el);
        el.querySelector('[data-close]').onclick = () => el.remove();
        el.querySelector('[data-copy]').onclick = (ev) => { try { navigator.clipboard.writeText(PHONE_DISPLAY); ev.target.textContent = 'Copied'; } catch (err) {} };
      }
      document.addEventListener('click', (e) => {
        const a = e.target.closest && e.target.closest('a[href*="wa.me/"],a[href*="api.whatsapp.com"],a[href*="web.whatsapp.com"]');
        if (!a || a.closest('#b44-wa')) return;
        const u = new URL(a.href);
        const phone = (u.pathname.match(/\d{8,}/) || [u.searchParams.get('phone') || '233543100015'])[0];
        const text = u.searchParams.get('text') || '';
        const link = 'https://wa.me/' + phone + (text ? '?text=' + encodeURIComponent(text) : '');
        a.href = link; a.target = '_blank'; a.rel = 'noopener';
        const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (mobile && window.top === window) {
          e.preventDefault();
          const t0 = Date.now();
          location.href = 'whatsapp://send?phone=' + phone + (text ? '&text=' + encodeURIComponent(text) : '');
          setTimeout(() => { if (!document.hidden && Date.now() - t0 < 2500) location.href = link; }, 1400);
          return;
        }
        if (window.top !== window) {
          // embedded: try a new tab; if the embed blocks popups, show the number card instead of navigating the frame
          e.preventDefault();
          let w = null; try { w = window.open(link, '_blank'); } catch (err) {}
          if (!w) card(link);
        }
        // top-level desktop: let the native target=_blank link open wa.me in a new tab
      }, true);
    }

    // Floating contact dock — mounted on <body> so position:fixed is always relative to the viewport.
    function dock() {
      if (document.getElementById('b44-dock') || (window.top !== window && /Brand/.test(decodeURIComponent(location.pathname)))) return;
      const WA = 'https://wa.me/233543100015?text=' + encodeURIComponent("Hello 44 BRICKS, I'd like a construction quote.");
      const ico = {
        wa: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"/></svg>',
        ig: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM21.9 7.1a5.8 5.8 0 0 0-1.6-4.1 5.8 5.8 0 0 0-4.1-1.6C14.6 1.3 9.4 1.3 7.8 1.4a5.8 5.8 0 0 0-4.1 1.6A5.8 5.8 0 0 0 2.1 7c-.1 1.6-.1 6.8 0 8.4a5.8 5.8 0 0 0 1.6 4.1 5.8 5.8 0 0 0 4.1 1.6c1.6.1 6.8.1 8.4 0a5.8 5.8 0 0 0 4.1-1.6 5.8 5.8 0 0 0 1.6-4.1c.1-1.6.1-6.8 0-8.3Zm-2.1 10.1a3.3 3.3 0 0 1-1.9 1.9c-1.3.5-4.4.4-5.9.4s-4.6.1-5.9-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9A3.3 3.3 0 0 1 6.1 3.5c1.3-.5 4.4-.4 5.9-.4s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.9 1.9c.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9Z"/></svg>',
        yt: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15V9l5.8 3-5.8 3Z"/></svg>'
      };
      const d = document.createElement('a');
      d.id = 'b44-dock';
      d.href = WA; d.target = '_blank'; d.rel = 'noopener';
      d.setAttribute('aria-label', 'Chat with 44 BRICKS on WhatsApp');
      d.style.cssText = 'position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:2147482500;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#25D366;color:#fff;box-shadow:0 8px 24px rgba(10,26,60,.35);transition:transform .15s';
      d.innerHTML = ico.wa.replace('width="20" height="20"', 'width="30" height="30"');
      d.addEventListener('pointerenter', () => { d.style.transform = 'scale(1.06)'; });
      d.addEventListener('pointerleave', () => { d.style.transform = ''; });
      document.body.appendChild(d);
    }

    function init() {
      if (!init.wa) { init.wa = 1; whatsapp(); dock(); }
      if (init.done || window.top !== window && /Brand%20Film|Brand Film/.test(location.pathname)) return; init.done = 1;
      transitions();
      if (reduced()) return;
      column(); bursts();
      setTimeout(() => scan(document), 400);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
    return { wall, reveal, scan };
  })();

  const qs = (k) => new URLSearchParams(location.search).get(k);
  window.B44 = { PAGES, PROJECTS, SERVICES, TEAM, EMAIL, PHONE, submit, fx, qs, bricks, EMAIL2, WHATSAPP,
    project: (slug) => PROJECTS.find((p) => p.slug === slug) || PROJECTS[0],
    projectUrl: (slug) => PAGES.project + '?p=' + slug };
})();
