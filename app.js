// VeriDate Compliance Dashboard - Core Logic (Warm Minimalist Theme)

// Embedded raw CSV content of QC-005.csv as fallback for local file:// usage
const DEFAULT_CSV_DATA = `批號,品項,製造日期,應標效期,實標效期
b-1000,湯包,1 Feb 2026,項目1,項目3
b-1001,即食雞胸,20260202,項目3,B
BATCH1002,堅果包,2026-03-03,項目2,B
BATCH1003,能量棒,4 May 2026,項目1,項目1
B1004,鮮奶茶,5 Jun 2026,C,A
BATCH1005,氣泡飲,20260606,項目1,C
b-1006,堅果包,20260707,項目2,
BATCH1007,氣泡飲,20260808,項目1,項目1
B1008,蛋捲,9 Apr 2026,項目3,B
b-1009,能量棒,10 May 2026,項目1,A
B1010,布丁,2026/11/11,項目3,C
b-1011,湯包,2026-12-12,項目2,B
b-1012,氣泡飲,2026-01-13,B,項目1
b-1013,冷凍水餃,,B,B
BATCH1014,泡芙,15 Apr 2026,C,項目1
B1015,即食雞胸,2026/4/16,C,C
BATCH1016,果醬,17 Jun 2026,A,C
B1017,鮮奶茶,18 Jan 2026,A,項目2
b-1018,果醬,19 Feb 2026,項目2,C
BATCH1019,泡芙,20 Mar 2026,B,C
B1020,鮮奶茶,2026/9/21,C,A
b-1021,沙拉醬,20261022,項目1,B
B1022,布丁,23 Jun 2026,項目1,B
b-1023,原味吐司,24 Jan 2026,B,A
,氣泡飲,25 Feb 2026,C,項目1
BATCH1025,巧克力餅乾,2026/2/26,B,項目1
BATCH1026,鮮奶茶,2026/3/27,B,A
BATCH1027,蛋捲,2026-04-28,項目1,C
,湯包,1 Jun 2026,A,A
BATCH1029,鮮奶茶,2 Jan 2026,項目1,項目2
BATCH1030,氣泡飲,3 Feb 2026,A,B
BATCH1031,堅果包,20260804,項目1,A
BATCH1032,泡芙,2026/9/5,B,A
B1033,原味吐司,2026-10-06,項目3,A
B1034,泡芙,2026-11-07,B,C
b-1035,杯裝優格,20261208,C,C
B1036,即食雞胸,9 Feb 2026,C,B
B1037,冷凍水餃,2026-02-10,項目2,項目3
B1038,巧克力餅乾,2026/3/11,B,B
B1039,即食雞胸,2026-04-12,B,項目3
B1040,果醬,13 Jun 2026,項目2,C
B1041,冷凍水餃,14 Jan 2026,項目2,A
b-1042,冷凍水餃,2026-07-15,項目3,項目1
B1043,布丁,20260816,項目1,A
B1044,能量棒,2026-09-17,A,項目1
b-1045,能量棒,20261018,項目2,項目2
b-1046,氣泡飲,2026/11/19,項目1,項目2
BATCH1047,布丁,2026/12/20,項目2,項目2
B1048,能量棒,21 Feb 2026,C,項目3
b-1049,冷凍水餃,2026-02-22,項目1,B
b-1050,能量棒,23 Apr 2026,B,項目1
b-1051,原味吐司,2026/4/24,A,A
b-1052,湯包,2026/5/25,項目3,項目3
b-1053,湯包,2026/6/26,A,C
b-1054,冷凍水餃,2026/7/27,C,C
b-1055,布丁,20260828,項目1,項目3
BATCH1056,蛋捲,1 Apr 2026,項目1,項目2
B1057,鮮奶茶,2026/10/2,項目2,B
B1058,鮮奶茶,20261103,項目1,項目1
BATCH1059,即食雞胸,2026-12-04,C,C
b-1060,果醬,20260105,項目2,A
B1061,鮮奶茶,2026-02-06,C,C
B1062,果醬,2026/3/7,項目2,項目1
b-1063,冷凍水餃,8 May 2026,A,C
b-1064,布丁,9 Jun 2026,B,項目3
B1065,即食雞胸,2026/6/10,項目3,項目1
b-1066,原味吐司,2026-07-11,A,項目1
BATCH1067,沙拉醬,2026-08-12,項目2,項目1
B1068,果醬,2026-09-13,項目1,A
B1069,巧克力餅乾,20261014,A,A
BATCH1070,能量棒,2026-11-15,B,C
B1071,泡芙,20261216,A,項目3
B1072,果醬,17 Feb 2026,B,C
BATCH1073,巧克力餅乾,20260218,A,C
BATCH1074,冷凍水餃,2026-03-19,項目2,B
B1075,即食雞胸,2026-04-20,項目2,C
B1076,堅果包,2026/5/21,C,A
b-1077,,2026/6/22,項目2,項目2
b-1078,鮮奶茶,23 Feb 2026,項目3,C
b-1079,蛋捲,24 Mar 2026,項目2,項目3
b-1080,果醬,2026-09-25,B,C
B1081,堅果包,20261026,C,項目1
B1082,鮮奶茶,2026/11/27,項目2,C
B1083,湯包,2026-12-28,項目2,A
b-1084,原味吐司,20260101,A,項目3
B1085,蛋捲,20260202,A,項目2
b-1086,氣泡飲,3 Apr 2026,B,A
B1087,堅果包,4 May 2026,C,B
b-1088,果醬,2026-05-05,項目3,項目3
b-1089,即食雞胸,20260606,C,項目1
BATCH1090,湯包,7 Feb 2026,B,項目3
B1091,即食雞胸,8 Mar 2026,A,C
B1092,杯裝優格,2026-09-09,項目1,項目2
b-1093,湯包,2026/10/10,項目1,B
BATCH1094,泡芙,2026-11-11,項目3,項目3
b-1095,沙拉醬,2026/12/12,B,項目2
b-1096,,2026-01-13,項目2,C
B1097,即食雞胸,2026/2/14,項目2,C
BATCH1098,果醬,2026-03-15,B,B
BATCH1099,原味吐司,16 May 2026,B,項目2
BATCH1047,布丁,2026/12/20,項目2,項目2`;

