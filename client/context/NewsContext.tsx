import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedNews } from "@/data/seed";
import { NewsArticle } from "@/types/scoreguff";
import { loadFromStorage, saveToStorage, uid } from "@/utils/storage";

interface NewsContextValue {
  articles: NewsArticle[];
  addArticle: (payload: Omit<NewsArticle, "id">) => void;
  updateArticle: (id: string, payload: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  getById: (id: string) => NewsArticle | undefined;
}

const KEY = "scoreguff_news";
const NewsContext = createContext<NewsContextValue | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    setArticles(loadFromStorage(KEY, seedNews));
  }, []);

  useEffect(() => {
    if (articles.length) saveToStorage(KEY, articles);
  }, [articles]);

  const addArticle = (payload: Omit<NewsArticle, "id">) => setArticles((prev) => [{ ...payload, id: uid("n") }, ...prev]);
  const updateArticle = (id: string, payload: Partial<NewsArticle>) => setArticles((prev) => prev.map((n) => (n.id === id ? { ...n, ...payload } : n)));
  const deleteArticle = (id: string) => setArticles((prev) => prev.filter((n) => n.id !== id));

  const value = useMemo(() => ({ articles, addArticle, updateArticle, deleteArticle, getById: (id: string) => articles.find((a) => a.id === id) }), [articles]);

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be used inside NewsProvider");
  return ctx;
};
