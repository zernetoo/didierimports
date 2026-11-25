export type SportType = 'futebol' | 'nba';

export type ModelCategory =
  | 'jogo'
  | 'retro'
  | 'feminina'
  | 'infantil'
  | 'goleiro'
  | 'manga-longa'
  | 'treino'
  | 'casual'
  | 'calcao'
  | 'nba';

export type JerseyColor =
  | 'preta'
  | 'branca'
  | 'vermelha'
  | 'azul'
  | 'amarela'
  | 'verde'
  | 'cinza'
  | 'laranja'
  | 'rosa'
  | 'roxa';

export const COLOR_META: Record<
  JerseyColor,
  { label: string; hex: string; border?: boolean }
> = {
  preta: { label: 'Preta', hex: '#14161A' },
  branca: { label: 'Branca', hex: '#FFFFFF', border: true },
  vermelha: { label: 'Vermelha', hex: '#DC2626' },
  azul: { label: 'Azul', hex: '#1D4ED8' },
  amarela: { label: 'Amarela', hex: '#EAB308' },
  verde: { label: 'Verde', hex: '#15803D' },
  cinza: { label: 'Cinza / Bege', hex: '#94A3B8' },
  laranja: { label: 'Laranja', hex: '#EA580C' },
  rosa: { label: 'Rosa', hex: '#EC4899' },
  roxa: { label: 'Roxa', hex: '#7E22CE' },
};

export interface JerseyModel {
  id: string;
  title: string;
  version: 'torcedor' | 'jogador';
  category: ModelCategory;
  color?: JerseyColor;
  allowsPersonalization: boolean;
  allowsPatch: boolean;
  photos: string[];
}

export interface League {
  id: string;
  name: string;
  shortName: string;
  sport: SportType;
  description: string;
  count: number;
  banner: string;
}

export interface TeamCatalogItem {
  id: string;
  name: string;
  leagueId: string;
  leagueName: string;
  sport: SportType;
  crest: string;
  featured: boolean;
  modelCount: number;
  torcedorCount: number;
  jogadorCount: number;
  categories: ModelCategory[];
  colors: JerseyColor[];
}

export const CATEGORY_LABELS: Record<ModelCategory, string> = {
  jogo: 'Camisa de Jogo',
  retro: 'Retrô / Clássica',
  feminina: 'Feminina',
  infantil: 'Infantil / Kit Kids',
  goleiro: 'Goleiro',
  'manga-longa': 'Manga Longa',
  treino: 'Treino / Pré-Jogo',
  casual: 'Casual / Polo / Agasalho',
  calcao: 'Calção / Short',
  nba: 'Regata NBA',
};

export const STORE_CONFIG = {
  brandName: 'DIDIER IMPORTS',
  tagline: 'Mantos Importados Sob Encomenda',
  whatsappNumber: '5586994995443',
  whatsappDisplay: '(86) 99499-5443',
  whatsappUrl: 'https://wa.me/5586994995443',
  instagramHandle: '@didierimports',
  instagramUrl: 'https://www.instagram.com/didierimports?igsh=MTZvenR2ajh3dmVkZA%3D%3D&utm_source=qr',
  sellerEmail: 'heliodidier87@gmail.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/heliodidier87@gmail.com',
  pricing: {
    torcedor: 160,
    jogador: 200,
    personalizacao: 30,
    patch: 20,
  },
  sizes: ['P', 'M', 'G', 'GG', '2GG', '3GG'] as const,
} as const;

export const LEAGUES: League[] = [
  {
    "id": "brasileirao",
    "name": "Campeonato Brasileiro",
    "shortName": "Brasileirão",
    "sport": "futebol",
    "description": "Série A e grandes clubes do Brasil",
    "count": 35,
    "banner": "/banners/league-brasileirao.jpg"
  },
  {
    "id": "selecoes",
    "name": "Seleções Mundiais",
    "shortName": "Seleções",
    "sport": "futebol",
    "description": "Copa do Mundo e seleções internacionais",
    "count": 66,
    "banner": "/banners/league-selecoes.jpg"
  },
  {
    "id": "premier-league",
    "name": "Campeonato Inglês",
    "shortName": "Premier League",
    "sport": "futebol",
    "description": "Clubes da Inglaterra e Premier League",
    "count": 40,
    "banner": "/banners/league-premier-league.jpg"
  },
  {
    "id": "laliga",
    "name": "Campeonato Espanhol",
    "shortName": "LaLiga",
    "sport": "futebol",
    "description": "Real Madrid, Barcelona e clubes espanhóis",
    "count": 32,
    "banner": "/banners/league-laliga.jpg"
  },
  {
    "id": "serie-a",
    "name": "Campeonato Italiano",
    "shortName": "Serie A",
    "sport": "futebol",
    "description": "Tradição italiana: Milan, Inter, Juventus e mais",
    "count": 28,
    "banner": "/banners/league-serie-a.jpg"
  },
  {
    "id": "ligue-1",
    "name": "Campeonato Francês",
    "shortName": "Ligue 1",
    "sport": "futebol",
    "description": "PSG, Olympique e clubes franceses",
    "count": 16,
    "banner": "/banners/league-ligue-1.jpg"
  },
  {
    "id": "bundesliga",
    "name": "Campeonato Alemão",
    "shortName": "Bundesliga",
    "sport": "futebol",
    "description": "Bayern, Borussia Dortmund e clubes alemães",
    "count": 19,
    "banner": "/banners/league-bundesliga.jpg"
  },
  {
    "id": "mls",
    "name": "Campeonato Americano",
    "shortName": "MLS",
    "sport": "futebol",
    "description": "Inter Miami, LA Galaxy e clubes da MLS",
    "count": 29,
    "banner": "/banners/league-mls.jpg"
  },
  {
    "id": "liga-mx",
    "name": "Campeonato Mexicano",
    "shortName": "Liga MX",
    "sport": "futebol",
    "description": "Tigres, Club América, Chivas e Liga MX",
    "count": 16,
    "banner": "/banners/league-liga-mx.jpg"
  },
  {
    "id": "resto-america",
    "name": "Resto da América",
    "shortName": "CONMEBOL",
    "sport": "futebol",
    "description": "Boca Juniors, River Plate, Peñarol e América Latina",
    "count": 16,
    "banner": "/banners/league-resto-america.jpg"
  },
  {
    "id": "asia-africa",
    "name": "Clubes da Ásia-África",
    "shortName": "Ásia & África",
    "sport": "futebol",
    "description": "Al-Nassr, Al-Hilal, J-League e clubes africanos",
    "count": 18,
    "banner": "/banners/league-asia-africa.jpg"
  },
  {
    "id": "nba-leste",
    "name": "NBA — Conferência Leste",
    "shortName": "NBA Leste",
    "sport": "nba",
    "description": "Regatas NBA da Conferência Leste",
    "count": 15,
    "banner": "/banners/league-nba-leste.jpg"
  },
  {
    "id": "nba-oeste",
    "name": "NBA — Conferência Oeste",
    "shortName": "NBA Oeste",
    "sport": "nba",
    "description": "Regatas NBA da Conferência Oeste",
    "count": 15,
    "banner": "/banners/league-nba-oeste.jpg"
  }
];