// State Variables
let rawDataList = [];
let processedDataList = [];
let currentFilter = 'all';
let searchQuery = '';
let currentPage = 1;
const itemsPerPage = 15;
let currentViewMode = 'table'; // 'table' or 'cards'

// Charts instances
let statusChart = null;
let errorTypeChart = null;

// Product Image Mapping
const PRODUCT_IMAGES = {
  '原味吐司': 'images/toast.png',
  '鮮奶茶': 'images/milktea.png',
  '氣泡飲': 'images/milktea.png',
  '巧克力餅乾': 'images/cookies.png',
  '蛋捲': 'images/cookies.png',
  '杯裝優格': 'images/yogurt.png',
  '布丁': 'images/yogurt.png',
  '泡芙': 'images/yogurt.png'
};

// Fallback visual emojis for organic paper illustration
const PRODUCT_PLACEHOLDER_ICONS = {
  '湯包': '🍲',
  '即食雞胸': '🍗',
  '堅果包': '🌰',
  '能量棒': '🍫',
  '果醬': '🍯',
  '沙拉醬': '🥗',
  '冷凍水餃': '🥟'
};

// Months dictionary for English abbreviations
const MONTHS_MAP = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
};

document.addEventListener('DOMContentLoaded', () => {
  initDropZone();
  initFilters();
  initSearch();
  initExport();
  initViewToggle();
  initAnalyticsToggle();
  
  // Try to load default data initially
  loadCSVString(DEFAULT_CSV_DATA);
});

// Mobile Collapsible Analytics Panel
function initAnalyticsToggle() {
  const toggleBtn = document.getElementById('toggleAnalyticsBtn');
  const collapsePanel = document.getElementById('analyticsCollapsePanel');
  
  if (!toggleBtn || !collapsePanel) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = window.getComputedStyle(collapsePanel).display === 'none';
    if (isHidden) {
      collapsePanel.style.setProperty('display', 'block', 'important');
      toggleBtn.classList.add('active');
      if (statusChart) statusChart.resize();
      if (errorTypeChart) errorTypeChart.resize();
    } else {
      collapsePanel.style.setProperty('display', 'none', 'important');
      toggleBtn.classList.remove('active');
    }
  });
}

