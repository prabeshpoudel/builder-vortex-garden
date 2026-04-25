import { FormEvent, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/forms/Button";
import { useNews } from "@/context/NewsContext";

const blank = { title: "", category: "", image: "", shortDescription: "", content: "", date: "", author: "" };

export default function AdminNewsManagement() {
  const { articles, addArticle, updateArticle, deleteArticle } = useNews();
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...form, date: form.date || new Date().toISOString() };
    if (editId) updateArticle(editId, payload); else addArticle(payload);
    setEditId(null); setForm(blank);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage News</h1>
      <form onSubmit={submit} className="mt-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2">
        <FormInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <FormInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <FormInput label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <FormInput label="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
        <FormInput label="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required />
        <FormInput label="Date" type="date" value={form.date.slice(0, 10)} onChange={(e) => setForm({ ...form, date: new Date(e.target.value).toISOString() })} />
        <label className="md:col-span-2"><span className="text-sm">Full Content</span><textarea className="w-full rounded-lg border px-3 py-2" rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></label>
        <Button className="md:col-span-2">{editId ? "Update News" : "Add News"}</Button>
      </form>
      <div className="mt-4 space-y-2">{articles.map((a) => <div key={a.id} className="flex items-center justify-between rounded-lg border bg-white p-3"><p>{a.title}</p><div className="space-x-2"><Button variant="outline" onClick={() => { setEditId(a.id); setForm({ ...a }); }}>Edit</Button><Button variant="danger" onClick={() => deleteArticle(a.id)}>Delete</Button></div></div>)}</div>
    </AdminLayout>
  );
}
