import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  TrendingUp,
  Eye,
  MessageCircle,
  Calendar,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Timer,
  Star,
  Award,
  Activity,
  Bookmark,
  User,
  Crown,
} from "lucide-react";

interface Prediction {
  id: string;
  userId: string;
  userName: string;
  matchId: string;
  matchTitle: string;
  prediction: {
    winner: "home" | "away" | "draw";
    homeScore?: number;
    awayScore?: number;
    confidence: "low" | "medium" | "high";
  };
  createdAt: string;
  result?: {
    isCorrect: boolean;
    points: number;
  };
  status: "pending" | "won" | "lost" | "void";
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock prediction data for now
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Simulated user predictions
    const userPredictions: Prediction[] = [
      {
        id: "pred_1",
        userId: user.id || "user_1",
        userName: user.name || "User",
        matchId: "match_1",
        matchTitle: "Nepal vs UAE - ACC Premier Cup",
        prediction: {
          winner: "home",
          homeScore: 180,
          awayScore: 165,
          confidence: "high",
        },
        createdAt: "2024-01-18T10:30:00Z",
        result: {
          isCorrect: true,
          points: 15,
        },
        status: "won",
      },
      {
        id: "pred_2",
        userId: user.id || "user_1",
        userName: user.name || "User",
        matchId: "match_2",
        matchTitle: "Kathmandu FC vs Pokhara Thunder - NPL",
        prediction: {
          winner: "home",
          homeScore: 2,
          awayScore: 1,
          confidence: "medium",
        },
        createdAt: "2024-01-17T14:20:00Z",
        result: {
          isCorrect: false,
          points: 0,
        },
        status: "lost",
      },
      {
        id: "pred_3",
        userId: user.id || "user_1",
        userName: user.name || "User",
        matchId: "match_3",
        matchTitle: "Manchester City vs Arsenal - Premier League",
        prediction: {
          winner: "away",
          homeScore: 1,
          awayScore: 2,
          confidence: "medium",
        },
        createdAt: "2024-01-16T09:15:00Z",
        status: "pending",
      },
      {
        id: "pred_4",
        userId: user.id || "user_1",
        userName: user.name || "User",
        matchId: "match_4",
        matchTitle: "Nepal U-19 vs Bangladesh U-19 - SAFF Championship",
        prediction: {
          winner: "home",
          homeScore: 3,
          awayScore: 1,
          confidence: "high",
        },
        createdAt: "2024-01-15T16:45:00Z",
        result: {
          isCorrect: true,
          points: 20,
        },
        status: "won",
      },
    ];

