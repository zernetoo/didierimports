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
  Camera,
} from 'lucide-react';

export interface SpecialMediaManifest {
  top10: string[];
  medidas: string[];
  produtos: string[];
  exemplos: string[];
}

interface InfoSectionsProps {
  specialMedia: SpecialMediaManifest;
  onJumpToCatalog: () => void;
}

export function InfoSections({
  specialMedia,
  onJumpToCatalog,
}: InfoSectionsProps) {
  const [zoomImg, setZoomImg] = useState<{ src: string; title: string } | null>(
    null
  );
  const [activeMedidaIdx, setActiveMedidaIdx] = useState(0);

  return (
    <>
      {/* TOP MAIS VENDIDAS — 100% Hosted Inside Our Site */}
      {specialMedia.top10.length > 0 && (
        <section
          id="top-vendidas"
          className="bg-white py-14 border-t border-slate-200 scroll-mt-24"
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
                <p className="text-sm text-slate-600 mt-1">
                  Fotos reais dos modelos mais pedidos pelos nossos clientes — clique em qualquer foto para ampliar.
                </p>
              </div>
              <button
                type="button"
                onClick={onJumpToCatalog}
                className="px-5 py-2.5 rounded-full bg-[#020F4A] hover:bg-[#F4BE0B] hover:text-[#020F4A] text-white text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer"
              >
                Escolher meu time no catálogo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4">
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
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F4F6FA] border border-slate-200 hover:border-[#020F4A] hover:shadow-lg transition-all cursor-pointer"
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

      {/* TABELA DE MEDIDAS OFICIAL — All 9 Real Size Chart Images Inside Our Site */}
      <section
        id="tabela-medidas"
        className="bg-[#F4F6FA] py-16 border-t border-slate-200 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
              <Ruler className="w-4 h-4 text-[#DFA902]" />
              Guia Completo de Tamanhos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
              Tabela de Medidas Oficial
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Confira todas as tabelas oficiais (Torcedor, Jogador, Feminina, Infantil e NBA) direto aqui antes de finalizar seu pedido.
            </p>
          </div>

          {specialMedia.medidas.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Featured Selected Size Chart */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setZoomImg({
                      src: specialMedia.medidas[activeMedidaIdx],
                      title: `Tabela de Medidas #${activeMedidaIdx + 1}`,
                    })
                  }
                  className="group relative w-full rounded-2xl overflow-hidden bg-[#F4F6FA] block cursor-pointer"
                >
                  <img
                    src={specialMedia.medidas[activeMedidaIdx]}
                    alt={`Tabela de Medidas ${activeMedidaIdx + 1}`}
                    className="w-full h-auto max-h-[480px] object-contain mx-auto"
                  />
                  <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#020F4A]/90 text-[#F4BE0B] text-xs font-extrabold inline-flex items-center gap-1.5 shadow">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Ampliar tabela
                  </span>
                </button>
              </div>

              {/* All 9 Size Chart Thumbnails */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                  {specialMedia.medidas.map((src, idx) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveMedidaIdx(idx)}
                      className={`relative rounded-2xl overflow-hidden border-2 bg-white aspect-[4/5] transition-all cursor-pointer ${
                        idx === activeMedidaIdx
                          ? 'border-[#020F4A] ring-2 ring-[#F4BE0B]'
                          : 'border-slate-200 hover:border-[#020F4A]/60'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Tabela ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2.5 py-0.5 rounded-full bg-[#020F4A]/90 text-white text-[10px] font-extrabold">
                        Tabela {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-600 bg-white rounded-2xl p-4 border border-slate-200">
                  <strong>Dica de caimento:</strong> Na <strong>Versão Jogador (Slim Fit)</strong>, a modelagem é mais justa ao corpo. Caso prefira um caimento mais confortável, escolha 1 tamanho acima do habitual.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* EXEMPLOS JÁ PERSONALIZADOS & PRODUTOS REAIS — 100% Hosted Inside Our Site */}
      {(specialMedia.exemplos.length > 0 || specialMedia.produtos.length > 0) && (
        <section
          id="exemplos-personalizados"
          className="bg-white py-16 border-t border-slate-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            {specialMedia.exemplos.length > 0 && (
              <div>
                <div className="max-w-2xl mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
                    <Sparkles className="w-4 h-4 text-[#DFA902]" />
                    Qualidade Real das Estampas
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
                    Exemplos Já Personalizados
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Veja fotos reais de camisas já personalizadas com nome, número e patch entregues pela Didier Imports.
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
            )}

            {specialMedia.produtos.length > 0 && (
              <div>
                <div className="max-w-2xl mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
                    <Camera className="w-4 h-4 text-[#DFA902]" />
                    Acabamento de Perto
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
                    Detalhes Reais dos Nossos Produtos
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {specialMedia.produtos.slice(0, 8).map((src, idx) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        setZoomImg({
                          src,
                          title: `Detalhe de Produto #${idx + 1}`,
                        })
                      }
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F4F6FA] border border-slate-200 hover:border-[#020F4A] hover:shadow-lg transition-all cursor-pointer"
                    >
                      <img
                        src={src}
                        alt={`Produto Real Didier Imports #${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How Pre-Order Works */}
      <section className="bg-[#F4F6FA] py-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B88600]">
              Fluxo Automatizado de Encomenda
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#020F4A] mt-1">
              Como funciona sua compra na Didier Imports
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '1',
                title: 'Escolha o Time e o Modelo',
                desc: 'Navegue pelos 345 escudos e veja as fotos reais dos modelos disponíveis diretamente aqui no site.',
              },
              {
                step: '2',
                title: 'Configure Versão e Extras',
                desc: 'Selecione Torcedor (R$ 160) ou Jogador (R$ 200), tamanho (P ao 3GG), nome/número (+R$ 30) e patch (+R$ 20).',
              },
              {
                step: '3',
                title: 'Finalize o Pedido no Site',
                desc: 'Preencha seus dados de entrega. O vendedor recebe a notificação automática por e-mail com cada detalhe.',
              },
              {
                step: '4',
                title: 'Encomenda e Entrega',
                desc: 'Encomendamos direto dos fornecedores selecionados e entregamos seu manto com suporte no WhatsApp.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl bg-white p-6 border border-slate-200 flex flex-col shadow-xs"
              >
                <span className="w-10 h-10 rounded-2xl bg-[#020F4A] text-[#F4BE0B] font-display text-xl font-extrabold flex items-center justify-center mb-4">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-extrabold uppercase text-[#020F4A]">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Guide: Exact PDF Page 5 Content */}
      <section id="cuidados" className="bg-white py-16 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
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
            {/* Forma Errada */}
            <div className="bg-[#FFF8F8] rounded-3xl border-2 border-red-200 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-red-100">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="font-display text-2xl font-extrabold uppercase text-red-700">
                  Forma Errada
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-800">
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

            {/* Forma Certa */}
            <div className="bg-[#F4FBF7] rounded-3xl border-2 border-emerald-200 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-emerald-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-display text-2xl font-extrabold uppercase text-emerald-700">
                  Forma Certa
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-800">
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

      {/* About DIDIER IMPORTS: Exact PDF Page 5 Copy */}
      <section className="bg-[#F4F6FA] py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white p-7 border border-slate-200 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-[#020F4A] text-[#F4BE0B] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Quem Somos Nós?
              </h3>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed">
                Somos apaixonados pelos esportes e pelo que eles representam. Na{' '}
                <strong>DIDIER IMPORTS</strong> unimos qualidade e tradição para oferecer camisas que carregam histórias e despertam emoções. Aqui, o amor pelo esporte veste você!
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-[#F4BE0B] text-[#020F4A] flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Qualidade dos Produtos
              </h3>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed">
                Nossas camisas de times são feitas com tecido de alta qualidade, garantindo conforto, durabilidade e ótimo caimento. Perfeita para torcer, jogar ou usar no dia a dia — porque vestir seu time também é mostrar estilo e paixão!
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
                Duração da Qualidade do Tecido
              </h3>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed">
                Seguindo todos os cuidados de lavagem e armazenamento de sua camisa, você terá sua camisa na mesma proporção de qualidade por até{' '}
                <strong>mais de dois anos na média</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Zoom Lightbox for Top 10 / Medidas / Exemplos / Produtos */}
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
