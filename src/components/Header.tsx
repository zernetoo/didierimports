'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  MessageCircle,
  ClipboardList,
  X,
  Ruler,
  Sparkles,
} from 'lucide-react';
import { LEAGUES, STORE_CONFIG, TEAMS, TeamCatalogItem } from '@/data/catalog';
import { formatBRL } from '@/types/store';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLeague: string;
  onSelectLeague: (leagueId: string) => void;
  onSelectTeam: (team: TeamCatalogItem) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  ordersCount: number;
  onOpenOrders: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  selectedLeague,
  onSelectLeague,
  onSelectTeam,
  cartCount,
  cartTotal,
  onOpenCart,
  ordersCount,
  onOpenOrders,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const quickResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return TEAMS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.leagueName.toLowerCase().includes(q) ||
        t.sport.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToCatalog = (leagueId: string) => {
    onSelectLeague(leagueId);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      {/* Top Utility Strip */}
      <div className="bg-[#03092B] text-white/90 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <span className="font-bold text-[#F4BE0B] tracking-wide uppercase">
              Vendas sob encomenda
            </span>
            <span className="hidden lg:inline text-white/35">|</span>
            <span className="hidden lg:inline text-white/80">
              Torcedor R$ 160 · Jogador R$ 200 · Personalização +R$ 30 · Patch +R$ 20
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#simulador"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-[#F4BE0B] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4BE0B]" />
              Simulador
            </a>
            <a
              href="#tabela-medidas"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-[#F4BE0B] transition-colors"
            >
              <Ruler className="w-3.5 h-3.5 text-[#F4BE0B]" />
              Medidas
            </a>
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#F4BE0B] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{STORE_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={STORE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{STORE_CONFIG.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Signature Royal Navy Header (Centauro Structure + Didier Brand Identity) */}
      <div className="bg-[#020F4A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 md:gap-6">
          {/* Official Cutout Didier Imports Logo */}
          <a
            href="#inicio"
            onClick={() => onSelectLeague('todos')}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="DIDIER IMPORTS - Página Inicial"
          >
            <img
              src="/logo-didier.png"
              alt="DIDIER IMPORTS"
              className="h-11 sm:h-13 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
            />
          </a>

          {/* Live Search Bar */}
          <div
            ref={searchBoxRef}
            className="relative order-3 md:order-2 w-full md:flex-1 max-w-2xl"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#020F4A]/60 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setDropdownOpen(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setDropdownOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setDropdownOpen(false);
                    const el = document.getElementById('catalogo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder="Qual manto você procura? Ex: Flamengo, Real Madrid, Brasil, Lakers..."
                aria-label="Buscar time, seleção ou franquia NBA"
                className="w-full h-11 pl-11 pr-10 rounded-full bg-white text-[#061036] placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F4BE0B] shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Limpar busca"
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Autocomplete Dropdown */}
            {dropdownOpen && quickResults.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white text-[#061036] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <div className="px-4 py-2.5 bg-[#F4F6FA] text-[11px] font-bold uppercase tracking-wider text-slate-500 flex justify-between">
                  <span>Resultados rápidos</span>
                  <span>Clique para ver fotos & encomendar</span>
                </div>
                <ul className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {quickResults.map((team) => (
                    <li key={team.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          onSelectTeam(team);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F4F6FA] transition-colors text-left cursor-pointer"
                      >
                        <img
                          src={team.crest}
                          alt={team.name}
                          className="w-10 h-10 rounded-full object-contain p-1 shrink-0 bg-[#F4F6FA] border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#061036] truncate">
                            {team.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {team.leagueName} · {team.modelCount} {team.modelCount === 1 ? 'modelo' : 'modelos'}
                            {team.jogadorCount > 0 ? ` (${team.jogadorCount} Jogador)` : ''}
                          </p>
                        </div>
                        <span className="text-xs font-extrabold text-[#020F4A] bg-[#F4BE0B]/20 px-2.5 py-1 rounded-full shrink-0">
                          R$ 160
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="order-2 md:order-3 flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenOrders}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-white/10 transition-colors text-xs sm:text-sm font-semibold cursor-pointer"
              title="Meus pedidos realizados"
            >
              <ClipboardList className="w-5 h-5 text-[#F4BE0B]" />
              <span className="hidden lg:inline">Pedidos</span>
              {ordersCount > 0 && (
                <span className="bg-[#F4BE0B] text-[#020F4A] text-[11px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {ordersCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Abrir sacola de encomendas"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] transition-colors font-extrabold text-sm cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[10px] text-[#020F4A]/75 uppercase font-bold">
                  Sacola
                </span>
                <span className="text-xs font-extrabold mt-0.5">
                  {cartCount > 0 ? formatBRL(cartTotal) : 'Vazia'}
                </span>
              </div>
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#020F4A] text-white text-[11px] font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Crisp White Department Navigation Bar */}
      <nav
        aria-label="Departamentos e campeonatos"
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar h-11">
          <button
            type="button"
            onClick={() => scrollToCatalog('todos')}
            className={`px-3 h-full text-xs font-extrabold uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
              selectedLeague === 'todos'
                ? 'border-[#020F4A] text-[#020F4A]'
                : 'border-transparent text-slate-700 hover:text-[#020F4A]'
            }`}
          >
            Todos (345)
          </button>
          <button
            type="button"
            onClick={() => scrollToCatalog('destaques')}
            className={`px-3 h-full text-xs font-extrabold uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
              selectedLeague === 'destaques'
                ? 'border-[#DFA902] text-[#020F4A]'
                : 'border-transparent text-[#B88600] hover:text-[#020F4A]'
            }`}
          >
            Top Vendidas
          </button>
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              type="button"
              onClick={() => scrollToCatalog(league.id)}
              className={`px-2.5 h-full text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                selectedLeague === league.id
                  ? 'border-[#020F4A] text-[#020F4A] font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-[#020F4A]'
              }`}
            >
              {league.shortName}
            </button>
          ))}
          <a
            href="#simulador"
            className="px-2.5 h-full inline-flex items-center text-xs font-bold whitespace-nowrap text-[#020F4A] hover:text-[#DFA902] border-b-2 border-transparent"
          >
            Simulador
          </a>
          <a
            href="#tabela-medidas"
            className="px-2.5 h-full inline-flex items-center text-xs font-semibold whitespace-nowrap text-slate-600 hover:text-[#020F4A] border-b-2 border-transparent"
          >
            Medidas
          </a>
          <a
            href="#cuidados"
            className="px-2.5 h-full inline-flex items-center text-xs font-semibold whitespace-nowrap text-slate-600 hover:text-[#020F4A] border-b-2 border-transparent"
          >
            Cuidados
          </a>
        </div>
      </nav>
    </header>
  );
}
