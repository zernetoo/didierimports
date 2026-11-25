'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Award,
  Check,
  Download,
  Sliders,
} from 'lucide-react';
import { STORE_CONFIG, TEAMS } from '@/data/catalog';
import {
  CartItem,
  JerseyVersion,
  calculateUnitPrice,
  formatBRL,
} from '@/types/store';

interface JerseySimulatorProps {
  onAddToCart: (item: CartItem) => void;
}

interface StudioJerseyPreset {
  teamId: string;
  name: string;
  subtitle: string;
  image: string;
  crest: string;
  defaultText: string;
  defaultStroke: string;
  nameY: number;
  numberY: number;
}

const STUDIO_PRESETS: StudioJerseyPreset[] = [
  {
    teamId: 'flamengo',
    name: 'Flamengo',
    subtitle: 'Rubro-Negra Casa',
    image: '/simulator/flamengo.jpg',
    crest: '/crests-v3/flamengo.png',
    defaultText: '#FFFFFF',
    defaultStroke: '#111317',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'real-madrid',
    name: 'Real Madrid',
    subtitle: '26/27 Casa',
    image: '/simulator/real-madrid.jpg',
    crest: '/crests-v3/real-madrid.png',
    defaultText: '#0B1638',
    defaultStroke: '#FFFFFF',
    nameY: 0.29,
    numberY: 0.55,
  },
  {
    teamId: 'brasil',
    name: 'Brasil',
    subtitle: 'Seleção 2026',
    image: '/simulator/brasil.jpg',
    crest: '/crests-v3/brasil.png',
    defaultText: '#007A33',
    defaultStroke: '#F4BE0B',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'palmeiras',
    name: 'Palmeiras',
    subtitle: '2026 Casa',
    image: '/simulator/palmeiras.jpg',
    crest: '/crests-v3/palmeiras.png',
    defaultText: '#FFFFFF',
    defaultStroke: '#004D29',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'corinthians',
    name: 'Corinthians',
    subtitle: '2026 Casa',
    image: '/simulator/corinthians.jpg',
    crest: '/crests-v3/corinthians.png',
    defaultText: '#111317',
    defaultStroke: '#FFFFFF',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'barcelona',
    name: 'Barcelona',
    subtitle: '26/27 Azul-Grená',
    image: '/simulator/barcelona.jpg',
    crest: '/crests-v3/barcelona.png',
    defaultText: '#F4BE0B',
    defaultStroke: '#020F4A',
    nameY: 0.30,
    numberY: 0.55,
  },
  {
    teamId: 'argentina',
    name: 'Argentina',
    subtitle: 'Seleção Casa',
    image: '/simulator/argentina.jpg',
    crest: '/crests-v3/argentina.png',
    defaultText: '#111317',
    defaultStroke: '#FFFFFF',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'sao-paulo',
    name: 'São Paulo',
    subtitle: '2026 Casa',
    image: '/simulator/sao-paulo.jpg',
    crest: '/crests-v3/sao-paulo.png',
    defaultText: '#111317',
    defaultStroke: '#FFFFFF',
    nameY: 0.35,
    numberY: 0.61,
  },
  {
    teamId: 'vasco-da-gama',
    name: 'Vasco',
    subtitle: '2026 Preta',
    image: '/simulator/vasco-da-gama.jpg',
    crest: '/crests-v3/vasco-da-gama.png',
    defaultText: '#FFFFFF',
    defaultStroke: '#111317',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'psg',
    name: 'PSG',
    subtitle: '25/26 Marinho',
    image: '/simulator/psg.jpg',
    crest: '/crests-v3/psg.png',
    defaultText: '#FFFFFF',
    defaultStroke: '#020F4A',
    nameY: 0.30,
    numberY: 0.56,
  },
  {
    teamId: 'manchester-city',
    name: 'Man. City',
    subtitle: '26/27 Celeste',
    image: '/simulator/manchester-city.jpg',
    crest: '/crests-v3/manchester-city.png',
    defaultText: '#0A1B3D',
    defaultStroke: '#FFFFFF',
    nameY: 0.30,
    numberY: 0.56,
  },
];

type FontPreset = 'oficial' | 'champions' | 'classica' | 'retro';

const PRINT_COLORS = [
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Preto', hex: '#111317' },
  { name: 'Dourado', hex: '#F4BE0B' },
  { name: 'Azul Marinho', hex: '#0B1638' },
  { name: 'Verde CBF', hex: '#007A33' },
  { name: 'Vermelho', hex: '#D91926' },
  { name: 'Prata', hex: '#CBD5E1' },
];

