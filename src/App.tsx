import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Github, Zap, BarChart3, Settings, Globe, Star, ChevronRight, TrendingUp, Home } from 'lucide-react';
import { apps, getAppUrl, getCategories, filterApps, type App } from './config/apps';
import StocksNewsTab from './components/StocksNewsTab';

const GOBAppsHub = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'hub' | 'stocks'>('hub');

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('fr-CA', {
        timeZone: 'America/Montreal',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const categories = ['all', ...getCategories()];
  
  const filteredApps = filterApps(apps, selectedCategory === 'all' ? undefined : selectedCategory, searchTerm);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'development': return 'bg-yellow-500';
      case 'coming-soon': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'development': return 'En développement';
      case 'coming-soon': return 'Bientôt disponible';
      default: return 'Inconnu';
    }
  };

  const handleAppClick = (app: App) => {
    if (app.status === 'active') {
      const url = getAppUrl(app, window.location.origin);
      window.open(url, '_blank');
    }
  };

  // If stocks tab is active, render the stocks component
  if (activeTab === 'stocks') {
    return <StocksNewsTab />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 pointer-events-none"></div>
      <div className={"fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"}></div>
      
      {/* Header */}
      <header className="relative z-10">
        <div className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl text-white px-6 py-2 border-b border-white/10">
          <div className="flex items-center justify-center text-sm font-medium">
            <span>{currentTime || '00:00'}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/30">
                  <img 
                    src="/logo-jslai.png" 
                    alt="JSL AI Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-5xl font-bold tracking-tight drop-shadow-lg bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    GOBApps
                  </h1>
                  <p className="text-xl text-purple-200 font-medium">Hub d'applications propulsé par JSL AI</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Découvrez notre suite d'applications intelligentes pour l'analyse financière, 
                la gestion de portefeuille et l'automatisation des tâches.
              </p>

              {/* Navigation Tabs */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setActiveTab('hub')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                    activeTab === 'hub'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 backdrop-blur-xl border border-white/20'
                  }`}
                >
                  <Home size={18} />
                  <span>Hub Applications</span>
                </button>
                <button
                  onClick={() => setActiveTab('stocks')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                    activeTab === 'stocks'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 backdrop-blur-xl border border-white/20'
                  }`}
                >
                  <TrendingUp size={18} />
                  <span>Stocks & News</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher une application..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 backdrop-blur-xl border border-white/20'
                  }`}
                >
                  {category === 'all' ? 'Toutes' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map(app => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className={`group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer ${
                app.status === 'active' ? 'hover:shadow-2xl hover:shadow-purple-500/20' : 'opacity-75'
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(app.status)}`}></div>
              </div>
              
              {/* App Icon */}
              <div className="text-6xl mb-6 animate-float">{app.icon}</div>
              
              {/* App Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{app.name}</h3>
                <p className="text-slate-300 leading-relaxed">{app.description}</p>
              </div>
              
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm font-medium">
                  {app.category}
                </span>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Fonctionnalités :</h4>
                <div className="flex flex-wrap gap-2">
                  {app.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="text-xs text-slate-300 bg-white/10 px-2 py-1 rounded-lg">
                      {feature}
                    </span>
                  ))}
                  {app.features.length > 2 && (
                    <span className="text-xs text-slate-400">+{app.features.length - 2} autres</span>
                  )}
                </div>
              </div>
              
              {/* Status and Action */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  app.status === 'active' ? 'text-green-400' : 
                  app.status === 'development' ? 'text-yellow-400' : 'text-slate-400'
                }`}>
                  {getStatusText(app.status)}
                </span>
                
                {app.status === 'active' ? (
                  <div className="flex items-center text-purple-300 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium mr-2">Accéder</span>
                    <ArrowRight size={16} />
                  </div>
                ) : (
                  <div className="flex items-center text-slate-400">
                    <span className="text-sm font-medium mr-2">
                      {app.status === 'development' ? 'En cours' : 'Bientôt'}
                    </span>
                    <ChevronRight size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{apps.filter(app => app.status === 'active').length}</div>
            <div className="text-slate-400">Applications actives</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{apps.filter(app => app.status === 'development').length}</div>
            <div className="text-slate-400">En développement</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{categories.length - 1}</div>
            <div className="text-slate-400">Catégories</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20">
        <div className="bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-2xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/30">
                  <img 
                    src="/logo-jslai.png" 
                    alt="JSL AI Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">GOBApps</h3>
                  <p className="text-purple-200">Propulsé par JSL AI</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-8 mb-8">
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center space-x-2">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center space-x-2">
                  <Globe size={20} />
                  <span>Documentation</span>
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center space-x-2">
                  <Settings size={20} />
                  <span>Support</span>
                </a>
              </div>
              
              <p className="text-slate-400 text-sm">
                © 2025 GOBApps. Tous droits réservés. Développé avec ❤️ par JSL AI.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GOBAppsHub;
