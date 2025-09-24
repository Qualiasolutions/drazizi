// Application data
const reservoirData = [
  {"date": "7/31/2019", "well": "MN-0002HST1", "x": 746887.95, "y": 3214609.83, "oilRate": 534.6, "waterCut": 0.4, "gor": 0.041, "cumOil": 3.0, "activeWells": 1},
  {"date": "8/31/2019", "well": "MN-0002HST1", "x": 746887.95, "y": 3214609.83, "oilRate": 596.4, "waterCut": 5.6, "gor": 0.037, "cumOil": 17.5, "activeWells": 1},
  {"date": "9/30/2019", "well": "MN-0002HST1", "x": 746887.95, "y": 3214609.83, "oilRate": 626.7, "waterCut": 3.2, "gor": 0.040, "cumOil": 36.3, "activeWells": 1},
  {"date": "10/31/2019", "well": "MN-0002HST1", "x": 746887.95, "y": 3214609.83, "oilRate": 575.4, "waterCut": 0.3, "gor": 0.041, "cumOil": 54.1, "activeWells": 1},
  {"date": "11/30/2019", "well": "MN-0002HST1", "x": 746887.95, "y": 3214609.83, "oilRate": 597.5, "waterCut": 0.2, "gor": 0.044, "cumOil": 72.1, "activeWells": 1}
];

const aiInsights = [
  "Well MN-0002HST1 shows strong initial production with 534.6 bbl/day oil rate",
  "Water cut fluctuation suggests reservoir heterogeneity - monitor completion efficiency", 
  "GOR remains stable around 0.04 - indicates good reservoir pressure maintenance",
  "Recommend production optimization for wells showing >10% decline rate",
  "Northern field sector shows 15% higher productivity than southern wells"
];

const kpis = {
  totalOilProduction: 451.30,
  averageWaterCut: 10.60,
  activeWells: 56,
  fieldDeclineRate: 8.5
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart instances
let productionChart = null;
let wellLocationChart = null;
let watercutChart = null;
let gorChart = null;
let declineChart = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeFilters();
  initializeCharts();
  updateKPIs();
  setupEventListeners();
});

// Initialize filter event listeners
function initializeFilters() {
  document.getElementById('wellFilter').addEventListener('change', filterData);
  document.getElementById('dateFilter').addEventListener('change', filterData);
  document.getElementById('reservoirFilter').addEventListener('change', filterData);
  document.getElementById('productionView').addEventListener('change', updateProductionChart);
}

// Setup other event listeners
function setupEventListeners() {
  // AI query input
  document.getElementById('aiQuery').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      submitAiQuery();
    }
  });
  
  // Tab click listeners
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.textContent.toLowerCase().replace(' ', '');
      let tabId = '';
      if (tabName.includes('water')) tabId = 'watercut';
      else if (tabName.includes('gor')) tabId = 'gor';
      else if (tabName.includes('decline')) tabId = 'decline';
      
      if (tabId) switchTab(tabId);
    });
  });
}

// Initialize all charts
function initializeCharts() {
  createProductionChart();
  createWellLocationChart();
  createWatercutChart();
  createGorChart();
  createDeclineChart();
}

