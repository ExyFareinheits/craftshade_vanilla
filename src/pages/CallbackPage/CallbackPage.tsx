import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../../lib/supabase';
import './CallbackPage.scss';

const CallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setError('Код авторизації не отримано');
      return;
    }

    // Обмін коду на токен (ТИМЧАСОВО - для продакшну використовуй API endpoint)
    const exchangeCode = async () => {
      try {
        const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_REDIRECT_URI;

        // Отримання токена від Discord
        const tokenResponse = await axios.post(
          'https://discord.com/api/oauth2/token',
          new URLSearchParams({
            client_id: clientId,
            client_secret: 'qZ-i_u5asK8G90lRNrdYelxzWwqdsbEO', // ТИМЧАСОВО! В продакшні це має бути на сервері!
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const { access_token } = tokenResponse.data;

        // Отримання даних користувача
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const discordUser = userResponse.data;

        // Отримання ролей користувача з серверу Discord
        const guildId = import.meta.env.VITE_DISCORD_GUILD_ID;
        
        let userRoles = [];
        try {
          const guildMemberResponse = await axios.get(
            `https://discord.com/api/users/@me/guilds/${guildId}/member`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          
          const memberData = guildMemberResponse.data;
          const roleIds = memberData.roles;
          
          // Отримання інформації про ролі
          const guildResponse = await axios.get(
            `https://discord.com/api/guilds/${guildId}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          
          const guildRoles = guildResponse.data.roles;
          
          // Фільтруємо тільки ролі користувача
          userRoles = guildRoles
            .filter((role: any) => roleIds.includes(role.id))
            .map((role: any) => ({
              id: role.id,
              name: role.name,
              color: role.color,
              position: role.position,
            }))
            .sort((a: any, b: any) => b.position - a.position);
        } catch (roleError) {
          console.warn('Could not fetch roles:', roleError);
          // Продовжуємо без ролей
        }

        // Збереження користувача в Supabase
        try {
          // Перевірка чи користувач вже існує
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('discord_id', discordUser.id)
            .single();

          if (existingUser) {
            // Оновлення існуючого користувача
            await supabase
              .from('users')
              .update({
                discord_username: discordUser.username,
                discord_discriminator: discordUser.discriminator,
                discord_avatar: discordUser.avatar,
                discord_email: discordUser.email,
                global_name: discordUser.global_name,
                roles: userRoles,
                updated_at: new Date().toISOString(),
              })
              .eq('discord_id', discordUser.id);
            
            console.log('✅ User updated in Supabase');
          } else {
            // Створення нового користувача
            await supabase
              .from('users')
              .insert({
                discord_id: discordUser.id,
                discord_username: discordUser.username,
                discord_discriminator: discordUser.discriminator,
                discord_avatar: discordUser.avatar,
                discord_email: discordUser.email,
                global_name: discordUser.global_name,
                roles: userRoles,
              });
            
            console.log('✅ New user created in Supabase');
          }
        } catch (saveError) {
          console.error('❌ Failed to save to Supabase:', saveError);
          // Продовжуємо навіть якщо не вдалося зберегти
        }

        // Збереження в localStorage (fallback)
        localStorage.setItem('discord_user', JSON.stringify({
          discordId: discordUser.id,
          username: discordUser.username,
          discriminator: discordUser.discriminator,
          avatar: discordUser.avatar,
          email: discordUser.email,
          globalName: discordUser.global_name,
          roles: userRoles,
        }));

        // Перенаправлення на профіль
        navigate('/profile?success=true');
      } catch (err: any) {
        console.error('Auth error:', err);
        setError(err.response?.data?.error_description || err.response?.data?.message || 'Помилка авторизації');
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="callback-page">
        <div className="callback-page__error">
          <h2>❌ Помилка</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Повернутися на головну</button>
        </div>
      </div>
    );
  }

  return (
    <div className="callback-page">
      <div className="callback-page__loading">
        <div className="spinner"></div>
        <h2>Авторизація...</h2>
        <p>Зачекайте, обробляємо дані з Discord</p>
      </div>
    </div>
  );
};

export default CallbackPage;
