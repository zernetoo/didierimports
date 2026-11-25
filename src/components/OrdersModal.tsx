'use client';

import React from 'react';
import { X, ClipboardList, MessageCircle, CheckCircle2 } from 'lucide-react';
import { STORE_CONFIG } from '@/data/catalog';
import { SavedOrder, buildWhatsAppOrderMessage, formatBRL } from '@/types/store';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: SavedOrder[];
}

export function OrdersModal({ isOpen, onClose, orders }: OrdersModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label="Meus pedidos"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="bg-[#020F4A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="w-5 h-5 text-[#F4BE0B]" />
            <h2 className="font-display text-2xl font-extrabold uppercase">
              Meus Pedidos
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar meus pedidos"
            className="p-2 rounded-full hover:bg-white/15 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-display text-xl font-extrabold uppercase text-[#020F4A]">
                Nenhum pedido neste dispositivo ainda
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Quando você finalizar uma encomenda, ela aparecerá aqui com o código do pedido e atalho para o WhatsApp.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="rounded-2xl border border-slate-200 p-4 bg-[#F4F6FA] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                    <div>
                      <span className="font-display text-lg font-extrabold text-[#020F4A]">
                        Pedido #{order.orderId}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        {new Date(order.createdAt).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {formatBRL(order.total)}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {order.items.map((it) => (
                      <li key={it.cartItemId} className="flex justify-between gap-2">
                        <span>
                          <strong>{it.quantity}x {it.teamName}</strong> ({it.version === 'jogador' ? 'Jogador' : 'Torcedor'} · Tam {it.size}) — {it.modelNote}
                          {it.hasPersonalization && ` · ${it.customName} #${it.customNumber}`}
                          {it.hasPatch && ` · ${it.patchName}`}
                        </span>
                        <span className="font-bold shrink-0">
                          {formatBRL(it.unitPrice * it.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600">
                      Entrega: {order.customer.cityState} · {order.customer.paymentMethod}
                    </span>
                    <a
                      href={`${STORE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                        buildWhatsAppOrderMessage(order)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Falar sobre este pedido
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
