import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShoppingCart, 
  Truck, 
  Percent, 
  ShieldCheck, 
  RefreshCcw,
  AlertCircle,
  ArrowRightLeft,
  ChevronRight,
  Sun,
  Moon,
  Info,
  Layers,
  LayoutDashboard,
  Zap,
  RotateCcw,
  Banknote,
  Clock,
  Calendar,
  Smartphone,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePricingEngine } from './hooks/usePricingEngine';
import { FINANCIAL_CONFIG } from './core/pricing/constants';
import ComparativeModule from './components/ComparativeModule';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Tooltip = ({ content, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center group" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-4 bg-slate-900 border border-white/20 rounded-2xl shadow-2xl text-[10px] text-slate-300 font-medium leading-relaxed"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const { mode, setMode, method, setMethod, inputs, handleInputChange, results, reset, utils } = usePricingEngine();
  const [darkMode, setDarkMode] = useState(true);
  const [showComparative, setShowComparative] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const onFocus = (e) => e.target.select();

  return (
    <div className={cn(
      "min-h-screen p-2 md:p-8 flex items-start md:items-center justify-center transition-colors duration-500",
      darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-5xl rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-12 shadow-2xl space-y-8 md:space-y-10 border transition-all duration-500",
          darkMode ? "glass-panel bg-slate-900/40 border-white/10" : "bg-white border-slate-200"
        )}
      >
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              className="bg-brand-500 p-5 rounded-3xl shadow-2xl shadow-brand-500/40"
            >
              <Calculator className="text-white w-8 h-8" />
            </motion.div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter">Price Pro V4.4</h1>
                <span className="px-3 py-1 bg-brand-500/10 text-brand-500 text-[9px] font-black rounded-full border border-brand-500/20 uppercase tracking-widest">Evolution</span>
              </div>
              <p className={cn(
                "text-sm font-bold uppercase tracking-[0.2em] mt-1.5",
                darkMode ? "text-slate-500" : "text-slate-600"
              )}>Industrial Engine / Multichannel Optimization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={reset}
              className="p-2.5 md:p-3 bg-white/5 hover:bg-red-500/10 rounded-xl md:rounded-2xl border border-white/10 transition-all text-slate-400 hover:text-red-400"
              title="Reset All"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                "p-3 rounded-2xl border transition-all",
                darkMode ? "bg-white/5 border-white/10 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
              )}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className={cn(
              "flex p-1.5 rounded-[1.25rem] border shadow-inner",
              darkMode ? "bg-slate-800/40 border-white/5" : "bg-slate-100 border-slate-200"
            )}>
              <button 
                onClick={() => setMode('VENTAS')}
                className={cn(
                  "relative px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all flex items-center gap-2 overflow-hidden",
                  mode === 'VENTAS' ? "text-white shadow-lg shadow-brand-500/20" : (darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-800")
                )}
              >
                {mode === 'VENTAS' && <motion.div layoutId="activeMode" className="absolute inset-0 bg-brand-500" />}
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2 uppercase tracking-widest">
                  <ArrowRightLeft className="w-3 h-3 md:w-4 md:h-4" /> VENTAS
                </span>
              </button>
              <button 
                onClick={() => setMode('COMPRAS')}
                className={cn(
                  "relative px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all flex items-center gap-2 overflow-hidden",
                  mode === 'COMPRAS' ? "text-white shadow-lg shadow-brand-500/20" : (darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-800")
                )}
              >
                {mode === 'COMPRAS' && <motion.div layoutId="activeMode" className="absolute inset-0 bg-brand-500" />}
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2 uppercase tracking-widest">
                  <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" /> COMPRAS
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-5 space-y-10">
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.3em] flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-500" /> Gateway Selector
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'CARD_INSTANT', icon: RefreshCcw, label: 'T. Inst.' },
                    { id: 'CARD_14D', icon: Clock, label: 'T. 14D' },
                    { id: 'CARD_30D', icon: Calendar, label: 'T. 30D' },
                    { id: 'CASH', icon: Banknote, label: 'Efectivo' }
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setMethod(item.id)}
                      className={cn(
                        "group relative px-1 py-3 md:py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                        method === item.id 
                          ? (darkMode ? "border-brand-500 bg-brand-500/5 text-white" : "border-brand-500 bg-brand-500/5 text-brand-600") 
                          : (darkMode ? "border-transparent bg-white/5 text-slate-500 hover:bg-white/10" : "border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200")
                      )}
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-[7.5px] md:text-[8px] font-black uppercase tracking-tighter text-center leading-tight">{item.label}</span>
                      {method === item.id && <motion.div layoutId="activeMethodTab" className="absolute bottom-[-2px] left-3 right-3 h-[2px] bg-brand-500" />}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'YAPE_MP', icon: Zap, label: 'Yape MP' },
                    { id: 'YAPE_DIRECT', icon: Smartphone, label: 'Yape Direct' },
                    { id: 'QR_MP', icon: QrCode, label: 'QR MP' }
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setMethod(item.id)}
                      className={cn(
                        "group relative px-1 py-3 md:py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                        method === item.id 
                          ? (darkMode ? "border-brand-500 bg-brand-500/5 text-white" : "border-brand-500 bg-brand-500/5 text-brand-600") 
                          : (darkMode ? "border-transparent bg-white/5 text-slate-500 hover:bg-white/10" : "border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200")
                      )}
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-[7.5px] md:text-[8px] font-black uppercase tracking-tighter text-center leading-tight">{item.label}</span>
                      {method === item.id && <motion.div layoutId="activeMethodTab2" className="absolute bottom-[-2px] left-4 right-4 h-[2px] bg-brand-500" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className={cn(
                    "text-[10px] font-black uppercase tracking-widest flex justify-between px-1",
                    darkMode ? "text-slate-400" : "text-slate-600"
                  )}>
                    <span>{mode === 'VENTAS' ? 'Costo de Adquisición' : 'Precio de Venta Web'}</span>
                    <span className="text-brand-500">PEN (S/)</span>
                  </label>
                  <div className="relative group">
                    <input 
                      type="number" 
                      name={mode === 'VENTAS' ? 'compra' : 'venta'}
                      value={mode === 'VENTAS' ? inputs.compra : inputs.venta}
                      onChange={handleInputChange}
                      onFocus={onFocus}
                      className={cn(
                        "w-full bg-white/5 border rounded-[1.25rem] px-6 py-6 text-3xl font-black text-white focus:outline-none transition-all placeholder:text-white/5",
                        darkMode ? "border-white/10 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-900"
                      )}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-1",
                      darkMode ? "text-slate-400" : "text-slate-600"
                    )}>Margen Neto</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="margen"
                        value={inputs.margen}
                        onChange={handleInputChange}
                        onFocus={onFocus}
                        className={cn(
                          "w-full bg-white/5 border rounded-2xl px-6 py-5 text-2xl font-black focus:outline-none transition-all",
                          results.error ? "border-red-500/50 ring-4 ring-red-500/10" : "border-white/10 focus:border-brand-500",
                          !darkMode && "text-slate-900 border-slate-200"
                        )}
                      />
                      <Percent className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-1",
                      darkMode ? "text-slate-400" : "text-slate-600"
                    )}>Olva Courier</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="envio"
                        value={inputs.envio}
                        onChange={handleInputChange}
                        onFocus={onFocus}
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black focus:outline-none focus:border-brand-500 transition-all",
                          !darkMode && "text-slate-900 border-slate-200"
                        )}
                      />
                      <Truck className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {results.error && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-4 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-[11px] font-black uppercase leading-tight tracking-wider">{results.error}</p>
                  </motion.div>
                )}
                
                {utils.isMinMarginAlert && !results.error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 px-5 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Rentabilidad por debajo del 10%</span>
                  </motion.div>
                )}
              </div>
            </section>
            
            <button 
              onClick={() => setShowComparative(!showComparative)}
              className={cn(
                "w-full p-5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-4 border shadow-sm",
                darkMode 
                  ? "border-white/5 bg-white/5 text-slate-400 hover:bg-brand-500 hover:text-white" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-brand-500 hover:text-white"
              )}
            >
              <Layers className="w-5 h-5" />
              {showComparative ? 'HIDE MULTICHANNEL OPT' : 'VIEW MULTICHANNEL OPT'}
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 space-y-8">
             <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.3em] flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-brand-500" /> Strategic Summary
                </h2>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">Live Breakdown</span>
                   </div>
                </div>
             </div>

             <AnimatePresence mode="wait">
               <motion.div 
                key={mode + method + results.venta}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className={cn(
                  "p-10 md:p-14 rounded-[3.5rem] transition-all duration-700 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group",
                  results.error ? "bg-slate-800" : utils.getProfitBg(results.gananciaPercent)
                )}
               >
                 <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                    {mode === 'VENTAS' ? <ArrowRightLeft className="w-40 h-40" /> : <ShoppingCart className="w-40 h-40" />}
                 </div>

                 <div className="flex flex-col items-center gap-3 relative z-10">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">
                      {mode === 'VENTAS' ? 'Suggested Retail Price' : 'Max Acquisition Cost'}
                    </span>
                    <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">
                      <span className="text-4xl font-black opacity-30 mr-3">S/</span>
                      {results.error ? '---' : (mode === 'VENTAS' ? results.venta : results.compra).toFixed(2)}
                    </span>
                    <div className="mt-8 flex items-center gap-4 bg-white/10 backdrop-blur-3xl px-7 py-3 rounded-full border border-white/20 shadow-2xl">
                       <span className="text-xs font-black text-white uppercase tracking-[0.2em]">
                        MARGEN NETO: {results.error ? '0.0' : results.gananciaPercent.toFixed(1)}%
                       </span>
                    </div>
                 </div>
               </motion.div>
             </AnimatePresence>

             <div className="bg-white/5 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5 overflow-hidden shadow-2xl">
                {[
                  { label: 'Precio de costo', val: results.compra, formula: '' },
                  { label: 'Comisión Mercadopago (Base)', val: results.mpCommissionBase, formula: `Comisión ${(FINANCIAL_CONFIG.GATEWAYS[method]?.rate * 100).toFixed(2)}%: S/ ${results.venta.toFixed(2)} * ${(FINANCIAL_CONFIG.GATEWAYS[method]?.rate).toFixed(4)} = S/ ${results.mpCommissionBase.toFixed(2)}` },
                  { label: 'Comisión Mercadopago (Fijo)', val: results.mpCommissionFixed, formula: 'Fee de mantenimiento por transacción exitosa.' },
                  { label: 'IGV POR COMISION DE SERVICIO MERCADOPAGO', val: results.mpCommissionIGV, formula: `IGV (18%): (S/ ${results.mpCommissionBase.toFixed(2)} + S/ ${results.mpCommissionFixed.toFixed(2)}) * 0.18 = S/ ${results.mpCommissionIGV.toFixed(2)}` },
                  { label: 'Impuesto SUNAT (IGV)', val: results.igv, formula: `Fórmula: Precio de venta / 1.18 = Base; S/ ${results.venta.toFixed(2)} (Precio de venta) - S/ ${results.baseImponible.toFixed(2)} (Base) = S/ ${results.igv.toFixed(2)} (IGV)` },
                  { label: 'Impuesto SUNAT (RER)', val: results.rer, formula: `Fórmula: Base (S/ ${results.baseImponible.toFixed(2)}) * 0.015 = S/ ${results.rer.toFixed(2)} (RER)` },
                  { label: 'Gastos de Envío', val: results.envio, formula: 'Gasto logístico variable (Olva Courier).' },
                  { label: 'GANANCIA NETA', val: results.gananciaSoles, formula: `Utilidad: S/ ${results.gananciaSoles.toFixed(2)} / S/ ${results.venta.toFixed(2)} = ${results.gananciaPercent.toFixed(1)}%`, isTotal: true },
                ].map((item, idx) => (
                  <div key={idx} className={cn(
                    "flex justify-between items-center p-5 md:p-6 group transition-colors",
                    item.isTotal ? "bg-brand-500/10" : "hover:bg-slate-50 dark:hover:bg-white/5"
                  )}>
                    <div className="flex flex-col gap-1.5 flex-1 pr-4">
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-[0.2em]",
                         item.isTotal ? "text-brand-600 dark:text-brand-400" : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                       )}>
                        {item.label}
                       </span>
                       {item.formula && (
                         <span className="text-[9px] font-bold text-slate-500 dark:text-slate-500/60 leading-relaxed max-w-[280px]">
                           {item.formula}
                         </span>
                       )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "text-xl md:text-2xl tracking-tight transition-all",
                        item.isTotal ? "font-black text-slate-900 dark:text-white" : "font-black text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                      )}>
                        {results.error ? '---' : `S/ ${Math.max(0, item.val).toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                ))}
             </div>

             <AnimatePresence>
               {showComparative && <ComparativeModule inputs={inputs} />}
             </AnimatePresence>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              <LayoutDashboard className="w-5 h-5 text-brand-500" />
              <span>Financial Core Engine v4.3</span>
           </div>
           
           <div className="flex items-center gap-10">
             <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Calculadora Segura</span>
              </div>
             <div className="flex items-center gap-1 group cursor-pointer">
                <span className="text-[11px] font-black text-slate-500 group-hover:text-brand-500 transition-colors uppercase tracking-widest">Aura Store Tech</span>
                <ChevronRight className="w-4 h-4 text-slate-700" />
             </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
}

export default App;
