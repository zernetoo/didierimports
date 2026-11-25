import { STORE_CONFIG } from '@/data/catalog';
import {
  AdminOrder,
  Coupon,
  CustomModelRecord,
  DEFAULT_COUPONS,
  DEFAULT_PRICING_SETTINGS,
  NewCustomModelInput,
  OrderStatus,
  StorePricingSettings,
} from '@/types/admin';
import { CartItem, SavedOrder } from '@/types/store';

const KEYS = {
  ORDERS: 'didier_admin_orders_v1',
  PRICING: 'didier_admin_pricing_v1',
  CUSTOM_MODELS: 'didier_admin_custom_models_v1',
  HIDDEN_MODELS: 'didier_admin_hidden_models_v1',
  COUPONS: 'didier_admin_coupons_v1',
  SESSION: 'didier_admin_session_v1',
  LEGACY_ORDERS: 'didier_imports_orders_v1',
} as const;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function isCloudDbConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export const ADMIN_AUTH = {
  email: STORE_CONFIG.sellerEmail,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'didier2026',
};

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEYS.SESSION) === ADMIN_AUTH.email;
}

export function loginAdmin(email: string, password: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_AUTH.email.toLowerCase() && password === ADMIN_AUTH.password) {
    localStorage.setItem(KEYS.SESSION, ADMIN_AUTH.email);
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEYS.SESSION);
}

// Pricing Settings
export function loadPricingSettings(): StorePricingSettings {
  if (typeof window === 'undefined') return DEFAULT_PRICING_SETTINGS;
  try {
    const raw = localStorage.getItem(KEYS.PRICING);
    if (!raw) return DEFAULT_PRICING_SETTINGS;
    return { ...DEFAULT_PRICING_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PRICING_SETTINGS;
  }
}

export function savePricingSettings(settings: StorePricingSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.PRICING, JSON.stringify(settings));
  syncCloudTable('store_settings', { id: 'pricing', payload: settings });
}

export function computeOrderCost(
  items: CartItem[],
  pricing: StorePricingSettings
): number {
  return items.reduce((sum, item) => {
    const baseCost =
      item.version === 'jogador' ? pricing.costJogador : pricing.costTorcedor;
    const persCost = item.hasPersonalization ? pricing.costPersonalizacao : 0;
    const patchCost = item.hasPatch ? pricing.costPatch : 0;
    return sum + (baseCost + persCost + patchCost) * item.quantity;
  }, 0);
}

