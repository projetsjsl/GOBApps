// API proxy pour Finnhub - évite les problèmes CORS
export default function handler(req, res) {
  const { endpoint, ...params } = req.query;
  
  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint manquant' });
  }

  // Clé API Finnhub (à configurer dans les variables d'environnement)
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'demo';
  
  // Construire l'URL de l'API Finnhub
  const baseUrl = 'https://finnhub.io/api/v1';
  const queryString = new URLSearchParams({
    token: FINNHUB_API_KEY,
    ...params
  }).toString();
  
  const url = `${baseUrl}/${endpoint}?${queryString}`;
  
  // Faire l'appel à l'API Finnhub
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.error('Erreur API Finnhub:', error);
      res.status(500).json({ 
        error: 'Erreur lors de l\'appel à l\'API Finnhub',
        details: error.message 
      });
    });
}
