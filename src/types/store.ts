import { SportType } from '@/data/catalog';

export type JerseyVersion = 'torcedor' | 'jogador';

export interface CartItem {
  cartItemId: string;
  teamId: string;
  teamName: string;
  leagueName: string;
  sport: SportType;
  crest: string;
  selectedPhotoUrl?: string;
  version: JerseyVersion;
  size: string;
  modelNote: string;
  hasPersonalization: boolean;
  customName: string;
  customNumber: string;
  hasPatch: boolean;
  patchName: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerOrderData {
  fullName: string;
  whatsapp: string;
  email: string;
  cityState: string;
  neighborhood: string;
  address: string;
  zipCode: string;
  paymentMethod: 'Pix' | 'Cartão de Crédito (Link)' | 'Combinar com o vendedor';
  notes: string;
}

export interface SavedOrder {
  orderId: string;
  createdAt: string;
  customer: CustomerOrderData;
  items: CartItem[];
  total: number;
  emailDispatched: boolean;
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function calculateUnitPrice(
  version: JerseyVersion,
  hasPersonalization: boolean,
  hasPatch: boolean
): number {
  const base = version === 'jogador' ? 200 : 160;
  const pers = hasPersonalization ? 30 : 0;
  const patch = hasPatch ? 20 : 0;
  return base + pers + patch;
}

export function buildWhatsAppOrderMessage(order: SavedOrder): string {
  const lines: string[] = [
    `Olá *DIDIER IMPORTS*! Acabei de fazer uma encomenda pelo site:`,
    ``,
    `*Pedido:* #${order.orderId}`,
    `*Cliente:* ${order.customer.fullName}`,
    `*WhatsApp:* ${order.customer.whatsapp}`,
    order.customer.email ? `*E-mail:* ${order.customer.email}` : '',
    `*Entrega:* ${order.customer.address}, ${order.customer.neighborhood} - ${order.customer.cityState}${order.customer.zipCode ? ` (CEP: ${order.customer.zipCode})` : ''}`,
    `*Pagamento preferido:* ${order.customer.paymentMethod}`,
    ``,
    `*ITENS DO PEDIDO:*`,
  ].filter(Boolean);

  order.items.forEach((item, idx) => {
    const versionLabel = item.version === 'jogador' ? 'Versão Jogador' : 'Versão Torcedor';
    const extras: string[] = [];
    if (item.hasPersonalization) {
      extras.push(`Personalização (+R$ 30): ${item.customName || 'Sem nome'} #${item.customNumber || '-'}`);
    }
    if (item.hasPatch) {
      extras.push(`Patch (+R$ 20): ${item.patchName || 'Patch Oficial'}`);
    }
    lines.push(
      `${idx + 1}. *${item.teamName}* (${item.leagueName}) — ${versionLabel} | Tam: ${item.size} | Qtd: ${item.quantity}`
    );
    if (item.modelNote) {
      lines.push(`   Modelo escolhido: ${item.modelNote}`);
    }
    if (extras.length > 0) {
      lines.push(`   Adicionais: ${extras.join(' + ')}`);
    }
    lines.push(`   Subtotal: ${formatBRL(item.unitPrice * item.quantity)}`);
  });

  lines.push(``);
  lines.push(`*TOTAL DO PEDIDO: ${formatBRL(order.total)}*`);
  if (order.customer.notes) {
    lines.push(`*Observações:* ${order.customer.notes}`);
  }

  return lines.join('\n');
}
