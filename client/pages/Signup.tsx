import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/forms/Button";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = signup(name, email, password);
    if (!res.ok) return setError(res.error || "Signup failed");
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Create ScoreGuff account</h1>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button className="w-full" type="submit">Signup</Button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <Link className="text-blue-700" to="/login">Login</Link></p>
      </div>
    </MainLayout>
  );
}