const PATCH_OPTIONS = [
  'Patch Brasileirão',
  'Patch Libertadores',
  'Patch Champions League',
  'Patch Premier League',
  'Patch LaLiga',
  'Patch Copa do Mundo',
];

function drawArchedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  baseY: number,
  radius: number,
  curved: boolean,
  fill: string,
  stroke: string,
  strokeWidth: number
) {
  const chars = text.split('');
  if (chars.length === 0) return;

  if (!curved || chars.length <= 2) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (strokeWidth > 0) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = stroke;
      ctx.lineJoin = 'round';
      ctx.strokeText(text, centerX, baseY);
    }
    ctx.fillStyle = fill;
    ctx.fillText(text, centerX, baseY);
    ctx.restore();
    return;
  }

  const widths = chars.map((ch) => ctx.measureText(ch).width + 3);
  const totalWidth = widths.reduce((a, b) => a + b, 0);
  const totalAngle = totalWidth / radius;
  let currentAngle = -totalAngle / 2;

  ctx.save();
  ctx.translate(centerX, baseY + radius);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < chars.length; i++) {
    const chAngle = widths[i] / radius;
    const midAngle = currentAngle + chAngle / 2;
    ctx.save();
    ctx.rotate(midAngle);
    if (strokeWidth > 0) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = stroke;
      ctx.lineJoin = 'round';
      ctx.strokeText(chars[i], 0, -radius);
    }
    ctx.fillStyle = fill;
    ctx.fillText(chars[i], 0, -radius);
    ctx.restore();
    currentAngle += chAngle;
  }
  ctx.restore();
}

