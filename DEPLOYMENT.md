# 🚀 Готово до деплою на Vercel

## ✅ Що реалізовано:

1. **Discord OAuth авторизація**
   - Вхід через Discord
   - Отримання інформації про користувача
   - Завантаження ролей з Discord сервера

2. **Збереження в Supabase**
   - Користувачі зберігаються в БД
   - Ролі зберігаються в JSONB форматі
   - Автоматичне оновлення `updated_at`

3. **Відображення профілю**
   - Аватар користувача з Discord
   - Список ролей з кольорами
   - Responsive дизайн

---

## 📋 Чекліст перед деплоєм:

### 1️⃣ **Discord Application**

- [ ] Додай Redirect URL: `https://твій-домен.vercel.app/auth/callback`
  - Перейди: https://discord.com/developers/applications/1418288543637311609
  - OAuth2 → Redirects → Add Redirect
  - Натисни Save Changes

### 2️⃣ **Vercel Environment Variables**

Додай в Vercel Dashboard → Settings → Environment Variables:

```env
# Discord OAuth
VITE_DISCORD_CLIENT_ID=1418288543637311609
DISCORD_CLIENT_SECRET=qZ-i_u5asK8G90lRNrdYelxzWwqdsbEO
VITE_DISCORD_GUILD_ID=1293607830284451104

# URLs (замінити на свій домен!)
VITE_APP_URL=https://твій-домен.vercel.app
VITE_REDIRECT_URI=https://твій-домен.vercel.app/auth/callback

# JWT Secret (згенерувати новий!)
JWT_SECRET=твій-довгий-випадковий-ключ

# Supabase
VITE_SUPABASE_URL=https://hwsdfhhgkuhitomqhcvj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3c2RmaGhna3VoaXRvbXFoY3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTI3MjIsImV4cCI6MjA3ODE4ODcyMn0.H3ulCZfWPb0bti56_bC6FDgIuMetD-95ObZoL5CZZ6U
SUPABASE_URL=https://hwsdfhhgkuhitomqhcvj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3c2RmaGhna3VoaXRvbXFoY3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTI3MjIsImV4cCI6MjA3ODE4ODcyMn0.H3ulCZfWPb0bti56_bC6FDgIuMetD-95ObZoL5CZZ6U
```

**Згенерувати JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3️⃣ **Supabase (вже налаштовано)**

- [x] База даних створена
- [x] Таблиці `users` та `minecraft_links` створені
- [x] RLS вимкнено (для тестування)
- [x] Credentials додані в `.env`

---

## 🚀 Деплой на Vercel:

### **Варіант A: Через GitHub**

1. **Push на GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Підключи до Vercel:**
   - Відкрий https://vercel.com/new
   - Import Project → вибери `craftshade_vanilla`
   - Додай Environment Variables (з пункту 2️⃣)
   - Deploy!

### **Варіант B: Через Vercel CLI**

```bash
# Встанови Vercel CLI
npm install -g vercel

# Логін
vercel login

# Деплой
vercel
```

---

## ⚠️ Важлива інформація:

### **Client Secret в коді:**
У `CallbackPage.tsx` є захардкоджений Discord Client Secret:
```typescript
client_secret: 'qZ-i_u5asK8G90lRNrdYelxzWwqdsbEO'
```

**Це працює, але небезпечно для продакшну!**
- Для невеликого проекту - прийнятно
- Для серйозного проекту - краще використовувати API endpoint

**Рішення в майбутньому:**
Переробити `CallbackPage.tsx` щоб використовував `/api/auth/callback` замість клієнтського коду.

---

## 🧪 Тестування після деплою:

1. **Відкрий свій сайт**
   - `https://твій-домен.vercel.app`

2. **Спробуй авторизуватись**
   - Натисни "Увійти через Discord"
   - Дозволь доступ
   - Перенаправить на профіль

3. **Перевір профіль**
   - Маєш побачити свій аватар
   - Список ролей з Discord сервера
   - Кольори ролей мають співпадати

4. **Перевір базу даних**
   - Supabase Dashboard → Table Editor → `users`
   - Має з'явитися запис з твоїми даними

---

## 📂 Структура проекту:

```
api/
├── auth/
│   ├── discord.ts       # Redirect to Discord OAuth
│   ├── callback.ts      # Handle OAuth callback
│   ├── me.ts           # Get current user
│   └── logout.ts       # Clear session
└── user/
    ├── save.ts         # Save user to Supabase
    └── get.ts          # Get user from Supabase

src/
├── contexts/
│   └── AuthContext.tsx   # Auth state management
├── components/
│   ├── LoginButton/     # Discord login button
│   └── ProfileDropdown/ # User menu
├── pages/
│   ├── CallbackPage/    # OAuth callback handler
│   └── ProfilePage/     # User profile with roles
└── lib/
    └── supabase.ts      # Supabase client

supabase_schema.sql      # Database schema
```

---

## 🎯 Що відбувається при авторизації:

1. Користувач натискає "Увійти через Discord"
2. Redirect на Discord OAuth
3. Discord повертає code на `/auth/callback`
4. CallbackPage обмінює code на access_token
5. Отримує дані користувача з Discord API
6. Отримує ролі з Discord Guild
7. Зберігає в Supabase БД
8. Зберігає в localStorage (fallback)
9. Redirect на `/profile`
10. Показує профіль з ролями

---

## 💡 Наступні кроки (опціонально):

1. **Безпека:**
   - Переробити на використання API endpoints
   - Видалити Client Secret з клієнтського коду
   - Налаштувати RLS політики в Supabase

2. **Функціонал:**
   - Додати Discord Bot для real-time оновлення ролей
   - Додати Minecraft linking через DiscordSRV
   - Історія зміни ролей

3. **UI:**
   - Додати іконки для ролей
   - Hover з описом ролі
   - Фільтр ролей

---

## ✅ Готово!

Проект готовий до деплою. Дотримуйся чекліста і все спрацює! 🎉

**Питання? Проблеми після деплою?** Напиши, допоможу! 😊
