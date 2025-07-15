import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";

// Authentication routes
import {
  handleLogin,
  handleRegister,
  handleGetProfile,
  handleUpdateProfile,
  handleLogout,
  handleRefreshToken,
} from "./routes/auth";

// Article routes
import {
  handleGetArticles,
  handleGetArticle,
  handleCreateArticle,
  handleUpdateArticle,
  handleDeleteArticle,
  handleGetCategories,
  handleTogglePinArticle,
  handleToggleTrendingArticle,
} from "./routes/articles";

// Match routes
import {
  handleGetMatches,
  handleGetMatch,
  handleCreateMatch,
  handleUpdateMatch,
  handleDeleteMatch,
  handleGetUpcomingMatches,
  handleGetLiveMatches,
  handleGetMatchesBySport,
  handleGetSports,
  handleGetLeagues,
} from "./routes/matches";

// Admin routes
import {
  handleGetDashboardStats,
  handleGetUsers,
  handleUpdateUserRole,
  handleUpdateUserStatus,
  handleGetArticlesForModeration,
  handleGetCommentsForModeration,
  handleUpdateCommentStatus,
  handleGetSystemHealth,
  handleGetAnalytics,
} from "./routes/admin";

// Middleware
import {
  authenticateToken,
  requireAdmin,
  optionalAuth,
} from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Serve static files from the frontend build
  const frontendPath = path.join(__dirname, "../dist/spa");
  app.use(express.static(frontendPath));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({
      message: "ScoreGuff API v1.0 - Sports News Platform",
      timestamp: new Date().toISOString(),
      status: "healthy",
    });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // ========================================
  // AUTHENTICATION ROUTES
  // ========================================
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/logout", handleLogout);
  app.post("/api/auth/refresh", authenticateToken, handleRefreshToken);
  app.get("/api/auth/profile", authenticateToken, handleGetProfile);
  app.put("/api/auth/profile", authenticateToken, handleUpdateProfile);

  // ========================================
  // ARTICLES ROUTES
  // ========================================
  app.get("/api/articles", optionalAuth, handleGetArticles);
  app.get("/api/articles/categories", handleGetCategories);
  app.get("/api/articles/:id", optionalAuth, handleGetArticle);
  app.post("/api/articles", authenticateToken, handleCreateArticle);
  app.put("/api/articles/:id", authenticateToken, handleUpdateArticle);
  app.delete("/api/articles/:id", authenticateToken, handleDeleteArticle);

  // Admin-only article management
  app.post(
    "/api/articles/:id/pin",
    authenticateToken,
    requireAdmin,
    handleTogglePinArticle,
  );
  app.post(
    "/api/articles/:id/trending",
    authenticateToken,
    requireAdmin,
    handleToggleTrendingArticle,
  );

  // ========================================
  // MATCHES/FIXTURES ROUTES
  // ========================================
  app.get("/api/matches", handleGetMatches);
  app.get("/api/matches/upcoming", handleGetUpcomingMatches);
  app.get("/api/matches/live", handleGetLiveMatches);
  app.get("/api/matches/sports", handleGetSports);
  app.get("/api/matches/leagues", handleGetLeagues);
  app.get("/api/matches/sport/:sport", handleGetMatchesBySport);
  app.get("/api/matches/:id", handleGetMatch);

  // Admin-only match management
  app.post("/api/matches", authenticateToken, requireAdmin, handleCreateMatch);
  app.put(
    "/api/matches/:id",
    authenticateToken,
    requireAdmin,
    handleUpdateMatch,
  );
  app.delete(
    "/api/matches/:id",
    authenticateToken,
    requireAdmin,
    handleDeleteMatch,
  );

  // ========================================
  // ADMIN ROUTES
  // ========================================
  app.get(
    "/api/admin/stats",
    authenticateToken,
    requireAdmin,
    handleGetDashboardStats,
  );
  app.get(
    "/api/admin/analytics",
    authenticateToken,
    requireAdmin,
    handleGetAnalytics,
  );
  app.get(
    "/api/admin/health",
    authenticateToken,
    requireAdmin,
    handleGetSystemHealth,
  );

  // User management
  app.get("/api/admin/users", authenticateToken, requireAdmin, handleGetUsers);
  app.put(
    "/api/admin/users/:userId/role",
    authenticateToken,
    requireAdmin,
    handleUpdateUserRole,
  );
  app.put(
    "/api/admin/users/:userId/status",
    authenticateToken,
    requireAdmin,
    handleUpdateUserStatus,
  );

  // Content moderation
  app.get(
    "/api/admin/articles",
    authenticateToken,
    requireAdmin,
    handleGetArticlesForModeration,
  );
  app.get(
    "/api/admin/comments",
    authenticateToken,
    requireAdmin,
    handleGetCommentsForModeration,
  );
  app.put(
    "/api/admin/comments/:commentId/status",
    authenticateToken,
    requireAdmin,
    handleUpdateCommentStatus,
  );

  // Error handling middleware
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error("Server error:", err);
      res.status(500).json({
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Something went wrong",
      });
    },
  );

  // SPA fallback - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    // Only serve index.html for non-API routes
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      // API route not found
      res.status(404).json({
        error: "Route not found",
        path: req.path,
        method: req.method,
      });
    }
  });

  return app;
}
