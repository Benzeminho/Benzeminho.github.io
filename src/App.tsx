import { useState, useEffect, type CSSProperties } from 'react'
import './App.css'

interface NavSection {
  id: string
  label: string
}

interface Project {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  techStack: string
  date: string
  link?: string
  features?: string[]
  challenges?: string[]
}

interface TimelineEntry {
  title: string
  place: string
  date: string
  description?: string
  current?: boolean
}

const sections: NavSection[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'formation', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

const projects: Project[] = [
  {
    id: 1,
    title: 'Site Web - Association Seintillantes Dax',
    shortDescription: 'Développement d\'un site web en équipe pour l\'association des Seintillantes Dax. Mise à jour et codage des différentes parties du site.',
    fullDescription: 'Projet collaboratif de développement d\'un site web pour l\'association des Seintillantes Dax.',
    techStack: 'HTML • CSS • JavaScript • PHP • MySQL',
    date: 'Septembre 2024',
    link: 'https://lesseintillantesdax.fr/Page/index.php',
    features: [
      'Système de gestion de contenu dynamique',
      'Interface responsive',
      'Base de données MySQL'
    ],
    challenges: [
      'Communication d\'équipe',
      'Intégration de fonctionnalités dynamiques avec PHP et MySQL après la création initiale en HTML/CSS/JS',
      'Perte de membres de l\'équipe en cours de projet'
    ]
  },
  {
    id: 2,
    title: 'Spot the square',
    shortDescription: 'Jeu de logique en JavaScript',
    fullDescription: 'Jeu de logique développé en JavaScript où le joueur doit identifier le carré différent parmi une grille de carrés similaires.',
    techStack: 'HTML • CSS • JavaScript',
    date: 'Septembre 2025',
    link: 'https://github.com/Vaiko0/js-spot-the-square',
    features: [
      'Échiquier interactif (64 cases)',
      'Sélection aléatoire d’une case à trouver',
      'Gestion et affichage du score en temps réel',
      'Mode chrono (1 ou 2 minutes)',
      'Mode survie avec 3 vies',
      'Sauvegarde et affichage du meilleur score via localStorage',
      'Possibilité de retourner l\'échiquier pour s\'entraîner côté noir'
    ],
    challenges: [
      'Gestion du temps et des scores',
      'Stockage local ET affichage des meilleurs scores',
      'Création du chrono et des vies'
    ]
  }
]

const skills: { category: string; items: string[] }[] = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Angular'] },
  { category: 'Backend', items: ['Laravel', 'PHP', 'Java', 'Spring Boot', 'C#', 'C++'] },
  { category: 'Bases de données', items: ['MySQL', 'SQLite'] },
  { category: 'Outils', items: ['Git & Github', 'VS Code', 'Figma', 'Design UI/UX', 'Responsive design'] },
]

const experiences: TimelineEntry[] = [
  {
    title: 'Développeur en alternance',
    place: 'CEVA Santé Animale',
    date: 'Depuis septembre 2026',
    current: true
  },
  {
    title: 'Intérim en Granulation et Classification d\'Aliment',
    place: 'SOAL',
    date: 'Été 2024'
  },
  {
    title: 'Travail sur l\'Exploitation Agricole Familiale',
    place: 'Exploitation familiale',
    date: 'Étés 2019, 2021, 2023',
    description: 'Conduite tracteur, irrigation'
  },
  {
    title: 'Intérim - Épuration de Champ de Maïs',
    place: 'Intérim',
    date: 'Été 2022'
  },
]

const formations: TimelineEntry[] = [
  {
    title: 'Deuxième année filière Logiciel et Intelligence Artificielle',
    place: 'IPI',
    date: '2025 - Aujourd\'hui',
    current: true
  },
  {
    title: 'Première année filière Logiciel et Intelligence Artificielle',
    place: 'ESIEA',
    date: '2024-2025'
  },
  {
    title: 'Licence Informatique',
    place: 'FAC Montaury Angleit',
    date: '2022-2024'
  },
  {
    title: 'Baccalauréat général',
    place: 'Lycée de Borda, Dax',
    date: '2022',
    description: 'Option: Mathématiques/Physique-Chimie'
  },
]

// Décalage de l'animation d'apparition pour chaque élément d'une liste
const stagger = (index: number) => ({ '--i': index }) as CSSProperties

const SectionTitle = ({ index, title }: { index: number; title: string }) => (
  <h2 className="section-title">
    <span className="section-index">0{index}.</span> {title}
    <span className="section-line" aria-hidden="true" />
  </h2>
)

