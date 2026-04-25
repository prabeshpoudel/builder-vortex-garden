export type MatchStatus = "upcoming" | "live" | "completed";
export type PredictionStatus = "open" | "closed" | "completed";
export type UserRole = "user" | "admin";

export interface Match {
  id: string;
  leagueName: string;
  leagueLogo: string;
  matchType: string;
  matchNumber: string;
  team1Name: string;
  team1Logo: string;
  team2Name: string;
  team2Logo: string;
  matchDateTime: string;
  status: MatchStatus;
  result?: string;
}

export interface PredictionMatch {
  id: string;
  matchId: string;
  enabled: boolean;
  leagueName: string;
  leagueLogo: string;
  team1Name: string;
  team1Logo: string;
  team2Name: string;
  team2Logo: string;
  matchDateTime: string;
  deadline: string;
  status: PredictionStatus;
  options: string[];
  correctResult?: string;
}

export interface UserPrediction {
  id: string;
  predictionMatchId: string;
  matchId: string;
  userId: string;
  userName: string;
  selectedOption: string;
  submittedAt: string;
  isCorrect?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  content: string;
  date: string;
  author: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
