import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { discordId, username, discriminator, avatar, email, globalName, roles } = req.body;

    if (!discordId || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Перевірка чи користувач вже існує
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('discord_id', discordId)
      .single();

    if (existingUser) {
      // Оновлення існуючого користувача
      const { data, error } = await supabase
        .from('users')
        .update({
          discord_username: username,
          discord_discriminator: discriminator,
          discord_avatar: avatar,
          discord_email: email,
          global_name: globalName,
          roles: roles || [],
          updated_at: new Date().toISOString(),
        })
        .eq('discord_id', discordId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ 
        success: true, 
        user: data,
        message: 'User updated successfully'
      });
    } else {
      // Створення нового користувача
      const { data, error } = await supabase
        .from('users')
        .insert({
          discord_id: discordId,
          discord_username: username,
          discord_discriminator: discriminator,
          discord_avatar: avatar,
          discord_email: email,
          global_name: globalName,
          roles: roles || [],
        })
        .select()
        .single();

      if (error) throw error;

      return res.status(201).json({ 
        success: true, 
        user: data,
        message: 'User created successfully'
      });
    }
  } catch (error: any) {
    console.error('Supabase error:', error);
    return res.status(500).json({ 
      error: 'Failed to save user',
      details: error.message 
    });
  }
}
