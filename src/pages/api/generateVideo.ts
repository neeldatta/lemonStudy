import type { NextApiRequest, NextApiResponse } from 'next'

const LEMONSLICE_API_KEY = process.env.LEMONSLICE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { img_url, text, voice_id, model, resolution, expressiveness } = req.body

  // Use resumePhoto.jpeg in public as the default image if not provided
  const imageUrl = img_url || 'http://localhost:3000/resumePhoto.jpeg'

  // 1. Start video generation
  const genRes = await fetch('https://lemonslice.com/api/v2/generate', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'authorization': `Bearer ${LEMONSLICE_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      img_url: imageUrl,
      text,
      voice_id,
      model: model || 'V2.5',
      resolution: resolution || '512',
      expressiveness: expressiveness || 1,
    }),
  })
  const genData = await genRes.json()
  if (!genData.id) return res.status(500).json({ error: 'Failed to start generation', details: genData })

  // 2. Poll for video completion
  let videoUrl = null
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 3000))
    const pollRes = await fetch(`https://lemonslice.com/api/v2/generations/${genData.id}`, {
      headers: { 'authorization': `Bearer ${LEMONSLICE_API_KEY}` }
    })
    const pollData = await pollRes.json()
    if (pollData.status === 'completed' && pollData.video_url) {
      videoUrl = pollData.video_url
      break
    }
    if (pollData.status === 'failed') break
  }
  if (!videoUrl) return res.status(500).json({ error: 'Video generation failed or timed out' })
  res.json({ video_url: videoUrl })
} 