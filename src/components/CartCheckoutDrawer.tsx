'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mail,
  MessageCircle,
  Loader2,
  AlertCircle,
  Tag,
} from 'lucide-react';
import { STORE_CONFIG } from '@/data/catalog';
import { recordStorefrontOrder, validateCoupon } from '@/lib/store-db';
import {
  CartItem,
  CustomerOrderData,
  SavedOrder,
  buildWhatsAppOrderMessage,
  formatBRL,
} from '@/types/store';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderSaved: (order: SavedOrder) => void;
}

type DrawerStep = 'cart' | 'checkout' | 'success';

const INITIAL_CUSTOMER: CustomerOrderData = {
  fullName: '',
  whatsapp: '',
  email: '',
  cityState: '',
  neighborhood: '',
  address: '',
  zipCode: '',
  paymentMethod: 'Pix',
  notes: '',
};

export function CartCheckoutDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOrderSaved,
}: CartCheckoutDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('cart');
  const [customer, setCustomer] = useState<CustomerOrderData>(INITIAL_CUSTOMER);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<SavedOrder | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.min(subtotal, appliedCoupon.discount) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = () => {
    const res = validateCoupon(couponInput, subtotal);
    setCouponMsg(res.message);
    if (res.valid && res.coupon) {
      setAppliedCoupon({ code: res.coupon.code, discount: res.discount });
    } else {
      setAppliedCoupon(null);
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('cart');
      setCompletedOrder(null);
    }
    onClose();
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setErrorMsg(null);

    const orderId = `DI-${Date.now().toString().slice(-6)}`;
    const total = finalTotal;

    const itensResumo = items
      .map((item, idx) => {
        const versionLabel =
          item.version === 'jogador'
            ? 'Versão Jogador (R$ 200)'
            : 'Versão Torcedor (R$ 160)';
        const extras: string[] = [];
        if (item.hasPersonalization) {
          extras.push(
            `Personalização (+R$ 30): Nome "${item.customName || '-'}" / Número "${item.customNumber || '-'}"`
          );
        }
        if (item.hasPatch) {
          extras.push(`Patch (+R$ 20): ${item.patchName || 'Oficial'}`);
        }
        return [
          `ITEM ${idx + 1}: ${item.teamName} (${item.leagueName})`,
          `• Versão: ${versionLabel}`,
          `• Tamanho: ${item.size} | Quantidade: ${item.quantity}`,
          `• Modelo escolhido: ${item.modelNote}`,
          extras.length > 0 ? `• Adicionais: ${extras.join(' | ')}` : '• Adicionais: Nenhum',
          `• Subtotal: ${formatBRL(item.unitPrice * item.quantity)}`,
        ].join('\n');
      })
      .join('\n\n------------------------------\n\n');

    const payload: Record<string, string> = {
      _subject: `Novo Pedido Didier Imports #${orderId} - ${customer.fullName} (${formatBRL(total)})`,
      _template: 'table',
      _captcha: 'false',
      Pedido: `#${orderId}`,
      Data_Hora: new Date().toLocaleString('pt-BR'),
      Valor_Total: formatBRL(total),
      Cupom_Aplicado: appliedCoupon
        ? `${appliedCoupon.code} (-${formatBRL(discountAmount)})`
        : 'Nenhum',
      Cliente_Nome: customer.fullName,
      Cliente_WhatsApp: customer.whatsapp,
      Cliente_Email: customer.email || 'Não informado',
      Forma_Pagamento: customer.paymentMethod,
      Endereco_Entrega: `${customer.address}, Bairro: ${customer.neighborhood}, ${customer.cityState}${customer.zipCode ? ` - CEP: ${customer.zipCode}` : ''}`,
      Observacoes: customer.notes || 'Nenhuma observação extra',
      Resumo_Itens_Encomendados: itensResumo,
    };

    if (customer.email) {
      payload._replyto = customer.email;
    }

    let emailDispatched = false;

    try {
      const response = await fetch(STORE_CONFIG.formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        emailDispatched = result.success === 'true' || result.success === true || response.ok;
      }
    } catch {
      emailDispatched = false;
    }

    const savedOrder: SavedOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: { ...customer },
      items: [...items],
      total,
      emailDispatched,
    };

    recordStorefrontOrder(
      savedOrder,
      discountAmount,
      appliedCoupon?.code || ''
    );
    onOrderSaved(savedOrder);
    onClearCart();
    setCompletedOrder(savedOrder);
    setCustomer(INITIAL_CUSTOMER);
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponMsg(null);
    setSubmitting(false);
    setStep('success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola e finalização de encomenda"
    >
      <div
        className="fixed inset-0 bg-black/65"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col sm:rounded-l-3xl overflow-hidden">
        {/* Drawer Header */}
        <div className="bg-[#020F4A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Voltar para a sacola"
                className="p-1.5 -ml-1.5 rounded-full hover:bg-white/15 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-[#F4BE0B]" />
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase leading-none">
                {step === 'cart' && 'Minha Sacola'}
                {step === 'checkout' && 'Finalizar Encomenda'}
                {step === 'success' && 'Pedido Confirmado!'}
              </h2>
              <p className="text-[11px] text-white/75 mt-0.5">
                {step === 'cart' &&
                  `${items.reduce((a, b) => a + b.quantity, 0)} item(ns) selecionados`}
                {step === 'checkout' &&
                  `Notificação automática para ${STORE_CONFIG.sellerEmail}`}
                {step === 'success' && 'Recebemos os dados da sua encomenda'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar sacola"
            className="p-2 rounded-full hover:bg-white/15 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#F4F6FA] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                    Sua sacola está vazia
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-xs">
                    Explore os 345 times do catálogo, veja as fotos reais dos modelos e monte o seu manto sob encomenda.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-5 px-6 py-3 rounded-full bg-[#020F4A] hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer"
                  >
                    Explorar Catálogo
                  </button>
                </div>
              ) : (
                <ul className="space-y-3.5">
                  {items.map((item) => (
                    <li
                      key={item.cartItemId}
                      className="rounded-2xl border border-slate-200 p-3.5 bg-white flex gap-3.5 shadow-xs"
                    >
                      {item.selectedPhotoUrl ? (
                        <img
                          src={item.selectedPhotoUrl}
                          alt={item.teamName}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-2xl object-cover bg-[#F4F6FA] border border-slate-200 shrink-0"
                        />
                      ) : (
                        <img
                          src={item.crest}
                          alt={item.teamName}
                          className="w-16 h-16 rounded-full object-contain p-1.5 bg-[#F4F6FA] border border-slate-200 shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display text-lg font-extrabold uppercase text-[#020F4A] leading-tight">
                              {item.teamName}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {item.leagueName}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartItemId)}
                            aria-label={`Remover ${item.teamName}`}
                            className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#020F4A] text-white font-bold">
                            {item.version === 'jogador' ? 'Jogador' : 'Torcedor'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#F4F6FA] text-[#020F4A] font-bold">
                            Tam: {item.size}
                          </span>
                          {item.hasPersonalization && (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#020F4A] font-bold">
                              {item.customName} #{item.customNumber} (+R$30)
                            </span>
                          )}
                          {item.hasPatch && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#020F4A] font-bold">
                              {item.patchName} (+R$20)
                            </span>
                          )}
                        </div>

                        {item.modelNote && (
                          <p className="text-xs text-slate-600 mt-1.5">
                            <strong>Modelo:</strong> {item.modelNote}
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-slate-200 rounded-full overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.cartItemId, -1)}
                              aria-label="Diminuir"
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-extrabold text-[#020F4A]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.cartItemId, 1)}
                              aria-label="Aumentar"
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-display text-xl font-extrabold text-[#020F4A]">
                            {formatBRL(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-200 p-5 bg-[#F4F6FA] space-y-3 shrink-0">
                {/* Discount Coupon Input */}
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Cupom de desconto (ex: DIDIER10)"
                        className="w-full h-9 pl-8 pr-3 rounded-full border border-slate-300 bg-white text-xs font-bold uppercase focus:outline-none focus:border-[#020F4A]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 h-9 rounded-full bg-[#020F4A] hover:bg-[#0A1F7A] text-white text-xs font-extrabold uppercase cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponMsg && (
                    <p
                      className={`text-[11px] font-bold px-2 ${
                        appliedCoupon ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {couponMsg}
                    </p>
                  )}
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Desconto ({appliedCoupon?.code})</span>
                    <span>- {formatBRL(discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">
                    Total da Encomenda
                  </span>
                  <span className="font-display text-3xl font-extrabold text-[#020F4A]">
                    {formatBRL(finalTotal)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full h-12 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] font-extrabold text-sm uppercase tracking-wide inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  Finalizar Encomenda
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: CHECKOUT FORM */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="rounded-2xl bg-[#020F4A]/5 border border-[#020F4A]/15 p-3.5 text-xs text-[#020F4A] flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#DFA902] shrink-0 mt-0.5" />
                <p>
                  Ao confirmar, sua encomenda será enviada automaticamente por e-mail para o vendedor oficial da <strong>DIDIER IMPORTS</strong> ({STORE_CONFIG.sellerEmail}) com todos os itens escolhidos.
                </p>
              </div>

              {errorMsg && (
                <div className="rounded-2xl bg-amber-50 border border-amber-300 p-3 text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A]">
                  Dados do Comprador
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({ ...customer, fullName: e.target.value })
                    }
                    placeholder="Seu nome completo"
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp (com DDD) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.whatsapp}
                      onChange={(e) =>
                        setCustomer({ ...customer, whatsapp: e.target.value })
                      }
                      placeholder="(86) 99999-9999"
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) =>
                        setCustomer({ ...customer, email: e.target.value })
                      }
                      placeholder="seu@email.com"
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A]">
                  Endereço para Entrega
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cidade / Estado *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.cityState}
                      onChange={(e) =>
                        setCustomer({ ...customer, cityState: e.target.value })
                      }
                      placeholder="Ex: Teresina - PI"
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={customer.zipCode}
                      onChange={(e) =>
                        setCustomer({ ...customer, zipCode: e.target.value })
                      }
                      placeholder="00000-000"
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.neighborhood}
                    onChange={(e) =>
                      setCustomer({ ...customer, neighborhood: e.target.value })
                    }
                    placeholder="Nome do bairro"
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rua, número e complemento *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                    placeholder="Ex: Rua Exemplo, 123, Apto 402"
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A]">
                  Forma de Pagamento Preferida
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    [
                      'Pix',
                      'Cartão de Crédito (Link)',
                      'Combinar com o vendedor',
                    ] as const
                  ).map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-sm font-semibold ${
                        customer.paymentMethod === method
                          ? 'border-[#020F4A] bg-[#020F4A]/5 text-[#020F4A]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={customer.paymentMethod === method}
                        onChange={() =>
                          setCustomer({ ...customer, paymentMethod: method })
                        }
                        className="accent-[#020F4A]"
                      />
                      {method}
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Observações extras (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer({ ...customer, notes: e.target.value })
                    }
                    placeholder="Ex: Preferência de horário para entrega, detalhes extras do modelo..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 p-5 bg-[#F4F6FA] space-y-3 shrink-0">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600">
                  Total ({items.reduce((a, b) => a + b.quantity, 0)} peça(s))
                </span>
                <span className="font-display text-3xl font-extrabold text-[#020F4A]">
                  {formatBRL(finalTotal)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] disabled:opacity-60 text-[#020F4A] font-extrabold text-sm uppercase tracking-wide inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando pedido ao vendedor...
                  </>
                ) : (
                  <>
                    Confirmar Encomenda Agora
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && completedOrder && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="text-center pt-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#020F4A] text-[#F4BE0B] text-xs font-extrabold uppercase tracking-wider">
                  Pedido #{completedOrder.orderId}
                </span>
                <h3 className="font-display text-3xl font-extrabold uppercase text-[#020F4A] mt-2">
                  Encomenda Registrada!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Obrigado, <strong>{completedOrder.customer.fullName}</strong>! O vendedor da DIDIER IMPORTS recebeu os detalhes para providenciar sua encomenda.
                </p>
              </div>

              <div
                className={`rounded-2xl p-3.5 text-xs border flex items-start gap-2.5 ${
                  completedOrder.emailDispatched
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {completedOrder.emailDispatched ? (
                    <p>
                      <strong>Notificação enviada por e-mail!</strong> Todos os dados da sua compra foram encaminhados automaticamente para{' '}
                      <strong>{STORE_CONFIG.sellerEmail}</strong>.
                    </p>
                  ) : (
                    <p>
                      <strong>Pedido salvo!</strong> Você também pode enviar o resumo direto no WhatsApp do vendedor abaixo para agilizar sua encomenda.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 bg-[#F4F6FA] space-y-2.5 text-xs">
                <p className="font-extrabold uppercase text-[#020F4A]">
                  Resumo dos Itens
                </p>
                {completedOrder.items.map((it) => (
                  <div
                    key={it.cartItemId}
                    className="flex justify-between gap-2 pb-2 border-b border-slate-200 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-bold text-[#020F4A]">
                        {it.quantity}x {it.teamName} ({it.version === 'jogador' ? 'Jogador' : 'Torcedor'} · {it.size})
                      </p>
                      <p className="text-slate-600">{it.modelNote}</p>
                      {it.hasPersonalization && (
                        <p className="text-[#020F4A] font-semibold">
                          Personalização (+R$ 30): {it.customName} #{it.customNumber}
                        </p>
                      )}
                      {it.hasPatch && (
                        <p className="text-[#B88600] font-semibold">
                          Patch (+R$ 20): {it.patchName}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-[#020F4A] shrink-0">
                      {formatBRL(it.unitPrice * it.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-extrabold text-[#020F4A]">
                  <span>Total</span>
                  <span>{formatBRL(completedOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <a
                href={`${STORE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  buildWhatsAppOrderMessage(completedOrder)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wide inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp {STORE_CONFIG.whatsappDisplay}
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="w-full h-11 rounded-full bg-[#020F4A] hover:bg-[#0A1F7A] text-white font-bold text-xs uppercase tracking-wide cursor-pointer"
              >
                Continuar Navegando no Catálogo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
