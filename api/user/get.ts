import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { discordId } = req.query;

  if (!discordId || typeof discordId !== 'string') {
    return res.status(400).json({ error: 'Discord ID is required' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('discord_id', discordId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Користувача не знайдено
        return res.status(404).json({ error: 'User not found' });
      }
      throw error;
    }

    return res.status(200).json({ 
      success: true,
      user: {
        discordId: user.discord_id,
        username: user.discord_username,
        discriminator: user.discord_discriminator,
        avatar: user.discord_avatar,
        email: user.discord_email,
        globalName: user.global_name,
        roles: user.roles || [],
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      }
    });
  } catch (error: any) {
    console.error('Supabase error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch user',
      details: error.message 
    });
  }
}
