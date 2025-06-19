'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [showTranscript, setShowTranscript] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const headlines = [
    "Interactive",
    "Personalized", 
    "Conversational",
    "Responsive",
    "Alive"
  ]
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = inputRef.current
    const message = input?.value.trim() || ''
    if (message) {
      setIsLoading(true)
      setVideoUrl(null)
      try {
        setChatHistory(prev => [...prev, { role: 'user', content: message }])
        // Call your Next.js API route
        const res = await fetch('/api/generateVideo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            img_url: '', // use placeholder in API route
            text: message,
            voice_id: 'ZRwrL4id6j1HPGFkeCzO', // Example: Sam
            model: 'V2.5',
            resolution: '512',
            expressiveness: 1,
          }),
        })
        const data = await res.json()
        if (data.video_url) {
          setVideoUrl(data.video_url)
          setChatHistory(prev => [...prev, { role: 'assistant', content: "[AI video response generated]" }])
        } else {
          throw new Error(data.error || 'No video URL returned')
        }
      } catch (error) {
        setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
      } finally {
        setIsLoading(false)
        if (input) input.value = ''
      }
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="dynamic-headline">
              <span className="headline-static">The future of media is</span><br />
              <span className="headline-dynamic">{headlines[currentHeadline]}</span>
            </h1>
          </div>
          <div className="chat-section">
            <div className="chat-demo">
              <div className="chat-header">
                <div className="chat-status">
                  <div className="status-dot"></div>
                  Live AI Character
                </div>
                <div className="transcript-toggle" onClick={() => setShowTranscript(v => !v)} style={{ cursor: 'pointer', marginLeft: 'auto' }}>
                  <span style={{ fontSize: '1.2em' }}>{showTranscript ? '▲' : '▼'}</span>
                </div>
              </div>
              <div className="video-area">
                {videoUrl ? (
                  <video src={videoUrl} autoPlay loop muted style={{ maxWidth: '100%', borderRadius: '12px' }}></video>
                ) : (
                  <div className="ai-character">
                    <div className="lemon-head">
                      <div className="lemon-face">
                        <div className="lemon-eyes">
                          <div className="eye"></div>
                          <div className="eye"></div>
                        </div>
                        <div className="lemon-mouth"></div>
                        <div className="lemon-cheeks cheek-left"></div>
                        <div className="lemon-cheeks cheek-right"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {showTranscript && (
                <div className="chat-transcript" style={{ maxHeight: '200px', overflowY: 'auto', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px', margin: '12px 0', padding: '12px', fontSize: '1rem' }}>
                  {chatHistory.length === 0 && <div style={{ color: '#aaa' }}>No messages yet.</div>}
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`transcript-message ${msg.role}`} style={{ marginBottom: '10px', color: msg.role === 'user' ? '#ffd700' : '#fff' }}>
                      <strong>{msg.role === 'user' ? 'You' : 'LemonSlice'}:</strong> {msg.content}
                    </div>
                  ))}
                </div>
              )}
              <form onSubmit={handleChatSubmit} className="chat-input">
                <input 
                  ref={inputRef}
                  type="text" 
                  className="input-field" 
                  placeholder="Ask the AI anything..." 
                  id="chatInput"
                  disabled={isLoading}
                />
                <button type="submit" className="send-btn" disabled={isLoading}>
                  <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                </button>
              </form>
            </div>
          </div>
          <p className="hero-subtitle">
            Create AI characters that don't just speak—they listen, respond, and evolve. 
            The first step toward a world where every story is personalized.
          </p>
          <div className="chat-actions">
            <Link href="#" className="btn-create-ai">
              <i className="fas fa-magic"></i> Create Your Own AI
            </Link>
            <div className="secondary-actions">
              <Link href="#" className="action-btn">
                <i className="fas fa-play"></i> View Use Cases
              </Link>
              <Link href="#" className="action-btn">
                <i className="fas fa-images"></i> View Gallery
              </Link>
              <Link href="#" className="action-btn">
                <i className="fas fa-trophy"></i> Enter Contests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 