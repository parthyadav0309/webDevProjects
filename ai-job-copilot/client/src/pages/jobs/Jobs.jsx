import {useEffect, useMemo, useState } from "react";
import { createJobs, deleteJob, getJobs, updateJob } from "../../api/jobsApi";
import { Link } from "react-router-dom";


const emptyForm = {
    title:"",
    company:"",
    description:"",
    location:"",
    sourceUrl:"",
};

function normalizeJobs(data){
    if(Array.isArray(data)) return data;
    if(Array.isArray(data?.jobs)) return data.jobs;
    if(Array.isArray(data?.data)) return data.data;
    if(Array.isArray(data?.data?.jobs)) return data.data.jobs;
    return [];

}

export default function Jobs (){
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [jobs,setJobs] = useState([]);
    const [search,setSearch] = useState("");
    const [form,setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [success, setSuccess] = useState("");
    const [saving,setSaving] = useState(false);
    const [deletingId,setDeletingId] = useState(null);

    async function loadJobs(){
        try {
            setError("");
            const response = await getJobs();
            setJobs(normalizeJobs(response));
            
        } catch (error) {
            setError(error.response?.data?.message || "Failed to Load Jobs.");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadJobs();
    },[]);


    const filteredJobs = useMemo(() => {
      const term = search.trim().toLowerCase();

      if (!term) {
        return jobs;
      }

      return jobs.filter((job) =>
        [
          job.title,
          job.company,
          job.description,
          job.jobDescription,
          job.location,
          job.sourceUrl,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term)),
      );
    }, [jobs, search]);     

  function handleChange(event){
      const {name,value} = event.target;
      setForm((current)=>({...current,[name]:value}));
  }

  function resetForm(){
      setForm(emptyForm);
      setEditingId(null);
  }

  function handleEdit(job){
      setEditingId(job.id);
      setForm({
        title: job.titile || "",
        compnay: job.company || "",
        description: job.description || job.jobDescription || "",
        sourceUrl: job.sourceUrl || "",
        location: job.location || "",
      });
      setError("");
      setSuccess("");

      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event){
    event.preventDefault();

    try {
        setSaving(true);
        setError("");
        setSuccess("");

        const payload = {
          title: form.title.trim(),
          company: form.company.trim(),
          description: form.description.trim(),
          sourceUrl: form.sourceUrl.trim(),
          location: form.location.trim(),
        };

        if(editingId){
           const response = await updateJob(editingId, payload);
            const updatedJob =
            response?.job || response?.data?.job || response?.data;

            setJobs((current) =>
              current.map((job) =>
                job.id === editingId
                  ? {
                      ...job,
                      ...payload,
                      ...(updatedJob && typeof updatedJob === "object"
                        ? updatedJob
                        : {}),
                    }
                  : job
              )
            );

            setSuccess("Job updated successfully.");
      } else {
        const response = await createJobs(payload);
        const newJob =
          response?.job ||
          response?.data?.job ||
          response?.data;

        if (newJob && typeof newJob === "object" && newJob.id) {
          setJobs((current) => [
            newJob,
            ...current.filter((job) => job.id !== newJob.id),
          ]);
        } else {
          await loadJobs();
        }

        setSuccess("Job added successfully.");
      }

      resetForm();
    } catch (err) {
      // console.log(err.response);
      setError(
        
        err.response?.data?.message ||
          `Failed to ${editingId ? "update" : "add"} job.`
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(job) {
      if (!window.confirm(`Delete "${job.title}"?`)) return;

      try {
        setDeletingId(job.id);
        setError("");
        setSuccess("");

        await deleteJob(job.id);

        setJobs((current) =>
          current.filter((item) => item.id !== job.id)
        );

        if (editingId === job.id) resetForm();

        setSuccess("Job deleted successfully.");
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to delete job."
        );
      } finally {
        setDeletingId(null);
      }
  };

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

      <main className="mx-auto max-w-6xl space-y-8 px-5 py-10">
        <div>
          <p className="text-sm font-semibold text-blue-600">Job workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Job Management
          </h1>
          <p className="mt-2 text-slate-500">
            Save job descriptions and prepare them for AI resume analysis.
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
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId ? "Edit Job" : "Add a New Job"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Job title
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="e.g. Backend Developer"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="e.g. Acme Technologies"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="e.g. Bangalore"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="sourceUrl"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Source Url
                </label>
                <input
                  id="sourceUrl"
                  name="sourceUrl"
                  type="url"
                  value={form.sourceUrl}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="e.g. link.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Job description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={7}
                placeholder="Paste the job description, required skills, responsibilities, and qualifications..."
                className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Job"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Saved Jobs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {jobs.length} {jobs.length === 1 ? "job" : "jobs"} in your
                account
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs..."
              aria-label="Search jobs"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
            />
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-slate-700">
                {search ? "No matching jobs found" : "No jobs added yet"}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {search
                  ? "Try another title or company name."
                  : "Add your first job using the form above."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <article key={job.id} className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      {/* Job link above title */}
                      {job.sourceUrl && (
                        <a
                          href={job.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View Job Posting ↗
                        </a>
                      )}

                      <h3 className="text-lg font-semibold text-slate-900">
                        {job.title}
                      </h3>

                      <div className="mt-1">
                        <span className="text-sm font-medium text-blue-700">
                          {job.company}
                        </span>

                        <span className="text-xs font-normal text-slate-500">
                          , {job.location}
                        </span>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {(job.description || job.jobDescription || "").slice(
                          0,
                          350,
                        )}
                        {(job.description || job.jobDescription || "").length >
                        350
                          ? "..."
                          : ""}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(job)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === job.id}
                        onClick={() => handleDelete(job)}
                        className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {deletingId === job.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}