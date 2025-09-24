import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Scatter } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

const reservoirData = [
  { date: '7/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 534.6, waterCut: 0.4, gor: 0.041, cumOil: 3.0, activeWells: 1 },
  { date: '8/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 596.4, waterCut: 5.6, gor: 0.037, cumOil: 17.5, activeWells: 1 },
  { date: '9/30/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 626.7, waterCut: 3.2, gor: 0.040, cumOil: 36.3, activeWells: 1 },
  { date: '10/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 575.4, waterCut: 0.3, gor: 0.041, cumOil: 54.1, activeWells: 1 },
  { date: '11/30/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 597.5, waterCut: 0.2, gor: 0.044, cumOil: 72.1, activeWells: 1 }
]

const defaultKpis = {
  totalOilProduction: 451.30,
  averageWaterCut: 10.60,
  activeWells: 56,
  fieldDeclineRate: 8.5
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('watercut')
  const [wellFilter, setWellFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [reservoirFilter, setReservoirFilter] = useState('all')
  const [aiQuery, setAiQuery] = useState('')
  const [aiMessages, setAiMessages] = useState([
    { sender: 'AI', message: 'Well MN-0002HST1 shows 15% decline rate - recommend ESP optimization', isUser: false }
  ])
  const [showWellModal, setShowWellModal] = useState(false)
  const [selectedWell, setSelectedWell] = useState<any>(null)
  const [kpis, setKpis] = useState(defaultKpis)

  const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B']

  const generatePredictionData = (actualData: number[]) => {
    const lastValue = actualData[actualData.length - 1]
    const predictions = [...actualData]
    for (let i = 1; i <= 3; i++) {
      predictions.push(lastValue * (1 - 0.08 * i))
    }
    return predictions
  }

  const dates = reservoirData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
  const oilRates = reservoirData.map(d => d.oilRate)
  const waterCuts = reservoirData.map(d => d.waterCut)
  const gors = reservoirData.map(d => d.gor)
  const cumOils = reservoirData.map(d => d.cumOil)

  const productionChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Oil Production',
        data: oilRates,
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '20',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'AI Prediction',
        data: generatePredictionData(oilRates),
        borderColor: chartColors[1],
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      }
    ]
  }

  const wellLocationData = {
    datasets: [{
      label: 'Wells',
      data: [
        { x: 746887.95, y: 3214609.83, oilRate: 534.6, well: 'MN-0002HST1' },
        { x: 746900.00, y: 3214620.00, oilRate: 596.4, well: 'MN-0010' },
        { x: 746850.00, y: 3214580.00, oilRate: 626.7, well: 'MN-0002' },
        { x: 746920.00, y: 3214650.00, oilRate: 575.4, well: 'MN-0003' },
        { x: 746870.00, y: 3214590.00, oilRate: 597.5, well: 'MN-0004' }
      ],
      backgroundColor: chartColors[2],
      pointRadius: 12,
    }]
  }

  const watercutChartData = {
    labels: dates,
    datasets: [{
      label: 'Water Cut %',
      data: waterCuts,
      backgroundColor: chartColors[4],
      borderColor: chartColors[4],
      borderWidth: 1
    }]
  }

  const gorChartData = {
    labels: dates,
    datasets: [{
      label: 'GOR',
      data: gors,
      borderColor: chartColors[5],
      backgroundColor: chartColors[5] + '20',
      fill: true,
      tension: 0.4,
    }]
  }

  const declineChartData = {
    datasets: [{
      label: 'Decline Curve',
      data: cumOils.map((x, i) => ({ x: x, y: oilRates[i] })),
      backgroundColor: chartColors[6],
      borderColor: chartColors[6],
      pointRadius: 8,
    }]
  }

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return

    setAiMessages([...aiMessages, { sender: 'You', message: aiQuery, isUser: true }])
    setAiQuery('')

    setTimeout(() => {
      const response = generateAiResponse(aiQuery)
      setAiMessages(prev => [...prev, { sender: 'AI', message: response, isUser: false }])
    }, 1500)
  }

  const generateAiResponse = (query: string) => {
    const responses: { [key: string]: string } = {
      'maintenance': 'Based on current production data, wells MN-0002HST1 requires ESP optimization due to declining production rates.',
      'production': 'Current field production shows a stable trend with average 586 bbl/day. Consider waterflood adjustment for optimal recovery.',
      'decline': 'Field decline rate is 8.5%, which is within acceptable range. Monitor GOR trends for early gas breakthrough detection.',
      'water': 'Water cut analysis shows varying levels across the field. Northern sector requires attention with increasing water production.',
      'optimization': 'Recommend ESP frequency adjustment and artificial lift optimization for wells showing >10% decline rate.',
      'default': 'I can help you analyze well performance, production optimization, decline curves, and reservoir management. What specific area would you like to explore?'
    }

    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('maintenance') || lowerQuery.includes('repair')) return responses.maintenance
    if (lowerQuery.includes('production') || lowerQuery.includes('rate')) return responses.production
    if (lowerQuery.includes('decline') || lowerQuery.includes('decrease')) return responses.decline
    if (lowerQuery.includes('water') || lowerQuery.includes('cut')) return responses.water
    if (lowerQuery.includes('optimize') || lowerQuery.includes('improve')) return responses.optimization
    return responses.default
  }

  return (
    <>
      <Head>
        <title>Qualia Solutions - AI Reservoir Analytics Dashboard</title>
        <meta name="description" content="AI-powered reservoir analytics dashboard" />
      </Head>

      <div className="dashboard">
        <header className="header">
          <div className="header__brand">
            <div className="header__logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" fill="var(--color-primary)" />
                <circle cx="16" cy="16" r="6" fill="var(--color-background)" />
              </svg>
            </div>
            <div className="header__text">
              <h1>Qualia Solutions</h1>
              <p>AI Reservoir Analytics</p>
            </div>
          </div>
          <div className="header__actions">
            <button className="btn btn--outline btn--sm">Export Data</button>
          </div>
        </header>

        <aside className="sidebar">
          <div className="sidebar__section">
            <h3>Well Selection</h3>
            <select className="form-control" value={wellFilter} onChange={(e) => setWellFilter(e.target.value)}>
              <option value="all">All Wells</option>
              <option value="MN-0002HST1">MN-0002HST1</option>
              <option value="MN-0010">MN-0010</option>
              <option value="MN-0002">MN-0002</option>
            </select>
          </div>

          <div className="sidebar__section">
            <h3>Date Range</h3>
            <select className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">All Time</option>
              <option value="2019">2019</option>
              <option value="6m">Last 6 Months</option>
              <option value="3m">Last 3 Months</option>
            </select>
          </div>

          <div className="sidebar__section">
            <h3>Reservoir Type</h3>
            <select className="form-control" value={reservoirFilter} onChange={(e) => {
              setReservoirFilter(e.target.value)
              // Update KPIs based on reservoir selection
              if (e.target.value === 'Mishrif') {
                setKpis({
                  totalOilProduction: 520.45,
                  averageWaterCut: 12.3,
                  activeWells: 42,
                  fieldDeclineRate: 7.2
                })
              } else if (e.target.value === 'Wara') {
                setKpis({
                  totalOilProduction: 380.20,
                  averageWaterCut: 8.9,
                  activeWells: 28,
                  fieldDeclineRate: 9.8
                })
              } else if (e.target.value === 'Burgan') {
                setKpis({
                  totalOilProduction: 610.75,
                  averageWaterCut: 14.5,
                  activeWells: 68,
                  fieldDeclineRate: 6.3
                })
              } else {
                setKpis(defaultKpis)
              }
            }}>
              <option value="all">All Reservoirs</option>
              <option value="Mishrif">Mishrif</option>
              <option value="Wara">Wara</option>
              <option value="Burgan">Burgan</option>
            </select>
          </div>

          <div className="sidebar__section">
            <h3>Quick Actions</h3>
            <button className="btn btn--secondary btn--sm btn--full-width">Refresh Data</button>
            <button className="btn btn--outline btn--sm btn--full-width">Generate Report</button>
          </div>
        </aside>

        <main className="main-content">
          <section className="kpi-section">
            <div className="kpi-card">
              <div className="kpi-card__icon">🛢️</div>
              <div className="kpi-card__content">
                <h3>Total Oil Production</h3>
                <div className="kpi-card__value">{kpis.totalOilProduction}</div>
                <div className="kpi-card__unit">barrels/day</div>
              </div>
              <div className="kpi-card__trend positive">↑ 5.2%</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card__icon">💧</div>
              <div className="kpi-card__content">
                <h3>Average Water Cut</h3>
                <div className="kpi-card__value">{kpis.averageWaterCut}</div>
                <div className="kpi-card__unit">%</div>
              </div>
              <div className="kpi-card__trend neutral">↔ 0.1%</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card__icon">🏗️</div>
              <div className="kpi-card__content">
                <h3>Active Wells</h3>
                <div className="kpi-card__value">{kpis.activeWells}</div>
                <div className="kpi-card__unit">wells</div>
              </div>
              <div className="kpi-card__trend positive">↑ 3</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card__icon">📉</div>
              <div className="kpi-card__content">
                <h3>Field Decline Rate</h3>
                <div className="kpi-card__value">{kpis.fieldDeclineRate}</div>
                <div className="kpi-card__unit">%</div>
              </div>
              <div className="kpi-card__trend negative">↓ 2.1%</div>
            </div>
          </section>

          <section className="chart-section">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Production Trends</h3>
                <select className="form-control chart-control">
                  <option value="field">Combined Field View</option>
                  <option value="individual">Individual Wells</option>
                </select>
              </div>
              <div className="chart-wrapper" style={{ height: '300px', position: 'relative' }}>
                <Line data={productionChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="ai-panel">
              <div className="ai-header">
                <div className="ai-icon">🤖</div>
                <h3>AI Assistant</h3>
              </div>
              <div className="ai-chat" style={{ height: '250px', overflowY: 'auto' }}>
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className="ai-message">
                    <div className="ai-avatar">{msg.isUser ? 'U' : 'AI'}</div>
                    <div className="ai-content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ai-input">
                <input
                  type="text"
                  placeholder="Ask about production, water cut, or optimization..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
                />
              </div>
            </div>
          </section>

          <section className="chart-grid">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Well Locations</h3>
              </div>
              <div className="chart-wrapper" style={{ height: '300px', position: 'relative' }}>
                <Scatter data={wellLocationData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="chart-container">
              <div className="tabs-container">
                <div className="tabs">
                  <button className={`tab ${activeTab === 'watercut' ? 'active' : ''}`} onClick={() => setActiveTab('watercut')}>
                    Water Cut
                  </button>
                  <button className={`tab ${activeTab === 'gor' ? 'active' : ''}`} onClick={() => setActiveTab('gor')}>
                    GOR Analysis
                  </button>
                  <button className={`tab ${activeTab === 'decline' ? 'active' : ''}`} onClick={() => setActiveTab('decline')}>
                    Decline Curve
                  </button>
                </div>
                <div className="tab-content">
                  {activeTab === 'watercut' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Bar data={watercutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  )}
                  {activeTab === 'gor' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Line data={gorChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  )}
                  {activeTab === 'decline' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Scatter data={declineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}