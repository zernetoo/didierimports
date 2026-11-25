'use client';

import React, { useState } from 'react';
import {
  Ruler,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  Heart,
  Clock,
  Flame,
  ZoomIn,
  X,
  Play,
  Film,
  ImageIcon,
} from 'lucide-react';

export interface VideoEntry {
  id: string;
  title: string;
  category: string;
  src: string;
  poster: string;
}

export interface SpecialMediaManifest {
  top10: string[];
  medidas: string[];
  produtos: string[];
  exemplos: string[];
  videos?: VideoEntry[];
}

interface InfoSectionsProps {
  specialMedia: SpecialMediaManifest;
  onJumpToCatalog: () => void;
}

interface CompactSizeChart {
  id: string;
  label: string;
  image: string;
  note?: string;
  columns: string[];
  rows: string[][];
}

// Exact numbers transcribed from all 9 official Didier Imports size chart images!
const COMPACT_SIZE_CHARTS: CompactSizeChart[] = [
  {
    id: 'torcedor',
    label: 'Torcedor',
    image: '/media/medidas/medida-09.jpg',
    note: 'Para Versão Jogador (Slim Fit), escolha 1 tamanho acima caso prefira caimento mais solto.',
    columns: ['Tam.', 'Comprimento', 'Largura', 'Altura (cm)', 'Peso (kg)'],
    rows: [
      ['P', '69–71 cm', '53–55 cm', '162–170', '50–62'],
      ['M', '71–73 cm', '55–57 cm', '170–176', '62–78'],
      ['G', '73–75 cm', '57–58 cm', '176–182', '78–83'],
      ['GG', '75–78 cm', '58–60 cm', '182–190', '83–90'],
      ['2GG', '78–81 cm', '60–62 cm', '190–195', '90–97'],
      ['3GG', '81–83 cm', '62–64 cm', '192–197', '97–104'],
    ],
  },
  {
    id: 'feminina',
    label: 'Feminina',
    image: '/media/medidas/medida-01.jpg',
    columns: ['Tam.', 'Comprimento', 'Largura', 'Altura (cm)'],
    rows: [
      ['P', '61–63 cm', '40–41 cm', '150–160'],
      ['M', '63–66 cm', '41–44 cm', '160–165'],
      ['G', '66–69 cm', '44–47 cm', '165–170'],
      ['GG', '69–71 cm', '47–50 cm', '170–175'],
    ],
  },
  {
    id: 'nba',
    label: 'NBA',
    image: '/media/medidas/medida-05.jpg',
    columns: ['Tam.', 'Numeração', 'Peito', 'Comprimento'],
    rows: [
      ['P', '44', '108 cm', '76 cm'],
      ['M', '48', '116 cm', '80 cm'],
      ['G', '50', '122 cm', '82 cm'],
      ['GG', '52', '126 cm', '84 cm'],
      ['2GG', '54', '130 cm', '86 cm'],
      ['3GG', '56', '134 cm', '88 cm'],
    ],
  },
  {
    id: 'retro',
    label: 'Retrô',
    image: '/media/medidas/medida-06.jpg',
    columns: ['Tam.', 'Largura', 'Comprimento', 'Altura (cm)'],
    rows: [
      ['P', '48 cm', '67 cm', '160–165'],
      ['M', '50 cm', '70 cm', '165–170'],
      ['G', '52,5 cm', '73,5 cm', '170–175'],
      ['GG', '55 cm', '77 cm', '175–178'],
      ['2GG', '57 cm', '80 cm', '179–184'],
    ],
  },
  {
    id: 'infantil',
    label: 'Infantil',
    image: '/media/medidas/medida-02.jpg',
    columns: ['Tam.', 'Idade', 'Altura', 'Compr.', 'Largura'],
    rows: [
      ['14', '2–3 anos', '85–95', '41–44', '33–35'],
      ['16', '3–4 anos', '95–105', '44–47', '35–37'],
      ['18', '4–5 anos', '105–115', '47–50', '37–39'],
      ['20', '5–6 anos', '115–125', '50–53', '39–41'],
      ['22', '6–7 anos', '125–135', '53–56', '41–43'],
      ['24', '8–9 anos', '135–145', '56–59', '43–45'],
      ['26', '10–11 anos', '145–155', '59–62', '45–47'],
      ['28', '12–13 anos', '155–165', '62–65', '47–49'],
    ],
  },
  {
    id: 'polo',
    label: 'Polo',
    image: '/media/medidas/medida-04.jpg',
    columns: ['Tam.', 'Largura', 'Compr.', 'Manga', 'Altura'],
    rows: [
      ['P', '48 cm', '70 cm', '34,5 cm', '160–170'],
      ['M', '50 cm', '72 cm', '36 cm', '165–175'],
      ['G', '52 cm', '74 cm', '37,5 cm', '175–180'],
      ['GG', '54 cm', '76 cm', '39 cm', '180–185'],
    ],
  },
  {
    id: 'short',
    label: 'Short',
    image: '/media/medidas/medida-07.jpg',
    columns: ['Tam.', 'Comprimento', 'Cintura', 'Altura (cm)'],
    rows: [
      ['P', '40 cm', '60 cm', '150–159'],
      ['M', '42 cm', '62 cm', '160–169'],
      ['G', '44 cm', '64 cm', '170–179'],
      ['GG', '46 cm', '66 cm', '180–189'],
      ['2GG', '48 cm', '68 cm', '190–199'],
    ],
  },
  {
    id: 'treino',
    label: 'Kit Treino',
    image: '/media/medidas/medida-08.jpg',
    columns: ['Tam.', 'Altura', 'Peso', 'Compr.', 'Peito', 'Calça'],
    rows: [
      ['P', '167–170', '50–67', '67 cm', '96 cm', '98 cm'],
      ['M', '171–176', '62–75', '70 cm', '100 cm', '101 cm'],
      ['G', '177–182', '70–80', '72 cm', '104 cm', '104 cm'],
      ['GG', '183–190', '81–90', '74 cm', '106 cm', '107 cm'],
    ],
  },
  {
    id: 'baby',
    label: 'Baby (Body)',
    image: '/media/medidas/medida-03.jpg',
    columns: ['Medida', '9 Meses', '12 Meses'],
    rows: [
      ['Comprimento roupa', '45 cm', '50 cm'],
      ['Circunferência peito', '25 cm', '27 cm'],
      ['Largura do ombro', '22 cm', '25 cm'],
      ['Comprimento manga', '9 cm', '12 cm'],
    ],
  },
];

