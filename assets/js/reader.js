/**
 * ==========================================================================
 * FORENSIC BIOLOGICAL IDENTIFICATION - INTERACTIVE BOOK READER ENGINE
 * Pure Vanilla JavaScript - 100% Offline Standalone Architecture
 * ==========================================================================
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentView: 'cover', // 'cover', 'ch00'..'ch12', 'glossary', 'references'
    currentSection: null,
    currentTheme: localStorage.getItem('forensic_book_theme') || 'light',
    fontSizeOffset: parseInt(localStorage.getItem('forensic_book_font_offset') || '0', 10),
    bookmarks: JSON.parse(localStorage.getItem('forensic_book_bookmarks') || '[]'),
    activeFigureModal: null,
    figZoomLevel: 1.0,
    searchQuery: '',
    sidebarTab: 'chapters', // 'chapters', 'figures', 'bookmarks'
    refFilter: 'all',
    refSearch: ''
  };

  // DOM Elements Cache
  const dom = {
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebar-backdrop'),
    sidebarCloseBtn: document.getElementById('sidebar-close-btn'),
    sidebarScroll: document.getElementById('sidebar-scroll'),
    contentContainer: document.getElementById('content-container'),
    mainWrapper: document.getElementById('main-wrapper'),
    readingProgressBar: document.getElementById('reading-progress-bar'),
    breadcrumbTitle: document.getElementById('breadcrumb-title'),
    themeButtons: document.querySelectorAll('.theme-btn'),
    sidebarTabs: document.querySelectorAll('.sidebar-tab-btn'),
    searchInput: document.getElementById('sidebar-search-input'),
    toggleSidebarBtn: document.getElementById('toggle-sidebar-btn'),
    conceptModal: document.getElementById('concept-modal'),
    citationModal: document.getElementById('citation-modal'),
    figureModal: document.getElementById('figure-modal')
  };

  // -------------------------------------------------------------
  // 1. Initialization
  // -------------------------------------------------------------
  function init() {
    if (!window.BOOK_DATA) {
      console.error('BOOK_DATA not loaded!');
      return;
    }

    applyTheme(state.currentTheme);
    applyFontSize();

    setupEventListeners();
    renderSidebar();

    // Check hash or load cover
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash.startsWith('ch') || hash === 'glossary' || hash === 'references')) {
      navigateTo(hash);
    } else {
      renderCoverView();
    }
  }

  // -------------------------------------------------------------
  // 2. Theme & Font Controls
  // -------------------------------------------------------------
  function applyTheme(theme) {
    state.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('forensic_book_theme', theme);

    dom.themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  function applyFontSize() {
    const baseSize = 17 + state.fontSizeOffset;
    document.documentElement.style.fontSize = baseSize + 'px';
    localStorage.setItem('forensic_book_font_offset', state.fontSizeOffset);
  }

  function adjustFontSize(delta) {
    state.fontSizeOffset = Math.max(-3, Math.min(6, state.fontSizeOffset + delta));
    applyFontSize();
  }

  // Sidebar Controls (Responsive & Mobile-Aware)
  function openSidebar() {
    if (dom.sidebar) dom.sidebar.classList.add('open');
    if (dom.sidebarBackdrop) dom.sidebarBackdrop.classList.add('active');
  }

  function closeSidebar() {
    if (dom.sidebar) dom.sidebar.classList.remove('open');
    if (dom.sidebarBackdrop) dom.sidebarBackdrop.classList.remove('active');
  }

  function toggleSidebar() {
    if (dom.sidebar && dom.sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  // -------------------------------------------------------------
  // 3. Navigation & Views
  // -------------------------------------------------------------
  function navigateTo(targetId, targetSectionId = null) {
    state.currentView = targetId;
    window.location.hash = targetId;

    if (targetId === 'cover') {
      renderCoverView();
      dom.breadcrumbTitle.textContent = 'Cover & Curriculum';
    } else if (targetId === 'glossary') {
      renderGlossaryView();
      dom.breadcrumbTitle.textContent = 'Appendix A — Unified Glossary';
    } else if (targetId === 'references') {
      renderReferencesView();
      dom.breadcrumbTitle.textContent = 'Master References & Local Papers Archive';
    } else if (targetId.startsWith('ch')) {
      const ch = window.BOOK_DATA.chapters.find(c => c.id === targetId);
      if (ch) {
        renderChapterView(ch);
        dom.breadcrumbTitle.textContent = `Ch ${ch.num}: ${ch.shortTitle}`;
      }
    }

    if (targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      dom.mainWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveSidebarLink();

    // Automatically close sidebar on mobile and tablet screens after navigation
    if (window.innerWidth <= 992) {
      closeSidebar();
    }
  }

  // -------------------------------------------------------------
  // 4. View Renderers
  // -------------------------------------------------------------
  function renderCoverView() {
    const meta = window.BOOK_DATA;
    const inst = meta.institutional;

    // Split chapters into the 3 classic forensic curriculum parts
    const part1 = meta.chapters.filter(c => c.num >= 0 && c.num <= 5);
    const part2 = meta.chapters.filter(c => c.num >= 6 && c.num <= 10);
    const part3 = meta.chapters.filter(c => c.num >= 11 && c.num <= 12);

    const html = `
      <div class="cover-hero-executive">
        <!-- Executive Header with R&D and DIFS logos ONLY (no police logo) -->
        <div class="executive-logos-bar">
          <div class="inst-logo-block">
            <img src="${inst.logos.rnd}" alt="R&D Section Logo" />
            <div class="inst-logo-details">
              <div class="unit-en">Research & Development Section</div>
              <div class="unit-he">מדור מחקר ופיתוח (מו"פ)</div>
            </div>
          </div>

          <div class="inst-center-hierarchy">
            <div class="police-line">State of Israel • Israel Police</div>
            <div class="collab-line">Forensic Science Advanced Educational Series</div>
          </div>

          <div class="inst-logo-block" style="flex-direction:row-reverse; text-align:right;">
            <img src="${inst.logos.difs}" alt="DIFS Logo" />
            <div class="inst-logo-details">
              <div class="unit-en">Division of Identification & Forensic Science</div>
              <div class="unit-he">החטיבה לזיהוי פלילי (מז"פ)</div>
            </div>
          </div>
        </div>

        <!-- Cover Title & Subtitle -->
        <div class="cover-title-group">
          <div class="cover-academic-badge">
            <span>🔬</span> MSc-Level Forensic Curriculum • DIFS Special Reading Pack
          </div>
          <h1 class="cover-hero-title">${meta.title}</h1>
          ${meta.subtitle ? `<p class="cover-hero-subtitle">${meta.subtitle}</p>` : ''}
        </div>

        <!-- Official Regulatory & AI Disclosure Notices -->
        <div class="notices-grid-enhanced">
          <div class="exec-notice-card training">
            <div class="exec-notice-head">
              <span>⚠️</span> OFFICIAL TRAINING DIRECTIVE & INTERNAL USE
            </div>
            <p>${meta.disclaimers.training}</p>
          </div>

          <div class="exec-notice-card ai-integrity">
            <div class="exec-notice-head">
              <span>🤖</span> AI RESEARCH & INTEGRITY DISCLOSURE STATEMENT
            </div>
            <p>${meta.disclaimers.aiDisclosure}</p>
          </div>
        </div>

        <!-- Quick Metrics Strip -->
        <div class="exec-metrics-strip">
          <div class="metric-box">
            <span class="metric-val">${meta.chapters.length}</span>
            <span class="metric-lbl">Full Chapters</span>
          </div>
          <div class="metric-box">
            <span class="metric-val">62</span>
            <span class="metric-lbl">Verified Figures</span>
          </div>
          <div class="metric-box">
            <span class="metric-val">${Object.keys(meta.glossary).length}</span>
            <span class="metric-lbl">Glossary Concepts</span>
          </div>
          <div class="metric-box">
            <span class="metric-val">${Object.keys(meta.papers).length}</span>
            <span class="metric-lbl">Local PDF Papers</span>
          </div>
          <div class="metric-box">
            <span class="metric-val">MSc</span>
            <span class="metric-lbl">Academic Level</span>
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div style="display:flex; gap:16px; margin-bottom:44px; justify-content:center; flex-wrap:wrap;">
        <button class="btn-fig-zoom" onclick="window.reader.navigateTo('ch00')" style="font-size:1.02rem; padding:12px 26px; background:var(--accent-primary); color:white; border:none; box-shadow:var(--shadow-md);">
          📖 Begin Reading (Chapter 0)
        </button>
        <button class="btn-fig-download" onclick="window.reader.navigateTo('glossary')" style="font-size:1.02rem; padding:12px 26px;">
          📚 Explore Unified Glossary (301 Concepts)
        </button>
        <button class="btn-fig-download" onclick="window.reader.navigateTo('references')" style="font-size:1.02rem; padding:12px 26px;">
          📄 Browse 170 PDF Papers Archive
        </button>
      </div>

      <!-- Curriculum Structure Grouped by Parts -->
      <h2 class="section-heading" style="margin-top:20px; font-size:1.6rem;">Reading Pack Curriculum</h2>

      <!-- PART I -->
      <div class="curriculum-part-header">
        <span>Part I: Forensic Biological Fundamentals, Serology & STR Profiles (Chapters 00–05)</span>
      </div>
      <div class="chapters-grid">
        ${renderChapterCards(part1)}
      </div>

      <!-- PART II -->
      <div class="curriculum-part-header">
        <span>Part II: Lineage Markers, Epigenetics & Investigative Genomics (Chapters 06–10)</span>
      </div>
      <div class="chapters-grid">
        ${renderChapterCards(part2)}
      </div>

      <!-- PART III -->
      <div class="curriculum-part-header">
        <span>Part III: Friction Ridge Skin, Chemical Development & AFIS Validity (Chapters 11–12)</span>
      </div>
      <div class="chapters-grid">
        ${renderChapterCards(part3)}
      </div>
    `;

    dom.contentContainer.innerHTML = html;
  }

  function renderChapterCards(chaptersList) {
    return chaptersList.map(ch => `
      <div class="chapter-card-exec" onclick="window.reader.navigateTo('${ch.id}')">
        <div class="chapter-card-top">
          <span style="font-weight:800; font-size:0.88rem; color:var(--accent-primary); letter-spacing:0.5px;">CHAPTER ${ch.num}</span>
          <span class="nav-link-badge">${ch.sections.length} Sections • ${ch.figuresCount} Figures • ${ch.conceptsCount} Concept Links</span>
        </div>
        <div class="chapter-card-title">${ch.title}</div>
        <div class="chapter-card-meta">
          ${ch.sections.map(s => `<strong>${s.num}</strong> ${s.title}`).slice(0, 3).join(' • ')}${ch.sections.length > 3 ? ' • ...' : ''}
        </div>
      </div>
    `).join('');
  }

  function renderChapterView(chapter) {
    const meta = window.BOOK_DATA;
    let html = `
      <div class="chapter-wrapper">
        <div class="chapter-banner" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-color); margin-bottom:24px;">
          <span style="font-size:0.88rem; font-weight:750; color:var(--accent-primary); text-transform:uppercase; letter-spacing:0.5px;">
            Forensic Biological Identification • Chapter ${chapter.num}
          </span>
          <div style="display:flex; gap:10px;">
            <button class="btn-icon" onclick="window.reader.navigateTo('glossary')" title="View Glossary">
              <span>📚</span> Glossary (301)
            </button>
            <button class="btn-icon" onclick="window.reader.addBookmark('${chapter.id}', '${chapter.title}')" title="Bookmark Chapter">
              <span>🔖</span> Bookmark Chapter
            </button>
          </div>
        </div>

        <div class="chapter-body">
          ${chapter.htmlContent}
        </div>

        <div class="chapter-nav-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:60px; padding-top:24px; border-top:1px solid var(--border-color);">
          ${chapter.num > 0 ? `
            <button class="btn-fig-download" onclick="window.reader.navigateTo('ch${String(chapter.num - 1).padStart(2, '0')}')">
              ← Chapter ${chapter.num - 1}
            </button>
          ` : `<div></div>`}

          <button class="btn-fig-zoom" onclick="window.reader.navigateTo('cover')">
            Back to Cover
          </button>

          ${chapter.num < meta.chapters.length - 1 ? `
            <button class="btn-fig-download" onclick="window.reader.navigateTo('ch${String(chapter.num + 1).padStart(2, '0')}')">
              Chapter ${chapter.num + 1} →
            </button>
          ` : `
            <button class="btn-fig-download" onclick="window.reader.navigateTo('glossary')">
              Unified Glossary →
            </button>
          `}
        </div>
      </div>
    `;

    dom.contentContainer.innerHTML = html;
  }

  function renderGlossaryView() {
    const glossary = window.BOOK_DATA.glossary;
    const terms = Object.keys(glossary).sort();

    const letters = {};
    terms.forEach(t => {
      const first = t[0].toUpperCase();
      if (!letters[first]) letters[first] = [];
      letters[first].push({ term: t, defn: glossary[t] });
    });

    const html = `
      <h1 class="chapter-title">Appendix A — Unified Glossary</h1>
      <p class="book-p" style="font-style:italic; color:var(--text-muted); margin-bottom:24px;">
        Consolidates 301 key forensic terms across Chapters 00–12. All concepts are linked directly throughout the book chapters with interactive floating explanation cards.
      </p>

      <div class="glossary-filter-bar">
        ${Object.keys(letters).map(l => `
          <button class="alpha-btn" onclick="document.getElementById('letter-${l}').scrollIntoView({behavior:'smooth'})">${l}</button>
        `).join('')}
      </div>

      <div class="glossary-sections">
        ${Object.keys(letters).map(l => `
          <div class="letter-group" id="letter-${l}" style="margin-bottom:36px;">
            <h2 class="section-heading" style="color:var(--accent-primary); border-bottom:2px solid var(--accent-primary);">${l}</h2>
            <div class="glossary-list" style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
              ${letters[l].map(item => `
                <div class="glossary-item-card" id="gloss-${encodeURIComponent(item.term)}" style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px 20px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <strong style="font-size:1.08rem; color:var(--text-primary); font-family:var(--font-ui);">${item.term}</strong>
                    <button class="btn-icon" style="padding:2px 8px; font-size:0.75rem;" onclick="window.reader.showConceptModal('${item.term.replace(/'/g, "\\'")}')">Popout ↗</button>
                  </div>
                  <p style="font-size:0.96rem; line-height:1.65; color:var(--text-secondary); margin:0;">${item.defn}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    dom.contentContainer.innerHTML = html;
  }

  function renderReferencesView() {
    const papers = window.BOOK_DATA.papers;
    const allKeys = Object.keys(papers).sort();
    const filter = state.refFilter || 'all';
    const query = (state.refSearch || '').toLowerCase().trim();

    const localCount = allKeys.filter(k => papers[k].hasLocalPdf).length;
    const webCount = allKeys.length - localCount;

    // Filter keys
    const filteredKeys = allKeys.filter(k => {
      const p = papers[k];
      if (filter === 'local' && !p.hasLocalPdf) return false;
      if (filter === 'web' && p.hasLocalPdf) return false;
      if (query) {
        const textToSearch = `${k} ${p.title || ''} ${p.authors || ''} ${p.citation || ''} ${p.year || ''}`.toLowerCase();
        if (!textToSearch.includes(query)) return false;
      }
      return true;
    });

    const html = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:12px;">
        <div>
          <h1 class="chapter-title" style="margin-bottom:6px;">Master References & Scientific Literature Archive</h1>
          <p class="book-p" style="font-style:italic; color:var(--text-muted); margin-bottom:16px;">
            Complete peer-reviewed bibliographic catalog of all ${allKeys.length} publications and Butler Methodology chapters cited across the 13 curriculum chapters.
          </p>
        </div>
      </div>

      <!-- Quick Metrics Strip -->
      <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:10px 18px; display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.3rem;">📚</span>
          <div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary);">${allKeys.length}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">סה"כ מקורות (Total)</div>
          </div>
        </div>

        <div style="background:var(--bg-card); border:1px solid #10b981; border-radius:var(--radius-sm); padding:10px 18px; display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.3rem;">📁</span>
          <div>
            <div style="font-size:1.1rem; font-weight:800; color:#10b981;">${localCount}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">קבצים מקומיים בדיסק (Local)</div>
          </div>
        </div>

        <div style="background:var(--bg-card); border:1px solid #3b82f6; border-radius:var(--radius-sm); padding:10px 18px; display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.3rem;">🌐</span>
          <div>
            <div style="font-size:1.1rem; font-weight:800; color:#3b82f6;">${webCount}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">מקורות מקוונים ברשת (Web)</div>
          </div>
        </div>
      </div>

      <!-- Interactive Filter Bar & Search Input -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px 20px; margin-bottom:24px; display:flex; flex-direction:column; gap:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div class="ref-filter-bar" style="margin-bottom:0;">
            <button class="ref-filter-btn ${filter === 'all' ? 'active' : ''}" onclick="window.reader.setReferencesFilter('all')">
              📌 כל המקורות (${allKeys.length})
            </button>
            <button class="ref-filter-btn ${filter === 'local' ? 'active' : ''}" onclick="window.reader.setReferencesFilter('local')">
              📁 קבצים מקומיים בתיקייה (${localCount})
            </button>
            <button class="ref-filter-btn ${filter === 'web' ? 'active' : ''}" onclick="window.reader.setReferencesFilter('web')">
              🌐 מקורות מקוונים בלבד (${webCount})
            </button>
          </div>

          <div style="font-size:0.85rem; font-weight:600; color:var(--text-secondary);">
            מוצגים: <strong>${filteredKeys.length}</strong> מתוך ${allKeys.length}
          </div>
        </div>

        <!-- Search Box -->
        <div class="search-input-wrap" style="width:100%; max-width:100%;">
          <span class="search-icon">🔍</span>
          <input type="text" id="references-search-input" class="search-input" placeholder="חפש מקור לפי מפתח [Key], כותרת מאמר, שמות מחברים, שנה או כתב עת..." value="${state.refSearch || ''}" oninput="window.reader.filterReferences(this.value)">
        </div>
      </div>

      <!-- References List Grid -->
      <div class="references-list" style="display:flex; flex-direction:column; gap:14px;">
        ${filteredKeys.length === 0 ? `
          <div style="text-align:center; padding:48px 20px; background:var(--bg-card); border:1px dashed var(--border-color); border-radius:var(--radius-md); color:var(--text-muted);">
            <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
            <div style="font-size:1.05rem; font-weight:600;">לא נמצאו מקורות התואמים את החיפוש והסינון</div>
            <div style="font-size:0.85rem; margin-top:4px;">נסה לנקות את תיבת החיפוש או לבחור בלשונית "כל המקורות".</div>
          </div>
        ` : filteredKeys.map(k => {
          const p = papers[k];
          const isLocal = p.hasLocalPdf;
          return `
            <div class="ref-item-card ${isLocal ? 'has-local' : 'is-web'}">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span class="cite-pill ${isLocal ? 'has-local' : 'is-web'}" style="font-size:0.95rem; padding:3px 9px;" onclick="window.reader.showCitationModal('${k}')">
                    <span class="pill-icon">${isLocal ? '📄' : '🌐'}</span>[${k}]
                  </span>
                  <span class="ref-source-badge ${isLocal ? 'local' : 'web'}">
                    ${isLocal ? '📁 קובץ PDF מלא בתיקייה (אופליין)' : '🌐 מקור מקוון ברשת (DOI)'}
                  </span>
                </div>
                ${p.year ? `<span style="font-size:0.85rem; font-weight:700; color:var(--text-muted); background:var(--bg-tertiary); padding:2px 8px; border-radius:4px;">${p.year}</span>` : ''}
              </div>

              <!-- Article Title -->
              <div style="font-size:1.05rem; font-weight:700; color:var(--text-primary); line-height:1.45;">
                ${p.title || p.filename || k}
              </div>

              <!-- Authors -->
              ${p.authors ? `
                <div style="font-size:0.9rem; color:var(--text-secondary); font-weight:500;">
                  ✍️ <strong>מחברים:</strong> ${p.authors}
                </div>
              ` : ''}

              <!-- Full Bibliographic Citation -->
              <div style="font-size:0.84rem; color:var(--text-muted); line-height:1.5; background:var(--bg-surface); padding:8px 12px; border-radius:4px; border:1px solid var(--border-color);">
                ${p.citation}
              </div>

              <!-- Further Reading Annotation if available -->
              ${p.annotation ? `
                <div style="background:var(--bg-tertiary); border-left:3px solid var(--accent-primary); padding:8px 12px; border-radius:0 4px 4px 0; font-size:0.86rem; color:var(--text-secondary); line-height:1.5;">
                  <strong style="color:var(--accent-primary);">💡 דגש מרכזי / הערת קריאה:</strong> ${p.annotation}
                </div>
              ` : ''}

              <!-- Local File Path if available -->
              ${isLocal && p.localPath ? `
                <div style="font-size:0.78rem; font-family:var(--font-mono); color:var(--text-muted);">
                  מיקום בדיסק: <code>${p.localPath}</code>
                </div>
              ` : ''}

              <!-- Action Buttons -->
              <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:4px;">
                ${isLocal && p.localPath ? `
                  <a href="${p.localPath}" target="_blank" class="btn-cite-action primary" style="background:#10b981; border-color:#059669; color:#ffffff; padding:7px 16px; font-size:0.84rem;">
                    📄 פתח קובץ PDF מקומי
                  </a>
                ` : ''}

                ${p.doi ? `
                  <a href="https://doi.org/${p.doi}" target="_blank" class="btn-cite-action ${isLocal ? 'secondary' : 'primary'}" style="${!isLocal ? 'background:#3b82f6; border-color:#2563eb; color:#ffffff;' : ''} padding:7px 16px; font-size:0.84rem;">
                    🌐 פתח מאמר ברשת דרך DOI (${p.doi})
                  </a>
                ` : `
                  <a href="https://scholar.google.com/scholar?q=${encodeURIComponent((p.title || k) + ' forensic')}" target="_blank" class="btn-cite-action ${isLocal ? 'secondary' : 'primary'}" style="${!isLocal ? 'background:#3b82f6; border-color:#2563eb; color:#ffffff;' : ''} padding:7px 16px; font-size:0.84rem;">
                    🔍 חפש מאמר ב-Google Scholar
                  </a>
                `}

                <button class="btn-cite-action secondary" onclick="window.reader.showCitationModal('${k}')" style="padding:7px 14px; font-size:0.84rem;">
                  ℹ️ פרטים נוספים וכרטיסיית מקור
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    dom.contentContainer.innerHTML = html;
  }

  // -------------------------------------------------------------
  // 5. Sidebar Renderer & Tabs
  // -------------------------------------------------------------
  function renderSidebar() {
    const meta = window.BOOK_DATA;
    let html = '';

    if (state.sidebarTab === 'chapters') {
      html += `
        <div class="nav-group-title">Book Overview</div>
        <a href="#cover" class="nav-link ${state.currentView === 'cover' ? 'active' : ''}" onclick="window.reader.navigateTo('cover'); return false;">
          <span>📖 Cover & Curriculum</span>
        </a>

        <div class="nav-group-title">Chapters (00–12)</div>
        ${meta.chapters.map(ch => `
          <a href="#${ch.id}" class="nav-link ${state.currentView === ch.id ? 'active' : ''}" onclick="window.reader.navigateTo('${ch.id}'); return false;">
            <span>Ch ${ch.num}. ${ch.shortTitle}</span>
            <span class="nav-link-badge">${ch.figuresCount} figs</span>
          </a>
        `).join('')}

        <div class="nav-group-title">Appendices & References</div>
        <a href="#glossary" class="nav-link ${state.currentView === 'glossary' ? 'active' : ''}" onclick="window.reader.navigateTo('glossary'); return false;">
          <span>📚 Appendix A — Glossary</span>
          <span class="nav-link-badge">${Object.keys(meta.glossary).length}</span>
        </a>
        <a href="#references" class="nav-link ${state.currentView === 'references' ? 'active' : ''}" onclick="window.reader.navigateTo('references'); return false;">
          <span>📄 References & Papers</span>
          <span class="nav-link-badge">${Object.keys(meta.papers).length}</span>
        </a>
      `;
    } else if (state.sidebarTab === 'figures') {
      const figs = meta.figures;
      html += `
        <div class="nav-group-title">All 62 Verified Figures</div>
        ${Object.keys(figs).sort().map(stem => {
          const f = figs[stem];
          return `
            <div class="nav-link" style="cursor:pointer;" onclick="window.reader.openFigureModal('${stem}')">
              <div>
                <strong style="color:var(--accent-primary);">Fig ${f.number}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">${f.stem}</div>
              </div>
              <span class="nav-link-badge">View</span>
            </div>
          `;
        }).join('')}
      `;
    } else if (state.sidebarTab === 'bookmarks') {
      html += `
        <div class="nav-group-title">Saved Bookmarks (${state.bookmarks.length})</div>
        ${state.bookmarks.length === 0 ? `
          <p style="padding:16px 20px; font-size:0.85rem; color:var(--text-muted);">No bookmarks saved yet. Click "Bookmark Chapter" while reading.</p>
        ` : state.bookmarks.map((b, idx) => `
          <div class="nav-link" style="display:flex; justify-content:space-between; align-items:center;">
            <a href="#${b.id}" style="color:var(--text-primary); text-decoration:none; font-size:0.85rem;" onclick="window.reader.navigateTo('${b.id}'); return false;">
              ${b.title}
            </a>
            <button onclick="window.reader.removeBookmark(${idx})" style="background:none; border:none; color:var(--text-muted); cursor:pointer;">✕</button>
          </div>
        `).join('')}
      `;
    }

    dom.sidebarScroll.innerHTML = html;
  }

  function updateActiveSidebarLink() {
    const links = dom.sidebarScroll.querySelectorAll('.nav-link');
    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      l.classList.toggle('active', href.replace('#', '') === state.currentView);
    });
  }

  // -------------------------------------------------------------
  // 6. Interactive Floating Modals (Concept, Citation, Lightbox)
  // -------------------------------------------------------------
  function showConceptModal(term) {
    const glossary = window.BOOK_DATA.glossary;

    // Search exact or case-insensitive match
    let canonicalKey = term;
    let defn = glossary[term];

    if (!defn) {
      const lower = term.toLowerCase();
      canonicalKey = Object.keys(glossary).find(k => k.toLowerCase() === lower || k.toLowerCase().startsWith(lower));
      if (canonicalKey) {
        defn = glossary[canonicalKey];
      }
    }

    if (!defn) {
      defn = 'Forensic concept referenced in reading pack curriculum. Detailed definition provided in Appendix A.';
    }

    const cardHtml = `
      <div class="concept-modal-card">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <span class="modal-title">${canonicalKey || term}</span>
            <span class="modal-badge">Appendix A Glossary</span>
          </div>
          <button class="modal-close-btn" onclick="window.reader.closeModals()">✕</button>
        </div>
        <div class="modal-body">
          <p style="margin-bottom:16px; font-size:1.06rem; line-height:1.7;">${defn}</p>
        </div>
        <div class="modal-footer">
          <button class="btn-fig-download" onclick="window.reader.closeModals(); window.reader.navigateTo('glossary', 'gloss-${encodeURIComponent(canonicalKey || term)}');">
            📖 View Entry in Appendix A ➔
          </button>
          <button class="btn-fig-zoom" onclick="window.reader.closeModals()">
            Close
          </button>
        </div>
      </div>
    `;

    dom.conceptModal.innerHTML = cardHtml;
    dom.conceptModal.classList.add('active');
  }

  function showCitationModal(key) {
    const papers = window.BOOK_DATA.papers;
    const paper = papers[key];

    let bodyHtml = '';
    if (paper) {
      const isLocal = paper.hasLocalPdf;
      bodyHtml = `
        <div class="citation-card">
          <div class="modal-header">
            <div class="modal-title-wrap">
              <span class="cite-pill ${isLocal ? 'has-local' : 'is-web'}" style="font-size:1.05rem; padding:3px 10px;">
                <span class="pill-icon">${isLocal ? '📄' : '🌐'}</span>[${key}]
              </span>
              <span class="ref-source-badge ${isLocal ? 'local' : 'web'}">
                ${isLocal ? '📁 קובץ PDF בתיקייה (Offline)' : '🌐 מקור מקוון (Web Only)'}
              </span>
            </div>
            <button class="modal-close-btn" onclick="window.reader.closeModals()">✕</button>
          </div>

          <div class="modal-body">
            <!-- Clear Visual Status Banner -->
            <div class="modal-status-banner ${isLocal ? 'local' : 'web'}">
              <span class="status-icon">${isLocal ? '📁' : '🌐'}</span>
              <div class="status-text">
                <div class="status-title">${isLocal ? 'קובץ PDF מקומי זמין בתיקיית הספר' : 'מקור אקדמי מקוון (קישור ישיר ברשת)'}</div>
                <div class="status-desc">
                  ${isLocal 
                    ? 'מסמך המקור המלא שמור ישירות על המחשב / הדיסק-און-קי בתיקיית המאמרים וזמין לקריאה ללא צורך באינטרנט.' 
                    : 'מאמר זה אינו שמור כקובץ מקומי בדיסק, אך ניתן לפתוח אותו ישירות ברשת באמצעות קישור ה-DOI הרשמי.'}
                </div>
              </div>
            </div>

            <!-- Title & Authors -->
            <h3 style="font-size:1.1rem; color:var(--text-primary); margin:0 0 8px 0; line-height:1.4;">
              ${paper.title || paper.filename || key}
            </h3>

            ${paper.authors ? `
              <p style="font-size:0.92rem; color:var(--text-secondary); margin:0 0 10px 0; font-weight:500;">
                ✍️ <strong>מחברים:</strong> ${paper.authors} ${paper.year ? `(${paper.year})` : ''}
              </p>
            ` : ''}

            <div style="font-size:0.86rem; color:var(--text-muted); background:var(--bg-surface); border:1px solid var(--border-color); padding:10px 14px; border-radius:var(--radius-sm); line-height:1.55; margin:0 0 14px 0;">
              <strong>ציטוט ביבליוגרפי מלא:</strong><br>${paper.citation}
            </div>

            ${paper.annotation ? `
              <div style="background:var(--bg-tertiary); border-left:3px solid var(--accent-primary); padding:10px 14px; border-radius:0 4px 4px 0; margin-bottom:14px; font-size:0.9rem; color:var(--text-secondary); line-height:1.55;">
                <strong style="color:var(--accent-primary); display:block; margin-bottom:2px;">💡 דגש מרכזי / הערת קריאה:</strong>
                ${paper.annotation}
              </div>
            ` : ''}

            ${isLocal && paper.localPath ? `
              <p style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono); margin:0 0 14px 0;">
                מיקום הקובץ: <code>${paper.localPath}</code>
              </p>
            ` : ''}

            <div class="cite-actions-group" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:8px;">
              ${isLocal && paper.localPath ? `
                <a href="${paper.localPath}" target="_blank" class="btn-cite-action primary" style="background:#10b981; border-color:#059669; color:#ffffff;">
                  📄 פתח קובץ PDF מקומי (Open Local PDF)
                </a>
              ` : ''}

              ${paper.doi ? `
                <a href="https://doi.org/${paper.doi}" target="_blank" class="btn-cite-action ${isLocal ? 'secondary' : 'primary'}" style="${!isLocal ? 'background:#3b82f6; border-color:#2563eb; color:#ffffff;' : ''}">
                  🌐 פתח מאמר ברשת דרך DOI (${paper.doi})
                </a>
              ` : `
                <a href="https://scholar.google.com/scholar?q=${encodeURIComponent((paper.title || key) + ' forensic')}" target="_blank" class="btn-cite-action ${isLocal ? 'secondary' : 'primary'}" style="${!isLocal ? 'background:#3b82f6; border-color:#2563eb; color:#ffffff;' : ''}">
                  🔍 חפש מאמר ברשת (Google Scholar)
                </a>
              `}

              ${isLocal && paper.doi ? `
                <a href="https://doi.org/${paper.doi}" target="_blank" class="btn-cite-action secondary">
                  🌐 קישור מקוון (DOI)
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    } else {
      bodyHtml = `
        <div class="citation-card">
          <div class="modal-header">
            <span class="modal-title">[${key}] Reference</span>
            <button class="modal-close-btn" onclick="window.reader.closeModals()">✕</button>
          </div>
          <div class="modal-body">
            <p>Reference key <strong>[${key}]</strong> cited in curriculum.</p>
            <div class="cite-actions-group">
              <a href="https://scholar.google.com/scholar?q=${encodeURIComponent(key + ' forensic')}" target="_blank" class="btn-cite-action primary">
                🔍 Search Google Scholar
              </a>
            </div>
          </div>
        </div>
      `;
    }

    dom.citationModal.innerHTML = bodyHtml;
    dom.citationModal.classList.add('active');
  }

  function openFigureModal(stem) {
    const f = window.BOOK_DATA.figures[stem];
    if (!f) return;

    state.activeFigureModal = stem;
    state.figZoomLevel = 1.0;

    const modalHtml = `
      <div class="figure-modal-lightbox">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <span class="modal-title">Figure ${f.number} — ${f.stem}</span>
            <span class="modal-badge">Vector SVG Inspection</span>
          </div>
          <div class="lightbox-controls">
            <button class="btn-icon" onclick="window.reader.zoomFigure(0.25)">🔍+</button>
            <button class="btn-icon" onclick="window.reader.zoomFigure(-0.25)">🔍-</button>
            <button class="btn-icon" onclick="window.reader.resetFigureZoom()">100%</button>
            <a href="${f.png}" target="_blank" class="btn-icon">PNG (300 dpi)</a>
            <button class="modal-close-btn" onclick="window.reader.closeModals()">✕</button>
          </div>
        </div>
        <div class="lightbox-content">
          <img id="lightbox-zoom-target" src="${f.svg}" alt="Figure ${f.number}" class="lightbox-img" />
        </div>
        <div class="figure-caption" style="max-height:180px; overflow-y:auto;">
          <p>${f.caption}</p>
        </div>
      </div>
    `;

    dom.figureModal.innerHTML = modalHtml;
    dom.figureModal.classList.add('active');
  }

  function zoomFigure(delta) {
    state.figZoomLevel = Math.max(0.5, Math.min(3.0, state.figZoomLevel + delta));
    const img = document.getElementById('lightbox-zoom-target');
    if (img) {
      img.style.transform = `scale(${state.figZoomLevel})`;
    }
  }

  function resetFigureZoom() {
    state.figZoomLevel = 1.0;
    const img = document.getElementById('lightbox-zoom-target');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }

  function closeModals() {
    dom.conceptModal.classList.remove('active');
    dom.citationModal.classList.remove('active');
    dom.figureModal.classList.remove('active');
  }

  // -------------------------------------------------------------
  // 7. Bookmarks Management
  // -------------------------------------------------------------
  function addBookmark(id, title) {
    if (!state.bookmarks.some(b => b.id === id)) {
      state.bookmarks.push({ id, title, timestamp: new Date().toLocaleDateString() });
      localStorage.setItem('forensic_book_bookmarks', JSON.stringify(state.bookmarks));
      alert(`Bookmark saved for ${title}!`);
      renderSidebar();
    } else {
      alert('This chapter is already bookmarked.');
    }
  }

  function removeBookmark(index) {
    state.bookmarks.splice(index, 1);
    localStorage.setItem('forensic_book_bookmarks', JSON.stringify(state.bookmarks));
    renderSidebar();
  }

  // -------------------------------------------------------------
  // 8. Search Engine
  // -------------------------------------------------------------
  function handleSearch(query) {
    state.searchQuery = query.trim().toLowerCase();
    if (!state.searchQuery) {
      renderSidebar();
      return;
    }

    const meta = window.BOOK_DATA;
    const results = [];

    // Search in Glossary
    Object.keys(meta.glossary).forEach(term => {
      const defn = meta.glossary[term];
      if (term.toLowerCase().includes(state.searchQuery) || defn.toLowerCase().includes(state.searchQuery)) {
        results.push({
          type: 'glossary',
          title: term,
          snippet: defn.substring(0, 100) + '...',
          target: 'glossary'
        });
      }
    });

    // Search in Chapters
    meta.chapters.forEach(ch => {
      if (ch.title.toLowerCase().includes(state.searchQuery)) {
        results.push({
          type: 'chapter',
          title: `Chapter ${ch.num}: ${ch.title}`,
          snippet: 'Chapter title match',
          target: ch.id
        });
      }
      ch.sections.forEach(sec => {
        if (sec.title.toLowerCase().includes(state.searchQuery)) {
          results.push({
            type: 'section',
            title: `Ch ${ch.num} • ${sec.num} ${sec.title}`,
            snippet: 'Section heading match',
            target: ch.id,
            sectionId: sec.id
          });
        }
      });
    });

    let html = `<div class="nav-group-title">Search Results (${results.length})</div>`;
    if (results.length === 0) {
      html += `<p style="padding:16px 20px; font-size:0.85rem; color:var(--text-muted);">No matches found for "${query}".</p>`;
    } else {
      results.slice(0, 25).forEach(res => {
        html += `
          <div class="nav-link" style="cursor:pointer;" onclick="window.reader.navigateTo('${res.target}', ${res.sectionId ? `'${res.sectionId}'` : 'null'})">
            <div>
              <strong style="color:var(--accent-primary);">${res.title}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${res.snippet}</div>
            </div>
            <span class="nav-link-badge">${res.type}</span>
          </div>
        `;
      });
    }

    dom.sidebarScroll.innerHTML = html;
  }

  // -------------------------------------------------------------
  // 9. Event Listeners
  // -------------------------------------------------------------
  function setupEventListeners() {
    dom.themeButtons.forEach(btn => {
      btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });

    dom.sidebarTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dom.sidebarTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.sidebarTab = tab.dataset.tab;
        renderSidebar();
      });
    });

    if (dom.toggleSidebarBtn) {
      dom.toggleSidebarBtn.addEventListener('click', toggleSidebar);
    }

    if (dom.sidebarCloseBtn) {
      dom.sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    if (dom.sidebarBackdrop) {
      dom.sidebarBackdrop.addEventListener('click', closeSidebar);
    }

    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', e => handleSearch(e.target.value));
    }

    dom.mainWrapper.addEventListener('scroll', () => {
      const scrollHeight = dom.contentContainer.scrollHeight - dom.mainWrapper.clientHeight;
      if (scrollHeight > 0) {
        const progress = (dom.mainWrapper.scrollTop / scrollHeight) * 100;
        dom.readingProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
      }
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModals();
    });

    [dom.conceptModal, dom.citationModal, dom.figureModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', e => {
          if (e.target === modal) closeModals();
        });
      }
    });
  }

  function setReferencesFilter(type) {
    state.refFilter = type;
    renderReferencesView();
  }

  function filterReferences(query) {
    state.refSearch = query;
    renderReferencesView();
    const input = document.getElementById('references-search-input');
    if (input) {
      input.focus();
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  }

  // Global API
  window.reader = {
    navigateTo,
    showConceptModal,
    showCitationModal,
    openFigureModal,
    zoomFigure,
    resetFigureZoom,
    closeModals,
    addBookmark,
    removeBookmark,
    adjustFontSize,
    setReferencesFilter,
    filterReferences,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };

  document.addEventListener('DOMContentLoaded', init);
})();
