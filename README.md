# GOBApps Hub

Hub principal GOBApps - Point d'entrée vers toutes les applications propulsées par JSL AI.

## 🚀 Vue d'ensemble

GOBApps Hub est la page d'accueil qui centralise l'accès à toutes nos applications intelligentes. Il offre une interface moderne et intuitive pour naviguer entre les différentes solutions.

## 📱 Applications disponibles

### 🟢 Applications actives
- **Seeking Alpha Auto** - Analyse automatique des actions et données financières
- **GOBApps Interface** - Interface de gestion d'accès aux applications

### 🟡 En développement
- **Portfolio Tracker** - Suivi de portefeuille et analyse de performance
- **AI Assistant** - Assistant IA pour l'analyse et conseils d'investissement

### ⚪ Bientôt disponibles
- **News Aggregator** - Agrégateur de nouvelles financières avec analyse de sentiment
- **Market Scanner** - Scanner de marché pour identifier les opportunités

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Vite** pour le build et le développement
- **Lucide React** pour les icônes

## 📦 Installation

```bash
# Cloner le repository
git clone <repository-url>
cd GOBApps

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🏗️ Structure du projet

```
GOBApps/
├── src/
│   ├── App.tsx          # Composant principal du hub
│   ├── main.tsx         # Point d'entrée React
│   └── index.css        # Styles globaux
├── apps/                # Applications sous-jacentes
│   ├── seeking-alpha-auto/
│   ├── gobapps-interface/
│   └── [autres-apps]/
├── public/              # Assets statiques
└── package.json         # Configuration du projet
```

## 🎨 Fonctionnalités du Hub

- **Interface moderne** avec design glassmorphism
- **Recherche et filtrage** des applications
- **Statuts visuels** (actif, développement, bientôt)
- **Catégorisation** des applications
- **Navigation intuitive** vers les sous-applications
- **Responsive design** pour tous les écrans

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration Vite
3. Le déploiement se fera automatiquement à chaque push

### Build manuel

```bash
# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 🔗 Navigation

Le hub dirige vers les applications via des chemins relatifs :
- `/apps/seeking-alpha-auto` → Application Seeking Alpha Auto
- `/apps/gobapps-interface` → Interface GOBApps
- `/apps/portfolio-tracker` → Portfolio Tracker (en développement)

## 📄 Licence

MIT License - Propulsé par JSL AI
