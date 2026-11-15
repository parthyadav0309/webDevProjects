import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { generateCareerPlan, getCareerPlans } from "../../api/aiApi";

const priorityStyles = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

export default function CareerAdvisor() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [careerPlans, setCareerPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const generateAdvice = async () => {
    try {
      setLoading(true);
      setError("");

      const careerPlan = await generateCareerPlan();

      setAdvice(careerPlan.advice);
      setSelectedPlanId(careerPlan.id);

      setCareerPlans((previous) => [careerPlan, ...previous]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to generate career advice.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSavedPlans = async () => {
      try {
        const plans = await getCareerPlans();

        setCareerPlans(plans);

        if (plans.length > 0) {
          setSelectedPlanId(plans[0].id);
          setAdvice(plans[0].advice);
        }
      } catch (error) {
        console.error("Failed to load saved career plans:", error);
      }
    };

    loadSavedPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              AI Career Advisor
            </h1>
            <p className="mt-2 text-gray-500">
              Get a personalized learning roadmap based on your AI resume
              analyses.
            </p>
          </div>

          <button
            onClick={generateAdvice}
            hidden={!(advice || error)}
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Regenerate Advice
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!advice && !loading && !error && (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Discover your next career move
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Generate an AI-powered improvement plan using your existing resume
              and job analysis results.
            </p>
            <button
              onClick={generateAdvice}
              className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Generate My Career Plan
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-10 rounded-xl bg-white p-12 text-center shadow-sm">
            <p className="font-medium text-gray-700">
              Gemini is analyzing your skill gaps and preparing your roadmap...
            </p>
            <p className="mt-2 text-sm text-gray-500">
              This may take a few moments.
            </p>
          </div>
        )}

        {advice && !loading && (
          <div className="mt-8 space-y-8">
            {/* Career Summary */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Career Summary
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                {advice.careerSummary}
              </p>
            </section>

            {/* Priority Skills */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Skills to Improve
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {advice.prioritySkills?.map((item, index) => (
                  <div
                    key={`${item.skill}-${index}`}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.skill}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          priorityStyles[item.priority] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Roadmap */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Four-Week Learning Roadmap
              </h2>

              <div className="mt-6 space-y-5">
                {advice.learningRoadmap?.map((week) => (
                  <div
                    key={week.week}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <span className="text-sm font-semibold text-indigo-600">
                      WEEK {week.week}
                    </span>

                    <h3 className="mt-2 text-lg font-semibold text-gray-900">
                      {week.title}
                    </h3>

                    <div className="mt-4 grid gap-5 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-gray-800">Topics</h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-gray-600">
                          {week.topics?.map((topic, index) => (
                            <li key={index}>{topic}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800">
                          Practical Tasks
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-gray-600">
                          {week.tasks?.map((task, index) => (
                            <li key={index}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Project Recommendations */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Recommended Projects
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {advice.projectRecommendations?.map((project, index) => (
                  <div
                    key={`${project.title}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {project.description}
                    </p>

                    <h4 className="mt-4 text-sm font-semibold text-gray-800">
                      Technologies
                    </h4>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies?.map((technology, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <h4 className="mt-4 text-sm font-semibold text-gray-800">
                      Skills Improved
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      {project.skillsImproved?.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Interview Preparation */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Interview Preparation
              </h2>

              <ul className="mt-5 space-y-3">
                {advice.interviewPreparation?.map((topic, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700"
                  >
                    {index + 1}. {topic}
                  </li>
                ))}
              </ul>
            </section>

            {/* Recommendations */}
            <section className="rounded-2xl bg-indigo-50 p-6">
              <h2 className="text-xl font-semibold text-indigo-900">
                Personalized Recommendations
              </h2>

              <ul className="mt-4 space-y-3">
                {advice.recommendations?.map((item, index) => (
                  <li key={index} className="text-sm leading-6 text-indigo-900">
                    • {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
      {careerPlans.length > 0 && (
        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">Previous Career Plans</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {careerPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  setAdvice(plan.advice);
                }}
                className={`rounded-lg border px-4 py-2 text-sm ${
                  selectedPlanId === plan.id
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {new Date(plan.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
