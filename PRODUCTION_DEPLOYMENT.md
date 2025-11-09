# 🚀 Production Deployment Checklist

## ✅ Перед деплоєм:

### 1. **Discord Application налаштування**

📍 **Перейди:** https://discord.com/developers/applications/1418288543637311609

#### OAuth2 → Redirects:
- [x] `http://localhost:5173/auth/callback` (для локальної розробки)
- [ ] **ДОДАЙ:** `https://твій-домен.vercel.app/auth/callback` (для production)

**Як дізнатись свій домен Vercel:**
- Після першого деплою Vercel покаже домен типу: `craftshade-vanilla.vercel.app`
- Або можеш встановити свій custom domain

---

### 2. **Згенеруй новий JWT_SECRET для production**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Збережи результат** - він буде потрібен для Vercel Environment Variables!

---

### 3. **Перевір .gitignore**

Переконайся що `.env` в `.gitignore`:
```
✅ .env файл НЕ має бути в git
✅ .env.example може бути в git
```

---

## 🚀 Деплой на Vercel:

### **Варіант A: Через GitHub (Рекомендую)**

#### Крок 1: Push на GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Крок 2: Підключи Vercel
1. Відкрий https://vercel.com/new
2. Import Git Repository → вибери `craftshade_vanilla`
3. Framework Preset: **Vite** (має визначитись автоматично)
4. Root Directory: `./` (залиш як є)
5. **НЕ натискай Deploy ще!** Спочатку додай Environment Variables ⬇️

---

### **Крок 3: Додай Environment Variables на Vercel**

В розділі **Environment Variables** додай:

```env
# Discord OAuth
VITE_DISCORD_CLIENT_ID = 1418288543637311609
DISCORD_CLIENT_SECRET = qZ-i_u5asK8G90lRNrdYelxzWwqdsbEO
VITE_DISCORD_GUILD_ID = 1293607830584451104

# URLs (ВАЖЛИВО: замінити після першого деплою!)
VITE_APP_URL = https://твій-домен.vercel.app
VITE_REDIRECT_URI = https://твій-домен.vercel.app/auth/callback

# JWT Secret (використай НОВИЙ згенерований!)
JWT_SECRET = твій-новий-jwt-secret-з-кроку-2

# Supabase (для клієнта)
VITE_SUPABASE_URL = https://hwsdfhhgkuhitomqhcvj.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3c2RmaGhna3VoaXRvbXFoY3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTI3MjIsImV4cCI6MjA3ODE4ODcyMn0.H3ulCZfWPb0bti56_bC6FDgIuMetD-95ObZoL5CZZ6U

# Supabase (для API endpoints)
SUPABASE_URL = https://hwsdfhhgkuhitomqhcvj.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3c2RmaGhna3VoaXRvbXFoY3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTI3MjIsImV4cCI6MjA3ODE4ODcyMn0.H3ulCZfWPb0bti56_bC6FDgIuMetD-95ObZoL5CZZ6U
```

**💡 Важливо:**
- Для `VITE_APP_URL` та `VITE_REDIRECT_URI` спочатку постав тимчасове значення
- Після першого деплою Vercel покаже твій домен
- Тоді **оновиш** ці змінні на правильні значення
- І **редеплоїш** проект

---

#### Крок 4: Deploy!
Натисни **Deploy** і зачекай ~2-3 хвилини

---

### **Крок 5: Після першого деплою**

Vercel покаже твій домен, наприклад: `craftshade-vanilla-abc123.vercel.app`

#### 5.1 Додай Redirect URL в Discord:
1. https://discord.com/developers/applications/1418288543637311609
2. OAuth2 → Redirects
3. Додай: `https://твій-домен.vercel.app/auth/callback`
4. Save Changes

#### 5.2 Оновити Environment Variables:
1. Vercel Dashboard → Settings → Environment Variables
2. Знайди `VITE_APP_URL` → Edit → `https://твій-домен.vercel.app`
3. Знайди `VITE_REDIRECT_URI` → Edit → `https://твій-домен.vercel.app/auth/callback`
4. Save

#### 5.3 Redeploy:
1. Vercel Dashboard → Deployments
2. Знайди останній deployment
3. `...` → Redeploy

---

## 🧪 Тестування Production:

### 1. **Відкрий свій сайт**
`https://твій-домен.vercel.app`

### 2. **Спробуй авторизуватись**
- Натисни "Увійти через Discord"
- Дозволь доступ
- Має перенаправити на профіль

### 3. **Перевір профіль**
- Аватар відображається
- Ролі з Discord показуються
- Кольори ролей правильні

### 4. **Перевір Supabase**
- Dashboard → Table Editor → `users`
- Має з'явитися запис з твоїми даними

### 5. **Перевір на мобільних**
- Відкрий на телефоні
- Burger menu працює
- Кнопки авторизації зручні

---

## ⚠️ Troubleshooting:

### Проблема: "Redirect URI mismatch"
**Рішення:**
1. Перевір Discord Application → OAuth2 → Redirects
2. URL має точно співпадати: `https://твій-домен.vercel.app/auth/callback`
3. Без слешу в кінці URL
4. Https, не http

### Проблема: "Cannot connect to Supabase"
**Рішення:**
1. Перевір Environment Variables на Vercel
2. `VITE_SUPABASE_URL` та `VITE_SUPABASE_ANON_KEY` мають бути правильні
3. Redeploy після зміни env vars

### Проблема: Білий екран
**Рішення:**
1. Vercel Dashboard → Functions → Logs
2. Подивись помилки
3. Перевір чи всі env змінні додані

### Проблема: Ролі не відображаються
**Рішення:**
1. Перевір що `VITE_DISCORD_GUILD_ID` правильний
2. Перевір що користувач є на Discord сервері
3. Перевір Supabase Table Editor → `users` → roles column

---

## 📊 Після успішного деплою:

### Опціонально: Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add Domain → введи свій домен
3. Налаштуй DNS записи
4. Оновити Discord Redirect URL на новий домен

### Опціонально: Analytics
Vercel автоматично збирає аналітику:
- Dashboard → Analytics
- Бачиш трафік, помилки, швидкість

---

## ✅ Фінальний чекліст:

- [ ] Push на GitHub
- [ ] Import на Vercel
- [ ] Додати всі Environment Variables
- [ ] Deploy (перший раз)
- [ ] Додати Redirect URL в Discord
- [ ] Оновити VITE_APP_URL та VITE_REDIRECT_URI
- [ ] Redeploy
- [ ] Протестувати авторизацію
- [ ] Перевірити профіль
- [ ] Перевірити Supabase
- [ ] Протестувати на мобільних

---

## 🎉 Готово!

Твій сайт тепер живе на: `https://твій-домен.vercel.app`

**Потрібна допомога?** Напиши в чат! 😊
