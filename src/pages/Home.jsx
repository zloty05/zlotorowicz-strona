import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import Problem from '../components/sections/Problem'
import Services from '../components/sections/Services'
import Process from '../components/sections/Process'
import CaseStudies from '../components/sections/CaseStudies'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'

function Home() {
  const location = useLocation()

  // Obsługa wejścia z hashem (np. /portfolio → /#kontakt) — scroll po renderze.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }, [location])

  return (
    <main>
      <Hero />
      <Problem />
      <Services />
      <Process />
      <CaseStudies />
      <About />
      <Contact />
    </main>
  )
}

export default Home
