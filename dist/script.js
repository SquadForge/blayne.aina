
// Theme toggler with localStorage persistence
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
htmlEl.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Mobile sidebar drawer
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');

if (mobileMenuBtn && sidebar) {
  const setMenuOpen = (open) => {
    sidebar.classList.toggle('open', open);
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
  };

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(!sidebar.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
  });
}

// Reading progress bar
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
    }
  });
}

const caseExplorer = document.querySelector('[data-case-explorer]');
if (caseExplorer) {
  const tabs = Array.from(document.querySelectorAll('.case-tab[data-case]'));
  const panels = Array.from(caseExplorer.querySelectorAll('[data-case-panel]'));
  const activateCase = (key, moveFocus = false) => {
    tabs.forEach(tab => {
      const active = tab.dataset.case === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.casePanel !== key; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateCase(tab.dataset.case));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        activateCase(tabs[next].dataset.case, true);
      }
    });
  });
  activateCase('a');
}

const copyText = async text => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
};

document.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const original = button.textContent;
  try {
    await copyText(button.dataset.copy);
    button.textContent = 'COPIED';
    button.classList.add('copied');
  } catch {
    button.textContent = 'COPY FAILED';
  }
  window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove('copied');
  }, 1600);
});

const searchDialog = document.getElementById('quickSearchDialog');
const searchButton = document.getElementById('quickSearchBtn');
const searchInput = document.getElementById('quickSearchInput');
const searchClose = document.getElementById('quickSearchClose');
if (searchDialog && searchInput) {
  const openSearch = () => {
    if (typeof searchDialog.showModal === 'function') searchDialog.showModal();
    else searchDialog.setAttribute('open', '');
    searchInput.value = '';
    searchDialog.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = false; });
    searchInput.focus();
  };
  const closeSearch = () => {
    if (typeof searchDialog.close === 'function') searchDialog.close();
    else searchDialog.removeAttribute('open');
  };
  if (searchButton) searchButton.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  searchDialog.addEventListener('click', event => {
    if (event.target === searchDialog) closeSearch();
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchDialog.open ? closeSearch() : openSearch();
    }
  });
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchDialog.querySelectorAll('[data-search-item]').forEach(item => {
      item.hidden = query.length > 0 && !item.textContent.toLowerCase().includes(query);
    });
  });
}

document.querySelectorAll('[data-domain]').forEach(button => {
  button.addEventListener('click', () => {
    const domain = button.dataset.domain;
    document.querySelectorAll('[data-domain]').forEach(control => {
      control.classList.toggle('active', control === button);
    });
    document.querySelectorAll('[data-domain-card]').forEach(card => {
      card.classList.toggle('highlight', card.dataset.domainCard === domain);
    });
  });
});

const reviewBlocks = document.querySelectorAll('details.review-subsection');
if (reviewBlocks.length) {
  const openReviewTarget = () => {
    reviewBlocks.forEach(block => { block.open = window.location.hash === '#' + block.id; });
  };
  openReviewTarget();
  window.addEventListener('hashchange', openReviewTarget);
}

const quickDock = document.querySelector('.quick-dock');
if (quickDock) {
  const updateDock = () => quickDock.classList.toggle('visible', window.scrollY > 320);
  updateDock();
  window.addEventListener('scroll', updateDock, { passive: true });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.presentation-wrapper .article-body > section, .presentation-wrapper .article-body > aside, .presentation-wrapper .article-body > .proof-overview, .presentation-wrapper .article-body > .articles-grid, .presentation-wrapper .article-body > .commercial-callout');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  revealTargets.forEach(target => {
    if (target.getBoundingClientRect().top > window.innerHeight * 0.82) {
      target.classList.add('reveal', 'reveal-pending');
      observer.observe(target);
    }
  });
}
