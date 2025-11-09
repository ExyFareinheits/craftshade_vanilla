# 🗄️ Supabase Integration - Інструкція

## 📋 Що потрібно зробити:

### Крок 1: Отримати Supabase credentials

1. Йди на https://supabase.com/dashboard
2. Відкрий свій проект
3. Перейди в **Settings** → **API**
4. Скопіюй:
   - **Project URL** (наприклад: `https://xxxxx.supabase.co`)
   - **anon/public key** (довгий рядок що починається з `eyJ...`)

### Крок 2: Створити таблиці в базі даних

1. В Supabase Dashboard перейди в **SQL Editor**
2. Відкрий файл `supabase_schema.sql` з проекту
3. Скопіюй весь SQL код
4. Вставь в SQL Editor
5. Натисни **Run** (або Ctrl+Enter)

Це створить:
- ✅ Таблицю `users` для зберігання Discord користувачів та їх ролей
- ✅ Таблицю `minecraft_links` для прив'язок Minecraft (опціонально)
- ✅ Індекси для швидкого пошуку
- ✅ Тригери для автоматичного оновлення `updated_at`

### Крок 3: Оновити .env файл

Відкрий `.env` і замінь:

```env
SUPABASE_URL=https://твій-проект.supabase.co
SUPABASE_ANON_KEY=твій-anon-key
```

На свої дані з Кроку 1.

### Крок 4: Встановити Supabase клієнт

```bash
npm install @supabase/supabase-js
```

### Крок 5: Перезапустити dev сервер

```bash
npm run dev
```

---

## ✅ Що вже створено:

### 1. API Endpoints:

**POST `/api/user/save`** - Збереження/оновлення користувача
```json
{
  "discordId": "123456789",
  "username": "TestUser",
  "discriminator": "1234",
  "avatar": "abc123",
  "email": "test@example.com",
  "globalName": "Test User",
  "roles": [
    {"id": "role1", "name": "Admin", "color": 16711680, "position": 10}
  ]
}
```

**GET `/api/user/get?discordId=123456789`** - Отримання користувача
```json
{
  "success": true,
  "user": {
    "discordId": "123456789",
    "username": "TestUser",
    "roles": [...]
  }
}
```

### 2. Оновлений CallbackPage:
- ✅ Після авторизації зберігає дані в Supabase
- ✅ Fallback на localStorage якщо API не працює
- ✅ Автоматична синхронізація ролей

### 3. Структура БД:

**Таблиця `users`:**
- `id` - Auto-increment ID
- `discord_id` - Унікальний Discord ID (індекс)
- `discord_username` - Нікнейм користувача
- `discord_discriminator` - #0000
- `discord_avatar` - Hash аватарки
- `discord_email` - Email
- `global_name` - Display name
- `roles` - JSONB масив ролей
- `created_at` - Дата створення
- `updated_at` - Дата оновлення (авто)

**Таблиця `minecraft_links` (опціонально):**
- `id` - Auto-increment ID
- `user_id` - FK до users
- `minecraft_uuid` - UUID гравця (унікальний)
- `minecraft_nickname` - Нікнейм
- `linked_at` - Дата прив'язки

---

## 🔧 Налаштування Supabase (важливо!)

### Row Level Security (RLS):

За замовчуванням Supabase блокує всі запити. Потрібно налаштувати політики:

#### Варіант 1: Відключити RLS (для розробки)

В SQL Editor виконай:
```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE minecraft_links DISABLE ROW LEVEL SECURITY;
```

⚠️ **Не рекомендовано для продакшну!**

#### Варіант 2: Налаштувати політики (для продакшну)

```sql
-- Дозволити читання всім
CREATE POLICY "Allow public read access" ON users
FOR SELECT USING (true);

-- Дозволити вставку через service role
CREATE POLICY "Allow insert from service" ON users
FOR INSERT WITH CHECK (true);

-- Дозволити оновлення через service role
CREATE POLICY "Allow update from service" ON users
FOR UPDATE USING (true);
```

### API Keys:

- **anon key** - для клієнта (безпечний, можна показувати)
- **service_role key** - для сервера (секретний, НІКОЛИ не показувати!)

Для API endpoints використовуй **anon key** з політиками RLS.

---

## 🧪 Тестування:

### 1. Перевірка підключення:

```bash
# В браузері відкрий:
http://localhost:5173/api/user/get?discordId=123
# Має повернути 404 (користувач не знайдений) - це нормально
```

### 2. Тест збереження:

```bash
# Авторизуйся через Discord
# Перевір в Supabase Dashboard → Table Editor → users
# Має з'явитись новий запис
```

### 3. Перевірка ролей:

```bash
# На ProfilePage мають відображатись ролі з БД
# При повторному вході - дані мають оновлюватись
```

---

## 🚀 Деплой на Vercel:

### 1. Додай Environment Variables:

В Vercel Dashboard → Settings → Environment Variables:

```
SUPABASE_URL=https://твій-проект.supabase.co
SUPABASE_ANON_KEY=твій-anon-key
DISCORD_CLIENT_SECRET=qZ-i_u5asK8G90lRNrdYelxzWwqdsbEO
JWT_SECRET=новий-випадковий-ключ
```

### 2. Увімкни RLS:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

І додай політики як в "Варіант 2" вище.

### 3. Redeploy:

```bash
git push
# Vercel автоматично задеплоїть з новими змінами
```

---

## 📊 Додаткові можливості:

### Real-time subscriptions (опціонально):

```typescript
// Підписка на зміни ролей
supabase
  .channel('users')
  .on('postgres_changes', { 
    event: 'UPDATE', 
    schema: 'public', 
    table: 'users' 
  }, (payload) => {
    console.log('User updated:', payload.new)
  })
  .subscribe()
```

### Статистика користувачів:

```sql
-- Скільки користувачів зареєстровано
SELECT COUNT(*) FROM users;

-- Топ 10 ролей
SELECT 
  role->>'name' as role_name,
  COUNT(*) as count
FROM users, jsonb_array_elements(roles) as role
GROUP BY role->>'name'
ORDER BY count DESC
LIMIT 10;
```

---

## 🐛 Troubleshooting:

### Помилка "relation does not exist":
- Перевір що виконав SQL з `supabase_schema.sql`
- Перевір назву таблиці (має бути `users`)

### Помилка "new row violates row-level security":
- Відключи RLS або налаштуй політики
- Перевір що використовуєш правильний API key

### Дані не зберігаються:
- Перевір SUPABASE_URL та SUPABASE_ANON_KEY в .env
- Перевір консоль браузера (F12)
- Перевір Network tab чи йде запит до `/api/user/save`

---

## 📝 Наступні кроки:

- [ ] Налаштувати Supabase (credentials, таблиці, RLS)
- [ ] Встановити пакет `npm install @supabase/supabase-js`
- [ ] Протестувати локально
- [ ] Задеплоїти на Vercel з environment variables
- [ ] Налаштувати бекапи БД (Settings → Database → Backups)

---

**Питання? Проблеми з налаштуванням?** Пиши! 🚀
