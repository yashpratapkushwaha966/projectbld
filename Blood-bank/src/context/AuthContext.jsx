import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USER_KEY = "bloodlink_user";
const TOKEN_KEY = "bloodlink_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const login = (payload) => {
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    localStorage.setItem(TOKEN_KEY, payload.token);
    setUser(payload.user);
    setToken(payload.token);
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, isLoggedIn: Boolean(token), login, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