// Production Chart
function createProductionChart() {
  const ctx = document.getElementById('productionChart').getContext('2d');
  
  const dates = reservoirData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
  const oilRates = reservoirData.map(d => d.oilRate);
  
  productionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Oil Production',
        data: oilRates,
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '20',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors[0],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }, {
        label: 'AI Prediction',
        data: generatePredictionData(oilRates),
        borderColor: chartColors[1],
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} bbl/day`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Oil Rate (bbl/day)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      }
    }
  });
}

// Well Location Chart
function createWellLocationChart() {
  const ctx = document.getElementById('wellLocationChart').getContext('2d');
  
  // Create multiple wells for better visualization
  const wellLocations = [
    { x: 746887.95, y: 3214609.83, oilRate: 534.6, well: 'MN-0002HST1' },
    { x: 746900.00, y: 3214620.00, oilRate: 596.4, well: 'MN-0010' },
    { x: 746850.00, y: 3214580.00, oilRate: 626.7, well: 'MN-0002' },
    { x: 746920.00, y: 3214650.00, oilRate: 575.4, well: 'MN-0003' },
    { x: 746870.00, y: 3214590.00, oilRate: 597.5, well: 'MN-0004' }
  ];
  
  wellLocationChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Wells',
        data: wellLocations,
        backgroundColor: function(context) {
          const value = context.parsed?.oilRate || context.raw?.oilRate;
          if (value > 600) return chartColors[2]; // High production
          if (value > 550) return chartColors[1]; // Medium production
          return chartColors[3]; // Low production
        },
        pointRadius: 12,
        pointHoverRadius: 15,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              return `Well: ${context[0].raw.well}`;
            },
            label: function(context) {
              return [
                `X: ${context.raw.x.toFixed(2)}`,
                `Y: ${context.raw.y.toFixed(2)}`,
                `Oil Rate: ${context.raw.oilRate} bbl/day`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'X Coordinate'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Y Coordinate'
          }
        }
      },
      onClick: function(event, elements) {
        if (elements.length > 0) {
          const index = elements[0].index;
          const wellData = wellLocations[index];
          showWellModal(wellData);
        }
      }
    }
  });
}

// Water Cut Chart
function createWatercutChart() {
  const ctx = document.getElementById('watercutChart').getContext('2d');
  
  const dates = reservoirData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short' }));
  const waterCuts = reservoirData.map(d => d.waterCut);
  
  watercutChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: 'Water Cut %',
        data: waterCuts,
        backgroundColor: chartColors[4],
        borderColor: chartColors[4],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Water Cut: ${context.parsed.y.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Water Cut (%)'
          }
        }
      }
    }
  });
}

// GOR Chart
function createGorChart() {
  const ctx = document.getElementById('gorChart').getContext('2d');
  
  const dates = reservoirData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short' }));
  const gors = reservoirData.map(d => d.gor);
  
  gorChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'GOR',
        data: gors,
        borderColor: chartColors[5],
        backgroundColor: chartColors[5] + '20',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors[5],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `GOR: ${context.parsed.y.toFixed(3)} scf/bbl`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'GOR (scf/bbl)'
          }
        }
      }
    }
  });
}

// Decline Chart
function createDeclineChart() {
  const ctx = document.getElementById('declineChart').getContext('2d');
  
  const cumOils = reservoirData.map(d => d.cumOil);
  const oilRates = reservoirData.map(d => d.oilRate);
  
  declineChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Decline Curve',
        data: cumOils.map((x, i) => ({ x: x, y: oilRates[i] })),
        backgroundColor: chartColors[6],
        borderColor: chartColors[6],
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return [
                `Cumulative Oil: ${context.parsed.x.toFixed(1)} Mbbl`,
                `Oil Rate: ${context.parsed.y.toFixed(1)} bbl/day`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Cumulative Oil (Mbbl)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Oil Rate (bbl/day)'
          }
        }
      }
    }
  });
}

// Generate prediction data for production chart
function generatePredictionData(actualData) {
  const lastValue = actualData[actualData.length - 1];
  const predictions = [...actualData];
  
  // Add 3 predicted points with decline
  for (let i = 1; i <= 3; i++) {
    predictions.push(lastValue * (1 - 0.08 * i)); // 8% decline rate
  }
  
  return predictions;
}

// Filter data based on selections
function filterData() {
  const wellFilter = document.getElementById('wellFilter').value;
  const dateFilter = document.getElementById('dateFilter').value;
  const reservoirFilter = document.getElementById('reservoirFilter').value;
  
  let filteredData = [...reservoirData];
  
  if (wellFilter !== 'all') {
    filteredData = filteredData.filter(d => d.well === wellFilter);
  }
  
  if (dateFilter !== 'all') {
    const currentDate = new Date();
    if (dateFilter === '2019') {
      filteredData = filteredData.filter(d => new Date(d.date).getFullYear() === 2019);
    } else if (dateFilter === '6m') {
      const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
      filteredData = filteredData.filter(d => new Date(d.date) >= sixMonthsAgo);
    } else if (dateFilter === '3m') {
      const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
      filteredData = filteredData.filter(d => new Date(d.date) >= threeMonthsAgo);
    }
  }
  
  updateChartsWithFilteredData(filteredData);
}

// Update charts with filtered data
function updateChartsWithFilteredData(data) {
  // Update production chart
  const dates = data.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
  const oilRates = data.map(d => d.oilRate);
  
  productionChart.data.labels = dates;
  productionChart.data.datasets[0].data = oilRates;
  productionChart.data.datasets[1].data = generatePredictionData(oilRates);
  productionChart.update();
  
  // Update other charts similarly
  updateWatercutChart(data);
  updateGorChart(data);
  updateDeclineChart(data);
}

function updateWatercutChart(data) {
  const dates = data.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short' }));
  const waterCuts = data.map(d => d.waterCut);
  
  watercutChart.data.labels = dates;
  watercutChart.data.datasets[0].data = waterCuts;
  watercutChart.update();
}

function updateGorChart(data) {
  const dates = data.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short' }));
  const gors = data.map(d => d.gor);
  
  gorChart.data.labels = dates;
  gorChart.data.datasets[0].data = gors;
  gorChart.update();
}

function updateDeclineChart(data) {
  const cumOils = data.map(d => d.cumOil);
  const oilRates = data.map(d => d.oilRate);
  
  declineChart.data.datasets[0].data = cumOils.map((x, i) => ({ x: x, y: oilRates[i] }));
  declineChart.update();
}

// Update production chart view
function updateProductionChart() {
  const view = document.getElementById('productionView').value;
  // Implementation would switch between individual wells and combined view
  // For now, just update the chart
  productionChart.update();
}

// Update KPIs
function updateKPIs() {
  document.getElementById('totalOilProduction').textContent = kpis.totalOilProduction.toFixed(2);
  document.getElementById('averageWaterCut').textContent = kpis.averageWaterCut.toFixed(1);
  document.getElementById('activeWells').textContent = kpis.activeWells;
  document.getElementById('fieldDeclineRate').textContent = kpis.fieldDeclineRate.toFixed(1);
}

// AI Assistant functionality
function submitAiQuery() {
  const query = document.getElementById('aiQuery').value.trim();
  if (!query) return;
  
  // Add user message
  addAiMessage('You', query, true);
  
  // Clear input
  document.getElementById('aiQuery').value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Simulate AI response
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateAiResponse(query);
    addAiMessage('AI', response, false);
  }, 1500);
}

function addAiMessage(sender, message, isUser = false) {
  const chatContainer = document.getElementById('aiChat');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'ai-message';
  
  messageDiv.innerHTML = `
    <div class="ai-avatar">${isUser ? 'U' : 'AI'}</div>
    <div class="ai-content">
      <p>${message}</p>
    </div>
  `;
  
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
  const chatContainer = document.getElementById('aiChat');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message typing-indicator-message';
  typingDiv.innerHTML = `
    <div class="ai-avatar">AI</div>
    <div class="ai-content">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  
  chatContainer.appendChild(typingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator-message');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function generateAiResponse(query) {
  const responses = {
    'maintenance': 'Based on current production data, wells MN-0002HST1 requires ESP optimization due to declining production rates.',
    'production': 'Current field production shows a stable trend with average 586 bbl/day. Consider waterflood adjustment for optimal recovery.',
    'decline': 'Field decline rate is 8.5%, which is within acceptable range. Monitor GOR trends for early gas breakthrough detection.',
    'water': 'Water cut analysis shows varying levels across the field. Northern sector requires attention with increasing water production.',
    'optimization': 'Recommend ESP frequency adjustment and artificial lift optimization for wells showing >10% decline rate.',
    'default': 'I can help you analyze well performance, production optimization, decline curves, and reservoir management. What specific area would you like to explore?'
  };
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('maintenance') || lowerQuery.includes('repair')) {
    return responses.maintenance;
  } else if (lowerQuery.includes('production') || lowerQuery.includes('rate')) {
    return responses.production;
  } else if (lowerQuery.includes('decline') || lowerQuery.includes('decrease')) {
    return responses.decline;
  } else if (lowerQuery.includes('water') || lowerQuery.includes('cut')) {
    return responses.water;
  } else if (lowerQuery.includes('optimize') || lowerQuery.includes('improve')) {
    return responses.optimization;
  } else {
    return responses.default;
  }
}

