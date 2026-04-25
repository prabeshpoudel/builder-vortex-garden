import { FormEvent, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/forms/Button";
import FormInput from "@/components/forms/FormInput";
import { usePredictions } from "@/context/PredictionContext";
import { useMatches } from "@/context/MatchContext";
import { PredictionMatch } from "@/types/scoreguff";

const blank: Omit<PredictionMatch, "id"> = {
  matchId: "",
  enabled: true,
  leagueName: "",
  leagueLogo: "",
  team1Name: "",
  team1Logo: "",
  team2Name: "",
  team2Logo: "",
  matchDateTime: "",
  deadline: "",
  status: "open",
  options: ["Team 1 win", "Team 2 win", "Draw"],
  correctResult: "",
};

export default function AdminPredictionManagement() {
  const { predictionMatches, addPredictionMatch, updatePredictionMatch, deletePredictionMatch } = usePredictions();
  const { matches } = useMatches();
  const [form, setForm] = useState(blank);

  const fromMatch = (id: string) => {
    const m = matches.find((x) => x.id === id);
    if (!m) return;
    setForm({ ...form, matchId: m.id, leagueName: m.leagueName, leagueLogo: m.leagueLogo, team1Name: m.team1Name, team1Logo: m.team1Logo, team2Name: m.team2Name, team2Logo: m.team2Logo, matchDateTime: m.matchDateTime, options: [`${m.team1Name} Win`, `${m.team2Name} Win`, "Draw"] });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addPredictionMatch(form);
    setForm(blank);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage Predictions</h1>
      <form className="mt-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2" onSubmit={onSubmit}>
        <label><span className="text-sm">Pick Existing Match</span><select className="w-full rounded-lg border px-3 py-2" onChange={(e) => fromMatch(e.target.value)}><option value="">Select match</option>{matches.map((m) => <option key={m.id} value={m.id}>{m.team1Name} vs {m.team2Name}</option>)}</select></label>
        <FormInput label="Prediction Deadline" type="datetime-local" value={form.deadline ? form.deadline.slice(0, 16) : ""} onChange={(e) => setForm({ ...form, deadline: new Date(e.target.value).toISOString() })} required />
        <FormInput label="League Name" value={form.leagueName} onChange={(e) => setForm({ ...form, leagueName: e.target.value })} required />
        <FormInput label="League Logo" value={form.leagueLogo} onChange={(e) => setForm({ ...form, leagueLogo: e.target.value })} required />
        <FormInput label="Team1 Name" value={form.team1Name} onChange={(e) => setForm({ ...form, team1Name: e.target.value })} required />
        <FormInput label="Team1 Logo" value={form.team1Logo} onChange={(e) => setForm({ ...form, team1Logo: e.target.value })} required />
        <FormInput label="Team2 Name" value={form.team2Name} onChange={(e) => setForm({ ...form, team2Name: e.target.value })} required />
        <FormInput label="Team2 Logo" value={form.team2Logo} onChange={(e) => setForm({ ...form, team2Logo: e.target.value })} required />
        <FormInput label="Match Date/Time" type="datetime-local" value={form.matchDateTime ? form.matchDateTime.slice(0, 16) : ""} onChange={(e) => setForm({ ...form, matchDateTime: new Date(e.target.value).toISOString() })} required />
        <FormInput label="Options (comma separated)" value={form.options.join(", ")} onChange={(e) => setForm({ ...form, options: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} />
        <Button className="md:col-span-2">Create Prediction</Button>
      </form>

      <div className="mt-4 space-y-2">{predictionMatches.map((p) => (
        <div key={p.id} className="rounded-lg border bg-white p-3">
          <div className="flex items-center justify-between"><p className="font-semibold">{p.team1Name} vs {p.team2Name}</p><div className="space-x-2"><Button variant="outline" onClick={() => updatePredictionMatch(p.id, { enabled: !p.enabled })}>{p.enabled ? "Disable" : "Enable"}</Button><Button variant="outline" onClick={() => updatePredictionMatch(p.id, { status: p.status === "open" ? "closed" : "open" })}>{p.status === "open" ? "Close" : "Open"}</Button><Button variant="danger" onClick={() => deletePredictionMatch(p.id)}>Delete</Button></div></div>
          <div className="mt-2 grid gap-2 md:grid-cols-2"><label className="text-sm">Correct result<select className="ml-2 rounded border p-1" value={p.correctResult || ""} onChange={(e) => updatePredictionMatch(p.id, { correctResult: e.target.value, status: "completed" })}><option value="">Select</option>{p.options.map((o) => <option key={o} value={o}>{o}</option>)}</select></label><p className="text-sm text-slate-500">Status: {p.status} • Deadline: {new Date(p.deadline).toLocaleString()}</p></div>
        </div>
      ))}</div>
    </AdminLayout>
  );
}
