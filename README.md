# GOBApps

Hub principal GOBApps - Point d'entrée vers toutes les applications propulsées par JSL AI.

## 🚀 Vue d'ensemble

GOBApps est la page d'accueil qui centralise l'accès à toutes nos applications intelligentes. Il offre une interface moderne et intuitive pour naviguer entre les différentes solutions, avec un onglet dédié aux données financières en temps réel.

**Landing page :** Interface de gestion d'applications avec thèmes personnalisables  
**Applications :** Seeking Alpha Auto, Stocks & News, et futures applications

## 📱 Applications disponibles

### 🟢 Applications actives
- **Seeking Alpha Auto** - Analyse automatique des actions et données financières
- **Stocks & News** - Dashboard financier avec données en temps réel

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
GOBApps/                          # 🏠 Repository principal
├── src/                          # Landing page (interface de gestion)
│   ├── App.tsx                   # Composant principal avec onglets
│   ├── components/               # Composants React
│   └── config/                   # Configuration des applications
├── apps/                         # Applications sous-jacentes
│   ├── seeking-alpha-auto/       # Application finance existante
│   ├── stocks-news/              # Dashboard financier
│   └── [autres-apps]/           # Futures applications
├── api/                          # API routes (Finnhub)
└── package.json                  # Configuration du projet principal
```

## 🎨 Fonctionnalités du Hub

### Landing Page (Interface de gestion)
- **Interface moderne** avec design glassmorphism
- **Recherche et filtrage** des applications
- **Statuts visuels** (actif, développement, bientôt)
- **Catégorisation** des applications
- **Navigation intuitive** vers les sous-applications
- **Responsive design** pour tous les écrans

### Stocks & News (Onglet intégré)
- **Watchlist personnalisable** avec données en temps réel
- **Actualités financières** liées à votre portefeuille
- **Calendrier économique** avec événements du jour
- **Données de marché** (actions US/Canada, ETF, obligations)
- **Interface moderne** avec design cohérent
- **API Finnhub** intégrée pour les données financières

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

### Onglets principaux
- **Hub Applications** → Interface principale avec toutes les applications
- **Stocks & News** → Dashboard financier avec données en temps réel

### Applications
Le hub dirige vers les applications via des chemins relatifs :
- `/apps/seeking-alpha-auto` → Application Seeking Alpha Auto
- `/apps/stocks-news` → Dashboard Stocks & News
- `/apps/portfolio-tracker` → Portfolio Tracker (en développement)

## ⚙️ Configuration

### Variables d'environnement
Copiez `env.example` vers `.env.local` et configurez :
```bash
# Clé API Finnhub (gratuite sur https://finnhub.io/)
FINNHUB_API_KEY=your_api_key_here
```

### API Finnhub
L'onglet Stocks & News utilise l'API Finnhub pour :
- Données de marché en temps réel
- Actualités financières
- Calendrier économique
- Informations sur les entreprises

## 📄 Licence

MIT License - Propulsé par JSL AI