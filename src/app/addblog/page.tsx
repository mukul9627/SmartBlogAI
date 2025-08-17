//MindGarden – grow your ideas into blogs.

"use client";
import { useState, useEffect } from "react";

type Blog = {
  title: string;
  image: string;
  content: string;
};

export default function AddBlog() {
  const [prompt, setPrompt] = useState("");
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateBlog = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generateBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error("❌ Generate Error:", err);
      alert("Failed to generate blog");
    } finally {
      setLoading(false);
    }
  };

  const saveBlog = async () => {
    if (!blog) return;
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
      const result = await res.json();
      alert(result.message || "Blog saved successfully!");
    } catch (err) {
      console.error("❌ Save Error:", err);
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[7rem]">
      <textarea className="w-full p-3 border rounded mb-4"
      placeholder="Enter your blog idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={generateBlog} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {loading ? "Generating..." : "Generate Blog"}
        </button>
      </div>

      {blog && (
        <>
          <div className="mt-6 bg-white p-4 rounded shadow" style={{ marginTop: "20px" }}>
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            {/* <img className="w-full rounded mb-4"
              src={blog.image}
              alt={blog.title}
              style={{ maxWidth: "300px", display: "block" }}
            /> */}
            <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
          </div>

          {/* ✅ Separate Save button after blog is generated */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={saveBlog} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              {saving ? "Saving..." : "Save Blog"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
