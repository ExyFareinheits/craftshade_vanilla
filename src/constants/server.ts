export const SERVER_CONFIG = {
  version: '1.18.2',
  ip: 'craftshade.gigacube.host',
  support: ['DiscordSRV', 'Voicemod'],
} as const;

export const PREMIUM_BENEFITS = [
  'Пріоритетна підтримка',
  'Тестування нових функцій',
  'Роль в Discord',
  'Знижки на привілегії -10% (від 30 грн)',
  'Можливість подарувати 1 прохідку',
] as const;

export const SHOP_ITEMS = {
  firstPass: { name: 'Перша прохідка', price: 0 },
  secondPass: { name: 'Друга прохідка', price: 30 },
  premium: { name: 'Premium доступ', price: 35 },
} as const;

export const PAYMENT_INSTRUCTIONS = [
  'Ваш псевдонім (в грі + Discord)',
  'Ваше реальне ім\'я',
  'Ваша послуга',
  'Підтвердити в Discord покупку чеком',
] as const;
