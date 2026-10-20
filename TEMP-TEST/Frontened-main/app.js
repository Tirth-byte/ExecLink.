/**
 * IOCL Paradip Petrochemical Complex - Unit B Expansion
 * Executive Project-Control Command Center Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // State management
  const state = {
    mode: 'strict', // 'strict' (authentic —, N/A) vs 'simulated' (sample ingested telemetry)
    viewportPreset: 'auto',
    sidebarCollapsed: false
  };

  // Elements
  const canvas = document.getElementById('commandCanvas');
  const viewportBtns = document.querySelectorAll('.viewport-btn');
  const toggleDataModeBtn = document.getElementById('toggleDataModeBtn');
  const modeStatusText = document.getElementById('modeStatusText');
  const searchInputWrap = document.getElementById('sidebarSearchWrap');
  const searchModal = document.getElementById('searchModal');
  const searchModalInput = document.getElementById('searchModalInput');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const collapseSidebarBtn = document.getElementById('collapseSidebarBtn');
  const sidebar = document.getElementById('appSidebar');

  // Strict empty state definitions (No invented metrics)
  const strictStateData = {
    physicalProgress: {
      actual: '—',
      planned: '—',
      variance: '—',
      spi: '—',
      dataDate: 'Awaiting Telemetry',
      barActualWidth: '0%',
      targetMarkerVisible: false
    },
    verificationFlow: {
      captured: '—',
      awaiting: '—',
      verified: '—',
      unmatched: '—',
      rejected: '—',
      statusText: 'Telemetry ingestion pending for Cutoff Week 38'
    },
    disciplineControl: [
      { name: 'Civil & Structural', baseline: '—', actual: '—', pctWidth: '0%', verifiedWidth: '0%' },
      { name: 'Piping & Mechanical', baseline: '—', actual: '—', pctWidth: '0%', verifiedWidth: '0%' },
      { name: 'Electrical & Instrumentation', baseline: '—', actual: '—', pctWidth: '0%', verifiedWidth: '0%' },
      { name: 'Equipment & Vessels', baseline: '—', actual: '—', pctWidth: '0%', verifiedWidth: '0%' }
    ],
    matchIntelligence: {
      confidence: '—',
      statusLabel: 'Pending Engine Run'
    },
    criticalWatch: [
      {
        code: 'DFCU-STR-104',
        title: 'Pipe Rack Module 4 Structural Erection',
        expected: '—',
        actual: '—',
        variance: '—',
        status: 'awaiting',
        statusLabel: 'Awaiting'
      },
      {
        code: 'DFCU-PIP-209',
        title: 'Quench Tower Primary Tie-in Welds',
        expected: '—',
        actual: '—',
        variance: '—',
        status: 'awaiting',
        statusLabel: 'Awaiting'
      },
      {
        code: 'DFCU-EQU-082',
        title: 'Cracking Reactor R-01 Dress-out & Internals',
        expected: '—',
        actual: '—',
        variance: '—',
        status: 'awaiting',
        statusLabel: 'Awaiting'
      }
    ]
  };

  // Simulated ingested telemetry (Available via toggle for PM demonstration)
  const simulatedStateData = {
    physicalProgress: {
      actual: '64.8%',
      planned: '68.2%',
      variance: '-3.4%',
      spi: '0.95',
      dataDate: '24 Sep 2026 (W38)',
      barActualWidth: '64.8%',
      targetMarkerVisible: true
    },
    verificationFlow: {
      captured: '1,842',
      awaiting: '320',
      verified: '1,418',
      unmatched: '74',
      rejected: '30',
      statusText: '1,418 field records verified against Week 38 baseline'
    },
    disciplineControl: [
      { name: 'Civil & Structural', baseline: '82%', actual: '81%', pctWidth: '82%', verifiedWidth: '81%' },
      { name: 'Piping & Mechanical', baseline: '64%', actual: '58%', pctWidth: '64%', verifiedWidth: '58%' },
      { name: 'Electrical & Instrumentation', baseline: '51%', actual: '49%', pctWidth: '51%', verifiedWidth: '49%' },
      { name: 'Equipment & Vessels', baseline: '76%', actual: '72%', pctWidth: '76%', verifiedWidth: '72%' }
    ],
    matchIntelligence: {
      confidence: '84.2%',
      statusLabel: 'Confidence Score'
    },
    criticalWatch: [
      {
        code: 'DFCU-STR-104',
        title: 'Pipe Rack Module 4 Structural Erection',
        expected: '78%',
        actual: '74%',
        variance: '-4%',
        status: 'watch',
        statusLabel: 'Watch'
      },
      {
        code: 'DFCU-PIP-209',
        title: 'Quench Tower Primary Tie-in Welds',
        expected: '65%',
        actual: '57%',
        variance: '-8%',
        status: 'watch',
        statusLabel: 'Behind'
      },
      {
        code: 'DFCU-EQU-082',
        title: 'Cracking Reactor R-01 Dress-out & Internals',
        expected: '88%',
        actual: '86%',
        variance: '-2%',
        status: 'watch',
        statusLabel: 'Watch'
      }
    ]
  };

  // Render function that updates DOM
  function updateDashboard(isSimulated = false) {
    const data = isSimulated ? simulatedStateData : strictStateData;

    // 1. Physical Progress Panel
    document.getElementById('metricActual').textContent = data.physicalProgress.actual;
    document.getElementById('metricPlanned').textContent = data.physicalProgress.planned;
    document.getElementById('metricVariance').textContent = data.physicalProgress.variance;
    document.getElementById('metricSpi').textContent = data.physicalProgress.spi;
    document.getElementById('metricDataDate').textContent = data.physicalProgress.dataDate;

    const fillBar = document.getElementById('progressFillActual');
    if (fillBar) {
      fillBar.style.width = data.physicalProgress.barActualWidth;
    }

    const targetMarker = document.getElementById('targetMarker');
    if (targetMarker) {
      targetMarker.style.display = data.physicalProgress.targetMarkerVisible ? 'block' : 'none';
      if (data.physicalProgress.targetMarkerVisible) {
        targetMarker.style.left = '68.2%';
      }
    }

    // 2. Verification Flow
    document.getElementById('flowCaptured').textContent = data.verificationFlow.captured;
    document.getElementById('flowAwaiting').textContent = data.verificationFlow.awaiting;
    document.getElementById('flowVerified').textContent = data.verificationFlow.verified;
    document.getElementById('flowUnmatched').textContent = data.verificationFlow.unmatched;
    document.getElementById('flowRejected').textContent = data.verificationFlow.rejected;
    document.getElementById('flowStatusBannerText').textContent = data.verificationFlow.statusText;

    // 3. Discipline Control
    const discContainer = document.getElementById('disciplineRowsContainer');
    if (discContainer) {
      discContainer.innerHTML = data.disciplineControl.map(d => `
        <div class="discipline-row">
          <div class="discipline-meta">
            <span class="discipline-name">${d.name}</span>
            <span class="discipline-ratio">${isSimulated ? `${d.actual} / ${d.baseline}` : `${d.actual}`}</span>
          </div>
          <div class="discipline-bar-track" title="Planned: ${d.baseline} | Verified: ${d.actual}">
            <div class="discipline-bar-planned" style="width: ${d.pctWidth};"></div>
            <div class="discipline-bar-verified" style="width: ${d.verifiedWidth};"></div>
          </div>
        </div>
      `).join('');
    }

    // 4. Match Intelligence
    document.getElementById('matchConfidenceVal').textContent = data.matchIntelligence.confidence;
    document.getElementById('matchConfidenceLabel').textContent = data.matchIntelligence.statusLabel;

    // 5. Critical Watch
    const critContainer = document.getElementById('criticalActivitiesContainer');
    if (critContainer) {
      critContainer.innerHTML = data.criticalWatch.map(a => `
        <div class="critical-activity-row">
          <div class="activity-identity-col">
            <span class="activity-code">${a.code}</span>
            <span class="activity-title" title="${a.title}">${a.title}</span>
          </div>
          <div class="activity-variance-col">
            <span class="activity-variance-val">${isSimulated ? `Exp ${a.expected} · Act ${a.actual}` : `Act: ${a.actual}`}</span>
            <span class="activity-status-icon-pill ${a.status}" title="Variance: ${a.variance}">
              ${isSimulated ? a.variance : '—'}
            </span>
          </div>
        </div>
      `).join('');
    }

    // Toggle button UI updates
    if (toggleDataModeBtn) {
      if (isSimulated) {
        toggleDataModeBtn.classList.remove('strict');
        modeStatusText.textContent = 'Simulated Feed Ingested';
        toggleDataModeBtn.title = 'Switch to Strict Baseline Data Mode (No fake metrics)';
      } else {
        toggleDataModeBtn.classList.add('strict');
        modeStatusText.textContent = 'Strict Telemetry Pending (—)';
        toggleDataModeBtn.title = 'Switch to Simulated Telemetry Feed for demo walk-through';
      }
    }
  }

  // Event Listeners for Viewport Tester Bar
  viewportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewportBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.getAttribute('data-preset');
      state.viewportPreset = preset;

      if (preset === 'auto') {
        canvas.removeAttribute('data-preset');
      } else {
        canvas.setAttribute('data-preset', preset);
      }
    });
  });

  // Event Listener for Data Mode Switcher
  if (toggleDataModeBtn) {
    toggleDataModeBtn.addEventListener('click', () => {
      state.mode = state.mode === 'strict' ? 'simulated' : 'strict';
      updateDashboard(state.mode === 'simulated');
    });
  }

  // Sidebar Collapse Toggle
  if (collapseSidebarBtn && sidebar) {
    collapseSidebarBtn.addEventListener('click', () => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      if (state.sidebarCollapsed) {
        sidebar.style.width = '68px';
        sidebar.style.minWidth = '68px';
        document.querySelectorAll('.brand-text-block, .search-kbd, .search-input-wrap span, .nav-group-title, .nav-item a span, .nav-badge-pill, .sidebar-footer').forEach(el => {
          el.style.display = 'none';
        });
        sidebar.classList.add('collapsed');
      } else {
        sidebar.style.width = '240px';
        sidebar.style.minWidth = '240px';
        document.querySelectorAll('.brand-text-block, .search-kbd, .search-input-wrap span, .nav-group-title, .nav-item a span, .nav-badge-pill, .sidebar-footer').forEach(el => {
          el.style.display = '';
        });
        sidebar.classList.remove('collapsed');
      }
    });
  }

  // Quick Search Modal handlers
  function openSearch() {
    if (searchModal) {
      searchModal.style.display = 'flex';
      setTimeout(() => {
        if (searchModalInput) searchModalInput.focus();
      }, 50);
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.style.display = 'none';
    }
  }

  if (searchInputWrap) {
    searchInputWrap.addEventListener('click', openSearch);
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearch);
  }

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Initial render: STRICT EMPTY STATE (Data Integrity first)
  updateDashboard(false);
});
