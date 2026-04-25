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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin, Game } from "@/contexts/AdminContext";
import { useUserManagement } from "@/contexts/UserManagementContext";
import { useAuth } from "@/contexts/AuthContext";
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
  Newspaper,
  PinIcon,
  TrendingUp,
  Eye,
  MessageCircle,
  Image,
  FileText,
  Tag,
  Settings,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published" | "featured";
  isPinned: boolean;
  isTrending: boolean;
  views: number;
  comments: number;
  imageUrl?: string;
  isNepal: boolean;
}

const Admin = () => {
  const { user, isAuthenticated } = useAuth();

  // Check if user has admin access
  if (
    !isAuthenticated ||
    !user ||
    user.role !== "admin"
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-600">
              Access Denied
            </CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Only authorized administrators can access this area.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    games,
    articles,
    addGame,
    updateGame,
    deleteGame,
    getUpcomingGames,
    getLiveGames,
    getCompletedGames,
    addArticle,
    updateArticle,
    deleteArticle,
    togglePinArticle,
    toggleTrendingArticle,
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

  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useState(false);
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useState(false);
  const [isAddArticleDialogOpen, setIsAddArticleDialogOpen] = useState(false);
  const [isSiteSettingsDialogOpen, setIsSiteSettingsDialogOpen] =
    useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Site settings state
  const [siteSettings, setSiteSettings] = useState({
    siteName: "ScoreGuff",
    siteTagline: "Nepal's Sports News Hub",
    siteLogo: "/placeholder.svg",
    primaryColor: "#3B82F6",
    supportEmail: "support@scoreguff.com",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const [gameFormData, setGameFormData] = useState<Partial<Game>>({
    homeTeam: "",
    awayTeam: "",
    league: "",
    sport: "",
    matchDate: "",
    matchTime: "",
    status: "upcoming",
    venue: "",
    description: "",
    predictionSettings: {
      enabled: true,
      deadline: "",
    },
  });

  const [articleFormData, setArticleFormData] = useState<Partial<Article>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    status: "draft",
    isPinned: false,
    isTrending: false,
    isNepal: false,
  });

  const sports = [
    "Cricket",
    "Football",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Badminton",
  ];
  const newsCategories = [
    "Nepal Cricket",
    "Nepal Football",
    "International Football",
    "International Cricket",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Olympics",
    "Transfers",
    "Tournaments",
  ];

  const handleAddArticle = async () => {
    // Client-side validation
    if (!articleFormData.title || articleFormData.title.length < 5) {
      alert("Title must be at least 5 characters");
      return;
    }
    if (!articleFormData.excerpt || articleFormData.excerpt.length < 10) {
      alert("Excerpt must be at least 10 characters");
      return;
    }
    if (!articleFormData.content || articleFormData.content.length < 50) {
      alert("Content must be at least 50 characters");
      return;
    }
    if (!articleFormData.category) {
      alert("Category is required");
      return;
    }

    try {
      await addArticle({
        title: articleFormData.title,
        excerpt: articleFormData.excerpt,
        content: articleFormData.content,
        category: articleFormData.category,
        status: articleFormData.status,
        isPinned: articleFormData.isPinned,
        isTrending: articleFormData.isTrending,
        isNepal: articleFormData.isNepal,
        tags: [], // Add tags support later
        isBreaking: false,
        readTime: 5,
      });

      setArticleFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "",
        status: "draft",
        isPinned: false,
        isTrending: false,
        isNepal: false,
      });
      setIsAddArticleDialogOpen(false);
    } catch (error) {
      console.error("Failed to add article:", error);
      alert(`Failed to add article: ${error}`);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      alert("Article deleted successfully!");
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert(`Failed to delete article: ${error}`);
    }
  };

  const handleTogglePinArticle = async (id: string) => {
    try {
      await togglePinArticle(id);
    } catch (error) {
      console.error("Failed to toggle pin article:", error);
    }
  };

  const handleToggleTrendingArticle = async (id: string) => {
    try {
      await toggleTrendingArticle(id);
    } catch (error) {
      console.error("Failed to toggle trending article:", error);
    }
  };

  const handleAddGame = async () => {
    if (
      gameFormData.homeTeam &&
      gameFormData.awayTeam &&
      gameFormData.league &&
      gameFormData.sport
    ) {
      try {
        await addGame(gameFormData as Omit<Game, "id">);
        setGameFormData({
          homeTeam: "",
          awayTeam: "",
          league: "",
          sport: "",
          matchDate: "",
          matchTime: "",
          status: "upcoming",
          venue: "",
          description: "",
          predictionSettings: {
            enabled: true,
            deadline: "",
          },
        });
        setIsAddGameDialogOpen(false);
      } catch (error) {
        console.error("Failed to add game:", error);
      }
    }
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setGameFormData({
      ...game,
      predictionSettings: game.predictionSettings || {
        enabled: true,
        deadline: "",
      },
    });
    setIsEditGameDialogOpen(true);
  };

  const handleUpdateGame = async () => {
    if (editingGame && gameFormData.homeTeam && gameFormData.awayTeam) {
      try {
        await updateGame(editingGame.id, gameFormData);
        setEditingGame(null);
        setGameFormData({
          homeTeam: "",
          awayTeam: "",
          league: "",
          sport: "",
          matchDate: "",
          matchTime: "",
          status: "upcoming",
          venue: "",
          description: "",
          predictionSettings: {
            enabled: true,
            deadline: "",
          },
        });
        setIsEditGameDialogOpen(false);
      } catch (error) {
        console.error("Failed to update game:", error);
      }
    }
  };

  const handleTogglePrediction = async (gameId: string, enabled: boolean) => {
    try {
      await updateGame(gameId, {
        predictionSettings: { enabled, deadline: "" },
      });
    } catch (error) {
      console.error("Failed to toggle prediction:", error);
    }
  };

  const stats = [
    {
      title: "Published Articles",
      value: articles
        .filter((a) => a.status === "published" || a.status === "featured")
        .length.toString(),
      icon: Newspaper,
      color: "text-scoreguff-blue",
    },
    {
      title: "Active Users",
      value: getActiveUsers().length.toString(),
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Fixtures",
      value: games.length.toString(),
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Admin Users",
      value: getAdminUsers().length.toString(),
      icon: Shield,
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
                News Admin Panel
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage articles, fixtures, and platform content
            </p>
          </div>
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
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="fixtures" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="predictions"
              className="flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* News Management Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">News Articles</h2>
              <Dialog
                open={isAddArticleDialogOpen}
                onOpenChange={setIsAddArticleDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Article</DialogTitle>
                    <DialogDescription>
                      Add a new sports news article to the platform
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="articleTitle">Article Title</Label>
                      <Input
                        id="articleTitle"
                        value={articleFormData.title}
                        onChange={(e) =>
                          setArticleFormData({
                            ...articleFormData,
                            title: e.target.value,
                          })
                        }
                        placeholder="Enter article title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="articleCategory">Category</Label>
                      <Select
                        value={articleFormData.category}
                        onValueChange={(value) =>
                          setArticleFormData({
                            ...articleFormData,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {newsCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="articleAuthor">Author</Label>
                      <Input
                        id="articleAuthor"
                        value={articleFormData.author}
                        onChange={(e) =>
                          setArticleFormData({
                            ...articleFormData,
                            author: e.target.value,
                          })
                        }
                        placeholder="Author name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="articleStatus">Status</Label>
                      <Select
                        value={articleFormData.status}
                        onValueChange={(value) =>
                          setArticleFormData({
                            ...articleFormData,
                            status: value as Article["status"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="articleExcerpt">Excerpt</Label>
                      <Textarea
                        id="articleExcerpt"
                        value={articleFormData.excerpt}
                        onChange={(e) =>
                          setArticleFormData({
                            ...articleFormData,
                            excerpt: e.target.value,
                          })
                        }
                        placeholder="Article excerpt/summary"
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="articleContent">Article Content</Label>
                      <Textarea
                        id="articleContent"
                        value={articleFormData.content}
                        onChange={(e) =>
                          setArticleFormData({
                            ...articleFormData,
                            content: e.target.value,
                          })
                        }
                        placeholder="Full article content"
                        rows={8}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isNepal"
                        checked={articleFormData.isNepal}
                        onChange={(e) =>
                          setArticleFormData({
                            ...articleFormData,
                            isNepal: e.target.checked,
                          })
                        }
                      />
                      <Label htmlFor="isNepal">Nepal-focused article</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isPinned"
                        checked={articleFormData.isPinned}
                        onChange={(e) =>
                          setArticleFormData({
                            ...articleFormData,
                            isPinned: e.target.checked,
                          })
                        }
                      />
                      <Label htmlFor="isPinned">Pin to homepage</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddArticleDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddArticle}
                      className="bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                    >
                      Publish Article
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-2">
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Article</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium">
                                  {article.title}
                                </div>
                                {article.isPinned && (
                                  <PinIcon className="h-4 w-4 text-scoreguff-blue" />
                                )}
                                {article.isTrending && (
                                  <TrendingUp className="h-4 w-4 text-orange-500" />
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                By {article.author}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(
                                  article.publishedAt,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                article.isNepal
                                  ? "bg-red-600 text-white"
                                  : "bg-scoreguff-blue text-white"
                              }
                            >
                              {article.isNepal ? "🇳🇵" : "🌍"} {article.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                article.status === "featured"
                                  ? "bg-scoreguff-gold text-white"
                                  : article.status === "published"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-500 text-white"
                              }
                            >
                              {article.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span className="text-sm">
                                  {article.views.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                <span className="text-sm">
                                  {article.comments}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => togglePinArticle(article.id)}
                                className={
                                  article.isPinned
                                    ? "text-scoreguff-blue border-scoreguff-blue"
                                    : ""
                                }
                              >
                                <PinIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleTrendingArticle(article.id)
                                }
                                className={
                                  article.isTrending
                                    ? "text-orange-500 border-orange-500"
                                    : ""
                                }
                              >
                                <TrendingUp className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
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
                                    <AlertDialogTitle>
                                      Delete Article
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      article? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteArticle(article.id)
                                      }
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
          </TabsContent>

          {/* Match Center Tab */}
          <TabsContent value="fixtures" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Match Fixtures</h2>
              <Dialog
                open={isAddGameDialogOpen}
                onOpenChange={setIsAddGameDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Match
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Match</DialogTitle>
                    <DialogDescription>
                      Create a new match fixture for the platform
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Home Team</Label>
                      <Input
                        value={gameFormData.homeTeam}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            homeTeam: e.target.value,
                          })
                        }
                        placeholder="Enter home team"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Away Team</Label>
                      <Input
                        value={gameFormData.awayTeam}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            awayTeam: e.target.value,
                          })
                        }
                        placeholder="Enter away team"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sport</Label>
                      <Select
                        value={gameFormData.sport}
                        onValueChange={(value) =>
                          setGameFormData({ ...gameFormData, sport: value })
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
                      <Label>League</Label>
                      <Input
                        value={gameFormData.league}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            league: e.target.value,
                          })
                        }
                        placeholder="Enter league name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={gameFormData.matchDate}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            matchDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={gameFormData.matchTime}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            matchTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Venue</Label>
                      <Input
                        value={gameFormData.venue}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            venue: e.target.value,
                          })
                        }
                        placeholder="Match venue"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={gameFormData.description}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Match description"
                        rows={3}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="enablePredictions"
                          checked={
                            gameFormData.predictionSettings?.enabled || false
                          }
                          onChange={(e) =>
                            setGameFormData({
                              ...gameFormData,
                              predictionSettings: {
                                ...gameFormData.predictionSettings,
                                enabled: e.target.checked,
                              },
                            })
                          }
                          className="rounded"
                        />
                        <Label htmlFor="enablePredictions">
                          Enable Predictions for this match
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddGameDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddGame}
                      className="bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                    >
                      Add Match
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Edit Match Dialog */}
              <Dialog
                open={isEditGameDialogOpen}
                onOpenChange={setIsEditGameDialogOpen}
              >
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Match</DialogTitle>
                    <DialogDescription>
                      Update match details and settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Home Team</Label>
                      <Input
                        value={gameFormData.homeTeam}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            homeTeam: e.target.value,
                          })
                        }
                        placeholder="Enter home team"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Away Team</Label>
                      <Input
                        value={gameFormData.awayTeam}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            awayTeam: e.target.value,
                          })
                        }
                        placeholder="Enter away team"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={gameFormData.status}
                        onValueChange={(value) =>
                          setGameFormData({
                            ...gameFormData,
                            status: value as any,
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
                          <SelectItem value="postponed">Postponed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Venue</Label>
                      <Input
                        value={gameFormData.venue}
                        onChange={(e) =>
                          setGameFormData({
                            ...gameFormData,
                            venue: e.target.value,
                          })
                        }
                        placeholder="Match venue"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="editEnablePredictions"
                          checked={
                            gameFormData.predictionSettings?.enabled || false
                          }
                          onChange={(e) =>
                            setGameFormData({
                              ...gameFormData,
                              predictionSettings: {
                                ...gameFormData.predictionSettings,
                                enabled: e.target.checked,
                              },
                            })
                          }
                          className="rounded"
                        />
                        <Label htmlFor="editEnablePredictions">
                          Enable Predictions for this match
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditGameDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdateGame}
                      className="bg-scoreguff-blue hover:bg-scoreguff-blue/90"
                    >
                      Update Match
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-2">
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
                        <TableHead>Predictions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {games.map((game) => (
                        <TableRow key={game.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {game.homeTeam} vs {game.awayTeam}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {game.sport}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{game.league}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <span className="text-sm">{game.matchDate}</span>
                              <br />
                              <span className="text-xs text-muted-foreground">
                                {game.matchTime}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                game.status === "live"
                                  ? "bg-green-500 text-white animate-pulse"
                                  : game.status === "upcoming"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-500 text-white"
                              }
                            >
                              {game.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {game.venue || "TBD"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  game.predictionSettings?.enabled || false
                                }
                                onChange={(e) =>
                                  handleTogglePrediction(
                                    game.id,
                                    e.target.checked,
                                  )
                                }
                                className="rounded"
                              />
                              <span className="text-sm">
                                {game.predictionSettings?.enabled
                                  ? "Enabled"
                                  : "Disabled"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditGame(game)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive"
                                onClick={() => deleteGame(game.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>

            <Card className="border-2">
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Joined: {user.joinedDate}
                              </div>
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
                              <div>
                                Comments: {Math.floor(Math.random() * 50)}
                              </div>
                              <div>
                                Articles Read: {Math.floor(Math.random() * 200)}
                              </div>
                              <div>Last Login: {user.lastLogin}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
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
          </TabsContent>

          {/* Predictions Management Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <h2 className="text-2xl font-bold">User Predictions</h2>

            <Card>
              <CardHeader>
                <CardTitle>All Predictions</CardTitle>
                <CardDescription>
                  View and manage user predictions across all matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {/* TODO: Replace with actual data */}
                          142
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Predictions
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                          89
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Correct Predictions
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                          62.7%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Success Rate
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Match</TableHead>
                          <TableHead>Prediction</TableHead>
                          <TableHead>Confidence</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Sample predictions - replace with real data */}
                        <TableRow>
                          <TableCell>
                            <div>
                              <div className="font-medium">Rajesh Shrestha</div>
                              <div className="text-sm text-muted-foreground">
                                rajesh@example.com
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">Nepal vs UAE</div>
                            <div className="text-sm text-muted-foreground">
                              ACC Premier Cup
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Home Win (180-165)</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">High</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-500">Pending</Badge>
                          </TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div>
                              <div className="font-medium">Priya Gurung</div>
                              <div className="text-sm text-muted-foreground">
                                priya@example.com
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              Kathmandu FC vs Pokhara
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Nepal Premier League
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Home Win (2-1)</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-500">Medium</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Won</Badge>
                          </TableCell>
                          <TableCell>+15</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Site Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure basic site information and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          siteName: e.target.value,
                        }))
                      }
                      placeholder="ScoreGuff"
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteTagline">Site Tagline</Label>
                    <Input
                      id="siteTagline"
                      value={siteSettings.siteTagline}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          siteTagline: e.target.value,
                        }))
                      }
                      placeholder="Nepal's Sports News Hub"
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteLogo">Site Logo URL</Label>
                    <Input
                      id="siteLogo"
                      value={siteSettings.siteLogo}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          siteLogo: e.target.value,
                        }))
                      }
                      placeholder="/logo.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={siteSettings.primaryColor}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          primaryColor: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={siteSettings.supportEmail}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          supportEmail: e.target.value,
                        }))
                      }
                      placeholder="support@scoreguff.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Configure social media links and integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={siteSettings.socialMedia.facebook}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            facebook: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://facebook.com/scoreguff"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={siteSettings.socialMedia.twitter}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            twitter: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://twitter.com/scoreguff"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={siteSettings.socialMedia.instagram}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            instagram: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://instagram.com/scoreguff"
                    />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
