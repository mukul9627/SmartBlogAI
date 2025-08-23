import { decryptId } from "@/utils/crypto";

type BlogDetailPageProps = {
  params: { id: string };
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const decryptedId = decryptId(params.id);

  if (!decryptedId) {
    return <p className="text-center text-red-500">❌ Invalid Blog ID</p>;
  }

  const res = await fetch(`http://localhost:5000/api/blog/one/${decryptedId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-center text-red-500">❌ Blog not found</p>;
  }

  const blog = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg leading-relaxed">{blog.content}</div>
    </div>
  );
}
