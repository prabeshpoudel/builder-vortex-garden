import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  findUserByEmail,
  createUser,
  updateUser,
  User,
} from "../data/database";
import { generateToken, AuthRequest } from "../middleware/auth";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().optional().default("Nepal"),
});

// Helper function to sanitize user data for client
const sanitizeUser = (user: User) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  avatar: user.avatar,
  location: user.location,
  joinedDate: user.joinedDate,
  lastLogin: user.lastLogin,
  status: user.status,
  preferences: user.preferences,
  stats: user.stats,
});

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Check if account is active
    if (user.status !== "active") {
      res.status(401).json({ error: "Account is not active" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Update last login
    updateUser(user.id, { lastLogin: new Date().toISOString() });

    // Generate JWT token
    const token = generateToken(user.id);

    res.json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { email, password, name, location } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = createUser({
      email,
      password: hashedPassword,
      name,
      role: "user",
      location,
      joinedDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString(),
      status: "active",
      preferences: {
        favoriteTeams: [],
        favoriteLeagues: [],
        notificationSettings: {
          email: true,
          push: false,
          breakingNews: true,
        },
      },
      stats: {
        articlesRead: 0,
        commentsPosted: 0,
        articlesBookmarked: 0,
        categoriesFollowed: [],
      },
    });

    // Generate JWT token
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleGetProfile: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const user = findUserByEmail(req.user.email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateProfile: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const updateSchema = z.object({
      name: z.string().min(2).optional(),
      location: z.string().optional(),
      avatar: z.string().url().optional(),
      preferences: z
        .object({
          favoriteTeams: z.array(z.string()).optional(),
          favoriteLeagues: z.array(z.string()).optional(),
          notificationSettings: z
            .object({
              email: z.boolean().optional(),
              push: z.boolean().optional(),
              breakingNews: z.boolean().optional(),
            })
            .optional(),
        })
        .optional(),
    });

    const updates = updateSchema.parse(req.body);
    const updatedUser = updateUser(req.user.id, updates);

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      message: "Profile updated successfully",
      user: sanitizeUser(updatedUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const handleLogout: RequestHandler = async (req, res) => {
  // With JWT, logout is handled client-side by removing the token
  // In a more sophisticated setup, you might maintain a blacklist of tokens
  res.json({ message: "Logout successful" });
};

export const handleRefreshToken: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Generate new token
    const token = generateToken(req.user.id);

    res.json({
      message: "Token refreshed successfully",
      token,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
