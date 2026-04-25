import { FormEvent, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/forms/Button";
import FormInput from "@/components/forms/FormInput";
import { useMatches } from "@/context/MatchContext";
import { Match } from "@/types/scoreguff";

const blank: Omit<Match, "id"> = { leagueName: "", leagueLogo: "", matchType: "", matchNumber: "", team1Name: "", team1Logo: "", team2Name: "", team2Logo: "", matchDateTime: "", status: "upcoming", result: "" };

export default function AdminMatchManagement() {
  const { matches, addMatch, updateMatch, deleteMatch } = useMatches();
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingId) updateMatch(editingId, form); else addMatch(form);
    setEditingId(null); setForm(blank);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage Matches</h1>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2">
        <FormInput label="League Name" value={form.leagueName} onChange={(e) => setForm({ ...form, leagueName: e.target.value })} required />
        <FormInput label="League Logo URL" value={form.leagueLogo} onChange={(e) => setForm({ ...form, leagueLogo: e.target.value })} required />
        <FormInput label="Match Type" value={form.matchType} onChange={(e) => setForm({ ...form, matchType: e.target.value })} required />
        <FormInput label="Match Number" value={form.matchNumber} onChange={(e) => setForm({ ...form, matchNumber: e.target.value })} required />
        <FormInput label="Team 1 Name" value={form.team1Name} onChange={(e) => setForm({ ...form, team1Name: e.target.value })} required />
        <FormInput label="Team 1 Logo URL" value={form.team1Logo} onChange={(e) => setForm({ ...form, team1Logo: e.target.value })} required />
        <FormInput label="Team 2 Name" value={form.team2Name} onChange={(e) => setForm({ ...form, team2Name: e.target.value })} required />
        <FormInput label="Team 2 Logo URL" value={form.team2Logo} onChange={(e) => setForm({ ...form, team2Logo: e.target.value })} required />
        <FormInput label="Match Date/Time" type="datetime-local" value={form.matchDateTime.slice(0,16)} onChange={(e) => setForm({ ...form, matchDateTime: new Date(e.target.value).toISOString() })} required />
        <label><span className="text-sm">Status</span><select className="w-full rounded-lg border px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Match["status"] })}><option value="upcoming">upcoming</option><option value="live">live</option><option value="completed">completed</option></select></label>
        <FormInput label="Result" value={form.result || ""} onChange={(e) => setForm({ ...form, result: e.target.value })} />
        <Button className="md:col-span-2">{editingId ? "Update Match" : "Add Match"}</Button>
      </form>
      <div className="mt-4 space-y-2">{matches.map((m) => <div key={m.id} className="flex items-center justify-between rounded-lg border bg-white p-3"><p>{m.team1Name} vs {m.team2Name} <span className="text-sm text-slate-500">({m.leagueName})</span></p><div className="space-x-2"><Button variant="outline" onClick={() => { setEditingId(m.id); setForm({ ...m }); }}>Edit</Button><Button variant="danger" onClick={() => deleteMatch(m.id)}>Delete</Button></div></div>)}</div>
    </AdminLayout>
  );
}
