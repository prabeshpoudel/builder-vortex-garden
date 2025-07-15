import * as React from "react";

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

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [games, setGames] = React.useState<Game[]>([]);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
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
        homeTeam: "Nepal",
        awayTeam: "UAE",
        league: "ACC Premier Cup",
        sport: "Cricket",
        matchDate: "2024-01-20",
        matchTime: "14:30",
        status: "upcoming",
        odds: {
          homeWin: 2.1,
          awayWin: 1.8,
        },
        predictions: [
          {
            id: "p1",
            type: "Nepal to Win",
            confidence: 95,
            recommendation: "Strong Buy",
          },
          {
            id: "p2",
            type: "Over 280 Runs",
            confidence: 88,
            recommendation: "Buy",
          },
        ],
        venue: "TU Cricket Ground, Kathmandu",
        description: "Nepal's crucial match in ACC Premier Cup campaign",
      },
      {
        id: "2",
        homeTeam: "Kathmandu Raiders",
        awayTeam: "Pokhara Thunders",
        league: "Nepal Premier League",
        sport: "Football",
        matchDate: "2024-01-21",
        matchTime: "16:00",
        status: "upcoming",
        odds: {
          homeWin: 1.85,
          awayWin: 1.95,
          draw: 3.2,
        },
        predictions: [
          {
            id: "p3",
            type: "Both Teams to Score",
            confidence: 78,
            recommendation: "Buy",
          },
          {
            id: "p4",
            type: "Over 2.5 Goals",
            confidence: 85,
            recommendation: "Strong Buy",
          },
        ],
        venue: "Dashrath Stadium, Kathmandu",
        description: "Derby match in Nepal's premier football league",
      },
      {
        id: "3",
        homeTeam: "Manchester City",
        awayTeam: "Liverpool",
        league: "Premier League",
        sport: "Football",
        matchDate: "2024-01-22",
        matchTime: "21:15",
        status: "upcoming",
        odds: {
          homeWin: 2.1,
          awayWin: 3.2,
          draw: 3.8,
        },
        predictions: [
          {
            id: "p5",
            type: "Over 2.5 Goals",
            confidence: 73,
            recommendation: "Buy",
          },
        ],
        venue: "Etihad Stadium",
        description: "Top of the table clash in Premier League",
      },
      {
        id: "4",
        homeTeam: "Nepal U-19",
        awayTeam: "Bangladesh U-19",
        league: "SAFF U-19 Championship",
        sport: "Cricket",
        matchDate: "2024-01-19",
        matchTime: "09:30",
        status: "live",
        odds: {
          homeWin: 1.9,
          awayWin: 1.9,
        },
        predictions: [
          {
            id: "p6",
            type: "Nepal U-19 to Win",
            confidence: 82,
            recommendation: "Buy",
          },
        ],
        venue: "Kirtipur Cricket Ground",
        description: "Nepal youth team in regional championship",
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
