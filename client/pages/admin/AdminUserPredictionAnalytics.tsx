import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/forms/Button";
import { usePredictions } from "@/context/PredictionContext";

export default function AdminUserPredictionAnalytics() {
  const { predictionMatches, userPredictions, clearPredictions } = usePredictions();
  const [matchFilter, setMatchFilter] = useState("");
  const [optionFilter, setOptionFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("all");

  const filtered = useMemo(() => userPredictions.filter((u) => (!matchFilter || u.predictionMatchId === matchFilter) && (!optionFilter || u.selectedOption === optionFilter) && (resultFilter === "all" || (resultFilter === "correct" ? u.isCorrect === true : u.isCorrect === false))), [userPredictions, matchFilter, optionFilter, resultFilter]);

  const selectedPrediction = predictionMatches.find((p) => p.id === matchFilter) || predictionMatches[0];
  const rows = selectedPrediction?.options.map((opt) => {
    const count = filtered.filter((f) => f.predictionMatchId === selectedPrediction.id && f.selectedOption === opt).length;
    const total = filtered.filter((f) => f.predictionMatchId === selectedPrediction.id).length || 1;
    return { opt, count, percent: Math.round((count / total) * 100) };
  }) || [];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">User Prediction Responses</h1><Button variant="danger" onClick={clearPredictions}>Clear Test Data</Button></div>
      <div className="mt-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-3">
        <label>Match<select className="mt-1 w-full rounded border p-2" value={matchFilter} onChange={(e) => setMatchFilter(e.target.value)}><option value="">All</option>{predictionMatches.map((p) => <option key={p.id} value={p.id}>{p.team1Name} vs {p.team2Name}</option>)}</select></label>
        <label>Option<select className="mt-1 w-full rounded border p-2" value={optionFilter} onChange={(e) => setOptionFilter(e.target.value)}><option value="">All</option>{(selectedPrediction?.options || []).map((o) => <option key={o}>{o}</option>)}</select></label>
        <label>Correctness<select className="mt-1 w-full rounded border p-2" value={resultFilter} onChange={(e) => setResultFilter(e.target.value)}><option value="all">All</option><option value="correct">Correct</option><option value="incorrect">Incorrect</option></select></label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">{rows.map((r) => <div key={r.opt} className="rounded-xl border bg-white p-4"><p className="font-semibold">{r.opt}</p><p className="mt-1 text-sm text-slate-500">{r.count} votes, {r.percent}%</p><div className="mt-2 h-2 rounded bg-slate-100"><div className="h-2 rounded bg-blue-700" style={{ width: `${r.percent}%` }} /></div></div>)}</div>

      <div className="mt-4 rounded-xl border bg-white p-4">
        <h2 className="font-bold">Individual Responses</h2>
        {filtered.map((f) => <div key={f.id} className="mt-2 flex items-center justify-between border-b py-2 text-sm"><span>{f.userName}</span><span>{f.selectedOption}</span><span>{new Date(f.submittedAt).toLocaleString()}</span><span>{f.isCorrect === undefined ? "Pending" : f.isCorrect ? "Correct" : "Incorrect"}</span></div>)}
      </div>
    </AdminLayout>
  );
}
