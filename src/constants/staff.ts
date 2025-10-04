export interface StaffSchedule {
  role: string;
  weekday: string;
  weekend: string;
  break: string;
  members?: string[];
}

export const STAFF_SCHEDULE: StaffSchedule[] = [
  {
    role: 'Куратори',
    weekday: '10:00 - 23:30',
    weekend: '11:00 - 22:30',
    break: '30 хв (1 раз на день)',
    members: ['Fareinheits'],
  },
  {
    role: 'Ст. Адміністратори + Адміністратори',
    weekday: '10:00 - 23:00',
    weekend: '11:00 - 22:00',
    break: '30 хв (1 раз на день)',
    members: ['kokiss122', 'Kot_Sayrma'],
  },
  {
    role: 'Тех. Адміни',
    weekday: '13:00 - 19:00',
    weekend: '12:30 - 20:30',
    break: '20 хв',
  },
  {
    role: 'Стажери',
    weekday: '10:00 - 21:00',
    weekend: '10:00 - 21:00',
    break: '30 хв (1 раз на день)',
  },
];

export const CONTACT_INFO = {
  discord: 'https://discord.gg/YG6t2gZM26',
  tiktok: '@craftshade',
  email: 'craftshade@gmail.com',
  monobank: '5375 4112 0578 7331',
} as const;
