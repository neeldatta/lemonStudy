export default function Features() {
  const features = [
    {
      icon: 'fa-comments',
      title: 'Live Interactive Conversations',
      description: 'Real-time video chats with AI characters that understand context, emotion, and respond naturally to create genuine interactive experiences.'
    },
    {
      icon: 'fa-brain',
      title: 'Adaptive Personalities',
      description: 'Characters that learn and evolve from each interaction, developing unique personalities that remember your preferences and conversation history.'
    },
    {
      icon: 'fa-rocket',
      title: 'Production-Ready Quality',
      description: 'Professional-grade output suitable for marketing campaigns, educational content, entertainment, and customer service applications.'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Beyond Traditional Video</h2>
        <p className="section-subtitle">
          Create characters that don't just perform—they engage, adapt, and evolve
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 