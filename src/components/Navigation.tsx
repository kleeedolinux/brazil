'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-50 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === '/' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            USD/BRL
          </Link>
          <Link 
            href="/gdp" 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === '/gdp' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            PIB Brasil
          </Link>
          <Link 
            href="/selic" 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === '/selic' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Taxa SELIC
          </Link>
          <Link 
            href="/imposto-importacao" 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === '/imposto-importacao' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Remessa com Fome
          </Link>
          <Link 
            href="/guia-para-idiotas" 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === '/guia-para-idiotas' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Guia para Idiotas
          </Link>
        </div>
      </div>
    </nav>
  );
}
