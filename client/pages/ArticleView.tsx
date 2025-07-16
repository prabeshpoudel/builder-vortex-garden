import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Calendar,
  User,
  Tag,
  Globe,
  MapPin,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
  author: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "featured";
  isPinned: boolean;
  isTrending: boolean;
  isBreaking: boolean;
  views: number;
  likes: number;
  comments: number;
  imageUrl?: string;
  tags: string[];
  isNepal: boolean;
  readTime: number;
  seoMetadata: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isEdited: boolean;
  status: "active" | "hidden" | "deleted";
}

const ArticleView = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles?slug=${slug}`);
        if (!response.ok) throw new Error("Article not found");

        const data = await response.json();
        const foundArticle = data.articles?.find(
          (a: Article) => a.slug === slug,
        );

        if (!foundArticle) {
          navigate("/404");
          return;
        }

        setArticle(foundArticle);

        // Fetch comments for this article
        // For now, using mock data since we don't have comment API yet
        setComments([]);
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, navigate]);

  const handleLike = async () => {
    if (!isAuthenticated || !article) return;

    setIsLiked(!isLiked);
    // TODO: Implement like API call
  };

  const handleBookmark = async () => {
    if (!isAuthenticated || !article) return;

    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark API call
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const handleCommentSubmit = async () => {
    if (!isAuthenticated || !newComment.trim() || !article) return;

    // TODO: Implement comment submission API
    setNewComment("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scoreguff-blue mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Article Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          {article.imageUrl && (
            <div className="aspect-video w-full">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge
                variant="secondary"
                className={`${article.isNepal ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
              >
                {article.isNepal ? "🇳🇵" : "🌍"} {article.category}
              </Badge>

              {article.isBreaking && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  🚨 BREAKING
                </Badge>
              )}

              {article.isTrending && (
                <Badge className="bg-orange-500 text-white">🔥 TRENDING</Badge>
              )}

              {article.isPinned && (
                <Badge className="bg-purple-500 text-white">📌 PINNED</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title || "Untitled"}
            </h1>

            {/* Article Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {article.author || "Unknown Author"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(article.publishedAt || new Date().toISOString())}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime || 0} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{(article.views || 0).toLocaleString()} views</span>
              </div>
            </div>

            {/* Article Actions */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                disabled={!isAuthenticated}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
                {article.likes || 0} Likes
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>

              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
                disabled={!isAuthenticated}
              >
                <Bookmark
                  className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-slate-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: (article.content || "").replace(/\n/g, "<br />"),
                }}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">
                    Tags:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(article.tags || []).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Comments ({article.comments || 0})
          </h3>

          {/* Add Comment */}
          {isAuthenticated ? (
            <div className="mb-8">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-scoreguff-gradient text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-4"
                  />
                  <Button
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-4 bg-slate-50 rounded-lg text-center">
              <p className="text-slate-600 mb-4">
                Please sign in to leave a comment
              </p>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.userAvatar}
                      alt={comment.userName}
                    />
                    <AvatarFallback className="bg-slate-200 text-slate-600">
                      {comment.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-2">{comment.content}</p>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Heart className="mr-1 h-3 w-3" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
