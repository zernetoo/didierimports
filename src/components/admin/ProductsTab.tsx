'use client';

import React, { useState, useMemo } from 'react';
import {
  Save,
  Plus,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  DollarSign,
  Layers,
  ImagePlus,
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  JerseyModel,
  ModelCategory,
  TEAMS,
} from '@/data/catalog';
import {
  CustomModelRecord,
  NewCustomModelInput,
  StorePricingSettings,
} from '@/types/admin';
import { formatBRL } from '@/types/store';

interface ProductsTabProps {
  pricing: StorePricingSettings;
  onSavePricing: (next: StorePricingSettings) => void;
  customModels: CustomModelRecord[];
  onAddCustomModel: (input: NewCustomModelInput) => void;
  onDeleteCustomModel: (modelId: string) => void;
  hiddenModels: string[];
  onToggleHiddenModel: (teamId: string, modelId: string) => void;
  teamModelsMap: Record<string, JerseyModel[]>;
}

async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 640;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas error'));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = String(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ProductsTab({
  pricing,
  onSavePricing,
  customModels,
  onAddCustomModel,
  onDeleteCustomModel,
  hiddenModels,
  onToggleHiddenModel,
  teamModelsMap,
}: ProductsTabProps) {
  const [draftPricing, setDraftPricing] =
    useState<StorePricingSettings>(pricing);
  const [pricingSaved, setPricingSaved] = useState(false);

  // New Product Form State
  const [teamId, setTeamId] = useState('flamengo');
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState<'torcedor' | 'jogador'>('torcedor');
  const [category, setCategory] = useState<ModelCategory>('jogo');
  const [allowsPers, setAllowsPers] = useState(true);
  const [allowsPatch, setAllowsPatch] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [productAddedMsg, setProductAddedMsg] = useState(false);

  // Manage existing models visibility by team
  const [manageTeamId, setManageTeamId] = useState('flamengo');

  const managedTeamModels = useMemo(() => {
    const base = teamModelsMap[manageTeamId] || [];
    const custom = customModels
      .filter((c) => c.teamId === manageTeamId)
      .map((c) => c.model);
    return [...custom, ...base];
  }, [manageTeamId, teamModelsMap, customModels]);

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePricing(draftPricing);
    setPricingSaved(true);
    setTimeout(() => setPricingSaved(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 4);
    const compressed: string[] = [];
    for (const f of files) {
      try {
        compressed.push(await compressImageFile(f));
      } catch {
        // Ignore bad file
      }
    }
    if (compressed.length > 0) {
      setPhotos((prev) => [...prev, ...compressed].slice(0, 6));
    }
    e.target.value = '';
  };

  const handleAddPhotoUrl = () => {
    const clean = photoUrlInput.trim();
    if (!clean) return;
    setPhotos((prev) => [...prev, clean].slice(0, 6));
    setPhotoUrlInput('');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const team = TEAMS.find((t) => t.id === teamId);
    const finalPhotos =
      photos.length > 0 ? photos : [team?.crest || '/logo-didier.png'];
    onAddCustomModel({
      teamId,
      title,
      version,
      category,
      allowsPersonalization: allowsPers,
      allowsPatch,
      photos: finalPhotos,
    });
    setTitle('');
    setPhotos([]);
    setProductAddedMsg(true);
    setTimeout(() => setProductAddedMsg(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Global Pricing & Supplier Cost Settings */}
      <form
        onSubmit={handleSavePricing}
        className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Preços da Loja & Custos do Fornecedor
              </h2>
              <p className="text-xs text-slate-500">
                Altere os valores globais em tempo real — a loja e o cálculo de lucro líquido atualizam na hora.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] text-xs font-extrabold uppercase tracking-wide cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            Salvar Preços
          </button>
        </div>

        {pricingSaved && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-800 inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Preços e custos atualizados na loja com sucesso!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Versão Torcedor',
              priceKey: 'torcedor' as const,
              costKey: 'costTorcedor' as const,
            },
            {
              label: 'Versão Jogador',
              priceKey: 'jogador' as const,
              costKey: 'costJogador' as const,
            },
            {
              label: 'Personalização (Nome/Nº)',
              priceKey: 'personalizacao' as const,
              costKey: 'costPersonalizacao' as const,
            },
            {
              label: 'Patch Oficial',
              priceKey: 'patch' as const,
              costKey: 'costPatch' as const,
            },
          ].map((item) => {
            const profit =
              draftPricing[item.priceKey] - draftPricing[item.costKey];
            return (
              <div
                key={item.priceKey}
                className="rounded-2xl bg-[#F4F6FA] border border-slate-200 p-4 space-y-2.5"
              >
                <span className="text-xs font-extrabold uppercase text-[#020F4A] block">
                  {item.label}
                </span>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Preço de Venda (R$)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={draftPricing[item.priceKey]}
                    onChange={(e) =>
                      setDraftPricing({
                        ...draftPricing,
                        [item.priceKey]: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 bg-white text-sm font-extrabold text-[#020F4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Custo Fornecedor (R$)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={draftPricing[item.costKey]}
                    onChange={(e) =>
                      setDraftPricing({
                        ...draftPricing,
                        [item.costKey]: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700"
                  />
                </div>
                <p className="text-[11px] font-extrabold text-emerald-700 pt-1 border-t border-slate-200">
                  Lucro líquido: {formatBRL(profit)}
                </p>
              </div>
            );
          })}
        </div>
      </form>

      {/* 2. Register New Jersey Model */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <form
          onSubmit={handleCreateProduct}
          className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-[#F4BE0B] text-[#020F4A] flex items-center justify-center">
              <ImagePlus className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Cadastrar Novo Modelo na Loja
              </h2>
              <p className="text-xs text-slate-500">
                Suba lançamentos com fotos do celular/PC — aparece imediatamente no time escolhido.
              </p>
            </div>
          </div>

          {productAddedMsg && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-800 inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Novo modelo publicado no catálogo da loja!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
                Time / Seleção / NBA *
              </label>
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm font-bold text-[#020F4A]"
              >
                {TEAMS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.leagueName})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
                Nome do Modelo *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: 2027 CASA EDIÇÃO ESPECIAL"
                className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm uppercase font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
                Versão Real
              </label>
              <select
                value={version}
                onChange={(e) =>
                  setVersion(e.target.value as 'torcedor' | 'jogador')
                }
                className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm font-bold"
              >
                <option value="torcedor">
                  Versão Torcedor (R$ {draftPricing.torcedor})
                </option>
                <option value="jogador">
                  Versão Jogador (R$ {draftPricing.jogador})
                </option>
              </select>
            </div>
            <div>
              <label className="block font-extrabold uppercase text-[#020F4A] mb-1">
                Tipo de Modelo
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const next = e.target.value as ModelCategory;
                  setCategory(next);
                  const noPers = ['treino', 'casual', 'calcao', 'nba'].includes(
                    next
                  );
                  setAllowsPers(!noPers);
                  setAllowsPatch(!noPers);
                }}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm font-bold"
              >
                {(Object.keys(CATEGORY_LABELS) as ModelCategory[]).map((k) => (
                  <option key={k} value={k}>
                    {CATEGORY_LABELS[k]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs pt-1">
            <label className="inline-flex items-center gap-2 font-bold text-[#020F4A] cursor-pointer">
              <input
                type="checkbox"
                checked={allowsPers}
                onChange={(e) => setAllowsPers(e.target.checked)}
                className="accent-[#020F4A]"
              />
              Aceita Personalização (Nome + Número)
            </label>
            <label className="inline-flex items-center gap-2 font-bold text-[#020F4A] cursor-pointer">
              <input
                type="checkbox"
                checked={allowsPatch}
                onChange={(e) => setAllowsPatch(e.target.checked)}
                className="accent-[#020F4A]"
              />
              Aceita Patch Oficial
            </label>
          </div>

          {/* Photo Upload or URL */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <span className="block text-xs font-extrabold uppercase text-[#020F4A]">
              Fotos do Modelo (Frente, Costas, Detalhes)
            </span>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-[#020F4A] hover:bg-[#0A1F7A] text-white text-xs font-extrabold uppercase cursor-pointer">
                <Upload className="w-4 h-4 text-[#F4BE0B]" />
                Enviar Foto do Dispositivo
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <div className="flex flex-1 min-w-[200px] gap-1.5">
                <input
                  type="url"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="Ou cole URL de imagem..."
                  className="flex-1 h-10 px-3 rounded-full border border-slate-300 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddPhotoUrl}
                  className="px-3.5 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-[#020F4A] text-xs font-bold cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {photos.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPhotos((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/70 text-white text-[10px] flex items-center justify-center cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] font-extrabold text-xs uppercase tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Publicar Novo Modelo na Loja
          </button>

          {/* List of seller-added custom models */}
          {customModels.length > 0 && (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <p className="text-xs font-extrabold uppercase text-[#020F4A]">
                Modelos Cadastrados por Você ({customModels.length})
              </p>
              <ul className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {customModels.map((rec) => {
                  const t = TEAMS.find((x) => x.id === rec.teamId);
                  return (
                    <li
                      key={rec.model.id}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#F4F6FA]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={rec.model.photos[0]}
                          alt={rec.model.title}
                          className="w-10 h-10 rounded-xl object-cover bg-white shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-[#020F4A] truncate">
                            {t?.name} — {rec.model.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {rec.model.version === 'jogador'
                              ? 'Jogador'
                              : 'Torcedor'}{' '}
                            · {CATEGORY_LABELS[rec.model.category]}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteCustomModel(rec.model.id)}
                        aria-label="Excluir modelo"
                        className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </form>

        {/* 3. Pause / Reactivate Existing Catalog Models per Team */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Ativar / Pausar Modelos do Catálogo
              </h2>
              <p className="text-xs text-slate-500">
                Acabou no fornecedor? Pause o modelo com 1 clique e ele deixa de aparecer para os clientes.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
              Selecionar Time para Gerenciar ({managedTeamModels.length} modelos)
            </label>
            <select
              value={manageTeamId}
              onChange={(e) => setManageTeamId(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-bold text-[#020F4A]"
            >
              {TEAMS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.modelCount} modelos)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 max-h-[430px] overflow-y-auto pr-1">
            {managedTeamModels.map((m) => {
              const key = `${manageTeamId}:${m.id}`;
              const isHidden = hiddenModels.includes(key);
              const thumb = m.photos[0]?.startsWith('http')
                ? `${m.photos[0]}=w160`
                : m.photos[0];
              return (
                <div
                  key={m.id}
                  className={`flex items-center justify-between gap-3 p-2.5 rounded-2xl border transition-colors ${
                    isHidden
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={thumb}
                      alt={m.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-xl object-cover bg-[#F4F6FA] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-[#020F4A] truncate uppercase">
                        {m.title}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {m.version === 'jogador'
                          ? `Jogador (R$ ${draftPricing.jogador})`
                          : `Torcedor (R$ ${draftPricing.torcedor})`}{' '}
                        · {CATEGORY_LABELS[m.category]}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleHiddenModel(manageTeamId, m.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors ${
                      isHidden
                        ? 'bg-slate-200 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
                        : 'bg-emerald-100 text-emerald-800 hover:bg-red-100 hover:text-red-700'
                    }`}
                  >
                    {isHidden ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        Pausado
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        Ativo
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
