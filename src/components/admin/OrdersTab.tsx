'use client';

import React, { useMemo, useState } from 'react';
import {
  Search,
  MessageCircle,
  Trash2,
  Plus,
  Truck,
  X,
  Check,
  Package,
} from 'lucide-react';
import { STORE_CONFIG, TEAMS } from '@/data/catalog';
import {
  AdminOrder,
  ORDER_STATUS_META,
  OrderStatus,
  StorePricingSettings,
} from '@/types/admin';
import { CartItem, JerseyVersion, formatBRL } from '@/types/store';

interface OrdersTabProps {
  orders: AdminOrder[];
  pricing: StorePricingSettings;
  onUpdateOrder: (
    orderId: string,
    patch: Partial<Pick<AdminOrder, 'status' | 'trackingCode' | 'sellerNotes'>>
  ) => void;
  onDeleteOrder: (orderId: string) => void;
  onCreateManualOrder: (order: AdminOrder) => void;
}

const STATUS_FLOW: OrderStatus[] = [
  'novo',
  'encomendado',
  'em_transito',
  'entregue',
  'cancelado',
];

export function OrdersTab({
  orders,
  pricing,
  onUpdateOrder,
  onDeleteOrder,
  onCreateManualOrder,
}: OrdersTabProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [search, setSearch] = useState('');
  const [manualOpen, setManualOpen] = useState(false);

  // Manual order form state (for sales closed directly on WhatsApp/Instagram!)
  const [mName, setMName] = useState('');
  const [mWhatsapp, setMWhatsapp] = useState('');
  const [mCity, setMCity] = useState('Teresina - PI');
  const [mPayment, setMPayment] = useState<
    'Pix' | 'Cartão de Crédito (Link)' | 'Combinar com o vendedor'
  >('Pix');
  const [mTeamId, setMTeamId] = useState('flamengo');
  const [mVersion, setMVersion] = useState<JerseyVersion>('torcedor');
  const [mSize, setMSize] = useState('G');
  const [mModelNote, setMModelNote] = useState('Titular 2026');
  const [mPers, setMPers] = useState(false);
  const [mPersName, setMPersName] = useState('');
  const [mPersNum, setMPersNum] = useState('');
  const [mPatch, setMPatch] = useState(false);
  const [mQty, setMQty] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (q) {
        const hay = `${o.orderId} ${o.customer.fullName} ${o.customer.whatsapp} ${o.customer.cityState} ${o.items.map((i) => i.teamName).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [orders, statusFilter, search]);

  const countsByStatus = useMemo(() => {
    const map: Record<string, number> = { all: orders.length };
    STATUS_FLOW.forEach((st) => {
      map[st] = orders.filter((o) => o.status === st).length;
    });
    return map;
  }, [orders]);

  const buildCustomerWhatsAppLink = (order: AdminOrder) => {
    const digits = order.customer.whatsapp.replace(/\D/g, '');
    const phone = digits.startsWith('55') ? digits : `55${digits}`;
    const meta = ORDER_STATUS_META[order.status];
    const itemsText = order.items
      .map((i) => `${i.quantity}x ${i.teamName} (${i.size})`)
      .join(', ');
    const trackingLine = order.trackingCode
      ? `\nCódigo de rastreio: *${order.trackingCode}*`
      : '';
    const msg = `Olá *${order.customer.fullName}*! Aqui é da *DIDIER IMPORTS*.\n\nAtualização do seu pedido *#${order.orderId}* (${itemsText}): ${meta.whatsappMsg}${trackingLine}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const handleSaveManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const team = TEAMS.find((t) => t.id === mTeamId) || TEAMS[0];
    const unitPrice =
      (mVersion === 'jogador' ? pricing.jogador : pricing.torcedor) +
      (mPers ? pricing.personalizacao : 0) +
      (mPatch ? pricing.patch : 0);
    const unitCost =
      (mVersion === 'jogador' ? pricing.costJogador : pricing.costTorcedor) +
      (mPers ? pricing.costPersonalizacao : 0) +
      (mPatch ? pricing.costPatch : 0);

    const item: CartItem = {
      cartItemId: `manual-${Date.now()}`,
      teamId: team.id,
      teamName: team.name,
      leagueName: team.leagueName,
      sport: team.sport,
      crest: team.crest,
      version: mVersion,
      size: mSize,
      modelNote: mModelNote.trim() || 'Modelo padrão',
      hasPersonalization: mPers,
      customName: mPers ? mPersName.trim().toUpperCase() : '',
      customNumber: mPers ? mPersNum.trim() : '',
      hasPatch: mPatch,
      patchName: mPatch ? 'Patch Oficial' : '',
      quantity: mQty,
      unitPrice,
    };

    const newOrder: AdminOrder = {
      orderId: `DI-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'encomendado',
      emailDispatched: true,
      total: unitPrice * mQty,
      estimatedCost: unitCost * mQty,
      customer: {
        fullName: mName.trim(),
        whatsapp: mWhatsapp.trim(),
        email: '',
        cityState: mCity.trim(),
        neighborhood: 'Venda Direta',
        address: 'Registrado manualmente no painel',
        zipCode: '',
        paymentMethod: mPayment,
        notes: 'Registrado manualmente pelo vendedor',
      },
      items: [item],
    };

    onCreateManualOrder(newOrder);
    setMName('');
    setMWhatsapp('');
    setMPers(false);
    setMPersName('');
    setMPersNum('');
    setMPatch(false);
    setMQty(1);
    setManualOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Top Action & Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por pedido (#DI...), nome do cliente, WhatsApp ou time..."
              className="w-full h-10 pl-10 pr-4 rounded-full border border-slate-200 bg-[#F4F6FA] text-xs font-medium focus:outline-none focus:border-[#020F4A] focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={() => setManualOpen(true)}
            className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Registrar Venda Manual
          </button>
        </div>

        {/* Status Pipeline Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 cursor-pointer transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#020F4A] text-white'
                : 'bg-[#F4F6FA] text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({countsByStatus.all})
          </button>
          {STATUS_FLOW.map((st) => {
            const meta = ORDER_STATUS_META[st];
            const active = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#020F4A] text-[#F4BE0B]'
                    : 'bg-[#F4F6FA] text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                {meta.label} ({countsByStatus[st] || 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
          <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="font-display text-xl font-extrabold uppercase text-[#020F4A]">
            Nenhum pedido encontrado neste filtro
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Registre uma venda manual ou aguarde novos pedidos chegarem pelo site.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const meta = ORDER_STATUS_META[order.status];
            const profit =
              order.status === 'cancelado' ? 0 : order.total - order.estimatedCost;
            return (
              <div
                key={order.orderId}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                {/* Top Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-xl font-extrabold text-[#020F4A]">
                        Pedido #{order.orderId}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold ${meta.bg} ${meta.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#020F4A]">
                      {order.customer.fullName}{' '}
                      <span className="font-medium text-slate-500">
                        · {order.customer.whatsapp} · {order.customer.cityState}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500">
                      Entrega: {order.customer.address}, {order.customer.neighborhood} · Pagamento:{' '}
                      <strong className="text-[#020F4A]">
                        {order.customer.paymentMethod}
                      </strong>
                      {order.couponCode && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                          Cupom {order.couponCode} (-{formatBRL(order.discountAmount || 0)})
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-2xl font-extrabold text-[#020F4A] block leading-none">
                      {formatBRL(order.total)}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 block mt-1">
                      Lucro est.: {formatBRL(profit)}
                    </span>
                  </div>
                </div>

                {/* Items Ordered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {order.items.map((it) => (
                    <div
                      key={it.cartItemId}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F4F6FA]"
                    >
                      <img
                        src={it.crest}
                        alt={it.teamName}
                        className="w-10 h-10 rounded-full bg-white p-1 object-contain shrink-0"
                      />
                      <div className="min-w-0 flex-1 text-xs">
                        <p className="font-extrabold text-[#020F4A] truncate">
                          {it.quantity}x {it.teamName} · Tam {it.size}
                        </p>
                        <p className="text-slate-600 truncate">
                          {it.version === 'jogador' ? 'Jogador' : 'Torcedor'} · {it.modelNote}
                        </p>
                        {(it.hasPersonalization || it.hasPatch) && (
                          <p className="text-[11px] font-bold text-[#B88600] truncate">
                            {it.hasPersonalization &&
                              `${it.customName} #${it.customNumber}`}
                            {it.hasPersonalization && it.hasPatch && ' · '}
                            {it.hasPatch && it.patchName}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-extrabold text-[#020F4A] shrink-0">
                        {formatBRL(it.unitPrice * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Action Controls: Status, Tracking, WhatsApp Customer Alert, Delete */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label={`Status do pedido ${order.orderId}`}
                      value={order.status}
                      onChange={(e) =>
                        onUpdateOrder(order.orderId, {
                          status: e.target.value as OrderStatus,
                        })
                      }
                      className="h-9 px-3 rounded-full border border-slate-300 bg-white text-xs font-extrabold text-[#020F4A] focus:outline-none focus:border-[#020F4A]"
                    >
                      {STATUS_FLOW.map((st) => (
                        <option key={st} value={st}>
                          Status: {ORDER_STATUS_META[st].label}
                        </option>
                      ))}
                    </select>

                    <div className="relative">
                      <Truck className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        defaultValue={order.trackingCode || ''}
                        onBlur={(e) =>
                          onUpdateOrder(order.orderId, {
                            trackingCode: e.target.value.trim(),
                          })
                        }
                        placeholder="Código de rastreio..."
                        className="h-9 pl-8 pr-3 w-44 rounded-full border border-slate-200 bg-[#F4F6FA] text-xs font-semibold text-[#020F4A] focus:outline-none focus:border-[#020F4A] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={buildCustomerWhatsAppLink(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Avisar Cliente no WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => onDeleteOrder(order.orderId)}
                      title="Excluir pedido"
                      aria-label={`Excluir pedido ${order.orderId}`}
                      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manual Sale Modal */}
      {manualOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0" onClick={() => setManualOpen(false)} />
          <form
            onSubmit={handleSaveManualOrder}
            className="relative z-10 bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          >
            <div className="bg-[#020F4A] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-display text-2xl font-extrabold uppercase">
                Registrar Venda Manual (WhatsApp / Balcão)
              </h3>
              <button
                type="button"
                onClick={() => setManualOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Nome do Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={mName}
                    onChange={(e) => setMName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mWhatsapp}
                    onChange={(e) => setMWhatsapp(e.target.value)}
                    placeholder="(86) 99999-9999"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Cidade / UF
                  </label>
                  <input
                    type="text"
                    value={mCity}
                    onChange={(e) => setMCity(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Pagamento
                  </label>
                  <select
                    value={mPayment}
                    onChange={(e) =>
                      setMPayment(
                        e.target.value as
                          | 'Pix'
                          | 'Cartão de Crédito (Link)'
                          | 'Combinar com o vendedor'
                      )
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm"
                  >
                    <option value="Pix">Pix</option>
                    <option value="Cartão de Crédito (Link)">
                      Cartão de Crédito (Link)
                    </option>
                    <option value="Combinar com o vendedor">
                      Combinar com o vendedor
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Time
                  </label>
                  <select
                    value={mTeamId}
                    onChange={(e) => setMTeamId(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm"
                  >
                    {TEAMS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.leagueName})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Modelo
                  </label>
                  <input
                    type="text"
                    value={mModelNote}
                    onChange={(e) => setMModelNote(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Versão
                  </label>
                  <select
                    value={mVersion}
                    onChange={(e) => setMVersion(e.target.value as JerseyVersion)}
                    className="w-full h-10 px-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                  >
                    <option value="torcedor">Torcedor (R$ {pricing.torcedor})</option>
                    <option value="jogador">Jogador (R$ {pricing.jogador})</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Tamanho
                  </label>
                  <select
                    value={mSize}
                    onChange={(e) => setMSize(e.target.value)}
                    className="w-full h-10 px-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                  >
                    {STORE_CONFIG.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#020F4A] mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={mQty}
                    onChange={(e) => setMQty(Math.max(1, Number(e.target.value)))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="inline-flex items-center gap-2 font-bold text-[#020F4A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mPers}
                    onChange={(e) => setMPers(e.target.checked)}
                    className="accent-[#020F4A]"
                  />
                  Personalização (+R$ {pricing.personalizacao})
                </label>
                <label className="inline-flex items-center gap-2 font-bold text-[#020F4A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mPatch}
                    onChange={(e) => setMPatch(e.target.checked)}
                    className="accent-[#020F4A]"
                  />
                  Patch (+R$ {pricing.patch})
                </label>
              </div>

              {mPers && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={mPersName}
                    onChange={(e) => setMPersName(e.target.value)}
                    placeholder="Nome nas costas"
                    className="h-9 px-3 rounded-xl border border-slate-300 uppercase"
                  />
                  <input
                    type="text"
                    value={mPersNum}
                    onChange={(e) => setMPersNum(e.target.value)}
                    placeholder="Número"
                    className="h-9 px-3 rounded-xl border border-slate-300"
                  />
                </div>
              )}
            </div>

            <div className="p-5 bg-[#F4F6FA] border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setManualOpen(false)}
                className="px-5 h-11 rounded-full bg-white border border-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 h-11 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] text-xs font-extrabold uppercase inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Salvar Venda
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
