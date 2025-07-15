import React, { createContext, useContext, useState, useEffect } from "react";

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  sport: string;
  matchDate: string;
  matchTime: string;
  status: "upcoming" | "live" | "completed";
  odds?: {
    homeWin: number;
    awayWin: number;
    draw?: number;
    overUnder?: number;
  };
  predictions?: {
    id: string;
    type: string;
    confidence: number;
    recommendation: string;
  }[];
  venue?: string;
  description?: string;
}

interface AdminContextType {
  games: Game[];
  isAdmin: boolean;
  addGame: (game: Omit<Game, "id">) => void;
  updateGame: (id: string, game: Partial<Game>) => void;
  deleteGame: (id: string) => void;
  getUpcomingGames: () => Game[];
  getLiveGames: () => Game[];
  getCompletedGames: () => Game[];
  setIsAdmin: (isAdmin: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load games from localStorage
    const storedGames = localStorage.getItem("scoreguff_games");
    const storedAdminStatus = localStorage.getItem("scoreguff_admin");

    if (storedGames) {
      try {
        setGames(JSON.parse(storedGames));
      } catch (error) {
        console.error("Error loading games:", error);
        initializeDefaultGames();
      }
    } else {
      initializeDefaultGames();
    }

    if (storedAdminStatus) {
      setIsAdmin(JSON.parse(storedAdminStatus));
    }
  }, []);

  const initializeDefaultGames = () => {
    const defaultGames: Game[] = [
      {
        id: "1",
        homeTeam: "Manchester City",
        awayTeam: "Liverpool",
        league: "Premier League",
        sport: "Soccer",
        matchDate: "2024-01-20",
        matchTime: "15:30",
        status: "upcoming",
        odds: {
          homeWin: 2.1,
          awayWin: 3.2,
          draw: 3.8,
          overUnder: 2.5,
        },
        predictions: [
          {
            id: "p1",
            type: "Over 2.5 Goals",
            confidence: 92,
            recommendation: "Strong Buy",
          },
          {
            id: "p2",
            type: "Both Teams to Score",
            confidence: 88,
            recommendation: "Buy",
          },
        ],
        venue: "Etihad Stadium",
        description: "Top of the table clash between title contenders",
      },
      {
        id: "2",
        homeTeam: "Lakers",
        awayTeam: "Warriors",
        league: "NBA",
        sport: "Basketball",
        matchDate: "2024-01-21",
        matchTime: "20:00",
        status: "upcoming",
        odds: {
          homeWin: 1.85,
          awayWin: 1.95,
        },
        predictions: [
          {
            id: "p3",
            type: "Lakers +2.5",
            confidence: 78,
            recommendation: "Buy",
          },
          {
            id: "p4",
            type: "Over 225.5 Points",
            confidence: 85,
            recommendation: "Strong Buy",
          },
        ],
        venue: "Crypto.com Arena",
        description: "Western Conference rivalry matchup",
      },
      {
        id: "3",
        homeTeam: "Chiefs",
        awayTeam: "Bills",
        league: "NFL",
        sport: "Football",
        matchDate: "2024-01-22",
        matchTime: "18:00",
        status: "upcoming",
        odds: {
          homeWin: 1.9,
          awayWin: 1.9,
          overUnder: 47.5,
        },
        predictions: [
          {
            id: "p5",
            type: "Under 47.5 Points",
            confidence: 73,
            recommendation: "Buy",
          },
        ],
        venue: "Arrowhead Stadium",
        description: "AFC Championship game rematch",
      },
      {
        id: "4",
        homeTeam: "Barcelona",
        awayTeam: "Real Madrid",
        league: "La Liga",
        sport: "Soccer",
        matchDate: "2024-01-19",
        matchTime: "21:00",
        status: "live",
        odds: {
          homeWin: 2.3,
          awayWin: 2.8,
          draw: 3.4,
        },
        predictions: [
          {
            id: "p6",
            type: "El Clasico Over 2.5",
            confidence: 95,
            recommendation: "Strong Buy",
          },
        ],
        venue: "Camp Nou",
        description: "El Clasico - the biggest match in football",
      },
    ];
    setGames(defaultGames);
    localStorage.setItem("scoreguff_games", JSON.stringify(defaultGames));
  };

  const saveGames = (updatedGames: Game[]) => {
    setGames(updatedGames);
    localStorage.setItem("scoreguff_games", JSON.stringify(updatedGames));
  };

  const addGame = (gameData: Omit<Game, "id">) => {
    const newGame: Game = {
      ...gameData,
      id: Date.now().toString(),
    };
    const updatedGames = [...games, newGame];
    saveGames(updatedGames);
  };

  const updateGame = (id: string, gameData: Partial<Game>) => {
    const updatedGames = games.map((game) =>
      game.id === id ? { ...game, ...gameData } : game,
    );
    saveGames(updatedGames);
  };

  const deleteGame = (id: string) => {
    const updatedGames = games.filter((game) => game.id !== id);
    saveGames(updatedGames);
  };

  const getUpcomingGames = () =>
    games.filter((game) => game.status === "upcoming");
  const getLiveGames = () => games.filter((game) => game.status === "live");
  const getCompletedGames = () =>
    games.filter((game) => game.status === "completed");

  const handleSetIsAdmin = (adminStatus: boolean) => {
    setIsAdmin(adminStatus);
    localStorage.setItem("scoreguff_admin", JSON.stringify(adminStatus));
  };

  const value: AdminContextType = {
    games,
    isAdmin,
    addGame,
    updateGame,
    deleteGame,
    getUpcomingGames,
    getLiveGames,
    getCompletedGames,
    setIsAdmin: handleSetIsAdmin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
