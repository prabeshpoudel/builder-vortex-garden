import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Newspaper,
  TrendingUp,
  Users,
  BarChart3,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Globe,
  MapPin,
  Clock,
  Zap,
  Calendar,
  Eye,
  MessageCircle,
} from "lucide-react";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const { getUpcomingGames, getLiveGames } = useAdmin();

  const upcomingGames = getUpcomingGames().slice(0, 3);
  const liveGames = getLiveGames().slice(0, 2);

  const newsCategories = [
    {
      icon: "🏏",
      title: "Cricket",
      description: "Nepal national team & international cricket coverage",
      articleCount: 45,
      color: "bg-green-500",
    },
    {
      icon: "⚽",
      title: "Football",
      description: "NPL, SAFF Championship & international football",
      articleCount: 38,
      color: "bg-blue-500",
    },
    {
      icon: "🏆",
      title: "Nepal Sports",
      description: "Local tournaments, athletes & national achievements",
      articleCount: 62,
      color: "bg-red-500",
    },
    {
      icon: "🌍",
      title: "International",
      description: "World Cup, Olympics & global sports events",
      articleCount: 29,
      color: "bg-purple-500",
    },
  ];

  const newsStats = [
    { number: "2.4K+", label: "Daily Readers", icon: "👥" },
    { number: "150+", label: "News Articles", icon: "📰" },
    { number: "25+", label: "Sports Covered", icon: "🏆" },
    { number: "50+", label: "Live Updates Daily", icon: "⚡" },
  ];

  const featuredArticles = [
    {
      title: "Nepal Cricket Team Announces Squad for ACC Premier Cup",
      excerpt:
        "Captain Rohit Paudel leads a 15-member squad featuring exciting new talents alongside experienced campaigners...",
      category: "Cricket",
      readTime: "4 min read",
      publishedAt: "2 hours ago",
      author: "Rajesh Shrestha",
      isBreaking: true,
      isNepal: true,
    },
    {
      title: "Nepal Premier League 2024: All You Need to Know",
      excerpt:
        "Complete preview of Nepal's biggest football tournament featuring 8 teams, new stadiums, and top international players...",
      category: "Football",
      readTime: "6 min read",
      publishedAt: "4 hours ago",
      author: "Priya Gurung",
      isBreaking: false,
      isNepal: true,
    },
    {
      title: "SAFF Championship: Nepal vs India Preview & Analysis",
      excerpt:
        "Head-to-head analysis as Nepal prepares for the crucial encounter against India in the SAFF Championship semi-final...",
      category: "Football",
      readTime: "5 min read",
      publishedAt: "6 hours ago",
      author: "Amit Rai",
      isBreaking: false,
      isNepal: true,
    },
  ];

  const breakingNews = [
    "🔴 BREAKING: Nepal beats UAE by 5 wickets in ACC Premier Cup",
    "⚽ LIVE: Nepal vs Bangladesh in SAFF Championship (1-0)",
    "🏆 NSL: Kathmandu FC wins dramatic penalty shootout final",
  ];

  return (
    <div className="min-h-screen">
      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 animate-scroll">
            {breakingNews.map((news, index) => (
              <span key={index} className="whitespace-nowrap font-medium">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section - Sports News Focus */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-scoreguff-gradient opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-4 border-scoreguff-blue text-scoreguff-blue"
              >
                <Globe className="w-4 h-4 mr-2" />
                Nepal's Premier Sports News Hub
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Sports News for{" "}
                <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                  Nepal
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                From the stadium to your screen - get the latest Nepal cricket,
                football news, live updates & match fixtures. Join 2.4K+ daily
                readers staying updated with Nepali sports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/news">
                  <Button
                    size="lg"
                    className="bg-scoreguff-blue hover:bg-scoreguff-blue/90 text-white px-8 py-6 text-lg"
                  >
                    Read Latest News
                    <Newspaper className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/fixtures">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white px-8 py-6 text-lg"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    View Fixtures
                  </Button>
                </Link>
              </div>
            </div>

            {/* Featured Article Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-scoreguff-gradient rounded-3xl blur-3xl opacity-20" />
              <Card className="relative border-2 border-scoreguff-blue/20 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-scoreguff-blue" />
                    Breaking News
                  </CardTitle>
                  <CardDescription>
                    Latest updates from Nepal sports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-semibold">
                          Nepal Cricket Team Squad Announced
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Cricket • ACC Premier Cup • 2 hours ago
                        </p>
                      </div>
                      <Badge className="bg-red-500 text-white">BREAKING</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-scoreguff-blue/10 rounded-lg border border-scoreguff-blue/20">
                      <div>
                        <h4 className="font-semibold text-scoreguff-blue">
                          15-member squad ready for regional championship
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          By Rajesh Shrestha • 4 min read
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-scoreguff-blue" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* News Platform Stats */}
      <section className="py-20 bg-scoreguff-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Nepal's Most Trusted Sports Platform
            </h2>
            <p className="text-xl text-white/80">
              नेपालको सबैभन्दा भरपर्दो खेलकुद समाचार मञ्च
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {newsStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Sports{" "}
              <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive coverage across all major sports
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsCategories.map((category, index) => (
              <Link key={index} to="/news">
                <Card className="border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      <Badge className={`${category.color} text-white`}>
                        {category.articleCount} articles
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-scoreguff-blue transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Articles</h2>
            <p className="text-xl text-muted-foreground">
              Hand-picked stories from our editorial team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <Badge
                        className={`${article.isNepal ? "bg-red-600" : "bg-scoreguff-blue"} text-white`}
                      >
                        {article.isNepal ? "🇳🇵 Nepal" : "🌍 International"}
                      </Badge>
                      {article.isBreaking && (
                        <Badge className="bg-red-500 text-white animate-pulse">
                          BREAKING
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-scoreguff-blue transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>By {article.author}</span>
                      <span>{article.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>2.1k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news">
              <Button
                size="lg"
                className="bg-scoreguff-blue hover:bg-scoreguff-blue/90"
              >
                Read All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live & Upcoming Matches */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Match{" "}
              <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                Fixtures
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with upcoming matches and live scores
            </p>
          </div>

          {/* Live Games */}
          {liveGames.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-500" />
                🔴 Live Now
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveGames.map((game) => (
                  <Card
                    key={game.id}
                    className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 hover:shadow-lg transition-all"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {game.homeTeam} vs {game.awayTeam}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {game.sport}
                            </Badge>
                            <span>•</span>
                            <span>{game.league}</span>
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-500 animate-pulse">
                          LIVE
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {game.venue}
                        </span>
                        <Link to="/fixtures">
                          <Button size="sm" variant="outline">
                            Follow Match
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Games */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-scoreguff-blue" />
              Upcoming Matches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingGames.map((game) => (
                <Card
                  key={game.id}
                  className="border-2 hover:border-scoreguff-blue/50 transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {game.sport}
                      </Badge>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>{game.matchDate}</div>
                        <div>{game.matchTime}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">
                      {game.homeTeam} vs {game.awayTeam}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {game.league} • {game.venue}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/fixtures">
                      <Button
                        variant="outline"
                        className="w-full border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white"
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/fixtures">
              <Button
                variant="outline"
                size="lg"
                className="border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white"
              >
                View All Fixtures
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-scoreguff-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Nepal's Sports News Revolution
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of sports fans getting the latest news, match
            updates, and exclusive insights from Nepal and around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-scoreguff-blue hover:bg-white/90 px-8 py-6 text-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-scoreguff-blue hover:bg-white/90 px-8 py-6 text-lg"
                >
                  Join ScoreGuff
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/news">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-scoreguff-blue px-8 py-6 text-lg"
              >
                <Newspaper className="mr-2 h-5 w-5" />
                Read News
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
