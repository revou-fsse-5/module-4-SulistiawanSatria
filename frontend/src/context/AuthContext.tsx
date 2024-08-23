import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface BirthDate {
  day: string;
  month: string;
  year: string;
}

type AuthContextProps = {
  user: any;
  login: (email: string, password: string, rememberMe: boolean, redirectPath?: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string, birthDate: BirthDate) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean, redirectPath?: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const data = response.data;
      setUser(data.user);

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }

      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const registerUser = async (name: string, email: string, password: string, birthDate: BirthDate) => {
    try {
      const response = await api.post('/register', { name, email, password, birthDate });
      const data = response.data;
      setUser(data.user);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
