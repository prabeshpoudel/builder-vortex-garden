import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-600">Mock settings area for ScoreGuff admin controls.</p>
      </div>
    </AdminLayout>
  );
}
