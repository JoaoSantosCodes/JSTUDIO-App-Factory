import { ShopeeCalculationInput, ShopeeCalculationOutput } from './types';

export const SHOPEE_FIXED_FEE = 4.0; // R$ 4,00 taxa fixa por item
export const STANDARD_COMMISSION = 0.14; // 14%
export const FREE_SHIPPING_COMMISSION = 0.20; // 20% (14% + 6%)
export const MAX_COMMISSION_CAP = 100.0; // R$ 100,00 cap de comissão máxima por item

export function calculateShopeePrice(input: ShopeeCalculationInput): ShopeeCalculationOutput {
  const { productCost, targetProfitMarginPercent, shippingProgram, otherCosts = 0 } = input;

  const commissionRate = shippingProgram === 'free_shipping_extra'
    ? FREE_SHIPPING_COMMISSION
    : STANDARD_COMMISSION;

  const marginRate = Math.min(0.8, Math.max(0, targetProfitMarginPercent / 100));

  // Base formula without cap: Price = (Cost + OtherCosts + FixedFee) / (1 - CommissionRate - MarginRate)
  const divisor = 1 - commissionRate - marginRate;

  let recommendedSellingPrice = 0;

  if (divisor <= 0.05) {
    // Prevent division by zero or unrealistic margin rates (> 80%)
    recommendedSellingPrice = (productCost + otherCosts + SHOPEE_FIXED_FEE) * 5;
  } else {
    recommendedSellingPrice = (productCost + otherCosts + SHOPEE_FIXED_FEE) / divisor;
  }

  // Calculate fees with maximum commission cap R$ 100.00
  let commissionFeeAmount = recommendedSellingPrice * commissionRate;

  if (commissionFeeAmount > MAX_COMMISSION_CAP) {
    commissionFeeAmount = MAX_COMMISSION_CAP;
    // Recalculate price if commission is capped
    recommendedSellingPrice = (productCost + otherCosts + SHOPEE_FIXED_FEE + MAX_COMMISSION_CAP) / (1 - marginRate);
  }

  const totalShopeeFees = commissionFeeAmount + SHOPEE_FIXED_FEE;
  const netProfit = recommendedSellingPrice - totalShopeeFees - productCost - otherCosts;
  const actualMarginPercent = recommendedSellingPrice > 0 ? (netProfit / recommendedSellingPrice) * 100 : 0;

  // Break-even price: (Cost + OtherCosts + FixedFee) / (1 - CommissionRate)
  const breakEvenDivisor = 1 - commissionRate;
  const breakEvenPrice = (productCost + otherCosts + SHOPEE_FIXED_FEE) / breakEvenDivisor;

  return {
    recommendedSellingPrice,
    commissionRatePercent: Math.round(commissionRate * 100),
    commissionFeeAmount,
    fixedFeePerItem: SHOPEE_FIXED_FEE,
    totalShopeeFees,
    otherCosts,
    netProfit,
    actualMarginPercent,
    breakEvenPrice,
  };
}

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}
