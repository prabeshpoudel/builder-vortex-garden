import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  TrendingUp,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";
import { useState } from "react";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Sports" },
    { value: "football", label: "Football" },
    { value: "basketball", label: "Basketball" },
    { value: "soccer", label: "Soccer" },
    { value: "baseball", label: "Baseball" },
    { value: "hockey", label: "Hockey" },
    { value: "tennis", label: "Tennis" },
  ];

  const featuredNews = [
    {
      id: 1,
      title:
        "NFL Championship Predictions: AI Analysis Shows Surprising Favorites",
      excerpt:
        "Our advanced machine learning models have analyzed over 10,000 data points to predict this year's most likely championship contenders...",
      image: "/placeholder.svg",
      category: "Football",
      author: "Mike Rodriguez",
      publishedAt: "2 hours ago",
      readTime: "5 min read",
      trending: true,
    },
    {
      id: 2,
      title: "March Madness Bracket: 87% Accuracy Rate Achieved",
      excerpt:
        "ScoreGuff's AI predictions achieved an unprecedented 87% accuracy rate in last year's tournament bracket predictions...",
      image: "/placeholder.svg",
      category: "Basketball",
      author: "Sarah Chen",
      publishedAt: "4 hours ago",
      readTime: "3 min read",
      trending: true,
    },
  ];

  const recentNews = [
    {
      id: 3,
      title: "Premier League Transfer Window: Impact on Betting Odds",
      excerpt:
        "Analyzing how recent transfers are affecting team performance predictions and betting markets...",
      image: "/placeholder.svg",
      category: "Soccer",
      author: "David Johnson",
      publishedAt: "6 hours ago",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "MLB Season Preview: Dark Horse Teams to Watch",
      excerpt:
        "Our data scientists identify undervalued teams with high potential for unexpected success this season...",
      image: "/placeholder.svg",
      category: "Baseball",
      author: "Lisa Wang",
      publishedAt: "8 hours ago",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Tennis Grand Slam Predictions: Statistical Breakdown",
      excerpt:
        "Deep dive into player performance metrics and court surface analytics for upcoming tournaments...",
      image: "/placeholder.svg",
      category: "Tennis",
      author: "Alex Thompson",
      publishedAt: "12 hours ago",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "NHL Playoffs: Advanced Metrics vs Traditional Stats",
      excerpt:
        "Comparing the effectiveness of traditional hockey statistics against advanced analytics in prediction accuracy...",
      image: "/placeholder.svg",
      category: "Hockey",
      author: "John Smith",
      publishedAt: "1 day ago",
      readTime: "5 min read",
    },
    {
      id: 7,
      title: "Fantasy Sports Integration: Maximizing Your Returns",
      excerpt:
        "How to leverage ScoreGuff's predictions for fantasy sports success and increased profitability...",
      image: "/placeholder.svg",
      category: "Fantasy",
      author: "Emma Davis",
      publishedAt: "1 day ago",
      readTime: "4 min read",
    },
    {
      id: 8,
      title: "Olympic Sports Betting: Emerging Opportunities",
      excerpt:
        "Exploring betting opportunities in lesser-known Olympic sports with high prediction accuracy potential...",
      image: "/placeholder.svg",
      category: "Olympics",
      author: "Chris Lee",
      publishedAt: "2 days ago",
      readTime: "6 min read",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Football: "bg-scoreguff-blue",
      Basketball: "bg-scoreguff-green",
      Soccer: "bg-scoreguff-gold",
      Baseball: "bg-red-500",
      Hockey: "bg-blue-600",
      Tennis: "bg-purple-500",
      Fantasy: "bg-pink-500",
      Olympics: "bg-indigo-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
              Sports News
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest sports insights, predictions, and
            analysis from our expert team
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 h-11">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-scoreguff-blue" />
            <h2 className="text-2xl font-bold">Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((article) => (
              <Card
                key={article.id}
                className="border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  {article.trending && (
                    <Badge className="absolute top-3 right-3 bg-scoreguff-gold">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <Badge
                    className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white`}
                  >
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl leading-tight hover:text-scoreguff-blue transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.publishedAt}
                      </div>
                    </div>
                    <span className="text-scoreguff-blue">
                      {article.readTime}
                    </span>
                  </div>
                  <Button className="w-full bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-scoreguff-blue" />
            <h2 className="text-2xl font-bold">Recent Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentNews.map((article) => (
              <Card
                key={article.id}
                className="border-2 hover:border-scoreguff-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-scoreguff-blue/20 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className={`absolute top-2 left-2 ${getCategoryColor(article.category)} text-white text-xs`}
                  >
                    {article.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-tight hover:text-scoreguff-blue transition-colors cursor-pointer line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{article.author}</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-scoreguff-blue">
                      {article.readTime}
                    </span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white"
          >
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;