export const TEAMS: TeamCatalogItem[] = [
  {
    "id": "atletico-mg",
    "name": "Atlético-MG",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/atletico-mg.png",
    "featured": false,
    "modelCount": 42,
    "torcedorCount": 41,
    "jogadorCount": 1,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "america-mg",
    "name": "América-MG",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/america-mg.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "jogo"
    ],
    "colors": [
      "branca",
      "laranja",
      "preta",
      "verde"
    ]
  },
  {
    "id": "avai",
    "name": "Avaí",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/avai.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "athletico-paranaense",
    "name": "Athletico Paranaense",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/athletico-paranaense.png",
    "featured": false,
    "modelCount": 30,
    "torcedorCount": 30,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "bahia",
    "name": "Bahia",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/bahia.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 39,
    "jogadorCount": 6,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "atletico-goianiense",
    "name": "Atlético Goianiense",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/atletico-goianiense.png",
    "featured": false,
    "modelCount": 2,
    "torcedorCount": 2,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "botafogo",
    "name": "Botafogo",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/botafogo.png",
    "featured": true,
    "modelCount": 43,
    "torcedorCount": 41,
    "jogadorCount": 2,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "botafogo-sp",
    "name": "Botafogo-SP",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/botafogo-sp.png",
    "featured": false,
    "modelCount": 3,
    "torcedorCount": 3,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "cruzeiro",
    "name": "Cruzeiro",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/cruzeiro.png",
    "featured": true,
    "modelCount": 44,
    "torcedorCount": 43,
    "jogadorCount": 1,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "corinthians",
    "name": "Corinthians",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/corinthians.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 34,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "chapecoense",
    "name": "Chapecoense",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/chapecoense.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "jogo",
      "retro"
    ],
    "colors": [
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "ceara",
    "name": "Ceará",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/ceara.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta"
    ]
  },
  {
    "id": "coritiba",
    "name": "Coritiba",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/coritiba.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "preta",
      "rosa",
      "verde"
    ]
  },
  {
    "id": "csa",
    "name": "CSA",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/csa.png",
    "featured": false,
    "modelCount": 4,
    "torcedorCount": 4,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "criciuma",
    "name": "Criciúma",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/criciuma.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja"
    ]
  },
  {
    "id": "flamengo",
    "name": "Flamengo",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/flamengo.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 38,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "fluminense",
    "name": "Fluminense",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/fluminense.png",
    "featured": false,
    "modelCount": 44,
    "torcedorCount": 37,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "fortaleza",
    "name": "Fortaleza",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/fortaleza.png",
    "featured": false,
    "modelCount": 22,
    "torcedorCount": 22,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "figueirense",
    "name": "Figueirense",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/figueirense.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "jogo"
    ],
    "colors": [
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "gremio",
    "name": "Grêmio",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/gremio.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 40,
    "jogadorCount": 5,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde"
    ]
  },
  {
    "id": "goias",
    "name": "Goiás",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/goias.png",
    "featured": false,
    "modelCount": 1,
    "torcedorCount": 1,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "internacional",
    "name": "Internacional",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/internacional.png",
    "featured": false,
    "modelCount": 44,
    "torcedorCount": 42,
    "jogadorCount": 2,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "brasil-de-pelotas",
    "name": "Brasil de Pelotas",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/brasil-de-pelotas.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 38,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "nautico",
    "name": "Náutico",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/nautico.png",
    "featured": false,
    "modelCount": 13,
    "torcedorCount": 13,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "goleiro",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "palmeiras",
    "name": "Palmeiras",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/palmeiras.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 38,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "paysandu",
    "name": "Paysandu",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/paysandu.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 25,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "rb-bragantino",
    "name": "RB Bragantino",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/rb-bragantino.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 12,
    "jogadorCount": 2,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "remo",
    "name": "Remo",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/remo.png",
    "featured": false,
    "modelCount": 23,
    "torcedorCount": 23,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "goleiro",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "santa-cruz",
    "name": "Santa Cruz",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/santa-cruz.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 21,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "santos",
    "name": "Santos",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/santos.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 34,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa"
    ]
  },
  {
    "id": "sao-paulo",
    "name": "São Paulo",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/sao-paulo.png",
    "featured": true,
    "modelCount": 42,
    "torcedorCount": 36,
    "jogadorCount": 6,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "sport-recife",
    "name": "Sport Recife",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/sport-recife.png",
    "featured": false,
    "modelCount": 42,
    "torcedorCount": 40,
    "jogadorCount": 2,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "vasco-da-gama",
    "name": "Vasco da Gama",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/vasco-da-gama.png",
    "featured": true,
    "modelCount": 41,
    "torcedorCount": 37,
    "jogadorCount": 4,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "vitoria",
    "name": "Vitória",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/vitoria.png",
    "featured": false,
    "modelCount": 32,
    "torcedorCount": 32,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "guarani",
    "name": "Guarani",
    "leagueId": "brasileirao",
    "leagueName": "Campeonato Brasileiro",
    "sport": "futebol",
    "crest": "/crests-v3/guarani.png",
    "featured": false,
    "modelCount": 3,
    "torcedorCount": 3,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "argentina",
    "name": "Argentina",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/argentina.png",
    "featured": true,
    "modelCount": 37,
    "torcedorCount": 30,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "alemanha",
    "name": "Alemanha",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/alemanha.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 33,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "austria",
    "name": "Áustria",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/austria.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 9,
    "jogadorCount": 1,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "albania",
    "name": "Albânia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/albania.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "argelia",
    "name": "Argélia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/argelia.png",
    "featured": false,
    "modelCount": 33,
    "torcedorCount": 21,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "arabia-saudita",
    "name": "Arábia Saudita",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/arabia-saudita.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 5,
    "jogadorCount": 5,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "verde"
    ]
  },
  {
    "id": "australia",
    "name": "Austrália",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/australia.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 10,
    "jogadorCount": 1,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "laranja",
      "preta",
      "verde"
    ]
  },
  {
    "id": "burkina-faso",
    "name": "Burkina Faso",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/burkina-faso.png",
    "featured": false,
    "modelCount": 13,
    "torcedorCount": 7,
    "jogadorCount": 6,
    "categories": [
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "cinza",
      "verde"
    ]
  },
  {
    "id": "brasil",
    "name": "Brasil",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/brasil.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "belgica",
    "name": "Bélgica",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/belgica.png",
    "featured": false,
    "modelCount": 30,
    "torcedorCount": 22,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "chile",
    "name": "Chile",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/chile.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 19,
    "jogadorCount": 2,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "colombia",
    "name": "Colômbia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/colombia.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 35,
    "jogadorCount": 10,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "coreia-do-sul",
    "name": "Coreia do Sul",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/coreia-do-sul.png",
    "featured": false,
    "modelCount": 29,
    "torcedorCount": 25,
    "jogadorCount": 4,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "costa-do-marfim",
    "name": "Costa do Marfim",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/costa-do-marfim.png",
    "featured": false,
    "modelCount": 26,
    "torcedorCount": 16,
    "jogadorCount": 10,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "verde"
    ]
  },
  {
    "id": "costa-rica",
    "name": "Costa Rica",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/costa-rica.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 9,
    "jogadorCount": 1,
    "categories": [
      "casual",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "croacia",
    "name": "Croácia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/croacia.png",
    "featured": false,
    "modelCount": 17,
    "torcedorCount": 13,
    "jogadorCount": 4,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "camaroes",
    "name": "Camarões",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/camaroes.png",
    "featured": false,
    "modelCount": 30,
    "torcedorCount": 19,
    "jogadorCount": 11,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "comores",
    "name": "Comores",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/comores.png",
    "featured": false,
    "modelCount": 3,
    "torcedorCount": 3,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "verde"
    ]
  },
  {
    "id": "canada",
    "name": "Canadá",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/canada.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 12,
    "jogadorCount": 2,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "china",
    "name": "China",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/china.png",
    "featured": false,
    "modelCount": 20,
    "torcedorCount": 13,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "estados-unidos",
    "name": "Estados Unidos",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/estados-unidos.png",
    "featured": false,
    "modelCount": 33,
    "torcedorCount": 29,
    "jogadorCount": 4,
    "categories": [
      "calcao",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "egito",
    "name": "Egito",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/egito.png",
    "featured": false,
    "modelCount": 17,
    "torcedorCount": 11,
    "jogadorCount": 6,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "eslovaquia",
    "name": "Eslováquia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/eslovaquia.png",
    "featured": false,
    "modelCount": 3,
    "torcedorCount": 3,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "escocia",
    "name": "Escócia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/escocia.png",
    "featured": false,
    "modelCount": 44,
    "torcedorCount": 40,
    "jogadorCount": 4,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "equador",
    "name": "Equador",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/equador.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 14,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "el-salvador",
    "name": "El Salvador",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/el-salvador.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 14,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja"
    ]
  },
  {
    "id": "espanha",
    "name": "Espanha",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/espanha.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "finlandia",
    "name": "Finlândia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/finlandia.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "franca",
    "name": "França",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/franca.png",
    "featured": true,
    "modelCount": 44,
    "torcedorCount": 36,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "gana",
    "name": "Gana",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/gana.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 15,
    "jogadorCount": 6,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "guatemala",
    "name": "Guatemala",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/guatemala.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "guine",
    "name": "Guiné",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/guine.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 4,
    "jogadorCount": 2,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "holanda",
    "name": "Holanda",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/holanda.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 37,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "honduras",
    "name": "Honduras",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/honduras.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "hungria",
    "name": "Hungria",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/hungria.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 5,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "irlanda",
    "name": "Irlanda",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/irlanda.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 25,
    "jogadorCount": 0,
    "categories": [
      "feminina",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "laranja",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "irlanda-do-norte",
    "name": "Irlanda do Norte",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/irlanda-do-norte.png",
    "featured": false,
    "modelCount": 13,
    "torcedorCount": 13,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "verde"
    ]
  },
  {
    "id": "inglaterra",
    "name": "Inglaterra",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/inglaterra.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "islandia",
    "name": "Islândia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/islandia.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "israel",
    "name": "Israel",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/israel.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza"
    ]
  },
  {
    "id": "italia",
    "name": "Itália",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/italia.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 37,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "japao",
    "name": "Japão",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/japao.png",
    "featured": false,
    "modelCount": 37,
    "torcedorCount": 25,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "jamaica",
    "name": "Jamaica",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/jamaica.png",
    "featured": false,
    "modelCount": 26,
    "torcedorCount": 20,
    "jogadorCount": 6,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "mali",
    "name": "Mali",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/mali.png",
    "featured": false,
    "modelCount": 19,
    "torcedorCount": 11,
    "jogadorCount": 8,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "mexico",
    "name": "México",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/mexico.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 37,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "macedonia-do-norte",
    "name": "Macedônia do Norte",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/macedonia-do-norte.png",
    "featured": false,
    "modelCount": 4,
    "torcedorCount": 4,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "marrocos",
    "name": "Marrocos",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/marrocos.png",
    "featured": false,
    "modelCount": 23,
    "torcedorCount": 18,
    "jogadorCount": 5,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "noruega",
    "name": "Noruega",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/noruega.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "nigeria",
    "name": "Nigéria",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/nigeria.png",
    "featured": false,
    "modelCount": 32,
    "torcedorCount": 27,
    "jogadorCount": 5,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "portugal",
    "name": "Portugal",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/portugal.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 39,
    "jogadorCount": 6,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "paraguai",
    "name": "Paraguai",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/paraguai.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "pais-de-gales",
    "name": "País de Gales",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/pais-de-gales.png",
    "featured": false,
    "modelCount": 26,
    "torcedorCount": 24,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "polonia",
    "name": "Polônia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/polonia.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 10,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "peru",
    "name": "Peru",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/peru.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 8,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "dinamarca",
    "name": "Dinamarca",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/dinamarca.png",
    "featured": false,
    "modelCount": 18,
    "torcedorCount": 17,
    "jogadorCount": 1,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "romenia",
    "name": "Romênia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/romenia.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "vermelha"
    ]
  },
  {
    "id": "senegal",
    "name": "Senegal",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/senegal.png",
    "featured": false,
    "modelCount": 32,
    "torcedorCount": 20,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde"
    ]
  },
  {
    "id": "suica",
    "name": "Suíça",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/suica.png",
    "featured": false,
    "modelCount": 12,
    "torcedorCount": 10,
    "jogadorCount": 2,
    "categories": [
      "calcao",
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "servia",
    "name": "Sérvia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/servia.png",
    "featured": false,
    "modelCount": 4,
    "torcedorCount": 4,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "suecia",
    "name": "Suécia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/suecia.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 10,
    "jogadorCount": 1,
    "categories": [
      "calcao",
      "casual",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja"
    ]
  },
  {
    "id": "republica-tcheca",
    "name": "República Tcheca",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/republica-tcheca.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "turquia",
    "name": "Turquia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/turquia.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "qatar",
    "name": "Qatar",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/qatar.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 9,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "branca",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "ucrania",
    "name": "Ucrânia",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/ucrania.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 10,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul"
    ]
  },
  {
    "id": "uruguai",
    "name": "Uruguai",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/uruguai.png",
    "featured": false,
    "modelCount": 22,
    "torcedorCount": 17,
    "jogadorCount": 5,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza"
    ]
  },
  {
    "id": "venezuela",
    "name": "Venezuela",
    "leagueId": "selecoes",
    "leagueName": "Seleções Mundiais",
    "sport": "futebol",
    "crest": "/crests-v3/venezuela.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 13,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "arsenal",
    "name": "Arsenal",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/arsenal.png",
    "featured": true,
    "modelCount": 40,
    "torcedorCount": 31,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "aston-villa",
    "name": "Aston Villa",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/aston-villa.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "birmingham",
    "name": "Birmingham",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/birmingham.png",
    "featured": false,
    "modelCount": 24,
    "torcedorCount": 24,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "blackburn",
    "name": "Blackburn",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/blackburn.png",
    "featured": false,
    "modelCount": 18,
    "torcedorCount": 18,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "bournemouth",
    "name": "Bournemouth",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/bournemouth.png",
    "featured": false,
    "modelCount": 12,
    "torcedorCount": 10,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "cinza",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "brighton",
    "name": "Brighton",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/brighton.png",
    "featured": false,
    "modelCount": 30,
    "torcedorCount": 22,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "verde"
    ]
  },
  {
    "id": "bristol-city",
    "name": "Bristol City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/bristol-city.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "vermelha"
    ]
  },
  {
    "id": "brentford",
    "name": "Brentford",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/brentford.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 9,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "cardiff-city",
    "name": "Cardiff City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/cardiff-city.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 14,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "chelsea",
    "name": "Chelsea",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/chelsea.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 35,
    "jogadorCount": 10,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "crystal-palace",
    "name": "Crystal Palace",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/crystal-palace.png",
    "featured": false,
    "modelCount": 29,
    "torcedorCount": 22,
    "jogadorCount": 7,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "everton",
    "name": "Everton",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/everton.png",
    "featured": false,
    "modelCount": 42,
    "torcedorCount": 36,
    "jogadorCount": 6,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "fulham",
    "name": "Fulham",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/fulham.png",
    "featured": false,
    "modelCount": 26,
    "torcedorCount": 19,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "leeds-united",
    "name": "Leeds United",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/leeds-united.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "leicester-city",
    "name": "Leicester City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/leicester-city.png",
    "featured": false,
    "modelCount": 24,
    "torcedorCount": 23,
    "jogadorCount": 1,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "liverpool",
    "name": "Liverpool",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/liverpool.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "luton-town",
    "name": "Luton Town",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/luton-town.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "manchester-city",
    "name": "Manchester City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/manchester-city.png",
    "featured": true,
    "modelCount": 44,
    "torcedorCount": 32,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "manchester-united",
    "name": "Manchester United",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/manchester-united.png",
    "featured": true,
    "modelCount": 43,
    "torcedorCount": 32,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "middlesbrough",
    "name": "Middlesbrough",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/middlesbrough.png",
    "featured": false,
    "modelCount": 20,
    "torcedorCount": 20,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "millwall",
    "name": "Millwall",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/millwall.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "newcastle",
    "name": "Newcastle",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/newcastle.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 34,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "norwich-city",
    "name": "Norwich City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/norwich-city.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "nottingham-forest",
    "name": "Nottingham Forest",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/nottingham-forest.png",
    "featured": false,
    "modelCount": 29,
    "torcedorCount": 28,
    "jogadorCount": 1,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "queens-park-rangers",
    "name": "Queens Park Rangers",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/queens-park-rangers.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 15,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "laranja",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "sheffield-united",
    "name": "Sheffield United",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/sheffield-united.png",
    "featured": false,
    "modelCount": 22,
    "torcedorCount": 20,
    "jogadorCount": 2,
    "categories": [
      "goleiro",
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "southampton",
    "name": "Southampton",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/southampton.png",
    "featured": false,
    "modelCount": 20,
    "torcedorCount": 20,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "stoke-city",
    "name": "Stoke City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/stoke-city.png",
    "featured": false,
    "modelCount": 12,
    "torcedorCount": 12,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "sunderland",
    "name": "Sunderland",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/sunderland.png",
    "featured": false,
    "modelCount": 38,
    "torcedorCount": 35,
    "jogadorCount": 3,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "swansea-city",
    "name": "Swansea City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/swansea-city.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza"
    ]
  },
  {
    "id": "tottenham",
    "name": "Tottenham",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/tottenham.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 33,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa"
    ]
  },
  {
    "id": "watford",
    "name": "Watford",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/watford.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 13,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "west-bromwich-albion",
    "name": "West Bromwich Albion",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/west-bromwich-albion.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "west-ham",
    "name": "West Ham",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/west-ham.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 35,
    "jogadorCount": 10,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "wolverhampton",
    "name": "Wolverhampton",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/wolverhampton.png",
    "featured": false,
    "modelCount": 34,
    "torcedorCount": 31,
    "jogadorCount": 3,
    "categories": [
      "calcao",
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "plymouth-argyle",
    "name": "Plymouth Argyle",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/plymouth-argyle.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 7,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "ipswich-town",
    "name": "Ipswich Town",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/ipswich-town.png",
    "featured": false,
    "modelCount": 18,
    "torcedorCount": 16,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "coventry-city",
    "name": "Coventry City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/coventry-city.png",
    "featured": false,
    "modelCount": 27,
    "torcedorCount": 25,
    "jogadorCount": 2,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "hull-city",
    "name": "Hull City",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/hull-city.png",
    "featured": false,
    "modelCount": 18,
    "torcedorCount": 18,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja"
    ]
  },
  {
    "id": "burnley",
    "name": "Burnley",
    "leagueId": "premier-league",
    "leagueName": "Campeonato Inglês",
    "sport": "futebol",
    "crest": "/crests-v3/burnley.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "real-madrid",
    "name": "Real Madrid",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/real-madrid.png",
    "featured": true,
    "modelCount": 39,
    "torcedorCount": 31,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "barcelona",
    "name": "Barcelona",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/barcelona.png",
    "featured": true,
    "modelCount": 41,
    "torcedorCount": 31,
    "jogadorCount": 10,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "atletico-de-madrid",
    "name": "Atlético de Madrid",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/atletico-de-madrid.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 32,
    "jogadorCount": 13,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "almeria",
    "name": "Almería",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/almeria.png",
    "featured": false,
    "modelCount": 16,
    "torcedorCount": 16,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "albacete",
    "name": "Albacete",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/albacete.png",
    "featured": false,
    "modelCount": 17,
    "torcedorCount": 17,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "branca",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "alaves",
    "name": "Alavés",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/alaves.png",
    "featured": false,
    "modelCount": 22,
    "torcedorCount": 22,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "athletic-club",
    "name": "Athletic Club",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/athletic-club.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 43,
    "jogadorCount": 2,
    "categories": [
      "calcao",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "burgos",
    "name": "Burgos",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/burgos.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 14,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "cadiz",
    "name": "Cádiz",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/cadiz.png",
    "featured": false,
    "modelCount": 22,
    "torcedorCount": 22,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "celta-de-vigo",
    "name": "Celta de Vigo",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/celta-de-vigo.png",
    "featured": false,
    "modelCount": 30,
    "torcedorCount": 30,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "getafe",
    "name": "Getafe",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/getafe.png",
    "featured": false,
    "modelCount": 16,
    "torcedorCount": 16,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "girona",
    "name": "Girona",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/girona.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 15,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "granada",
    "name": "Granada",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/granada.png",
    "featured": false,
    "modelCount": 22,
    "torcedorCount": 22,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "las-palmas",
    "name": "Las Palmas",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/las-palmas.png",
    "featured": false,
    "modelCount": 23,
    "torcedorCount": 23,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "leganes",
    "name": "Leganés",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/leganes.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "levante",
    "name": "Levante",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/levante.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "cinza",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "malaga",
    "name": "Málaga",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/malaga.png",
    "featured": false,
    "modelCount": 33,
    "torcedorCount": 33,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "osasuna",
    "name": "Osasuna",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/osasuna.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 25,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "rayo-vallecano",
    "name": "Rayo Vallecano",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/rayo-vallecano.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 25,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "real-betis",
    "name": "Real Betis",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/real-betis.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 40,
    "jogadorCount": 5,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde"
    ]
  },
  {
    "id": "real-oviedo",
    "name": "Real Oviedo",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/real-oviedo.png",
    "featured": false,
    "modelCount": 26,
    "torcedorCount": 26,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "real-sociedad",
    "name": "Real Sociedad",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/real-sociedad.png",
    "featured": false,
    "modelCount": 27,
    "torcedorCount": 25,
    "jogadorCount": 2,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "zaragoza",
    "name": "Zaragoza",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/zaragoza.png",
    "featured": false,
    "modelCount": 33,
    "torcedorCount": 33,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "sevilla",
    "name": "Sevilla",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/sevilla.png",
    "featured": false,
    "modelCount": 38,
    "torcedorCount": 38,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "sporting-de-gijon",
    "name": "Sporting de Gijón",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/sporting-de-gijon.png",
    "featured": false,
    "modelCount": 31,
    "torcedorCount": 29,
    "jogadorCount": 2,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "tenerife",
    "name": "Tenerife",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/tenerife.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 21,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "valencia",
    "name": "Valencia",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/valencia.png",
    "featured": false,
    "modelCount": 38,
    "torcedorCount": 37,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "valladolid",
    "name": "Valladolid",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/valladolid.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 21,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "villarreal",
    "name": "Villarreal",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/villarreal.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 13,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "branca",
      "laranja"
    ]
  },
  {
    "id": "espanyol",
    "name": "Espanyol",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/espanyol.png",
    "featured": false,
    "modelCount": 16,
    "torcedorCount": 15,
    "jogadorCount": 1,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "mirandes",
    "name": "Mirandés",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/mirandes.png",
    "featured": false,
    "modelCount": 2,
    "torcedorCount": 2,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "vermelha"
    ]
  },
  {
    "id": "mallorca",
    "name": "Mallorca",
    "leagueId": "laliga",
    "leagueName": "Campeonato Espanhol",
    "sport": "futebol",
    "crest": "/crests-v3/mallorca.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 21,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "milan",
    "name": "Milan",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/milan.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 38,
    "jogadorCount": 7,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "inter-de-milao",
    "name": "Inter de Milão",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/inter-de-milao.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 35,
    "jogadorCount": 10,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "napoli",
    "name": "Napoli",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/napoli.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 37,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "atalanta",
    "name": "Atalanta",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/atalanta.png",
    "featured": false,
    "modelCount": 17,
    "torcedorCount": 17,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "bari",
    "name": "Bari",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/bari.png",
    "featured": false,
    "modelCount": 13,
    "torcedorCount": 13,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "manga-longa"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "bologna",
    "name": "Bologna",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/bologna.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 15,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "cagliari",
    "name": "Cagliari",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/cagliari.png",
    "featured": false,
    "modelCount": 19,
    "torcedorCount": 19,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "empoli",
    "name": "Empoli",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/empoli.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "rosa"
    ]
  },
  {
    "id": "fiorentina",
    "name": "Fiorentina",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/fiorentina.png",
    "featured": false,
    "modelCount": 34,
    "torcedorCount": 34,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "genoa",
    "name": "Genoa",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/genoa.png",
    "featured": false,
    "modelCount": 13,
    "torcedorCount": 12,
    "jogadorCount": 1,
    "categories": [
      "jogo",
      "manga-longa"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "hellas-verona",
    "name": "Hellas Verona",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/hellas-verona.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "juventus",
    "name": "Juventus",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/juventus.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "lazio",
    "name": "Lazio",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/lazio.png",
    "featured": false,
    "modelCount": 39,
    "torcedorCount": 35,
    "jogadorCount": 4,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta"
    ]
  },
  {
    "id": "lecce",
    "name": "Lecce",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/lecce.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca"
    ]
  },
  {
    "id": "palermo",
    "name": "Palermo",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/palermo.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "roma",
    "name": "Roma",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/roma.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 33,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "sassuolo",
    "name": "Sassuolo",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/sassuolo.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "verde"
    ]
  },
  {
    "id": "torino",
    "name": "Torino",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/torino.png",
    "featured": false,
    "modelCount": 12,
    "torcedorCount": 12,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "branca",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "venezia",
    "name": "Venezia",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/venezia.png",
    "featured": false,
    "modelCount": 26,
    "torcedorCount": 26,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "monza",
    "name": "Monza",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/monza.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "perugia",
    "name": "Perugia",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/perugia.png",
    "featured": false,
    "modelCount": 1,
    "torcedorCount": 1,
    "jogadorCount": 0,
    "categories": [
      "retro"
    ],
    "colors": [
      "vermelha"
    ]
  },
  {
    "id": "parma",
    "name": "Parma",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/parma.png",
    "featured": false,
    "modelCount": 29,
    "torcedorCount": 29,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "brescia",
    "name": "Brescia",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/brescia.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "retro"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "cremonese",
    "name": "Cremonese",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/cremonese.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "retro"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "frosinone",
    "name": "Frosinone",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/frosinone.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca"
    ]
  },
  {
    "id": "salernitana",
    "name": "Salernitana",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/salernitana.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "udinese",
    "name": "Udinese",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/udinese.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "sampdoria",
    "name": "Sampdoria",
    "leagueId": "serie-a",
    "leagueName": "Campeonato Italiano",
    "sport": "futebol",
    "crest": "/crests-v3/sampdoria.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 15,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "psg",
    "name": "PSG",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/psg.png",
    "featured": true,
    "modelCount": 44,
    "torcedorCount": 32,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "lyon",
    "name": "Lyon",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/lyon.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 34,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "bordeaux",
    "name": "Bordeaux",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/bordeaux.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "lens",
    "name": "Lens",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/lens.png",
    "featured": false,
    "modelCount": 20,
    "torcedorCount": 17,
    "jogadorCount": 3,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "lille",
    "name": "Lille",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/lille.png",
    "featured": false,
    "modelCount": 19,
    "torcedorCount": 15,
    "jogadorCount": 4,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "lorient",
    "name": "Lorient",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/lorient.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "metz",
    "name": "Metz",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/metz.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "monaco",
    "name": "Monaco",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/monaco.png",
    "featured": false,
    "modelCount": 28,
    "torcedorCount": 18,
    "jogadorCount": 10,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "nice",
    "name": "Nice",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/nice.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 5,
    "jogadorCount": 1,
    "categories": [
      "jogo"
    ],
    "colors": [
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "stade-rennais",
    "name": "Stade Rennais",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/stade-rennais.png",
    "featured": false,
    "modelCount": 12,
    "torcedorCount": 10,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "nantes",
    "name": "Nantes",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/nantes.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca"
    ]
  },
  {
    "id": "olympique-de-marseille",
    "name": "Olympique de Marseille",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/olympique-de-marseille.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 33,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "saint-etienne",
    "name": "Saint-Étienne",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/saint-etienne.png",
    "featured": false,
    "modelCount": 12,
    "torcedorCount": 10,
    "jogadorCount": 2,
    "categories": [
      "goleiro",
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "verde"
    ]
  },
  {
    "id": "strasbourg",
    "name": "Strasbourg",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/strasbourg.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "cinza"
    ]
  },
  {
    "id": "toulouse",
    "name": "Toulouse",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/toulouse.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "rosa",
      "roxa"
    ]
  },
  {
    "id": "stade-de-reims",
    "name": "Stade de Reims",
    "leagueId": "ligue-1",
    "leagueName": "Campeonato Francês",
    "sport": "futebol",
    "crest": "/crests-v3/stade-de-reims.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "vermelha"
    ]
  },
  {
    "id": "bayern-de-munique",
    "name": "Bayern de Munique",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/bayern-de-munique.png",
    "featured": true,
    "modelCount": 44,
    "torcedorCount": 35,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "bayer-leverkusen",
    "name": "Bayer Leverkusen",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/bayer-leverkusen.png",
    "featured": false,
    "modelCount": 43,
    "torcedorCount": 30,
    "jogadorCount": 13,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "borussia-dortmund",
    "name": "Borussia Dortmund",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/borussia-dortmund.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 31,
    "jogadorCount": 14,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "verde"
    ]
  },
  {
    "id": "borussia-monchengladbach",
    "name": "Borussia Mönchengladbach",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/borussia-monchengladbach.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 25,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "eintracht-frankfurt",
    "name": "Eintracht Frankfurt",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/eintracht-frankfurt.png",
    "featured": false,
    "modelCount": 31,
    "torcedorCount": 31,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "fc-koln",
    "name": "FC Köln",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/fc-koln.png",
    "featured": false,
    "modelCount": 40,
    "torcedorCount": 40,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "freiburg",
    "name": "Freiburg",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/freiburg.png",
    "featured": false,
    "modelCount": 14,
    "torcedorCount": 14,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "hamburger-sv",
    "name": "Hamburger SV",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/hamburger-sv.png",
    "featured": false,
    "modelCount": 42,
    "torcedorCount": 42,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "heidenheim",
    "name": "Heidenheim",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/heidenheim.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "hertha-bsc",
    "name": "Hertha BSC",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/hertha-bsc.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "hoffenheim",
    "name": "Hoffenheim",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/hoffenheim.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "rosa"
    ]
  },
  {
    "id": "rb-leipzig",
    "name": "RB Leipzig",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/rb-leipzig.png",
    "featured": false,
    "modelCount": 36,
    "torcedorCount": 30,
    "jogadorCount": 6,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "schalke-04",
    "name": "Schalke 04",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/schalke-04.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 24,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "st-pauli",
    "name": "St. Pauli",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/st-pauli.png",
    "featured": false,
    "modelCount": 29,
    "torcedorCount": 29,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "vfb-stuttgart",
    "name": "VfB Stuttgart",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/vfb-stuttgart.png",
    "featured": false,
    "modelCount": 24,
    "torcedorCount": 23,
    "jogadorCount": 1,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "werder-bremen",
    "name": "Werder Bremen",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/werder-bremen.png",
    "featured": false,
    "modelCount": 28,
    "torcedorCount": 28,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "wolfsburg",
    "name": "Wolfsburg",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/wolfsburg.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 15,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "union-berlin",
    "name": "Union Berlin",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/union-berlin.png",
    "featured": false,
    "modelCount": 15,
    "torcedorCount": 15,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "augsburg",
    "name": "Augsburg",
    "leagueId": "bundesliga",
    "leagueName": "Campeonato Alemão",
    "sport": "futebol",
    "crest": "/crests-v3/augsburg.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "inter-miami",
    "name": "Inter Miami",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/inter-miami.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 36,
    "jogadorCount": 9,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "atlanta-united",
    "name": "Atlanta United",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/atlanta-united.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 8,
    "jogadorCount": 3,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "austin-fc",
    "name": "Austin FC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/austin-fc.png",
    "featured": false,
    "modelCount": 11,
    "torcedorCount": 11,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "verde"
    ]
  },
  {
    "id": "cf-montreal",
    "name": "CF Montréal",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/cf-montreal.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "charlotte-fc",
    "name": "Charlotte FC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/charlotte-fc.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 6,
    "jogadorCount": 3,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "preta",
      "roxa"
    ]
  },
  {
    "id": "chicago-fire",
    "name": "Chicago Fire",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/chicago-fire.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "la-galaxy",
    "name": "LA Galaxy",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/la-galaxy.png",
    "featured": false,
    "modelCount": 24,
    "torcedorCount": 20,
    "jogadorCount": 4,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "roxa"
    ]
  },
  {
    "id": "los-angeles-fc",
    "name": "Los Angeles FC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/los-angeles-fc.png",
    "featured": false,
    "modelCount": 16,
    "torcedorCount": 12,
    "jogadorCount": 4,
    "categories": [
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "minnesota-united",
    "name": "Minnesota United",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/minnesota-united.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "nashville-sc",
    "name": "Nashville SC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/nashville-sc.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 7,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "new-york-city-fc",
    "name": "New York City FC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/new-york-city-fc.png",
    "featured": false,
    "modelCount": 13,
    "torcedorCount": 10,
    "jogadorCount": 3,
    "categories": [
      "calcao",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "laranja",
      "preta"
    ]
  },
  {
    "id": "new-york-red-bulls",
    "name": "New York Red Bulls",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/new-york-red-bulls.png",
    "featured": false,
    "modelCount": 17,
    "torcedorCount": 14,
    "jogadorCount": 3,
    "categories": [
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "orlando-city",
    "name": "Orlando City",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/orlando-city.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 7,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "roxa"
    ]
  },
  {
    "id": "philadelphia-union",
    "name": "Philadelphia Union",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/philadelphia-union.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 8,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "cinza"
    ]
  },
  {
    "id": "portland-timbers",
    "name": "Portland Timbers",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/portland-timbers.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 9,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "real-salt-lake",
    "name": "Real Salt Lake",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/real-salt-lake.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "cinza",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "seattle-sounders-fc",
    "name": "Seattle Sounders FC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/seattle-sounders-fc.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 6,
    "jogadorCount": 2,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "toronto-fc",
    "name": "Toronto FC",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/toronto-fc.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 8,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "st-louis-city",
    "name": "St. Louis City",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/st-louis-city.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "branca",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "vancouver-whitecaps",
    "name": "Vancouver Whitecaps",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/vancouver-whitecaps.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "sporting-kansas-city",
    "name": "Sporting Kansas City",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/sporting-kansas-city.png",
    "featured": false,
    "modelCount": 4,
    "torcedorCount": 4,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "cinza"
    ]
  },
  {
    "id": "san-jose-earthquakes",
    "name": "San Jose Earthquakes",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/san-jose-earthquakes.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "new-england-revolution",
    "name": "New England Revolution",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/new-england-revolution.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "houston-dynamo",
    "name": "Houston Dynamo",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/houston-dynamo.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 7,
    "jogadorCount": 1,
    "categories": [
      "calcao",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "laranja",
      "preta",
      "roxa",
      "vermelha"
    ]
  },
  {
    "id": "fc-dallas",
    "name": "FC Dallas",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/fc-dallas.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "fc-cincinnati",
    "name": "FC Cincinnati",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/fc-cincinnati.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "dc-united",
    "name": "DC United",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/dc-united.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "colorado-rapids",
    "name": "Colorado Rapids",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/colorado-rapids.png",
    "featured": false,
    "modelCount": 4,
    "torcedorCount": 4,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "columbus-crew",
    "name": "Columbus Crew",
    "leagueId": "mls",
    "leagueName": "Campeonato Americano",
    "sport": "futebol",
    "crest": "/crests-v3/columbus-crew.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 6,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "amarela",
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "tigres",
    "name": "Tigres",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/tigres.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 37,
    "jogadorCount": 8,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "club-america",
    "name": "Club América",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/club-america.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 31,
    "jogadorCount": 14,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "atlas",
    "name": "Atlas",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/atlas.png",
    "featured": false,
    "modelCount": 36,
    "torcedorCount": 29,
    "jogadorCount": 7,
    "categories": [
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "chivas-de-guadalajara",
    "name": "Chivas de Guadalajara",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/chivas-de-guadalajara.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 33,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "tijuana",
    "name": "Tijuana",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/tijuana.png",
    "featured": false,
    "modelCount": 28,
    "torcedorCount": 24,
    "jogadorCount": 4,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "cruz-azul",
    "name": "Cruz Azul",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/cruz-azul.png",
    "featured": false,
    "modelCount": 28,
    "torcedorCount": 24,
    "jogadorCount": 4,
    "categories": [
      "casual",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "monterrey",
    "name": "Monterrey",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/monterrey.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 37,
    "jogadorCount": 8,
    "categories": [
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "necaxa",
    "name": "Necaxa",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/necaxa.png",
    "featured": false,
    "modelCount": 25,
    "torcedorCount": 18,
    "jogadorCount": 7,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "pachuca",
    "name": "Pachuca",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/pachuca.png",
    "featured": false,
    "modelCount": 23,
    "torcedorCount": 16,
    "jogadorCount": 7,
    "categories": [
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "queretaro",
    "name": "Querétaro",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/queretaro.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza"
    ]
  },
  {
    "id": "santos-laguna",
    "name": "Santos Laguna",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/santos-laguna.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 19,
    "jogadorCount": 2,
    "categories": [
      "casual",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "toluca",
    "name": "Toluca",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/toluca.png",
    "featured": false,
    "modelCount": 42,
    "torcedorCount": 32,
    "jogadorCount": 10,
    "categories": [
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "puebla",
    "name": "Puebla",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/puebla.png",
    "featured": false,
    "modelCount": 16,
    "torcedorCount": 11,
    "jogadorCount": 5,
    "categories": [
      "goleiro",
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "verde"
    ]
  },
  {
    "id": "pumas",
    "name": "Pumas",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/pumas.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 32,
    "jogadorCount": 13,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "laranja",
      "preta",
      "roxa",
      "verde"
    ]
  },
  {
    "id": "leon",
    "name": "León",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/leon.png",
    "featured": false,
    "modelCount": 24,
    "torcedorCount": 15,
    "jogadorCount": 9,
    "categories": [
      "infantil",
      "jogo",
      "manga-longa"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "verde"
    ]
  },
  {
    "id": "atletico-san-luis",
    "name": "Atlético San Luis",
    "leagueId": "liga-mx",
    "leagueName": "Campeonato Mexicano",
    "sport": "futebol",
    "crest": "/crests-v3/atletico-san-luis.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 8,
    "jogadorCount": 2,
    "categories": [
      "casual",
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "boca-juniors",
    "name": "Boca Juniors",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/boca-juniors.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 33,
    "jogadorCount": 12,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza"
    ]
  },
  {
    "id": "river-plate",
    "name": "River Plate",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/river-plate.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 29,
    "jogadorCount": 16,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "newell-s-old-boys",
    "name": "Newell's Old Boys",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/newell-s-old-boys.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 7,
    "jogadorCount": 1,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "san-lorenzo",
    "name": "San Lorenzo",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/san-lorenzo.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "penarol",
    "name": "Peñarol",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/penarol.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 21,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "universidad-de-chile",
    "name": "Universidad de Chile",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/universidad-de-chile.png",
    "featured": false,
    "modelCount": 2,
    "torcedorCount": 2,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "palestino",
    "name": "Palestino",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/palestino.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "atletico-nacional",
    "name": "Atlético Nacional",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/atletico-nacional.png",
    "featured": false,
    "modelCount": 21,
    "torcedorCount": 15,
    "jogadorCount": 6,
    "categories": [
      "infantil",
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "universidad-catolica",
    "name": "Universidad Católica",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/universidad-catolica.png",
    "featured": false,
    "modelCount": 34,
    "torcedorCount": 34,
    "jogadorCount": 0,
    "categories": [
      "goleiro",
      "infantil",
      "jogo",
      "manga-longa",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "club-olimpia",
    "name": "Club Olimpia",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/club-olimpia.png",
    "featured": false,
    "modelCount": 16,
    "torcedorCount": 16,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "nacional",
    "name": "Nacional",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/nacional.png",
    "featured": false,
    "modelCount": 17,
    "torcedorCount": 17,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "fc-motagua",
    "name": "FC Motagua",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/fc-motagua.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "santiago-wanderers",
    "name": "Santiago Wanderers",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/santiago-wanderers.png",
    "featured": false,
    "modelCount": 4,
    "torcedorCount": 4,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "huachipato",
    "name": "Huachipato",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/huachipato.png",
    "featured": false,
    "modelCount": 2,
    "torcedorCount": 2,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "cerro-porteno",
    "name": "Cerro Porteño",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/cerro-porteno.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "cd-olimpia",
    "name": "CD Olimpia",
    "leagueId": "resto-america",
    "leagueName": "Resto da América",
    "sport": "futebol",
    "crest": "/crests-v3/cd-olimpia.png",
    "featured": false,
    "modelCount": 18,
    "torcedorCount": 18,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "al-nassr",
    "name": "Al-Nassr",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/al-nassr.png",
    "featured": true,
    "modelCount": 45,
    "torcedorCount": 34,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "al-hilal",
    "name": "Al-Hilal",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/al-hilal.png",
    "featured": false,
    "modelCount": 39,
    "torcedorCount": 23,
    "jogadorCount": 16,
    "categories": [
      "calcao",
      "casual",
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "roxa"
    ]
  },
  {
    "id": "al-ittihad",
    "name": "Al-Ittihad",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/al-ittihad.png",
    "featured": false,
    "modelCount": 45,
    "torcedorCount": 34,
    "jogadorCount": 11,
    "categories": [
      "calcao",
      "casual",
      "feminina",
      "infantil",
      "jogo",
      "manga-longa",
      "treino"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "al-ahli",
    "name": "Al-Ahli",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/al-ahli.png",
    "featured": false,
    "modelCount": 20,
    "torcedorCount": 11,
    "jogadorCount": 9,
    "categories": [
      "infantil",
      "jogo",
      "treino"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "kashima-antlers",
    "name": "Kashima Antlers",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/kashima-antlers.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "kawasaki-frontale",
    "name": "Kawasaki Frontale",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/kawasaki-frontale.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "urawa-red-diamonds",
    "name": "Urawa Red Diamonds",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/urawa-red-diamonds.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "consadole-sapporo",
    "name": "Consadole Sapporo",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/consadole-sapporo.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "yokohama-f-marinos",
    "name": "Yokohama F. Marinos",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/yokohama-f-marinos.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "casual",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "vissel-kobe",
    "name": "Vissel Kobe",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/vissel-kobe.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "kashiwa-reysol",
    "name": "Kashiwa Reysol",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/kashiwa-reysol.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "fc-seoul",
    "name": "FC Seoul",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/fc-seoul.png",
    "featured": false,
    "modelCount": 9,
    "torcedorCount": 9,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "jogo"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "rosa",
      "vermelha"
    ]
  },
  {
    "id": "penang-fc",
    "name": "Penang FC",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/penang-fc.png",
    "featured": false,
    "modelCount": 2,
    "torcedorCount": 1,
    "jogadorCount": 1,
    "categories": [
      "jogo"
    ],
    "colors": [
      "azul"
    ]
  },
  {
    "id": "mamelodi-sundowns",
    "name": "Mamelodi Sundowns",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/mamelodi-sundowns.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 5,
    "jogadorCount": 2,
    "categories": [
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "laranja"
    ]
  },
  {
    "id": "maccabi-tel-aviv",
    "name": "Maccabi Tel Aviv",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/maccabi-tel-aviv.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "amarela",
      "azul"
    ]
  },
  {
    "id": "johor-darul",
    "name": "Johor Darul",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/johor-darul.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 7,
    "jogadorCount": 1,
    "categories": [
      "infantil",
      "jogo"
    ],
    "colors": [
      "azul",
      "branca",
      "roxa",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "orlando-pirates",
    "name": "Orlando Pirates",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/orlando-pirates.png",
    "featured": false,
    "modelCount": 10,
    "torcedorCount": 10,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde",
      "vermelha"
    ]
  },
  {
    "id": "kaizer-chiefs",
    "name": "Kaizer Chiefs",
    "leagueId": "asia-africa",
    "leagueName": "Clubes da Ásia-África",
    "sport": "futebol",
    "crest": "/crests-v3/kaizer-chiefs.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "jogo",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "cinza",
      "laranja"
    ]
  },
  {
    "id": "atlanta-hawks",
    "name": "Atlanta Hawks",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/atlanta-hawks.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "cinza",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "boston-celtics",
    "name": "Boston Celtics",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/boston-celtics.png",
    "featured": true,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta",
      "verde"
    ]
  },
  {
    "id": "brooklyn-nets",
    "name": "Brooklyn Nets",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/brooklyn-nets.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "preta"
    ]
  },
  {
    "id": "charlotte-hornets",
    "name": "Charlotte Hornets",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/charlotte-hornets.png",
    "featured": false,
    "modelCount": 8,
    "torcedorCount": 8,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba"
    ],
    "colors": [
      "azul",
      "branca"
    ]
  },
  {
    "id": "chicago-bulls",
    "name": "Chicago Bulls",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/chicago-bulls.png",
    "featured": true,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "branca",
      "cinza",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "cleveland-cavaliers",
    "name": "Cleveland Cavaliers",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/cleveland-cavaliers.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "laranja",
      "vermelha"
    ]
  },
  {
    "id": "detroit-pistons",
    "name": "Detroit Pistons",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/detroit-pistons.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "indiana-pacers",
    "name": "Indiana Pacers",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/indiana-pacers.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "miami-heat",
    "name": "Miami Heat",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/miami-heat.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "branca",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "milwaukee-bucks",
    "name": "Milwaukee Bucks",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/milwaukee-bucks.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "verde"
    ]
  },
  {
    "id": "new-york-knicks",
    "name": "New York Knicks",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/new-york-knicks.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "orlando-magic",
    "name": "Orlando Magic",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/orlando-magic.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza"
    ]
  },
  {
    "id": "philadelphia-76ers",
    "name": "Philadelphia 76ers",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/philadelphia-76ers.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "toronto-raptors",
    "name": "Toronto Raptors",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/toronto-raptors.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "washington-wizards",
    "name": "Washington Wizards",
    "leagueId": "nba-leste",
    "leagueName": "NBA — Conferência Leste",
    "sport": "nba",
    "crest": "/crests-v3/washington-wizards.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "dallas-mavericks",
    "name": "Dallas Mavericks",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/dallas-mavericks.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "denver-nuggets",
    "name": "Denver Nuggets",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/denver-nuggets.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza"
    ]
  },
  {
    "id": "golden-state-warriors",
    "name": "Golden State Warriors",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/golden-state-warriors.png",
    "featured": true,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "houston-rockets",
    "name": "Houston Rockets",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/houston-rockets.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "los-angeles-clippers",
    "name": "Los Angeles Clippers",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/los-angeles-clippers.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "cinza",
      "vermelha"
    ]
  },
  {
    "id": "los-angeles-lakers",
    "name": "Los Angeles Lakers",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/los-angeles-lakers.png",
    "featured": true,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "preta",
      "roxa"
    ]
  },
  {
    "id": "memphis-grizzlies",
    "name": "Memphis Grizzlies",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/memphis-grizzlies.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "minnesota-timberwolves",
    "name": "Minnesota Timberwolves",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/minnesota-timberwolves.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "new-orleans-pelicans",
    "name": "New Orleans Pelicans",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/new-orleans-pelicans.png",
    "featured": false,
    "modelCount": 5,
    "torcedorCount": 5,
    "jogadorCount": 0,
    "categories": [
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "vermelha"
    ]
  },
  {
    "id": "oklahoma-city-thunder",
    "name": "Oklahoma City Thunder",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/oklahoma-city-thunder.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "phoenix-suns",
    "name": "Phoenix Suns",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/phoenix-suns.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "portland-trail-blazers",
    "name": "Portland Trail Blazers",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/portland-trail-blazers.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "nba",
      "retro"
    ],
    "colors": [
      "branca",
      "cinza",
      "laranja",
      "preta",
      "vermelha"
    ]
  },
  {
    "id": "sacramento-kings",
    "name": "Sacramento Kings",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/sacramento-kings.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "san-antonio-spurs",
    "name": "San Antonio Spurs",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/san-antonio-spurs.png",
    "featured": false,
    "modelCount": 6,
    "torcedorCount": 6,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "azul",
      "branca",
      "preta"
    ]
  },
  {
    "id": "utah-jazz",
    "name": "Utah Jazz",
    "leagueId": "nba-oeste",
    "leagueName": "NBA — Conferência Oeste",
    "sport": "nba",
    "crest": "/crests-v3/utah-jazz.png",
    "featured": false,
    "modelCount": 7,
    "torcedorCount": 7,
    "jogadorCount": 0,
    "categories": [
      "calcao",
      "nba",
      "retro"
    ],
    "colors": [
      "amarela",
      "azul",
      "branca",
      "roxa",
      "verde"
    ]
  }
];
