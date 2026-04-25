import { Link, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useNews } from "@/context/NewsContext";

export default function NewsDetails() {
  const { id = "" } = useParams();
  const { articles, getById } = useNews();
  const article = getById(id);
  if (!article) return <MainLayout><p>Article not found.</p></MainLayout>;
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <MainLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <article className="rounded-2xl border bg-white p-6">
          <img src={article.image} className="mb-4 h-72 w-full rounded-xl object-cover" />
          <p className="text-sm font-semibold text-red-600">{article.category}</p>
          <h1 className="mt-2 text-3xl font-bold">{article.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{new Date(article.date).toLocaleDateString()} • {article.author}</p>
          <p className="mt-5 leading-7 text-slate-700">{article.content}</p>
        </article>
        <aside className="rounded-2xl border bg-white p-4">
          <h3 className="text-lg font-bold">Related News</h3>
          <div className="mt-3 space-y-3">
            {related.map((r) => <Link key={r.id} className="block rounded-lg p-2 hover:bg-slate-50" to={`/news/${r.id}`}><p className="font-semibold">{r.title}</p><p className="text-xs text-slate-500">{r.category}</p></Link>)}
          </div>
        </aside>
      </div>
    </MainLayout>
  );
}
