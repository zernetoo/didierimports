'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { STORE_CONFIG } from '@/data/catalog';

interface HeroBannerProps {
  onSelectLeague: (leagueId: string) => void;
}

const SLIDES = [
  {
    id: 'main',
    image: '/banners/hero-main.jpg',
    tag: 'CATÁLOGO OFICIAL • SOB ENCOMENDA',
    title: 'VISTA A PAIXÃO DO SEU TIME',
    subtitle:
      'Explore 345 clubes, seleções mundiais e franquias da NBA com mais de 14.000 fotos reais de modelos direto aqui no site.',
    ctaLabel: 'Explorar Catálogo Completo',
    ctaLeague: 'todos',
    secondaryLabel: 'Simular Personalização',
    secondaryHref: '#simulador',
  },
  {
    id: 'fifa',
    image: '/banners/hero-fifa.jpg',
    tag: '66 SELEÇÕES MUNDIAIS DISPONÍVEIS',
    title: 'MANTOS DE COPA DO MUNDO',
    subtitle:
      'Brasil, Argentina, Portugal, França, Espanha, Itália e dezenas de seleções na Versão Torcedor (R$ 160) e Jogador (R$ 200).',
    ctaLabel: 'Ver Seleções Mundiais',
    ctaLeague: 'selecoes',
    secondaryLabel: 'Ver Top Mais Vendidas',
    secondaryHref: '#top-vendidas',
  },
  {
    id: 'nba',
    image: '/banners/hero-nba.jpg',
    tag: 'CONFERÊNCIA LESTE & OESTE • 30 FRANQUIAS',
    title: 'REGATAS NBA SOB ENCOMENDA',
    subtitle:
      'Lakers, Bulls, Warriors, Celtics, Heat e todas as 30 franquias da NBA com fotos reais dos modelos e encomenda simplificada.',
    ctaLabel: 'Explorar Catálogo NBA',
    ctaLeague: 'nba-leste',
    secondaryLabel: 'Tabela de Medidas',
    secondaryHref: '#tabela-medidas',
  },
];

export function HeroBanner({ onSelectLeague }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = SLIDES[activeIndex];

  const handleCtaClick = (leagueId: string) => {
    onSelectLeague(leagueId);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="w-full bg-[#020F4A]">
      {/* Full-Bleed Sports Hero Slider */}
      <div className="relative w-full min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020F4A]/95 via-[#020F4A]/78 to-[#020F4A]/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:py-16 w-full">
          <div className="max-w-2xl">
            <p className="inline-block px-4 py-1.5 bg-[#F4BE0B] text-[#020F4A] text-xs font-extrabold uppercase tracking-wider rounded-full mb-4 shadow-sm">
              {current.tag}
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-white uppercase leading-[0.95] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              {current.subtitle}
            </p>

            {/* Transparent Brand Price Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              <div className="bg-white/10 backdrop-blur-[2px] border border-white/15 rounded-2xl px-3.5 py-3">
                <span className="block text-[11px] uppercase tracking-wide text-white/75 font-semibold">
                  Versão Torcedor
                </span>
                <span className="font-display text-2xl font-extrabold text-white">
                  R$ 160
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-[2px] border border-[#F4BE0B]/40 rounded-2xl px-3.5 py-3">
                <span className="block text-[11px] uppercase tracking-wide text-white/75 font-semibold">
                  Versão Jogador
                </span>
                <span className="font-display text-2xl font-extrabold text-[#F4BE0B]">
                  R$ 200
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-[2px] border border-white/15 rounded-2xl px-3.5 py-3">
                <span className="block text-[11px] uppercase tracking-wide text-white/75 font-semibold">
                  Nome + Número
                </span>
                <span className="font-display text-2xl font-extrabold text-white">
                  + R$ 30
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-[2px] border border-white/15 rounded-2xl px-3.5 py-3">
                <span className="block text-[11px] uppercase tracking-wide text-white/75 font-semibold">
                  Patch Oficial
                </span>
                <span className="font-display text-2xl font-extrabold text-white">
                  + R$ 20
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleCtaClick(current.ctaLeague)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] font-extrabold text-sm uppercase tracking-wide rounded-full transition-colors cursor-pointer shadow-md"
              >
                {current.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={current.secondaryHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/12 hover:bg-white/20 text-white border border-white/25 font-bold text-sm uppercase tracking-wide rounded-full transition-colors"
              >
                {current.secondaryLabel}
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Slide anterior"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#020F4A]/70 hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white items-center justify-center transition-colors cursor-pointer border border-white/15"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % SLIDES.length)}
          aria-label="Próximo slide"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#020F4A]/70 hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white items-center justify-center transition-colors cursor-pointer border border-white/15"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ir para banner ${i + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                i === activeIndex ? 'w-8 bg-[#F4BE0B]' : 'w-2.5 bg-white/45 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 4-Pillar Benefit Strip */}
      <div className="bg-[#F4F6FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[#020F4A]">
                Encomenda Automatizada
              </p>
              <p className="text-xs text-slate-600">
                Veja as fotos reais aqui e faça seu pedido direto no site
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[#020F4A]">
                Tecido de Alta Qualidade
              </p>
              <p className="text-xs text-slate-600">
                Conforto, ótimo caimento e durabilidade média +2 anos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[#020F4A]">
                Personalização & Patch
              </p>
              <p className="text-xs text-slate-600">
                Nome + Número fixo R$ 30 · Patch de liga R$ 20
              </p>
            </div>
          </div>

          <a
            href={STORE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[#020F4A] group-hover:text-emerald-700 transition-colors">
                WhatsApp {STORE_CONFIG.whatsappDisplay}
              </p>
              <p className="text-xs text-slate-600">
                Dúvidas sobre modelos ou disponibilidade? Fale conosco
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
