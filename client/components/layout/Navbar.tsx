import { Link, NavLink } from "react-router-dom";
import { Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/forms/Button";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
          <Trophy className="text-red-500" /> ScoreGuff
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
          {["/", "/matches", "/predictions", "/news"].map((path, i) => (
            <NavLink key={path} to={path} className={({ isActive }) => (isActive ? "text-red-400" : "text-slate-200 hover:text-white")}>
              {["Home", "Matches", "Predictions", "News"][i]}
            </NavLink>
          ))}
          {isAdmin && <NavLink to="/admin" className="text-slate-200 hover:text-white">Admin Dashboard</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:block text-sm">Hi, {user.name}</span>
              <Button variant="secondary" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="outline" className="border-slate-500 text-white hover:bg-slate-800">Login</Button></Link>
              <Link to="/signup"><Button>Signup</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
