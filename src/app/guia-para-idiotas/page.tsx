'use client';

import Navigation from '@/components/Navigation';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';

export default function GuideHomePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 p-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-white to-green-500 text-transparent bg-clip-text">
          Guia para Idiotas de Economia Global
        </h1>
        
        <div className="mb-8 text-center text-xl text-white/80">
          <p>Um guia fácil de entender para você que não sabe economia global</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
