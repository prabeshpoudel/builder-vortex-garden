import { Link } from "react-router-dom";
import { NewsArticle } from "@/types/scoreguff";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={article.image} className="h-44 w-full object-cover" />
      <div className="p-4">
        <p className="text-xs font-semibold uppercase text-red-600">{article.category}</p>
        <h3 className="mt-2 text-lg font-bold">{article.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{article.shortDescription}</p>
        <p className="mt-3 text-xs text-slate-500">{new Date(article.date).toLocaleDateString()}</p>
        <Link to={`/news/${article.id}`} className="mt-3 inline-block text-sm font-semibold text-blue-700">Read more →</Link>
      </div>
    </div>
  );
}
