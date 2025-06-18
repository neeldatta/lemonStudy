import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '../components/Hero'
import Vision from '../components/Vision'
import Features from '../components/Features'
import CTA from '../components/CTA'

export const metadata: Metadata = {
  title: 'Lemon Slice - Interactive AI Video Platform',
  description: 'Create AI characters that don\'t just speak—they listen, respond, and evolve.',
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Vision />
      <Features />
      <CTA />
    </main>
  )
}
