import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Scatter } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

// Enhanced reservoir data with 6 years of data (2019-2024) - 4 Offset Wells Interference Study
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

// Multi-well interference data - 4 offset wells (X1, X2, X3, X4)
const multiWellData = {
  'X1': [
    // Well X1 - Primary producer, comes online first
    { date: '1/31/2019', oilRate: 625.5, waterCut: 0.1, pressure: 2520, cumOil: 3.1, status: 'primary' },
    { date: '3/31/2019', oilRate: 640.8, waterCut: 0.2, pressure: 2500, cumOil: 9.2, status: 'primary' },
    { date: '5/31/2019', oilRate: 658.3, waterCut: 0.3, pressure: 2480, cumOil: 16.8, status: 'primary' },
    { date: '7/31/2019', oilRate: 672.1, waterCut: 0.4, pressure: 2460, cumOil: 25.9, status: 'primary' },
    { date: '9/30/2019', oilRate: 650.2, waterCut: 2.1, pressure: 2440, cumOil: 38.7, status: 'affected' }, // X2 starts affecting
    { date: '11/30/2019', oilRate: 625.8, waterCut: 3.8, pressure: 2420, cumOil: 52.3, status: 'affected' },

    { date: '1/31/2020', oilRate: 605.4, waterCut: 5.2, pressure: 2400, cumOil: 65.8, status: 'affected' },
    { date: '3/31/2020', oilRate: 590.7, waterCut: 6.8, pressure: 2380, cumOil: 78.9, status: 'affected' },
    { date: '5/31/2020', oilRate: 578.9, waterCut: 8.1, pressure: 2360, cumOil: 91.2, status: 'affected' },
    { date: '7/31/2020', oilRate: 550.3, waterCut: 12.5, pressure: 2340, cumOil: 102.8, status: 'interference' }, // X3 comes online - major impact
    { date: '9/30/2020', oilRate: 520.1, waterCut: 18.2, pressure: 2320, cumOil: 113.5, status: 'interference' },
    { date: '11/30/2020', oilRate: 495.7, waterCut: 24.6, pressure: 2300, cumOil: 123.4, status: 'interference' },

    { date: '1/31/2021', oilRate: 475.2, waterCut: 29.8, pressure: 2280, cumOil: 132.6, status: 'interference' },
    { date: '3/31/2021', oilRate: 458.6, waterCut: 34.2, pressure: 2260, cumOil: 141.2, status: 'interference' },
    { date: '5/31/2021', oilRate: 445.1, waterCut: 37.9, pressure: 2240, cumOil: 149.3, status: 'interference' },
    { date: '7/31/2021', oilRate: 430.8, waterCut: 42.1, pressure: 2220, cumOil: 157.0, status: 'severe' }, // X4 comes online - severe interference
    { date: '9/30/2021', oilRate: 405.3, waterCut: 48.7, pressure: 2200, cumOil: 163.8, status: 'severe' },
    { date: '11/30/2021', oilRate: 385.9, waterCut: 55.3, pressure: 2180, cumOil: 170.1, status: 'severe' },

    { date: '1/31/2022', oilRate: 372.4, waterCut: 60.8, pressure: 2160, cumOil: 175.9, status: 'severe' },
    { date: '3/31/2022', oilRate: 361.7, waterCut: 65.2, pressure: 2140, cumOil: 181.3, status: 'severe' },
    { date: '5/31/2022', oilRate: 355.1, waterCut: 68.9, pressure: 2120, cumOil: 186.4, status: 'severe' },
    { date: '7/31/2022', oilRate: 350.8, waterCut: 71.6, pressure: 2100, cumOil: 191.2, status: 'severe' },
    { date: '9/30/2022', oilRate: 348.2, waterCut: 73.8, pressure: 2080, cumOil: 195.8, status: 'severe' },
    { date: '11/30/2022', oilRate: 346.9, waterCut: 75.4, pressure: 2060, cumOil: 200.1, status: 'severe' },

    { date: '1/31/2023', oilRate: 346.1, waterCut: 76.7, pressure: 2040, cumOil: 204.3, status: 'severe' },
    { date: '3/31/2023', oilRate: 345.8, waterCut: 77.8, pressure: 2020, cumOil: 208.4, status: 'severe' },
    { date: '5/31/2023', oilRate: 345.9, waterCut: 78.6, pressure: 2000, cumOil: 212.4, status: 'severe' },
    { date: '7/31/2023', oilRate: 346.2, waterCut: 79.2, pressure: 1980, cumOil: 216.3, status: 'severe' },
    { date: '9/30/2023', oilRate: 346.8, waterCut: 79.6, pressure: 1960, cumOil: 220.2, status: 'severe' },
    { date: '11/30/2023', oilRate: 347.5, waterCut: 79.8, pressure: 1940, cumOil: 224.0, status: 'severe' },

    { date: '1/31/2024', oilRate: 348.3, waterCut: 79.9, pressure: 1920, cumOil: 227.8, status: 'severe' },
    { date: '3/31/2024', oilRate: 349.1, waterCut: 80.0, pressure: 1900, cumOil: 231.6, status: 'severe' },
    { date: '5/31/2024', oilRate: 349.9, waterCut: 80.0, pressure: 1880, cumOil: 235.4, status: 'severe' },
    { date: '7/31/2024', oilRate: 350.7, waterCut: 79.9, pressure: 1860, cumOil: 239.2, status: 'severe' },
    { date: '9/30/2024', oilRate: 351.4, waterCut: 79.8, pressure: 1840, cumOil: 243.0, status: 'severe' }
  ],

  'X2': [
    // Well X2 - Comes online Sept 2019, shows interference from X1
    { date: '9/30/2019', oilRate: 520.8, waterCut: 0.1, pressure: 2410, cumOil: 1.5, status: 'startup' },
    { date: '11/30/2019', oilRate: 545.3, waterCut: 0.3, pressure: 2390, cumOil: 6.2, status: 'primary' },

    { date: '1/31/2020', oilRate: 560.7, waterCut: 0.8, pressure: 2370, cumOil: 12.8, status: 'primary' },
    { date: '3/31/2020', oilRate: 572.4, waterCut: 1.2, pressure: 2350, cumOil: 20.1, status: 'primary' },
    { date: '5/31/2020', oilRate: 579.1, waterCut: 1.8, pressure: 2330, cumOil: 27.9, status: 'primary' },
    { date: '7/31/2020', oilRate: 535.7, waterCut: 8.9, pressure: 2310, cumOil: 35.2, status: 'affected' }, // X3 impact
    { date: '9/30/2020', oilRate: 510.3, waterCut: 15.7, pressure: 2290, cumOil: 41.8, status: 'affected' },
    { date: '11/30/2020', oilRate: 488.9, waterCut: 21.3, pressure: 2270, cumOil: 47.9, status: 'affected' },

    { date: '1/31/2021', oilRate: 471.5, waterCut: 26.1, pressure: 2250, cumOil: 53.5, status: 'affected' },
    { date: '3/31/2021', oilRate: 457.8, waterCut: 30.2, pressure: 2230, cumOil: 58.8, status: 'affected' },
    { date: '5/31/2021', oilRate: 447.2, waterCut: 33.8, pressure: 2210, cumOil: 63.8, status: 'affected' },
    { date: '7/31/2021', oilRate: 418.6, waterCut: 42.5, pressure: 2190, cumOil: 68.2, status: 'interference' }, // X4 severe impact
    { date: '9/30/2021', oilRate: 395.1, waterCut: 51.2, pressure: 2170, cumOil: 72.1, status: 'interference' },
    { date: '11/30/2021', oilRate: 376.8, waterCut: 58.9, pressure: 2150, cumOil: 75.6, status: 'interference' },

    { date: '1/31/2022', oilRate: 363.2, waterCut: 64.7, pressure: 2130, cumOil: 78.7, status: 'interference' },
    { date: '3/31/2022', oilRate: 353.9, waterCut: 69.1, pressure: 2110, cumOil: 81.6, status: 'interference' },
    { date: '5/31/2022', oilRate: 348.1, waterCut: 72.3, pressure: 2090, cumOil: 84.2, status: 'interference' },
    { date: '7/31/2022', oilRate: 344.7, waterCut: 74.6, pressure: 2070, cumOil: 86.7, status: 'interference' },
    { date: '9/30/2022', oilRate: 342.8, waterCut: 76.2, pressure: 2050, cumOil: 89.1, status: 'interference' },
    { date: '11/30/2022', oilRate: 341.9, waterCut: 77.4, pressure: 2030, cumOil: 91.4, status: 'interference' },

    { date: '1/31/2023', oilRate: 341.5, waterCut: 78.3, pressure: 2010, cumOil: 93.6, status: 'interference' },
    { date: '3/31/2023', oilRate: 341.4, waterCut: 78.9, pressure: 1990, cumOil: 95.8, status: 'interference' },
    { date: '5/31/2023', oilRate: 341.6, waterCut: 79.3, pressure: 1970, cumOil: 97.9, status: 'interference' },
    { date: '7/31/2023', oilRate: 342.0, waterCut: 79.6, pressure: 1950, cumOil: 100.0, status: 'interference' },
    { date: '9/30/2023', oilRate: 342.6, waterCut: 79.7, pressure: 1930, cumOil: 102.1, status: 'interference' },
    { date: '11/30/2023', oilRate: 343.3, waterCut: 79.8, pressure: 1910, cumOil: 104.2, status: 'interference' },

    { date: '1/31/2024', oilRate: 344.1, waterCut: 79.8, pressure: 1890, cumOil: 106.3, status: 'interference' },
    { date: '3/31/2024', oilRate: 344.9, waterCut: 79.7, pressure: 1870, cumOil: 108.4, status: 'interference' },
    { date: '5/31/2024', oilRate: 345.7, waterCut: 79.6, pressure: 1850, cumOil: 110.5, status: 'interference' },
    { date: '7/31/2024', oilRate: 346.5, waterCut: 79.4, pressure: 1830, cumOil: 112.6, status: 'interference' },
    { date: '9/30/2024', oilRate: 347.2, waterCut: 79.2, pressure: 1810, cumOil: 114.7, status: 'interference' }
  ],

  'X3': [
    // Well X3 - Comes online July 2020, causes major interference
    { date: '7/31/2020', oilRate: 485.3, waterCut: 0.1, pressure: 2380, cumOil: 1.2, status: 'startup' },
    { date: '9/30/2020', oilRate: 512.7, waterCut: 0.4, pressure: 2360, cumOil: 5.8, status: 'primary' },
    { date: '11/30/2020', oilRate: 528.1, waterCut: 0.9, pressure: 2340, cumOil: 11.9, status: 'primary' },

    { date: '1/31/2021', oilRate: 538.6, waterCut: 1.5, pressure: 2320, cumOil: 18.7, status: 'primary' },
    { date: '3/31/2021', oilRate: 545.2, waterCut: 2.3, pressure: 2300, cumOil: 26.1, status: 'primary' },
    { date: '5/31/2021', oilRate: 548.9, waterCut: 3.4, pressure: 2280, cumOil: 34.0, status: 'primary' },
    { date: '7/31/2021', oilRate: 515.4, waterCut: 12.8, pressure: 2260, cumOil: 41.2, status: 'affected' }, // X4 impact
    { date: '9/30/2021', oilRate: 485.7, waterCut: 22.6, pressure: 2240, cumOil: 47.5, status: 'affected' },
    { date: '11/30/2021', oilRate: 462.3, waterCut: 31.2, pressure: 2220, cumOil: 53.2, status: 'affected' },

    { date: '1/31/2022', oilRate: 444.8, waterCut: 38.1, pressure: 2200, cumOil: 58.4, status: 'affected' },
    { date: '3/31/2022', oilRate: 431.9, waterCut: 43.8, pressure: 2180, cumOil: 63.2, status: 'affected' },
    { date: '5/31/2022', oilRate: 422.6, waterCut: 48.2, pressure: 2160, cumOil: 67.7, status: 'affected' },
    { date: '7/31/2022', oilRate: 416.1, waterCut: 51.6, pressure: 2140, cumOil: 72.0, status: 'affected' },
    { date: '9/30/2022', oilRate: 411.8, waterCut: 54.3, pressure: 2120, cumOil: 76.1, status: 'affected' },
    { date: '11/30/2022', oilRate: 409.2, waterCut: 56.4, pressure: 2100, cumOil: 80.0, status: 'affected' },

    { date: '1/31/2023', oilRate: 407.8, waterCut: 58.0, pressure: 2080, cumOil: 83.8, status: 'affected' },
    { date: '3/31/2023', oilRate: 407.2, waterCut: 59.2, pressure: 2060, cumOil: 87.5, status: 'affected' },
    { date: '5/31/2023', oilRate: 407.1, waterCut: 60.0, pressure: 2040, cumOil: 91.1, status: 'affected' },
    { date: '7/31/2023', oilRate: 407.4, waterCut: 60.5, pressure: 2020, cumOil: 94.7, status: 'affected' },
    { date: '9/30/2023', oilRate: 408.0, waterCut: 60.8, pressure: 2000, cumOil: 98.3, status: 'affected' },
    { date: '11/30/2023', oilRate: 408.9, waterCut: 60.9, pressure: 1980, cumOil: 101.8, status: 'affected' },

    { date: '1/31/2024', oilRate: 410.0, waterCut: 60.8, pressure: 1960, cumOil: 105.4, status: 'affected' },
    { date: '3/31/2024', oilRate: 411.2, waterCut: 60.6, pressure: 1940, cumOil: 109.0, status: 'affected' },
    { date: '5/31/2024', oilRate: 412.5, waterCut: 60.3, pressure: 1920, cumOil: 112.6, status: 'affected' },
    { date: '7/31/2024', oilRate: 413.8, waterCut: 59.9, pressure: 1900, cumOil: 116.2, status: 'affected' },
    { date: '9/30/2024', oilRate: 415.1, waterCut: 59.4, pressure: 1880, cumOil: 119.8, status: 'affected' }
  ],

  'X4': [
    // Well X4 - Comes online July 2021, causes severe interference to all wells
    { date: '7/31/2021', oilRate: 445.7, waterCut: 0.1, pressure: 2290, cumOil: 1.0, status: 'startup' },
    { date: '9/30/2021', oilRate: 468.2, waterCut: 0.3, pressure: 2270, cumOil: 4.8, status: 'primary' },
    { date: '11/30/2021', oilRate: 482.6, waterCut: 0.7, pressure: 2250, cumOil: 9.7, status: 'primary' },

    { date: '1/31/2022', oilRate: 492.1, waterCut: 1.2, pressure: 2230, cumOil: 15.2, status: 'primary' },
    { date: '3/31/2022', oilRate: 498.3, waterCut: 1.9, pressure: 2210, cumOil: 21.3, status: 'primary' },
    { date: '5/31/2022', oilRate: 501.8, waterCut: 2.8, pressure: 2190, cumOil: 27.9, status: 'primary' },
    { date: '7/31/2022', oilRate: 503.2, waterCut: 3.9, pressure: 2170, cumOil: 34.9, status: 'primary' },
    { date: '9/30/2022', oilRate: 502.8, waterCut: 5.2, pressure: 2150, cumOil: 42.3, status: 'primary' },
    { date: '11/30/2022', oilRate: 501.1, waterCut: 6.7, pressure: 2130, cumOil: 50.0, status: 'primary' },

    { date: '1/31/2023', oilRate: 498.2, waterCut: 8.4, pressure: 2110, cumOil: 57.9, status: 'primary' },
    { date: '3/31/2023', oilRate: 494.1, waterCut: 10.3, pressure: 2090, cumOil: 66.1, status: 'primary' },
    { date: '5/31/2023', oilRate: 488.8, waterCut: 12.4, pressure: 2070, cumOil: 74.5, status: 'primary' },
    { date: '7/31/2023', oilRate: 482.4, waterCut: 14.7, pressure: 2050, cumOil: 83.1, status: 'primary' },
    { date: '9/30/2023', oilRate: 475.1, waterCut: 17.2, pressure: 2030, cumOil: 91.8, status: 'primary' },
    { date: '11/30/2023', oilRate: 467.0, waterCut: 19.9, pressure: 2010, cumOil: 100.6, status: 'primary' },

    { date: '1/31/2024', oilRate: 458.2, waterCut: 22.8, pressure: 1990, cumOil: 109.5, status: 'primary' },
    { date: '3/31/2024', oilRate: 448.8, waterCut: 25.9, pressure: 1970, cumOil: 118.4, status: 'primary' },
    { date: '5/31/2024', oilRate: 438.9, waterCut: 29.2, pressure: 1950, cumOil: 127.4, status: 'primary' },
    { date: '7/31/2024', oilRate: 428.5, waterCut: 32.7, pressure: 1930, cumOil: 136.4, status: 'primary' },
    { date: '9/30/2024', oilRate: 417.7, waterCut: 36.4, pressure: 1910, cumOil: 145.4, status: 'primary' }
  ]
}

