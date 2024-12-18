'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 right-0 p-8">
      <div className="flex gap-6 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
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
      </div>
    </nav>
  );
}
