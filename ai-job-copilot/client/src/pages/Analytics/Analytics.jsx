import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../api/applicationApi";
import { getAIAnalysesLoggedInUser } from "../../api/aiApi";

const STATUS_COLORS = {
  SAVED: "bg-gray-400",
  APPLIED: "bg-blue-500",
  INTERVIEW: "bg-purple-500",
  OFFER: "bg-green-500",
  REJECTED: "bg-red-500",
};

const STATUS_LABELS = {
  SAVED: "Saved",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

const getApplicationsData = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.applications)) return response.applications;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.applications)) {
    return response.data.applications;
  }
  return [];
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Analytics() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analyses,setAnalyses] = useState([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {    

        const [applicationResponse, analysesResponse] = await Promise.all([
          getApplications(),
          getAIAnalysesLoggedInUser()
        ])
        setApplications(getApplicationsData(applicationResponse));
        setAnalyses(analysesResponse);

      } catch (err) {
        console.error("Analytics error:", err);
        setError(err.response?.data?.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const stats = useMemo(() => {
    const counts = {
      SAVED: 0,
      APPLIED: 0,
      INTERVIEW: 0,
      OFFER: 0,
      REJECTED: 0,
    };

    applications.forEach((application) => {
      const status = application.status?.toUpperCase();

      if (Object.hasOwn(counts, status)) {
        counts[status]++;
      }
    });

    const total = applications.length;

    const successRate = total ? Math.round((counts.OFFER / total) * 100) : 0;

    return { ...counts, total, successRate };
  }, [applications]);

  const monthlyData = useMemo(() => {
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - i);

      months.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        count: 0,
      });
    }

    applications.forEach((application) => {
      if (!application.appliedAt) return;

      const date = new Date(application.appliedAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      const month = months.find((item) => item.key === key);

      if (month) month.count++;
    });

    return months;
  }, [applications]);

  const upcomingInterviews = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return applications
      .filter((application) => {
        if (!application.interviewAt) return false;

        const interviewDate = new Date(application.interviewAt);
        interviewDate.setHours(0, 0, 0, 0);

        return interviewDate >= today;
      })
      .sort((a, b) => new Date(a.interviewAt) - new Date(b.interviewAt));
  }, [applications]);

  const aiStats = useMemo(() => {
    const scores = analyses
      .map((analysis) =>
        Number(analysis.matchScore ?? analysis.result?.matchScore),
      )
      .filter((score) => Number.isFinite(score));

    const averageScore = scores.length
      ? Math.round(
          scores.reduce((total, score) => total + score, 0) / scores.length,
        )
      : 0;

    const bestMatches = [...analyses]
      .sort(
        (a, b) =>
          Number(b.matchScore ?? b.result?.matchScore ?? 0) -
          Number(a.matchScore ?? a.result?.matchScore ?? 0),
      )
      .slice(0, 5);

    const skillCounts = {};

    analyses.forEach((analysis) => {
      const missingSkills = analysis.result?.missingSkills || [];

      missingSkills.forEach((item) => {
        const skill =
          typeof item === "string"
            ? item
            : item.skill || item.name || item.title;

        if (skill) {
          const key = skill.trim();
          skillCounts[key] = (skillCounts[key] || 0) + 1;
        }
      });
    });

    const topMissingSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      averageScore,
      totalAnalyses: analyses.length,
      bestMatches,
      topMissingSkills,
    };
  }, [analyses]);

  const maxMonthlyCount = Math.max(
    ...monthlyData.map((month) => month.count),
    1,
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  const summaryCards = [
    {
      title: "Total Applications",
      value: stats.total,
      color: "text-gray-900",
    },
    {
      title: "Applied",
      value: stats.APPLIED,
      color: "text-blue-600",
    },
    {
      title: "Interviews",
      value: stats.INTERVIEW,
      color: "text-purple-600",
    },
    {
      title: "Offers",
      value: stats.OFFER,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link to="/dashboard" className="text-sm font-medium text-indigo-600">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Understand your job search progress.
        </p>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.title} className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{card.title}</p>

              <p className={`mt-3 text-3xl font-bold ${card.color}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* AI Analysis Summary */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Average AI Match Score</p>

            <p className="mt-3 text-3xl font-bold text-indigo-600">
              {aiStats.averageScore}%
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Based on {aiStats.totalAnalyses} AI analyses
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total AI Analyses</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {aiStats.totalAnalyses}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Resume and job compatibility checks
            </p>
          </div>
        </div>

        {/* Best-Matched Jobs */}

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Best-Matched Jobs
          </h2>

          {aiStats.bestMatches.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              No AI analyses available yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {aiStats.bestMatches.map((analysis) => {
                const score = Number(
                  analysis.matchScore ?? analysis.result?.matchScore ?? 0,
                );

                return (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {analysis.job?.title || "Unknown Job"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {analysis.job?.company || "Unknown Company"}
                      </p>
                    </div>

                    <span className="rounded-lg bg-green-50 px-3 py-2 font-semibold text-green-700">
                      {score}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Most Frequently Missing Skills */}

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Skill Gap Insights
          </h2>

          {aiStats.topMissingSkills.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              No missing skill information available.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {aiStats.topMissingSkills.map(([skill, count]) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {skill}
                  </span>

                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    Missing in {count} analysis
                    {count > 1 ? "es" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status and Success Rate */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Application Status
            </h2>

            <div className="mt-6 space-y-5">
              {Object.entries(STATUS_LABELS).map(([status, label]) => {
                const count = stats[status];
                const percentage = stats.total
                  ? (count / stats.total) * 100
                  : 0;

                return (
                  <div key={status}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-semibold text-gray-900">
                        {count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${STATUS_COLORS[status]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Application Success Rate
            </h2>

            <div className="mt-8 text-center">
              <p className="text-6xl font-bold text-green-600">
                {stats.successRate}%
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Offers received / Total applications
              </p>

              <p className="mt-6 text-sm text-gray-600">
                {stats.OFFER} offer(s) from {stats.total} application(s).
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Activity */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Monthly Application Activity
          </h2>

          <div className="mt-8 flex h-56 items-end justify-around gap-3">
            {monthlyData.map((month) => (
              <div
                key={month.key}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <span className="mb-2 text-sm font-semibold text-gray-700">
                  {month.count}
                </span>

                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    className="w-full max-w-12 rounded-t-lg bg-indigo-500 transition-all"
                    style={{
                      height: `${
                        month.count
                          ? Math.max((month.count / maxMonthlyCount) * 100, 5)
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <span className="mt-3 text-xs text-gray-500">
                  {month.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Upcoming Interviews
          </h2>

          {upcomingInterviews.length === 0 ? (
            <p className="mt-5 text-sm text-gray-500">
              No upcoming interviews scheduled.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-gray-100">
              {upcomingInterviews.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {application.job?.title || "Unknown Job"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {application.job?.company || "Unknown Company"}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-indigo-600">
                    {formatDate(application.interviewAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
