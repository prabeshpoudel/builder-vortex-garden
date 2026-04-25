import MainLayout from "@/components/layout/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="rounded-xl border bg-white p-10 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-slate-600">Page not found.</p>
      </div>
    </MainLayout>
  );
}
