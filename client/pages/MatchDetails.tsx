import { Link, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { useMatches } from "@/context/MatchContext";
import { usePredictions } from "@/context/PredictionContext";

export default function MatchDetails() {
  const { id = "" } = useParams();
  const { getById } = useMatches();
  const { predictionMatches } = usePredictions();
  const match = getById(id);

  if (!match) return <MainLayout><p>Match not found.</p></MainLayout>;
  const prediction = predictionMatches.find((p) => p.matchId === match.id && p.enabled);

  return (
    <MainLayout>
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><img src={match.leagueLogo} className="h-10 w-10 rounded-full" /><h1 className="text-2xl font-bold">{match.leagueName}</h1></div>
          <StatusBadge status={match.status} />
        </div>
        <p className="mt-2 text-slate-600">{match.matchType} • {match.matchNumber} • {new Date(match.matchDateTime).toLocaleString()}</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[{ n: match.team1Name, l: match.team1Logo }, { n: match.team2Name, l: match.team2Logo }].map((t) => (
            <div key={t.n} className="rounded-xl bg-slate-50 p-4 text-center"><img src={t.l} className="mx-auto h-16 w-16 rounded-full" /><p className="mt-2 text-lg font-bold">{t.n}</p></div>
          ))}
        </div>
        {match.result && <p className="mt-4 font-semibold text-emerald-600">Result: {match.result}</p>}
        {prediction && <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="font-semibold">Prediction available for this match.</p><Link to="/predictions" className="text-blue-700">Go predict →</Link></div>}
      </div>
    </MainLayout>
  );
}
