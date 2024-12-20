'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function RemessaComFomePage() {
  const [productValue, setProductValue] = useState<string>('');
  const [shippingValue, setShippingValue] = useState<string>('');
  const [totalTax, setTotalTax] = useState<number | null>(null);

  const calculateTax = () => {
    const productCost = parseFloat(productValue) || 0;
    const shippingCost = parseFloat(shippingValue) || 0;
    const total = productCost + shippingCost;
    const tax = total * 1.03; // 100% tax
    setTotalTax(tax);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 p-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-white to-green-500 text-transparent bg-clip-text">
          Remessa com Fome
        </h1>
        
        <div className="mb-8 text-center text-xl text-white/80">
          <p>Pra você que quer saber quanto vai custar o produto que você vai comprar pro governo</p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2 text-white/80">Valor do Produto (R$)</label>
              <input
                type="number"
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
                className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-white/80">Valor do Frete (R$)</label>
              <input
                type="number"
                value={shippingValue}
                onChange={(e) => setShippingValue(e.target.value)}
                className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="0.00"
              />
            </div>

            <button
              onClick={calculateTax}
              className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-white/20 transition-all"
            >
              Calcular
            </button>
          </div>
        </div>

        {totalTax !== null && (
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-white">Resultado:</h2>
            <div className="space-y-3 text-lg">
              <p className="text-white/80">Valor Total: <span className="text-white font-semibold">R$ {(parseFloat(productValue) + parseFloat(shippingValue)).toFixed(2)}</span></p>
              <p className="text-white/80">Imposto (103%): <span className="text-white font-semibold">R$ {totalTax.toFixed(2)}</span></p>
              <p className="text-white/80">Total com Imposto: <span className="text-white font-semibold">R$ {(totalTax + parseFloat(productValue) + parseFloat(shippingValue)).toFixed(2)}</span></p>
            </div>
            
            <div className="mt-6 bg-white/5 border border-white/20 p-4 rounded-lg">
              <p className="font-bold text-white mb-2">⚠️ Aviso Importante</p>
              <p className="text-white/80">A partir de 2025 as taxas de importação do Brasil será de 103% e você terá que pagar mais 1 produto pro governo +3%</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
