import Link from 'next/link';
import { Article } from '@/types/article';
import { calculateReadingTime } from '@/utils/readingTime';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const readingTime = calculateReadingTime(article.content);

  return (
    <Link href={`/guia-para-idiotas/${article.id}`}>
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group">
        <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-white/80 mb-4">{article.description}</p>
        <div className="flex flex-wrap gap-3 items-center text-sm text-white/60">
          <time className="flex items-center gap-2">
            <span className="text-yellow-400">📅</span>
            {formatDate(article.date)}
          </time>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">📖</span>
            {readingTime}
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
  );
}
