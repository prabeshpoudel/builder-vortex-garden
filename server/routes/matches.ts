import { RequestHandler } from "express";
import { z } from "zod";
import { getMatches, database, Match } from "../data/database";
import { AuthRequest } from "../middleware/auth";

// Validation schemas
const getMatchesSchema = z.object({
  sport: z.string().optional(),
  status: z
    .enum(["upcoming", "live", "completed", "postponed", "cancelled"])
    .optional(),
  league: z.string().optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

const createMatchSchema = z.object({
  homeTeam: z.string().min(1, "Home team is required"),
  awayTeam: z.string().min(1, "Away team is required"),
  league: z.string().min(1, "League is required"),
  sport: z.string().min(1, "Sport is required"),
  matchDate: z.string().min(1, "Match date is required"),
  matchTime: z.string().min(1, "Match time is required"),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().default(""),
  importance: z.enum(["low", "medium", "high"]).default("medium"),
  venueCapacity: z.number().optional(),
  weather: z
    .object({
      temperature: z.number().optional(),
      condition: z.string().optional(),
    })
    .optional(),
  officials: z
    .object({
      referee: z.string().optional(),
      assistants: z.array(z.string()).optional(),
    })
    .optional(),
  ticketInfo: z
    .object({
      available: z.boolean().default(false),
      priceRange: z.string().optional(),
      url: z.string().url().optional(),
    })
    .optional(),
  broadcastInfo: z
    .object({
      tv: z.array(z.string()).default([]),
      streaming: z.array(z.string()).default([]),
    })
    .optional(),
});

export const handleGetMatches: RequestHandler = async (req, res) => {
  try {
    const filters = getMatchesSchema.parse(req.query);

    let matches = getMatches({
      sport: filters.sport,
      status: filters.status,
      limit: filters.limit || 50,
    });

    // Apply league filter if specified
    if (filters.league) {
      matches = matches.filter((match) =>
        match.league.toLowerCase().includes(filters.league!.toLowerCase()),
      );
    }

    // Apply offset if specified
    if (filters.offset) {
      matches = matches.slice(filters.offset);
    }

    res.json({
      matches,
      total: matches.length,
      hasMore: filters.limit ? matches.length === filters.limit : false,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Get matches error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleGetMatch: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const match = database.matches.find((m) => m.id === id);

    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    res.json({ match });
  } catch (error) {
    console.error("Get match error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateMatch: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const matchData = createMatchSchema.parse(req.body);

    const newMatch = {
      id: `match_${Date.now()}`,
      homeTeam: matchData.homeTeam,
      awayTeam: matchData.awayTeam,
      league: matchData.league,
      sport: matchData.sport,
      matchDate: matchData.matchDate,
      matchTime: matchData.matchTime,
      venue: matchData.venue,
      description: matchData.description,
      importance: matchData.importance,
      status: "upcoming" as const,
      homeTeamLogo: "/placeholder.svg",
      awayTeamLogo: "/placeholder.svg",
    };

    database.matches.push(newMatch);

    res.status(201).json({
      message: "Match created successfully",
      match: newMatch,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Create match error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleUpdateMatch: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { id } = req.params;
    const updateSchema = createMatchSchema.partial().extend({
      status: z
        .enum(["upcoming", "live", "completed", "postponed", "cancelled"])
        .optional(),
      score: z
        .object({
          home: z.number(),
          away: z.number(),
          status: z.string(),
        })
        .optional(),
    });

    const updates = updateSchema.parse(req.body);

    const matchIndex = database.matches.findIndex((m) => m.id === id);
    if (matchIndex === -1) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    const currentMatch = database.matches[matchIndex];
    database.matches[matchIndex] = {
      ...currentMatch,
      ...updates,
    };

    res.json({
      message: "Match updated successfully",
      match: database.matches[matchIndex],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Update match error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleDeleteMatch: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { id } = req.params;
    const matchIndex = database.matches.findIndex((m) => m.id === id);

    if (matchIndex === -1) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    database.matches.splice(matchIndex, 1);

    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Delete match error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetUpcomingMatches: RequestHandler = async (req, res) => {
  try {
    const matches = getMatches({ status: "upcoming", limit: 10 });
    res.json({ matches });
  } catch (error) {
    console.error("Get upcoming matches error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetLiveMatches: RequestHandler = async (req, res) => {
  try {
    const matches = getMatches({ status: "live" });
    res.json({ matches });
  } catch (error) {
    console.error("Get live matches error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetMatchesBySport: RequestHandler = async (req, res) => {
  try {
    const { sport } = req.params;
    const matches = getMatches({ sport, limit: 20 });
    res.json({ matches });
  } catch (error) {
    console.error("Get matches by sport error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetSports: RequestHandler = async (req, res) => {
  try {
    // Get unique sports from matches
    const sports = [...new Set(database.matches.map((match) => match.sport))];

    // Add match counts for each sport
    const sportsWithCounts = sports.map((sport) => ({
      name: sport,
      upcomingMatches: database.matches.filter(
        (match) => match.sport === sport && match.status === "upcoming",
      ).length,
      liveMatches: database.matches.filter(
        (match) => match.sport === sport && match.status === "live",
      ).length,
      totalMatches: database.matches.filter((match) => match.sport === sport)
        .length,
    }));

    res.json({ sports: sportsWithCounts });
  } catch (error) {
    console.error("Get sports error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetLeagues: RequestHandler = async (req, res) => {
  try {
    // Get unique leagues from matches
    const leagues = [...new Set(database.matches.map((match) => match.league))];

    // Add match counts for each league
    const leaguesWithCounts = leagues.map((league) => ({
      name: league,
      sport: database.matches.find((match) => match.league === league)?.sport,
      upcomingMatches: database.matches.filter(
        (match) => match.league === league && match.status === "upcoming",
      ).length,
      liveMatches: database.matches.filter(
        (match) => match.league === league && match.status === "live",
      ).length,
      totalMatches: database.matches.filter((match) => match.league === league)
        .length,
    }));

    res.json({ leagues: leaguesWithCounts });
  } catch (error) {
    console.error("Get leagues error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
