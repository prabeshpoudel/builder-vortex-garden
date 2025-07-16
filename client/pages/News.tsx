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
import { Link } from "react-router-dom";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Sports" },
    { value: "nepal-cricket", label: "🇳🇵 Nepal Cricket" },
    { value: "nepal-football", label: "🇳🇵 Nepal Football" },
    { value: "cricket", label: "🏏 International Cricket" },
    { value: "football", label: "⚽ International Football" },
    { value: "basketball", label: "🏀 Basketball" },
    { value: "tennis", label: "🎾 Tennis" },
    { value: "volleyball", label: "🏐 Volleyball" },
  ];

  const featuredNews = [
    {
      id: 1,
      title:
        "Nepal Cricket Team Gears Up for ACC Premier Cup: Exclusive Preview",
      slug: "nepal-cricket-team-announces-squad-acc-premier-cup",
      excerpt:
        "Captain Rohit Paudel leads a strong 15-member squad as Nepal prepares for the most important regional tournament of the year...",
      image: "/placeholder.svg",
      category: "Nepal Cricket",
      author: "Rajesh Shrestha",
      publishedAt: "1 hour ago",
      readTime: "6 min read",
      trending: true,
      isNepal: true,
    },
    {
      id: 2,
      title: "Premier League: City vs Liverpool - AI Prediction Analysis",
      slug: "premier-league-title-race-manchester-city-arsenal-analysis",
      excerpt:
        "Our advanced algorithms show 92% confidence in over 2.5 goals for this weekend's title-deciding clash at the Etihad...",
      image: "/placeholder.svg",
      category: "International Football",
      author: "Priya Gurung",
      publishedAt: "3 hours ago",
      readTime: "4 min read",
      trending: true,
      isNepal: false,
    },
  ];

  const recentNews = [
    {
      id: 3,
      title: "Nepal Premier League 2024: Complete Team Analysis",
      slug: "nepal-premier-league-2024-complete-season-preview",
      excerpt:
        "Detailed breakdown of all 8 teams competing in this year's Nepal Premier League, including key players and predictions...",
      image: "/placeholder.svg",
      category: "Nepal Football",
      author: "Amit Rai",
      publishedAt: "5 hours ago",
      readTime: "8 min read",
      isNepal: true,
    },
    {
      id: 4,
      title: "SAFF Championship: Nepal's Road to Glory",
      slug: "saff-championship-nepal-road-to-glory",
      excerpt:
        "Nepal national football team's preparation and strategy for the upcoming SAFF Championship in Maldives...",
      image: "/placeholder.svg",
      category: "Nepal Football",
      author: "Sita Tamang",
      publishedAt: "7 hours ago",
      readTime: "5 min read",
      isNepal: true,
    },
    {
      id: 5,
      title: "IPL 2024: Top Nepali Players to Watch",
      slug: "ipl-2024-top-nepali-players-to-watch",
      excerpt:
        "Sandeep Lamichhane and other Nepali talents making waves in the Indian Premier League this season...",
      image: "/placeholder.svg",
      category: "Cricket",
      author: "Binod Thapa",
      publishedAt: "10 hours ago",
      readTime: "6 min read",
      isNepal: true,
    },
    {
      id: 6,
      title: "Champions League Quarter-Finals: AI Predictions",
      slug: "champions-league-quarter-finals-ai-predictions",
      excerpt:
        "Machine learning analysis of the remaining 8 teams and their chances of reaching the final in Istanbul...",
      image: "/placeholder.svg",
      category: "International Football",
      author: "Maria Santos",
      publishedAt: "14 hours ago",
      readTime: "7 min read",
      isNepal: false,
    },
    {
      id: 7,
      title: "Volleyball: Nepal Women's Team Asian Championship Prep",
      slug: "volleyball-nepal-women-team-asian-championship-prep",
      excerpt:
        "Nepal women's volleyball team intensifies training for the Asian Championship with new coach and strategy...",
      image: "/placeholder.svg",
      category: "Volleyball",
      author: "Sunita Rai",
      publishedAt: "1 day ago",
      readTime: "4 min read",
      isNepal: true,
    },
    {
      id: 8,
      title: "Tennis: Australian Open Nepal Connection",
      slug: "tennis-australian-open-nepal-connection",
      excerpt:
        "How Nepal's tennis development programs are inspiring the next generation of players...",
      image: "/placeholder.svg",
      category: "Tennis",
      author: "Kumar Lama",
      publishedAt: "2 days ago",
      readTime: "5 min read",
      isNepal: true,
    },
  ];

  const getCategoryColor = (category: string, isNepal: boolean = false) => {
    if (isNepal) {
      return "bg-red-600"; // Nepal flag color
    }
    const colors: Record<string, string> = {
      "Nepal Cricket": "bg-red-600",
      "Nepal Football": "bg-red-600",
      "International Football": "bg-scoreguff-blue",
      "International Cricket": "bg-scoreguff-green",
      Basketball: "bg-orange-500",
      Tennis: "bg-purple-500",
      Volleyball: "bg-blue-500",
      Cricket: "bg-scoreguff-green",
      Football: "bg-scoreguff-blue",
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
            नेपाली र अन्तर्राष्ट्रिय खेलकुदका ताजा समाचार र विश्लेषण
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Latest Nepal and international sports news, insights & predictions
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
                    className={`absolute top-3 left-3 ${getCategoryColor(article.category, article.isNepal)} text-white`}
                  >
                    {article.isNepal
                      ? `🇳🇵 ${article.category}`
                      : `🌍 ${article.category}`}
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
                    className={`absolute top-2 left-2 ${getCategoryColor(article.category, article.isNepal)} text-white text-xs`}
                  >
                    {article.isNepal
                      ? `🇳🇵 ${article.category}`
                      : `🌍 ${article.category}`}
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