export function InfoSections({
  specialMedia,
  onJumpToCatalog,
}: InfoSectionsProps) {
  const [zoomImg, setZoomImg] = useState<{ src: string; title: string } | null>(
    null
  );
  const [activeSizeTab, setActiveSizeTab] = useState<string>('torcedor');
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);

  const videos = specialMedia.videos || [];
  const activeVideo = videos[activeVideoIdx] || videos[0] || null;
  const activeChart =
    COMPACT_SIZE_CHARTS.find((c) => c.id === activeSizeTab) ||
    COMPACT_SIZE_CHARTS[0];

  return (
    <>
      {/* REAL PLAYABLE MP4 VIDEOS OF OUR PRODUCTS */}
      {videos.length > 0 && activeVideo && (
        <section
          id="videos"
          className="bg-[#F4F6FA] py-14 border-t border-slate-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
                  <Film className="w-4 h-4 text-[#DFA902]" />
                  Qualidade Real em Vídeo
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
                  Vídeos de Nossos Produtos
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Aperte o play e confira de perto o tecido, os escudos e o acabamento real das camisas de Futebol e NBA.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#020F4A] text-[#F4BE0B] text-xs font-extrabold uppercase">
                {videos.length} vídeos reais disponíveis
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Featured Real HTML5 Video Player */}
              <div className="lg:col-span-6 bg-[#020F4A] rounded-3xl p-4 shadow-xl">
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] sm:aspect-video flex items-center justify-center">
                  <video
                    key={activeVideo.src}
                    src={activeVideo.src}
                    poster={activeVideo.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                  >
                    Seu navegador não suporta reprodução de vídeo MP4.
                  </video>
                </div>
                <div className="mt-3 px-1 flex items-center justify-between gap-3 text-white">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F4BE0B]">
                      {activeVideo.category}
                    </span>
                    <h3 className="font-display text-xl font-extrabold uppercase leading-tight">
                      {activeVideo.title}
                    </h3>
                  </div>
                  <span className="text-xs text-white/70 font-semibold shrink-0">
                    Vídeo {activeVideoIdx + 1} de {videos.length}
                  </span>
                </div>
              </div>

              {/* Interactive Video Playlist Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {videos.map((v, idx) => {
                  const selected = idx === activeVideoIdx;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveVideoIdx(idx)}
                      className={`group relative rounded-2xl overflow-hidden border-2 bg-white text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#020F4A] ring-2 ring-[#F4BE0B]'
                          : 'border-slate-200 hover:border-[#020F4A]'
                      }`}
                    >
                      <div className="relative aspect-[4/3] bg-[#020F4A]">
                        <img
                          src={v.poster}
                          alt={v.title}
                          loading="lazy"
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                          <span
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                              selected
                                ? 'bg-[#F4BE0B] text-[#020F4A]'
                                : 'bg-white/95 text-[#020F4A]'
                            }`}
                          >
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </span>
                        </div>
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#020F4A]/90 text-[#F4BE0B] text-[9px] font-extrabold uppercase">
                          {v.category}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <p className="text-[11px] font-extrabold text-[#020F4A] line-clamp-1">
                          {v.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ULTRA-COMPACT TABBED SIZE GUIDE (Occupies 65% less space!) */}
      <section
        id="tabela-medidas"
        className="bg-white py-12 border-t border-slate-200 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-3xl bg-[#F4F6FA] border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            {/* Compact Header + "Ver Arte Original" Button */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center shrink-0">
                  <Ruler className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#020F4A] leading-none">
                    Tabela de Medidas Oficial
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Escolha a categoria abaixo para ver as medidas exatas em cm
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setZoomImg({
                    src: activeChart.image,
                    title: `Tabela Oficial — ${activeChart.label}`,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#020F4A] hover:text-white text-[#020F4A] border border-slate-300 text-xs font-extrabold uppercase transition-colors cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#DFA902]" />
                Ver Arte Original
              </button>
            </div>

            {/* Compact Single-Row Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {COMPACT_SIZE_CHARTS.map((c) => {
                const active = c.id === activeSizeTab;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveSizeTab(c.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#020F4A] text-[#F4BE0B]'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#020F4A]'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Clean Compact HTML Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#020F4A] text-white text-[11px] uppercase tracking-wider">
                    {activeChart.columns.map((col) => (
                      <th key={col} className="py-2.5 px-3.5 font-extrabold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeChart.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F4F6FA]">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2 px-3.5 ${
                            cIdx === 0
                              ? 'font-extrabold text-[#020F4A]'
                              : 'text-slate-700 font-medium'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {activeChart.note && (
              <p className="text-[11px] text-slate-600">
                <strong>Dica:</strong> {activeChart.note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* TOP MAIS VENDIDAS */}
      {specialMedia.top10.length > 0 && (
        <section
          id="top-vendidas"
          className="bg-[#F4F6FA] py-14 border-t border-slate-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
                  <Flame className="w-4 h-4 text-[#DFA902]" />
                  Destaques Didier Imports
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
                  Top Camisas Mais Vendidas
                </h2>
              </div>
              <button
                type="button"
                onClick={onJumpToCatalog}
                className="px-5 py-2.5 rounded-full bg-[#020F4A] hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer"
              >
                Escolher meu time no catálogo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              {specialMedia.top10.slice(0, 8).map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() =>
                    setZoomImg({
                      src,
                      title: `Top Mais Vendida #${idx + 1}`,
                    })
                  }
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-[#020F4A] hover:shadow-lg transition-all cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Camisa Mais Vendida #${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#020F4A]/90 text-[#F4BE0B] text-[10px] font-extrabold uppercase">
                    Top #{idx + 1}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-[#020F4A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXEMPLOS JÁ PERSONALIZADOS */}
      {specialMedia.exemplos.length > 0 && (
        <section
          id="exemplos-personalizados"
          className="bg-white py-14 border-t border-slate-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
                <Sparkles className="w-4 h-4 text-[#DFA902]" />
                Qualidade Real das Estampas
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
                Exemplos Já Personalizados
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Fotos reais de camisas já personalizadas com nome, número e patch entregues pela Didier Imports.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {specialMedia.exemplos.slice(0, 8).map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() =>
                    setZoomImg({
                      src,
                      title: `Exemplo Personalizado #${idx + 1}`,
                    })
                  }
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F4F6FA] border border-slate-200 hover:border-[#020F4A] hover:shadow-lg transition-all cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Camisa Personalizada #${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-[#020F4A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Care Guide: Exact PDF Page 5 Content */}
      <section
        id="cuidados"
        className="bg-[#F4F6FA] py-14 border-t border-slate-200 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
              Dica Didier Imports
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
              Como Lavar e Preservar o Seu Manto
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Seguindo todos os cuidados de lavagem e armazenamento de sua camisa, você terá sua camisa na mesma proporção de qualidade por até mais de dois anos na média.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border-2 border-red-200 p-6">
              <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-red-100">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="font-display text-2xl font-extrabold uppercase text-red-700">
                  Forma Errada
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Não lave a seco, nem use máquina de lavar ou secadora.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Não utilize alvejante, amaciante ou sabão em pó.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Não deixe de molho por tempo prolongado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Não passe ferro quente sobre a camisa, escudo ou estampa.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6">
              <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-emerald-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-display text-2xl font-extrabold uppercase text-emerald-700">
                  Forma Certa
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Use apenas detergente neutro e lave sempre à mão.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Para manchas, use tira-manchas e esfregue delicadamente com escova de dente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Para conservar, prefira cabides e guarde em locais sem umidade.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Seque naturalmente à sombra para preservar as cores e o tecido.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About DIDIER IMPORTS */}
      <section className="bg-white py-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-[#F4F6FA] p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center mb-3.5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Quem Somos Nós?
              </h3>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                Somos apaixonados pelos esportes e pelo que eles representam. Na{' '}
                <strong>DIDIER IMPORTS</strong> unimos qualidade e tradição para oferecer camisas que carregam histórias e despertam emoções. Aqui, o amor pelo esporte veste você!
              </p>
            </div>

            <div className="rounded-3xl bg-[#F4F6FA] p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-[#F4BE0B] text-[#020F4A] flex items-center justify-center mb-3.5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Qualidade dos Produtos
              </h3>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                Nossas camisas de times são feitas com tecido de alta qualidade, garantindo conforto, durabilidade e ótimo caimento. Perfeita para torcer, jogar ou usar no dia a dia — porque vestir seu time também é mostrar estilo e paixão!
              </p>
            </div>

            <div className="rounded-3xl bg-[#F4F6FA] p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3.5">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Duração da Qualidade do Tecido
              </h3>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                Seguindo todos os cuidados de lavagem e armazenamento de sua camisa, você terá sua camisa na mesma proporção de qualidade por até{' '}
                <strong>mais de dois anos na média</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Size Charts / Top 10 / Examples */}
      {zoomImg && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomImg(null)}
        >
          <button
            type="button"
            onClick={() => setZoomImg(null)}
            aria-label="Fechar visualização"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomImg.src}
              alt={zoomImg.title}
              className="max-w-full max-h-[82vh] rounded-2xl object-contain shadow-2xl"
            />
            <span className="px-4 py-1.5 rounded-full bg-[#020F4A] text-[#F4BE0B] text-xs font-extrabold uppercase">
              {zoomImg.title}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
