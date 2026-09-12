import { describe, expect, it } from 'vitest';
import { calculateShopeePrice, formatBRL } from './calculator';

describe('@jstudio/shopee-math - Shopee Price Calculator', () => {
  it('calculates price and fees accurately for standard commission (14%)', () => {
    // Product cost R$ 20.00, target margin 20%
    // Price = (20 + 4) / (1 - 0.14 - 0.20) = 24 / 0.66 = 36.3636...
    const result = calculateShopeePrice({
      productCost: 20,
      targetProfitMarginPercent: 20,
      shippingProgram: 'standard',
    });

    expect(result.recommendedSellingPrice).toBeCloseTo(36.36, 1);
    expect(result.commissionRatePercent).toBe(14);
    expect(result.fixedFeePerItem).toBe(4.0);
    expect(result.netProfit).toBeCloseTo(7.27, 1); // 20% of 36.36
  });

  it('calculates price for Free Shipping Extra program (20%)', () => {
    // Product cost R$ 50.00, target margin 15%
    // Price = (50 + 4) / (1 - 0.20 - 0.15) = 54 / 0.65 = 83.076...
    const result = calculateShopeePrice({
      productCost: 50,
      targetProfitMarginPercent: 15,
      shippingProgram: 'free_shipping_extra',
    });

    expect(result.recommendedSellingPrice).toBeCloseTo(83.08, 1);
    expect(result.commissionRatePercent).toBe(20);
    expect(result.netProfit).toBeCloseTo(12.46, 1);
  });

  it('calculates break-even price correctly', () => {
    // Cost R$ 20.00, standard (14%)
    // Break-even = (20 + 4) / (1 - 0.14) = 24 / 0.86 = 27.906...
    const result = calculateShopeePrice({
      productCost: 20,
      targetProfitMarginPercent: 0,
      shippingProgram: 'standard',
    });

    expect(result.breakEvenPrice).toBeCloseTo(27.91, 1);
  });

  it('formats BRL currency correctly', () => {
    expect(formatBRL(36.36)).toContain('36,36');
  });
});
