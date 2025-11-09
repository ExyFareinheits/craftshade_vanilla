import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = process.env.VITE_REDIRECT_URI || 'http://localhost:5173/auth/callback';

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=identify%20email`;

  res.redirect(discordAuthUrl);
}
