import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../../api/applicationApi";

import { getJobs } from "../../api/jobsApi";
import { getResumes } from "../../api/resumeApi";



const STATUSES = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

const initialForm = {
  jobId: "",
  resumeId: "",
  status: "SAVED",
  appliedAt: "",
  interviewAt: "",
  notes: "",
};

const getList = (response, key) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.[key])) return response.data[key];
  return [];
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getDateInputValue = (date) => {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
};

const statusStyles = {
  SAVED: "bg-gray-100 text-gray-700",
  APPLIED: "bg-blue-100 text-blue-700",
  INTERVIEW: "bg-purple-100 text-purple-700",
  OFFER: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const statusLabel = (status) => {
  return status?.charAt(0) + status?.slice(1).toLowerCase();
};

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [applicationsResponse, jobsResponse, resumesResponse] =
        await Promise.all([getApplications(), getJobs(), getResumes()]);

      setApplications(getList(applicationsResponse, "applications"));
      setJobs(getList(jobsResponse, "jobs"));
      setResumes(getList(resumesResponse, "resumes"));
    } catch (err) {
      console.error("Failed to load application data:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load applications. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredApplications = useMemo(() => {
    const term = search.trim().toLowerCase();
    
    if (!term) return applications;

    return applications.filter((application) => {
      const jobTitle = application.job?.title || "";
      const company = application.job?.company || "";
      const status = application.status || "";

      return `${jobTitle} ${company} ${status}`.toLowerCase().includes(term);
    });
  }, [applications, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.jobId) {
      setError("Please select a job.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      jobId: form.jobId,
      resumeId: form.resumeId || null,
      status: form.status,
      appliedAt: form.appliedAt || null,
      interviewAt: form.interviewAt || null,
      notes: form.notes.trim() || null,
    };

    try {
      if (editingId) {
        await updateApplication(editingId, payload);
      } else {
        await createApplication(payload);
      }

      resetForm();
      await loadData();
    } catch (err) {
      console.error("Failed to save application:", err);
      setError(
        err.response?.data?.message ||
          "Unable to save application. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (application) => {
    setEditingId(application.id);

    setForm({
      jobId: application.jobId || application.job?.id || "",
      resumeId: application.resumeId || application.resume?.id || "",
      status: application.status || "SAVED",
      appliedAt: getDateInputValue(application.appliedAt),
      interviewAt: getDateInputValue(application.interviewAt),
      notes: application.notes || "",
    });

    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteApplication(id);
      await loadData();
    } catch (err) {
      console.error("Failed to delete application:", err);
      setError(err.response?.data?.message || "Unable to delete application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Application Tracker
            </h1>

            <p className="mt-2 text-gray-500">
              Manage and track all your job applications in one place.
            </p>
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">
              {applications.length}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Application Form */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            {editingId ? "Edit Application" : "Add New Application"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Job */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Job *
                </label>

                <select
                  name="jobId"
                  value={form.jobId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Choose a job</option>

                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} - {job.company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resume */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Resume
                </label>

                <select
                  name="resumeId"
                  value={form.resumeId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">No resume selected</option>

                  {resumes.map((resume) => (
                    <option key={resume.id} value={resume.id}>
                      {resume.name || resume.fileName || "Untitled Resume"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Application Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Applied Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Applied Date
                </label>

                <input
                  type="date"
                  name="appliedAt"
                  value={form.appliedAt}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Interview Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Date
                </label>

                <input
                  type="date"
                  name="interviewAt"
                  value={form.interviewAt}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add recruiter details, interview feedback, follow-up reminders..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving || jobs.length === 0}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Application"
                    : "Add Application"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Applications List */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Applications
            </h2>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company, job, status..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-indigo-500 sm:max-w-xs"
            />
          </div>

          {loading ? (
            <p className="py-10 text-center text-gray-500">
              Loading applications...
            </p>
          ) : filteredApplications.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="font-semibold text-gray-800">
                No applications found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add an application using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:border-indigo-200"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.job?.title || "Unknown Job"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {application.job?.company || "Unknown Company"}
                      </p>

                      <span
                        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[application.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusLabel(application.status)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(application)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(application.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-gray-100 pt-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-gray-500">Applied Date</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {formatDate(application.appliedAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Interview Date</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {formatDate(application.interviewAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Resume</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {application.resume?.name ||
                          application.resume?.fileName ||
                          "Not selected"}
                      </p>
                    </div>
                  </div>

                  {application.notes && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-500">Notes</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
                        {application.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
