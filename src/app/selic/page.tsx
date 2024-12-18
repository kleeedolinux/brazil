'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';
import Navigation from '@/components/Navigation';

export default function SelicPage() {
  const [selicData, setSelicData] = useState<any[]>([]);
  const [currentSelic, setCurrentSelic] = useState<string>('');
  const [trend, setTrend] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using Banco Central do Brasil API for SELIC data - Series 432 (Meta SELIC)
        const response = await axios.get(
          'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/12?formato=json'
        );
        
        const formattedData = response.data.map((item: any) => {
          // Parse Brazilian date format (DD/MM/YYYY)
          const [day, month, year] = item.data.split('/');
          const date = new Date(year, month - 1, day);
          
          return {
            date: date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
            value: Number(item.valor).toFixed(2),
            rawValue: Number(item.valor)
          };
        });

        setSelicData(formattedData);
        
        // Set current SELIC rate
        const latestSelic = formattedData[formattedData.length - 1].value;
        setCurrentSelic(latestSelic);
        
        // Calculate trend using raw values for accurate comparison
        const previousSelic = formattedData[formattedData.length - 2].rawValue;
        const currentSelicValue = formattedData[formattedData.length - 1].rawValue;
        setTrend(currentSelicValue > previousSelic ? 'up' : 'down');
      } catch (error) {
        console.error('Error fetching SELIC data:', error);
      }
    };

    fetchData();
    // Update every hour
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-white to-green-500 text-transparent bg-clip-text">
          Taxa SELIC
        </h1>
        
        {/* Current SELIC Rate */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
          <h2 className="text-2xl mb-4">Taxa SELIC Meta</h2>
          <div className="flex items-baseline">
            <span className="text-7xl font-bold">{Number(currentSelic).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</span>
            <span className={`ml-4 text-2xl ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          </div>
          <p className="mt-4 text-gray-400">Meta da taxa básica de juros definida pelo COPOM</p>
        </div>

        {/* SELIC Chart */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
          <h2 className="text-3xl mb-6 font-bold">Evolução da Meta SELIC - Últimos 12 Meses</h2>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selicData}>
                <defs>
                  <linearGradient id="colorSelic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis 
                  stroke="#fff"
                  tickFormatter={(value) => `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`, 'Meta SELIC']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#fff" 
                  strokeWidth={3}
                  fill="url(#colorSelic)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-500/20 via-white/10 to-green-500/20 p-12 rounded-2xl text-center border border-white/10 backdrop-blur-sm">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-6xl font-bold mb-6">Política Monetária 📊</h2>
            <p className="text-3xl">Controlando a Inflação</p>
            <div className="mt-6 text-xl opacity-75">
              A taxa SELIC é o principal instrumento de política monetária do Banco Central
            </div>
            <div className="mt-4 text-lg opacity-75">
              Meta definida pelo COPOM para orientar o mercado financeiro
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
