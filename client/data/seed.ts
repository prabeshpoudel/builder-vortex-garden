import { Match, NewsArticle, PredictionMatch, User } from "@/types/scoreguff";

const now = new Date();
const plusHours = (hours: number) => new Date(now.getTime() + hours * 3600000).toISOString();

export const seedUsers: User[] = [
  { id: "u-admin", name: "ScoreGuff Admin", email: "admin@scoreguff.com", password: "admin123", role: "admin" },
  { id: "u-1", name: "Alex Turner", email: "alex@scoreguff.com", password: "user123", role: "user" },
];

export const seedMatches: Match[] = [
  {
    id: "m1",
    leagueName: "Premier League",
    leagueLogo: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=120&h=120&fit=crop",
    matchType: "League",
    matchNumber: "GW 31",
    team1Name: "Arsenal",
    team1Logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&h=120&fit=crop",
    team2Name: "Liverpool",
    team2Logo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=120&h=120&fit=crop",
    matchDateTime: plusHours(10),
    status: "upcoming",
  },
  {
    id: "m2",
    leagueName: "NBA",
    leagueLogo: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=120&h=120&fit=crop",
    matchType: "Playoffs",
    matchNumber: "Game 4",
    team1Name: "Lakers",
    team1Logo: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=120&h=120&fit=crop",
    team2Name: "Celtics",
    team2Logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=120&h=120&fit=crop",
    matchDateTime: plusHours(28),
    status: "upcoming",
  },
  {
    id: "m3",
    leagueName: "La Liga",
    leagueLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=120&h=120&fit=crop",
    matchType: "League",
    matchNumber: "GW 32",
    team1Name: "Barcelona",
    team1Logo: "https://images.unsplash.com/photo-1499778419507-886f460fb1af?w=120&h=120&fit=crop",
    team2Name: "Real Madrid",
    team2Logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&h=120&fit=crop",
    matchDateTime: plusHours(-3),
    status: "completed",
    result: "Barcelona 2 - 1 Real Madrid",
  },
  {
    id: "m4",
    leagueName: "Champions League",
    leagueLogo: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=120&h=120&fit=crop",
    matchType: "Semi Final",
    matchNumber: "Leg 1",
    team1Name: "PSG",
    team1Logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=120&h=120&fit=crop",
    team2Name: "Bayern",
    team2Logo: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=120&h=120&fit=crop",
    matchDateTime: plusHours(2),
    status: "live",
  },
];

export const seedPredictionMatches: PredictionMatch[] = [
  {
    id: "p1",
    matchId: "m1",
    enabled: true,
    leagueName: "Premier League",
    leagueLogo: seedMatches[0].leagueLogo,
    team1Name: "Arsenal",
    team1Logo: seedMatches[0].team1Logo,
    team2Name: "Liverpool",
    team2Logo: seedMatches[0].team2Logo,
    matchDateTime: seedMatches[0].matchDateTime,
    deadline: plusHours(8),
    status: "open",
    options: ["Arsenal Win", "Liverpool Win", "Draw"],
  },
];

export const seedNews: NewsArticle[] = [
  {
    id: "n1",
    title: "Derby Weekend: Top 5 Matchups to Watch",
    category: "Football",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=700&fit=crop",
    shortDescription: "From title races to survival battles, this weekend is packed with high-stakes games.",
    content: "This weekend promises elite football drama across Europe. Clubs at both ends of the table face must-win scenarios, making tactical adjustments and squad depth crucial. ScoreGuff analysts expect narrow margins and late-game momentum shifts in multiple fixtures.",
    date: now.toISOString(),
    author: "Jade Morgan",
  },
  {
    id: "n2",
    title: "Playoff Pressure: Stars Who Must Deliver Tonight",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200&h=700&fit=crop",
    shortDescription: "Three marquee players face defining moments in their playoff campaigns.",
    content: "Momentum in playoff basketball changes possession by possession. Analysts are watching shot selection, transition defense, and clutch-time execution as key indicators of which stars will separate themselves.",
    date: new Date(now.getTime() - 86400000).toISOString(),
    author: "Miles Carter",
  },
  {
    id: "n3",
    title: "Inside the Data: Why Prediction Accuracy Is Improving",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop",
    shortDescription: "Modern form indicators and matchup context are making fan predictions smarter.",
    content: "Community predictors on ScoreGuff are getting sharper by combining form trends with matchup-specific context. Lineup uncertainty and in-game injuries remain the biggest disruptors, but prediction confidence has improved significantly over recent weeks.",
    date: new Date(now.getTime() - 172800000).toISOString(),
    author: "Nina Park",
  },
];
