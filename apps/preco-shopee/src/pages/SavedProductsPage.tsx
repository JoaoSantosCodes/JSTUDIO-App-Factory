import React from 'react';
import { Card, Header } from '@jstudio/ui';
import { formatBRL } from '@jstudio/shopee-math';
import { Trash2 } from 'lucide-react';

export interface SavedProduct {
  id: string;
  name: string;
  price: number;
  profit: number;
  cost: number;
  date: string;
}

export interface SavedProductsPageProps {
  products: SavedProduct[];
  onDeleteProduct: (id: string) => void;
}

export const SavedProductsPage: React.FC<SavedProductsPageProps> = ({
  products,
  onDeleteProduct,
}) => {
  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      <Header
        title="Produtos Salvos"
        subtitle="Sua lista de preços e margens salvas"
      />

      {products.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-xs text-slate-400">Nenhum produto salvo na lista ainda.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {products.map((item) => (
            <Card key={item.id} className="flex justify-between items-center py-4">
              <div>
                <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                <div className="flex gap-3 text-xs text-slate-400 mt-1">
                  <span>Custo: {formatBRL(item.cost)}</span>
                  <span>Lucro: <strong className="text-emerald-400">{formatBRL(item.profit)}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-black text-amber-400">
                  {formatBRL(item.price)}
                </span>
                <button
                  onClick={() => onDeleteProduct(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