// View Toggle (Table vs Cards)
function initViewToggle() {
  const toggleTableBtn = document.getElementById('viewToggleTable');
  const toggleCardsBtn = document.getElementById('viewToggleCards');
  
  const tableWrapper = document.getElementById('dataTableWrapper');
  const cardsWrapper = document.getElementById('dataCardsWrapper');

  toggleTableBtn.addEventListener('click', () => {
    currentViewMode = 'table';
    toggleTableBtn.classList.add('active');
    toggleCardsBtn.classList.remove('active');
    tableWrapper.style.display = 'block';
    cardsWrapper.style.display = 'none';
    filterAndRenderData();
  });

  toggleCardsBtn.addEventListener('click', () => {
    currentViewMode = 'cards';
    toggleCardsBtn.classList.add('active');
    toggleTableBtn.classList.remove('active');
    tableWrapper.style.display = 'none';
    cardsWrapper.style.display = 'block';
    filterAndRenderData();
  });
}

// Get Product Image/Illustration HTML
function getProductImageHtml(item, isCard = false) {
  const cleanItem = item?.trim() || '';
  const imagePath = PRODUCT_IMAGES[cleanItem];

  if (imagePath) {
    if (isCard) {
      return `<img src="${imagePath}" class="card-image" alt="${cleanItem}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
              <div class="card-placeholder" style="display:none; background:#ebe6dc;">🎨</div>`;
    } else {
      return `<img src="${imagePath}" class="table-product-thumb" alt="${cleanItem}" onerror="this.outerHTML='🏷️'">`;
    }
  } else {
    // Generate beautiful earthy gradient for placeholder
    const emoji = PRODUCT_PLACEHOLDER_ICONS[cleanItem] || '🏷️';
    const gradients = [
      'linear-gradient(135deg, #e4e9e4 0%, #cbd4cb 100%)', // Sage
      'linear-gradient(135deg, #f2ece4 0%, #dfd3c3 100%)', // Wheat/Sand
      'linear-gradient(135deg, #eae4e9 0%, #d8c3d4 100%)', // Lavender
      'linear-gradient(135deg, #f4ebdb 0%, #decbae 100%)', // Straw
      'linear-gradient(135deg, #f1e3e3 0%, #dbbfbf 100%)'  // Terracotta
    ];
    // Hash product name to pick a stable gradient
    const charSum = Array.from(cleanItem).reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const gradient = gradients[charSum % gradients.length];

    if (isCard) {
      return `
        <div class="card-placeholder" style="background: ${gradient};">
          <div style="font-size: 3.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));">${emoji}</div>
        </div>
      `;
    } else {
      return `
        <div class="table-product-thumb" style="background: ${gradient}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; border-radius: 6px;">
          ${emoji}
        </div>
      `;
    }
  }
}

