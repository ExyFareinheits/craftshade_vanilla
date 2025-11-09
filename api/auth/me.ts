import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as any;

    // Тут можна додати запит до бази даних для отримання додаткової інформації
    // Наприклад, Minecraft нікнейм, статистика тощо

    res.status(200).json({
      user: {
        discordId: decoded.discordId,
        username: decoded.username,
        discriminator: decoded.discriminator,
        avatar: decoded.avatar,
        email: decoded.email,
        // TODO: Додати дані з бази даних
        minecraftNickname: null,
        isLinked: false,
      },
    });
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
}
