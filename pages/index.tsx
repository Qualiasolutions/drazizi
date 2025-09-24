import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [demoButtonText, setDemoButtonText] = useState('View Live Demo')

  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  const handleDemoClick = () => {
    setDemoButtonText('Launching Demo...')
    setTimeout(() => {
      setDemoButtonText('View Live Demo')
      setShowModal(true)
    }, 2000)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Head>
        <title>Qualia Solutions - AI-Powered Reservoir Analytics</title>
        <meta name="description" content="Transforming Oil & Gas Data into Actionable Insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1 className="company-name">Qualia Solutions</h1>
            </div>
            <div className="header-text">
              <h2 className="main-title">AI-Powered Reservoir Analytics Solution</h2>
              <p className="subtitle">Transforming Oil & Gas Data into Actionable Insights</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section problem-section">
        <div className="container">
          <h2 className="section-title">The Challenge</h2>
          <div className="challenges-grid">
            <div className="challenge-card">
              <div className="challenge-icon">📊</div>
              <h3>Manual Data Processing</h3>
              <p>Time-consuming manual data processing and reporting workflows</p>
            </div>
            <div className="challenge-card">
              <div className="challenge-icon">📈</div>
              <h3>Complex Analysis</h3>
              <p>Complex decline curve analysis requiring specialized expertise</p>
            </div>
            <div className="challenge-card">
              <div className="challenge-icon">⏱️</div>
              <h3>Performance Monitoring</h3>
              <p>Time-consuming well performance monitoring processes</p>
            </div>
            <div className="challenge-card">
              <div className="challenge-icon">🔍</div>
              <h3>Optimization Opportunities</h3>
              <p>Difficulty identifying optimization opportunities in real-time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section solution-section">
        <div className="container">
          <h2 className="section-title">Our AI Solution</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Automated Production Analysis</h3>
              <p>AI-driven automated analysis of production data patterns</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📡</div>
              <h3>Real-time Well Performance Monitoring</h3>
              <p>Continuous monitoring with instant alerts and insights</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔮</div>
              <h3>Predictive Decline Modeling</h3>
              <p>Advanced predictive models for production forecasting</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>AI-Powered Recommendations</h3>
              <p>Intelligent recommendations for optimization strategies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Interactive Data Visualization</h3>
              <p>Dynamic dashboards and interactive visualization tools</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section demo-section">
        <div className="container">
          <h2 className="section-title">What We&apos;ll Show You</h2>
          <div className="demo-list">
            <div className="demo-item">
              <div className="demo-icon">📱</div>
              <div className="demo-content">
                <h3>Live Reservoir Data Dashboard</h3>
                <p>Real-time visualization of reservoir performance metrics</p>
              </div>
            </div>
            <div className="demo-item">
              <div className="demo-icon">⚡</div>
              <div className="demo-content">
                <h3>Automated Well Performance Insights</h3>
                <p>AI-generated insights and performance analytics</p>
              </div>
            </div>
            <div className="demo-item">
              <div className="demo-icon">🎯</div>
              <div className="demo-content">
                <h3>Production Forecasting with AI</h3>
                <p>Machine learning models predicting future production</p>
              </div>
            </div>
            <div className="demo-item">
              <div className="demo-icon">🗺️</div>
              <div className="demo-content">
                <h3>Interactive Charts and Maps</h3>
                <p>Dynamic visualizations and geospatial mapping</p>
              </div>
            </div>
            <div className="demo-item">
              <div className="demo-icon">💬</div>
              <div className="demo-content">
                <h3>Natural Language Query Interface</h3>
                <p>Ask questions about your data in plain English</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section benefits-section">
        <div className="container">
          <h2 className="section-title">Expected Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-number">70%</div>
              <h3>Reduction in Report Generation Time</h3>
              <p>Automated reporting significantly reduces manual effort</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">25%</div>
              <h3>Improvement in Production Optimization</h3>
              <p>Data-driven insights lead to better optimization decisions</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🚨</div>
              <h3>Real-time Anomaly Detection</h3>
              <p>Immediate alerts for unusual patterns or issues</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Data-driven Decision Making</h3>
              <p>Make informed decisions based on comprehensive analytics</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="cta-description">Experience the power of AI-driven reservoir analytics</p>
            <button className="cta-button" onClick={handleDemoClick}>
              {demoButtonText}
            </button>
            <div style={{ marginTop: '20px' }}>
              <Link href="/dashboard">
                <button className="cta-button secondary">Go to Dashboard</button>
              </Link>
            </div>
            <div className="contact-info">
              <p>Contact Qualia Solutions</p>
              <p>
                Website:{' '}
                <a href="https://qualiasolutions.net" target="_blank" rel="noopener noreferrer">
                  qualiasolutions.net
                </a>
              </p>
              <p>
                Email: <a href="mailto:info@qualiasolutions.net">info@qualiasolutions.net</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Demo Ready!</h2>
            <p>
              The AI-Powered Reservoir Analytics demo is now ready to launch. In a real
              implementation, this would navigate to the live dashboard with real-time data
              visualization and analytics capabilities.
            </p>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeModal}>
                Continue
              </button>
              <Link href="/dashboard">
                <button className="modal-button primary">Go to Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}