import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getAiAnalysis} from "../api/api.js"
import "./AIAnalysis.css";

function AIAnalysis() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchAnalysis() {
      try {
        setLoading(true);
        setError("");

        const data = await getAiAnalysis(id);
        console.log(data);

        if (!data.success) {
          throw new Error("Could not load the analysis.");
        }

        if (!cancelled) {
          setAnalysis(data.analysis);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load analysis.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      fetchAnalysis();
    } else {
      setError("Analysis ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="dashboard">
        <p>Loading your AI analysis...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard">
        <h1>Unable to load analysis</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!analysis?.result) {
    return (
      <main className="dashboard">
        <h1>Analysis not found</h1>
        <p>No analysis result is available.</p>
      </main>
    );
  }

  const result = analysis.result;
  const matchScore = analysis.matchScore ?? result.matchScore ?? 0;

  const matchingSkills = result.matchingSkills ?? [];
  const missingSkills = result.missingSkills ?? [];
  const strengths = result.strengths ?? [];
  const recommendations = result.recommendations ?? [];
  const interviewQuestions = result.interviewQuestions ?? [];

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">AI JOB COPILOT</span>
          <h1>Resume Analysis</h1>
          <p>Understand how your resume matches your target job.</p>
        </div>

        <span className="status-badge">Analysis complete</span>
      </header>

      <section className="score-card">
        <div className="score-ring" style={{ "--score": `${matchScore}%` }}>
          <div className="score-inner">
            <strong>{matchScore}%</strong>
            <span>Match score</span>
          </div>
        </div>

        <div className="score-content">
          <span className="eyebrow">YOUR RESULTS</span>
          <h2>
            {matchScore >= 85
              ? "Strong candidate match"
              : matchScore >= 65
                ? "Moderate candidate match"
                : "Room to improve your match"}
          </h2>
          <p>
            Review the matching skills and recommendations generated from your
            resume and the job description.
          </p>
        </div>
      </section>

      <div className="section-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2>Matching skills</h2>
            <span className="count-badge">{matchingSkills.length}</span>
          </div>

          <div className="skill-list">
            {matchingSkills.map((skill) => (
              <span className="skill-badge matched" key={skill}>
                ✓ {skill}
              </span>
            ))}
          </div>

          {matchingSkills.length === 0 && (
            <p>No matching skills were returned.</p>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2>Missing skills</h2>
            <span className="count-badge">{missingSkills.length}</span>
          </div>

          <div className="skill-list">
            {missingSkills.map((skill) => (
              <span className="skill-badge missing" key={skill}>
                {skill}
              </span>
            ))}
          </div>

          {missingSkills.length === 0 && (
            <p>No significant skill gaps were identified.</p>
          )}
        </section>
      </div>

      <section className="panel">
        <h2>Candidate strengths</h2>
        <ul className="detail-list">
          {strengths.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Recommendations</h2>
        <ol className="recommendation-list">
          {recommendations.map((item, index) => (
            <li key={`${item}-${index}`}>
              <span className="recommendation-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel">
        <h2>Interview questions</h2>
        <div className="question-list">
          {interviewQuestions.map((question, index) => (
            <article className="question-item" key={question}>
              <span className="question-number">
                Q{String(index + 1).padStart(2, "0")}
              </span>
              <p>{question}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AIAnalysis;