// Drop Zone Setup
function initDropZone() {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const loadDefaultBtn = document.getElementById('loadDefaultBtn');

  dropZone.addEventListener('click', (e) => {
    if (e.target !== loadDefaultBtn) {
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  loadDefaultBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    loadCSVString(DEFAULT_CSV_DATA);
  });
}

function handleFile(file) {
  if (!file.name.endsWith('.csv')) {
    alert('僅支援上傳 CSV 格式的檔案！');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    loadCSVString(e.target.result);
  };
  reader.readAsText(file, 'UTF-8');
}

// CSV Loader & Analyzer
function loadCSVString(csvText) {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return;

  rawDataList = [];
  processedDataList = [];
  
  const headers = parseCSVLine(lines[0]);
  const seenRecords = new Set();
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < 5) continue;

    const record = {
      id: i,
      batch: values[0]?.trim() || '',
      item: values[1]?.trim() || '',
      mfgDateStr: values[2]?.trim() || '',
      expected: values[3]?.trim() || '',
      actual: values[4]?.trim() || ''
    };

    rawDataList.push(record);
    
    // Perform Compliance Audit
    const auditResult = performAudit(record, seenRecords);
    processedDataList.push({
      ...record,
      ...auditResult
    });

    const sig = `${record.batch}|${record.item}|${record.mfgDateStr}|${record.expected}|${record.actual}`;
    seenRecords.add(sig);
  }

  currentPage = 1;
  updateMetrics();
  renderCharts();
  filterAndRenderData();
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Auditing Engine
function performAudit(record, seenRecords) {
  let isCompliant = true;
  let statusClass = 'success';
  let statusText = '合規';
  let category = 'compliant';
  let reason = '';
  
  const missingFields = [];
  if (!record.batch) missingFields.push('批號');
  if (!record.item) missingFields.push('品項');
  if (!record.mfgDateStr) missingFields.push('製造日期');
  if (!record.actual) missingFields.push('實標效期');
  
  let mfgDateFormatted = 'N/A';
  let isDateInvalid = false;
  
  if (record.mfgDateStr) {
    const parsedDate = parseMfgDate(record.mfgDateStr);
    if (parsedDate) {
      mfgDateFormatted = parsedDate;
    } else {
      isDateInvalid = true;
    }
  }

  const sig = `${record.batch}|${record.item}|${record.mfgDateStr}|${record.expected}|${record.actual}`;
  const isDuplicate = seenRecords.has(sig);

  if (missingFields.length > 0) {
    isCompliant = false;
    statusClass = 'warning';
    statusText = '欄位缺失';
    category = 'missing';
    reason = `${missingFields.join('、')} 欄位缺失`;
  } else if (isDateInvalid) {
    isCompliant = false;
    statusClass = 'warning';
    statusText = '日期錯誤';
    category = 'missing';
    reason = `製造日期「${record.mfgDateStr}」格式無法解析`;
  } else if (isDuplicate) {
    isCompliant = false;
    statusClass = 'warning';
    statusText = '重複資料';
    category = 'duplicate';
    reason = '與先前記錄完全重複';
  } else if (record.expected !== record.actual) {
    isCompliant = false;
    statusClass = 'danger';
    statusText = '效期不符';
    category = 'mismatch';
    reason = `應標 ${record.expected}，實標 ${record.actual}`;
  }

  return {
    isCompliant,
    statusClass,
    statusText,
    category,
    reason,
    mfgDateFormatted
  };
}

function parseMfgDate(dateStr) {
  dateStr = dateStr.trim();
  
  const match1 = dateStr.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (match1) return `${match1[1]}-${match1[2]}-${match1[3]}`;
  
  const match2 = dateStr.match(/^(\d{4})[\-\/](\d{1,2})[\-\/](\d{1,2})$/);
  if (match2) {
    const m = match2[2].padStart(2, '0');
    const d = match2[3].padStart(2, '0');
    return `${match2[1]}-${m}-${d}`;
  }

  const match3 = dateStr.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match3) {
    const monthAbbrev = match3[2].substring(0, 3).toLowerCase();
    const m = MONTHS_MAP[monthAbbrev];
    if (m) {
      const d = match3[1].padStart(2, '0');
      return `${match3[3]}-${m}-${d}`;
    }
  }
  return null;
}

// Metrics Update
function updateMetrics() {
  const total = processedDataList.length;
  const compliantCount = processedDataList.filter(d => d.isCompliant).length;
  const violationCount = total - compliantCount;
  const complianceRate = total > 0 ? ((compliantCount / total) * 100).toFixed(1) : '0';

  document.getElementById('metricTotal').textContent = total;
  document.getElementById('metricCompliance').textContent = `${complianceRate}%`;
  document.getElementById('metricCompliant').textContent = compliantCount;
  document.getElementById('metricViolations').textContent = violationCount;
}

