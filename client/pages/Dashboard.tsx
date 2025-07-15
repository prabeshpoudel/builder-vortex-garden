import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  TrendingUp,
  Target,
  Trophy,
  Users,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Prediction Accuracy",
      value: "87.3%",
      change: "+5.2%",
      icon: Target,
    },
    {
      title: "Active Predictions",
      value: "142",
      change: "+12",
      icon: Activity,
    },
    {
      title: "Weekly Earnings",
      value: "$2,340",
      change: "+18.3%",
      icon: TrendingUp,
    },
    { title: "Followers", value: "8.2k", change: "+127", icon: Users },
  ];

  const recentPredictions = [
    {
      match: "Man City vs Arsenal",
      prediction: "Over 2.5 Goals",
      odds: "1.85",
      status: "pending",
      confidence: 92,
    },
    {
      match: "Liverpool vs Chelsea",
      prediction: "Liverpool Win",
      odds: "2.10",
      status: "won",
      confidence: 78,
    },
    {
      match: "Barcelona vs Real Madrid",
      prediction: "Both Teams Score",
      odds: "1.65",
      status: "lost",
      confidence: 85,
    },
    {
      match: "PSG vs Bayern Munich",
      prediction: "Under 3.5 Goals",
      odds: "1.90",
      status: "pending",
      confidence: 73,
    },
  ];

  const upcomingMatches = [
    {
      teams: "Manchester United vs Tottenham",
      time: "15:30",
      league: "Premier League",
      date: "Today",
    },
    {
      teams: "Juventus vs AC Milan",
      time: "18:45",
      league: "Serie A",
      date: "Tomorrow",
    },
    {
      teams: "Borussia Dortmund vs RB Leipzig",
      time: "14:30",
      league: "Bundesliga",
      date: "Saturday",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your predictions and analyze your performance
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
              <Trophy className="h-4 w-4 mr-2" />
              New Prediction
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-scoreguff-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-scoreguff-green font-medium">
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Predictions */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-scoreguff-blue" />
                  Recent Predictions
                </CardTitle>
                <CardDescription>
                  Your latest sports predictions and their outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPredictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {prediction.match}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {prediction.prediction}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Odds: {prediction.odds}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {prediction.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                      <Badge
                        variant={
                          prediction.status === "won"
                            ? "default"
                            : prediction.status === "lost"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          prediction.status === "won"
                            ? "bg-scoreguff-green hover:bg-scoreguff-green/90"
                            : ""
                        }
                      >
                        {prediction.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Matches */}
          <div>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-scoreguff-blue" />
                  Upcoming Matches
                </CardTitle>
                <CardDescription>
                  Matches to consider for predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMatches.map((match, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm leading-tight">
                          {match.teams}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {match.date}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {match.league}
                        </span>
                        <span className="text-xs font-medium text-scoreguff-blue">
                          {match.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white"
                >
                  View All Matches
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
