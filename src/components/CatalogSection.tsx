'use client';

import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  ShoppingBag,
  Search,
  X,
  Flame,
  ChevronDown,
  Trophy,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  LEAGUES,
  ModelCategory,
  STORE_CONFIG,
  TEAMS,
  TeamCatalogItem,
} from '@/data/catalog';

export type VersionFilter = 'all' | 'torcedor' | 'jogador';
export type CategoryFilter = 'all' | ModelCategory;

interface CatalogSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLeague: string;
  onSelectLeague: (leagueId: string) => void;
  versionFilter: VersionFilter;
  onVersionFilterChange: (v: VersionFilter) => void;
  categoryFilter: CategoryFilter;
  onCategoryFilterChange: (c: CategoryFilter) => void;
  onSelectTeam: (team: TeamCatalogItem) => void;
}

type SortMode = 'featured' | 'az' | 'za';

const MAIN_CATEGORY_FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Todos os Tipos' },
  { id: 'jogo', label: 'Camisa de Jogo' },
  { id: 'retro', label: 'Retrô / Clássica' },
  { id: 'feminina', label: 'Feminina' },
  { id: 'infantil', label: 'Infantil / Kids' },
  { id: 'manga-longa', label: 'Manga Longa' },
  { id: 'goleiro', label: 'Goleiro' },
  { id: 'treino', label: 'Treino / Pré-Jogo' },
];