    setPredictions(userPredictions);
    setLoading(false);
  }, [user, isAuthenticated]);

  const totalPredictions = predictions.length;
  const wonPredictions = predictions.filter((p) => p.status === "won").length;
  const lostPredictions = predictions.filter((p) => p.status === "lost").length;
  const pendingPredictions = predictions.filter(
    (p) => p.status === "pending",
  ).length;
  const successRate =
    totalPredictions > 0
      ? Math.round((wonPredictions / (wonPredictions + lostPredictions)) * 100)
      : 0;
  const totalPoints = predictions.reduce(
    (sum, p) => sum + (p.result?.points || 0),
    0,
  );

  const stats = [
    {
      title: "Total Predictions",
      value: totalPredictions.toString(),
      change: "+3 this week",
      icon: Target,
      color: "text-scoreguff-blue",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change:
        wonPredictions > lostPredictions ? "+5% this week" : "-2% this week",
      icon: Trophy,
      color:
        successRate >= 60
          ? "text-green-600"
          : successRate >= 40
            ? "text-yellow-600"
            : "text-red-600",
    },
    {
      title: "Points Earned",
      value: totalPoints.toString(),
      change: "+35 this week",
      icon: Star,
      color: "text-purple-600",
    },
    {
      title: "Rank",
      value: "#247",
      change: "↑15 positions",
      icon: Crown,
      color: "text-orange-600",
    },
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "lost":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Timer className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to ScoreGuff</CardTitle>
            <CardDescription>
              Please sign in to view your dashboard and prediction history
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="w-full bg-scoreguff-blue hover:bg-scoreguff-blue/90">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scoreguff-blue mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent mb-2">
              My Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back, {user?.name || "Sports Fan"}! Track your predictions
              and performance
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
              <Target className="h-4 w-4 mr-2" />
              Make Prediction
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
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p
                  className={`text-sm font-medium ${stat.change.includes("+") || stat.change.includes("↑") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prediction History */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-scoreguff-blue" />
                  Prediction History
                </CardTitle>
                <CardDescription>
                  Your recent predictions and their outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="won">Won</TabsTrigger>
                    <TabsTrigger value="lost">Lost</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    {predictions.map((prediction) => (
                      <div
                        key={prediction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(prediction.status)}
                            <Badge
                              className={`${getConfidenceColor(prediction.prediction.confidence)} text-white text-xs`}
                            >
                              {prediction.prediction.confidence.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(prediction.createdAt)}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {prediction.matchTitle}
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            Predicted:{" "}
                            {prediction.prediction.winner === "home"
                              ? "Home Win"
                              : prediction.prediction.winner === "away"
                                ? "Away Win"
                                : "Draw"}
                            {prediction.prediction.homeScore !== undefined &&
                              prediction.prediction.awayScore !== undefined && (
                                <span>
                                  {" "}
                                  ({prediction.prediction.homeScore}-
                                  {prediction.prediction.awayScore})
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="text-right">
                          {prediction.result && (
                            <div className="text-lg font-bold">
                              <span
                                className={
                                  prediction.status === "won"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {prediction.result.points > 0 ? "+" : ""}
                                {prediction.result.points} pts
                              </span>
                            </div>
                          )}
                          <Badge
                            variant={
                              prediction.status === "won"
                                ? "default"
                                : prediction.status === "lost"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {prediction.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4 mt-6">
                    {predictions
                      .filter((p) => p.status === "pending")
                      .map((prediction) => (
                        <div
                          key={prediction.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(prediction.status)}
                              <Badge
                                className={`${getConfidenceColor(prediction.prediction.confidence)} text-white text-xs`}
                              >
                                {prediction.prediction.confidence.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(prediction.createdAt)}
                              </span>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {prediction.matchTitle}
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              Predicted:{" "}
                              {prediction.prediction.winner === "home"
                                ? "Home Win"
                                : prediction.prediction.winner === "away"
                                  ? "Away Win"
                                  : "Draw"}
                              {prediction.prediction.homeScore !== undefined &&
                                prediction.prediction.awayScore !==
                                  undefined && (
                                  <span>
                                    {" "}
                                    ({prediction.prediction.homeScore}-
                                    {prediction.prediction.awayScore})
                                  </span>
                                )}
                            </div>
                          </div>
                          <Badge variant="secondary">PENDING</Badge>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="won" className="space-y-4 mt-6">
                    {predictions
                      .filter((p) => p.status === "won")
                      .map((prediction) => (
                        <div
                          key={prediction.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <Badge className="bg-green-500 text-white text-xs">
                                {prediction.prediction.confidence.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(prediction.createdAt)}
                              </span>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {prediction.matchTitle}
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              Correct prediction:{" "}
                              {prediction.prediction.winner === "home"
                                ? "Home Win"
                                : prediction.prediction.winner === "away"
                                  ? "Away Win"
                                  : "Draw"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              +{prediction.result?.points} pts
                            </div>
                            <Badge className="bg-green-500">WON</Badge>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="lost" className="space-y-4 mt-6">
                    {predictions
                      .filter((p) => p.status === "lost")
                      .map((prediction) => (
                        <div
                          key={prediction.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <Badge className="bg-red-500 text-white text-xs">
                                {prediction.prediction.confidence.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(prediction.createdAt)}
                              </span>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {prediction.matchTitle}
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              Predicted:{" "}
                              {prediction.prediction.winner === "home"
                                ? "Home Win"
                                : prediction.prediction.winner === "away"
                                  ? "Away Win"
                                  : "Draw"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">
                              0 pts
                            </div>
                            <Badge variant="destructive">LOST</Badge>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-scoreguff-blue" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Success Rate</span>
                    <span className="font-medium">{successRate}%</span>
                  </div>
                  <Progress value={successRate} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {wonPredictions}
                    </div>
                    <div className="text-xs text-muted-foreground">Won</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {lostPredictions}
                    </div>
                    <div className="text-xs text-muted-foreground">Lost</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-xl font-bold text-scoreguff-blue">
                      {totalPoints}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Points
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-scoreguff-blue" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                  <Target className="h-4 w-4 mr-2" />
                  Make New Prediction
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Fixtures
                </Button>
                <Button variant="outline" className="w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-scoreguff-blue" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Prediction Won!</div>
                      <div className="text-muted-foreground">
                        Nepal vs UAE - +15 points
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium">New Prediction</div>
                      <div className="text-muted-foreground">
                        Man City vs Arsenal
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 day ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Prediction Lost</div>
                      <div className="text-muted-foreground">
                        Kathmandu FC vs Pokhara
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
