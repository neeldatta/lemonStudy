'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { lemonSliceApiClient } from '@/lib/api/lemonSlice'

export default function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const headlines = [
    "Interactive",
    "Personalized", 
    "Conversational",
    "Responsive",
    "Alive"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = document.getElementById('chatInput') as HTMLInputElement
    const message = input.value.trim()
    
    if (message) {
      setIsLoading(true)
      try {
        // Add user message to chat history
        setChatHistory(prev => [...prev, { role: 'user', content: message }])
        
        // Get response from Lemon Slice API
        const response = await lemonSliceApiClient.chatWithCharacter(
          'default', // You can replace this with a specific character ID
          message,
          { generateVideo: true, generateAudio: true }
        )
        
        // Add AI response to chat history
        setChatHistory(prev => [...prev, { role: 'assistant', content: response.message }])
        
        // If there's a video URL, you can display it in the video area
        if (response.video_url) {
          const videoArea = document.querySelector('.video-area')
          if (videoArea) {
            videoArea.innerHTML = `<video src="${response.video_url}" autoplay loop muted></video>`
          }
        }
      } catch (error) {
        console.error('Error chatting with AI:', error)
        setChatHistory(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }])
      } finally {
        setIsLoading(false)
        input.value = ''
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
              </div>
              <div className="video-area">
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
              </div>
              <div className="chat-messages">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="chat-input">
                <input 
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