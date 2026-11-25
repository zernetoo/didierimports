'use client';

import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { LEAGUES, STORE_CONFIG } from '@/data/catalog';

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

interface FooterProps {
  onSelectLeague: (leagueId: string) => void;
}

export function Footer({ onSelectLeague }: FooterProps) {
  const handleJump = (id: string) => {
    onSelectLeague(id);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#020F4A] text-white border-t-4 border-[#F4BE0B]">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column with Official Cutout Logo */}
          <div className="space-y-3.5">
            <img
              src="/logo-didier.png"
              alt="DIDIER IMPORTS"
              className="h-16 w-auto object-contain"
            />
            <p className="text-xs text-white/80 leading-relaxed">
              Catálogo oficial de camisas de times de futebol, seleções mundiais e franquias da NBA por encomenda. Qualidade, tradição e paixão pelo esporte.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>

          {/* Championships */}
          <div>
            <h3 className="font-display text-lg font-extrabold uppercase text-[#F4BE0B] mb-3">
              Campeonatos
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-white/80">
              {LEAGUES.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => handleJump(l.id)}
                    className="hover:text-[#F4BE0B] hover:underline text-left cursor-pointer"
                  >
                    {l.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Internal Site Sections (ZERO external catalog links) */}
          <div>
            <h3 className="font-display text-lg font-extrabold uppercase text-[#F4BE0B] mb-3">
              Navegação Rápida
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <a href="#catalogo" className="hover:text-[#F4BE0B]">
                  Catálogo Completo (345 Times)
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-[#F4BE0B]">
                  Simulador de Personalização Online
                </a>
              </li>
              <li>
                <a href="#top-vendidas" className="hover:text-[#F4BE0B]">
                  Top Camisas Mais Vendidas
                </a>
              </li>
              <li>
                <a href="#tabela-medidas" className="hover:text-[#F4BE0B]">
                  Tabela de Medidas Oficial
                </a>
              </li>
              <li>
                <a href="#exemplos-personalizados" className="hover:text-[#F4BE0B]">
                  Exemplos Já Personalizados
                </a>
              </li>
              <li>
                <a href="#cuidados" className="hover:text-[#F4BE0B]">
                  Como Lavar e Preservar o Manto
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="font-display text-lg font-extrabold uppercase text-[#F4BE0B] mb-3">
              Atendimento & Vendas
            </h3>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={STORE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4BE0B] font-semibold"
                >
                  WhatsApp: {STORE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={STORE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4BE0B] font-semibold"
                >
                  Instagram: {STORE_CONFIG.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F4BE0B] shrink-0" />
                <span className="truncate">{STORE_CONFIG.sellerEmail}</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-white/15 text-[11px] text-white/70 space-y-0.5">
              <p>Versão Torcedor: R$ 160,00</p>
              <p>Versão Jogador: R$ 200,00</p>
              <p>Personalização (Nome + Número): + R$ 30,00</p>
              <p>Personalização de Patch: + R$ 20,00</p>
            </div>
          </div>
        </div>

        <div className="bg-[#03092B] border-t border-white/10 py-4 text-center text-xs text-white/55 px-4">
          © {new Date().getFullYear()} DIDIER IMPORTS — Todos os direitos reservados. Pedidos sob encomenda.
        </div>
      </footer>

      {/* Floating WhatsApp Support Button — ICON ONLY (Chat Logo Only) */}
      <a
        href={STORE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Didier Imports no WhatsApp"
        title="WhatsApp (86) 99499-5443"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </>
  );
}
