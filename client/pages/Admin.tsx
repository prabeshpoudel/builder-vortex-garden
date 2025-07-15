import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdmin, Game } from "@/contexts/AdminContext";
import { useUserManagement } from "@/contexts/UserManagementContext";
import {
  Plus,
  Edit,
  Trash2,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  BarChart3,
  UserCheck,
  UserX,
  Crown,
  Ban,
  CheckCircle,
} from "lucide-react";

const Admin = () => {
  const {
    games,
    addGame,
    updateGame,
    deleteGame,
    getUpcomingGames,
    getLiveGames,
    getCompletedGames,
  } = useAdmin();

  const {
    users,
    promoteToAdmin,
    demoteToUser,
    banUser,
    unbanUser,
    getActiveUsers,
    getAdminUsers,
    getBannedUsers,
  } = useUserManagement();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState<Partial<Game>>({
    homeTeam: "",
    awayTeam: "",
    league: "",
    sport: "",
    matchDate: "",
    matchTime: "",
    status: "upcoming",
    venue: "",
    description: "",
    odds: {
      homeWin: 0,
      awayWin: 0,
      draw: 0,
      overUnder: 0,
    },
  });

  const sports = [
    "Cricket",
    "Football",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Badminton",
    "Boxing",
  ];
  const leagues = {
    Cricket: [
      "Nepal Premier League (Cricket)",
      "ACC Premier Cup",
      "SAFF Championship",
      "IPL",
      "World Cup",
      "Asia Cup",
      "Everest Premier League",
    ],
    Football: [
      "Nepal Premier League",
      "SAFF Championship",
      "AFC Challenge Cup",
      "Premier League",
      "La Liga",
      "Champions League",
      "Martyrs Memorial League",
    ],
    Basketball: ["NBA", "Nepal Basketball League", "FIBA Asia Cup"],
    Volleyball: ["Nepal Volleyball League", "Asian Championship"],
    Tennis: ["ATP", "WTA", "Grand Slam", "Nepal Open"],
    Badminton: ["All Nepal Championship", "BWF", "Thomas Cup"],
    Boxing: ["Nepal Boxing Championship", "AIBA", "Olympics"],
  };

  const handleAddGame = () => {
    if (
      formData.homeTeam &&
      formData.awayTeam &&
      formData.league &&
      formData.sport
    ) {
      addGame(formData as Omit<Game, "id">);
      setFormData({
        homeTeam: "",
        awayTeam: "",
        league: "",
        sport: "",
        matchDate: "",
        matchTime: "",
        status: "upcoming",
        venue: "",
        description: "",
        odds: { homeWin: 0, awayWin: 0, draw: 0, overUnder: 0 },
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditGame = () => {
    if (editingGame && formData.homeTeam && formData.awayTeam) {
      updateGame(editingGame.id, formData);
      setIsEditDialogOpen(false);
      setEditingGame(null);
    }
  };

  const handleDeleteGame = (id: string) => {
    deleteGame(id);
  };

  const openEditDialog = (game: Game) => {
    setEditingGame(game);
    setFormData(game);
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "live":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const stats = [
    {
      title: "Total Games",
      value: games.length.toString(),
      icon: Trophy,
      color: "text-scoreguff-blue",
    },
    {
      title: "Active Users",
      value: getActiveUsers().length.toString(),
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Admins",
      value: getAdminUsers().length.toString(),
      icon: Shield,
      color: "text-purple-600",
    },
    {
      title: "Live Games",
      value: getLiveGames().length.toString(),
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
              <Shield className="h-10 w-10 text-scoreguff-blue" />
              <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
                Admin Panel
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage games, predictions, and platform settings
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90 mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Add New Game
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Game</DialogTitle>
                <DialogDescription>
                  Create a new game for users to make predictions on
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeTeam">Home Team</Label>
                  <Input
                    id="homeTeam"
                    value={formData.homeTeam}
                    onChange={(e) =>
                      setFormData({ ...formData, homeTeam: e.target.value })
                    }
                    placeholder="Enter home team"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="awayTeam">Away Team</Label>
                  <Input
                    id="awayTeam"
                    value={formData.awayTeam}
                    onChange={(e) =>
                      setFormData({ ...formData, awayTeam: e.target.value })
                    }
                    placeholder="Enter away team"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sport">Sport</Label>
                  <Select
                    value={formData.sport}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sport: value, league: "" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="league">League</Label>
                  <Select
                    value={formData.league}
                    onValueChange={(value) =>
                      setFormData({ ...formData, league: value })
                    }
                    disabled={!formData.sport}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select league" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.sport &&
                        leagues[formData.sport as keyof typeof leagues]?.map(
                          (league) => (
                            <SelectItem key={league} value={league}>
                              {league}
                            </SelectItem>
                          ),
                        )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchDate">Match Date</Label>
                  <Input
                    id="matchDate"
                    type="date"
                    value={formData.matchDate}
                    onChange={(e) =>
                      setFormData({ ...formData, matchDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchTime">Match Time</Label>
                  <Input
                    id="matchTime"
                    type="time"
                    value={formData.matchTime}
                    onChange={(e) =>
                      setFormData({ ...formData, matchTime: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    placeholder="Enter venue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as Game["status"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter game description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homeWin">Home Win Odds</Label>
                  <Input
                    id="homeWin"
                    type="number"
                    step="0.1"
                    value={formData.odds?.homeWin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        odds: {
                          ...formData.odds,
                          homeWin: parseFloat(e.target.value),
                        },
                      })
                    }
                    placeholder="1.85"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="awayWin">Away Win Odds</Label>
                  <Input
                    id="awayWin"
                    type="number"
                    step="0.1"
                    value={formData.odds?.awayWin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        odds: {
                          ...formData.odds,
                          awayWin: parseFloat(e.target.value),
                        },
                      })
                    }
                    placeholder="2.10"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddGame}
                  className="bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                >
                  Add Game
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-2 hover:border-scoreguff-blue/50 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-scoreguff-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Management Section */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-scoreguff-blue" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined: {user.joinedDate}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === "admin"
                              ? "bg-purple-500 text-white"
                              : "bg-blue-500 text-white"
                          }
                        >
                          {user.role === "admin" && (
                            <Crown className="h-3 w-3 mr-1" />
                          )}
                          {user.role.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "active"
                              ? "bg-green-500 text-white"
                              : user.status === "banned"
                                ? "bg-red-500 text-white"
                                : "bg-gray-500 text-white"
                          }
                        >
                          {user.status === "active" && (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {user.status === "banned" && (
                            <Ban className="h-3 w-3 mr-1" />
                          )}
                          {user.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{user.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Predictions: {user.totalPredictions}</div>
                          <div>Accuracy: {user.accuracy}%</div>
                          <div>
                            Winnings: NPR {user.totalWinnings.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {user.role === "user" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => promoteToAdmin(user.id)}
                              className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                            >
                              <Crown className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => demoteToUser(user.id)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          )}
                          {user.status === "active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => banUser(user.id)}
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => unbanUser(user.id)}
                              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Games Management */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-scoreguff-blue" />
              Games Management
            </CardTitle>
            <CardDescription>
              Manage all games available for predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match</TableHead>
                    <TableHead>League</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {games.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {game.homeTeam} vs {game.awayTeam}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {game.sport}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{game.league}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{game.matchDate}</span>
                          <span className="text-xs text-muted-foreground">
                            {game.matchTime}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(game.status)} text-white`}
                        >
                          {game.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{game.venue || "TBD"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(game)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Game</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this game?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteGame(game.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Game</DialogTitle>
              <DialogDescription>
                Update game information and settings
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editHomeTeam">Home Team</Label>
                <Input
                  id="editHomeTeam"
                  value={formData.homeTeam}
                  onChange={(e) =>
                    setFormData({ ...formData, homeTeam: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAwayTeam">Away Team</Label>
                <Input
                  id="editAwayTeam"
                  value={formData.awayTeam}
                  onChange={(e) =>
                    setFormData({ ...formData, awayTeam: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as Game["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editVenue">Venue</Label>
                <Input
                  id="editVenue"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditGame}
                className="bg-scoreguff-blue hover:bg-scoreguff-blue/90"
              >
                Update Game
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
