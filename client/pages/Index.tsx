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
  Target,
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
} from "lucide-react";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const { getUpcomingGames, getLiveGames } = useAdmin();

  const upcomingGames = getUpcomingGames().slice(0, 3);
  const liveGames = getLiveGames().slice(0, 2);

  const features = [
    {
      icon: Target,
      title: "AI-Powered Predictions",
      description:
        "Advanced algorithms analyze cricket, football, and international sports data for Nepal's most accurate predictions.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Nepal Sports",
      description:
        "Track Nepal national team, domestic leagues, and international tournaments as they happen.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Monitor your prediction accuracy with detailed statistics and ROI tracking in NPR.",
    },
    {
      icon: Users,
      title: "Nepal Sports Community",
      description:
        "Join thousands of Nepali sports fans sharing insights on cricket, football, and global sports.",
    },
  ];

  const nepalStats = [
    { number: "92.1%", label: "Cricket Accuracy", icon: "🏏" },
    { number: "8.5K+", label: "Nepal Users", icon: "🇳🇵" },
    { number: "NPR 2.4M", label: "Total Winnings", icon: "💰" },
    { number: "15+", label: "Sports Covered", icon: "🏆" },
  ];

  const featuredNews = [
    {
      title: "Nepal Cricket Team Prepares for ACC Premier Cup",
      excerpt:
        "National team training intensifies as they gear up for the regional championship...",
      category: "Cricket",
      readTime: "3 min",
      isNepal: true,
    },
    {
      title: "Premier League: ManU vs Liverpool Prediction Analysis",
      excerpt:
        "AI models show 89% confidence in over 2.5 goals for this weekend's clash...",
      category: "Football",
      readTime: "4 min",
      isNepal: false,
    },
    {
      title: "Nepal Premier League Season Preview",
      excerpt:
        "Complete analysis of all teams and key players to watch this season...",
      category: "Football",
      readTime: "6 min",
      isNepal: true,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Shrestha",
      role: "Cricket Fan, Kathmandu",
      content:
        "ScoreGuff's cricket predictions helped me win big during the World Cup!",
      rating: 5,
    },
    {
      name: "Priya Gurung",
      role: "Football Analyst, Pokhara",
      content:
        "Best platform for both Nepal and international sports. Very accurate!",
      rating: 5,
    },
    {
      name: "Amit Rai",
      role: "Sports Bettor, Dharan",
      content:
        "Finally, a prediction site that understands Nepali sports culture.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Nepal Focus */}
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
                Nepal's #1 Sports Prediction Platform
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Sports Predictions for{" "}
                <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                  Nepal
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                From Nepal cricket to Premier League football - get AI-powered
                predictions with 92%+ accuracy. Join 8,500+ Nepali sports fans
                winning together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="bg-scoreguff-blue hover:bg-scoreguff-blue/90 text-white px-8 py-6 text-lg"
                    >
                      जाउ डेशबोर्डमा (Go to Dashboard)
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-scoreguff-blue hover:bg-scoreguff-blue/90 text-white px-8 py-6 text-lg"
                    >
                      सुरु गर्नुहोस् (Start Winning)
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white px-8 py-6 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Live Game Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-scoreguff-gradient rounded-3xl blur-3xl opacity-20" />
              <Card className="relative border-2 border-scoreguff-blue/20 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-scoreguff-green" />
                    Live Prediction
                  </CardTitle>
                  <CardDescription>
                    Real-time AI analysis for today's matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-semibold">Nepal vs UAE</h4>
                        <p className="text-sm text-muted-foreground">
                          Cricket • ACC Premier Cup • Today 2:30 PM
                        </p>
                      </div>
                      <Badge className="bg-scoreguff-green">
                        95% confidence
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-scoreguff-blue/10 rounded-lg border border-scoreguff-blue/20">
                      <div>
                        <h4 className="font-semibold text-scoreguff-blue">
                          Prediction: Nepal to Win
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Odds: 2.10 • Potential: NPR 2,100
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-scoreguff-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Nepal-Focused Stats */}
      <section className="py-20 bg-scoreguff-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Nepal's Sports Community
            </h2>
            <p className="text-xl text-white/80">
              नेपालका हजारौं खेलकुद प्रेमीहरुको भरोसाको साथी
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {nepalStats.map((stat, index) => (
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

      {/* Live & Upcoming Games */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Today's{" "}
              <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                Featured Matches
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Live games and upcoming predictions available now
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
                      <Link to="/predictions">
                        <Button className="w-full bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                          View Live Predictions
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Games */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-scoreguff-blue" />
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
                      {game.league}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {game.odds && (
                      <div className="bg-muted/50 rounded p-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Home: {game.odds.homeWin}</span>
                          <span>Away: {game.odds.awayWin}</span>
                        </div>
                      </div>
                    )}
                    <Link to="/predictions">
                      <Button
                        variant="outline"
                        className="w-full border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white"
                      >
                        View Predictions
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Nepal Focus */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                ScoreGuff
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              नेपालीहरुका लागि बनाइएको, अन्तर्राष्ट्रिय गुणस्तरको खेलकुद
              भविष्यवाणी प्लेटफर्म
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-scoreguff-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News with Nepal Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Sports News</h2>
            <p className="text-xl text-muted-foreground">
              Nepal and international sports coverage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((article, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      className={`${article.isNepal ? "bg-red-600" : "bg-scoreguff-blue"} text-white`}
                    >
                      {article.isNepal ? "🇳🇵 Nepal" : "🌍 International"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/news">
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news">
              <Button
                variant="outline"
                size="lg"
                className="border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white"
              >
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nepal User Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              नेपाली प्रयोगकर्ताहरुको मत
            </h2>
            <p className="text-xl text-muted-foreground">
              What our Nepal community says
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-scoreguff-gold text-scoreguff-gold"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Nepal Appeal */}
      <section className="py-20 bg-scoreguff-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            नेपालको सबैभन्दा राम्रो Sports Platform मा सामेल हुनुहोस्!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Nepal's most trusted sports prediction platform and start
            winning with AI-powered insights for cricket, football, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-scoreguff-blue hover:bg-white/90 px-8 py-6 text-lg"
                >
                  Dashboard जाउ
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
                  निशुल्क सुरु गर्नुहोस् (Start Free)
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-scoreguff-blue px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