// Orders
export function loadAdminOrders(): AdminOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.ORDERS);
    const adminOrders: AdminOrder[] = raw ? JSON.parse(raw) : [];
    const legacyRaw = localStorage.getItem(KEYS.LEGACY_ORDERS);
    const legacyOrders: SavedOrder[] = legacyRaw ? JSON.parse(legacyRaw) : [];

    // Merge any storefront orders that aren't in adminOrders yet
    const existingIds = new Set(adminOrders.map((o) => o.orderId));
    const pricing = loadPricingSettings();
    let merged = [...adminOrders];
    let changed = false;

    for (const lo of legacyOrders) {
      if (!existingIds.has(lo.orderId)) {
        merged.unshift({
          ...lo,
          status: 'novo',
          estimatedCost: computeOrderCost(lo.items, pricing),
        });
        changed = true;
      }
    }

    if (changed) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(merged));
    }

    return merged.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export function saveAdminOrders(orders: AdminOrder[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
}

export function recordStorefrontOrder(
  order: SavedOrder,
  discountAmount = 0,
  couponCode = ''
): AdminOrder {
  const pricing = loadPricingSettings();
  const adminOrder: AdminOrder = {
    ...order,
    status: 'novo',
    estimatedCost: computeOrderCost(order.items, pricing),
    discountAmount: discountAmount || undefined,
    couponCode: couponCode || undefined,
  };
  const current = loadAdminOrders();
  const updated = [adminOrder, ...current.filter((o) => o.orderId !== order.orderId)];
  saveAdminOrders(updated);
  syncCloudTable('orders', {
    order_id: adminOrder.orderId,
    status: adminOrder.status,
    total: adminOrder.total,
    estimated_cost: adminOrder.estimatedCost,
    payload: adminOrder,
  });
  return adminOrder;
}

export function updateOrderInStore(
  orderId: string,
  patch: Partial<Pick<AdminOrder, 'status' | 'trackingCode' | 'sellerNotes'>>
): AdminOrder[] {
  const current = loadAdminOrders();
  const updated = current.map((o) =>
    o.orderId === orderId ? { ...o, ...patch } : o
  );
  saveAdminOrders(updated);
  const target = updated.find((o) => o.orderId === orderId);
  if (target) {
    syncCloudTable('orders', {
      order_id: target.orderId,
      status: target.status,
      total: target.total,
      estimated_cost: target.estimatedCost,
      payload: target,
    });
  }
  return updated;
}

export function deleteOrderFromStore(orderId: string): AdminOrder[] {
  const updated = loadAdminOrders().filter((o) => o.orderId !== orderId);
  saveAdminOrders(updated);
  return updated;
}

// Custom Models (Added by seller in /admin)
export function loadCustomModels(): CustomModelRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.CUSTOM_MODELS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCustomModel(input: NewCustomModelInput): CustomModelRecord[] {
  const record: CustomModelRecord = {
    teamId: input.teamId,
    createdAt: new Date().toISOString(),
    model: {
      id: `custom-${Date.now()}`,
      title: input.title.trim().toUpperCase(),
      version: input.version,
      category: input.category,
      allowsPersonalization: input.allowsPersonalization,
      allowsPatch: input.allowsPatch,
      photos: input.photos,
    },
  };
  const updated = [record, ...loadCustomModels()];
  localStorage.setItem(KEYS.CUSTOM_MODELS, JSON.stringify(updated));
  syncCloudTable('custom_models', {
    id: record.model.id,
    team_id: record.teamId,
    payload: record,
  });
  return updated;
}

export function deleteCustomModel(modelId: string): CustomModelRecord[] {
  const updated = loadCustomModels().filter((c) => c.model.id !== modelId);
  localStorage.setItem(KEYS.CUSTOM_MODELS, JSON.stringify(updated));
  return updated;
}

// Hidden / Paused Models (key format: `${teamId}:${modelId}`)
export function loadHiddenModels(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.HIDDEN_MODELS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleHiddenModel(teamId: string, modelId: string): string[] {
  const key = `${teamId}:${modelId}`;
  const current = loadHiddenModels();
  const updated = current.includes(key)
    ? current.filter((k) => k !== key)
    : [...current, key];
  localStorage.setItem(KEYS.HIDDEN_MODELS, JSON.stringify(updated));
  return updated;
}

// Coupons
export function loadCoupons(): Coupon[] {
  if (typeof window === 'undefined') return DEFAULT_COUPONS;
  try {
    const raw = localStorage.getItem(KEYS.COUPONS);
    return raw ? JSON.parse(raw) : DEFAULT_COUPONS;
  } catch {
    return DEFAULT_COUPONS;
  }
}

export function saveCoupons(coupons: Coupon[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.COUPONS, JSON.stringify(coupons));
  syncCloudTable('store_settings', { id: 'coupons', payload: coupons });
}

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; discount: number; coupon?: Coupon; message: string } {
  const clean = code.trim().toUpperCase();
  if (!clean) {
    return { valid: false, discount: 0, message: 'Digite um código de cupom.' };
  }
  const coupon = loadCoupons().find(
    (c) => c.code.toUpperCase() === clean && c.active
  );
  if (!coupon) {
    return { valid: false, discount: 0, message: 'Cupom inválido ou expirado.' };
  }
  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      discount: 0,
      message: `Válido para pedidos a partir de R$ ${coupon.minOrder.toFixed(2).replace('.', ',')}.`,
    };
  }
  const discount =
    coupon.type === 'percent'
      ? Math.round((subtotal * coupon.value) / 100)
      : Math.min(subtotal, coupon.value);
  return {
    valid: true,
    discount,
    coupon,
    message: `Cupom ${coupon.code} aplicado!`,
  };
}

// Optional non-blocking Supabase REST upsert when env vars are provided
async function syncCloudTable(table: string, row: Record<string, unknown>) {
  if (!isCloudDbConfigured()) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(row),
    });
  } catch {
    // Fallback remains safely in localStorage
  }
}

