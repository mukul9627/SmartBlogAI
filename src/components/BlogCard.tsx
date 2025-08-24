// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { encryptId, decryptId } from "@/utils/crypto";

// type Blog = {
//   _id: string;
//   title: string;
//   content: string;
//   createdAt: string;
// };

// const BlogCard = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [latestBlog, setLatestBlog] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchLatestBlogs();
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/blog");
//       const data = await res.json();
//       setBlogs(data);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLatestBlogs = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/blog/latest");
//       const data = await res.json();
//       setLatestBlog(data);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//     }
//   };

//   if (loading) return <p>Loading blogs...</p>;

//   return (
//     <>
//       {/* HERO */}
//       <section className="relative w-full h-[700px] flex items-center justify-center bg-gray-900">
//         <img
//           src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80"
//           alt="AI Blogging Banner"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
//         <div className="relative z-10 text-center px-6 max-w-3xl">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Welcome to SmartBlog AI
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200 mb-6">
//             Create engaging, SEO-friendly blogs in minutes with the power of AI.
//           </p>
//           <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg shadow-lg transition-all">
//             Get Started
//           </button>
//         </div>
//       </section>

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: Blog Grid */}
//         <div className="lg:col-span-2">
//           <div className="grid md:grid-cols-2 gap-8">
//             {blogs.map((blog) => {
//               const encryptedId = encryptId(blog._id);

//               return (
//                 <div
//                   key={blog._id}
//                   className="bg-white shadow-lg rounded-lg overflow-hidden"
//                 >
//                   <div className="relative">
//                     <img
//                       src="https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg"
//                       alt={blog.title}
//                       className="w-full h-64 object-cover"
//                     />
//                     <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
//                       {new Date(blog.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
//                     <p className="text-gray-700 text-sm line-clamp-3">
//                       {blog.content}
//                     </p>
//                     <Link href={`/blog/${encodeURIComponent(encryptedId)}`}>
//                       Read More →
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* RIGHT: Sidebar */}
//         <aside className="space-y-6">
//           <div className="bg-purple-700 p-4 rounded-md flex items-center">
//             <input
//               type="text"
//               placeholder="Search here"
//               className="flex-grow bg-transparent text-white placeholder-white outline-none"
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               stroke="white"
//               viewBox="0 0 24 24"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
//               />
//             </svg>
//           </div>

//           {/* Latest Blogs */}
//           <div>
//             <h3 className="text-xl font-bold pt-4 pb-4">LATEST BLOGS</h3>
//             <ul className="space-y-4 bg-white border border-[#c0c6cc] rounded-[7px] p-5 shadow-md">
//               {latestBlog.map((blog) => {
//                 const encryptedId = encodeURIComponent(encryptId(blog._id));
//                 return (
//                   <li key={blog._id} className="flex gap-3 items-center pt-4">
//                     <img
//                       src="https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//                       alt={blog.title}
//                       className="w-16 h-12 object-cover rounded"
//                     />
//                     <Link
//                       href={`/blog/${encryptedId}`}
//                       className="text-sm font-medium hover:underline"
//                     >
//                       {blog.title}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// };

// export default BlogCard;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { encryptId } from "@/utils/crypto";

type Blog = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const BlogCard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [latestBlog, setLatestBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBlogs();
    fetchBlogs();
  }, []);

  //get all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  //get latest 3 blogs
  const fetchLatestBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blog/latest");
      const data = await res.json();
      setLatestBlog(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[700px] flex items-center justify-center bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80"
          alt="AI Blogging Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to SmartBlog AI
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Create engaging, SEO-friendly blogs in minutes with the power of AI.
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg shadow-lg transition-all">
            Get Started
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Blog Grid */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => {
              const encryptedId = encryptId(blog._id);
              console.log(encryptedId);

              return (
                <div
                  key={blog._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg"
                      alt={blog.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {blog.content}
                    </p>
<div className="pt-3"><Link
                      href={`/blog/${encodeURIComponent(encryptId(blog._id))}`}
                      className="text-blue-500 underline mt-2"
                    >
                      {" "}
                      Read More →{" "}
                    </Link></div>
                    

                    {/* alter({`/blog/${encodeURIComponent(encryptId(blog._id))}`}) */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="space-y-6">
          <div className="bg-purple-700 p-4 rounded-md flex items-center">
            <input
              type="text"
              placeholder="Search here"
              className="flex-grow bg-transparent text-white placeholder-white outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          {/* Latest Blogs */}
          <div>
            <h3 className="text-xl font-bold pt-4 pb-4">LATEST BLOGS</h3>
            <ul className="space-y-4 bg-white border border-[#c0c6cc] rounded-[7px] p-5 shadow-md">
              {latestBlog.map((blog) => {
                const encryptedId = encryptId(blog._id);
                return (
                  <li key={blog._id} className="flex gap-3 items-center pt-4">
                    <img
                      src="https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      alt={blog.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <Link
                      href={`/blog/${encodeURIComponent(encryptId(blog._id))}`}
                      className="text-sm font-bold hover:underline "
                    >
                      <p>{blog.title}</p>
                      
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default BlogCard;
