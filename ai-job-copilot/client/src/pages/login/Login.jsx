import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { postLogin } from "../../api/loginApi";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await postLogin(email,password);
      // console.log(result);
      if(result){
        navigate(location.state?.from?.pathname || "/dashboard", {
          replace: true,
        });
      }
      
      
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-slate-900">AI Job Copilot</h1>

        <p className="mt-2 mb-6 text-slate-500">
          Sign in to view your resume analysis.
        </p>
        {message && (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="you@example.com"
        />

        <label className="mb-2 block text-sm font-medium">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Your password"
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
