'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Check,
  Ruler,
  Award,
  ShoppingBag,
  Plus,
  Minus,
  Info,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Ban,
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  JerseyModel,
  ModelCategory,
  STORE_CONFIG,
  TeamCatalogItem,
} from '@/data/catalog';
import {
  CartItem,
  calculateUnitPrice,
  formatBRL,
} from '@/types/store';
import { CategoryFilter, VersionFilter } from '@/components/CatalogSection';

interface JerseyModalProps {
  team: TeamCatalogItem | null;
  models: JerseyModel[];
  initialVersionFilter: VersionFilter;
  initialCategoryFilter: CategoryFilter;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const PATCH_PRESETS = [
  'Patch Brasileirão',
  'Patch Libertadores',
  'Patch Champions League',
  'Patch Premier League',
  'Patch LaLiga',
  'Patch Copa do Mundo',
];

export function JerseyModal({
  team,
  models,
  initialVersionFilter,
  initialCategoryFilter,
  onClose,
  onAddToCart,
}: JerseyModalProps) {
  const [versionTab, setVersionTab] = useState<'all' | 'torcedor' | 'jogador'>('all');
  const [categoryTab, setCategoryTab] = useState<'all' | ModelCategory>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [angleIdx, setAngleIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const [size, setSize] = useState<string>('G');
  const [hasPersonalization, setHasPersonalization] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [hasPatch, setHasPatch] = useState(false);
  const [patchName, setPatchName] = useState('Patch Champions League');
  const [quantity, setQuantity] = useState(1);

  const torcedorModels = useMemo(
    () => models.filter((m) => m.version === 'torcedor'),
    [models]
  );
  const jogadorModels = useMemo(
    () => models.filter((m) => m.version === 'jogador'),
    [models]
  );

  // Categories available inside the currently chosen version tab
  const availableCategories = useMemo(() => {
    const base =
      versionTab === 'torcedor'
        ? torcedorModels
        : versionTab === 'jogador'
          ? jogadorModels
          : models;
    const set = new Set<ModelCategory>();
    base.forEach((m) => set.add(m.category));
    return Array.from(set);
  }, [models, torcedorModels, jogadorModels, versionTab]);

  // Filtered list of REAL models shown in the modal
  const visibleModels = useMemo(() => {
    return models.filter((m) => {
      if (versionTab !== 'all' && m.version !== versionTab) return false;
      if (categoryTab !== 'all' && m.category !== categoryTab) return false;
      return true;
    });
  }, [models, versionTab, categoryTab]);

  const activeModel: JerseyModel | null = useMemo(() => {
    return (
      visibleModels.find((m) => m.id === selectedModelId) ||
      visibleModels[0] ||
      models[0] ||
      null
    );
  }, [visibleModels, selectedModelId, models]);

  // Initialize modal filters whenever a new team opens
  useEffect(() => {
    if (!team) return;
    const nextVersion: 'all' | 'torcedor' | 'jogador' =
      initialVersionFilter === 'jogador' && jogadorModels.length > 0
        ? 'jogador'
        : initialVersionFilter === 'torcedor' && torcedorModels.length > 0
          ? 'torcedor'
          : 'all';
    setVersionTab(nextVersion);

    const hasCat =
      initialCategoryFilter !== 'all' &&
      models.some((m) => m.category === initialCategoryFilter);
    setCategoryTab(hasCat ? initialCategoryFilter : 'all');

    setSize('G');
    setAngleIdx(0);
    setLightboxOpen(false);
    setHasPersonalization(false);
    setCustomName('');
    setCustomNumber('');
    setHasPatch(false);
    setPatchName(
      team.leagueId === 'brasileirao'
        ? 'Patch Brasileirão'
        : team.leagueId === 'selecoes'
          ? 'Patch Copa do Mundo'
          : team.leagueId === 'premier-league'
            ? 'Patch Premier League'
            : team.leagueId === 'laliga'
              ? 'Patch LaLiga'
              : 'Patch Champions League'
    );
    setQuantity(1);
  }, [team, initialVersionFilter, initialCategoryFilter, models, jogadorModels.length, torcedorModels.length]);

  // Reset angle & disable disallowed personalization whenever the active model changes!
  useEffect(() => {
    if (!activeModel) return;
    setSelectedModelId(activeModel.id);
    setAngleIdx(0);
    if (!activeModel.allowsPersonalization) {
      setHasPersonalization(false);
    }
    if (!activeModel.allowsPatch) {
      setHasPatch(false);
    }
  }, [activeModel?.id, activeModel?.allowsPersonalization, activeModel?.allowsPatch]);

  // If categoryTab is no longer present under new versionTab, reset to 'all'
  useEffect(() => {
    if (categoryTab !== 'all' && !availableCategories.includes(categoryTab)) {
      setCategoryTab('all');
    }
  }, [categoryTab, availableCategories]);

  useEffect(() => {
    if (!team) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [team, lightboxOpen, onClose]);

  if (!team) return null;

  const effectiveVersion = activeModel?.version || 'torcedor';
  const canPersonalize = Boolean(activeModel?.allowsPersonalization);
  const canPatch = Boolean(activeModel?.allowsPatch);

  const unitPrice = calculateUnitPrice(
    effectiveVersion,
    canPersonalize && hasPersonalization,
    canPatch && hasPatch
  );
  const totalPrice = unitPrice * quantity;

  const modelPhotos = activeModel?.photos || [];
  const activePhotoBase = modelPhotos[angleIdx] || modelPhotos[0] || null;
  const activePhotoUrl = activePhotoBase ? `${activePhotoBase}=w850` : null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModel) return;

    const item: CartItem = {
      cartItemId: `${team.id}-${activeModel.id}-${size}-${Date.now()}`,
      teamId: team.id,
      teamName: team.name,
      leagueName: team.leagueName,
      sport: team.sport,
      crest: team.crest,
      selectedPhotoUrl: activePhotoBase ? `${activePhotoBase}=w600` : undefined,
      version: effectiveVersion,
      size,
      modelNote: activeModel.title,
      hasPersonalization: canPersonalize && hasPersonalization,
      customName: canPersonalize && hasPersonalization ? customName.trim().toUpperCase() : '',
      customNumber: canPersonalize && hasPersonalization ? customNumber.trim() : '',
      hasPatch: canPatch && hasPatch,
      patchName: canPatch && hasPatch ? patchName.trim() || 'Patch Oficial' : '',
      quantity,
      unitPrice,
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-team-title"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#020F4A] text-white px-5 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={team.crest}
              alt={team.name}
              className="w-12 h-12 rounded-full bg-white p-1.5 object-contain shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F4BE0B] block truncate">
                {team.leagueName} • {models.length}{' '}
                {models.length === 1 ? 'modelo real' : 'modelos reais'}
                {jogadorModels.length > 0 && ` (${jogadorModels.length} Jogador • ${torcedorModels.length} Torcedor)`}
              </span>
              <h2
                id="modal-team-title"
                className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-none truncate"
              >
                {team.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela do produto"
            className="p-2 rounded-full text-white/75 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* REAL Version & Category Filter Bar inside the Modal */}
        <div className="bg-[#F4F6FA] border-b border-slate-200 px-5 sm:px-6 py-3 space-y-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase text-slate-500 mr-1">
              Versão:
            </span>
            <button
              type="button"
              onClick={() => setVersionTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                versionTab === 'all'
                  ? 'bg-[#020F4A] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#020F4A]'
              }`}
            >
              Todos ({models.length})
            </button>

            {torcedorModels.length > 0 && (
              <button
                type="button"
                onClick={() => setVersionTab('torcedor')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                  versionTab === 'torcedor'
                    ? 'bg-[#020F4A] text-[#F4BE0B]'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#020F4A]'
                }`}
              >
                {team.sport === 'nba' ? 'Regatas NBA' : 'Versão Torcedor'} • R$ 160 ({torcedorModels.length})
              </button>
            )}

            {jogadorModels.length > 0 && (
              <button
                type="button"
                onClick={() => setVersionTab('jogador')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                  versionTab === 'jogador'
                    ? 'bg-[#F4BE0B] text-[#020F4A]'
                    : 'bg-white text-[#020F4A] border border-[#DFA902]/60 hover:bg-amber-50'
                }`}
              >
                Versão Jogador • R$ 200 ({jogadorModels.length})
              </button>
            )}
          </div>

          {availableCategories.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1">
                Tipo:
              </span>
              <button
                type="button"
                onClick={() => setCategoryTab('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 cursor-pointer transition-colors ${
                  categoryTab === 'all'
                    ? 'bg-[#020F4A] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#020F4A]'
                }`}
              >
                Todos
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryTab(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 cursor-pointer transition-colors ${
                    categoryTab === cat
                      ? 'bg-[#F4BE0B] text-[#020F4A]'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-[#020F4A]'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Modal Body */}
        <form
          onSubmit={handleConfirm}
          className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12"
        >
          {/* LEFT COLUMN: Real Model Picker + Selected Model Multi-Angle Photos */}
          <div className="lg:col-span-7 bg-[#F4F6FA] p-5 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Active Model Photo Stage (Multi-angle photos of THIS single model) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
              <div className="sm:col-span-8 relative bg-white rounded-2xl border border-slate-200 overflow-hidden aspect-square flex items-center justify-center shadow-xs">
                {activePhotoUrl ? (
                  <>
                    <img
                      src={activePhotoUrl}
                      alt={`${team.name} - ${activeModel?.title}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-white"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          effectiveVersion === 'jogador'
                            ? 'bg-[#F4BE0B] text-[#020F4A]'
                            : 'bg-[#020F4A] text-white'
                        }`}
                      >
                        {team.sport === 'nba'
                          ? 'NBA'
                          : effectiveVersion === 'jogador'
                            ? 'Versão Jogador • R$ 200'
                            : 'Versão Torcedor • R$ 160'}
                      </span>
                      {modelPhotos.length > 1 && (
                        <span className="px-2.5 py-1 rounded-full bg-black/65 text-white text-[10px] font-bold">
                          Foto {angleIdx + 1}/{modelPhotos.length}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      aria-label="Ampliar foto"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-[#F4BE0B] text-[#020F4A] flex items-center justify-center shadow cursor-pointer transition-colors"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {modelPhotos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setAngleIdx(
                              (angleIdx - 1 + modelPhotos.length) % modelPhotos.length
                            )
                          }
                          aria-label="Ângulo anterior"
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#020F4A]/80 hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setAngleIdx((angleIdx + 1) % modelPhotos.length)
                          }
                          aria-label="Próximo ângulo"
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#020F4A]/80 hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <img
                    src={team.crest}
                    alt={team.name}
                    className="w-28 h-28 object-contain"
                  />
                )}
              </div>

              {/* Angles of the currently selected model (frente, costas, escudo, gola) */}
              <div className="sm:col-span-4 space-y-2">
                <p className="text-[11px] font-extrabold uppercase text-[#020F4A]">
                  Ângulos deste modelo ({modelPhotos.length})
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-0.5">
                  {modelPhotos.map((baseUrl, idx) => (
                    <button
                      key={baseUrl}
                      type="button"
                      onClick={() => setAngleIdx(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 bg-white transition-all cursor-pointer ${
                        idx === angleIdx
                          ? 'border-[#020F4A] ring-2 ring-[#F4BE0B]'
                          : 'border-slate-200 hover:border-[#020F4A]/60'
                      }`}
                    >
                      <img
                        src={`${baseUrl}=w220`}
                        alt={`${activeModel?.title} foto ${idx + 1}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* REAL MODEL LIST (Grouped! One card per real jersey model) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase text-[#020F4A] inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#DFA902]" />
                  Selecione o Modelo ({visibleModels.length}{' '}
                  {visibleModels.length === 1 ? 'opção' : 'opções'})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {visibleModels.map((m) => {
                  const selected = activeModel?.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModelId(m.id)}
                      className={`flex items-center gap-2.5 p-2 rounded-2xl border-2 text-left transition-all cursor-pointer bg-white ${
                        selected
                          ? 'border-[#020F4A] ring-2 ring-[#F4BE0B]/60'
                          : 'border-slate-200 hover:border-[#020F4A]/50'
                      }`}
                    >
                      <img
                        src={`${m.photos[0]}=w180`}
                        alt={m.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-[#F4F6FA]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-extrabold text-[#020F4A] leading-tight line-clamp-2 uppercase">
                          {m.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase ${
                              m.version === 'jogador'
                                ? 'bg-[#F4BE0B] text-[#020F4A]'
                                : 'bg-[#F4F6FA] text-[#020F4A]'
                            }`}
                          >
                            {m.version === 'jogador' ? 'Jogador' : 'Torcedor'}
                          </span>
                          <span className="text-[9px] text-slate-500 font-semibold">
                            {m.photos.length} ft
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Real Model Summary, Size, and CONDITIONAL Personalization */}
          <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 flex flex-col">
            {/* Selected Real Model Card */}
            {activeModel && (
              <div className="rounded-2xl bg-[#F4F6FA] border border-slate-200 p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B88600]">
                      {CATEGORY_LABELS[activeModel.category]}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A] leading-tight">
                      {activeModel.title}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold shrink-0 ${
                      effectiveVersion === 'jogador'
                        ? 'bg-[#F4BE0B] text-[#020F4A]'
                        : 'bg-[#020F4A] text-white'
                    }`}
                  >
                    {effectiveVersion === 'jogador' ? 'R$ 200' : 'R$ 160'}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  {effectiveVersion === 'jogador'
                    ? 'Versão Jogador (Atleta): modelagem slim fit de campo, tecido respirável de alta performance.'
                    : team.sport === 'nba'
                      ? 'Modelo oficial NBA sob encomenda.'
                      : 'Versão Torcedor: corte tradicional confortável, ideal para o dia a dia e arquibancada.'}
                </p>

                {/* Quick Switch Shortcut if the team has the other version */}
                {effectiveVersion === 'torcedor' && jogadorModels.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setVersionTab('jogador')}
                    className="text-xs font-extrabold text-[#020F4A] hover:text-[#DFA902] underline cursor-pointer"
                  >
                    Prefere Versão Jogador (R$ 200)? Ver {jogadorModels.length} modelos disponíveis →
                  </button>
                )}
                {effectiveVersion === 'jogador' && torcedorModels.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setVersionTab('torcedor')}
                    className="text-xs font-extrabold text-[#020F4A] hover:text-[#DFA902] underline cursor-pointer"
                  >
                    Prefere Versão Torcedor (R$ 160)? Ver {torcedorModels.length} modelos disponíveis →
                  </button>
                )}
              </div>
            )}

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#020F4A]">
                  Escolha o Tamanho
                </label>
                <a
                  href="#tabela-medidas"
                  onClick={onClose}
                  className="text-xs font-bold text-[#020F4A] hover:text-[#DFA902] inline-flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#DFA902]" />
                  Tabela de Medidas
                </a>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {STORE_CONFIG.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`h-10 rounded-xl font-extrabold text-sm border-2 transition-colors cursor-pointer ${
                      size === s
                        ? 'border-[#020F4A] bg-[#020F4A] text-[#F4BE0B]'
                        : 'border-slate-200 bg-white text-[#020F4A] hover:border-[#020F4A]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CONDITIONAL PERSONALIZATION & PATCH — ONLY ON JERSEYS THAT SUPPORT IT! */}
            {canPersonalize ? (
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#020F4A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFA902]" />
                  Personalização Disponível Neste Modelo
                </span>

                {/* Name + Number (+ R$ 30 fixo) */}
                <div
                  className={`rounded-2xl border-2 p-3.5 transition-colors ${
                    hasPersonalization
                      ? 'border-[#020F4A] bg-[#020F4A]/5'
                      : 'border-slate-200'
                  }`}
                >
                  <label className="flex items-center justify-between gap-3 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={hasPersonalization}
                        onChange={(e) => setHasPersonalization(e.target.checked)}
                        className="w-4 h-4 accent-[#020F4A] rounded"
                      />
                      <div>
                        <span className="text-sm font-bold text-[#020F4A] block">
                          Nome + Número nas costas
                        </span>
                        <span className="text-xs text-slate-500">
                          Valor fixo de R$ 30 por camisa
                        </span>
                      </div>
                    </div>
                    <span className="font-display text-lg font-extrabold text-[#020F4A] bg-[#F4BE0B]/25 px-2.5 py-0.5 rounded-full shrink-0">
                      + R$ 30
                    </span>
                  </label>

                  {hasPersonalization && (
                    <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                          Nome nas costas
                        </label>
                        <input
                          type="text"
                          maxLength={18}
                          required={hasPersonalization}
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          placeholder="Ex: DIDIER, ZICO..."
                          className="w-full h-9 px-3 rounded-xl border border-slate-300 text-sm uppercase font-semibold focus:outline-none focus:border-[#020F4A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                          Número
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          required={hasPersonalization}
                          value={customNumber}
                          onChange={(e) =>
                            setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))
                          }
                          placeholder="Ex: 10"
                          className="w-full h-9 px-3 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:border-[#020F4A]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Patch (+ R$ 20) */}
                {canPatch && (
                  <div
                    className={`rounded-2xl border-2 p-3.5 transition-colors ${
                      hasPatch ? 'border-[#020F4A] bg-[#020F4A]/5' : 'border-slate-200'
                    }`}
                  >
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={hasPatch}
                          onChange={(e) => setHasPatch(e.target.checked)}
                          className="w-4 h-4 accent-[#020F4A] rounded"
                        />
                        <div>
                          <span className="text-sm font-bold text-[#020F4A] inline-flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#DFA902]" />
                            Adicionar Patch Oficial
                          </span>
                          <span className="text-xs text-slate-500 block">
                            Patch de campeonato nas mangas
                          </span>
                        </div>
                      </div>
                      <span className="font-display text-lg font-extrabold text-[#020F4A] bg-[#F4BE0B]/25 px-2.5 py-0.5 rounded-full shrink-0">
                        + R$ 20
                      </span>
                    </label>

                    {hasPatch && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {PATCH_PRESETS.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setPatchName(preset)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                                patchName === preset
                                  ? 'bg-[#020F4A] text-[#F4BE0B]'
                                  : 'bg-[#F4F6FA] text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={patchName}
                          onChange={(e) => setPatchName(e.target.value)}
                          placeholder="Ou digite o patch desejado..."
                          className="w-full h-9 px-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#020F4A]"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-2.5 text-xs text-slate-700">
                {team.sport === 'nba' ? (
                  <>
                    <Info className="w-4 h-4 text-[#DFA902] shrink-0 mt-0.5" />
                    <p>
                      <strong>Modelo NBA:</strong> Colocamos apenas um jogador de cada modelo. Caso queira outros números de outros jogadores, consulte disponibilidade com o vendedor no WhatsApp{' '}
                      <strong>{STORE_CONFIG.whatsappDisplay}</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <Ban className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Sem personalização neste modelo:</strong> itens de{' '}
                      <strong>
                        {activeModel ? CATEGORY_LABELS[activeModel.category] : 'Treino/Casual'}
                      </strong>{' '}
                      não possuem personalização de nome/número ou patch. Para personalizar, escolha uma <strong>Camisa de Jogo</strong> ou <strong>Versão Jogador</strong>.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Footer Price + Add to Bag */}
            <div className="mt-auto pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-slate-300 rounded-full overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir quantidade"
                    className="w-9 h-10 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-9 text-center text-sm font-extrabold text-[#020F4A]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Aumentar quantidade"
                    className="w-9 h-10 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="block text-[11px] uppercase text-slate-500 font-semibold">
                    Total do item
                  </span>
                  <span className="font-display text-3xl font-extrabold text-[#020F4A] leading-none">
                    {formatBRL(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!activeModel}
                className="flex-1 sm:flex-none px-6 h-12 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] disabled:opacity-50 text-[#020F4A] font-extrabold text-sm uppercase tracking-wide inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Adicionar à Sacola
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Fullscreen Zoom Lightbox */}
      {lightboxOpen && activePhotoBase && (
        <div
          className="fixed inset-0 z-[60] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Fechar zoom"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={`${activePhotoBase}=w1400`}
            alt={`${team.name} - ${activeModel?.title}`}
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
