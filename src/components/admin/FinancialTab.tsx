'use client';

import React, { useMemo, useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Percent,
  Download,
  Wallet,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { AdminOrder, StorePricingSettings } from '@/types/admin';
import { formatBRL } from '@/types/store';
import { exportOrdersToCSV } from '@/lib/store-db';

interface FinancialTabProps {
  orders: AdminOrder[];
  pricing: StorePricingSettings;
  onLoadDemo: () => void;
}

type PeriodFilter = 'all' | '30d' | '7d';

export function FinancialTab({
  orders,
  pricing,
  onLoadDemo,
}: FinancialTabProps) {
  const [period, setPeriod] = useState<PeriodFilter>('all');

  const filteredOrders = useMemo(() => {
    const now = Date.now();
    return orders.filter((o) => {
      if (o.status === 'cancelado') return false;
      if (period === 'all') return true;
      const diff = now - new Date(o.createdAt).getTime();
      const days = period === '7d' ? 7 : 30;
      return diff <= days * 86400000;
    });
  }, [orders, period]);

  const metrics = useMemo(() => {
    const revenue = filteredOrders.reduce((s, o) => s + o.total, 0);
    const totalCost = filteredOrders.reduce((s, o) => s + o.estimatedCost, 0);
    const netProfit = revenue - totalCost;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const totalPieces = filteredOrders.reduce(
      (s, o) => s + o.items.reduce((a, b) => a + b.quantity, 0),
      0
    );
    const avgTicket =
      filteredOrders.length > 0 ? revenue / filteredOrders.length : 0;

    // Payment method split
    const byPayment: Record<string, { count: number; total: number }> = {};
    filteredOrders.forEach((o) => {
      const m = o.customer.paymentMethod;
      if (!byPayment[m]) byPayment[m] = { count: 0, total: 0 };
      byPayment[m].count += 1;
      byPayment[m].total += o.total;
    });

    // Top Teams sold
    const teamMap: Record<
      string,
      { name: string; crest: string; qty: number; revenue: number }
    > = {};
    filteredOrders.forEach((o) => {
      o.items.forEach((it) => {
        if (!teamMap[it.teamId]) {
          teamMap[it.teamId] = {
            name: it.teamName,
            crest: it.crest,
            qty: 0,
            revenue: 0,
          };
        }
        teamMap[it.teamId].qty += it.quantity;
        teamMap[it.teamId].revenue += it.unitPrice * it.quantity;
      });
    });
    const topTeams = Object.values(teamMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);

    // Monthly series (last 6 months)
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const monthlyMap = new Map<
      string,
      { label: string; revenue: number; profit: number; count: number }
    >();
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap.set(key, {
        label: `${monthNames[d.getMonth()]}/${String(d.getFullYear()).slice(-2)}`,
        revenue: 0,
        profit: 0,
        count: 0,
      });
    }
    filteredOrders.forEach((o) => {
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const bucket = monthlyMap.get(key);
      if (bucket) {
        bucket.revenue += o.total;
        bucket.profit += o.total - o.estimatedCost;
        bucket.count += 1;
      }
    });
    const monthly = Array.from(monthlyMap.values());
    const maxMonthRev = Math.max(1, ...monthly.map((m) => m.revenue));

    return {
      revenue,
      totalCost,
      netProfit,
      margin,
      totalPieces,
      avgTicket,
      byPayment,
      topTeams,
      monthly,
      maxMonthRev,
    };
  }, [filteredOrders]);

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F4F6FA] text-[#020F4A] flex items-center justify-center mx-auto">
          <TrendingUp className="w-8 h-8 text-[#DFA902]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase text-[#020F4A]">
          Seu Painel Financeiro está pronto!
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Assim que as encomendas entrarem pelo site (ou você registrar vendas manuais), o faturamento, custos de fornecedor e lucro líquido aparecem automaticamente aqui.
        </p>
        <button
          type="button"
          onClick={onLoadDemo}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Carregar Vendas de Demonstração (7 pedidos)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(
            [
              ['all', 'Todo Período'],
              ['30d', 'Últimos 30 dias'],
              ['7d', 'Últimos 7 dias'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPeriod(id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                period === id
                  ? 'bg-[#020F4A] text-[#F4BE0B]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#020F4A]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => exportOrdersToCSV(filteredOrders)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#020F4A] hover:text-white text-[#020F4A] border border-slate-200 text-xs font-extrabold uppercase transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Exportar Excel (CSV)
        </button>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500">
              Faturamento Bruto
            </span>
            <span className="w-9 h-9 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-extrabold text-[#020F4A] mt-3 leading-none">
            {formatBRL(metrics.revenue)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {filteredOrders.length} pedidos válidos · {metrics.totalPieces} peças
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500">
              Custo Fornecedores
            </span>
            <span className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-extrabold text-slate-800 mt-3 leading-none">
            {formatBRL(metrics.totalCost)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Base: Torc. R$ {pricing.costTorcedor} · Jog. R$ {pricing.costJogador}
          </p>
        </div>

        <div className="bg-[#020F4A] text-white rounded-3xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-[#F4BE0B]">
              Lucro Líquido Estimado
            </span>
            <span className="w-9 h-9 rounded-2xl bg-[#F4BE0B] text-[#020F4A] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-extrabold text-white mt-3 leading-none">
            {formatBRL(metrics.netProfit)}
          </p>
          <p className="text-xs text-emerald-400 font-bold mt-2 inline-flex items-center gap-1">
            <Percent className="w-3.5 h-3.5" />
            Margem líquida de {metrics.margin.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500">
              Ticket Médio
            </span>
            <span className="w-9 h-9 rounded-2xl bg-amber-100 text-[#020F4A] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-extrabold text-[#020F4A] mt-3 leading-none">
            {formatBRL(metrics.avgTicket)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Média de{' '}
            {filteredOrders.length > 0
              ? (metrics.totalPieces / filteredOrders.length).toFixed(1)
              : '0'}{' '}
            camisa(s) por venda
          </p>
        </div>
      </div>

      {/* Charts & Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Monthly Revenue vs Net Profit Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Evolução Mensal (Últimos 6 Meses)
              </h3>
              <p className="text-xs text-slate-500">
                Comparativo entre faturamento bruto e lucro líquido
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="inline-flex items-center gap-1.5 text-[#020F4A]">
                <span className="w-3 h-3 rounded-full bg-[#020F4A]" />
                Faturamento
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#B88600]">
                <span className="w-3 h-3 rounded-full bg-[#F4BE0B]" />
                Lucro Líquido
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 items-end h-56 pt-4">
            {metrics.monthly.map((m) => {
              const revPct = Math.max(
                m.revenue > 0 ? 10 : 3,
                Math.round((m.revenue / metrics.maxMonthRev) * 100)
              );
              const profPct = Math.max(
                m.profit > 0 ? 8 : 2,
                Math.round((m.profit / metrics.maxMonthRev) * 100)
              );
              return (
                <div
                  key={m.label}
                  className="flex flex-col items-center h-full justify-end gap-2"
                >
                  <span className="text-[10px] font-extrabold text-[#020F4A] truncate max-w-full">
                    {m.revenue > 0 ? formatBRL(m.revenue).replace(',00', '') : '—'}
                  </span>
                  <div className="w-full flex items-end justify-center gap-1.5 h-40">
                    <div
                      title={`Faturamento: ${formatBRL(m.revenue)}`}
                      className="w-5 sm:w-7 rounded-t-xl bg-[#020F4A] transition-all"
                      style={{ height: `${revPct}%` }}
                    />
                    <div
                      title={`Lucro: ${formatBRL(m.profit)}`}
                      className="w-5 sm:w-7 rounded-t-xl bg-[#F4BE0B] transition-all"
                      style={{ height: `${profPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Payment Methods + Top Selling Teams */}
        <div className="lg:col-span-5 space-y-5">
          {/* Payment Methods */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-display text-xl font-extrabold uppercase text-[#020F4A] mb-4">
              Vendas por Forma de Pagamento
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics.byPayment).map(([method, data]) => {
                const pct =
                  metrics.revenue > 0
                    ? Math.round((data.total / metrics.revenue) * 100)
                    : 0;
                return (
                  <div key={method} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#020F4A]">
                        {method} ({data.count})
                      </span>
                      <span className="text-slate-700">
                        {formatBRL(data.total)} · {pct}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#F4F6FA] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#020F4A]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Teams Ranking */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#DFA902]" />
              <h3 className="font-display text-xl font-extrabold uppercase text-[#020F4A]">
                Ranking de Times Mais Vendidos
              </h3>
            </div>
            <ul className="space-y-2.5">
              {metrics.topTeams.map((t, idx) => (
                <li
                  key={t.name}
                  className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-[#F4F6FA]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#020F4A] text-[#F4BE0B] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <img
                      src={t.crest}
                      alt={t.name}
                      className="w-8 h-8 rounded-full bg-white p-1 object-contain shrink-0"
                    />
                    <span className="text-xs font-extrabold text-[#020F4A] truncate">
                      {t.name}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#020F4A] block">
                      {formatBRL(t.revenue)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {t.qty} {t.qty === 1 ? 'peça' : 'peças'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
