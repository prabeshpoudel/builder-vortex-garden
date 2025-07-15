import { Link } from "react-router-dom";
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
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Predictions",
      description:
        "Advanced machine learning algorithms analyze thousands of data points to provide accurate sports predictions.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description:
        "Track market movements, odds changes, and betting trends as they happen across all major sportsbooks.",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description:
        "Monitor your prediction accuracy, ROI, and detailed statistics with comprehensive analytics dashboard.",
    },
    {
      icon: Users,
      title: "Community Insights",
      description:
        "Join thousands of sports bettors sharing insights, strategies, and profitable prediction models.",
    },
  ];

  const stats = [
    { number: "87.3%", label: "Average Accuracy" },
    { number: "15K+", label: "Active Users" },
    { number: "$2.4M", label: "Total Winnings" },
    { number: "25+", label: "Sports Covered" },
  ];

  const recentWins = [
    {
      match: "Manchester City vs Arsenal",
      prediction: "Over 2.5 Goals",
      odds: "1.85",
      result: "3-1",
      profit: "+$185",
    },
    {
      match: "Lakers vs Warriors",
      prediction: "Lakers +4.5",
      odds: "1.91",
      result: "112-108",
      profit: "+$91",
    },
    {
      match: "Chiefs vs Bills",
      prediction: "Under 47.5",
      odds: "1.90",
      result: "21-17",
      profit: "+$90",
    },
  ];

  const testimonials = [
    {
      name: "Mike Rodriguez",
      role: "Professional Bettor",
      content:
        "ScoreGuff has transformed my betting strategy. The AI predictions are incredibly accurate.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Sports Analyst",
      content:
        "The analytics tools are professional-grade. Perfect for serious sports betting.",
      rating: 5,
    },
    {
      name: "David Johnson",
      role: "Casual Bettor",
      content:
        "Easy to use interface with predictions that actually work. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-scoreguff-gradient opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-4 border-scoreguff-blue text-scoreguff-blue"
              >
                <Trophy className="w-4 h-4 mr-2" />
                #1 Sports Prediction Platform
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Win More With{" "}
                <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                  ScoreGuff
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                AI-powered sports predictions with real-time analytics.
                Transform your betting strategy and join thousands of winning
                users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-scoreguff-blue hover:bg-scoreguff-blue/90 text-white px-8 py-6 text-lg"
                  >
                    Start Winning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
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
            <div className="relative">
              <div className="absolute inset-0 bg-scoreguff-gradient rounded-3xl blur-3xl opacity-20" />
              <Card className="relative border-2 border-scoreguff-blue/20 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-scoreguff-blue" />
                    Live Prediction
                  </CardTitle>
                  <CardDescription>
                    Real-time AI analysis for upcoming matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-semibold">Man City vs Liverpool</h4>
                        <p className="text-sm text-muted-foreground">
                          Premier League • Today 15:30
                        </p>
                      </div>
                      <Badge className="bg-scoreguff-green">
                        92% confidence
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-scoreguff-blue/10 rounded-lg border border-scoreguff-blue/20">
                      <div>
                        <h4 className="font-semibold text-scoreguff-blue">
                          Prediction: Over 2.5 Goals
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Odds: 1.85 • Potential profit: $185
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

      {/* Stats Section */}
      <section className="py-20 bg-scoreguff-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Winners Worldwide
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of successful sports bettors
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
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
              Advanced technology meets sports expertise to give you the edge
              you need to win consistently.
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

      {/* Recent Wins */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Recent Winning Predictions
            </h2>
            <p className="text-xl text-muted-foreground">
              See our latest successful predictions and their profits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {recentWins.map((win, index) => (
              <Card key={index} className="border-2 border-scoreguff-green/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{win.match}</CardTitle>
                    <Badge className="bg-scoreguff-green">{win.profit}</Badge>
                  </div>
                  <CardDescription>{win.prediction}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Odds: {win.odds}
                    </span>
                    <span className="text-sm font-medium">
                      Result: {win.result}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers
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

      {/* CTA Section */}
      <section className="py-20 bg-scoreguff-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Winning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join ScoreGuff today and transform your sports betting with
            AI-powered predictions and professional analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-scoreguff-blue hover:bg-white/90 px-8 py-6 text-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
