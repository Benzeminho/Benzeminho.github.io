import { useState, useEffect } from 'react'
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
  { category: 'Backend', items: ['Laravel', 'PHP', 'Java'] },
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

const SectionTitle = ({ index, title }: { index: number; title: string }) => (
  <h2 className="section-title">
    <span className="section-index">0{index}.</span> {title}
    <span className="section-line" aria-hidden="true" />
  </h2>
)

const Timeline = ({ entries }: { entries: TimelineEntry[] }) => (
  <ol className="timeline">
    {entries.map(entry => (
      <li key={entry.title} className={`timeline-item ${entry.current ? 'current' : ''}`}>
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
            <div className="terminal-body">
              <p className="prompt"><span className="accent">$</span> whoami</p>
              <h1 className="hero-title">
                Pierre CESCOSSE<span className="cursor" aria-hidden="true">_</span>
              </h1>
              <p className="hero-subtitle">
                Développeur en alternance chez <span className="highlight">CEVA Santé Animale</span>
              </p>
              <p className="prompt"><span className="accent">$</span> cat info.txt</p>
              <p className="hero-info">Etudiant développeur | En constante évolution</p>
              <p className="hero-info">Né le 6 janvier 2003 à Bayonne</p>
            </div>
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
            <div className="card code-card">
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
            <div className="card">
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
            {projects.map(project => (
              <article key={project.id} className="card projet-card">
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
            {skills.map(skill => (
              <div key={skill.category} className="card competence-card">
                <h3>{skill.category}</h3>
                <ul className="tags">
                  {skill.items.map(item => (
                    <li key={item} className="tag">{item}</li>
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
