import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Calendar, Globe, DollarSign, BarChart3, Newspaper, Settings } from 'lucide-react';

// Interface pour les thèmes (cohérence avec App.tsx)
interface Theme {
  id: string;
  name: string;
  sector: string;
  description: string;
  colors: {
    headerFrom: string;
    headerVia: string;
    headerTo: string;
    headerBorder: string;
    background: string;
    cardBg: string;
    cardHover: string;
    accent: string;
    accentHover: string;
    textPrimary: string;
    textSecondary: string;
  };
}

interface Stock {
  symbol: string;
  name: string;
  exchange: string;
}

interface StockData {
  price: number;
  change: number;
  changePercent: number;
}

interface NewsItem {
  headline: string;
  source: string;
  url: string;
  datetime: number;
  ticker?: string;
  tickerName?: string;
}

interface EconomicEvent {
  event: string;
  time: string;
  country: string;
  impact: string;
  actual?: string;
  estimate?: string;
  prev?: string;
}

const StocksNewsTab = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [myWatchlist, setMyWatchlist] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple', exchange: 'US' },
    { symbol: 'SHOP.TO', name: 'Shopify', exchange: 'TSX' },
    { symbol: 'TSLA', name: 'Tesla', exchange: 'US' },
    { symbol: 'RY.TO', name: 'Royal Bank', exchange: 'TSX' }
  ]);
  const [watchlistData, setWatchlistData] = useState<{[key: string]: StockData}>({});
  const [watchlistNews, setWatchlistNews] = useState<NewsItem[]>([]);
  const [generalNews, setGeneralNews] = useState<NewsItem[]>([]);
  const [economicCalendar, setEconomicCalendar] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWatchlistSettings, setShowWatchlistSettings] = useState(false);
  const [newWatchlistInput, setNewWatchlistInput] = useState('');

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit'
      }));
      setCurrentDate(now.toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Load watchlist and theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('myWatchlist');
    if (stored) {
      setMyWatchlist(JSON.parse(stored));
    }

    // Load theme from localStorage (same as App.tsx)
    const storedTheme = localStorage.getItem('gobapps-theme');
    if (storedTheme) {
      // Import themes from App.tsx or define them here
      const themes: Theme[] = [
        {
          id: 'finance',
          name: 'Finance Pro',
          sector: '',
          description: '',
          colors: {
            headerFrom: 'from-slate-800',
            headerVia: 'via-slate-900',
            headerTo: 'to-blue-900',
            headerBorder: 'border-blue-600',
            background: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200',
            cardBg: 'bg-white',
            cardHover: 'hover:bg-white/70',
            accent: 'bg-amber-600',
            accentHover: 'hover:bg-amber-700',
            textPrimary: 'text-slate-900',
            textSecondary: 'text-slate-700'
          }
        },
        {
          id: 'tech',
          name: 'Tech Modern',
          sector: '',
          description: '',
          colors: {
            headerFrom: 'from-purple-800',
            headerVia: 'via-purple-900',
            headerTo: 'to-indigo-900',
            headerBorder: 'border-purple-500',
            background: 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100',
            cardBg: 'bg-white',
            cardHover: 'hover:bg-purple-50',
            accent: 'bg-purple-600',
            accentHover: 'hover:bg-purple-700',
            textPrimary: 'text-purple-900',
            textSecondary: 'text-purple-700'
          }
        }
      ];
      
      const theme = themes.find(t => t.id === storedTheme);
      if (theme) setCurrentTheme(theme);
    } else {
      // Default theme
      setCurrentTheme({
        id: 'finance',
        name: 'Finance Pro',
        sector: '',
        description: '',
        colors: {
          headerFrom: 'from-slate-800',
          headerVia: 'via-slate-900',
          headerTo: 'to-blue-900',
          headerBorder: 'border-blue-600',
          background: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200',
          cardBg: 'bg-white',
          cardHover: 'hover:bg-white/70',
          accent: 'bg-amber-600',
          accentHover: 'hover:bg-amber-700',
          textPrimary: 'text-slate-900',
          textSecondary: 'text-slate-700'
        }
      });
    }
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist));
  }, [myWatchlist]);

  // Fetch stock data
  const fetchQuote = async (symbol: string): Promise<StockData | null> => {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
      const res = await fetch(url);
      const data = await res.json();
      const quote = data.chart.result[0].meta;
      
      return {
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange,
        changePercent: quote.regularMarketChangePercent
      };
    } catch (error) {
      console.error(`Erreur ${symbol}:`, error);
      return null;
    }
  };

  // Fetch news from Finnhub API
  const callFinnhubAPI = async (endpoint: string, params: Record<string, string> = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/finnhub?endpoint=${encodeURIComponent(endpoint)}&${queryString}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error('Erreur API Finnhub:', error);
      return null;
    }
  };

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        // Load watchlist data
        const watchlistPromises = myWatchlist.map(async (stock) => {
          const data = await fetchQuote(stock.symbol);
          return { symbol: stock.symbol, data };
        });
        
        const watchlistResults = await Promise.all(watchlistPromises);
        const watchlistDataMap: {[key: string]: StockData} = {};
        watchlistResults.forEach(({ symbol, data }) => {
          if (data) watchlistDataMap[symbol] = data;
        });
        setWatchlistData(watchlistDataMap);

        // Load watchlist news
        const today = new Date().toISOString().split('T')[0];
        const weekAgo = new Date(Date.now() - 7*24*60*60*1000).toISOString().split('T')[0];
        
        let allNews: NewsItem[] = [];
        for (const stock of myWatchlist) {
          const cleanSymbol = stock.symbol.replace('.TO', '');
          const news = await callFinnhubAPI('company-news', {
            symbol: cleanSymbol,
            from: weekAgo,
            to: today
          });
          
          if (Array.isArray(news)) {
            const newsWithTicker = news.slice(0, 3).map(item => ({
              ...item,
              ticker: stock.symbol,
              tickerName: stock.name
            }));
            allNews = allNews.concat(newsWithTicker);
          }
        }
        
        allNews.sort((a, b) => b.datetime - a.datetime);
        setWatchlistNews(allNews.slice(0, 10));

        // Load general news
        const generalNewsData = await callFinnhubAPI('news', { category: 'general' });
        if (Array.isArray(generalNewsData)) {
          setGeneralNews(generalNewsData.slice(0, 8));
        }

        // Load economic calendar
        const tomorrow = new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0];
        const calendarData = await callFinnhubAPI('calendar/economic', {
          from: today,
          to: tomorrow
        });
        
        if (calendarData && calendarData.economicCalendar) {
          setEconomicCalendar(calendarData.economicCalendar);
        }

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh every 2 minutes
    const interval = setInterval(loadData, 120000);
    return () => clearInterval(interval);
  }, [myWatchlist]);

  const handleWatchlistUpdate = () => {
    if (newWatchlistInput.trim()) {
      const symbols = newWatchlistInput.split(',').map(s => {
        const trimmed = s.trim();
        return {
          symbol: trimmed,
          name: trimmed.replace('.TO', ''),
          exchange: trimmed.includes('.TO') ? 'TSX' : 'US'
        };
      });
      setMyWatchlist(symbols);
      setShowWatchlistSettings(false);
      setNewWatchlistInput('');
    }
  };

  const renderTicker = (data: StockData | null, name: string, symbol: string) => {
    if (!data || !currentTheme) return (
      <div className={`${currentTheme?.colors.cardBg || 'bg-slate-800/50'} rounded-xl p-4 border ${currentTheme?.colors.textSecondary?.replace('text-', 'border-') || 'border-slate-700'}/20`}>
        <div className={`${currentTheme?.colors.textSecondary || 'text-slate-400'} text-sm`}>Erreur</div>
      </div>
    );
    
    const isPositive = data.change >= 0;
    const changeClass = isPositive ? 'text-green-400' : 'text-red-400';
    const arrow = isPositive ? '▲' : '▼';
    
    let priceStr = '$' + data.price.toFixed(2);
    if (symbol.includes('^')) {
      priceStr = data.price.toFixed(3) + '%';
    } else if (symbol.includes('OANDA:')) {
      priceStr = data.price.toFixed(4);
    }
    
    return (
      <div key={symbol} className={`${currentTheme.colors.cardBg} rounded-xl p-4 border ${currentTheme.colors.textSecondary.replace('text-', 'border-')}/20 ${currentTheme.colors.cardHover} transition-colors shadow-lg`}>
        {symbol.includes('OANDA:') && (
          <div className={`text-xs ${currentTheme.colors.textSecondary} mb-1`}>{symbol.replace('OANDA:', '')}</div>
        )}
        <div className={`text-sm font-semibold ${currentTheme.colors.textPrimary} mb-1`}>{name}</div>
        <div className={`text-xl font-light ${currentTheme.colors.textPrimary} mb-1`}>{priceStr}</div>
        <div className={`text-sm font-medium ${changeClass}`}>
          {arrow} {Math.abs(data.change).toFixed(2)} ({Math.abs(data.changePercent).toFixed(2)}%)
        </div>
      </div>
    );
  };

  const renderNewsItem = (item: NewsItem) => {
    const date = new Date(item.datetime * 1000).toLocaleDateString('fr-FR');
    return (
      <div 
        key={item.url} 
        className="p-3 border-b border-slate-700 last:border-b-0 hover:bg-slate-800/30 cursor-pointer transition-colors"
        onClick={() => window.open(item.url, '_blank')}
      >
        {item.ticker && (
          <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2 mb-2">
            {item.ticker}
          </span>
        )}
        <div className="text-sm text-white leading-relaxed mb-2">{item.headline}</div>
        <div className="text-xs text-slate-400">{item.source} • {date}</div>
      </div>
    );
  };

  const renderEconomicEvent = (event: EconomicEvent) => {
    const time = new Date(event.time).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', minute: '2-digit' 
    });
    const impactColor = event.impact === 'high' ? 'border-red-500' : 
                       event.impact === 'medium' ? 'border-yellow-500' : 'border-slate-500';
    
    return (
      <div key={event.event + event.time} className={`p-4 mb-3 bg-slate-800/50 rounded-lg border-l-4 ${impactColor}`}>
        <div className="text-xs text-slate-400 mb-2">
          {time} • {event.country} • Impact: {event.impact.toUpperCase()}
        </div>
        <div className="text-sm font-semibold text-white mb-2">{event.event}</div>
        <div className="flex gap-3 flex-wrap">
          {event.actual !== undefined && (
            <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
              Actuel: {event.actual}
            </span>
          )}
          {event.estimate !== undefined && (
            <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
              Prévu: {event.estimate}
            </span>
          )}
          {event.prev !== undefined && (
            <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
              Précédent: {event.prev}
            </span>
          )}
        </div>
      </div>
    );
  };

  if (loading || !currentTheme) {
    return (
      <div className={`min-h-screen ${currentTheme?.colors.background || 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'} p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className={currentTheme?.colors.textSecondary || 'text-slate-300'}>Chargement des données financières...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${currentTheme.colors.background} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 pb-6 border-b ${currentTheme.colors.textSecondary.replace('text-', 'border-')}/20`}>
          <div className={`text-4xl font-light ${currentTheme.colors.textPrimary} mb-2`}>{currentTime}</div>
          <div className={`text-sm ${currentTheme.colors.textSecondary}`}>{currentDate}</div>
        </div>

        {/* Watchlist Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-400" size={20} />
              <h2 className={`text-xl font-semibold ${currentTheme.colors.textPrimary}`}>⭐ Ma Watchlist Live</h2>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowWatchlistSettings(true)}
                className={`px-4 py-2 ${currentTheme.colors.accent} ${currentTheme.colors.accentHover} text-white rounded-lg text-sm transition-colors flex items-center space-x-2`}
              >
                <Settings size={16} />
                <span>Gérer</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {myWatchlist.map(stock => 
              renderTicker(watchlistData[stock.symbol], stock.name, stock.symbol)
            )}
          </div>
        </div>

        {/* Watchlist News */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Newspaper className="text-blue-400" size={20} />
            <h2 className={`text-xl font-semibold ${currentTheme.colors.textPrimary}`}>📰 News - Ma Watchlist</h2>
          </div>
          <div className={`${currentTheme.colors.cardBg} rounded-xl border ${currentTheme.colors.textSecondary.replace('text-', 'border-')}/20 max-h-80 overflow-y-auto shadow-lg`}>
            {watchlistNews.length > 0 ? (
              watchlistNews.map(renderNewsItem)
            ) : (
              <div className={`p-6 text-center ${currentTheme.colors.textSecondary}`}>
                Aucune news récente pour votre watchlist
              </div>
            )}
          </div>
        </div>

        {/* Economic Calendar */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-purple-400" size={20} />
            <h2 className={`text-xl font-semibold ${currentTheme.colors.textPrimary}`}>📅 Calendrier Économique (Aujourd'hui)</h2>
          </div>
          <div className={`${currentTheme.colors.cardBg} rounded-xl border ${currentTheme.colors.textSecondary.replace('text-', 'border-')}/20 max-h-96 overflow-y-auto p-4 shadow-lg`}>
            {economicCalendar.length > 0 ? (
              economicCalendar.map(renderEconomicEvent)
            ) : (
              <div className={`text-center ${currentTheme.colors.textSecondary} py-8`}>
                Aucun événement économique aujourd'hui
              </div>
            )}
          </div>
        </div>

        {/* General News */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="text-orange-400" size={20} />
            <h2 className={`text-xl font-semibold ${currentTheme.colors.textPrimary}`}>📰 Actualités Économiques</h2>
          </div>
          <div className={`${currentTheme.colors.cardBg} rounded-xl border ${currentTheme.colors.textSecondary.replace('text-', 'border-')}/20 max-h-80 overflow-y-auto shadow-lg`}>
            {generalNews.length > 0 ? (
              generalNews.map(renderNewsItem)
            ) : (
              <div className={`p-6 text-center ${currentTheme.colors.textSecondary}`}>
                Aucune actualité disponible
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Watchlist Settings Modal */}
      {showWatchlistSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Gérer ma Watchlist</h3>
            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-2">
                Entrez vos tickers séparés par des virgules
              </label>
              <textarea
                value={newWatchlistInput}
                onChange={(e) => setNewWatchlistInput(e.target.value)}
                placeholder="Exemples: AAPL, TSLA, SHOP.TO, RY.TO"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <div className="text-xs text-slate-400 mt-2">
                Actions US: AAPL, TSLA, GOOGL<br/>
                Actions Canada: SHOP.TO, RY.TO<br/>
                ETF: SPY, QQQ
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleWatchlistUpdate}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Mettre à jour
              </button>
              <button
                onClick={() => {
                  setShowWatchlistSettings(false);
                  setNewWatchlistInput('');
                }}
                className="flex-1 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksNewsTab;