export function JerseySimulator({ onAddToCart }: JerseySimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [presetIdx, setPresetIdx] = useState(0);
  const [customName, setCustomName] = useState('DIDIER');
  const [customNumber, setCustomNumber] = useState('10');
  const [textColor, setTextColor] = useState(STUDIO_PRESETS[0].defaultText);
  const [strokeColor, setStrokeColor] = useState(STUDIO_PRESETS[0].defaultStroke);
  const [fontPreset, setFontPreset] = useState<FontPreset>('oficial');
  const [curvedName, setCurvedName] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [showCrestOnNum, setShowCrestOnNum] = useState(true);
  const [yOffset, setYOffset] = useState(0);
  const [version, setVersion] = useState<JerseyVersion>('torcedor');
  const [size, setSize] = useState('G');
  const [hasPatch, setHasPatch] = useState(false);
  const [patchName, setPatchName] = useState('Patch Brasileirão');

  const preset = STUDIO_PRESETS[presetIdx];
  const team = useMemo(
    () => TEAMS.find((t) => t.id === preset.teamId) || TEAMS[0],
    [preset.teamId]
  );

  const unitPrice = calculateUnitPrice(version, true, hasPatch);

  const handleSelectPreset = (idx: number) => {
    const next = STUDIO_PRESETS[idx];
    setPresetIdx(idx);
    setTextColor(next.defaultText);
    setStrokeColor(next.defaultStroke);
    setYOffset(0);
  };

  // Render photorealistic composite onto HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 800;
    const H = 800;
    canvas.width = W;
    canvas.height = H;

    let cancelled = false;
    const jerseyImg = new Image();
    jerseyImg.crossOrigin = 'anonymous';
    const crestImg = new Image();
    crestImg.crossOrigin = 'anonymous';

    let jerseyLoaded = false;
    let crestLoaded = false;

    const render = () => {
      if (cancelled || !jerseyLoaded) return;

      // 1. Draw real studio jersey back photograph (cover fit)
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, W, H);

      const scale = Math.max(W / jerseyImg.width, H / jerseyImg.height);
      const dw = jerseyImg.width * scale;
      const dh = jerseyImg.height * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;
      ctx.drawImage(jerseyImg, dx, dy, dw, dh);

      // 2. Configure authentic athletic typography
      const fontStack =
        fontPreset === 'classica'
          ? '900 %SIZE%px "Barlow Condensed", "Arial Narrow", sans-serif'
          : fontPreset === 'champions'
            ? '800 %SIZE%px "Inter", "Helvetica Neue", sans-serif'
            : fontPreset === 'retro'
              ? '900 %SIZE%px Impact, "Arial Black", sans-serif'
              : '800 %SIZE%px "Barlow Condensed", Impact, sans-serif';

      const cleanName = (customName.trim() || 'SEU NOME').toUpperCase();
      const cleanNum = customNumber.trim() || '10';

      // Subtle print drop shadow simulating real heat-pressed vinyl on cloth
      ctx.save();
      ctx.globalAlpha = 0.94;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      // 3. Draw Curved / Straight Player Name across shoulders
      const nameSize = cleanName.length > 11 ? 36 : cleanName.length > 8 ? 44 : 50;
      ctx.font = fontStack.replace('%SIZE%', String(nameSize));
      const nameY = H * preset.nameY + yOffset;
      drawArchedText(
        ctx,
        cleanName,
        W / 2,
        nameY,
        460,
        curvedName,
        textColor,
        strokeColor,
        showOutline ? 5 : 0
      );

      // 4. Draw Official Bold Athletic Jersey Number
      const numSize = cleanNum.length >= 3 ? 170 : 235;
      ctx.font = fontStack.replace('%SIZE%', String(numSize));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const numY = H * preset.numberY + yOffset;

      if (showOutline) {
        ctx.lineWidth = 10;
        ctx.strokeStyle = strokeColor;
        ctx.lineJoin = 'round';
        ctx.strokeText(cleanNum, W / 2, numY);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(cleanNum, W / 2, numY);

      // Subtle inner sporty vertical pinstripe line inside number (FootballShirtMaker realism)
      ctx.shadowColor = 'transparent';
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 2;
      ctx.strokeStyle = textColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
      ctx.strokeText(cleanNum, W / 2, numY);

      // 5. Stamp real mini club crest at the bottom of the number (authentic official detail!)
      if (showCrestOnNum && crestLoaded) {
        ctx.globalAlpha = 0.92;
        const badgeSize = 32;
        const bx = W / 2 - badgeSize / 2;
        const by = numY + numSize * 0.28;
        ctx.beginPath();
        ctx.arc(W / 2, by + badgeSize / 2, badgeSize / 2 + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fill();
        ctx.drawImage(crestImg, bx, by, badgeSize, badgeSize);
      }

      ctx.restore();

      // 6. Subtle cloth-fold lighting overlay over print area so letters sit INTO the fabric
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.12;
      ctx.drawImage(jerseyImg, dx, dy, dw, dh);
      ctx.restore();
    };

    jerseyImg.onload = () => {
      jerseyLoaded = true;
      render();
    };
    crestImg.onload = () => {
      crestLoaded = true;
      render();
    };
    jerseyImg.src = preset.image;
    crestImg.src = preset.crest;

    return () => {
      cancelled = true;
    };
  }, [
    preset,
    customName,
    customNumber,
    textColor,
    strokeColor,
    fontPreset,
    curvedName,
    showOutline,
    showCrestOnNum,
    yOffset,
  ]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `didier-imports-${preset.teamId}-${(customName || 'manto').toLowerCase()}-${customNumber || '10'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleOrderSimulated = () => {
    const previewUrl = canvasRef.current?.toDataURL('image/jpeg', 0.72);
    const item: CartItem = {
      cartItemId: `sim-${team.id}-${version}-${size}-${Date.now()}`,
      teamId: team.id,
      teamName: team.name,
      leagueName: team.leagueName,
      sport: team.sport,
      crest: team.crest,
      selectedPhotoUrl: previewUrl || preset.image,
      version,
      size,
      modelNote: `${preset.subtitle} (Simulador Oficial)`,
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

  return (
    <section
      id="simulador"
      className="bg-[#020F4A] text-white py-16 scroll-mt-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4BE0B] text-[#020F4A] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Simulador Fotorealista Oficial
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase mt-2 leading-none">
              Simule Sua Personalização na Camisa Real
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-2">
              Visualize seu nome e número aplicados diretamente sobre fotos reais de estúdio dos mantos, baixe a imagem ou adicione direto na sacola. Personalização fixa <strong className="text-[#F4BE0B]">R$ 30</strong> e Patch <strong className="text-[#F4BE0B]">R$ 20</strong>.
            </p>
          </div>
        </div>

        {/* Studio Jersey Preset Strip (Real Jersey Back Thumbnails!) */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {STUDIO_PRESETS.map((p, idx) => {
            const active = idx === presetIdx;
            return (
              <button
                key={p.teamId}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-2xl border-2 shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#F4BE0B] text-[#020F4A] border-[#F4BE0B] shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-10 rounded-xl object-cover bg-white shrink-0"
                />
                <div className="text-left leading-tight">
                  <span className="block text-xs font-extrabold uppercase">
                    {p.name}
                  </span>
                  <span
                    className={`block text-[10px] font-semibold ${
                      active ? 'text-[#020F4A]/80' : 'text-white/70'
                    }`}
                  >
                    {p.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Photorealistic Real-Jersey Canvas Stage (FootballShirtMaker style) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between text-xs text-[#020F4A]">
              <div className="flex items-center gap-2">
                <img
                  src={preset.crest}
                  alt={preset.name}
                  className="w-8 h-8 rounded-full bg-[#F4F6FA] p-1 object-contain"
                />
                <div>
                  <span className="font-extrabold uppercase block leading-none">
                    {preset.name} — {preset.subtitle}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Prévia real de estampa nas costas
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadPng}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#020F4A] hover:bg-[#0A1F7A] text-white text-[11px] font-extrabold uppercase cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#F4BE0B]" />
                Baixar PNG
              </button>
            </div>

            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F4F6FA] border border-slate-200">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain block"
                aria-label={`Prévia realista da camisa ${preset.name} personalizada com ${customName} ${customNumber}`}
              />
            </div>
          </div>

          {/* RIGHT: Clean FootballShirtMaker-style Controls */}
          <div className="lg:col-span-6 bg-white text-[#061036] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* 1. Name & Number */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
                  1. Nome nas Costas
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Digite o nome..."
                  className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 text-sm uppercase font-extrabold focus:outline-none focus:border-[#020F4A]"
                />
              </div>
              <div className="sm:col-span-4">
                <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
                  Número
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={customNumber}
                  onChange={(e) =>
                    setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))
                  }
                  placeholder="10"
                  className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 text-base font-extrabold text-center focus:outline-none focus:border-[#020F4A]"
                />
              </div>
            </div>

            {/* 2. Typography & Style */}
            <div>
              <span className="block text-xs font-extrabold uppercase text-[#020F4A] mb-2">
                2. Estilo da Tipografia Oficial
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    ['oficial', 'Oficial'],
                    ['champions', 'Champions'],
                    ['classica', 'Clássica'],
                    ['retro', 'Retrô'],
                  ] as const
                ).map(([fid, label]) => (
                  <button
                    key={fid}
                    type="button"
                    onClick={() => setFontPreset(fid)}
                    className={`h-10 rounded-xl text-xs font-extrabold border-2 transition-colors cursor-pointer ${
                      fontPreset === fid
                        ? 'bg-[#020F4A] text-[#F4BE0B] border-[#020F4A]'
                        : 'bg-[#F4F6FA] text-slate-700 border-slate-200 hover:border-[#020F4A]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Print Color, Outline & Position Fine-Tune */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="block text-xs font-extrabold uppercase text-[#020F4A]">
                  3. Cor da Estampa
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {PRINT_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => setTextColor(c.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        textColor.toUpperCase() === c.hex
                          ? 'scale-115 border-[#020F4A] ring-2 ring-[#F4BE0B]'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                  <input
                    type="color"
                    aria-label="Cor personalizada da estampa"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-7 h-7 rounded-full cursor-pointer border border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-extrabold uppercase text-[#020F4A]">
                  Cor da Borda / Contorno
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {PRINT_COLORS.slice(0, 6).map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => {
                        setStrokeColor(c.hex);
                        setShowOutline(true);
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        showOutline && strokeColor.toUpperCase() === c.hex
                          ? 'scale-115 border-[#020F4A] ring-2 ring-[#F4BE0B]'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                  <input
                    type="color"
                    aria-label="Cor personalizada do contorno"
                    value={strokeColor}
                    onChange={(e) => {
                      setStrokeColor(e.target.value);
                      setShowOutline(true);
                    }}
                    className="w-7 h-7 rounded-full cursor-pointer border border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Realism Toggles + Vertical Alignment */}
            <div className="rounded-2xl bg-[#F4F6FA] border border-slate-200 p-3.5 space-y-3 text-xs">
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center gap-1.5 font-bold text-[#020F4A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={curvedName}
                    onChange={(e) => setCurvedName(e.target.checked)}
                    className="accent-[#020F4A]"
                  />
                  Nome arqueado
                </label>
                <label className="inline-flex items-center gap-1.5 font-bold text-[#020F4A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOutline}
                    onChange={(e) => setShowOutline(e.target.checked)}
                    className="accent-[#020F4A]"
                  />
                  Contorno oficial
                </label>
                <label className="inline-flex items-center gap-1.5 font-bold text-[#020F4A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCrestOnNum}
                    onChange={(e) => setShowCrestOnNum(e.target.checked)}
                    className="accent-[#020F4A]"
                  />
                  Escudo no número
                </label>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 font-bold text-slate-600 shrink-0">
                  <Sliders className="w-3.5 h-3.5" />
                  Altura:
                </span>
                <input
                  type="range"
                  min={-45}
                  max={55}
                  value={yOffset}
                  onChange={(e) => setYOffset(Number(e.target.value))}
                  className="flex-1 accent-[#020F4A]"
                />
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
