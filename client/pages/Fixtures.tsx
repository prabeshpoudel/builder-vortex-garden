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
  Calendar,
  TrendingUp,
  Clock,
  MapPin,
  Filter,
  Search,
  Users,
  BarChart3,
  Trophy,
  Zap,
  CheckCircle,
  Star,
  MessageCircle,
  Eye,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Fixtures = () => {
  const { games, getUpcomingGames, getLiveGames, getCompletedGames } =
    useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
  const [fanPoll, setFanPoll] = useState<{
    [key: string]: { home: number; away: number; draw?: number };
  }>({});
  const [isPredictionDialogOpen, setIsPredictionDialogOpen] = useState(false);
  const [selectedGameForPrediction, setSelectedGameForPrediction] =
    useState<Game | null>(null);
  const [predictionFormData, setPredictionFormData] = useState({
    winner: "",
    homeScore: "",
    awayScore: "",
    confidence: "medium",
    notes: "",
  });
  const { user, isAuthenticated } = useAuth();

  const upcomingGames = getUpcomingGames();
  const liveGames = getLiveGames();
  const completedGames = getCompletedGames();
  const allGames = [...liveGames, ...upcomingGames, ...completedGames];

  // Filter games based on search and filters
  const filteredGames = allGames.filter((game) => {
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

  const openMatchDialog = (game: Game) => {
    setSelectedGame(game);
    setIsMatchDialogOpen(true);
  };

  const castVote = (gameId: string, team: "home" | "away" | "draw") => {
    setFanPoll((prev) => ({
      ...prev,
      [gameId]: {
        home:
          team === "home"
            ? (prev[gameId]?.home || 0) + 1
            : prev[gameId]?.home || 0,
        away:
          team === "away"
            ? (prev[gameId]?.away || 0) + 1
            : prev[gameId]?.away || 0,
        draw:
          team === "draw"
            ? (prev[gameId]?.draw || 0) + 1
            : prev[gameId]?.draw || 0,
      },
    }));
  };

  const stats = [
    {
      title: "Total Fixtures",
      value: allGames.length.toString(),
      icon: Calendar,
      color: "text-scoreguff-blue",
    },
    {
      title: "Live Matches",
      value: liveGames.length.toString(),
      icon: Zap,
      color: "text-green-600",
    },
    {
      title: "This Week",
      value: upcomingGames.length.toString(),
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Sports Covered",
      value: uniqueSports.length.toString(),
      icon: Trophy,
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
              Match Center
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete fixture list, live scores, and match information for Nepal
            and international sports
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
              placeholder="Search teams, leagues, matches..."
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
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
              <p className="text-muted-foreground">
                No matches match your current filters. Try adjusting your search
                criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Live Matches */}
            {liveGames.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-green-500" />
                  🔴 Live Now
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {liveGames
                    .filter((game) => filteredGames.includes(game))
                    .map((game) => (
                      <Card
                        key={game.id}
                        className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 hover:shadow-lg transition-all"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-green-500 animate-pulse">
                                  <Zap className="h-3 w-3 mr-1" />
                                  LIVE
                                </Badge>
                                <Badge variant="outline">{game.sport}</Badge>
                              </div>
                              <CardTitle className="text-xl">
                                {game.homeTeam} vs {game.awayTeam}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-4 mt-2">
                                <span className="font-medium">
                                  {game.league}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {game.venue}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3">
                            <Button
                              className="flex-1 bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                              onClick={() => openMatchDialog(game)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Follow Live
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Discuss
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* Upcoming Matches */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-scoreguff-blue" />
                Upcoming Fixtures
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {upcomingGames
                  .filter((game) => filteredGames.includes(game))
                  .map((game) => (
                    <Card
                      key={game.id}
                      className="border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="space-y-1">
                            <Badge className="bg-blue-500 text-white">
                              {game.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs ml-2">
                              {game.sport}
                            </Badge>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {game.matchDate}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {game.matchTime}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          {game.homeTeam} vs {game.awayTeam}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span className="font-medium">{game.league}</span>
                          {game.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs">{game.venue}</span>
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {/* Fan Poll */}
                        <div className="bg-muted/50 rounded-lg p-3 mb-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Fan Poll: Who will win?
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => castVote(game.id, "home")}
                              className="text-xs"
                            >
                              {game.homeTeam.split(" ")[0]}
                              <br />
                              <span className="text-scoreguff-blue font-semibold">
                                {fanPoll[game.id]?.home || 12}
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => castVote(game.id, "draw")}
                              className="text-xs"
                            >
                              Draw
                              <br />
                              <span className="text-scoreguff-blue font-semibold">
                                {fanPoll[game.id]?.draw || 5}
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => castVote(game.id, "away")}
                              className="text-xs"
                            >
                              {game.awayTeam.split(" ")[0]}
                              <br />
                              <span className="text-scoreguff-blue font-semibold">
                                {fanPoll[game.id]?.away || 8}
                              </span>
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                            onClick={() => openMatchDialog(game)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Match Details
                          </Button>
                          <Button variant="outline" size="icon">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Recent Results */}
            {completedGames.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-gray-500" />
                  Recent Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedGames
                    .filter((game) => filteredGames.includes(game))
                    .slice(0, 6)
                    .map((game) => (
                      <Card
                        key={game.id}
                        className="border-2 hover:shadow-lg transition-all"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <Badge className="bg-gray-500 text-white">
                              FINISHED
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {game.sport}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">
                            {game.homeTeam} vs {game.awayTeam}
                          </CardTitle>
                          <CardDescription>{game.league}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => openMatchDialog(game)}
                          >
                            View Result
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Match Details Dialog */}
        <Dialog open={isMatchDialogOpen} onOpenChange={setIsMatchDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-scoreguff-blue" />
                {selectedGame?.homeTeam} vs {selectedGame?.awayTeam}
              </DialogTitle>
              <DialogDescription>
                Complete match information and details
              </DialogDescription>
            </DialogHeader>
            {selectedGame && (
              <div className="space-y-6">
                {/* Match Info */}
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

                {selectedGame.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Match Preview</h4>
                    <p className="text-muted-foreground">
                      {selectedGame.description}
                    </p>
                  </div>
                )}

                {/* Fan Engagement */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4 text-scoreguff-blue" />
                    Fan Engagement
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/30 rounded">
                      <div className="text-2xl font-bold text-scoreguff-blue">
                        1.2K
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Following
                      </div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded">
                      <div className="text-2xl font-bold text-green-600">
                        342
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Comments
                      </div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded">
                      <div className="text-2xl font-bold text-orange-600">
                        89
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Reactions
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                    <Star className="h-4 w-4 mr-2" />
                    Follow Match
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Discussion
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsMatchDialogOpen(false)}
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

export default Fixtures;
