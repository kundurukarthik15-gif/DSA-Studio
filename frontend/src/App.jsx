
import { useEffect, useState } from 'react'
import './App.css'

const topics = [
  { name: 'Arrays', description: 'Explore indexes, insertion, deletion, and traversal.', icon: '▦', count: 'Start here', color: '#818cf8' },
  { name: 'Searching', description: 'Understand linear search and binary search.', icon: '⌕', count: '2 algorithms', color: '#38bdf8' },
  { name: 'Sorting', description: 'Visualize how elements move into order.', icon: '↕', count: 'Coming next', color: '#fbbf24' },
  { name: 'Linked Lists', description: 'Learn nodes, pointers, and connections.', icon: '⇢', count: 'Coming next', color: '#34d399' },
  { name: 'Stacks & Queues', description: 'Understand LIFO and FIFO operations.', icon: '▤', count: 'Coming next', color: '#f472b6' },
  { name: 'Trees', description: 'Explore hierarchical structures and traversal.', icon: '⑂', count: 'Coming next', color: '#c084fc' },
]

function App() {
  const [status, setStatus] = useState('Checking backend...')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('Backend request failed')
        return response.json()
      })
      .then((data) => {
        setStatus(data.message)
        setIsConnected(data.success)
      })
      .catch(() => {
        setStatus('Unable to connect to the backend')
        setIsConnected(false)
      })
  }, [])

  return (
    <main className="dashboard">
      <header className="topbar">
        <a className="brand" href="/" aria-label="DSA Studio home">
          <span className="brand-icon">D</span>
          <span>DSA <span className="brand-light">Studio</span></span>
        </a>
        <nav>
          <a className="nav-active" href="#topics">Learn</a>
          <a href="#progress">My Progress</a>
        </nav>
        <span className="connection">
          <span className={`status-dot ${isConnected ? 'online' : ''}`} />
          {isConnected ? 'API Connected' : 'Connecting...'}
        </span>
      </header>

      <section className="welcome">
        <span className="eyebrow">YOUR INTERACTIVE DSA PLAYGROUND</span>
        <h1>Understand algorithms.<br /><span className="gradient-text">One step at a time.</span></h1>
        <p>Learn Data Structures and Algorithms by watching them work. Explore concepts, follow each step, and build your problem-solving skills.</p>
        <a className="primary-button" href="#topics">Explore topics <span>→</span></a>
        <div className="welcome-decoration" aria-hidden="true">{'{ }'}</div>
      </section>

      <section className="topics-section" id="topics">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LEARNING PATH</span>
            <h2>Explore DSA topics</h2>
            <p>Choose a topic to begin your journey.</p>
          </div>
          <span className="topic-count">06 TOPICS</span>
        </div>

        <div className="topic-grid">
          {topics.map((topic, index) => (
            <article className="topic-card" key={topic.name}>
              <div className="topic-card-top">
                <span className="topic-icon" style={{ '--topic-color': topic.color }}>{topic.icon}</span>
                <span className="topic-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <div className="topic-card-bottom">
                <span>{topic.count}</span>
                <a href={index === 0 ? '#progress' : '#topics'} aria-label={`Explore ${topic.name}`}>↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="progress-section" id="progress">
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h2>Every expert starts somewhere.</h2>
          <p>Your learning progress and completed visualizations can be tracked here as we build more features.</p>
        </div>
        <div className="progress-stat">
          <strong>0</strong>
          <span>Visualizations completed</span>
          <div className="progress-track"><span /></div>
          <small>Ready when you are</small>
        </div>
      </section>

      <footer>
        <span>DSA Studio</span>
        <span>Learn it. See it. Understand it.</span>
        <span className="footer-status">{status}</span>
      </footer>
    </main>
  )
}

export default App
