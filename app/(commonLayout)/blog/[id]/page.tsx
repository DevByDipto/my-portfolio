"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BlogUpdate } from "@/components/modules/blog/BlogUpdate";

export default function BlogDetailsClient() {
  const { id } = useParams();
  
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?id=${id}`);
      const data = await res.json();
      console.log(data);
      
      setBlog(data.data[0]);
    }
    fetchBlog();
  }, [id]);

//   if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">{blog?.title}</h1>
      {/* {blog.coverImage && <img src={blog.coverImage} alt={blog.title} className="w-full h-96 object-cover rounded" />} */}
      <p>{blog?.content}</p>
      <div className="flex gap-4 mt-4">
        {/* <Button variant="outline">Update</Button> */}
        <BlogUpdate/>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
}
