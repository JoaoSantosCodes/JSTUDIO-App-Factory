import React from 'react';
import { Card, Header } from '@jstudio/ui';
import { ShieldCheck, Info } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      <Header title="Ajustes e Regras" subtitle="Configurações da Calculadora Shopee" />

      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Regras da Shopee Brasil 2026
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Comissão Padrão: 14% | Frete Grátis Extra: +6% (total 20%) | Taxa Fixa: R$ 4,00 por item vendido | Teto Máximo de Comissão: R$ 100,00 por item.
            </p>
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Privacidade Garantida
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Seus cálculos e produtos salvos permanecem 100% no seu celular.
            </p>
          </div>
        </div>
      </Card>

      <Card className="space-y-2 text-xs text-slate-500">
        <div className="flex justify-between">
          <span>Product ID: SHP-002</span>
          <span>Target SDK: 36</span>
        </div>
        <div className="flex justify-between">
          <span>Capacitor 8 + React 19</span>
          <span>JSTUDIO App Factory</span>
        </div>
      </Card>
    </div>
  );
};
