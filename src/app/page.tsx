'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { JerseyModel, TeamCatalogItem } from '@/data/catalog';
import { CartItem, SavedOrder } from '@/types/store';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { LeagueCarousel } from '@/components/LeagueCarousel';
import {
  CatalogSection,
  CategoryFilter,
  VersionFilter,
} from '@/components/CatalogSection';
import { JerseySimulator } from '@/components/JerseySimulator';
import { JerseyModal } from '@/components/JerseyModal';
import { CartCheckoutDrawer } from '@/components/CartCheckoutDrawer';
import { InfoSections, SpecialMediaManifest } from '@/components/InfoSections';
import { OrdersModal } from '@/components/OrdersModal';
import { Footer } from '@/components/Footer';

const CART_STORAGE_KEY = 'didier_imports_cart_v2';
const ORDERS_STORAGE_KEY = 'didier_imports_orders_v1';

const EMPTY_MEDIA: SpecialMediaManifest = {
  top10: [],
  medidas: [],
  produtos: [],
  exemplos: [],
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('todos');
  const [versionFilter, setVersionFilter] = useState<VersionFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [activeTeam, setActiveTeam] = useState<TeamCatalogItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [teamModelsMap, setTeamModelsMap] = useState<
    Record<string, JerseyModel[]>
  >({});
  const [specialMedia, setSpecialMedia] =
    useState<SpecialMediaManifest>(EMPTY_MEDIA);

  // Hydrate persisted cart & orders + load structured real team models
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (rawCart) setCart(JSON.parse(rawCart));
      const rawOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (rawOrders) setOrders(JSON.parse(rawOrders));
    } catch {
      // Ignore storage errors
    }

    fetch('/data/team-models.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setTeamModelsMap(data))
      .catch(() => {});

    fetch('/data/special-media.json')
      .then((r) => (r.ok ? r.json() : EMPTY_MEDIA))
      .then((data) => setSpecialMedia(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage errors
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`${item.teamName} (${item.size}) adicionado à sacola!`);
    setCartOpen(true);
  };

  const handleUpdateQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) =>
          it.cartItemId === cartItemId
            ? { ...it, quantity: it.quantity + delta }
            : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleClearCart = () => setCart([]);

  const handleOrderSaved = (order: SavedOrder) => {
    setOrders((prev) => [order, ...prev]);
  };

  const jumpToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cart.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLeague={selectedLeague}
        onSelectLeague={setSelectedLeague}
        onSelectTeam={(team) => setActiveTeam(team)}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartOpen(true)}
        ordersCount={orders.length}
        onOpenOrders={() => setOrdersOpen(true)}
      />

      <main className="flex-1">
        <HeroBanner onSelectLeague={setSelectedLeague} />

        <LeagueCarousel
          selectedLeague={selectedLeague}
          onSelectLeague={setSelectedLeague}
        />

        <CatalogSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLeague={selectedLeague}
          onSelectLeague={setSelectedLeague}
          versionFilter={versionFilter}
          onVersionFilterChange={setVersionFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          onSelectTeam={(team) => setActiveTeam(team)}
        />

        <JerseySimulator onAddToCart={handleAddToCart} />

        <InfoSections
          specialMedia={specialMedia}
          onJumpToCatalog={jumpToCatalog}
        />
      </main>

      <Footer onSelectLeague={setSelectedLeague} />

      <JerseyModal
        team={activeTeam}
        models={activeTeam ? teamModelsMap[activeTeam.id] || [] : []}
        initialVersionFilter={versionFilter}
        initialCategoryFilter={categoryFilter}
        onClose={() => setActiveTeam(null)}
        onAddToCart={handleAddToCart}
      />

      <CartCheckoutDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSaved={handleOrderSaved}
      />

      <OrdersModal
        isOpen={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        orders={orders}
      />

      {/* Toast Notification */}
      {toast && !cartOpen && (
        <div
          role="status"
          className="fixed bottom-5 left-5 z-50 bg-[#020F4A] text-white px-4 py-3 rounded-full shadow-2xl border border-[#F4BE0B]/60 flex items-center gap-2.5 text-xs font-bold"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F4BE0B] shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
