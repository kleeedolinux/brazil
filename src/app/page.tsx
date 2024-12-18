'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [exchangeData, setExchangeData] = useState<any[]>([]);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [trend, setTrend] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rate = response.data.rates.BRL;
        setCurrentRate(rate);
        
        // Create enhanced mock data for 24h evolution
        const mockData = Array.from({ length: 24 }, (_, i) => {
          const baseValue = rate * (1 + Math.sin(i / 24 * Math.PI) * 0.08);
          const noise = (Math.random() - 0.5) * 0.02 * rate;
          return {
            time: `${String(i).padStart(2, '0')}:00`,
            value: (baseValue + noise).toFixed(3)
          };
        });
        
        setExchangeData(mockData);
        setTrend(mockData[mockData.length - 1].value > mockData[0].value ? 'up' : 'down');
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-white to-green-500 text-transparent bg-clip-text">
          Ferramenta Brasil
        </h1>
        
        {/* Current Exchange Rate */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
          <h2 className="text-2xl mb-4">Taxa Atual USD/BRL</h2>
          <div className="flex items-baseline">
            <span className="text-7xl font-bold">R$ {currentRate.toFixed(3)}</span>
            <span className={`ml-4 text-2xl ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          </div>
        </div>

        {/* Exchange Rate Chart */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
          <h2 className="text-3xl mb-6 font-bold">Evolução USD/BRL - Últimas 24 Horas</h2>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={exchangeData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#fff" 
                  strokeWidth={3}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Faz o L Section */}
        <div className="bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 p-12 rounded-2xl text-center border border-white/10 backdrop-blur-sm">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-8xl font-bold mb-6 animate-pulse">FAZ O L! 👆</h2>
            <p className="text-3xl">Brasil Mais Forte! 🇧🇷</p>
            <div className="mt-6 text-xl opacity-75">
              Acompanhe em tempo real a força da nossa economia
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
