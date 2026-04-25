import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedUsers } from "@/data/seed";
import { SessionUser, User, UserRole } from "@/types/scoreguff";
import { loadFromStorage, saveToStorage, uid } from "@/utils/storage";

interface AuthContextValue {
  user: SessionUser | null;
  users: User[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const USERS_KEY = "scoreguff_users";
const SESSION_KEY = "scoreguff_session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const loadedUsers = loadFromStorage<User[]>(USERS_KEY, seedUsers);
    setUsers(loadedUsers);
    const session = loadFromStorage<SessionUser | null>(SESSION_KEY, null);
    setUser(session);
  }, []);

  useEffect(() => {
    if (users.length) saveToStorage(USERS_KEY, users);
  }, [users]);

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { ok: false, error: "Invalid credentials" };
    const session: SessionUser = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUser(session);
    saveToStorage(SESSION_KEY, session);
    return { ok: true };
  };

  const signup = (name: string, email: string, password: string) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return { ok: false, error: "Email already exists" };
    const newUser: User = { id: uid("u"), name, email, password, role: "user" as UserRole };
    setUsers((prev) => [...prev, newUser]);
    const session: SessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(session);
    saveToStorage(SESSION_KEY, session);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(
    () => ({ user, users, login, signup, logout, isAdmin: user?.role === "admin" }),
    [user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
