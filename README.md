# GOBApps - Interface de Gestion d'Accès

Une interface moderne et élégante pour gérer vos applications favorites, propulsée par JSL AI.

## ✨ Fonctionnalités

- **Interface moderne** avec design glassmorphism et animations fluides
- **Système de thèmes** avec 6 palettes de couleurs personnalisables
- **Gestion d'applications** avec drag & drop, édition et suppression
- **Icônes personnalisables** avec emojis ou URLs d'images
- **Responsive design** optimisé pour tous les écrans
- **Mode édition** pour organiser vos applications
- **Import/Export** de configurations
- **Temps réel** avec horloge automatique

## 🎨 Thèmes Disponibles

- **Finance Pro** - Palette professionnelle pour la finance
- **Tech Modern** - Design moderne pour la technologie
- **Créatif** - Couleurs vives pour la créativité
- **Santé** - Palette apaisante pour le secteur médical
- **Juridique** - Design sobre pour le droit
- **Écologie** - Couleurs naturelles pour l'environnement

## 🚀 Déploiement

### Développement Local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# L'application sera disponible sur http://localhost:3000
```

### Build de Production

```bash
# Construire l'application
npm run build

# Prévisualiser la build
npm run preview
```

### Déploiement sur Vercel

L'application est configurée pour un déploiement automatique sur Vercel :

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration Vite
3. Le déploiement se fera automatiquement à chaque push

## 🛠️ Technologies Utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Vite** - Build tool moderne
- **Lucide React** - Icônes
- **LocalStorage** - Persistance des données

## 📱 Responsive Design

L'interface s'adapte parfaitement à tous les écrans :

- **Mobile** : 2 colonnes avec icônes plus petites
- **Tablet** : 3-4 colonnes
- **Desktop** : 5-6 colonnes
- **Large screens** : 7 colonnes

## 🎯 Utilisation

1. **Ajouter une application** : Cliquez sur le bouton d'édition (✏️) puis sur le bouton "+"
2. **Modifier une application** : Mode édition → clic sur l'app → modification
3. **Réorganiser** : Mode édition → glisser-déposer
4. **Changer de thème** : Cliquez sur l'icône palette (🎨)
5. **Gérer les apps** : Cliquez sur l'icône paramètres (⚙️) → "Gérer les apps"

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` basé sur `.env.example` :

```bash
cp .env.example .env
```

### Personnalisation

- **Thèmes** : Modifiez le tableau `themes` dans `src/App.tsx`
- **Applications par défaut** : Modifiez le tableau `defaultApps` dans `src/App.tsx`
- **Styles** : Utilisez Tailwind CSS dans les composants

## 📄 Structure du Projet

```
src/
├── App.tsx              # Composant principal avec toute la logique
├── components/
│   └── StocksNewsTab.tsx # Composant pour les actualités financières
├── config/
│   └── apps.ts          # Configuration des applications
├── index.css            # Styles globaux et Tailwind
└── main.tsx             # Point d'entrée de l'application
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **JSL AI** - Propulsion et développement
- **Tailwind CSS** - Framework CSS
- **Lucide** - Icônes
- **React** - Framework UI