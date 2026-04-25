import { useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MatchCard from "@/components/cards/MatchCard";
import { useMatches } from "@/context/MatchContext";

export default function Matches() {
  const { matches } = useMatches();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => matches.filter((m) => `${m.team1Name} ${m.team2Name} ${m.leagueName}`.toLowerCase().includes(q.toLowerCase())), [q, matches]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Matches</h1>
        <input className="w-72 rounded-lg border px-3 py-2" placeholder="Search team or league..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map((m) => <MatchCard key={m.id} match={m} />)}</div>
    </MainLayout>
  );
}
