import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </MainLayout>
  );
}
