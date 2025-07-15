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
  Bookmark,
  TrendingUp,
  Eye,
  MessageCircle,
  Calendar,
  Trophy,
  Newspaper,
  Star,
  Clock,
  ThumbsUp,
  Share2,
  Heart,
  User,
} from "lucide-react";

const Dashboard = () => {
  const newsStats = [
    {
      title: "Articles Read",
      value: "127",
      change: "+23 this week",
      icon: Eye,
    },
    {
      title: "Saved Articles",
      value: "45",
      change: "+8 new saves",
      icon: Bookmark,
    },
    {
      title: "Comments Posted",
      value: "28",
      change: "+5 this week",
      icon: MessageCircle,
    },
    { title: "Categories Following", value: "6", change: "2 new", icon: Star },
  ];

  const savedArticles = [
    {
      title: "Nepal Cricket Team Prepares for ACC Premier Cup",
      category: "Cricket",
      author: "Rajesh Shrestha",
      savedAt: "2 days ago",
      readTime: "5 min read",
      isNepal: true,
    },
    {
      title: "Champions League: Quarter-Final Analysis",
      category: "Football",
      author: "Maria Santos",
      savedAt: "4 days ago",
      readTime: "7 min read",
      isNepal: false,
    },
    {
      title: "Nepal Premier League 2024: Complete Preview",
      category: "Football",
      author: "Priya Gurung",
      savedAt: "1 week ago",
      readTime: "8 min read",
      isNepal: true,
    },
  ];

  const subscribedCategories = [
    {
      name: "Nepal Cricket",
      articleCount: 23,
      unreadCount: 5,
      trending: true,
      color: "bg-green-500",
      icon: "🏏",
    },
    {
      name: "Nepal Football",
      articleCount: 18,
      unreadCount: 3,
      trending: false,
      color: "bg-red-500",
      icon: "⚽",
    },
    {
      name: "International Football",
      articleCount: 45,
      unreadCount: 12,
      trending: true,
      color: "bg-blue-500",
      icon: "🌍",
    },
    {
      name: "Basketball",
      articleCount: 12,
      unreadCount: 2,
      trending: false,
      color: "bg-orange-500",
      icon: "🏀",
    },
    {
      name: "Tennis",
      articleCount: 8,
      unreadCount: 1,
      trending: false,
      color: "bg-purple-500",
      icon: "🎾",
    },
    {
      name: "Nepal Sports General",
      articleCount: 31,
      unreadCount: 7,
      trending: true,
      color: "bg-indigo-500",
      icon: "🏆",
    },
  ];

  const mostReadThisWeek = [
    {
      title: "Nepal vs UAE Cricket Match Analysis",
      category: "Cricket",
      views: "12.5k",
      author: "Amit Rai",
      publishedAt: "3 days ago",
      trending: true,
      isNepal: true,
    },
    {
      title: "SAFF Championship: Nepal's Journey",
      category: "Football",
      views: "8.9k",
      author: "Sita Tamang",
      publishedAt: "2 days ago",
      trending: true,
      isNepal: true,
    },
    {
      title: "Premier League Title Race Heats Up",
      category: "Football",
      views: "7.2k",
      author: "David Wilson",
      publishedAt: "1 day ago",
      trending: false,
      isNepal: false,
    },
    {
      title: "Nepal Olympic Preparations Update",
      category: "Olympics",
      views: "6.8k",
      author: "Binod Thapa",
      publishedAt: "4 days ago",
      trending: false,
      isNepal: true,
    },
  ];

  const myComments = [
    {
      article: "Nepal Cricket Team Squad Selection",
      comment: "Great to see young talents getting opportunities...",
      likes: 12,
      replies: 3,
      postedAt: "2 hours ago",
    },
    {
      article: "NSL Final Preview",
      comment: "Kathmandu FC has been dominant this season...",
      likes: 8,
      replies: 1,
      postedAt: "1 day ago",
    },
    {
      article: "Champions League Quarter-Finals",
      comment: "Man City looks unstoppable this year...",
      likes: 15,
      replies: 5,
      postedAt: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent mb-2">
              News Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Your personalized sports news hub
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
              <Newspaper className="h-4 w-4 mr-2" />
              Browse News
            </Button>
          </div>
        </div>

        {/* News Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newsStats.map((stat, index) => (
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
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Articles */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-scoreguff-blue" />
                  Saved Articles
                </CardTitle>
                <CardDescription>
                  Articles you've bookmarked for later reading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedArticles.map((article, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`${article.isNepal ? "bg-red-600" : "bg-scoreguff-blue"} text-white text-xs`}
                          >
                            {article.isNepal ? "🇳🇵 Nepal" : "🌍 International"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>By {article.author}</span>
                          <span>{article.readTime}</span>
                          <span>Saved {article.savedAt}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Saved Articles
                </Button>
              </CardContent>
            </Card>

            {/* Most Read This Week */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-scoreguff-blue" />
                  Most Read This Week
                </CardTitle>
                <CardDescription>
                  Popular articles among ScoreGuff readers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostReadThisWeek.map((article, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-scoreguff-blue">
                            #{index + 1}
                          </span>
                          <Badge
                            className={`${article.isNepal ? "bg-red-600" : "bg-scoreguff-blue"} text-white text-xs`}
                          >
                            {article.isNepal ? "🇳🇵" : "🌍"}
                          </Badge>
                          {article.trending && (
                            <Badge className="bg-orange-500 text-white text-xs">
                              🔥 TRENDING
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>By {article.author}</span>
                          <span>{article.publishedAt}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscribed Categories */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-scoreguff-blue" />
                  Subscribed Categories
                </CardTitle>
                <CardDescription>
                  Your personalized news categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subscribedCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">
                              {category.name}
                            </h4>
                            {category.trending && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                🔥
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {category.articleCount} articles
                          </p>
                        </div>
                      </div>
                      {category.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {category.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Manage Categories
                </Button>
              </CardContent>
            </Card>

            {/* My Comments & Likes */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-scoreguff-blue" />
                  My Comments & Likes
                </CardTitle>
                <CardDescription>
                  Your recent activity and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myComments.map((comment, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <h5 className="font-medium text-sm mb-1">
                        {comment.article}
                      </h5>
                      <p className="text-xs text-muted-foreground mb-2 italic">
                        "{comment.comment}"
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{comment.postedAt}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{comment.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{comment.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
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
