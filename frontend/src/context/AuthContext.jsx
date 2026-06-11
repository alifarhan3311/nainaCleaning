import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  const setAuth = useCallback((userData, tokenData) => {
    localStorage.setItem(TOKEN_KEY, tokenData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    setToken(tokenData);
    setIsAuthenticated(true);
  }, []);

  // Verify token on mount
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.verify();
        if (response.success && response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [clearAuth]);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.success && response.data) {
      setAuth(response.data.user, response.data.token);
    }
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout API errors
    } finally {
      clearAuth();
    }
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      localStorage.setItem(USER_KEY, JSON.stringify({ ...parsed, ...userData }));
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
