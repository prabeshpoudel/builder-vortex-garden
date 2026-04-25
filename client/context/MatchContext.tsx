import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedMatches } from "@/data/seed";
import { Match } from "@/types/scoreguff";
import { loadFromStorage, saveToStorage, uid } from "@/utils/storage";

interface MatchContextValue {
  matches: Match[];
  addMatch: (payload: Omit<Match, "id">) => void;
  updateMatch: (id: string, payload: Partial<Match>) => void;
  deleteMatch: (id: string) => void;
  getById: (id: string) => Match | undefined;
}

const KEY = "scoreguff_matches";
const MatchContext = createContext<MatchContextValue | undefined>(undefined);

const sortMatches = (items: Match[]) =>
  [...items].sort((a, b) => new Date(a.matchDateTime).getTime() - new Date(b.matchDateTime).getTime());

export const MatchProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setMatches(sortMatches(loadFromStorage(KEY, seedMatches)));
  }, []);

  useEffect(() => {
    if (matches.length) saveToStorage(KEY, matches);
  }, [matches]);

  const addMatch = (payload: Omit<Match, "id">) => setMatches((prev) => sortMatches([...prev, { ...payload, id: uid("m") }]));

  const updateMatch = (id: string, payload: Partial<Match>) =>
    setMatches((prev) => sortMatches(prev.map((m) => (m.id === id ? { ...m, ...payload } : m))));

  const deleteMatch = (id: string) => setMatches((prev) => prev.filter((m) => m.id !== id));

  const value = useMemo(() => ({ matches, addMatch, updateMatch, deleteMatch, getById: (id: string) => matches.find((m) => m.id === id) }), [matches]);

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};

export const useMatches = () => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error("useMatches must be used inside MatchProvider");
  return ctx;
};