// Realistic Demo Data Generator (for showing the Financial & Orders panel to leads!)
export function seedDemoOrders(): AdminOrder[] {
  const now = Date.now();
  const day = 86400000;
  const pricing = loadPricingSettings();

  const samples: Array<{
    id: string;
    daysAgo: number;
    status: OrderStatus;
    name: string;
    whatsapp: string;
    city: string;
    payment: 'Pix' | 'Cartão de Crédito (Link)' | 'Combinar com o vendedor';
    tracking?: string;
    items: CartItem[];
  }> = [
    {
      id: 'DI-842101',
      daysAgo: 0,
      status: 'novo',
      name: 'Lucas Ferreira',
      whatsapp: '(86) 99812-3401',
      city: 'Teresina - PI',
      payment: 'Pix',
      items: [
        {
          cartItemId: 'demo-1',
          teamId: 'flamengo',
          teamName: 'Flamengo',
          leagueName: 'Campeonato Brasileiro',
          sport: 'futebol',
          crest: '/crests-v3/flamengo.png',
          version: 'jogador',
          size: 'G',
          modelNote: 'JOGADOR 2026 VISITANTE',
          hasPersonalization: true,
          customName: 'PEDRO',
          customNumber: '9',
          hasPatch: true,
          patchName: 'Patch Brasileirão',
          quantity: 1,
          unitPrice: 250,
        },
      ],
    },
    {
      id: 'DI-841944',
      daysAgo: 1,
      status: 'encomendado',
      name: 'Gabriel Costa',
      whatsapp: '(86) 99401-8822',
      city: 'Teresina - PI',
      payment: 'Pix',
      items: [
        {
          cartItemId: 'demo-2',
          teamId: 'real-madrid',
          teamName: 'Real Madrid',
          leagueName: 'Campeonato Espanhol',
          sport: 'futebol',
          crest: '/crests-v3/real-madrid.png',
          version: 'jogador',
          size: 'M',
          modelNote: 'JOGADOR 26-27 CASA',
          hasPersonalization: true,
          customName: 'VINI JR',
          customNumber: '7',
          hasPatch: true,
          patchName: 'Patch Champions League',
          quantity: 1,
          unitPrice: 250,
        },
        {
          cartItemId: 'demo-3',
          teamId: 'brasil',
          teamName: 'Brasil',
          leagueName: 'Seleções Mundiais',
          sport: 'futebol',
          crest: '/crests-v3/brasil.png',
          version: 'torcedor',
          size: 'G',
          modelNote: '2026 CASA',
          hasPersonalization: false,
          customName: '',
          customNumber: '',
          hasPatch: false,
          patchName: '',
          quantity: 1,
          unitPrice: 160,
        },
      ],
    },
    {
      id: 'DI-839210',
      daysAgo: 4,
      status: 'em_transito',
      name: 'Rafael Mendes',
      whatsapp: '(86) 99934-1102',
      city: 'Parnaíba - PI',
      payment: 'Cartão de Crédito (Link)',
      tracking: 'BR884129044CN',
      items: [
        {
          cartItemId: 'demo-4',
          teamId: 'corinthians',
          teamName: 'Corinthians',
          leagueName: 'Campeonato Brasileiro',
          sport: 'futebol',
          crest: '/crests-v3/corinthians.png',
          version: 'torcedor',
          size: 'GG',
          modelNote: '2026 CASA',
          hasPersonalization: true,
          customName: 'MEMPHIS',
          customNumber: '10',
          hasPatch: false,
          patchName: '',
          quantity: 2,
          unitPrice: 190,
        },
      ],
    },
    {
      id: 'DI-835780',
      daysAgo: 9,
      status: 'entregue',
      name: 'Thiago Alves',
      whatsapp: '(86) 99455-7719',
      city: 'Teresina - PI',
      payment: 'Pix',
      tracking: 'BR772019442CN',
      items: [
        {
          cartItemId: 'demo-5',
          teamId: 'los-angeles-lakers',
          teamName: 'Los Angeles Lakers',
          leagueName: 'NBA — Conferência Oeste',
          sport: 'nba',
          crest: '/crests-v3/los-angeles-lakers.png',
          version: 'torcedor',
          size: 'G',
          modelNote: 'ASSOCIATION',
          hasPersonalization: false,
          customName: '',
          customNumber: '',
          hasPatch: false,
          patchName: '',
          quantity: 1,
          unitPrice: 160,
        },
        {
          cartItemId: 'demo-6',
          teamId: 'flamengo',
          teamName: 'Flamengo',
          leagueName: 'Campeonato Brasileiro',
          sport: 'futebol',
          crest: '/crests-v3/flamengo.png',
          version: 'torcedor',
          size: 'M',
          modelNote: '2026 ALTERNATIVA',
          hasPersonalization: false,
          customName: '',
          customNumber: '',
          hasPatch: true,
          patchName: 'Patch Libertadores',
          quantity: 1,
          unitPrice: 180,
        },
      ],
    },
    {
      id: 'DI-829104',
      daysAgo: 18,
      status: 'entregue',
      name: 'Matheus Oliveira',
      whatsapp: '(98) 98842-6509',
      city: 'Timon - MA',
      payment: 'Pix',
      tracking: 'BR661830219CN',
      items: [
        {
          cartItemId: 'demo-7',
          teamId: 'palmeiras',
          teamName: 'Palmeiras',
          leagueName: 'Campeonato Brasileiro',
          sport: 'futebol',
          crest: '/crests-v3/palmeiras.png',
          version: 'jogador',
          size: 'G',
          modelNote: 'JOGADOR 2026 CASA',
          hasPersonalization: true,
          customName: 'ESTEVAO',
          customNumber: '41',
          hasPatch: true,
          patchName: 'Patch Brasileirão',
          quantity: 1,
          unitPrice: 250,
        },
      ],
    },
    {
      id: 'DI-812450',
      daysAgo: 35,
      status: 'entregue',
      name: 'Pedro Henrique',
      whatsapp: '(86) 99123-4900',
      city: 'Teresina - PI',
      payment: 'Cartão de Crédito (Link)',
      items: [
        {
          cartItemId: 'demo-8',
          teamId: 'barcelona',
          teamName: 'Barcelona',
          leagueName: 'Campeonato Espanhol',
          sport: 'futebol',
          crest: '/crests-v3/barcelona.png',
          version: 'jogador',
          size: 'M',
          modelNote: 'JOGADOR 25-26 CASA',
          hasPersonalization: true,
          customName: 'LAMINE YAMAL',
          customNumber: '19',
          hasPatch: true,
          patchName: 'Patch LaLiga',
          quantity: 2,
          unitPrice: 250,
        },
      ],
    },
    {
      id: 'DI-798312',
      daysAgo: 52,
      status: 'entregue',
      name: 'Bruno Carvalho',
      whatsapp: '(86) 99801-7321',
      city: 'Teresina - PI',
      payment: 'Pix',
      items: [
        {
          cartItemId: 'demo-9',
          teamId: 'flamengo',
          teamName: 'Flamengo',
          leagueName: 'Campeonato Brasileiro',
          sport: 'futebol',
          crest: '/crests-v3/flamengo.png',
          version: 'torcedor',
          size: 'G',
          modelNote: '2025 CASA',
          hasPersonalization: true,
          customName: 'ARRASCAETA',
          customNumber: '10',
          hasPatch: false,
          patchName: '',
          quantity: 2,
          unitPrice: 190,
        },
      ],
    },
  ];

  const demoOrders: AdminOrder[] = samples.map((s) => {
    const total = s.items.reduce((a, b) => a + b.unitPrice * b.quantity, 0);
    return {
      orderId: s.id,
      createdAt: new Date(now - s.daysAgo * day).toISOString(),
      status: s.status,
      trackingCode: s.tracking,
      emailDispatched: true,
      total,
      estimatedCost: computeOrderCost(s.items, pricing),
      customer: {
        fullName: s.name,
        whatsapp: s.whatsapp,
        email: '',
        cityState: s.city,
        neighborhood: 'Centro',
        address: 'Rua Exemplo, 420',
        zipCode: '64000-000',
        paymentMethod: s.payment,
        notes: '',
      },
      items: s.items,
    };
  });

  const existing = loadAdminOrders();
  const existingIds = new Set(existing.map((o) => o.orderId));
  const merged = [...existing, ...demoOrders.filter((d) => !existingIds.has(d.orderId))];
  saveAdminOrders(merged);
  return loadAdminOrders();
}

