import axios from 'axios';

export const fetchDubaiNews = async () => {
  const apiKey = process.env.NEWS_API_KEY;
  // Limit to Dubai
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=Dubai&language=en&sortBy=publishedAt&apiKey=${apiKey}`
  );

  // Return 5 articles
  return response.data.articles.slice(0, 5).map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt
  }));
};