export function CatalogSection({
  searchQuery,
  onSearchChange,
  selectedLeague,
  onSelectLeague,
  versionFilter,
  onVersionFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onSelectTeam,
}: CatalogSectionProps) {
  const [sportFilter, setSportFilter] = useState<'all' | 'futebol' | 'nba'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [visibleCount, setVisibleCount] = useState(24);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeLeagueMeta = useMemo(
    () => LEAGUES.find((l) => l.id === selectedLeague) || null,
    [selectedLeague]
  );

  const teamsWithJogadorCount = useMemo(
    () => TEAMS.filter((t) => t.jogadorCount > 0).length,
    []
  );
  const teamsWithTorcedorCount = useMemo(
    () => TEAMS.filter((t) => t.torcedorCount > 0).length,
    []
  );

  const filteredTeams = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = TEAMS.filter((team) => {
      if (sportFilter !== 'all' && team.sport !== sportFilter) return false;
      if (versionFilter === 'jogador' && team.jogadorCount === 0) return false;
      if (versionFilter === 'torcedor' && team.torcedorCount === 0) return false;
      if (
        categoryFilter !== 'all' &&
        !team.categories.includes(categoryFilter)
      ) {
        return false;
      }
      if (selectedLeague === 'destaques' && !team.featured) return false;
      if (
        selectedLeague !== 'todos' &&
        selectedLeague !== 'destaques' &&
        team.leagueId !== selectedLeague
      ) {
        return false;
      }
      if (q) {
        const hay = `${team.name} ${team.leagueName} ${team.sport}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortMode === 'featured') {
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    } else if (sortMode === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    } else if (sortMode === 'za') {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
    }

    return list;
  }, [
    searchQuery,
    selectedLeague,
    sportFilter,
    versionFilter,
    categoryFilter,
    sortMode,
  ]);

  const hasAnyFilter =
    selectedLeague !== 'todos' ||
    sportFilter !== 'all' ||
    versionFilter !== 'all' ||
    categoryFilter !== 'all' ||
    searchQuery.trim().length > 0;

  const displayedTeams = hasAnyFilter
    ? filteredTeams
    : filteredTeams.slice(0, visibleCount);

  const resetFilters = () => {
    onSelectLeague('todos');
    setSportFilter('all');
    onVersionFilterChange('all');
    onCategoryFilterChange('all');
    onSearchChange('');
    setVisibleCount(24);
  };

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* REAL Version Filter (Torcedor vs Jogador) */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A] mb-2.5 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#DFA902]" />
          Versão Real da Camisa
        </h3>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'all', label: 'Todas as Versões', count: TEAMS.length, sub: '' },
            {
              id: 'torcedor',
              label: 'Versão Torcedor',
              count: teamsWithTorcedorCount,
              sub: 'R$ 160',
            },
            {
              id: 'jogador',
              label: 'Versão Jogador',
              count: teamsWithJogadorCount,
              sub: 'R$ 200',
            },
          ].map((opt) => {
            const active = versionFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onVersionFilterChange(opt.id as VersionFilter);
                  setMobileFiltersOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#020F4A] text-white'
                    : 'bg-[#F4F6FA] text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{opt.label}</span>
                  {opt.sub && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                        active
                          ? 'bg-[#F4BE0B] text-[#020F4A]'
                          : 'bg-white text-[#020F4A]'
                      }`}
                    >
                      {opt.sub}
                    </span>
                  )}
                </span>
                <span
                  className={`text-[11px] font-extrabold ${
                    active ? 'text-[#F4BE0B]' : 'text-slate-500'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* REAL Model Type Filter */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A] mb-2.5">
          Tipo de Modelo
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {MAIN_CATEGORY_FILTERS.map((cat) => {
            const active = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onCategoryFilterChange(cat.id);
                  setMobileFiltersOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#F4BE0B] text-[#020F4A]'
                    : 'bg-[#F4F6FA] text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sport filter */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A] mb-2.5">
          Modalidade
        </h3>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'all', label: 'Todos os Esportes', count: TEAMS.length },
            {
              id: 'futebol',
              label: 'Futebol (Clubes & Seleções)',
              count: TEAMS.filter((t) => t.sport === 'futebol').length,
            },
            {
              id: 'nba',
              label: 'Basquete (NBA)',
              count: TEAMS.filter((t) => t.sport === 'nba').length,
            },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSportFilter(opt.id as 'all' | 'futebol' | 'nba');
                if (opt.id !== 'all') onSelectLeague('todos');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                sportFilter === opt.id
                  ? 'bg-[#020F4A] text-white'
                  : 'bg-[#F4F6FA] text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[11px] font-extrabold ${
                  sportFilter === opt.id ? 'text-[#F4BE0B]' : 'text-slate-500'
                }`}
              >
                {opt.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* League Filter List */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A] mb-2.5">
          Campeonatos & Conferências
        </h3>
        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => {
              onSelectLeague('todos');
              setSportFilter('all');
              setMobileFiltersOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedLeague === 'todos'
                ? 'bg-[#020F4A] text-white'
                : 'text-slate-700 hover:bg-[#F4F6FA]'
            }`}
          >
            <span>Todos os Times</span>
            <span className="text-[11px] opacity-80">{TEAMS.length}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectLeague('destaques');
              setSportFilter('all');
              setMobileFiltersOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
              selectedLeague === 'destaques'
                ? 'bg-[#F4BE0B] text-[#020F4A]'
                : 'text-[#B88600] hover:bg-amber-50'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              Mais Vendidas
            </span>
            <span className="text-[11px]">
              {TEAMS.filter((t) => t.featured).length}
            </span>
          </button>

          {LEAGUES.map((league) => {
            const active = selectedLeague === league.id;
            return (
              <button
                key={league.id}
                type="button"
                onClick={() => {
                  onSelectLeague(league.id);
                  setSportFilter('all');
                  setMobileFiltersOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#020F4A] text-white font-bold'
                    : 'text-slate-700 hover:bg-[#F4F6FA]'
                }`}
              >
                <span className="truncate">{league.name}</span>
                <span
                  className={`text-[11px] shrink-0 ml-2 ${
                    active ? 'text-[#F4BE0B] font-bold' : 'text-slate-400'
                  }`}
                >
                  {league.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transparent Price Card */}
      <div className="rounded-2xl bg-[#020F4A] text-white p-4 space-y-2.5 shadow-sm">
        <div className="flex items-center gap-2 text-[#F4BE0B]">
          <Trophy className="w-4 h-4" />
          <span className="text-xs font-extrabold uppercase tracking-wide">
            Tabela de Valores
          </span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between gap-2">
            <span className="text-white/80">Versão Torcedor</span>
            <span className="font-bold whitespace-nowrap shrink-0">R$ 160,00</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-white/80">Versão Jogador</span>
            <span className="font-bold text-[#F4BE0B] whitespace-nowrap shrink-0">R$ 200,00</span>
          </div>
          <div className="flex justify-between gap-2 pt-1.5 border-t border-white/15">
            <span className="text-white/80">Nome + Número</span>
            <span className="font-bold whitespace-nowrap shrink-0">+ R$ 30,00</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-white/80">Patch Oficial</span>
            <span className="font-bold whitespace-nowrap shrink-0">+ R$ 20,00</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="catalogo" className="bg-[#F4F6FA] py-10 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block w-68 shrink-0">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 sticky top-36 shadow-sm max-h-[calc(100vh-160px)] overflow-y-auto">
              {renderFilterContent()}
            </div>
          </aside>

          {/* Main Product Grid Column */}
          <div className="flex-1 min-w-0">
            {/* Active League Spotlight Header */}
            {activeLeagueMeta && (
              <div className="relative rounded-3xl overflow-hidden mb-5 h-36 sm:h-44 flex items-end bg-[#020F4A] shadow-sm">
                <img
                  src={activeLeagueMeta.banner}
                  alt={activeLeagueMeta.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020F4A]/95 via-[#020F4A]/70 to-black/30" />
                <div className="relative z-10 p-6 w-full flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F4BE0B]">
                      {activeLeagueMeta.sport === 'nba'
                        ? 'CATÁLOGO NBA'
                        : 'CATÁLOGO FUTEBOL'}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase leading-none mt-1">
                      {activeLeagueMeta.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/85 mt-1">
                      {activeLeagueMeta.description} • {activeLeagueMeta.count} times disponíveis
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 rounded-full bg-white/15 hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white text-xs font-extrabold uppercase transition-colors cursor-pointer"
                  >
                    Ver todos
                  </button>
                </div>
              </div>
            )}

            {/* Quick Version Filter Strip right above Product Grid (Visible on Mobile & Desktop!) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 space-y-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#020F4A] text-white text-xs font-extrabold uppercase cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#F4BE0B]" />
                    Filtros
                  </button>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#020F4A] leading-none">
                      {selectedLeague === 'destaques'
                        ? 'Camisas Mais Vendidas'
                        : activeLeagueMeta
                          ? activeLeagueMeta.shortName
                          : 'Catálogo Completo'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Exibindo{' '}
                      <strong className="text-[#020F4A]">{displayedTeams.length}</strong>{' '}
                      de <strong className="text-[#020F4A]">{filteredTeams.length}</strong>{' '}
                      times
                      {versionFilter !== 'all' && (
                        <>
                          {' '}
                          com{' '}
                          <strong className="text-[#020F4A]">
                            {versionFilter === 'jogador'
                              ? 'Versão Jogador'
                              : 'Versão Torcedor'}
                          </strong>
                        </>
                      )}
                      {categoryFilter !== 'all' && (
                        <>
                          {' '}
                          ·{' '}
                          <strong className="text-[#020F4A]">
                            {CATEGORY_LABELS[categoryFilter]}
                          </strong>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {hasAnyFilter && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#020F4A] bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Limpar filtros
                    </button>
                  )}

                  <label className="sr-only" htmlFor="sort-catalog">
                    Ordenar catálogo
                  </label>
                  <select
                    id="sort-catalog"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    className="h-9 px-3.5 rounded-full border border-slate-300 bg-white text-xs font-bold text-[#020F4A] focus:outline-none focus:border-[#020F4A]"
                  >
                    <option value="featured">Ordenar: Destaques</option>
                    <option value="az">Ordenar: A – Z</option>
                    <option value="za">Ordenar: Z – A</option>
                  </select>
                </div>
              </div>

              {/* Quick Version Pills Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-slate-100">
                <span className="text-[11px] font-extrabold uppercase text-slate-500 mr-1">
                  Filtrar Versão:
                </span>
                {[
                  { id: 'all', label: 'Todas (Torcedor & Jogador)' },
                  { id: 'torcedor', label: `Versão Torcedor • R$ 160 (${teamsWithTorcedorCount})` },
                  { id: 'jogador', label: `Versão Jogador • R$ 200 (${teamsWithJogadorCount})` },
                ].map((pill) => {
                  const active = versionFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => onVersionFilterChange(pill.id as VersionFilter)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                        active
                          ? pill.id === 'jogador'
                            ? 'bg-[#F4BE0B] text-[#020F4A] shadow-xs'
                            : 'bg-[#020F4A] text-white shadow-xs'
                          : 'bg-[#F4F6FA] text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Empty State */}
            {filteredTeams.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                  Nenhum time encontrado com esses filtros
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Tente remover um dos filtros de versão/modelo ou consulte disponibilidade no WhatsApp {STORE_CONFIG.whatsappDisplay}.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-full bg-[#020F4A] text-white text-xs font-extrabold uppercase cursor-pointer"
                  >
                    Limpar filtros e mostrar tudo
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Crisp Rounded Product Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                  {displayedTeams.map((team) => {
                    const showJogadorOnly = versionFilter === 'jogador';
                    return (
                      <article
                        key={team.id}
                        className="group bg-white rounded-3xl border border-slate-200 hover:border-[#020F4A] hover:shadow-xl transition-all flex flex-col overflow-hidden"
                      >
                        {/* Media Stage with Centered Transparent Crest */}
                        <button
                          type="button"
                          onClick={() => onSelectTeam(team)}
                          className="relative bg-[#F4F6FA] pt-5 pb-4 px-4 flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="absolute top-3 left-3 flex items-center gap-1">
                            {team.featured && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#F4BE0B] text-[#020F4A] text-[10px] font-extrabold uppercase tracking-wide shadow-xs">
                                Top
                              </span>
                            )}
                            {team.sport === 'nba' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#020F4A] text-[#F4BE0B] text-[10px] font-extrabold uppercase tracking-wide">
                                NBA
                              </span>
                            )}
                          </div>

                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2.5 bg-white shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
                            <img
                              src={team.crest}
                              alt={`Escudo ${team.name}`}
                              loading="lazy"
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Real Model Count Badge */}
                          <span className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#020F4A] text-[10px] font-bold border border-slate-200">
                            <Layers className="w-3 h-3 text-[#DFA902]" />
                            {showJogadorOnly
                              ? `${team.jogadorCount} ${team.jogadorCount === 1 ? 'modelo Jogador' : 'modelos Jogador'}`
                              : `${team.modelCount} ${team.modelCount === 1 ? 'modelo real' : 'modelos reais'}`}
                          </span>
                        </button>

                        {/* Card Body */}
                        <div className="p-4 flex-1 flex flex-col">
                          <span className="text-[11px] font-semibold text-slate-500 truncate">
                            {team.leagueName}
                          </span>
                          <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#020F4A] uppercase leading-tight mt-0.5 line-clamp-1 group-hover:text-[#0A1F7A] transition-colors">
                            {team.name}
                          </h3>

                          {/* REAL Version Availability Chips */}
                          <div className="mt-2 flex flex-wrap gap-1">
                            {team.torcedorCount > 0 && !showJogadorOnly && (
                              <span className="px-2 py-0.5 rounded-full bg-[#F4F6FA] text-[#020F4A] text-[10px] font-bold">
                                Torcedor ({team.torcedorCount})
                              </span>
                            )}
                            {team.jogadorCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#020F4A] text-[10px] font-extrabold">
                                Jogador ({team.jogadorCount})
                              </span>
                            )}
                          </div>

                          {/* Clear Real Price Display */}
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                            {showJogadorOnly ? (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[11px] text-slate-500 font-medium">
                                  Jogador
                                </span>
                                <span className="font-display text-2xl font-extrabold text-[#020F4A] leading-none">
                                  R$ 200
                                </span>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-[11px] text-slate-500 font-medium">
                                    {team.sport === 'nba' ? 'Regata' : 'Torcedor'}
                                  </span>
                                  <span className="font-display text-2xl font-extrabold text-[#020F4A] leading-none">
                                    R$ 160
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1">
                                  {team.jogadorCount > 0 ? (
                                    <>
                                      Jogador <strong className="text-[#020F4A]">R$ 200</strong> · Patch <strong className="text-[#020F4A]">+R$ 20</strong>
                                    </>
                                  ) : team.sport === 'nba' ? (
                                    'Modelos oficiais NBA'
                                  ) : (
                                    <>
                                      Personalize <strong className="text-[#020F4A]">+R$ 30</strong> · Patch <strong className="text-[#020F4A]">+R$ 20</strong>
                                    </>
                                  )}
                                </p>
                              </>
                            )}
                          </div>

                          {/* Single Native Action */}
                          <div className="mt-3.5 pt-1 mt-auto">
                            <button
                              type="button"
                              onClick={() => onSelectTeam(team)}
                              className="w-full h-10 rounded-full bg-[#020F4A] hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white text-xs font-extrabold uppercase tracking-wide inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Escolher Modelo
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {!hasAnyFilter && visibleCount < filteredTeams.length && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 36)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#020F4A] hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                    >
                      Carregar mais times ({filteredTeams.length - visibleCount} restantes)
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-5 shadow-2xl rounded-r-3xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <span className="font-display text-xl font-extrabold uppercase text-[#020F4A]">
                Filtrar Catálogo
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Fechar filtros"
                className="p-2 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderFilterContent()}
          </div>
        </div>
      )}
    </section>
  );
}
