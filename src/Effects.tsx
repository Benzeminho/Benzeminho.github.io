import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value))

// Pluie de caractères façon « Matrix » en fond de l'accueil
export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || prefersReducedMotion()) return

    const characters = '01<>/{}[]=+*;$#アイウエオカキクケコ'
    const fontSize = 16
    let drops: number[] = []
    let frame = 0
    let isVisible = true
    let lastDraw = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drops = Array.from({ length: Math.ceil(canvas.width / fontSize) }, () => Math.random() * -20)
    }

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      // ~20 images/s suffisent et ménagent le processeur
      if (!isVisible || time - lastDraw < 50) return
      lastDraw = time

      const styles = getComputedStyle(document.body)
      context.fillStyle = styles.getPropertyValue('--bg').trim() + '26'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = styles.getPropertyValue('--accent').trim()
      context.font = `${fontSize}px 'JetBrains Mono', monospace`

      drops.forEach((y, column) => {
        const character = characters[Math.floor(Math.random() * characters.length)]
        context.fillText(character, column * fontSize, y * fontSize)
        drops[column] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }

    // Pause quand l'accueil n'est plus à l'écran
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(canvas)

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />
}

// Fine barre en haut de l'écran qui suit l'avancement du scroll
export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0
        barRef.current?.style.setProperty('--progress', progress.toString())
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />
}

// Inclinaison 3D des cartes « .tilt » et attraction des boutons « .magnetic » (ordinateur uniquement)
export const PointerEffects = () => {
  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return

    let tiltedCard: HTMLElement | null = null
    let magnet: HTMLElement | null = null

    const resetCard = () => {
      tiltedCard?.style.removeProperty('--rx')
      tiltedCard?.style.removeProperty('--ry')
      tiltedCard = null
    }

    const resetMagnet = () => {
      magnet?.style.removeProperty('--tx')
      magnet?.style.removeProperty('--ty')
      magnet = null
    }

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement

      const button = target.closest<HTMLElement>('.magnetic')
      if (button !== magnet) resetMagnet()
      if (button) {
        magnet = button
        const rect = button.getBoundingClientRect()
        button.style.setProperty('--tx', `${clamp((event.clientX - rect.left - rect.width / 2) * 0.3, 12)}px`)
        button.style.setProperty('--ty', `${clamp((event.clientY - rect.top - rect.height / 2) * 0.3, 12)}px`)
      }

      const card = target.closest<HTMLElement>('.tilt')
      if (card !== tiltedCard) resetCard()
      if (!card) return

      tiltedCard = card
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--rx', `${(0.5 - y) * 18}deg`)
      card.style.setProperty('--ry', `${(x - 0.5) * 18}deg`)
      card.style.setProperty('--mx', `${x * 100}%`)
      card.style.setProperty('--my', `${y * 100}%`)
    }

    const onLeave = () => {
      resetCard()
      resetMagnet()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return null
}

// Curseur personnalisé : un point qui suit la souris et un cercle qui le rattrape
export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return

    document.body.classList.add('custom-cursor')
    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let frame = 0

    const follow = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      frame = requestAnimationFrame(follow)
    }

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      const isInteractive = !!(event.target as HTMLElement).closest('a, button, .tilt')
      document.body.classList.toggle('cursor-hover', isInteractive)
      document.body.classList.remove('cursor-hidden')
    }

    const onLeave = () => document.body.classList.add('cursor-hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(follow)
    return () => {
      cancelAnimationFrame(frame)
      document.body.classList.remove('custom-cursor', 'cursor-hover', 'cursor-hidden')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

const SCRAMBLE_CHARACTERS = '!<>-_\\/[]{}=+*^?#$01'

// Texte qui apparaît en caractères aléatoires puis se « déchiffre » quand il arrive à l'écran
export const ScrambleText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    let timer = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      let step = 0
      const totalSteps = text.length * 2 + 6
      timer = window.setInterval(() => {
        step++
        const revealed = Math.floor((step / totalSteps) * text.length)
        setDisplay(
          text
            .split('')
            .map((character, index) =>
              index < revealed || character === ' '
                ? character
                : SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)]
            )
            .join('')
        )
        if (step >= totalSteps) {
          clearInterval(timer)
          setDisplay(text)
        }
      }, 35)
    }, { threshold: 0.6 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [text])

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
