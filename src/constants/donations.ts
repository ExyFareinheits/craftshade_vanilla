export interface Donation {
  id: string;
  name: string;
  price: number;
  role: string;
  items: string[];
  features: string[];
  color: string;
}

export const DONATIONS: Donation[] = [
  {
    id: 'copper',
    name: 'Copper',
    price: 15,
    role: '@Copper',
    color: '#CD7F32',
    items: ['/kit copper'],
    features: ['x10 Діамантової руди'],
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    price: 30,
    role: '@Amethyst',
    color: '#9966CC',
    items: ['/kit amethyst'],
    features: [
      'x12 Діамантової руди + 3 Смарагдової руди',
      'Пріоритетна підтримка в report каналах',
    ],
  },
  {
    id: 'sculk',
    name: 'Sculk',
    price: 45,
    role: '@Sculk',
    color: '#0A3A3A',
    items: ['/kit sculk'],
    features: [
      'x10 Смарагдової руди',
      'x1 сет з набору Sculk',
      'Пріоритетна підтримка в report каналах',
    ],
  },
  {
    id: 'warden',
    name: 'Warden',
    price: 60,
    role: '@Warden',
    color: '#00CED1',
    items: ['/kit warden'],
    features: [
      'x6 Діамантової руди + 10 Смарагдової руди',
      'x1 сет з набору Warden',
      'Найвища пріоритетна підтримка',
    ],
  },
];

export const calculateDiscount = (price: number, isPremium: boolean): number => {
  if (!isPremium || price < 30) return price;
  return Math.round(price * 0.9);
};
