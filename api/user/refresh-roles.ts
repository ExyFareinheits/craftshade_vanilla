import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const DISCORD_API = 'https://discord.com/api/v10';
const GUILD_ID = process.env.VITE_DISCORD_GUILD_ID || '1293607830584451104';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { discordId, accessToken } = req.body;

    if (!discordId || !accessToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Отримуємо member data з ролями
    const memberResponse = await axios.get(
      `${DISCORD_API}/users/@me/guilds/${GUILD_ID}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const memberRoles = memberResponse.data.roles;

    // Отримуємо повну інформацію про guild та ролі
    const guildResponse = await axios.get(
      `${DISCORD_API}/guilds/${GUILD_ID}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`, // Потрібен bot token
        },
      }
    );

    const guildRoles = guildResponse.data.roles;

    // Фільтруємо та сортуємо ролі користувача
    const userRoles = guildRoles
      .filter((role: any) => memberRoles.includes(role.id))
      .sort((a: any, b: any) => b.position - a.position)
      .map((role: any) => ({
        id: role.id,
        name: role.name,
        color: role.color,
        position: role.position,
      }));

    // Оновлюємо ролі в базі даних
    const { data, error } = await supabase
      .from('users')
      .update({
        roles: userRoles,
        updated_at: new Date().toISOString(),
      })
      .eq('discord_id', discordId)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      roles: userRoles,
      message: 'Roles updated successfully',
    });
  } catch (error: any) {
    console.error('Failed to refresh roles:', error);
    
    // Якщо немає bot token, повертаємо помилку з поясненням
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Bot token not configured or invalid',
      });
    }

    return res.status(500).json({
      error: 'Failed to refresh roles',
      details: error.message,
    });
  }
}
