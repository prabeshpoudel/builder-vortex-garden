import { RequestHandler } from "express";
import { z } from "zod";
import {
  getArticles,
  database,
  getCommentsByArticle,
  Article,
} from "../data/database";
import { AuthRequest } from "../middleware/auth";

// Validation schemas
const getArticlesSchema = z.object({
  category: z.string().optional(),
  status: z.enum(["draft", "published", "featured"]).optional(),
  isNepal: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  search: z.string().optional(),
});

const createArticleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  isNepal: z.boolean().default(false),
  status: z.enum(["draft", "published", "featured"]).default("draft"),
  isPinned: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const handleGetArticles: RequestHandler = async (req, res) => {
  try {
    const filters = getArticlesSchema.parse(req.query);

    let articles = getArticles({
      category: filters.category,
      status: filters.status || "published",
      isNepal: filters.isNepal,
      limit: filters.limit || 20,
      offset: filters.offset || 0,
    });

    // Search functionality
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          article.author.toLowerCase().includes(searchTerm),
      );
    }

    // Remove sensitive data for public API
    const publicArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      publishedAt: article.publishedAt,
      status: article.status,
      isPinned: article.isPinned,
      isTrending: article.isTrending,
      isBreaking: article.isBreaking,
      views: article.views,
      likes: article.likes,
      comments: article.comments,
      imageUrl: article.imageUrl,
      tags: article.tags,
      isNepal: article.isNepal,
      readTime: article.readTime,
    }));

    res.json({
      articles: publicArticles,
      total: articles.length,
      hasMore: filters.limit ? articles.length === filters.limit : false,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Get articles error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleGetArticle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const article = database.articles.find((a) => a.id === id || a.slug === id);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    // Increment view count
    article.views += 1;

    // Get comments for the article
    const comments = getCommentsByArticle(article.id);

    res.json({
      article: {
        ...article,
        // Don't expose internal metadata to regular users
        seoMetadata: undefined,
      },
      comments: comments.map((comment) => ({
        id: comment.id,
        userName: comment.userName,
        userAvatar: comment.userAvatar,
        content: comment.content,
        createdAt: comment.createdAt,
        likes: comment.likes,
        isEdited: comment.isEdited,
        parentId: comment.parentId,
      })),
    });
  } catch (error) {
    console.error("Get article error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateArticle: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const articleData = createArticleSchema.parse(req.body);

    // Generate slug from title
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Estimate read time (average 200 words per minute)
    const wordCount = articleData.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const newArticle: Article = {
      id: `article_${Date.now()}`,
      title: articleData.title,
      excerpt: articleData.excerpt,
      content: articleData.content,
      category: articleData.category,
      isNepal: articleData.isNepal,
      status: articleData.status,
      isPinned: articleData.isPinned,
      isTrending: articleData.isTrending,
      tags: articleData.tags,
      slug,
      author: req.user.name,
      authorId: req.user.id,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBreaking: false,
      views: 0,
      likes: 0,
      comments: 0,
      readTime,
      seoMetadata: {
        metaTitle: articleData.title,
        metaDescription: articleData.excerpt,
        keywords: articleData.tags,
      },
    };

    database.articles.unshift(newArticle);

    res.status(201).json({
      message: "Article created successfully",
      article: newArticle,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Create article error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleUpdateArticle: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const { id } = req.params;
    const updates = createArticleSchema.partial().parse(req.body);

    const articleIndex = database.articles.findIndex((a) => a.id === id);
    if (articleIndex === -1) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    const article = database.articles[articleIndex];

    // Check if user can edit this article (admin or author)
    if (req.user.role !== "admin" && article.authorId !== req.user.id) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    // Update article
    database.articles[articleIndex] = {
      ...article,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      message: "Article updated successfully",
      article: database.articles[articleIndex],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Update article error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleDeleteArticle: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const { id } = req.params;
    const articleIndex = database.articles.findIndex((a) => a.id === id);

    if (articleIndex === -1) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    const article = database.articles[articleIndex];

    // Check if user can delete this article (admin or author)
    if (req.user.role !== "admin" && article.authorId !== req.user.id) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    // Remove article
    database.articles.splice(articleIndex, 1);

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Delete article error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetCategories: RequestHandler = async (req, res) => {
  try {
    // Get unique categories from articles
    const categories = [
      ...new Set(database.articles.map((article) => article.category)),
    ];

    // Add article counts for each category
    const categoriesWithCounts = categories.map((category) => ({
      name: category,
      count: database.articles.filter(
        (article) => article.category === category,
      ).length,
      isNepal: database.articles.some(
        (article) => article.category === category && article.isNepal,
      ),
    }));

    res.json({ categories: categoriesWithCounts });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleTogglePinArticle: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { id } = req.params;
    const articleIndex = database.articles.findIndex((a) => a.id === id);

    if (articleIndex === -1) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    database.articles[articleIndex].isPinned =
      !database.articles[articleIndex].isPinned;
    database.articles[articleIndex].updatedAt = new Date().toISOString();

    res.json({
      message: "Article pin status updated",
      isPinned: database.articles[articleIndex].isPinned,
    });
  } catch (error) {
    console.error("Toggle pin article error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleToggleTrendingArticle: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { id } = req.params;
    const articleIndex = database.articles.findIndex((a) => a.id === id);

    if (articleIndex === -1) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    database.articles[articleIndex].isTrending =
      !database.articles[articleIndex].isTrending;
    database.articles[articleIndex].updatedAt = new Date().toISOString();

    res.json({
      message: "Article trending status updated",
      isTrending: database.articles[articleIndex].isTrending,
    });
  } catch (error) {
    console.error("Toggle trending article error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
