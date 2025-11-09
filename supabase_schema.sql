-- Створення таблиці для користувачів
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  discord_id VARCHAR(255) UNIQUE NOT NULL,
  discord_username VARCHAR(255) NOT NULL,
  discord_discriminator VARCHAR(10),
  discord_avatar VARCHAR(255),
  discord_email VARCHAR(255),
  global_name VARCHAR(255),
  roles JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Індекс для швидкого пошуку по discord_id
CREATE INDEX idx_users_discord_id ON users(discord_id);

-- Функція для автоматичного оновлення updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Тригер для автоматичного оновлення updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Додаткова таблиця для Minecraft прив'язок (опціонально)
CREATE TABLE minecraft_links (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  minecraft_uuid VARCHAR(36) UNIQUE NOT NULL,
  minecraft_nickname VARCHAR(16) NOT NULL,
  linked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Індекс для швидкого пошуку по minecraft_uuid
CREATE INDEX idx_minecraft_uuid ON minecraft_links(minecraft_uuid);

-- Коментарі до таблиць
COMMENT ON TABLE users IS 'Discord користувачі з їх ролями';
COMMENT ON TABLE minecraft_links IS 'Прив''язки Minecraft аккаунтів до Discord';