// Well coordinates for interference map (nearby wells)
const wellCoordinates = {
  'X1': { x: 746887.95, y: 3214609.83, distance: 0 },
  'X2': { x: 746920.30, y: 3214625.15, distance: 40.2 }, // 40m from X1
  'X3': { x: 746855.60, y: 3214580.45, distance: 52.8 }, // 53m from X1, 68m from X2
  'X4': { x: 746905.25, y: 3214645.70, distance: 47.1 }  // 47m from X1, central interference
}

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
    { sender: 'AI', message: 'Welcome! I\'m your AI reservoir analyst. I can analyze well interference, production trends, optimization opportunities, and predict future performance. Use the interference analysis mode to evaluate multi-well interactions.', isUser: false }
  ])
  const [showWellModal, setShowWellModal] = useState(false)
  const [selectedWell, setSelectedWell] = useState<any>(null)
  const [kpis, setKpis] = useState(defaultKpis)
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])
  const [realTimeData, setRealTimeData] = useState(reservoirData)
  const [isRealTimeActive, setIsRealTimeActive] = useState(false)
  const [animateKpis, setAnimateKpis] = useState(false)
  const [analysisMode, setAnalysisMode] = useState('single') // 'single' or 'interference'
  const [selectedWells, setSelectedWells] = useState<string[]>(['X1'])
  const [interferenceData, setInterferenceData] = useState<any[]>([])
  const [showInterferenceAlerts, setShowInterferenceAlerts] = useState(true)

  const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B']

  // Well Interference Detection Algorithm
  const detectInterference = (wellId: string, data: any[]) => {
    const interferenceEvents: any[] = []

    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1]
      const curr = data[i]

      // Detect sudden production drops (>15% in one period)
      const oilRateChange = (curr.oilRate - prev.oilRate) / prev.oilRate
      const waterCutIncrease = curr.waterCut - prev.waterCut
      const pressureChange = (curr.pressure - prev.pressure) / prev.pressure

      if (oilRateChange < -0.15 && waterCutIncrease > 5) {
        interferenceEvents.push({
          date: curr.date,
          type: 'severe_interference',
          oilLoss: Math.abs(oilRateChange * 100),
          waterIncrease: waterCutIncrease,
          pressureDrop: Math.abs(pressureChange * 100),
          well: wellId
        })
      } else if (oilRateChange < -0.08 && waterCutIncrease > 2) {
        interferenceEvents.push({
          date: curr.date,
          type: 'moderate_interference',
          oilLoss: Math.abs(oilRateChange * 100),
          waterIncrease: waterCutIncrease,
          pressureDrop: Math.abs(pressureChange * 100),
          well: wellId
        })
      }
    }

    return interferenceEvents
  }

  // Calculate interference metrics
  const calculateInterferenceMetrics = () => {
    const metrics: any = {}

    Object.keys(multiWellData).forEach(wellId => {
      const wellData = multiWellData[wellId as keyof typeof multiWellData]
      const events = detectInterference(wellId, wellData)

      // Calculate total production loss due to interference
      const totalLoss = events.reduce((sum, event) => sum + (event.oilLoss * 10), 0) // Approximate daily loss
      const maxWaterCut = Math.max(...wellData.map(d => d.waterCut))
      const avgPressureDrop = wellData.length > 1
        ? ((wellData[0].pressure - wellData[wellData.length - 1].pressure) / wellData[0].pressure) * 100
        : 0

      metrics[wellId] = {
        interferenceEvents: events.length,
        totalProductionLoss: totalLoss,
        maxWaterCut,
        avgPressureDrop,
        currentStatus: wellData[wellData.length - 1]?.status || 'unknown',
        severityScore: events.length + (maxWaterCut > 50 ? 2 : maxWaterCut > 25 ? 1 : 0) + (avgPressureDrop > 20 ? 1 : 0)
      }
    })

    return metrics
  }

  // Enhanced prediction algorithm
  const generatePredictionData = (actualData: number[]) => {
    const lastValue = actualData[actualData.length - 1]
    const predictions = [...actualData]
    const declineRate = reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles]
      ? reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].kpis.fieldDeclineRate / 100
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

  // Interference Detection and AI Alerts
  useEffect(() => {
    if (analysisMode === 'interference' && showInterferenceAlerts) {
      // Analyze interference patterns and send AI recommendations
      const interferenceAnalysis = () => {
        const severeCases: Array<{well: string, loss: number}> = []
        const moderateCases: Array<{well: string, loss: number}> = []
        let totalProdLoss = 0

        Object.keys(multiWellData).forEach(wellId => {
          const interferenceEvents = detectInterference(wellId, multiWellData[wellId as keyof typeof multiWellData])

          if (interferenceEvents.length > 0) {
            // Calculate total production loss from all interference events
            const totalLoss = interferenceEvents.reduce((sum, event) => sum + event.oilLoss, 0)
            const averageLoss = totalLoss / interferenceEvents.length

            // Classify based on severity and frequency
            if (interferenceEvents.length > 3 && averageLoss > 20) {
              severeCases.push({ well: wellId, loss: averageLoss })
              totalProdLoss += averageLoss
            } else if (interferenceEvents.length > 1 || averageLoss > 10) {
              moderateCases.push({ well: wellId, loss: averageLoss })
              totalProdLoss += averageLoss
            }
          }
        })

        // Send AI recommendations based on interference analysis
        setTimeout(() => {
          if (severeCases.length > 0) {
            const worstWell = severeCases.reduce((prev, current) =>
              prev.loss > current.loss ? prev : current
            )
            setAiMessages(prev => [...prev, {
              sender: 'AI',
              message: `🚨 SEVERE INTERFERENCE DETECTED: Well ${worstWell.well} shows ${worstWell.loss.toFixed(1)}% production loss. Recommend: 1) Reduce draw-down pressure on interfering wells, 2) Consider well spacing optimization, 3) Implement pressure maintenance program.`,
              isUser: false
            }])
          }

          if (totalProdLoss > 20) {
            setTimeout(() => {
              setAiMessages(prev => [...prev, {
                sender: 'AI',
                message: `📊 MULTI-WELL OPTIMIZATION: Combined interference causing ${totalProdLoss.toFixed(1)}% field-wide production loss. Recommendations: 1) Stagger production schedules, 2) Implement water injection for pressure support, 3) Consider infill drilling between existing wells.`,
                isUser: false
              }])
            }, 2000)
          }

          if (moderateCases.length >= 2) {
            setTimeout(() => {
              setAiMessages(prev => [...prev, {
                sender: 'AI',
                message: `⚡ RESERVOIR MANAGEMENT: Multiple wells showing interference effects. Consider implementing: 1) Real-time pressure monitoring, 2) Coordinated shut-in procedures, 3) Enhanced oil recovery techniques to maximize field performance.`,
                isUser: false
              }])
            }, 4000)
          }
        }, 1500)
      }

      interferenceAnalysis()
      setShowInterferenceAlerts(false) // Prevent repeated alerts
    }
  }, [analysisMode, showInterferenceAlerts])

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
      const pressure = reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles]
        ? reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].avgPressure
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

  // Multi-well interference chart data
  const multiWellChartData = {
    labels: multiWellData['X1'].map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })),
    datasets: selectedWells.map((wellId, index) => ({
      label: `Well ${wellId}`,
      data: multiWellData[wellId as keyof typeof multiWellData]?.map(d => d.oilRate) || [],
      borderColor: chartColors[index],
      backgroundColor: chartColors[index] + '20',
      fill: false,
      tension: 0.4,
      pointBackgroundColor: multiWellData[wellId as keyof typeof multiWellData]?.map(d => {
        if (d.status === 'severe') return '#ef4444'
        if (d.status === 'interference') return '#f97316'
        if (d.status === 'affected') return '#eab308'
        return chartColors[index]
      }) || [],
      pointRadius: multiWellData[wellId as keyof typeof multiWellData]?.map(d => d.status.includes('interference') || d.status === 'severe' ? 8 : 4) || []
    }))
  }

  const multiWellWaterCutData = {
    labels: multiWellData['X1'].map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })),
    datasets: selectedWells.map((wellId, index) => ({
      label: `Well ${wellId} Water Cut`,
      data: multiWellData[wellId as keyof typeof multiWellData]?.map(d => d.waterCut) || [],
      borderColor: chartColors[index + 4],
      backgroundColor: chartColors[index + 4] + '40',
      fill: true,
      tension: 0.4
    }))
  }

  const multiWellPressureData = {
    labels: multiWellData['X1'].map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })),
    datasets: selectedWells.map((wellId, index) => ({
      label: `Well ${wellId} Pressure`,
      data: multiWellData[wellId as keyof typeof multiWellData]?.map(d => d.pressure) || [],
      borderColor: chartColors[index + 2],
      backgroundColor: chartColors[index + 2] + '30',
      fill: false,
      tension: 0.4
    }))
  }

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
      label: 'Offset Wells - Interference Study',
      data: Object.keys(wellCoordinates).map(wellId => {
        const coord = wellCoordinates[wellId as keyof typeof wellCoordinates]
        const latestData = multiWellData[wellId as keyof typeof multiWellData]?.[multiWellData[wellId as keyof typeof multiWellData]?.length - 1]
        return {
          x: coord.x,
          y: coord.y,
          well: wellId,
          oilRate: latestData?.oilRate || 0,
          status: latestData?.status || 'unknown',
          distance: coord.distance,
          waterCut: latestData?.waterCut || 0,
          pressure: latestData?.pressure || 0
        }
      }),
      backgroundColor: function(context: any) {
        const status = context.raw?.status
        if (status === 'severe') return '#dc2626' // Red - severe interference
        if (status === 'interference') return '#ea580c' // Orange - interference
        if (status === 'affected') return '#ca8a04' // Yellow - affected
        if (status === 'primary') return '#16a34a' // Green - primary
        return '#6b7280' // Gray - unknown
      },
      pointRadius: function(context: any) {
        const status = context.raw?.status
        if (status === 'severe') return 16
        if (status === 'interference') return 14
        return 12
      },
      borderColor: '#ffffff',
      borderWidth: 2
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
        titleFont: { size: 14, weight: 'bold' as const },
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
            <h3>Analysis Mode</h3>
            <select
              className="form-control"
              value={analysisMode}
              onChange={(e) => {
                setAnalysisMode(e.target.value)
                if (e.target.value === 'interference') {
                  setSelectedWells(['X1', 'X2', 'X3', 'X4'])
                  addAlert('🔬 Switched to Well Interference Analysis Mode')
                } else {
                  setSelectedWells(['X1'])
                  addAlert('📊 Switched to Single Well Analysis Mode')
                }
              }}
            >
              <option value="single">Single Well Analysis</option>
              <option value="interference">Well Interference Study</option>
            </select>
          </div>

          {analysisMode === 'interference' && (
            <div className="sidebar__section">
              <h3>Wells in Study</h3>
              <div className="well-checkboxes">
                {Object.keys(multiWellData).map(wellId => (
                  <label key={wellId} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedWells.includes(wellId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedWells([...selectedWells, wellId])
                        } else {
                          setSelectedWells(selectedWells.filter(w => w !== wellId))
                        }
                      }}
                    />
                    <span>Well {wellId}</span>
                    <small style={{ display: 'block', color: 'var(--color-text-secondary)' }}>
                      {wellCoordinates[wellId as keyof typeof wellCoordinates].distance}m from X1
                    </small>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar__section">
            <h3>{analysisMode === 'interference' ? 'Primary Well' : 'Well Selection'}</h3>
            {analysisMode === 'interference' ? (
              <select className="form-control" value={selectedWells[0] || 'X1'} onChange={(e) => {
                if (!selectedWells.includes(e.target.value)) {
                  setSelectedWells([e.target.value, ...selectedWells])
                }
              }}>
                {Object.keys(multiWellData).map(wellId => (
                  <option key={wellId} value={wellId}>Well {wellId}</option>
                ))}
              </select>
            ) : (
              <select className="form-control" value={wellFilter} onChange={(e) => setWellFilter(e.target.value)}>
                <option value="all">All Wells</option>
                {reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles]
                  ? reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].wells.map(well => (
                      <option key={well} value={well}>{well}</option>
                    ))
                  : <>
                      <option value="MN-0002HST1">MN-0002HST1</option>
                      <option value="MN-0010">MN-0010</option>
                      <option value="MN-0002">MN-0002</option>
                    </>
                }
              </select>
            )}
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

                if (e.target.value !== 'all' && reservoirProfiles[e.target.value as keyof typeof reservoirProfiles]) {
                  setKpis(reservoirProfiles[e.target.value as keyof typeof reservoirProfiles].kpis)
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

          {reservoirFilter !== 'all' && reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles] && (
            <div className="sidebar__section">
              <h3>Reservoir Properties</h3>
              <div className="reservoir-props">
                <div className="prop-item">
                  <span>Porosity:</span>
                  <strong>{reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].porosity}%</strong>
                </div>
                <div className="prop-item">
                  <span>Permeability:</span>
                  <strong>{reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].permeability} mD</strong>
                </div>
                <div className="prop-item">
                  <span>Avg Pressure:</span>
                  <strong>{reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].avgPressure} psi</strong>
                </div>
                <div className="prop-item">
                  <span>Temperature:</span>
                  <strong>{reservoirProfiles[reservoirFilter as keyof typeof reservoirProfiles].avgTemp}°C</strong>
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
                <h3>
                  {analysisMode === 'interference'
                    ? 'Well Interference Analysis - Production Trends'
                    : 'Production Trends & Pressure Analysis'
                  }
                </h3>
                <select className="form-control chart-control">
                  {analysisMode === 'interference' ? (
                    <>
                      <option value="comparison">Multi-Well Comparison</option>
                      <option value="timeline">Interference Timeline</option>
                    </>
                  ) : (
                    <>
                      <option value="field">Combined Field View</option>
                      <option value="individual">Individual Wells</option>
                      <option value="forecast">Forecast Mode</option>
                    </>
                  )}
                </select>
              </div>
              <div className="chart-wrapper" style={{ height: '300px', position: 'relative' }}>
                <Line
                  data={analysisMode === 'interference' ? multiWellChartData : productionChartData}
                  options={{
                    ...enhancedChartOptions,
                    plugins: {
                      ...enhancedChartOptions.plugins,
                      tooltip: {
                        ...enhancedChartOptions.plugins.tooltip,
                        callbacks: {
                          afterLabel: function(context: any) {
                            if (analysisMode === 'interference') {
                              const wellId = selectedWells[context.datasetIndex]
                              const dataPoint = multiWellData[wellId as keyof typeof multiWellData]?.[context.dataIndex]
                              if (dataPoint) {
                                let status = dataPoint.status
                                if (status === 'severe') return '🔴 Severe Interference Detected'
                                if (status === 'interference') return '🟠 Well Interference'
                                if (status === 'affected') return '🟡 Production Affected'
                                if (status === 'primary') return '🟢 Primary Production'
                                return `Status: ${status}`
                              }
                            }
                            return context.parsed.y > 550 ? '📈 Good' : '📉 Needs attention'
                          }
                        }
                      }
                    }
                  }}
                />
              </div>

              {analysisMode === 'interference' && (
                <div className="interference-legend">
                  <h4>Interference Status Legend:</h4>
                  <div className="legend-items">
                    <span className="legend-item">🟢 Primary Production</span>
                    <span className="legend-item">🟡 Affected by Nearby Wells</span>
                    <span className="legend-item">🟠 Well Interference</span>
                    <span className="legend-item">🔴 Severe Interference</span>
                  </div>
                </div>
              )}
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
                  {analysisMode === 'interference' ? (
                    <>
                      <button className={`tab ${activeTab === 'watercut' ? 'active' : ''}`} onClick={() => setActiveTab('watercut')}>
                        💧 Water Cut Interference
                      </button>
                      <button className={`tab ${activeTab === 'pressure' ? 'active' : ''}`} onClick={() => setActiveTab('pressure')}>
                        ⏲️ Pressure Interference
                      </button>
                      <button className={`tab ${activeTab === 'metrics' ? 'active' : ''}`} onClick={() => setActiveTab('metrics')}>
                        📊 Interference Metrics
                      </button>
                    </>
                  ) : (
                    <>
                      <button className={`tab ${activeTab === 'watercut' ? 'active' : ''}`} onClick={() => setActiveTab('watercut')}>
                        💧 Water Cut
                      </button>
                      <button className={`tab ${activeTab === 'gor' ? 'active' : ''}`} onClick={() => setActiveTab('gor')}>
                        🔥 GOR Analysis
                      </button>
                      <button className={`tab ${activeTab === 'decline' ? 'active' : ''}`} onClick={() => setActiveTab('decline')}>
                        📉 Decline Curve
                      </button>
                    </>
                  )}
                </div>
                <div className="tab-content">
                  {activeTab === 'watercut' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      {analysisMode === 'interference' ? (
                        <Line data={multiWellWaterCutData} options={enhancedChartOptions} />
                      ) : (
                        <Bar data={watercutChartData} options={enhancedChartOptions} />
                      )}
                    </div>
                  )}
                  {analysisMode === 'interference' && activeTab === 'pressure' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Line data={multiWellPressureData} options={enhancedChartOptions} />
                    </div>
                  )}
                  {analysisMode === 'interference' && activeTab === 'metrics' && (
                    <div className="interference-metrics">
                      {Object.entries(calculateInterferenceMetrics()).map(([wellId, metrics]: [string, any]) => (
                        <div key={wellId} className="metric-card">
                          <h4>Well {wellId}</h4>
                          <div className="metrics-grid">
                            <div className="metric">
                              <label>Interference Events:</label>
                              <span className={metrics.interferenceEvents > 5 ? 'high' : metrics.interferenceEvents > 2 ? 'medium' : 'low'}>
                                {metrics.interferenceEvents}
                              </span>
                            </div>
                            <div className="metric">
                              <label>Production Loss:</label>
                              <span className={metrics.totalProductionLoss > 1000 ? 'high' : 'medium'}>
                                {metrics.totalProductionLoss.toFixed(0)} bbl
                              </span>
                            </div>
                            <div className="metric">
                              <label>Max Water Cut:</label>
                              <span className={metrics.maxWaterCut > 50 ? 'high' : metrics.maxWaterCut > 25 ? 'medium' : 'low'}>
                                {metrics.maxWaterCut.toFixed(1)}%
                              </span>
                            </div>
                            <div className="metric">
                              <label>Pressure Drop:</label>
                              <span className={metrics.avgPressureDrop > 25 ? 'high' : metrics.avgPressureDrop > 15 ? 'medium' : 'low'}>
                                {metrics.avgPressureDrop.toFixed(1)}%
                              </span>
                            </div>
                            <div className="metric">
                              <label>Severity Score:</label>
                              <span className={`severity-score severity-${metrics.severityScore > 7 ? 'high' : metrics.severityScore > 4 ? 'medium' : 'low'}`}>
                                {metrics.severityScore}/10
                              </span>
                            </div>
                            <div className="metric">
                              <label>Current Status:</label>
                              <span className={`status status-${metrics.currentStatus}`}>
                                {metrics.currentStatus.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {analysisMode === 'single' && activeTab === 'gor' && (
                    <div className="chart-wrapper" style={{ height: '250px', position: 'relative' }}>
                      <Line data={gorChartData} options={enhancedChartOptions} />
                    </div>
                  )}
                  {analysisMode === 'single' && activeTab === 'decline' && (
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

        /* Interference Analysis Styles */
        .interference-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 12px;
          background: var(--color-bg-1);
          border-radius: 8px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .interference-checkbox:hover {
          border-color: var(--color-primary);
          background: var(--color-bg-2);
        }

        .interference-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--color-primary);
        }

        .interference-checkbox label {
          font-weight: 600;
          color: var(--color-text);
          cursor: pointer;
          font-size: 14px;
        }

        .interference-tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
          background: var(--color-bg-1);
          border-radius: 8px;
          padding: 4px;
        }

        .interference-tab {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: var(--color-text-secondary);
          font-size: 13px;
        }

        .interference-tab.active {
          background: var(--color-primary);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
        }

        .interference-tab:hover:not(.active) {
          background: var(--color-bg-2);
          color: var(--color-text);
        }

        .interference-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .interference-metric-card {
          padding: 16px;
          background: linear-gradient(135deg, var(--color-bg-1) 0%, var(--color-bg-2) 100%);
          border-radius: 12px;
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
        }

        .interference-metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--color-primary);
        }

        .interference-metric-card h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: var(--color-text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .interference-metric-card .value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .interference-metric-card .value.severe {
          color: #ef4444;
        }

        .interference-metric-card .value.moderate {
          color: #f59e0b;
        }

        .interference-metric-card .value.minimal {
          color: #22c55e;
        }

        .interference-metric-card .description {
          font-size: 12px;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .interference-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 16px;
          padding: 12px;
          background: var(--color-bg-1);
          border-radius: 8px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-color.severe {
          background: #ef4444;
        }

        .legend-color.moderate {
          background: #f59e0b;
        }

        .legend-color.minimal {
          background: #22c55e;
        }

        .legend-color.primary {
          background: var(--color-primary);
        }

        .well-comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .well-comparison-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0;
        }

        .chart-container.interference {
          position: relative;
          height: 450px;
          margin-bottom: 20px;
          background: var(--color-bg-1);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid var(--color-border);
        }
      `}</style>
    </>
  )
}