import { NavLink } from "react-router-dom";

const links = [
  ["/admin", "Dashboard Overview"],
  ["/admin/matches", "Manage Matches"],
  ["/admin/predictions", "Manage Predictions"],
  ["/admin/user-predictions", "User Predictions"],
  ["/admin/news", "Manage News"],
  ["/admin/settings", "Settings"],
];

export default function AdminSidebar() {
  return (
    <aside className="rounded-2xl bg-slate-900 p-4 text-slate-200">
      <h3 className="mb-4 font-bold text-white">Admin Panel</h3>
      <div className="space-y-1">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/admin"} className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-blue-700 text-white" : "hover:bg-slate-800"}`}>
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
