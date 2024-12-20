'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { articles } from '@/data/articles';
import ReactMarkdown from 'react-markdown';
import SuggestedArticles from '@/components/SuggestedArticles';
import { calculateReadingTime } from '@/utils/readingTime';
import Head from 'next/head';

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find(a => a.id === params.articleId);

  if (!article) {
    return (
      <>
        <Head>
          <title>Artigo não encontrado | Guia para Idiotas</title>
          <meta name="description" content="O artigo que você está procurando não existe." />
        </Head>
        <main className="min-h-screen bg-black text-white pt-28 p-8">
          <Navigation />
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-white/80">O artigo que você está procurando não existe.</p>
          </div>
        </main>
      </>
    );
  }

  const readingTime = calculateReadingTime(article.content);
  const canonicalUrl = `https://brazil-guia.com/guia-para-idiotas/${article.id}`;

  return (
    <>
      <Head>
        <title>{article.title} | Guia para Idiotas</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author || 'Guia para Idiotas'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="min-h-screen bg-black text-white pt-28 p-8">
        <Navigation />
        <div className="max-w-4xl mx-auto">
          <article className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-green-500 text-transparent bg-clip-text">
              {article.title}
            </h1>
            
            <div className="border-b border-white/10 pb-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center text-white/60 mb-3">
                <time className="flex items-center gap-2">
                  <span className="text-yellow-400">📅</span>
                  {new Date(article.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
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
              <p className="text-white/80 italic">{article.description}</p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="text-white/90 leading-relaxed mb-6">{children}</p>,
                  strong: ({ children }) => <strong className="text-yellow-400 font-bold">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">{children}</ol>,
                  li: ({ children }) => <li className="text-white/90">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-yellow-400 pl-4 my-6 text-white/80 italic">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </article>

          <SuggestedArticles currentArticleId={article.id} articles={articles} />
        </div>
      </main>
    </>
  );
}