// Charts Renderer (Warm Minimalist Theme colors)
function renderCharts() {
  const compliantCount = processedDataList.filter(d => d.isCompliant).length;
  const total = processedDataList.length;
  const violations = total - compliantCount;

  // Chart 1: Compliance Ratio (Sage Green vs dusty Rose)
  if (statusChart) statusChart.destroy();
  const ctx1 = document.getElementById('statusChart').getContext('2d');
  statusChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: ['標示合規', '標示異常'],
      datasets: [{
        data: [compliantCount, violations],
        backgroundColor: ['#6e8a76', '#c47a76'], // Sage vs Dusty Rose
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#726c66', font: { family: 'Noto Sans TC, serif', size: 12 } }
        }
      },
      cutout: '72%'
    }
  });

  // Chart 2: Violation categories
  const categories = { mismatch: 0, missing: 0, duplicate: 0 };
  processedDataList.forEach(item => {
    if (!item.isCompliant) {
      categories[item.category] = (categories[item.category] || 0) + 1;
    }
  });

  if (errorTypeChart) errorTypeChart.destroy();
  const ctx2 = document.getElementById('errorTypeChart').getContext('2d');
  errorTypeChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['效期不符 (錯誤)', '欄位/日期缺失', '重複上報'],
      datasets: [{
        label: '異常次數',
        data: [categories.mismatch, categories.missing, categories.duplicate],
        backgroundColor: ['#c47a76', '#d9b48f', '#9b948c'], // Rose, Ochre, Sand Gray
        borderColor: ['#b46a66', '#c9a47f', '#8b847c'],
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(140, 123, 108, 0.08)' },
          ticks: { color: '#726c66', precision: 0, font: { family: 'Noto Sans TC' } }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#726c66', font: { family: 'Noto Sans TC' } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Table/Card Filters
function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      currentPage = 1;
      filterAndRenderData();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    currentPage = 1;
    filterAndRenderData();
  });
}

