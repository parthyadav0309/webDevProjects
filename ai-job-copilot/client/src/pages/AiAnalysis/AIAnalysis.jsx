import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAiAnalysis } from "../../api/api.js";

function ResultSection({ title, items, color }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>

      {Array.isArray(items) && items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${color}`} />
              <span>
                {typeof item === "string"
                  ? item
                  : item.question ||
                    item.skill ||
                    item.title ||
                    JSON.stringify(item)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">No information available.</p>
      )}
    </section>
  );
}

export default function AIAnalysis() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchAnalysis() {
      try {
        setLoading(true);
        setError("");

        const data = await getAiAnalysis(id);

        if (active) {
          setAnalysis(data.analysis || data);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load analysis. Please log in and try again.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchAnalysis();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-600">
            Analyzing your results...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Could not load analysis
          </h2>
          <p className="mt-3 text-sm text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <div className="mt-4">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const result = analysis?.result || {};
  const score = Number(analysis?.matchScore ?? result.matchScore ?? 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-blue-700"
          >
            AI Job Copilot
          </Link>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Resume Analysis
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <div>
          <p className="text-sm font-medium text-blue-600">
            AI-powered insights
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Resume Analysis
          </h1>
          <p className="mt-2 text-slate-500">
            Understand how your resume matches the job requirements.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-blue-700 p-6 text-white shadow-sm md:col-span-1">
            <p className="text-sm font-medium text-blue-100">Overall match</p>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-bold">{score}</span>
              <span className="mb-1 text-xl text-blue-100">/ 100</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-900/40">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-blue-100">
              Use these insights to improve your application.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Matching skills</p>
            <p className="mt-3 text-3xl font-bold text-emerald-600">
              {result.matchingSkills?.length || 0}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Skills aligned with the job
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Missing skills</p>
            <p className="mt-3 text-3xl font-bold text-amber-600">
              {result.missingSkills?.length || 0}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Areas to review or strengthen
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <ResultSection
            title="Matching Skills"
            items={result.matchingSkills}
            color="bg-emerald-500"
          />
          <ResultSection
            title="Missing Skills"
            items={result.missingSkills}
            color="bg-amber-500"
          />
          <ResultSection
            title="Your Strengths"
            items={result.strengths}
            color="bg-blue-500"
          />
          <ResultSection
            title="Recommendations"
            items={result.recommendations}
            color="bg-violet-500"
          />
        </div>

        <ResultSection
          title="Potential Interview Questions"
          items={result.interviewQuestions}
          color="bg-indigo-500"
        />

        {Array.isArray(result.weaknesses) && result.weaknesses.length > 0 && (
          <ResultSection
            title="Areas to Improve"
            items={result.weaknesses}
            color="bg-rose-500"
          />
        )}

        <p className="text-center text-xs text-slate-400">
          AI-generated feedback is a guide. Review suggestions against your
          actual skills and experience.
        </p>
      </main>
    </div>
  );
}
