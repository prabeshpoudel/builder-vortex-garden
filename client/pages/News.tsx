import MainLayout from "@/components/layout/MainLayout";
import NewsCard from "@/components/cards/NewsCard";
import { useNews } from "@/context/NewsContext";

export default function News() {
  const { articles } = useNews();
  const featured = articles[0];

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Sports News</h1>
      {featured && (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
          <img src={featured.image} className="h-64 w-full object-cover" />
          <div className="p-5"><p className="text-sm font-semibold text-red-600">Featured • {featured.category}</p><h2 className="mt-2 text-2xl font-bold">{featured.title}</h2><p className="mt-2 text-slate-600">{featured.shortDescription}</p></div>
        </div>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articles.map((a) => <NewsCard key={a.id} article={a} />)}</div>
    </MainLayout>
  );
}
