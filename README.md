# Portfolio - Pierre CESCOSSE

Portfolio personnel développé avec React et TypeScript, présentant mes projets, compétences et expériences professionnelles.

## 🌟 Fonctionnalités

- **Navigation fluide** : Menu de navigation fixe avec défilement fluide vers les sections
- **Mode sombre** : Basculez entre les thèmes clair et sombre avec sauvegarde de la préférence
- **Design responsive** : Interface adaptée à tous les écrans (mobile, tablette, desktop)
- **Projets détaillés** : Modal popup pour afficher les détails complets de chaque projet
- **Téléchargement CV** : Possibilité de télécharger le CV en PDF
- **Animations** : Transitions et animations fluides pour une meilleure expérience utilisateur

## 🛠️ Technologies utilisées

- **React** 18+ avec hooks (useState, useEffect)
- **TypeScript** pour le typage statique
- **CSS3** avec variables CSS et animations
- **Vite** comme bundler et serveur de développement

## 📋 Structure du projet

```
portfolio/
├── src/
│   ├── App.tsx          # Composant principal de l'application
│   ├── App.css          # Styles principaux
│   ├── index.css        # Styles globaux
│   └── main.tsx         # Point d'entrée de l'application
├── public/
│   └── cv-pierre-cescosse.pdf  # CV téléchargeable
└── package.json
```

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/benzeminho/portfolio.git

# Accéder au répertoire
cd portfolio

# Installer les dépendances
npm install
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
# Créer une version optimisée pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 📱 Sections du portfolio

### Accueil
- Présentation avec nom et titre
- Liens vers LinkedIn et GitHub

### À propos
- Informations personnelles
- Liens professionnels

### Projets
- Liste des projets réalisés
- Technologies utilisées
- Descriptions détaillées dans des modals
- Liens vers les projets en ligne

### Compétences
- Frontend (React, TypeScript, JavaScript, HTML, CSS, Angular)
- Backend (Laravel, PHP, Java)
- Bases de données (MySQL, SQLite)
- Outils (Git, VS Code, Figma, UI/UX Design)

### Expérience professionnelle
- Historique des expériences
- Dates et descriptions des postes

### Formation
- Parcours académique
- Diplômes et formations

### Contact
- Informations de contact
- Liens sociaux
- Bouton de téléchargement du CV

## 🎨 Personnalisation

### Modifier les couleurs

Les couleurs principales sont définies dans `App.css` avec des variables CSS :

```css
:root {
  --accent-primary: #137C8B;
  --accent-secondary: #344D59;
  --accent-hover: #0F5F6F;
  /* ... autres variables */
}
```

### Ajouter un projet

Dans `App.tsx`, ajoutez un nouvel objet dans le tableau `projects` :

```typescript
{
  id: 3,
  title: 'Titre du projet',
  shortDescription: 'Description courte',
  fullDescription: 'Description complète',
  techStack: 'Technologies utilisées',
  date: 'Date du projet',
  link: 'https://lien-vers-projet.com',
  features: ['Fonctionnalité 1', 'Fonctionnalité 2'],
  challenges: ['Défi 1', 'Défi 2']
}
```

### Modifier les sections

Les sections sont définies dans le tableau `sections` du composant App. Vous pouvez modifier l'ordre ou ajouter de nouvelles sections.

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser comme base pour votre propre portfolio.

## 👤 Auteur

**Pierre CESCOSSE**
- LinkedIn: [pierre-cescosse](https://linkedin.com/in/pierre-cescosse)
- GitHub: [@benzeminho](https://github.com/benzeminho)
- Email: pierre.cescosse@icloud.com

## 🙏 Remerciements

Merci d'avoir consulté mon portfolio ! N'hésitez pas à me contacter pour toute question ou opportunité professionnelle.