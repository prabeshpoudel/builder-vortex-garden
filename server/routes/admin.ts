import { RequestHandler } from "express";
import { z } from "zod";
import { database, updateUser } from "../data/database";
import { AuthRequest } from "../middleware/auth";

// Admin dashboard stats
export const handleGetDashboardStats: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const stats = {
      articles: {
        total: database.articles.length,
        published: database.articles.filter((a) => a.status === "published")
          .length,
        featured: database.articles.filter((a) => a.status === "featured")
          .length,
        draft: database.articles.filter((a) => a.status === "draft").length,
        trending: database.articles.filter((a) => a.isTrending).length,
        pinned: database.articles.filter((a) => a.isPinned).length,
      },
      matches: {
        total: database.matches.length,
        upcoming: database.matches.filter((m) => m.status === "upcoming")
          .length,
        live: database.matches.filter((m) => m.status === "live").length,
        completed: database.matches.filter((m) => m.status === "completed")
          .length,
      },
      users: {
        total: database.users.length,
        active: database.users.filter((u) => u.status === "active").length,
        admins: database.users.filter((u) => u.role === "admin").length,
        banned: database.users.filter((u) => u.status === "banned").length,
      },
      engagement: {
        totalViews: database.articles.reduce((sum, a) => sum + a.views, 0),
        totalComments: database.comments.filter((c) => c.status === "active")
          .length,
        totalLikes: database.articles.reduce((sum, a) => sum + a.likes, 0),
      },
    };

    res.json({ stats });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User management
export const handleGetUsers: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const users = database.users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      location: user.location,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      status: user.status,
      stats: user.stats,
    }));

    res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateUserRole: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { userId } = req.params;
    const { role } = z
      .object({
        role: z.enum(["user", "admin"]),
      })
      .parse(req.body);

    // Prevent admin from changing their own role
    if (userId === req.user.id) {
      res.status(400).json({ error: "Cannot change your own role" });
      return;
    }

    const updatedUser = updateUser(userId, { role });
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      message: "User role updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Update user role error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleUpdateUserStatus: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { userId } = req.params;
    const { status } = z
      .object({
        status: z.enum(["active", "inactive", "banned"]),
      })
      .parse(req.body);

    // Prevent admin from changing their own status
    if (userId === req.user.id) {
      res.status(400).json({ error: "Cannot change your own status" });
      return;
    }

    const updatedUser = updateUser(userId, { status });
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      message: "User status updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        status: updatedUser.status,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Update user status error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Content moderation
export const handleGetArticlesForModeration: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    // Return all articles with full details for admin
    const articles = database.articles.map((article) => ({
      ...article,
      // Include author details for moderation
      authorInfo: {
        id: article.authorId,
        name: article.author,
      },
    }));

    res.json({ articles });
  } catch (error) {
    console.error("Get articles for moderation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetCommentsForModeration: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const comments = database.comments.map((comment) => ({
      ...comment,
      articleTitle: database.articles.find((a) => a.id === comment.articleId)
        ?.title,
    }));

    res.json({ comments });
  } catch (error) {
    console.error("Get comments for moderation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateCommentStatus: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { commentId } = req.params;
    const { status } = z
      .object({
        status: z.enum(["active", "hidden", "deleted"]),
      })
      .parse(req.body);

    const commentIndex = database.comments.findIndex((c) => c.id === commentId);
    if (commentIndex === -1) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    database.comments[commentIndex].status = status;
    database.comments[commentIndex].updatedAt = new Date().toISOString();

    res.json({
      message: "Comment status updated successfully",
      comment: database.comments[commentIndex],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Update comment status error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// System settings and configuration
export const handleGetSystemHealth: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: {
        status: "connected",
        articlesCount: database.articles.length,
        usersCount: database.users.length,
        matchesCount: database.matches.length,
        commentsCount: database.comments.length,
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
      },
    };

    res.json({ health });
  } catch (error) {
    console.error("Get system health error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Analytics and reporting
export const handleGetAnalytics: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const analytics = {
      articleStats: {
        mostViewed: database.articles
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
          .map((a) => ({ id: a.id, title: a.title, views: a.views })),
        mostLiked: database.articles
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 5)
          .map((a) => ({ id: a.id, title: a.title, likes: a.likes })),
        categoryCounts: database.articles.reduce(
          (acc, article) => {
            acc[article.category] = (acc[article.category] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      },
      userStats: {
        registrationTrend: database.users.reduce(
          (acc, user) => {
            const month = user.joinedDate.substring(0, 7); // YYYY-MM
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
        activeUsers: database.users.filter((u) => u.status === "active").length,
        topContributors: database.users
          .filter((u) => u.stats.commentsPosted > 0)
          .sort((a, b) => b.stats.commentsPosted - a.stats.commentsPosted)
          .slice(0, 5)
          .map((u) => ({
            id: u.id,
            name: u.name,
            comments: u.stats.commentsPosted,
          })),
      },
      matchStats: {
        sportDistribution: database.matches.reduce(
          (acc, match) => {
            acc[match.sport] = (acc[match.sport] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
        statusDistribution: database.matches.reduce(
          (acc, match) => {
            acc[match.status] = (acc[match.status] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      },
    };

    res.json({ analytics });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
