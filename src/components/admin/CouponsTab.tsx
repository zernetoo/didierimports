'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, Database } from 'lucide-react';
import { Coupon } from '@/types/admin';
import { isCloudDbConfigured } from '@/lib/store-db';

interface CouponsTabProps {
  coupons: Coupon[];
  onSaveCoupons: (next: Coupon[]) => void;
}

export function CouponsTab({ coupons, onSaveCoupons }: CouponsTabProps) {
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percent' | 'fixed'>('percent');
  const [value, setValue] = useState(10);
  const [minOrder, setMinOrder] = useState(160);
  const [description, setDescription] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase().replace(/\s+/g, '');
    if (!clean) return;
    const next: Coupon = {
      id: `cp-${Date.now()}`,
      code: clean,
      type,
      value: Math.max(1, value),
      minOrder: Math.max(0, minOrder),
      active: true,
      description:
        description.trim() ||
        (type === 'percent' ? `${value}% de desconto` : `R$ ${value} OFF`),
    };
    onSaveCoupons([next, ...coupons]);
    setCode('');
    setDescription('');
  };

  const toggleActive = (id: string) => {
    onSaveCoupons(
      coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const removeCoupon = (id: string) => {
    onSaveCoupons(coupons.filter((c) => c.id !== id));
  };

  const cloudReady = isCloudDbConfigured();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Create Coupon Form */}
      <form
        onSubmit={handleAdd}
        className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-10 h-10 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
              Criar Cupom Promocional
            </h2>
            <p className="text-xs text-slate-500">
              Os cupons ativos funcionam na hora dentro da sacola do cliente.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
              Código do Cupom *
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ex: BEMVINDO15"
              className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm font-extrabold uppercase tracking-wider"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
                Tipo de Desconto
              </label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as 'percent' | 'fixed')
                }
                className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm font-bold"
              >
                <option value="percent">Porcentagem (%)</option>
                <option value="fixed">Valor Fixo (R$)</option>
              </select>
            </div>
            <div>
              <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
                Valor ({type === 'percent' ? '%' : 'R$'})
              </label>
              <input
                type="number"
                min={1}
                max={type === 'percent' ? 80 : 500}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm font-extrabold"
              />
            </div>
          </div>

          <div>
            <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
              Pedido Mínimo (R$)
            </label>
            <input
              type="number"
              min={0}
              value={minOrder}
              onChange={(e) => setMinOrder(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
              Descrição interna (opcional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Promoção de lançamento Instagram"
              className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] font-extrabold text-xs uppercase tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Criar Cupom Ativo
        </button>
      </form>

      {/* Active Coupons List + Cloud DB Status */}
      <div className="lg:col-span-7 space-y-5">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
            Cupons Cadastrados ({coupons.length})
          </h3>
          <div className="space-y-2.5">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F4F6FA] border border-slate-200"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#020F4A] text-[#F4BE0B] text-xs font-extrabold tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-xs font-extrabold text-[#020F4A]">
                      {c.type === 'percent' ? `${c.value}% OFF` : `R$ ${c.value} OFF`}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      (mín. R$ {c.minOrder})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{c.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleActive(c.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold cursor-pointer ${
                      c.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {c.active ? 'Ativo' : 'Desativado'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCoupon(c.id)}
                    aria-label={`Remover cupom ${c.code}`}
                    className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Connection Card */}
        <div className="bg-[#020F4A] text-white rounded-3xl p-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-display text-xl font-extrabold uppercase text-[#F4BE0B]">
              <Database className="w-5 h-5" />
              Status da Sincronização de Dados
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold inline-flex items-center gap-1 ${
                cloudReady
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/15 text-[#F4BE0B]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {cloudReady ? 'Supabase Cloud Ativo' : 'Modo Local Instantâneo'}
            </span>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            {cloudReady
              ? 'Todos os pedidos, preços, modelos cadastrados e cupons estão sincronizando automaticamente com seu banco PostgreSQL no Supabase.'
              : 'Tudo funciona imediatamente neste navegador (e cada venda continua sendo enviada por e-mail para heliodidier87@gmail.com). Quando quiser sincronizar entre vários celulares/PCs em nuvem, basta colar NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel usando o arquivo supabase/schema.sql já incluído no repositório.'}
          </p>
        </div>
      </div>
    </div>
  );
}
