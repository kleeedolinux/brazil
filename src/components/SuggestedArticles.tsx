import Link from 'next/link';
import { Article } from '@/types/article';
import { calculateReadingTime } from '@/utils/readingTime';

interface SuggestedArticlesProps {
  currentArticleId: string;
  articles: Article[];
}

export default function SuggestedArticles({ currentArticleId, articles }: SuggestedArticlesProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get all articles except current one, maintaining original order
  const suggestedArticles = articles
    .filter(article => article.id !== currentArticleId);

  return (
    <div className="mt-16 border-t border-white/10 pt-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Continuar Lendo</h2>
      <div className="grid grid-cols-1 gap-6">
        {suggestedArticles.map((article) => (
          <Link 
            key={article.id}
            href={`/guia-para-idiotas/${article.id}`}
            className="block group"
          >
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                {article.title}
              </h3>
              <p className="text-white/70 mb-4">
                {article.description}
              </p>
              <div className="flex flex-wrap gap-3 items-center text-sm text-white/50">
                <time className="flex items-center gap-2">
                  <span className="text-yellow-400">📅</span>
                  {formatDate(article.date)}
                </time>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">📖</span>
                  {calculateReadingTime(article.content)}
                </div>
                {article.author && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">✍️</span>
                    <span>Por: {article.author}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
