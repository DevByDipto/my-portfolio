// "use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Blog {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

const BlogPage = async () => {
  // const [blogs, setBlogs] = useState<Blog[]>([]);

  // const fetchBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`);
    const data = await res.json();
    const blogs = data.data
  //   setBlogs(data.data);
  // };

  // useEffect(() => {
  //   fetchBlogs();
  // }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Blogs</h1>
      <div className="flex flex-col gap-6">
        {blogs?.map((blog:Blog) => (
          <div key={blog.id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            {/* {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover my-2 rounded"
              />
            )} */}
            <p>{blog.content.slice(0, 150)}...</p> {/* ছোট preview */}
            <Link href={`/blog/${blog.id}`}>
              <Button className="mt-2">Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
