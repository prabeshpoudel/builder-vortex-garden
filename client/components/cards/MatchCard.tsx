import { Link } from "react-router-dom";
import { Match } from "@/types/scoreguff";
import StatusBadge from "@/components/common/StatusBadge";

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={match.leagueLogo} className="h-8 w-8 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{match.leagueName}</p>
            <p className="text-xs text-slate-500">{match.matchType} • {match.matchNumber}</p>
          </div>
        </div>
        <StatusBadge status={match.status} />
      </div>
      <div className="mt-4 space-y-3">
        {[{ n: match.team1Name, l: match.team1Logo }, { n: match.team2Name, l: match.team2Logo }].map((t) => (
          <div className="flex items-center gap-3" key={t.n}>
            <img src={t.l} className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100" />
            <p className="font-bold">{t.n}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-600">{new Date(match.matchDateTime).toLocaleString()}</p>
      {match.result && <p className="mt-1 text-sm font-semibold text-emerald-600">{match.result}</p>}
      <Link to={`/matches/${match.id}`} className="mt-4 inline-block text-sm font-semibold text-blue-700">View Details →</Link>
    </div>
  );
}
