import { useState, useEffect } from 'react'
import './app.css'

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

const App = () => {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Charger la préférence au montage du composant
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

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
      title: 'Placeholder',
      shortDescription: 'Placeholder',
      fullDescription: 'Description complète du projet à venir. Ce projet illustrera mes compétences en développement et ma capacité à résoudre des problèmes complexes.',
      techStack: 'Placeholder',
      date: 'Septembre 2024',
      features: [
        'Fonctionnalité 1',
        'Fonctionnalité 2',
        'Fonctionnalité 3'
      ]
    }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', (!isDarkMode).toString())
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
          <div className="nav-logo">PC</div>
          <ul className="nav-menu">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button className="cv-button" onClick={downloadCV}>
              Télécharger CV
            </button>
          </div>
        </div>
      </nav>

      {/* Accueil */}
      <section id="accueil" className="section hero">
        <div className="hero-content">
          <h1 className="hero-title">Pierre CESCOSSE</h1>
          <p className="hero-subtitle">Etudiant développeur | En constante évolution</p>
          <div className="hero-info">
            <p><strong>Né le 6 janvier 2003 à Bayonne</strong></p>
            <a href="https://linkedin.com/in/pierre-cescosse" target="_blank" rel="noopener noreferrer" className="accueil-link">
              LinkedIn: pierre-cescosse
            </a>
            <a href="https://github.com/benzeminho" target="_blank" rel="noopener noreferrer" className="accueil-link">
                GitHub: benzeminho
              </a>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="about" className="section about">
        <div className="section-container">
          <h2>À propos de moi</h2>
          <div className="about-content">
            <div className="about-card">
              <h3>Informations Personnelles</h3>
              <ul>
                <li><strong>Nom:</strong> CESCOSSE</li>
                <li><strong>Prénom:</strong> Pierre</li>
                <li><strong>Date de naissance:</strong> 06 janvier 2003</li>
                <li><strong>Lieu de naissance:</strong> Bayonne</li>
                <li><strong>Formation actuelle:</strong> B2 Développeur</li>
              </ul>
            </div>
            <div className="about-card">
              <h3>Liens Professionnels</h3>
              <ul>
                <li>
                  <a href="https://linkedin.com/in/pierre-cescosse" target="_blank" rel="noopener noreferrer">
                    LinkedIn: pierre-cescosse
                  </a>
                </li>
                <li>
                  <button className="download-link" onClick={downloadCV}>
                    Télécharger mon CV
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="section projets">
        <div className="section-container">
          <h2>Projets</h2>
          <div className="projets-grid">
            {projects.map(project => (
              <div key={project.id} className="projet-card">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <h3>{project.title}</h3>
                  </a>
                ) : (
                  <h3>{project.title}</h3>
                )}
                <p className="tech-stack">{project.techStack}</p>
                <p>{project.shortDescription}</p>
                <button 
                  className="detail-button"
                  onClick={() => openProjectModal(project)}
                >
                  Voir les détails
                </button>
                <p className="timeline-date">{project.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section id="competences" className="section competences">
        <div className="section-container">
          <h2>Compétences</h2>
          <div className="competences-grid">
            <div className="competence-card">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>Angular</li>
              </ul>
            </div>
            <div className="competence-card">
              <h3>Backend</h3>
              <ul>
                <li>Laravel</li>
                <li>PHP</li>
                <li>Java</li>
              </ul>
            </div>
            <div className="competence-card">
              <h3>Bases de données</h3>
              <ul>
                <li>MySQL</li>
                <li>SQLite</li>
              </ul>
            </div>
            <div className="competence-card">
              <h3>Outils</h3>
              <ul>
                <li>Git & Github</li>
                <li>VS Code</li>
                <li>Figma</li>
                <li>Design UI/UX</li>
                <li>Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Expérience Professionnelle */}
        <section id="experience" className="section experience">
          <div className="section-container">
            <h2>Expérience Professionnelle</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Intérim en Granulation et Classification d'Aliment</h3>
                  <p className="timeline-date">SOAL | Été 2024</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Travail sur l'Exploitation Agricole Familiale</h3>
                  <p className="timeline-description">Conduite tracteur, irrigation</p>
                  <p className="timeline-date">Étés 2019, 2021, 2023</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Intérim - Épuration de Champ de Maïs</h3>
                  <p className="timeline-date">Été 2022</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Formation */}
      <section id="formation" className="section formation">
        <div className="section-container">
          <h2>Formation</h2>
          <div className="timeline">
            <div className="timeline-item">
              
              <div className="timeline-content">
                <h3>Deuxième année filière Logiciel et Intelligence Artificielle</h3>
                <p className="timeline-date">IPI | 2025 - Aujourd'hui</p>
              </div>
            </div>
            <div className="timeline-item">
              
              <div className="timeline-content">
                <h3>Première année filière Logiciel et Intelligence Artificielle</h3>
                <p className="timeline-date">ESIEA | 2024-2025</p>
              </div>
            </div>
            <div className="timeline-item">
              
              <div className="timeline-content">
                <h3>Licence Informatique</h3>
                <p className="timeline-date">FAC Montaury Angleit | 2022-2024</p>
              </div>
            </div>
            <div className="timeline-item">
              
              <div className="timeline-content">
                <h3>Baccalauréat général</h3>
                <p className="timeline-description">Option: Mathématiques/Physique-Chimie</p>
                <p className="timeline-date">Lycée de Borda, Dax | 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact">
        <div className="section-container">
          <h2>Contact</h2>
          <div className="contact-content">
            <p>+33 7 72 34 86 22</p>
            <p>pierre.cescosse@icloud.com</p>
            <p className="contact-intro">N'hésitez pas à me contacter pour discuter de projets ou d'opportunités professionnelles.</p>
            <div className="contact-links">
              <a href="https://linkedin.com/in/pierre-cescosse" target="_blank" rel="noopener noreferrer" className="contact-link">
                LinkedIn: pierre-cescosse
              </a>
              <a href="https://github.com/benzeminho" target="_blank" rel="noopener noreferrer" className="contact-link">
                GitHub: benzeminho
              </a>
              <button className="contact-cv-button" onClick={downloadCV}>
                Télécharger mon CV
              </button>
            </div>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <p className="modal-date">{selectedProject.date}</p>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Technologies utilisées</h3>
                <p className="tech-stack">{selectedProject.techStack}</p>
              </div>
              
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
                    {selectedProject.challenges.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.link && (
                <div className="modal-section">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link-button"
                  >
                    Visiter le site →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App