// Core Rendering Hub
function filterAndRenderData() {
  let filtered = processedDataList;

  if (currentFilter === 'compliant') {
    filtered = filtered.filter(d => d.isCompliant);
  } else if (currentFilter === 'violations') {
    filtered = filtered.filter(d => !d.isCompliant);
  } else if (currentFilter === 'mismatch') {
    filtered = filtered.filter(d => d.category === 'mismatch');
  } else if (currentFilter === 'missing') {
    filtered = filtered.filter(d => d.category === 'missing');
  } else if (currentFilter === 'duplicate') {
    filtered = filtered.filter(d => d.category === 'duplicate');
  }

  if (searchQuery) {
    filtered = filtered.filter(d => 
      d.batch.toLowerCase().includes(searchQuery) ||
      d.item.toLowerCase().includes(searchQuery) ||
      d.mfgDateStr.toLowerCase().includes(searchQuery)
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pagedItems = filtered.slice(startIndex, endIndex);

  if (currentViewMode === 'table') {
    renderListViewTable(pagedItems);
  } else {
    renderCardsViewGrid(pagedItems);
  }

  updatePaginationControls(startIndex + 1, endIndex, totalItems, totalPages);
}

// 1. Render Table List View
function renderListViewTable(items) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  if (items.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">
            <div class="empty-state-icon"><i data-lucide="inbox"></i></div>
            <p>沒有符合當前搜尋或篩選條件的資料</p>
          </div>
        </td>
      </tr>
    `;
    lucide.createIcons();
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    if (item.category === 'duplicate') tr.classList.add('duplicate-row');
    
    tr.innerHTML = `
      <td><span style="font-family: monospace; font-size: 0.85rem; color: var(--primary); font-weight: 500;">${item.batch || '<無批號>'}</span></td>
      <td>
        <div class="table-product-cell">
          ${getProductImageHtml(item.item, false)}
          <div><strong>${item.item || '<無品項>'}</strong></div>
        </div>
      </td>
      <td>
        <div style="font-size: 0.85rem; font-weight:500;">${item.mfgDateFormatted}</div>
        ${item.mfgDateStr && item.mfgDateStr !== item.mfgDateFormatted ? `<div style="font-size: 0.7rem; color: var(--text-muted);">原標: ${item.mfgDateStr}</div>` : ''}
      </td>
      <td><span class="badge badge-secondary">${item.expected || 'N/A'}</span></td>
      <td>
        <span class="badge ${item.isCompliant ? 'badge-success' : (item.statusClass === 'danger' ? 'badge-danger' : 'badge-warning')}">
          ${item.actual || 'N/A'}
        </span>
      </td>
      <td>
        <span class="badge ${item.isCompliant ? 'badge-success' : (item.statusClass === 'danger' ? 'badge-danger' : 'badge-warning')}">
          ${item.statusText}
        </span>
        ${item.reason ? `<div class="violation-detail"><i data-lucide="alert-circle" style="width: 12px; height: 12px;"></i>${item.reason}</div>` : ''}
      </td>
    `;
    tableBody.appendChild(tr);
  });

  lucide.createIcons();
}

// 2. Render Polaroid Cards Grid View
function renderCardsViewGrid(items) {
  const cardsWrapper = document.getElementById('dataCardsWrapper');
  cardsWrapper.innerHTML = '';

  if (items.length === 0) {
    cardsWrapper.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i data-lucide="inbox"></i></div>
        <p>沒有符合當前搜尋或篩選條件的資料</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    if (item.category === 'duplicate') card.classList.add('duplicate-row');

    card.innerHTML = `
      <div class="card-image-wrapper">
        ${getProductImageHtml(item.item, true)}
        <span class="card-badge badge ${item.isCompliant ? 'badge-success' : (item.statusClass === 'danger' ? 'badge-danger' : 'badge-warning')}">
          ${item.statusText}
        </span>
      </div>
      <div class="card-content">
        <div class="card-item-name">${item.item || '<無品項>'}</div>
        <div class="card-batch">${item.batch || '<無批號>'}</div>
        
        <div class="card-info-row">
          <span class="card-info-label">製造日期</span>
          <span style="font-weight:500;">${item.mfgDateFormatted}</span>
        </div>
        <div class="card-info-row">
          <span class="card-info-label">應標效期</span>
          <span class="badge badge-secondary" style="padding: 0.1rem 0.4rem; font-size: 0.7rem;">${item.expected || 'N/A'}</span>
        </div>
        <div class="card-info-row">
          <span class="card-info-label">實標效期</span>
          <span class="badge ${item.isCompliant ? 'badge-success' : (item.statusClass === 'danger' ? 'badge-danger' : 'badge-warning')}" style="padding: 0.1rem 0.4rem; font-size: 0.7rem;">
            ${item.actual || 'N/A'}
          </span>
        </div>
        
        ${item.reason ? `
          <div class="card-reason">
            <i data-lucide="alert-circle" style="width: 13px; height: 13px;"></i>
            <span>${item.reason}</span>
          </div>
        ` : ''}
      </div>
    `;
    cardsWrapper.appendChild(card);
  });

  lucide.createIcons();
}

// Pagination Logic
function updatePaginationControls(start, end, total, totalPages) {
  const infoSpan = document.getElementById('paginationInfo');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');

  if (total === 0) {
    infoSpan.textContent = '顯示 0 - 0 / 共 0 筆';
  } else {
    infoSpan.textContent = `顯示 ${start} - ${end} / 共 ${total} 筆`;
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  const newPrevBtn = prevBtn.cloneNode(true);
  const newNextBtn = nextBtn.cloneNode(true);
  
  prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
  nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

  newPrevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      filterAndRenderData();
    }
  });

  newNextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      filterAndRenderData();
    }
  });
}

// Export Audit Report
function initExport() {
  const exportBtn = document.getElementById('exportBtn');
  exportBtn.addEventListener('click', () => {
    if (processedDataList.length === 0) {
      alert('無資料可導出！');
      return;
    }
    
    let csvContent = '批號,品項,製造日期,製造日期_標準格式,應標效期,實標效期,檢查結果,異常說明\r\n';
    
    processedDataList.forEach(item => {
      const row = [
        `"${item.batch}"`,
        `"${item.item}"`,
        `"${item.mfgDateStr}"`,
        `"${item.mfgDateFormatted}"`,
        `"${item.expected}"`,
        `"${item.actual}"`,
        `"${item.statusText}"`,
        `"${item.reason || ''}"`
      ];
      csvContent += row.join(',') + '\r\n';
    });

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VeriDate_Compliance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
