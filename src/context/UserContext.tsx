import React, { createContext, useState } from 'react';
import user from '../mock/user';

type AuthContextProps = {
  children: React.ReactNode;
};

type User = {
  username: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    if (username === user.username && password === user.password) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const authContextValue = {
    user: currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
