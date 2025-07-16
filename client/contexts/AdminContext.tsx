import * as React from "react";
import { useAuth } from "./AuthContext";

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  league: string;
  sport: string;
  matchDate: string;
  matchTime: string;
  venue: string;
  venueCapacity?: number;
  status: "upcoming" | "live" | "completed" | "postponed" | "cancelled";
  score?: {
    home: number;
    away: number;
    status: string;
  };
  weather?: {
    temperature: number;
    condition: string;
  };
  officials?: {
    referee: string;
    assistants: string[];
  };
  description: string;
  importance: "low" | "medium" | "high";
  ticketInfo?: {
    available: boolean;
    priceRange: string;
    url?: string;
  };
  broadcastInfo?: {
    tv: string[];
    streaming: string[];
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "featured";
  isPinned: boolean;
  isTrending: boolean;
  isBreaking: boolean;
  views: number;
  likes: number;
  comments: number;
  imageUrl?: string;
  tags: string[];
  isNepal: boolean;
  readTime: number;
}

interface AdminContextType {
  games: Game[];
  articles: Article[];
  isLoading: boolean;

  // Game management
  addGame: (game: Omit<Game, "id">) => Promise<void>;
  updateGame: (id: string, game: Partial<Game>) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
  getUpcomingGames: () => Game[];
  getLiveGames: () => Game[];
  getCompletedGames: () => Game[];

  // Article management
  addArticle: (
    article: Omit<
      Article,
      | "id"
      | "author"
      | "authorId"
      | "publishedAt"
      | "updatedAt"
      | "views"
      | "likes"
      | "comments"
      | "slug"
    >,
  ) => Promise<void>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  togglePinArticle: (id: string) => Promise<void>;
  toggleTrendingArticle: (id: string) => Promise<void>;

  // Data fetching
  refreshData: () => Promise<void>;
}

const AdminContext = React.createContext<AdminContextType | undefined>(
  undefined,
);

export const useAdmin = () => {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

// API helpers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("scoreguff_token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
};

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [games, setGames] = React.useState<Game[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useAuth();

  React.useEffect(() => {
    const initializeData = async () => {
      await loadMatches();
      await loadArticles();
      setIsLoading(false);
    };

    initializeData();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await apiRequest("/matches");
      setGames(data.matches);
    } catch (error) {
      console.error("Failed to load matches:", error);
    }
  };

  const loadArticles = async () => {
    try {
      const data = await apiRequest("/articles?status=published&limit=100");
      setArticles(data.articles);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  const addGame = async (gameData: Omit<Game, "id">) => {
    try {
      const data = await apiRequest("/matches", {
        method: "POST",
        body: JSON.stringify(gameData),
      });
      setGames((prev) => [...prev, data.match]);
    } catch (error) {
      console.error("Failed to add game:", error);
      throw error;
    }
  };

  const updateGame = async (id: string, gameData: Partial<Game>) => {
    try {
      const data = await apiRequest(`/matches/${id}`, {
        method: "PUT",
        body: JSON.stringify(gameData),
      });
      setGames((prev) =>
        prev.map((game) => (game.id === id ? data.match : game)),
      );
    } catch (error) {
      console.error("Failed to update game:", error);
      throw error;
    }
  };

  const deleteGame = async (id: string) => {
    try {
      await apiRequest(`/matches/${id}`, {
        method: "DELETE",
      });
      setGames((prev) => prev.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Failed to delete game:", error);
      throw error;
    }
  };

  const addArticle = async (
    articleData: Omit<
      Article,
      | "id"
      | "author"
      | "authorId"
      | "publishedAt"
      | "updatedAt"
      | "views"
      | "likes"
      | "comments"
      | "slug"
    >,
  ) => {
    try {
      const data = await apiRequest("/articles", {
        method: "POST",
        body: JSON.stringify(articleData),
      });
      setArticles((prev) => [data.article, ...prev]);
    } catch (error) {
      console.error("Failed to add article:", error);
      throw error;
    }
  };

  const updateArticle = async (id: string, articleData: Partial<Article>) => {
    try {
      const data = await apiRequest(`/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(articleData),
      });
      setArticles((prev) =>
        prev.map((article) => (article.id === id ? data.article : article)),
      );
    } catch (error) {
      console.error("Failed to update article:", error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await apiRequest(`/articles/${id}`, {
        method: "DELETE",
      });
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Failed to delete article:", error);
      throw error;
    }
  };

  const togglePinArticle = async (id: string) => {
    try {
      const data = await apiRequest(`/articles/${id}/pin`, {
        method: "POST",
      });
      setArticles((prev) =>
        prev.map((article) =>
          article.id === id ? { ...article, isPinned: data.isPinned } : article,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle pin article:", error);
      throw error;
    }
  };

  const toggleTrendingArticle = async (id: string) => {
    try {
      const data = await apiRequest(`/articles/${id}/trending`, {
        method: "POST",
      });
      setArticles((prev) =>
        prev.map((article) =>
          article.id === id
            ? { ...article, isTrending: data.isTrending }
            : article,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle trending article:", error);
      throw error;
    }
  };

  const getUpcomingGames = () =>
    games.filter((game) => game.status === "upcoming");
  const getLiveGames = () => games.filter((game) => game.status === "live");
  const getCompletedGames = () =>
    games.filter((game) => game.status === "completed");

  const refreshData = async () => {
    setIsLoading(true);
    await Promise.all([loadMatches(), loadArticles()]);
    setIsLoading(false);
  };

  const value: AdminContextType = {
    games,
    articles,
    isLoading,
    addGame,
    updateGame,
    deleteGame,
    getUpcomingGames,
    getLiveGames,
    getCompletedGames,
    addArticle,
    updateArticle,
    deleteArticle,
    togglePinArticle,
    toggleTrendingArticle,
    refreshData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
