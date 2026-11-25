'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Award,
  Check,
  Search,
} from 'lucide-react';
import { STORE_CONFIG, TEAMS, TeamCatalogItem } from '@/data/catalog';
import {
  CartItem,
  JerseyVersion,
  calculateUnitPrice,
  formatBRL,
} from '@/types/store';

interface JerseySimulatorProps {
  onAddToCart: (item: CartItem) => void;
}

type PatternType =
  | 'solid'
  | 'vertical'
  | 'horizontal'
  | 'sash'
  | 'half'
  | 'sleeves';

type FontStyleType = 'condensed' | 'classic' | 'modern' | 'retro';

const COLOR_PRESETS = [
  { name: 'Azul Marinho', hex: '#020F4A' },
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Preto', hex: '#111317' },
  { name: 'Vermelho', hex: '#C8102E' },
  { name: 'Amarelo Ouro', hex: '#F4BE0B' },
  { name: 'Verde', hex: '#006B3C' },
  { name: 'Azul Celeste', hex: '#6CABDD' },
  { name: 'Azul Royal', hex: '#004B9B' },
  { name: 'Roxo', hex: '#552583' },
  { name: 'Grená', hex: '#6C1D45' },
];

const QUICK_TEAMS = [
  { id: 'flamengo', primary: '#C8102E', secondary: '#111317', trim: '#FFFFFF', text: '#FFFFFF', pattern: 'horizontal' as PatternType },
  { id: 'brasil', primary: '#F4BE0B', secondary: '#006B3C', trim: '#006B3C', text: '#006B3C', pattern: 'solid' as PatternType },
  { id: 'real-madrid', primary: '#FFFFFF', secondary: '#020F4A', trim: '#DFA902', text: '#020F4A', pattern: 'solid' as PatternType },
  { id: 'argentina', primary: '#FFFFFF', secondary: '#6CABDD', trim: '#111317', text: '#111317', pattern: 'vertical' as PatternType },
  { id: 'barcelona', primary: '#004B9B', secondary: '#A50044', trim: '#F4BE0B', text: '#F4BE0B', pattern: 'vertical' as PatternType },
  { id: 'palmeiras', primary: '#006B3C', secondary: '#FFFFFF', trim: '#FFFFFF', text: '#FFFFFF', pattern: 'solid' as PatternType },
  { id: 'corinthians', primary: '#FFFFFF', secondary: '#111317', trim: '#111317', text: '#111317', pattern: 'sleeves' as PatternType },
  { id: 'los-angeles-lakers', primary: '#F4BE0B', secondary: '#552583', trim: '#552583', text: '#552583', pattern: 'solid' as PatternType },
];

const PATCH_OPTIONS = [
  'Patch Brasileirão',
  'Patch Libertadores',
  'Patch Champions League',
  'Patch Premier League',
  'Patch LaLiga',
  'Patch Copa do Mundo',
];

