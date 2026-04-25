import AdminLayout from "@/components/admin/AdminLayout";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import { useMatches } from "@/context/MatchContext";
import { usePredictions } from "@/context/PredictionContext";

export default function AdminDashboard() {
  const { matches } = useMatches();
  const { predictionMatches, userPredictions } = usePredictions();

  const stats = [
    ["Total Matches", matches.length],
    ["Upcoming", matches.filter((m) => m.status === "upcoming").length],
    ["Live", matches.filter((m) => m.status === "live").length],
    ["Completed", matches.filter((m) => m.status === "completed").length],
    ["Prediction Matches", predictionMatches.length],
    ["User Predictions", userPredictions.length],
  ] as const;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(([title, value]) => <AdminStatsCard key={title} title={title} value={value} />)}
      </div>
      <div className="mt-6 rounded-xl border bg-white p-4">
        <h2 className="font-bold">Latest prediction activity</h2>
        {userPredictions.slice(-5).reverse().map((p) => <p key={p.id} className="mt-2 text-sm text-slate-600">{p.userName} predicted <b>{p.selectedOption}</b> at {new Date(p.submittedAt).toLocaleString()}</p>)}
      </div>
    </AdminLayout>
  );
}
