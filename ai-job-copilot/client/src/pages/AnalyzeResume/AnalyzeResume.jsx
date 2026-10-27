import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs } from "../../api/jobsApi";
import { getResumes } from "../../api/resumeApi";
import { analyzeResume } from "../../api/aiApi";


function extractList(data,key){
    
    if(Array.isArray(data)) return data;
    if(Array.isArray(data?.[key])) return data[key];
    if(Array.isArray(data?.data)) return data.data;
    return [];
}

export default function AnalyzeResume() {
    const navigate = useNavigate();

    const [jobs,setJobs] = useState([]);
    const [resumes,setResumes] = useState([]);
    const [jobId,setJobId] = useState("");
    const [resumeId,setResumeId] = useState("");
    const [error,setError] = useState(null);
    const [loading,setLoading]=useState(true);
    const [analyzing,setAnalyzing] = useState(null);


    useEffect(()=>{
        let active = true;

        async function loadOptions(){
            try{
                const [jobsResponse, resumesResponse] = await Promise.allSettled([getJobs(),getResumes()]);
                // console.log("Loaded jobs:", jobsResponse);
                if(!active) return;

                const jobList = extractList(jobsResponse.value,"jobs");
                const resumeList = extractList(resumesResponse.value, "resumes");
                
                setJobs(jobList);
                setResumes(resumeList);
            }
        
        catch(err){
            if(active){
                setError(
                    err.response?.data?.messsage || "Unable to Load jobs and Resumes. Please try again."
                );
            }
        }
        finally{
            if(active) setLoading(false);
        }
        }
        loadOptions();

        return ()=>{
            active = false;
        }

    },[]);

    async function handleAnalyze(event){
        event.preventDefault();
        setError("");

        if(!jobId || !resumeId){
             setError("Please select both a job and a resume.");
             return;
        }

        try {
          setAnalyzing(true);

          const response = await analyzeResume(jobId, resumeId);

          // Support common response shapes from the backend.
          const analysis =
            response?.analysis ||
            response?.data?.analysis ||
            response?.data ||
            response;

          const analysisId =
            analysis?.id || response?.analysisId || response?.data?.analysisId;

          if (analysisId) {
            navigate(`/ai-analysis/${analysisId}`);
          } else {
            setError(
              "The analysis request completed, but the response did not contain an analysis ID. Check your POST /api/ai/analyze response.",
            );
          }
        } catch (err) {
            setError(
              err.response?.data?.message ||
                "Resume analysis failed. Please try again.",
            );
        }
        finally{
            setAnalyzing(false);
        }
    }
    if(loading){
        return (
          <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <p className="text-sm text-slate-600">
              Loading jobs and resumes...
            </p>
          </div>
        );
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
            <Link to="/dashboard" className="text-xl font-bold text-blue-700">
              AI Job Copilot
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-5 py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">Gemini AI</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Analyze Your Resume
            </h1>
            <p className="mt-2 text-slate-500">
              Select a job and resume to discover how well your experience
              matches the role.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleAnalyze}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div>
              <label
                htmlFor="job"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Select a job
              </label>

              <select
                id="job"
                value={jobId}
                onChange={(event) => setJobId(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Choose a saved job</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} {job.company ? `— ${job.company}` : ""}
                  </option>
                ))}
              </select>

              {jobs.length === 0 && (
                <p className="mt-2 text-sm text-amber-700">
                  No saved jobs found.{" "}
                  <Link to="/jobs" className="font-semibold underline">
                    Add a job first
                  </Link>
                  .
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="resume"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Select a resume
              </label>

              <select
                id="resume"
                value={resumeId}
                onChange={(event) => setResumeId(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Choose an uploaded resume</option>
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.name || resume.fileName || "Untitled resume"}
                  </option>
                ))}
              </select>

              {resumes.length === 0 && (
                <p className="mt-2 text-sm text-amber-700">
                  No resumes found.{" "}
                  <Link to="/resumes" className="font-semibold underline">
                    Upload a resume first
                  </Link>
                  .
                </p>
              )}
            </div>

            <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
              The AI will evaluate matching skills, skill gaps, strengths,
              recommendations, and potential interview questions.
            </div>

            <button
              type="submit"
              disabled={
                analyzing ||
                !jobId ||
                !resumeId ||
                jobs.length === 0 ||
                resumes.length === 0
              }
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {analyzing ? "Analyzing with AI..." : "Analyze Resume"}
            </button>
          </form>
        </main>
      </div>
    );
}