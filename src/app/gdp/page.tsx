'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';
import Navigation from '@/components/Navigation';

export default function GDPPage() {
  const [gdpData, setGDPData] = useState<any[]>([]);
  const [currentGDP, setCurrentGDP] = useState<string>('');
  const [growthRate, setGrowthRate] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using World Bank API for Brazil's GDP data
        const response = await axios.get(
          'https://api.worldbank.org/v2/country/BR/indicator/NY.GDP.MKTP.CD?format=json&per_page=10'
        );
        
        const rawData = response.data[1];
        const formattedData = rawData.map((item: any) => ({
          year: item.date,
          value: (item.value / 1e9).toFixed(2), // Convert to billions
        })).reverse();

        setGDPData(formattedData);
        
        // Set current GDP (most recent data)
        const latestGDP = formattedData[formattedData.length - 1].value;
        setCurrentGDP(latestGDP);
        
        // Calculate growth rate
        const previousGDP = parseFloat(formattedData[formattedData.length - 2].value);
        const currentGDPValue = parseFloat(latestGDP);
        const growth = ((currentGDPValue - previousGDP) / previousGDP) * 100;
        setGrowthRate(growth);
      } catch (error) {
        console.error('Error fetching GDP data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 via-white to-green-500 text-transparent bg-clip-text">
          PIB Brasil
        </h1>
        
        {/* Current GDP */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
          <h2 className="text-2xl mb-4">PIB Atual</h2>
          <div className="flex items-baseline">
            <span className="text-7xl font-bold">US$ {currentGDP}B</span>
            <span className={`ml-4 text-2xl ${growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {growthRate >= 0 ? '↑' : '↓'} {Math.abs(growthRate).toFixed(1)}%
            </span>
          </div>
          <p className="mt-4 text-gray-400">Crescimento em relação ao ano anterior</p>
        </div>

        {/* GDP Chart */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
          <h2 className="text-3xl mb-6 font-bold">Evolução do PIB - Últimos Anos</h2>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gdpData}>
                <defs>
                  <linearGradient id="colorGDP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#fff" />
                <YAxis 
                  stroke="#fff"
                  tickFormatter={(value) => `${value}B`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: any) => [`US$ ${value}B`, 'PIB']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#fff" 
                  strokeWidth={3}
                  fill="url(#colorGDP)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-blue-500/20 p-12 rounded-2xl text-center border border-white/10 backdrop-blur-sm">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-6xl font-bold mb-6">Brasil em Crescimento! 🚀</h2>
            <p className="text-3xl">Uma das Maiores Economias do Mundo 🌎</p>
            <div className="mt-6 text-xl opacity-75">
              Acompanhe a evolução da economia brasileira
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
