import { describe, it, expect } from 'vitest';
import { calculateFromPurchase, calculateFromSale } from './pricingEngine';

describe('Pricing Engine V4.3 (Evolution)', () => {
  
  it('should calculate correct sale price for CARD mode', () => {
    const input = { compra: 100, margen: 20, method: 'CARD', envio: 0 };
    const result = calculateFromPurchase(input);
    expect(result.venta).toBeGreaterThan(100);
    expect(result.gananciaPercent).toBeCloseTo(20, 1);
  });

  it('should calculate correct sale price for YAPE mode and be cheaper than CARD', () => {
    const input = { compra: 100, margen: 20, method: 'YAPE', envio: 0 };
    const resYape = calculateFromPurchase(input);
    const resCard = calculateFromPurchase({ ...input, method: 'CARD' });
    
    expect(resYape.venta).toBeLessThan(resCard.venta);
  });

  it('should calculate for CASH mode (0% commission) and be the cheapest', () => {
    const input = { compra: 100, margen: 20, method: 'CASH', envio: 0 };
    const resCash = calculateFromPurchase(input);
    const resYape = calculateFromPurchase({ ...input, method: 'YAPE' });
    
    expect(resCash.mpCommissionTotal).toBe(0);
    expect(resCash.venta).toBeLessThan(resYape.venta);
  });

  it('should trigger min margin alert for < 10% profit', () => {
    const input = { compra: 100, margen: 5, method: 'CARD', envio: 0 };
    const result = calculateFromPurchase(input);
    expect(result.isMinMarginAlert).toBe(true);
  });

  it('should handle rate overrides (e.g. custom IGV)', () => {
    const input = { compra: 100, margen: 20, method: 'CARD', envio: 0, overrides: { igv: 0.10 } };
    const result = calculateFromPurchase(input);
    const normalResult = calculateFromPurchase({ ...input, overrides: {} });
    
    expect(result.venta).not.toBe(normalResult.venta);
  });

  it('should calculate correct max purchase for COMPRA mode', () => {
    const input = { venta: 200, margen: 15, method: 'CARD', envio: 10 };
    const result = calculateFromSale(input);
    
    expect(result.compra).toBeLessThan(200);
    expect(result.gananciaPercent).toBeCloseTo(15, 1);
  });

});
