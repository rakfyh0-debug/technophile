// partials.js — Injection des éléments partagés (rail latéral)
(function () {
  const ICONS = [
    { id: 'home',     href: 'index.html',    svg: '<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>' },
    { id: 'profile',  href: 'profile.html',  svg: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>' },
    { id: 'projects', href: 'projects.html', svg: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
    { id: 'stats',    href: 'stats.html',    svg: '<path d="M4 20V10"/><path d="M12 20V4"/><path d="M20 20v-7"/>' },
    { id: 'database', href: 'database.html', svg: '<ellipse cx="12" cy="5" rx="7" ry="2.5"/><path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>' },
    { id: 'settings', href: 'settings.html', svg: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2.6-1.5L14 2h-4l-.4 2.5a7.6 7.6 0 0 0-2.6 1.5l-2.4-1-2 3.4 2 1.6a7.7 7.7 0 0 0 0 3l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 2.6 1.5L10 22h4l.4-2.5a7.6 7.6 0 0 0 2.6-1.5l2.4 1 2-3.4-2-1.6Z"/>' },
  ];
  const DECOR = [
    '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 15l-5-5-9 9"/>',
    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
  ];
  const mk = (href, svg, active) =>
    `<div class="rail-icon${active ? ' active' : ''}"${href ? ` style="cursor:pointer;" onclick="location.href='${location.pathname.includes('/logique-algo/') ? '../' : ''}${href}'"` : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${svg}</svg></div>`;

  function injectRail() {
    const page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
    const activeId = { index: 'home', login: 'home', signup: 'home' }[page] || page;
    const html = ICONS.map(i => mk(i.href, i.svg, i.id === activeId)).join('')
               + '<div class="rail-spacer"></div>'
               + DECOR.map(svg => mk(null, svg, false)).join('')
               + mk('settings.html', ICONS[5].svg, false);
    document.querySelectorAll('.rail').forEach(el => {
      if (el.dataset.injected) return;
      el.innerHTML = html;
      el.dataset.injected = '1';
    });
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', injectRail)
    : injectRail();
})();
