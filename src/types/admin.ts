import { ModelCategory, JerseyModel } from '@/data/catalog';
import { CartItem, CustomerOrderData, SavedOrder } from '@/types/store';

export type OrderStatus =
  | 'novo'
  | 'encomendado'
  | 'em_transito'
  | 'entregue'
  | 'cancelado';

export const ORDER_STATUS_META: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string; whatsappMsg: string }
> = {
  novo: {
    label: 'Novo Pedido',
    bg: 'bg-amber-100',
    text: 'text-amber-900',
    dot: 'bg-amber-500',
    whatsappMsg: 'recebemos o seu pedido e já estamos conferindo os detalhes!',
  },
  encomendado: {
    label: 'Encomendado',
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    dot: 'bg-blue-600',
    whatsappMsg:
      'sua encomenda já foi confirmada junto ao nosso fornecedor! Assim que sair para envio avisaremos aqui.',
  },
  em_transito: {
    label: 'Em Trânsito',
    bg: 'bg-indigo-100',
    text: 'text-indigo-900',
    dot: 'bg-indigo-600',
    whatsappMsg:
      'ótimas notícias! Seu manto já está em trânsito e logo chega para entrega.',
  },
  entregue: {
    label: 'Entregue',
    bg: 'bg-emerald-100',
    text: 'text-emerald-900',
    dot: 'bg-emerald-600',
    whatsappMsg:
      'seu pedido foi entregue! Muito obrigado por comprar com a DIDIER IMPORTS. Qualquer coisa estamos à disposição!',
  },
  cancelado: {
    label: 'Cancelado',
    bg: 'bg-red-100',
    text: 'text-red-900',
    dot: 'bg-red-600',
    whatsappMsg:
      'seu pedido foi cancelado conforme combinado. Se quiser fazer uma nova encomenda, estamos por aqui!',
  },
};

export interface AdminOrder extends SavedOrder {
  status: OrderStatus;
  estimatedCost: number;
  discountAmount?: number;
  couponCode?: string;
  trackingCode?: string;
  sellerNotes?: string;
}

export interface StorePricingSettings {
  torcedor: number;
  jogador: number;
  personalizacao: number;
  patch: number;
  costTorcedor: number;
  costJogador: number;
  costPersonalizacao: number;
  costPatch: number;
}

export const DEFAULT_PRICING_SETTINGS: StorePricingSettings = {
  torcedor: 160,
  jogador: 200,
  personalizacao: 30,
  patch: 20,
  costTorcedor: 82,
  costJogador: 105,
  costPersonalizacao: 15,
  costPatch: 8,
};

export interface CustomModelRecord {
  teamId: string;
  model: JerseyModel;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder: number;
  active: boolean;
  description: string;
}

export const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 'cp-bemvindo',
    code: 'DIDIER10',
    type: 'percent',
    value: 10,
    minOrder: 160,
    active: true,
    description: '10% de desconto na primeira encomenda',
  },
  {
    id: 'cp-combo',
    code: 'MANTO20',
    type: 'fixed',
    value: 20,
    minOrder: 300,
    active: true,
    description: 'R$ 20 OFF em pedidos acima de R$ 300',
  },
];

export interface NewCustomModelInput {
  teamId: string;
  title: string;
  version: 'torcedor' | 'jogador';
  category: ModelCategory;
  allowsPersonalization: boolean;
  allowsPatch: boolean;
  photos: string[];
}

export interface ManualOrderInput {
  customer: CustomerOrderData;
  items: CartItem[];
  status: OrderStatus;
  discountAmount?: number;
  couponCode?: string;
  sellerNotes?: string;
}
