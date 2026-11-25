import type { Metadata } from 'next';
import { Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DIDIER IMPORTS | Camisas de Time e NBA Sob Encomenda',
  description:
    'Catálogo completo Didier Imports com 345 times de futebol, seleções mundiais e franquias da NBA. Versão Torcedor R$ 160, Versão Jogador R$ 200, personalização e patch sob encomenda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-screen bg-white text-[#111317] antialiased">
        {children}
      </body>
    </html>
  );
}
