# Craftshade - Vanilla+ Minecraft Server Website

Офіційний веб-сайт Minecraft сервера Craftshade.

## 🚀 Швидкий старт

### Встановлення залежностей

```bash
npm install
```

### Запуск dev сервера

```bash
npm run dev
```

Сайт буде доступний за адресою: http://localhost:5173

### Збірка для продакшену

```bash
npm run build
```

### Попередній перегляд збірки

```bash
npm run preview
```

## 📁 Структура проекту

```
src/
├── components/          # Переиспользуємі компоненти
│   ├── Layout/         # Основний layout з Header/Footer
│   ├── Header/         # Навігація
│   └── Footer/         # Футер з соціальними мережами
├── pages/              # Сторінки
│   ├── MainPage/       # Головна сторінка
│   ├── HelpPage/       # Допомога по механіках
│   ├── UpdatesPage/    # Оновлення сервера
│   ├── ShopPage/       # Онлайн-магазин з донатами
│   ├── PaymentPage/    # Сторінка оплати
│   └── StaffPage/      # Графік роботи персоналу
├── constants/          # Константи (конфіг сервера, механіки, донати)
├── styles/             # Глобальні стилі та змінні
└── App.tsx             # Головний компонент з роутингом
```

## 🛠️ Технології

- **React 18** - UI бібліотека
- **TypeScript** - Типізація
- **Vite** - Швидкий build tool
- **React Router** - Роутинг
- **SCSS** - Стилізація
- **Framer Motion** - Анімації
- **React Icons** - Іконки
- **Vercel** - Хостинг

## 📝 Інформація про сервер

- **IP**: craftshade.gigacube.host
- **Версія**: 1.18.2
- **Підтримка**: DiscordSRV, Voicemod

## 🌐 Деплой

Проект автоматично деплоїться на Vercel при push в main гілку.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/craftshade-website)

## 📞 Контакти

- Discord: [discord.gg/YG6t2gZM26](https://discord.gg/YG6t2gZM26)
- TikTok: [@craftshade](https://www.tiktok.com/@craftshade)
- Email: craftshade@gmail.com

## 📄 Ліцензія

© 2024 Craftshade. Всі права захищені.
3. Деплой відбудеться автоматично

Або через CLI:

```bash
npm i -g vercel
vercel
```

## 📦 Додавання нових сторінок

1. Створіть компонент в `src/pages/НазваСторінки/`
2. Додайте route в `src/App.tsx`
3. Додайте посилання в `src/components/Header/Header.tsx`

## 🎨 Зміна стилів

Глобальні змінні (кольори, відступи) знаходяться в:
`src/styles/variables.scss`

## ⚠️ Примітки

- Персональний кабінет НЕ реалізований (потрібен backend)
- Для повноцінного магазину потрібна інтеграція з платіжною системою
- Всі дані поки що статичні
```