export function clearAllAdminOrders(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
}

export function exportOrdersToCSV(orders: AdminOrder[]): void {
  const header = [
    'Pedido',
    'Data',
    'Status',
    'Cliente',
    'WhatsApp',
    'Cidade',
    'Pagamento',
    'Qtd Pecas',
    'Itens',
    'Faturamento (R$)',
    'Custo Fornecedor (R$)',
    'Lucro Liquido (R$)',
    'Rastreio',
  ];

  const rows = orders.map((o) => {
    const qty = o.items.reduce((a, b) => a + b.quantity, 0);
    const itemsDesc = o.items
      .map(
        (i) =>
          `${i.quantity}x ${i.teamName} (${i.version} ${i.size} - ${i.modelNote})`
      )
      .join(' | ');
    const profit = o.status === 'cancelado' ? 0 : o.total - o.estimatedCost;
    return [
      o.orderId,
      new Date(o.createdAt).toLocaleDateString('pt-BR'),
      o.status,
      o.customer.fullName,
      o.customer.whatsapp,
      o.customer.cityState,
      o.customer.paymentMethod,
      String(qty),
      itemsDesc,
      o.total.toFixed(2),
      o.estimatedCost.toFixed(2),
      profit.toFixed(2),
      o.trackingCode || '',
    ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`);
  });

  const csv = [header.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `didier-imports-vendas-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
