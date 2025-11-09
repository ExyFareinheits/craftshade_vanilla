import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Підтримка і GET і POST
  const code = req.method === 'POST' ? req.body.code : req.query.code;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const clientId = process.env.VITE_DISCORD_CLIENT_ID!;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET!;
    const redirectUri = process.env.VITE_REDIRECT_URI || 'http://localhost:5173/auth/callback';

    // Обмін коду на токен
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Отримання інформації про користувача
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const discordUser = userResponse.data;

    // Створення JWT токена
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      {
        discordId: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator,
        avatar: discordUser.avatar,
        email: discordUser.email,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Встановлення cookie
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 днів
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);

    // Якщо POST запит - повертаємо JSON
    if (req.method === 'POST') {
      return res.status(200).json({ success: true, user: discordUser });
    }

    // Якщо GET запит - редірект
    const appUrl = process.env.VITE_APP_URL || 'http://localhost:5173';
    res.redirect(`${appUrl}/profile?success=true`);
  } catch (error: any) {
    console.error('Discord OAuth Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Authentication failed',
      details: error.response?.data || error.message 
    });
  }
}
