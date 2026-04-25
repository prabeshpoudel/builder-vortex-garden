import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/forms/Button";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@scoreguff.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) return setError(res.error || "Login failed");
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Login to ScoreGuff</h1>
        <p className="text-sm text-slate-500">Use admin@scoreguff.com / admin123 for admin demo.</p>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button className="w-full" type="submit">Login</Button>
        </form>
        <p className="mt-4 text-sm">New here? <Link className="text-blue-700" to="/signup">Create account</Link></p>
      </div>
    </MainLayout>
  );
}
