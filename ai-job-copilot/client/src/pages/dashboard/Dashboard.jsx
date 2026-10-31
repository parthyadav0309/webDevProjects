import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getJobs, getResumes, getApplications } from "../../api/dashboardApi";
import { logout } from "../../api/loginApi";


function getList(response) {
  const data = response.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.jobs)) return data.jobs;
  if (Array.isArray(data?.resumes)) return data.resumes;
  if (Array.isArray(data?.applications)) return data.applications;
  if (Array.isArray(data?.data)) return data.data;

  return [];
}

function StatCard({ title, count, description, icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className={`rounded-xl px-3 py-2 text-xl ${color}`}>{icon}</span>
      </div>
      <p className="mt-5 text-3xl font-bold text-slate-900">{count}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.allSettled([
          getJobs(),
          getResumes(),
          getApplications(),
        ]);

        if (!active) return;

        const [jobsResult, resumesResult, applicationsResult] = results;

        const failed = results.some(
          (result) =>
            result.status === "rejected" &&
            result.reason?.response?.status === 401,
        );  

        if (failed) {
          navigate("/login", { replace: true });
          return;
        }

        const errors = results.filter((result) => result.status === "rejected");
        // console.log(errors);
        if (errors.length === results.length) {
          throw new Error("Could not load dashboard data. Please try again.");
        }

        if (jobsResult.status === "fulfilled") {
          setJobs(getList(jobsResult.value));
        }

        if (resumesResult.status === "fulfilled") { //empty resume shows ssome eerror to be fixed
          setResumes(getList(resumesResult.value));
        }

        if (applicationsResult.status === "fulfilled") {
          setApplications(getList(applicationsResult.value));
        }

        if (errors.length > 0) {
          console.log(
            "Some dashboard sections could not load. Check that all three GET endpoints are available.",
          );
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load dashboard data.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleLogout() {
    try {
      const result = logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Logout failed. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
        <Link to="/dashboard" className="text-xl font-bold text-blue-700">
          AI Job Copilot
        </Link>

        <nav className="mt-10 space-y-2">
          <Link
            to="/dashboard"
            className="block rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
          >
            Dashboard
          </Link>
          <Link
            to="/jobs"
            className="block rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
          >
            Jobs
          </Link>
          <Link
            to="/resumes"
            className="block rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
          >
            Resumes
          </Link>
          <Link
            to="/applications"
            className="block rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
          >
            Applications
          </Link>

          <Link
            to="/analyze-resume"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Analyze Resume with AI
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Log out
        </button>
      </aside>

      <main className="mx-auto max-w-7xl px-5 py-8 md:ml-64 md:px-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Overview</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Your Dashboard
            </h1>
            <p className="mt-2 text-slate-500">
              Manage your job search in one place.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 md:hidden"
          >
            Log out
          </button>
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        )}

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Saved Jobs"
            count={jobs.length}
            description="Jobs available in your account"
            icon="💼"
            color="bg-blue-50"
          />
          <StatCard
            title="Resumes"
            count={resumes.length}
            description="Uploaded resumes"
            icon="📄"
            color="bg-violet-50"
          />
          <StatCard
            title="Applications"
            count={applications.length}
            description="Tracked job applications"
            icon="📨"
            color="bg-emerald-50"
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Jobs
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Jobs you've saved or added.
                </p>
              </div>
              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                {jobs.length} total
              </span>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              {jobs.slice(0, 5).map((job, index) => (
                <div
                  key={job.id || index}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <p className="font-medium text-slate-800">
                    {job.title || job.jobTitle || "Untitled job"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {job.company || "Company not specified"}
                  </p>
                </div>
              ))}

              {jobs.length === 0 && (
                <p className="py-6 text-sm text-slate-500">
                  No jobs found yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your progress.
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                {applications.length} total
              </span>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              {applications.slice(0, 5).map((application, index) => (
                <div
                  key={application.id || index}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <p className="font-medium text-slate-800">
                    {application.job?.title ||
                      application.jobTitle ||
                      "Job application"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Status: {application.status || "Not specified"}
                  </p>
                </div>
              ))}

              {applications.length === 0 && (
                <p className="py-6 text-sm text-slate-500">
                  No applications found yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-linear-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-sm">
          <p className="text-sm font-medium text-blue-100">
            AI-powered career insights
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Improve your resume for your next opportunity
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
            Analyze your resume against a job description to discover matching
            skills, gaps, and interview preparation suggestions.
          </p>
          <p className="mt-5 text-sm text-blue-100">
            Your AI analysis history will be connected here in the next step.
          </p>
        </section>
      </main>
    </div>
  );
};
