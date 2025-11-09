import axios from 'axios';
import { supabase } from './supabase';

const DISCORD_API = 'https://discord.com/api/v10';
const GUILD_ID = import.meta.env.VITE_DISCORD_GUILD_ID || '1293607830584451104';

interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
}

/**
 * Оновлює ролі користувача з Discord API
 * Використовує OAuth токен користувача (зберігається в localStorage)
 */
export async function refreshUserRoles(discordId: string): Promise<DiscordRole[]> {
  try {
    // Отримуємо access token з localStorage
    const userDataStr = localStorage.getItem('discord_user');
    if (!userDataStr) {
      throw new Error('User not authenticated');
    }

    const userData = JSON.parse(userDataStr);
    const accessToken = localStorage.getItem('discord_access_token');

    if (!accessToken) {
      throw new Error('Access token not found. Please re-authenticate.');
    }

    // Отримуємо member data з Discord API
    const memberResponse = await axios.get(
      `${DISCORD_API}/users/@me/guilds/${GUILD_ID}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const memberRoles = memberResponse.data.roles;

    // Отримуємо інформацію про guild (без bot token - обмежена інформація)
    // Альтернатива: використовуємо публічний widget API
    const widgetResponse = await axios.get(
      `${DISCORD_API}/guilds/${GUILD_ID}/widget.json`
    ).catch(() => null);

    let guildRoles: any[] = [];

    // Якщо widget не доступний, використовуємо кешовані ролі з member data
    if (widgetResponse?.data) {
      guildRoles = widgetResponse.data.roles || [];
    }

    // Якщо не вдалося отримати guild ролі, використовуємо тільки ID
    const userRoles: DiscordRole[] = memberRoles.map((roleId: string) => {
      const roleInfo = guildRoles.find((r: any) => r.id === roleId);
      return {
        id: roleId,
        name: roleInfo?.name || 'Unknown Role',
        color: roleInfo?.color || 0,
        position: roleInfo?.position || 0,
      };
    });

    // Сортуємо за позицією (найвищі зверху)
    userRoles.sort((a, b) => b.position - a.position);

    // Оновлюємо в Supabase
    const { error } = await supabase
      .from('users')
      .update({
        roles: userRoles,
        updated_at: new Date().toISOString(),
      })
      .eq('discord_id', discordId);

    if (error) {
      console.error('Failed to update roles in database:', error);
    }

    // Оновлюємо в localStorage
    const updatedUserData = {
      ...userData,
      roles: userRoles,
    };
    localStorage.setItem('discord_user', JSON.stringify(updatedUserData));

    return userRoles;
  } catch (error: any) {
    console.error('Failed to refresh roles:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Токен авторизації застарів. Будь ласка, увійдіть знову.');
    }
    
    throw new Error('Не вдалося оновити ролі. Спробуйте пізніше.');
  }
}

/**
 * Перевіряє чи потрібно оновити ролі (минуло більше 1 години)
 */
export function shouldRefreshRoles(): boolean {
  const lastUpdate = localStorage.getItem('roles_last_update');
  if (!lastUpdate) return true;

  const ONE_HOUR = 60 * 60 * 1000;
  const timeSinceUpdate = Date.now() - parseInt(lastUpdate, 10);

  return timeSinceUpdate > ONE_HOUR;
}

/**
 * Зберігає час останнього оновлення ролей
 */
export function markRolesUpdated(): void {
  localStorage.setItem('roles_last_update', Date.now().toString());
}