const Timeline = ({ entries }: { entries: TimelineEntry[] }) => (
  <ol className="timeline">
    {entries.map((entry, index) => (
      <li key={entry.title} className={`timeline-item stagger ${entry.current ? 'current' : ''}`} style={stagger(index)}>
        <span className="timeline-dot" aria-hidden="true" />
        <div className="timeline-content">
          <p className="timeline-date">
            {entry.date}
            {entry.current && <span className="badge">en cours</span>}
          </p>
          <h3>{entry.title}</h3>
          <p className="timeline-place">@ {entry.place}</p>
          {entry.description && <p className="timeline-description">{entry.description}</p>}
        </div>
      </li>
    ))}
  </ol>
)

interface TypedLine {
  tag: 'p' | 'h1'
  className: string
  segments: { text: string; className?: string }[]
}

const heroLines: TypedLine[] = [
  { tag: 'p', className: 'prompt', segments: [{ text: '$ ', className: 'accent' }, { text: 'whoami' }] },
  { tag: 'h1', className: 'hero-title', segments: [{ text: 'Pierre CESCOSSE' }] },
  {
    tag: 'p',
    className: 'hero-subtitle',
    segments: [{ text: 'Développeur en alternance chez ' }, { text: 'CEVA Santé Animale', className: 'highlight' }]
  },
  { tag: 'p', className: 'prompt', segments: [{ text: '$ ', className: 'accent' }, { text: 'cat info.txt' }] },
  { tag: 'p', className: 'hero-info', segments: [{ text: 'Etudiant développeur | En constante évolution' }] },
  { tag: 'p', className: 'hero-info', segments: [{ text: 'Né le 6 janvier 2003 à Bayonne' }] },
]

const lineLength = (line: TypedLine) => line.segments.reduce((total, segment) => total + segment.text.length, 0)
const lineStarts = heroLines.map((_, index) => heroLines.slice(0, index).reduce((total, line) => total + lineLength(line), 0))
const lineEnds = heroLines.map((line, index) => lineStarts[index] + lineLength(line))
const totalLength = lineEnds[lineEnds.length - 1]

// Texte de l'accueil qui s'écrit caractère par caractère
const TypewriterTerminal = () => {
  // Sans animation si l'utilisateur a demandé à réduire les mouvements
  const [typed, setTyped] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? totalLength : 0
  )

  useEffect(() => {
    if (typed >= totalLength) return

    // Pause plus longue en fin de ligne, comme si on tapait « Entrée »
    const isLineEnd = lineEnds.includes(typed)
    const delay = typed === 0 ? 500 : isLineEnd ? 450 : 30 + Math.random() * 40
    const timer = setTimeout(() => setTyped(typed + 1), delay)
    return () => clearTimeout(timer)
  }, [typed])

  const isDone = typed >= totalLength

  return (
    <div className="terminal-body">
      {heroLines.map((line, lineIndex) => {
        const lineStart = lineStarts[lineIndex]
        const isCurrent = isDone ? lineIndex === heroLines.length - 1 : typed >= lineStart && typed < lineEnds[lineIndex]
        let segmentStart = lineStart
        const Tag = line.tag

        return (
          <Tag key={lineIndex} className={line.className}>
            {line.segments.map((segment, segmentIndex) => {
              const visibleCount = Math.max(0, Math.min(segment.text.length, typed - segmentStart))
              const hasCursor = !isDone && isCurrent && visibleCount < segment.text.length && typed >= segmentStart
              segmentStart += segment.text.length
              return (
                <span key={segmentIndex} className={segment.className}>
                  {segment.text.slice(0, visibleCount)}
                  {hasCursor && <span className="cursor typing" aria-hidden="true">_</span>}
                  <span className="untyped" aria-hidden="true">{segment.text.slice(visibleCount)}</span>
                </span>
              )
            })}
            {isDone && isCurrent && <span className="cursor" aria-hidden="true">_</span>}
          </Tag>
        )
      })}
    </div>
  )
}

