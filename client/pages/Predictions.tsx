import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAdmin, Game } from "@/contexts/AdminContext";
import {
  Target,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Filter,
  Search,
  Play,
  BarChart3,
  Trophy,
  DollarSign,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const Predictions = () => {
  const { games, getUpcomingGames, getLiveGames } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPredictionDialogOpen, setIsPredictionDialogOpen] = useState(false);

  const upcomingGames = getUpcomingGames();
  const liveGames = getLiveGames();
  const availableGames = [...liveGames, ...upcomingGames];

  // Filter games based on search and filters
  const filteredGames = availableGames.filter((game) => {
    const matchesSearch =
      game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.league.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport =
      selectedSport === "all" || game.sport === selectedSport;
    const matchesLeague =
      selectedLeague === "all" || game.league === selectedLeague;

    return matchesSearch && matchesSport && matchesLeague;
  });

  const uniqueSports = Array.from(new Set(games.map((game) => game.sport)));
  const uniqueLeagues = Array.from(new Set(games.map((game) => game.league)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "live":
        return "bg-green-500 animate-pulse";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50";
    if (confidence >= 80) return "text-blue-600 bg-blue-50";
    if (confidence >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const openPredictionDialog = (game: Game) => {
    setSelectedGame(game);
    setIsPredictionDialogOpen(true);
  };

  const stats = [
    {
      title: "Available Games",
      value: availableGames.length.toString(),
      icon: Trophy,
      color: "text-scoreguff-blue",
    },
    {
      title: "Live Matches",
      value: liveGames.length.toString(),
      icon: Zap,
      color: "text-green-600",
    },
    {
      title: "Upcoming",
      value: upcomingGames.length.toString(),
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Avg Confidence",
      value: "85%",
      icon: BarChart3,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
              Predictions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered sports predictions with detailed analysis and insights.
            Choose from available games and make informed betting decisions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-2 hover:border-scoreguff-blue/50 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search teams, leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-full md:w-40 h-11">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {uniqueSports.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="w-full md:w-40 h-11">
              <SelectValue placeholder="League" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leagues</SelectItem>
              {uniqueLeagues.map((league) => (
                <SelectItem key={league} value={league}>
                  {league}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Games Available</h3>
              <p className="text-muted-foreground">
                No games match your current filters. Try adjusting your search
                criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Card
                key={game.id}
                className="border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <Badge
                        className={`${getStatusColor(game.status)} text-white`}
                      >
                        {game.status === "live" && (
                          <Zap className="h-3 w-3 mr-1" />
                        )}
                        {game.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {game.sport}
                      </Badge>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {game.matchDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {game.matchTime}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {game.homeTeam} vs {game.awayTeam}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{game.league}</span>
                      {game.venue && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{game.venue}</span>
                        </div>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Odds Display */}
                  {game.odds && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Current Odds
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Home</p>
                          <p className="font-semibold text-scoreguff-blue">
                            {game.odds.homeWin}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Away</p>
                          <p className="font-semibold text-scoreguff-blue">
                            {game.odds.awayWin}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Predictions */}
                  {game.predictions && game.predictions.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        AI Predictions
                      </p>
                      {game.predictions.slice(0, 2).map((prediction) => (
                        <div
                          key={prediction.id}
                          className="flex items-center justify-between p-2 bg-muted/30 rounded"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {prediction.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {prediction.recommendation}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs ${getConfidenceColor(prediction.confidence)}`}
                          >
                            {prediction.confidence}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                    onClick={() => openPredictionDialog(game)}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    View Predictions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Prediction Details Dialog */}
        <Dialog
          open={isPredictionDialogOpen}
          onOpenChange={setIsPredictionDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-scoreguff-blue" />
                {selectedGame?.homeTeam} vs {selectedGame?.awayTeam}
              </DialogTitle>
              <DialogDescription>
                Detailed AI predictions and betting recommendations
              </DialogDescription>
            </DialogHeader>
            {selectedGame && (
              <div className="space-y-6">
                {/* Game Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">League</p>
                    <p className="font-medium">{selectedGame.league}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sport</p>
                    <p className="font-medium">{selectedGame.sport}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">
                      {selectedGame.matchDate} at {selectedGame.matchTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{selectedGame.venue || "TBD"}</p>
                  </div>
                </div>

                {/* All Predictions */}
                {selectedGame.predictions && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-scoreguff-blue" />
                      AI Predictions
                    </h4>
                    <div className="space-y-3">
                      {selectedGame.predictions.map((prediction) => (
                        <div
                          key={prediction.id}
                          className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{prediction.type}</h5>
                            <Badge
                              className={`${getConfidenceColor(prediction.confidence)}`}
                            >
                              {prediction.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Recommendation: {prediction.recommendation}
                          </p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">
                              AI Recommended
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Place Bet
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPredictionDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Predictions;
