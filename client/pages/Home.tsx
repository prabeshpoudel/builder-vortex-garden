import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useMatches } from "@/context/MatchContext";
import { usePredictions } from "@/context/PredictionContext";
import { useNews } from "@/context/NewsContext";
import MatchCard from "@/components/cards/MatchCard";
import NewsCard from "@/components/cards/NewsCard";
import Button from "@/components/forms/Button";

export default function Home() {
  const { matches } = useMatches();
  const { predictionMatches } = usePredictions();
  const { articles } = useNews();
  return (
    <MainLayout>
      <section className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 p-10 text-white">
        <p className="text-sm uppercase tracking-wider">ScoreGuff</p>
        <h1 className="mt-3 text-4xl font-black">Predict the Game. Feel the Score.</h1>
        <p className="mt-3 max-w-2xl text-blue-100">Live matches, sharp predictions, and breaking sports headlines in one modern platform.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/predictions"><Button>View Predictions</Button></Link>
          <Link to="/matches"><Button variant="secondary">Explore Matches</Button></Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Featured Upcoming Matches</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{matches.filter((m) => m.status !== "completed").slice(0, 3).map((m) => <MatchCard key={m.id} match={m} />)}</div>
      </section>

      <section className="mt-10 rounded-2xl border bg-white p-6">
        <h2 className="text-2xl font-bold">Featured Predictions</h2>
        <p className="mt-2 text-slate-600">{predictionMatches.filter((p) => p.enabled).length} prediction-enabled matches live now.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articles.slice(0, 3).map((a) => <NewsCard key={a.id} article={a} />)}</div>
      </section>
    </MainLayout>
  );
}
