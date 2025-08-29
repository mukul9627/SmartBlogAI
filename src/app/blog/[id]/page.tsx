"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { decryptId } from "@/utils/crypto";
import ReactMarkdown from "react-markdown";

type Blog = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
    image?: string; 
};
const BlogType = {
  Category: "Information",
};
export default function BlogPageDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          // 👇 Fix: decode URL component before decrypting
          const decodedId = decodeURIComponent(id as string);
          const decryptedId = decryptId(decodedId);

          const res = await fetch(
            `http://localhost:5000/api/blog/one/${decryptedId}`
          );
          const data = await res.json();
          setBlog(data);
        } catch (err) {
          console.error("❌ Fetch blog error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10 mt-[10rem]">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p> <div className="relative">
                    <img
                      src={blog.image || "https://via.placeholder.com/600x400?text=No+Image"}
                      alt={blog.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                      {BlogType.Category}
                      {/* {new Date(blog.createdAt).toLocaleDateString()} */}
                    </div>
                  </div>
      <div className="prose">
        {/* <p className="text-[15px]">{blog.content}</p> */}
        <p className="text-[15px] whitespace-pre-line">{blog.content}</p>
        {/* <ReactMarkdown className="prose prose-sm max-w-none text-[15px]">
  {blog.content}
</ReactMarkdown> */}
      </div>
    </div>
  );
}
