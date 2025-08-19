import React from "react";

const blogs = [

  
{
    date: "14 AUG",
    image:
      "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "From Cages to the Skies – A True Independence for All",
  },
  {
    date: "31 JUL",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
    title:
      "Breed-Specific Flight Restrictions: Why Some Dogs Are on the No-Fly List",
  },
  {
    date: "31 JUL",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
    title:
      "Breed-Specific Flight Restrictions: Why Some Dogs Are on the No-Fly List",
  },
  {
    date: "31 JUL",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
    title:
      "Breed-Specific Flight Restrictions: Why Some Dogs Are on the No-Fly List",
  },
   {
    date: "31 JUL",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
    title:
      "Breed-Specific Flight Restrictions: Why Some Dogs Are on the No-Fly List",
  },
];

const latestBlogs = [
  {
    title: "From Cages to the Skies – A True Independence for All",
    image:
      "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    title:
      "Breed-Specific Flight Restrictions: Why Some Dogs Are on the No-Fly List",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
  },
  {
    title:
      "Bringing Pets to the UK: Understanding DEFRA Rules",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
  },
];

const BlogCard = () => {
  return (
<>
 <section className="relative w-full h-[700px] flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80"
        alt="AI Blogging Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/* Text Content */}
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

     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
  <div className="lg:col-span-2">
      {/* Responsive grid: 2 columns on medium+ screens */}
      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative group">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              {/* Date badge */}
              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                {blog.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm font-medium cursor-pointer hover:underline">
                Read More
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* RIGHT: Sidebar */}
      <aside className="space-y-6">
        {/* Search */}
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

            {latestBlogs.map((item, idx) => (
              <li key={idx} className="flex gap-3 items-center pt-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <p className="text-sm font-medium">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
    </>
     
  );
};

export default BlogCard;
