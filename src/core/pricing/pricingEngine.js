import { FINANCIAL_CONFIG } from './constants';

const { IGV, RER } = FINANCIAL_CONFIG.SUNAT;

/**
 * Consolidated Core Financial Engine
 * Handles both Direct (Venta) and Inverse (Compra) calculations using algebra profiles.
 */

const getProfileConstants = (method) => {
  const profile = FINANCIAL_CONFIG.GATEWAYS[method] || FINANCIAL_CONFIG.GATEWAYS.CARD;
  return { 
    rate: profile.rate, 
    fixed: profile.fixed 
  };
};

/**
 * Calculates Venta Sugerida (Direct)
 */
export const calculateFromPurchase = ({ compra, margen, method, envio, overrides = {} }) => {
  const { rate, fixed } = getProfileConstants(method);
  const m = parseFloat(margen) / 100;
  const c = parseFloat(compra) || 0;
  const s = parseFloat(envio) || 0;
  
  const currentIGV = overrides.igv ?? IGV;
  const currentRER = overrides.rer ?? RER;

  // Formula: V = (C + Fixed*(1+IGV) + S) / [ (1 - RER)/(1+IGV) - Rate*(1+IGV) - Margin ]
  const numerator = c + (fixed * (1 + currentIGV)) + s;
  const denominator = ((1 - currentRER) / (1 + currentIGV)) 
                    - (rate * (1 + currentIGV)) 
                    - m;

  if (denominator <= 0) return { error: "Margen inalcanzable para este perfil" };

  const ventaFinal = numerator / denominator;
  return getBreakdown(ventaFinal, c, method, s, overrides);
};

/**
 * Calculates Costo Máximo (Inverse)
 */
export const calculateFromSale = ({ venta, margen, method, envio, overrides = {} }) => {
  const { rate, fixed } = getProfileConstants(method);
  const v = parseFloat(venta) || 0;
  const m = parseFloat(margen) / 100;
  const s = parseFloat(envio) || 0;

  const currentIGV = overrides.igv ?? IGV;
  const currentRER = overrides.rer ?? RER;

  // C = V * [ (1 - RER)/(1+IGV) - Rate*(1+IGV) - Margin ] - Fixed*(1+IGV) - S
  const factor = ((1 - currentRER) / (1 + currentIGV)) 
               - (rate * (1 + currentIGV)) 
               - m;
  
  const costoCompra = (v * factor) - (fixed * (1 + currentIGV)) - s;

  if (costoCompra < 0) return { error: "Precio de venta insuficiente para el margen deseado" };

  return getBreakdown(v, costoCompra, method, s, overrides);
};

/**
 * Universal Financial Breakdown
 */
export const getBreakdown = (venta, compra, method, envio, overrides = {}) => {
  const v = parseFloat(venta) || 0;
  const c = parseFloat(compra) || 0;
  const e = parseFloat(envio) || 0;
  
  const currentIGV = overrides.igv ?? IGV;
  const currentRER = overrides.rer ?? RER;
  const { rate, fixed } = getProfileConstants(method);

  // Impuestos SUNAT
  const baseImponible = v / (1 + currentIGV);
  const igvTotal = v - baseImponible;
  const rerTotal = baseImponible * currentRER;
  
  // Comisiones Pasarela
  const mpCommissionBase = v * rate;
  const mpCommissionFixed = fixed;
  const mpCommissionIGV = (mpCommissionBase + mpCommissionFixed) * currentIGV;
  const mpCommissionTotal = mpCommissionBase + mpCommissionFixed + mpCommissionIGV;
  
  // Marketplace Fees (Placeholder for ML integration)
  const mlFeeBase = overrides.mlFee ?? 0;
  const mlFeeTotal = mlFeeBase * (1 + currentIGV);

  const gananciaSoles = v - c - mpCommissionTotal - igvTotal - rerTotal - e - mlFeeTotal;
  const gananciaPercent = v > 0 ? (gananciaSoles / v) * 100 : 0;

  return {
    venta: v,
    compra: c,
    baseImponible,
    igv: igvTotal,
    rer: rerTotal,
    mpCommissionBase,
    mpCommissionFixed,
    mpCommissionIGV,
    mpCommissionTotal,
    mlFeeTotal,
    envio: e,
    gananciaSoles,
    gananciaPercent,
    method,
    isMinMarginAlert: gananciaPercent < FINANCIAL_CONFIG.BUSINESS.MIN_MARGIN_ALERT
  };
};
