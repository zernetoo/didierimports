'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  ClipboardList,
  Package,
  Tag,
  LogOut,
  ExternalLink,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { JerseyModel } from '@/data/catalog';
import {
  AdminOrder,
  Coupon,
  CustomModelRecord,
  DEFAULT_COUPONS,
  DEFAULT_PRICING_SETTINGS,
  NewCustomModelInput,
  StorePricingSettings,
} from '@/types/admin';
import {
  addCustomModel,
  clearAllAdminOrders,
  deleteCustomModel,
  deleteOrderFromStore,
  loadAdminOrders,
  loadCoupons,
  loadCustomModels,
  loadHiddenModels,
  loadPricingSettings,
  logoutAdmin,
  saveAdminOrders,
  saveCoupons,
  savePricingSettings,
  seedDemoOrders,
  toggleHiddenModel,
  updateOrderInStore,
} from '@/lib/store-db';
import { FinancialTab } from '@/components/admin/FinancialTab';
import { OrdersTab } from '@/components/admin/OrdersTab';
import { ProductsTab } from '@/components/admin/ProductsTab';
import { CouponsTab } from '@/components/admin/CouponsTab';

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminTab = 'financeiro' | 'pedidos' | 'produtos' | 'cupons';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('financeiro');
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [pricing, setPricing] = useState<StorePricingSettings>(
    DEFAULT_PRICING_SETTINGS
  );
  const [customModels, setCustomModels] = useState<CustomModelRecord[]>([]);
  const [hiddenModels, setHiddenModels] = useState<string[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [teamModelsMap, setTeamModelsMap] = useState<
    Record<string, JerseyModel[]>
  >({});

  useEffect(() => {
    setOrders(loadAdminOrders());
    setPricing(loadPricingSettings());
    setCustomModels(loadCustomModels());
    setHiddenModels(loadHiddenModels());
    setCoupons(loadCoupons());

    fetch('/data/team-models.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setTeamModelsMap(data))
      .catch(() => {});
  }, []);

  const newOrdersCount = orders.filter((o) => o.status === 'novo').length;

  const handleLoadDemo = () => {
    setOrders(seedDemoOrders());
  };

  const handleClearOrders = () => {
    if (
      window.confirm(
        'Deseja limpar todos os pedidos listados no painel (ideal após demonstração)?'
      )
    ) {
      clearAllAdminOrders();
      setOrders([]);
    }
  };

  const handleCreateManualOrder = (order: AdminOrder) => {
    const updated = [order, ...orders];
    saveAdminOrders(updated);
    setOrders(updated);
  };

  const handleUpdateOrder = (
    orderId: string,
    patch: Partial<Pick<AdminOrder, 'status' | 'trackingCode' | 'sellerNotes'>>
  ) => {
    setOrders(updateOrderInStore(orderId, patch));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(deleteOrderFromStore(orderId));
  };

  const handleSavePricing = (next: StorePricingSettings) => {
    savePricingSettings(next);
    setPricing(next);
  };

  const handleAddCustomModel = (input: NewCustomModelInput) => {
    setCustomModels(addCustomModel(input));
  };

  const handleDeleteCustomModel = (modelId: string) => {
    setCustomModels(deleteCustomModel(modelId));
  };

  const handleToggleHidden = (teamId: string, modelId: string) => {
    setHiddenModels(toggleHiddenModel(teamId, modelId));
  };

  const handleSaveCoupons = (next: Coupon[]) => {
    saveCoupons(next);
    setCoupons(next);
  };

  const handleSignOut = () => {
    logoutAdmin();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      {/* Top Brand Header */}
      <header className="bg-[#020F4A] text-white border-b-4 border-[#F4BE0B] sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo-didier.png"
              alt="DIDIER IMPORTS"
              className="h-10 w-auto object-contain shrink-0"
            />
            <div className="hidden sm:block leading-tight">
              <span className="font-display text-lg font-extrabold uppercase tracking-wide text-[#F4BE0B] block">
                Painel do Vendedor
              </span>
              <span className="text-[11px] text-white/70 block">
                heliodidier87@gmail.com
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length === 0 ? (
              <button
                type="button"
                onClick={handleLoadDemo}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] text-xs font-extrabold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Carregar Demo</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClearOrders}
                title="Zerar pedidos de teste/demonstração"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Zerar Pedidos</span>
              </button>
            )}

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <span>Ver Loja</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F4BE0B]" />
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#03092B] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
            {(
              [
                { id: 'financeiro', label: 'Painel Financeiro', icon: BarChart3 },
                {
                  id: 'pedidos',
                  label: `Pedidos & Vendas (${orders.length})`,
                  icon: ClipboardList,
                  badge: newOrdersCount,
                },
                { id: 'produtos', label: 'Produtos & Preços', icon: Package },
                { id: 'cupons', label: 'Cupons & Integração', icon: Tag },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide whitespace-nowrap inline-flex items-center gap-2 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F4BE0B] text-[#020F4A]'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {'badge' in tab && tab.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        active
                          ? 'bg-[#020F4A] text-[#F4BE0B]'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {tab.badge} novo
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Active Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'financeiro' && (
          <FinancialTab
            orders={orders}
            pricing={pricing}
            onLoadDemo={handleLoadDemo}
          />
        )}
        {activeTab === 'pedidos' && (
          <OrdersTab
            orders={orders}
            pricing={pricing}
            onUpdateOrder={handleUpdateOrder}
            onDeleteOrder={handleDeleteOrder}
            onCreateManualOrder={handleCreateManualOrder}
          />
        )}
        {activeTab === 'produtos' && (
          <ProductsTab
            pricing={pricing}
            onSavePricing={handleSavePricing}
            customModels={customModels}
            onAddCustomModel={handleAddCustomModel}
            onDeleteCustomModel={handleDeleteCustomModel}
            hiddenModels={hiddenModels}
            onToggleHiddenModel={handleToggleHidden}
            teamModelsMap={teamModelsMap}
          />
        )}
        {activeTab === 'cupons' && (
          <CouponsTab coupons={coupons} onSaveCoupons={handleSaveCoupons} />
        )}
      </main>
    </div>
  );
}
