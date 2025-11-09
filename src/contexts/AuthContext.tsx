import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
}

interface User {
  discordId: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email: string;
  roles: DiscordRole[];
  globalName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Спочатку перевіряємо localStorage (тимчасове рішення)
      const storedUser = localStorage.getItem('discord_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
        return;
      }

      // Якщо є API endpoint - використовуємо його
      try {
        const response = await axios.get('/api/auth/me', {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (apiError) {
        // API не доступне - нормально для локальної розробки
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/auth/callback';
    
    // Додаємо guilds та guilds.members.read для отримання ролей
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=identify%20email%20guilds%20guilds.members.read`;
    
    window.location.href = discordAuthUrl;
  };

  const logout = async () => {
    try {
      // Очищаємо localStorage
      localStorage.removeItem('discord_user');
      
      // Пробуємо викликати API (якщо доступне)
      try {
        await axios.post('/api/auth/logout', {}, { withCredentials: true });
      } catch (apiError) {
        // API не доступне - нормально
      }
      
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
