/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";

export async function updateBlog(blogId: string, data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blogId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update blog");

  // update successful → invalidate blog cache
  revalidateTag("blog", "default"); 
}