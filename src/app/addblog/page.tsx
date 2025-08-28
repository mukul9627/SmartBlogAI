//MindGarden – grow your ideas into blogs.

// "use client";
// import { useState, useEffect } from "react";

// type Blog = {
//   title: string;
//   image: string;
//   content: string;
// };

// export default function AddBlog() {
//   const [prompt, setPrompt] = useState("");
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const generateBlog = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/generateBlog", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       setBlog(data);
//       console.log("API response",data)
//     } catch (err) {
//       console.error("❌ Generate Error:", err);
//       alert("Failed to generate blog");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveBlog = async () => {
//     if (!blog) return;
//     setSaving(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/blog", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(blog),
//       });
//       const result = await res.json();
//       alert(result.message || "Blog saved successfully!");
//     } catch (err) {
//       console.error("❌ Save Error:", err);
//       alert("Failed to save blog");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!isMounted) return null;

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-[7rem]">
//       <textarea className="w-full p-3 border rounded mb-4 text-black"
//       placeholder="Enter your blog idea..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       <div style={{ marginTop: "10px" }}>
//         <button onClick={generateBlog} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//           {loading ? "Generating..." : "Generate Blog"}
//         </button>
//       </div>

//       {blog && (
//         <>
//           <div className="mt-6 bg-white p-4 rounded shadow" style={{ marginTop: "20px" }}>
//             <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
//             {/* <img className="w-full rounded mb-4"
//               src={blog.image}
//               alt={blog.title}
//               style={{ maxWidth: "300px", display: "block" }}
//             /> */}
//             <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
//           </div>

//           {/* ✅ Separate Save button after blog is generated */}
//           <div style={{ marginTop: "10px" }}>
//             <button onClick={saveBlog} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//               {saving ? "Saving..." : "Save Blog"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// MindGarden – grow your ideas into blogs.
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

  // 🔹 Generate Blog using OpenAI + fetch image from Pixabay
  const generateBlog = async () => {
    setLoading(true);
    try {
      // Step 1: Generate blog using OpenAI API route
      const res = await fetch("/api/generateBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      // Step 2: Fetch image from Pixabay API
      const pixabayRes = await fetch(
        `https://pixabay.com/api/?key=51993351-2e59875a6b3d7b17cc1599229&q=${encodeURIComponent(
          data.title || prompt
        )}&image_type=photo&per_page=3`
      );
      const pixabayData = await pixabayRes.json();

      // Pick the first image if available
      const imageUrl =
        pixabayData.hits && pixabayData.hits.length > 0
          ? pixabayData.hits[0].webformatURL
          : "https://via.placeholder.com/600x400?text=No+Image+Found";

      // Step 3: Merge blog + image
      setBlog({
        title: data.title,
        content: data.content,
        image: imageUrl,
      });
    } catch (err) {
      console.error("❌ Generate Error:", err);
      alert("Failed to generate blog");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Save Blog to your Node.js backend
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
    <div className="max-w-4xl mx-auto mt-20 p-6">
  {/* Title */}
  <h1 className="text-2xl font-bold text-center mb-2">
    Generate Your Blog with AI
  </h1>
  <p className="text-center text-gray-600 mb-6">
    Enter your blog idea and let our AI create engaging, SEO-friendly content for you.
  </p>

  {/* Card */}
<div className="bg-white rounded-lg shadow-lg border-[0.2px solid lightgray] p-6">
  <label className="block font-semibold mb-2">✨ Blog Idea</label>

  <textarea
    className="w-full min-h-15 text-[14px] p-3 rounded text-black bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none mb-4"
    placeholder="Enter your blog idea... (e.g., 'The benefits of remote work for small businesses')"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
  />

  {/* Generate button */}
  <button
    onClick={generateBlog}
    disabled={loading}
    className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
  >
    ✨{loading ? "Generating..." : "Generate Blog"}
  </button>
</div>

  {/* Blog Output */}
  {blog && (
    <div className="mt-8 bg-white rounded-lg shadow border p-6">
      <h2 className="text-xl font-bold mb-3">{blog.title}</h2>
      {blog.image && (
        <img
          className="w-full max-w-lg mx-auto rounded mb-4"
          src={blog.image}
          alt={blog.title}
        />
      )}
      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

      {/* Save button */}
     <button onClick={saveBlog} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" > {saving ? "Saving..." : "Save Blog"} </button>
    </div>
  )}
</div>

  );
}

