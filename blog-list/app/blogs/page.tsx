import { getBlogs } from "../services/blogs";
import Link from "next/link";

export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const  {filter}  = await searchParams;
  

  const blogs = await getBlogs(filter);
  return (
    <div>
      <h2 >Blogs List</h2>
      <form action="/blogs">
        <label htmlFor="filter">
          Filter blogs by title{"  "}
          <input type="text" name="filter" id="filter" defaultValue={filter} />
        </label>
        <button type="submit" className="submit-btn">Filter</button>
        <Link href="/blogs" className="cancel-btn">Clear the search</Link>
      </form>
      
      {blogs.length === 0 ? (
        <div>
          <h2>No blogs found matching your filter {filter || "None"}</h2>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li key={blog.id} className="flex justify-baseline gap-2 py-5">
                <Link href={`/blogs/${blog.id}`} className="blog-title"> {blog.title}</Link>By
                <span className="text-blue-900 font-semibold">{blog.author}</span>has<span>{blog.likes}</span>likes
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
//this forces next.js to refresh data every time the page is visited
export const dynamic = "force-dynamic";