// Tab functionality
function switchTab(tabName) {
  // Remove active class from all tabs and content
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Add active class to clicked tab and content
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach(tab => {
    if ((tabName === 'watercut' && tab.textContent.includes('Water')) ||
        (tabName === 'gor' && tab.textContent.includes('GOR')) ||
        (tabName === 'decline' && tab.textContent.includes('Decline'))) {
      tab.classList.add('active');
    }
  });
  
  document.getElementById(tabName + '-tab').classList.add('active');
}

// Well modal functionality
function showWellModal(wellData) {
  const modal = document.getElementById('wellModal');
  const modalWellName = document.getElementById('modalWellName');
  const modalWellData = document.getElementById('modalWellData');
  
  modalWellName.textContent = `Well ${wellData.well}`;
  modalWellData.innerHTML = `
    <div class="modal-data-grid">
      <div class="data-item">
        <label>Oil Rate:</label>
        <span>${wellData.oilRate} bbl/day</span>
      </div>
      <div class="data-item">
        <label>Water Cut:</label>
        <span>${wellData.waterCut || 'N/A'}%</span>
      </div>
      <div class="data-item">
        <label>GOR:</label>
        <span>${wellData.gor || 'N/A'} scf/bbl</span>
      </div>
      <div class="data-item">
        <label>Location:</label>
        <span>X: ${wellData.x.toFixed(2)}</span>
      </div>
      <div class="data-item">
        <label>Coordinates:</label>
        <span>Y: ${wellData.y.toFixed(2)}</span>
      </div>
      <div class="data-item">
        <label>Status:</label>
        <span>Active</span>
      </div>
    </div>
    <div class="modal-actions" style="margin-top: 20px;">
      <button class="btn btn--primary btn--sm" onclick="optimizeWell('${wellData.well}')">Optimize Well</button>
      <button class="btn btn--secondary btn--sm" onclick="viewWellHistory('${wellData.well}')">View History</button>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function closeWellModal() {
  document.getElementById('wellModal').classList.add('hidden');
}

function optimizeWell(wellName) {
  closeWellModal();
  addAiMessage('AI', `Analyzing optimization opportunities for ${wellName}... Recommend ESP frequency adjustment and artificial lift optimization.`, false);
}

function viewWellHistory(wellName) {
  closeWellModal();
  addAiMessage('AI', `Displaying production history for ${wellName}... Historical data shows stable production with minor water cut variations.`, false);
}

// Theme toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  
  // Update theme toggle icon
  const toggle = document.querySelector('.theme-toggle');
  toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Utility functions
function refreshData() {
  // Show loading state
  showLoadingState();
  
  setTimeout(() => {
    hideLoadingState();
    filterData();
    updateKPIs();
    addAiMessage('AI', 'Data refreshed successfully! All charts and metrics have been updated with the latest information.', false);
  }, 2000);
}

function generateReport() {
  addAiMessage('AI', 'Generating comprehensive reservoir analytics report... This includes production trends, decline analysis, and optimization recommendations.', false);
}

function showLoadingState() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.id = 'loadingState';
  loadingDiv.innerHTML = '<div class="spinner"></div>Refreshing data...';
  
  document.querySelector('.main-content').appendChild(loadingDiv);
}

function hideLoadingState() {
  const loadingState = document.getElementById('loadingState');
  if (loadingState) {
    loadingState.remove();
  }
}

// Add modal data grid styles to make the modal content look better
const style = document.createElement('style');
style.textContent = `
.modal-data-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: var(--color-bg-1);
  border-radius: 6px;
}

.data-item label {
  font-weight: 500;
  color: var(--color-text-secondary);
}

.data-item span {
  font-weight: 600;
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}
`;
document.head.appendChild(style);