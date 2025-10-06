// Configuration des applications GOBApps
export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  status: 'active' | 'development' | 'coming-soon';
  category: string;
  features: string[];
  url?: string; // URL externe si différente du path
  localPath?: string; // Chemin local pour le développement
}

export const apps: App[] = [
  {
    id: 'seeking-alpha-auto',
    name: 'Seeking Alpha Auto',
    description: 'Analyse automatique des actions et données financières avec scraping intelligent',
    icon: '📈',
    path: '/apps/seeking-alpha-auto',
    localPath: '/apps/seeking-alpha-auto',
    status: 'active',
    category: 'Finance',
    features: ['Scraping automatique', 'Analyse de données', 'Alertes en temps réel', 'API Finnhub']
  },
  {
    id: 'gobapps-interface',
    name: 'GOBApps Interface',
    description: 'Interface de gestion d\'accès aux applications avec thèmes personnalisables',
    icon: '🎨',
    path: '/apps/gobapps-interface',
    localPath: '/apps/gobapps-interface',
    status: 'active',
    category: 'Interface',
    features: ['Gestion d\'applications', 'Thèmes personnalisables', 'Drag & Drop', 'Import/Export']
  },
  {
    id: 'portfolio-tracker',
    name: 'Portfolio Tracker',
    description: 'Suivi de portefeuille et analyse de performance des investissements',
    icon: '💼',
    path: '/apps/portfolio-tracker',
    localPath: '/apps/portfolio-tracker',
    status: 'development',
    category: 'Finance',
    features: ['Suivi de portefeuille', 'Analyse de performance', 'Rapports détaillés', 'Alertes personnalisées']
  },
  {
    id: 'news-aggregator',
    name: 'News Aggregator',
    description: 'Agrégateur de nouvelles financières avec analyse de sentiment',
    icon: '📰',
    path: '/apps/news-aggregator',
    localPath: '/apps/news-aggregator',
    status: 'coming-soon',
    category: 'Information',
    features: ['Agrégation de nouvelles', 'Analyse de sentiment', 'Filtres personnalisés', 'Notifications push']
  },
  {
    id: 'market-scanner',
    name: 'Market Scanner',
    description: 'Scanner de marché pour identifier les opportunités d\'investissement',
    icon: '🔍',
    path: '/apps/market-scanner',
    localPath: '/apps/market-scanner',
    status: 'coming-soon',
    category: 'Finance',
    features: ['Scan de marché', 'Critères personnalisés', 'Signaux d\'achat/vente', 'Backtesting']
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'Assistant IA pour l\'analyse et les conseils d\'investissement',
    icon: '🤖',
    path: '/apps/ai-assistant',
    localPath: '/apps/ai-assistant',
    status: 'development',
    category: 'IA',
    features: ['Analyse IA', 'Conseils personnalisés', 'Chat intelligent', 'Prédictions']
  }
];

// Fonction pour obtenir l'URL complète d'une application
export const getAppUrl = (app: App, baseUrl: string = ''): string => {
  if (app.url) {
    return app.url;
  }
  
  // En développement, utiliser le chemin local
  if (process.env.NODE_ENV === 'development' && app.localPath) {
    return `${baseUrl}${app.localPath}`;
  }
  
  return `${baseUrl}${app.path}`;
};

// Fonction pour obtenir les catégories uniques
export const getCategories = (): string[] => {
  return Array.from(new Set(apps.map(app => app.category)));
};

// Fonction pour filtrer les applications
export const filterApps = (apps: App[], category?: string, searchTerm?: string): App[] => {
  return apps.filter(app => {
    const matchesCategory = !category || category === 'all' || app.category === category;
    const matchesSearch = !searchTerm || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};
