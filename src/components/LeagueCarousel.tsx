'use client';

import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { LEAGUES } from '@/data/catalog';

interface LeagueCarouselProps {
  selectedLeague: string;
  onSelectLeague: (leagueId: string) => void;
}

export function LeagueCarousel({
  selectedLeague,
  onSelectLeague,
}: LeagueCarouselProps) {
  const handlePick = (id: string) => {
    onSelectLeague(id);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="bg-white py-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#020F4A]">
              Navegue por Campeonato
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              11 ligas e seleções de futebol + Conferência Leste e Oeste da NBA
            </p>
          </div>
          <a
            href="#top-vendidas"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#020F4A] hover:bg-[#0A1F7A] text-white text-xs font-extrabold uppercase tracking-wide transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-[#F4BE0B]" />
            Ver Top Mais Vendidas
            <ArrowRight className="w-3.5 h-3.5 text-[#F4BE0B]" />
          </a>
        </div>

        <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
          {LEAGUES.map((league) => {
            const active = selectedLeague === league.id;
            return (
              <button
                key={league.id}
                type="button"
                onClick={() => handlePick(league.id)}
                className={`group relative w-44 sm:w-48 h-28 rounded-2xl overflow-hidden shrink-0 text-left border-2 transition-all cursor-pointer ${
                  active
                    ? 'border-[#DFA902] ring-2 ring-[#F4BE0B]/40'
                    : 'border-slate-200 hover:border-[#020F4A]'
                }`}
              >
                <img
                  src={league.banner}
                  alt={league.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020F4A]/95 via-[#020F4A]/50 to-black/15" />
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      league.sport === 'nba'
                        ? 'bg-[#F4BE0B] text-[#020F4A]'
                        : 'bg-white/95 text-[#020F4A]'
                    }`}
                  >
                    {league.count} times
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3.5 right-3">
                  <p className="font-display text-base font-extrabold uppercase text-white leading-tight truncate">
                    {league.shortName}
                  </p>
                  <p className="text-[11px] text-[#F4BE0B] font-semibold truncate">
                    {league.sport === 'nba' ? 'Basquete NBA' : 'Futebol'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
