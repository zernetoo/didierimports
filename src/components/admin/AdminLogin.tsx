'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { ADMIN_AUTH, loginAdmin } from '@/lib/store-db';

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState<string>(ADMIN_AUTH.email);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (loginAdmin(email, password)) {
      onSuccess();
    } else {
      setError('E-mail ou senha inválidos. Apenas o vendedor autorizado pode acessar.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020F4A] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        <div className="bg-[#03092B] px-6 py-7 text-center flex flex-col items-center">
          <img
            src="/logo-didier.png"
            alt="DIDIER IMPORTS"
            className="h-16 w-auto object-contain mb-3"
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4BE0B] text-[#020F4A] text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Painel Exclusivo do Vendedor
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          <div>
            <h1 className="font-display text-2xl font-extrabold uppercase text-[#020F4A]">
              Acessar Gestão da Loja
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Controle pedidos, faturamento, lucro líquido, preços, cupons e catálogo.
            </p>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
              E-mail do Vendedor
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#020F4A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-[#020F4A] mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha..."
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#020F4A]"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Senha padrão de demonstração: <code className="font-bold text-[#020F4A]">didier2026</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-full bg-[#F4BE0B] hover:bg-[#DFA902] text-[#020F4A] font-extrabold text-sm uppercase tracking-wide transition-colors cursor-pointer shadow-md"
          >
            Entrar no Painel
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#020F4A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para a Loja Pública
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
