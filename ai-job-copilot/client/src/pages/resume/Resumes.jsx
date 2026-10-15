import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getResumes, uploadResume, deleteResume } from "../../api/resumeApi.js";

const API_ORIGIN = "http://localhost:5000";

function formatDate(date) {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Resumes() {
  const fileInputRef = useRef(null);

  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadResumes() {
    try {
      setError("");
      const data = await getResumes();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(err.response?.data?.message || "Failed to load your resumes.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResumes();
  }, []);

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setSuccess("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a PDF resume first.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const uploadedResume = await uploadResume(selectedFile);

      if (uploadedResume) {
        setResumes((current) => [
          uploadedResume,
          ...current.filter((resume) => resume.id !== uploadedResume.id),
        ]);
      } else {
        await loadResumes();
      }

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSuccess("Resume uploaded successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Resume upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(resume) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resume.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(resume.id);
      setError("");
      setSuccess("");

      await deleteResume(resume.id);

      setResumes((current) => current.filter((item) => item.id !== resume.id));

      setSuccess("Resume deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete the resume.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleView(resume) {
    if (!resume.fileUrl) {
      setError("No file URL is available for this resume.");
      return;
    }

    const fileUrl = new URL(resume.fileUrl, API_ORIGIN);

    // Only allow files served by our backend.
    if (fileUrl.origin !== API_ORIGIN) {
      setError("This resume has an invalid file URL.");
      return;
    }

    window.open(fileUrl.href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link to="/dashboard" className="text-xl font-bold text-blue-700">
            AI Job Copilot
          </Link>

          <Link
            to="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-5 py-10">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Resume workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            My Resumes
          </h1>
          <p className="mt-2 text-slate-500">
            Upload and manage your resumes before analyzing them against jobs.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {success}
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Upload a resume
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a PDF file. Your backend will extract its text for AI
              analysis.
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            <label
              htmlFor="resume-file"
              className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 px-5 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/50"
            >
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                📄
              </span>

              <span className="font-semibold text-slate-800">
                Choose a PDF resume
              </span>

              <span className="mt-2 text-sm text-slate-500">
                Click here to browse your files
              </span>

              <input
                ref={fileInputRef}
                id="resume-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            {selectedFile && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {selectedFile.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {uploading ? "Uploading resume..." : "Upload Resume"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Uploaded resumes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your saved PDF files
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {resumes.length} {resumes.length === 1 ? "resume" : "resumes"}
            </span>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Loading resumes...
            </div>
          ) : resumes.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-slate-700">
                No resumes uploaded yet
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Upload your first PDF resume to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <span className="text-xs font-bold">PDF</span>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">
                        {resume.name || resume.fileName || "Untitled resume"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Uploaded {formatDate(resume.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleView(resume)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View file
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === resume.id}
                      onClick={() => handleDelete(resume)}
                      className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {deletingId === resume.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
