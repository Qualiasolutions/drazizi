import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Scatter } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

// Enhanced reservoir data with 6 years of data (2019-2024)
const reservoirData = [
  // 2019
  { date: '1/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 580.2, waterCut: 0.2, gor: 0.039, cumOil: 2.8, activeWells: 1, pressure: 2490, temp: 84 },
  { date: '3/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 592.1, waterCut: 0.3, gor: 0.040, cumOil: 8.5, activeWells: 1, pressure: 2470, temp: 85 },
  { date: '5/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 610.8, waterCut: 0.4, gor: 0.041, cumOil: 15.2, activeWells: 1, pressure: 2450, temp: 85 },
  { date: '7/31/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 634.6, waterCut: 0.6, gor: 0.041, cumOil: 23.0, activeWells: 1, pressure: 2430, temp: 86 },
  { date: '9/30/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 626.7, waterCut: 3.2, gor: 0.040, cumOil: 36.3, activeWells: 1, pressure: 2380, temp: 87 },
  { date: '11/30/2019', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 597.5, waterCut: 2.8, gor: 0.044, cumOil: 52.1, activeWells: 1, pressure: 2320, temp: 84 },

  // 2020
  { date: '1/31/2020', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 585.3, waterCut: 4.1, gor: 0.045, cumOil: 68.5, activeWells: 1, pressure: 2310, temp: 85 },
  { date: '3/31/2020', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 571.8, waterCut: 5.2, gor: 0.046, cumOil: 84.2, activeWells: 1, pressure: 2290, temp: 86 },
  { date: '5/31/2020', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 558.4, waterCut: 6.8, gor: 0.047, cumOil: 99.1, activeWells: 1, pressure: 2275, temp: 87 },
  { date: '7/31/2020', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 544.2, waterCut: 8.3, gor: 0.048, cumOil: 113.5, activeWells: 1, pressure: 2260, temp: 88 },
  { date: '9/30/2020', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 531.7, waterCut: 9.5, gor: 0.049, cumOil: 127.2, activeWells: 1, pressure: 2245, temp: 87 },
  { date: '11/30/2020', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 520.1, waterCut: 10.8, gor: 0.051, cumOil: 140.3, activeWells: 1, pressure: 2230, temp: 86 },

  // 2021
  { date: '1/31/2021', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 508.9, waterCut: 12.1, gor: 0.052, cumOil: 152.8, activeWells: 1, pressure: 2215, temp: 85 },
  { date: '3/31/2021', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 498.3, waterCut: 13.6, gor: 0.053, cumOil: 164.9, activeWells: 1, pressure: 2200, temp: 86 },
  { date: '5/31/2021', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 488.1, waterCut: 15.2, gor: 0.055, cumOil: 176.5, activeWells: 1, pressure: 2185, temp: 87 },
  { date: '7/31/2021', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 478.4, waterCut: 16.8, gor: 0.056, cumOil: 187.8, activeWells: 1, pressure: 2170, temp: 88 },
  { date: '9/30/2021', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 469.2, waterCut: 18.4, gor: 0.058, cumOil: 198.6, activeWells: 1, pressure: 2155, temp: 87 },
  { date: '11/30/2021', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 460.5, waterCut: 20.1, gor: 0.059, cumOil: 209.1, activeWells: 1, pressure: 2140, temp: 86 },

  // 2022
  { date: '1/31/2022', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 452.3, waterCut: 21.8, gor: 0.061, cumOil: 219.2, activeWells: 1, pressure: 2125, temp: 85 },
  { date: '3/31/2022', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 444.6, waterCut: 23.5, gor: 0.062, cumOil: 229.0, activeWells: 1, pressure: 2110, temp: 86 },
  { date: '5/31/2022', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 437.3, waterCut: 25.3, gor: 0.064, cumOil: 238.5, activeWells: 1, pressure: 2095, temp: 87 },
  { date: '7/31/2022', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 430.4, waterCut: 27.1, gor: 0.065, cumOil: 247.7, activeWells: 1, pressure: 2080, temp: 88 },
  { date: '9/30/2022', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 423.9, waterCut: 28.9, gor: 0.067, cumOil: 256.6, activeWells: 1, pressure: 2065, temp: 87 },
  { date: '11/30/2022', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 417.8, waterCut: 30.8, gor: 0.069, cumOil: 265.3, activeWells: 1, pressure: 2050, temp: 86 },

  // 2023
  { date: '1/31/2023', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 412.1, waterCut: 32.7, gor: 0.070, cumOil: 273.8, activeWells: 1, pressure: 2035, temp: 85 },
  { date: '3/31/2023', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 406.8, waterCut: 34.6, gor: 0.072, cumOil: 282.1, activeWells: 1, pressure: 2020, temp: 86 },
  { date: '5/31/2023', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 401.9, waterCut: 36.5, gor: 0.074, cumOil: 290.2, activeWells: 1, pressure: 2005, temp: 87 },
  { date: '7/31/2023', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 397.3, waterCut: 38.5, gor: 0.075, cumOil: 298.1, activeWells: 1, pressure: 1990, temp: 88 },
  { date: '9/30/2023', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 393.1, waterCut: 40.5, gor: 0.077, cumOil: 305.8, activeWells: 1, pressure: 1975, temp: 87 },
  { date: '11/30/2023', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 389.2, waterCut: 42.6, gor: 0.079, cumOil: 313.4, activeWells: 1, pressure: 1960, temp: 86 },

  // 2024
  { date: '1/31/2024', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 385.6, waterCut: 44.7, gor: 0.081, cumOil: 320.8, activeWells: 1, pressure: 1945, temp: 85 },
  { date: '3/31/2024', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 382.3, waterCut: 46.8, gor: 0.083, cumOil: 328.1, activeWells: 1, pressure: 1930, temp: 86 },
  { date: '5/31/2024', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 379.3, waterCut: 49.0, gor: 0.084, cumOil: 335.2, activeWells: 1, pressure: 1915, temp: 87 },
  { date: '7/31/2024', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 376.6, waterCut: 51.2, gor: 0.086, cumOil: 342.2, activeWells: 1, pressure: 1900, temp: 88 },
  { date: '9/30/2024', well: 'MN-0002HST1', x: 746887.95, y: 3214609.83, oilRate: 374.1, waterCut: 53.5, gor: 0.088, cumOil: 349.1, activeWells: 1, pressure: 1885, temp: 87 }
]

const defaultKpis = {
  totalOilProduction: 451.30,
  averageWaterCut: 10.60,
  activeWells: 56,
  fieldDeclineRate: 8.5
}

// Reservoir-specific data
const reservoirProfiles = {
  'Mishrif': {
    kpis: { totalOilProduction: 520.45, averageWaterCut: 12.3, activeWells: 42, fieldDeclineRate: 7.2 },
    wells: ['MN-0001', 'MN-0002', 'MN-0003HST1', 'MN-0004', 'MN-0005'],
    avgPressure: 2480,
    avgTemp: 88,
    porosity: 22.5,
    permeability: 450
  },
  'Wara': {
    kpis: { totalOilProduction: 380.20, averageWaterCut: 8.9, activeWells: 28, fieldDeclineRate: 9.8 },
    wells: ['WR-0001', 'WR-0002', 'WR-0003', 'WR-0004'],
    avgPressure: 2250,
    avgTemp: 82,
    porosity: 18.3,
    permeability: 280
  },
  'Burgan': {
    kpis: { totalOilProduction: 610.75, averageWaterCut: 14.5, activeWells: 68, fieldDeclineRate: 6.3 },
    wells: ['BG-0001', 'BG-0002HST1', 'BG-0003', 'BG-0004', 'BG-0005', 'BG-0006'],
    avgPressure: 2650,
    avgTemp: 92,
    porosity: 24.8,
    permeability: 620
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('watercut')
  const [wellFilter, setWellFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [reservoirFilter, setReservoirFilter] = useState('all')
  const [aiQuery, setAiQuery] = useState('')
  const [aiMessages, setAiMessages] = useState([
    { sender: 'AI', message: 'Welcome! I\'m your AI reservoir analyst. I can help you analyze production trends, identify optimization opportunities, and predict future performance.', isUser: false }
  ])
  const [showWellModal, setShowWellModal] = useState(false)
  const [selectedWell, setSelectedWell] = useState<any>(null)
  const [kpis, setKpis] = useState(defaultKpis)
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])
  const [realTimeData, setRealTimeData] = useState(reservoirData)
  const [isRealTimeActive, setIsRealTimeActive] = useState(false)
  const [animateKpis, setAnimateKpis] = useState(false)

  const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B']

  // Enhanced prediction algorithm
  const generatePredictionData = (actualData: number[]) => {
    const lastValue = actualData[actualData.length - 1]
    const predictions = [...actualData]
    const declineRate = reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter]
      ? reservoirProfiles[reservoirFilter].kpis.fieldDeclineRate / 100
      : 0.08

    for (let i = 1; i <= 3; i++) {
      const randomFactor = 0.95 + Math.random() * 0.1 // Add some variability
      predictions.push(lastValue * Math.pow(1 - declineRate, i) * randomFactor)
    }
    return predictions
  }

  // Real-time data simulation
  useEffect(() => {
    if (isRealTimeActive) {
      const interval = setInterval(() => {
        setRealTimeData(prevData => {
          const newData = [...prevData]
          const lastItem = newData[newData.length - 1]
          const variation = 0.95 + Math.random() * 0.1

          newData[newData.length - 1] = {
            ...lastItem,
            oilRate: lastItem.oilRate * variation,
            waterCut: Math.min(100, lastItem.waterCut * (1 + (Math.random() - 0.5) * 0.1)),
            pressure: lastItem.pressure - Math.random() * 5
          }

          // Trigger alert if anomaly detected
          if (lastItem.oilRate * variation < 500) {
            addAlert('⚠️ Low production detected in well ' + lastItem.well)
          }

          return newData
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isRealTimeActive])

  // Alert system
  const addAlert = (message: string) => {
    setAlerts(prev => [...prev.slice(-4), message])
    setTimeout(() => {
      setAlerts(prev => prev.slice(1))
    }, 10000)
  }

  // Enhanced AI responses
  const generateAiResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()

    // Context-aware responses based on current filters
    const context = {
      reservoir: reservoirFilter !== 'all' ? reservoirFilter : 'all reservoirs',
      well: wellFilter !== 'all' ? wellFilter : 'all wells'
    }

    if (lowerQuery.includes('optimize') || lowerQuery.includes('improve')) {
      return `Based on analysis of ${context.reservoir}, I recommend:
1. ESP frequency optimization for wells showing >10% decline
2. Water injection adjustment in northern sector
3. Artificial lift optimization for ${context.well === 'all wells' ? 'underperforming wells' : context.well}
Expected improvement: 15-20% production increase`
    }

    if (lowerQuery.includes('pressure')) {
      const pressure = reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter]
        ? reservoirProfiles[reservoirFilter].avgPressure
        : 2400
      return `Current average reservoir pressure: ${pressure} psi
Pressure decline rate: 2.5% monthly
Recommendation: Consider pressure maintenance program
Critical pressure threshold: 2000 psi`
    }

    if (lowerQuery.includes('forecast') || lowerQuery.includes('predict')) {
      return `Production forecast for next quarter:
- Expected production: ${(kpis.totalOilProduction * 0.92).toFixed(1)} bbl/day
- Confidence interval: ±5%
- Key risks: Water breakthrough in southern wells
- Mitigation: Proactive water management strategy`
    }

    if (lowerQuery.includes('anomaly') || lowerQuery.includes('alert')) {
      return `Recent anomalies detected:
1. Sudden pressure drop in well MN-0003 (-8%)
2. Unusual GOR increase in northern sector
3. Water cut spike in well WR-0002
Recommended action: Immediate well testing and intervention planning`
    }

    if (lowerQuery.includes('performance')) {
      return `Performance Analysis for ${context.reservoir}:
- Production efficiency: 78%
- Uptime: 96.5%
- Recovery factor: 32%
- Optimization potential: 22% improvement possible
Top performer: Well BG-0002HST1 (140% of target)`
    }

    return `Analyzing ${context.reservoir} data...
Current trends show ${kpis.fieldDeclineRate}% decline rate with ${kpis.averageWaterCut}% water cut.
Would you like me to:
1. Generate optimization recommendations?
2. Analyze pressure trends?
3. Forecast production?
4. Review anomalies?`
  }

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return

    setAiMessages([...aiMessages, { sender: 'You', message: aiQuery, isUser: true }])
    setAiQuery('')
    setIsLoading(true)

    setTimeout(() => {
      const response = generateAiResponse(aiQuery)
      setAiMessages(prev => [...prev, { sender: 'AI', message: response, isUser: false }])
      setIsLoading(false)
    }, 1500)
  }

  // Export functionality
  const exportData = () => {
    const dataStr = JSON.stringify({
      kpis,
      reservoir: reservoirFilter,
      data: realTimeData,
      timestamp: new Date().toISOString()
    }, null, 2)

    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `reservoir_data_${Date.now()}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    addAlert('✅ Data exported successfully')
  }

  // Chart data preparation
  const dates = realTimeData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
  const oilRates = realTimeData.map(d => d.oilRate)
  const waterCuts = realTimeData.map(d => d.waterCut)
  const gors = realTimeData.map(d => d.gor)
  const cumOils = realTimeData.map(d => d.cumOil)
  const pressures = realTimeData.map(d => d.pressure)

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
      },
      {
        label: 'Pressure (×10)',
        data: pressures.map(p => p / 10),
        borderColor: chartColors[2],
        backgroundColor: chartColors[2] + '10',
        yAxisID: 'y1',
        fill: false,
        tension: 0.4,
      }
    ]
  }

  const wellLocationData = {
    datasets: [{
      label: 'Wells',
      data: [
        { x: 746887.95, y: 3214609.83, oilRate: 534.6, well: 'MN-0002HST1', status: 'producing' },
        { x: 746900.00, y: 3214620.00, oilRate: 596.4, well: 'MN-0010', status: 'producing' },
        { x: 746850.00, y: 3214580.00, oilRate: 626.7, well: 'MN-0002', status: 'optimal' },
        { x: 746920.00, y: 3214650.00, oilRate: 375.4, well: 'MN-0003', status: 'underperforming' },
        { x: 746870.00, y: 3214590.00, oilRate: 597.5, well: 'MN-0004', status: 'producing' }
      ],
      backgroundColor: function(context: any) {
        const value = context.raw?.status
        if (value === 'optimal') return '#22c55e'
        if (value === 'underperforming') return '#ef4444'
        return chartColors[2]
      },
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

  // Enhanced chart options
  const enhancedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: {
          afterLabel: function(context: any) {
            if (context.datasetIndex === 0) {
              return `Trend: ${context.parsed.y > 550 ? '📈 Good' : '📉 Needs attention'}`
            }
            return ''
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Qualia Solutions - Advanced AI Reservoir Analytics Dashboard</title>
        <meta name="description" content="Advanced AI-powered reservoir analytics dashboard with real-time monitoring" />
      </Head>

      <div className="dashboard">
        {/* Alert Banner */}
        {alerts.length > 0 && (
          <div className="alert-banner">
            {alerts.map((alert, idx) => (
              <div key={idx} className="alert-item">
                {alert}
              </div>
            ))}
          </div>
        )}

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
              <p>Advanced AI Reservoir Analytics</p>
            </div>
          </div>
          <div className="header__actions">
            <button
              className={`btn ${isRealTimeActive ? 'btn--primary' : 'btn--outline'} btn--sm`}
              onClick={() => setIsRealTimeActive(!isRealTimeActive)}
            >
              {isRealTimeActive ? '🔴 Live' : '⭕ Start Live'}
            </button>
            <button className="btn btn--outline btn--sm" onClick={exportData}>
              📥 Export Data
            </button>
          </div>
        </header>

        <aside className="sidebar">
          <div className="sidebar__section">
            <h3>Well Selection</h3>
            <select className="form-control" value={wellFilter} onChange={(e) => setWellFilter(e.target.value)}>
              <option value="all">All Wells</option>
              {reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter]
                ? reservoirProfiles[reservoirFilter].wells.map(well => (
                    <option key={well} value={well}>{well}</option>
                  ))
                : <>
                    <option value="MN-0002HST1">MN-0002HST1</option>
                    <option value="MN-0010">MN-0010</option>
                    <option value="MN-0002">MN-0002</option>
                  </>
              }
            </select>
          </div>

          <div className="sidebar__section">
            <h3>Date Range</h3>
            <select className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">All Time</option>
              <option value="2019">2019</option>
              <option value="6m">Last 6 Months</option>
              <option value="3m">Last 3 Months</option>
              <option value="1m">Last Month</option>
              <option value="1w">Last Week</option>
            </select>
          </div>

          <div className="sidebar__section">
            <h3>Reservoir Type</h3>
            <select
              className="form-control"
              value={reservoirFilter}
              onChange={(e) => {
                setReservoirFilter(e.target.value)
                setAnimateKpis(true)
                setTimeout(() => setAnimateKpis(false), 600)

                if (e.target.value !== 'all' && reservoirProfiles[e.target.value]) {
                  setKpis(reservoirProfiles[e.target.value].kpis)
                  addAlert(`📊 Switched to ${e.target.value} reservoir data`)
                } else {
                  setKpis(defaultKpis)
                }
              }}
            >
              <option value="all">All Reservoirs</option>
              <option value="Mishrif">Mishrif</option>
              <option value="Wara">Wara</option>
              <option value="Burgan">Burgan</option>
            </select>
          </div>

          {reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter] && (
            <div className="sidebar__section">
              <h3>Reservoir Properties</h3>
              <div className="reservoir-props">
                <div className="prop-item">
                  <span>Porosity:</span>
                  <strong>{reservoirProfiles[reservoirFilter].porosity}%</strong>
                </div>
                <div className="prop-item">
                  <span>Permeability:</span>
                  <strong>{reservoirProfiles[reservoirFilter].permeability} mD</strong>
                </div>
                <div className="prop-item">
                  <span>Avg Pressure:</span>
                  <strong>{reservoirProfiles[reservoirFilter].avgPressure} psi</strong>
                </div>
                <div className="prop-item">
                  <span>Temperature:</span>
                  <strong>{reservoirProfiles[reservoirFilter].avgTemp}°C</strong>
                </div>
              </div>
            </div>
          )}

          <div className="sidebar__section">
            <h3>Quick Actions</h3>
            <button
              className="btn btn--secondary btn--sm btn--full-width"
              onClick={() => {
                setIsLoading(true)
                // Simulate data refresh with slight variations
                setTimeout(() => {
                  setRealTimeData(prevData => {
                    return prevData.map(item => ({
                      ...item,
                      oilRate: item.oilRate * (0.98 + Math.random() * 0.04),
                      waterCut: Math.min(100, item.waterCut * (0.95 + Math.random() * 0.1)),
                      pressure: item.pressure + (Math.random() - 0.5) * 10,
                      gor: item.gor * (0.98 + Math.random() * 0.04)
                    }))
                  })

                  // Update KPIs with fresh data
                  setKpis(prevKpis => ({
                    ...prevKpis,
                    totalOilProduction: prevKpis.totalOilProduction * (0.98 + Math.random() * 0.04),
                    averageWaterCut: prevKpis.averageWaterCut * (0.95 + Math.random() * 0.1)
                  }))

                  setIsLoading(false)
                  addAlert('✅ Data refreshed successfully')
                }, 1500)
              }}
            >
              {isLoading ? '⟳ Refreshing...' : '🔄 Refresh Data'}
            </button>
            <button
              className="btn btn--outline btn--sm btn--full-width"
              onClick={() => addAlert('📊 Report generation started...')}
            >
              📝 Generate Report
            </button>
            <button
              className="btn btn--outline btn--sm btn--full-width"
              onClick={() => setShowWellModal(true)}
            >
              ⚙️ Well Analysis
            </button>
          </div>
        </aside>

        <main className="main-content">
          <section className={`kpi-section ${animateKpis ? 'animate-pulse' : ''}`}>
            <div className="kpi-card">
              <div className="kpi-card__icon">🛢️</div>
              <div className="kpi-card__content">
                <h3>Total Oil Production</h3>
                <div className="kpi-card__value">
                  {isRealTimeActive
                    ? (kpis.totalOilProduction * (0.98 + Math.random() * 0.04)).toFixed(2)
                    : kpis.totalOilProduction
                  }
                </div>
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
                <h3>Production Trends & Pressure Analysis</h3>
                <select className="form-control chart-control">
                  <option value="field">Combined Field View</option>
                  <option value="individual">Individual Wells</option>
                  <option value="forecast">Forecast Mode</option>
                </select>
              </div>
              <div className="chart-wrapper" style={{ height: '300px', position: 'relative' }}>
                <Line data={productionChartData} options={enhancedChartOptions} />
              </div>
            </div>

            <div className="ai-panel enhanced">
              <div className="ai-header">
                <div className="ai-icon">🤖</div>
                <h3>AI Reservoir Assistant</h3>
                {isLoading && <span className="loading-indicator">Analyzing...</span>}
              </div>
              <div className="ai-chat" style={{ height: '250px', overflowY: 'auto' }}>
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`ai-message ${msg.isUser ? 'user-message' : 'ai-message'}`}>
                    <div className="ai-avatar">{msg.isUser ? '👤' : '🤖'}</div>
                    <div className="ai-content">
                      <p style={{ whiteSpace: 'pre-line' }}>{msg.message}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="ai-message">
                    <div className="ai-avatar">🤖</div>
                    <div className="ai-content">
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="ai-input">
                <input
                  type="text"
                  placeholder="Ask about optimization, forecasts, anomalies, or performance..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
                />
                <button onClick={handleAiQuery} className="ai-send-btn">Send</button>
              </div>
              <div className="ai-suggestions">
                <span>Try asking:</span>
                <button onClick={() => { setAiQuery('What optimization strategies do you recommend?'); handleAiQuery(); }}>
                  Optimization
                </button>
                <button onClick={() => { setAiQuery('Show me the pressure analysis'); handleAiQuery(); }}>
                  Pressure
                </button>
                <button onClick={() => { setAiQuery('Forecast production for next quarter'); handleAiQuery(); }}>
                  Forecast
                </button>
              </div>
            </div>
          </section>

          <section className="chart-grid">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Well Locations & Status</h3>
                <span className="status-legend">
                  <span className="legend-item">🟢 Optimal</span>
                  <span className="legend-item">🔵 Producing</span>
                  <span className="legend-item">🔴 Underperforming</span>
                </span>
              </div>
              <div className="chart-wrapper" style={{ height: '300px', position: 'relative' }}>
                <Scatter
                  data={wellLocationData}
                  options={{
                    ...enhancedChartOptions,
                    onClick: (event: any, elements: any) => {
                      if (elements.length > 0) {
                        const data = wellLocationData.datasets[0].data[elements[0].index]
                        setSelectedWell(data)
                        setShowWellModal(true)
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="chart-container">
              <div className="tabs-container">
                <div className="tabs">
                  <button className={`tab ${activeTab === 'watercut' ? 'active' : ''}`} onClick={() => setActiveTab('watercut')}>
                    💧 Water Cut
                  </button>
                  <button className={`tab ${activeTab === 'gor' ? 'active' : ''}`} onClick={() => setActiveTab('gor')}>
                    🔥 GOR Analysis
                  </button>
                  <button className={`tab ${activeTab === 'decline' ? 'active' : ''}`} onClick={() => setActiveTab('decline')}>
                    📉 Decline Curve
                  </button>
                </div>
                <div className="tab-content">
                  {activeTab === 'watercut' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Bar data={watercutChartData} options={enhancedChartOptions} />
                    </div>
                  )}
                  {activeTab === 'gor' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Line data={gorChartData} options={enhancedChartOptions} />
                    </div>
                  )}
                  {activeTab === 'decline' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Scatter data={declineChartData} options={enhancedChartOptions} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Enhanced Well Modal */}
        {showWellModal && selectedWell && (
          <div className="modal-overlay" onClick={() => setShowWellModal(false)}>
            <div className="modal-content well-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Well Analysis: {selectedWell.well}</h2>
                <button className="modal-close" onClick={() => setShowWellModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="well-status">
                  <span className={`status-badge ${selectedWell.status}`}>
                    {selectedWell.status.toUpperCase()}
                  </span>
                </div>
                <div className="well-metrics">
                  <div className="metric">
                    <label>Oil Rate:</label>
                    <span>{selectedWell.oilRate} bbl/day</span>
                  </div>
                  <div className="metric">
                    <label>Location:</label>
                    <span>X: {selectedWell.x.toFixed(2)}, Y: {selectedWell.y.toFixed(2)}</span>
                  </div>
                  <div className="metric">
                    <label>Performance:</label>
                    <span>{selectedWell.oilRate > 550 ? 'Above target' : 'Below target'}</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn btn--primary btn--sm" onClick={() => {
                    addAlert(`🔧 Optimization initiated for ${selectedWell.well}`)
                    setShowWellModal(false)
                  }}>
                    Optimize Well
                  </button>
                  <button className="btn btn--secondary btn--sm" onClick={() => {
                    addAlert(`📊 Detailed report generated for ${selectedWell.well}`)
                    setShowWellModal(false)
                  }}>
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .alert-banner {
          position: fixed;
          top: 60px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alert-item {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-pulse {
          animation: pulse 0.6s ease;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .loading-indicator {
          color: var(--color-primary);
          font-size: 12px;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .reservoir-props {
          background: var(--color-bg-1);
          padding: 12px;
          border-radius: 8px;
        }

        .prop-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 12px;
        }

        .prop-item span {
          color: var(--color-text-secondary);
        }

        .prop-item strong {
          color: var(--color-primary);
        }

        .ai-panel.enhanced {
          background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
          border: 1px solid var(--color-border);
          border-radius: 12px;
        }

        .user-message {
          background: #e3f2fd;
          margin-left: 20px;
        }

        .ai-send-btn {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 8px;
        }

        .ai-suggestions {
          display: flex;
          gap: 8px;
          padding: 8px;
          border-top: 1px solid var(--color-border);
          font-size: 12px;
        }

        .ai-suggestions button {
          background: var(--color-bg-1);
          border: 1px solid var(--color-border);
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
        }

        .status-legend {
          display: flex;
          gap: 12px;
          font-size: 12px;
        }

        .legend-item {
          display: flex;
          align-items: center;
        }

        .well-modal {
          min-width: 400px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--color-text-secondary);
        }

        .well-status {
          margin-bottom: 20px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .status-badge.optimal {
          background: #22c55e;
          color: white;
        }

        .status-badge.producing {
          background: #3b82f6;
          color: white;
        }

        .status-badge.underperforming {
          background: #ef4444;
          color: white;
        }

        .well-metrics {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          background: var(--color-bg-1);
          border-radius: 6px;
        }

        .metric label {
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .metric span {
          font-weight: 600;
          color: var(--color-text);
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  )
}