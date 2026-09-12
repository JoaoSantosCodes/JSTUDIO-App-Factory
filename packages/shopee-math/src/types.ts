export type ShippingProgram = 'standard' | 'free_shipping_extra';

export interface ShopeeCalculationInput {
  productCost: number;              // Custo de compra/fabricação do produto
  targetProfitMarginPercent: number;// Margem de lucro desejada em % (ex: 20%)
  shippingProgram: ShippingProgram; // 'standard' (14%) ou 'free_shipping_extra' (20%)
  otherCosts?: number;              // Embalagem, taxa de cartão, etc.
}

export interface ShopeeCalculationOutput {
  recommendedSellingPrice: number; // Preço final recomendado de venda
  commissionRatePercent: number;   // Taxa de comissão (14% ou 20%)
  commissionFeeAmount: number;     // Valor da comissão Shopee em R$
  fixedFeePerItem: number;         // Taxa fixa R$ 4,00 por item vendido
  totalShopeeFees: number;         // Comissão + Taxa Fixa R$ 4,00
  otherCosts: number;              // Outros custos adicionais
  netProfit: number;               // Lucro líquido real por venda
  actualMarginPercent: number;     // Margem de lucro real sobre o preço de venda
  breakEvenPrice: number;          // Preço mínimo para não ter prejuízo (lucro R$ 0)
}
