/**
 * IOCL Paradip Petrochemical Complex - Unit B Expansion
 * EXECLink Match Review Decision Console Controller
 * Three-Zone Decision Architecture & State Machine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Master Store of Field Updates & Schedule Activity Candidates
  const MASTER_SCHEDULE_ACTIVITIES = [
    { code: 'DFCU-PIP-209', title: 'Quench Tower Primary Tie-in Welds', discipline: 'Piping & Mechanical', wbsPath: 'EPCC-03 > DFCU > Quench Section > Piping', verifiedProgress: '57%' },
    { code: 'DFCU-PIP-210', title: 'Secondary Quench Tower Piping', discipline: 'Piping & Mechanical', wbsPath: 'EPCC-03 > DFCU > Quench Section > Piping', verifiedProgress: '75%' },
    { code: 'DFCU-PIP-214', title: 'Flare Header Bypass Spools', discipline: 'Piping & Mechanical', wbsPath: 'EPCC-03 > DFCU > Offsites > Piping', verifiedProgress: '35%' },
    { code: 'DFCU-STR-104', title: 'Pipe Rack Module 4 Structural Erection', discipline: 'Civil & Structural', wbsPath: 'EPCC-03 > DFCU > Rack Area > Structural', verifiedProgress: '74%' },
    { code: 'DFCU-STR-108', title: 'Cracker Compressor House Framework', discipline: 'Civil & Structural', wbsPath: 'EPCC-03 > DFCU > Machinery > Structural', verifiedProgress: '42%' },
    { code: 'DFCU-ELE-301', title: 'Substation SS-08 11kV Feeder Routing', discipline: 'Electrical & Instrumentation', wbsPath: 'EPCC-03 > DFCU > Power Distribution', verifiedProgress: '45%' },
    { code: 'DFCU-ELE-305', title: 'Cable Tray Erection Bay 2', discipline: 'Electrical & Instrumentation', wbsPath: 'EPCC-03 > DFCU > Cable Pathways', verifiedProgress: '60%' },
    { code: 'DFCU-EQU-082', title: 'Cracking Reactor R-01 Dress-out & Internals', discipline: 'Equipment & Vessels', wbsPath: 'EPCC-03 > DFCU > Reaction Train', verifiedProgress: '86%' },
    { code: 'DFCU-EQU-091', title: 'Quench Drum Piping Internals', discipline: 'Equipment & Vessels', wbsPath: 'EPCC-03 > DFCU > Quench Train', verifiedProgress: '30%' }
  ];

  // Store: Field Updates requiring planner review
  let STORE_UPDATES = [
    {
      id: 'UPD-2026-0841',
      timestamp: '26 Sep 2026 14:35 IST',
      supervisor: 'S. Mukherjee (Lead Piping Supt)',
      discipline: 'Piping & Mechanical',
      location: 'Zone 3 — DFCU Cracker Rack B (Elev +18.5m)',
      assetTag: '10-PR-MOD-04',
      workType: 'Pipe Spool Fit-up & Welding',
      description: 'Completed welding of 8-inch hydrocarbon transfer header spools SP-01 to SP-04 on Rack B. Visual inspection completed.',
      reportedProgress: '85%',
      reportedQuantity: '32 / 38 Joints',
      drawingRef: 'DWG-EPCC03-PIP-2041-R3',
      status: 'pending_review',
      // Real Matching Engine Output
      primaryCandidate: {
        code: 'DFCU-PIP-209',
        title: 'Quench Tower Primary Tie-in Welds',
        wbsPath: 'EPCC-03 > DFCU > Quench Section > Piping',
        existingVerifiedProgress: '57%',
        proposedVerifiedProgress: '85%',
        engineScore: '91.4%',
        signals: [
          { name: 'Asset / Equipment Tag', weight: '30%', scoreContrib: '30.0%', pct: 100, note: 'Exact tag match: 10-PR-MOD-04' },
          { name: 'Discipline', weight: '20%', scoreContrib: '20.0%', pct: 100, note: 'Exact: Piping & Mechanical' },
          { name: 'Location', weight: '20%', scoreContrib: '18.4%', pct: 92, note: 'Matched: Zone 3 Rack B' },
          { name: 'Work Type', weight: '15%', scoreContrib: '13.5%', pct: 90, note: 'Spool Fit-up & Welding' },
          { name: 'Text Similarity', weight: '15%', scoreContrib: '9.5%', pct: 63, note: 'Header spool weld keywords' }
        ]
      },
      alternatives: [
        { code: 'DFCU-PIP-214', title: 'Flare Header Bypass Spools', score: '68.2%' },
        { code: 'DFCU-EQU-091', title: 'Quench Drum Piping Internals', score: '44.0%' }
      ],
      evidence: [
        { name: 'NDT_Radiography_Report_RT-842.pdf', size: '1.8 MB', date: '26 Sep 2026' },
        { name: 'Fitup_Inspection_Log_J04.pdf', size: '420 KB', date: '26 Sep 2026' }
      ]
    },
    {
      id: 'UPD-2026-0843',
      timestamp: '26 Sep 2026 11:45 IST',
      supervisor: 'R. Nair (Electrical Supt)',
      discipline: 'Electrical & Instrumentation',
      location: 'Zone 2 — Substation SS-08 (Cable Trench B)',
      assetTag: 'SS-08-TR-02',
      workType: 'Cable Pulling & Routing',
      description: 'Primary 11kV feeder cable pulling from Substation SS-08 to Cooling Water Pump House. Megger test pending.',
      reportedProgress: '60%',
      reportedQuantity: '420 / 700 m',
      drawingRef: 'DWG-ELE-SS08-CBL-09',
      status: 'pending_review',
      primaryCandidate: {
        code: 'DFCU-ELE-301',
        title: 'Substation SS-08 11kV Feeder Routing',
        wbsPath: 'EPCC-03 > DFCU > Power Distribution',
        existingVerifiedProgress: '45%',
        proposedVerifiedProgress: '60%',
        engineScore: '86.5%',
        signals: [
          { name: 'Asset / Equipment Tag', weight: '30%', scoreContrib: '28.0%', pct: 93, note: 'Substation trench tag match' },
          { name: 'Discipline', weight: '20%', scoreContrib: '20.0%', pct: 100, note: 'Electrical & Instrumentation' },
          { name: 'Location', weight: '20%', scoreContrib: '18.0%', pct: 90, note: 'Zone 2 Substation SS-08' },
          { name: 'Work Type', weight: '15%', scoreContrib: '12.5%', pct: 83, note: 'Cable Pulling' },
          { name: 'Text Similarity', weight: '15%', scoreContrib: '8.0%', pct: 53, note: 'Feeder cable keywords' }
        ]
      },
      alternatives: [
        { code: 'DFCU-ELE-305', title: 'Cable Tray Erection Bay 2', score: '54.0%' }
      ],
      evidence: [] // Explicitly NO evidence attached
    },
    {
      id: 'UPD-2026-0848',
      timestamp: '26 Sep 2026 09:30 IST',
      supervisor: 'S. Mukherjee (Lead Piping Supt)',
      discipline: 'Piping & Mechanical',
      location: 'Zone 1 — Quench Tower Section 2',
      assetTag: '10-C-101-SEC',
      workType: 'Secondary Tie-in Fit-up',
      description: 'Field survey and weld seam inspection of secondary tie-in spools. Field report indicates only 60% completion due to valve alignment issues.',
      reportedProgress: '60%',
      reportedQuantity: '6 / 10 Spools',
      drawingRef: 'DWG-EPCC03-PIP-2101',
      status: 'pending_review',
      // Demonstrates REGRESSION PROTECTION: existing verified 75% > proposed 60%!
      primaryCandidate: {
        code: 'DFCU-PIP-210',
        title: 'Secondary Quench Tower Piping',
        wbsPath: 'EPCC-03 > DFCU > Quench Section > Piping',
        existingVerifiedProgress: '75%', // Greater than 60%!
        proposedVerifiedProgress: '60%',
        engineScore: '88.0%',
        signals: [
          { name: 'Asset / Equipment Tag', weight: '30%', scoreContrib: '28.0%', pct: 93, note: '10-C-101 secondary match' },
          { name: 'Discipline', weight: '20%', scoreContrib: '20.0%', pct: 100, note: 'Piping & Mechanical' },
          { name: 'Location', weight: '20%', scoreContrib: '19.0%', pct: 95, note: 'Zone 1 Quench Tower' },
          { name: 'Work Type', weight: '15%', scoreContrib: '12.0%', pct: 80, note: 'Tie-in Fit-up' },
          { name: 'Text Similarity', weight: '15%', scoreContrib: '9.0%', pct: 60, note: 'Secondary tie-in keywords' }
        ]
      },
      alternatives: [
        { code: 'DFCU-PIP-209', title: 'Quench Tower Primary Tie-in Welds', score: '62.0%' }
      ],
      evidence: [
        { name: 'Valve_Misalignment_Survey_Log.pdf', size: '1.4 MB', date: '26 Sep 2026' }
      ]
    },
    {
      id: 'UPD-2026-0842',
      timestamp: '26 Sep 2026 13:10 IST',
      supervisor: 'A. Verma (Senior Structural Supt)',
      discipline: 'Civil & Structural',
      location: 'Zone 1 — Main Cracker Tower Bay (Tier 3)',
      assetTag: '10-STR-BAY-01',
      workType: 'Steel Bolting & Torquing',
      description: 'Erection of cross-bracing steel tiers between grid lines 4-6 on Level 3. High-strength friction grip bolts torqued.',
      reportedProgress: '100%',
      reportedQuantity: '18 / 18 MT',
      drawingRef: 'DWG-DFCU-STR-104-R2',
      status: 'verified', // Already verified
      verifiedBy: 'Rajesh Sharma',
      verifiedTimestamp: '26 Sep 2026 16:00 IST',
      primaryCandidate: {
        code: 'DFCU-STR-104',
        title: 'Pipe Rack Module 4 Structural Erection',
        wbsPath: 'EPCC-03 > DFCU > Rack Area > Structural',
        existingVerifiedProgress: '74%',
        proposedVerifiedProgress: '100%',
        engineScore: '98.5%',
        signals: [
          { name: 'Asset / Equipment Tag', weight: '30%', scoreContrib: '30.0%', pct: 100, note: 'Exact tag match' },
          { name: 'Discipline', weight: '20%', scoreContrib: '20.0%', pct: 100, note: 'Civil & Structural' },
          { name: 'Location', weight: '20%', scoreContrib: '20.0%', pct: 100, note: 'Main Cracker Tower Bay' },
          { name: 'Work Type', weight: '15%', scoreContrib: '14.5%', pct: 96, note: 'Bolting & Torquing' },
          { name: 'Text Similarity', weight: '15%', scoreContrib: '14.0%', pct: 93, note: 'Cross-bracing steel erection' }
        ]
      },
      alternatives: [],
      evidence: [
        { name: 'Torque_Calibration_Sheet_TC-104.pdf', size: '890 KB', date: '26 Sep 2026' }
      ]
    }
  ];

  // App State
  const state = {
    selectedId: 'UPD-2026-0841',
    uiState: 'success', // 'loading', 'success', 'empty', 'error', 'no_selection'
    queueFilter: 'pending', // 'all', 'pending', 'verified'
    queueSearch: ''
  };

  // DOM Elements
  const canvas = document.getElementById('commandCanvas');
  const viewportBtns = document.querySelectorAll('.viewport-btn');
  const stateToggleSelect = document.getElementById('stateToggleSelect');
  const queueCardsList = document.getElementById('queueCardsList');
  const evidenceZone = document.getElementById('evidenceContentContainer');
  const recommendationZone = document.getElementById('recommendationContentContainer');
  const queueCountBadge = document.getElementById('queuePendingCount');
  const queueSearchInput = document.getElementById('queueSearchInput');
  const queueFilterBtns = document.querySelectorAll('.queue-filter-pill-btn');
  const stateOverlay = document.getElementById('stateOverlayContainer');

  // Modals
  const schedulePickerModal = document.getElementById('schedulePickerModal');
  const regressionWarningModal = document.getElementById('regressionWarningModal');
  const rejectReasonModal = document.getElementById('rejectReasonModal');

  // Deep Link Parser
  function initDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const updateParam = params.get('update');
    if (updateParam && STORE_UPDATES.some(u => u.id === updateParam)) {
      state.selectedId = updateParam;
    }
  }

  // Set URL parameter without full refresh
  function syncUrlWithSelection(id) {
    if (id) {
      const url = new URL(window.location);
      url.searchParams.set('update', id);
      window.history.pushState({ updateId: id }, '', url);
    }
  }

  // Handle browser Back / Forward navigation
  window.addEventListener('popstate', (e) => {
    const params = new URLSearchParams(window.location.search);
    const updateParam = params.get('update');
    if (updateParam && STORE_UPDATES.some(u => u.id === updateParam)) {
      state.selectedId = updateParam;
      renderAll();
    }
  });

  // Render Queue (Left Zone)
  function renderQueue() {
    const pendingCount = STORE_UPDATES.filter(u => u.status === 'pending_review').length;
    if (queueCountBadge) queueCountBadge.textContent = `${pendingCount} Pending`;

    const filtered = STORE_UPDATES.filter(item => {
      if (state.queueFilter === 'pending' && item.status !== 'pending_review') return false;
      if (state.queueFilter === 'verified' && item.status !== 'verified') return false;
      if (state.queueSearch.trim() !== '') {
        const q = state.queueSearch.toLowerCase();
        return item.id.toLowerCase().includes(q) ||
               item.assetTag.toLowerCase().includes(q) ||
               item.description.toLowerCase().includes(q) ||
               item.discipline.toLowerCase().includes(q);
      }
      return true;
    });

    if (filtered.length === 0) {
      queueCardsList.innerHTML = `
        <div style="padding: 24px 12px; text-align: center; color: var(--text-muted); font-size: 11.5px;">
          No matching updates found in queue.
        </div>
      `;
      return;
    }

    queueCardsList.innerHTML = filtered.map(item => {
      const isSelected = item.id === state.selectedId;
      let badgeClass = 'pending';
      let badgeLabel = 'Awaiting Review';
      if (item.status === 'verified') {
        badgeClass = 'verified';
        badgeLabel = 'Verified';
      } else if (item.status === 'rejected') {
        badgeClass = 'rejected';
        badgeLabel = 'Rejected';
      }

      return `
        <div class="queue-item-card ${isSelected ? 'selected' : ''}" data-id="${item.id}" role="button" tabindex="0">
          <div class="queue-card-top">
            <span class="queue-item-id">${item.id}</span>
            <span class="queue-item-discipline">${item.discipline.split('&')[0]}</span>
          </div>

          <div class="queue-card-asset-row">
            <span class="queue-asset-tag">${item.assetTag}</span>
            <span class="queue-location-snippet" title="${item.location}">${item.location.split('—')[1] || item.location}</span>
          </div>

          <div class="queue-card-desc" title="${item.description}">${item.description}</div>

          <div class="queue-card-bottom">
            <span class="queue-reported-pct">${item.reportedProgress} reported</span>
            <span class="queue-status-badge ${badgeClass}">${badgeLabel}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards in queue
    document.querySelectorAll('.queue-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        state.selectedId = id;
        syncUrlWithSelection(id);
        renderAll();
      });
    });
  }

  // Render Field Evidence (Center Zone)
  function renderEvidence() {
    const item = STORE_UPDATES.find(u => u.id === state.selectedId);
    if (!item) {
      evidenceZone.innerHTML = `
        <div class="no-evidence-state-box">
          Select a field update from the Review Queue to view reported evidence.
        </div>
      `;
      return;
    }

    const hasEvidence = item.evidence && item.evidence.length > 0;

    evidenceZone.innerHTML = `
      <!-- PROMINENT FIELD REPORTED LABEL (STRICTLY NEUTRAL SLATE) -->
      <div class="field-reported-doctrine-banner">
        <div class="fr-badge-label">
          <span class="fr-pill">FIELD REPORTED</span>
          <span class="fr-subtext">Site Execution Submission · Not Verified Truth</span>
        </div>
        <div class="fr-metric-callout">
          <span class="fr-progress-big">${item.reportedProgress}</span>
          <span class="fr-quantity-tag">${item.reportedQuantity}</span>
        </div>
      </div>

      <!-- Description Block -->
      <div class="evidence-section-box">
        <span class="evidence-box-label">Reported Work Description</span>
        <div class="evidence-desc-card">${item.description}</div>
      </div>

      <!-- Execution Metadata Grid -->
      <div class="evidence-section-box">
        <span class="evidence-box-label">Field Execution Metadata</span>
        <div class="evidence-meta-grid">
          <div class="meta-field-cell">
            <span class="meta-key">Field Supervisor</span>
            <span class="meta-val">${item.supervisor}</span>
          </div>
          <div class="meta-field-cell">
            <span class="meta-key">Timestamp</span>
            <span class="meta-val mono">${item.timestamp}</span>
          </div>
          <div class="meta-field-cell">
            <span class="meta-key">Discipline</span>
            <span class="meta-val">${item.discipline}</span>
          </div>
          <div class="meta-field-cell">
            <span class="meta-key">Asset Tag</span>
            <span class="meta-val mono" style="color:#93c5fd;">${item.assetTag}</span>
          </div>
          <div class="meta-field-cell">
            <span class="meta-key">Work Type</span>
            <span class="meta-val">${item.workType}</span>
          </div>
          <div class="meta-field-cell">
            <span class="meta-key">Drawing Ref</span>
            <span class="meta-val mono">${item.drawingRef || 'N/A'}</span>
          </div>
          <div class="meta-field-cell" style="grid-column: span 2;">
            <span class="meta-key">Work Location</span>
            <span class="meta-val">${item.location}</span>
          </div>
        </div>
      </div>

      <!-- Attached Field Evidence Documents -->
      <div class="evidence-section-box">
        <span class="evidence-box-label">Associated Physical Evidence (${hasEvidence ? item.evidence.length : 0})</span>
        ${hasEvidence ? `
          <div class="attached-evidence-list">
            ${item.evidence.map(ev => `
              <div class="evidence-attachment-card">
                <div class="attachment-left">
                  <div class="attachment-icon-box">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <div class="attachment-info">
                    <span class="attachment-name">${ev.name}</span>
                    <span class="attachment-details">${ev.size} · Uploaded ${ev.date}</span>
                  </div>
                </div>
                <button class="evidence-view-btn" onclick="alert('Viewing authentic field evidence file: ${ev.name}')">Preview Document</button>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="no-evidence-state-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            No field evidence attached
          </div>
        `}
      </div>
    `;
  }

  // Render Machine Recommendation & Planner Decision Controls (Right Zone)
  function renderRecommendation() {
    const item = STORE_UPDATES.find(u => u.id === state.selectedId);
    if (!item) {
      recommendationZone.innerHTML = `
        <div class="no-evidence-state-box">
          Select an update from the queue to view EXECLink matching proposals.
        </div>
      `;
      return;
    }

    const cand = item.primaryCandidate;
    const isVerified = item.status === 'verified';
    const isRejected = item.status === 'rejected';

    recommendationZone.innerHTML = `
      <!-- PRIMARY CANDIDATE PROPOSAL CARD (BLUE BEFORE APPROVAL -> GREEN AFTER APPROVAL!) -->
      <div class="machine-proposal-card ${isVerified ? 'approved-verified' : ''}">
        <div class="proposal-top-badge-row">
          <span class="proposal-status-chip">
            <span class="dot" style="width:6px; height:6px; border-radius:50%; background:currentColor;"></span>
            ${isVerified ? 'VERIFIED LINK' : 'MACHINE PROPOSAL'}
          </span>
          <div class="proposal-score-badge">
            <span class="score-number">${cand ? cand.engineScore : '—'}</span>
            <span class="score-label">${isVerified ? 'Engine Baseline' : 'Engine Match'}</span>
          </div>
        </div>

        <div class="candidate-activity-block">
          <div class="candidate-wbs-code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
            </svg>
            L5/L6 Activity: ${cand ? cand.code : 'No Match Candidate'}
          </div>
          <h3 class="candidate-title">${cand ? cand.title : 'Manual Association Required'}</h3>
          <span class="candidate-wbs-path">${cand ? cand.wbsPath : 'Unlinked WBS element'}</span>
        </div>

        <!-- Schedule Impact Triad -->
        <div class="schedule-impact-comparison-box">
          <div class="impact-cell">
            <span class="impact-label">Existing Verified Progress</span>
            <span class="impact-val" style="color:#cbd5e1;">${cand ? cand.existingVerifiedProgress : '—'}</span>
          </div>
          <div class="impact-cell">
            <span class="impact-label">Proposed Verified Result</span>
            <span class="impact-val" style="color:${isVerified ? '#34d399' : '#60a5fa'};">
              ${cand ? cand.proposedVerifiedProgress : '—'}
            </span>
          </div>
        </div>
      </div>

      <!-- EXPLAINABILITY: 5 MATCHING SIGNALS (EXACT WEIGHTS) -->
      ${cand && cand.signals ? `
        <div class="explainability-section">
          <div class="explainability-header">
            <span class="evidence-box-label">Explainability: Signal Breakdown (100% Weight)</span>
            <span style="font-size:10.5px; color:#93c5fd; font-family:var(--font-mono); font-weight:600;">
              Total: ${cand.engineScore}
            </span>
          </div>

          <div class="signals-breakdown-table">
            ${cand.signals.map(s => `
              <div class="signal-row-item">
                <div class="signal-meta-line">
                  <div class="signal-name-wrap">
                    <span>${s.name}</span>
                    <span class="signal-weight-tag">(${s.weight})</span>
                  </div>
                  <span class="signal-score-calc">${s.scoreContrib}</span>
                </div>
                <div class="signal-bar-track" title="${s.name}: ${s.note}">
                  <div class="signal-bar-fill" style="width: ${s.pct}%; background:${isVerified ? 'var(--verified-green)' : 'var(--machine-blue)'};"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- ALTERNATIVE CANDIDATES -->
      ${item.alternatives && item.alternatives.length > 0 && !isVerified ? `
        <div class="alternatives-section">
          <span class="evidence-box-label">Alternative Schedule Candidates (${item.alternatives.length})</span>
          ${item.alternatives.map(alt => `
            <div class="alternative-candidate-card">
              <div class="alt-info">
                <span class="alt-code">${alt.code}</span>
                <span class="alt-title">${alt.title}</span>
              </div>
              <div style="display:flex; align-items:center;">
                <span class="alt-score">${alt.score}</span>
                <button class="alt-select-btn" onclick="window.selectAlternativeCandidate('${item.id}', '${alt.code}')">Select</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Status Notification if Verified -->
      ${isVerified ? `
        <div class="committed-success-banner" style="display:flex;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Verified link committed to EPCC-03 Baseline Schedule by ${item.verifiedBy || 'Planner'}.</span>
        </div>
      ` : ''}

      <!-- Status Notification if Rejected -->
      ${isRejected ? `
        <div style="background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.35); border-radius:6px; padding:8px 12px; font-size:11.5px; color:#f87171;">
          ⚠️ This update was rejected. Rejection reason recorded in audit log.
        </div>
      ` : ''}
    `;

    // Render Planner Decision Controls Deck at bottom of zone
    const deckContainer = document.getElementById('plannerControlsDeck');
    if (deckContainer) {
      if (isVerified) {
        deckContainer.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:8px; height:8px; border-radius:50%; background:var(--verified-green);"></span>
              <span style="font-size:12px; font-weight:700; color:#a7f3d0;">Authorized Verification Complete</span>
            </div>
            <a href="index.html#view-schedule" class="planner-action-btn secondary-btn" style="text-decoration:none; font-size:11.5px; padding:6px 12px;">
              View in Schedule →
            </a>
          </div>
        `;
      } else if (isRejected) {
        deckContainer.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:12px; color:#f87171; font-weight:600;">Update Marked as Rejected</span>
            <button class="planner-action-btn secondary-btn" onclick="window.reopenUpdate('${item.id}')" style="font-size:11px; padding:5px 10px;">
              Re-open Review
            </button>
          </div>
        `;
      } else {
        deckContainer.innerHTML = `
          <div class="decision-actions-row">
            <button id="approveLinkBtn" class="planner-action-btn approve-btn" title="Authorize link and promote reported claim to verified schedule actual">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Approve Link & Commit
            </button>
            <button id="chooseDifferentBtn" class="planner-action-btn secondary-btn" title="Search project schedule to select an alternative L5/L6 activity">
              Choose Different
            </button>
            <button id="rejectUpdateBtn" class="planner-action-btn reject-btn" title="Reject update with audit justification">
              Reject
            </button>
          </div>
        `;

        // Attach action handlers
        const approveBtn = document.getElementById('approveLinkBtn');
        if (approveBtn) approveBtn.addEventListener('click', () => handleApproveClick(item));

        const chooseDiffBtn = document.getElementById('chooseDifferentBtn');
        if (chooseDiffBtn) chooseDiffBtn.addEventListener('click', () => openSchedulePicker(item));

        const rejectBtn = document.getElementById('rejectUpdateBtn');
        if (rejectBtn) rejectBtn.addEventListener('click', () => openRejectModal(item));
      }
    }
  }

  // Handle Approve Click (checks regression protection)
  function handleApproveClick(item) {
    if (!item || !item.primaryCandidate) return;

    const existingPct = parseInt(item.primaryCandidate.existingVerifiedProgress, 10) || 0;
    const proposedPct = parseInt(item.primaryCandidate.proposedVerifiedProgress, 10) || 0;

    // REGRESSION PROTECTION CHECK
    if (proposedPct < existingPct) {
      openRegressionModal(item, existingPct, proposedPct);
      return;
    }

    // Direct Commit
    commitApproval(item.id);
  }

  // Commit Approval (Crosses the verification boundary from BLUE to GREEN!)
  function commitApproval(id, overrideReason = '') {
    const item = STORE_UPDATES.find(u => u.id === id);
    if (!item) return;

    item.status = 'verified';
    item.verifiedBy = 'Rajesh Sharma';
    item.verifiedTimestamp = 'Just now';
    if (overrideReason) {
      item.overrideJustification = overrideReason;
    }

    renderAll();
  }

  // Open Regression Modal
  function openRegressionModal(item, existingPct, proposedPct) {
    if (!regressionWarningModal) return;

    document.getElementById('regExistingVal').textContent = `${existingPct}%`;
    document.getElementById('regProposedVal').textContent = `${proposedPct}%`;
    document.getElementById('regActivityCode').textContent = `${item.primaryCandidate.code}: ${item.primaryCandidate.title}`;

    regressionWarningModal.style.display = 'flex';

    const confirmBtn = document.getElementById('confirmRegressionOverrideBtn');
    const cancelBtn = document.getElementById('cancelRegressionBtn');

    confirmBtn.onclick = () => {
      const reason = document.getElementById('regressionReasonInput').value || 'Planner approved scope recalibration';
      regressionWarningModal.style.display = 'none';
      commitApproval(item.id, reason);
    };

    cancelBtn.onclick = () => {
      regressionWarningModal.style.display = 'none';
    };
  }

  // Open Schedule Picker Modal
  function openSchedulePicker(item) {
    if (!schedulePickerModal) return;

    const listEl = document.getElementById('scheduleActivitiesList');
    const searchInput = document.getElementById('scheduleSearchInput');

    function renderActivities(query = '') {
      const filtered = MASTER_SCHEDULE_ACTIVITIES.filter(act => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return act.code.toLowerCase().includes(q) ||
               act.title.toLowerCase().includes(q) ||
               act.discipline.toLowerCase().includes(q) ||
               act.wbsPath.toLowerCase().includes(q);
      });

      listEl.innerHTML = filtered.map(act => `
        <div class="alternative-candidate-card" style="cursor:pointer;" onclick="window.assignCustomScheduleActivity('${item.id}', '${act.code}')">
          <div class="alt-info">
            <span class="alt-code" style="color:#93c5fd;">${act.code} · ${act.discipline}</span>
            <span class="alt-title">${act.title}</span>
            <span style="font-size:10px; color:#64748b; font-family:var(--font-mono);">${act.wbsPath} · Verified: ${act.verifiedProgress}</span>
          </div>
          <button class="alt-select-btn">Select Activity</button>
        </div>
      `).join('');
    }

    renderActivities();
    schedulePickerModal.style.display = 'flex';

    searchInput.value = '';
    searchInput.oninput = (e) => renderActivities(e.target.value);

    document.getElementById('closeSchedulePickerBtn').onclick = () => {
      schedulePickerModal.style.display = 'none';
    };
  }

  // Assign Custom Schedule Activity
  window.assignCustomScheduleActivity = function(updateId, activityCode) {
    const item = STORE_UPDATES.find(u => u.id === updateId);
    const act = MASTER_SCHEDULE_ACTIVITIES.find(a => a.code === activityCode);
    if (!item || !act) return;

    item.primaryCandidate = {
      code: act.code,
      title: act.title,
      wbsPath: act.wbsPath,
      existingVerifiedProgress: act.verifiedProgress,
      proposedVerifiedProgress: item.reportedProgress,
      engineScore: 'Manual Link',
      signals: [
        { name: 'Asset / Equipment Tag', weight: '30%', scoreContrib: 'Manual', pct: 100, note: 'Planner manually associated WBS' },
        { name: 'Discipline', weight: '20%', scoreContrib: 'Manual', pct: 100, note: act.discipline },
        { name: 'Location', weight: '20%', scoreContrib: 'Manual', pct: 100, note: 'Planner designated location' },
        { name: 'Work Type', weight: '15%', scoreContrib: 'Manual', pct: 100, note: 'Execution scope match' },
        { name: 'Text Similarity', weight: '15%', scoreContrib: 'Manual', pct: 100, note: 'Schedule scope descriptor' }
      ]
    };

    if (schedulePickerModal) schedulePickerModal.style.display = 'none';
    renderAll();
  };

  // Swap Alternative Candidate
  window.selectAlternativeCandidate = function(updateId, altCode) {
    const item = STORE_UPDATES.find(u => u.id === updateId);
    if (!item) return;

    const oldPrimary = item.primaryCandidate;
    const act = MASTER_SCHEDULE_ACTIVITIES.find(a => a.code === altCode);

    if (act) {
      item.primaryCandidate = {
        code: act.code,
        title: act.title,
        wbsPath: act.wbsPath,
        existingVerifiedProgress: act.verifiedProgress,
        proposedVerifiedProgress: item.reportedProgress,
        engineScore: '74.5%',
        signals: [
          { name: 'Asset / Equipment Tag', weight: '30%', scoreContrib: '20.0%', pct: 66, note: 'Alternative asset match' },
          { name: 'Discipline', weight: '20%', scoreContrib: '20.0%', pct: 100, note: act.discipline },
          { name: 'Location', weight: '20%', scoreContrib: '16.5%', pct: 82, note: 'Adjacent zone' },
          { name: 'Work Type', weight: '15%', scoreContrib: '10.0%', pct: 66, note: 'Secondary work task' },
          { name: 'Text Similarity', weight: '15%', scoreContrib: '8.0%', pct: 53, note: 'Alternative schedule text' }
        ]
      };
      if (oldPrimary) {
        item.alternatives = item.alternatives.filter(a => a.code !== altCode);
        item.alternatives.push({ code: oldPrimary.code, title: oldPrimary.title, score: oldPrimary.engineScore });
      }
      renderAll();
    }
  };

  // Rejection Modal
  function openRejectModal(item) {
    if (!rejectReasonModal) return;

    rejectReasonModal.style.display = 'flex';
    document.getElementById('confirmRejectBtn').onclick = () => {
      const reason = document.getElementById('rejectReasonText').value || 'Evidence does not meet verification criteria';
      item.status = 'rejected';
      item.rejectionReason = reason;
      rejectReasonModal.style.display = 'none';
      renderAll();
    };

    document.getElementById('cancelRejectBtn').onclick = () => {
      rejectReasonModal.style.display = 'none';
    };
  }

  // Re-open Update
  window.reopenUpdate = function(id) {
    const item = STORE_UPDATES.find(u => u.id === id);
    if (item) {
      item.status = 'pending_review';
      renderAll();
    }
  };

  // Render All Zones
  function renderAll() {
    renderQueue();
    renderEvidence();
    renderRecommendation();
  }

  // Handle Global UI State Switching (Loading, Empty, Error, etc.)
  function applyUiState(newState) {
    state.uiState = newState;
    if (!stateOverlay) return;

    if (newState === 'success') {
      stateOverlay.style.display = 'none';
      renderAll();
      return;
    }

    stateOverlay.style.display = 'flex';
    if (newState === 'loading') {
      stateOverlay.innerHTML = `
        <div class="state-icon-box loading">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </div>
        <h3 style="font-size:15px; color:#fff;">Fetching EXECLink Matching Feeds...</h3>
        <p style="font-size:12px; color:var(--text-muted); max-width:340px;">
          Ingesting field evidence records and running multi-signal matching algorithms against EPCC-03 L5 schedule baseline.
        </p>
      `;
    } else if (newState === 'error') {
      stateOverlay.innerHTML = `
        <div class="state-icon-box error">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 style="font-size:15px; color:#f87171;">Matching Engine Connection Failed</h3>
        <p style="font-size:12px; color:var(--text-muted); max-width:340px;">
          Unable to synchronize with the Paradip site telemetry server. Backend API returned code 503 (Gateway Timeout).
        </p>
        <button class="planner-action-btn secondary-btn" onclick="document.getElementById('stateToggleSelect').value='success'; document.getElementById('stateToggleSelect').dispatchEvent(new Event('change'));">
          Retry Sync
        </button>
      `;
    } else if (newState === 'empty') {
      stateOverlay.innerHTML = `
        <div class="state-icon-box empty">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        </div>
        <h3 style="font-size:15px; color:#fff;">Review Queue Empty</h3>
        <p style="font-size:12px; color:var(--text-muted); max-width:340px;">
          All field updates for reporting cycle Week 38 have been reviewed and verified by project controls.
        </p>
      `;
    } else if (newState === 'no_selection') {
      stateOverlay.style.display = 'none';
      state.selectedId = null;
      renderAll();
    }
  }

  // Event Listeners for State Tester
  if (stateToggleSelect) {
    stateToggleSelect.addEventListener('change', (e) => {
      applyUiState(e.target.value);
    });
  }

  // Queue Filter buttons
  queueFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      queueFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.queueFilter = btn.getAttribute('data-filter');
      renderQueue();
    });
  });

  // Queue Search input
  if (queueSearchInput) {
    queueSearchInput.addEventListener('input', (e) => {
      state.queueSearch = e.target.value;
      renderQueue();
    });
  }

  // Viewport Presets
  viewportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewportBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.getAttribute('data-preset');
      if (preset === 'auto') {
        canvas.removeAttribute('data-preset');
      } else {
        canvas.setAttribute('data-preset', preset);
      }
    });
  });

  // Init
  initDeepLink();
  renderAll();
});
