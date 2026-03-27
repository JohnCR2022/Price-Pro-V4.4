import React, { useState, useEffect } from 'react';
import { calculateFromPurchase } from '../core/pricing/pricingEngine';
import { FINANCIAL_CONFIG } from '../core/pricing/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Zap, Banknote, Shield, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer, Cell } from 'recharts';

const ComparativeModule = ({ inputs }) => {
  const [delayedResults, setDelayedResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const purchase = parseFloat(inputs.compra) || 0;
      const margin = parseFloat(inputs.margen) || 0;
      const envio = parseFloat(inputs.envio) || 0;

      const results = ['CARD', 'YAPE', 'CASH'].map(method => {
        const res = calculateFromPurchase({ compra: purchase, margen: margin, method, envio });
        return {
          name: FINANCIAL_CONFIG.GATEWAYS[method].name,
          short: method,
          venta: res.error ? 0 : res.venta,
          ganancia: res.error ? 0 : res.gananciaSoles,
          color: FINANCIAL_CONFIG.GATEWAYS[method].color === 'blue' ? '#3b82f6' : 
                 FINANCIAL_CONFIG.GATEWAYS[method].color === 'brand' ? '#0ea5e9' : '#22c55e',
          error: res.error
        };
      });

      setDelayedResults(results);
      setIsLoading(false);
    }, 150); // 150ms Micro-delay requested

    return () => clearTimeout(timer);
  }, [inputs]);

  if (!delayedResults) return null;

  const chartData = delayedResults.map(r => ({
    name: r.short,
    venta: parseFloat(r.venta.toFixed(2))
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 backdrop-blur-2xl shadow-2xl"
    >
      <div className="bg-slate-50 dark:bg-white/5 p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-brand-500" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">Optimizador Multicanal Pro V4.3</h3>
        </div>
        <div className="flex items-center gap-2">
           <div className={isLoading ? "w-2 h-2 rounded-full bg-brand-500 animate-ping" : "w-2 h-2 rounded-full bg-brand-500/20"} />
           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-slate-500 dark:text-slate-500">Sync Active</span>
        </div>
      </div>
      
      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Comparison Cards */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {delayedResults.map((res, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-brand-500/30 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-opacity-20`} style={{ backgroundColor: `${res.color}33`, color: res.color }}>
                  {res.short === 'CARD' && <CreditCard className="w-5 h-5" />}
                  {res.short === 'YAPE' && <Zap className="w-5 h-5" />}
                  {res.short === 'CASH' && <Banknote className="w-5 h-5" />}
                </div>
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{res.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-bold uppercase mb-1">Precio Sugerido</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white transition-colors">
                  {res.error ? '---' : `S/ ${res.venta.toFixed(2)}`}
                </span>
                {!res.error && res.short !== 'CARD' && (
                  <span className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-2 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> 
                    {- (res.venta - delayedResults[0].venta).toFixed(2)} ahorro p/u
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Chart */}
        <div className="lg:col-span-12 h-48 w-full bg-slate-50 dark:bg-white/[0.02] rounded-3xl p-6 border border-slate-100 dark:border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} 
              />
              <YAxis hide />
              <ReTooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
              />
              <Bar dataKey="venta" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={delayedResults[index].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparativeModule;
