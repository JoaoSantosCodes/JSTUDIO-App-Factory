import React, { useState } from 'react';
import { Card, Header, StatTile } from '@jstudio/ui';
import { calculateShopeePrice, formatBRL, ShippingProgram } from '@jstudio/shopee-math';
import { ShoppingBag, ShieldAlert, BookmarkPlus } from 'lucide-react';

export interface CalculatorPageProps {
  onSaveProduct: (name: string, price: number, profit: number, cost: number) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onSaveProduct }) => {
  const [productName, setProductName] = useState('');
  const [productCost, setProductCost] = useState('20');
  const [targetMargin, setTargetMargin] = useState('20');
  const [shippingProgram, setShippingProgram] = useState<ShippingProgram>('free_shipping_extra');
  const [otherCosts, setOtherCosts] = useState('2');

  const costNum = parseFloat(productCost) || 0;
  const marginNum = parseFloat(targetMargin) || 0;
  const otherNum = parseFloat(otherCosts) || 0;

  const result = calculateShopeePrice({
    productCost: costNum,
    targetProfitMarginPercent: marginNum,
    shippingProgram,
    otherCosts: otherNum,
  });

  const handleSave = () => {
    onSaveProduct(
      productName || `Produto R$ ${costNum.toFixed(2)}`,
      result.recommendedSellingPrice,
      result.netProfit,
      costNum
    );
    alert('Cálculo salvo com sucesso na aba Salvos!');
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      <Header
        title="Preço Shopee"
        subtitle="Calculadora de Margem & Venda do Vendedor"
      />

      {/* Main Result Card */}
      <Card gradient className="text-center py-6 px-4 border-amber-500/30">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
          Preço Sugerido de Venda
        </span>
        <div className="mt-2 mb-3">
          <span className="text-5xl font-black text-amber-400 tracking-tight">
            {formatBRL(result.recommendedSellingPrice)}
          </span>
        </div>

        <div className="flex justify-center items-center gap-4 text-xs mt-2 text-slate-300">
          <div>
            <span className="text-slate-400 block text-[10px]">LUCRO LÍQUIDO</span>
            <span className="font-bold text-emerald-400 text-sm">{formatBRL(result.netProfit)}</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400 block text-[10px]">MARGEM REAL</span>
            <span className="font-bold text-slate-100 text-sm">{result.actualMarginPercent.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <BookmarkPlus className="w-4 h-4" />
            Salvar este Cálculo
          </button>
        </div>
      </Card>

      {/* Input Parameters */}
      <Card className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Dados do Produto
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Nome do Produto (opcional)
          </label>
          <input
            type="text"
            placeholder="Ex: Camiseta Oversized, Fone Bluetooth..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Custo do Produto (R$)
            </label>
            <input
              type="number"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
              className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Margem Desejada (%)
            </label>
            <input
              type="number"
              value={targetMargin}
              onChange={(e) => setTargetMargin(e.target.value)}
              className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Programa de Frete Shopee
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setShippingProgram('standard')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                shippingProgram === 'standard'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Padrão (14%)
            </button>
            <button
              type="button"
              onClick={() => setShippingProgram('free_shipping_extra')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                shippingProgram === 'free_shipping_extra'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Frete Grátis Extra (20%)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Embalagem + Outros Custos (R$)
          </label>
          <input
            type="number"
            value={otherCosts}
            onChange={(e) => setOtherCosts(e.target.value)}
            className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
          />
        </div>
      </Card>

      {/* Shopee Fee Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <StatTile
          label="Comissão Shopee"
          value={formatBRL(result.commissionFeeAmount)}
          subtext={`Taxa: ${result.commissionRatePercent}%`}
          icon={<ShoppingBag className="w-4 h-4" />}
        />
        <StatTile
          label="Preço Mínimo (Ponto de Equilíbrio)"
          value={formatBRL(result.breakEvenPrice)}
          subtext="Lucro R$ 0,00"
          icon={<ShieldAlert className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};
