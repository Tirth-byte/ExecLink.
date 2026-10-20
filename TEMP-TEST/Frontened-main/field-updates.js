/**
 * IOCL Paradip Petrochemical Complex - Unit B Expansion
 * Field Execution Board Controller (Field Updates Workspace)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Operational Dataset (Sample Real-World Ingested Records adhering to backend state model)
  const FIELD_UPDATES_DATA = [
    {
      id: 'UPD-2026-0841',
      timestamp: '26 Sep 2026 14:35 IST',
      supervisor: 'S. Mukherjee (Lead Piping)',
      discipline: 'Piping & Mechanical',
      location: 'Zone 3 — DFCU Cracker Rack B (Elev +18.5m)',
      assetTag: '10-PR-MOD-04',
      workType: 'Pipe Spool Fit-up & Welding',
      description: 'Completed welding of 8-inch hydrocarbon transfer header spools SP-01 to SP-04 on Rack B. Visual inspection completed.',
      reportedProgress: '85%',
      verifiedProgress: '— (Awaiting Review)',
      quantity: '32 / 38 Joints',
      drawingRef: 'DWG-EPCC03-PIP-2041-R3',
      status: 'pending_review',
      matchProposal: {
        wbsCode: 'DFCU-PIP-209',
        wbsTitle: 'Quench Tower Primary Tie-in Welds',
        confidence: '91%'
      },
      evidence: [
        { name: 'NDT_Radiography_Report_RT-842.pdf', size: '1.8 MB', date: '26 Sep 2026' },
        { name: 'Fitup_Inspection_Log_J04.pdf', size: '420 KB', date: '26 Sep 2026' }
      ]
    },
    {
      id: 'UPD-2026-0842',
      timestamp: '26 Sep 2026 13:10 IST',
      supervisor: 'A. Verma (Senior Structural)',
      discipline: 'Civil & Structural',
      location: 'Zone 1 — Main Cracker Tower Bay (Tier 3)',
      assetTag: '10-STR-BAY-01',
      workType: 'Steel Bolting & Torquing',
      description: 'Erection of cross-bracing steel tiers between grid lines 4-6 on Level 3. High-strength friction grip bolts torqued.',
      reportedProgress: '100%',
      verifiedProgress: '100% (Verified by QC)',
      quantity: '18 / 18 MT',
      drawingRef: 'DWG-DFCU-STR-104-R2',
      status: 'verified',
      matchProposal: {
        wbsCode: 'DFCU-STR-104',
        wbsTitle: 'Pipe Rack Module 4 Structural Erection',
        confidence: '100%'
      },
      evidence: [
        { name: 'Torque_Calibration_Sheet_TC-104.pdf', size: '890 KB', date: '26 Sep 2026' }
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
      verifiedProgress: '— (Awaiting Review)',
      quantity: '420 / 700 m',
      drawingRef: 'DWG-ELE-SS08-CBL-09',
      status: 'pending_review',
      matchProposal: {
        wbsCode: 'DFCU-ELE-301',
        wbsTitle: 'Substation SS-08 11kV Feeder Routing',
        confidence: '86%'
      },
      evidence: [] // Explicitly NO evidence
    },
    {
      id: 'UPD-2026-0844',
      timestamp: '26 Sep 2026 10:20 IST',
      supervisor: 'M. Patnaik (Mechanical)',
      discipline: 'Equipment & Vessels',
      location: 'Zone 4 — Cracking Reactor R-01 Skirt',
      assetTag: '10-R-101-BASE',
      workType: 'Equipment Grouting & Shimming',
      description: 'Grouting of baseplates for Reactor R-01 skirt completed. Non-shrink high-strength grout used. Curing compound applied.',
      reportedProgress: '100%',
      verifiedProgress: '100% (Verified by Inspector)',
      quantity: '1 / 1 Unit',
      drawingRef: 'DWG-EQU-R101-FDN-01',
      status: 'verified',
      matchProposal: {
        wbsCode: 'DFCU-EQU-082',
        wbsTitle: 'Cracking Reactor R-01 Dress-out & Internals',
        confidence: '98%'
      },
      evidence: [
        { name: 'Grout_Cube_Compression_7D.pdf', size: '1.2 MB', date: '25 Sep 2026' },
        { name: 'QC_Pour_Card_PC-2026-R01.pdf', size: '640 KB', date: '26 Sep 2026' }
      ]
    },
    {
      id: 'UPD-2026-0845',
      timestamp: '26 Sep 2026 09:15 IST',
      supervisor: 'K. Sanyal (Civil Engineer)',
      discipline: 'Civil & Structural',
      location: 'Zone 5 — Offsites & Utilities Flare Trench',
      assetTag: 'FL-TR-09',
      workType: 'Reinforced Concrete Casting',
      description: 'Rebar tie-up and shuttering for flare header anchor block AB-03. Concrete pour delayed due to rain.',
      reportedProgress: '40%',
      verifiedProgress: '— (Unmatched)',
      quantity: '25 / 65 m³',
      drawingRef: 'DWG-CIV-FLR-201',
      status: 'unmatched',
      matchProposal: null, // No candidate matched
      evidence: [] // No evidence
    },
    {
      id: 'UPD-2026-0846',
      timestamp: '25 Sep 2026 17:30 IST',
      supervisor: 'S. Mukherjee (Lead Piping)',
      discipline: 'Piping & Mechanical',
      location: 'Zone 3 — Quench Oil Loop Tie-in',
      assetTag: '10-C-101-QO',
      workType: 'Field Weld Fit-up',
      description: 'Field welding of 12-inch Quench Oil return line at joint QO-W-12. Radiography film density failed ASME Sec IX standards.',
      reportedProgress: '70%',
      verifiedProgress: 'REJECTED (Failed NDT)',
      quantity: '4 / 6 Welds',
      drawingRef: 'DWG-EPCC03-PIP-2099',
      status: 'rejected',
      rejectionReason: 'NDT Radiography failed ASME film density spec at root pass (Joint QO-W-12). Rectification required.',
      matchProposal: {
        wbsCode: 'DFCU-PIP-209',
        wbsTitle: 'Quench Tower Primary Tie-in Welds',
        confidence: '78%'
      },
      evidence: [
        { name: 'NDT_Failure_Notice_NCR-042.pdf', size: '2.1 MB', date: '25 Sep 2026' }
      ]
    },
    {
      id: 'UPD-2026-0847',
      timestamp: '25 Sep 2026 15:45 IST',
      supervisor: 'R. Nair (Electrical Supt)',
      discipline: 'Electrical & Instrumentation',
      location: 'Zone 1 — Analyzer Shelter AS-01',
      assetTag: 'AS-01-JB-04',
      workType: 'Junction Box Marshalling',
      description: 'Internal terminal wiring and ferruling for chromatograph junction box JB-04 completed by field crew.',
      reportedProgress: '100%',
      verifiedProgress: '— (Submitted)',
      quantity: '48 / 48 Terminals',
      drawingRef: 'DWG-INS-AS01-WD-02',
      status: 'submitted',
      matchProposal: {
        wbsCode: 'DFCU-INS-112',
        wbsTitle: 'Analyzer Shelter Instrumentation Cabling',
        confidence: '82%'
      },
      evidence: [
        { name: 'Field_Marshalling_Sheet_JB04.pdf', size: '750 KB', date: '25 Sep 2026' }
      ]
    }
  ];

  // State
  let currentFilter = 'all';
  let searchQuery = '';
  let selectedUpdateId = FIELD_UPDATES_DATA[0].id;

  // DOM Elements
  const canvas = document.getElementById('commandCanvas');
  const viewportBtns = document.querySelectorAll('.viewport-btn');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const listContainer = document.getElementById('boardListContainer');
  const detailContainer = document.getElementById('selectedDetailColumn');
  const collapseSidebarBtn = document.getElementById('collapseSidebarBtn');
  const sidebar = document.getElementById('appSidebar');

  // Badge counters
  const totalCountEl = document.getElementById('totalCountBadge');
  const awaitingCountEl = document.getElementById('awaitingCountBadge');
  const unmatchedCountEl = document.getElementById('unmatchedCountBadge');
  const verifiedCountEl = document.getElementById('verifiedCountBadge');
  const rejectedCountEl = document.getElementById('rejectedCountBadge');

  // Update counts
  function updateCounts() {
    const total = FIELD_UPDATES_DATA.length;
    const awaiting = FIELD_UPDATES_DATA.filter(d => d.status === 'pending_review').length;
    const unmatched = FIELD_UPDATES_DATA.filter(d => d.status === 'unmatched').length;
    const verified = FIELD_UPDATES_DATA.filter(d => d.status === 'verified').length;
    const rejected = FIELD_UPDATES_DATA.filter(d => d.status === 'rejected').length;

    if (totalCountEl) totalCountEl.textContent = total;
    if (awaitingCountEl) awaitingCountEl.textContent = awaiting;
    if (unmatchedCountEl) unmatchedCountEl.textContent = unmatched;
    if (verifiedCountEl) verifiedCountEl.textContent = verified;
    if (rejectedCountEl) rejectedCountEl.textContent = rejected;

    const navBadge = document.getElementById('fieldNavBadge');
    if (navBadge) navBadge.textContent = awaiting;
  }

  // Filter & Search logic
  function getFilteredData() {
    return FIELD_UPDATES_DATA.filter(item => {
      // 1. Status Filter
      if (currentFilter !== 'all') {
        if (currentFilter === 'awaiting' && item.status !== 'pending_review') return false;
        if (currentFilter === 'unmatched' && item.status !== 'unmatched') return false;
        if (currentFilter === 'verified' && item.status !== 'verified') return false;
        if (currentFilter === 'rejected' && item.status !== 'rejected') return false;
      }

      // 2. Search Query across real fields: ID, Asset, Description, Supervisor
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesAsset = item.assetTag.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSup = item.supervisor.toLowerCase().includes(q);
        const matchesDisc = item.discipline.toLowerCase().includes(q);
        return matchesId || matchesAsset || matchesDesc || matchesSup || matchesDisc;
      }

      return true;
    });
  }

  // Render Records List
  function renderList() {
    const filtered = getFilteredData();

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-muted); background:#fff; border-radius:12px; border:1px dashed var(--border-medium);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px; color:var(--text-dim);">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <div style="font-size:13px; font-weight:600; color:#0f172a;">No field updates match your filter criteria</div>
          <div style="font-size:11.5px; margin-top:4px;">Try selecting a different filter tab or clearing your search term.</div>
        </div>
      `;
      return;
    }

    // Check if current selected ID is in filtered list, else select first
    const isSelectedInFiltered = filtered.some(d => d.id === selectedUpdateId);
    if (!isSelectedInFiltered && filtered.length > 0) {
      selectedUpdateId = filtered[0].id;
    }

    listContainer.innerHTML = filtered.map(item => {
      const isSelected = item.id === selectedUpdateId;
      const hasEvidence = item.evidence && item.evidence.length > 0;

      // Status chip text and class
      let statusClass = item.status;
      let statusLabel = item.status.replace('_', ' ');

      if (item.status === 'pending_review') statusLabel = 'Awaiting Review';
      if (item.status === 'verified') statusLabel = 'Verified';
      if (item.status === 'unmatched') statusLabel = 'Unmatched';
      if (item.status === 'rejected') statusLabel = 'Rejected';
      if (item.status === 'submitted') statusLabel = 'Submitted';

      return `
        <div class="update-record-card ${isSelected ? 'selected' : ''}" data-id="${item.id}" role="button" tabindex="0">
          
          <!-- Col 1: Identity -->
          <div class="col-identity">
            <span class="record-id">${item.id}</span>
            <span class="record-timestamp">${item.timestamp}</span>
            <span class="record-supervisor" title="${item.supervisor}">${item.supervisor}</span>
          </div>

          <!-- Col 2: Scope & Description -->
          <div class="col-scope">
            <div class="scope-tags-line">
              <span class="asset-tag-badge">${item.assetTag}</span>
              <span class="discipline-badge">${item.discipline}</span>
              <span class="worktype-text">· ${item.workType}</span>
            </div>
            <div class="record-desc" title="${item.description}">${item.description}</div>
            <div class="location-subtext">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${item.location}
            </div>
          </div>

          <!-- Col 3: Quantity -->
          <div class="col-quantity">
            <span class="quantity-val">${item.quantity}</span>
            <span class="quantity-caption">Reported Qty</span>
          </div>

          <!-- Col 4: Field Reported Progress (Strictly Neutral!) -->
          <div class="col-reported">
            <div class="reported-metric-box">
              <span class="reported-val">${item.reportedProgress}</span>
              <span class="reported-label">Reported</span>
            </div>
            <div class="reported-mini-track">
              <div class="reported-mini-fill" style="width: ${item.reportedProgress};"></div>
            </div>
          </div>

          <!-- Col 5: Evidence -->
          <div class="col-evidence">
            <span class="evidence-indicator-pill ${hasEvidence ? 'has-evidence' : 'no-evidence'}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              ${hasEvidence ? `${item.evidence.length} File${item.evidence.length > 1 ? 's' : ''}` : 'No files'}
            </span>
          </div>

          <!-- Col 6: Status -->
          <div class="col-status">
            <span class="status-chip ${statusClass}">
              <span class="dot" style="width:5px; height:5px; border-radius:50%; background:currentColor;"></span>
              ${statusLabel}
            </span>
          </div>

        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    document.querySelectorAll('.update-record-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        selectRecord(id);
      });
    });

    // Render detail panel for selected
    renderDetailPanel();
  }

  // Select a Record
  function selectRecord(id) {
    selectedUpdateId = id;
    document.querySelectorAll('.update-record-card').forEach(c => {
      c.classList.toggle('selected', c.getAttribute('data-id') === id);
    });
    renderDetailPanel();
  }

  // Render Selected Detail Panel
  function renderDetailPanel() {
    const item = FIELD_UPDATES_DATA.find(d => d.id === selectedUpdateId);
    if (!item) return;

    let statusChipLabel = item.status.replace('_', ' ');
    if (item.status === 'pending_review') statusChipLabel = 'Awaiting Review';
    if (item.status === 'verified') statusChipLabel = 'Verified';
    if (item.status === 'unmatched') statusChipLabel = 'Unmatched';
    if (item.status === 'rejected') statusChipLabel = 'Rejected';
    if (item.status === 'submitted') statusChipLabel = 'Submitted';

    // Evidence HTML
    let evidenceHtml = '';
    if (item.evidence && item.evidence.length > 0) {
      evidenceHtml = `
        <div class="evidence-container-box">
          ${item.evidence.map(ev => `
            <div class="evidence-file-card">
              <div class="evidence-file-info">
                <div class="evidence-file-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div class="evidence-file-meta">
                  <span class="evidence-filename" title="${ev.name}">${ev.name}</span>
                  <span class="evidence-filesize">${ev.size} · Uploaded ${ev.date}</span>
                </div>
              </div>
              <button class="evidence-preview-btn" onclick="alert('Viewing authentic field attachment: ${ev.name}')">Preview</button>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      evidenceHtml = `
        <div class="evidence-empty-message">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          No field evidence attached
        </div>
      `;
    }

    // Machine Proposal HTML (Blue Accent!)
    let matchSectionHtml = '';
    if (item.matchProposal) {
      matchSectionHtml = `
        <div class="detail-section-group">
          <span class="detail-section-label">Machine Match Proposal</span>
          <div class="machine-proposal-box">
            <div class="proposal-header">
              <span class="proposal-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                WBS Candidate: ${item.matchProposal.wbsCode}
              </span>
              <span class="proposal-confidence-pct">${item.matchProposal.confidence} Match</span>
            </div>
            <div class="proposal-details-line">${item.matchProposal.wbsTitle}</div>
            <div style="font-size:10.5px; color:#3b82f6; margin-top:2px;">
              Weighted signals: Asset (30%), Discipline (20%), Location (20%), Work (15%), Text (15%)
            </div>
          </div>
        </div>
      `;
    } else {
      matchSectionHtml = `
        <div class="detail-section-group">
          <span class="detail-section-label">Machine Match Proposal</span>
          <div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:10px 12px; font-size:11.5px; color:#64748b;">
            No candidate WBS matched above 45% threshold. Manual association required.
          </div>
        </div>
      `;
    }

    // Dynamic Handoff Actions
    let actionButtonsHtml = '';
    if (item.status === 'pending_review') {
      actionButtonsHtml = `
        <a href="match-review.html?update=${item.id}" class="action-handoff-btn primary-blue" title="Open match review workspace for ${item.id}">
          Review Match →
        </a>
      `;
    } else if (item.status === 'verified') {
      actionButtonsHtml = `
        <a href="index.html#view-schedule" class="action-handoff-btn primary-green" title="Inspect verified activity in Project Schedule">
          View Schedule →
        </a>
      `;
    } else if (item.status === 'unmatched') {
      actionButtonsHtml = `
        <a href="match-review.html?update=${item.id}&mode=manual" class="action-handoff-btn secondary-neutral" title="Search WBS dictionary to link asset">
          Manual WBS Link →
        </a>
      `;
    } else if (item.status === 'rejected') {
      actionButtonsHtml = `
        <button class="action-handoff-btn secondary-neutral" onclick="alert('Rejection audit notes: ${item.rejectionReason}')">
          View Rejection Log
        </button>
      `;
    } else {
      actionButtonsHtml = `
        <a href="match-review.html?update=${item.id}" class="action-handoff-btn primary-blue">
          Run Match Pipeline →
        </a>
      `;
    }

    // Render HTML in detail panel
    detailContainer.innerHTML = `
      <!-- Header -->
      <div class="detail-header-section">
        <div class="detail-top-row">
          <div class="detail-record-badge">
            <span class="detail-update-id">${item.id}</span>
            <span class="asset-tag-badge">${item.assetTag}</span>
          </div>
          <span class="status-chip ${item.status}">
            <span class="dot" style="width:5px; height:5px; border-radius:50%; background:currentColor;"></span>
            ${statusChipLabel}
          </span>
        </div>
        <div class="detail-timestamp-line">
          Submitted: ${item.timestamp} · Reported by <strong>${item.supervisor}</strong>
        </div>

        <!-- Critical Reported vs Verified Distinct Comparison -->
        <div class="reported-vs-verified-banner">
          <!-- Field Reported (Neutral) -->
          <div class="rvv-cell reported" title="Raw progress reported by field operations">
            <span class="rvv-label">Field Reported</span>
            <span class="rvv-val">${item.reportedProgress}</span>
            <span style="font-size:9.5px; color:#64748b;">${item.quantity}</span>
          </div>
          <!-- Project Verified (Green) -->
          <div class="rvv-cell verified" title="Official progress verified by project controls">
            <span class="rvv-label">Project Verified</span>
            <span class="rvv-val">${item.status === 'verified' ? item.reportedProgress : '—'}</span>
            <span style="font-size:9.5px; color:${item.status === 'verified' ? '#047857' : '#64748b'};">
              ${item.status === 'verified' ? 'Acceptance Confirmed' : 'Pending Verification'}
            </span>
          </div>
        </div>
      </div>

      <!-- Detail Body -->
      <div class="detail-body-container">
        
        <!-- Work Description -->
        <div class="detail-section-group">
          <span class="detail-section-label">Field Work Description</span>
          <div class="detail-description-text">${item.description}</div>
        </div>

        <!-- Metadata Grid -->
        <div class="detail-meta-grid">
          <div class="detail-meta-cell">
            <span class="detail-meta-key">Discipline</span>
            <span class="detail-meta-val">${item.discipline}</span>
          </div>
          <div class="detail-meta-cell">
            <span class="detail-meta-key">Work Type</span>
            <span class="detail-meta-val">${item.workType}</span>
          </div>
          <div class="detail-meta-cell">
            <span class="detail-meta-key">Location Area</span>
            <span class="detail-meta-val">${item.location}</span>
          </div>
          <div class="detail-meta-cell">
            <span class="detail-meta-key">Drawing Reference</span>
            <span class="detail-meta-val mono">${item.drawingRef || 'N/A'}</span>
          </div>
        </div>

        <!-- Machine Match Proposal (Blue Accent) -->
        ${matchSectionHtml}

        <!-- Evidence Attachment Box -->
        <div class="detail-section-group">
          <span class="detail-section-label">Field Evidence & QA Signoffs</span>
          ${evidenceHtml}
        </div>

        ${item.rejectionReason ? `
          <div class="detail-section-group">
            <span class="detail-section-label" style="color:#b91c1c;">Rejection Reason</span>
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px 12px; font-size:11.5px; color:#b91c1c; line-height:1.4;">
              ${item.rejectionReason}
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Action Footer -->
      <div class="detail-footer-actions">
        <span style="font-size:11px; color:#64748b; margin-right:auto;">
          ID: ${item.id}
        </span>
        ${actionButtonsHtml}
      </div>
    `;
  }

  // Event Listeners for Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderList();
    });
  });

  // Event Listeners for Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      renderList();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      searchInput.focus();
      renderList();
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

  // Sidebar Collapse
  if (collapseSidebarBtn && sidebar) {
    let collapsed = false;
    collapseSidebarBtn.addEventListener('click', () => {
      collapsed = !collapsed;
      if (collapsed) {
        sidebar.style.width = '68px';
        sidebar.style.minWidth = '68px';
        document.querySelectorAll('.brand-text-block, .search-kbd, .search-input-wrap span, .nav-group-title, .nav-item a span, .nav-badge-pill, .sidebar-footer').forEach(el => {
          el.style.display = 'none';
        });
      } else {
        sidebar.style.width = '240px';
        sidebar.style.minWidth = '240px';
        document.querySelectorAll('.brand-text-block, .search-kbd, .search-input-wrap span, .nav-group-title, .nav-item a span, .nav-badge-pill, .sidebar-footer').forEach(el => {
          el.style.display = '';
        });
      }
    });
  }

  // Initial load
  updateCounts();
  renderList();
});
