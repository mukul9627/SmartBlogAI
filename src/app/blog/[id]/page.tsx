// import { decryptId } from "@/utils/crypto";

// type BlogDetailPageProps = {
//   params: { id: string };
// };

// export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
//   const decryptedId = decryptId(params.id);

//   if (!decryptedId) {
//     return <p className="text-center text-red-500">❌ Invalid Blog ID</p>;
//   }

//   const res = await fetch(`http://localhost:5000/api/blog/one/${decryptedId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return <p className="text-center text-red-500">❌ Blog not found</p>;
//   }

//   const blog = await res.json();

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//       <p className="text-gray-600 mb-6">
//         {new Date(blog.createdAt).toLocaleDateString()}
//       </p>
//       <div className="text-lg leading-relaxed">{blog.content}</div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { decryptId } from "@/utils/crypto";

type Blog = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
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
      </p>
      <div className="prose">
        <p className="text-[15px]">{blog.content}</p>
      </div>
    </div>
  );
}
