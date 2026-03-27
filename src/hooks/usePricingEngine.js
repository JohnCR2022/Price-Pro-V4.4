import { useState, useMemo, useEffect, useCallback } from 'react';
import { calculateFromPurchase, calculateFromSale } from '../core/pricing/pricingEngine';
import { FINANCIAL_CONFIG } from '../core/pricing/constants';

const STORAGE_KEY = 'aura_price_pro_v4_4_state';

const INITIAL_INPUTS = {
  compra: '',
  venta: '',
  margen: FINANCIAL_CONFIG.BUSINESS.DEFAULT_MARGIN.toString(),
  envio: '0',
};

export const usePricingEngine = (overrides = {}) => {
  const loadState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
    return {
      mode: 'VENTAS',
      method: 'CARD_INSTANT',
      inputs: INITIAL_INPUTS
    };
  };

  const initialState = loadState();
  const [mode, setMode] = useState(initialState.mode);
  const [method, setMethod] = useState(initialState.method);
  const [inputs, setInputs] = useState(initialState.inputs);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, method, inputs }));
  }, [mode, method, inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || !isNaN(value)) {
      setInputs(prev => ({ ...prev, [name]: value }));
    }
  };

  const reset = useCallback(() => {
    setInputs(INITIAL_INPUTS);
    setMethod('CARD_INSTANT');
    setMode('VENTAS');
  }, []);

  const results = useMemo(() => {
    const params = {
      compra: inputs.compra,
      venta: inputs.venta,
      margen: inputs.margen,
      method,
      envio: inputs.envio,
      overrides
    };
    
    return mode === 'VENTAS' ? calculateFromPurchase(params) : calculateFromSale(params);
  }, [inputs, mode, method, overrides]);

  const getProfitColor = (percent) => {
    if (percent >= 20) return 'text-cyan-500 dark:text-cyan-400';
    if (percent >= 10) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getProfitBg = (percent) => {
    if (percent >= 20) return 'bg-cyan-500';
    if (percent >= 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return {
    mode,
    setMode,
    method,
    setMethod,
    inputs,
    setInputs,
    handleInputChange,
    results,
    reset,
    utils: {
      getProfitColor,
      getProfitBg,
      isMinMarginAlert: results.isMinMarginAlert
    }
  };
};