export function JerseySimulator({ onAddToCart }: JerseySimulatorProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('flamengo');
  const [teamFilter, setTeamFilter] = useState('');
  const [side, setSide] = useState<'back' | 'front'>('back');
  const [pattern, setPattern] = useState<PatternType>('horizontal');
  const [primaryColor, setPrimaryColor] = useState('#C8102E');
  const [secondaryColor, setSecondaryColor] = useState('#111317');
  const [trimColor, setTrimColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [customName, setCustomName] = useState('DIDIER');
  const [customNumber, setCustomNumber] = useState('10');
  const [fontStyle, setFontStyle] = useState<FontStyleType>('condensed');
  const [version, setVersion] = useState<JerseyVersion>('torcedor');
  const [size, setSize] = useState('G');
  const [hasPatch, setHasPatch] = useState(false);
  const [patchName, setPatchName] = useState('Patch Brasileirão');

  const selectedTeam: TeamCatalogItem = useMemo(
    () => TEAMS.find((t) => t.id === selectedTeamId) || TEAMS[0],
    [selectedTeamId]
  );

  const filteredTeams = useMemo(() => {
    const q = teamFilter.trim().toLowerCase();
    if (!q) return TEAMS.slice(0, 24);
    return TEAMS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.leagueName.toLowerCase().includes(q)
    ).slice(0, 24);
  }, [teamFilter]);

  const isNba = selectedTeam.sport === 'nba';
  const unitPrice = calculateUnitPrice(version, true, hasPatch);

  const applyPreset = (preset: (typeof QUICK_TEAMS)[number]) => {
    setSelectedTeamId(preset.id);
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setTrimColor(preset.trim);
    setTextColor(preset.text);
    setPattern(preset.pattern);
  };

  const getFontFamily = () => {
    switch (fontStyle) {
      case 'classic':
        return 'Georgia, serif';
      case 'modern':
        return 'var(--font-inter), sans-serif';
      case 'retro':
        return 'Impact, Haettenschweiler, sans-serif';
      default:
        return 'var(--font-barlow), sans-serif';
    }
  };

  const handleOrderSimulated = () => {
    const item: CartItem = {
      cartItemId: `sim-${selectedTeam.id}-${version}-${size}-${Date.now()}`,
      teamId: selectedTeam.id,
      teamName: selectedTeam.name,
      leagueName: selectedTeam.leagueName,
      sport: selectedTeam.sport,
      crest: selectedTeam.crest,
      version,
      size,
      modelNote: `Personalizada no Simulador (${selectedTeam.name})`,
      hasPersonalization: true,
      customName: customName.trim().toUpperCase() || 'PERSONALIZADO',
      customNumber: customNumber.trim() || '10',
      hasPatch,
      patchName: hasPatch ? patchName : '',
      quantity: 1,
      unitPrice,
    };
    onAddToCart(item);
  };

  const jerseyPath = isNba
    ? 'M88 28 L112 28 Q150 76 188 28 L212 28 L224 108 Q242 138 238 175 L238 338 L62 338 L62 175 Q58 138 76 108 Z'
    : 'M102 32 Q150 58 198 32 L274 78 L250 152 L222 136 L222 338 L78 338 L78 136 L50 152 L26 78 Z';

  return (
    <section
      id="simulador"
      className="bg-[#020F4A] text-white py-16 scroll-mt-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4BE0B] text-[#020F4A] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Simulador Online Integrado
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase mt-2 leading-none">
              Simule Sua Personalização Ao Vivo
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-2">
              Teste seu nome, número, cores, padrão do manto e patch direto aqui no site. Personalização fixa <strong className="text-[#F4BE0B]">R$ 30</strong> por camisa e Patch <strong className="text-[#F4BE0B]">R$ 20</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-full">
            <button
              type="button"
              onClick={() => setSide('back')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase transition-colors cursor-pointer ${
                side === 'back'
                  ? 'bg-[#F4BE0B] text-[#020F4A]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Costas (Nome/Nº)
            </button>
            <button
              type="button"
              onClick={() => setSide('front')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase transition-colors cursor-pointer ${
                side === 'front'
                  ? 'bg-[#F4BE0B] text-[#020F4A]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Frente (Escudo)
            </button>
          </div>
        </div>

        {/* Quick Team Preset Strip */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {QUICK_TEAMS.map((preset) => {
            const t = TEAMS.find((x) => x.id === preset.id);
            if (!t) return null;
            const active = selectedTeamId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#F4BE0B] text-[#020F4A] border-[#F4BE0B]'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <img
                  src={t.crest}
                  alt={t.name}
                  className="w-6 h-6 rounded-full object-contain p-0.5 bg-white"
                />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Jersey Canvas */}
          <div className="lg:col-span-5 bg-white/8 border border-white/15 rounded-3xl p-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-white/80 mb-3">
              <div className="flex items-center gap-2">
                <img
                  src={selectedTeam.crest}
                  alt={selectedTeam.name}
                  className="w-7 h-7 rounded-full object-contain p-0.5 bg-white"
                />
                <span className="font-extrabold uppercase text-white">
                  {selectedTeam.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSide((s) => (s === 'back' ? 'front' : 'back'))}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#F4BE0B]" />
                Virar camisa
              </button>
            </div>

            <div className="relative w-full max-w-[330px] aspect-[300/360] flex items-center justify-center my-2">
              <svg
                viewBox="0 0 300 360"
                className="w-full h-full drop-shadow-2xl"
                aria-label={`Prévia personalizada ${selectedTeam.name}`}
              >
                <defs>
                  <clipPath id="sim-jersey-clip">
                    <path d={jerseyPath} />
                  </clipPath>
                </defs>

                {/* Base Shirt Fill */}
                <g clipPath="url(#sim-jersey-clip)">
                  <rect x="0" y="0" width="300" height="360" fill={primaryColor} />

                  {/* Patterns */}
                  {pattern === 'vertical' && (
                    <>
                      <rect x="78" y="0" width="24" height="360" fill={secondaryColor} />
                      <rect x="126" y="0" width="24" height="360" fill={secondaryColor} />
                      <rect x="174" y="0" width="24" height="360" fill={secondaryColor} />
                    </>
                  )}
                  {pattern === 'horizontal' && (
                    <>
                      <rect x="0" y="74" width="300" height="34" fill={secondaryColor} />
                      <rect x="0" y="142" width="300" height="34" fill={secondaryColor} />
                      <rect x="0" y="210" width="300" height="34" fill={secondaryColor} />
                      <rect x="0" y="278" width="300" height="34" fill={secondaryColor} />
                    </>
                  )}
                  {pattern === 'sash' && (
                    <polygon
                      points="40,30 105,30 265,345 200,345"
                      fill={secondaryColor}
                    />
                  )}
                  {pattern === 'half' && (
                    <rect x="150" y="0" width="150" height="360" fill={secondaryColor} />
                  )}
                  {pattern === 'sleeves' && !isNba && (
                    <>
                      <rect x="0" y="0" width="84" height="170" fill={secondaryColor} />
                      <rect x="216" y="0" width="84" height="170" fill={secondaryColor} />
                    </>
                  )}

                  {/* Subtle Fabric Shading */}
                  <rect
                    x="0"
                    y="0"
                    width="300"
                    height="360"
                    fill="url(#none)"
                    opacity="0.06"
                  />

                  {/* Collar Trim */}
                  {isNba ? (
                    <path
                      d="M112 28 Q150 76 188 28"
                      fill="none"
                      stroke={trimColor}
                      strokeWidth="9"
                    />
                  ) : (
                    <path
                      d="M102 32 Q150 62 198 32"
                      fill="none"
                      stroke={trimColor}
                      strokeWidth="10"
                    />
                  )}

                  {/* Sleeve Cuffs */}
                  {!isNba && (
                    <>
                      <line
                        x1="26"
                        y1="78"
                        x2="50"
                        y2="152"
                        stroke={trimColor}
                        strokeWidth="10"
                      />
                      <line
                        x1="274"
                        y1="78"
                        x2="250"
                        y2="152"
                        stroke={trimColor}
                        strokeWidth="10"
                      />
                    </>
                  )}
                </g>

                {/* Outline */}
                <path
                  d={jerseyPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="2.5"
                />

                {/* Back View: Custom Name & Number */}
                {side === 'back' && (
                  <>
                    <text
                      x="150"
                      y="112"
                      textAnchor="middle"
                      fill={textColor}
                      stroke={textColor === '#FFFFFF' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.35)'}
                      strokeWidth="1.2"
                      fontFamily={getFontFamily()}
                      fontWeight="800"
                      fontSize={customName.length > 11 ? '20' : '26'}
                      letterSpacing="2.5"
                    >
                      {(customName.trim() || 'SEU NOME').toUpperCase()}
                    </text>

                    <text
                      x="150"
                      y="246"
                      textAnchor="middle"
                      fill={textColor}
                      stroke={textColor === '#FFFFFF' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.35)'}
                      strokeWidth="2.5"
                      fontFamily={getFontFamily()}
                      fontWeight="900"
                      fontSize="132"
                    >
                      {customNumber.trim() || '10'}
                    </text>
                  </>
                )}

                {/* Front View: Team Crest + Optional Front Number */}
                {side === 'front' && (
                  <>
                    <image
                      href={selectedTeam.crest}
                      x={isNba ? '118' : '168'}
                      y={isNba ? '106' : '90'}
                      width={isNba ? '64' : '42'}
                      height={isNba ? '64' : '42'}
                    />
                    {isNba && (
                      <text
                        x="150"
                        y="262"
                        textAnchor="middle"
                        fill={textColor}
                        stroke="rgba(0,0,0,0.35)"
                        strokeWidth="2"
                        fontFamily={getFontFamily()}
                        fontWeight="900"
                        fontSize="82"
                      >
                        {customNumber.trim() || '23'}
                      </text>
                    )}
                    {!isNba && (
                      <text
                        x="150"
                        y="198"
                        textAnchor="middle"
                        fill={textColor}
                        fontFamily={getFontFamily()}
                        fontWeight="800"
                        fontSize="18"
                        letterSpacing="2"
                        opacity="0.9"
                      >
                        DIDIER IMPORTS
                      </text>
                    )}
                  </>
                )}

                {/* Sleeve Patch Preview */}
                {hasPatch && !isNba && (
                  <g>
                    <circle
                      cx="244"
                      cy="108"
                      r="15"
                      fill="#F4BE0B"
                      stroke="#020F4A"
                      strokeWidth="2.5"
                    />
                    <text
                      x="244"
                      y="111"
                      textAnchor="middle"
                      fill="#020F4A"
                      fontWeight="900"
                      fontSize="7"
                    >
                      PATCH
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="w-full rounded-2xl bg-white/10 p-3.5 text-center text-xs text-white/85">
              <span>
                {version === 'jogador' ? 'Versão Jogador (R$ 200)' : 'Versão Torcedor (R$ 160)'} + Personalização (R$ 30)
                {hasPatch ? ` + ${patchName} (R$ 20)` : ''}
              </span>
              <p className="font-display text-3xl font-extrabold text-[#F4BE0B] mt-1">
                {formatBRL(unitPrice)}
              </p>
            </div>
          </div>

          {/* Simulator Controls Panel */}
          <div className="lg:col-span-7 bg-white text-[#061036] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* 1. Name & Number + Font */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
                  Nome nas Costas
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    setSide('back');
                  }}
                  placeholder="Digite o nome..."
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm uppercase font-extrabold focus:outline-none focus:border-[#020F4A]"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
                  Número
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={customNumber}
                  onChange={(e) => {
                    setCustomNumber(e.target.value.replace(/[^0-9]/g, ''));
                    setSide('back');
                  }}
                  placeholder="10"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-extrabold focus:outline-none focus:border-[#020F4A]"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
                  Estilo da Fonte
                </label>
                <select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value as FontStyleType)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:border-[#020F4A]"
                >
                  <option value="condensed">Esportiva</option>
                  <option value="classic">Clássica</option>
                  <option value="modern">Moderna</option>
                  <option value="retro">Retrô</option>
                </select>
              </div>
            </div>

            {/* 2. Team Picker */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
                Escolha o Time (345 opções)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={teamFilter}
                    onChange={(e) => setTeamFilter(e.target.value)}
                    placeholder="Filtrar time para o simulador..."
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#020F4A]"
                  />
                </div>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="sm:w-60 h-10 px-3 rounded-xl border border-slate-300 text-xs font-bold bg-white text-[#020F4A] focus:outline-none focus:border-[#020F4A]"
                >
                  {!filteredTeams.some((t) => t.id === selectedTeam.id) && (
                    <option value={selectedTeam.id}>{selectedTeam.name}</option>
                  )}
                  {filteredTeams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.leagueName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Pattern & Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-extrabold uppercase text-[#020F4A] mb-2">
                  Padrão do Manto
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      ['solid', 'Lisa'],
                      ['vertical', 'Listras V.'],
                      ['horizontal', 'Listras H.'],
                      ['sash', 'Diagonal'],
                      ['half', 'Meio a Meio'],
                      ['sleeves', 'Mangas'],
                    ] as const
                  ).map(([pid, plabel]) => (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => setPattern(pid)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
                        pattern === pid
                          ? 'bg-[#020F4A] text-[#F4BE0B] border-[#020F4A]'
                          : 'bg-[#F4F6FA] text-slate-700 border-slate-200 hover:border-[#020F4A]'
                      }`}
                    >
                      {plabel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="block text-xs font-extrabold uppercase text-[#020F4A]">
                  Cores da Camisa e Estampa
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F4F6FA] border border-slate-200 font-semibold">
                    <span>Principal</span>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-6 h-6 rounded-full cursor-pointer border-0 bg-transparent"
                    />
                  </label>
                  <label className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F4F6FA] border border-slate-200 font-semibold">
                    <span>Secundária</span>
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-6 h-6 rounded-full cursor-pointer border-0 bg-transparent"
                    />
                  </label>
                  <label className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F4F6FA] border border-slate-200 font-semibold">
                    <span>Gola/Punho</span>
                    <input
                      type="color"
                      value={trimColor}
                      onChange={(e) => setTrimColor(e.target.value)}
                      className="w-6 h-6 rounded-full cursor-pointer border-0 bg-transparent"
                    />
                  </label>
                  <label className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F4F6FA] border border-slate-200 font-semibold">
                    <span>Nome/Nº</span>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-6 h-6 rounded-full cursor-pointer border-0 bg-transparent"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={`Cor Principal: ${c.name}`}
                      onClick={() => setPrimaryColor(c.hex)}
                      className="w-5 h-5 rounded-full border border-slate-300 shadow-xs cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Version, Size & Patch (+R$ 20) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <span className="block text-xs font-extrabold uppercase text-[#020F4A] mb-2">
                  Versão & Tamanho
                </span>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setVersion('torcedor')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border-2 cursor-pointer ${
                      version === 'torcedor'
                        ? 'border-[#020F4A] bg-[#020F4A] text-[#F4BE0B]'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Torcedor R$ 160
                  </button>
                  <button
                    type="button"
                    onClick={() => setVersion('jogador')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border-2 cursor-pointer ${
                      version === 'jogador'
                        ? 'border-[#020F4A] bg-[#020F4A] text-[#F4BE0B]'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Jogador R$ 200
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {STORE_CONFIG.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`h-8 rounded-lg text-xs font-extrabold border cursor-pointer ${
                        size === s
                          ? 'bg-[#F4BE0B] text-[#020F4A] border-[#DFA902]'
                          : 'bg-[#F4F6FA] text-[#020F4A] border-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#F4F6FA] p-3.5 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#020F4A]">
                    <input
                      type="checkbox"
                      checked={hasPatch}
                      onChange={(e) => setHasPatch(e.target.checked)}
                      className="w-4 h-4 accent-[#020F4A]"
                    />
                    <Award className="w-4 h-4 text-[#DFA902]" />
                    Adicionar Patch
                  </span>
                  <span className="text-xs font-extrabold text-[#020F4A] bg-[#F4BE0B]/30 px-2 py-0.5 rounded-full">
                    + R$ 20
                  </span>
                </label>
                {hasPatch && (
                  <select
                    value={patchName}
                    onChange={(e) => setPatchName(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#020F4A]"
                  >
                    {PATCH_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleOrderSimulated}
              className="w-full h-12 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] font-extrabold text-sm uppercase tracking-wide inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              Encomendar Esta Camisa Personalizada ({formatBRL(unitPrice)})
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
