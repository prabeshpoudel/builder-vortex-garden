import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  role: "user" | "admin";
  avatar?: string;
  location: string;
  joinedDate: string;
  lastLogin: string;
  status: "active" | "inactive" | "banned";
  preferences: {
    favoriteTeams: string[];
    favoriteLeagues: string[];
    notificationSettings: {
      email: boolean;
      push: boolean;
      breakingNews: boolean;
    };
  };
  stats: {
    articlesRead: number;
    commentsPosted: number;
    articlesBookmarked: number;
    categoriesFollowed: string[];
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
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
  seoMetadata: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Match {
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
    status: string; // "HT", "FT", "LIVE", etc.
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

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  parentId?: string; // for replies
  createdAt: string;
  updatedAt: string;
  likes: number;
  isEdited: boolean;
  status: "active" | "hidden" | "deleted";
}

// Create hashed passwords
const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

// Mock database - in production, this would be a real database
export const database = {
  users: [
    {
      id: "user_1",
      email: "admin@scoreguff.com",
      password: hashPassword("admin123"),
      name: "Admin User",
      role: "admin" as const,
      avatar: "/placeholder.svg",
      location: "Kathmandu, Nepal",
      joinedDate: "2023-01-15",
      lastLogin: new Date().toISOString(),
      status: "active" as const,
      preferences: {
        favoriteTeams: [
          "Nepal National Cricket Team",
          "Nepal National Football Team",
        ],
        favoriteLeagues: ["ACC Premier Cup", "SAFF Championship"],
        notificationSettings: {
          email: true,
          push: true,
          breakingNews: true,
        },
      },
      stats: {
        articlesRead: 0,
        commentsPosted: 0,
        articlesBookmarked: 0,
        categoriesFollowed: ["Cricket", "Football"],
      },
    },
    {
      id: "user_2",
      email: "rajesh@example.com",
      password: hashPassword("password123"),
      name: "Rajesh Shrestha",
      role: "user" as const,
      avatar: "/placeholder.svg",
      location: "Kathmandu, Nepal",
      joinedDate: "2023-06-15",
      lastLogin: "2024-01-18T10:30:00Z",
      status: "active" as const,
      preferences: {
        favoriteTeams: ["Nepal National Cricket Team"],
        favoriteLeagues: ["ACC Premier Cup", "IPL"],
        notificationSettings: {
          email: true,
          push: false,
          breakingNews: true,
        },
      },
      stats: {
        articlesRead: 127,
        commentsPosted: 28,
        articlesBookmarked: 45,
        categoriesFollowed: ["Nepal Cricket", "International Cricket"],
      },
    },
    {
      id: "user_3",
      email: "priya@example.com",
      password: hashPassword("password123"),
      name: "Priya Gurung",
      role: "user" as const,
      avatar: "/placeholder.svg",
      location: "Pokhara, Nepal",
      joinedDate: "2023-08-22",
      lastLogin: "2024-01-17T14:20:00Z",
      status: "active" as const,
      preferences: {
        favoriteTeams: ["Nepal National Football Team"],
        favoriteLeagues: ["SAFF Championship", "Premier League"],
        notificationSettings: {
          email: true,
          push: true,
          breakingNews: false,
        },
      },
      stats: {
        articlesRead: 89,
        commentsPosted: 15,
        articlesBookmarked: 23,
        categoriesFollowed: ["Nepal Football", "International Football"],
      },
    },
    {
      id: "user_4",
      email: "amit@example.com",
      password: hashPassword("password123"),
      name: "Amit Rai",
      role: "user" as const,
      avatar: "/placeholder.svg",
      location: "Dharan, Nepal",
      joinedDate: "2023-09-10",
      lastLogin: "2024-01-16T09:15:00Z",
      status: "active" as const,
      preferences: {
        favoriteTeams: [
          "Nepal National Cricket Team",
          "Nepal National Football Team",
        ],
        favoriteLeagues: ["Nepal Premier League", "ACC Premier Cup"],
        notificationSettings: {
          email: false,
          push: true,
          breakingNews: true,
        },
      },
      stats: {
        articlesRead: 156,
        commentsPosted: 42,
        articlesBookmarked: 67,
        categoriesFollowed: ["Nepal Cricket", "Nepal Football", "Olympics"],
      },
    },
  ] as User[],

  articles: [
    {
      id: "article_1",
      title: "Nepal Cricket Team Announces Squad for ACC Premier Cup",
      slug: "nepal-cricket-team-announces-squad-acc-premier-cup",
      excerpt:
        "Captain Rohit Paudel leads a 15-member squad featuring exciting new talents alongside experienced campaigners for the upcoming ACC Premier Cup.",
      content: `
# Nepal Cricket Team Announces Squad for ACC Premier Cup

The Cricket Association of Nepal (CAN) has announced a strong 15-member squad for the upcoming ACC Premier Cup, with captain Rohit Paudel leading the charge.

## Key Squad Highlights

The squad features a perfect blend of youth and experience, with several exciting new faces earning their first call-ups to the national team.

### Batting Lineup
- **Rohit Paudel (Captain)**: The young skipper will look to lead from the front
- **Kushal Bhurtel**: Explosive opener with excellent recent form
- **Aasif Sheikh**: Wicket-keeper batsman with consistent performances

### Bowling Attack
- **Sandeep Lamichhane**: Star spinner and vice-captain
- **Karan KC**: Pace spearhead with international experience
- **Dipendra Singh Airee**: All-rounder providing crucial balance

## Tournament Preparation

The team has been training intensively at the Tribhuvan University Cricket Ground in Kathmandu, focusing on:

1. **Batting against spin** - Crucial for sub-continent conditions
2. **Death bowling scenarios** - Practice for pressure situations
3. **Fielding drills** - Emphasis on sharp catching and ground fielding

## Coach's Perspective

Head coach Monty Desai expressed confidence in the squad: "We have selected players based on current form and their ability to perform under pressure. The blend of youth and experience gives us multiple options for different match situations."

## Tournament Schedule

Nepal will face tough opposition in the ACC Premier Cup:
- **Match 1**: Nepal vs UAE (January 25)
- **Match 2**: Nepal vs Oman (January 27)
- **Match 3**: Nepal vs Hong Kong (January 29)

The top two teams from the group will advance to the final on February 2.

## Fan Expectations

Cricket fans across Nepal are excited about the team's prospects. With recent improvements in infrastructure and player development, expectations are high for a strong showing in the tournament.

The ACC Premier Cup represents an important step in Nepal's cricket journey, providing valuable experience against quality opposition and preparation for future ICC events.
      `,
      category: "Nepal Cricket",
      author: "Rajesh Shrestha",
      authorId: "user_2",
      publishedAt: "2024-01-19T10:00:00Z",
      updatedAt: "2024-01-19T10:00:00Z",
      status: "featured" as const,
      isPinned: true,
      isTrending: true,
      isBreaking: true,
      views: 12547,
      likes: 234,
      comments: 45,
      imageUrl: "/placeholder.svg",
      tags: [
        "Nepal Cricket",
        "ACC Premier Cup",
        "Squad Announcement",
        "Rohit Paudel",
      ],
      isNepal: true,
      readTime: 6,
      seoMetadata: {
        metaTitle: "Nepal Cricket Squad for ACC Premier Cup 2024 | ScoreGuff",
        metaDescription:
          "Complete squad analysis and preview for Nepal cricket team in ACC Premier Cup. Led by Rohit Paudel with key players and tournament schedule.",
        keywords: [
          "Nepal cricket",
          "ACC Premier Cup",
          "Rohit Paudel",
          "squad announcement",
        ],
      },
    },
    {
      id: "article_2",
      title: "Premier League Title Race: Manchester City vs Arsenal Analysis",
      slug: "premier-league-title-race-manchester-city-arsenal-analysis",
      excerpt:
        "Deep dive into the tactical battle between Pep Guardiola and Mikel Arteta as both teams fight for Premier League supremacy.",
      content: `
# Premier League Title Race: Manchester City vs Arsenal Analysis

The Premier League title race has reached a fascinating juncture with Manchester City and Arsenal locked in an intense battle for supremacy.

## Current Standings Analysis

Both teams have shown remarkable consistency throughout the season, with City's experience contrasting beautifully with Arsenal's youthful exuberance.

### Manchester City's Strengths
- **Squad Depth**: Unmatched rotation options
- **Experience**: Multiple title-winning campaigns
- **Tactical Flexibility**: Guardiola's adaptive approach

### Arsenal's Advantages
- **Youth and Hunger**: Fresh legs and determination
- **Home Form**: Exceptional at the Emirates
- **Team Chemistry**: Excellent squad harmony

## Key Factors for Title Success

The remaining fixtures will likely determine the champion, with several crucial factors:

1. **Injury Management**: Keeping key players fit
2. **Squad Rotation**: Managing player fatigue
3. **Big Game Performances**: Results in direct encounters
4. **Mental Strength**: Handling pressure situations

This promises to be one of the most exciting title races in recent Premier League history.
      `,
      category: "International Football",
      author: "Sarah Wilson",
      authorId: "user_1",
      publishedAt: "2024-01-18T14:30:00Z",
      updatedAt: "2024-01-18T14:30:00Z",
      status: "published" as const,
      isPinned: false,
      isTrending: true,
      isBreaking: false,
      views: 8934,
      likes: 156,
      comments: 23,
      imageUrl: "/placeholder.svg",
      tags: ["Premier League", "Manchester City", "Arsenal", "Title Race"],
      isNepal: false,
      readTime: 4,
      seoMetadata: {
        metaTitle: "Premier League Title Race Analysis 2024 | ScoreGuff",
        metaDescription:
          "Complete analysis of the Premier League title race between Manchester City and Arsenal with tactical insights and predictions.",
        keywords: [
          "Premier League",
          "title race",
          "Manchester City",
          "Arsenal",
        ],
      },
    },
    {
      id: "article_3",
      title: "Nepal Premier League 2024: Complete Season Preview",
      slug: "nepal-premier-league-2024-complete-season-preview",
      excerpt:
        "Everything you need to know about the Nepal Premier League 2024 season including team analysis, key players, and championship predictions.",
      content: `
# Nepal Premier League 2024: Complete Season Preview

The Nepal Premier League returns for its most exciting season yet, with eight teams battling for football supremacy in the nation.

## Tournament Format

The 2024 season features:
- **8 Teams** competing in a round-robin format
- **Double round-robin** with home and away fixtures
- **Top 4 teams** qualify for playoffs
- **Final** to be held at Dashrath Stadium

## Team Analysis

### Kathmandu FC
- **Strengths**: Strong midfield, experienced defense
- **Key Player**: Captain Bimal Gharti Magar
- **Prediction**: Championship contenders

### Pokhara Thunder
- **Strengths**: Young attacking talent, pace on wings
- **Key Player**: Striker Anjan Bista
- **Prediction**: Dark horses for top 4

## Key Storylines

1. **New Stadium**: Matches at renovated venues
2. **Foreign Players**: International talent additions
3. **Youth Development**: Focus on local talent

This season promises to be the most competitive yet in Nepal football history.
      `,
      category: "Nepal Football",
      author: "Priya Gurung",
      authorId: "user_3",
      publishedAt: "2024-01-17T16:45:00Z",
      updatedAt: "2024-01-17T16:45:00Z",
      status: "published" as const,
      isPinned: true,
      isTrending: false,
      isBreaking: false,
      views: 6789,
      likes: 98,
      comments: 34,
      imageUrl: "/placeholder.svg",
      tags: ["Nepal Football", "NPL", "Season Preview", "Kathmandu FC"],
      isNepal: true,
      readTime: 8,
      seoMetadata: {
        metaTitle: "Nepal Premier League 2024 Season Preview | ScoreGuff",
        metaDescription:
          "Complete preview of Nepal Premier League 2024 with team analysis, key players, and championship predictions.",
        keywords: [
          "Nepal Premier League",
          "NPL",
          "Nepal football",
          "season preview",
        ],
      },
    },
  ] as Article[],

  matches: [
    {
      id: "match_1",
      homeTeam: "Nepal",
      awayTeam: "UAE",
      homeTeamLogo: "/placeholder.svg",
      awayTeamLogo: "/placeholder.svg",
      league: "ACC Premier Cup",
      sport: "Cricket",
      matchDate: "2024-01-25",
      matchTime: "14:30",
      venue: "TU Cricket Ground, Kathmandu",
      venueCapacity: 5000,
      status: "upcoming" as const,
      weather: {
        temperature: 18,
        condition: "Partly Cloudy",
      },
      officials: {
        referee: "Ravi Sharma",
        assistants: ["Kumar Thapa", "Sanjay Rai"],
      },
      description:
        "Crucial ACC Premier Cup match as Nepal takes on UAE in their opening fixture",
      importance: "high" as const,
      ticketInfo: {
        available: true,
        priceRange: "NPR 100-500",
        url: "https://tickets.scoreguff.com",
      },
      broadcastInfo: {
        tv: ["Nepal Television", "Image Channel"],
        streaming: ["ScoreGuff Live", "YouTube"],
      },
    },
    {
      id: "match_2",
      homeTeam: "Kathmandu FC",
      awayTeam: "Pokhara Thunder",
      homeTeamLogo: "/placeholder.svg",
      awayTeamLogo: "/placeholder.svg",
      league: "Nepal Premier League",
      sport: "Football",
      matchDate: "2024-01-21",
      matchTime: "16:00",
      venue: "Dashrath Stadium, Kathmandu",
      venueCapacity: 25000,
      status: "upcoming" as const,
      weather: {
        temperature: 22,
        condition: "Clear",
      },
      officials: {
        referee: "Subash Ghising",
        assistants: ["Ram Bahadur", "Shyam Karki"],
      },
      description:
        "Derby match in Nepal's premier football league between capital rivals",
      importance: "high" as const,
      ticketInfo: {
        available: true,
        priceRange: "NPR 200-1000",
        url: "https://tickets.scoreguff.com",
      },
      broadcastInfo: {
        tv: ["Nepal Television", "Himalaya TV"],
        streaming: ["ScoreGuff Live"],
      },
    },
    {
      id: "match_3",
      homeTeam: "Manchester City",
      awayTeam: "Arsenal",
      homeTeamLogo: "/placeholder.svg",
      awayTeamLogo: "/placeholder.svg",
      league: "Premier League",
      sport: "Football",
      matchDate: "2024-01-22",
      matchTime: "21:15",
      venue: "Etihad Stadium, Manchester",
      venueCapacity: 53400,
      status: "upcoming" as const,
      weather: {
        temperature: 8,
        condition: "Overcast",
      },
      officials: {
        referee: "Michael Oliver",
        assistants: ["Stuart Burt", "Dan Cook"],
      },
      description:
        "Massive Premier League title clash between the top two teams",
      importance: "high" as const,
      ticketInfo: {
        available: false,
        priceRange: "£50-200",
      },
      broadcastInfo: {
        tv: ["Sky Sports", "NBC Sports"],
        streaming: ["Sky Go", "Peacock"],
      },
    },
    {
      id: "match_4",
      homeTeam: "Nepal U-19",
      awayTeam: "Bangladesh U-19",
      homeTeamLogo: "/placeholder.svg",
      awayTeamLogo: "/placeholder.svg",
      league: "SAFF U-19 Championship",
      sport: "Cricket",
      matchDate: "2024-01-19",
      matchTime: "09:30",
      venue: "Kirtipur Cricket Ground",
      venueCapacity: 3000,
      status: "live" as const,
      score: {
        home: 45,
        away: 0,
        status: "LIVE - 12.3 Overs",
      },
      weather: {
        temperature: 16,
        condition: "Sunny",
      },
      officials: {
        referee: "Pradeep Singh",
        assistants: ["Govinda Sharma"],
      },
      description:
        "Nepal youth team taking on Bangladesh in regional championship",
      importance: "medium" as const,
      ticketInfo: {
        available: true,
        priceRange: "NPR 50-200",
      },
      broadcastInfo: {
        tv: ["Nepal Television"],
        streaming: ["ScoreGuff Live"],
      },
    },
  ] as Match[],

  comments: [
    {
      id: "comment_1",
      articleId: "article_1",
      userId: "user_3",
      userName: "Priya Gurung",
      userAvatar: "/placeholder.svg",
      content:
        "Great to see young talents getting opportunities in the squad! Really excited for Kushal Bhurtel's performance.",
      createdAt: "2024-01-19T12:30:00Z",
      updatedAt: "2024-01-19T12:30:00Z",
      likes: 12,
      isEdited: false,
      status: "active" as const,
    },
    {
      id: "comment_2",
      articleId: "article_1",
      userId: "user_4",
      userName: "Amit Rai",
      userAvatar: "/placeholder.svg",
      content:
        "Sandeep Lamichhane as vice-captain is a great choice. His experience will be crucial in pressure situations.",
      createdAt: "2024-01-19T14:15:00Z",
      updatedAt: "2024-01-19T14:15:00Z",
      likes: 8,
      isEdited: false,
      status: "active" as const,
    },
    {
      id: "comment_3",
      articleId: "article_1",
      userId: "user_2",
      userName: "Rajesh Shrestha",
      userAvatar: "/placeholder.svg",
      content:
        "Hope the team can perform well against UAE. The batting lineup looks strong!",
      createdAt: "2024-01-19T15:45:00Z",
      updatedAt: "2024-01-19T15:45:00Z",
      likes: 15,
      isEdited: false,
      status: "active" as const,
    },
  ] as Comment[],
};

// Helper functions for database operations
export const findUserByEmail = (email: string): User | undefined => {
  return database.users.find((user) => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return database.users.find((user) => user.id === id);
};

export const createUser = (userData: Omit<User, "id">): User => {
  const newUser: User = {
    id: `user_${Date.now()}`,
    ...userData,
  };
  database.users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const userIndex = database.users.findIndex((user) => user.id === id);
  if (userIndex === -1) return null;

  database.users[userIndex] = { ...database.users[userIndex], ...updates };
  return database.users[userIndex];
};

export const getArticles = (filters?: {
  category?: string;
  status?: string;
  isNepal?: boolean;
  limit?: number;
  offset?: number;
}): Article[] => {
  let articles = [...database.articles];

  if (filters?.category) {
    articles = articles.filter(
      (article) => article.category === filters.category,
    );
  }

  if (filters?.status) {
    articles = articles.filter((article) => article.status === filters.status);
  }

  if (filters?.isNepal !== undefined) {
    articles = articles.filter(
      (article) => article.isNepal === filters.isNepal,
    );
  }

  // Sort by publication date (newest first)
  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  if (filters?.offset) {
    articles = articles.slice(filters.offset);
  }

  if (filters?.limit) {
    articles = articles.slice(0, filters.limit);
  }

  return articles;
};

export const getMatches = (filters?: {
  sport?: string;
  status?: string;
  limit?: number;
}): Match[] => {
  let matches = [...database.matches];

  if (filters?.sport) {
    matches = matches.filter((match) => match.sport === filters.sport);
  }

  if (filters?.status) {
    matches = matches.filter((match) => match.status === filters.status);
  }

  // Sort by match date
  matches.sort(
    (a, b) =>
      new Date(a.matchDate + " " + a.matchTime).getTime() -
      new Date(b.matchDate + " " + b.matchTime).getTime(),
  );

  if (filters?.limit) {
    matches = matches.slice(0, filters.limit);
  }

  return matches;
};

export const getCommentsByArticle = (articleId: string): Comment[] => {
  return database.comments.filter(
    (comment) => comment.articleId === articleId && comment.status === "active",
  );
};