const App = () => {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isLightMode, setIsLightMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Thème sombre par défaut, clair si l'utilisateur l'a choisi
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setIsLightMode(true)
      document.body.classList.add('light-mode')
    }
  }, [])

  // Met à jour le lien actif selon la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  // Animation d'apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
    document.body.classList.toggle('light-mode')
    localStorage.setItem('theme', isLightMode ? 'dark' : 'light')
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv-pierre-cescosse.pdf'
    link.download = 'CV-Pierre-CESCOSSE.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <button className="nav-logo" onClick={() => scrollToSection('accueil')}>
            <span className="accent">&lt;</span>PC<span className="accent"> /&gt;</span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="nav-index">0{index}.</span>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isLightMode ? 'Passer en mode sombre' : 'Passer en mode clair'}
            >
              {isLightMode ? '☾' : '☀'}
            </button>
            <button className="cv-button" onClick={downloadCV}>
              CV.pdf
            </button>
            <button
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Accueil */}
      <section id="accueil" className="section hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">~/portfolio — zsh</span>
            </div>
            <TypewriterTerminal />
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollToSection('projets')}>
              Voir mes projets
            </button>
            <a href="https://linkedin.com/in/pierre-cescosse" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn
            </a>
            <a href="https://github.com/benzeminho" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="about" className="section">
        <div className="section-container reveal">
          <SectionTitle index={1} title="À propos de moi" />
          <div className="about-content">
            <div className="card code-card stagger" style={stagger(0)}>
              <p className="code-comment">// Informations personnelles</p>
              <p><span className="kw">const</span> <span className="var">pierre</span> = {'{'}</p>
              <p className="indent"><span className="key">nom</span>: <span className="str">'CESCOSSE'</span>,</p>
              <p className="indent"><span className="key">prenom</span>: <span className="str">'Pierre'</span>,</p>
              <p className="indent"><span className="key">naissance</span>: <span className="str">'06 janvier 2003'</span>,</p>
              <p className="indent"><span className="key">lieu</span>: <span className="str">'Bayonne'</span>,</p>
              <p className="indent"><span className="key">formation</span>: <span className="str">'B2 Développeur'</span>,</p>
              <p className="indent"><span className="key">alternance</span>: <span className="str">'CEVA Santé Animale'</span>,</p>
              <p>{'}'}</p>
            </div>
            <div className="card stagger" style={stagger(1)}>
              <h3>Liens Professionnels</h3>
              <ul className="link-list">
                <li>
                  <a href="https://linkedin.com/in/pierre-cescosse" target="_blank" rel="noopener noreferrer">
                    LinkedIn: pierre-cescosse ↗
                  </a>
                </li>
                <li>
                  <a href="https://github.com/benzeminho" target="_blank" rel="noopener noreferrer">
                    GitHub: benzeminho ↗
                  </a>
                </li>
                <li>
                  <button className="text-link" onClick={downloadCV}>
                    Télécharger mon CV ↓
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="section">
        <div className="section-container reveal">
          <SectionTitle index={2} title="Projets" />
          <div className="projets-grid">
            {projects.map((project, index) => (
              <article key={project.id} className="card projet-card stagger" style={stagger(index)}>
                <div className="projet-header">
                  <span className="folder-icon" aria-hidden="true">{'{ }'}</span>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="projet-external" aria-label={`Ouvrir ${project.title}`}>
                      ↗
                    </a>
                  )}
                </div>
                <p className="projet-date">{project.date}</p>
                <h3>{project.title}</h3>
                <p className="projet-description">{project.shortDescription}</p>
                <p className="tech-stack">{project.techStack}</p>
                <button className="detail-button" onClick={() => openProjectModal(project)}>
                  Voir les détails →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section id="competences" className="section">
        <div className="section-container reveal">
          <SectionTitle index={3} title="Compétences" />
          <div className="competences-grid">
            {skills.map((skill, index) => (
              <div key={skill.category} className="card competence-card stagger" style={stagger(index)}>
                <h3>{skill.category}</h3>
                <ul className="tags">
                  {skill.items.map((item, itemIndex) => (
                    <li key={item} className="tag stagger" style={stagger(index + 2 + itemIndex * 0.5)}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expérience Professionnelle */}
      <section id="experience" className="section">
        <div className="section-container reveal">
          <SectionTitle index={4} title="Expérience Professionnelle" />
          <Timeline entries={experiences} />
        </div>
      </section>

      {/* Formation */}
      <section id="formation" className="section">
        <div className="section-container reveal">
          <SectionTitle index={5} title="Formation" />
          <Timeline entries={formations} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="section-container contact-content reveal">
          <SectionTitle index={6} title="Contact" />
          <p className="contact-intro">N'hésitez pas à me contacter pour discuter de projets ou d'opportunités professionnelles.</p>
          <div className="contact-details">
            <a href="mailto:pierre.cescosse@icloud.com">pierre.cescosse@icloud.com</a>
            <a href="tel:+33772348622">+33 7 72 34 86 22</a>
          </div>
          <div className="contact-links">
            <a href="mailto:pierre.cescosse@icloud.com" className="btn btn-primary">
              Me contacter
            </a>
            <a href="https://linkedin.com/in/pierre-cescosse" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn
            </a>
            <a href="https://github.com/benzeminho" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub
            </a>
            <button className="btn btn-ghost" onClick={downloadCV}>
              Télécharger mon CV
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Pierre CESCOSSE. Tous droits réservés.</p>
      </footer>

      {/* Modal Popup */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeProjectModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={closeProjectModal} aria-label="Fermer">
              ×
            </button>
            <div className="modal-header">
              <p className="projet-date">{selectedProject.date}</p>
              <h2>{selectedProject.title}</h2>
              <p className="tech-stack">{selectedProject.techStack}</p>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Description du projet</h3>
                <p>{selectedProject.fullDescription}</p>
              </div>

              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="modal-section">
                  <h3>Fonctionnalités principales</h3>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.challenges && (
                <div className="modal-section">
                  <h3>Défis relevés</h3>
                  <ul>
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visiter le site →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
